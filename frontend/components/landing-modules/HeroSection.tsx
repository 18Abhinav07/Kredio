'use client';

import { motion } from 'framer-motion';
import { T, SECTION } from './tokens';

// Staggered animation sequence for the hero elements
const container = { hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };
const itemFadeUp = { 
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' }, 
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } } 
};

export function HeroSection() {
    return (
        <section style={{ ...SECTION, alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <style>{`
                @keyframes heroScroll { 0%,100%{opacity:.2} 50%{opacity:.8} }
                .hero-scroll-1 { animation: heroScroll 2s ease-in-out infinite; }
                .hero-scroll-2 { animation: heroScroll 2s ease-in-out infinite; animation-delay:.25s; }
                .hero-scroll-3 { animation: heroScroll 2s ease-in-out infinite; animation-delay:.5s; }
                
                @keyframes livePulse { 0%,100%{opacity:1; transform: scale(1)} 50%{opacity:.5; transform: scale(0.85)} }
                .live-dot { animation: livePulse 2s ease-in-out infinite; }
                
                @keyframes floatOrb1 { 0%,100%{transform: translate(0, 0) scale(1)} 33%{transform: translate(30px, -50px) scale(1.1)} 66%{transform: translate(-30px, 20px) scale(0.9)} }
                @keyframes floatOrb2 { 0%,100%{transform: translate(0, 0) scale(1)} 33%{transform: translate(-40px, 40px) scale(0.95)} 66%{transform: translate(20px, -30px) scale(1.05)} }
                
                .hero-orb-1 { animation: floatOrb1 18s ease-in-out infinite; }
                .hero-orb-2 { animation: floatOrb2 22s ease-in-out infinite; }
                
                .hero-btn-primary {
                    background: white;
                    color: black;
                    transition: all 0.3s ease;
                }
                .hero-btn-primary:hover {
                    background: rgba(255,255,255,0.9);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(255,255,255,0.15), 0 0 0 4px rgba(255,255,255,0.1);
                }
            `}</style>

            {/* Ambient Background Glows */}
            <div className="hero-orb-1" style={{ position: 'absolute', top: '20%', left: '35%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0,226,255,0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
            <div className="hero-orb-2" style={{ position: 'absolute', top: '30%', right: '35%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(232,28,255,0.12) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

            {/* Centered Hero Copy - Staggered Reveal */}
            <motion.div initial="hidden" animate="show" variants={container} style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                
                {/* Live badge */}
                <motion.div variants={itemFadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', fontSize: '10px', letterSpacing: '0.2em', color: T.dim, fontFamily: 'ui-monospace,monospace', marginBottom: '40px', backdropFilter: 'blur(10px)' }}>
                    <span className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 12px #22C55E', display: 'inline-block', flexShrink: 0 }} />
                    LIVE ON POLKADOT TESTNET
                </motion.div>

                {/* Headline */}
                <motion.h1 variants={itemFadeUp} style={{ fontSize: 'clamp(56px, 8vw, 112px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.05em', color: T.white, marginBottom: '32px' }}>
                    Fair Credit<br />
                    <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.3)' }}>on Polkadot.</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p variants={itemFadeUp} style={{ fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.7, color: '#E2E8F0', maxWidth: '520px', marginBottom: '80px', fontWeight: 400 }}>
                    Fund from any chain. Participate in governance.<br />
                    Unlock institutional-grade tiered borrowing.
                </motion.p>
                
                {/* Scroll indicator */}
                <motion.div variants={itemFadeUp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '9px', fontFamily: 'ui-monospace,monospace', color: T.muted, letterSpacing: '4px', textTransform: 'uppercase' }}>EXPLORE TOPOLOGY</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div className="hero-scroll-1" style={{ width: 1.5, height: 18, background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
                        <div className="hero-scroll-2" style={{ width: 1.5, height: 18, background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
                        <div className="hero-scroll-3" style={{ width: 1.5, height: 18, background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
