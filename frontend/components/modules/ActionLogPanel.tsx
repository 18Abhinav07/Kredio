'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActionLog } from '../providers/ActionLogProvider';
import type { ActionLogEntry } from '../../lib/action-log';

/* ── Explorer URL helper ──────────────────────────────────────────────────── */
function txExplorerUrl(txHash: string, chain?: 'hub' | 'people'): string {
    if (chain === 'people') {
        return `https://people-paseo.subscan.io/extrinsic/${txHash}`;
    }
    return `https://blockscout-testnet.polkadot.io/tx/${txHash}`;
}

/* ── Level colour tokens ──────────────────────────────────────────────────── */
const LEVEL: Record<string, { dot: string; border: string; bg: string; label: string }> = {
    info: { dot: 'bg-blue-400', border: 'border-blue-500/20', bg: 'bg-blue-500/5', label: 'text-blue-300' },
    success: { dot: 'bg-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/5', label: 'text-emerald-300' },
    warning: { dot: 'bg-amber-400', border: 'border-amber-500/20', bg: 'bg-amber-500/5', label: 'text-amber-300' },
    error: { dot: 'bg-rose-400', border: 'border-rose-500/20', bg: 'bg-rose-500/5', label: 'text-rose-300' },
};

const MARKET_TAG: Record<string, string> = { lending: 'USDC', pas: 'PAS', system: 'SYS' };

/* ── Icons ─────────────────────────────────────────────────────────────────── */
function ActivityIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    );
}
function ExternalLinkIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
        </svg>
    );
}

/* ── Single entry card ────────────────────────────────────────────────────── */
function EntryCard({ entry }: { entry: ActionLogEntry }) {
    const s = LEVEL[entry.level] ?? LEVEL.info;
    const time = new Date(entry.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
        <div className={`rounded-xl border ${s.border} ${s.bg} px-3 py-2.5 space-y-1.5`}>
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot} shrink-0 mt-px`} />
                    <p className={`text-xs font-semibold truncate ${s.label}`}>{entry.action}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                    {entry.market && (
                        <span className="text-[10px] text-slate-400 border border-white/10 rounded px-1.5 py-0.5 leading-none font-mono">
                            {MARKET_TAG[entry.market] ?? entry.market.toUpperCase()}
                        </span>
                    )}
                    <span className="text-[10px] text-slate-400 tabular-nums">{time}</span>
                </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed pl-3">{entry.detail}</p>
            {entry.txHash && (
                <div className="pl-3">
                    <a
                        href={txExplorerUrl(entry.txHash, entry.chain)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                    >
                        <span className="font-mono">{entry.txHash.slice(0, 8)}…{entry.txHash.slice(-6)}</span>
                        <ExternalLinkIcon className="w-2.5 h-2.5" />
                    </a>
                </div>
            )}
        </div>
    );
}

/* ── Main component ───────────────────────────────────────────────────────── */
export function ActionLogPanel() {
    const { entries, clearAll } = useActionLog();
    const [open, setOpen] = React.useState(false);

    return (
        <div className="fixed right-5 bottom-5 z-70 flex flex-col items-end gap-3">

            {/* Log panel — slides up from button */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="log-panel"
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="w-80 max-w-[92vw] rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
                            <div className="flex items-center gap-2">
                                <ActivityIcon className="w-3.5 h-3.5 text-indigo-400" />
                                <span className="text-sm font-semibold text-white">Activity</span>
                            </div>
                            <div className="flex items-center gap-3">
                                {entries.length > 0 && (
                                    <>
                                        <span className="text-xs text-slate-400">{entries.length} event{entries.length !== 1 ? 's' : ''}</span>
                                        <button
                                            onClick={clearAll}
                                            className="text-xs text-slate-400 hover:text-white transition-colors"
                                        >
                                            Clear all
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Entry list */}
                        <div className="max-h-105 overflow-y-auto p-3 space-y-2">
                            {entries.length === 0 ? (
                                <div className="py-10 text-center">
                                    <ActivityIcon className="w-6 h-6 text-slate-700 mx-auto mb-2.5" />
                                    <p className="text-xs text-slate-400">No activity recorded yet.</p>
                                    <p className="text-[11px] text-slate-500 mt-1">Lends, borrows, and repayments appear here.</p>
                                </div>
                            ) : (
                                entries.map(entry => <EntryCard key={entry.id} entry={entry} />)
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger — circle that expands to pill on hover */}
            <button
                onClick={() => setOpen(v => !v)}
                className="group relative flex items-center h-10 rounded-full border border-white/10 bg-black/70 backdrop-blur-xl cursor-pointer px-2.5 hover:px-4 transition-all duration-200 shadow-lg hover:border-white/20 hover:bg-black/80"
            >
                <ActivityIcon className="w-4 h-4 text-slate-300 shrink-0" />
                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-35 group-hover:opacity-100 group-hover:ml-2 transition-all duration-200 text-xs font-medium text-slate-300 whitespace-nowrap select-none">
                    {open ? 'Close' : entries.length > 0 ? `Activity · ${entries.length}` : 'Activity'}
                </span>
                {/* Unread dot when closed and there are entries */}
                {!open && entries.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 group-hover:hidden" />
                )}
            </button>
        </div>
    );
}

