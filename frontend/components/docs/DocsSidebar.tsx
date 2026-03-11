'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SubItem = { href: string; label: string };
type NavItem = { href: string; label: string; subs?: SubItem[] };
type NavSection = { title: string; items: NavItem[] };

const DOCS_NAV: NavSection[] = [
    {
        title: 'Overview',
        items: [
            {
                href: '/docs/intro',
                label: 'Introduction',
                subs: [
                    { href: '/docs/intro#problem', label: 'The Problem' },
                    { href: '/docs/intro#what-it-does', label: 'What Kredio Does' },
                    { href: '/docs/intro#layers', label: 'Three Execution Layers' },
                ]
            },
            {
                href: '/docs/architecture',
                label: 'Architecture',
                subs: [
                    { href: '/docs/architecture#layers', label: 'Execution Layers' },
                    { href: '/docs/architecture#backend', label: 'Backend Services' },
                    { href: '/docs/architecture#borrow-flow', label: 'Borrow Event Flow' },
                    { href: '/docs/architecture#identity', label: 'Identity & Governance' },
                ]
            },
        ]
    },
    {
        title: 'Protocol',
        items: [
            {
                href: '/docs/products',
                label: 'Core Products',
                subs: [
                    { href: '/docs/products#lending', label: 'KredioLending' },
                    { href: '/docs/products#pas-market', label: 'KredioPASMarket' },
                    { href: '/docs/products#swap', label: 'KredioSwap' },
                    { href: '/docs/products#bridge', label: 'ETH Bridge' },
                    { href: '/docs/products#xcm-settler', label: 'XCM Settler' },
                ]
            },
            {
                href: '/docs/agents',
                label: 'AI Agent Workflows',
                subs: [
                    { href: '/docs/agents#kredit-agent', label: 'KreditAgent' },
                    { href: '/docs/agents#neural-scorer', label: 'NeuralScorer' },
                    { href: '/docs/agents#risk-assessor', label: 'RiskAssessor' },
                    { href: '/docs/agents#yield-mind', label: 'YieldMind' },
                    { href: '/docs/agents#trigger-schedule', label: 'Trigger Schedule' },
                ]
            },
        ]
    },
    {
        title: 'Developers',
        items: [
            {
                href: '/docs/contracts',
                label: 'Contracts & Integration',
                subs: [
                    { href: '/docs/contracts#evm-contracts', label: 'EVM Contracts' },
                    { href: '/docs/contracts#ink-contracts', label: 'ink! Contracts' },
                    { href: '/docs/contracts#build', label: 'Build from Source' },
                    { href: '/docs/contracts#deploy', label: 'Deploy' },
                    { href: '/docs/contracts#integration', label: 'Frontend Integration' },
                ]
            },
        ]
    },
    {
        title: 'Vision',
        items: [
            {
                href: '/docs/roadmap',
                label: 'Roadmap & Vision',
                subs: [
                    { href: '/docs/roadmap#premise', label: 'The Premise' },
                    { href: '/docs/roadmap#intelligence-layer', label: 'Intelligence Layer' },
                    { href: '/docs/roadmap#tiers', label: 'Credit Tiers' },
                    { href: '/docs/roadmap#xcm-engine', label: 'XCM Settlement' },
                    { href: '/docs/roadmap#phases', label: 'Development Phases' },
                ]
            },
        ]
    }
];

export default function DocsSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 shrink-0 h-[calc(100vh-64px)] overflow-y-auto border-r border-white/5 bg-transparent sticky top-16 hidden md:block">
            <div className="py-8 px-5">
                {/* Sidebar header */}
                <div className="mb-7 px-2 flex items-center gap-2.5">
                    <div className="w-1.5 h-4 rounded-full bg-cyan-400/70 shrink-0" />
                    <p className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold m-0">Kredio Docs</p>
                </div>

                <nav className="space-y-6">
                    {DOCS_NAV.map((section) => (
                        <div key={section.title}>
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 px-2 m-0">
                                {section.title}
                            </p>
                            <ul className="space-y-0.5 m-0 p-0 list-none">
                                {section.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <li key={item.href} className="m-0">
                                            <Link
                                                href={item.href}
                                                className={`flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-md transition-all no-underline ${isActive
                                                        ? 'bg-white/[0.07] text-white font-medium'
                                                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/4'
                                                    }`}
                                            >
                                                {isActive && (
                                                    <span className="w-1 h-3.5 rounded-full bg-cyan-400 shrink-0" />
                                                )}
                                                {item.label}
                                            </Link>
                                            {/* Sub-navigation - shown only for the active page */}
                                            {isActive && item.subs && (
                                                <ul className="mt-1 ml-4 pl-3 border-l border-white/6 space-y-0 mb-1.5 list-none p-0">
                                                    {item.subs.map((sub) => (
                                                        <li key={sub.href} className="m-0">
                                                            <a
                                                                href={sub.href}
                                                                className="block py-1 px-2 text-[11.5px] text-slate-500 hover:text-slate-300 transition-colors leading-relaxed no-underline rounded hover:bg-white/3"
                                                            >
                                                                {sub.label}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
}

