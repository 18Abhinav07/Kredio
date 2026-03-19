"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { maxUint256 } from 'viem';
import { motion, AnimatePresence } from 'framer-motion';
import { PageShell, StateNotice } from '../../components/modules/ProtocolUI';
import config from '../../lib/addresses';
import { ABIS } from '../../lib/constants';
import { cn } from '../../lib/utils';
import { parseUsdcInput } from '../../lib/input';
import {
    bpsToPercent, fmtOraclePrice8, fmtCount, fmtTimestamp, fmtToken,
    useGlobalProtocolData, useUserPortfolio, useUserScore, tierLabel,
    formatHealthFactor, healthState, useLendingHistory, useStrategyData,
    type LendHistoryEntry, type StrategySnapshot,
} from '../../hooks/useProtocolData';
import { DonutChart } from '../../components/modules/DonutChart';

function repaymentPts(count: number) { return Math.min(count * 5, 55); }
function liquidationPenalty(count: number) { return count * 50; }
function depositPts(amount: bigint) { const usd = Number(amount) / 1e6; return Math.min(Math.floor(usd / 100) * 1, 35); }
function agePts(blocks: number) { return Math.min(Math.floor(blocks / 100800), 10); } // Roughly months

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
function InfoRow({ label, value, tone }: { label: string; value: React.ReactNode; tone?: 'green' | 'yellow' | 'red' | 'blue' | 'purple' }) {
    return (
        <div className="flex items-center justify-between text-[13px] py-2.5 border-b border-white/5 last:border-0 group/row hover:bg-white/[0.02] px-3 -mx-3 rounded-lg transition-colors">
            <span className="text-slate-400">{label}</span>
            <span className={cn('font-semibold font-mono tracking-tight',
                tone === 'green' ? 'text-emerald-400' :
                    tone === 'yellow' ? 'text-amber-400' :
                        tone === 'red' ? 'text-rose-400' :
                            tone === 'blue' ? 'text-cyan-400' :
                                tone === 'purple' ? 'text-purple-400' :
                                    'text-slate-100'
            )}>{value}</span>
        </div>
    );
}

function MetricCard({ label, value, sub, tone }: {
    label: string; value: string; sub?: string;
    tone?: 'green' | 'red' | 'blue' | 'purple'
}) {
    const accent = {
        green: { bar: 'bg-emerald-500', text: 'text-emerald-400', ring: 'rgba(52,211,153,0.15)' },
        blue: { bar: 'bg-cyan-500', text: 'text-cyan-400', ring: 'rgba(34,211,238,0.15)' },
        red: { bar: 'bg-rose-500', text: 'text-rose-400', ring: 'rgba(244,63,94,0.15)' },
        purple: { bar: 'bg-purple-500', text: 'text-purple-400', ring: 'rgba(168,85,247,0.15)' },
    }[tone ?? 'blue'] ?? { bar: 'bg-white/20', text: 'text-white', ring: 'transparent' };

    return (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 flex items-stretch gap-4 group hover:border-white/20 hover:bg-black/40 transition-all shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
            {/* Left accent bar */}
            <div className={`w-[3px] rounded-full shrink-0 ${accent.bar} opacity-70`} />

            <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">{label}</p>
                <p className={`text-[22px] font-black tracking-tight truncate ${accent.text}`}>{value}</p>
                {sub && <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>}
            </div>
        </div>
    );
}

function healthTone(ratioRaw: bigint): 'green' | 'yellow' | 'red' {
    const n = Number(ratioRaw) / 10000;
    if (n >= 1.5 || ratioRaw > BigInt('1000000000')) return 'green';
    if (n >= 1.2) return 'yellow';
    return 'red';
}
function healthLabel(ratioRaw: bigint) {
    const t = healthTone(ratioRaw);
    return t === 'green' ? 'Safe' : t === 'yellow' ? 'Caution' : 'At Risk';
}
function healthNum(ratioRaw: bigint) {
    if (ratioRaw > BigInt('1000000000')) return Infinity;
    return Number(ratioRaw) / 10000;
}
function fmt6(atoms: bigint, dp = 2) { return (Number(atoms) / 1e6).toFixed(dp); }
function fmt18(wei: bigint, dp = 4) { return (Number(wei) / 1e18).toFixed(dp); }

// ── Analytics Components (Row 2) ──────────────────────────────────────────

function CreditScorePanel({ scoreValue, tier, collateralRatioBps, interestRateBps,
    repaymentCount, liquidationCount, totalDepositedEver, firstSeenBlock, currentBlock
}: {
    scoreValue: bigint; tier: number; collateralRatioBps: number; interestRateBps: number;
    repaymentCount: number; liquidationCount: number; totalDepositedEver: bigint;
    firstSeenBlock: bigint; currentBlock: bigint;
}) {
    const score = Number(scoreValue);
    const scorePct = Math.min(score / 100, 1);
    const scoreTone = score >= 65 ? '#60A5FA' : score >= 50 ? '#34D399' : score >= 30 ? '#FBBF24' : '#F87171';

    const repayments = Number(repaymentCount);
    const liquidations = Number(liquidationCount);
    const blocksSince = firstSeenBlock > 0n ? Number(currentBlock - firstSeenBlock) : 0;
    const rPts = Math.max(0, repaymentPts(repayments) - liquidationPenalty(liquidations));
    const dPts = depositPts(totalDepositedEver);
    const aPts = agePts(blocksSince);

    const tierColors = ['#475569', '#78350F', '#9CA3AF', '#B45309', '#818CF8', '#38BDF8'];
    const tierNames = ['ANON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'];

    return (
        <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 flex flex-col gap-5 justify-between h-full hover:border-white/20 hover:bg-black/35 transition-colors">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-white">Credit Profile</h2>
                <div className="px-2.5 py-1 rounded-lg border" style={{ color: tierColors[Math.min(tier, 5)], borderColor: tierColors[Math.min(tier, 5)] + '40', backgroundColor: 'transparent' }}>
                    <span className="text-xs font-semibold uppercase tracking-wider">{tierNames[Math.min(tier, 5)]}</span>
                </div>
            </div>

            {/* Donut + center score */}
            <div className="flex items-center gap-6">
                <div className="relative w-28 h-28 shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 overflow-visible">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="42" fill="none"
                            stroke={scoreTone}
                            strokeWidth="8"
                            strokeDasharray={`${2 * Math.PI * 42}`}
                            strokeDashoffset={2 * Math.PI * 42 * (1 - scorePct)}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-semibold" style={{ color: scoreTone }}>{score > 0 ? score : '—'}</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">/ 100</span>
                    </div>
                </div>

                {/* Key metrics column */}
                <div className="flex-1 space-y-3">
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Max LTV</p>
                        <p className="text-xl font-semibold text-white mt-0.5">
                            {collateralRatioBps > 0 ? `${((10000 / collateralRatioBps) * 100).toFixed(0)}%` : '—'}
                        </p>
                    </div>
                    <div className="h-px bg-white/5" />
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Borrow Rate</p>
                        <p className="text-xl font-semibold text-white mt-0.5">
                            {interestRateBps > 0 ? `${(interestRateBps / 100).toFixed(2)}%` : '—'}
                            <span className="text-xs font-normal text-slate-500 ml-1">APY</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Score components */}
            <div className="space-y-2.5">
                <ScoreBar label="Repayment History" value={rPts} max={55} color="#64748B" />
                <ScoreBar label="Lending Volume" value={dPts} max={35} color="#94A3B8" />
                <ScoreBar label="Account Age" value={aPts} max={10} color="#CBD5E1" />
            </div>

            {/* Tier progression strip */}
            <TierProgressStrip currentTier={tier} />
        </div>
    );
}

function ScoreBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
    const pct = max > 0 ? (value / max) * 100 : 0;
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">{label}</span>
                <span className="text-xs font-medium font-mono" style={{ color }}>{value}<span className="text-slate-600">/{max}</span></span>
            </div>
            <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}60` }} />
            </div>
        </div>
    );
}

function TierProgressStrip({ currentTier }: { currentTier: number }) {
    const tiers = [
        { label: 'ANON', color: '#64748B' },
        { label: 'BRONZE', color: '#92400E' },
        { label: 'SILVER', color: '#9CA3AF' },
        { label: 'GOLD', color: '#F59E0B' },
        { label: 'PLATINUM', color: '#A78BFA' },
        { label: 'DIAMOND', color: '#22D3EE' },
    ];
    return (
        <div className="flex items-center gap-1 pt-1">
            {tiers.map((t, i) => (
                <div key={t.label} className="flex-1 flex flex-col items-center gap-1">
                    <div className={cn('h-1 w-full rounded-full transition-all',
                        i <= currentTier ? 'opacity-100' : 'opacity-20'
                    )} style={{ backgroundColor: t.color, boxShadow: i === currentTier ? `0 0 6px ${t.color}` : 'none' }} />
                    {i === currentTier && (
                        <span className="text-[10px] font-medium uppercase" style={{ color: t.color }}>{t.label}</span>
                    )}
                </div>
            ))}
        </div>
    );
}

function PoolDonutChart({ label, totalDeposited, userDeposited, totalBorrowed, utilizationBps, accent, contractAddr, abi, onRefresh }:
    { label: string; totalDeposited: bigint; userDeposited: bigint; totalBorrowed: bigint; utilizationBps: bigint; accent: string; contractAddr: `0x${string}`; abi: any; onRefresh: () => void }
) {
    const total = Number(totalDeposited) / 1e6;
    const userAmt = Number(userDeposited) / 1e6;
    const borrowed = Number(totalBorrowed) / 1e6;
    const available = Math.max(0, total - borrowed);

    const R = 42;
    const circ = 2 * Math.PI * R;
    const utilPct = total > 0 ? borrowed / total : 0;
    const userPct = total > 0 ? userAmt / total : 0;

    const borrowedDash = circ * utilPct;
    const availableDash = circ * (1 - utilPct);



    return (
        <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 flex flex-col justify-between h-full hover:border-white/20 hover:bg-black/35 transition-colors">
            <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-semibold text-white">{label}</h2>
                    <span className="text-xs text-slate-500 border border-white/10 rounded-lg px-2.5 py-1">
                        {total.toFixed(0)} <span className="text-slate-600">total</span>
                    </span>
                </div>

                <div className="flex items-center gap-6 flex-1">
                    <div className="relative w-28 h-28 shrink-0">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 overflow-visible">
                            <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                            {utilPct > 0 && (
                                <circle cx="50" cy="50" r={R} fill="none" stroke="#475569" strokeWidth="8" strokeDasharray={`${borrowedDash} ${circ}`} strokeDashoffset="0" strokeLinecap="round" />
                            )}
                            <circle cx="50" cy="50" r={R} fill="none" stroke={accent} strokeWidth="8" strokeDasharray={`${availableDash} ${circ}`} strokeDashoffset={`${-borrowedDash}`} strokeLinecap="round" />
                            {userPct > 0 && (
                                <circle cx="50" cy="50" r={R + 6} fill="none" stroke={accent} strokeWidth="2" strokeDasharray={`${circ * userPct} ${circ}`} strokeDashoffset="0" strokeLinecap="round" opacity="0.6" />
                            )}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-semibold text-white">{(utilPct * 100).toFixed(0)}%</span>
                            <span className="text-[10px] text-slate-500 mt-0.5">utilized</span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-3">
                        <LegendRow color={accent} label="Available" value={`${available.toFixed(0)}`} dim={false} />
                        <LegendRow color="#475569" label="Borrowed" value={`${borrowed.toFixed(0)}`} dim={false} />
                    </div>
                </div>
            </div>

            {userAmt > 0 && (
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Your deposit</span>
                    <span className="text-base font-medium text-white">{userAmt.toFixed(2)} <span className="text-slate-500 text-xs">mUSDC</span></span>
                </div>
            )}
        </div>
    );
}

function LegendRow({ color, label, value, dim }: { color: string; label: string; value: string; dim?: boolean }) {
    return (
        <div className={cn('flex items-center justify-between text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0', dim ? 'opacity-60' : '')}>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span className="text-slate-400">{label}</span>
            </div>
            <span className="font-medium text-white">{value}</span>
        </div>
    );
}

function HealthBar({ ratio }: { ratio: bigint }) {
    const num = healthNum(ratio);
    const pct = Math.min(isFinite(num) ? (num / 2.0) * 100 : 100, 100);
    const tone = healthTone(ratio);
    const lbl = healthLabel(ratio);
    return (
        <div className="space-y-2 mt-5">
            <div className="flex justify-between items-center text-xs">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Position Health</span>
                <span className={cn('px-2 py-0.5 rounded-md font-medium text-xs uppercase tracking-wider border',
                    tone === 'green' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                        tone === 'yellow' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                            'bg-rose-500/10 border-rose-500/20 text-rose-400 animate-pulse')}>
                    {isFinite(num) ? num.toFixed(2) : '—'} • {lbl}
                </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden ring-1 ring-inset ring-white/5">
                <div className={cn('h-full rounded-full transition-all duration-500 relative',
                    tone === 'green' ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' :
                        tone === 'yellow' ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                            'bg-gradient-to-r from-rose-600 to-rose-400'
                )} style={{ width: `${pct}%` }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                </div>
            </div>
        </div>
    );
}

// ── Borrow position card (repay + withdraw) ───────────────────────────────
type RepayPhase = 'idle' | 'confirming' | 'approving' | 'repaying' | 'success';
type WithdrawPhase = 'idle' | 'confirming' | 'withdrawing' | 'success';

function PASBorrowRow({ collateralWei, debtAtoms, accruedAtoms, totalOwedAtoms, healthRatio, oraclePrice8, ltvBps, onRefresh, onBusy }: {
    collateralWei: bigint; debtAtoms: bigint; accruedAtoms: bigint; totalOwedAtoms: bigint;
    healthRatio: bigint; oraclePrice8: bigint; ltvBps: bigint; onRefresh: () => void; onBusy: (v: boolean) => void;
}) {
    const [repayPhase, setRepayPhase] = useState<RepayPhase>('idle');
    const [withdrawPhase, setWithdrawPhase] = useState<WithdrawPhase>('idle');
    const { writeContract: writeApprove, data: approveHash, isPending: approveSigning, isError: approveIsError, reset: resetApprove } = useWriteContract();
    const { isSuccess: approveSuccess } = useWaitForTransactionReceipt({ hash: approveHash });
    const { writeContract: writeRepay, data: repayHash, isPending: repaySigning, isError: repayIsError, reset: resetRepay } = useWriteContract();
    const { isSuccess: repaySuccess, isLoading: repayConfirming } = useWaitForTransactionReceipt({ hash: repayHash });
    const { writeContract: writeWithdraw, data: withdrawHash, isPending: withdrawSigning, isError: withdrawIsError } = useWriteContract();
    const { isSuccess: withdrawSuccess } = useWaitForTransactionReceipt({ hash: withdrawHash });

    useEffect(() => { if (!approveSuccess || repayPhase !== 'approving') return; setRepayPhase('repaying'); setTimeout(() => writeRepay({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'repay' }), 300); }, [approveSuccess]);
    useEffect(() => { if (!repaySuccess) return; setRepayPhase('success'); const t = setTimeout(() => { onRefresh(); setRepayPhase('idle'); onBusy(false); }, 1500); return () => clearTimeout(t); }, [repaySuccess]);
    useEffect(() => { if (!withdrawSuccess) return; setWithdrawPhase('success'); const t = setTimeout(() => { onRefresh(); setWithdrawPhase('idle'); onBusy(false); }, 1500); return () => clearTimeout(t); }, [withdrawSuccess]);
    useEffect(() => { if (approveIsError && repayPhase === 'approving') { setRepayPhase('idle'); resetApprove(); onBusy(false); } }, [approveIsError]);
    useEffect(() => { if (repayIsError && repayPhase === 'repaying') { setRepayPhase('idle'); resetRepay(); onBusy(false); } }, [repayIsError]);
    useEffect(() => { if (withdrawIsError && withdrawPhase === 'withdrawing') { setWithdrawPhase('idle'); onBusy(false); } }, [withdrawIsError]);

    // Approve maxUint256 so that additional interest accruing between the approve
    // block and the repay block can never cause the transferFrom to fail.
    const handleConfirmRepay = () => { onBusy(true); resetApprove(); resetRepay(); setRepayPhase('approving'); writeApprove({ address: config.mUSDC, abi: ABIS.ERC20, functionName: 'approve', args: [config.pasMarket, maxUint256] }); };
    const handleConfirmWithdraw = () => { setWithdrawPhase('withdrawing'); writeWithdraw({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'withdrawCollateral' }); };

    const oracleUsd = Number(oraclePrice8) / 1e8;
    const pasAmount = Number(collateralWei) / 1e18;
    const canWithdraw = debtAtoms === 0n && collateralWei > 0n;
    const tone = healthTone(healthRatio);

    if (collateralWei === 0n && debtAtoms === 0n && repayPhase === 'idle' && withdrawPhase === 'idle') return null;

    return (
        <tr className="hover:bg-white/[0.02] transition-colors group">
            <td className="px-5 py-4 align-middle text-sm font-medium text-white whitespace-nowrap">
                PAS Market
            </td>
            <td className="px-5 py-4 align-middle whitespace-nowrap">
                <span className="text-sm font-medium text-white">{fmt18(collateralWei, 4)}</span> <span className="text-xs text-slate-500">PAS</span>
            </td>
            <td className="px-5 py-4 align-middle whitespace-nowrap">
                <span className="text-sm font-medium text-white">{fmt6(debtAtoms)}</span> <span className="text-xs text-slate-500">mUSDC</span>
            </td>
            <td className="px-5 py-4 align-middle whitespace-nowrap">
                <span className="text-sm font-medium text-amber-400">{fmt6(accruedAtoms, 6)}</span> <span className="text-xs text-slate-500">mUSDC</span>
            </td>
            <td className="px-5 py-4 align-middle whitespace-nowrap">
                <span className={cn("inline-flex items-center px-2 py-1 rounded text-xs font-semibold border", tone === 'green' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : tone === 'yellow' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400 animate-pulse')}>{isFinite(healthNum(healthRatio)) ? healthNum(healthRatio).toFixed(2) : '—'}</span>
            </td>
            <td className="px-5 py-4 align-middle text-right whitespace-nowrap">
                <div className="flex items-center justify-end gap-2">
                    {repayPhase === 'idle' && withdrawPhase === 'idle' ? (
                        <>
                            {debtAtoms > 0n && <button onClick={() => { onBusy(true); setRepayPhase('confirming'); }} className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors">Repay</button>}
                            <button onClick={() => { onBusy(true); setWithdrawPhase('confirming'); }} disabled={!canWithdraw} className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">Withdraw</button>
                        </>
                    ) : repayPhase !== 'idle' ? (
                        <div className="flex justify-end gap-2">
                            {repayPhase === 'confirming' && (<>
                                <button onClick={handleConfirmRepay} className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors">Confirm</button>
                                <button onClick={() => { setRepayPhase('idle'); onBusy(false); }} className="px-3 py-1.5 rounded-xl text-xs font-medium border border-white/10 text-slate-400 hover:text-white transition-colors">Cancel</button>
                            </>)}
                            {repayPhase === 'approving' && (<div className="flex items-center gap-2 text-xs text-indigo-300 px-3 py-1.5"><Spinner small />Approving…</div>)}
                            {repayPhase === 'repaying' && (<div className="flex items-center gap-2 text-xs text-indigo-300 px-3 py-1.5"><Spinner small />Repaying…</div>)}
                            {repayPhase === 'success' && (<div className="flex items-center gap-1.5 text-xs text-emerald-400 px-3 py-1.5"><Check />Done</div>)}
                        </div>
                    ) : withdrawPhase !== 'idle' ? (
                        <div className="flex justify-end gap-2">
                            {withdrawPhase === 'confirming' && (<>
                                <button onClick={handleConfirmWithdraw} className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors">Confirm</button>
                                <button onClick={() => { setWithdrawPhase('idle'); onBusy(false); }} className="px-3 py-1.5 rounded-xl text-xs font-medium border border-white/10 text-slate-400 hover:text-white transition-colors">Cancel</button>
                            </>)}
                            {withdrawPhase === 'withdrawing' && (<div className="flex items-center gap-2 text-xs text-slate-400 px-3 py-1.5"><Spinner small />Withdrawing…</div>)}
                            {withdrawPhase === 'success' && (<div className="flex items-center gap-1.5 text-xs text-emerald-400 px-3 py-1.5"><Check />Done</div>)}
                        </div>
                    ) : null}
                </div>
            </td>
        </tr>
    );
}

function USDCBorrowRow({ collateralAtoms, debtAtoms, accruedAtoms, totalOwedAtoms, healthRatio, walletCollateralAtoms, onRefresh, onBusy }: {
    collateralAtoms: bigint; debtAtoms: bigint; accruedAtoms: bigint; totalOwedAtoms: bigint; healthRatio: bigint;
    walletCollateralAtoms: bigint; onRefresh: () => void; onBusy: (v: boolean) => void;
}) {
    const [repayPhase, setRepayPhase] = useState<RepayPhase>('idle');
    const [withdrawPhase, setWithdrawPhase] = useState<WithdrawPhase>('idle');
    const { writeContract: writeApprove, data: approveHash, isPending: approveSigning, isError: approveIsError, reset: resetApprove } = useWriteContract();
    const { isSuccess: approveSuccess } = useWaitForTransactionReceipt({ hash: approveHash });
    const { writeContract: writeRepay, data: repayHash, isPending: repaySigning, isError: repayIsError, reset: resetRepay } = useWriteContract();
    const { isSuccess: repaySuccess, isLoading: repayConfirming } = useWaitForTransactionReceipt({ hash: repayHash });
    const { writeContract: writeWithdraw, data: withdrawHash, isPending: withdrawSigning, isError: withdrawIsError } = useWriteContract();
    const { isSuccess: withdrawSuccess } = useWaitForTransactionReceipt({ hash: withdrawHash });

    useEffect(() => { if (!approveSuccess || repayPhase !== 'approving') return; setRepayPhase('repaying'); setTimeout(() => writeRepay({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'repay' }), 300); }, [approveSuccess]);
    useEffect(() => { if (!repaySuccess) return; setRepayPhase('success'); const t = setTimeout(() => { onRefresh(); setRepayPhase('idle'); onBusy(false); }, 1500); return () => clearTimeout(t); }, [repaySuccess]);
    useEffect(() => { if (!withdrawSuccess) return; setWithdrawPhase('success'); const t = setTimeout(() => { onRefresh(); setWithdrawPhase('idle'); onBusy(false); }, 1500); return () => clearTimeout(t); }, [withdrawSuccess]);
    useEffect(() => { if (approveIsError && repayPhase === 'approving') { setRepayPhase('idle'); resetApprove(); onBusy(false); } }, [approveIsError]);
    useEffect(() => { if (repayIsError && repayPhase === 'repaying') { setRepayPhase('idle'); resetRepay(); onBusy(false); } }, [repayIsError]);
    useEffect(() => { if (withdrawIsError && withdrawPhase === 'withdrawing') { setWithdrawPhase('idle'); onBusy(false); } }, [withdrawIsError]);

    // Approve maxUint256 so that additional interest accruing between the approve
    // block and the repay block can never cause the transferFrom to fail.
    const handleConfirmRepay = () => { onBusy(true); resetApprove(); resetRepay(); setRepayPhase('approving'); writeApprove({ address: config.mUSDC, abi: ABIS.ERC20, functionName: 'approve', args: [config.lending, maxUint256] }); };
    const handleConfirmWithdraw = () => { setWithdrawPhase('withdrawing'); writeWithdraw({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'withdrawCollateral' }); };

    const canWithdraw = walletCollateralAtoms > 0n && debtAtoms === 0n && collateralAtoms === 0n;
    const tone = healthTone(healthRatio);

    if (collateralAtoms === 0n && debtAtoms === 0n && walletCollateralAtoms === 0n && repayPhase === 'idle' && withdrawPhase === 'idle') return null;

    return (
        <tr className="hover:bg-white/[0.02] transition-colors group">
            <td className="px-5 py-4 align-middle text-sm font-medium text-white whitespace-nowrap">
                USDC Market
            </td>
            <td className="px-5 py-4 align-middle whitespace-nowrap">
                <span className="text-sm font-medium text-white">{fmt6(collateralAtoms > 0n ? collateralAtoms : walletCollateralAtoms)}</span> <span className="text-xs text-slate-500">mUSDC</span>
                {walletCollateralAtoms > 0n && collateralAtoms === 0n && <span className="block text-[10px] text-slate-600 mt-0.5">Unlocked — no active position</span>}
            </td>
            <td className="px-5 py-4 align-middle whitespace-nowrap">
                <span className="text-sm font-medium text-white">{fmt6(debtAtoms)}</span> <span className="text-xs text-slate-500">mUSDC</span>
            </td>
            <td className="px-5 py-4 align-middle whitespace-nowrap">
                <span className="text-sm font-medium text-amber-400">{fmt6(accruedAtoms, 6)}</span> <span className="text-xs text-slate-500">mUSDC</span>
            </td>
            <td className="px-5 py-4 align-middle whitespace-nowrap">
                <span className={cn("inline-flex items-center px-2 py-1 rounded text-xs font-semibold border", tone === 'green' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : tone === 'yellow' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400 animate-pulse')}>{isFinite(healthNum(healthRatio)) ? healthNum(healthRatio).toFixed(2) : '—'}</span>
            </td>
            <td className="px-5 py-4 align-middle text-right whitespace-nowrap">
                <div className="flex items-center justify-end gap-2">
                    {repayPhase === 'idle' && withdrawPhase === 'idle' ? (
                        <>
                            {debtAtoms > 0n && <button onClick={() => { onBusy(true); setRepayPhase('confirming'); }} className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors">Repay</button>}
                            <button onClick={() => { onBusy(true); setWithdrawPhase('confirming'); }} disabled={!canWithdraw} className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">Withdraw</button>
                        </>
                    ) : repayPhase !== 'idle' ? (
                        <div className="flex justify-end gap-2">
                            {repayPhase === 'confirming' && (<>
                                <button onClick={handleConfirmRepay} className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors">Confirm</button>
                                <button onClick={() => { setRepayPhase('idle'); onBusy(false); }} className="px-3 py-1.5 rounded-xl text-xs font-medium border border-white/10 text-slate-400 hover:text-white transition-colors">Cancel</button>
                            </>)}
                            {repayPhase === 'approving' && (<div className="flex items-center gap-2 text-xs text-indigo-300 px-3 py-1.5"><Spinner small />Approving…</div>)}
                            {repayPhase === 'repaying' && (<div className="flex items-center gap-2 text-xs text-indigo-300 px-3 py-1.5"><Spinner small />Repaying…</div>)}
                            {repayPhase === 'success' && (<div className="flex items-center gap-1.5 text-xs text-emerald-400 px-3 py-1.5"><Check />Done</div>)}
                        </div>
                    ) : withdrawPhase !== 'idle' ? (
                        <div className="flex justify-end gap-2">
                            {withdrawPhase === 'confirming' && (<>
                                <button onClick={handleConfirmWithdraw} className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors">Confirm</button>
                                <button onClick={() => { setWithdrawPhase('idle'); onBusy(false); }} className="px-3 py-1.5 rounded-xl text-xs font-medium border border-white/10 text-slate-400 hover:text-white transition-colors">Cancel</button>
                            </>)}
                            {withdrawPhase === 'withdrawing' && (<div className="flex items-center gap-2 text-xs text-slate-400 px-3 py-1.5"><Spinner small />Withdrawing…</div>)}
                            {withdrawPhase === 'success' && (<div className="flex items-center gap-1.5 text-xs text-emerald-400 px-3 py-1.5"><Check />Done</div>)}
                        </div>
                    ) : null}
                </div>
            </td>
        </tr>
    );
}

// ── Intelligent Yield Strategy panel (shown in Claim / Activity tab) ─────

function IntelligentYieldPanel({
    strategy,
    lendingDeposit,
    totalDeposited,
}: {
    strategy: StrategySnapshot;
    lendingDeposit: bigint;
    totalDeposited: bigint;
}) {
    const isConfigured = strategy.pool !== '0x0000000000000000000000000000000000000000';
    if (!isConfigured) return null;

    const isActive = strategy.investedAmount > 0n;
    const investPct = Number(strategy.investRatioBps) / 100;

    // Lender's pro-rata share of deployed capital and accruing yield
    const userShare = totalDeposited > 0n && lendingDeposit > 0n
        ? (strategy.investedAmount * lendingDeposit) / totalDeposited
        : 0n;
    const userPendingShare = totalDeposited > 0n && lendingDeposit > 0n
        ? (strategy.pendingStrategyYield * lendingDeposit) / totalDeposited
        : 0n;

    return (
        <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 backdrop-blur-xl p-5 flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-purple-400 animate-pulse' : 'bg-slate-500'}`} />
                    <h3 className="text-sm font-semibold text-white">Intelligent Yield Strategy</h3>
                </div>
                <span className={cn(
                    'text-xs font-semibold px-2.5 py-1 rounded-lg border',
                    isActive
                        ? 'border-purple-500/30 bg-purple-500/10 text-purple-400'
                        : 'border-white/10 bg-white/5 text-slate-400'
                )}>
                    {isActive ? 'ACTIVE' : 'IDLE'}
                </span>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-white/5 bg-black/30 p-3">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Pool Deployed</p>
                    <p className="text-base font-semibold text-purple-400 mt-1">{fmt6(strategy.investedAmount)}</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">mUSDC</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-black/30 p-3">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Yield Accruing</p>
                    <p className="text-base font-semibold text-amber-400 mt-1">{fmt6(strategy.pendingStrategyYield, 6)}</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">mUSDC pending</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-black/30 p-3">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Total Earned</p>
                    <p className="text-base font-semibold text-emerald-400 mt-1">{fmt6(strategy.totalStrategyYieldEarned, 6)}</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">mUSDC lifetime</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-black/30 p-3">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Your Share</p>
                    <p className="text-base font-semibold text-cyan-400 mt-1">{fmt6(userShare)}</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">mUSDC deployed</p>
                </div>
            </div>

            {/* Description */}
            <p className="text-[11px] text-slate-500 leading-relaxed">
                {investPct}% of idle pool capital is automatically deployed to a yield strategy.
                Strategy yield is distributed directly into your pending harvest —
                {' '}<span className="text-white/60">claim it alongside your base borrower-interest yield above.</span>
                {userPendingShare > 0n && (
                    <span className="text-amber-400 font-medium"> ~{fmt6(userPendingShare, 6)} mUSDC is accruing for you right now.</span>
                )}
                {' '}When utilization rises, funds are automatically pulled back so borrows and your withdrawals are never blocked.
            </p>
        </div>
    );
}


// ── Unified lending activity table ───────────────────────────────────────

type WdTarget = 'lending' | 'pas' | null;
type WdPhase = 'idle' | 'confirming' | 'withdrawing' | 'success';
type HvPhase = 'idle' | 'harvesting' | 'success';

const EVENT_META: Record<LendHistoryEntry['type'], { label: string; color: string }> = {
    deposit: { label: 'Deposit', color: 'text-indigo-300' },
    withdraw: { label: 'Withdrawn', color: 'text-slate-400' },
    yield: { label: 'Yield Claimed', color: 'text-amber-300' },
};

function UnifiedLendingActivity({
    lendingDeposit, lendingYield,
    pasDeposit, pasYield,
    history, historyLoading,
    strategy, totalDeposited: poolTotalDeposited,
    onRefresh, onBusy,
}: {
    lendingDeposit: bigint; lendingYield: bigint;
    pasDeposit: bigint; pasYield: bigint;
    history: LendHistoryEntry[]; historyLoading: boolean;
    strategy: StrategySnapshot; totalDeposited: bigint;
    onRefresh: () => void; onBusy: (v: boolean) => void;
}) {
    const { address } = useAccount();
    const [page, setPage] = useState(1);
    const ITEMS = 8;

    const [wdTarget, setWdTarget] = useState<WdTarget>(null);
    const [wdInput, setWdInput] = useState('');
    const [wdPhase, setWdPhase] = useState<WdPhase>('idle');
    const [hvTarget, setHvTarget] = useState<WdTarget>(null);
    const [hvPhase, setHvPhase] = useState<HvPhase>('idle');

    const { writeContract: writWd, data: wdHash, isError: wdErr } = useWriteContract();
    const { isSuccess: wdOk } = useWaitForTransactionReceipt({ hash: wdHash });
    const { writeContract: writHv, data: hvHash, isError: hvErr } = useWriteContract();
    const { isSuccess: hvOk } = useWaitForTransactionReceipt({ hash: hvHash });

    useEffect(() => {
        if (!wdOk) return;
        setWdPhase('success');
        const t = setTimeout(() => { onRefresh(); setWdPhase('idle'); setWdTarget(null); setWdInput(''); onBusy(false); }, 1500);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wdOk]);

    useEffect(() => {
        if (!hvOk) return;
        setHvPhase('success');
        const t = setTimeout(() => { onRefresh(); setHvPhase('idle'); setHvTarget(null); onBusy(false); }, 1500);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hvOk]);

    useEffect(() => { if (wdErr && wdPhase === 'withdrawing') { setWdPhase('idle'); onBusy(false); } }, [wdErr, wdPhase]);
    useEffect(() => { if (hvErr && hvPhase === 'harvesting') { setHvPhase('idle'); setHvTarget(null); onBusy(false); } }, [hvErr, hvPhase]);

    const openWithdraw = (target: 'lending' | 'pas') => {
        if (wdPhase !== 'idle') return;
        onBusy(true);
        setWdTarget(target); setWdInput(''); setWdPhase('confirming');
    };
    const cancelWithdraw = () => { onBusy(false); setWdTarget(null); setWdInput(''); setWdPhase('idle'); };
    const confirmWithdraw = () => {
        if (!wdTarget) return;
        const atoms = parseUsdcInput(wdInput);
        if (!atoms || atoms === 0n) return;
        const maxAmt = wdTarget === 'lending' ? lendingDeposit : pasDeposit;
        if (atoms > maxAmt) return;
        setWdPhase('withdrawing');
        const addr = wdTarget === 'lending' ? config.lending : config.pasMarket;
        const abi = wdTarget === 'lending' ? ABIS.KREDIO_LENDING : ABIS.KREDIO_PAS_MARKET;
        writWd({ address: addr, abi, functionName: 'withdraw', args: [atoms] });
    };
    const doHarvest = (target: 'lending' | 'pas') => {
        if (!address || hvPhase !== 'idle') return;
        onBusy(true);
        setHvTarget(target); setHvPhase('harvesting');
        const addr = target === 'lending' ? config.lending : config.pasMarket;
        const abi = target === 'lending' ? ABIS.KREDIO_LENDING : ABIS.KREDIO_PAS_MARKET;
        writHv({ address: addr, abi, functionName: 'pendingYieldAndHarvest', args: [address] });
    };

    const totalDeposited = history.filter(e => e.type === 'deposit').reduce((s, e) => s + e.amount, 0n);
    const totalYieldClaimed = history.filter(e => e.type === 'yield').reduce((s, e) => s + e.amount, 0n);
    const activeTotal = lendingDeposit + pasDeposit;   // both in mUSDC 6-dec
    const pendingTotal = lendingYield + pasYield;
    const hasLending = lendingDeposit > 0n;
    const hasPas = pasDeposit > 0n;
    const totalPages = Math.max(1, Math.ceil(history.length / ITEMS));
    const paged = history.slice((page - 1) * ITEMS, page * ITEMS);

    const renderExpand = (target: 'lending' | 'pas') => {
        const deposit = target === 'lending' ? lendingDeposit : pasDeposit;
        const maxVal = (Number(deposit) / 1e6).toFixed(2);
        return (
            <tr className="bg-[#05080F]">
                <td colSpan={7} className="px-5 py-4 border-b border-white/5">
                    {wdPhase === 'confirming' && (
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
                            <div className="flex-1 space-y-2">
                                <label className="text-xs text-slate-400 uppercase tracking-wider">Amount to withdraw</label>
                                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 focus-within:border-white/20 transition-colors">
                                    <input
                                        type="number" min="0" step="any"
                                        placeholder="0.00"
                                        value={wdInput}
                                        onChange={e => setWdInput(e.target.value)}
                                        className="flex-1 bg-transparent text-base font-light text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        autoFocus
                                    />
                                    <button onClick={() => setWdInput(maxVal)}
                                        className="text-xs text-slate-400 hover:text-white transition-colors mr-1">Max</button>
                                    <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2.5 py-1">mUSDC</span>
                                </div>
                                <p className="text-xs text-slate-600 px-1">Available: {maxVal} mUSDC</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 sm:pb-[26px]">
                                <button onClick={confirmWithdraw}
                                    disabled={!wdInput || Number(wdInput) <= 0}
                                    className="px-4 py-2.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-white disabled:opacity-40 transition-colors">
                                    Confirm
                                </button>
                                <button onClick={cancelWithdraw}
                                    className="px-4 py-2.5 rounded-xl text-xs font-medium border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                    {wdPhase === 'withdrawing' && (
                        <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
                            <Spinner small /> Submitting to network…
                        </div>
                    )}
                    {wdPhase === 'success' && (
                        <div className="flex items-center gap-2 text-emerald-400 text-xs py-1">
                            <Check /> Withdrawal confirmed
                        </div>
                    )}
                </td>
            </tr>
        );
    };

    const renderActiveRow = (target: 'lending' | 'pas', market: string, deposit: bigint, yieldAmt: bigint) => {
        const isWdThis = wdTarget === target;
        const isHvThis = hvTarget === target;
        return (
            <>
                <tr key={`active-${target}`} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                    <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                            <span className="text-sm font-medium text-emerald-400">Active</span>
                        </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-300">{market}</td>
                    <td className="px-5 py-4 text-right text-sm font-medium text-white">{fmt6(deposit)}</td>
                    <td className="px-5 py-4 text-right text-sm hidden sm:table-cell">
                        <span className={yieldAmt > 0n ? 'text-amber-400' : 'text-slate-600'}>
                            {fmt6(yieldAmt, 6)}
                        </span>
                    </td>
                    <td className="px-5 py-4 text-right text-slate-700 hidden md:table-cell">—</td>
                    <td className="px-5 py-4 text-right text-slate-700 hidden md:table-cell">—</td>
                    <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                            {isHvThis && hvPhase !== 'idle' ? (
                                <span className={cn('text-xs flex items-center gap-1.5 px-3 py-1.5',
                                    hvPhase === 'success' ? 'text-emerald-400' : 'text-slate-400')}>
                                    {hvPhase === 'harvesting' ? <><Spinner small /><span>Harvesting…</span></> : <><Check /><span>Claimed</span></>}
                                </span>
                            ) : (
                                <button onClick={() => doHarvest(target)}
                                    disabled={yieldAmt === 0n || hvPhase !== 'idle'}
                                    title={yieldAmt === 0n ? 'No yield pending yet' : 'Claim pending yield'}
                                    className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-amber-400/80 hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                                    Harvest
                                </button>
                            )}
                            {!isWdThis && (
                                <button onClick={() => openWithdraw(target)}
                                    disabled={wdPhase !== 'idle'}
                                    className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white disabled:opacity-30 transition-colors">
                                    Withdraw
                                </button>
                            )}
                        </div>
                    </td>
                </tr>
                {isWdThis && wdPhase !== 'idle' && renderExpand(target)}
            </>
        );
    };

    const hasAnything = hasLending || hasPas || history.length > 0;

    if (!hasAnything && !historyLoading) {
        return (
            <div className="rounded-2xl border border-white/10 bg-transparent px-6 py-10 text-center flex flex-col justify-center items-center">
                <p className="text-slate-500 text-sm mb-5">No supply positions or activity yet.</p>
                <Link href="/lend/usdc" className="px-6 py-2.5 text-sm font-bold border border-white/10 bg-transparent hover:bg-white/5 text-slate-300 hover:text-white transition-colors">
                    Start Supplying →
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Intelligent Yield Strategy panel — only visible when lender has USDC deposits */}
            {lendingDeposit > 0n && (
                <IntelligentYieldPanel
                    strategy={strategy}
                    lendingDeposit={lendingDeposit}
                    totalDeposited={poolTotalDeposited}
                />
            )}

            {/* Summary strip */}
            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5">
                <div className="grid grid-cols-3 divide-x divide-white/5">
                    <div className="pr-5">
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Active Deposits</p>
                        <p className="text-xl font-semibold text-white mt-1.5">{fmt6(activeTotal)}
                            <span className="text-sm font-normal text-slate-500 ml-1.5">mUSDC</span>
                        </p>
                        {pendingTotal > 0n && <p className="text-xs text-amber-400 mt-1">+{fmt6(pendingTotal, 6)} yield pending</p>}
                    </div>
                    <div className="px-5">
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Total Deposited</p>
                        <p className="text-xl font-semibold text-white mt-1.5">{fmt6(totalDeposited)}
                            <span className="text-sm font-normal text-slate-500 ml-1.5">mUSDC</span>
                        </p>
                    </div>
                    <div className="pl-5">
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Yield Claimed</p>
                        <p className="text-xl font-semibold text-amber-400 mt-1.5">{fmt6(totalYieldClaimed, 6)}
                            <span className="text-sm font-normal text-slate-500 ml-1.5">mUSDC</span>
                        </p>
                        {pendingTotal > 0n && <p className="text-xs text-amber-600 mt-1">{fmt6(pendingTotal, 6)} claimable now</p>}
                    </div>
                </div>
            </div>

            {/* Single unified table */}
            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Type</th>
                            <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Market</th>
                            <th className="text-right px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Amount (mUSDC)</th>
                            <th className="text-right px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 hidden sm:table-cell">Yield (mUSDC)</th>
                            <th className="text-right px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 hidden md:table-cell">Block</th>
                            <th className="text-right px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 hidden md:table-cell">Tx</th>
                            <th className="text-right px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hasLending && renderActiveRow('lending', 'USDC Market', lendingDeposit, lendingYield)}
                        {hasPas && renderActiveRow('pas', 'PAS Market', pasDeposit, pasYield)}

                        {/* Separator between live positions and history */}
                        {(hasLending || hasPas) && history.length > 0 && (
                            <tr>
                                <td colSpan={7} className="px-5 pt-5 pb-2 border-t border-white/5">
                                    <span className="text-xs text-slate-600 uppercase tracking-wider">On-Chain History</span>
                                </td>
                            </tr>
                        )}

                        {/* History rows */}
                        {historyLoading ? (
                            <tr>
                                <td colSpan={7} className="px-5 py-10 text-center">
                                    <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                                        <Spinner small /> Loading history…
                                    </div>
                                </td>
                            </tr>
                        ) : paged.map((e, i) => {
                            const meta = EVENT_META[e.type];
                            return (
                                <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                    <td className={`px-5 py-4 font-medium text-sm ${meta.color}`}>{meta.label}</td>
                                    <td className="px-5 py-4 text-sm text-slate-400">{e.market}</td>
                                    <td className="px-5 py-4 text-right text-sm font-medium text-slate-200">{fmt6(e.amount, 6)}</td>
                                    <td className="px-5 py-4 text-right text-slate-700 hidden sm:table-cell">—</td>
                                    <td className="px-5 py-4 text-right text-sm text-slate-500 hidden md:table-cell">{e.blockNumber.toString()}</td>
                                    <td className="px-5 py-4 text-right hidden md:table-cell">
                                        {e.txHash ? (
                                            <a href={`https://blockscout-testnet.polkadot.io/tx/${e.txHash}`} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                                                {e.txHash.slice(0, 8)}…
                                            </a>
                                        ) : '—'}
                                    </td>
                                    <td className="px-5 py-4 text-right text-slate-700">—</td>
                                </tr>
                            );
                        })}

                        {!historyLoading && history.length === 0 && !hasLending && !hasPas && (
                            <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-slate-500 text-xs">
                                    No on-chain lending activity found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-white/5 px-4 py-3">
                        <span className="text-xs text-slate-500">Page {page} / {totalPages}</span>
                        <div className="flex gap-2">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                                className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs font-semibold text-white disabled:opacity-30 transition-colors">Prev</button>
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                                className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs font-semibold text-white disabled:opacity-30 transition-colors">Next</button>
                        </div>
                    </div>
                )}
            </div>

            <p className="text-xs text-slate-500 px-1">
                Yield accrues from borrower interest and the intelligent yield strategy. Harvest claims all pending yield — also auto-claimed on every deposit/withdraw. Withdraw supports partial amounts.
            </p>
        </div>
    );
}


// ── Rich Analytics Row ────────────────────────────────────────────────────

function AnalyticsRow({
    scoreValue, collateralRatioBps, interestRateBps,
    lending, pasMarket,
    portfolio
}: {
    scoreValue: bigint; collateralRatioBps: number; interestRateBps: number;
    lending: any; pasMarket: any;
    portfolio: any;
}) {
    const score = Number(scoreValue);
    const scorePct = Math.min(score / 100, 1) * 100;

    // Identity Donut
    const scoreSegments = [
        { label: 'Score', value: score, colorClass: score >= 65 ? 'stroke-cyan-400' : score >= 50 ? 'stroke-emerald-400' : score >= 30 ? 'stroke-amber-400' : score > 0 ? 'stroke-rose-400' : 'stroke-slate-500' },
        { label: 'empty', value: 100 - score, colorClass: 'stroke-white/5' }
    ];
    const maxLTV = collateralRatioBps > 0 ? `${((10000 / collateralRatioBps) * 100).toFixed(0)}%` : '—';

    // Global TVL Donut
    const totalPasTvl = pasMarket.totalDeposited;
    const totalUsdcTvl = lending.totalDeposited;
    const totalProtocolTvl = Number(totalPasTvl + totalUsdcTvl);
    const tvlSegments = totalProtocolTvl > 0 ? [
        { label: 'PAS Pool', value: Number(totalPasTvl) / totalProtocolTvl * 100, colorClass: 'stroke-slate-400' },
        { label: 'USDC Pool', value: Number(totalUsdcTvl) / totalProtocolTvl * 100, colorClass: 'stroke-slate-600' }
    ] : [];

    // User Deposits Donut
    const userPasDeposit = Number(portfolio.pasDeposit) + Number(portfolio.pasPendingYield);
    const userUsdcDeposit = Number(portfolio.lendingDeposit) + Number(portfolio.lendingPendingYield);
    const userTotalDeposit = userPasDeposit + userUsdcDeposit;
    const userDepositSegments = userTotalDeposit > 0 ? [
        { label: 'PAS Pool', value: userPasDeposit / userTotalDeposit * 100, colorClass: 'stroke-slate-400' },
        { label: 'USDC Pool', value: userUsdcDeposit / userTotalDeposit * 100, colorClass: 'stroke-slate-600' }
    ] : [];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* 1. Credit Identity */}
            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-6 flex flex-col items-center hover:border-white/20 transition-colors">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6 w-full text-center">
                    Identity Score
                </h3>
                <DonutChart
                    segments={scoreSegments}
                    size={160}
                    strokeWidth={12}
                    centerLabel="Reputation"
                    centerValue={score.toString()}
                    centerValueClass={score >= 65 ? 'text-cyan-400' : score >= 50 ? 'text-emerald-400' : score >= 30 ? 'text-amber-400' : score > 0 ? 'text-rose-400' : 'text-slate-400'}
                    centerSubValue={`Max LTV: ${maxLTV}`}
                />
            </div>

            {/* 2. Global Protocol TVL */}
            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-6 flex flex-col items-center hover:border-white/20 transition-colors">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6 w-full text-center">
                    Global Depository
                </h3>
                <DonutChart
                    segments={tvlSegments}
                    size={160}
                    strokeWidth={12}
                    centerLabel="Total Liquidity"
                    centerValue={totalProtocolTvl > 0 ? `$${(totalProtocolTvl / 1000).toFixed(1)}k` : "$0"}
                    centerSubValue="mUSDC Value"
                    emptyText="No Protocol TVL"
                />
            </div>

            {/* 3. User Deposits */}
            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-6 flex flex-col items-center hover:border-white/20 transition-colors">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6 w-full text-center">
                    Your Capital
                </h3>
                <DonutChart
                    segments={userDepositSegments}
                    size={160}
                    strokeWidth={12}
                    centerLabel="Total Supplied"
                    centerValue={userTotalDeposit > 0 ? `$${userTotalDeposit.toFixed(0)}` : "$0"}
                    centerSubValue="mUSDC Value"
                    emptyText="No active deposits"
                />
            </div>

        </div>
    );
}


// ── Main page ─────────────────────────────────────────────────────────────

export default function DashboardPage() {
    const { address, isConnected } = useAccount();
    const { lending, pasMarket, oracle, loading: globalLoading, error: globalError, refresh: refreshGlobal } = useGlobalProtocolData();
    const { score, refresh: refreshScore } = useUserScore();
    const portfolio = useUserPortfolio();
    const { history: lendHistory, loading: historyLoading, refresh: refreshHistory } = useLendingHistory();
    const { strategy, refresh: refreshStrategy } = useStrategyData();

    const [activeTab, setActiveTab] = useState<'positions' | 'activity'>('positions');
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
    const actionInFlightRef = useRef(false);
    const setActionFlight = useCallback((v: boolean) => { actionInFlightRef.current = v; }, []);

    const { data: ltvBpsRaw } = useReadContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'ltvBps' });
    const ltvBps = (ltvBpsRaw as bigint | undefined) ?? 6500n;

    const lastRefreshRef = useRef(Date.now());
    const [secondsAgo, setSecondsAgo] = useState(0);
    useEffect(() => { const id = setInterval(() => setSecondsAgo(Math.floor((Date.now() - lastRefreshRef.current) / 1000)), 1000); return () => clearInterval(id); }, []);

    // Full manual refresh (button). useGlobalProtocolData + useUserPortfolio already have
    // their own 30s timers so we only need to kick score + history here for the background tick.
    const handleRefresh = useCallback(() => {
        portfolio.refresh(); refreshGlobal(); refreshScore(); refreshHistory(); refreshStrategy();
        lastRefreshRef.current = Date.now(); setSecondsAgo(0);
    }, [portfolio, refreshGlobal, refreshScore, refreshHistory, refreshStrategy]);

    // Background tick: only refresh score + history (global + portfolio self-refresh).
    // Using a stable ref so the interval is created once and never recreated on re-renders.
    const refreshScoreRef = useRef(refreshScore);
    const refreshHistoryRef = useRef(refreshHistory);
    useEffect(() => { refreshScoreRef.current = refreshScore; }, [refreshScore]);
    useEffect(() => { refreshHistoryRef.current = refreshHistory; }, [refreshHistory]);
    useEffect(() => {
        if (!portfolio.loading && !globalLoading) setHasLoadedOnce(true);
    }, [portfolio.loading, globalLoading]);

    useEffect(() => {
        const id = setInterval(() => {
            if (!actionInFlightRef.current) {
                refreshScoreRef.current();
                refreshHistoryRef.current();
                lastRefreshRef.current = Date.now();
            }
        }, 30_000);
        return () => clearInterval(id);
    }, []); // runs once, stable

    const hasPasBorrow = portfolio.pasPosition[0] > 0n || portfolio.pasPosition[2] > 0n;
    const hasUsdcBorrow = portfolio.lendingPosition[0] > 0n || portfolio.lendingPosition[1] > 0n || portfolio.lendingCollateralWallet > 0n;
    const hasPasLend = portfolio.pasDeposit > 0n;
    const hasUsdcLend = portfolio.lendingDeposit > 0n;
    const hasAnyBorrow = hasPasBorrow || hasUsdcBorrow;
    const hasAnyLend = hasPasLend || hasUsdcLend;
    const hasAnything = hasAnyBorrow || hasAnyLend;
    const totalRepayments = portfolio.pasRepaymentCount + portfolio.lendingRepaymentCount;
    const totalLiquidations = portfolio.pasLiquidationCount + portfolio.lendingLiquidationCount;
    const combinedDeposited = portfolio.lendingTotalDepositedEver + portfolio.pasTotalDepositedEver;
    const earliestBlock =
        portfolio.lendingFirstSeenBlock > 0n && portfolio.pasFirstSeenBlock > 0n
            ? portfolio.lendingFirstSeenBlock < portfolio.pasFirstSeenBlock ? portfolio.lendingFirstSeenBlock : portfolio.pasFirstSeenBlock
            : portfolio.lendingFirstSeenBlock > 0n ? portfolio.lendingFirstSeenBlock
                : portfolio.pasFirstSeenBlock;

    const pasSuppliedUsdc = oracle.price8 > 0n ? (portfolio.pasDeposit * oracle.price8) / BigInt('100000000000000000000') : 0n;
    const totalSuppliedUsdc = portfolio.lendingDeposit + pasSuppliedUsdc;
    const totalBorrowedUsdc = portfolio.lendingPosition[3] + portfolio.pasPosition[4];

    return (
        <PageShell title="Dashboard" subtitle="Active positions and credit profile.">

            {/* ── Wallet positions ── */}
            {!isConnected && (
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl px-6 py-12 flex flex-col items-center gap-4 text-center mt-8">
                    <p className="text-white text-base font-bold">Connect your wallet to view your portfolio and credit profile</p>
                    <p className="text-slate-500 text-sm">Use the Connect Wallet button in the header</p>
                </div>
            )}

            {isConnected && (
                <div className="mt-8 flex flex-col gap-10 w-full mb-12">
                    {/* Header Strip with Refresh */}
                    <div className="flex justify-end pb-2">
                        <div className="flex items-center gap-3 shrink-0">
                            <span className="text-xs text-slate-500 font-medium">{secondsAgo}s ago</span>
                            <button onClick={handleRefresh} disabled={portfolio.loading || globalLoading} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all duration-300 disabled:opacity-50">
                                <span className={cn((portfolio.loading || globalLoading) ? 'animate-spin' : '')}>↻</span> Refresh
                            </button>
                        </div>
                    </div>

                    {/* loading state — only shown before first successful data load */}
                    {!hasLoadedOnce && (portfolio.loading || globalLoading) && !hasAnything && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
                            {[1, 2, 3].map(i => <div key={i} className="rounded-xl border border-white/10 bg-transparent h-[320px]" />)}
                        </div>
                    )}

                    {/* Main content — stays mounted after first load so transaction state is never lost */}
                    {(hasLoadedOnce || (!portfolio.loading && !globalLoading)) && (
                        <div className="flex flex-col gap-10">

                            {/* Row 2: Analytics 3-column grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                                <CreditScorePanel
                                    scoreValue={score.score}
                                    tier={score.tier}
                                    collateralRatioBps={score.collateralRatioBps}
                                    interestRateBps={score.interestRateBps}
                                    repaymentCount={Number(portfolio.pasRepaymentCount + portfolio.lendingRepaymentCount)}
                                    liquidationCount={Number(portfolio.pasLiquidationCount + portfolio.lendingLiquidationCount)}
                                    totalDepositedEver={portfolio.pasTotalDepositedEver + portfolio.lendingTotalDepositedEver}
                                    firstSeenBlock={portfolio.pasFirstSeenBlock > 0n && portfolio.lendingFirstSeenBlock > 0n ?
                                        (portfolio.pasFirstSeenBlock < portfolio.lendingFirstSeenBlock ? portfolio.pasFirstSeenBlock : portfolio.lendingFirstSeenBlock)
                                        : (portfolio.pasFirstSeenBlock > 0n ? portfolio.pasFirstSeenBlock : portfolio.lendingFirstSeenBlock)}
                                    currentBlock={score.blockNumber}
                                />

                                <PoolDonutChart
                                    label="PAS Market"
                                    totalDeposited={pasMarket.totalDeposited}
                                    userDeposited={portfolio.pasDeposit}
                                    totalBorrowed={pasMarket.totalBorrowed}
                                    utilizationBps={pasMarket.utilizationBps}
                                    accent="#94A3B8"
                                    contractAddr={config.pasMarket}
                                    abi={ABIS.KREDIO_PAS_MARKET}
                                    onRefresh={handleRefresh}
                                />
                                <PoolDonutChart
                                    label="USDC Market"
                                    totalDeposited={lending.totalDeposited}
                                    userDeposited={portfolio.lendingDeposit}
                                    totalBorrowed={lending.totalBorrowed}
                                    utilizationBps={lending.utilizationBps}
                                    accent="#64748B"
                                    contractAddr={config.lending}
                                    abi={ABIS.KREDIO_LENDING}
                                    onRefresh={handleRefresh}
                                />
                            </div>

                            {/* ── Switch Tabs ── */}
                            <div className="rounded-xl border border-white/10 bg-black/30 p-1 w-fit flex gap-1">
                                <button onClick={() => setActiveTab('positions')} className={cn("px-5 py-2 rounded-lg text-sm font-medium transition-colors", activeTab === 'positions' ? "bg-white text-black" : "text-slate-300 hover:bg-white/10 hover:text-white")}>Positions</button>
                                <button onClick={() => setActiveTab('activity')} className={cn("px-5 py-2 rounded-lg text-sm font-medium transition-colors", activeTab === 'activity' ? "bg-white text-black" : "text-slate-300 hover:bg-white/10 hover:text-white")}>Activity</button>
                            </div>

                            {activeTab === 'positions' && (
                                <div className="flex flex-col gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">

                                    {/* Borrows — full width */}
                                    <div className="w-full flex flex-col gap-4">
                                        <h2 className="text-base font-semibold text-white px-1 flex items-center gap-3">
                                            Borrow Positions <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                        </h2>
                                        {!hasAnyBorrow ? (
                                            <div className="border border-white/10 bg-transparent px-6 py-12 text-center flex flex-col justify-center items-center">
                                                <p className="text-slate-500 text-sm mb-5">You have no open borrowing positions.</p>
                                                <Link href="/borrow/usdc" className="px-6 py-2.5 rounded-none text-sm font-bold border border-white/10 bg-transparent hover:bg-white/5 text-slate-300 hover:text-white transition-colors">Open a Borrow Position</Link>
                                            </div>
                                        ) : (
                                            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl overflow-x-auto shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                                                <table className="w-full text-left min-w-[800px]">
                                                    <thead>
                                                        <tr className="border-b border-white/10 bg-white/[0.02]">
                                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Market</th>
                                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Collateral</th>
                                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Principal</th>
                                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Accrued Interest</th>
                                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Health</th>
                                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-right">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-white/5 text-sm">
                                                        {hasPasBorrow && (
                                                            <PASBorrowRow
                                                                collateralWei={portfolio.pasPosition[0]}
                                                                debtAtoms={portfolio.pasPosition[2]}
                                                                accruedAtoms={portfolio.pasPosition[3]}
                                                                totalOwedAtoms={portfolio.pasPosition[4]}
                                                                healthRatio={portfolio.pasHealthRatio}
                                                                oraclePrice8={oracle.price8}
                                                                ltvBps={ltvBps}
                                                                onRefresh={handleRefresh}
                                                                onBusy={setActionFlight}
                                                            />
                                                        )}
                                                        {hasUsdcBorrow && (
                                                            <USDCBorrowRow
                                                                collateralAtoms={portfolio.lendingPosition[0]}
                                                                debtAtoms={portfolio.lendingPosition[1]}
                                                                accruedAtoms={portfolio.lendingPosition[2]}
                                                                totalOwedAtoms={portfolio.lendingPosition[3]}
                                                                healthRatio={portfolio.lendingHealthRatio}
                                                                walletCollateralAtoms={portfolio.lendingCollateralWallet}
                                                                onRefresh={handleRefresh}
                                                                onBusy={setActionFlight}
                                                            />
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                        <p className="text-xs text-slate-500 px-1 mt-1">To manage your supply positions, switch to the <button onClick={() => setActiveTab('activity')} className="underline text-slate-400 hover:text-slate-300 transition-colors">Activity</button> tab.</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'activity' && (
                                <div className="flex flex-col gap-6 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h2 className="text-base font-semibold text-white px-1 flex items-center gap-3">
                                        Supply Positions &amp; Activity <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                    </h2>
                                    <UnifiedLendingActivity
                                        lendingDeposit={portfolio.lendingDeposit}
                                        lendingYield={portfolio.lendingPendingYield}
                                        pasDeposit={portfolio.pasDeposit}
                                        pasYield={portfolio.pasPendingYield}
                                        history={lendHistory}
                                        historyLoading={historyLoading}
                                        strategy={strategy}
                                        totalDeposited={lending.totalDeposited}
                                        onBusy={setActionFlight}
                                        onRefresh={handleRefresh}
                                    />
                                </div>
                            )}

                        </div>
                    )}
                </div>
            )}

            {globalError && <StateNotice tone="error" message={globalError} />}
        </PageShell>
    );
}
