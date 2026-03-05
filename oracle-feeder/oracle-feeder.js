// Tesseract PAS Oracle Feeder (testnet)
// Requirements: ethers v6, Node 18+

const fs = require('fs');
const path = require('path');
const http = require('http');
const { ethers } = require('ethers');

// ---------- Config ----------
const MODE = (process.env.MODE || 'DEMO').toUpperCase();
const DEFAULT_TICK_MS = MODE === 'REAL' ? 15 * 60 * 1000 : 60 * 1000;
const TICK_MS = Number(process.env.TICK_MS || DEFAULT_TICK_MS);
const RPC = process.env.RPC || 'https://eth-rpc-testnet.polkadot.io/';
const ORACLE_ADDR = process.env.ORACLE;
const MARKET_ADDR = process.env.MARKET;
const KEY = process.env.KEY;
const PORT = Number(process.env.PORT || 3001);
const CRASH_PRICE = process.env.CRASH_PRICE_8DEC ? BigInt(process.env.CRASH_PRICE_8DEC) : 250000000n;

if (!Number.isFinite(TICK_MS) || TICK_MS < 10_000) {
    console.error('Invalid TICK_MS: expected a number >= 10000 (ms)');
    process.exit(1);
}

if (!ORACLE_ADDR || !KEY) {
    console.error('Missing env: ORACLE and KEY are required');
    process.exit(1);
}

// ---------- Load feed ----------
const feedPath = path.resolve(__dirname, 'pas_oracle_feed.json');
if (!fs.existsSync(feedPath)) {
    console.error('Feed file missing at', feedPath);
    process.exit(1);
}
const feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));
if (!Array.isArray(feed) || feed.length === 0) {
    console.error('Feed file is empty or invalid');
    process.exit(1);
}

// ---------- Load ABIs ----------
function loadABI(name) {
    const p = path.resolve(__dirname, '../contracts/out', `${name}.sol`, `${name}.json`);
    if (!fs.existsSync(p)) {
        console.error('ABI missing, run forge build first:', p);
        process.exit(1);
    }
    return require(p).abi;
}
const oracleAbi = loadABI('MockPASOracle');
const marketAbi = loadABI('KredioPASMarket');

// ---------- Ethers setup ----------
const provider = new ethers.JsonRpcProvider(RPC);
const wallet = new ethers.Wallet(KEY, provider);
const oracle = new ethers.Contract(ORACLE_ADDR, oracleAbi, wallet);
const market = MARKET_ADDR ? new ethers.Contract(MARKET_ADDR, marketAbi, provider) : null;

let index = 0;
let lastTickAt = Date.now();
let ticking = false;
let effectiveTickMs = TICK_MS;

// Cached status served by HTTP handler without RPC calls
let cachedState = {
    mode: MODE,
    feedIndex: 0,
    feedDate: feed[0].date,
    feedPrice: `$${feed[0].price_usd}`,
    onChainPrice: `$${(585070000 / 1e8).toFixed(4)}`,
    lastUpdated: new Date().toISOString(),
    crashed: false,
    roundId: 1,
    market: {},
};

function withTimeout(promise, ms, label) {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error(`${label} timeout after ${ms}ms`)), ms)),
    ]);
}

// ---------- Helpers ----------
async function getOracleState() {
    const [, answer, , updatedAt,] = await oracle.latestRoundData();
    const crashed = await oracle.isCrashed();
    return {
        price: answer,
        updatedAt: Number(updatedAt),
        crashed,
    };
}

async function getMarketState() {
    if (!market) return null;
    const [td, tb, fees] = await Promise.all([
        market.totalDeposited(),
        market.totalBorrowed(),
        market.protocolFees(),
    ]);
    return { totalDeposited: td, totalBorrowed: tb, protocolFees: fees };
}

function logTick(info) {
    const { idx, date, price, tx } = info;
    console.log(`TICK idx=${idx} date=${date} price=${price} tx=${tx}`);
}

function nextTickInSeconds() {
    const elapsed = Date.now() - lastTickAt;
    const remain = Math.max(0, effectiveTickMs - elapsed);
    return Math.floor(remain / 1000);
}

async function alignTickWithStalenessLimit() {
    if (!market) return;
    try {
        const limit = Number(await withTimeout(market.stalenessLimit(), 8000, 'stalenessLimit'));
        if (!Number.isFinite(limit) || limit <= 0) return;

        const safeTickMs = Math.max(10_000, Math.floor(limit * 1000 * 0.8));
        if (effectiveTickMs > safeTickMs) {
            console.warn(
                `[WARN] TICK_MS (${effectiveTickMs}ms) exceeds safe oracle cadence for stalenessLimit=${limit}s; capping to ${safeTickMs}ms`
            );
            effectiveTickMs = safeTickMs;
        }
    } catch (err) {
        console.warn('[WARN] Could not read market stalenessLimit, using configured TICK_MS:', err.message || err);
    }
}

// ---------- Tick loop ----------
async function tick(manual = false) {
    console.log(`[TICK] Attempting index ${index % feed.length}...`);
    if (ticking) return { status: 'busy' };
    ticking = true;
    try {
        const crashed = await oracle.isCrashed();
        if (crashed) {
            if (manual) {
                return { error: 'cannot advance: crash mode active' };
            }
            console.log('Skipped tick: crash mode active');
            return { status: 'skipped' };
        }

        const entry = feed[index % feed.length];
        const price = BigInt(entry.price_8dec);
        const tx = await oracle.setPrice(price);
        const receipt = await tx.wait();

        logTick({ idx: index, date: entry.date, price: entry.price_usd, tx: tx.hash.slice(0, 12) });
        index += 1;
        lastTickAt = Date.now();
        cachedState.feedIndex = index;
        cachedState.feedDate = entry.date;
        cachedState.feedPrice = `$${entry.price_usd}`;
        cachedState.onChainPrice = `$${(entry.price_8dec / 1e8).toFixed(4)}`;
        cachedState.lastUpdated = new Date().toISOString();
        cachedState.crashed = false;
        cachedState.roundId += 1;
        return { status: 'ok', date: entry.date, price: entry.price_usd, tx: tx.hash, block: receipt.blockNumber };
    } catch (err) {
        console.error(`Tick error at index ${index}:`, err.message || err);
        index += 1; // advance even on error per spec
        return { error: err.message || String(err) };
    } finally {
        ticking = false;
    }
}

async function startTicker() {
    await alignTickWithStalenessLimit();
    setInterval(() => { tick(false); }, effectiveTickMs);
}

startTicker().catch((err) => {
    console.error('Failed to start ticker:', err.message || err);
    process.exit(1);
});

// ---------- HTTP server ----------
const server = http.createServer(async (req, res) => {
    const send = (code, obj) => {
        if (res.headersSent) return;
        res.writeHead(code, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(obj));
    };

    if (req.method === 'GET' && req.url === '/status') {
        send(200, {
            ...cachedState,
            nextTickIn: `${nextTickInSeconds()}s`,
            pid: process.pid,
        });
        return;
    }

    if (req.method === 'GET' && req.url === '/crash') {
        try {
            const tx = await oracle.crash(CRASH_PRICE);
            const receipt = await tx.wait();
            console.log('CRASH INJECTED', CRASH_PRICE.toString(), tx.hash);
            cachedState.crashed = true;
            cachedState.onChainPrice = `$${(Number(CRASH_PRICE) / 1e8).toFixed(4)}`;
            cachedState.lastUpdated = new Date().toISOString();
            send(200, { status: 'crashed', crashPrice: CRASH_PRICE.toString(), txHash: tx.hash, block: receipt.blockNumber });
        } catch (err) {
            send(500, { error: err.message || String(err) });
        }
        return;
    }

    if (req.method === 'GET' && req.url === '/recover') {
        try {
            const tx = await oracle.recover();
            const receipt = await tx.wait();
            const state = await getOracleState();
            console.log('RECOVERED', state.price.toString(), tx.hash);
            cachedState.crashed = false;
            cachedState.onChainPrice = cachedState.feedPrice;
            cachedState.lastUpdated = new Date().toISOString();
            send(200, { status: 'recovered', restoredPrice: state.price.toString(), txHash: tx.hash, block: receipt.blockNumber });
        } catch (err) {
            send(500, { error: err.message || String(err) });
        }
        return;
    }

    if (req.method === 'GET' && req.url === '/next') {
        try {
            const crashed = await oracle.isCrashed();
            if (crashed) {
                send(400, { error: 'cannot advance: crash mode active' });
                return;
            }
            const result = await tick(true);
            if (result.error) send(500, result); else send(200, result);
        } catch (err) {
            send(500, { error: err.message || String(err) });
        }
        return;
    }

    send(404, { error: 'not found' });
});

server.listen(PORT, () => {
    console.log(`Oracle feeder running on port ${PORT} mode=${MODE} tick=${effectiveTickMs / 1000}s`);
});
