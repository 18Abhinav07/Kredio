'use client';
import { useCallback, useState } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { ABIS } from '../lib/constants';
import config, { isDeployed } from '../lib/addresses';

type SwapState = {
    reserveA: bigint;
    reserveB: bigint;
    balanceA: bigint;
    balanceB: bigint;
    estimatedOut: bigint;
    isLoading: boolean;
    error: string | null;
};

export function useSwapLogic() {
    const { address, isConnected } = useAccount();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();

    const [state, setState] = useState<SwapState>({
        reserveA: 0n, reserveB: 0n,
        balanceA: 0n, balanceB: 0n,
        estimatedOut: 0n,
        isLoading: false, error: null,
    });

    // Fetch reserves and balances
    const fetchPoolData = useCallback(async (assetA: number, assetB: number) => {
        if (!publicClient || !address || !isDeployed(config.swap)) return;
        try {
            const reserves = await publicClient.readContract({
                address: config.swap, abi: ABIS.SWAP,
                functionName: 'getReserves', args: [assetA, assetB],
            }) as [bigint, bigint];

            // Get token addresses
            const tokenA = await publicClient.readContract({
                address: config.swap, abi: ABIS.SWAP,
                functionName: 'assetPrecompile', args: [assetA],
            }) as `0x${string}`;
            const tokenB = await publicClient.readContract({
                address: config.swap, abi: ABIS.SWAP,
                functionName: 'assetPrecompile', args: [assetB],
            }) as `0x${string}`;

            // Guard: skip balanceOf if the asset isn't registered on-chain yet
            const balA = isDeployed(tokenA)
                ? (await publicClient.readContract({
                    address: tokenA, abi: ABIS.ERC20,
                    functionName: 'balanceOf', args: [address],
                }) as bigint)
                : 0n;
            const balB = isDeployed(tokenB)
                ? (await publicClient.readContract({
                    address: tokenB, abi: ABIS.ERC20,
                    functionName: 'balanceOf', args: [address],
                }) as bigint)
                : 0n;

            setState(s => ({
                ...s, reserveA: reserves[0], reserveB: reserves[1],
                balanceA: balA, balanceB: balB, error: null,
            }));
        } catch (e: any) {
            setState(s => ({ ...s, error: e.message }));
        }
    }, [publicClient, address]);

    // Estimate output amount
    const estimateOutput = useCallback((amountIn: string, reserveIn: bigint, reserveOut: bigint, decimalsIn: number) => {
        if (!amountIn || reserveIn === 0n || reserveOut === 0n) {
            setState(s => ({ ...s, estimatedOut: 0n }));
            return;
        }
        try {
            const parsed = parseUnits(amountIn, decimalsIn);
            const withFee = parsed * 997n;
            const out = (withFee * reserveOut) / (reserveIn * 1000n + withFee);
            setState(s => ({ ...s, estimatedOut: out }));
        } catch {
            setState(s => ({ ...s, estimatedOut: 0n }));
        }
    }, []);

    // Execute swap
    const executeSwap = useCallback(async (
        assetIdIn: number, assetIdOut: number,
        amountIn: string, minAmountOut: string,
        decimalsIn: number,
        decimalsOut: number,
    ) => {
        if (!walletClient || !publicClient || !address || !isDeployed(config.swap)) return;
        setState(s => ({ ...s, isLoading: true, error: null }));
        try {
            const parsed = parseUnits(amountIn, decimalsIn);
            const minOut = parseUnits(minAmountOut || '0', decimalsOut);

            // Get token address and approve
            const tokenIn = await publicClient.readContract({
                address: config.swap, abi: ABIS.SWAP,
                functionName: 'assetPrecompile', args: [assetIdIn],
            }) as `0x${string}`;

            if (!isDeployed(tokenIn)) {
                setState(s => ({ ...s, isLoading: false, error: `Asset ${assetIdIn} not registered on swap contract` }));
                return;
            }

            const allowance = await publicClient.readContract({
                address: tokenIn, abi: ABIS.ERC20,
                functionName: 'allowance', args: [address, config.swap],
            }) as bigint;

            if (allowance < parsed) {
                const approveTx = await walletClient.writeContract({
                    address: tokenIn, abi: ABIS.ERC20,
                    functionName: 'approve', args: [config.swap, parsed],
                });
                await publicClient.waitForTransactionReceipt({ hash: approveTx });
            }

            // Execute swap
            const tx = await walletClient.writeContract({
                address: config.swap, abi: ABIS.SWAP,
                functionName: 'swap',
                args: [assetIdIn, assetIdOut, parsed, minOut],
            });
            await publicClient.waitForTransactionReceipt({ hash: tx });

            setState(s => ({ ...s, isLoading: false }));
            return tx;
        } catch (e: any) {
            setState(s => ({ ...s, isLoading: false, error: e.message }));
        }
    }, [walletClient, publicClient, address]);

    // Execute swap + XCM bridge
    const executeSwapAndBridge = useCallback(async (
        assetIdIn: number, assetIdOut: number,
        amountIn: string, minAmountOut: string,
        xcmDestination: `0x${string}`, xcmMessage: `0x${string}`,
        decimalsIn: number,
        decimalsOut: number,
    ) => {
        if (!walletClient || !publicClient || !address || !isDeployed(config.swap)) return;
        setState(s => ({ ...s, isLoading: true, error: null }));
        try {
            const parsed = parseUnits(amountIn, decimalsIn);
            const minOut = parseUnits(minAmountOut || '0', decimalsOut);

            // Approve
            const tokenIn = await publicClient.readContract({
                address: config.swap, abi: ABIS.SWAP,
                functionName: 'assetPrecompile', args: [assetIdIn],
            }) as `0x${string}`;

            if (!isDeployed(tokenIn)) {
                setState(s => ({ ...s, isLoading: false, error: `Asset ${assetIdIn} not registered on swap contract` }));
                return;
            }

            const allowance = await publicClient.readContract({
                address: tokenIn, abi: ABIS.ERC20,
                functionName: 'allowance', args: [address, config.swap],
            }) as bigint;

            if (allowance < parsed) {
                const approveTx = await walletClient.writeContract({
                    address: tokenIn, abi: ABIS.ERC20,
                    functionName: 'approve', args: [config.swap, parsed],
                });
                await publicClient.waitForTransactionReceipt({ hash: approveTx });
            }

            const tx = await walletClient.writeContract({
                address: config.swap, abi: ABIS.SWAP,
                functionName: 'swapAndBridgeXCM',
                args: [assetIdIn, assetIdOut, parsed, minOut, xcmDestination, xcmMessage],
            });
            await publicClient.waitForTransactionReceipt({ hash: tx });

            setState(s => ({ ...s, isLoading: false }));
            return tx;
        } catch (e: any) {
            setState(s => ({ ...s, isLoading: false, error: e.message }));
        }
    }, [walletClient, publicClient, address]);

    return {
        ...state,
        fetchPoolData,
        estimateOutput,
        executeSwap,
        executeSwapAndBridge,
        isConnected,
        formatAmount: (v: bigint, d: number) => formatUnits(v, d),
    };
}
