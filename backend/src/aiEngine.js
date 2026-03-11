'use strict';
// backend/src/aiEngine.js
// Phase 5 AI Engine - event-driven ink! contract caller
// Usable as: require('./src/aiEngine').start()  OR  node src/aiEngine.js

const { ethers } = require('ethers');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const RPC_URL = process.env.RPC || 'https://eth-rpc-testnet.polkadot.io/';
const KEY = process.env.KEY;

if (!KEY) { console.error('[aiEngine] KEY not set in .env - skipping AI engine'); }

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(KEY, provider);

// ─── ABI fragments ────────────────────────────────────────────────────────────

const NEURAL_ABI = [
    'function infer(bytes20 account, uint32 repaymentCount, uint32 liquidationCount, uint8 depositTier, uint32 ageBlocks, uint8 deterministicScore) external',
    'event ScoreInferred(bytes20 indexed account, uint8 neuralScore, uint8 deterministicScore, uint8 confidencePct, uint8 dominantSignal, int8 deltaFromRule, uint32 modelVersion)',
];

const RISK_ABI = [
    'function assess_position(bytes20 borrower, uint64 collateralUsdX6, uint64 debtUsdX6, uint8 creditScore, int32 price7dChangeBps, uint32 liqRatioBps) external',
    'function assess_batch(bytes20[16] borrowers, uint64[16] collaterals, uint64[16] debts, uint8[16] scores, int32 priceChange, uint32 liqRatio, uint8 activeCount) external',
    'event RiskAssessed(bytes20 indexed borrower, uint8 riskTier, uint8 liqProb, uint32 bufferBps, uint32 blocksToLiq)',
];

const YIELD_ABI = [
    'function compute_allocation(uint64 totalDeposited, uint64 totalBorrowed, uint64 strategyBalance, uint8 avgCreditScore, uint32 volatilityBps, uint32 blocksSinceRebalance) external',
    'event AllocationComputed(uint32 utilizationBps, uint32 conservativeBps, uint32 balancedBps, uint32 aggressiveBps, uint32 idleBps, uint32 projectedApyBps, uint8 reasoningCode)',
];

const LENDING_ABI = [
    'function repaymentCount(address) view returns (uint64)',
    'function liquidationCount(address) view returns (uint64)',
    'function depositBalance(address) view returns (uint256)',
    'function firstSeenBlock(address) view returns (uint256)',
    'function collateralBalance(address) view returns (uint256)',
    'function positions(address) view returns (uint256 collateral, uint256 debt, uint256 openedAt, uint32 interestBps, uint32 collateralRatioBps, uint8 tier, bool active)',
    'function totalDeposited() view returns (uint256)',
    'function totalBorrowed() view returns (uint256)',
    'event CollateralDeposited(address indexed user, uint256 amount)',
    'event Borrowed(address indexed user, uint256 amount, uint8 tier, uint32 ratioBps)',
    'event Repaid(address indexed user, uint256 principal, uint256 interest)',
    'event Liquidated(address indexed borrower, address indexed liquidator)',
    'event Deposited(address indexed user, uint256 amount)',
    'event YieldHarvested(address indexed lender, uint256 amount)',
];

const YIELD_POOL_ABI = [
    'function totalPrincipal() view returns (uint256)',
];

const KREDIT_AGENT_ABI = [
    'function compute_score(uint64 repayments, uint64 liquidations, uint64 deposit_tier, uint64 blocks_since_first) view returns (uint64)',
];

const ORACLE_ABI = [
    'function latestPrice() view returns (int256)',
    'event PriceUpdated(int256 price, uint80 roundId, uint256 updatedAt)',
];

// ─── Contract instances ───────────────────────────────────────────────────────

const LENDING_ADDR = process.env.LENDING_ADDR || '0x1eDaD1271FB9d1296939C6f4Fb762752b041C64E';
const YIELD_POOL_ADDR = process.env.YIELD_POOL_ADDR || '0x1dB4Faad3081aAfe26eC0ef6886F04f28D944AAB';
const KREDITAGENT_ADDR = '0x8c13E6fFDf27bB51304Efff108C9B646d148E5F3';
const ORACLE_ADDR = process.env.ORACLE || '0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7';
const NEURAL_ADDR = process.env.NEURAL_SCORER_ADDRESS;
const RISK_ADDR = process.env.RISK_ASSESSOR_ADDRESS;
const YIELD_MIND_ADDR = process.env.YIELD_MIND_ADDRESS;

if (!NEURAL_ADDR || !RISK_ADDR || !YIELD_MIND_ADDR) {
    console.error('[aiEngine] NEURAL_SCORER_ADDRESS / RISK_ASSESSOR_ADDRESS / YIELD_MIND_ADDRESS not set. Deploy contracts first.');
}

const lending = new ethers.Contract(LENDING_ADDR, LENDING_ABI, wallet);
const yieldPool = new ethers.Contract(YIELD_POOL_ADDR, YIELD_POOL_ABI, provider);
const kreditAgent = new ethers.Contract(KREDITAGENT_ADDR, KREDIT_AGENT_ABI, provider);
const oracle = new ethers.Contract(ORACLE_ADDR, ORACLE_ABI, provider);
const neural = new ethers.Contract(NEURAL_ADDR, NEURAL_ABI, wallet);
const risk = new ethers.Contract(RISK_ADDR, RISK_ABI, wallet);
const yieldMind = new ethers.Contract(YIELD_MIND_ADDR, YIELD_ABI, wallet);

// ─── In-memory state ──────────────────────────────────────────────────────────

const state = {
    activeBorrowers: new Set(),      // Set<address>
    priceHistory: [],             // rolling 100 bigint entries
    lastRebalanceBlock: 0n,
    borrowerScores: new Map(),      // address → number
    avgCreditScore: 0,
    lastSweepBlock: 0n,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function waitBlocks(n) {
    if (n <= 0) return;
    const start = await provider.getBlockNumber();
    await new Promise((resolve) => {
        const check = async () => {
            try {
                const current = await provider.getBlockNumber();
                if (current >= start + n) { resolve(); return; }
            } catch (_) { }
            setTimeout(check, 6_000);
        };
        check();
    });
}

// Deposit balance → tier 0-7
function computeDepositTier(balance) {
    const b = BigInt(balance);
    if (b >= 500_000_000_000n) return 7;
    if (b >= 100_000_000_000n) return 6;
    if (b >= 50_000_000_000n) return 5;
    if (b >= 10_000_000_000n) return 4;
    if (b >= 2_000_000_000n) return 3;
    if (b >= 500_000_000n) return 2;
    if (b > 0n) return 1;
    return 0;
}

function computeMean(values) {
    if (!values.length) return 0;
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

function computeVolatilityBps() {
    if (state.priceHistory.length < 10) return 0;
    const nums = state.priceHistory.map(Number);
    const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
    const variance = nums.reduce((s, x) => s + (x - mean) ** 2, 0) / nums.length;
    const stddev = Math.sqrt(variance);
    return Math.round((stddev / mean) * 10_000);
}

function compute7dChangeBps() {
    if (state.priceHistory.length < 2) return 0;
    const oldest = Number(state.priceHistory[0]);
    const current = Number(state.priceHistory[state.priceHistory.length - 1]);
    if (oldest === 0) return 0;
    return Math.round(((current - oldest) / oldest) * 10_000);
}

// ─── Data fetchers ────────────────────────────────────────────────────────────

async function fetchBorrowerInputs(borrower) {
    try {
        const [repayments, liquidations, depositBal, firstSeen, currentBlock] =
            await Promise.all([
                lending.repaymentCount(borrower),
                lending.liquidationCount(borrower),
                lending.depositBalance(borrower),
                lending.firstSeenBlock(borrower),
                provider.getBlockNumber(),
            ]);

        const depositTier = computeDepositTier(depositBal);
        const ageBlocks = Math.max(0, Number(currentBlock) - Number(firstSeen));

        // Call KreditAgent with the four numeric inputs
        let deterministicScore = 0;
        try {
            const rawScore = await kreditAgent.compute_score(
                Number(repayments),
                Number(liquidations),
                depositTier,
                ageBlocks,
            );
            deterministicScore = Number(rawScore);
        } catch (e) {
            console.warn(`[aiEngine] compute_score failed for ${borrower}:`, e.message);
        }

        state.borrowerScores.set(borrower, deterministicScore);
        state.avgCreditScore = computeMean([...state.borrowerScores.values()]);

        return {
            repayments: Number(repayments),
            liquidations: Number(liquidations),
            depositTier,
            ageBlocks,
            deterministicScore,
        };
    } catch (err) {
        console.error(`[aiEngine] fetchBorrowerInputs skipping ${borrower}:`, err.message);
        return null;
    }
}

async function fetchPositionData(borrower) {
    try {
        const [pos, rawPrice] = await Promise.all([
            lending.positions(borrower),
            oracle.latestPrice(),
        ]);
        // Convert: collateral is mUSDC (6 decimals) - already USD × 1e6
        // debt is mUSDC - already USD × 1e6
        return {
            collateralUSD_x6: BigInt(pos.collateral),
            debtUSD_x6: BigInt(pos.debt),
        };
    } catch (err) {
        console.error(`[aiEngine] fetchPositionData skipping ${borrower}:`, err.message);
        return null;
    }
}

// ─── AI contract callers ──────────────────────────────────────────────────────

async function callNeuralScorer(borrower) {
    const inputs = await fetchBorrowerInputs(borrower);
    if (!inputs) return;
    try {
        // Pad borrower address to bytes20 (drop 0x, take 40 hex chars)
        const tx = await neural.infer(
            borrower,
            inputs.repayments,
            inputs.liquidations,
            inputs.depositTier,
            inputs.ageBlocks,
            inputs.deterministicScore,
        );
        await tx.wait();
        console.log(`[NeuralScorer] infer() ${borrower} ✓  tx:${tx.hash}`);
    } catch (err) {
        console.error(`[NeuralScorer] infer() failed ${borrower}:`, err.message);
    }
}

async function callRiskAssessor(borrower) {
    const [posData, scoreResult] = await Promise.all([
        fetchPositionData(borrower),
        kreditAgent.compute_score(0, 0, 0, 0).catch(() => 0n),   // fallback
    ]);
    if (!posData) return;

    // Use borrower-specific score if available
    const creditScore = state.borrowerScores.get(borrower) ?? 0;

    try {
        const tx = await risk.assess_position(
            borrower,
            posData.collateralUSD_x6,
            posData.debtUSD_x6,
            creditScore,
            compute7dChangeBps(),
            11_000,   // 110% liquidation threshold
        );
        await tx.wait();
        console.log(`[RiskAssessor] assess_position() ${borrower} ✓  tx:${tx.hash}`);
    } catch (err) {
        console.error(`[RiskAssessor] assess_position() failed ${borrower}:`, err.message);
    }
}

async function callRiskAssessorBatch() {
    const borrowers = [...state.activeBorrowers].slice(0, 16);
    if (!borrowers.length) return;

    const addrArr = new Array(16).fill(ethers.ZeroAddress);
    const collArr = new Array(16).fill(0n);
    const debtArr = new Array(16).fill(0n);
    const scoreArr = new Array(16).fill(0);

    let realCount = 0;
    for (let i = 0; i < borrowers.length; i++) {
        const pos = await fetchPositionData(borrowers[i]);
        if (!pos) continue;
        addrArr[i] = borrowers[i];
        collArr[i] = pos.collateralUSD_x6;
        debtArr[i] = pos.debtUSD_x6;
        scoreArr[i] = state.borrowerScores.get(borrowers[i]) ?? 0;
        realCount++;
    }
    if (!realCount) return;

    try {
        const tx = await risk.assess_batch(
            addrArr, collArr, debtArr, scoreArr,
            compute7dChangeBps(), 11_000, realCount,
        );
        await tx.wait();
        console.log(`[RiskAssessor] assess_batch() ${realCount} positions ✓  tx:${tx.hash}`);
    } catch (err) {
        console.error('[RiskAssessor] assess_batch() failed:', err.message);
    }
}

async function callYieldMind() {
    if (state.priceHistory.length < 5) {
        console.log('[YieldMind] skipping - insufficient price history');
        return;
    }
    try {
        const [deposited, borrowed, stratBal, currentBlock] = await Promise.all([
            lending.totalDeposited(),
            lending.totalBorrowed(),
            yieldPool.totalPrincipal(),
            provider.getBlockNumber(),
        ]);
        const blocksSinceRebalance = Number(BigInt(currentBlock) - state.lastRebalanceBlock);
        const tx = await yieldMind.compute_allocation(
            BigInt(deposited),
            BigInt(borrowed),
            BigInt(stratBal),
            state.avgCreditScore,
            computeVolatilityBps(),
            blocksSinceRebalance,
        );
        await tx.wait();
        state.lastRebalanceBlock = BigInt(currentBlock);
        console.log(`[YieldMind] compute_allocation() ✓  tx:${tx.hash}`);
    } catch (err) {
        console.error('[YieldMind] compute_allocation() failed:', err.message);
    }
}

// ─── Event-driven triggers (polling via eth_getLogs - eth_newFilter unsupported) ──

function setupPolling(startBlock) {
    let fromBlock = startBlock;

    const LENDING_EVENTS = [
        lending.filters.Borrowed(),
        lending.filters.Repaid(),
        lending.filters.CollateralDeposited(),
        lending.filters.Liquidated(),
        lending.filters.Deposited(),
        lending.filters.YieldHarvested(),
    ];

    const poll = async () => {
        try {
            const toBlock = await provider.getBlockNumber();
            if (toBlock <= fromBlock) return;

            // Update price history
            try {
                const price = await oracle.latestPrice();
                state.priceHistory.push(BigInt(price));
                if (state.priceHistory.length > 100) state.priceHistory.shift();
            } catch (_) { }

            // Poll lending events
            for (const filter of LENDING_EVENTS) {
                const logs = await lending.queryFilter(filter, fromBlock + 1, toBlock).catch(() => []);
                for (const log of logs) {
                    const { name, args } = log;
                    const borrower = args[0]?.toLowerCase?.() ?? args[0];

                    if (name === 'Borrowed') {
                        state.activeBorrowers.add(borrower);
                        console.log(`[aiEngine] Borrowed - borrower:${borrower}`);
                        await callNeuralScorer(borrower);
                    } else if (name === 'Repaid') {
                        console.log(`[aiEngine] Repaid - borrower:${borrower}`);
                        await callNeuralScorer(borrower);
                    } else if (name === 'CollateralDeposited') {
                        state.activeBorrowers.add(borrower);
                        console.log(`[aiEngine] CollateralDeposited - borrower:${borrower}`);
                        await callRiskAssessor(borrower);
                    } else if (name === 'Liquidated') {
                        console.log(`[aiEngine] Liquidated - borrower:${borrower}`);
                        await callRiskAssessor(borrower);
                    } else if (name === 'Deposited' || name === 'YieldHarvested') {
                        console.log(`[aiEngine] ${name} event`);
                        await callYieldMind();
                    }
                }
            }

            // Periodic sweep every 50 blocks (~5 min)
            // Always runs - uses wallet as sentinel demo borrower when no real borrowers exist
            // so that PVM contracts emit events even on quiet testnet periods.
            const current = BigInt(toBlock);
            if (current >= state.lastSweepBlock + 50n) {
                state.lastSweepBlock = current;
                const realBorrowers = [...state.activeBorrowers];
                const sweepList = realBorrowers.length > 0 ? realBorrowers : [wallet.address];
                const isDemo = realBorrowers.length === 0;
                console.log(`[aiEngine] periodic sweep at block ${toBlock} - ${sweepList.length} borrower(s)${isDemo ? ' (demo sentinel)' : ''}`);
                for (const borrower of sweepList) {
                    await callNeuralScorer(borrower);
                    await callRiskAssessor(borrower);
                }
                // Always run yield-mind with current pool state
                await callYieldMind();
            }

            fromBlock = toBlock;
        } catch (err) {
            console.error('[aiEngine] poll error:', err.message);
        }
    };

    poll();
    setInterval(poll, 12_000);  // poll every ~2 blocks
}

// ─── Startup ──────────────────────────────────────────────────────────────────

async function start() {
    if (!KEY) return;
    if (!NEURAL_ADDR || !RISK_ADDR || !YIELD_MIND_ADDR) {
        console.warn('[aiEngine] Contract addresses not set - event polling disabled');
        return;
    }
    const block = await provider.getBlockNumber();
    state.lastSweepBlock = BigInt(block);
    console.log(`[aiEngine] started at block ${block}`);
    console.log(`[aiEngine]   NeuralScorer  ${NEURAL_ADDR}`);
    console.log(`[aiEngine]   RiskAssessor  ${RISK_ADDR}`);
    console.log(`[aiEngine]   YieldMind     ${YIELD_MIND_ADDR}`);
    console.log(`[aiEngine] listening for protocol events...`);
    setupPolling(block);
}

module.exports = { start };

// allow standalone: node src/aiEngine.js
if (require.main === module) start().catch(err => console.error('[aiEngine]', err.message));
