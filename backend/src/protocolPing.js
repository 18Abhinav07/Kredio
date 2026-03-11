'use strict';
// backend/src/protocolPing.js
//
// Periodic background pings for the three deployed contracts that have no
// core-service integration:  GovernanceCache, KredioAccountRegistry, KredioSwap.
//
// ┌─────────────────────────────────────────────────────────────────────────┐
// │  Contract          │ What we do                          │ Interval     │
// ├─────────────────────────────────────────────────────────────────────────┤
// │  GovernanceCache   │ setGovernanceData() - admin tx +    │ every 60 blk │
// │                    │ simulated governance votes          │              │
// │  AccountRegistry   │ attestedLink / attestedUnlink cycle │ every 300 blk│
// │                    │ - emits AccountLinked / Unlinked    │              │
// │  KredioSwap        │ quoteSwap() + reserveBalance()      │ every 50 blk │
// │                    │ view-only; result logged locally    │              │
// └─────────────────────────────────────────────────────────────────────────┘
//
// Rules:
//  - NO integration with core lending/bridge/yield-strategy logic.
//  - Safe-guards: all state-changing calls inside try/catch, never throw.
//  - Does NOT modify any existing service or contract's core state.

const { ethers } = require('ethers');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const RPC_URL = process.env.RPC || 'https://eth-rpc-testnet.polkadot.io/';
const KEY = process.env.KEY;

// ─── Contract addresses (fixed per deployment) ───────────────────────────────
const GOV_CACHE_ADDR = '0xe4DE7eadE2c0A65BdA6863Ad7bA22416c77F3e55';
const ACCOUNT_REG_ADDR = '0xBf7ac0e6f0024ED0F2Cf2efb3669E7c389258BFf';
const SWAP_ADDR = '0xaF1d183F4550500Beb517A3249780290A88E6e39';

// ─── ABIs (minimal) ──────────────────────────────────────────────────────────
const GOV_CACHE_ABI = [
    'function setGovernanceData(address user, uint64 voteCount, uint8 maxConviction) external',
    'function getGovernanceData(address user) view returns (uint64, uint8, uint256)',
];

const ACCOUNT_REG_ABI = [
    'function attestedLink(address evmAddress, bytes32 substratePublicKey) external',
    'function attestedUnlink(address evmAddress) external',
    'function substrateKeyOf(address) view returns (bytes32)',
    'event AccountLinked(address indexed evmAddress, bytes32 indexed substrateKey, bool adminAttested, uint256 linkedAt)',
    'event AccountUnlinked(address indexed evmAddress, bytes32 indexed substrateKey)',
];

const SWAP_ABI = [
    'function quoteSwap(uint256 pasWei) view returns (uint256)',
    'function reserveBalance() view returns (uint256)',
];

// ─── Setup ───────────────────────────────────────────────────────────────────
let provider, wallet, govCache, accountReg, swap;

// ─── State ───────────────────────────────────────────────────────────────────
let lastGovBlock = 0n;
let lastRegBlock = 0n;
let lastSwapBlock = 0n;
let regNonce = 1;     // incremented to generate unique substrate keys

const GOV_INTERVAL = 60n;   // ~6 min (60 blocks × 6s)
const REG_INTERVAL = 300n;  // ~30 min
const SWAP_INTERVAL = 50n;   // ~5 min

// ─── GovernanceCache ─────────────────────────────────────────────────────────

async function pingGovernanceCache(blockNumber) {
    if (!govCache) return;
    const block = BigInt(blockNumber);
    if (block < lastGovBlock + GOV_INTERVAL) return;
    lastGovBlock = block;

    // Simulate evolving governance participation for the deployer address.
    // voteCount and conviction vary with block so each update looks distinct.
    const voteCount = BigInt(10 + Number(block % 50n));   // 10–59 votes
    const conviction = Number((block / 100n) % 6n);        // conviction tier 0–5

    try {
        const tx = await govCache.setGovernanceData(wallet.address, voteCount, conviction);
        await tx.wait();
        console.log(`[protocolPing] GovernanceCache.setGovernanceData() ✓  votes=${voteCount} conviction=${conviction}  tx:${tx.hash}`);
    } catch (err) {
        console.warn('[protocolPing] GovernanceCache.setGovernanceData() failed:', err.message);
    }
}

// ─── KredioAccountRegistry ───────────────────────────────────────────────────

async function pingAccountRegistry(blockNumber) {
    if (!accountReg) return;
    const block = BigInt(blockNumber);
    if (block < lastRegBlock + REG_INTERVAL) return;
    lastRegBlock = block;

    try {
        const existingKey = await accountReg.substrateKeyOf(wallet.address);
        if (existingKey !== ethers.ZeroHash) {
            // Cycle: unlink current key first
            const tx1 = await accountReg.attestedUnlink(wallet.address);
            await tx1.wait();
            console.log(`[protocolPing] AccountRegistry.attestedUnlink() ✓  tx:${tx1.hash}`);
        }

        // Build a deterministic, unique, non-zero 32-byte substrate key
        const subKey = ethers.keccak256(
            ethers.AbiCoder.defaultAbiCoder().encode(
                ['address', 'uint256'],
                [wallet.address, regNonce++],
            )
        );
        const tx2 = await accountReg.attestedLink(wallet.address, subKey);
        await tx2.wait();
        console.log(`[protocolPing] AccountRegistry.attestedLink() ✓  key:${subKey.slice(0, 12)}…  tx:${tx2.hash}`);
    } catch (err) {
        console.warn('[protocolPing] AccountRegistry ping failed:', err.message);
    }
}

// ─── KredioSwap (view-only) ───────────────────────────────────────────────────

async function logSwapQuote(blockNumber) {
    const block = BigInt(blockNumber);
    if (block < lastSwapBlock + SWAP_INTERVAL) return;
    lastSwapBlock = block;

    try {
        const [quote, reserve] = await Promise.all([
            swap.quoteSwap(ethers.parseEther('1')),  // 1 PAS → mUSDC quote
            swap.reserveBalance(),
        ]);
        const quoteUsdc = (Number(quote) / 1e6).toFixed(2);
        const reserveUsdc = (Number(reserve) / 1e6).toFixed(2);
        console.log(`[protocolPing] KredioSwap  1 PAS → ${quoteUsdc} mUSDC  reserve:${reserveUsdc} mUSDC`);
    } catch (err) {
        // Non-fatal - oracle may be in crash mode during this poll
        console.warn('[protocolPing] KredioSwap.quoteSwap() error:', err.message);
    }
}

// ─── Poll loop ───────────────────────────────────────────────────────────────

function setupPolling(startBlock) {
    let lastBlock = startBlock;

    const poll = async () => {
        try {
            const block = await provider.getBlockNumber();
            if (block <= lastBlock) return;
            lastBlock = block;

            // View call is safe to run always
            await logSwapQuote(block);

            // State-changing calls only if we have a signer
            if (wallet) {
                await pingGovernanceCache(block);
                await pingAccountRegistry(block);
            }
        } catch (err) {
            console.error('[protocolPing] poll error:', err.message);
        }
    };

    poll();
    setInterval(poll, 12_000);  // poll every ~2 blocks
}

// ─── Startup ─────────────────────────────────────────────────────────────────

async function start() {
    if (!KEY) {
        console.warn('[protocolPing] KEY not set - running in read-only mode (GovernanceCache/AccountRegistry pings disabled)');
    }

    provider = new ethers.JsonRpcProvider(RPC_URL);

    if (KEY) {
        wallet = new ethers.Wallet(KEY, provider);
        govCache = new ethers.Contract(GOV_CACHE_ADDR, GOV_CACHE_ABI, wallet);
        accountReg = new ethers.Contract(ACCOUNT_REG_ADDR, ACCOUNT_REG_ABI, wallet);
    }
    swap = new ethers.Contract(SWAP_ADDR, SWAP_ABI, provider);

    const block = await provider.getBlockNumber();
    console.log(`[protocolPing] started at block ${block}`);
    console.log(`[protocolPing]   GovernanceCache    ${GOV_CACHE_ADDR}  (every ${GOV_INTERVAL} blk)`);
    console.log(`[protocolPing]   AccountRegistry    ${ACCOUNT_REG_ADDR}  (every ${REG_INTERVAL} blk)`);
    console.log(`[protocolPing]   KredioSwap         ${SWAP_ADDR}  (quote every ${SWAP_INTERVAL} blk)`);

    setupPolling(block);
}

module.exports = { start };
