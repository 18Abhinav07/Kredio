'use strict';
// Oracle service — adapted from oracle-feeder/oracle-feeder.js.
// Exported as a module so server.js owns the HTTP layer via Express.
// All logic is identical to the standalone script; only the HTTP layer is removed.

const fs = require('fs');
const path = require('path');
const { ethers } = require('ethers');
const { MODE, TICK_MS, KEY, CRASH_PRICE, HUB } = require('../config');

// ─── Load feed ────────────────────────────────────────────────────────────
const feedPath = path.resolve(__dirname, '../data/pas_oracle_feed.json');
let feed = [];
if (fs.existsSync(feedPath)) {
    feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));
} else {
    console.warn('[oracle] Feed file not found at', feedPath, '— oracle service disabled');
}

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

// ─── State ────────────────────────────────────────────────────────────────
let provider, wallet, oracle, market;
let index = 0;
let lastTickAt = Date.now();
let ticking = false;
let effectiveTickMs = TICK_MS;

let cachedState = {
    mode: MODE,
    feedIndex: 0,
    feedDate: feed[0]?.date || 'N/A',
    feedPrice: feed[0] ? `$${feed[0].price_usd}` : 'N/A',
    onChainPrice: 'N/A',
    lastUpdated: new Date().toISOString(),
    crashed: false,
    roundId: 1,
    market: {},
    enabled: false,
};

function withTimeout(promise, ms, label) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`${label} timeout after ${ms}ms`)), ms)),
    ]);
}

async function getOracleState() {
    const [, answer, , updatedAt] = await oracle.latestRoundData();
    const crashed = await oracle.isCrashed();
    return { price: answer, updatedAt: Number(updatedAt), crashed };
}

function nextTickInSeconds() {
    const elapsed = Date.now() - lastTickAt;
    const remain = Math.max(0, effectiveTickMs - elapsed);
    return Math.floor(remain / 1000);
}

async function alignTickWithStalenessLimit() {
    if (!market) return;
    try {
        const limit = Number(await withTimeout(market.stalenessLimit(), 20_000, 'stalenessLimit'));
        if (!Number.isFinite(limit) || limit <= 0) return;
        const safeTickMs = Math.max(10_000, Math.floor(limit * 1000 * 0.8));
        if (effectiveTickMs > safeTickMs) {
            console.warn(`[oracle] TICK_MS (${effectiveTickMs}ms) > safe cadence; capping to ${safeTickMs}ms`);
            effectiveTickMs = safeTickMs;
        }
    } catch (err) {
        console.warn('[oracle] Could not read stalenessLimit:', err.message);
    }
}

async function tick(manual = false) {
    if (!oracle || feed.length === 0) return { status: 'disabled' };
    if (ticking) return { status: 'busy' };
    ticking = true;
    try {
        const crashed = await oracle.isCrashed();
        if (crashed) {
            if (manual) return { error: 'cannot advance: crash mode active' };
            console.log('[oracle] Skipped tick: crash mode active');
            return { status: 'skipped' };
        }
        const entry = feed[index % feed.length];
        const price = BigInt(entry.price_8dec);
        const tx = await oracle.setPrice(price);
        const receipt = await tx.wait();
        console.log(`[oracle] TICK idx=${index} date=${entry.date} price=${entry.price_usd} tx=${tx.hash.slice(0, 12)}`);
        index += 1;
        lastTickAt = Date.now();
        cachedState = {
            ...cachedState,
            feedIndex: index,
            feedDate: entry.date,
            feedPrice: `$${entry.price_usd}`,
            onChainPrice: `$${(entry.price_8dec / 1e8).toFixed(4)}`,
            lastUpdated: new Date().toISOString(),
            crashed: false,
            roundId: cachedState.roundId + 1,
        };
        return { status: 'ok', date: entry.date, price: entry.price_usd, tx: tx.hash, block: receipt.blockNumber };
    } catch (err) {
        console.error(`[oracle] Tick error at index ${index}:`, err.message);
        index += 1;
        return { error: err.message || String(err) };
    } finally {
        ticking = false;
    }
}

async function crash() {
    if (!oracle) throw new Error('oracle not initialised');
    const tx = await oracle.crash(CRASH_PRICE);
    const receipt = await tx.wait();
    cachedState.crashed = true;
    cachedState.onChainPrice = `$${(Number(CRASH_PRICE) / 1e8).toFixed(4)}`;
    cachedState.lastUpdated = new Date().toISOString();
    console.log('[oracle] CRASH INJECTED', CRASH_PRICE.toString(), tx.hash);
    return { status: 'crashed', crashPrice: CRASH_PRICE.toString(), txHash: tx.hash, block: receipt.blockNumber };
}

async function recover() {
    if (!oracle) throw new Error('oracle not initialised');
    const tx = await oracle.recover();
    const receipt = await tx.wait();
    const state = await getOracleState();
    cachedState.crashed = false;
    cachedState.onChainPrice = cachedState.feedPrice;
    cachedState.lastUpdated = new Date().toISOString();
    console.log('[oracle] RECOVERED', state.price.toString(), tx.hash);
    return { status: 'recovered', restoredPrice: state.price.toString(), txHash: tx.hash, block: receipt.blockNumber };
}

function getState() {
    return { ...cachedState, nextTickIn: `${nextTickInSeconds()}s`, pid: process.pid };
}

// ─── Startup ──────────────────────────────────────────────────────────────
async function start() {
    if (!KEY) {
        console.warn('[oracle] KEY not set — oracle service disabled');
        return;
    }
    if (!HUB.oracle) {
        console.warn('[oracle] ORACLE env not set — oracle service disabled');
        return;
    }
    if (feed.length === 0) {
        console.warn('[oracle] Feed empty — oracle service disabled');
        return;
    }
    if (Number.isNaN(effectiveTickMs) || effectiveTickMs < 10_000) {
        console.error('[oracle] Invalid TICK_MS, must be ≥10000');
        return;
    }

    const oracleAbi = loadABI('MockPASOracle');
    const marketAbi = loadABI('KredioPASMarket');
    if (!oracleAbi) {
        console.warn('[oracle] MockPASOracle ABI missing — run forge build');
        return;
    }

    provider = new ethers.JsonRpcProvider(HUB.rpcUrl);
    wallet = new ethers.Wallet(KEY, provider);
    oracle = new ethers.Contract(HUB.oracle, oracleAbi, wallet);
    if (HUB.market && marketAbi) {
        market = new ethers.Contract(HUB.market, marketAbi, provider);
    }

    await alignTickWithStalenessLimit();
    cachedState.enabled = true;

    // Prime on-chain state into cachedState
    try {
        const st = await getOracleState();
        cachedState.onChainPrice = `$${(Number(st.price) / 1e8).toFixed(4)}`;
        cachedState.crashed = st.crashed;
    } catch (_) { /* non-fatal */ }

    setInterval(() => { tick(false); }, effectiveTickMs);
    console.log(`[oracle] Started mode=${MODE} tick=${effectiveTickMs / 1000}s oracle=${HUB.oracle}`);
}

module.exports = { start, tick, crash, recover, getState };
