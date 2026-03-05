"use client";

import Link from 'next/link';
import { PageShell, Panel } from '../components/modules/ProtocolUI';
import config from '../lib/addresses';
import { useAccess } from '../hooks/useAccess';

export default function Home() {
    const { isAdmin } = useAccess();

    return (
        <PageShell title="Kredio Credit Protocol" subtitle="Score-driven credit markets on Polkadot Hub with mUSDC liquidity and PAS collateral borrowing.">
            <section className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl border border-white/15 bg-black/30 p-6 backdrop-blur-xl">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Protocol Overview</p>
                    <h2 className="text-2xl md:text-3xl font-semibold text-white mt-2 leading-tight">
                        Decentralized lending, dynamic risk scoring, and PAS-backed credit in one stack.
                    </h2>
                    <p className="text-sm text-slate-300 mt-3 max-w-2xl">
                        Lenders deposit mUSDC for yield, borrowers unlock credit through score-aware terms, and PAS collateral markets adjust risk using a live oracle.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5">
                        <Link href="/dashboard" className="px-3 py-2 rounded-xl border border-white/20 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">Open Dashboard</Link>
                        <Link href="/borrow/usdc" className="px-3 py-2 rounded-xl border border-white/20 text-sm text-white hover:bg-white/10 transition-colors">Start Borrow Flow</Link>
                        <Link href="/lend/usdc" className="px-3 py-2 rounded-xl border border-white/20 text-sm text-white hover:bg-white/10 transition-colors">Start Lend Flow</Link>
                    </div>
                </div>
            </section>

            <Panel title="Core Contracts" subtitle="Frontend contract wiring and responsibilities.">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 text-xs">
                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                        <p className="text-white font-medium">KredioLending</p>
                        <p className="text-slate-400 mt-1">mUSDC deposit/borrow market with score-based ratios and rates.</p>
                        <p className="text-slate-500 mt-2 break-all">{config.lending}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                        <p className="text-white font-medium">KredioPASMarket</p>
                        <p className="text-slate-400 mt-1">Borrow mUSDC against PAS collateral and oracle valuation.</p>
                        <p className="text-slate-500 mt-2 break-all">{config.pasMarket}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                        <p className="text-white font-medium">MockPASOracle</p>
                        <p className="text-slate-400 mt-1">Feeds PAS price and crash simulation for risk testing.</p>
                        <p className="text-slate-500 mt-2 break-all">{config.oracle}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                        <p className="text-white font-medium">GovernanceCache</p>
                        <p className="text-slate-400 mt-1">Caches vote/conviction data for score computation.</p>
                        <p className="text-slate-500 mt-2 break-all">{config.governanceCache}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                        <p className="text-white font-medium">MockUSDC (mUSDC)</p>
                        <p className="text-slate-400 mt-1">Protocol quote asset used by lending and PAS markets.</p>
                        <p className="text-slate-500 mt-2 break-all">{config.mUSDC}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                        <p className="text-white font-medium">KreditAgent</p>
                        <p className="text-slate-400 mt-1">Computes score, tier, collateral ratio, and interest curves.</p>
                        <p className="text-slate-500 mt-2 break-all">{config.kreditAgent}</p>
                    </div>
                </div>
            </Panel>

            <Panel title="How It Works" subtitle="Simplified lifecycle across scoring, borrowing, and settlement.">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                        <p className="text-white font-medium">1. Fund</p>
                        <p className="text-slate-400 mt-1">Mint mUSDC and supply liquidity to lending pools.</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                        <p className="text-white font-medium">2. Score</p>
                        <p className="text-slate-400 mt-1">KreditAgent + GovernanceCache derive borrower tier and terms.</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                        <p className="text-white font-medium">3. Borrow</p>
                        <p className="text-slate-400 mt-1">Borrow using mUSDC or PAS collateral with health tracking.</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                        <p className="text-white font-medium">4. Repay / Liquidate</p>
                        <p className="text-slate-400 mt-1">Repay to close position, or admin executes liquidation controls.</p>
                    </div>
                </div>
            </Panel>

            <Panel title="Start" subtitle="Use the top navbar for global navigation; keep only core quick entry points here.">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Link href="/dashboard" className="px-3 py-2 rounded-xl border border-white/20 text-sm text-white hover:bg-white/10 transition-colors">Dashboard</Link>
                    <Link href="/borrow/usdc" className="px-3 py-2 rounded-xl border border-white/20 text-sm text-white hover:bg-white/10 transition-colors">Borrow</Link>
                    <Link href="/lend/usdc" className="px-3 py-2 rounded-xl border border-white/20 text-sm text-white hover:bg-white/10 transition-colors">Lend</Link>
                    {isAdmin ? <Link href="/admin" className="px-3 py-2 rounded-xl border border-white/20 text-sm text-white hover:bg-white/10 transition-colors">Admin</Link> : null}
                </div>
            </Panel>
        </PageShell>
    );
}
