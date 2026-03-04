'use client';
import * as React from 'react';
import { motion } from 'framer-motion';
import { useAccount, useBalance } from 'wagmi';
import config from '../../lib/addresses';
import { useProtocolStore } from '../../lib/store';

export function HomeDashboard() {
    const { setActiveTab } = useProtocolStore();
    const { address, isConnected } = useAccount();
    const { data: pasBalance } = useBalance({ address });
    const isFresh = !isConnected || (pasBalance && pasBalance.value === 0n);

    const cards = [
        {
            title: 'Swap',
            description: 'Constant-product AMM with XCM bridge. Swap registered assets or bridge cross-chain atomically.',
            badge: 'EVM',
            badgeColor: 'bg-green-500/20 text-green-300 border-green-500/30',
            tab: 'swap' as const,
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            ),
        },
        {
            title: 'Vault',
            description: 'ERC-4626 yield vault. Deposit tUSDC, earn tvtUSDC shares. Rebalance triggers cross-VM compute + XCM.',
            badge: 'ERC-4626',
            badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
            tab: 'vault' as const,
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
        },
        {
            title: 'Compute',
            description: 'PolkaVM (PVM) contract for strategy optimization. Compiled with resolc, called cross-VM from EVM.',
            badge: 'PVM',
            badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
            tab: 'compute' as const,
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8">
            {/* Hero */}
            <div className="text-center space-y-3">
                <h1 className="text-4xl font-bold text-foreground tracking-tight">
                    Tesseract <span className="text-brand-subtle">2.0</span>
                </h1>
                <p className="text-muted text-sm max-w-md mx-auto">
                    Polkadot-native DeFi protocol — EVM contracts, PVM compute via resolc, and XCM cross-chain messaging on Polkadot Hub.
                </p>
                {config.explorer && (
                    <a
                        href={config.explorer}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-block text-xs text-brand-subtle hover:underline"
                    >
                        Paseo Subscan Explorer ↗
                    </a>
                )}
            </div>

            {/* Onboarding (fresh wallet) */}
            {isFresh && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-brand-subtle/30 bg-brand-subtle/5 backdrop-blur-lg p-5 space-y-3"
                >
                    <h3 className="text-sm font-semibold text-foreground">Getting Started</h3>
                    <ol className="text-xs text-muted space-y-1.5 list-decimal list-inside">
                        <li>Get PAS from the <a href={config.faucet || '#'} target="_blank" rel="noopener noreferrer" className="text-brand-subtle hover:underline">Polkadot Faucet ↗</a></li>
                        <li>Open <button onClick={() => setActiveTab('swap')} className="text-brand-subtle hover:underline">Swap</button> → <strong>Wrap</strong> tab to wrap PAS → WPAS</li>
                        <li>Use the tUSDC faucet in Wallet panel to mint test stablecoin</li>
                        <li>Swap WPAS ↔ tUSDC, or deposit tUSDC into the Vault</li>
                    </ol>
                </motion.div>
            )}

            {/* Protocol Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cards.map(card => (
                    <motion.button
                        key={card.tab}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab(card.tab)}
                        className="text-left rounded-2xl border border-glass-border bg-surface/50 backdrop-blur-lg p-5 space-y-3 hover:border-brand-subtle/30 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <div className="text-muted">{card.icon}</div>
                            <span className={`px-2 py-0.5 text-xs font-bold rounded border ${card.badgeColor}`}>
                                {card.badge}
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                        <p className="text-xs text-muted leading-relaxed">{card.description}</p>
                    </motion.button>
                ))}
            </div>

            {/* Architecture Overview */}
            <div className="rounded-2xl border border-glass-border bg-surface/50 backdrop-blur-lg p-5 space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Architecture</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1.5">
                        <p className="text-muted font-medium">EVM Layer</p>
                        <p className="text-foreground/70">TesseractSwap — AMM + XCM bridge</p>
                        <p className="text-foreground/70">TesseractVault — ERC-4626 yield</p>
                    </div>
                    <div className="space-y-1.5">
                        <p className="text-muted font-medium">PVM Layer</p>
                        <p className="text-foreground/70">TesseractCompute — Rust FFI optimizer</p>
                        <p className="text-foreground/70">Cross-VM dispatch from EVM → PVM</p>
                    </div>
                    <div className="space-y-1.5">
                        <p className="text-muted font-medium">Runtime Precompiles</p>
                        <p className="text-foreground/70">IXcm — XCM message execution</p>
                        <p className="text-foreground/70">ISystem — Weight metering</p>
                    </div>
                    <div className="space-y-1.5">
                        <p className="text-muted font-medium">Network</p>
                        <p className="text-foreground/70">Polkadot Hub (Passet Hub TestNet)</p>
                        <p className="text-foreground/70">Chain ID: {config.chainId}</p>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="flex items-center justify-center gap-4 text-xs text-muted">
                {config.explorer && (
                    <a href={config.explorer} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                        Subscan ↗
                    </a>
                )}
                {config.faucet && (
                    <a href={config.faucet} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                        Faucet ↗
                    </a>
                )}
                <a href="https://docs.polkadot.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    Polkadot Docs ↗
                </a>
            </div>
        </div>
    );
}
