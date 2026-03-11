"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../../../lib/addresses';
import { ABIS } from '../../../lib/constants';
import { formatTokenAmount, cn } from '../../../lib/utils';
import { parseUsdcInput } from '../../../lib/input';
import { PageShell, MarketModeSwitch, StateNotice } from '../../../components/modules/ProtocolUI';
import { bpsToPercent, fmtToken, formatHealthFactor, healthState, tierLabel, useUserPortfolio } from '../../../hooks/useProtocolData';
import { useProtocolActions } from '../../../hooks/useProtocolActions';
import { useAccess } from '../../../hooks/useAccess';

// ── Shared sub-components ──────────────────────────────────────────────────
function Spinner({ small }: { small?: boolean }) {
    const s = small ? 'w-3 h-3 border' : 'w-4 h-4 border-2';
    return <span className={`inline-block rounded-full border-current border-t-transparent animate-spin shrink-0 ${s}`} />;
}
function Check() {
    return (
        <svg className="w-4 h-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}
function SectionLabel({ n, label, done }: { n: number; label: string; done?: boolean }) {
    return (
        <div className="flex items-center gap-2 mb-4">
            <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                done ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
            )}>
                {done ? '✓' : n}
            </div>
            <span className="text-sm font-semibold text-white">{label}</span>
        </div>
    );
}
function InfoRow({ label, value, tone }: { label: string; value: string; tone?: 'green' | 'yellow' | 'red' | 'default' }) {
    return (
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
            <span className="text-slate-400">{label}</span>
            <span className={cn('font-medium',
                tone === 'green' && 'text-emerald-300',
                tone === 'yellow' && 'text-amber-300',
                tone === 'red' && 'text-rose-300',
                (!tone || tone === 'default') && 'text-white'
            )}>{value}</span>
        </div>
    );
}

// ── Step 1: Approve + Deposit mUSDC Collateral ────────────────────────────
type CollateralPhase = 'idle' | 'approving' | 'approved' | 'depositing' | 'success';

function CollateralStep({ onSuccess }: {
    onSuccess: (depositedAtoms: bigint, maxBorrowAtoms: bigint) => void;
}) {
    const { address } = useAccount();
    const portfolio = useUserPortfolio();
    const [input, setInput] = useState('');
    const [phase, setPhase] = useState<CollateralPhase>('idle');
    const [dismissed, setDismissed] = useState(false);
    const amountAtoms = parseUsdcInput(input);

    // mUSDC wallet balance
    const { data: balRaw } = useReadContract({
        address: config.mUSDC, abi: ABIS.ERC20, functionName: 'balanceOf',
        args: [address ?? '0x0000000000000000000000000000000000000000'],
        query: { enabled: !!address },
    });
    const musdcBalance = (balRaw as bigint | undefined) ?? 0n;

    // Credit score from KredioLending → determines collateral ratio
    const { data: scoreRaw } = useReadContract({
        address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'getScore',
        args: [address ?? '0x0000000000000000000000000000000000000000'],
        query: { enabled: !!address },
    });
    const score = scoreRaw as readonly [bigint, number, number, number] | undefined;
    const collateralRatioBps = score ? Number(score[2]) : 20000;
    const interestBps = score ? Number(score[3]) : 500;
    const userTierNum = score ? Number(score[1]) : 0;

    // maxBorrow = (collateral * 10000) / collateralRatioBps
    const maxBorrowAtoms = amountAtoms && collateralRatioBps > 0
        ? (amountAtoms * 10000n) / BigInt(collateralRatioBps)
        : 0n;
    const overBalance = !!amountAtoms && amountAtoms > musdcBalance;

    const { writeContract: writeApprove, data: approveHash, isPending: approveSigning, reset: resetApprove } = useWriteContract();
    const { isSuccess: approveSuccess } = useWaitForTransactionReceipt({ hash: approveHash });
    const { writeContract: writeDeposit, data: depositHash, isPending: depositSigning, reset: resetDeposit } = useWriteContract();
    const { isSuccess: depositSuccess } = useWaitForTransactionReceipt({ hash: depositHash });

    useEffect(() => { if (approveSigning) setPhase('approving'); }, [approveSigning]);
    useEffect(() => { if (depositSigning) setPhase('depositing'); }, [depositSigning]);
    useEffect(() => {
        if (!approveSuccess || !amountAtoms) return;
        setPhase('approved');
        setTimeout(() => {
            writeDeposit({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'depositCollateral', args: [amountAtoms] });
        }, 300);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [approveSuccess]);
    useEffect(() => {
        if (!depositSuccess || !amountAtoms) return;
        setPhase('success');
        portfolio.refresh();
        const mb = collateralRatioBps > 0 ? (amountAtoms * 10000n) / BigInt(collateralRatioBps) : 0n;
        onSuccess(amountAtoms, mb);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [depositSuccess]);

    const handleDeposit = () => {
        if (!amountAtoms) return;
        resetApprove(); resetDeposit(); setPhase('approving');
        writeApprove({ address: config.mUSDC, abi: ABIS.ERC20, functionName: 'approve', args: [config.lending, amountAtoms] });
    };

    const isProcessing = phase === 'approving' || phase === 'approved' || phase === 'depositing';
    const btnLabel = phase === 'approving' ? 'Step 1/2 - Approving…'
        : phase === 'approved' ? 'Approved ✓'
            : phase === 'depositing' ? 'Step 2/2 - Depositing…'
                : amountAtoms ? `Deposit ${input} mUSDC as Collateral` : 'Deposit Collateral';

    return (
        <div className="space-y-4">
            {/* Credit Score overview */}
            {address && score && (
                <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 space-y-0">
                    <InfoRow label="Credit score" value={`${score[0].toString()} (${tierLabel(userTierNum)})`} />
                    <InfoRow label="Collateral ratio" value={`${bpsToPercent(collateralRatioBps)} required`} />
                    <InfoRow label="Borrow interest" value={`${(interestBps / 100).toFixed(2)}% APR`} />
                </div>
            )}
            {/* Amount input */}
            <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-slate-400">mUSDC to deposit as collateral</label>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                    <input type="number" min="0" step="any" placeholder="0.00"
                        value={input} onChange={e => setInput(e.target.value)}
                        disabled={isProcessing || phase === 'success'}
                        className="flex-1 bg-transparent text-xl font-light text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                    <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2.5 py-1">mUSDC</span>
                </div>
                <div className="text-xs px-1 text-slate-500">
                    Balance: <span className="text-slate-300">{formatTokenAmount(musdcBalance, 6, 4, false)} mUSDC</span>
                </div>
                {overBalance && <p className="text-xs text-rose-400 px-1">Amount exceeds balance</p>}
            </div>
            {/* Borrow preview */}
            <div className={cn('rounded-xl border px-4 py-3 space-y-0 transition-opacity',
                amountAtoms && !overBalance ? 'border-white/10 bg-black/30' : 'border-white/5 bg-black/10 opacity-35 pointer-events-none')}>
                <InfoRow label="Collateral to deposit" value={`${input || '-'} mUSDC`} />
                <InfoRow label="Max borrowable (based on score)" value={amountAtoms ? `~${formatTokenAmount(maxBorrowAtoms, 6, 2, false)} mUSDC` : '-'} tone="green" />
                <InfoRow label="Borrow interest rate" value={`${(interestBps / 100).toFixed(2)}% APR`} />
            </div>
            {/* 2-step info */}
            {!dismissed && !isProcessing && phase !== 'success' && (
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2.5 flex items-start justify-between gap-2">
                    <p className="text-xs text-blue-200">ℹ 2 wallet confirmations required: approve mUSDC, then deposit as collateral.</p>
                    <button onClick={() => setDismissed(true)} className="text-slate-500 hover:text-white text-xs shrink-0">✕</button>
                </div>
            )}
            {/* Progress indicator removed here to avoid redundancy with the button state */}
            <button onClick={handleDeposit} disabled={!amountAtoms || overBalance || isProcessing || phase === 'success'}
                className={cn('w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2',
                    isProcessing ? 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed'
                        : !amountAtoms || overBalance ? 'bg-white/5 border border-white/10 text-slate-600 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white')}>
                {isProcessing && <Spinner />}{btnLabel}
            </button>
        </div>
    );
}

// ── Step 2: Borrow mUSDC ──────────────────────────────────────────────────
function BorrowStep({ collateralAtoms, maxBorrowAtoms, onSuccess }: {
    collateralAtoms: bigint;
    maxBorrowAtoms: bigint;
    onSuccess: () => void;
}) {
    const actions = useProtocolActions();
    const portfolio = useUserPortfolio();
    const collateralDisplay = formatTokenAmount(collateralAtoms, 6, 2, false);
    const maxBorrowDisplay = formatTokenAmount(maxBorrowAtoms, 6, 2, false);
    const [pct, setPct] = useState(75);
    const [manualInput, setManualInput] = useState('');
    const [busy, setBusy] = useState(false);
    const [success, setSuccess] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const borrowAtoms: bigint = (() => {
        if (manualInput && Number(manualInput) > 0) {
            const v = parseUsdcInput(manualInput);
            return v ? (v > maxBorrowAtoms ? maxBorrowAtoms : v) : 0n;
        }
        return maxBorrowAtoms > 0n ? (maxBorrowAtoms * BigInt(pct)) / 100n : 0n;
    })();
    const borrowDisplay = formatTokenAmount(borrowAtoms, 6, 2, false);

    // Estimated health in BPS: (collateral * 10000) / borrow - matches contract formula
    const estHealthBps: bigint = borrowAtoms > 0n
        ? (collateralAtoms * 10000n) / borrowAtoms
        : BigInt('999999999999999');
    const healthTone = healthState(estHealthBps);

    const handleBorrow = async () => {
        if (borrowAtoms === 0n) return;
        setErrorMsg(null);
        setBusy(true); setStatusMsg('Waiting for MetaMask…');
        const res = await actions.borrowLending(borrowAtoms);
        if (res.ok) {
            setStatusMsg('Confirming…');
            await portfolio.refresh();
            setSuccess(true); onSuccess();
        } else {
            setErrorMsg(res.error);
        }
        setBusy(false); setStatusMsg('');
    };

    if (success) {
        return (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm"><Check /> Borrowed {borrowDisplay} mUSDC</div>
                <p className="text-xs text-slate-400">Your position is active. Manage repayments, view health, and withdraw collateral from your positions page.</p>
                <Link href="/dashboard"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-indigo-200 transition-colors">
                    View your position →
                </Link>
            </motion.div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 space-y-0">
                <InfoRow label="Collateral deposited" value={`${collateralDisplay} mUSDC`} />
                <InfoRow label="Max borrowable" value={`${maxBorrowDisplay} mUSDC`} />
            </div>
            <div className="space-y-2">
                <div className="flex gap-2">
                    {[25, 50, 75, 100].map(p => (
                        <button key={p} onClick={() => { setPct(p); setManualInput(''); }}
                            className={cn('flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors',
                                pct === p && !manualInput ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10')}>
                            {p}%
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5">
                    <input type="number" min="0" step="any" placeholder={`Max: ${maxBorrowDisplay}`}
                        value={manualInput} onChange={e => { setManualInput(e.target.value); setPct(0); }}
                        className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                    <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2 py-0.5">mUSDC</span>
                </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 space-y-0">
                <InfoRow label="Amount to borrow" value={`${borrowDisplay} mUSDC`} />
                <InfoRow label="Est. health ratio" value={formatHealthFactor(estHealthBps)}
                    tone={healthTone as 'green' | 'yellow' | 'red'} />
            </div>
            {Number(estHealthBps) < 15000 && borrowAtoms > 0n && Number(estHealthBps) < 999998 && (
                <StateNotice tone="warning" message="Health ratio is low - consider borrowing less." />
            )}
            {errorMsg ? (
                <div className="flex items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/8 px-4 py-3">
                    <span className="text-rose-400 text-sm shrink-0">✕</span>
                    <span className="text-sm text-rose-300 flex-1 min-w-0 truncate">{errorMsg}</span>
                    <button onClick={() => setErrorMsg(null)} className="text-slate-500 hover:text-white text-sm leading-none shrink-0" aria-label="Dismiss">✕</button>
                </div>
            ) : (
                <button onClick={handleBorrow} disabled={borrowAtoms === 0n || busy}
                    className={cn('w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2',
                        busy ? 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed'
                            : borrowAtoms === 0n ? 'bg-white/5 border border-white/10 text-slate-600 cursor-not-allowed'
                                : 'bg-emerald-700 hover:bg-emerald-600 text-white')}>
                    {busy ? <><Spinner />{statusMsg}</> : `Borrow ${borrowDisplay} mUSDC`}
                </button>
            )}
        </div>
    );
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function BorrowUsdcPage() {
    const { isConnected, address } = useAccount();
    const { isWrongNetwork } = useAccess();
    const portfolio = useUserPortfolio();
    type Step = 'collateral' | 'borrow' | 'done';
    const [step, setStep] = useState<Step>('collateral');
    const [collateralAtoms, setCollateralAtoms] = useState<bigint>(0n);
    const [maxBorrowAtoms, setMaxBorrowAtoms] = useState<bigint>(0n);
    const reset = () => { setStep('collateral'); setCollateralAtoms(0n); setMaxBorrowAtoms(0n); };
    const hasActivePosition = portfolio.lendingPosition[6] as boolean;

    // Fetch credit score at page level to compute maxBorrow for returning depositors
    const { data: scoreRaw } = useReadContract({
        address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'getScore',
        args: [address ?? '0x0000000000000000000000000000000000000000'],
        query: { enabled: !!address },
    });

    // Auto-advance to borrow step for users who already deposited collateral
    useEffect(() => {
        if (portfolio.loading || !scoreRaw) return;
        const existingCollateral = portfolio.lendingCollateralWallet;
        if (existingCollateral > 0n && !hasActivePosition && step === 'collateral') {
            const score = scoreRaw as readonly [bigint, number, number, number];
            const ratioBps = Number(score[2]);
            const mb = ratioBps > 0 ? (existingCollateral * 10000n) / BigInt(ratioBps) : 0n;
            setCollateralAtoms(existingCollateral);
            setMaxBorrowAtoms(mb);
            setStep('borrow');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [portfolio.loading, portfolio.lendingCollateralWallet, scoreRaw]);

    return (
        <PageShell title="Borrow" subtitle="Deposit mUSDC collateral, then borrow based on your credit score.">
            <div className="max-w-lg mx-auto space-y-4">
                <MarketModeSwitch base="/borrow" active="usdc" />
                {!isConnected && <StateNotice tone="info" message="Connect MetaMask via the header to borrow." />}
                {isConnected && isWrongNetwork && <StateNotice tone="error" message="Switch to the correct network to continue." />}

                {isConnected && !isWrongNetwork && hasActivePosition && (
                    <div className="space-y-2">
                        <StateNotice tone="warning" message="You have an active borrow position. Repay it first before opening a new one." />
                        <Link href="/dashboard"
                            className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                            Manage your position →
                        </Link>
                    </div>
                )}

                {isConnected && !isWrongNetwork && !hasActivePosition && (
                    <>
                        {/* Step breadcrumb */}
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className={cn('font-medium', step === 'collateral' ? 'text-indigo-300' : 'text-emerald-400')}>1. Deposit Collateral</span>
                            <span className="text-slate-600">→</span>
                            <span className={cn('font-medium', step === 'borrow' ? 'text-indigo-300' : step === 'done' ? 'text-emerald-400' : 'text-slate-600')}>2. Borrow mUSDC</span>
                        </div>

                        {/* Step 1 */}
                        <AnimatePresence mode="wait">
                            {step === 'collateral' ? (
                                <motion.div key="col-active" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                    className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5">
                                    <SectionLabel n={1} label="Deposit mUSDC as Collateral" />
                                    <CollateralStep onSuccess={(atoms, mb) => { setCollateralAtoms(atoms); setMaxBorrowAtoms(mb); setStep('borrow'); }} />
                                </motion.div>
                            ) : (
                                <motion.div key="col-done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="rounded-2xl border border-emerald-500/20 bg-emerald-900/10 p-4 flex items-center gap-3">
                                    <Check />
                                    <div className="text-sm">
                                        <span className="text-slate-400">Step 1 - </span>
                                        <span className="text-emerald-300">{formatTokenAmount(collateralAtoms, 6, 2, false)} mUSDC ready as collateral</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Step 2 */}
                        <AnimatePresence>
                            {(step === 'borrow' || step === 'done') && (
                                <motion.div key="borrow-panel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                    className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5">
                                    <SectionLabel n={2} label="Borrow mUSDC" done={step === 'done'} />
                                    <BorrowStep collateralAtoms={collateralAtoms} maxBorrowAtoms={maxBorrowAtoms} onSuccess={() => setStep('done')} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {step === 'done' && (
                            <button onClick={reset} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">← Start another borrow</button>
                        )}
                    </>
                )}
            </div>
        </PageShell>
    );
}
