(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/docs/DocsSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DocsSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const DOCS_NAV = [
    {
        title: 'Overview',
        items: [
            {
                href: '/docs/intro',
                label: 'Introduction',
                subs: [
                    {
                        href: '/docs/intro#problem',
                        label: 'The Problem'
                    },
                    {
                        href: '/docs/intro#what-it-does',
                        label: 'What Kredio Does'
                    },
                    {
                        href: '/docs/intro#layers',
                        label: 'Three Execution Layers'
                    }
                ]
            },
            {
                href: '/docs/architecture',
                label: 'Architecture',
                subs: [
                    {
                        href: '/docs/architecture#layers',
                        label: 'Execution Layers'
                    },
                    {
                        href: '/docs/architecture#backend',
                        label: 'Backend Services'
                    },
                    {
                        href: '/docs/architecture#borrow-flow',
                        label: 'Borrow Event Flow'
                    },
                    {
                        href: '/docs/architecture#identity',
                        label: 'Identity & Governance'
                    }
                ]
            }
        ]
    },
    {
        title: 'Protocol',
        items: [
            {
                href: '/docs/products',
                label: 'Core Products',
                subs: [
                    {
                        href: '/docs/products#lending',
                        label: 'KredioLending'
                    },
                    {
                        href: '/docs/products#pas-market',
                        label: 'KredioPASMarket'
                    },
                    {
                        href: '/docs/products#swap',
                        label: 'KredioSwap'
                    },
                    {
                        href: '/docs/products#bridge',
                        label: 'ETH Bridge'
                    },
                    {
                        href: '/docs/products#xcm-settler',
                        label: 'XCM Settler'
                    }
                ]
            },
            {
                href: '/docs/agents',
                label: 'AI Agent Workflows',
                subs: [
                    {
                        href: '/docs/agents#kredit-agent',
                        label: 'KreditAgent'
                    },
                    {
                        href: '/docs/agents#neural-scorer',
                        label: 'NeuralScorer'
                    },
                    {
                        href: '/docs/agents#risk-assessor',
                        label: 'RiskAssessor'
                    },
                    {
                        href: '/docs/agents#yield-mind',
                        label: 'YieldMind'
                    },
                    {
                        href: '/docs/agents#trigger-schedule',
                        label: 'Trigger Schedule'
                    }
                ]
            }
        ]
    },
    {
        title: 'Developers',
        items: [
            {
                href: '/docs/contracts',
                label: 'Contracts & Integration',
                subs: [
                    {
                        href: '/docs/contracts#evm-contracts',
                        label: 'EVM Contracts'
                    },
                    {
                        href: '/docs/contracts#ink-contracts',
                        label: 'ink! Contracts'
                    },
                    {
                        href: '/docs/contracts#build',
                        label: 'Build from Source'
                    },
                    {
                        href: '/docs/contracts#deploy',
                        label: 'Deploy'
                    },
                    {
                        href: '/docs/contracts#integration',
                        label: 'Frontend Integration'
                    }
                ]
            }
        ]
    },
    {
        title: 'Vision',
        items: [
            {
                href: '/docs/roadmap',
                label: 'Roadmap & Vision',
                subs: [
                    {
                        href: '/docs/roadmap#premise',
                        label: 'The Premise'
                    },
                    {
                        href: '/docs/roadmap#intelligence-layer',
                        label: 'Intelligence Layer'
                    },
                    {
                        href: '/docs/roadmap#tiers',
                        label: 'Credit Tiers'
                    },
                    {
                        href: '/docs/roadmap#xcm-engine',
                        label: 'XCM Settlement'
                    },
                    {
                        href: '/docs/roadmap#phases',
                        label: 'Development Phases'
                    }
                ]
            }
        ]
    }
];
function DocsSidebar() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "w-72 shrink-0 h-[calc(100vh-64px)] overflow-y-auto border-r border-white/5 bg-transparent sticky top-16 hidden md:block",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-8 px-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-7 px-2 flex items-center gap-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-1.5 h-4 rounded-full bg-cyan-400/70 shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/components/docs/DocsSidebar.tsx",
                            lineNumber: 104,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] text-slate-500 uppercase tracking-widest font-semibold m-0",
                            children: "Kredio Docs"
                        }, void 0, false, {
                            fileName: "[project]/components/docs/DocsSidebar.tsx",
                            lineNumber: 105,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/docs/DocsSidebar.tsx",
                    lineNumber: 103,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "space-y-6",
                    children: DOCS_NAV.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 px-2 m-0",
                                    children: section.title
                                }, void 0, false, {
                                    fileName: "[project]/components/docs/DocsSidebar.tsx",
                                    lineNumber: 111,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-0.5 m-0 p-0 list-none",
                                    children: section.items.map((item)=>{
                                        const isActive = pathname === item.href;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "m-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: item.href,
                                                    className: `flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-md transition-all no-underline ${isActive ? 'bg-white/[0.07] text-white font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-white/4'}`,
                                                    children: [
                                                        isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-1 h-3.5 rounded-full bg-cyan-400 shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/docs/DocsSidebar.tsx",
                                                            lineNumber: 127,
                                                            columnNumber: 53
                                                        }, this),
                                                        item.label
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/docs/DocsSidebar.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 45
                                                }, this),
                                                isActive && item.subs && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "mt-1 ml-4 pl-3 border-l border-white/6 space-y-0 mb-1.5 list-none p-0",
                                                    children: item.subs.map((sub)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "m-0",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: sub.href,
                                                                className: "block py-1 px-2 text-[11.5px] text-slate-500 hover:text-slate-300 transition-colors leading-relaxed no-underline rounded hover:bg-white/3",
                                                                children: sub.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/docs/DocsSidebar.tsx",
                                                                lineNumber: 136,
                                                                columnNumber: 61
                                                            }, this)
                                                        }, sub.href, false, {
                                                            fileName: "[project]/components/docs/DocsSidebar.tsx",
                                                            lineNumber: 135,
                                                            columnNumber: 57
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/docs/DocsSidebar.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, item.href, true, {
                                            fileName: "[project]/components/docs/DocsSidebar.tsx",
                                            lineNumber: 118,
                                            columnNumber: 41
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/docs/DocsSidebar.tsx",
                                    lineNumber: 114,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, section.title, true, {
                            fileName: "[project]/components/docs/DocsSidebar.tsx",
                            lineNumber: 110,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/docs/DocsSidebar.tsx",
                    lineNumber: 108,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/docs/DocsSidebar.tsx",
            lineNumber: 101,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/docs/DocsSidebar.tsx",
        lineNumber: 100,
        columnNumber: 9
    }, this);
}
_s(DocsSidebar, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = DocsSidebar;
var _c;
__turbopack_context__.k.register(_c, "DocsSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_docs_DocsSidebar_tsx_f8abb45e._.js.map