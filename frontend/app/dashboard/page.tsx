"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { PageShell, StateNotice } from '../../components/modules/ProtocolUI';
import config from '../../lib/addresses';
import { ABIS } from '../../lib/constants';
import { cn } from '../../lib/utils';
import { parseUsdcInput } from '../../lib/input';
import {
    bpsToPercent, fmtToken, fmtOraclePrice8, fmtCount, fmtTimestamp,
    useGlobalProtocolData, useUserPortfolio, useUserScore, tierLabel,
    formatHealthFactor, healthState,
} from '../../hooks/useProtocolData';

// ── Primitives ────────────────────────────────────────────────────────────

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
function InfoRow({ label, value, tone }: { label: string; value: string; tone?: 'green' | 'yellow' | 'red' }) {
    return (
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
            <span className="text-slate-400">{label}</span>
            <span className={cn('font-medium',
                tone === 'green' ? 'text-emerald-300' : tone === 'yellow' ? 'text-amber-300' : tone === 'red' ? 'text-rose-300' : 'text-slate-200'
            )}>{value}</span>
        </div>
    );
}
function MetricCard({ label, value, tone }: { label: string; value: string; tone?: 'green' | 'red' }) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/25 p-4 hover:border-white/20 transition-colors">
            <p className="text-[11px] uppercase tracking-wider text-slate-400">{label}</p>
            <p className={cn('text-xl font-semibold mt-1', tone === 'green' ? 'text-emerald-300' : tone === 'red' ? 'text-rose-300' : 'text-white')}>{value}</p>
        </div>
    );
}

function healthTone(ratioRaw: bigint): 'green' | 'yellow' | 'red' {
    const n = Number(ratioRaw) / 1e18;
    if (n >= 1.5 || ratioRaw > BigInt('10000000000000000000000')) return 'green';
    if (n >= 1.2) return 'yellow';
    return 'red';
}
function healthLabel(ratioRaw: bigint) {
    const t = healthTone(ratioRaw);
    return t === 'green' ? 'Safe' : t === 'yellow' ? 'Caution' : 'At Risk';
}
function healthNum(ratioRaw: bigint) {
    if (ratioRaw > BigInt('10000000000000000000000')) return Infinity;
    return Number(ratioRaw) / 1e18;
}
function fmt6(atoms: bigint, dp = 2) { return (Number(atoms) / 1e6).toFixed(dp); }
function fmt18(wei: bigint, dp = 4) { return (Number(wei) / 1e18).toFixed(dp); }

function HealthBar({ ratio }: { ratio: bigint }) {
    const num = healthNum(ratio);
    const pct = Math.min(isFinite(num) ? (num / 2.0) * 100 : 100, 100);
    const tone = healthTone(ratio);
    const lbl = healthLabel(ratio);
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
                <span className="text-slate-400">Health</span>
                <span className={cn('font-medium', tone === 'green' ? 'text-emerald-300' : tone === 'yellow' ? 'text-amber-300' : 'text-rose-300')}>
                    {isFinite(num) ? num.toFixed(2) : '—'} — {lbl}
                </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10">
                <div className={cn('h-full rounded-full transition-all', tone === 'green' ? 'bg-emerald-500' : tone === 'yellow' ? 'bg-amber-500' : 'bg-rose-500')} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

// ── Borrow position card (repay + withdraw) ───────────────────────────────
type RepayPhase = 'idle' | 'confirming' | 'approving' | 'repaying' | 'success';
type WithdrawPhase = 'idle' | 'confirming' | 'withdrawing' | 'success';

function PASBorrowCard({ collateralWei, debtAtoms, accruedAtoms, totalOwedAtoms, healthRatio, oraclePrice8, ltvBps, onRefresh }: {
    collateralWei: bigint; debtAtoms: bigint; accruedAtoms: bigint; totalOwedAtoms: bigint;
    healthRatio: bigint; oraclePrice8: bigint; ltvBps: bigint; onRefresh: () => void;
}) {
    const [repayPhase, setRepayPhase] = useState<RepayPhase>('idle');
    const [withdrawPhase, setWithdrawPhase] = useState<WithdrawPhase>('idle');
    const { writeContract: writeApprove, data: approveHash, isPending: approveSigning, reset: resetApprove } = useWriteContract();
    const { isSuccess: approveSuccess } = useWaitForTransactionReceipt({ hash: approveHash });
    const { writeContract: writeRepay, data: repayHash, isPending: repaySigning, reset: resetRepay } = useWriteContract();
    const { isSuccess: repaySuccess, isLoading: repayConfirming } = useWaitForTransactionReceipt({ hash: repayHash });
    const { writeContract: writeWithdraw, data: withdrawHash, isPending: withdrawSigning } = useWriteContract();
    const { isSuccess: withdrawSuccess } = useWaitForTransactionReceipt({ hash: withdrawHash });

    useEffect(() => { if (!approveSuccess || repayPhase !== 'approving') return; setRepayPhase('repaying'); setTimeout(() => writeRepay({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'repay' }), 300); }, [approveSuccess]);
    useEffect(() => { if (!repaySuccess) return; setRepayPhase('success'); const t = setTimeout(() => { onRefresh(); setRepayPhase('idle'); }, 1500); return () => clearTimeout(t); }, [repaySuccess]);
    useEffect(() => { if (!withdrawSuccess) return; setWithdrawPhase('success'); const t = setTimeout(() => { onRefresh(); setWithdrawPhase('idle'); }, 1500); return () => clearTimeout(t); }, [withdrawSuccess]);

    const handleConfirmRepay = () => { resetApprove(); resetRepay(); setRepayPhase('approving'); writeApprove({ address: config.mUSDC, abi: ABIS.ERC20, functionName: 'approve', args: [config.pasMarket, totalOwedAtoms] }); };
    const handleConfirmWithdraw = () => { setWithdrawPhase('withdrawing'); writeWithdraw({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'withdrawCollateral' }); };

    const oracleUsd = Number(oraclePrice8) / 1e8;
    const pasAmount = Number(collateralWei) / 1e18;
    const collateralUsd = pasAmount * oracleUsd;
    const canWithdraw = debtAtoms === 0n && collateralWei > 0n;
    const actionOpen = repayPhase !== 'idle' || withdrawPhase !== 'idle';
    const tone = healthTone(healthRatio);
    const lbl = healthLabel(healthRatio);
    const liqPrice = debtAtoms > 0n && collateralWei > 0n && ltvBps > 0n ? (Number(totalOwedAtoms) / 1e6) / (pasAmount * (Number(ltvBps) / 10000)) : null;

    if (collateralWei === 0n && debtAtoms === 0n && repayPhase === 'idle' && withdrawPhase === 'idle') return null;

    return (
        <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-white">PAS Market</h3>
                    <p className="text-xs text-slate-400">PAS collateral — mUSDC borrow</p>
                </div>
                <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold border', tone === 'green' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : tone === 'yellow' ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border-rose-500/30 bg-rose-500/10 text-rose-300 animate-pulse')}>{lbl}</span>
            </div>
            <div className={cn('transition-opacity', actionOpen ? 'opacity-60' : 'opacity-100')}>
                <div className="rounded-xl border border-white/5 bg-black/20 px-4 py-3">
                    <InfoRow label="PAS Collateral" value={`${fmt18(collateralWei, 4)} PAS${oracleUsd > 0 ? ` (~$${collateralUsd.toFixed(2)})` : ''}`} />
                    <InfoRow label="Borrowed" value={`${fmt6(debtAtoms)} mUSDC`} />
                    <InfoRow label="Interest owed" value={`${fmt6(accruedAtoms, 6)} mUSDC`} />
                    <InfoRow label="Total to repay" value={`${fmt6(totalOwedAtoms)} mUSDC`} tone={totalOwedAtoms > 0n ? 'yellow' : undefined} />
                </div>
            </div>
            {(debtAtoms > 0n || collateralWei > 0n) && <div className={cn('transition-opacity', actionOpen ? 'opacity-60' : 'opacity-100')}><HealthBar ratio={healthRatio} /></div>}
            {!actionOpen && liqPrice !== null && oracleUsd > 0 && (
                <div className={cn('rounded-xl border px-4 py-3', oracleUsd < liqPrice * 1.1 ? 'border-rose-500/20 bg-rose-500/5' : 'border-white/5 bg-black/20')}>
                    <InfoRow label="Liquidation price" value={`$${liqPrice.toFixed(4)} / PAS`} />
                    <InfoRow label="Current PAS price" value={`$${oracleUsd.toFixed(4)} / PAS`} />
                    {oracleUsd > liqPrice ? <InfoRow label="Distance" value={`${(((oracleUsd - liqPrice) / liqPrice) * 100).toFixed(2)}% above liquidation`} tone="green" /> : <InfoRow label="Distance" value={`${(((liqPrice - oracleUsd) / liqPrice) * 100).toFixed(2)}% below — at risk`} tone="red" />}
                </div>
            )}
            <AnimatePresence>
                {repayPhase === 'confirming' && (
                    <motion.div key="rc" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3">
                        <p className="text-sm text-slate-200">Repaying {fmt6(totalOwedAtoms)} mUSDC (principal + interest)</p>
                        <p className="text-xs text-slate-500">2 wallet confirmations: approve then repay</p>
                        <div className="flex gap-2">
                            <button onClick={handleConfirmRepay} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">Confirm Repay</button>
                            <button onClick={() => setRepayPhase('idle')} className="px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">Cancel</button>
                        </div>
                    </motion.div>
                )}
                {(repayPhase === 'approving' || repayPhase === 'repaying') && (
                    <motion.div key="rp" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className={cn('flex items-center gap-2 text-xs flex-1', repayPhase === 'repaying' ? 'text-emerald-400' : 'text-indigo-300')}>{repayPhase === 'repaying' ? <Check /> : <Spinner small />} Step 1/2 — Approve mUSDC</div>
                            <div className={cn('flex items-center gap-2 text-xs flex-1', repayPhase === 'repaying' ? 'text-indigo-300' : 'text-slate-600')}>{repayPhase === 'repaying' ? <Spinner small /> : <span className="w-4 h-4" />} Step 2/2 — Repay</div>
                        </div>
                        <div className="w-full h-1 rounded-full bg-white/10"><motion.div className="h-full bg-indigo-500 rounded-full" animate={{ width: repayPhase === 'repaying' ? '75%' : '25%' }} transition={{ duration: 0.4 }} /></div>
                        <p className="text-xs text-slate-500">{approveSigning || repaySigning ? 'Waiting for wallet…' : repayConfirming ? 'Confirming…' : ''}</p>
                    </motion.div>
                )}
                {repayPhase === 'success' && (<motion.div key="rs" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 flex items-center gap-2 text-emerald-300 text-sm"><Check /> Repaid successfully</motion.div>)}
            </AnimatePresence>
            <AnimatePresence>
                {withdrawPhase === 'confirming' && (
                    <motion.div key="wc" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3">
                        <p className="text-sm text-slate-200">Withdraw {fmt18(collateralWei, 4)} PAS to your wallet</p>
                        <div className="flex gap-2">
                            <button onClick={handleConfirmWithdraw} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">Confirm Withdrawal</button>
                            <button onClick={() => setWithdrawPhase('idle')} className="px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">Cancel</button>
                        </div>
                    </motion.div>
                )}
                {withdrawPhase === 'withdrawing' && (<motion.div key="wp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 flex items-center gap-2 text-slate-300 text-sm"><Spinner />{withdrawSigning ? 'Waiting for wallet…' : 'Withdrawing…'}</motion.div>)}
                {withdrawPhase === 'success' && (<motion.div key="ws" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 flex items-center gap-2 text-emerald-300 text-sm"><Check /> {fmt18(collateralWei, 4)} PAS withdrawn</motion.div>)}
            </AnimatePresence>
            {repayPhase === 'idle' && withdrawPhase === 'idle' && (
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    {debtAtoms > 0n && (<button onClick={() => setRepayPhase('confirming')} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 hover:text-rose-200 transition-colors">Repay {fmt6(totalOwedAtoms)} mUSDC</button>)}
                    <button onClick={() => setWithdrawPhase('confirming')} disabled={!canWithdraw} className={cn('flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors', canWithdraw ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200 hover:text-white' : 'bg-white/5 border-white/5 text-slate-600 cursor-not-allowed')}>
                        {canWithdraw ? `Withdraw ${fmt18(collateralWei, 4)} PAS` : 'Repay debt to withdraw collateral'}
                    </button>
                </div>
            )}
        </div>
    );
}

function USDCBorrowCard({ collateralAtoms, debtAtoms, accruedAtoms, totalOwedAtoms, healthRatio, onRefresh }: {
    collateralAtoms: bigint; debtAtoms: bigint; accruedAtoms: bigint; totalOwedAtoms: bigint; healthRatio: bigint; onRefresh: () => void;
}) {
    const [repayPhase, setRepayPhase] = useState<RepayPhase>('idle');
    const [withdrawPhase, setWithdrawPhase] = useState<WithdrawPhase>('idle');
    const { writeContract: writeApprove, data: approveHash, isPending: approveSigning, reset: resetApprove } = useWriteContract();
    const { isSuccess: approveSuccess } = useWaitForTransactionReceipt({ hash: approveHash });
    const { writeContract: writeRepay, data: repayHash, isPending: repaySigning, reset: resetRepay } = useWriteContract();
    const { isSuccess: repaySuccess, isLoading: repayConfirming } = useWaitForTransactionReceipt({ hash: repayHash });
    const { writeContract: writeWithdraw, data: withdrawHash, isPending: withdrawSigning } = useWriteContract();
    const { isSuccess: withdrawSuccess } = useWaitForTransactionReceipt({ hash: withdrawHash });

    useEffect(() => { if (!approveSuccess || repayPhase !== 'approving') return; setRepayPhase('repaying'); setTimeout(() => writeRepay({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'repay' }), 300); }, [approveSuccess]);
    useEffect(() => { if (!repaySuccess) return; setRepayPhase('success'); const t = setTimeout(() => { onRefresh(); setRepayPhase('idle'); }, 1500); return () => clearTimeout(t); }, [repaySuccess]);
    useEffect(() => { if (!withdrawSuccess) return; setWithdrawPhase('success'); const t = setTimeout(() => { onRefresh(); setWithdrawPhase('idle'); }, 1500); return () => clearTimeout(t); }, [withdrawSuccess]);

    const handleConfirmRepay = () => { resetApprove(); resetRepay(); setRepayPhase('approving'); writeApprove({ address: config.mUSDC, abi: ABIS.ERC20, functionName: 'approve', args: [config.lending, totalOwedAtoms] }); };
    const handleConfirmWithdraw = () => { setWithdrawPhase('withdrawing'); writeWithdraw({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'withdrawCollateral' }); };

    const canWithdraw = debtAtoms === 0n && collateralAtoms > 0n;
    const actionOpen = repayPhase !== 'idle' || withdrawPhase !== 'idle';
    const tone = healthTone(healthRatio);
    const lbl = healthLabel(healthRatio);

    if (collateralAtoms === 0n && debtAtoms === 0n && repayPhase === 'idle' && withdrawPhase === 'idle') return null;

    return (
        <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-white">USDC Market</h3>
                    <p className="text-xs text-slate-400">mUSDC collateral — mUSDC borrow</p>
                </div>
                <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold border', tone === 'green' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : tone === 'yellow' ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border-rose-500/30 bg-rose-500/10 text-rose-300 animate-pulse')}>{lbl}</span>
            </div>
            <div className={cn('transition-opacity', actionOpen ? 'opacity-60' : 'opacity-100')}>
                <div className="rounded-xl border border-white/5 bg-black/20 px-4 py-3">
                    <InfoRow label="mUSDC Collateral" value={`${fmt6(collateralAtoms)} mUSDC`} />
                    <InfoRow label="Borrowed" value={`${fmt6(debtAtoms)} mUSDC`} />
                    <InfoRow label="Interest owed" value={`${fmt6(accruedAtoms, 6)} mUSDC`} />
                    <InfoRow label="Total to repay" value={`${fmt6(totalOwedAtoms)} mUSDC`} tone={totalOwedAtoms > 0n ? 'yellow' : undefined} />
                </div>
            </div>
            {(debtAtoms > 0n || collateralAtoms > 0n) && <div className={cn('transition-opacity', actionOpen ? 'opacity-60' : 'opacity-100')}><HealthBar ratio={healthRatio} /></div>}
            <AnimatePresence>
                {repayPhase === 'confirming' && (
                    <motion.div key="rc" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3">
                        <p className="text-sm text-slate-200">Repaying {fmt6(totalOwedAtoms)} mUSDC (principal + interest)</p>
                        <p className="text-xs text-slate-500">2 wallet confirmations: approve then repay</p>
                        <div className="flex gap-2">
                            <button onClick={handleConfirmRepay} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">Confirm Repay</button>
                            <button onClick={() => setRepayPhase('idle')} className="px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">Cancel</button>
                        </div>
                    </motion.div>
                )}
                {(repayPhase === 'approving' || repayPhase === 'repaying') && (
                    <motion.div key="rp" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className={cn('flex items-center gap-2 text-xs flex-1', repayPhase === 'repaying' ? 'text-emerald-400' : 'text-indigo-300')}>{repayPhase === 'repaying' ? <Check /> : <Spinner small />} Step 1/2 — Approve mUSDC</div>
                            <div className={cn('flex items-center gap-2 text-xs flex-1', repayPhase === 'repaying' ? 'text-indigo-300' : 'text-slate-600')}>{repayPhase === 'repaying' ? <Spinner small /> : <span className="w-4 h-4" />} Step 2/2 — Repay</div>
                        </div>
                        <div className="w-full h-1 rounded-full bg-white/10"><motion.div className="h-full bg-indigo-500 rounded-full" animate={{ width: repayPhase === 'repaying' ? '75%' : '25%' }} transition={{ duration: 0.4 }} /></div>
                        <p className="text-xs text-slate-500">{approveSigning || repaySigning ? 'Waiting for wallet…' : repayConfirming ? 'Confirming…' : ''}</p>
                    </motion.div>
                )}
                {repayPhase === 'success' && (<motion.div key="rs" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 flex items-center gap-2 text-emerald-300 text-sm"><Check /> Repaid successfully</motion.div>)}
            </AnimatePresence>
            <AnimatePresence>
                {withdrawPhase === 'confirming' && (
                    <motion.div key="wc" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3">
                        <p className="text-sm text-slate-200">Withdraw {fmt6(collateralAtoms)} mUSDC to your wallet</p>
                        <div className="flex gap-2">
                            <button onClick={handleConfirmWithdraw} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">Confirm Withdrawal</button>
                            <button onClick={() => setWithdrawPhase('idle')} className="px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">Cancel</button>
                        </div>
                    </motion.div>
                )}
                {withdrawPhase === 'withdrawing' && (<motion.div key="wp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 flex items-center gap-2 text-slate-300 text-sm"><Spinner />{withdrawSigning ? 'Waiting for wallet…' : 'Withdrawing…'}</motion.div>)}
                {withdrawPhase === 'success' && (<motion.div key="ws" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 flex items-center gap-2 text-emerald-300 text-sm"><Check /> {fmt6(collateralAtoms)} mUSDC withdrawn</motion.div>)}
            </AnimatePresence>
            {repayPhase === 'idle' && withdrawPhase === 'idle' && (
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    {debtAtoms > 0n && (<button onClick={() => setRepayPhase('confirming')} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 hover:text-rose-200 transition-colors">Repay {fmt6(totalOwedAtoms)} mUSDC</button>)}
                    <button onClick={() => setWithdrawPhase('confirming')} disabled={!canWithdraw} className={cn('flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors', canWithdraw ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200 hover:text-white' : 'bg-white/5 border-white/5 text-slate-600 cursor-not-allowed')}>
                        {canWithdraw ? `Withdraw ${fmt6(collateralAtoms)} mUSDC` : 'Repay debt to withdraw collateral'}
                    </button>
                </div>
            )}
        </div>
    );
}

// ── Lend position cards ───────────────────────────────────────────────────

function LendCard({ label, subtitle, depositAtoms, yieldAtoms, utilizationBps, contractAddr, abi, onRefresh }: {
    label: string; subtitle: string; depositAtoms: bigint; yieldAtoms: bigint; utilizationBps: bigint;
    contractAddr: `0x${string}`; abi: typeof ABIS.KREDIO_LENDING; onRefresh: () => void;
}) {
    const { address } = useAccount();
    const [harvestPhase, setHarvestPhase] = useState<'idle' | 'confirming' | 'harvesting' | 'success'>('idle');
    const [withdrawPhase, setWithdrawPhase] = useState<'idle' | 'confirming' | 'withdrawing' | 'success'>('idle');
    const [withdrawInput, setWithdrawInput] = useState('');

    const { writeContract: writeHarvest, data: harvestHash, isPending: harvestSigning } = useWriteContract();
    const { isSuccess: harvestSuccess } = useWaitForTransactionReceipt({ hash: harvestHash });
    const { writeContract: writeWithdraw, data: withdrawHash, isPending: withdrawSigning } = useWriteContract();
    const { isSuccess: withdrawSuccess } = useWaitForTransactionReceipt({ hash: withdrawHash });

    useEffect(() => { if (!harvestSuccess) return; setHarvestPhase('success'); const t = setTimeout(() => { onRefresh(); setHarvestPhase('idle'); }, 1500); return () => clearTimeout(t); }, [harvestSuccess]);
    useEffect(() => { if (!withdrawSuccess) return; setWithdrawPhase('success'); const t = setTimeout(() => { onRefresh(); setWithdrawPhase('idle'); setWithdrawInput(''); }, 1500); return () => clearTimeout(t); }, [withdrawSuccess]);

    const apr = `${((Number(utilizationBps) / 10000) * 8).toFixed(2)}%`;
    const depositDisplay = fmt6(depositAtoms);
    const yieldDisplay = fmt6(yieldAtoms, 6);
    const withdrawAtoms = parseUsdcInput(withdrawInput);
    const overWithdraw = withdrawAtoms !== null && withdrawAtoms > depositAtoms;

    const handleConfirmHarvest = () => { setHarvestPhase('harvesting'); writeHarvest({ address: contractAddr, abi, functionName: 'pendingYieldAndHarvest', args: [address ?? '0x0000000000000000000000000000000000000000'] }); };
    const handleConfirmWithdraw = () => { if (!withdrawAtoms) return; setWithdrawPhase('withdrawing'); writeWithdraw({ address: contractAddr, abi, functionName: 'withdraw', args: [withdrawAtoms] }); };

    if (depositAtoms === 0n && harvestPhase === 'idle' && withdrawPhase === 'idle') return null;

    return (
        <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 space-y-4">
            <div>
                <h3 className="text-sm font-semibold text-white">{label}</h3>
                <p className="text-xs text-slate-400">{subtitle}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-black/20 px-4 py-3">
                <InfoRow label="Deposited" value={`${depositDisplay} mUSDC`} tone={depositAtoms > 0n ? 'green' : undefined} />
                <InfoRow label="Pending yield" value={`${yieldDisplay} mUSDC`} tone={yieldAtoms > 0n ? 'yellow' : undefined} />
                <InfoRow label="Pool APY (est.)" value={apr} />
            </div>
            <AnimatePresence>
                {harvestPhase === 'confirming' && (
                    <motion.div key="hc" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3">
                        <p className="text-sm text-slate-200">Harvest {yieldDisplay} mUSDC yield</p>
                        <div className="flex gap-2">
                            <button onClick={handleConfirmHarvest} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-amber-600/30 hover:bg-amber-600/40 border border-amber-500/30 text-amber-200 transition-colors">Confirm Harvest</button>
                            <button onClick={() => setHarvestPhase('idle')} className="px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">Cancel</button>
                        </div>
                    </motion.div>
                )}
                {harvestPhase === 'harvesting' && (<motion.div key="hp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 flex items-center gap-2 text-slate-300 text-sm"><Spinner />{harvestSigning ? 'Waiting for wallet…' : 'Harvesting…'}</motion.div>)}
                {harvestPhase === 'success' && (<motion.div key="hs" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 flex items-center gap-2 text-amber-300 text-sm"><Check /> +{yieldDisplay} mUSDC harvested</motion.div>)}
            </AnimatePresence>
            <AnimatePresence>
                {withdrawPhase === 'confirming' && (
                    <motion.div key="wc" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3">
                        <p className="text-sm text-slate-200">Withdraw from pool</p>
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5">
                                <input type="number" min="0" step="any" placeholder={`Max: ${depositDisplay}`} value={withdrawInput} onChange={e => setWithdrawInput(e.target.value)} className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                <button onClick={() => setWithdrawInput(depositDisplay)} className="text-xs text-indigo-400 hover:text-indigo-300 font-medium shrink-0">Max</button>
                                <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2 py-0.5 shrink-0">mUSDC</span>
                            </div>
                            {overWithdraw && <p className="text-xs text-rose-400">Amount exceeds deposited balance</p>}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={handleConfirmWithdraw} disabled={!withdrawAtoms || overWithdraw} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors">Withdraw {withdrawInput || '0'} mUSDC</button>
                            <button onClick={() => setWithdrawPhase('idle')} className="px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">Cancel</button>
                        </div>
                    </motion.div>
                )}
                {withdrawPhase === 'withdrawing' && (<motion.div key="wp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 flex items-center gap-2 text-slate-300 text-sm"><Spinner />{withdrawSigning ? 'Waiting for wallet…' : 'Withdrawing…'}</motion.div>)}
                {withdrawPhase === 'success' && (<motion.div key="ws" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 flex items-center gap-2 text-emerald-300 text-sm"><Check /> Withdrawal processed</motion.div>)}
            </AnimatePresence>
            {harvestPhase === 'idle' && withdrawPhase === 'idle' && (
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <button onClick={() => setWithdrawPhase('confirming')} className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-colors">Withdraw</button>
                    {yieldAtoms > 0n && (<button onClick={() => setHarvestPhase('confirming')} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 text-amber-300 hover:text-amber-200 transition-colors">Harvest {yieldDisplay} mUSDC</button>)}
                </div>
            )}
        </div>
    );
}

// ── Credit profile ────────────────────────────────────────────────────────

const TIER_LABELS = ['ANON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM'];

function CreditProfile({ scoreValue, tier, collateralRatioBps, interestRateBps, repaymentCount, defaultCount, governanceVotes, governanceConviction }: {
    scoreValue: bigint; tier: number; collateralRatioBps: number; interestRateBps: number;
    repaymentCount: bigint; defaultCount: bigint; governanceVotes: bigint; governanceConviction: number;
}) {
    const [expanded, setExpanded] = useState(false);
    const score = Number(scoreValue);
    const scoreTierLabel = TIER_LABELS[tier] ?? 'ANON';
    const tierBadge = tier >= 4 ? 'border-purple-500/40 bg-purple-500/10 text-purple-300' : tier === 3 ? 'border-amber-500/40 bg-amber-500/10 text-amber-300' : tier === 2 ? 'border-slate-400/40 bg-slate-400/10 text-slate-300' : tier === 1 ? 'border-amber-700/40 bg-amber-700/10 text-amber-500' : 'border-slate-500/40 bg-slate-500/10 text-slate-400';
    const scorePct = Math.min(score / 100, 1) * 100;
    const scoreTone = score >= 60 ? 'text-emerald-300' : score >= 35 ? 'text-amber-300' : score > 0 ? 'text-rose-300' : 'text-slate-400';
    const scoreBarColor = score >= 60 ? 'bg-emerald-500' : score >= 35 ? 'bg-amber-500' : score > 0 ? 'bg-rose-500' : 'bg-slate-600';
    const maxLTV = collateralRatioBps > 0 ? `${((10000 / collateralRatioBps) * 100).toFixed(0)}%` : '—';
    const borrowRate = interestRateBps > 0 ? `${(interestRateBps / 100).toFixed(2)}% APY` : '—';
    const convictionLabels = ['None', 'Low', 'Medium', 'High', 'Max'];

    return (
        <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Credit Profile</h3>
                <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold border', tierBadge)}>{scoreTierLabel}</span>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Credit Score</span>
                    <span className={cn('font-bold text-sm', scoreTone)}>{score > 0 ? score : '—'} / 100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10">
                    <div className={cn('h-full rounded-full transition-all', scoreBarColor)} style={{ width: `${scorePct}%` }} />
                </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-black/20 px-4 py-3">
                <InfoRow label="Max LTV" value={maxLTV} />
                <InfoRow label="Borrow rate" value={borrowRate} />
                <InfoRow label="Successful repayments" value={repaymentCount.toString()} tone={repaymentCount > 0n ? 'green' : undefined} />
                <InfoRow label="Defaults" value={defaultCount.toString()} tone={defaultCount > 0n ? 'red' : undefined} />
            </div>
            <div className="rounded-xl border border-white/5 bg-black/10 overflow-hidden">
                <button onClick={() => setExpanded(v => !v)} className="w-full flex items-center justify-between px-4 py-3 text-xs text-slate-400 hover:text-white transition-colors">
                    <span>Score breakdown</span>
                    <span className={cn('transition-transform inline-block', expanded ? 'rotate-180' : '')}>▾</span>
                </button>
                <AnimatePresence>
                    {expanded && (
                        <motion.div key="reasoning" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                            <div className="px-4 pb-4 space-y-3 border-t border-white/5">
                                <div className="pt-3 space-y-2 text-xs text-slate-400">
                                    <div className="flex items-start gap-2"><span className="text-indigo-400 shrink-0">•</span><span><span className="text-slate-200">Balance tier:</span> {scoreTierLabel}</span></div>
                                    <div className="flex items-start gap-2"><span className="text-indigo-400 shrink-0">•</span><span><span className="text-slate-200">Governance votes:</span> {governanceVotes.toString()} (conviction: {convictionLabels[Math.min(governanceConviction, 4)] ?? 'Unknown'})</span></div>
                                    <div className="flex items-start gap-2"><span className="text-indigo-400 shrink-0">•</span><span><span className="text-slate-200">History:</span> {repaymentCount.toString()} repayment{repaymentCount !== 1n ? 's' : ''}, {defaultCount.toString()} default{defaultCount !== 1n ? 's' : ''}</span></div>
                                </div>
                                <div className="rounded-xl border border-white/5 bg-black/20 p-3 space-y-1.5 text-xs text-slate-400">
                                    <p className="font-medium text-slate-300">Improve your score</p>
                                    <p>Repay loans on time to increase your score</p>
                                    <p>Participate in governance to boost your score</p>
                                    <p>Maintain a higher wallet balance (PAS tier)</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ── Section heading ───────────────────────────────────────────────────────
function SectionHeading({ label }: { label: string }) {
    return <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</h2>;
}

// ── Main page ─────────────────────────────────────────────────────────────

export default function DashboardPage() {
    const { address, isConnected } = useAccount();
    const { lending, pasMarket, oracle, loading: globalLoading, error: globalError, refresh: refreshGlobal } = useGlobalProtocolData();
    const { score, refresh: refreshScore } = useUserScore();
    const portfolio = useUserPortfolio();

    const { data: ltvBpsRaw } = useReadContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'ltvBps' });
    const ltvBps = (ltvBpsRaw as bigint | undefined) ?? 6500n;

    const lastRefreshRef = useRef(Date.now());
    const [secondsAgo, setSecondsAgo] = useState(0);
    useEffect(() => { const id = setInterval(() => setSecondsAgo(Math.floor((Date.now() - lastRefreshRef.current) / 1000)), 1000); return () => clearInterval(id); }, []);

    const handleRefresh = useCallback(() => {
        portfolio.refresh(); refreshGlobal(); refreshScore();
        lastRefreshRef.current = Date.now(); setSecondsAgo(0);
    }, []);

    useEffect(() => { const id = setInterval(handleRefresh, 30_000); return () => clearInterval(id); }, [handleRefresh]);

    const hasPasBorrow = portfolio.pasPosition[0] > 0n || portfolio.pasPosition[2] > 0n;
    const hasUsdcBorrow = portfolio.lendingPosition[0] > 0n || portfolio.lendingPosition[1] > 0n;
    const hasPasLend = portfolio.pasDeposit > 0n;
    const hasUsdcLend = portfolio.lendingDeposit > 0n;
    const hasAnyBorrow = hasPasBorrow || hasUsdcBorrow;
    const hasAnyLend = hasPasLend || hasUsdcLend;
    const hasAnything = hasAnyBorrow || hasAnyLend;
    const totalRepayments = portfolio.pasRepaymentCount + portfolio.lendingRepaymentCount;
    const totalDefaults = portfolio.pasDefaultCount + portfolio.lendingDefaultCount;

    return (
        <PageShell title="Dashboard" subtitle="Protocol overview, active positions, and credit profile.">

            {/* ── Protocol metrics ── */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <MetricCard label="Total Liquidity" value={`${fmtToken(lending.totalDeposited + pasMarket.totalDeposited, 6, 2)} mUSDC`} />
                <MetricCard label="Total Borrowed" value={`${fmtToken(lending.totalBorrowed + pasMarket.totalBorrowed, 6, 2)} mUSDC`} />
                <MetricCard label="Oracle" value={oracle.isCrashed ? 'Crash Mode' : 'Healthy'} tone={oracle.isCrashed ? 'red' : 'green'} />
                <MetricCard label="Credit Tier" value={isConnected ? tierLabel(score.tier) : '—'} />
            </section>

            {/* ── Market detail ── */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 space-y-3">
                    <div className="flex items-center justify-between mb-1">
                        <div>
                            <h2 className="text-sm font-semibold text-white">USDC Lending Market</h2>
                            <p className="text-xs text-slate-400 mt-0.5">KredioLending — mUSDC deposits</p>
                        </div>
                        <Link href="/markets/usdc" className="text-xs text-slate-400 hover:text-white border border-white/10 px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors">Details</Link>
                    </div>
                    <InfoRow label="Total Deposited" value={`${fmtToken(lending.totalDeposited, 6, 2)} mUSDC`} />
                    <InfoRow label="Total Borrowed" value={`${fmtToken(lending.totalBorrowed, 6, 2)} mUSDC`} />
                    <InfoRow label="Utilization" value={bpsToPercent(lending.utilizationBps)} />
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 space-y-3">
                    <div className="flex items-center justify-between mb-1">
                        <div>
                            <h2 className="text-sm font-semibold text-white">PAS Collateral Market</h2>
                            <p className="text-xs text-slate-400 mt-0.5">KredioPASMarket — PAS-backed borrowing</p>
                        </div>
                        <Link href="/markets/pas" className="text-xs text-slate-400 hover:text-white border border-white/10 px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors">Details</Link>
                    </div>
                    <InfoRow label="Total Deposited" value={`${fmtToken(pasMarket.totalDeposited, 6, 2)} mUSDC`} />
                    <InfoRow label="Total Borrowed" value={`${fmtToken(pasMarket.totalBorrowed, 6, 2)} mUSDC`} />
                    <InfoRow label="Utilization" value={bpsToPercent(pasMarket.utilizationBps)} />
                    <InfoRow label="PAS Price" value={fmtOraclePrice8(oracle.price8)} tone={oracle.isCrashed ? 'red' : undefined} />
                </div>
            </div>

            {/* ── Wallet positions ── */}
            {!isConnected && (
                <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl px-6 py-10 flex flex-col items-center gap-3 text-center">
                    <p className="text-slate-300 text-sm font-medium">Connect your wallet to view positions and credit profile</p>
                    <p className="text-slate-500 text-xs">Use the Connect Wallet button in the header</p>
                </div>
            )}

            {isConnected && (
                <>
                    {/* refresh bar */}
                    <div className="flex items-center justify-between">
                        <SectionHeading label="My Positions" />
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-500">{secondsAgo}s ago</span>
                            <button onClick={handleRefresh} disabled={portfolio.loading} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors disabled:opacity-50">
                                <span className={cn(portfolio.loading ? 'animate-spin' : '')}>↻</span> Refresh
                            </button>
                        </div>
                    </div>

                    {/* loading */}
                    {portfolio.loading && !hasAnything && (
                        <div className="space-y-3">
                            {[1, 2].map(i => <div key={i} className="rounded-2xl border border-white/5 bg-black/20 p-5 h-36 animate-pulse" />)}
                        </div>
                    )}

                    {/* no positions */}
                    {!portfolio.loading && !hasAnything && (
                        <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl px-6 py-10 flex flex-col items-center gap-4 text-center">
                            <p className="text-slate-200 text-sm font-medium">No active positions</p>
                            <p className="text-slate-500 text-xs">Start lending or borrowing to see your positions here</p>
                            <div className="flex gap-3 pt-1">
                                <Link href="/lend/usdc" className="px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">Start Lending</Link>
                                <Link href="/borrow/usdc" className="px-5 py-2 rounded-xl text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-colors">Start Borrowing</Link>
                            </div>
                        </div>
                    )}

                    {/* borrow positions */}
                    {hasAnyBorrow && (
                        <div className="space-y-3">
                            <SectionHeading label="Borrow Positions" />
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                {hasPasBorrow && (
                                    <PASBorrowCard
                                        collateralWei={portfolio.pasPosition[0]}
                                        debtAtoms={portfolio.pasPosition[2]}
                                        accruedAtoms={portfolio.pasPosition[3]}
                                        totalOwedAtoms={portfolio.pasPosition[4]}
                                        healthRatio={portfolio.pasHealthRatio}
                                        oraclePrice8={oracle.price8}
                                        ltvBps={ltvBps}
                                        onRefresh={handleRefresh}
                                    />
                                )}
                                {hasUsdcBorrow && (
                                    <USDCBorrowCard
                                        collateralAtoms={portfolio.lendingPosition[0]}
                                        debtAtoms={portfolio.lendingPosition[1]}
                                        accruedAtoms={portfolio.lendingPosition[2]}
                                        totalOwedAtoms={portfolio.lendingPosition[3]}
                                        healthRatio={portfolio.lendingHealthRatio}
                                        onRefresh={handleRefresh}
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {/* lend positions */}
                    {hasAnyLend && (
                        <div className="space-y-3">
                            <SectionHeading label="Lend Positions" />
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                {hasPasLend && (
                                    <LendCard
                                        label="PAS Market — Lending"
                                        subtitle="mUSDC deposited to PAS-collateral pool"
                                        depositAtoms={portfolio.pasDeposit}
                                        yieldAtoms={portfolio.pasPendingYield}
                                        utilizationBps={pasMarket.utilizationBps}
                                        contractAddr={config.pasMarket}
                                        abi={ABIS.KREDIO_PAS_MARKET}
                                        onRefresh={handleRefresh}
                                    />
                                )}
                                {hasUsdcLend && (
                                    <LendCard
                                        label="USDC Market — Lending"
                                        subtitle="mUSDC deposited to KredioLending pool"
                                        depositAtoms={portfolio.lendingDeposit}
                                        yieldAtoms={portfolio.lendingPendingYield}
                                        utilizationBps={lending.utilizationBps}
                                        contractAddr={config.lending}
                                        abi={ABIS.KREDIO_LENDING}
                                        onRefresh={handleRefresh}
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {/* credit profile */}
                    <div className="space-y-3">
                        <SectionHeading label="Credit Profile" />
                        <CreditProfile
                            scoreValue={score.score}
                            tier={score.tier}
                            collateralRatioBps={score.collateralRatioBps}
                            interestRateBps={score.interestRateBps}
                            repaymentCount={totalRepayments}
                            defaultCount={totalDefaults}
                            governanceVotes={portfolio.governance[0]}
                            governanceConviction={portfolio.governance[1]}
                        />
                    </div>
                </>
            )}

            {globalError && <StateNotice tone="error" message={globalError} />}
        </PageShell>
    );
}
