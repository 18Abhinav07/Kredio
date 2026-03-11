'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { T, SECTION } from './tokens';

export function CTASection() {
    return (
        <section style={{ ...SECTION, justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Ambient glow */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(232,28,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'relative', zIndex: 1, maxWidth: '560px' }}
            >
                {/* Label */}
                <p style={{ fontSize: '9px', fontFamily: 'ui-monospace,monospace', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#CBD5E1', marginBottom: '28px' }}>
                    READY TO UPGRADE?
                </p>

                {/* Headline */}
                <h2 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.06em', color: T.white, marginBottom: '28px' }}>
                    Start at<br />ANON.
                </h2>

                {/* Subhead */}
                <p style={{ fontSize: '15px', lineHeight: 1.9, color: '#E2E8F0', marginBottom: '48px', maxWidth: '400px', margin: '0 auto 48px' }}>
                    Join anon, become Diamond. Stop paying equal rates for unequal reliability. Build your unkillable on-chain credit history right now.
                </p>

                {/* CTA button */}
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    {/* Button glow */}
                    <div style={{ position: 'absolute', inset: '-12px', background: 'radial-gradient(ellipse, rgba(232,28,255,0.18) 0%, transparent 70%)', borderRadius: '999px', pointerEvents: 'none' }} />
                    <Link
                        href="/dashboard"
                        style={{
                            display: 'inline-block', position: 'relative', padding: '14px 40px',
                            borderRadius: '12px', background: T.pink, color: '#000',
                            fontSize: '13px', fontWeight: 700, textDecoration: 'none',
                            letterSpacing: '0.02em', boxShadow: `0 0 32px rgba(232,28,255,0.4)`,
                            transition: 'box-shadow 0.2s, transform 0.2s',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 56px rgba(232,28,255,0.65)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(232,28,255,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                    >
                        Open Lending Markets →
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
