'use strict';
// Bridge service - verifies source chain deposits, quotes ETH→mUSDC,
// and calls KredioBridgeMinter.processDeposit() on Hub as the relayer.

const { ethers } = require('ethers');
const path = require('path');
const fs = require('fs');
const { CHAINS, HUB, BRIDGE_FEE_BPS, MAX_PRICE_DIVERGENCE_PCT, KEY } = require('../config');
const { getChainlinkEthUsd } = require('../chainlink');

// ─── Load ABIs ────────────────────────────────────────────────────────────
function loadABI(name) {
    // 1. Check committed abis/ directory (used in all deployed environments)
    const bundled = path.resolve(__dirname, '../abis', `${name}.json`);
    if (fs.existsSync(bundled)) return require(bundled);
    // 2. Fall back to local Foundry output (dev only)
    const forgeOut = path.resolve(__dirname, '../../contracts/out', `${name}.sol`, `${name}.json`);
    if (fs.existsSync(forgeOut)) return require(forgeOut).abi;
    return null;
}

// ─── On-chain providers/contracts ────────────────────────────────────────
let hubProvider, hubWallet, minterContract;

// Per-chain source providers (lazy init)
const sourceProviders = {};
const inboxContracts = {};

/**
 * Hub Frontier EVM enforces a minimum priority fee (tip). Ethers.js v6 auto-
 * detects EIP-1559 and may set maxPriorityFeePerGas too low, causing:
 *   "Priority is too low: (120 vs 1)"
 * Fix: set maxPriorityFeePerGas = maxFeePerGas so the effective gas price is
 * always the full fee (safe on Frontier where fees aren't burned like ETH L1).
 */
async function getHubGasOverrides() {
    const feeData = await hubProvider.getFeeData();
    const maxFeePerGas = feeData.maxFeePerGas ?? ethers.parseUnits('10', 'gwei');
    return { maxFeePerGas, maxPriorityFeePerGas: maxFeePerGas };
}

/**
 * Retry helper - retries `fn` up to `attempts` times with `delayMs` ms between.
 * Logs each failure so the operator can see retries in server output.
 */
async function withRetry(fn, { attempts = 3, delayMs = 5000, label = 'operation' } = {}) {
    let lastErr;
    for (let i = 1; i <= attempts; i++) {
        try {
            return await fn();
        } catch (err) {
            lastErr = err;
            if (i < attempts) {
                console.warn(`[bridge] ${label}: attempt ${i}/${attempts} failed - ${err.message} - retrying in ${delayMs / 1000}s`);
                await new Promise(r => setTimeout(r, delayMs));
            }
        }
    }
    throw lastErr;
}

function getSourceProvider(chainId) {
    if (!sourceProviders[chainId]) {
        const cfg = CHAINS[chainId];
        if (!cfg) throw new Error(`Unknown chainId: ${chainId}`);
        sourceProviders[chainId] = new ethers.JsonRpcProvider(cfg.rpcUrl);
    }
    return sourceProviders[chainId];
}

function getInboxContract(chainId) {
    if (!inboxContracts[chainId]) {
        const cfg = CHAINS[chainId];
        const prov = getSourceProvider(chainId);
        const abi = loadABI('EthBridgeInbox');
        if (!abi || !cfg.inboxAddress) return null;
        inboxContracts[chainId] = new ethers.Contract(cfg.inboxAddress, abi, prov);
    }
    return inboxContracts[chainId];
}

// ─── CoinGecko price cache ────────────────────────────────────────────────
let cgCache = { priceUSD: 0, fetchedAt: 0 };
const CG_CACHE_TTL_MS = 30_000; // 30 s → ≤2 req/min in normal use

async function fetchEthPriceCoinGecko() {
    const now = Date.now();
    if (cgCache.priceUSD > 0 && now - cgCache.fetchedAt < CG_CACHE_TTL_MS) {
        return cgCache.priceUSD;
    }
    // Simple fetch without node-fetch dep - use built-in fetch (Node 18+)
    const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
        { headers: { 'Accept': 'application/json' } }
    );
    if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
    const data = await res.json();
    const price = data?.ethereum?.usd;
    if (!price || typeof price !== 'number') throw new Error('CoinGecko: unexpected response');
    cgCache = { priceUSD: price, fetchedAt: now };
    console.log(`[bridge] CoinGecko ETH/USD: $${price}`);
    return price;
}

// ─── Compute mUSDC out ────────────────────────────────────────────────────
// ethWei: bigint (18-dec), ethPriceUSD: number → mUSDCOut: bigint (6-dec)
function computeMUSDCOut(ethWei, ethPriceUSD) {
    // value_usd = ethWei * ethPriceUSD / 1e18
    // mUSDCOut (6-dec) = value_usd * 1e6 * (1 - feeBps/10000)
    // = ethWei * ethPriceUSD * (10000 - feeBps) / (10000 * 1e18 / 1e6)
    // = ethWei * ethPriceUSD * (10000 - feeBps) / (10000 * 1e12)
    const feeFactor = BigInt(10000 - BRIDGE_FEE_BPS);
    const priceScaled = BigInt(Math.round(ethPriceUSD * 1e6)); // price × 1e6 for integer math
    // mUSDCOut = ethWei * priceScaled * feeFactor / (10000n * 1e18n * 1e6n / 1e6n)
    //          = ethWei * priceScaled * feeFactor / (10000n * 1e18n)
    const mUSDCOut = (ethWei * priceScaled * feeFactor) / (10_000n * 10n ** 18n);
    return mUSDCOut;
}

// ─── Price sanity check (CoinGecko vs Chainlink) ─────────────────────────
async function verifySanity(chainId, cgPrice) {
    const cfg = CHAINS[chainId];
    if (!cfg?.chainlinkEthUsd) return; // no Chainlink feed for this chain
    try {
        const prov = getSourceProvider(chainId);
        const { priceUSD: clPrice } = await getChainlinkEthUsd(prov, cfg.chainlinkEthUsd);
        const divergencePct = Math.abs(cgPrice - clPrice) / clPrice * 100;
        console.log(`[bridge] Chainlink ETH/USD: $${clPrice.toFixed(2)} CoinGecko: $${cgPrice.toFixed(2)} divergence: ${divergencePct.toFixed(2)}%`);
        if (divergencePct > MAX_PRICE_DIVERGENCE_PCT) {
            throw new Error(
                `Price divergence too high: CoinGecko $${cgPrice.toFixed(2)} vs Chainlink $${clPrice.toFixed(2)} (${divergencePct.toFixed(2)}% > ${MAX_PRICE_DIVERGENCE_PCT}%)`
            );
        }
    } catch (err) {
        if (err.message.startsWith('Price divergence')) throw err;
        // Network error reading Chainlink - log and continue (non-blocking)
        console.warn('[bridge] Chainlink sanity check failed (non-fatal):', err.message);
    }
}

// ─── EthDeposited event ABI fragment ─────────────────────────────────────
const ETH_DEPOSITED_TOPIC = ethers.id('EthDeposited(uint256,address,uint256,bytes32)');

// ─── Public API ──────────────────────────────────────────────────────────

/**
 * Get a live ETH→mUSDC quote for the given ETH amount.
 * @param {number} chainId
 * @param {string} ethAmountEth  e.g. "0.01"
 */
async function getQuote(chainId, ethAmountEth) {
    const chain = CHAINS[chainId];
    if (!chain) throw new Error(`Unsupported chainId: ${chainId}`);

    const ethPriceUSD = await fetchEthPriceCoinGecko();
    const ethWei = ethers.parseEther(String(ethAmountEth));
    const mUSDCOut = computeMUSDCOut(ethWei, ethPriceUSD);

    return {
        ethAmountEth: String(ethAmountEth),
        ethPriceUSD,
        mUSDCOut: mUSDCOut.toString(),
        mUSDCOutHuman: (Number(mUSDCOut) / 1e6).toFixed(6),
        feeBps: BRIDGE_FEE_BPS,
        feePct: `${(BRIDGE_FEE_BPS / 100).toFixed(2)}%`,
        freshAt: new Date(cgCache.fetchedAt).toISOString(),
        chainName: chain.name,
    };
}

/**
 * Verify a deposit on the source chain and mint mUSDC on Hub.
 * @param {number} chainId
 * @param {string} txHash       Transaction hash on source chain
 * @param {string} hubRecipient Hub EVM address (0x…)
 */
async function processDeposit(chainId, txHash, hubRecipient) {
    const chain = CHAINS[chainId];
    if (!chain) throw new Error(`Unsupported chainId: ${chainId}`);
    if (!chain.inboxAddress) throw new Error(`Inbox not deployed for chain ${chainId}`);
    if (!minterContract) throw new Error('Minter contract not initialised');

    hubRecipient = ethers.getAddress(hubRecipient);

    // ═══════════════════════════════════════════════════════════════════════
    // [SOURCE CHAIN: e.g. Ethereum Sepolia]  - verify the lock tx on-chain
    // ═══════════════════════════════════════════════════════════════════════

    const srcProvider = getSourceProvider(chainId);
    let receipt;
    try {
        receipt = await srcProvider.getTransactionReceipt(txHash);
    } catch (err) {
        throw new Error(`[${chain.name}] Failed to fetch receipt: ${err.message}`);
    }
    if (!receipt) throw new Error(`[${chain.name}] Transaction not found or not yet mined`);
    if (receipt.status !== 1) throw new Error(`[${chain.name}] Source transaction reverted`);
    if (receipt.to?.toLowerCase() !== chain.inboxAddress) {
        throw new Error(`[${chain.name}] Transaction was not sent to inbox (got ${receipt.to})`);
    }

    // Parse EthDeposited(uint256 indexed depositId, address indexed from, uint256 amount, bytes32 indexed hubRecipient)
    // topic[0] = event sig, topic[1] = depositId, topic[2] = from, topic[3] = hubRecipient
    const log = receipt.logs.find(
        l => l.topics[0] === ETH_DEPOSITED_TOPIC &&
            l.address.toLowerCase() === chain.inboxAddress
    );
    if (!log) throw new Error(`[${chain.name}] EthDeposited event not found in receipt`);

    const fromAddr = ethers.getAddress('0x' + log.topics[2].slice(26));
    const emittedRecip = log.topics[3];       // bytes32
    const decodedRecip = ethers.getAddress('0x' + emittedRecip.slice(26));
    const ethAmount = ethers.toBigInt(log.data); // uint256 amount in data

    if (decodedRecip.toLowerCase() !== hubRecipient.toLowerCase()) {
        throw new Error(`[${chain.name}] hubRecipient mismatch: event has ${decodedRecip}, request has ${hubRecipient}`);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // [PRICE ORACLE]  - CoinGecko price + Chainlink sanity check
    // ═══════════════════════════════════════════════════════════════════════

    const ethPriceUSD = await fetchEthPriceCoinGecko();
    await verifySanity(chainId, ethPriceUSD);

    const mUSDCOut = computeMUSDCOut(ethAmount, ethPriceUSD);
    if (mUSDCOut === 0n) throw new Error('[Price Oracle] Computed mUSDCOut is zero (deposit too small?)');

    // ═══════════════════════════════════════════════════════════════════════
    // [HUB: Polkadot Hub]  - idempotency check then mint mUSDC, with retry
    // ═══════════════════════════════════════════════════════════════════════

    const existing = await minterContract.deposits(txHash);
    if (existing.timestamp !== 0n) throw new Error('[Hub] Deposit already processed');

    const txBytes32 = txHash.startsWith('0x') && txHash.length === 66
        ? txHash
        : ethers.zeroPadValue(txHash, 32);

    console.log(`[bridge][${chain.name}→Hub] Processing deposit: ethAmount=${ethers.formatEther(ethAmount)} price=$${ethPriceUSD} mUSDCOut=${Number(mUSDCOut) / 1e6}`);

    // Retry up to 3× - safe because Hub minter is idempotent (rejects duplicate txHash)
    const { hubTx, hubReceipt } = await withRetry(async () => {
        const hubGas = await getHubGasOverrides();
        const hubTx = await minterContract.processDeposit(
            txBytes32,
            hubRecipient,
            fromAddr,
            ethAmount,
            mUSDCOut,
            chainId,
            hubGas
        );
        const hubReceipt = await hubTx.wait();
        return { hubTx, hubReceipt };
    }, { attempts: 3, delayMs: 5000, label: 'Hub processDeposit' });

    console.log(`[bridge][Hub] Minted ${Number(mUSDCOut) / 1e6} mUSDC → ${hubRecipient} | hubTx=${hubTx.hash}`);

    return {
        ok: true,
        hubTx: hubTx.hash,
        hubBlock: hubReceipt.blockNumber,
        mUSDCMinted: mUSDCOut.toString(),
        mUSDCHuman: (Number(mUSDCOut) / 1e6).toFixed(6),
        ethPriceUSD,
        sourceChain: chain.name,
        from: fromAddr,
        hubRecipient,
    };
}

/**
 * [Hub → Source Chain] Finalise a redeem: verify Hub state then release ETH.
 * Flow:
 *   [Hub]           read deposit record - verify redeemed=true
 *   [Source Chain]  inbox.adminWithdraw() releases locked ETH to sourceUser, with retry
 *
 * @param {string} sourceTxHash  Original source-chain deposit tx hash
 */
async function processRedeem(sourceTxHash) {
    if (!minterContract) throw new Error('Minter contract not initialised');

    // ═══════════════════════════════════════════════════════════════════════
    // [HUB: Polkadot Hub]  - read-only, verify on-chain state
    // ═══════════════════════════════════════════════════════════════════════

    const rec = await minterContract.deposits(sourceTxHash);
    if (rec.timestamp === 0n) throw new Error('[Hub] Unknown deposit - sourceTxHash not found in minter');
    if (!rec.redeemed) throw new Error('[Hub] initiateRedeem not yet confirmed - try again shortly');

    const sourceChainId = Number(rec.sourceChainId);
    const sourceUser = rec.sourceUser;
    const ethAmount = rec.ethAmount;

    const chain = CHAINS[sourceChainId];
    if (!chain) throw new Error(`Unsupported sourceChainId: ${sourceChainId}`);
    if (!chain.inboxAddress) throw new Error(`Inbox not deployed for chain ${sourceChainId}`);

    // ═══════════════════════════════════════════════════════════════════════
    // [SOURCE CHAIN: e.g. Ethereum Sepolia]  - release locked ETH from inbox
    // ═══════════════════════════════════════════════════════════════════════

    const srcProvider = getSourceProvider(sourceChainId);
    const srcWallet = new ethers.Wallet(KEY, srcProvider);

    const inboxAbi = loadABI('EthBridgeInbox');
    if (!inboxAbi) throw new Error('EthBridgeInbox ABI missing - run forge build');
    const inbox = new ethers.Contract(chain.inboxAddress, inboxAbi, srcWallet);

    // Balance guard - inbox must hold enough ETH to cover this redeem
    const locked = await srcProvider.getBalance(chain.inboxAddress);
    if (locked < ethAmount) {
        throw new Error(
            `[${chain.name}] Inbox insufficient ETH: ` +
            `locked=${ethers.formatEther(locked)} need=${ethers.formatEther(ethAmount)}`
        );
    }

    console.log(`[bridge][Hub→${chain.name}] adminWithdraw ${ethers.formatEther(ethAmount)} ETH → ${sourceUser}`);

    // Release ETH - retry up to 3× if source-chain RPC is flaky
    // Safe to retry: adminWithdraw releases from inbox balance, not relayer wallet
    const { tx, receipt } = await withRetry(async () => {
        const tx = await inbox.adminWithdraw(sourceUser, ethAmount);
        const receipt = await tx.wait();
        return { tx, receipt };
    }, { attempts: 3, delayMs: 5000, label: `${chain.name} adminWithdraw` });

    console.log(`[bridge][${chain.name}] ETH released | tx=${tx.hash} amount=${ethers.formatEther(ethAmount)}`);

    return {
        ok: true,
        ethSentWei: ethAmount.toString(),
        ethSentHuman: ethers.formatEther(ethAmount),
        recipient: sourceUser,
        sourceChainId,
        relayTxHash: tx.hash,
        relayBlock: receipt.blockNumber,
        explorerUrl: `${chain.explorerUrl}/tx/${tx.hash}`,
    };
}

/**
 * Get status of a deposit by reading on-chain minter record.
 * @param {string} txHash  Source chain tx hash
 */
async function getDepositStatus(txHash) {
    if (!minterContract) throw new Error('Minter contract not initialised');
    const rec = await minterContract.deposits(txHash);
    if (rec.timestamp === 0n) return { status: 'pending' };
    return {
        status: rec.redeemed ? 'redeemed' : 'minted',
        sourceChainId: Number(rec.sourceChainId),
        sourceUser: rec.sourceUser,
        hubRecipient: rec.hubRecipient,
        ethAmount: rec.ethAmount.toString(),
        mUSDCMinted: rec.mUSDCMinted.toString(),
        mUSDCHuman: (Number(rec.mUSDCMinted) / 1e6).toFixed(6),
        timestamp: Number(rec.timestamp),
        redeemed: rec.redeemed,
    };
}

// ─── Startup ──────────────────────────────────────────────────────────────
function start() {
    if (!KEY) {
        console.warn('[bridge] KEY not set - bridge relayer disabled');
        return;
    }
    if (!HUB.minter) {
        console.warn('[bridge] MINTER_ADDR not set - bridge relayer disabled (set after deploy)');
        return;
    }

    const minterAbi = loadABI('KredioBridgeMinter');
    if (!minterAbi) {
        console.warn('[bridge] KredioBridgeMinter ABI missing - run forge build');
        return;
    }

    hubProvider = new ethers.JsonRpcProvider(HUB.rpcUrl);
    hubWallet = new ethers.Wallet(KEY, hubProvider);
    minterContract = new ethers.Contract(HUB.minter, minterAbi, hubWallet);

    // Validate each chain inbox is configured
    for (const [id, chain] of Object.entries(CHAINS)) {
        if (!chain.inboxAddress) {
            console.warn(`[bridge] Chain ${id} (${chain.name}): INBOX_ADDR_${id} not set - deposits from this chain disabled`);
        } else {
            console.log(`[bridge] Chain ${id} (${chain.name}): inbox=${chain.inboxAddress}`);
        }
    }

    console.log(`[bridge] Relayer ready | minter=${HUB.minter} hub=${HUB.rpcUrl}`);
}

module.exports = { start, getQuote, processDeposit, processRedeem, getDepositStatus };
