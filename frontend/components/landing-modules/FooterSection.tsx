'use client';

import Link from 'next/link';
import { T, GLASS } from './tokens';

const NAV_LINKS = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Lend',      href: '/lend'  },
    { label: 'Borrow',    href: '/borrow' },
    { label: 'Swap',      href: '/swap'        },
    { label: 'Bridge',    href: '/bridge'      },
    { label: 'Markets',   href: '/markets'     },
] as const;

export function FooterSection() {
    return (
        <footer style={{
            scrollSnapAlign: 'start',
            scrollSnapStop:  'always',
            minHeight:       '36vh',
            paddingTop:      '56px',
            paddingBottom:   '36px',
            borderTop:       '1px solid rgba(255,255,255,0.07)',
            width:           '100%',
            boxSizing:       'border-box',
        }}>
            <style>{`
                @media (max-width:640px) {
                    .footer-cols { flex-direction:column !important; gap:36px !important; }
                }
            `}</style>

            {/* 2-col + brand */}
            <div className="footer-cols" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '48px', flexWrap: 'wrap' }}>

                {/* Brand */}
                <div style={{ flex: '0 0 auto', maxWidth: '260px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.55)' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"/>
                            </svg>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 300, letterSpacing: '0.24em', color: T.white, textTransform: 'uppercase' }}>Kredio</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: 1.8, marginBottom: '16px' }}>
                        Decentralized, reputation-based credit markets running on Polkadot's unified execution environment.
                        Fund, participate, and earn your score permanently on-chain.
                    </p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '6px', fontSize: '7.5px', fontFamily: 'ui-monospace,monospace', color: '#94A3B8', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    </span>
                </div>

                {/* Protocol links */}
                <div>
                    <p style={{ fontSize: '8px', fontFamily: 'ui-monospace,monospace', color: T.muted, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '18px' }}>Protocol</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 32px' }}>
                        {NAV_LINKS.map(l => (
                            <Link key={l.href} href={l.href}
                                style={{ fontSize: '12px', color: '#CBD5E1', textDecoration: 'none', transition: 'color 0.15s' }}
                                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#FFFFFF')}
                                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#CBD5E1')}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Tagline block */}
                <div style={{ flex: '0 0 auto', textAlign: 'right' }}>
                    <p style={{ fontSize: '11px', color: '#1e293b', letterSpacing: '-0.01em', lineHeight: 1.5 }}>
                        <span style={{ color: '#334155' }}>Start at </span>ANON.<br />
                        <span style={{ color: '#334155' }}>Earn your way to </span>
                        <span style={{ color: T.pink }}>DIAMOND.</span>
                    </p>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <span style={{ fontSize: '9px', fontFamily: 'ui-monospace,monospace', color: '#334155' }}>
                    © 2026 Kredio. Polkadot Testnet.
                </span>
                <span style={{ fontSize: '9px', fontFamily: 'ui-monospace,monospace', color: '#334155' }}>
                    Built on Polkadot Asset Hub
                </span>
            </div>
        </footer>
    );
}
