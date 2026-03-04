'use client';
import * as React from 'react';
import { useCompute } from '../../hooks/useCompute';
import { motion } from 'framer-motion';
import config from '../../lib/addresses';

// Clipboard copy helper with "Copied!" tooltip
function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = React.useState(false);
    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    return (
        <button onClick={handleCopy} className="relative ml-2 text-muted hover:text-foreground transition-colors" title="Copy">
            {copied ? (
                <span className="text-green-400 text-[10px] font-medium">Copied!</span>
            ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            )}
        </button>
    );
}

type ActivityEvent = {
    ts: number;
    action: string;
    detail: string;
};

export function ComputeDashboard() {
    const {
        refTime, proofSize, codeHash, bestStrategyIndex,
        isLoading, error, isConnected, isDeployed, fetchSystemInfo, findBestStrategy,
    } = useCompute();

    const [aprInput, setAprInput] = React.useState('100, 500, 200, 350');
    const [autoRefresh, setAutoRefresh] = React.useState(false);
    const [activityLog, setActivityLog] = React.useState<ActivityEvent[]>([]);

    const pushEvent = (action: string, detail: string) => {
        setActivityLog(prev => [{ ts: Date.now(), action, detail }, ...prev].slice(0, 20));
    };

    React.useEffect(() => {
        if (isDeployed) {
            fetchSystemInfo();
            pushEvent('init', 'Fetched PVM system info');
        }
    }, [isDeployed, fetchSystemInfo]);

    // Auto-refresh system info every 30 seconds
    React.useEffect(() => {
        if (!autoRefresh || !isDeployed) return;
        const interval = setInterval(() => {
            fetchSystemInfo();
            pushEvent('refresh', 'Auto-refresh system info');
        }, 30000);
        return () => clearInterval(interval);
    }, [autoRefresh, isDeployed, fetchSystemInfo]);

    const handleFindBest = async () => {
        const aprs = aprInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
        if (aprs.length === 0) return;
        pushEvent('getBestStrategy', `Input APRs: [${aprs.join(', ')}]`);
        await findBestStrategy(aprs);
        pushEvent('strategyResult', `Best index found via ${isDeployed ? 'PVM cross-VM' : 'client fallback'}`);
    };

    const aprsArray = aprInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-foreground">TesseractCompute</h2>
                <span className="px-2 py-0.5 text-xs font-bold rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    PVM
                </span>
            </div>
            <p className="text-sm text-muted">
                PolkaVM contract compiled with resolc. Called by TesseractVault via cross-VM dispatch.
            </p>

            {/* Contract Info */}
            <div className="rounded-2xl border border-glass-border bg-surface/50 backdrop-blur-lg p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Contract Address</h3>
                <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-muted bg-black/30 rounded px-2 py-1 flex-1 truncate">
                        {config.compute}
                    </code>
                    <CopyButton text={config.compute} />
                    {config.explorer && (
                        <a
                            href={`${config.explorer}/account/${config.compute}`}
                            target="_blank" rel="noopener noreferrer"
                            className="text-xs text-brand-subtle hover:underline"
                        >
                            Subscan ↗
                        </a>
                    )}
                </div>
                {!isDeployed && (
                    <p className="text-xs text-yellow-400 mt-2">
                        ⚠ Compute contract not deployed yet. Deploy via resolc + contracts.polkadot.io
                    </p>
                )}
            </div>

            {/* Live Stats */}
            <div className="rounded-2xl border border-glass-border bg-surface/50 backdrop-blur-lg p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground">Live PVM Stats</h3>
                    <label className="flex items-center gap-2 text-xs text-muted">
                        <input
                            type="checkbox" checked={autoRefresh}
                            onChange={e => setAutoRefresh(e.target.checked)}
                            className="rounded"
                        />
                        Auto-refresh 30s
                    </label>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <p className="text-xs text-muted">refTime Remaining</p>
                        <p className="text-lg font-mono text-foreground">
                            {refTime > 0n ? `${(Number(refTime) / 1e9).toFixed(1)}B` : '—'}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-muted">Proof Size</p>
                        <p className="text-lg font-mono text-foreground">
                            {proofSize > 0n ? `${(Number(proofSize) / 1024).toFixed(0)} KB` : '—'}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-muted">Code Hash</p>
                        <div className="flex items-center">
                            <p className="text-sm font-mono text-foreground truncate">
                                {codeHash ? `${codeHash.slice(0, 10)}…` : '—'}
                            </p>
                            {codeHash && <CopyButton text={codeHash} />}
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        fetchSystemInfo();
                        pushEvent('refresh', 'Manual refresh');
                    }}
                    disabled={!isDeployed}
                    className="mt-3 text-xs text-brand-subtle hover:underline disabled:opacity-40"
                >
                    Refresh Now
                </button>
            </div>

            {/* Strategy Optimizer */}
            <div className="rounded-2xl border border-glass-border bg-surface/50 backdrop-blur-lg p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Strategy Optimizer</h3>
                <p className="text-xs text-muted mb-3">
                    Enter comma-separated APR values (basis points). getBestStrategy() finds the optimal route
                    {isDeployed ? ' via PVM Rust FFI.' : ' (client-side fallback).'}
                </p>
                <div className="flex gap-2">
                    <input
                        type="text" value={aprInput}
                        onChange={e => setAprInput(e.target.value)}
                        className="flex-1 bg-black/30 border border-glass-border rounded-xl px-3 py-2 text-sm text-foreground font-mono placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-brand-subtle"
                        placeholder="100, 500, 200, 350"
                    />
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleFindBest}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium disabled:opacity-50 transition-colors"
                    >
                        {isLoading ? 'Computing…' : 'Find Best'}
                    </motion.button>
                </div>

                {bestStrategyIndex !== null && (
                    <div className="mt-4 space-y-2">
                        <p className="text-sm text-foreground">
                            ✅ Best strategy: <span className="font-bold text-purple-400">Index {bestStrategyIndex}</span>
                            {' '}({aprsArray[bestStrategyIndex]} bps APR)
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            {aprsArray.map((apr, i) => (
                                <span
                                    key={i}
                                    className={`px-2 py-1 rounded text-xs font-mono ${i === bestStrategyIndex
                                        ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50 font-bold'
                                        : 'bg-black/20 text-muted border border-glass-border'
                                        }`}
                                >
                                    [{i}] {apr} bps
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Cross-VM Activity Log (live events) */}
            <div className="rounded-2xl border border-glass-border bg-surface/50 backdrop-blur-lg p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Cross-VM Activity</h3>
                {activityLog.length === 0 ? (
                    <p className="text-xs text-muted">No activity yet. Use the strategy optimizer or refresh stats.</p>
                ) : (
                    <div className="space-y-1.5 max-h-48 overflow-y-auto">
                        {activityLog.map((evt, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs">
                                <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${evt.action === 'getBestStrategy' ? 'bg-purple-400'
                                        : evt.action === 'strategyResult' ? 'bg-green-400'
                                            : evt.action === 'refresh' ? 'bg-blue-400'
                                                : 'bg-gray-400'
                                    }`} />
                                <span className="text-muted font-mono">
                                    {new Date(evt.ts).toLocaleTimeString()}
                                </span>
                                <span className="text-foreground/80 font-medium">{evt.action}</span>
                                <span className="text-muted truncate">{evt.detail}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Contract addresses with copy */}
            <div className="text-xs text-muted space-y-1 px-1">
                <div className="flex items-center justify-between">
                    <span>Vault Contract</span>
                    <div className="flex items-center">
                        <code className="font-mono">{config.vault.slice(0, 10)}…{config.vault.slice(-6)}</code>
                        <CopyButton text={config.vault} />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span>Swap Contract</span>
                    <div className="flex items-center">
                        <code className="font-mono">{config.swap.slice(0, 10)}…{config.swap.slice(-6)}</code>
                        <CopyButton text={config.swap} />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span>XCM Precompile</span>
                    <div className="flex items-center">
                        <code className="font-mono">{config.xcm.slice(0, 10)}…{config.xcm.slice(-6)}</code>
                        <CopyButton text={config.xcm} />
                    </div>
                </div>
            </div>

            {error && (
                <p className="text-sm text-red-400 bg-red-400/10 rounded-xl px-4 py-2">{error}</p>
            )}
        </div>
    );
}
