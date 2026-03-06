'use client';

import React from "react";

export interface CpuArchitectureSvgProps {
    className?: string;
    width?: string;
    height?: string;
}

export default function CpuCircuit({
    className = "",
    width = "100%",
    height = "100%",
}: CpuArchitectureSvgProps) {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* SVG container with visible overflow for glowing filters */}
            <svg
                className={className}
                width={width}
                height={height}
                viewBox="0 0 1200 600"
                style={{ overflow: 'visible', userSelect: 'none' }}
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    {/* Glow filters for node lights */}
                    <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /><feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00E2FF" floodOpacity="0.5" /></filter>
                    <filter id="glow-sky" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /><feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38BDF8" floodOpacity="0.5" /></filter>
                    <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /><feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#F59E0B" floodOpacity="0.5" /></filter>
                    <filter id="glow-yellow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /><feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FBBF24" floodOpacity="0.5" /></filter>
                    <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /><feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#22C55E" floodOpacity="0.5" /></filter>
                    <filter id="glow-pink" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /><feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#E81CFF" floodOpacity="0.5" /></filter>
                    <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /><feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#A78BFA" floodOpacity="0.5" /></filter>

                    {/* Node border glows */}
                    <filter id="node-glow-cyan" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00E2FF" floodOpacity="0.3" /></filter>
                    <filter id="node-glow-pink" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#E81CFF" floodOpacity="0.3" /></filter>
                    <filter id="node-glow-neutral" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FFFFFF" floodOpacity="0.2" /></filter>

                    {/* Center CPU deep shadow only (removed glow) */}
                    <filter id="cpu-shadow" x="-40%" y="-40%" width="180%" height="180%">
                        <feDropShadow dx="0" dy="16" stdDeviation="24" floodColor="#000000" floodOpacity="0.8" />
                    </filter>

                    <linearGradient id="pins" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#334155" />
                        <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>

                    {/* Faded grid pattern for the background of the chip */}
                    <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
                        <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    </pattern>
                </defs>

                {/* --- 1. Background Grid Traces --- */}
                <g fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1">
                    <path d="M 40 30 H 1160" />
                    <path d="M 40 570 H 1160" />
                    <path d="M 200 30 V 570" />
                    <path d="M 600 30 V 130" />
                    <path d="M 600 470 V 570" />
                    <path d="M 1000 30 V 570" />
                </g>
                <g fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1">
                    <path d="M 20 60 V 20 H 60" />
                    <path d="M 1180 60 V 20 H 1140" />
                    <path d="M 20 540 V 580 H 60" />
                    <path d="M 1180 540 V 580 H 1140" />
                </g>


                {/* --- 2. Active Path Traces --- */}
                <g fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Left Infra */}
                    <path id="p1" d="M 95 80 H 200 Q 210 80 210 90 V 130 Q 210 142 220 142 H 260" stroke="#00E2FF" opacity={0.6} />
                    <path id="p2" d="M 95 160 H 175 Q 185 160 185 150 V 142 H 260" stroke="#00E2FF" opacity={0.6} />
                    <path id="p3" d="M 95 240 H 180 Q 190 240 190 260 V 295 H 260" stroke="#00E2FF" opacity={0.6} />
                    <path id="p4" d="M 95 320 H 180 Q 190 320 190 308 V 300 H 260" stroke="#00E2FF" opacity={0.4} />
                    <path id="p5" d="M 95 400 H 260" stroke="#00E2FF" opacity={0.3} />
                    
                    {/* Infra to Core */}
                    <path id="p6" d="M 390 142 H 380" stroke="#00E2FF" opacity={0.8} />
                    <path id="p7" d="M 390 302 H 380" stroke="rgba(255,255,255,0.55)" opacity={0.8} />
                    <path id="p8" d="M 390 422 H 380" stroke="rgba(255,255,255,0.55)" opacity={0.8} />
                    
                    {/* Core to Right Infra */}
                    <path id="p9" d="M 820 195 H 840" stroke="#8B5CF6" opacity={0.8} />
                    <path id="p10" d="M 820 322 H 840" stroke="#8B5CF6" opacity={0.8} />
                    <path id="p11" d="M 820 440 H 840" stroke="#8B5CF6" opacity={0.6} />

                    {/* Right Infra to Dest */}
                    <path id="p12" d="M 970 192 H 1060" stroke="#8B5CF6" opacity={0.6} />
                    <path id="p13" d="M 970 322 H 1060" stroke="#8B5CF6" opacity={0.6} />
                    <path id="p14" d="M 970 442 H 1060" stroke="#8B5CF6" opacity={0.5} />

                    {/* Feedback Rails */}
                    <path id="p15" d="M 1060 480 H 1090 Q 1100 480 1100 495 V 555 Q 1100 565 1085 565 H 115 Q 100 565 100 550 V 440" stroke="#A78BFA" opacity={0.3} strokeDasharray="4 8" />
                    <path id="p16" d="M 600 130 V 50 Q 600 30 580 30 H 200 Q 180 30 180 50 V 100" stroke="#38BDF8" opacity={0.25} strokeDasharray="4 8" />
                </g>

                {/* --- 3. Horizontal Rails Dots & Overlays --- */}
                {/* Top Tier Rail */}
                <g>
                    <path d="M 40 30 H 1160" stroke="rgba(232,28,255,0.15)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                    
                    <circle cx={80} cy={30} r={3} fill="none" stroke="#64748B" />
                    <text x={80} y={46} fontSize={8} fill="#64748B" textAnchor="middle" fontFamily="ui-monospace,monospace">ANON</text>

                    <circle cx={296} cy={30} r={3} fill="none" stroke="#CD7F32" />
                    <text x={296} y={46} fontSize={8} fill="#CD7F32" textAnchor="middle" fontFamily="ui-monospace,monospace">BRONZE</text>

                    <circle cx={512} cy={30} r={3} fill="none" stroke="#C0C0C0" />
                    <text x={512} y={46} fontSize={8} fill="#C0C0C0" textAnchor="middle" fontFamily="ui-monospace,monospace">SILVER</text>

                    <circle cx={728} cy={30} r={3} fill="none" stroke="#FFD700" />
                    <text x={728} y={46} fontSize={8} fill="#FFD700" textAnchor="middle" fontFamily="ui-monospace,monospace">GOLD</text>

                    <circle cx={944} cy={30} r={3} fill="none" stroke="#E5E4E2" />
                    <text x={944} y={46} fontSize={8} fill="#E5E4E2" textAnchor="middle" fontFamily="ui-monospace,monospace">PLATINUM</text>

                    <circle cx={1160} cy={30} r={3} fill="none" stroke="#B9F2FF" />
                    <text x={1160} y={46} fontSize={8} fill="#B9F2FF" textAnchor="middle" fontFamily="ui-monospace,monospace">DIAMOND</text>
                </g>

                {/* Bottom Repay Rail Arc Label */}
                <text x={600} y={590} fontSize={8} fill="rgba(255,255,255,0.3)" textAnchor="middle" letterSpacing="0.15em" fontFamily="ui-monospace,monospace">REPAY → SCORE HISTORY → TIER UPGRADE</text>


                {/* --- 4. Animated Orbs --- */}
                <circle r="2.8" fill="#00E2FF" filter="url(#glow-cyan)"><animateMotion dur="3.2s" repeatCount="indefinite" begin="0s"><mpath href="#p6" /></animateMotion></circle>
                <circle r="2.8" fill="#FFFFFF" opacity="0.8" filter="url(#glow-neutral)"><animateMotion dur="4s" repeatCount="indefinite" begin="0.8s"><mpath href="#p7" /></animateMotion></circle>
                <circle r="2.8" fill="#FFFFFF" opacity="0.8" filter="url(#glow-neutral)"><animateMotion dur="3.6s" repeatCount="indefinite" begin="1.6s"><mpath href="#p8" /></animateMotion></circle>
                
                <circle r="2.8" fill="#8B5CF6" filter="url(#glow-purple)"><animateMotion dur="2.8s" repeatCount="indefinite" begin="0.4s"><mpath href="#p9" /></animateMotion></circle>
                <circle r="2.8" fill="#8B5CF6" filter="url(#glow-purple)"><animateMotion dur="3.4s" repeatCount="indefinite" begin="1.2s"><mpath href="#p10" /></animateMotion></circle>
                <circle r="2.8" fill="#8B5CF6" filter="url(#glow-purple)" opacity="0.7"><animateMotion dur="4.2s" repeatCount="indefinite" begin="2s"><mpath href="#p11" /></animateMotion></circle>

                <circle r="2.5" fill="#38BDF8" opacity="0.5"><animateMotion dur="5s" repeatCount="indefinite" begin="1s"><mpath href="#p16" /></animateMotion></circle>
                <circle r="2.5" fill="#A78BFA" opacity="0.4"><animateMotion dur="7s" repeatCount="indefinite" begin="3s"><mpath href="#p15" /></animateMotion></circle>


                {/* --- 5. Zone A: Source Input Nodes (x=40) --- */}
                <g fontFamily="ui-monospace,monospace">
                    {/* S1: People Chain */}
                    <rect x={40} y={64} width={110} height={32} rx={10} fill="rgba(0,226,255,0.04)" stroke="rgba(0,226,255,0.6)" strokeWidth={1} filter="url(#node-glow-cyan)" />
                    <text x={95} y={76} fontSize={11} fontWeight={700} letterSpacing="0.08em" fill="#00E2FF" textAnchor="middle">PEOPLE CHAIN</text>
                    <text x={95} y={88} fontSize={8} fill="rgba(255,255,255,0.4)" textAnchor="middle">XCM · PAS</text>

                    {/* S2: Asset Hub */}
                    <rect x={40} y={144} width={110} height={32} rx={10} fill="rgba(0,226,255,0.04)" stroke="rgba(0,226,255,0.6)" strokeWidth={1} filter="url(#node-glow-cyan)" />
                    <text x={95} y={156} fontSize={11} fontWeight={700} letterSpacing="0.08em" fill="#00E2FF" textAnchor="middle">ASSET HUB</text>
                    <text x={95} y={168} fontSize={8} fill="rgba(255,255,255,0.4)" textAnchor="middle">PAS · mUSDC</text>

                    {/* S3: Sepolia */}
                    <rect x={40} y={224} width={110} height={32} rx={10} fill="rgba(0,226,255,0.04)" stroke="rgba(0,226,255,0.6)" strokeWidth={1} filter="url(#node-glow-cyan)" />
                    <text x={95} y={236} fontSize={11} fontWeight={700} letterSpacing="0.08em" fill="#00E2FF" textAnchor="middle">SEPOLIA</text>
                    <text x={95} y={248} fontSize={8} fill="rgba(255,255,255,0.4)" textAnchor="middle">ETH</text>

                    {/* S4: Base/Arb */}
                    <rect x={40} y={304} width={110} height={32} rx={10} fill="rgba(0,226,255,0.02)" stroke="rgba(0,226,255,0.4)" strokeWidth={1} />
                    <text x={95} y={316} fontSize={11} fontWeight={700} letterSpacing="0.08em" fill="rgba(0,226,255,0.6)" textAnchor="middle">BASE / ARB</text>
                    <text x={95} y={328} fontSize={8} fill="rgba(255,255,255,0.4)" textAnchor="middle">ETH</text>

                    {/* S5: mUSDC */}
                    <rect x={40} y={384} width={110} height={32} rx={10} fill="rgba(0,226,255,0.01)" stroke="rgba(0,226,255,0.2)" strokeWidth={1} />
                    <text x={95} y={396} fontSize={11} fontWeight={700} letterSpacing="0.08em" fill="rgba(0,226,255,0.4)" textAnchor="middle">mUSDC</text>
                    <text x={95} y={408} fontSize={8} fill="rgba(255,255,255,0.4)" textAnchor="middle">STABLE</text>
                </g>

                {/* --- 6. Zone B: Left Infra Nodes (x=260) --- */}
                <g fontFamily="ui-monospace,monospace">
                    {/* I1: XCM Receiver */}
                    <rect x={260} y={120} width={130} height={44} rx={8} fill="rgba(0,226,255,0.04)" stroke="rgba(0,226,255,0.6)" strokeWidth={1} filter="url(#node-glow-cyan)" />
                    <text x={325} y={138} fontSize={11} fontWeight={700} letterSpacing="0.08em" fill="#00E2FF" textAnchor="middle">XCM RECEIVER</text>
                    <text x={325} y={152} fontSize={8} fill="rgba(255,255,255,0.4)" textAnchor="middle">People Chain → Hub</text>

                    {/* I2: ETH Bridge */}
                    <rect x={260} y={280} width={130} height={44} rx={8} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.55)" strokeWidth={1} filter="url(#node-glow-neutral)" />
                    <text x={325} y={298} fontSize={11} fontWeight={700} letterSpacing="0.08em" fill="rgba(255,255,255,0.8)" textAnchor="middle">ETH BRIDGE</text>
                    <text x={325} y={312} fontSize={8} fill="rgba(255,255,255,0.4)" textAnchor="middle">Custom Hyperbridge</text>

                    {/* I3: Swap Router */}
                    <rect x={260} y={400} width={130} height={44} rx={8} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.55)" strokeWidth={1} filter="url(#node-glow-neutral)" />
                    <text x={325} y={418} fontSize={11} fontWeight={700} letterSpacing="0.08em" fill="rgba(255,255,255,0.8)" textAnchor="middle">SWAP ROUTER</text>
                    <text x={325} y={432} fontSize={8} fill="rgba(255,255,255,0.4)" textAnchor="middle">KredioSwap v1</text>
                </g>


                {/* --- 7. Zone C: Core Engine Module --- */}
                <g fontFamily="ui-monospace,monospace">
                    {/* Connection Pins */}
                    <g fill="url(#pins)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5">
                        {/* Left edge */}
                        {[165, 211, 258, 305, 351, 398, 445].map(y => (
                            <rect key={`cpl-${y}`} x={374} y={y-2} width={12} height={4} rx={1.5} />
                        ))}
                        {/* Right edge */}
                        {[165, 211, 258, 305, 351, 398, 445].map(y => (
                            <rect key={`cpr-${y}`} x={814} y={y-2} width={12} height={4} rx={1.5} />
                        ))}
                        {/* Top edge */}
                        {[410, 458, 507, 556, 605, 653, 702, 751, 800].map(x => (
                            <rect key={`cpt-${x}`} x={x-2} y={120} width={4} height={10} rx={1.5} />
                        ))}
                        {/* Bottom edge */}
                        {[410, 458, 507, 556, 605, 653, 702, 751, 800].map(x => (
                            <rect key={`cpb-${x}`} x={x-2} y={470} width={4} height={10} rx={1.5} />
                        ))}
                    </g>

                    {/* Outer Shell */}
                    <rect x={380} y={130} width={440} height={340} rx={20} fill="rgba(10,10,15,0.92)" stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} filter="url(#cpu-shadow)" />
                    <rect x={382} y={132} width={436} height={336} rx={18} fill="url(#grid)" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />

                    {/* Sub A: Credit Engine */}
                    <g>
                        <rect x={404} y={159} width={182} height={112} rx={12} fill="rgba(139,92,246,0.04)" stroke="rgba(139,92,246,0.35)" />
                        <text x={495} y={195} fontSize={10} fontWeight={700} fill="#8B5CF6" letterSpacing="0.1em" textAnchor="middle">CREDIT ENGINE</text>
                        <text x={495} y={210} fontSize={8} fill="rgba(139,92,246,0.6)" textAnchor="middle">Score · Tiers · LTV</text>
                        <circle cx={410} cy={165} r={1.5} fill="#8B5CF6" /><circle cx={580} cy={165} r={1.5} fill="#8B5CF6" />
                        <circle cx={410} cy={265} r={1.5} fill="#8B5CF6" /><circle cx={580} cy={265} r={1.5} fill="#8B5CF6" />
                    </g>

                    {/* Sub B: Governance */}
                    <g>
                        <rect x={614} y={159} width={182} height={112} rx={12} fill="rgba(56,189,248,0.04)" stroke="rgba(56,189,248,0.35)" />
                        <text x={705} y={195} fontSize={10} fontWeight={700} fill="#38BDF8" letterSpacing="0.1em" textAnchor="middle">GOVERNANCE</text>
                        <text x={705} y={210} fontSize={8} fill="rgba(56,189,248,0.6)" textAnchor="middle">Params · Votes · Cache</text>
                        <circle cx={620} cy={165} r={1.5} fill="#38BDF8" /><circle cx={790} cy={165} r={1.5} fill="#38BDF8" />
                        <circle cx={620} cy={265} r={1.5} fill="#38BDF8" /><circle cx={790} cy={265} r={1.5} fill="#38BDF8" />
                    </g>

                    {/* Sub C: Identity Registry */}
                    <g>
                        <rect x={404} y={299} width={182} height={112} rx={12} fill="rgba(167,139,250,0.04)" stroke="rgba(167,139,250,0.35)" />
                        <text x={495} y={335} fontSize={10} fontWeight={700} fill="#A78BFA" letterSpacing="0.1em" textAnchor="middle">IDENTITY REGISTRY</text>
                        <text x={495} y={350} fontSize={8} fill="rgba(167,139,250,0.6)" textAnchor="middle">KYC · Proofs · Boost</text>
                    </g>

                    {/* Sub D: Risk Oracle */}
                    <g>
                        <rect x={614} y={299} width={182} height={112} rx={12} fill="rgba(34,197,94,0.04)" stroke="rgba(34,197,94,0.35)" />
                        <text x={705} y={335} fontSize={10} fontWeight={700} fill="#22C55E" letterSpacing="0.1em" textAnchor="middle">RISK ORACLE</text>
                        <text x={705} y={350} fontSize={8} fill="rgba(34,197,94,0.6)" textAnchor="middle">PAS/USD · Rates · LTV</text>
                    </g>

                    {/* Center Block Badge */}
                    <g>
                        <rect x={510} y={265} width={180} height={70} rx={12} fill="#060810" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} />
                        <rect x={512} y={267} width={176} height={66} rx={10} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={1} />
                        <text x={600} y={290} fontSize={16} fontWeight={900} fill="#FFFFFF" letterSpacing="0.15em" textAnchor="middle">KREDIO</text>
                        <text x={600} y={307} fontSize={8} fontWeight={600} fill="#8B5CF6" letterSpacing="0.3em" textAnchor="middle">CREDIT ENGINE</text>
                        <text x={600} y={323} fontSize={7} fill="rgba(255,255,255,0.3)" letterSpacing="0.1em" textAnchor="middle">420420417</text>
                    </g>
                </g>

                {/* --- 8. Zone D: Right Infra Nodes (x=840) --- */}
                <g fontFamily="ui-monospace,monospace">
                    {/* O1: Lend Market */}
                    <rect x={840} y={170} width={130} height={44} rx={8} fill="rgba(139,92,246,0.04)" stroke="rgba(139,92,246,0.6)" strokeWidth={1} filter="url(#glow-purple)" />
                    <text x={905} y={188} fontSize={11} fontWeight={700} letterSpacing="0.08em" fill="#8B5CF6" textAnchor="middle">LEND MARKET</text>
                    <text x={905} y={202} fontSize={8} fill="rgba(255,255,255,0.4)" textAnchor="middle">KredioLending v5</text>

                    {/* O2: Borrow Market */}
                    <rect x={840} y={300} width={130} height={44} rx={8} fill="rgba(139,92,246,0.04)" stroke="rgba(139,92,246,0.6)" strokeWidth={1} filter="url(#glow-purple)" />
                    <text x={905} y={318} fontSize={11} fontWeight={700} letterSpacing="0.08em" fill="#8B5CF6" textAnchor="middle">BORROW MARKET</text>
                    <text x={905} y={332} fontSize={8} fill="rgba(255,255,255,0.4)" textAnchor="middle">Tiered LTV · 85% Max</text>

                    {/* O3: PAS Market */}
                    <rect x={840} y={420} width={130} height={44} rx={8} fill="rgba(139,92,246,0.02)" stroke="rgba(139,92,246,0.4)" strokeWidth={1} />
                    <text x={905} y={438} fontSize={11} fontWeight={700} letterSpacing="0.08em" fill="rgba(139,92,246,0.6)" textAnchor="middle">PAS MARKET</text>
                    <text x={905} y={452} fontSize={8} fill="rgba(255,255,255,0.4)" textAnchor="middle">KredioPASMarket v5</text>
                </g>

                {/* --- 9. Zone E: Outcome Destinations (x=1060) --- */}
                <g fontFamily="ui-monospace,monospace">
                    {/* D1: Supply */}
                    <rect x={1060} y={176} width={100} height={32} rx={10} fill="rgba(139,92,246,0.04)" stroke="rgba(139,92,246,0.6)" strokeWidth={1} filter="url(#glow-purple)" />
                    <text x={1110} y={188} fontSize={11} fontWeight={700} letterSpacing="0.08em" fill="#8B5CF6" textAnchor="middle">SUPPLY</text>
                    <text x={1110} y={200} fontSize={8} fill="rgba(255,255,255,0.4)" textAnchor="middle">Earn yield</text>

                    {/* D2: Borrow */}
                    <rect x={1060} y={306} width={100} height={32} rx={10} fill="rgba(139,92,246,0.04)" stroke="rgba(139,92,246,0.6)" strokeWidth={1} filter="url(#glow-purple)" />
                    <text x={1110} y={318} fontSize={11} fontWeight={700} letterSpacing="0.08em" fill="#8B5CF6" textAnchor="middle">BORROW</text>
                    <text x={1110} y={330} fontSize={8} fill="rgba(255,255,255,0.4)" textAnchor="middle">Tiered rates</text>

                    {/* D3: Swap */}
                    <rect x={1060} y={446} width={100} height={32} rx={10} fill="rgba(139,92,246,0.02)" stroke="rgba(139,92,246,0.3)" strokeWidth={1} />
                    <text x={1110} y={458} fontSize={11} fontWeight={700} letterSpacing="0.08em" fill="rgba(139,92,246,0.5)" textAnchor="middle">SWAP/REPAY</text>
                    <text x={1110} y={470} fontSize={8} fill="rgba(255,255,255,0.4)" textAnchor="middle">KredioSwap</text>
                </g>

            </svg>
        </div>
    );
}
