import { useReadContract, useWriteContract, useAccount } from 'wagmi'
import { parseUnits } from 'viem'

const SWAP_ADDRESS = process.env.NEXT_PUBLIC_TESSERACT_SWAP_ADDR as `0x${string}`;

const ERC20_ABI = [
    {
        type: 'function',
        name: 'allowance',
        inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }],
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view'
    },
    {
        type: 'function',
        name: 'approve',
        inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }],
        outputs: [{ name: '', type: 'bool' }],
        stateMutability: 'nonpayable'
    }
];

const SWAP_ABI = [
    {
        type: 'function',
        name: 'swapExactTokensForTokens',
        inputs: [
            { name: 'amountIn', type: 'uint256' },
            { name: 'amountOutMin', type: 'uint256' },
            { name: 'path', type: 'address[]' },
            { name: 'to', type: 'address' },
            { name: 'deadline', type: 'uint256' }
        ],
        outputs: [{ name: 'amounts', type: 'uint256[]' }],
        stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        name: 'swapAndBridgeXCM',
        inputs: [
            { name: 'tokenIn', type: 'address' },
            { name: 'tokenOut', type: 'address' },
            { name: 'amountIn', type: 'uint256' },
            { name: 'minAmountOut', type: 'uint256' },
            { name: 'destinationParachain', type: 'bytes' },
            { name: 'xcmMessage', type: 'bytes' },
            { name: 'deadline', type: 'uint256' }
        ],
        outputs: [{ name: 'amountOut', type: 'uint256' }],
        stateMutability: 'nonpayable'
    }
];

export function useSwap() {
    const { address } = useAccount();
    const { writeContractAsync } = useWriteContract();

    const checkAndApprove = async (tokenAddress: `0x${string}`, amount: bigint) => {
        if (!address) throw new Error("Wallet not connected");

        await writeContractAsync({
            address: tokenAddress,
            abi: ERC20_ABI,
            functionName: 'approve',
            args: [SWAP_ADDRESS, amount],
        });
    };

    const executeSwap = async (
        tokenIn: `0x${string}`,
        tokenOut: `0x${string}`,
        amountIn: string,
        amountOutMin: string
    ) => {
        if (!address) throw new Error("Wallet not connected");

        const parsedAmountIn = parseUnits(amountIn, 18);
        const parsedMinOut = parseUnits(amountOutMin, 18);
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

        // Always attempt approval, logic could be optimized with allowance reading
        await checkAndApprove(tokenIn, parsedAmountIn);

        const tx = await writeContractAsync({
            address: SWAP_ADDRESS,
            abi: SWAP_ABI,
            functionName: 'swapExactTokensForTokens',
            args: [parsedAmountIn, parsedMinOut, [tokenIn, tokenOut], address, deadline],
        });

        return tx;
    };

    const executeXCMSwap = async (
        tokenIn: `0x${string}`,
        tokenOut: `0x${string}`,
        amountIn: string,
        minAmountOut: string,
        destinationParachain: `0x${string}`,
        xcmMessage: `0x${string}`
    ) => {
        if (!address) throw new Error("Wallet not connected");

        const parsedAmountIn = parseUnits(amountIn, 18);
        const parsedMinOut = parseUnits(minAmountOut, 18);
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

        await checkAndApprove(tokenIn, parsedAmountIn);

        const tx = await writeContractAsync({
            address: SWAP_ADDRESS,
            abi: SWAP_ABI,
            functionName: 'swapAndBridgeXCM',
            args: [tokenIn, tokenOut, parsedAmountIn, parsedMinOut, destinationParachain, xcmMessage, deadline],
        });

        return tx;
    };

    return { executeSwap, executeXCMSwap };
}
