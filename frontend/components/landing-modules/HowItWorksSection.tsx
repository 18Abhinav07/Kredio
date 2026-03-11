'use client';

import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import { T, SECTION, LABEL_STYLE } from './tokens';

const MODULES = [
    {
        num: '01',
        bgId: 'hiw-engine',
        title: 'Credit Scoring Engine',
        mechanism: 'Every user starts at Tier 0 (Anon) with a 30% LTV cap and 22% APY. The kredit_agent PVM contract continuously recomputes a score from 0–100 using six weighted behavioral signals: repayment streak, deposit magnitude, borrow frequency, liquidation history, account age, and governance participation. A single liquidation drops the score by 40 points.',
        innovation: 'Score is computed entirely on-chain inside a PVM contract - no oracle, no off-chain backend, no trusted committee. Deterministic, auditable, and gas-efficient.',
        color: '#A78BFA', // Soft Purple
        icon: '◈',
    },
    {
        num: '02',
        bgId: 'hiw-neural',
        title: 'Neural Scorer',
        mechanism: 'Running in parallel, the neural_scorer PVM contract implements a 2-layer MLP. It normalizes behavioral features into weights to produce an independent neural score. It outputs Confidence % (agreement with deterministic score) and Delta from Rule (signed difference of performance vs rulebook).',
        innovation: 'A user gaming rules (e.g., inflating streaks) shows a high deterministic score but low neural score - producing a large negative delta that flags manipulation. Pure on-chain smart contract resistance.',
        color: '#38BDF8', // Soft Blue
        icon: '◉',
    },
    {
        num: '03',
        bgId: 'hiw-risk',
        title: 'Dynamic Risk Assessment',
        mechanism: 'The risk_assessor PVM evaluates individual positions, predicting liquidation probability (0–100%) using: Debt-to-Collateral, Credit Score, and 7-day collateral price volatility trend. It outputs Risk Tier, blocks to liquidation, and required top-up amount to return to a Safe status.',
        innovation: 'Forward-looking, trend-aware risk scoring. Unlike standard DeFi models using only current price snapshots, Kredio risk reacts preemptively to falling, stable, or rising price vectors.',
        color: '#34D399', // Soft Green
        icon: '▲',
    },
    {
        num: '04',
        bgId: 'hiw-yield',
        title: 'Autonomous Strategy',
        mechanism: 'YieldMind (PVM) evaluates market context (Utilization, Volatility, Avg Credit Score of borrower base) to output a reasoning_code. High utilization (>70%) halts deployment. High volatility reroutes to conservative yielding. Normal states scale allocations linearly based on borrower credit quality.',
        innovation: 'Yield strategy is dynamically coupled to the behavioral quality of borrowers. A feedback loop connecting protocol-wide credit health to external capital allocation routing.',
        color: '#FBBF24', // Soft Yellow
        icon: '⬡',
    },
    {
        num: '05',
        bgId: 'hiw-xcm',
        title: 'Cross-Chain Settlement',
        mechanism: 'The KredioXCMSettler handles XCM Transact payloads compounding atomic intents (Swap → Deposit → Borrow). The KredioAccountRegistry links SR25519 Substrate identities to EVM via cryptographic verification. KredioBridgeMinter provides lock-and-mint EVM bridging directly into protocol use.',
        innovation: 'The SR25519 ↔ EVM identity link means Polkadot on-chain identity (KILT credentials, parachain behavior) flows directly into credit scoring as a first-class primitive.',
        color: '#F472B6', // Soft Pink
        icon: '⇌',
    }
];

function CustomBg({ id }: { id: string }) {
    switch (id) {
        case 'hiw-engine': return (
            <svg className="hiw-bg-element" viewBox="0 0 200 400" preserveAspectRatio="none">
                <circle cx="100" cy="200" r="140" fill="none" stroke="rgba(167,139,250,0.04)" strokeWidth="2" />
                <circle cx="100" cy="200" r="100" fill="none" stroke="rgba(167,139,250,0.06)" strokeWidth="4" />
                <circle cx="100" cy="200" r="60" fill="none" stroke="rgba(167,139,250,0.08)" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
        );
        case 'hiw-neural': return (
            <svg className="hiw-bg-element" viewBox="0 0 400 200" preserveAspectRatio="xRightYBottom meet">
                <path d="M -50 100 Q 100 -50 200 100 T 450 100" fill="none" stroke="rgba(56,189,248,0.06)" strokeWidth="4" />
                <path d="M -50 120 Q 100 -10 200 120 T 450 120" fill="none" stroke="rgba(56,189,248,0.04)" strokeWidth="2" strokeDasharray="8 8" />
                <circle cx="200" cy="100" r="24" fill="none" stroke="rgba(56,189,248,0.08)" strokeWidth="2" />
                <path d="M 185 100 L 215 100 M 200 85 L 200 115" stroke="rgba(56,189,248,0.08)" strokeWidth="2" />
            </svg>
        );
        case 'hiw-risk': return (
            <svg className="hiw-bg-element" viewBox="0 0 200 400" preserveAspectRatio="xRightYBottom meet">
                <path d="M 50 400 Q 100 250 150 400" fill="none" stroke="rgba(52,211,153,0.04)" strokeWidth="20" />
                <path d="M 70 400 Q 100 300 130 400" fill="none" stroke="rgba(52,211,153,0.06)" strokeWidth="10" />
                <circle cx="100" cy="380" r="15" fill="none" stroke="rgba(52,211,153,0.08)" strokeWidth="4" />
            </svg>
        );
        case 'hiw-yield': return (
            <svg className="hiw-bg-element" viewBox="0 0 200 200" preserveAspectRatio="xRightYBottom meet">
                <ellipse cx="140" cy="160" rx="40" ry="15" fill="none" stroke="rgba(251,191,36,0.08)" strokeWidth="2" />
                <ellipse cx="140" cy="140" rx="40" ry="15" fill="none" stroke="rgba(251,191,36,0.06)" strokeWidth="1" />
                <ellipse cx="140" cy="120" rx="40" ry="15" fill="none" stroke="rgba(251,191,36,0.04)" strokeWidth="1" />
                <path d="M 100 160 L 100 120 M 180 160 L 180 120" stroke="rgba(251,191,36,0.05)" strokeWidth="1" />
            </svg>
        );
        case 'hiw-xcm': return (
            <svg className="hiw-bg-element" viewBox="0 0 400 200" preserveAspectRatio="xRightYBottom meet">
                <path d="M 0 100 Q 200 50 400 150" fill="none" stroke="rgba(244,114,182,0.04)" strokeWidth="4" />
                <path d="M 0 120 Q 200 180 400 80" fill="none" stroke="rgba(244,114,182,0.04)" strokeWidth="2" strokeDasharray="8 8" />
                <circle cx="350" cy="130" r="20" fill="none" stroke="rgba(244,114,182,0.06)" strokeWidth="2" />
            </svg>
        );
        default: return null;
    }
}

export function HowItWorksSection() {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section style={{ ...SECTION, paddingTop: '120px', paddingBottom: '120px', minHeight: 'unset' }}>
            <style>{`
                 /* Carousel Container */
                .hiw-carousel {
                    display: flex;
                    overflow-x: auto;
                    scroll-snap-type: x mandatory;
                    scroll-behavior: smooth;
                    gap: 32px;
                    padding: 20px 5vw 80px 5vw; /* Soft padding inside, so box shadows aren't clipped */
                    width: 100%;
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none;    /* Firefox */
                }
                .hiw-carousel::-webkit-scrollbar {
                    display: none; /* Chrome, Safari and Opera */
                }

                .hiw-card-wrapper {
                    flex-shrink: 0;
                    width: 440px;
                    scroll-snap-align: center;
                    display: flex;
                }

                @media (max-width: 600px) {
                    .hiw-card-wrapper { width: 85vw; }
                }

                /* Aesthetic Card matching FeaturesSection */
                .hiw-card {
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
                    height: 100%;
                    width: 100%;
                }
                
                .hiw-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 10% 10%, rgba(255,255,255,0.03) 0%, transparent 80%);
                    pointer-events: none;
                }
                
                .hiw-card:hover {
                    border-color: rgba(255,255,255,0.18);
                    background: rgba(18,22,28,0.85);
                    transform: translateY(-6px);
                    box-shadow: 0 20px 48px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.12);
                }

                .hiw-bg-element {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                    transition: transform 0.5s ease-out, filter 0.5s;
                }
                .hiw-card:hover .hiw-bg-element {
                    transform: scale(1.05);
                    filter: brightness(1.5);
                }

                .hiw-icon-container {
                    width: 56px;
                    height: 56px;
                    border-radius: 16px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    margin-bottom: 28px;
                    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                    backdrop-filter: blur(10px);
                    position: relative;
                    z-index: 1;
                }

                .hiw-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: ${T.white};
                    margin-bottom: 12px;
                    letter-spacing: -0.02em;
                    line-height: 1.2;
                    position: relative;
                    z-index: 1;
                }

                .hiw-desc {
                    font-size: 14px;
                    color: #CBD5E1;
                    line-height: 1.65;
                    position: relative;
                    z-index: 1;
                }

                /* Blockquote style for Innovation */
                .hiw-innovation {
                    margin-top: auto;
                    padding-top: 24px;
                    position: relative;
                    z-index: 1;
                }
                
                .hiw-table {
                    margin-top: 24px;
                    margin-bottom: 16px;
                    width: 100%;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    overflow: hidden;
                    font-size: 13px;
                    position: relative;
                    z-index: 1;
                }
                .hiw-th {
                    display: grid;
                    grid-template-columns: 2fr 1.5fr 1.5fr 1fr;
                    padding: 8px 12px;
                    background: rgba(255,255,255,0.04);
                    color: rgba(255,255,255,0.5);
                    font-weight: 500;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .hiw-tr {
                    display: grid;
                    grid-template-columns: 2fr 1.5fr 1.5fr 1fr;
                    padding: 8px 12px;
                    border-top: 1px solid rgba(255,255,255,0.04);
                    color: #E2E8F0;
                }
                .hiw-tr:hover {
                    background: rgba(255,255,255,0.03);
                }

                /* Background subtle tints */
                .hiw-card-bg {
                    position: absolute;
                    inset: 0;
                    opacity: 0.03;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                    z-index: 0;
                }
                .hiw-card:hover .hiw-card-bg {
                    opacity: 0.08;
                }

            `}</style>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ paddingLeft: '5vw', marginBottom: '40px', display: 'flex', alignItems: 'baseline', gap: '24px' }}
            >
                <div>
                    <p style={LABEL_STYLE}>Technical Specification</p>
                    <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, color: T.white, letterSpacing: '-0.04em', lineHeight: 1.05 }}>
                        How It Works.
                    </h2>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0.3, x: 0 }}
                    animate={{ opacity: 1, x: 10 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: T.muted,
                        fontSize: '14px',
                        fontFamily: 'ui-monospace,monospace',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}
                >
                    <span style={{ display: 'none', '@media (min-width: 768px)': { display: 'inline' } } as any}>Scroll</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </motion.div>
            </motion.div>

            <motion.div
                className="hiw-carousel"
                ref={scrollRef}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
                {MODULES.map((mod, i) => (
                    <div className="hiw-card-wrapper" key={mod.num}>
                        <div className="hiw-card" style={{ borderColor: `${mod.color}15` }}>
                            {/* Ambient color wash based on the card's accent color */}
                            <div className="hiw-card-bg" style={{ background: `linear-gradient(135deg, transparent 40%, ${mod.color} 100%)` }} />

                            <CustomBg id={mod.bgId} />

                            <div className="hiw-icon-container" style={{ color: mod.color, boxShadow: `0 8px 16px ${mod.color}15` }}>
                                {mod.icon}
                            </div>

                            <h3 className="hiw-title">{mod.num}. {mod.title}</h3>

                            <p className="hiw-desc">
                                <span style={{ color: T.white, display: 'block', marginBottom: '4px', fontWeight: 500 }}>The Mechanism</span>
                                {mod.mechanism}
                            </p>

                            <div className="hiw-innovation">
                                <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '20px' }} />
                                <p className="hiw-desc">
                                    <span style={{ color: mod.color, display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Innovation</span>
                                    {mod.innovation}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
