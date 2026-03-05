'use client';

import { useState, useEffect, useRef } from 'react';
import {
    useAccount,
    useBalance,
    useReadContract,
    useWriteContract,
    useWaitForTransactionReceipt,
} from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { motion, AnimatePresence } from 'framer-motion';
import { ABIS } from '../../lib/constants';
import config from '../../lib/addresses';
import { formatDisplayBalance } from '../../lib/utils';
import { PageShell, StateNotice } from '../../components/modules/ProtocolUI';

const GAS_BUFFER = parseUnits('0.01', 18); // 0.01 PAS reserved for gas

function Spinner() {
    return (
        <span className="inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin shrink-0" />
    );
}

function CheckIcon() {
    return (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}

type TxStage = 'idle' | 'signing' | 'confirming' | 'success';

export default function SwapPage() {
    const { address, isConnected } = useAccount();

    const [amount, setAmount] = useState('');
    const [debouncedAmount, setDebouncedAmount] = useState('');
    const [txStage, setTxStage] = useState<TxStage>('idle');
    const [successBannerAmount, setSuccessBannerAmount] = useState<bigint>(0n);
    const lastQuoteRef = useRef<bigint>(0n);
    const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ── 300ms debounce for live quote ────────────────────────────────────
    useEffect(() => {
        const t = setTimeout(() => setDebouncedAmount(amount), 300);
        return () => clearTimeout(t);
    }, [amount]);

    // ── Parse input amounts safely ───────────────────────────────────────
    const pasWeiDebounced: bigint = (() => {
        try {
            return debouncedAmount && Number(debouncedAmount) > 0
                ? parseUnits(debouncedAmount, 18)
                : 0n;
        } catch {
            return 0n;
        }
    })();

    const pasWeiCurrent: bigint = (() => {
        try {
            return amount && Number(amount) > 0 ? parseUnits(amount, 18) : 0n;
        } catch {
            return 0n;
        }
    })();

    // ── Balances ─────────────────────────────────────────────────────────
    const { data: pasBalanceData, refetch: refetchPas } = useBalance({ address });
    const pasBalance = pasBalanceData?.value ?? 0n;

    const { data: musdcBalanceRaw, refetch: refetchMusdc } = useReadContract({
        address: config.mUSDC,
        abi: ABIS.ERC20,
        functionName: 'balanceOf',
        args: [address ?? '0x0000000000000000000000000000000000000000'],
        query: { enabled: !!address },
    });
    const musdcBalance = (musdcBalanceRaw as bigint | undefined) ?? 0n;

    // ── Oracle ───────────────────────────────────────────────────────────
    const { data: oracleRound } = useReadContract({
        address: config.oracle,
        abi: ABIS.PAS_ORACLE,
        functionName: 'latestRoundData',
    });

    const { data: isCrashed } = useReadContract({
        address: config.oracle,
        abi: ABIS.PAS_ORACLE,
        functionName: 'isCrashed',
    });

    // ── Swap fee bps (e.g. 30 = 0.3%) ───────────────────────────────────
    const { data: feeBpsRaw } = useReadContract({
        address: config.swap,
        abi: ABIS.KREDIO_SWAP,
        functionName: 'feeBps',
    });
    const feeBps: bigint = feeBpsRaw ?? 30n;

    // ── Live quote ───────────────────────────────────────────────────────
    const {
        data: quoteResult,
        isFetching: quoteFetching,
    } = useReadContract({
        address: config.swap,
        abi: ABIS.KREDIO_SWAP,
        functionName: 'quoteSwap',
        args: [pasWeiDebounced],
        query: { enabled: pasWeiDebounced > 0n && !isCrashed },
    });

    // ── Transaction ──────────────────────────────────────────────────────
    const {
        writeContract,
        data: txHash,
        isPending: isSigning,
        reset: resetWrite,
    } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: txSuccess } =
        useWaitForTransactionReceipt({ hash: txHash });

    // Sync tx stage from wagmi state
    useEffect(() => {
        if (isSigning) setTxStage('signing');
        else if (isConfirming) setTxStage('confirming');
    }, [isSigning, isConfirming]);

    // On tx success: show banner, refetch balances, auto-reset after 5s
    useEffect(() => {
        if (!txSuccess) return;
        setSuccessBannerAmount(lastQuoteRef.current);
        setTxStage('success');
        refetchPas();
        refetchMusdc();
        successTimerRef.current = setTimeout(() => {
            setTxStage('idle');
            setAmount('');
            setDebouncedAmount('');
            resetWrite();
        }, 5000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txSuccess]);

    useEffect(() => {
        return () => {
            if (successTimerRef.current) clearTimeout(successTimerRef.current);
        };
    }, []);

    // ── Handlers ─────────────────────────────────────────────────────────
    const handleSwap = () => {
        if (!amount || !quoteResult) return;
        lastQuoteRef.current = quoteResult;
        const value = parseUnits(amount, 18);
        const minOut = (quoteResult * 99n) / 100n; // 1% slippage
        writeContract({
            address: config.swap,
            abi: ABIS.KREDIO_SWAP,
            functionName: 'swap',
            args: [minOut],
            value,
        });
    };

    const handleMax = () => {
        const maxPas = pasBalance > GAS_BUFFER ? pasBalance - GAS_BUFFER : 0n;
        setAmount(Number(formatUnits(maxPas, 18)).toFixed(6));
    };

    // ── Derived display values ────────────────────────────────────────────
    const pasBalanceDisplay = formatDisplayBalance(pasBalance, 18, 4);
    const musdcBalanceDisplay = formatDisplayBalance(musdcBalance, 6, 4);

    // Oracle answer is index 1 in latestRoundData tuple (int256, 8 decimals)
    const oraclePrice =
        oracleRound != null
            ? Number((oracleRound as readonly [bigint, bigint, bigint, bigint, bigint])[1]) / 1e8
            : null;

    const isQuoteLoading = quoteFetching && pasWeiDebounced > 0n;
    const hasValidQuote = !isQuoteLoading && quoteResult !== undefined && pasWeiDebounced > 0n;

    const quoteDisplay = hasValidQuote
        ? formatDisplayBalance(quoteResult, 6, 4)
        : null;

    // Fee = quoteResult * feeBps / (10000 - feeBps)  [reverse from net amount]
    const feeAtoms =
        hasValidQuote && quoteResult
            ? (quoteResult * feeBps) / (10000n - feeBps)
            : undefined;
    const feeDisplay = feeAtoms !== undefined ? formatDisplayBalance(feeAtoms, 6, 4) : null;

    const minOutAtoms =
        hasValidQuote && quoteResult ? (quoteResult * 99n) / 100n : undefined;
    const minOutDisplay = minOutAtoms !== undefined
        ? formatDisplayBalance(minOutAtoms, 6, 4)
        : null;

    const isAmountOverBalance = pasWeiCurrent > 0n && pasWeiCurrent > pasBalance;
    const isIdle = txStage === 'idle';

    const isDisabled =
        !isConnected ||
        !amount ||
        Number(amount) <= 0 ||
        isAmountOverBalance ||
        !!isCrashed ||
        !isIdle;

    const buttonClass =
        txStage === 'success'
            ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 cursor-default'
            : isDisabled
                ? 'bg-white/5 border border-white/10 text-slate-600 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-lg shadow-indigo-900/30';

    return (
        <PageShell title="Swap" subtitle="PAS → mUSDC on Polkadot Hub EVM">
            <div className="max-w-lg mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-6 space-y-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                >
                    {/* ── You Pay ──────────────────────────────────────────── */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            You Pay
                        </p>

                        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                            <input
                                type="number"
                                min="0"
                                step="any"
                                placeholder="0.000000"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                disabled={!isIdle}
                                className="flex-1 bg-transparent text-2xl font-light text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50"
                            />
                            <span className="shrink-0 text-sm font-semibold text-pink-300 bg-pink-500/10 border border-pink-500/20 rounded-lg px-3 py-1.5">
                                PAS
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs px-1">
                            <span className="text-slate-500">
                                Balance:{' '}
                                <span className="text-slate-300">{pasBalanceDisplay} PAS</span>
                            </span>
                            <button
                                onClick={handleMax}
                                disabled={!isConnected || !isIdle}
                                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Max
                            </button>
                        </div>

                        {isAmountOverBalance && (
                            <p className="text-xs text-rose-400 px-1">Amount exceeds balance</p>
                        )}
                    </div>

                    {/* ── Arrow separator ───────────────────────────────── */}
                    <div className="flex justify-center -my-1">
                        <div className="w-9 h-9 rounded-full border border-white/10 bg-black/50 flex items-center justify-center text-slate-400 text-lg select-none">
                            ↓
                        </div>
                    </div>

                    {/* ── You Receive ──────────────────────────────────── */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            You Receive
                        </p>

                        <div
                            className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${hasValidQuote
                                    ? 'border-emerald-500/20 bg-emerald-900/10'
                                    : 'border-white/5 bg-black/20'
                                }`}
                        >
                            <div className="flex-1 min-w-0">
                                {isQuoteLoading ? (
                                    <span className="flex items-center gap-2 text-slate-500 text-sm">
                                        <Spinner /> Calculating...
                                    </span>
                                ) : quoteDisplay ? (
                                    <motion.span
                                        key={quoteDisplay}
                                        initial={{ opacity: 0.4 }}
                                        animate={{ opacity: 1 }}
                                        className="text-2xl font-light text-emerald-300"
                                    >
                                        {quoteDisplay}
                                    </motion.span>
                                ) : (
                                    <span className="text-2xl font-light text-slate-600">—</span>
                                )}
                            </div>
                            <span
                                className={`shrink-0 text-sm font-semibold rounded-lg px-3 py-1.5 transition-colors ${hasValidQuote
                                        ? 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/20'
                                        : 'text-slate-600 bg-white/5 border border-white/10'
                                    }`}
                            >
                                mUSDC
                            </span>
                        </div>

                        {/* Quote details — greyed out until user types */}
                        <div
                            className={`space-y-1.5 px-1 transition-opacity duration-200 ${hasValidQuote ? 'opacity-100' : 'opacity-25 pointer-events-none'
                                }`}
                        >
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500">Rate</span>
                                <span className="text-slate-300">
                                    {oraclePrice !== null
                                        ? `1 PAS ≈ $${oraclePrice.toFixed(2)}`
                                        : '—'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500">
                                    Fee ({Number(feeBps) / 100}%)
                                </span>
                                <span className="text-slate-300">
                                    {feeDisplay ? `${feeDisplay} mUSDC` : '—'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500">Min received (1% slippage)</span>
                                <span className="text-slate-300">
                                    {minOutDisplay ? `${minOutDisplay} mUSDC` : '—'}
                                </span>
                            </div>
                        </div>

                        <p className="text-xs text-slate-500 px-1">
                            mUSDC Balance:{' '}
                            <span className="text-slate-300">{musdcBalanceDisplay} mUSDC</span>
                        </p>
                    </div>

                    {/* ── Oracle crashed warning ────────────────────────── */}
                    {!!isCrashed && (
                        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5">
                            <p className="text-xs text-rose-400">
                                Oracle is currently down — swaps are temporarily paused.
                            </p>
                        </div>
                    )}

                    {/* ── Wallet notice ─────────────────────────────────── */}
                    {!isConnected && (
                        <StateNotice
                            tone="info"
                            message="Connect MetaMask via the header to swap PAS."
                        />
                    )}

                    {/* ── Swap button ───────────────────────────────────── */}
                    <button
                        onClick={handleSwap}
                        disabled={isDisabled}
                        className={`w-full rounded-xl px-4 py-3.5 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${buttonClass}`}
                    >
                        {txStage === 'signing' && <><Spinner /> Waiting for MetaMask...</>}
                        {txStage === 'confirming' && <><Spinner /> Confirming...</>}
                        {txStage === 'success' && <><CheckIcon /> Done</>}
                        {txStage === 'idle' && 'Swap PAS → mUSDC'}
                    </button>

                    {/* ── Success banner (fades out after 5s) ──────────── */}
                    <AnimatePresence>
                        {txStage === 'success' && (
                            <motion.div
                                key="success-banner"
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center"
                            >
                                <p className="text-sm font-medium text-emerald-300">
                                    +{formatDisplayBalance(successBannerAmount, 6, 4)} mUSDC received
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </PageShell>
    );
}
