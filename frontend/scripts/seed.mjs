/**
 * seed.mjs - Protocol seeding script
 *
 * Lenders  : PRIVATE_KEY  and  PRIVATE_KEY_2  → deposit mUSDC into both pools
 * Borrowers: KEY2  and  KEY3  → borrow mUSDC in lending market (mUSDC collateral)
 *                                           + borrow mUSDC in PAS market (native PAS collateral)
 *
 * Run from frontend/: node scripts/seed.mjs
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
    createWalletClient,
    createPublicClient,
    http,
    parseUnits,
    formatUnits,
    encodeFunctionData,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

// ─── Config ───────────────────────────────────────────────────────────────────

const __dir = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dir, '../../contracts/.env');

function readEnv(path) {
    const raw = readFileSync(path, 'utf8');
    const out = {};
    for (const line of raw.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx === -1) continue;
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        out[key] = val;
    }
    return out;
}

const env = readEnv(envPath);

const RPC = 'https://eth-rpc-testnet.polkadot.io/';
const CHAIN_ID = 420420417;

const CONTRACTS = {
    LENDING: '0x0415C54C2F1b499EA03697A9Db77a1d5d640F4Bf',
    PAS_MARKET: '0x05d9B20573A6C7500d8b320902B473e1A442dbA5',
    MUSDC: '0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646',
    ORACLE: '0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7',
};

// Amount constants (all mUSDC = 6 decimals)
const LENDER_DEPOSIT_LENDING = parseUnits('8000', 6);    // each lender seeds 8k into lending pool
const LENDER_DEPOSIT_PAS = parseUnits('5000', 6);    // each lender seeds 5k into PAS pool
const BORROWER_COLLATERAL = parseUnits('3000', 6);    // each borrower puts 3k mUSDC as collateral in lending
const PAS_COLLATERAL_WEI = BigInt('300000000000000000000'); // 300 PAS as collateral in PAS market
const PAS_FUND_AMOUNT = BigInt('350000000000000000000'); // 350 PAS sent to each borrower wallet

// ─── Chain definition ─────────────────────────────────────────────────────────

const chain = {
    id: CHAIN_ID,
    name: 'Polkadot Hub Testnet',
    nativeCurrency: { name: 'PAS', symbol: 'PAS', decimals: 18 },
    rpcUrls: { default: { http: [RPC] } },
};

// ─── ABIs (minimal) ───────────────────────────────────────────────────────────

const ERC20_ABI = [
    { type: 'function', name: 'balanceOf', inputs: [{ name: 'a', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'allowance', inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'approve', inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ type: 'bool' }], stateMutability: 'nonpayable' },
    { type: 'function', name: 'mint', inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
];

const LENDING_ABI = [
    { type: 'function', name: 'deposit', inputs: [{ name: 'amount', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
    { type: 'function', name: 'depositCollateral', inputs: [{ name: 'amount', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
    { type: 'function', name: 'borrow', inputs: [{ name: 'borrowAmount', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
    { type: 'function', name: 'getScore', inputs: [{ name: 'user', type: 'address' }], outputs: [{ type: 'uint64' }, { type: 'uint8' }, { type: 'uint32' }, { type: 'uint32' }], stateMutability: 'view' },
    { type: 'function', name: 'positions', inputs: [{ name: 'user', type: 'address' }], outputs: [{ type: 'uint256' }, { type: 'uint256' }, { type: 'uint256' }, { type: 'uint32' }, { type: 'uint32' }, { type: 'uint8' }, { type: 'bool' }], stateMutability: 'view' },
    { type: 'function', name: 'depositBalance', inputs: [{ name: 'user', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'pendingYield', inputs: [{ name: 'user', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'totalDeposited', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'totalBorrowed', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'collateralBalance', inputs: [{ name: 'user', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'accruedInterest', inputs: [{ name: 'borrower', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
];

const PAS_MARKET_ABI = [
    { type: 'function', name: 'deposit', inputs: [{ name: 'amount', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
    { type: 'function', name: 'depositCollateral', inputs: [], outputs: [], stateMutability: 'payable' },
    { type: 'function', name: 'borrow', inputs: [{ name: 'borrowAmount', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
    { type: 'function', name: 'positions', inputs: [{ name: 'user', type: 'address' }], outputs: [{ type: 'uint256' }, { type: 'uint256' }, { type: 'uint32' }, { type: 'uint256' }, { type: 'uint8' }, { type: 'bool' }], stateMutability: 'view' },
    { type: 'function', name: 'depositBalance', inputs: [{ name: 'user', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'pendingYield', inputs: [{ name: 'user', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'totalDeposited', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'totalBorrowed', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'collateralBalance', inputs: [{ name: 'user', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'accruedInterest', inputs: [{ name: 'borrower', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'ltvBps', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'getOraclePrice', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
];

const ORACLE_ABI = [
    { type: 'function', name: 'latestAnswer', inputs: [], outputs: [{ type: 'int256' }], stateMutability: 'view' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normaliseKey(k) {
    return k.startsWith('0x') ? k : `0x${k}`;
}

function fmt6(v) { return `${formatUnits(v, 6)} mUSDC`; }
function fmt18(v) { return `${formatUnits(v, 18)} PAS`; }

function log(msg) { console.log(`  ${msg}`); }
function section(title) { console.log(`\n${'─'.repeat(60)}\n  ${title}\n${'─'.repeat(60)}`); }
function ok(msg) { console.log(`  ✓ ${msg}`); }
function warn(msg) { console.log(`  ⚠  ${msg}`); }

async function sendTx(walletClient, publicClient, params, label) {
    const gas = await publicClient.estimateGas({ ...params, account: walletClient.account });
    const hash = await walletClient.sendTransaction({ ...params, gas: gas + (gas / 5n) });
    log(`  ${label} → tx ${hash}`);
    const receipt = await publicClient.waitForTransactionReceipt({ hash, timeout: 120_000 });
    if (receipt.status === 'reverted') throw new Error(`REVERTED: ${label}`);
    ok(`${label} confirmed (block ${receipt.blockNumber})`);
    return receipt;
}

async function approveIfNeeded(walletClient, publicClient, spender, amount, label) {
    const owner = walletClient.account.address;
    const current = await publicClient.readContract({
        address: CONTRACTS.MUSDC, abi: ERC20_ABI,
        functionName: 'allowance', args: [owner, spender],
    });
    if (current >= amount) { log(`${label} allowance already sufficient`); return; }
    await sendTx(walletClient, publicClient, {
        to: CONTRACTS.MUSDC,
        data: encodeFunctionData({ abi: ERC20_ABI, functionName: 'approve', args: [spender, amount * 10n] }),
    }, `${label} approve`);
}

async function usdcBalance(publicClient, addr) {
    return publicClient.readContract({ address: CONTRACTS.MUSDC, abi: ERC20_ABI, functionName: 'balanceOf', args: [addr] });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const PK_ADMIN = normaliseKey(env.PRIVATE_KEY);
const PK_LEND2 = normaliseKey(env.PRIVATE_KEY_2);
const PK_BORROW1 = normaliseKey(env.KEY2);
const PK_BORROW2 = normaliseKey(env.KEY3);

const acctAdmin = privateKeyToAccount(PK_ADMIN);
const acctLend2 = privateKeyToAccount(PK_LEND2);
const acctB1 = privateKeyToAccount(PK_BORROW1);
const acctB2 = privateKeyToAccount(PK_BORROW2);

const transport = http(RPC);

const pub = createPublicClient({ chain, transport });

function wallet(account) {
    return createWalletClient({ account, chain, transport });
}

const wAdmin = wallet(acctAdmin);
const wLend2 = wallet(acctLend2);
const wB1 = wallet(acctB1);
const wB2 = wallet(acctB2);

console.log('\n═══════════════════════════════════════════════════');
console.log('  Tesseract / Kredio - Protocol Seeding Script');
console.log('═══════════════════════════════════════════════════');
log(`Admin   / Lender-1 : ${acctAdmin.address}`);
log(`Lender-2           : ${acctLend2.address}`);
log(`Borrower-1         : ${acctB1.address}`);
log(`Borrower-2         : ${acctB2.address}`);

// ─── 1. Mint mUSDC to all participants ────────────────────────────────────────

section('STEP 1 - Mint mUSDC to all participants');
// MockUSDC has no access control on mint() - anyone can call it
const LEND1_USDC_NEEDED = LENDER_DEPOSIT_LENDING + LENDER_DEPOSIT_PAS + parseUnits('1000', 6);
const LEND2_USDC_NEEDED = LENDER_DEPOSIT_LENDING + LENDER_DEPOSIT_PAS + parseUnits('1000', 6);
const BORR_USDC_NEEDED = BORROWER_COLLATERAL + parseUnits('1000', 6);

for (const [w, amt, label] of [
    [wAdmin, LEND1_USDC_NEEDED, 'Lender-1'],
    [wLend2, LEND2_USDC_NEEDED, 'Lender-2'],
    [wB1, BORR_USDC_NEEDED, 'Borrower-1'],
    [wB2, BORR_USDC_NEEDED, 'Borrower-2'],
]) {
    const bal = await usdcBalance(pub, w.account.address);
    if (bal >= amt) { log(`${label} already has ${fmt6(bal)}, skipping mint`); continue; }
    const needed = amt - bal;
    await sendTx(w, pub, {
        to: CONTRACTS.MUSDC,
        data: encodeFunctionData({ abi: ERC20_ABI, functionName: 'mint', args: [w.account.address, needed] }),
    }, `mint ${fmt6(needed)} mUSDC → ${label}`);
}

// ─── 2. Fund borrower wallets with PAS for gas + collateral ───────────────────

section('STEP 2 - Fund borrower wallets with PAS (gas + collateral)');
for (const [acct, label] of [[acctB1, 'Borrower-1'], [acctB2, 'Borrower-2']]) {
    const pasBal = await pub.getBalance({ address: acct.address });
    log(`${label} PAS balance: ${fmt18(pasBal)}`);
    // Need at least PAS_COLLATERAL_WEI + 10 PAS buffer for gas
    const needed = PAS_COLLATERAL_WEI + parseUnits('15', 18);
    if (pasBal >= needed) {
        ok(`${label} has enough PAS already`);
        continue;
    }
    const toSend = needed - pasBal + parseUnits('5', 18); // small extra buffer
    log(`Sending ${fmt18(toSend)} PAS to ${label} from admin...`);
    await sendTx(wAdmin, pub, { to: acct.address, value: toSend, data: '0x' }, `fund PAS → ${label}`);
}

// ─── 3. Lenders deposit mUSDC into KredioLending ─────────────────────────────

section('STEP 3 - Lenders deposit mUSDC into KredioLending (lending pool)');
for (const [w, amt, label] of [
    [wAdmin, LENDER_DEPOSIT_LENDING, 'Lender-1'],
    [wLend2, LENDER_DEPOSIT_LENDING, 'Lender-2'],
]) {
    const existing = await pub.readContract({ address: CONTRACTS.LENDING, abi: LENDING_ABI, functionName: 'depositBalance', args: [w.account.address] });
    if (existing >= amt) { log(`${label} already deposited ${fmt6(existing)}, skipping`); continue; }
    await approveIfNeeded(w, pub, CONTRACTS.LENDING, amt, label);
    await sendTx(w, pub, {
        to: CONTRACTS.LENDING,
        data: encodeFunctionData({ abi: LENDING_ABI, functionName: 'deposit', args: [amt] }),
    }, `${label} deposit ${fmt6(amt)} into Lending`);
}

// ─── 4. Lenders deposit mUSDC into KredioPASMarket ───────────────────────────

section('STEP 4 - Lenders deposit mUSDC into KredioPASMarket (liquidity for PAS borrowers)');
for (const [w, amt, label] of [
    [wAdmin, LENDER_DEPOSIT_PAS, 'Lender-1'],
    [wLend2, LENDER_DEPOSIT_PAS, 'Lender-2'],
]) {
    const existing = await pub.readContract({ address: CONTRACTS.PAS_MARKET, abi: PAS_MARKET_ABI, functionName: 'depositBalance', args: [w.account.address] });
    if (existing >= amt) { log(`${label} already deposited ${fmt6(existing)}, skipping`); continue; }
    await approveIfNeeded(w, pub, CONTRACTS.PAS_MARKET, amt, label);
    await sendTx(w, pub, {
        to: CONTRACTS.PAS_MARKET,
        data: encodeFunctionData({ abi: PAS_MARKET_ABI, functionName: 'deposit', args: [amt] }),
    }, `${label} deposit ${fmt6(amt)} into PAS Market`);
}

// ─── 5. Borrowers → KredioLending (mUSDC collateral, mUSDC borrow) ───────────

section('STEP 5 - Borrowers deposit mUSDC collateral + borrow from KredioLending');
for (const [w, label] of [[wB1, 'Borrower-1'], [wB2, 'Borrower-2']]) {
    const pos = await pub.readContract({ address: CONTRACTS.LENDING, abi: LENDING_ABI, functionName: 'positions', args: [w.account.address] });
    const posActive = pos[6];
    if (posActive) { log(`${label} already has an active position in KredioLending, skipping`); continue; }

    // deposit collateral
    const collBal = await pub.readContract({ address: CONTRACTS.LENDING, abi: LENDING_ABI, functionName: 'collateralBalance', args: [w.account.address] });
    if (collBal < BORROWER_COLLATERAL) {
        const topup = BORROWER_COLLATERAL - collBal;
        await approveIfNeeded(w, pub, CONTRACTS.LENDING, topup, label);
        await sendTx(w, pub, {
            to: CONTRACTS.LENDING,
            data: encodeFunctionData({ abi: LENDING_ABI, functionName: 'depositCollateral', args: [topup] }),
        }, `${label} deposit collateral ${fmt6(topup)}`);
    } else {
        log(`${label} collateral already deposited (${fmt6(collBal)})`);
    }

    // compute max borrow from score
    const [, , ratioBps] = await pub.readContract({ address: CONTRACTS.LENDING, abi: LENDING_ABI, functionName: 'getScore', args: [w.account.address] });
    const availableColl = await pub.readContract({ address: CONTRACTS.LENDING, abi: LENDING_ABI, functionName: 'collateralBalance', args: [w.account.address] });
    const maxBorrow = (availableColl * 10000n) / BigInt(ratioBps);
    const borrowAmt = (maxBorrow * 80n) / 100n; // borrow at 80% of max to avoid edge cases
    log(`${label}: ratioBps=${ratioBps}, collateral=${fmt6(availableColl)}, borrowing ${fmt6(borrowAmt)}`);
    await sendTx(w, pub, {
        to: CONTRACTS.LENDING,
        data: encodeFunctionData({ abi: LENDING_ABI, functionName: 'borrow', args: [borrowAmt] }),
    }, `${label} borrow ${fmt6(borrowAmt)} from Lending`);
}

// ─── 6. Borrowers → KredioPASMarket (PAS collateral, mUSDC borrow) ────────────

section('STEP 6 - Borrowers deposit PAS collateral + borrow from KredioPASMarket');

// Read oracle price to compute LTV
let oraclePrice;
try {
    oraclePrice = await pub.readContract({ address: CONTRACTS.ORACLE, abi: ORACLE_ABI, functionName: 'latestAnswer' });
    log(`Oracle PAS/USD price: ${oraclePrice} (8 decimals = $${Number(oraclePrice) / 1e8})`);
} catch {
    warn('Could not read oracle price, assuming $1.00 (1e8)');
    oraclePrice = 100000000n;
}
const ltvBps = await pub.readContract({ address: CONTRACTS.PAS_MARKET, abi: PAS_MARKET_ABI, functionName: 'ltvBps' });

// collateralValue (6 dec) = PAS_WEI (18 dec) * price (8 dec) / 1e20
// collateralValue = PAS_COLLATERAL_WEI * oraclePrice / 1e20
const collValueUsdc = (PAS_COLLATERAL_WEI * BigInt(oraclePrice)) / BigInt(10 ** 20);
const maxPasBorrow = (collValueUsdc * ltvBps) / 10000n;
const pasBorrowAmt = (maxPasBorrow * 80n) / 100n; // 80% of max LTV

log(`PAS collateral: ${fmt18(PAS_COLLATERAL_WEI)}`);
log(`Collateral value: ~${fmt6(collValueUsdc)}`);
log(`Max borrow (${ltvBps}bps LTV): ${fmt6(maxPasBorrow)}, using 80% = ${fmt6(pasBorrowAmt)}`);

for (const [w, label] of [[wB1, 'Borrower-1'], [wB2, 'Borrower-2']]) {
    const pos = await pub.readContract({ address: CONTRACTS.PAS_MARKET, abi: PAS_MARKET_ABI, functionName: 'positions', args: [w.account.address] });
    const posActive = pos[5];
    if (posActive) { log(`${label} already has an active PAS position, skipping`); continue; }

    const pasBal = await pub.getBalance({ address: w.account.address });
    log(`${label} PAS balance: ${fmt18(pasBal)}`);

    // deposit PAS collateral
    const collBal = await pub.readContract({ address: CONTRACTS.PAS_MARKET, abi: PAS_MARKET_ABI, functionName: 'collateralBalance', args: [w.account.address] });
    if (collBal < PAS_COLLATERAL_WEI) {
        const topup = PAS_COLLATERAL_WEI - collBal;
        await sendTx(w, pub, {
            to: CONTRACTS.PAS_MARKET,
            data: encodeFunctionData({ abi: PAS_MARKET_ABI, functionName: 'depositCollateral', args: [] }),
            value: topup,
        }, `${label} deposit ${fmt18(topup)} PAS collateral`);
    } else {
        log(`${label} PAS collateral already deposited (${fmt18(collBal)})`);
    }

    // borrow mUSDC
    log(`${label}: borrowing ${fmt6(pasBorrowAmt)} from PAS Market`);
    await sendTx(w, pub, {
        to: CONTRACTS.PAS_MARKET,
        data: encodeFunctionData({ abi: PAS_MARKET_ABI, functionName: 'borrow', args: [pasBorrowAmt] }),
    }, `${label} borrow ${fmt6(pasBorrowAmt)} from PAS Market`);
}

// ─── 7. Final state report ────────────────────────────────────────────────────

section('FINAL STATE REPORT');

const lendTotal = await pub.readContract({ address: CONTRACTS.LENDING, abi: LENDING_ABI, functionName: 'totalDeposited' });
const lendBorrowed = await pub.readContract({ address: CONTRACTS.LENDING, abi: LENDING_ABI, functionName: 'totalBorrowed' });
const pasTotal = await pub.readContract({ address: CONTRACTS.PAS_MARKET, abi: PAS_MARKET_ABI, functionName: 'totalDeposited' });
const pasBorrowed = await pub.readContract({ address: CONTRACTS.PAS_MARKET, abi: PAS_MARKET_ABI, functionName: 'totalBorrowed' });

console.log('\n  KredioLending (mUSDC market)');
log(`  Total Deposited : ${fmt6(lendTotal)}`);
log(`  Total Borrowed  : ${fmt6(lendBorrowed)}`);
log(`  Utilisation     : ${lendTotal > 0n ? ((Number(lendBorrowed) * 100) / Number(lendTotal)).toFixed(1) : 0}%`);

console.log('\n  KredioPASMarket (PAS collateral market)');
log(`  Total Deposited : ${fmt6(pasTotal)}`);
log(`  Total Borrowed  : ${fmt6(pasBorrowed)}`);
log(`  Utilisation     : ${pasTotal > 0n ? ((Number(pasBorrowed) * 100) / Number(pasTotal)).toFixed(1) : 0}%`);

console.log('\n  Per-wallet summary\n');
for (const [acct, label] of [
    [acctAdmin, 'Lender-1 (admin)'],
    [acctLend2, 'Lender-2'],
    [acctB1, 'Borrower-1'],
    [acctB2, 'Borrower-2'],
]) {
    const ubal = await usdcBalance(pub, acct.address);
    const pbal = await pub.getBalance({ address: acct.address });
    const lDep = await pub.readContract({ address: CONTRACTS.LENDING, abi: LENDING_ABI, functionName: 'depositBalance', args: [acct.address] });
    const pDep = await pub.readContract({ address: CONTRACTS.PAS_MARKET, abi: PAS_MARKET_ABI, functionName: 'depositBalance', args: [acct.address] });
    const lYld = await pub.readContract({ address: CONTRACTS.LENDING, abi: LENDING_ABI, functionName: 'pendingYield', args: [acct.address] });
    const pYld = await pub.readContract({ address: CONTRACTS.PAS_MARKET, abi: PAS_MARKET_ABI, functionName: 'pendingYield', args: [acct.address] });
    const lPos = await pub.readContract({ address: CONTRACTS.LENDING, abi: LENDING_ABI, functionName: 'positions', args: [acct.address] });
    const pPos = await pub.readContract({ address: CONTRACTS.PAS_MARKET, abi: PAS_MARKET_ABI, functionName: 'positions', args: [acct.address] });

    console.log(`  ── ${label} (${acct.address.slice(0, 10)}…)`);
    log(`Wallet: ${fmt6(ubal)} mUSDC | ${fmt18(pbal)} PAS`);
    if (lDep > 0n) log(`Lending deposit: ${fmt6(lDep)} | pending yield: ${fmt6(lYld)}`);
    if (pDep > 0n) log(`PAS Market deposit: ${fmt6(pDep)} | pending yield: ${fmt6(pYld)}`);
    if (lPos[6]) log(`Lending position: debt=${fmt6(lPos[1])}, collateral=${fmt6(lPos[0])}, tier=${lPos[5]}`);
    if (pPos[5]) log(`PAS position: debt=${fmt6(pPos[1])}, collateral=${fmt18(pPos[0])}, tier=${pPos[4]}`);
    console.log('');
}

console.log('═══════════════════════════════════════════════════');
console.log('  Seeding complete. Positions are open and accruing.');
console.log('  Use the Admin page to set globalTick to e.g. 3600');
console.log('  to speed up interest accrual for demos.');
console.log('═══════════════════════════════════════════════════\n');
