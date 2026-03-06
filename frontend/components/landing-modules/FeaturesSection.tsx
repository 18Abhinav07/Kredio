'use client';

import { motion } from 'framer-motion';
import { T, SECTION, LABEL_STYLE } from './tokens';
import React from 'react';

const ALL = [
    { cls: 'fc-pas', icon: '◈', title: 'PAS Markets', desc: 'Isolated borrow/lend markets for native Polkadot assets. Dynamic LTV up to 85%, real floating APY.', color: '#22C55E', stat: '85%', statLabel: 'Max LTV' },
    { cls: 'fc-flash', icon: '◎', title: 'Flashloan Shield', desc: 'Manipulation-resistant v5 interest accrual. Protects the protocol from single-block price manipulation and flashloan attacks.', color: '#A78BFA' },
    { cls: 'fc-xcm', icon: '⇌', title: 'XCM Deposits', desc: 'Bridge PAS from People Chain via native XCM.', color: T.cyan },
    { cls: 'fc-eth', icon: '⬡', title: 'ETH Bridge', desc: 'Bring liquidity from 5 different EVM chains into Polkadot Asset Hub. Minted 1:1 on-chain.', color: '#F59E0B' },
    { cls: 'fc-gov', icon: '⬥', title: 'Governance Rewards', desc: 'Vote on Asset Hub governance and earn score multipliers. Consistency unlocks higher tiers permanently.', color: '#818CF8', stat: '6 →',  statLabel: 'Tiers' },
    { cls: 'fc-musdc', icon: '◇', title: 'mUSDC Markets', desc: 'Bridged EVM USDC pools with real-time yield.', color: '#38BDF8' },
    { cls: 'fc-swap', icon: '↻', title: 'KredioSwap', desc: 'Swap PAS, mUSDC and lending positions atomically.', color: '#F472B6' },
    { cls: 'fc-id', icon: '▲', title: 'Identity Boost', desc: 'On-chain proofs permanently raise starting score. Leverage KILT and identity providers to exit the Anon tier immediately.', color: '#FB923C' },
] as const;

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } } };
const card = { hidden: { opacity: 0, scale: 0.95, y: 12 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } } };

// Custom Bespoke SVG Backgrounds for each card
function CustomBg({ id }: { id: string }) {
    switch (id) {
        case 'fc-pas': return (
            <div className="fc-bg-element">
                <span style={{ position: 'absolute', bottom: '-20px', right: '-10px', fontSize: '220px', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.06em', color: 'rgba(34,197,94,0.03)' }}>85%</span>
            </div>
        );
        case 'fc-gov': return (
            <div className="fc-bg-element">
                <span style={{ position: 'absolute', bottom: '-10px', right: '10px', fontSize: '200px', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.06em', color: 'rgba(129,140,248,0.03)' }}>6T</span>
            </div>
        );
        case 'fc-flash': return (
            <svg className="fc-bg-element" viewBox="0 0 200 400" preserveAspectRatio="none">
                <circle cx="100" cy="200" r="140" fill="none" stroke="rgba(167,139,250,0.04)" strokeWidth="2" />
                <circle cx="100" cy="200" r="100" fill="none" stroke="rgba(167,139,250,0.06)" strokeWidth="4" />
                <circle cx="100" cy="200" r="60" fill="none" stroke="rgba(167,139,250,0.08)" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
        );
        case 'fc-eth': return (
            <svg className="fc-bg-element" viewBox="0 0 200 400" preserveAspectRatio="xRightYBottom meet">
                <path d="M100 0 L100 400" stroke="rgba(245,158,11,0.05)" strokeWidth="8" strokeDasharray="16 16" />
                <polygon points="100,200 70,250 100,300 130,250" fill="none" stroke="rgba(245,158,11,0.08)" strokeWidth="2" />
                <polygon points="100,100 80,140 100,180 120,140" fill="none" stroke="rgba(245,158,11,0.06)" strokeWidth="1" />
            </svg>
        );
        case 'fc-id': return (
            <svg className="fc-bg-element" viewBox="0 0 200 400" preserveAspectRatio="xRightYBottom meet">
                <path d="M 50 400 Q 100 250 150 400" fill="none" stroke="rgba(251,146,60,0.04)" strokeWidth="20" />
                <path d="M 70 400 Q 100 300 130 400" fill="none" stroke="rgba(251,146,60,0.06)" strokeWidth="10" />
                <circle cx="100" cy="380" r="15" fill="none" stroke="rgba(251,146,60,0.08)" strokeWidth="4" />
            </svg>
        );
        case 'fc-xcm': return (
            <svg className="fc-bg-element" viewBox="0 0 400 200" preserveAspectRatio="xRightYBottom meet">
                <path d="M 0 100 Q 200 50 400 150" fill="none" stroke="rgba(0,226,255,0.04)" strokeWidth="4" />
                <path d="M 0 120 Q 200 180 400 80" fill="none" stroke="rgba(0,226,255,0.04)" strokeWidth="2" strokeDasharray="8 8" />
                <circle cx="350" cy="130" r="20" fill="none" stroke="rgba(0,226,255,0.06)" strokeWidth="2" />
            </svg>
        );
        case 'fc-musdc': return (
            <svg className="fc-bg-element" viewBox="0 0 200 200" preserveAspectRatio="xRightYBottom meet">
                <ellipse cx="140" cy="160" rx="40" ry="15" fill="none" stroke="rgba(56,189,248,0.08)" strokeWidth="2" />
                <ellipse cx="140" cy="140" rx="40" ry="15" fill="none" stroke="rgba(56,189,248,0.06)" strokeWidth="1" />
                <ellipse cx="140" cy="120" rx="40" ry="15" fill="none" stroke="rgba(56,189,248,0.04)" strokeWidth="1" />
                <path d="M 100 160 L 100 120 M 180 160 L 180 120" stroke="rgba(56,189,248,0.05)" strokeWidth="1" />
            </svg>
        );
        case 'fc-swap': return (
            <svg className="fc-bg-element" viewBox="0 0 200 200" preserveAspectRatio="xRightYBottom meet">
                <path d="M 100 50 A 50 50 0 1 1 50 100" fill="none" stroke="rgba(244,114,182,0.06)" strokeWidth="4" strokeLinecap="round" />
                <polygon points="40,90 50,110 60,90" fill="rgba(244,114,182,0.06)" />
                <path d="M 100 150 A 50 50 0 0 1 150 100" fill="none" stroke="rgba(244,114,182,0.04)" strokeWidth="2" strokeLinecap="round" />
            </svg>
        );
        default: return null;
    }
}

export function FeaturesSection() {
    return (
        <section style={{ ...SECTION, paddingTop: '120px', paddingBottom: '120px', minHeight: 'unset' }}>
            <style>{`
                .feat-wrap { max-width: 1200px; margin: 0 auto; width: 100%; position: relative; }
                .feat-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-auto-rows: minmax(160px, auto);
                    gap: 20px;
                    width: 100%;
                }
                
                /* Advanced Asymmetric Layout (3x6 pure bento) */
                .fc-pas { grid-column: 1 / 3; grid-row: 1 / 3; }    /* 2x2 Top Left */
                .fc-flash { grid-column: 3 / 4; grid-row: 1 / 3; }  /* 1x2 Top Right */
                .fc-xcm { grid-column: 1 / 3; grid-row: 3 / 4; }    /* 2x1 Middle Left */
                .fc-eth { grid-column: 3 / 4; grid-row: 3 / 5; }    /* 1x2 Middle Right */
                .fc-gov { grid-column: 1 / 3; grid-row: 4 / 6; }    /* 2x2 Bottom Left */
                .fc-musdc { grid-column: 1 / 2; grid-row: 6 / 7; }  /* 1x1 Bottom Left-ish */
                .fc-swap { grid-column: 2 / 3; grid-row: 6 / 7; }   /* 1x1 Bottom Mid */
                .fc-id { grid-column: 3 / 4; grid-row: 5 / 7; }     /* 1x2 Bottom Right */

                @media (max-width: 960px) {
                    .feat-grid { grid-template-columns: repeat(2, 1fr); }
                    .fc-pas { grid-column: 1 / 3; grid-row: span 2; }
                    .fc-flash { grid-column: span 1; grid-row: span 1; }
                    .fc-xcm { grid-column: 1 / 3; grid-row: span 1; }
                    .fc-eth { grid-column: span 1; grid-row: span 2; }
                    .fc-gov { grid-column: 1 / 3; grid-row: span 2; }
                    .fc-id { grid-column: span 1; grid-row: span 2; }
                    .fc-musdc, .fc-swap { grid-column: span 1; grid-row: span 1; }
                }
                @media (max-width: 600px) {
                    .feat-grid { grid-template-columns: 1fr; }
                    .fc-pas, .fc-gov, .fc-xcm { grid-column: 1 / 2; grid-row: span 1; }
                    .fc-flash, .fc-eth, .fc-musdc, .fc-swap, .fc-id { grid-column: 1 / 2; grid-row: span 1; }
                }

                .feat-card {
                    border-radius: 28px;
                    border: 1px solid rgba(255,255,255,0.06);
                    background: rgba(10,12,16,0.65);
                    backdrop-filter: blur(28px);
                    -webkit-backdrop-filter: blur(28px);
                    padding: 36px;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
                    cursor: default;
                    position: relative;
                    overflow: hidden;
                    box-shadow: inset 0 1px 1px rgba(255,255,255,0.05), 0 8px 24px rgba(0,0,0,0.2);
                }
                
                /* The base radial gradient to give internal light */
                .feat-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 10% 10%, rgba(255,255,255,0.03) 0%, transparent 80%);
                    pointer-events: none;
                }
                
                .feat-card:hover {
                    border-color: rgba(255,255,255,0.18);
                    background: rgba(18,22,28,0.85);
                    transform: translateY(-6px);
                    box-shadow: 0 20px 48px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.12);
                }

                /* Absolute container for bespoke background SVGs */
                .fc-bg-element {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                    transition: transform 0.5s ease-out, filter 0.5s;
                }
                .feat-card:hover .fc-bg-element {
                    transform: scale(1.05);
                    filter: brightness(1.5);
                }

                /* Colored tinting for the huge cards */
                .fc-pas { background: rgba(34,197,94,0.03); border-color: rgba(34,197,94,0.12); }
                .fc-pas:hover { border-color: rgba(34,197,94,0.25); background: rgba(34,197,94,0.06); }
                
                .fc-gov { background: rgba(129,140,248,0.02); border-color: rgba(129,140,248,0.1); }
                .fc-gov:hover { background: rgba(129,140,248,0.05); border-color: rgba(129,140,248,0.2); }
            `}</style>

            <motion.div
                className="feat-wrap"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={container}
            >
                {/* Header */}
                <motion.div variants={card} style={{ marginBottom: '40px' }}>
                    <p style={LABEL_STYLE}>Core Architecture</p>
                    <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, color: T.white, letterSpacing: '-0.04em', lineHeight: 1.05 }}>
                        Multi-Chain Supply.<br/>
                        <span style={{ color: '#E2E8F0', opacity: 0.35 }}>Unified Credit Engine.</span>
                    </h2>
                </motion.div>

                <div className="feat-grid">
                    {ALL.map((f) => {
                        // Is this card spanning multiple columns/rows?
                        const isHuge = f.cls === 'fc-pas' || f.cls === 'fc-gov';
                        const isVertical = f.cls === 'fc-flash' || f.cls === 'fc-eth' || f.cls === 'fc-id';
                        const isHorizontal = f.cls === 'fc-xcm';

                        return (
                            <motion.div
                                key={f.title}
                                variants={card}
                                className={`feat-card ${f.cls}`}
                            >
                                {/* Custom Bespoke Background Graphic */}
                                <CustomBg id={f.cls} />
                                
                                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    {/* Top: Icon */}
                                    <div style={{ 
                                        width: isHuge ? 64 : 48, 
                                        height: isHuge ? 64 : 48, 
                                        borderRadius: 16, 
                                        background: `rgba(255,255,255,0.03)`, 
                                        border: `1px solid rgba(255,255,255,0.08)`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: isHuge ? '28px' : '20px', color: f.color,
                                        marginBottom: isHuge || isHorizontal ? '32px' : '24px',
                                        boxShadow: `0 8px 16px ${f.color}15`,
                                        backdropFilter: 'blur(10px)'
                                    }}>
                                        {f.icon}
                                    </div>

                                    {/* Middle: Content */}
                                    <div style={{ marginTop: isVertical ? 'auto' : '0' }}>
                                        <p style={{ fontSize: isHuge ? '28px' : '18px', fontWeight: 700, color: T.white, marginBottom: '12px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{f.title}</p>
                                        <p style={{ fontSize: isHuge ? '16px' : '14px', color: '#E2E8F0', lineHeight: 1.6, maxWidth: isHuge || isHorizontal ? '80%' : '100%' }}>{f.desc}</p>
                                    </div>

                                    {/* Bottom: Stat (only for huge cards) */}
                                    {'stat' in f && (
                                        <div style={{ marginTop: 'auto', paddingTop: '32px', display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                                            <span style={{ fontSize: '56px', fontWeight: 700, color: f.color, letterSpacing: '-0.04em', lineHeight: 1 }}>
                                                {f.stat}
                                            </span>
                                            <span style={{ fontSize: '11px', fontFamily: 'ui-monospace,monospace', color: '#94A3B8', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
                                                {f.statLabel}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
}
