'use client';

import { motion } from 'framer-motion';
import { T, SECTION, LABEL_STYLE } from './tokens';

const TIERS = [
    { cls: 'tc-1', name: 'ANON', pts: '0', ltv: '50%', rate: '12%', color: '#475569', hero: false },
    { cls: 'tc-2', name: 'BRONZE', pts: '100', ltv: '60%', rate: '10%', color: '#CD7F32', hero: false },
    { cls: 'tc-3', name: 'SILVER', pts: '500', ltv: '70%', rate: '8%', color: '#94A3B8', hero: false },
    { cls: 'tc-4', name: 'GOLD', pts: '2,000', ltv: '78%', rate: '6.5%', color: '#F59E0B', hero: false },
    { cls: 'tc-5', name: 'PLATINUM', pts: '10,000', ltv: '83%', rate: '5%', color: '#00E2FF', hero: false },
    { cls: 'tc-6', name: 'DIAMOND', pts: '50,000', ltv: '85%', rate: '3%', color: '#E81CFF', hero: true },
] as const;

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } } };
const card = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: 'easeOut' as const } } };

export function TiersSection() {
    return (
        <section style={{ ...SECTION }}>
            <style>{`
                .tiers-wrap {
                    max-width: 1200px; 
                    margin: 0 auto; 
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr 1.2fr;
                    gap: 64px;
                    align-items: flex-start;
                }
                
                @media (max-width: 900px) {
                    .tiers-wrap { grid-template-columns: 1fr; gap: 48px; }
                    .sticky-left { position: relative !important; top: 0 !important; }
                }

                .sticky-left {
                    position: sticky;
                    top: 120px;
                }

                .ladder-container {
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    padding-bottom: 80px;
                }

                /* Background timeline rail */
                .ladder-container::before {
                    content: '';
                    position: absolute;
                    left: -24px;
                    top: 24px;
                    bottom: 24px;
                    width: 2px;
                    background: rgba(255,255,255,0.05);
                    border-radius: 2px;
                }

                .tier-card {
                    border-radius: 24px;
                    border: 1px solid rgba(255,255,255,0.06);
                    background: rgba(10,12,16,0.65);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    padding: 36px 40px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    min-height: 220px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 -12px 32px rgba(0,0,0,0.5);
                    /* Margin top pulls the card up to overlap the previous one slightly */
                    margin-top: -40px;
                    transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                
                /* First card doesn't overlap anything */
                .tier-card:first-child { margin-top: 0; }

                .tier-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 100% 0%, rgba(255,255,255,0.05) 0%, transparent 60%);
                    pointer-events: none;
                }
                
                .tier-card:hover { 
                    transform: translateY(-8px); 
                }

                /* The active timeline dot beside each card */
                .timeline-dot {
                    position: absolute;
                    left: -24px;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #0f172a;
                    border: 2px solid;
                    z-index: 10;
                }

                .tier-card.hero-card {
                    border-color: rgba(232,28,255,0.3);
                    background: rgba(15,10,20,0.85);
                    box-shadow: 0 -16px 48px rgba(0,0,0,0.6), 0 0 80px rgba(232,28,255,0.1);
                    margin-top: -20px; /* Hero card pops out a bit more */
                }
                .tier-card.hero-card::before {
                    background: radial-gradient(circle at 100% 0%, rgba(232,28,255,0.15) 0%, transparent 70%);
                }
            `}</style>

            <div className="tiers-wrap">
                {/* Left side - Sticky Header */}
                <motion.div
                    className="sticky-left"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <p style={LABEL_STYLE}>The Path to Diamond</p>
                    <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: T.white, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '16px' }}>
                        Climb the Ladder.<br />
                        <span style={{ color: '#E81CFF' }}>Unlock Capital.</span>
                    </h2>
                    <p style={{ fontSize: '15px', color: '#E2E8F0', lineHeight: 1.7, maxWidth: '420px', marginBottom: '32px' }}>
                        Kredio replaces fragmented identity with a unified on-chain reputation. Start at Anon with basic terms. Prove your reliability through repayments and governance. Unlock institutional-grade liquidity at Diamond.
                    </p>

                    <div style={{ display: 'flex', gap: '24px' }}>
                        <div>
                            <p style={{ fontSize: '28px', fontWeight: 700, color: T.white, letterSpacing: '-0.04em' }}>6</p>
                            <p style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Tiers</p>
                        </div>
                        <div>
                            <p style={{ fontSize: '28px', fontWeight: 700, color: '#00E2FF', letterSpacing: '-0.04em' }}>85<span style={{ fontSize: '18px' }}>%</span></p>
                            <p style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Max LTV</p>
                        </div>
                        <div>
                            <p style={{ fontSize: '28px', fontWeight: 700, color: '#E81CFF', letterSpacing: '-0.04em' }}>3<span style={{ fontSize: '18px' }}>%</span></p>
                            <p style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Base Rate</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right side - Overlapping Stacking Cards */}
                <motion.div
                    className="ladder-container"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={container}
                >
                    {TIERS.map((t, index) => (
                        <motion.div
                            key={t.name}
                            variants={card}
                            className={`tier-card ${t.hero ? 'hero-card' : ''}`}
                            style={{
                                zIndex: index, // Ensure natural stacking order
                                // Slight tilt based on index to make it feel like scattered cards
                                transformOrigin: 'center center'
                            }}
                        >
                            <div className="timeline-dot" style={{ borderColor: t.color, boxShadow: `0 0 12px ${t.color}` }} />

                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                <div>
                                    {/* Tier name */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: t.color, boxShadow: `0 0 16px ${t.color}`, flexShrink: 0, display: 'inline-block' }} />
                                        <span style={{ fontSize: '14px', fontFamily: 'ui-monospace,monospace', fontWeight: 800, color: t.color, letterSpacing: '3px' }}>
                                            {t.name}
                                        </span>
                                        {t.hero && (
                                            <span style={{ marginLeft: '12px', fontSize: '9px', fontFamily: 'ui-monospace,monospace', color: T.pink, letterSpacing: '1.5px', background: 'rgba(232,28,255,0.15)', padding: '4px 10px', borderRadius: '6px' }}>ULTIMATE TIER</span>
                                        )}
                                    </div>

                                    {/* Min points */}
                                    <p style={{ fontSize: '11px', fontFamily: 'ui-monospace,monospace', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                        {t.pts} SCORE REQUIRED
                                    </p>
                                </div>
                            </div>

                            {/* Stats Flex Row */}
                            <div style={{ display: 'flex', gap: '48px', marginTop: 'auto', paddingTop: '24px' }}>
                                <div>
                                    <p style={{ fontSize: '10px', fontFamily: 'ui-monospace,monospace', color: '#94A3B8', letterSpacing: '1.5px', marginBottom: '6px', textTransform: 'uppercase' }}>Max LTV</p>
                                    <p style={{ fontSize: '36px', fontWeight: 700, color: T.white, letterSpacing: '-0.04em', lineHeight: 1 }}>{t.ltv}</p>
                                </div>
                                <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)' }} />
                                <div>
                                    <p style={{ fontSize: '10px', fontFamily: 'ui-monospace,monospace', color: '#94A3B8', letterSpacing: '1.5px', marginBottom: '6px', textTransform: 'uppercase' }}>Borrow Rate</p>
                                    <p style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: t.hero ? T.pink : T.white }}>{t.rate}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
