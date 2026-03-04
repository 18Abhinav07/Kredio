'use client';
import { useCallback, useState } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { ABIS } from '../lib/constants';
import config, { isDeployed } from '../lib/addresses';

type ComputeState = {
    refTime: bigint;
    proofSize: bigint;
    codeHash: string;
    bestStrategyIndex: number | null;
    isLoading: boolean;
    error: string | null;
};

export function useCompute() {
    const { address, isConnected } = useAccount();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();

    const [state, setState] = useState<ComputeState>({
        refTime: 0n, proofSize: 0n, codeHash: '',
        bestStrategyIndex: null, isLoading: false, error: null,
    });

    const fetchSystemInfo = useCallback(async () => {
        if (!publicClient || !isDeployed(config.compute)) return;
        try {
            const result = await publicClient.readContract({
                address: config.compute, abi: ABIS.COMPUTE,
                functionName: 'systemInfo',
            }) as [bigint, bigint, `0x${string}`];

            setState(s => ({
                ...s,
                refTime: result[0],
                proofSize: result[1],
                codeHash: result[2],
                error: null,
            }));
        } catch (e: any) {
            setState(s => ({ ...s, error: e.message }));
        }
    }, [publicClient]);

    const findBestStrategy = useCallback(async (aprs: number[]) => {
        if (!walletClient || !publicClient) return;
        if (!isDeployed(config.compute)) {
            // Compute contract not deployed — do it client-side
            const maxIdx = aprs.indexOf(Math.max(...aprs));
            setState(s => ({ ...s, bestStrategyIndex: maxIdx }));
            return maxIdx;
        }

        setState(s => ({ ...s, isLoading: true, error: null }));
        try {
            const tx = await walletClient.writeContract({
                address: config.compute, abi: ABIS.COMPUTE,
                functionName: 'getBestStrategy', args: [aprs.map(a => BigInt(a))],
            });
            const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });

            // Parse StrategySelected event from logs
            // For now use client-side fallback
            const maxIdx = aprs.indexOf(Math.max(...aprs));
            setState(s => ({ ...s, isLoading: false, bestStrategyIndex: maxIdx }));
            return maxIdx;
        } catch (e: any) {
            setState(s => ({ ...s, isLoading: false, error: e.message }));
            // Fallback to client-side
            const maxIdx = aprs.indexOf(Math.max(...aprs));
            setState(s => ({ ...s, bestStrategyIndex: maxIdx }));
            return maxIdx;
        }
    }, [walletClient, publicClient]);

    const getAssetBalance = useCallback(async (assetAddr: `0x${string}`) => {
        if (!publicClient || !isDeployed(config.compute)) return 0n;
        try {
            return await publicClient.readContract({
                address: config.compute, abi: ABIS.COMPUTE,
                functionName: 'getAssetBalance', args: [assetAddr],
            }) as bigint;
        } catch {
            return 0n;
        }
    }, [publicClient]);

    return {
        ...state,
        fetchSystemInfo,
        findBestStrategy,
        getAssetBalance,
        isConnected,
        isDeployed: isDeployed(config.compute),
    };
}
