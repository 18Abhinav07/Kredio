'use client';
import { useCallback, useState } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { ABIS } from '../lib/constants';
import config, { isDeployed } from '../lib/addresses';
import { TUSDC } from '../lib/tokens';

type VaultState = {
    totalAssets: bigint;
    totalSupply: bigint;
    userShares: bigint;
    userAssetsValue: bigint;
    sharePrice: string;
    isLoading: boolean;
    error: string | null;
    isOwner: boolean;
    computeContract: string;
};

const UNDERLYING_DECIMALS = TUSDC.decimals; // 6

export function useVaultLogic() {
    const { address, isConnected } = useAccount();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();

    const [state, setState] = useState<VaultState>({
        totalAssets: 0n, totalSupply: 0n, userShares: 0n, userAssetsValue: 0n,
        sharePrice: '1.0', isLoading: false, error: null, isOwner: false,
        computeContract: '0x0000000000000000000000000000000000000000',
    });

    const fetchVaultData = useCallback(async () => {
        if (!publicClient || !address || !isDeployed(config.vault)) return;
        try {
            const [totalAssets, totalSupply, userShares, owner, compute] = await Promise.all([
                publicClient.readContract({ address: config.vault, abi: ABIS.VAULT, functionName: 'totalAssets' }) as Promise<bigint>,
                publicClient.readContract({ address: config.vault, abi: ABIS.VAULT, functionName: 'totalSupply' }) as Promise<bigint>,
                publicClient.readContract({ address: config.vault, abi: ABIS.VAULT, functionName: 'balanceOf', args: [address] }) as Promise<bigint>,
                publicClient.readContract({ address: config.vault, abi: ABIS.VAULT, functionName: 'owner' }) as Promise<`0x${string}`>,
                publicClient.readContract({ address: config.vault, abi: ABIS.VAULT, functionName: 'computeContract' }) as Promise<`0x${string}`>,
            ]);

            const userAssetsValue = totalSupply > 0n
                ? (userShares * totalAssets) / totalSupply
                : 0n;

            const sharePrice = totalSupply > 0n
                ? (Number(totalAssets) / Number(totalSupply)).toFixed(4)
                : '1.0';

            setState(s => ({
                ...s, totalAssets, totalSupply, userShares, userAssetsValue, sharePrice,
                isOwner: owner.toLowerCase() === address.toLowerCase(),
                computeContract: compute,
                error: null,
            }));
        } catch (e: any) {
            setState(s => ({ ...s, error: e.message }));
        }
    }, [publicClient, address]);

    const deposit = useCallback(async (amount: string) => {
        if (!walletClient || !publicClient || !address || !isDeployed(config.vault)) return;
        setState(s => ({ ...s, isLoading: true, error: null }));
        try {
            const parsed = parseUnits(amount, UNDERLYING_DECIMALS);

            // Approve underlying tUSDC
            const assetAddr = config.tUSDC;
            const allowance = await publicClient.readContract({
                address: assetAddr, abi: ABIS.ERC20,
                functionName: 'allowance', args: [address, config.vault],
            }) as bigint;

            if (allowance < parsed) {
                const approveTx = await walletClient.writeContract({
                    address: assetAddr, abi: ABIS.ERC20,
                    functionName: 'approve', args: [config.vault, parsed],
                });
                await publicClient.waitForTransactionReceipt({ hash: approveTx });
            }

            const tx = await walletClient.writeContract({
                address: config.vault, abi: ABIS.VAULT,
                functionName: 'deposit', args: [parsed, address],
            });
            await publicClient.waitForTransactionReceipt({ hash: tx });

            setState(s => ({ ...s, isLoading: false }));
            await fetchVaultData();
            return tx;
        } catch (e: any) {
            setState(s => ({ ...s, isLoading: false, error: e.message }));
        }
    }, [walletClient, publicClient, address, fetchVaultData]);

    const withdraw = useCallback(async (shares: string) => {
        if (!walletClient || !publicClient || !address || !isDeployed(config.vault)) return;
        setState(s => ({ ...s, isLoading: true, error: null }));
        try {
            const parsed = parseUnits(shares, UNDERLYING_DECIMALS);
            const tx = await walletClient.writeContract({
                address: config.vault, abi: ABIS.VAULT,
                functionName: 'withdraw', args: [parsed, address],
            });
            await publicClient.waitForTransactionReceipt({ hash: tx });

            setState(s => ({ ...s, isLoading: false }));
            await fetchVaultData();
            return tx;
        } catch (e: any) {
            setState(s => ({ ...s, isLoading: false, error: e.message }));
        }
    }, [walletClient, publicClient, address, fetchVaultData]);

    const rebalance = useCallback(async (aprs: number[], xcmMessage: `0x${string}`) => {
        if (!walletClient || !publicClient || !isDeployed(config.vault)) return;
        setState(s => ({ ...s, isLoading: true, error: null }));
        try {
            const tx = await walletClient.writeContract({
                address: config.vault, abi: ABIS.VAULT,
                functionName: 'rebalance', args: [aprs.map(a => BigInt(a)), xcmMessage],
            });
            await publicClient.waitForTransactionReceipt({ hash: tx });

            setState(s => ({ ...s, isLoading: false }));
            return tx;
        } catch (e: any) {
            setState(s => ({ ...s, isLoading: false, error: e.message }));
        }
    }, [walletClient, publicClient]);

    return {
        ...state,
        fetchVaultData,
        deposit,
        withdraw,
        rebalance,
        isConnected,
        decimals: UNDERLYING_DECIMALS,
        formatAmount: (v: bigint) => formatUnits(v, UNDERLYING_DECIMALS),
    };
}
