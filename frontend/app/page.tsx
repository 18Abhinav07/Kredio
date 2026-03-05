"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import config from '../lib/addresses';
import { useAccess } from '../hooks/useAccess';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const viewFade = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

const FEATURES = [
    {
        label: 'Score-Aware Credit',
        desc: 'KreditAgent computes on-chain scores from governance participation and repayment history to unlock better rates and higher LTV.',
        accent: 'border-indigo-500/20 bg-indigo-500/5',
        dot: 'bg-indigo-400',
    },
    {
        label: 'Yield Markets',
        desc: 'Lend mUSDC to USDC or PAS-collateral pools and earn floating APY tied directly to real utilization.',
        accent: 'border-emerald-500/20 bg-emerald-500/5',
        dot: 'bg-emerald-400',
    },
    {
        label: 'PAS Collateral Borrow',
        desc: 'Deposit native PAS — or bridge from People Chain — as collateral and borrow mUSDC at score-adjusted rates.',
        accent: 'border-pink-500/20 bg-pink-500/5',
        dot: 'bg-pink-400',
    },
] as const;

const STEPS = [
    { n: '01', title: 'Fund', body: 'Mint or acquire mUSDC. Bridge PAS from People Chain via XCM if needed.' },
    { n: '02', title: 'Score', body: 'KreditAgent reads governance activity and repayment history to derive your credit tier.' },
    { n: '03', title: 'Borrow', body: 'Deposit collateral and borrow at LTV and rates dynamically adjusted to your score.' },
    { n: '04', title: 'Repay', body: 'Settle debt, withdraw collateral, and strengthen your on-chain credit standing over time.' },
] as const;

const CONTRACTS = [
    { name: 'KredioLending', desc: 'mUSDC deposit / borrow market', addr: config.lending },
    { name: 'KredioPASMarket', desc: 'PAS-collateral borrow market', addr: config.pasMarket },
    { name: 'MockPASOracle', desc: 'PAS price feed + crash simulation', addr: config.oracle },
    { name: 'GovernanceCache', desc: 'On-chain vote and conviction cache', addr: config.governanceCache },
    { name: 'MockUSDC', desc: 'Protocol quote asset', addr: config.mUSDC },
    { name: 'KreditAgent', desc: 'Score, tier, and rate computation', addr: config.kreditAgent },
] as const;

export default function Home() {
    const { isAdmin } = useAccess();

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 space-y-20">

            {/* ── Hero ─────────────────────────────────────────────────── */}
            <motion.section initial="hidden" animate="show" variants={stagger} className="pt-4">
                <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                    Polkadot Hub Testnet
                </motion.p>
                <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-white mt-3 leading-[1.15] max-w-3xl">
                    Score-driven credit markets on Polkadot Hub.
                </motion.h1>
                <motion.p variants={fadeUp} className="text-slate-400 mt-4 max-w-lg text-sm leading-relaxed">
                    Lend mUSDC for floating yield. Borrow against PAS collateral at rates scored on-chain by KreditAgent.
                </motion.p>
                <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5 mt-7">
                    <Link href="/dashboard"
                        className="px-4 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors">
                        Open Dashboard
                    </Link>
                    <Link href="/borrow/usdc"
                        className="px-4 py-2.5 rounded-xl border border-white/20 text-sm text-white hover:bg-white/10 transition-colors">
                        Borrow
                    </Link>
                    <Link href="/lend/usdc"
                        className="px-4 py-2.5 rounded-xl border border-white/20 text-sm text-white hover:bg-white/10 transition-colors">
                        Lend
                    </Link>
                    {isAdmin && (
                        <Link href="/admin"
                            className="px-4 py-2.5 rounded-xl border border-white/10 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                            Admin
                        </Link>
                    )}
                </motion.div>
            </motion.section>

            {/* ── Feature Cards ─────────────────────────────────────────── */}
            <motion.section
                initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                {FEATURES.map(f => (
                    <motion.div key={f.label} variants={viewFade}
                        className={`rounded-2xl border p-5 backdrop-blur-xl ${f.accent}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${f.dot} mb-3`} />
                        <p className="text-sm font-semibold text-white">{f.label}</p>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
                    </motion.div>
                ))}
            </motion.section>

            {/* ── How It Works ──────────────────────────────────────────── */}
            <motion.section
                initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
                variants={stagger}
            >
                <motion.p variants={viewFade} className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-5">
                    How it works
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {STEPS.map(s => (
                        <motion.div key={s.n} variants={viewFade}
                            className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 relative overflow-hidden">
                            <p className="text-7xl font-black text-white/[0.035] leading-none select-none absolute -top-3 -right-1 pointer-events-none">{s.n}</p>
                            <p className="text-[10px] font-bold text-slate-500 tracking-[0.15em] uppercase">{s.n}</p>
                            <p className="text-sm font-semibold text-white mt-2">{s.title}</p>
                            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{s.body}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ── Core Contracts ────────────────────────────────────────── */}
            <motion.section
                initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
                variants={stagger}
            >
                <motion.p variants={viewFade} className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-5">
                    Core Contracts
                </motion.p>
                <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {CONTRACTS.map(c => (
                        <motion.div key={c.name} variants={viewFade}
                            className="rounded-xl border border-white/10 bg-black/20 p-4 hover:border-white/20 hover:bg-black/30 transition-colors">
                            <p className="text-white text-sm font-medium">{c.name}</p>
                            <p className="text-slate-400 text-xs mt-1">{c.desc}</p>
                            <p className="text-slate-400 text-[10px] font-mono mt-2.5 break-all leading-relaxed">{c.addr}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

        </div>
    );
}
