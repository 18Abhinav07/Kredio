(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/landing-modules/tokens.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GLASS",
    ()=>GLASS,
    "LABEL_STYLE",
    ()=>LABEL_STYLE,
    "SECTION",
    ()=>SECTION,
    "T",
    ()=>T
]);
const T = {
    pink: '#E81CFF',
    cyan: '#00E2FF',
    border: 'rgba(255,255,255,0.07)',
    borderH: 'rgba(255,255,255,0.14)',
    muted: '#94A3B8',
    sub: '#CBD5E1',
    dim: '#E2E8F0',
    white: '#F8FAFC'
};
const GLASS = {
    borderRadius: '14px',
    border: '1px solid rgba(255,255,255,0.07)',
    background: 'rgba(0,0,0,0.22)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)'
};
const SECTION = {
    minHeight: '100vh',
    scrollSnapAlign: 'start',
    scrollSnapStop: 'always',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '64px',
    paddingBottom: '32px',
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: '100%'
};
const LABEL_STYLE = {
    fontSize: '9px',
    fontFamily: 'ui-monospace,monospace',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: '#CBD5E1',
    marginBottom: '14px'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing-modules/HeroSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroSection",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/tokens.ts [app-client] (ecmascript)");
'use client';
;
;
;
// Staggered animation sequence for the hero elements
const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};
const itemFadeUp = {
    hidden: {
        opacity: 0,
        y: 30,
        filter: 'blur(8px)'
    },
    show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: [
                0.22,
                1,
                0.36,
                1
            ]
        }
    }
};
function HeroSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION"],
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
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
            `
            }, void 0, false, {
                fileName: "[project]/components/landing-modules/HeroSection.tsx",
                lineNumber: 16,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hero-orb-1",
                style: {
                    position: 'absolute',
                    top: '20%',
                    left: '35%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(0,226,255,0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }
            }, void 0, false, {
                fileName: "[project]/components/landing-modules/HeroSection.tsx",
                lineNumber: 44,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hero-orb-2",
                style: {
                    position: 'absolute',
                    top: '30%',
                    right: '35%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(232,28,255,0.12) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }
            }, void 0, false, {
                fileName: "[project]/components/landing-modules/HeroSection.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: "hidden",
                animate: "show",
                variants: container,
                style: {
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: itemFadeUp,
                        style: {
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            background: 'rgba(255,255,255,0.02)',
                            fontSize: '10px',
                            letterSpacing: '0.2em',
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].dim,
                            fontFamily: 'ui-monospace,monospace',
                            marginBottom: '40px',
                            backdropFilter: 'blur(10px)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "live-dot",
                                style: {
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: '#22C55E',
                                    boxShadow: '0 0 12px #22C55E',
                                    display: 'inline-block',
                                    flexShrink: 0
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/landing-modules/HeroSection.tsx",
                                lineNumber: 52,
                                columnNumber: 21
                            }, this),
                            "LIVE ON POLKADOT TESTNET"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing-modules/HeroSection.tsx",
                        lineNumber: 51,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                        variants: itemFadeUp,
                        style: {
                            fontSize: 'clamp(56px, 8vw, 112px)',
                            fontWeight: 700,
                            lineHeight: 0.95,
                            letterSpacing: '-0.05em',
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].white,
                            marginBottom: '32px'
                        },
                        children: [
                            "Fair Credit",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/components/landing-modules/HeroSection.tsx",
                                lineNumber: 58,
                                columnNumber: 32
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: 'transparent',
                                    WebkitTextStroke: '1.5px rgba(255,255,255,0.3)'
                                },
                                children: "on Polkadot."
                            }, void 0, false, {
                                fileName: "[project]/components/landing-modules/HeroSection.tsx",
                                lineNumber: 59,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing-modules/HeroSection.tsx",
                        lineNumber: 57,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                        variants: itemFadeUp,
                        style: {
                            fontSize: 'clamp(16px, 2vw, 20px)',
                            lineHeight: 1.7,
                            color: '#E2E8F0',
                            maxWidth: '520px',
                            marginBottom: '80px',
                            fontWeight: 400
                        },
                        children: [
                            "Fund from any chain. Participate in governance.",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/components/landing-modules/HeroSection.tsx",
                                lineNumber: 64,
                                columnNumber: 68
                            }, this),
                            "Unlock institutional-grade tiered borrowing."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing-modules/HeroSection.tsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: itemFadeUp,
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '16px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '9px',
                                    fontFamily: 'ui-monospace,monospace',
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].muted,
                                    letterSpacing: '4px',
                                    textTransform: 'uppercase'
                                },
                                children: "EXPLORE TOPOLOGY"
                            }, void 0, false, {
                                fileName: "[project]/components/landing-modules/HeroSection.tsx",
                                lineNumber: 70,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-scroll-1",
                                        style: {
                                            width: 1.5,
                                            height: 18,
                                            background: 'rgba(255,255,255,0.3)',
                                            borderRadius: 2
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/HeroSection.tsx",
                                        lineNumber: 72,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-scroll-2",
                                        style: {
                                            width: 1.5,
                                            height: 18,
                                            background: 'rgba(255,255,255,0.3)',
                                            borderRadius: 2
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/HeroSection.tsx",
                                        lineNumber: 73,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-scroll-3",
                                        style: {
                                            width: 1.5,
                                            height: 18,
                                            background: 'rgba(255,255,255,0.3)',
                                            borderRadius: 2
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/HeroSection.tsx",
                                        lineNumber: 74,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/landing-modules/HeroSection.tsx",
                                lineNumber: 71,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing-modules/HeroSection.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/HeroSection.tsx",
                lineNumber: 48,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing-modules/HeroSection.tsx",
        lineNumber: 15,
        columnNumber: 9
    }, this);
}
_c = HeroSection;
var _c;
__turbopack_context__.k.register(_c, "HeroSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing-modules/CpuCircuit.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CpuCircuit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
function CpuCircuit({ className = "", width = "100%", height = "100%" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'relative',
            width: '100%',
            height: '100%'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: className,
            width: width,
            height: height,
            viewBox: "0 0 1200 600",
            style: {
                overflow: 'visible',
                userSelect: 'none'
            },
            preserveAspectRatio: "xMidYMid meet",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                            id: "pins",
                            x1: "0",
                            y1: "0",
                            x2: "1",
                            y2: "0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "0%",
                                    stopColor: "#334155"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 29,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "100%",
                                    stopColor: "#0f172a"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 30,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 28,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                            id: "grid",
                            width: "20",
                            height: "20",
                            patternUnits: "userSpaceOnUse",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M 20 0 L 0 0 0 20",
                                fill: "none",
                                stroke: "rgba(255,255,255,0.02)",
                                strokeWidth: "1"
                            }, void 0, false, {
                                fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                lineNumber: 34,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 33,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 27,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    fill: "none",
                    stroke: "rgba(255,255,255,0.02)",
                    strokeWidth: "1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 40 30 H 1160"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 40,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 40 570 H 1160"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 41,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 230 30 V 570"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 42,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 620 30 V 100"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 43,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 620 500 V 570"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 44,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 880 30 V 570"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 45,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 39,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    fill: "none",
                    stroke: "rgba(255,255,255,0.06)",
                    strokeWidth: "1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 20 60 V 20 H 60"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 48,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 1180 60 V 20 H 1140"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 49,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 20 540 V 580 H 60"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 50,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 1180 540 V 580 H 1140"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 51,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 47,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    fill: "none",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            id: "p1",
                            d: "M 150 80 H 190 Q 200 80 200 90 V 132 Q 200 142 210 142 H 230",
                            stroke: "#00E2FF",
                            opacity: 0.3
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 57,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            id: "p2",
                            d: "M 150 160 H 190 Q 200 160 200 150 V 152 Q 200 142 210 142 H 230",
                            stroke: "#00E2FF",
                            opacity: 0.3
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 58,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            id: "p3",
                            d: "M 150 240 H 190 Q 200 240 200 250 V 292 Q 200 302 210 302 H 230",
                            stroke: "#00E2FF",
                            opacity: 0.3
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 59,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            id: "p4",
                            d: "M 150 320 H 190 Q 200 320 200 310 V 312 Q 200 302 210 302 H 230",
                            stroke: "#00E2FF",
                            opacity: 0.2
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 60,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            id: "p5",
                            d: "M 150 400 H 190 Q 200 400 200 410 V 412 Q 200 422 210 422 H 230",
                            stroke: "#00E2FF",
                            opacity: 0.2
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 61,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            id: "p6",
                            d: "M 360 142 H 420",
                            stroke: "#00E2FF",
                            opacity: 0.4
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 64,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            id: "p7",
                            d: "M 360 302 H 420",
                            stroke: "rgba(255,255,255,0.4)",
                            opacity: 0.4
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 65,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            id: "p8",
                            d: "M 360 422 H 420",
                            stroke: "rgba(255,255,255,0.4)",
                            opacity: 0.4
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 66,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            id: "p9",
                            d: "M 820 192 H 880",
                            stroke: "#8B5CF6",
                            opacity: 0.4
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 69,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            id: "p10",
                            d: "M 820 322 H 880",
                            stroke: "#8B5CF6",
                            opacity: 0.4
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 70,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            id: "p11",
                            d: "M 820 442 H 880",
                            stroke: "#8B5CF6",
                            opacity: 0.4
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 71,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            id: "p12",
                            d: "M 1010 192 H 1060",
                            stroke: "#8B5CF6",
                            opacity: 0.3
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 74,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            id: "p13",
                            d: "M 1010 322 H 1060",
                            stroke: "#8B5CF6",
                            opacity: 0.3
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 75,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            id: "p14",
                            d: "M 1010 442 H 1060",
                            stroke: "#8B5CF6",
                            opacity: 0.3
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 76,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            id: "p15",
                            d: "M 1160 458 H 1175 Q 1185 458 1185 468 V 570 Q 1185 580 1175 580 H 30 Q 20 580 20 570 V 90 Q 20 80 30 80 H 40",
                            stroke: "#8B5CF6",
                            opacity: 0.2,
                            strokeDasharray: "4 6"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 79,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 55,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    fill: "none",
                    stroke: "rgba(255,255,255,0.06)",
                    strokeWidth: "1",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 420 142 H 440"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 85,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 420 302 H 520"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 86,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 420 422 H 440"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 87,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 800 192 H 820"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 90,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 720 322 H 820"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 91,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 800 442 H 820"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 92,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 500 180 Q 500 192 520 192"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 95,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 740 180 Q 740 192 720 192"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 96,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 83,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 160 30 H 1160",
                            stroke: "rgba(255,255,255,0.05)",
                            strokeWidth: "1",
                            strokeDasharray: "2 4",
                            fill: "none"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 101,
                            columnNumber: 21
                        }, this),
                        [
                            {
                                title: 'ANON',
                                x: 160,
                                color: '#64748B'
                            },
                            {
                                title: 'BRONZE',
                                x: 360,
                                color: '#CD7F32'
                            },
                            {
                                title: 'SILVER',
                                x: 560,
                                color: '#C0C0C0'
                            },
                            {
                                title: 'GOLD',
                                x: 760,
                                color: '#FFD700'
                            },
                            {
                                title: 'PLATINUM',
                                x: 960,
                                color: '#E5E4E2'
                            },
                            {
                                title: 'DIAMOND',
                                x: 1160,
                                color: '#B9F2FF'
                            }
                        ].map((t, i)=>{
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: t.x,
                                        cy: 30,
                                        r: 3.5,
                                        fill: "none",
                                        stroke: t.color,
                                        strokeWidth: 1,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                            attributeName: "opacity",
                                            values: "0.2; 1; 0.2; 0.2; 0.2; 0.2; 0.2".split(';').map((v, idx)=>idx === i ? "1" : "0.2").join(';'),
                                            keyTimes: "0; 0.16; 0.33; 0.5; 0.66; 0.83; 1",
                                            dur: "12s",
                                            repeatCount: "indefinite"
                                        }, void 0, false, {
                                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                            lineNumber: 114,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                        lineNumber: 113,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                        x: t.x,
                                        y: 48,
                                        fontSize: 8,
                                        fill: t.color,
                                        textAnchor: "middle",
                                        fontFamily: "ui-monospace,monospace",
                                        letterSpacing: "0.05em",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                attributeName: "opacity",
                                                values: "0.4; 1; 0.4; 0.4; 0.4; 0.4; 0.4".split(';').map((v, idx)=>idx === i ? "1" : "0.4").join(';'),
                                                keyTimes: "0; 0.16; 0.33; 0.5; 0.66; 0.83; 1",
                                                dur: "12s",
                                                repeatCount: "indefinite"
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                                lineNumber: 117,
                                                columnNumber: 37
                                            }, this),
                                            t.title
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                        lineNumber: 116,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, t.title, true, {
                                fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                lineNumber: 112,
                                columnNumber: 29
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 100,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                    x: 620,
                    y: 590,
                    fontSize: 8,
                    fill: "rgba(255,255,255,0.25)",
                    textAnchor: "middle",
                    letterSpacing: "0.15em",
                    fontFamily: "ui-monospace,monospace",
                    children: "REPAY → SCORE HISTORY → TIER UPGRADE"
                }, void 0, false, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 125,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    r: "2",
                    fill: "#00E2FF",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animateMotion", {
                        dur: "2.4s",
                        repeatCount: "indefinite",
                        begin: "0s",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mpath", {
                            href: "#p1"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 128,
                            columnNumber: 108
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                        lineNumber: 128,
                        columnNumber: 46
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 128,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    r: "2",
                    fill: "#00E2FF",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animateMotion", {
                        dur: "2.4s",
                        repeatCount: "indefinite",
                        begin: "0.8s",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mpath", {
                            href: "#p2"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 129,
                            columnNumber: 110
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                        lineNumber: 129,
                        columnNumber: 46
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 129,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    r: "2",
                    fill: "#00E2FF",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animateMotion", {
                        dur: "2.8s",
                        repeatCount: "indefinite",
                        begin: "0.4s",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mpath", {
                            href: "#p3"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 130,
                            columnNumber: 110
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                        lineNumber: 130,
                        columnNumber: 46
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 130,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    r: "2",
                    fill: "#00E2FF",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animateMotion", {
                        dur: "1s",
                        repeatCount: "indefinite",
                        begin: "0s",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mpath", {
                            href: "#p6"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 132,
                            columnNumber: 106
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                        lineNumber: 132,
                        columnNumber: 46
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 132,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    r: "2",
                    fill: "#FFFFFF",
                    opacity: "0.8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animateMotion", {
                        dur: "1.2s",
                        repeatCount: "indefinite",
                        begin: "0.5s",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mpath", {
                            href: "#p7"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 133,
                            columnNumber: 124
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                        lineNumber: 133,
                        columnNumber: 60
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 133,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    r: "2",
                    fill: "#8B5CF6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animateMotion", {
                        dur: "1s",
                        repeatCount: "indefinite",
                        begin: "0.2s",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mpath", {
                            href: "#p10"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 135,
                            columnNumber: 108
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                        lineNumber: 135,
                        columnNumber: 46
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 135,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    r: "2",
                    fill: "#8B5CF6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animateMotion", {
                        dur: "1.4s",
                        repeatCount: "indefinite",
                        begin: "0.7s",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mpath", {
                            href: "#p12"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 136,
                            columnNumber: 110
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                        lineNumber: 136,
                        columnNumber: 46
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 136,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    r: "2",
                    fill: "#8B5CF6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animateMotion", {
                        dur: "1.4s",
                        repeatCount: "indefinite",
                        begin: "0.3s",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mpath", {
                            href: "#p13"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 137,
                            columnNumber: 110
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                        lineNumber: 137,
                        columnNumber: 46
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 137,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    fontFamily: "ui-monospace,monospace",
                    children: [
                        {
                            y: 64,
                            title: 'PEOPLE CHAIN',
                            sub: 'XCM · PAS'
                        },
                        {
                            y: 144,
                            title: 'ASSET HUB',
                            sub: 'PAS · mUSDC'
                        },
                        {
                            y: 224,
                            title: 'SEPOLIA',
                            sub: 'ETH'
                        },
                        {
                            y: 304,
                            title: 'BASE / ARB',
                            sub: 'ETH'
                        },
                        {
                            y: 384,
                            title: 'mUSDC',
                            sub: 'STABLE'
                        }
                    ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: 40,
                                    y: s.y,
                                    width: 110,
                                    height: 32,
                                    rx: 4,
                                    fill: "rgba(0,226,255,0.02)",
                                    stroke: "rgba(0,226,255,0.15)",
                                    strokeWidth: 1
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 149,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: 95,
                                    y: s.y + 13,
                                    fontSize: 10,
                                    fontWeight: 600,
                                    letterSpacing: "0.05em",
                                    fill: "rgba(0,226,255,0.8)",
                                    textAnchor: "middle",
                                    children: s.title
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 150,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: 95,
                                    y: s.y + 24,
                                    fontSize: 7,
                                    fill: "rgba(255,255,255,0.4)",
                                    textAnchor: "middle",
                                    children: s.sub
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 151,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 148,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 140,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    fontFamily: "ui-monospace,monospace",
                    children: [
                        {
                            y: 120,
                            title: 'XCM RECEIVER',
                            sub: 'Cross-chain Sync'
                        },
                        {
                            y: 280,
                            title: 'ETH BRIDGE',
                            sub: 'Hyperbridge Msg'
                        },
                        {
                            y: 400,
                            title: 'SWAP ROUTER',
                            sub: 'KredioSwap Core'
                        }
                    ].map((n, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: 230,
                                    y: n.y,
                                    width: 130,
                                    height: 44,
                                    rx: 6,
                                    fill: "rgba(0,226,255,0.02)",
                                    stroke: "rgba(0,226,255,0.2)",
                                    strokeWidth: 1
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 164,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: 295,
                                    y: n.y + 19,
                                    fontSize: 10,
                                    fontWeight: 600,
                                    letterSpacing: "0.05em",
                                    fill: "#00E2FF",
                                    textAnchor: "middle",
                                    children: n.title
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 165,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: 295,
                                    y: n.y + 32,
                                    fontSize: 7,
                                    fill: "rgba(255,255,255,0.4)",
                                    textAnchor: "middle",
                                    children: n.sub
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 166,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 163,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 157,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    fontFamily: "ui-monospace,monospace",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            fill: "url(#pins)",
                            stroke: "rgba(255,255,255,0.05)",
                            strokeWidth: "0.5",
                            children: [
                                165,
                                231,
                                298,
                                364,
                                431
                            ].map((y)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: 415,
                                            y: y - 2,
                                            width: 10,
                                            height: 4,
                                            rx: 1
                                        }, void 0, false, {
                                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                            lineNumber: 177,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: 815,
                                            y: y - 2,
                                            width: 10,
                                            height: 4,
                                            rx: 1
                                        }, void 0, false, {
                                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                            lineNumber: 178,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, y, true, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 176,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 174,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            x: 420,
                            y: 100,
                            width: 400,
                            height: 400,
                            rx: 16,
                            fill: "#03040B",
                            stroke: "rgba(255,255,255,0.05)",
                            strokeWidth: 1,
                            style: {
                                filter: 'drop-shadow(0px 16px 24px rgba(0,0,0,0.8))'
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 184,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            x: 422,
                            y: 102,
                            width: 396,
                            height: 396,
                            rx: 14,
                            fill: "url(#grid)",
                            stroke: "none"
                        }, void 0, false, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 185,
                            columnNumber: 21
                        }, this),
                        [
                            {
                                x: 440,
                                y: 120,
                                c: '#34D399',
                                t: 'KREDIT AGENT',
                                s: 'Deterministic Score'
                            },
                            {
                                x: 640,
                                y: 120,
                                c: '#00E2FF',
                                t: 'NEURAL SCORER',
                                s: 'Anomaly Inference'
                            },
                            {
                                x: 440,
                                y: 350,
                                c: '#F59E0B',
                                t: 'RISK ASSESSOR',
                                s: 'Volatility Engine'
                            },
                            {
                                x: 640,
                                y: 350,
                                c: '#F472B6',
                                t: 'YIELD MIND',
                                s: 'Capital Routing'
                            }
                        ].map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: m.x,
                                        y: m.y,
                                        width: 160,
                                        height: 70,
                                        rx: 6,
                                        fill: "rgba(255,255,255,0.02)",
                                        stroke: "rgba(255,255,255,0.1)",
                                        strokeWidth: 1
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                        lineNumber: 195,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                        x: m.x + 80,
                                        y: m.y + 30,
                                        fontSize: 9,
                                        fontWeight: 700,
                                        fill: m.c,
                                        letterSpacing: "0.1em",
                                        textAnchor: "middle",
                                        children: m.t
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                        lineNumber: 196,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                        x: m.x + 80,
                                        y: m.y + 44,
                                        fontSize: 7,
                                        fill: "rgba(255,255,255,0.4)",
                                        textAnchor: "middle",
                                        children: m.s
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                        lineNumber: 197,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: m.x + 4,
                                        y: m.y + 4,
                                        width: 2,
                                        height: 2,
                                        fill: m.c,
                                        opacity: 0.5
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                        lineNumber: 198,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: m.x + 154,
                                        y: m.y + 4,
                                        width: 2,
                                        height: 2,
                                        fill: m.c,
                                        opacity: 0.5
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                        lineNumber: 199,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: m.x + 4,
                                        y: m.y + 64,
                                        width: 2,
                                        height: 2,
                                        fill: m.c,
                                        opacity: 0.5
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                        lineNumber: 200,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: m.x + 154,
                                        y: m.y + 64,
                                        width: 2,
                                        height: 2,
                                        fill: m.c,
                                        opacity: 0.5
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                        lineNumber: 201,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                lineNumber: 194,
                                columnNumber: 25
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: 520,
                                    y: 260,
                                    width: 200,
                                    height: 80,
                                    rx: 8,
                                    fill: "#05060A",
                                    stroke: "#1E293B",
                                    strokeWidth: 1
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 207,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: 522,
                                    y: 262,
                                    width: 196,
                                    height: 76,
                                    rx: 6,
                                    fill: "url(#grid)",
                                    stroke: "none"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 208,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: 620,
                                    y: 296,
                                    fontSize: 14,
                                    fontWeight: 800,
                                    fill: "#FFFFFF",
                                    letterSpacing: "0.15em",
                                    textAnchor: "middle",
                                    children: "KREDIO"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 209,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: 620,
                                    y: 312,
                                    fontSize: 7,
                                    fontWeight: 600,
                                    fill: "#64748B",
                                    letterSpacing: "0.2em",
                                    textAnchor: "middle",
                                    children: "AGENT CLUSTER · v4"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 210,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 206,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 172,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    fontFamily: "ui-monospace,monospace",
                    children: [
                        {
                            y: 170,
                            title: 'LEND MARKET',
                            sub: 'KredioLending v5'
                        },
                        {
                            y: 300,
                            title: 'BORROW MARKET',
                            sub: 'Tiered LTV · 85% Max'
                        },
                        {
                            y: 420,
                            title: 'PAS MARKET',
                            sub: 'KredioPASMarket v5'
                        }
                    ].map((n, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: 880,
                                    y: n.y,
                                    width: 130,
                                    height: 44,
                                    rx: 6,
                                    fill: "rgba(139,92,246,0.02)",
                                    stroke: "rgba(139,92,246,0.2)",
                                    strokeWidth: 1
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 222,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: 945,
                                    y: n.y + 19,
                                    fontSize: 10,
                                    fontWeight: 600,
                                    letterSpacing: "0.05em",
                                    fill: "#8B5CF6",
                                    textAnchor: "middle",
                                    children: n.title
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 223,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: 945,
                                    y: n.y + 32,
                                    fontSize: 7,
                                    fill: "rgba(255,255,255,0.4)",
                                    textAnchor: "middle",
                                    children: n.sub
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 224,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 221,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 215,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    fontFamily: "ui-monospace,monospace",
                    children: [
                        {
                            y: 176,
                            title: 'SUPPLY',
                            sub: 'Earn yield'
                        },
                        {
                            y: 306,
                            title: 'BORROW',
                            sub: 'Tiered rates'
                        },
                        {
                            y: 426,
                            title: 'SWAP/REPAY',
                            sub: 'KredioSwap'
                        }
                    ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: 1060,
                                    y: s.y,
                                    width: 100,
                                    height: 32,
                                    rx: 4,
                                    fill: "rgba(139,92,246,0.02)",
                                    stroke: "rgba(139,92,246,0.15)",
                                    strokeWidth: 1
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 237,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: 1110,
                                    y: s.y + 13,
                                    fontSize: 10,
                                    fontWeight: 600,
                                    letterSpacing: "0.05em",
                                    fill: "rgba(139,92,246,0.8)",
                                    textAnchor: "middle",
                                    children: s.title
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 238,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: 1110,
                                    y: s.y + 24,
                                    fontSize: 7,
                                    fill: "rgba(255,255,255,0.4)",
                                    textAnchor: "middle",
                                    children: s.sub
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                                    lineNumber: 239,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                            lineNumber: 236,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
                    lineNumber: 230,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
            lineNumber: 19,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/landing-modules/CpuCircuit.tsx",
        lineNumber: 17,
        columnNumber: 9
    }, this);
}
_c = CpuCircuit;
var _c;
__turbopack_context__.k.register(_c, "CpuCircuit");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing-modules/TopologySection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TopologySection",
    ()=>TopologySection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$CpuCircuit$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/CpuCircuit.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/tokens.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
const fadeUp = {
    hidden: {
        opacity: 0,
        y: 30
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [
                0.22,
                1,
                0.36,
                1
            ]
        }
    }
};
function TopologySection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION"],
            alignItems: 'center',
            justifyContent: 'center'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: "hidden",
            animate: "show",
            variants: fadeUp,
            style: {
                width: '85%',
                maxWidth: '1400px',
                display: 'flex',
                justifyContent: 'center'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$CpuCircuit$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/landing-modules/TopologySection.tsx",
                lineNumber: 16,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/landing-modules/TopologySection.tsx",
            lineNumber: 12,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/landing-modules/TopologySection.tsx",
        lineNumber: 11,
        columnNumber: 9
    }, this);
}
_c = TopologySection;
var _c;
__turbopack_context__.k.register(_c, "TopologySection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing-modules/FeaturesSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeaturesSection",
    ()=>FeaturesSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/tokens.ts [app-client] (ecmascript)");
'use client';
;
;
;
const ALL = [
    {
        cls: 'fc-pas',
        icon: '◈',
        title: 'PAS Markets',
        desc: 'Isolated borrow/lend markets for native Polkadot assets. Dynamic LTV up to 85%, real floating APY.',
        color: '#22C55E',
        stat: '85%',
        statLabel: 'Max LTV'
    },
    {
        cls: 'fc-flash',
        icon: '◎',
        title: 'Flashloan Shield',
        desc: 'Manipulation-resistant v5 interest accrual. Protects the protocol from single-block price manipulation and flashloan attacks.',
        color: '#A78BFA'
    },
    {
        cls: 'fc-xcm',
        icon: '⇌',
        title: 'XCM Deposits',
        desc: 'Bridge PAS from People Chain via native XCM.',
        color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].cyan
    },
    {
        cls: 'fc-eth',
        icon: '⬡',
        title: 'ETH Bridge',
        desc: 'Bring liquidity from different EVM chains into Polkadot Asset Hub. Minted 1:1 on-chain.',
        color: '#F59E0B'
    },
    {
        cls: 'fc-gov',
        icon: '⬥',
        title: 'Governance Rewards',
        desc: 'Vote on Asset Hub governance and earn score multipliers. Consistency unlocks higher tiers permanently.',
        color: '#818CF8',
        stat: '6 →',
        statLabel: 'Tiers'
    },
    {
        cls: 'fc-musdc',
        icon: '◇',
        title: 'mUSDC Markets',
        desc: 'Bridged EVM USDC pools with real-time yield.',
        color: '#38BDF8'
    },
    {
        cls: 'fc-swap',
        icon: '↻',
        title: 'KredioSwap',
        desc: 'Swap PAS, mUSDC and lending positions atomically.',
        color: '#F472B6'
    },
    {
        cls: 'fc-id',
        icon: '▲',
        title: 'Identity Boost',
        desc: 'On-chain proofs permanently raise starting score.',
        color: '#FB923C'
    },
    {
        cls: 'fc-ai',
        icon: '⬡',
        title: 'AI Credit Engine',
        desc: 'Six-tier dynamic credit scoring driven by on-chain behavior. Score improves in real time - no application, no waiting period.',
        color: '#D946EF'
    },
    {
        cls: 'fc-neural',
        icon: '◉',
        title: 'Neural Risk Layer',
        desc: 'A dual-mode neural net runs alongside deterministic rules to catch manipulation and edge cases the rulebook misses.',
        color: '#14B8A6'
    }
];
const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.06
        }
    }
};
const card = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: 12
    },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [
                0.22,
                1,
                0.36,
                1
            ]
        }
    }
};
// Custom Bespoke SVG Backgrounds for each card
function CustomBg({ id }) {
    switch(id){
        case 'fc-pas':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fc-bg-element",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        position: 'absolute',
                        bottom: '-20px',
                        right: '-10px',
                        fontSize: '220px',
                        fontWeight: 800,
                        lineHeight: 1,
                        letterSpacing: '-0.06em',
                        color: 'rgba(34,197,94,0.03)'
                    },
                    children: "85%"
                }, void 0, false, {
                    fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                    lineNumber: 28,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, this);
        case 'fc-gov':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fc-bg-element",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        position: 'absolute',
                        bottom: '-10px',
                        right: '10px',
                        fontSize: '200px',
                        fontWeight: 800,
                        lineHeight: 1,
                        letterSpacing: '-0.06em',
                        color: 'rgba(129,140,248,0.03)'
                    },
                    children: "6T"
                }, void 0, false, {
                    fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                    lineNumber: 33,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, this);
        case 'fc-flash':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "fc-bg-element",
                viewBox: "0 0 200 400",
                preserveAspectRatio: "none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "100",
                        cy: "200",
                        r: "140",
                        fill: "none",
                        stroke: "rgba(167,139,250,0.04)",
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 38,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "100",
                        cy: "200",
                        r: "100",
                        fill: "none",
                        stroke: "rgba(167,139,250,0.06)",
                        strokeWidth: "4"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 39,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "100",
                        cy: "200",
                        r: "60",
                        fill: "none",
                        stroke: "rgba(167,139,250,0.08)",
                        strokeWidth: "1",
                        strokeDasharray: "4 4"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 40,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                lineNumber: 37,
                columnNumber: 13
            }, this);
        case 'fc-eth':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "fc-bg-element",
                viewBox: "0 0 200 400",
                preserveAspectRatio: "xRightYBottom meet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M100 0 L100 400",
                        stroke: "rgba(245,158,11,0.05)",
                        strokeWidth: "8",
                        strokeDasharray: "16 16"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 45,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                        points: "100,200 70,250 100,300 130,250",
                        fill: "none",
                        stroke: "rgba(245,158,11,0.08)",
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 46,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                        points: "100,100 80,140 100,180 120,140",
                        fill: "none",
                        stroke: "rgba(245,158,11,0.06)",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 47,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                lineNumber: 44,
                columnNumber: 13
            }, this);
        case 'fc-id':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "fc-bg-element",
                viewBox: "0 0 200 400",
                preserveAspectRatio: "xRightYBottom meet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 50 400 Q 100 250 150 400",
                        fill: "none",
                        stroke: "rgba(251,146,60,0.04)",
                        strokeWidth: "20"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 52,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 70 400 Q 100 300 130 400",
                        fill: "none",
                        stroke: "rgba(251,146,60,0.06)",
                        strokeWidth: "10"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 53,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "100",
                        cy: "380",
                        r: "15",
                        fill: "none",
                        stroke: "rgba(251,146,60,0.08)",
                        strokeWidth: "4"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 54,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                lineNumber: 51,
                columnNumber: 13
            }, this);
        case 'fc-xcm':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "fc-bg-element",
                viewBox: "0 0 400 200",
                preserveAspectRatio: "xRightYBottom meet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 0 100 Q 200 50 400 150",
                        fill: "none",
                        stroke: "rgba(0,226,255,0.04)",
                        strokeWidth: "4"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 59,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 0 120 Q 200 180 400 80",
                        fill: "none",
                        stroke: "rgba(0,226,255,0.04)",
                        strokeWidth: "2",
                        strokeDasharray: "8 8"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 60,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "350",
                        cy: "130",
                        r: "20",
                        fill: "none",
                        stroke: "rgba(0,226,255,0.06)",
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                lineNumber: 58,
                columnNumber: 13
            }, this);
        case 'fc-musdc':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "fc-bg-element",
                viewBox: "0 0 200 200",
                preserveAspectRatio: "xRightYBottom meet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "140",
                        cy: "160",
                        rx: "40",
                        ry: "15",
                        fill: "none",
                        stroke: "rgba(56,189,248,0.08)",
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 66,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "140",
                        cy: "140",
                        rx: "40",
                        ry: "15",
                        fill: "none",
                        stroke: "rgba(56,189,248,0.06)",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 67,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "140",
                        cy: "120",
                        rx: "40",
                        ry: "15",
                        fill: "none",
                        stroke: "rgba(56,189,248,0.04)",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 68,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 100 160 L 100 120 M 180 160 L 180 120",
                        stroke: "rgba(56,189,248,0.05)",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                lineNumber: 65,
                columnNumber: 13
            }, this);
        case 'fc-swap':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "fc-bg-element",
                viewBox: "0 0 200 200",
                preserveAspectRatio: "xRightYBottom meet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 100 50 A 50 50 0 1 1 50 100",
                        fill: "none",
                        stroke: "rgba(244,114,182,0.06)",
                        strokeWidth: "4",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 74,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                        points: "40,90 50,110 60,90",
                        fill: "rgba(244,114,182,0.06)"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 75,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 100 150 A 50 50 0 0 1 150 100",
                        fill: "none",
                        stroke: "rgba(244,114,182,0.04)",
                        strokeWidth: "2",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 76,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                lineNumber: 73,
                columnNumber: 13
            }, this);
        case 'fc-ai':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "fc-bg-element",
                viewBox: "0 0 400 200",
                preserveAspectRatio: "xRightYBottom meet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M -50 100 Q 100 -50 200 100 T 450 100",
                        fill: "none",
                        stroke: "rgba(217,70,239,0.06)",
                        strokeWidth: "4"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 81,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M -50 120 Q 100 -10 200 120 T 450 120",
                        fill: "none",
                        stroke: "rgba(217,70,239,0.04)",
                        strokeWidth: "2",
                        strokeDasharray: "8 8"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 82,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "200",
                        cy: "100",
                        r: "24",
                        fill: "none",
                        stroke: "rgba(217,70,239,0.08)",
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 83,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 185 100 L 215 100 M 200 85 L 200 115",
                        stroke: "rgba(217,70,239,0.08)",
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 84,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                lineNumber: 80,
                columnNumber: 13
            }, this);
        case 'fc-neural':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "fc-bg-element",
                viewBox: "0 0 200 200",
                preserveAspectRatio: "xRightYBottom meet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "100",
                        cy: "100",
                        r: "60",
                        fill: "none",
                        stroke: "rgba(20,184,166,0.04)",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 89,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "100",
                        cy: "100",
                        r: "40",
                        fill: "none",
                        stroke: "rgba(20,184,166,0.06)",
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 90,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "100",
                        cy: "100",
                        r: "20",
                        fill: "none",
                        stroke: "rgba(20,184,166,0.08)",
                        strokeWidth: "4"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 91,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "100",
                        cy: "100",
                        r: "80",
                        fill: "none",
                        stroke: "rgba(20,184,166,0.03)",
                        strokeWidth: "1",
                        strokeDasharray: "4 4"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 92,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                lineNumber: 88,
                columnNumber: 13
            }, this);
        default:
            return null;
    }
}
_c = CustomBg;
function FeaturesSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION"],
            paddingTop: '120px',
            paddingBottom: '120px',
            minHeight: 'unset'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
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
                .fc-ai { grid-column: 1 / 3; grid-row: 7 / 8; }
                .fc-neural { grid-column: 3 / 4; grid-row: 7 / 8; }

                @media (max-width: 960px) {
                    .feat-grid { grid-template-columns: repeat(2, 1fr); }
                    .fc-pas { grid-column: 1 / 3; grid-row: span 2; }
                    .fc-flash { grid-column: span 1; grid-row: span 1; }
                    .fc-xcm { grid-column: 1 / 3; grid-row: span 1; }
                    .fc-eth { grid-column: span 1; grid-row: span 2; }
                    .fc-gov { grid-column: 1 / 3; grid-row: span 2; }
                    .fc-id { grid-column: span 1; grid-row: span 2; }
                    .fc-musdc, .fc-swap { grid-column: span 1; grid-row: span 1; }
                    .fc-ai { grid-column: 1 / 3; grid-row: span 1; }
                    .fc-neural { grid-column: span 2; grid-row: span 1; }
                }
                @media (max-width: 600px) {
                    .feat-grid { grid-template-columns: 1fr; }
                    .fc-pas, .fc-gov, .fc-xcm, .fc-ai { grid-column: 1 / 2; grid-row: span 1; }
                    .fc-flash, .fc-eth, .fc-musdc, .fc-swap, .fc-id, .fc-neural { grid-column: 1 / 2; grid-row: span 1; }
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
            `
            }, void 0, false, {
                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                lineNumber: 102,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "feat-wrap",
                initial: "hidden",
                whileInView: "show",
                viewport: {
                    once: true,
                    margin: '-60px'
                },
                variants: container,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: card,
                        style: {
                            marginBottom: '40px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_STYLE"],
                                children: "Core Architecture"
                            }, void 0, false, {
                                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                                lineNumber: 206,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 'clamp(40px, 5vw, 64px)',
                                    fontWeight: 700,
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].white,
                                    letterSpacing: '-0.04em',
                                    lineHeight: 1.05
                                },
                                children: [
                                    "Multi-Chain Supply.",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                                        lineNumber: 208,
                                        columnNumber: 44
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#E2E8F0',
                                            opacity: 0.35
                                        },
                                        children: "Unified Credit Engine."
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                                        lineNumber: 209,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                                lineNumber: 207,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 205,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "feat-grid",
                        children: ALL.map((f)=>{
                            // Is this card spanning multiple columns/rows?
                            const isHuge = f.cls === 'fc-pas' || f.cls === 'fc-gov';
                            const isVertical = f.cls === 'fc-flash' || f.cls === 'fc-eth' || f.cls === 'fc-id';
                            const isHorizontal = f.cls === 'fc-xcm' || f.cls === 'fc-ai';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: card,
                                className: `feat-card ${f.cls}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomBg, {
                                        id: f.cls
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                                        lineNumber: 227,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'relative',
                                            zIndex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: isHuge ? 64 : 48,
                                                    height: isHuge ? 64 : 48,
                                                    borderRadius: 16,
                                                    background: `rgba(255,255,255,0.03)`,
                                                    border: `1px solid rgba(255,255,255,0.08)`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: isHuge ? '28px' : '20px',
                                                    color: f.color,
                                                    marginBottom: isHuge || isHorizontal ? '32px' : '24px',
                                                    boxShadow: `0 8px 16px ${f.color}15`,
                                                    backdropFilter: 'blur(10px)'
                                                },
                                                children: f.icon
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                                                lineNumber: 231,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginTop: isVertical ? 'auto' : '0'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: isHuge ? '28px' : '18px',
                                                            fontWeight: 700,
                                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].white,
                                                            marginBottom: '12px',
                                                            letterSpacing: '-0.02em',
                                                            lineHeight: 1.1
                                                        },
                                                        children: f.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                                                        lineNumber: 248,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: isHuge ? '16px' : '14px',
                                                            color: '#E2E8F0',
                                                            lineHeight: 1.6,
                                                            maxWidth: isHuge || isHorizontal ? '80%' : '100%'
                                                        },
                                                        children: f.desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                                                        lineNumber: 249,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                                                lineNumber: 247,
                                                columnNumber: 37
                                            }, this),
                                            'stat' in f && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginTop: 'auto',
                                                    paddingTop: '32px',
                                                    display: 'flex',
                                                    alignItems: 'baseline',
                                                    gap: '10px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: '56px',
                                                            fontWeight: 700,
                                                            color: f.color,
                                                            letterSpacing: '-0.04em',
                                                            lineHeight: 1
                                                        },
                                                        children: f.stat
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: '11px',
                                                            fontFamily: 'ui-monospace,monospace',
                                                            color: '#94A3B8',
                                                            letterSpacing: '2.5px',
                                                            textTransform: 'uppercase'
                                                        },
                                                        children: f.statLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                                                        lineNumber: 258,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                                                lineNumber: 254,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                                        lineNumber: 229,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, f.title, true, {
                                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                                lineNumber: 221,
                                columnNumber: 29
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                        lineNumber: 213,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
                lineNumber: 197,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing-modules/FeaturesSection.tsx",
        lineNumber: 101,
        columnNumber: 9
    }, this);
}
_c1 = FeaturesSection;
var _c, _c1;
__turbopack_context__.k.register(_c, "CustomBg");
__turbopack_context__.k.register(_c1, "FeaturesSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing-modules/TiersSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TiersSection",
    ()=>TiersSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/tokens.ts [app-client] (ecmascript)");
'use client';
;
;
;
const TIERS = [
    {
        cls: 'tc-1',
        name: 'ANON',
        pts: '0',
        ltv: '50%',
        rate: '12%',
        color: '#475569',
        hero: false
    },
    {
        cls: 'tc-2',
        name: 'BRONZE',
        pts: '100',
        ltv: '60%',
        rate: '10%',
        color: '#CD7F32',
        hero: false
    },
    {
        cls: 'tc-3',
        name: 'SILVER',
        pts: '500',
        ltv: '70%',
        rate: '8%',
        color: '#94A3B8',
        hero: false
    },
    {
        cls: 'tc-4',
        name: 'GOLD',
        pts: '2,000',
        ltv: '78%',
        rate: '6.5%',
        color: '#F59E0B',
        hero: false
    },
    {
        cls: 'tc-5',
        name: 'PLATINUM',
        pts: '10,000',
        ltv: '83%',
        rate: '5%',
        color: '#00E2FF',
        hero: false
    },
    {
        cls: 'tc-6',
        name: 'DIAMOND',
        pts: '50,000',
        ltv: '85%',
        rate: '3%',
        color: '#E81CFF',
        hero: true
    }
];
const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.06
        }
    }
};
const card = {
    hidden: {
        opacity: 0,
        y: 12
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.42,
            ease: 'easeOut'
        }
    }
};
function TiersSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION"]
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
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
            `
            }, void 0, false, {
                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tiers-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "sticky-left",
                        initial: {
                            opacity: 0,
                            x: -20
                        },
                        whileInView: {
                            opacity: 1,
                            x: 0
                        },
                        viewport: {
                            once: true,
                            margin: '-100px'
                        },
                        transition: {
                            duration: 0.6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_STYLE"],
                                children: "The Path to Diamond"
                            }, void 0, false, {
                                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                lineNumber: 129,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 'clamp(32px, 4vw, 48px)',
                                    fontWeight: 700,
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].white,
                                    letterSpacing: '-0.04em',
                                    lineHeight: 1.05,
                                    marginBottom: '16px'
                                },
                                children: [
                                    "Climb the Ladder.",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                        lineNumber: 131,
                                        columnNumber: 42
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#E81CFF'
                                        },
                                        children: "Unlock Capital."
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                        lineNumber: 132,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                lineNumber: 130,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '15px',
                                    color: '#E2E8F0',
                                    lineHeight: 1.7,
                                    maxWidth: '420px',
                                    marginBottom: '32px'
                                },
                                children: "Kredio replaces fragmented identity with a unified on-chain reputation. Start at Anon with basic terms. Prove your reliability through repayments and governance. Unlock institutional-grade liquidity at Diamond."
                            }, void 0, false, {
                                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                lineNumber: 134,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '24px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '28px',
                                                    fontWeight: 700,
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].white,
                                                    letterSpacing: '-0.04em'
                                                },
                                                children: "6"
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                lineNumber: 140,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '10px',
                                                    color: '#94A3B8',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.15em'
                                                },
                                                children: "Tiers"
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                lineNumber: 141,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                        lineNumber: 139,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '28px',
                                                    fontWeight: 700,
                                                    color: '#00E2FF',
                                                    letterSpacing: '-0.04em'
                                                },
                                                children: [
                                                    "85",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: '18px'
                                                        },
                                                        children: "%"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 124
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                lineNumber: 144,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '10px',
                                                    color: '#94A3B8',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.15em'
                                                },
                                                children: "Max LTV"
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                lineNumber: 145,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                        lineNumber: 143,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '28px',
                                                    fontWeight: 700,
                                                    color: '#E81CFF',
                                                    letterSpacing: '-0.04em'
                                                },
                                                children: [
                                                    "3",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: '18px'
                                                        },
                                                        children: "%"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                        lineNumber: 148,
                                                        columnNumber: 123
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                lineNumber: 148,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '10px',
                                                    color: '#94A3B8',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.15em'
                                                },
                                                children: "Base Rate"
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                lineNumber: 149,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                        lineNumber: 147,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                lineNumber: 138,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing-modules/TiersSection.tsx",
                        lineNumber: 122,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "ladder-container",
                        initial: "hidden",
                        whileInView: "show",
                        viewport: {
                            once: true,
                            margin: '-100px'
                        },
                        variants: container,
                        children: TIERS.map((t, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: card,
                                className: `tier-card ${t.hero ? 'hero-card' : ''}`,
                                style: {
                                    zIndex: index,
                                    // Slight tilt based on index to make it feel like scattered cards
                                    transformOrigin: 'center center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "timeline-dot",
                                        style: {
                                            borderColor: t.color,
                                            boxShadow: `0 0 12px ${t.color}`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                        lineNumber: 173,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            justifyContent: 'space-between'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                        marginBottom: '8px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                width: 10,
                                                                height: 10,
                                                                borderRadius: '50%',
                                                                background: t.color,
                                                                boxShadow: `0 0 16px ${t.color}`,
                                                                flexShrink: 0,
                                                                display: 'inline-block'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                            lineNumber: 179,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: '14px',
                                                                fontFamily: 'ui-monospace,monospace',
                                                                fontWeight: 800,
                                                                color: t.color,
                                                                letterSpacing: '3px'
                                                            },
                                                            children: t.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                            lineNumber: 180,
                                                            columnNumber: 41
                                                        }, this),
                                                        t.hero && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                marginLeft: '12px',
                                                                fontSize: '9px',
                                                                fontFamily: 'ui-monospace,monospace',
                                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].pink,
                                                                letterSpacing: '1.5px',
                                                                background: 'rgba(232,28,255,0.15)',
                                                                padding: '4px 10px',
                                                                borderRadius: '6px'
                                                            },
                                                            children: "ULTIMATE TIER"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                            lineNumber: 184,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: '11px',
                                                        fontFamily: 'ui-monospace,monospace',
                                                        color: '#CBD5E1',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "12",
                                                            height: "12",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                                points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                                lineNumber: 190,
                                                                columnNumber: 184
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                            lineNumber: 190,
                                                            columnNumber: 41
                                                        }, this),
                                                        t.pts,
                                                        " SCORE REQUIRED"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                            lineNumber: 176,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                        lineNumber: 175,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: '48px',
                                            marginTop: 'auto',
                                            paddingTop: '24px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: '10px',
                                                            fontFamily: 'ui-monospace,monospace',
                                                            color: '#94A3B8',
                                                            letterSpacing: '1.5px',
                                                            marginBottom: '6px',
                                                            textTransform: 'uppercase'
                                                        },
                                                        children: "Max LTV"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                        lineNumber: 199,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: '36px',
                                                            fontWeight: 700,
                                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].white,
                                                            letterSpacing: '-0.04em',
                                                            lineHeight: 1
                                                        },
                                                        children: t.ltv
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                        lineNumber: 200,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                lineNumber: 198,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: '1px',
                                                    background: 'rgba(255,255,255,0.08)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                lineNumber: 202,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: '10px',
                                                            fontFamily: 'ui-monospace,monospace',
                                                            color: '#94A3B8',
                                                            letterSpacing: '1.5px',
                                                            marginBottom: '6px',
                                                            textTransform: 'uppercase'
                                                        },
                                                        children: "Borrow Rate"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: '36px',
                                                            fontWeight: 700,
                                                            letterSpacing: '-0.04em',
                                                            lineHeight: 1,
                                                            color: t.hero ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].pink : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].white
                                                        },
                                                        children: t.rate
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                        lineNumber: 205,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                                lineNumber: 203,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                        lineNumber: 197,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, t.name, true, {
                                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                                lineNumber: 163,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/TiersSection.tsx",
                        lineNumber: 155,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/TiersSection.tsx",
                lineNumber: 120,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing-modules/TiersSection.tsx",
        lineNumber: 20,
        columnNumber: 9
    }, this);
}
_c = TiersSection;
var _c;
__turbopack_context__.k.register(_c, "TiersSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing-modules/CTASection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CTASection",
    ()=>CTASection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/tokens.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function CTASection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION"],
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(232,28,255,0.06) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }
            }, void 0, false, {
                fileName: "[project]/components/landing-modules/CTASection.tsx",
                lineNumber: 11,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 32
                },
                whileInView: {
                    opacity: 1,
                    y: 0
                },
                viewport: {
                    once: true,
                    margin: '-60px'
                },
                transition: {
                    duration: 0.8,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ]
                },
                style: {
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: '560px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: '9px',
                            fontFamily: 'ui-monospace,monospace',
                            letterSpacing: '0.24em',
                            textTransform: 'uppercase',
                            color: '#CBD5E1',
                            marginBottom: '28px'
                        },
                        children: "READY TO UPGRADE?"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/CTASection.tsx",
                        lineNumber: 21,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontSize: 'clamp(48px, 7vw, 96px)',
                            fontWeight: 700,
                            lineHeight: 0.9,
                            letterSpacing: '-0.06em',
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].white,
                            marginBottom: '28px'
                        },
                        children: [
                            "Start at",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/components/landing-modules/CTASection.tsx",
                                lineNumber: 27,
                                columnNumber: 29
                            }, this),
                            "ANON."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing-modules/CTASection.tsx",
                        lineNumber: 26,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: '15px',
                            lineHeight: 1.9,
                            color: '#E2E8F0',
                            marginBottom: '48px',
                            maxWidth: '400px',
                            margin: '0 auto 48px'
                        },
                        children: "Join anon, become Diamond. Stop paying equal rates for unequal reliability. Build your unkillable on-chain credit history right now."
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/CTASection.tsx",
                        lineNumber: 31,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'relative',
                            display: 'inline-block'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'absolute',
                                    inset: '-12px',
                                    background: 'radial-gradient(ellipse, rgba(232,28,255,0.18) 0%, transparent 70%)',
                                    borderRadius: '999px',
                                    pointerEvents: 'none'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/landing-modules/CTASection.tsx",
                                lineNumber: 38,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard",
                                style: {
                                    display: 'inline-block',
                                    position: 'relative',
                                    padding: '14px 40px',
                                    borderRadius: '12px',
                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].pink,
                                    color: '#000',
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    letterSpacing: '0.02em',
                                    boxShadow: `0 0 32px rgba(232,28,255,0.4)`,
                                    transition: 'box-shadow 0.2s, transform 0.2s'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.boxShadow = '0 0 56px rgba(232,28,255,0.65)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.boxShadow = '0 0 32px rgba(232,28,255,0.4)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                },
                                children: "Open Lending Markets →"
                            }, void 0, false, {
                                fileName: "[project]/components/landing-modules/CTASection.tsx",
                                lineNumber: 39,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing-modules/CTASection.tsx",
                        lineNumber: 36,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/CTASection.tsx",
                lineNumber: 13,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing-modules/CTASection.tsx",
        lineNumber: 9,
        columnNumber: 9
    }, this);
}
_c = CTASection;
var _c;
__turbopack_context__.k.register(_c, "CTASection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing-modules/FooterSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FooterSection",
    ()=>FooterSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/tokens.ts [app-client] (ecmascript)");
'use client';
;
;
;
const NAV_LINKS = [
    {
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        label: 'Lend',
        href: '/lend'
    },
    {
        label: 'Borrow',
        href: '/borrow'
    },
    {
        label: 'Swap',
        href: '/swap'
    },
    {
        label: 'Bridge',
        href: '/bridge'
    },
    {
        label: 'Markets',
        href: '/markets'
    }
];
function FooterSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        style: {
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
            minHeight: '36vh',
            paddingTop: '56px',
            paddingBottom: '36px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            width: '100%',
            boxSizing: 'border-box'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
                @media (max-width:640px) {
                    .footer-cols { flex-direction:column !important; gap:36px !important; }
                }
            `
            }, void 0, false, {
                fileName: "[project]/components/landing-modules/FooterSection.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "footer-cols",
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '48px',
                    flexWrap: 'wrap'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: '0 0 auto',
                            maxWidth: '260px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    marginBottom: '12px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 28,
                                            height: 28,
                                            borderRadius: '6px',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            background: 'rgba(255,255,255,0.03)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "13",
                                            height: "13",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            strokeWidth: 1.5,
                                            style: {
                                                color: 'rgba(255,255,255,0.55)'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                d: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing-modules/FooterSection.tsx",
                                                lineNumber: 41,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/landing-modules/FooterSection.tsx",
                                            lineNumber: 40,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/FooterSection.tsx",
                                        lineNumber: 39,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '12px',
                                            fontWeight: 300,
                                            letterSpacing: '0.24em',
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].white,
                                            textTransform: 'uppercase'
                                        },
                                        children: "Kredio"
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/FooterSection.tsx",
                                        lineNumber: 44,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/landing-modules/FooterSection.tsx",
                                lineNumber: 38,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '12px',
                                    color: '#CBD5E1',
                                    lineHeight: 1.8,
                                    marginBottom: '16px'
                                },
                                children: "Decentralized, reputation-based credit markets running on Polkadot's unified execution environment. Fund, participate, and earn your score permanently on-chain."
                            }, void 0, false, {
                                fileName: "[project]/components/landing-modules/FooterSection.tsx",
                                lineNumber: 46,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    padding: '3px 10px',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    borderRadius: '6px',
                                    fontSize: '7.5px',
                                    fontFamily: 'ui-monospace,monospace',
                                    color: '#94A3B8',
                                    letterSpacing: '1.5px',
                                    textTransform: 'uppercase'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/landing-modules/FooterSection.tsx",
                                lineNumber: 50,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing-modules/FooterSection.tsx",
                        lineNumber: 37,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '8px',
                                    fontFamily: 'ui-monospace,monospace',
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].muted,
                                    letterSpacing: '2.5px',
                                    textTransform: 'uppercase',
                                    marginBottom: '18px'
                                },
                                children: "Protocol"
                            }, void 0, false, {
                                fileName: "[project]/components/landing-modules/FooterSection.tsx",
                                lineNumber: 56,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '10px 32px'
                                },
                                children: NAV_LINKS.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: l.href,
                                        style: {
                                            fontSize: '12px',
                                            color: '#CBD5E1',
                                            textDecoration: 'none',
                                            transition: 'color 0.15s'
                                        },
                                        onMouseEnter: (e)=>e.currentTarget.style.color = '#FFFFFF',
                                        onMouseLeave: (e)=>e.currentTarget.style.color = '#CBD5E1',
                                        children: l.label
                                    }, l.href, false, {
                                        fileName: "[project]/components/landing-modules/FooterSection.tsx",
                                        lineNumber: 59,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/landing-modules/FooterSection.tsx",
                                lineNumber: 57,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing-modules/FooterSection.tsx",
                        lineNumber: 55,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: '0 0 auto',
                            textAlign: 'right'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: '11px',
                                color: '#1e293b',
                                letterSpacing: '-0.01em',
                                lineHeight: 1.5
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: '#334155'
                                    },
                                    children: "Start at "
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/FooterSection.tsx",
                                    lineNumber: 73,
                                    columnNumber: 25
                                }, this),
                                "ANON.",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/components/landing-modules/FooterSection.tsx",
                                    lineNumber: 73,
                                    columnNumber: 81
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: '#334155'
                                    },
                                    children: "Earn your way to "
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/FooterSection.tsx",
                                    lineNumber: 74,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].pink
                                    },
                                    children: "DIAMOND."
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/FooterSection.tsx",
                                    lineNumber: 75,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/landing-modules/FooterSection.tsx",
                            lineNumber: 72,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FooterSection.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/FooterSection.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '40px',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '9px',
                            fontFamily: 'ui-monospace,monospace',
                            color: '#334155'
                        },
                        children: "© 2026 Kredio. Polkadot Testnet."
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FooterSection.tsx",
                        lineNumber: 82,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '9px',
                            fontFamily: 'ui-monospace,monospace',
                            color: '#334155'
                        },
                        children: "Built on Polkadot Asset Hub"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/FooterSection.tsx",
                        lineNumber: 85,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/FooterSection.tsx",
                lineNumber: 81,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing-modules/FooterSection.tsx",
        lineNumber: 17,
        columnNumber: 9
    }, this);
}
_c = FooterSection;
var _c;
__turbopack_context__.k.register(_c, "FooterSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing-modules/HowItWorksSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HowItWorksSection",
    ()=>HowItWorksSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/tokens.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const MODULES = [
    {
        num: '01',
        bgId: 'hiw-engine',
        title: 'Credit Scoring Engine',
        mechanism: 'Every user starts at Tier 0 (Anon) with a 30% LTV cap and 22% APY. The kredit_agent PVM contract continuously recomputes a score from 0–100 using six weighted behavioral signals: repayment streak, deposit magnitude, borrow frequency, liquidation history, account age, and governance participation. A single liquidation drops the score by 40 points.',
        innovation: 'Score is computed entirely on-chain inside a PVM contract - no oracle, no off-chain backend, no trusted committee. Deterministic, auditable, and gas-efficient.',
        color: '#A78BFA',
        icon: '◈'
    },
    {
        num: '02',
        bgId: 'hiw-neural',
        title: 'Neural Scorer',
        mechanism: 'Running in parallel, the neural_scorer PVM contract implements a 2-layer MLP. It normalizes behavioral features into weights to produce an independent neural score. It outputs Confidence % (agreement with deterministic score) and Delta from Rule (signed difference of performance vs rulebook).',
        innovation: 'A user gaming rules (e.g., inflating streaks) shows a high deterministic score but low neural score - producing a large negative delta that flags manipulation. Pure on-chain smart contract resistance.',
        color: '#38BDF8',
        icon: '◉'
    },
    {
        num: '03',
        bgId: 'hiw-risk',
        title: 'Dynamic Risk Assessment',
        mechanism: 'The risk_assessor PVM evaluates individual positions, predicting liquidation probability (0–100%) using: Debt-to-Collateral, Credit Score, and 7-day collateral price volatility trend. It outputs Risk Tier, blocks to liquidation, and required top-up amount to return to a Safe status.',
        innovation: 'Forward-looking, trend-aware risk scoring. Unlike standard DeFi models using only current price snapshots, Kredio risk reacts preemptively to falling, stable, or rising price vectors.',
        color: '#34D399',
        icon: '▲'
    },
    {
        num: '04',
        bgId: 'hiw-yield',
        title: 'Autonomous Strategy',
        mechanism: 'YieldMind (PVM) evaluates market context (Utilization, Volatility, Avg Credit Score of borrower base) to output a reasoning_code. High utilization (>70%) halts deployment. High volatility reroutes to conservative yielding. Normal states scale allocations linearly based on borrower credit quality.',
        innovation: 'Yield strategy is dynamically coupled to the behavioral quality of borrowers. A feedback loop connecting protocol-wide credit health to external capital allocation routing.',
        color: '#FBBF24',
        icon: '⬡'
    },
    {
        num: '05',
        bgId: 'hiw-xcm',
        title: 'Cross-Chain Settlement',
        mechanism: 'The KredioXCMSettler handles XCM Transact payloads compounding atomic intents (Swap → Deposit → Borrow). The KredioAccountRegistry links SR25519 Substrate identities to EVM via cryptographic verification. KredioBridgeMinter provides lock-and-mint EVM bridging directly into protocol use.',
        innovation: 'The SR25519 ↔ EVM identity link means Polkadot on-chain identity (KILT credentials, parachain behavior) flows directly into credit scoring as a first-class primitive.',
        color: '#F472B6',
        icon: '⇌'
    }
];
function CustomBg({ id }) {
    switch(id){
        case 'hiw-engine':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "hiw-bg-element",
                viewBox: "0 0 200 400",
                preserveAspectRatio: "none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "100",
                        cy: "200",
                        r: "140",
                        fill: "none",
                        stroke: "rgba(167,139,250,0.04)",
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 59,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "100",
                        cy: "200",
                        r: "100",
                        fill: "none",
                        stroke: "rgba(167,139,250,0.06)",
                        strokeWidth: "4"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 60,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "100",
                        cy: "200",
                        r: "60",
                        fill: "none",
                        stroke: "rgba(167,139,250,0.08)",
                        strokeWidth: "1",
                        strokeDasharray: "4 4"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                lineNumber: 58,
                columnNumber: 13
            }, this);
        case 'hiw-neural':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "hiw-bg-element",
                viewBox: "0 0 400 200",
                preserveAspectRatio: "xRightYBottom meet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M -50 100 Q 100 -50 200 100 T 450 100",
                        fill: "none",
                        stroke: "rgba(56,189,248,0.06)",
                        strokeWidth: "4"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 66,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M -50 120 Q 100 -10 200 120 T 450 120",
                        fill: "none",
                        stroke: "rgba(56,189,248,0.04)",
                        strokeWidth: "2",
                        strokeDasharray: "8 8"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 67,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "200",
                        cy: "100",
                        r: "24",
                        fill: "none",
                        stroke: "rgba(56,189,248,0.08)",
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 68,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 185 100 L 215 100 M 200 85 L 200 115",
                        stroke: "rgba(56,189,248,0.08)",
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                lineNumber: 65,
                columnNumber: 13
            }, this);
        case 'hiw-risk':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "hiw-bg-element",
                viewBox: "0 0 200 400",
                preserveAspectRatio: "xRightYBottom meet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 50 400 Q 100 250 150 400",
                        fill: "none",
                        stroke: "rgba(52,211,153,0.04)",
                        strokeWidth: "20"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 74,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 70 400 Q 100 300 130 400",
                        fill: "none",
                        stroke: "rgba(52,211,153,0.06)",
                        strokeWidth: "10"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 75,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "100",
                        cy: "380",
                        r: "15",
                        fill: "none",
                        stroke: "rgba(52,211,153,0.08)",
                        strokeWidth: "4"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 76,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                lineNumber: 73,
                columnNumber: 13
            }, this);
        case 'hiw-yield':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "hiw-bg-element",
                viewBox: "0 0 200 200",
                preserveAspectRatio: "xRightYBottom meet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "140",
                        cy: "160",
                        rx: "40",
                        ry: "15",
                        fill: "none",
                        stroke: "rgba(251,191,36,0.08)",
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 81,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "140",
                        cy: "140",
                        rx: "40",
                        ry: "15",
                        fill: "none",
                        stroke: "rgba(251,191,36,0.06)",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 82,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "140",
                        cy: "120",
                        rx: "40",
                        ry: "15",
                        fill: "none",
                        stroke: "rgba(251,191,36,0.04)",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 83,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 100 160 L 100 120 M 180 160 L 180 120",
                        stroke: "rgba(251,191,36,0.05)",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 84,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                lineNumber: 80,
                columnNumber: 13
            }, this);
        case 'hiw-xcm':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "hiw-bg-element",
                viewBox: "0 0 400 200",
                preserveAspectRatio: "xRightYBottom meet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 0 100 Q 200 50 400 150",
                        fill: "none",
                        stroke: "rgba(244,114,182,0.04)",
                        strokeWidth: "4"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 89,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 0 120 Q 200 180 400 80",
                        fill: "none",
                        stroke: "rgba(244,114,182,0.04)",
                        strokeWidth: "2",
                        strokeDasharray: "8 8"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 90,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "350",
                        cy: "130",
                        r: "20",
                        fill: "none",
                        stroke: "rgba(244,114,182,0.06)",
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 91,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                lineNumber: 88,
                columnNumber: 13
            }, this);
        default:
            return null;
    }
}
_c = CustomBg;
function HowItWorksSection() {
    _s();
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION"],
            paddingTop: '120px',
            paddingBottom: '120px',
            minHeight: 'unset'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
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
                    color: ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].white};
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

            `
            }, void 0, false, {
                fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                lineNumber: 103,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 30
                },
                whileInView: {
                    opacity: 1,
                    y: 0
                },
                viewport: {
                    once: true,
                    margin: '-60px'
                },
                transition: {
                    duration: 0.7,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ]
                },
                style: {
                    paddingLeft: '5vw',
                    marginBottom: '40px',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '24px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_STYLE"],
                                children: "Technical Specification"
                            }, void 0, false, {
                                fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                                lineNumber: 280,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 'clamp(40px, 5vw, 64px)',
                                    fontWeight: 700,
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].white,
                                    letterSpacing: '-0.04em',
                                    lineHeight: 1.05
                                },
                                children: "How It Works."
                            }, void 0, false, {
                                fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                                lineNumber: 281,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 279,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0.3,
                            x: 0
                        },
                        animate: {
                            opacity: 1,
                            x: 10
                        },
                        transition: {
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        },
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].muted,
                            fontSize: '14px',
                            fontFamily: 'ui-monospace,monospace',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    display: 'none',
                                    '@media (min-width: 768px)': {
                                        display: 'inline'
                                    }
                                },
                                children: "Scroll"
                            }, void 0, false, {
                                fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                                lineNumber: 302,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "24",
                                height: "24",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "5",
                                        y1: "12",
                                        x2: "19",
                                        y2: "12"
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                                        lineNumber: 304,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                        points: "12 5 19 12 12 19"
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                                        lineNumber: 305,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                                lineNumber: 303,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 287,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                lineNumber: 272,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "hiw-carousel",
                ref: scrollRef,
                initial: {
                    opacity: 0,
                    x: 40
                },
                whileInView: {
                    opacity: 1,
                    x: 0
                },
                viewport: {
                    once: true,
                    margin: '-60px'
                },
                transition: {
                    duration: 0.7,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ],
                    delay: 0.1
                },
                children: MODULES.map((mod, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hiw-card-wrapper",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hiw-card",
                            style: {
                                borderColor: `${mod.color}15`
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hiw-card-bg",
                                    style: {
                                        background: `linear-gradient(135deg, transparent 40%, ${mod.color} 100%)`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                                    lineNumber: 322,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomBg, {
                                    id: mod.bgId
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                                    lineNumber: 324,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hiw-icon-container",
                                    style: {
                                        color: mod.color,
                                        boxShadow: `0 8px 16px ${mod.color}15`
                                    },
                                    children: mod.icon
                                }, void 0, false, {
                                    fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                                    lineNumber: 326,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "hiw-title",
                                    children: [
                                        mod.num,
                                        ". ",
                                        mod.title
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                                    lineNumber: 330,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "hiw-desc",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].white,
                                                display: 'block',
                                                marginBottom: '4px',
                                                fontWeight: 500
                                            },
                                            children: "The Mechanism"
                                        }, void 0, false, {
                                            fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                                            lineNumber: 333,
                                            columnNumber: 33
                                        }, this),
                                        mod.mechanism
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                                    lineNumber: 332,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hiw-innovation",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: '100%',
                                                height: '1px',
                                                background: 'rgba(255,255,255,0.06)',
                                                marginBottom: '20px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                                            lineNumber: 338,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "hiw-desc",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: mod.color,
                                                        display: 'block',
                                                        marginBottom: '4px',
                                                        fontSize: '12px',
                                                        fontWeight: 600,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em'
                                                    },
                                                    children: "The Innovation"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 37
                                                }, this),
                                                mod.innovation
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                                            lineNumber: 339,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                                    lineNumber: 337,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                            lineNumber: 320,
                            columnNumber: 25
                        }, this)
                    }, mod.num, false, {
                        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                        lineNumber: 319,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
                lineNumber: 310,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing-modules/HowItWorksSection.tsx",
        lineNumber: 102,
        columnNumber: 9
    }, this);
}
_s(HowItWorksSection, "rUl6RJdP9XfufN21BrtKqIOri0o=");
_c1 = HowItWorksSection;
var _c, _c1;
__turbopack_context__.k.register(_c, "CustomBg");
__turbopack_context__.k.register(_c1, "HowItWorksSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing-modules/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$HeroSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/HeroSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$TopologySection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/TopologySection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$FeaturesSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/FeaturesSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$TiersSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/TiersSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$CTASection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/CTASection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$FooterSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/FooterSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$HowItWorksSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/HowItWorksSection.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/landing-modules/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$HeroSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/HeroSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$TopologySection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/TopologySection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$FeaturesSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/FeaturesSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$TiersSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/TiersSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$CTASection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/CTASection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$FooterSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/FooterSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$HowItWorksSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing-modules/HowItWorksSection.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Home() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const html = document.documentElement;
            html.style.scrollSnapType = 'y mandatory';
            html.style.scrollBehavior = 'smooth';
            html.style.scrollPaddingTop = '64px';
            return ({
                "Home.useEffect": ()=>{
                    html.style.scrollSnapType = '';
                    html.style.scrollBehavior = '';
                    html.style.scrollPaddingTop = '';
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    return /* width:100% - stays within the layout container, no overflow */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '100%',
            maxWidth: '100%'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$HeroSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeroSection"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 30,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$TopologySection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopologySection"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 31,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$FeaturesSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FeaturesSection"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$HowItWorksSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HowItWorksSection"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 33,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$TiersSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TiersSection"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$CTASection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CTASection"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 35,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2d$modules$2f$FooterSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterSection"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 36,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 29,
        columnNumber: 9
    }, this);
}
_s(Home, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_eed179c2._.js.map