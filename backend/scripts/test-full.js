'use strict';
/**
 * test-full.js — Kredio Protocol Comprehensive Test Suite
 *
 * Phases:
 *   0  Current-state snapshot
 *   1  Sweep all contracts to clean default state
 *   2  Fund USER1-USER6 with 200 000 mUSDC + 1 000 PAS each
 *   3  Configure rates, seed pools, wire yield strategy
 *   4  Full test sequence (lend, borrow, yield, liquidate, repay, withdraw)
 *   5  Final state snapshot + structured report
 *
 * Usage:
 *   cd /Users/18abhinav07/Documents/Kredio/backend
 *   node scripts/test-full.js 2>&1 | tee scripts/test-run.log
 */

const { ethers } = require('ethers');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../../contracts/.env') });

// ─── Network ──────────────────────────────────────────────────────────────────
const RPC = process.env.PASSET_RPC || 'https://eth-rpc-testnet.polkadot.io/';
const CHAIN_ID = 420420417;

// ─── Contract addresses ───────────────────────────────────────────────────────
const ADDR = {
    MUSDC: '0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646',
    LENDING: '0x1eDaD1271FB9d1296939C6f4Fb762752b041C64E',
    PAS_MARKET: '0x0F90Fe6141AC29a6031C3ae2155749e9f38a0174',
    YIELD_POOL: '0x1dB4Faad3081aAfe26eC0ef6886F04f28D944AAB',
    ORACLE: '0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7',
};

// Old test addresses whose depositBalance may be stale (included in reset sweep)
const OLD_ADDRS = [
    '0x5EF0a87f578778Fc78cbFe318D3444D71Ff638da', // PRIVATE_KEY_2
    '0x105952E94C36916757785C4F7f92DAf5f1cC99ad', // KEY2
    '0x863930353d628aA250fB98A4Eb2C1bAa649d5617', // KEY3
];

// ─── ABIs ─────────────────────────────────────────────────────────────────────
const MUSDC_ABI = [
    'function balanceOf(address) view returns (uint256)',
    'function approve(address,uint256) returns (bool)',
    'function transfer(address,uint256) returns (bool)',
    'function mint(address,uint256)',
    'function allowance(address,address) view returns (uint256)',
];

const LENDING_ABI = [
    'function deposit(uint256)',
    'function withdraw(uint256)',
    'function depositCollateral(uint256)',
    'function borrow(uint256)',
    'function repay()',
    'function fundReserve(uint256)',
    'function pendingYield(address) view returns (uint256)',
    'function pendingYieldAndHarvest(address)',
    'function totalDeposited() view returns (uint256)',
    'function totalBorrowed() view returns (uint256)',
    'function investedAmount() view returns (uint256)',
    'function globalTick() view returns (uint256)',
    'function protocolFees() view returns (uint256)',
    'function depositBalance(address) view returns (uint256)',
    'function collateralBalance(address) view returns (uint256)',
    'function accruedInterest(address) view returns (uint256)',
    'function utilizationRate() view returns (uint256)',
    'function getScore(address) view returns (uint64 score, uint8 tier, uint32 collateralRatioBps, uint32 interestRateBps)',
    'function getPositionFull(address) view returns (uint256 collateral, uint256 debt, uint256 accrued, uint256 totalOwed, uint32 interestBps, uint8 tier, bool active)',
    'function strategyStatus() view returns (address pool, uint256 invested, uint256 totalEarned, uint256 pendingYield_, uint256 investRatio_, uint256 minBuffer_)',
    'function pendingStrategyYield() view returns (uint256)',
    'function adminHardReset(address)',
    'function adminBulkWithdrawDeposits(address[])',
    'function adminForceCloseAll(address[])',
    'function adminResetUserScores(address[])',
    'function adminSetGlobalTick(uint256)',
    'function adminInvest(uint256)',
    'function adminPullBack(uint256)',
    'function adminClaimAndInjectYield()',
    'function adminTickPool(address[])',
    'function adminSetYieldPool(address)',
    'function adminForceClose(address)',
];

const PAS_MARKET_ABI = [
    'function setRiskParams(uint256,uint256,uint256,uint256)',
    'function deposit(uint256)',
    'function withdraw(uint256)',
    'function depositCollateral() payable',
    'function withdrawCollateral()',
    'function borrow(uint256)',
    'function repay()',
    'function pendingYield(address) view returns (uint256)',
    'function pendingYieldAndHarvest(address)',
    'function totalDeposited() view returns (uint256)',
    'function totalBorrowed() view returns (uint256)',
    'function globalTick() view returns (uint256)',
    'function protocolFees() view returns (uint256)',
    'function ltvBps() view returns (uint256)',
    'function depositBalance(address) view returns (uint256)',
    'function collateralBalance(address) view returns (uint256)',
    'function accruedInterest(address) view returns (uint256)',
    'function utilizationRate() view returns (uint256)',
    'function maxBorrowable(address) view returns (uint256)',
    'function getPositionFull(address) view returns (uint256 collateralPAS, uint256 collateralValueUSDC, uint256 debtUSDC, uint256 accrued, uint256 totalOwed, uint32 interestBps, uint8 tier, bool active)',
    'function adminHardReset(address)',
    'function adminBulkWithdrawDeposits(address[])',
    'function adminForceCloseAll(address[])',
    'function adminResetUserScores(address[])',
    'function adminSetGlobalTick(uint256)',
    'function adminTickPool(address[])',
    'function adminLiquidate(address)',
    'function adminForceClose(address)',
];

const YIELD_POOL_ABI = [
    'function deposit(uint256)',
    'function withdraw(address,uint256)',
    'function claimYield(address) returns (uint256)',
    'function pendingYield(address) view returns (uint256)',
    'function getStake(address) view returns (uint256 principal, uint256 accrued, uint256 pending)',
    'function setYieldRate(uint256)',
    'function totalPrincipal() view returns (uint256)',
    'function yieldRateBps() view returns (uint256)',
];

const ORACLE_ABI = [
    'function latestRoundData() view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)',
    'function latestPrice() view returns (int256)',
    'function normalPrice() view returns (int256)',
    'function updatedAt() view returns (uint256)',
    'function crashed() view returns (bool)',
    'function setPrice(int256)',
    'function recover()',
    'function decimals() view returns (uint8)',
];

// ─── Setup provider ───────────────────────────────────────────────────────────
const provider = new ethers.JsonRpcProvider(RPC, { chainId: CHAIN_ID, name: 'polkadot-hub-testnet' });

function mkWallet(pk) {
    const key = pk && !pk.startsWith('0x') ? '0x' + pk : pk;
    return new ethers.Wallet(key, provider);
}

const admin = mkWallet(process.env.ADMIN);
const users = {
    USER1: mkWallet(process.env.USER1),
    USER2: mkWallet(process.env.USER2),
    USER3: mkWallet(process.env.USER3),
    USER4: mkWallet(process.env.USER4),
    USER5: mkWallet(process.env.USER5),
    USER6: mkWallet(process.env.USER6),
};

// Read-only contract handles (connect a signer for writes)
const musdc = new ethers.Contract(ADDR.MUSDC, MUSDC_ABI, provider);
const lending = new ethers.Contract(ADDR.LENDING, LENDING_ABI, provider);
const pasMarket = new ethers.Contract(ADDR.PAS_MARKET, PAS_MARKET_ABI, provider);
const yieldPool = new ethers.Contract(ADDR.YIELD_POOL, YIELD_POOL_ABI, provider);
const oracle = new ethers.Contract(ADDR.ORACLE, ORACLE_ABI, provider);

// ─── Formatting helpers ───────────────────────────────────────────────────────
const fmt6 = (n) => Number(ethers.formatUnits(n ?? 0n, 6)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
const fmt18 = (n) => Number(ethers.formatEther(n ?? 0n)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
const u6 = (n) => ethers.parseUnits(String(n), 6);
const u18 = (n) => ethers.parseEther(String(n));

// ─── Report infrastructure ────────────────────────────────────────────────────
const REPORT = [];
let stepNum = 0;

/**
 * Execute one test step, capture tx hash, gas and before/after state.
 * @param {string}   actor       - who does the action
 * @param {string}   action      - human description
 * @param {string}   contractName
 * @param {Function} txFn        - async () => tx  (must call .wait() internally)
 * @param {object}   opts
 */
async function step(actor, action, contractName, txFn, opts = {}) {
    stepNum++;
    const entry = {
        step: stepNum,
        actor,
        action,
        contract: contractName,
        expected: opts.expected || '',
        observedBefore: null,
        observedAfter: null,
        txHash: null,
        gasUsed: null,
        status: 'PENDING',
        error: null,
    };
    console.log(`\n  [Step ${stepNum}] ${actor}: ${action}`);

    try {
        if (opts.beforeFn) entry.observedBefore = bigintSafe(await opts.beforeFn());
        const tx = await txFn();
        const receipt = await tx.wait();
        entry.txHash = receipt.hash;
        entry.gasUsed = receipt.gasUsed.toString();
        if (opts.afterFn) entry.observedAfter = bigintSafe(await opts.afterFn());
        entry.status = 'PASS';
        console.log(`     ✓ tx: ${receipt.hash}   gas: ${receipt.gasUsed}`);
    } catch (e) {
        entry.status = 'FAIL';
        entry.error = (e.shortMessage || e.message || String(e)).slice(0, 300);
        console.error(`     ✗ FAILED: ${entry.error}`);
    }

    REPORT.push(entry);
    return entry;
}

async function viewLog(label, fn) {
    try {
        const val = await fn();
        console.log(`  [view] ${label}: ${val}`);
        return val;
    } catch (e) {
        console.error(`  [view] ${label} ERROR: ${e.message?.slice(0, 120)}`);
        return null;
    }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function bigintSafe(obj) {
    if (obj == null) return null;
    return JSON.parse(JSON.stringify(obj, (_, v) => (typeof v === 'bigint' ? v.toString() : v)));
}

// Snapshot pool+account state
async function poolSnap() {
    return {
        lending: {
            totalDeposited: (await lending.totalDeposited()).toString(),
            totalBorrowed: (await lending.totalBorrowed()).toString(),
            investedAmount: (await lending.investedAmount()).toString(),
            globalTick: (await lending.globalTick()).toString(),
            usdcBal: (await musdc.balanceOf(ADDR.LENDING)).toString(),
        },
        pasMarket: {
            totalDeposited: (await pasMarket.totalDeposited()).toString(),
            totalBorrowed: (await pasMarket.totalBorrowed()).toString(),
            usdcBal: (await musdc.balanceOf(ADDR.PAS_MARKET)).toString(),
        },
        yieldPool: {
            totalPrincipal: (await yieldPool.totalPrincipal()).toString(),
            yieldRateBps: (await yieldPool.yieldRateBps()).toString(),
            pendingForLending: (await yieldPool.pendingYield(ADDR.LENDING)).toString(),
        },
    };
}

// ════════════════════════════════════════════════════════════════════════════════
//  MAIN
// ════════════════════════════════════════════════════════════════════════════════
async function main() {
    const startTs = Date.now();
    const bar = '═'.repeat(110);
    console.log('\n' + bar);
    console.log('  KREDIO PROTOCOL — COMPREHENSIVE TEST SUITE');
    console.log('  Run started:', new Date().toISOString());
    console.log(bar + '\n');

    // Print resolved addresses
    console.log('Accounts:');
    console.log(`  ADMIN  : ${admin.address}`);
    for (const [n, w] of Object.entries(users)) console.log(`  ${n.padEnd(6)}: ${w.address}`);
    console.log('\nContracts:');
    for (const [n, a] of Object.entries(ADDR)) console.log(`  ${n.padEnd(10)}: ${a}`);

    const allKnownAddrs = [admin.address, ...OLD_ADDRS, ...Object.values(users).map(w => w.address)];
    const userAddrs = Object.values(users).map(w => w.address);

    // ══════════════════════════════════════════════════════════════════════════
    //  PHASE 0 — CURRENT STATE SNAPSHOT
    // ══════════════════════════════════════════════════════════════════════════
    console.log('\n' + '─'.repeat(110));
    console.log('  PHASE 0 — CURRENT STATE SNAPSHOT');
    console.log('─'.repeat(110));

    // Oracle uses Chainlink latestRoundData() — staleness check happens on-chain
    let oraclePrice = 502069300n; // fallback: $5.02 per PAS (8 decimals)
    try {
        const rd = await oracle.latestRoundData();
        oraclePrice = rd[1]; // int256 answer
        console.log(`\n  PAS oracle answer: ${oraclePrice} (8 decimals = $${(Number(oraclePrice) / 1e8).toFixed(4)} per PAS)`);
        console.log(`  Implies 1 PAS ≈ ${fmt6((BigInt(oraclePrice.toString()) * 10n ** 18n) / 10n ** 20n)} mUSDC`);
    } catch (e) {
        console.log(`  [warn] Oracle latestRoundData failed (${e.shortMessage || e.message?.slice(0, 80)}); using fallback $5.02`);
        console.log(`  Oracle will be refreshed in Phase 3 before borrow tests.`);
    }

    const p0 = await poolSnap();
    console.log('\n  KredioLending:');
    console.log(`    totalDeposited : ${fmt6(BigInt(p0.lending.totalDeposited))} mUSDC`);
    console.log(`    totalBorrowed  : ${fmt6(BigInt(p0.lending.totalBorrowed))} mUSDC`);
    console.log(`    investedAmount : ${fmt6(BigInt(p0.lending.investedAmount))} mUSDC`);
    console.log(`    globalTick     : ${p0.lending.globalTick}`);
    console.log(`    USDC balance   : ${fmt6(BigInt(p0.lending.usdcBal))} mUSDC`);

    console.log('\n  KredioPASMarket:');
    console.log(`    totalDeposited : ${fmt6(BigInt(p0.pasMarket.totalDeposited))} mUSDC`);
    console.log(`    totalBorrowed  : ${fmt6(BigInt(p0.pasMarket.totalBorrowed))} mUSDC`);
    console.log(`    USDC balance   : ${fmt6(BigInt(p0.pasMarket.usdcBal))} mUSDC`);

    console.log('\n  MockYieldPool:');
    console.log(`    totalPrincipal : ${fmt6(BigInt(p0.yieldPool.totalPrincipal))} mUSDC`);
    console.log(`    yieldRateBps   : ${p0.yieldPool.yieldRateBps}`);
    console.log(`    pendingYield   : ${fmt6(BigInt(p0.yieldPool.pendingForLending))} mUSDC`);

    console.log('\n  Account Balances:');
    for (const [n, w] of Object.entries({ ADMIN: admin, ...users })) {
        const mu = await musdc.balanceOf(w.address);
        const pa = await provider.getBalance(w.address);
        console.log(`    ${n.padEnd(6)} ${w.address.slice(0, 10)}... | mUSDC: ${fmt6(mu).padStart(18)} | PAS: ${fmt18(pa).padStart(12)}`);
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  PHASE 1 — SWEEP ALL CONTRACTS CLEAN
    // ══════════════════════════════════════════════════════════════════════════
    console.log('\n' + '─'.repeat(110));
    console.log('  PHASE 1 — SWEEP ALL CONTRACTS CLEAN');
    console.log('─'.repeat(110));

    //─────────────────────────────────────────────────────────────────────────
    //  1A  KredioLending
    //─────────────────────────────────────────────────────────────────────────
    const invested = await lending.investedAmount();
    console.log(`\n  KredioLending investedAmount: ${fmt6(invested)} mUSDC`);

    if (invested > 0n) {
        await step('ADMIN', `Pull back ${fmt6(invested)} mUSDC from yield pool → KredioLending`, 'KredioLending',
            () => lending.connect(admin).adminPullBack(invested),
            { expected: 'investedAmount → 0; contract USDC balance restores; YieldPool principal drops' }
        );
    } else {
        console.log('  [skip] investedAmount already 0');
    }

    // Identify which known addresses have non-zero depositBalance in KredioLending
    const lendingDepositors = [];
    for (const addr of allKnownAddrs) {
        const bal = await lending.depositBalance(addr);
        if (bal > 0n) {
            lendingDepositors.push(addr);
            console.log(`  KredioLending depositBalance[${addr.slice(0, 10)}...] = ${fmt6(bal)}`);
        }
    }
    if (lendingDepositors.length > 0) {
        await step('ADMIN', `Bulk-withdraw ${lendingDepositors.length} depositor(s) from KredioLending`, 'KredioLending',
            () => lending.connect(admin).adminBulkWithdrawDeposits(lendingDepositors),
            { expected: 'depositBalance zeroed for all; USDC returned to depositors' }
        );
    } else {
        console.log('  [skip] No depositors with balance in KredioLending');
    }

    // Force-close any active positions
    await step('ADMIN', 'Force-close all borrower positions in KredioLending', 'KredioLending',
        () => lending.connect(admin).adminForceCloseAll(allKnownAddrs),
        { expected: 'All borrow positions closed; USDC collateral returned; totalBorrowed → 0' }
    );

    // Hard reset: sweeps remaining USDC to admin, zeros all counters
    await step('ADMIN', 'Hard-reset KredioLending (sweep all USDC dust to admin)', 'KredioLending',
        () => lending.connect(admin).adminHardReset(admin.address),
        { expected: 'totalDeposited=0, totalBorrowed=0, accYieldPerShare=0, globalTick=0' }
    );

    // Reset credit scores
    await step('ADMIN', 'Reset credit scores for all known addresses (KredioLending)', 'KredioLending',
        () => lending.connect(admin).adminResetUserScores(allKnownAddrs),
        { expected: 'repaymentCount/liquidationCount/totalDepositedEver = 0 for all' }
    );

    //─────────────────────────────────────────────────────────────────────────
    //  1B  KredioPASMarket
    //─────────────────────────────────────────────────────────────────────────
    await step('ADMIN', 'Force-close all positions in KredioPASMarket (return PAS collateral)', 'KredioPASMarket',
        () => pasMarket.connect(admin).adminForceCloseAll(allKnownAddrs),
        { expected: 'All PAS positions closed; PAS returned to borrowers; totalBorrowed → 0' }
    );

    const pmDepositors = [];
    for (const addr of allKnownAddrs) {
        const bal = await pasMarket.depositBalance(addr);
        if (bal > 0n) pmDepositors.push(addr);
    }
    if (pmDepositors.length > 0) {
        await step('ADMIN', `Bulk-withdraw ${pmDepositors.length} depositor(s) from KredioPASMarket`, 'KredioPASMarket',
            () => pasMarket.connect(admin).adminBulkWithdrawDeposits(pmDepositors),
            { expected: 'PM depositBalances zeroed; mUSDC returned' }
        );
    } else {
        console.log('  [skip] No depositors with balance in KredioPASMarket');
    }

    await step('ADMIN', 'Hard-reset KredioPASMarket', 'KredioPASMarket',
        () => pasMarket.connect(admin).adminHardReset(admin.address),
        { expected: 'PM totalDeposited=0, totalBorrowed=0, accYieldPerShare=0' }
    );

    await step('ADMIN', 'Reset credit scores for all known addresses (KredioPASMarket)', 'KredioPASMarket',
        () => pasMarket.connect(admin).adminResetUserScores(allKnownAddrs),
        { expected: 'PM credit scores cleared' }
    );

    // Verify clean state
    console.log('\n  Verifying clean state:');
    const cleanL = await lending.totalDeposited();
    const cleanPM = await pasMarket.totalDeposited();
    const cleanYP = await yieldPool.totalPrincipal();
    console.log(`  KredioLending.totalDeposited   = ${fmt6(cleanL)}  (expect 0)`);
    console.log(`  KredioPASMarket.totalDeposited = ${fmt6(cleanPM)} (expect 0)`);
    console.log(`  YieldPool.totalPrincipal       = ${fmt6(cleanYP)} (expect 0 after pull-back)`);

    // ══════════════════════════════════════════════════════════════════════════
    //  PHASE 2 — FUND ACCOUNTS
    // ══════════════════════════════════════════════════════════════════════════
    console.log('\n' + '─'.repeat(110));
    console.log('  PHASE 2 — FUND ACCOUNTS (200 000 mUSDC + 1 000 PAS each)');
    console.log('─'.repeat(110));

    const TARGET_MUSDC = u6('200000');
    const TARGET_PAS = u18('1000');

    for (const [name, usr] of Object.entries(users)) {
        const curMusdc = await musdc.balanceOf(usr.address);
        const curPas = await provider.getBalance(usr.address);
        console.log(`\n  ${name} (${usr.address.slice(0, 10)}...)  mUSDC=${fmt6(curMusdc)}  PAS=${fmt18(curPas)}`);

        // Mint exactly 200 000 mUSDC (MockUSDC.mint is permissionless)
        await step('ADMIN', `Mint 200,000 mUSDC to ${name}`, 'MockUSDC',
            () => musdc.connect(admin).mint(usr.address, TARGET_MUSDC),
            { expected: `${name}.mUSDC = 200 000 (fresh mint)` }
        );

        // Top-up PAS from admin if user < 900 PAS (keep 1050 to cover gas)
        if (curPas < u18('900')) {
            const toSend = TARGET_PAS - curPas + u18('100'); // 100 PAS extra for gas
            console.log(`  Sending ${fmt18(toSend)} PAS to ${name} (has ${fmt18(curPas)} PAS)`);
            await step('ADMIN', `Send PAS to ${name}`, 'Native',
                () => admin.sendTransaction({ to: usr.address, value: toSend }),
                { expected: `${name}.PAS ≈ 1 100 PAS` }
            );
        } else {
            console.log(`  [skip] ${name} already has sufficient PAS`);
        }
    }

    console.log('\n  Final account balances (post-funding):');
    for (const [n, w] of Object.entries({ ADMIN: admin, ...users })) {
        const mu = await musdc.balanceOf(w.address);
        const pa = await provider.getBalance(w.address);
        console.log(`  ${n.padEnd(6)} ${w.address.slice(0, 10)}... | mUSDC: ${fmt6(mu).padStart(18)} | PAS: ${fmt18(pa).padStart(12)}`);
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  PHASE 3 — CONFIGURE RATES + SEED POOLS
    // ══════════════════════════════════════════════════════════════════════════
    console.log('\n' + '─'.repeat(110));
    console.log('  PHASE 3 — CONFIGURE RATES & SEED POOLS');
    console.log('─'.repeat(110));

    // 3.1  Yield pool rate → 100 000 bps (1 000% APY – fast demo accumulation)
    await step('ADMIN', 'Set yield pool rate to 100 000 bps (1 000% APY)', 'MockYieldPool',
        () => yieldPool.connect(admin).setYieldRate(100000),
        { expected: 'yieldRateBps = 100 000; yield accrues rapidly for demo' }
    );

    // 3.2  globalTick = 1 440 on both markets (1 real second ≈ 24 simulated minutes)
    await step('ADMIN', 'Set KredioLending globalTick = 1 440 (1 s = 24 min interest)', 'KredioLending',
        () => lending.connect(admin).adminSetGlobalTick(1440),
        { expected: 'globalTick = 1440' }
    );
    await step('ADMIN', 'Set KredioPASMarket globalTick = 1 440', 'KredioPASMarket',
        () => pasMarket.connect(admin).adminSetGlobalTick(1440),
        { expected: 'globalTick = 1440' }
    );

    // 3.3  Wire yield pool (re-confirm)
    await step('ADMIN', 'Wire MockYieldPool to KredioLending', 'KredioLending',
        () => lending.connect(admin).adminSetYieldPool(ADDR.YIELD_POOL),
        { expected: 'yieldPool set; lending can now invest/pull/claim' }
    );

    // 3.3b  Extend PAS market staleness limit to 24 h so testnet oracle never expires mid-test
    await step('ADMIN', 'Set KredioPASMarket risk params (stalenessLimit=86400, others unchanged)', 'KredioPASMarket',
        () => pasMarket.connect(admin).setRiskParams(6500, 800, 86400, 1000),
        { expected: 'stalenessLimit = 86400 s (24 h); ltvBps=6500, liqBonusBps=800, protocolFeeBps=1000' }
    );

    // 3.3c  Refresh oracle price (re-sets updatedAt so staleness check passes)
    let currentOraclePrice = 502069300n;
    try {
        const rd = await oracle.latestRoundData();
        currentOraclePrice = BigInt(rd[1].toString());
        console.log(`  Current oracle price: ${currentOraclePrice} (already up to date)`);
    } catch (e) {
        console.log(`  Oracle is stale/crashed, refreshing with last known price: ${currentOraclePrice}`);
    }
    // Recover from crashed state first if needed (setPrice requires !crashed)
    const oracleIsCrashed = await oracle.crashed().catch(() => false);
    if (oracleIsCrashed) {
        await step('ADMIN', 'Recover oracle from crashed state', 'MockPASOracle',
            () => oracle.connect(admin).recover(),
            { expected: 'oracle.crashed = false; updatedAt refreshed; staleness check passes' }
        );
        // After recovery, update our price to the recovered price
        try { const rd = await oracle.latestRoundData(); currentOraclePrice = BigInt(rd[1].toString()); } catch (_) { }
    } else {
        // Not crashed: call setPrice to refresh updatedAt
        await step('ADMIN', `Refresh oracle price to ${currentOraclePrice} (reset updatedAt)`, 'MockPASOracle',
            () => oracle.connect(admin).setPrice(currentOraclePrice),
            { expected: 'oracle.updatedAt = now; staleness check will pass for 86400 s' }
        );
    }
    // Read refreshed price
    try {
        const rd2 = await oracle.latestRoundData();
        oraclePrice = BigInt(rd2[1].toString());
        console.log(`  Oracle refreshed. Price: ${oraclePrice} ($${(Number(oraclePrice) / 1e8).toFixed(4)} per PAS)`);
    } catch (e) {
        console.log(`  Using price: ${oraclePrice}`);
    }

    // 3.4  Blanket approvals (admin → both contracts)
    await step('ADMIN', 'Approve MaxUint256 mUSDC to KredioLending', 'MockUSDC',
        () => musdc.connect(admin).approve(ADDR.LENDING, ethers.MaxUint256),
        { expected: 'Admin can deposit + fundReserve without re-approving' }
    );
    await step('ADMIN', 'Approve MaxUint256 mUSDC to KredioPASMarket', 'MockUSDC',
        () => musdc.connect(admin).approve(ADDR.PAS_MARKET, ethers.MaxUint256),
        { expected: 'Admin can deposit + liquidate without re-approving' }
    );

    // 3.5  Seed KredioLending with 500 000 mUSDC liquidity
    const SEED_LENDING = u6('500000');
    await step('ADMIN', 'Deposit 500 000 mUSDC into KredioLending (admin liquidity base)', 'KredioLending',
        () => lending.connect(admin).deposit(SEED_LENDING),
        { expected: 'KredioLending.totalDeposited = 500 000; admin is a lender' }
    );

    // 3.6  Seed KredioPASMarket with 300 000 mUSDC liquidity
    const SEED_MARKET = u6('300000');
    await step('ADMIN', 'Deposit 300 000 mUSDC into KredioPASMarket (admin liquidity base)', 'KredioPASMarket',
        () => pasMarket.connect(admin).deposit(SEED_MARKET),
        { expected: 'KredioPASMarket.totalDeposited = 300 000' }
    );

    console.log('\n  Pool state after seeding:');
    const seededL = await lending.totalDeposited();
    const seededPM = await pasMarket.totalDeposited();
    console.log(`  KredioLending.totalDeposited   = ${fmt6(seededL)}`);
    console.log(`  KredioPASMarket.totalDeposited = ${fmt6(seededPM)}`);

    // ══════════════════════════════════════════════════════════════════════════
    //  PHASE 4 — TEST SEQUENCE
    // ══════════════════════════════════════════════════════════════════════════
    console.log('\n' + '─'.repeat(110));
    console.log('  PHASE 4 — TEST SEQUENCE');
    console.log('─'.repeat(110));

    // ── T1  USER1 lends 50 000 mUSDC to KredioLending ────────────────────────
    console.log('\n  ── T1: USER1 → Lend 50 000 mUSDC into KredioLending ──');
    const T1_AMOUNT = u6('50000');

    await step('USER1', 'Approve 50 000 mUSDC to KredioLending', 'MockUSDC',
        () => musdc.connect(users.USER1).approve(ADDR.LENDING, T1_AMOUNT),
        { expected: 'Allowance set' }
    );
    await step('USER1', 'Deposit 50 000 mUSDC into KredioLending', 'KredioLending',
        () => lending.connect(users.USER1).deposit(T1_AMOUNT),
        {
            expected: 'depositBalance[USER1] += 50 000; KredioLending.totalDeposited += 50 000',
            beforeFn: async () => ({ depositBalance: (await lending.depositBalance(users.USER1.address)).toString(), totalDeposited: (await lending.totalDeposited()).toString() }),
            afterFn: async () => ({ depositBalance: (await lending.depositBalance(users.USER1.address)).toString(), totalDeposited: (await lending.totalDeposited()).toString() }),
        }
    );

    await viewLog('USER1 deposit balance', () => lending.depositBalance(users.USER1.address).then(fmt6));

    // ── T2  USER3 lends 80 000 mUSDC to KredioPASMarket ──────────────────────
    console.log('\n  ── T2: USER3 → Lend 80 000 mUSDC into KredioPASMarket ──');
    const T2_AMOUNT = u6('80000');

    await step('USER3', 'Approve 80 000 mUSDC to KredioPASMarket', 'MockUSDC',
        () => musdc.connect(users.USER3).approve(ADDR.PAS_MARKET, T2_AMOUNT),
        { expected: 'Allowance set' }
    );
    await step('USER3', 'Deposit 80 000 mUSDC into KredioPASMarket', 'KredioPASMarket',
        () => pasMarket.connect(users.USER3).deposit(T2_AMOUNT),
        {
            expected: 'PM depositBalance[USER3] += 80 000; PM totalDeposited += 80 000',
            beforeFn: async () => ({ depositBalance: (await pasMarket.depositBalance(users.USER3.address)).toString(), totalDeposited: (await pasMarket.totalDeposited()).toString() }),
            afterFn: async () => ({ depositBalance: (await pasMarket.depositBalance(users.USER3.address)).toString(), totalDeposited: (await pasMarket.totalDeposited()).toString() }),
        }
    );

    // ── T3  USER2 deposits mUSDC collateral + borrows from KredioLending ──────
    console.log('\n  ── T3: USER2 → Deposit mUSDC collateral + Borrow from KredioLending ──');

    // Read score for USER2 (fresh address = ANON tier → high collateral ratio)
    let u2CollateralRatioBps = 20000n; // default 200%
    let u2InterestBps = 2000n;
    let u2Score = 0n;
    let u2Tier = 0;
    try {
        const scoreResult = await lending.getScore(users.USER2.address);
        u2Score = scoreResult.score;
        u2Tier = scoreResult.tier;
        u2CollateralRatioBps = BigInt(scoreResult.collateralRatioBps);
        u2InterestBps = BigInt(scoreResult.interestRateBps);
        console.log(`  USER2 Score=${u2Score} Tier=${u2Tier} collateralRatioBps=${u2CollateralRatioBps} interestBps=${u2InterestBps}`);
    } catch (e) {
        console.log(`  [warn] getScore failed (${e.message?.slice(0, 80)}); using defaults`);
    }

    const T3_COLLATERAL = u6('20000');
    const T3_maxBorrow = (T3_COLLATERAL * 10000n) / u2CollateralRatioBps;
    const T3_BORROW = (T3_maxBorrow * 8000n) / 10000n; // 80% of max for safety
    console.log(`  collateralRatioBps=${u2CollateralRatioBps}, maxBorrow=${fmt6(T3_maxBorrow)}, borrowing 80%=${fmt6(T3_BORROW)}`);

    await step('USER2', 'Approve 20 000 mUSDC to KredioLending (collateral)', 'MockUSDC',
        () => musdc.connect(users.USER2).approve(ADDR.LENDING, T3_COLLATERAL),
        { expected: 'Allowance set' }
    );
    await step('USER2', 'Deposit 20 000 mUSDC as USDC collateral into KredioLending', 'KredioLending',
        () => lending.connect(users.USER2).depositCollateral(T3_COLLATERAL),
        {
            expected: 'collateralBalance[USER2] += 20 000',
            beforeFn: async () => ({ collateralBalance: (await lending.collateralBalance(users.USER2.address)).toString() }),
            afterFn: async () => ({ collateralBalance: (await lending.collateralBalance(users.USER2.address)).toString() }),
        }
    );
    await step('USER2', `Borrow ${fmt6(T3_BORROW)} mUSDC from KredioLending (credit-score gated)`, 'KredioLending',
        () => lending.connect(users.USER2).borrow(T3_BORROW),
        {
            expected: `Position opened: debt=${fmt6(T3_BORROW)}, collateral=20 000; totalBorrowed += ${fmt6(T3_BORROW)}`,
            beforeFn: async () => ({ totalBorrowed: (await lending.totalBorrowed()).toString(), mUSDCBal: (await musdc.balanceOf(users.USER2.address)).toString() }),
            afterFn: async () => ({ totalBorrowed: (await lending.totalBorrowed()).toString(), mUSDCBal: (await musdc.balanceOf(users.USER2.address)).toString() }),
        }
    );

    // ── T4  USER4 deposits PAS + borrows from KredioPASMarket ────────────────
    console.log('\n  ── T4: USER4 → Deposit PAS collateral + Borrow from KredioPASMarket ──');
    // oracle price: 8 decimals (e.g. 502069300 = $5.02069300)
    // _toUSDCValue = (pasWei * price) / 1e20  →  gives mUSDC (6 dec)
    const oraclePriceN = BigInt(oraclePrice.toString());
    const ltvBps = await pasMarket.ltvBps();
    const T4_PAS = u18('300');
    const T4_collValue = (T4_PAS * oraclePriceN) / (10n ** 20n);
    const T4_maxBorrow = (T4_collValue * ltvBps) / 10000n;
    const T4_BORROW = (T4_maxBorrow * 7000n) / 10000n; // 70% of max
    console.log(`  300 PAS → collValueUSDC=${fmt6(T4_collValue)}  ltvBps=${ltvBps}  maxBorrow=${fmt6(T4_maxBorrow)}  borrowing70%=${fmt6(T4_BORROW)}`);

    await step('USER4', 'depositCollateral — lock 300 PAS in KredioPASMarket', 'KredioPASMarket',
        () => pasMarket.connect(users.USER4).depositCollateral({ value: T4_PAS }),
        {
            expected: 'collateralBalance[USER4] += 300 PAS (wei)',
            beforeFn: async () => ({ collateralBalance: (await pasMarket.collateralBalance(users.USER4.address)).toString() }),
            afterFn: async () => ({ collateralBalance: (await pasMarket.collateralBalance(users.USER4.address)).toString() }),
        }
    );
    await step('USER4', `Borrow ${fmt6(T4_BORROW)} mUSDC from KredioPASMarket (PAS-collateral gated)`, 'KredioPASMarket',
        () => pasMarket.connect(users.USER4).borrow(T4_BORROW),
        {
            expected: `Position opened; USER4 receives ${fmt6(T4_BORROW)} mUSDC; PM totalBorrowed += ${fmt6(T4_BORROW)}`,
            beforeFn: async () => ({ totalBorrowed: (await pasMarket.totalBorrowed()).toString(), mUSDCBal: (await musdc.balanceOf(users.USER4.address)).toString() }),
            afterFn: async () => ({ totalBorrowed: (await pasMarket.totalBorrowed()).toString(), mUSDCBal: (await musdc.balanceOf(users.USER4.address)).toString() }),
        }
    );

    // ── T5  USER5 deposits PAS + borrows near max (liquidation target) ────────
    console.log('\n  ── T5: USER5 → Deposit 400 PAS + Borrow 95% of max (liquidation target) ──');
    const T5_PAS = u18('400');
    const T5_collValue = (T5_PAS * oraclePriceN) / (10n ** 20n);
    const T5_maxBorrow = (T5_collValue * ltvBps) / 10000n;
    const T5_BORROW = (T5_maxBorrow * 9500n) / 10000n; // 95% — near-instant liquidation risk
    console.log(`  400 PAS → collValueUSDC=${fmt6(T5_collValue)}  maxBorrow=${fmt6(T5_maxBorrow)}  borrowing95%=${fmt6(T5_BORROW)}`);

    await step('USER5', 'depositCollateral — lock 400 PAS in KredioPASMarket', 'KredioPASMarket',
        () => pasMarket.connect(users.USER5).depositCollateral({ value: T5_PAS }),
        {
            expected: 'collateralBalance[USER5] += 400 PAS',
            beforeFn: async () => ({ collateralBalance: (await pasMarket.collateralBalance(users.USER5.address)).toString() }),
            afterFn: async () => ({ collateralBalance: (await pasMarket.collateralBalance(users.USER5.address)).toString() }),
        }
    );
    await step('USER5', `Borrow ${fmt6(T5_BORROW)} mUSDC at 95% LTV (near liquidation)`, 'KredioPASMarket',
        () => pasMarket.connect(users.USER5).borrow(T5_BORROW),
        {
            expected: 'Position opened at 95% LTV; interest accrual will breach health threshold',
            beforeFn: async () => ({ totalBorrowed: (await pasMarket.totalBorrowed()).toString() }),
            afterFn: async () => ({ totalBorrowed: (await pasMarket.totalBorrowed()).toString() }),
        }
    );

    // ── T6  Invest idle capital into yield pool ───────────────────────────────
    console.log('\n  ── T6: ADMIN → Invest 200 000 mUSDC from KredioLending into yield pool ──');
    const lTotalDep = await lending.totalDeposited();
    const lTotalBor = await lending.totalBorrowed();
    const lIdle = lTotalDep > lTotalBor ? lTotalDep - lTotalBor : 0n;
    console.log(`  KredioLending idle capital: ${fmt6(lIdle)} mUSDC`);

    const INVEST_AMT = u6('200000');
    const minBuffer = (lTotalDep * 2000n) / 10000n; // 20% buffer
    const canInvest = lIdle > INVEST_AMT + minBuffer;

    if (canInvest) {
        await step('ADMIN', `Invest ${fmt6(INVEST_AMT)} mUSDC from KredioLending into yield pool`, 'KredioLending',
            () => lending.connect(admin).adminInvest(INVEST_AMT),
            {
                expected: 'KredioLending.investedAmount += 200 000; YieldPool.totalPrincipal += 200 000; yield starts accruing',
                beforeFn: async () => ({ investedAmount: (await lending.investedAmount()).toString(), yieldPrincipal: (await yieldPool.totalPrincipal()).toString() }),
                afterFn: async () => ({ investedAmount: (await lending.investedAmount()).toString(), yieldPrincipal: (await yieldPool.totalPrincipal()).toString() }),
            }
        );
    } else {
        console.log(`  [skip] Not enough idle (${fmt6(lIdle)}) after minBuffer to safely invest 200k`);
    }

    // ── T7  Verify strategy status ────────────────────────────────────────────
    console.log('\n  ── T7: CHECK — Strategy status after investment ──');
    try {
        const strat = await lending.strategyStatus();
        console.log(`  pool           : ${strat.pool}`);
        console.log(`  invested       : ${fmt6(strat.invested)} mUSDC`);
        console.log(`  totalEarned    : ${fmt6(strat.totalEarned)} mUSDC (lifetime)`);
        console.log(`  pendingYield   : ${fmt6(strat.pendingYield_)} mUSDC (in pool, not yet claimed)`);
        console.log(`  investRatioBps : ${strat.investRatio_}`);
        console.log(`  minBufferBps   : ${strat.minBuffer_}`);
    } catch (e) {
        console.log(`  [warn] strategyStatus failed: ${e.message?.slice(0, 100)}`);
    }

    // ── T8  Wait 45 s for interest + yield to accrue ─────────────────────────
    console.log('\n  ── T8: WAIT 45 seconds (tick=1440 → ~18 hrs simulated interest; yield accruing) ──');
    console.log('  Waiting 45 seconds...');
    await sleep(45000);

    const u2Interest = await lending.accruedInterest(users.USER2.address);
    const u4Interest = await pasMarket.accruedInterest(users.USER4.address);
    const u5Interest = await pasMarket.accruedInterest(users.USER5.address);
    console.log(`  USER2 accrued interest (Lending)  : ${fmt6(u2Interest)} mUSDC`);
    console.log(`  USER4 accrued interest (PASMarket): ${fmt6(u4Interest)} mUSDC`);
    console.log(`  USER5 accrued interest (PASMarket): ${fmt6(u5Interest)} mUSDC`);

    // ── T9  adminTickPool — capitalise interest, distribute to lenders ────────
    console.log('\n  ── T9: ADMIN → Tick both pools (capitalise interest → distribute to lenders) ──');

    await step('ADMIN', 'adminTickPool for USER2 in KredioLending', 'KredioLending',
        () => lending.connect(admin).adminTickPool([users.USER2.address]),
        {
            expected: 'USER2 interest capitalised into debt; accYieldPerShare++ for all lenders',
            beforeFn: async () => ({ accruedInterest: (await lending.accruedInterest(users.USER2.address)).toString(), pendingUser1: (await lending.pendingYield(users.USER1.address)).toString() }),
            afterFn: async () => ({ debtFull: JSON.stringify(bigintSafe(await lending.getPositionFull(users.USER2.address))), pendingUser1: (await lending.pendingYield(users.USER1.address)).toString() }),
        }
    );

    await step('ADMIN', 'adminTickPool for USER4 + USER5 in KredioPASMarket', 'KredioPASMarket',
        () => pasMarket.connect(admin).adminTickPool([users.USER4.address, users.USER5.address]),
        {
            expected: 'USER4/USER5 interest capitalised; accYieldPerShare++ for PM lenders',
            beforeFn: async () => ({ u3Pending: (await pasMarket.pendingYield(users.USER3.address)).toString() }),
            afterFn: async () => ({ u3Pending: (await pasMarket.pendingYield(users.USER3.address)).toString(), adminPending: (await pasMarket.pendingYield(admin.address)).toString() }),
        }
    );

    // Display pending yields
    const u1Pending = await lending.pendingYield(users.USER1.address);
    const adminLPend = await lending.pendingYield(admin.address);
    const u3PMPending = await pasMarket.pendingYield(users.USER3.address);
    const admPMPending = await pasMarket.pendingYield(admin.address);
    console.log(`  USER1 pending yield (Lending)    : ${fmt6(u1Pending)} mUSDC`);
    console.log(`  ADMIN pending yield (Lending)    : ${fmt6(adminLPend)} mUSDC`);
    console.log(`  USER3 pending yield (PASMarket)  : ${fmt6(u3PMPending)} mUSDC`);
    console.log(`  ADMIN pending yield (PASMarket)  : ${fmt6(admPMPending)} mUSDC`);

    // ── T10  Wait 60 more seconds (more yield, then harvest) ─────────────────
    console.log('\n  ── T10: WAIT 60 more seconds (more yield pool accrual) ──');
    console.log('  Waiting 60 seconds...');
    await sleep(60000);

    const pendingExtYield = await lending.pendingStrategyYield();
    console.log(`  Pending external yield in MockYieldPool: ${fmt6(pendingExtYield)} mUSDC`);

    // ── T11  Force-liquidate USER5 ────────────────────────────────────────────
    console.log('\n  ── T11: ADMIN → Force-liquidate USER5 in KredioPASMarket ──');

    // Read fresh position (includes interest capitalised by tick + any additional accrual)
    const u5Pos = await pasMarket.getPositionFull(users.USER5.address);
    const u5TotalOwed = u5Pos.totalOwed;
    console.log(`  USER5 position: active=${u5Pos.active}  debt=${fmt6(u5Pos.debtUSDC)}  accrued=${fmt6(u5Pos.accrued)}  totalOwed=${fmt6(u5TotalOwed)}`);

    if (u5Pos.active) {
        // Admin already has MaxUint256 approved to PAS_MARKET from Phase 3
        await step('ADMIN', `adminLiquidate USER5 (totalOwed≈${fmt6(u5TotalOwed)} mUSDC, seize PAS + bonus)`, 'KredioPASMarket',
            () => pasMarket.connect(admin).adminLiquidate(users.USER5.address),
            {
                expected: `USER5 position deleted; admin pays ${fmt6(u5TotalOwed)} mUSDC; admin receives ~400 PAS (with bonus); interest distributed to PM lenders`,
                beforeFn: async () => ({ active: u5Pos.active.toString(), lenderYieldBefore: (await pasMarket.pendingYield(users.USER3.address)).toString(), adminPASBefore: (await provider.getBalance(admin.address)).toString() }),
                afterFn: async () => ({ active: (await pasMarket.getPositionFull(users.USER5.address)).active.toString(), lenderYieldAfter: (await pasMarket.pendingYield(users.USER3.address)).toString(), adminPASAfter: (await provider.getBalance(admin.address)).toString() }),
            }
        );
    } else {
        console.log('  [skip] USER5 has no active position (already closed or not opened)');
    }

    // ── T12  Claim external yield from MockYieldPool → inject to lenders ──────
    console.log('\n  ── T12: ADMIN → Claim external yield from MockYieldPool and inject into KredioLending ──');
    const pendingExtYield2 = await lending.pendingStrategyYield();
    console.log(`  Pending strategy yield now: ${fmt6(pendingExtYield2)} mUSDC`);

    if (pendingExtYield2 > 0n) {
        await step('ADMIN', `adminClaimAndInjectYield — mint ${fmt6(pendingExtYield2)} mUSDC yield → distribute to lenders`, 'KredioLending',
            () => lending.connect(admin).adminClaimAndInjectYield(),
            {
                expected: 'MockYieldPool mints fresh mUSDC to KredioLending; accYieldPerShare增加; USER1+ADMIN earn pro-rata yield',
                beforeFn: async () => ({ pendingUser1: (await lending.pendingYield(users.USER1.address)).toString(), pendingAdmin: (await lending.pendingYield(admin.address)).toString(), totalEarned: (await lending.strategyStatus()).totalEarned.toString() }),
                afterFn: async () => ({ pendingUser1: (await lending.pendingYield(users.USER1.address)).toString(), pendingAdmin: (await lending.pendingYield(admin.address)).toString() }),
            }
        );
    } else {
        console.log('  [warn] No pending yield to claim yet');
        // Force tick additional interest and re-check
        await step('ADMIN', 'Force-tick lending pool again for additional interest', 'KredioLending',
            () => lending.connect(admin).adminTickPool([users.USER2.address]),
            { expected: 'Additional interest distributed to lenders' }
        );
    }

    // ── T13  USER1 harvests yield from KredioLending ──────────────────────────
    console.log('\n  ── T13: USER1 → Harvest yield from KredioLending ──');
    const u1PendingBefore = await lending.pendingYield(users.USER1.address);
    const u1MusdcBefore = await musdc.balanceOf(users.USER1.address);
    console.log(`  USER1 pending yield: ${fmt6(u1PendingBefore)} mUSDC`);

    await step('USER1', `Harvest ${fmt6(u1PendingBefore)} mUSDC yield from KredioLending`, 'KredioLending',
        () => lending.connect(users.USER1).pendingYieldAndHarvest(users.USER1.address),
        {
            expected: `USER1.mUSDC += ${fmt6(u1PendingBefore)}; pendingYield[USER1] → 0`,
            beforeFn: async () => ({ mUSDCBal: u1MusdcBefore.toString(), pendingYield: u1PendingBefore.toString() }),
            afterFn: async () => ({ mUSDCBal: (await musdc.balanceOf(users.USER1.address)).toString(), pendingYield: (await lending.pendingYield(users.USER1.address)).toString() }),
        }
    );

    // ── T14  USER3 harvests yield from KredioPASMarket ───────────────────────
    console.log('\n  ── T14: USER3 → Harvest yield from KredioPASMarket ──');
    const u3PendingBefore = await pasMarket.pendingYield(users.USER3.address);
    const u3MusdcBefore = await musdc.balanceOf(users.USER3.address);
    console.log(`  USER3 pending yield: ${fmt6(u3PendingBefore)} mUSDC`);

    await step('USER3', `Harvest ${fmt6(u3PendingBefore)} mUSDC yield from KredioPASMarket`, 'KredioPASMarket',
        () => pasMarket.connect(users.USER3).pendingYieldAndHarvest(users.USER3.address),
        {
            expected: `USER3.mUSDC += ${fmt6(u3PendingBefore)}; pendingYield[USER3] → 0`,
            beforeFn: async () => ({ mUSDCBal: u3MusdcBefore.toString(), pendingYield: u3PendingBefore.toString() }),
            afterFn: async () => ({ mUSDCBal: (await musdc.balanceOf(users.USER3.address)).toString(), pendingYield: (await pasMarket.pendingYield(users.USER3.address)).toString() }),
        }
    );

    // ── T15  USER2 repays KredioLending ───────────────────────────────────────
    console.log('\n  ── T15: USER2 → Repay KredioLending loan ──');
    const u2PosFull = await lending.getPositionFull(users.USER2.address);
    console.log(`  USER2 position: active=${u2PosFull.active}  debt=${fmt6(u2PosFull.debt)}  accrued=${fmt6(u2PosFull.accrued)}  totalOwed=${fmt6(u2PosFull.totalOwed)}`);

    if (u2PosFull.active) {
        const repayAmt = u2PosFull.totalOwed + u6('50'); // +50 mUSDC buffer for tick accrual between approve and repay
        await step('USER2', `Approve ${fmt6(repayAmt)} mUSDC to KredioLending for repayment`, 'MockUSDC',
            () => musdc.connect(users.USER2).approve(ADDR.LENDING, repayAmt),
            { expected: 'Allowance ≥ totalOwed' }
        );
        await step('USER2', `repay() — pay ${fmt6(u2PosFull.totalOwed)} mUSDC (principal + interest)`, 'KredioLending',
            () => lending.connect(users.USER2).repay(),
            {
                expected: 'Position deleted; collateral 20 000 mUSDC returned to USER2; interest distributed to lenders; repaymentCount[USER2]++',
                beforeFn: async () => ({ active: u2PosFull.active.toString(), totalBorrowed: (await lending.totalBorrowed()).toString(), mUSDCBal: (await musdc.balanceOf(users.USER2.address)).toString() }),
                afterFn: async () => ({ active: (await lending.getPositionFull(users.USER2.address)).active.toString(), totalBorrowed: (await lending.totalBorrowed()).toString(), mUSDCBal: (await musdc.balanceOf(users.USER2.address)).toString() }),
            }
        );
    } else {
        console.log('  [skip] USER2 has no active position');
    }

    // ── T16  USER4 repays KredioPASMarket + withdraws PAS collateral ──────────
    console.log('\n  ── T16: USER4 → Repay PAS market loan + Withdraw PAS collateral ──');
    const u4PosFull = await pasMarket.getPositionFull(users.USER4.address);
    console.log(`  USER4 position: active=${u4PosFull.active}  debtUSDC=${fmt6(u4PosFull.debtUSDC)}  accrued=${fmt6(u4PosFull.accrued)}  totalOwed=${fmt6(u4PosFull.totalOwed)}`);

    if (u4PosFull.active) {
        const u4RepayAmt = u4PosFull.totalOwed + u6('50'); // +50 mUSDC buffer for tick accrual between approve and repay
        await step('USER4', `Approve ${fmt6(u4RepayAmt)} mUSDC to KredioPASMarket`, 'MockUSDC',
            () => musdc.connect(users.USER4).approve(ADDR.PAS_MARKET, u4RepayAmt),
            { expected: 'Allowance set' }
        );
        await step('USER4', `repay() — pay ${fmt6(u4PosFull.totalOwed)} mUSDC (principal + interest)`, 'KredioPASMarket',
            () => pasMarket.connect(users.USER4).repay(),
            {
                expected: 'Position inactive; totalBorrowed decreases; interest to PM lenders; repaymentCount[USER4]++',
                beforeFn: async () => ({ totalBorrowed: (await pasMarket.totalBorrowed()).toString(), mUSDCBal: (await musdc.balanceOf(users.USER4.address)).toString() }),
                afterFn: async () => ({ totalBorrowed: (await pasMarket.totalBorrowed()).toString(), mUSDCBal: (await musdc.balanceOf(users.USER4.address)).toString() }),
            }
        );
        await step('USER4', 'withdrawCollateral() — retrieve 300 PAS from KredioPASMarket', 'KredioPASMarket',
            () => pasMarket.connect(users.USER4).withdrawCollateral(),
            {
                expected: 'USER4 receives 300 PAS; collateralBalance[USER4] → 0',
                beforeFn: async () => ({ pasBal: (await provider.getBalance(users.USER4.address)).toString() }),
                afterFn: async () => ({ pasBal: (await provider.getBalance(users.USER4.address)).toString() }),
            }
        );
    } else {
        console.log('  [skip] USER4 has no active position');
    }

    // ── T17  USER1 withdraws deposit from KredioLending ──────────────────────
    console.log('\n  ── T17: USER1 → Withdraw deposit from KredioLending ──');
    const u1DepBal = await lending.depositBalance(users.USER1.address);
    console.log(`  USER1 depositBalance: ${fmt6(u1DepBal)} mUSDC`);

    if (u1DepBal > 0n) {
        await step('USER1', `withdraw(${fmt6(u1DepBal)}) — full withdrawal from KredioLending`, 'KredioLending',
            () => lending.connect(users.USER1).withdraw(u1DepBal),
            {
                expected: 'USER1 gets deposit back (auto-pulls from yield pool if needed) + any remaining yield; totalDeposited decreases',
                beforeFn: async () => ({ depositBalance: u1DepBal.toString(), lendingUSDC: (await musdc.balanceOf(ADDR.LENDING)).toString(), user1USDC: (await musdc.balanceOf(users.USER1.address)).toString() }),
                afterFn: async () => ({ depositBalance: (await lending.depositBalance(users.USER1.address)).toString(), lendingUSDC: (await musdc.balanceOf(ADDR.LENDING)).toString(), user1USDC: (await musdc.balanceOf(users.USER1.address)).toString() }),
            }
        );
    } else {
        console.log('  [skip] USER1 has no deposit balance');
    }

    // ── T18  USER3 withdraws deposit from KredioPASMarket ────────────────────
    console.log('\n  ── T18: USER3 → Withdraw deposit from KredioPASMarket ──');
    const u3DepBal = await pasMarket.depositBalance(users.USER3.address);
    console.log(`  USER3 PM depositBalance: ${fmt6(u3DepBal)} mUSDC`);

    if (u3DepBal > 0n) {
        await step('USER3', `withdraw(${fmt6(u3DepBal)}) — full withdrawal from KredioPASMarket`, 'KredioPASMarket',
            () => pasMarket.connect(users.USER3).withdraw(u3DepBal),
            {
                expected: 'USER3 gets deposit back; PM totalDeposited decreases',
                beforeFn: async () => ({ depositBalance: u3DepBal.toString(), user3USDC: (await musdc.balanceOf(users.USER3.address)).toString() }),
                afterFn: async () => ({ depositBalance: (await pasMarket.depositBalance(users.USER3.address)).toString(), user3USDC: (await musdc.balanceOf(users.USER3.address)).toString() }),
            }
        );
    } else {
        console.log('  [skip] USER3 has no PM deposit balance');
    }

    // ── T19  USER6: check score after test (fresh → should still be ANON) ────
    console.log('\n  ── T19: USER6 → Read credit score (unused in test; should show ANON) ──');
    try {
        const u6Score = await lending.getScore(users.USER6.address);
        console.log(`  USER6 Lending score: ${u6Score.score}  tier: ${u6Score.tier}  collatRatio: ${u6Score.collateralRatioBps}  interestBps: ${u6Score.interestRateBps}`);
        const u6PmScore = await pasMarket.getPositionFull(users.USER6.address);
        console.log(`  USER6 PM position active: ${u6PmScore.active}`);
    } catch (e) {
        console.log(`  [warn] Score read failed: ${e.message?.slice(0, 80)}`);
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  PHASE 5 — FINAL STATE + REPORT
    // ══════════════════════════════════════════════════════════════════════════
    console.log('\n' + '─'.repeat(110));
    console.log('  PHASE 5 — FINAL STATE SNAPSHOT');
    console.log('─'.repeat(110));

    const finalL = {
        totalDeposited: await lending.totalDeposited(),
        totalBorrowed: await lending.totalBorrowed(),
        investedAmount: await lending.investedAmount(),
        protocolFees: await lending.protocolFees(),
        utilization: await lending.utilizationRate(),
        globalTick: await lending.globalTick(),
    };
    const finalPM = {
        totalDeposited: await pasMarket.totalDeposited(),
        totalBorrowed: await pasMarket.totalBorrowed(),
        protocolFees: await pasMarket.protocolFees(),
        utilization: await pasMarket.utilizationRate(),
    };
    const finalYP = {
        principal: await yieldPool.totalPrincipal(),
        pendingYield: await yieldPool.pendingYield(ADDR.LENDING),
        rateBps: await yieldPool.yieldRateBps(),
    };

    console.log('\n  Final KredioLending:');
    console.log(`    totalDeposited  : ${fmt6(finalL.totalDeposited)} mUSDC`);
    console.log(`    totalBorrowed   : ${fmt6(finalL.totalBorrowed)} mUSDC`);
    console.log(`    investedAmount  : ${fmt6(finalL.investedAmount)} mUSDC`);
    console.log(`    protocolFees    : ${fmt6(finalL.protocolFees)} mUSDC`);
    console.log(`    utilization     : ${Number(finalL.utilization) / 100}%`);

    console.log('\n  Final KredioPASMarket:');
    console.log(`    totalDeposited  : ${fmt6(finalPM.totalDeposited)} mUSDC`);
    console.log(`    totalBorrowed   : ${fmt6(finalPM.totalBorrowed)} mUSDC`);
    console.log(`    protocolFees    : ${fmt6(finalPM.protocolFees)} mUSDC`);
    console.log(`    utilization     : ${Number(finalPM.utilization) / 100}%`);

    console.log('\n  Final MockYieldPool:');
    console.log(`    totalPrincipal  : ${fmt6(finalYP.principal)} mUSDC`);
    console.log(`    pendingYield    : ${fmt6(finalYP.pendingYield)} mUSDC (unclaimed)`);
    console.log(`    yieldRateBps    : ${finalYP.rateBps}`);

    console.log('\n  Final Account Balances:');
    const finalBals = {};
    for (const [n, w] of Object.entries({ ADMIN: admin, ...users })) {
        const mu = await musdc.balanceOf(w.address);
        const pa = await provider.getBalance(w.address);
        finalBals[n] = { address: w.address, mUSDC: mu.toString(), PAS: pa.toString() };
        console.log(`    ${n.padEnd(6)} | mUSDC: ${fmt6(mu).padStart(18)} | PAS: ${fmt18(pa).padStart(12)}`);
    }

    // Positions still active?
    console.log('\n  Residual open positions:');
    for (const [n, w] of Object.entries(users)) {
        try {
            const lp = await lending.getPositionFull(w.address);
            if (lp.active) console.log(`    [OPEN] ${n} KredioLending: debt=${fmt6(lp.debt)} collat=${fmt6(lp.collateral)}`);
            const pp = await pasMarket.getPositionFull(w.address);
            if (pp.active) console.log(`    [OPEN] ${n} KredioPASMarket: debt=${fmt6(pp.debtUSDC)} collat=${fmt18(pp.collateralPAS)} PAS`);
        } catch (e) { /* ignore */ }
    }

    // ─────────────────────────────────────────────────────────────
    //  REPORT TABLE
    // ─────────────────────────────────────────────────────────────
    const W = 120;
    console.log('\n' + '═'.repeat(W));
    console.log('  STRUCTURED TEST REPORT');
    console.log('═'.repeat(W));
    console.log(
        'Step'.padEnd(5),
        'Actor'.padEnd(7),
        'Status '.padEnd(8),
        'Contract'.padEnd(17),
        'Action'.padEnd(50),
        'TX Hash / Error'
    );
    console.log('─'.repeat(W));

    for (const r of REPORT) {
        const icon = r.status === 'PASS' ? '✓' : '✗';
        const status = `${icon} ${r.status}`.padEnd(8);
        const txRef = r.txHash
            ? r.txHash.slice(0, 16) + '...'
            : (r.error || '—').slice(0, 30);
        console.log(
            String(r.step).padEnd(5),
            r.actor.padEnd(7),
            status,
            r.contract.padEnd(17),
            r.action.slice(0, 50).padEnd(50),
            txRef
        );
    }
    console.log('─'.repeat(W));
    const passed = REPORT.filter(r => r.status === 'PASS').length;
    const failed = REPORT.filter(r => r.status === 'FAIL').length;
    const elapsed = ((Date.now() - startTs) / 1000).toFixed(1);
    console.log(`  TOTAL: ${REPORT.length}  |  PASS: ${passed}  |  FAIL: ${failed}  |  Elapsed: ${elapsed}s`);
    console.log('═'.repeat(W));

    // ─────────────────────────────────────────────────────────────
    //  SAVE JSON REPORT
    // ─────────────────────────────────────────────────────────────
    const jsonReport = {
        runAt: new Date().toISOString(),
        elapsed_s: parseFloat(elapsed),
        chain: { rpc: RPC, chainId: CHAIN_ID },
        contracts: ADDR,
        accounts: Object.fromEntries(Object.entries({ ADMIN: admin, ...users }).map(([k, w]) => [k, w.address])),
        phase0_state: bigintSafe(p0),
        finalState: bigintSafe({ lending: finalL, pasMarket: finalPM, yieldPool: finalYP }),
        finalBalances: finalBals,
        steps: REPORT.map(r => ({
            step: r.step,
            actor: r.actor,
            action: r.action,
            contract: r.contract,
            expected: r.expected,
            status: r.status,
            txHash: r.txHash,
            gasUsed: r.gasUsed,
            error: r.error,
            observedBefore: r.observedBefore,
            observedAfter: r.observedAfter,
        })),
        summary: { total: REPORT.length, passed, failed },
    };

    const reportPath = path.resolve(__dirname, '../test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(jsonReport, null, 2));
    console.log(`\n  Full report saved → ${reportPath}`);
    console.log('  Run complete.\n');
}

main().catch(e => {
    console.error('\n\nFATAL ERROR:', e);
    process.exit(1);
});
