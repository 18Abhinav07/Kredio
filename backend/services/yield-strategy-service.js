'use strict';
// Yield Strategy Service — monitors KredioLending pool utilization and
// automatically rebalances idle capital into MockYieldPool to generate
// extra yield for lenders. Claimed yield flows back through
// _distributeInterest so all lenders earn their pro-rata share automatically.
//
// Mirrors oracle-service.js in structure and style.

const { ethers } = require('ethers');
const path = require('path');
const fs = require('fs');
const { HUB, KEY, YIELD_STRATEGY } = require('../config');

// ─── Load ABIs (from compiled Foundry output) ─────────────────────────────
function loadABI(name) {
    const p = path.resolve(__dirname, '../../contracts/out', `${name}.sol`, `${name}.json`);
    if (!fs.existsSync(p)) return null;
    return require(p).abi;
}

// ─── State ────────────────────────────────────────────────────────────────
let provider, wallet, lendingContract, yieldPoolContract;
let ticking = false;
let lastInvestAt = 0;
let lastClaimAt = 0;

let cachedState = {
    enabled: false,
    zone: 'UNKNOWN',
    totalDeposited: '0',
    totalBorrowed: '0',
    investedAmount: '0',
    targetInvested: '0',
    pendingYield: '0',
    utilPct: '0',
    lastAction: 'NONE',
    lastActionAt: null,
    error: null,
};

// ─── Helper ───────────────────────────────────────────────────────────────
function withTimeout(promise, ms, label) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`${label} timeout after ${ms}ms`)), ms)),
    ]);
}

async function getGasOverrides() {
    const feeData = await provider.getFeeData();
    const maxFeePerGas = feeData.maxFeePerGas ?? ethers.parseUnits('10', 'gwei');
    return { maxFeePerGas, maxPriorityFeePerGas: maxFeePerGas };
}

function fmt6(atoms) {
    return ethers.formatUnits(atoms, 6);
}

// ─── Decision logic (pure — no side effects) ──────────────────────────────
// Returns { action, actionAmount, zone, target }
// action: 'NOOP' | 'INVEST' | 'PULL_BACK' | 'PULL_ALL' | 'CLAIM'
function computeDecision({ totalDeposited, totalBorrowed, investedAmount, pendingYield, nowMs }) {
    const cfg = YIELD_STRATEGY;
    const deadBand = BigInt(cfg.deadBandUsdc);
    const claimThreshold = BigInt(cfg.claimThresholdUsdc);

    // Utilization zone (using BigInt BPS for precision)
    const utilBps = totalDeposited > 0n
        ? (totalBorrowed * 10000n) / totalDeposited
        : 0n;

    let zone = 'NORMAL';
    if (utilBps < BigInt(cfg.investThresholdBps)) zone = 'IDLE';
    else if (utilBps > BigInt(cfg.emergencyThresholdBps)) zone = 'EMERGENCY';
    else if (utilBps > BigInt(cfg.pullbackThresholdBps)) zone = 'TIGHT';

    // Emergency: pull everything back immediately
    if (zone === 'EMERGENCY' && investedAmount > 0n) {
        return { action: 'PULL_ALL', actionAmount: investedAmount, zone, target: 0n };
    }

    // Target invested = INVEST_RATIO% of idle capital, capped by min buffer constraint
    const idle = totalDeposited > totalBorrowed ? totalDeposited - totalBorrowed : 0n;
    const rawTarget = (idle * BigInt(cfg.investRatioBps)) / 10000n;
    const minBuffer = (totalDeposited * BigInt(cfg.minBufferBps)) / 10000n;
    // maxToInvest = what can leave while still keeping minBuffer liquid
    const maxAllowed = (idle - minBuffer) > 0n ? idle - minBuffer : 0n;
    const target = rawTarget < maxAllowed ? rawTarget : maxAllowed;

    // Rebalance: only one action per tick (invest OR pull, never both)
    if (target > investedAmount + deadBand && (nowMs - lastInvestAt > cfg.investCooldownMs)) {
        const delta = target - investedAmount;
        return { action: 'INVEST', actionAmount: delta, zone, target };
    }

    if (investedAmount > target + deadBand) {
        const delta = investedAmount - target;
        return { action: 'PULL_BACK', actionAmount: delta, zone, target };
    }

    // Claim yield if threshold met or max interval exceeded
    const shouldClaim = pendingYield >= claimThreshold ||
        (nowMs - lastClaimAt > cfg.maxClaimIntervalMs && pendingYield > 0n);
    if (shouldClaim) {
        return { action: 'CLAIM', actionAmount: pendingYield, zone, target };
    }

    return { action: 'NOOP', actionAmount: 0n, zone, target };
}

// ─── Main tick ────────────────────────────────────────────────────────────
async function tick() {
    if (ticking) return;
    ticking = true;
    try {
        // 1. Read on-chain state
        const [
            totalDeposited,
            totalBorrowed,
            investedAmount,
            pendingYield,
        ] = await Promise.all([
            withTimeout(lendingContract.totalDeposited(), 15_000, 'totalDeposited'),
            withTimeout(lendingContract.totalBorrowed(), 15_000, 'totalBorrowed'),
            withTimeout(lendingContract.investedAmount(), 15_000, 'investedAmount'),
            withTimeout(lendingContract.pendingStrategyYield(), 15_000, 'pendingStrategyYield'),
        ]);

        const utilPct = totalDeposited > 0n
            ? ((Number(totalBorrowed) / Number(totalDeposited)) * 100).toFixed(1)
            : '0.0';

        // 2. Compute decision
        const { action, actionAmount, zone, target } = computeDecision({
            totalDeposited,
            totalBorrowed,
            investedAmount,
            pendingYield,
            nowMs: Date.now(),
        });

        console.log(
            `[yield-strategy] zone=${zone} util=${utilPct}%` +
            ` invested=${fmt6(investedAmount)} target=${fmt6(target)}` +
            ` pending=${fmt6(pendingYield)} action=${action}` +
            (actionAmount > 0n ? ` amt=${fmt6(actionAmount)}` : '')
        );

        // 3. Execute (one action per tick)
        if (action !== 'NOOP') {
            const gas = await getGasOverrides();
            let tx, label;

            if (action === 'INVEST') {
                tx = await lendingContract.adminInvest(actionAmount, gas);
                label = `INVEST ${fmt6(actionAmount)} mUSDC`;
                await tx.wait(1);
                lastInvestAt = Date.now();

            } else if (action === 'PULL_BACK' || action === 'PULL_ALL') {
                tx = await lendingContract.adminPullBack(actionAmount, gas);
                label = `PULL_BACK ${fmt6(actionAmount)} mUSDC`;
                await tx.wait(1);

            } else if (action === 'CLAIM') {
                tx = await lendingContract.adminClaimAndInjectYield(gas);
                label = `CLAIM ${fmt6(actionAmount)} mUSDC → injected to lenders`;
                await tx.wait(1);
                lastClaimAt = Date.now();
            }

            console.log(`[yield-strategy] ✓ ${label}  tx=${tx.hash}`);
            cachedState.lastAction = label;
            cachedState.lastActionAt = new Date().toISOString();
        }

        // 4. Update cached state (re-read investedAmount after possible change)
        const newInvested = action === 'INVEST'
            ? investedAmount + actionAmount
            : (action === 'PULL_BACK' || action === 'PULL_ALL')
                ? investedAmount - actionAmount
                : investedAmount;

        cachedState = {
            ...cachedState,
            enabled: true,
            zone,
            totalDeposited: fmt6(totalDeposited),
            totalBorrowed: fmt6(totalBorrowed),
            investedAmount: fmt6(newInvested),
            targetInvested: fmt6(target),
            pendingYield: fmt6(pendingYield),
            utilPct,
            error: null,
        };

    } catch (err) {
        console.error('[yield-strategy] tick error:', err.message);
        cachedState.error = err.message;
    } finally {
        ticking = false;
    }
}

// ─── Start ────────────────────────────────────────────────────────────────
async function start() {
    if (!YIELD_STRATEGY.enabled) {
        console.log('[yield-strategy] disabled — set YIELD_STRATEGY_ENABLED=true to enable');
        return;
    }
    if (!YIELD_STRATEGY.lendingAddr) {
        console.warn('[yield-strategy] LENDING_ADDR not set — skipping');
        return;
    }
    if (!YIELD_STRATEGY.yieldPoolAddr) {
        console.warn('[yield-strategy] YIELD_POOL_ADDR not set — skipping');
        return;
    }
    if (!KEY) {
        console.warn('[yield-strategy] KEY not set — cannot sign transactions');
        return;
    }

    const lendingABI = loadABI('KredioLending');
    const yieldPoolABI = loadABI('MockYieldPool');
    if (!lendingABI || !yieldPoolABI) {
        console.warn('[yield-strategy] Cannot load ABIs — run `forge build` first');
        return;
    }

    provider = new ethers.JsonRpcProvider(HUB.rpcUrl);
    wallet = new ethers.Wallet(KEY, provider);
    lendingContract = new ethers.Contract(YIELD_STRATEGY.lendingAddr, lendingABI, wallet);
    yieldPoolContract = new ethers.Contract(YIELD_STRATEGY.yieldPoolAddr, yieldPoolABI, wallet);

    console.log(
        `[yield-strategy] started  lending=${YIELD_STRATEGY.lendingAddr}  pool=${YIELD_STRATEGY.yieldPoolAddr}` +
        `  poll=${YIELD_STRATEGY.pollMs / 1000}s`
    );

    // Initial tick then poll
    await tick();
    setInterval(tick, YIELD_STRATEGY.pollMs);
}

function getState() {
    return { ...cachedState };
}

module.exports = { start, getState };
