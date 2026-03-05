'use client';

import * as React from 'react';
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
    if (tier >= 4) return 'PLATINUM';
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
        lendingDefaultCount: 0n,
        pasRepaymentCount: 0n,
        pasDefaultCount: 0n,
    });

    const refresh = React.useCallback(async () => {
        if (!publicClient || !address) return;
        setLoading(true);
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
                lendingDefaultCount,
                pasRepaymentCount,
                pasDefaultCount,
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
                publicClient.readContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'defaultCount', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'repaymentCount', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'defaultCount', args: [address] }) as Promise<bigint>,
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
                lendingDefaultCount,
                pasRepaymentCount,
                pasDefaultCount,
            });
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
    // If it's a huge number (like type(uint256).max), meaning no debt, show infinity
    if (raw > 1e18) return '∞';
    return (raw / 1e18).toFixed(digits);
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
