'use client';

import * as React from 'react';
import { parseAbiItem } from 'viem';
import { useAccount, useBalance, usePublicClient } from 'wagmi';
import config from '../lib/addresses';
import { ABIS } from '../lib/constants';
import { formatInteger, formatTokenAmount } from '../lib/utils';

export type MarketSnapshot = {
    totalDeposited: bigint;
    totalBorrowed: bigint;
    utilizationBps: bigint;
    protocolFees: bigint;
};

export type OracleSnapshot = {
    price8: bigint;
    updatedAt: bigint;
    roundId: bigint;
    isCrashed: boolean;
};

export type ScoreSnapshot = {
    score: bigint;
    tier: number;
    collateralRatioBps: number;
    interestRateBps: number;
    blockNumber: bigint;
};

const defaultMarket: MarketSnapshot = {
    totalDeposited: 0n,
    totalBorrowed: 0n,
    utilizationBps: 0n,
    protocolFees: 0n,
};

const defaultOracle: OracleSnapshot = {
    price8: 0n,
    updatedAt: 0n,
    roundId: 0n,
    isCrashed: false,
};

const defaultScore: ScoreSnapshot = {
    score: 0n,
    tier: 0,
    collateralRatioBps: 0,
    interestRateBps: 0,
    blockNumber: 0n,
};

export function tierLabel(tier: number) {
    if (tier >= 5) return 'DIAMOND';
    if (tier === 4) return 'PLATINUM';
    if (tier === 3) return 'GOLD';
    if (tier === 2) return 'SILVER';
    if (tier === 1) return 'BRONZE';
    return 'ANON';
}

export function useGlobalProtocolData() {
    const publicClient = usePublicClient();
    const [lending, setLending] = React.useState<MarketSnapshot>(defaultMarket);
    const [pasMarket, setPasMarket] = React.useState<MarketSnapshot>(defaultMarket);
    const [oracle, setOracle] = React.useState<OracleSnapshot>(defaultOracle);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const refresh = React.useCallback(async () => {
        if (!publicClient) return;
        setLoading(true);
        setError(null);
        try {
            const [
                lendingDeposited,
                lendingBorrowed,
                lendingUtil,
                lendingFees,
                pasDeposited,
                pasBorrowed,
                pasUtil,
                pasFees,
                oracleTuple,
                isCrashed,
            ] = await Promise.all([
                publicClient.readContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'totalDeposited' }) as Promise<bigint>,
                publicClient.readContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'totalBorrowed' }) as Promise<bigint>,
                publicClient.readContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'utilizationRate' }) as Promise<bigint>,
                publicClient.readContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'protocolFees' }) as Promise<bigint>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'totalDeposited' }) as Promise<bigint>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'totalBorrowed' }) as Promise<bigint>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'utilizationRate' }) as Promise<bigint>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'protocolFees' }) as Promise<bigint>,
                publicClient.readContract({ address: config.oracle, abi: ABIS.PAS_ORACLE, functionName: 'latestRoundData' }) as Promise<[bigint, bigint, bigint, bigint, bigint]>,
                publicClient.readContract({ address: config.oracle, abi: ABIS.PAS_ORACLE, functionName: 'isCrashed' }) as Promise<boolean>,
            ]);

            setLending({
                totalDeposited: lendingDeposited,
                totalBorrowed: lendingBorrowed,
                utilizationBps: lendingUtil,
                protocolFees: lendingFees,
            });
            setPasMarket({
                totalDeposited: pasDeposited,
                totalBorrowed: pasBorrowed,
                utilizationBps: pasUtil,
                protocolFees: pasFees,
            });
            setOracle({
                roundId: oracleTuple[0],
                price8: oracleTuple[1],
                updatedAt: oracleTuple[3],
                isCrashed,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to refresh protocol data');
        } finally {
            setLoading(false);
        }
    }, [publicClient]);

    React.useEffect(() => {
        refresh();
        const id = window.setInterval(refresh, 30_000);
        return () => window.clearInterval(id);
    }, [refresh]);

    return { lending, pasMarket, oracle, loading, error, refresh };
}

export function useUserScore() {
    const publicClient = usePublicClient();
    const { address } = useAccount();
    const [score, setScore] = React.useState<ScoreSnapshot>(defaultScore);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const refresh = React.useCallback(async () => {
        if (!publicClient || !address) return;
        setLoading(true);
        setError(null);
        try {
            const [res, blockNumber] = await Promise.all([
                publicClient.readContract({
                    address: config.lending,
                    abi: ABIS.KREDIO_LENDING,
                    functionName: 'getScore',
                    args: [address],
                }) as Promise<readonly [bigint, number, number, number]>,
                publicClient.getBlockNumber(),
            ]);

            setScore({
                score: res[0],
                tier: Number(res[1]),
                collateralRatioBps: res[2],
                interestRateBps: res[3],
                blockNumber,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to fetch score');
        } finally {
            setLoading(false);
        }
    }, [publicClient, address]);

    React.useEffect(() => {
        if (address) refresh();
    }, [address, refresh]);

    return { score, loading, error, refresh };
}

export function useUserPortfolio() {
    const publicClient = usePublicClient();
    const { address } = useAccount();
    const { data: nativePas } = useBalance({ address });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [state, setState] = React.useState({
        lendingDeposit: 0n,
        lendingPendingYield: 0n,
        lendingCollateralWallet: 0n,
        lendingPosition: [0n, 0n, 0n, 0n, 0, 0, false] as [bigint, bigint, bigint, bigint, number, number, boolean],
        lendingHealthRatio: 0n,
        pasDeposit: 0n,
        pasPendingYield: 0n,
        pasCollateralWallet: 0n,
        pasPosition: [0n, 0n, 0n, 0n, 0n, 0, 0, false] as [bigint, bigint, bigint, bigint, bigint, number, number, boolean],
        pasHealthRatio: 0n,
        governance: [0n, 0, 0n] as [bigint, number, bigint],
        lendingRepaymentCount: 0n,
        lendingLiquidationCount: 0n,
        lendingTotalDepositedEver: 0n,
        lendingFirstSeenBlock: 0n,
        pasRepaymentCount: 0n,
        pasLiquidationCount: 0n,
        pasTotalDepositedEver: 0n,
        pasFirstSeenBlock: 0n,
    });

    const hasLoadedOnce = React.useRef(false);

    const refresh = React.useCallback(async () => {
        if (!publicClient || !address) return;
        // Only show the loading spinner for the initial fetch; background ticks are silent.
        if (!hasLoadedOnce.current) setLoading(true);
        setError(null);
        try {
            const [
                lendingDeposit,
                lendingPendingYield,
                lendingCollateralWallet,
                lendingPosition,
                lendingHealthRatio,
                pasDeposit,
                pasPendingYield,
                pasCollateralWallet,
                pasPosition,
                pasHealthRatio,
                governance,
                lendingRepaymentCount,
                lendingLiquidationCount,
                lendingTotalDepositedEver,
                lendingFirstSeenBlock,
                pasRepaymentCount,
                pasLiquidationCount,
                pasTotalDepositedEver,
                pasFirstSeenBlock,
            ] = await Promise.all([
                publicClient.readContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'depositBalance', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'pendingYield', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'collateralBalance', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'getPositionFull', args: [address] }) as Promise<readonly [bigint, bigint, bigint, bigint, number, number, boolean]>,
                publicClient.readContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'healthRatio', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'depositBalance', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'pendingYield', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'collateralBalance', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'getPositionFull', args: [address] }) as Promise<readonly [bigint, bigint, bigint, bigint, bigint, number, number, boolean]>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'healthRatio', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.governanceCache, abi: ABIS.GOVERNANCE_CACHE, functionName: 'getGovernanceData', args: [address] }) as Promise<readonly [bigint, number, bigint]>,
                publicClient.readContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'repaymentCount', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'liquidationCount', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'totalDepositedEver', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'firstSeenBlock', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'repaymentCount', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'liquidationCount', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'totalDepositedEver', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'firstSeenBlock', args: [address] }) as Promise<bigint>,
            ]);

            setState({
                lendingDeposit,
                lendingPendingYield,
                lendingCollateralWallet,
                lendingPosition: [
                    lendingPosition[0],
                    lendingPosition[1],
                    lendingPosition[2],
                    lendingPosition[3],
                    lendingPosition[4],
                    lendingPosition[5],
                    lendingPosition[6],
                ],
                lendingHealthRatio,
                pasDeposit,
                pasPendingYield,
                pasCollateralWallet,
                pasPosition: [
                    pasPosition[0],
                    pasPosition[1],
                    pasPosition[2],
                    pasPosition[3],
                    pasPosition[4],
                    pasPosition[5],
                    pasPosition[6],
                    pasPosition[7],
                ],
                pasHealthRatio,
                governance: [governance[0], governance[1], governance[2]],
                lendingRepaymentCount,
                lendingLiquidationCount,
                lendingTotalDepositedEver,
                lendingFirstSeenBlock,
                pasRepaymentCount,
                pasLiquidationCount,
                pasTotalDepositedEver,
                pasFirstSeenBlock,
            });
            hasLoadedOnce.current = true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to fetch portfolio data');
        } finally {
            setLoading(false);
        }
    }, [publicClient, address]);

    React.useEffect(() => {
        if (address) {
            refresh();
            const id = window.setInterval(refresh, 30_000);
            return () => window.clearInterval(id);
        }
    }, [address, refresh]);

    return { ...state, nativePas: nativePas?.value ?? 0n, loading, error, refresh };
}

export function bpsToPercent(bps: bigint | number, digits = 2) {
    const raw = typeof bps === 'number' ? bps : Number(bps);
    return `${(raw / 100).toFixed(digits)}%`;
}

export function formatHealthFactor(bps: bigint | number, digits = 2) {
    const raw = typeof bps === 'number' ? bps : Number(bps);
    // type(uint256).max signals no active position - both contracts use this as sentinel
    if (raw > 1_000_000_000) return '∞';
    // Both KredioLending and KredioPASMarket return (collateral * 10000) / owed (BPS)
    return (raw / 10000).toFixed(digits) + 'x';
}

export function fmtUsd6(value: bigint) {
    return formatTokenAmount(value, 6, 2, false);
}

export function fmtToken(value: bigint, decimals: number, digits = 4) {
    return formatTokenAmount(value, decimals, digits, false);
}

export function fmtCount(value: bigint | number) {
    return formatInteger(value);
}

export function fmtOraclePrice8(value: bigint) {
    return `$${formatTokenAmount(value, 8, 4, true)}`;
}

export function fmtTimestamp(seconds: bigint) {
    const millis = Number(seconds) * 1000;
    if (!Number.isFinite(millis) || millis <= 0) return 'N/A';
    return new Date(millis).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

export function healthState(healthBps: bigint) {
    const value = Number(healthBps);
    if (value < 11_000) return 'red';
    if (value < 15_000) return 'yellow';
    return 'green';
}

// ── Intelligent Yield Strategy data ───────────────────────────────────────

export type StrategySnapshot = {
    pool: string;
    investedAmount: bigint;
    totalStrategyYieldEarned: bigint;
    pendingStrategyYield: bigint;
    investRatioBps: bigint;
    minBufferBps: bigint;
    isActive: boolean;
};

const STRATEGY_ZERO_ADDR = '0x0000000000000000000000000000000000000000';

const defaultStrategy: StrategySnapshot = {
    pool: STRATEGY_ZERO_ADDR,
    investedAmount: 0n,
    totalStrategyYieldEarned: 0n,
    pendingStrategyYield: 0n,
    investRatioBps: 5000n,
    minBufferBps: 2000n,
    isActive: false,
};

export function useStrategyData() {
    const publicClient = usePublicClient();
    const [strategy, setStrategy] = React.useState<StrategySnapshot>(defaultStrategy);
    const [loading, setLoading] = React.useState(false);

    const refresh = React.useCallback(async () => {
        if (!publicClient) return;
        setLoading(true);
        try {
            const result = await publicClient.readContract({
                address: config.lending,
                abi: ABIS.KREDIO_LENDING,
                functionName: 'strategyStatus',
            }) as readonly [string, bigint, bigint, bigint, bigint, bigint];

            setStrategy({
                pool: result[0],
                investedAmount: result[1],
                totalStrategyYieldEarned: result[2],
                pendingStrategyYield: result[3],
                investRatioBps: result[4],
                minBufferBps: result[5],
                isActive: result[1] > 0n,
            });
        } catch {
            // Strategy not yet deployed on this lending contract - keep defaults silently.
        } finally {
            setLoading(false);
        }
    }, [publicClient]);

    React.useEffect(() => {
        refresh();
        const id = window.setInterval(refresh, 30_000);
        return () => window.clearInterval(id);
    }, [refresh]);

    return { strategy, loading, refresh };
}

// ── Lending history (on-chain event log) ──────────────────────────────────

export type LendHistoryEntry = {
    type: 'deposit' | 'withdraw' | 'yield';
    market: 'USDC Market' | 'PAS Market';
    amount: bigint;
    blockNumber: bigint;
    txHash: string;
};

// First block of the deployed contracts (0x5c2456 = 6,038,614)
const DEPLOY_BLOCK = 6_038_614n;

export function useLendingHistory() {
    const publicClient = usePublicClient();
    const { address } = useAccount();
    const [history, setHistory] = React.useState<LendHistoryEntry[]>([]);
    const [loading, setLoading] = React.useState(false);

    const refresh = React.useCallback(async () => {
        if (!publicClient || !address) return;
        setLoading(true);
        try {
            const addrLower = address.toLowerCase();

            const [harvestedL, depositedL, withdrawnL, harvestedP, depositedP, withdrawnP] = await Promise.all([
                publicClient.getLogs({ address: config.lending, event: parseAbiItem('event YieldHarvested(address indexed lender, uint256 amount)'), fromBlock: DEPLOY_BLOCK }),
                publicClient.getLogs({ address: config.lending, event: parseAbiItem('event Deposited(address indexed user, uint256 amount)'), fromBlock: DEPLOY_BLOCK }),
                publicClient.getLogs({ address: config.lending, event: parseAbiItem('event Withdrawn(address indexed user, uint256 amount)'), fromBlock: DEPLOY_BLOCK }),
                publicClient.getLogs({ address: config.pasMarket, event: parseAbiItem('event YieldHarvested(address indexed lender, uint256 amount)'), fromBlock: DEPLOY_BLOCK }),
                publicClient.getLogs({ address: config.pasMarket, event: parseAbiItem('event Deposited(address indexed lender, uint256 amount)'), fromBlock: DEPLOY_BLOCK }),
                publicClient.getLogs({ address: config.pasMarket, event: parseAbiItem('event Withdrawn(address indexed lender, uint256 amount)'), fromBlock: DEPLOY_BLOCK }),
            ]);

            const entries: LendHistoryEntry[] = [];

            for (const log of harvestedL) {
                if ((log.args as any).lender?.toLowerCase() !== addrLower) continue;
                entries.push({ type: 'yield', market: 'USDC Market', amount: (log.args as any).amount ?? 0n, blockNumber: log.blockNumber ?? 0n, txHash: log.transactionHash ?? '' });
            }
            for (const log of depositedL) {
                if ((log.args as any).user?.toLowerCase() !== addrLower) continue;
                entries.push({ type: 'deposit', market: 'USDC Market', amount: (log.args as any).amount ?? 0n, blockNumber: log.blockNumber ?? 0n, txHash: log.transactionHash ?? '' });
            }
            for (const log of withdrawnL) {
                if ((log.args as any).user?.toLowerCase() !== addrLower) continue;
                entries.push({ type: 'withdraw', market: 'USDC Market', amount: (log.args as any).amount ?? 0n, blockNumber: log.blockNumber ?? 0n, txHash: log.transactionHash ?? '' });
            }
            for (const log of harvestedP) {
                if ((log.args as any).lender?.toLowerCase() !== addrLower) continue;
                entries.push({ type: 'yield', market: 'PAS Market', amount: (log.args as any).amount ?? 0n, blockNumber: log.blockNumber ?? 0n, txHash: log.transactionHash ?? '' });
            }
            for (const log of depositedP) {
                if ((log.args as any).lender?.toLowerCase() !== addrLower) continue;
                entries.push({ type: 'deposit', market: 'PAS Market', amount: (log.args as any).amount ?? 0n, blockNumber: log.blockNumber ?? 0n, txHash: log.transactionHash ?? '' });
            }
            for (const log of withdrawnP) {
                if ((log.args as any).lender?.toLowerCase() !== addrLower) continue;
                entries.push({ type: 'withdraw', market: 'PAS Market', amount: (log.args as any).amount ?? 0n, blockNumber: log.blockNumber ?? 0n, txHash: log.transactionHash ?? '' });
            }

            entries.sort((a, b) => (b.blockNumber > a.blockNumber ? 1 : -1));
            setHistory(entries.slice(0, 100));
        } catch (err) {
            console.error('useLendingHistory:', err);
        } finally {
            setLoading(false);
        }
    }, [publicClient, address]);

    React.useEffect(() => {
        if (address) refresh();
    }, [address, refresh]);

    return { history, loading, refresh };
}
