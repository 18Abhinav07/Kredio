import { useReadContract, useWriteContract, useAccount } from 'wagmi'

const VAULT_ADDRESS = process.env.NEXT_PUBLIC_TESSERACT_VAULT_ADDR as `0x${string}`;

const VAULT_ABI = [
    {
        type: 'function',
        name: 'totalAssets',
        inputs: [],
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view'
    },
    {
        type: 'function',
        name: 'balanceOf',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view'
    },
    {
        type: 'function',
        name: 'activeStrategies',
        inputs: [{ name: '', type: 'uint256' }],
        outputs: [{ name: '', type: 'address' }],
        stateMutability: 'view'
    }
];

export function useVault() {
    const { address } = useAccount();

    const { data: totalAssets } = useReadContract({
        address: VAULT_ADDRESS,
        abi: VAULT_ABI,
        functionName: 'totalAssets',
    });

    const { data: userBalance } = useReadContract({
        address: VAULT_ADDRESS,
        abi: VAULT_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        }
    });

    // Simplified fetch for strategies (hardcoded indexing length assumption for UI proof of concept)
    // To handle dynamic arrays natively in wagmi without knowing max length, we retrieve index 0 and 1.
    const { data: strategy0 } = useReadContract({
        address: VAULT_ADDRESS,
        abi: VAULT_ABI,
        functionName: 'activeStrategies',
        args: [0n],
    });

    const { data: strategy1 } = useReadContract({
        address: VAULT_ADDRESS,
        abi: VAULT_ABI,
        functionName: 'activeStrategies',
        args: [1n],
    });

    const activeStrategiesList = [strategy0, strategy1].filter(Boolean);

    return {
        totalAssets,
        userBalance,
        activeStrategies: activeStrategiesList
    };
}
