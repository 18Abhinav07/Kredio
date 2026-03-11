'use client';

import { T } from './tokens';

/**
 * FlowCircuit - user-journey circuit diagram.
 * Same visual language as CircuitBoard (L-shaped traces, animated packets,
 * 3D-extruded nodes) but nodes represent the USER'S action flow:
 *
 *  TOP:    XCM Deposits  │  ETH Bridge  │  Identity Boost
 *  CENTER:               KreditAgent (chip)
 *  BOTTOM: PAS Markets   │  Governance  │  Credit Tiers
 */
export default function FlowCircuit() {
    const CX = 450, CY = 252;
    const NW = 138, NH = 52;
    const EX = 6, EY = 7;
    const CHIP_W = 128, CHIP_H = 80;

    const nodes = [
        { id: 'xcm', label: 'XCM Deposits', sub: 'People Chain', color: T.cyan, x: 18, y: 58 },
        { id: 'eth-bridge', label: 'ETH Bridge', sub: '5 EVM Chains', color: '#F59E0B', x: 381, y: 18 },
        { id: 'identity', label: 'Identity Boost', sub: 'On-Chain Proof', color: '#A78BFA', x: 744, y: 58 },
        { id: 'pas-market', label: 'PAS Markets', sub: 'Lend & Borrow', color: '#22C55E', x: 18, y: 408 },
        { id: 'governance', label: 'Governance', sub: 'Vote & Earn', color: '#818CF8', x: 381, y: 468 },
        { id: 'tiers', label: 'Credit Tiers', sub: 'ANON → DIAMOND', color: '#E81CFF', x: 744, y: 408 },
    ];

    const isLeft = (n: typeof nodes[0]) => n.x < 300;
    const isRight = (n: typeof nodes[0]) => n.x > 600;
    const isTop = (n: typeof nodes[0]) => !isLeft(n) && !isRight(n) && n.y < 300;
    const isBottom = (n: typeof nodes[0]) => !isLeft(n) && !isRight(n) && n.y >= 300;

    const port = (n: typeof nodes[0]) => {
        if (isLeft(n)) return { px: n.x + NW, py: n.y + NH / 2 };
        if (isRight(n)) return { px: n.x, py: n.y + NH / 2 };
        if (isTop(n)) return { px: n.x + NW / 2, py: n.y + NH };
        return { px: n.x + NW / 2, py: n.y };
    };

    const chipPort = (n: typeof nodes[0]) => {
        if (isLeft(n)) return { cx: CX - CHIP_W / 2, cy: CY };
        if (isRight(n)) return { cx: CX + CHIP_W / 2, cy: CY };
        if (isTop(n)) return { cx: CX, cy: CY - CHIP_H / 2 };
        return { cx: CX, cy: CY + CHIP_H / 2 };
    };

    const tracePath = (n: typeof nodes[0]) => {
        const { px, py } = port(n);
        const { cx, cy } = chipPort(n);
        if (isLeft(n) || isRight(n)) return `M ${px} ${py} L ${cx} ${py} L ${cx} ${cy}`;
        return `M ${px} ${py} L ${px} ${cy} L ${cx} ${cy}`;
    };

    const pillLabels = [
        { idx: 0, label: 'XCM Transfer', frac: 0.38 },
        { idx: 1, label: 'mUSDC Mint', frac: 0.34 },
        { idx: 2, label: 'Score Boost', frac: 0.38 },
        { idx: 3, label: 'Borrow PAS', frac: 0.38 },
        { idx: 4, label: 'Vote History', frac: 0.34 },
        { idx: 5, label: 'Tier Unlock', frac: 0.38 },
    ];

    const pillPos = (n: typeof nodes[0], frac: number) => {
        const { px, py } = port(n);
        const { cx, cy } = chipPort(n);
        if (isLeft(n) || isRight(n)) {
            const s1 = Math.abs(cx - px), s2 = Math.abs(cy - py), tot = s1 + s2, d = tot * frac;
            if (d <= s1) return { x: px + (cx - px) * (d / (s1 || 1)), y: py };
            return { x: cx, y: py + (cy - py) * ((d - s1) / (s2 || 1)) };
        }
        const s1 = Math.abs(cy - py), s2 = Math.abs(cx - px), tot = s1 + s2, d = tot * frac;
        if (d <= s1) return { x: px, y: py + (cy - py) * (d / (s1 || 1)) };
        return { x: px + (cx - px) * ((d - s1) / (s2 || 1)), y: cy };
    };

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <style>{`
                @keyframes fcBreathe { 0%,100%{opacity:.38} 50%{opacity:1}   }
                @keyframes fcPulse1  { 0%{r:40;opacity:.5}  100%{r:85;opacity:0}  }
                @keyframes fcPulse2  { 0%{r:40;opacity:.28} 100%{r:105;opacity:0} }
                @keyframes fcPulse3  { 0%{r:40;opacity:.16} 100%{r:125;opacity:0} }
                @keyframes fcDash    { to{stroke-dashoffset:-56} }
                @keyframes fcFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
                .fc-breathe { animation: fcBreathe 3.5s ease-in-out infinite; }
                .fc-p1      { animation: fcPulse1  4.2s ease-out  infinite; }
                .fc-p2      { animation: fcPulse2  4.2s ease-out  infinite; animation-delay:1.4s; }
                .fc-p3      { animation: fcPulse3  4.2s ease-out  infinite; animation-delay:2.8s; }
                .fc-dot     { animation: fcBreathe 2.2s ease-in-out infinite; }
                .fc-float   { animation: fcFloat   6s   ease-in-out infinite; }
            `}</style>

            <svg viewBox="0 0 900 540" style={{ width: '100%', height: 'auto', overflow: 'visible', maxWidth: '100%' }}>
                <defs>
                    {nodes.map(n => (
                        <filter key={`fc-gf-${n.id}`} id={`fc-gf-${n.id}`} x="-80%" y="-80%" width="260%" height="260%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                    ))}
                    <filter id="fc-chip-gf" x="-120%" y="-120%" width="340%" height="340%">
                        <feGaussianBlur stdDeviation="18" result="b1" />
                        <feMerge><feMergeNode in="b1" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="fc-node-shadow" x="-20%" y="-20%" width="160%" height="180%">
                        <feDropShadow dx={EX} dy={EY} stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
                    </filter>
                    <radialGradient id="fc-floor" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={T.cyan} stopOpacity="0.06" />
                        <stop offset="55%" stopColor="#818CF8" stopOpacity="0.03" />
                        <stop offset="100%" stopColor="#000" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="fc-chip-top" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.11)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
                    </linearGradient>
                    <linearGradient id="fc-side-r" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(0,0,0,0.7)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
                    </linearGradient>
                    <linearGradient id="fc-side-b" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(0,0,0,0.6)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
                    </linearGradient>
                    {nodes.map(n => (
                        <linearGradient key={`fc-ng-${n.id}`} id={`fc-ng-${n.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={n.color} stopOpacity="0.18" />
                            <stop offset="100%" stopColor={n.color} stopOpacity="0.02" />
                        </linearGradient>
                    ))}
                    {nodes.map(n => (
                        <linearGradient key={`fc-nse-${n.id}`} id={`fc-nse-${n.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={n.color} stopOpacity="0.14" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
                        </linearGradient>
                    ))}
                </defs>

                {/* Floor glow */}
                <ellipse cx={CX + EX * 2} cy={CY + CHIP_H + 55} rx={310} ry={65} fill="url(#fc-floor)" opacity={0.75} />

                {/* Traces */}
                {nodes.map((n, i) => (
                    <g key={`fc-tr-${n.id}`}>
                        <path d={tracePath(n)} fill="none" stroke={n.color} strokeWidth={4} strokeOpacity={0.05} strokeLinecap="round" />
                        <path d={tracePath(n)} fill="none" stroke={n.color} strokeWidth={1.5} strokeOpacity={0.17} strokeLinecap="round" />
                        <path d={tracePath(n)} fill="none" stroke={n.color} strokeWidth={1} strokeOpacity={0.55} strokeLinecap="round"
                            strokeDasharray="6 50"
                            style={{ animation: `fcDash ${2.5 + i * 0.2}s linear infinite`, animationDelay: `${i * 0.52}s`, strokeDashoffset: 0 }}
                        />
                    </g>
                ))}

                {/* Hidden paths for animateMotion */}
                {nodes.map((n, i) => (
                    <path key={`fc-hp-${i}`} id={`fcp-${i}`} d={tracePath(n)} fill="none" stroke="none" />
                ))}

                {/* Animated packets */}
                {nodes.map((n, i) => (
                    <circle key={`fc-pkt-${n.id}`} r={5} fill={n.color} filter={`url(#fc-gf-${n.id})`}>
                        <animateMotion dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.52}s`}
                            keyPoints={isBottom(nodes[i]) || isRight(nodes[i]) ? '1;0' : '0;1'}
                            keyTimes="0;1" calcMode="linear">
                            <mpath xlinkHref={`#fcp-${i}`} />
                        </animateMotion>
                    </circle>
                ))}

                {/* Pill labels */}
                {pillLabels.map((p, i) => {
                    const pos = pillPos(nodes[p.idx], p.frac);
                    return (
                        <g key={`fc-pill-${i}`} transform={`translate(${pos.x},${pos.y})`}>
                            <rect x={-38} y={-10} width={76} height={20} rx={10} fill="rgba(0,0,0,0.5)" transform={`translate(${EX * 0.5},${EY * 0.5})`} />
                            <rect x={-38} y={-10} width={76} height={20} rx={10} fill="#0a0b0e" stroke={nodes[p.idx].color} strokeOpacity={0.32} strokeWidth={0.8} />
                            <rect x={-37} y={-9} width={74} height={1} rx={1} fill="rgba(255,255,255,0.06)" />
                            <text x={0} y={4} textAnchor="middle" fontSize={7.5} fill={nodes[p.idx].color} fontFamily="ui-monospace,monospace" letterSpacing={0.5}>
                                {p.label}
                            </text>
                        </g>
                    );
                })}

                {/* Center chip - KreditAgent */}
                <g className="fc-float">
                    <circle cx={CX} cy={CY} r={40} fill="none" stroke={T.cyan} strokeWidth={1.2} strokeOpacity={0} className="fc-p1" />
                    <circle cx={CX} cy={CY} r={40} fill="none" stroke="#818CF8" strokeWidth={0.8} strokeOpacity={0} className="fc-p2" />
                    <circle cx={CX} cy={CY} r={40} fill="none" stroke={T.pink} strokeWidth={0.5} strokeOpacity={0} className="fc-p3" />

                    {/* Extrusion sides */}
                    <polygon points={`${CX + CHIP_W / 2},${CY - CHIP_H / 2} ${CX + CHIP_W / 2 + EX},${CY - CHIP_H / 2 + EY} ${CX + CHIP_W / 2 + EX},${CY + CHIP_H / 2 + EY} ${CX + CHIP_W / 2},${CY + CHIP_H / 2}`} fill="url(#fc-side-r)" />
                    <polygon points={`${CX - CHIP_W / 2},${CY + CHIP_H / 2} ${CX + CHIP_W / 2},${CY + CHIP_H / 2} ${CX + CHIP_W / 2 + EX},${CY + CHIP_H / 2 + EY} ${CX - CHIP_W / 2 + EX},${CY + CHIP_H / 2 + EY}`} fill="url(#fc-side-b)" />

                    {/* Ambient glow */}
                    <rect x={CX - CHIP_W / 2} y={CY - CHIP_H / 2} width={CHIP_W} height={CHIP_H} rx={10}
                        fill="none" stroke={T.cyan} strokeWidth={1} strokeOpacity={0.14}
                        filter="url(#fc-chip-gf)" className="fc-breathe" />

                    {/* Main body */}
                    <rect x={CX - CHIP_W / 2} y={CY - CHIP_H / 2} width={CHIP_W} height={CHIP_H} rx={10}
                        fill="#0b0d10" stroke="rgba(255,255,255,0.13)" strokeWidth={1.2} />
                    <rect x={CX - CHIP_W / 2} y={CY - CHIP_H / 2} width={CHIP_W} height={CHIP_H} rx={10} fill="url(#fc-chip-top)" />
                    <line x1={CX - CHIP_W / 2 + 12} y1={CY - CHIP_H / 2 + 1} x2={CX + CHIP_W / 2 - 12} y2={CY - CHIP_H / 2 + 1} stroke="rgba(255,255,255,0.16)" strokeWidth={0.8} />

                    {/* Grid */}
                    {[-24, -8, 8, 24].map((o, i) => <line key={`fcl-${i}`} x1={CX - CHIP_W / 2 + 8} y1={CY + o} x2={CX + CHIP_W / 2 - 8} y2={CY + o} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />)}
                    {[-44, -22, 0, 22, 44].map((o, i) => <line key={`fcv-${i}`} x1={CX + o} y1={CY - CHIP_H / 2 + 8} x2={CX + o} y2={CY + CHIP_H / 2 - 8} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />)}

                    {/* Labels */}
                    <text x={CX} y={CY - 8} textAnchor="middle" fontSize={11} fill="rgba(255,255,255,0.82)" fontFamily="ui-monospace,monospace" letterSpacing={2.5} fontWeight="700">KREDIT</text>
                    <text x={CX} y={CY + 9} textAnchor="middle" fontSize={8.5} fill={T.cyan} fontFamily="ui-monospace,monospace" letterSpacing={2}>AGENT</text>
                    <text x={CX} y={CY + 23} textAnchor="middle" fontSize={6.5} fill="#475569" fontFamily="ui-monospace,monospace" letterSpacing={1.5}>ink! · Asset Hub</text>

                    {/* Pins */}
                    {[-48, -24, 0, 24, 48].map((x, i) => <rect key={`fcpt-${i}`} x={CX + x - 2} y={CY - CHIP_H / 2 - 6} width={4} height={7} rx={1} fill="rgba(255,255,255,0.18)" />)}
                    {[-48, -24, 0, 24, 48].map((x, i) => (
                        <g key={`fcpb-${i}`}>
                            <rect x={CX + x - 2} y={CY + CHIP_H / 2} width={4} height={7} rx={1} fill="rgba(0,0,0,0.45)" />
                            <rect x={CX + x - 2 + EX} y={CY + CHIP_H / 2 + EY} width={4} height={3} rx={1} fill="rgba(0,0,0,0.6)" />
                        </g>
                    ))}
                    {[-26, 0, 26].map((y, i) => (
                        <g key={`fcps-${i}`}>
                            <rect x={CX - CHIP_W / 2 - 6} y={CY + y - 2} width={7} height={4} rx={1} fill="rgba(255,255,255,0.18)" />
                            <rect x={CX + CHIP_W / 2} y={CY + y - 2} width={7} height={4} rx={1} fill="rgba(255,255,255,0.11)" />
                        </g>
                    ))}
                </g>

                {/* Node cards */}
                {nodes.map(n => (
                    <g key={`fc-nd-${n.id}`} transform={`translate(${n.x},${n.y})`} filter="url(#fc-node-shadow)">
                        <polygon points={`${NW},0 ${NW + EX},${EY} ${NW + EX},${NH + EY} ${NW},${NH}`} fill={`url(#fc-nse-${n.id})`} opacity={0.75} />
                        <polygon points={`0,${NH} ${NW},${NH} ${NW + EX},${NH + EY} ${EX},${NH + EY}`} fill="rgba(0,0,0,0.52)" />
                        <rect x={-5} y={-5} width={NW + 10} height={NH + 10} rx={12} fill={`url(#fc-ng-${n.id})`} />
                        <rect x={0} y={0} width={NW} height={NH} rx={9} fill="#0b0d10" stroke={n.color} strokeWidth={0.7} strokeOpacity={0.44} />
                        <line x1={9} y1={1} x2={NW - 9} y2={1} stroke="rgba(255,255,255,0.11)" strokeWidth={0.8} />
                        <line x1={1} y1={9} x2={1} y2={NH - 9} stroke="rgba(255,255,255,0.07)" strokeWidth={0.8} />
                        <line x1={9} y1={NH - 1} x2={NW - 9} y2={NH - 1} stroke="rgba(0,0,0,0.38)" strokeWidth={0.6} />
                        <rect x={0} y={0} width={3.5} height={NH} rx={2} fill={n.color} fillOpacity={0.8} />
                        <circle cx={NW - 14} cy={18} r={3.5} fill={n.color} fillOpacity={0.95} />
                        <circle cx={NW - 14} cy={18} r={7} fill={n.color} fillOpacity={0.11} className="fc-dot" />
                        <text x={14} y={21} fontSize={10} fontWeight="700" fill="#F8FAFC" fontFamily="ui-monospace,monospace" letterSpacing={0.2}>{n.label}</text>
                        <text x={14} y={37} fontSize={8} fill="#64748B" fontFamily="ui-monospace,monospace">{n.sub}</text>
                    </g>
                ))}
            </svg>
        </div>
    );
}
