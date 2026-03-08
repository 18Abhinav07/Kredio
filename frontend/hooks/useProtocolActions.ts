'use client';

import { parseUnits } from 'viem';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import config from '../lib/addresses';
import { ABIS } from '../lib/constants';
import { useActionLog } from '../components/providers/ActionLogProvider';

type ActionResult = { ok: true; hash: `0x${string}` } | { ok: false; error: string };

function toErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return 'Unknown wallet error';
}

export function useProtocolActions() {
    const { address } = useAccount();
    const chainId = useChainId();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();
    const { logAction } = useActionLog();

    const ensureWallet = (action: string, market: 'lending' | 'pas' | 'system') => {
        if (!address || !walletClient || !publicClient) {
            logAction({ level: 'warning', action, detail: 'Connect wallet to continue', market });
            return 'Wallet not connected';
        }
        if (chainId !== config.chainId) {
            logAction({ level: 'warning', action, detail: `Switch network to chain ${config.chainId}`, market });
            return 'Wrong network';
        }
        return null;
    };

    const approveMUSDC = async (spender: `0x${string}`, amount: bigint): Promise<ActionResult> => {
        const missing = ensureWallet('Approve mUSDC', 'system');
        if (missing) return { ok: false, error: missing };
        if (amount <= 0n) {
            logAction({ level: 'warning', action: 'Approve mUSDC', detail: 'Approval amount must be greater than 0', market: 'system' });
            return { ok: false, error: 'Invalid amount' };
        }
        try {
            const hash = await walletClient!.writeContract({
                address: config.mUSDC,
                abi: ABIS.ERC20,
                functionName: 'approve',
                args: [spender, amount],
            });
            await publicClient!.waitForTransactionReceipt({ hash });
            logAction({ level: 'success', action: 'Approve mUSDC', detail: 'Allowance update confirmed', txHash: hash, market: 'system' });
            return { ok: true, hash };
        } catch (error) {
            const message = toErrorMessage(error);
            logAction({ level: 'error', action: 'Approve mUSDC', detail: message, market: 'system' });
            return { ok: false, error: message };
        }
    };

    const tx = async (
        title: string,
        market: 'lending' | 'pas' | 'system',
        run: () => Promise<`0x${string}`>,
    ): Promise<ActionResult> => {
        const missing = ensureWallet(title, market);
        if (missing) return { ok: false, error: missing };
        try {
            logAction({ action: title, detail: 'Waiting for wallet confirmation…', market });
            const hash = await run();
            await publicClient!.waitForTransactionReceipt({ hash });
            logAction({ level: 'success', action: title, detail: 'Transaction confirmed', txHash: hash, market });
            return { ok: true, hash };
        } catch (error) {
            const message = toErrorMessage(error);
            logAction({ level: 'error', action: title, detail: message, market });
            return { ok: false, error: message };
        }
    };

    return {
        approveMUSDC,
        depositLending: (amount: bigint) => tx('Deposit to KredioLending', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'deposit',
            args: [amount],
        })),
        withdrawLending: (amount: bigint) => tx('Withdraw from KredioLending', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'withdraw',
            args: [amount],
        })),
        harvestLending: () => tx('Harvest lending yield', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'pendingYieldAndHarvest',
            args: [address!],
        })),
        depositLendingCollateral: (amount: bigint) => tx('Deposit USDC collateral', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'depositCollateral',
            args: [amount],
        })),
        withdrawLendingCollateral: () => tx('Withdraw USDC collateral', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'withdrawCollateral',
        })),
        borrowLending: (amount: bigint) => tx('Borrow from KredioLending', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'borrow',
            args: [amount],
        })),
        repayLending: () => tx('Repay KredioLending debt', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'repay',
        })),
        liquidateLending: (borrower: `0x${string}`) => tx('Liquidate KredioLending position', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'liquidate',
            args: [borrower],
        })),
        adminLiquidateLending: (borrower: `0x${string}`) => tx('Admin liquidate KredioLending position', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'adminLiquidate',
            args: [borrower],
        })),
        adminForceCloseLending: (user: `0x${string}`) => tx('Force-close KredioLending position', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'adminForceClose',
            args: [user],
        })),
        sweepLendingFees: (to: `0x${string}`) => tx('Sweep Lending protocol fees', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'sweepProtocolFees',
            args: [to],
        })),
        setLendingMultiplier: (borrower: `0x${string}`, multiplier: bigint) => tx('Set Lending demo multiplier', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'setDemoMultiplier',
            args: [borrower, multiplier],
        })),

        depositPasLend: (amount: bigint) => tx('Deposit to PAS market pool', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'deposit',
            args: [amount],
        })),
        withdrawPasLend: (amount: bigint) => tx('Withdraw from PAS market pool', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'withdraw',
            args: [amount],
        })),
        harvestPasLend: () => tx('Harvest PAS market yield', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'pendingYieldAndHarvest',
            args: [address!],
        })),
        depositPasCollateral: (amountPasEth: string) => tx('Deposit PAS collateral', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'depositCollateral',
            value: parseUnits(amountPasEth, 18),
        })),
        withdrawPasCollateral: () => tx('Withdraw PAS collateral', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'withdrawCollateral',
        })),
        borrowPas: (amount: bigint) => tx('Borrow from PAS market', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'borrow',
            args: [amount],
        })),
        repayPas: () => tx('Repay PAS market debt', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'repay',
        })),
        liquidatePas: (borrower: `0x${string}`) => tx('Liquidate PAS position', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'liquidate',
            args: [borrower],
        })),
        adminLiquidatePas: (borrower: `0x${string}`) => tx('Admin liquidate PAS position', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'adminLiquidate',
            args: [borrower],
        })),
        adminForceClosePas: (user: `0x${string}`) => tx('Force-close PAS market position', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'adminForceClose',
            args: [user],
        })),

        // ── New bulk / demo admin actions ────────────────────────────────
        adminSetLendingTick: (tick: bigint) => tx('Set Lending global tick', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'adminSetGlobalTick',
            args: [tick],
        })),
        adminSetPasTick: (tick: bigint) => tx('Set PAS global tick', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'adminSetGlobalTick',
            args: [tick],
        })),
        adminForceCloseAllLending: (users: `0x${string}`[]) => tx('Force-close ALL Lending positions', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'adminForceCloseAll',
            args: [users],
        })),
        adminForceCloseAllPas: (users: `0x${string}`[]) => tx('Force-close ALL PAS positions', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'adminForceCloseAll',
            args: [users],
        })),
        adminBulkWithdrawLending: (depositors: `0x${string}`[]) => tx('Bulk-withdraw ALL Lending deposits', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'adminBulkWithdrawDeposits',
            args: [depositors],
        })),
        adminBulkWithdrawPas: (depositors: `0x${string}`[]) => tx('Bulk-withdraw ALL PAS deposits', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'adminBulkWithdrawDeposits',
            args: [depositors],
        })),
        adminTickPoolLending: (borrowers: `0x${string}`[]) => tx('Tick Lending pool interest', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'adminTickPool',
            args: [borrowers],
        })),
        adminTickPoolPas: (borrowers: `0x${string}`[]) => tx('Tick PAS pool interest', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'adminTickPool',
            args: [borrowers],
        })),
        adminResetUserScoreLending: (users: `0x${string}`[]) => tx('Reset Lending user scores', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'adminResetUserScores',
            args: [users],
        })),
        adminResetUserScorePas: (users: `0x${string}`[]) => tx('Reset PAS user scores', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'adminResetUserScores',
            args: [users],
        })),
        adminHardResetLending: (to: `0x${string}`) => tx('HARD RESET Lending pool', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'adminHardReset',
            args: [to],
        })),
        adminHardResetPas: (to: `0x${string}`) => tx('HARD RESET PAS pool', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'adminHardReset',
            args: [to],
        })),

        sweepPasFees: (to: `0x${string}`) => tx('Sweep PAS market fees', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'sweepProtocolFees',
            args: [to],
        })),
        setPasMultiplier: (user: `0x${string}`, multiplier: bigint) => tx('Set PAS demo multiplier', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'setDemoMultiplier',
            args: [user, multiplier],
        })),
        setPasRiskParams: (ltvBps: bigint, liqBonusBps: bigint, stalenessLimit: bigint, protocolFeeBps: bigint) => tx('Update PAS risk params', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'setRiskParams',
            args: [ltvBps, liqBonusBps, stalenessLimit, protocolFeeBps],
        })),
        setPasOracle: (newOracle: `0x${string}`) => tx('Set PAS oracle', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'setOracle',
            args: [newOracle],
        })),
        pausePas: () => tx('Pause PAS market', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'pause',
        })),
        unpausePas: () => tx('Unpause PAS market', 'pas', () => walletClient!.writeContract({
            address: config.pasMarket,
            abi: ABIS.KREDIO_PAS_MARKET,
            functionName: 'unpause',
        })),

        oracleCrash: (price8: bigint) => tx('Inject oracle crash', 'system', () => walletClient!.writeContract({
            address: config.oracle,
            abi: ABIS.PAS_ORACLE,
            functionName: 'crash',
            args: [price8],
        })),
        oracleRecover: () => tx('Recover oracle', 'system', () => walletClient!.writeContract({
            address: config.oracle,
            abi: ABIS.PAS_ORACLE,
            functionName: 'recover',
        })),
        oracleSetPrice: (price8: bigint) => tx('Set oracle price', 'system', () => walletClient!.writeContract({
            address: config.oracle,
            abi: ABIS.PAS_ORACLE,
            functionName: 'setPrice',
            args: [price8],
        })),
        setGovernanceData: (user: `0x${string}`, votes: bigint, conviction: number) => tx('Update GovernanceCache entry', 'system', () => walletClient!.writeContract({
            address: config.governanceCache,
            abi: ABIS.GOVERNANCE_CACHE,
            functionName: 'setGovernanceData',
            args: [user, votes, conviction],
        })),

        // ── Intelligent Yield Strategy ────────────────────────────────────
        yieldSetPool: (pool: `0x${string}`) => tx('Set yield pool address', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'adminSetYieldPool',
            args: [pool],
        })),
        yieldInvest: (amount: bigint) => tx('Invest into yield pool', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'adminInvest',
            args: [amount],
        })),
        yieldPullBack: (amount: bigint) => tx('Pull back from yield pool', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'adminPullBack',
            args: [amount],
        })),
        yieldClaimAndInject: () => tx('Claim yield and inject into lender pool', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'adminClaimAndInjectYield',
        })),
        yieldSetStrategyParams: (investRatioBps: bigint, minBufferBps: bigint) => tx('Update yield strategy params', 'lending', () => walletClient!.writeContract({
            address: config.lending,
            abi: ABIS.KREDIO_LENDING,
            functionName: 'adminSetStrategyParams',
            args: [investRatioBps, minBufferBps],
        })),
        yieldSetRate: (rateBps: bigint) => tx('Set MockYieldPool yield rate', 'system', () => walletClient!.writeContract({
            address: config.yieldPool,
            abi: ABIS.MOCK_YIELD_POOL,
            functionName: 'setYieldRate',
            args: [rateBps],
        })),
    };
}
