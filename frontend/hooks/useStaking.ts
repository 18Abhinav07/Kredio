import { useReadContract, useWriteContract, useAccount } from 'wagmi'
import { parseUnits } from 'viem'

const STAKE_ADDRESS = process.env.NEXT_PUBLIC_TESSERACT_STAKE_ADDR as `0x${string}`;

const STAKE_ABI = [
    {
        type: 'function',
        name: 'exchangeRate',
        inputs: [],
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view'
    },
    {
        type: 'function',
        name: 'stake',
        inputs: [{ name: 'amount', type: 'uint256' }],
        outputs: [],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        name: 'unstake',
        inputs: [{ name: 'shares', type: 'uint256' }],
        outputs: [],
        stateMutability: 'nonpayable'
    }
];

export function useStaking() {
    const { address } = useAccount();
    const { writeContractAsync } = useWriteContract();

    const { data: exchangeRate, refetch: refetchExchangeRate } = useReadContract({
        address: STAKE_ADDRESS,
        abi: STAKE_ABI,
        functionName: 'exchangeRate',
    });

    const stake = async (amount: string) => {
        if (!address) throw new Error("Wallet not connected");
        const parsedAmount = parseUnits(amount, 18);

        // NOTE: Requires token approval to TesseractStake addressing before executing
        const tx = await writeContractAsync({
            address: STAKE_ADDRESS,
            abi: STAKE_ABI,
            functionName: 'stake',
            args: [parsedAmount],
        });

        return tx;
    };

    const unstake = async (shares: string) => {
        if (!address) throw new Error("Wallet not connected");
        const parsedShares = parseUnits(shares, 18);

        const tx = await writeContractAsync({
            address: STAKE_ADDRESS,
            abi: STAKE_ABI,
            functionName: 'unstake',
            args: [parsedShares],
        });

        return tx;
    };

    return { exchangeRate, refetchExchangeRate, stake, unstake };
}
