module.exports = [
"[project]/components/modules/ProtocolUI.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionButton",
    ()=>ActionButton,
    "ActionInput",
    ()=>ActionInput,
    "Grid",
    ()=>Grid,
    "MarketModeSwitch",
    ()=>MarketModeSwitch,
    "PageShell",
    ()=>PageShell,
    "Panel",
    ()=>Panel,
    "RouteShortcut",
    ()=>RouteShortcut,
    "StatRow",
    ()=>StatRow,
    "StatRowSkeleton",
    ()=>StatRowSkeleton,
    "StateNotice",
    ()=>StateNotice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function PageShell({ title, subtitle, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl sm:text-3xl font-semibold text-white",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/modules/ProtocolUI.tsx",
                        lineNumber: 12,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-400 mt-1",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/components/modules/ProtocolUI.tsx",
                        lineNumber: 13,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 11,
                columnNumber: 13
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/ProtocolUI.tsx",
        lineNumber: 10,
        columnNumber: 9
    }, this);
}
function Grid({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 xl:grid-cols-2 gap-4",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/modules/ProtocolUI.tsx",
        lineNumber: 21,
        columnNumber: 12
    }, this);
}
function Panel({ title, subtitle, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].section, {
        whileHover: {
            y: -2
        },
        transition: {
            duration: 0.18,
            ease: 'easeOut'
        },
        className: "rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 hover:border-white/20 hover:bg-black/35 transition-colors",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-base font-semibold text-white",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/modules/ProtocolUI.tsx",
                        lineNumber: 32,
                        columnNumber: 17
                    }, this),
                    subtitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-slate-400 mt-0.5",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/components/modules/ProtocolUI.tsx",
                        lineNumber: 33,
                        columnNumber: 29
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 31,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 35,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/ProtocolUI.tsx",
        lineNumber: 26,
        columnNumber: 9
    }, this);
}
function StatRow({ label, value, tone = 'default' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-slate-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 43,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                initial: {
                    opacity: 0.35,
                    y: 2
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    duration: 0.2,
                    ease: 'easeOut'
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('font-medium', tone === 'default' && 'text-white', tone === 'green' && 'text-emerald-300', tone === 'yellow' && 'text-amber-300', tone === 'red' && 'text-rose-300'),
                children: value
            }, `${label}-${value}`, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 44,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/ProtocolUI.tsx",
        lineNumber: 42,
        columnNumber: 9
    }, this);
}
function StatRowSkeleton({ label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-slate-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 66,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "h-4 w-20 rounded bg-white/10 animate-pulse"
            }, void 0, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/ProtocolUI.tsx",
        lineNumber: 65,
        columnNumber: 9
    }, this);
}
function StateNotice({ tone, message }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('rounded-xl border px-3 py-2 text-xs', tone === 'info' && 'border-cyan-400/30 bg-cyan-500/10 text-cyan-200', tone === 'warning' && 'border-amber-400/30 bg-amber-500/10 text-amber-200', tone === 'error' && 'border-rose-400/30 bg-rose-500/10 text-rose-200'),
        children: message
    }, void 0, false, {
        fileName: "[project]/components/modules/ProtocolUI.tsx",
        lineNumber: 80,
        columnNumber: 9
    }, this);
}
function ActionInput({ label, value, onChange, placeholder }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "block space-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs uppercase tracking-wide text-slate-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 106,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                placeholder: placeholder,
                className: "w-full rounded-xl border border-white/10 bg-black/40 text-sm text-white px-3 py-2 outline-none focus:border-white/30"
            }, void 0, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/ProtocolUI.tsx",
        lineNumber: 105,
        columnNumber: 9
    }, this);
}
function ActionButton({ label, onClick, disabled, loading, variant = 'primary' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled || loading,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('px-3 py-2 rounded-xl text-sm font-medium border transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2', variant === 'primary' && 'bg-white text-black border-white hover:bg-white/90', variant === 'ghost' && 'bg-white/5 text-white border-white/15 hover:bg-white/10', variant === 'danger' && 'bg-rose-500/20 text-rose-200 border-rose-400/30 hover:bg-rose-500/25'),
        children: [
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin"
            }, void 0, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 141,
                columnNumber: 24
            }, this) : null,
            label
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/ProtocolUI.tsx",
        lineNumber: 131,
        columnNumber: 9
    }, this);
}
function RouteShortcut({ href, label, description }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: "group block rounded-xl border border-white/10 bg-black/20 p-3 hover:border-white/20 hover:bg-black/35 transition-colors",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-medium text-white",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 150,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-slate-400 mt-1 group-hover:text-slate-300 transition-colors",
                children: description
            }, void 0, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 151,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/ProtocolUI.tsx",
        lineNumber: 149,
        columnNumber: 9
    }, this);
}
function MarketModeSwitch({ base, active }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-white/10 bg-black/30 p-1 inline-flex gap-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: `${base}/usdc`,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', active === 'usdc' ? 'bg-white text-black' : 'text-slate-300 hover:bg-white/10 hover:text-white'),
                children: "USDC Collateral"
            }, void 0, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 165,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: `${base}/pas`,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', active === 'pas' ? 'bg-white text-black' : 'text-slate-300 hover:bg-white/10 hover:text-white'),
                children: "PAS Collateral"
            }, void 0, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 174,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/ProtocolUI.tsx",
        lineNumber: 164,
        columnNumber: 9
    }, this);
}
}),
"[project]/lib/input.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parsePasInput",
    ()=>parsePasInput,
    "parseUsdcInput",
    ()=>parseUsdcInput,
    "validAddress",
    ()=>validAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/address/isAddress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseUnits.js [app-ssr] (ecmascript)");
;
function parseUsdcInput(raw) {
    const cleaned = raw.trim();
    if (!cleaned) return null;
    const value = Number(cleaned);
    if (!Number.isFinite(value) || value <= 0) return null;
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseUnits"])(cleaned, 6);
    } catch  {
        return null;
    }
}
function parsePasInput(raw) {
    const cleaned = raw.trim();
    if (!cleaned) return null;
    const value = Number(cleaned);
    if (!Number.isFinite(value) || value <= 0) return null;
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseUnits"])(cleaned, 18);
    } catch  {
        return null;
    }
}
function validAddress(raw) {
    const addr = raw.trim();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"])(addr) ? addr : null;
}
}),
"[project]/hooks/useProtocolData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bpsToPercent",
    ()=>bpsToPercent,
    "fmtCount",
    ()=>fmtCount,
    "fmtOraclePrice8",
    ()=>fmtOraclePrice8,
    "fmtTimestamp",
    ()=>fmtTimestamp,
    "fmtToken",
    ()=>fmtToken,
    "fmtUsd6",
    ()=>fmtUsd6,
    "formatHealthFactor",
    ()=>formatHealthFactor,
    "healthState",
    ()=>healthState,
    "tierLabel",
    ()=>tierLabel,
    "useBorrowHistory",
    ()=>useBorrowHistory,
    "useGlobalProtocolData",
    ()=>useGlobalProtocolData,
    "useLendingHistory",
    ()=>useLendingHistory,
    "useStrategyData",
    ()=>useStrategyData,
    "useUserPortfolio",
    ()=>useUserPortfolio,
    "useUserScore",
    ()=>useUserScore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/abitype/dist/esm/human-readable/parseAbiItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useConnection.js [app-ssr] (ecmascript) <export useConnection as useAccount>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useBalance.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/addresses.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const defaultMarket = {
    totalDeposited: 0n,
    totalBorrowed: 0n,
    utilizationBps: 0n,
    protocolFees: 0n
};
const defaultOracle = {
    price8: 0n,
    updatedAt: 0n,
    roundId: 0n,
    isCrashed: false
};
const defaultScore = {
    score: 0n,
    tier: 0,
    collateralRatioBps: 0,
    interestRateBps: 0,
    blockNumber: 0n
};
function tierLabel(tier) {
    if (tier >= 5) return 'DIAMOND';
    if (tier === 4) return 'PLATINUM';
    if (tier === 3) return 'GOLD';
    if (tier === 2) return 'SILVER';
    if (tier === 1) return 'BRONZE';
    return 'ANON';
}
function useGlobalProtocolData() {
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const [lending, setLending] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](defaultMarket);
    const [pasMarket, setPasMarket] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](defaultMarket);
    const [oracle, setOracle] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](defaultOracle);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const refresh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async ()=>{
        if (!publicClient) return;
        setLoading(true);
        setError(null);
        try {
            const [lendingDeposited, lendingBorrowed, lendingUtil, lendingFees, pasDeposited, pasBorrowed, pasUtil, pasFees, oracleTuple, isCrashed] = await Promise.all([
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'totalDeposited'
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'totalBorrowed'
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'utilizationRate'
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'protocolFees'
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'totalDeposited'
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'totalBorrowed'
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'utilizationRate'
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'protocolFees'
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oracle,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].PAS_ORACLE,
                    functionName: 'latestRoundData'
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oracle,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].PAS_ORACLE,
                    functionName: 'isCrashed'
                })
            ]);
            setLending({
                totalDeposited: lendingDeposited,
                totalBorrowed: lendingBorrowed,
                utilizationBps: lendingUtil,
                protocolFees: lendingFees
            });
            setPasMarket({
                totalDeposited: pasDeposited,
                totalBorrowed: pasBorrowed,
                utilizationBps: pasUtil,
                protocolFees: pasFees
            });
            setOracle({
                roundId: oracleTuple[0],
                price8: oracleTuple[1],
                updatedAt: oracleTuple[3],
                isCrashed
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to refresh protocol data');
        } finally{
            setLoading(false);
        }
    }, [
        publicClient
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        refresh();
        const id = window.setInterval(refresh, 30_000);
        return ()=>window.clearInterval(id);
    }, [
        refresh
    ]);
    return {
        lending,
        pasMarket,
        oracle,
        loading,
        error,
        refresh
    };
}
function useUserScore() {
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const [score, setScore] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](defaultScore);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const refresh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async ()=>{
        if (!publicClient || !address) return;
        setLoading(true);
        setError(null);
        try {
            const [res, blockNumber] = await Promise.all([
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'getScore',
                    args: [
                        address
                    ]
                }),
                publicClient.getBlockNumber()
            ]);
            setScore({
                score: res[0],
                tier: Number(res[1]),
                collateralRatioBps: res[2],
                interestRateBps: res[3],
                blockNumber
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to fetch score');
        } finally{
            setLoading(false);
        }
    }, [
        publicClient,
        address
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (address) refresh();
    }, [
        address,
        refresh
    ]);
    return {
        score,
        loading,
        error,
        refresh
    };
}
function useUserPortfolio() {
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const { data: nativePas } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBalance"])({
        address
    });
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const [state, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({
        lendingDeposit: 0n,
        lendingPendingYield: 0n,
        lendingCollateralWallet: 0n,
        lendingPosition: [
            0n,
            0n,
            0n,
            0n,
            0,
            0,
            false
        ],
        lendingHealthRatio: 0n,
        pasDeposit: 0n,
        pasPendingYield: 0n,
        pasCollateralWallet: 0n,
        pasPosition: [
            0n,
            0n,
            0n,
            0n,
            0n,
            0,
            0,
            false
        ],
        pasHealthRatio: 0n,
        governance: [
            0n,
            0,
            0n
        ],
        lendingRepaymentCount: 0n,
        lendingLiquidationCount: 0n,
        lendingTotalDepositedEver: 0n,
        lendingFirstSeenBlock: 0n,
        pasRepaymentCount: 0n,
        pasLiquidationCount: 0n,
        pasTotalDepositedEver: 0n,
        pasFirstSeenBlock: 0n
    });
    const hasLoadedOnce = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const refresh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async ()=>{
        if (!publicClient || !address) return;
        // Only show the loading spinner for the initial fetch; background ticks are silent.
        if (!hasLoadedOnce.current) setLoading(true);
        setError(null);
        try {
            const [lendingDeposit, lendingPendingYield, lendingCollateralWallet, lendingPosition, lendingHealthRatio, pasDeposit, pasPendingYield, pasCollateralWallet, pasPosition, pasHealthRatio, governance, lendingRepaymentCount, lendingLiquidationCount, lendingTotalDepositedEver, lendingFirstSeenBlock, pasRepaymentCount, pasLiquidationCount, pasTotalDepositedEver, pasFirstSeenBlock] = await Promise.all([
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'depositBalance',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'pendingYield',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'collateralBalance',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'getPositionFull',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'healthRatio',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'depositBalance',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'pendingYield',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'collateralBalance',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'getPositionFull',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'healthRatio',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].governanceCache,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].GOVERNANCE_CACHE,
                    functionName: 'getGovernanceData',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'repaymentCount',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'liquidationCount',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'totalDepositedEver',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'firstSeenBlock',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'repaymentCount',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'liquidationCount',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'totalDepositedEver',
                    args: [
                        address
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'firstSeenBlock',
                    args: [
                        address
                    ]
                })
            ]);
            setState({
                lendingDeposit,
                lendingPendingYield,
                lendingCollateralWallet,
                lendingPosition: [
                    lendingPosition[0],
                    lendingPosition[1],
                    lendingPosition[2],
                    lendingPosition[3],
                    lendingPosition[4],
                    lendingPosition[5],
                    lendingPosition[6]
                ],
                lendingHealthRatio,
                pasDeposit,
                pasPendingYield,
                pasCollateralWallet,
                pasPosition: [
                    pasPosition[0],
                    pasPosition[1],
                    pasPosition[2],
                    pasPosition[3],
                    pasPosition[4],
                    pasPosition[5],
                    pasPosition[6],
                    pasPosition[7]
                ],
                pasHealthRatio,
                governance: [
                    governance[0],
                    governance[1],
                    governance[2]
                ],
                lendingRepaymentCount,
                lendingLiquidationCount,
                lendingTotalDepositedEver,
                lendingFirstSeenBlock,
                pasRepaymentCount,
                pasLiquidationCount,
                pasTotalDepositedEver,
                pasFirstSeenBlock
            });
            hasLoadedOnce.current = true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to fetch portfolio data');
        } finally{
            setLoading(false);
        }
    }, [
        publicClient,
        address
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (address) {
            refresh();
            const id = window.setInterval(refresh, 30_000);
            return ()=>window.clearInterval(id);
        }
    }, [
        address,
        refresh
    ]);
    return {
        ...state,
        nativePas: nativePas?.value ?? 0n,
        loading,
        error,
        refresh
    };
}
function bpsToPercent(bps, digits = 2) {
    const raw = typeof bps === 'number' ? bps : Number(bps);
    return `${(raw / 100).toFixed(digits)}%`;
}
function formatHealthFactor(bps, digits = 2) {
    const raw = typeof bps === 'number' ? bps : Number(bps);
    // type(uint256).max signals no active position - both contracts use this as sentinel
    if (raw > 1_000_000_000) return '∞';
    // Both KredioLending and KredioPASMarket return (collateral * 10000) / owed (BPS)
    return (raw / 10000).toFixed(digits) + 'x';
}
function fmtUsd6(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])(value, 6, 2, false);
}
function fmtToken(value, decimals, digits = 4) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])(value, decimals, digits, false);
}
function fmtCount(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatInteger"])(value);
}
function fmtOraclePrice8(value) {
    return `$${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])(value, 8, 4, true)}`;
}
function fmtTimestamp(seconds) {
    const millis = Number(seconds) * 1000;
    if (!Number.isFinite(millis) || millis <= 0) return 'N/A';
    return new Date(millis).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}
function healthState(healthBps) {
    const value = Number(healthBps);
    if (value < 11_000) return 'red';
    if (value < 15_000) return 'yellow';
    return 'green';
}
const STRATEGY_ZERO_ADDR = '0x0000000000000000000000000000000000000000';
const defaultStrategy = {
    pool: STRATEGY_ZERO_ADDR,
    investedAmount: 0n,
    totalStrategyYieldEarned: 0n,
    pendingStrategyYield: 0n,
    investRatioBps: 5000n,
    minBufferBps: 2000n,
    isActive: false
};
function useStrategyData() {
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const [strategy, setStrategy] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](defaultStrategy);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const refresh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async ()=>{
        if (!publicClient) return;
        setLoading(true);
        try {
            const result = await publicClient.readContract({
                address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                functionName: 'strategyStatus'
            });
            setStrategy({
                pool: result[0],
                investedAmount: result[1],
                totalStrategyYieldEarned: result[2],
                pendingStrategyYield: result[3],
                investRatioBps: result[4],
                minBufferBps: result[5],
                isActive: result[1] > 0n
            });
        } catch  {
        // Strategy not yet deployed on this lending contract - keep defaults silently.
        } finally{
            setLoading(false);
        }
    }, [
        publicClient
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        refresh();
        const id = window.setInterval(refresh, 30_000);
        return ()=>window.clearInterval(id);
    }, [
        refresh
    ]);
    return {
        strategy,
        loading,
        refresh
    };
}
// First block of the deployed contracts (0x5c2456 = 6,038,614)
const DEPLOY_BLOCK = 6_038_614n;
function useLendingHistory() {
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const [history, setHistory] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const refresh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async ()=>{
        if (!publicClient || !address) return;
        setLoading(true);
        try {
            const addrLower = address.toLowerCase();
            const [harvestedL, depositedL, withdrawnL, harvestedP, depositedP, withdrawnP] = await Promise.all([
                publicClient.getLogs({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"])('event YieldHarvested(address indexed lender, uint256 amount)'),
                    fromBlock: DEPLOY_BLOCK
                }),
                publicClient.getLogs({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Deposited(address indexed user, uint256 amount)'),
                    fromBlock: DEPLOY_BLOCK
                }),
                publicClient.getLogs({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Withdrawn(address indexed user, uint256 amount)'),
                    fromBlock: DEPLOY_BLOCK
                }),
                publicClient.getLogs({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"])('event YieldHarvested(address indexed lender, uint256 amount)'),
                    fromBlock: DEPLOY_BLOCK
                }),
                publicClient.getLogs({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Deposited(address indexed lender, uint256 amount)'),
                    fromBlock: DEPLOY_BLOCK
                }),
                publicClient.getLogs({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Withdrawn(address indexed lender, uint256 amount)'),
                    fromBlock: DEPLOY_BLOCK
                })
            ]);
            const entries = [];
            for (const log of harvestedL){
                if (log.args.lender?.toLowerCase() !== addrLower) continue;
                entries.push({
                    type: 'yield',
                    market: 'USDC Market',
                    amount: log.args.amount ?? 0n,
                    blockNumber: log.blockNumber ?? 0n,
                    txHash: log.transactionHash ?? ''
                });
            }
            for (const log of depositedL){
                if (log.args.user?.toLowerCase() !== addrLower) continue;
                entries.push({
                    type: 'deposit',
                    market: 'USDC Market',
                    amount: log.args.amount ?? 0n,
                    blockNumber: log.blockNumber ?? 0n,
                    txHash: log.transactionHash ?? ''
                });
            }
            for (const log of withdrawnL){
                if (log.args.user?.toLowerCase() !== addrLower) continue;
                entries.push({
                    type: 'withdraw',
                    market: 'USDC Market',
                    amount: log.args.amount ?? 0n,
                    blockNumber: log.blockNumber ?? 0n,
                    txHash: log.transactionHash ?? ''
                });
            }
            for (const log of harvestedP){
                if (log.args.lender?.toLowerCase() !== addrLower) continue;
                entries.push({
                    type: 'yield',
                    market: 'PAS Market',
                    amount: log.args.amount ?? 0n,
                    blockNumber: log.blockNumber ?? 0n,
                    txHash: log.transactionHash ?? ''
                });
            }
            for (const log of depositedP){
                if (log.args.lender?.toLowerCase() !== addrLower) continue;
                entries.push({
                    type: 'deposit',
                    market: 'PAS Market',
                    amount: log.args.amount ?? 0n,
                    blockNumber: log.blockNumber ?? 0n,
                    txHash: log.transactionHash ?? ''
                });
            }
            for (const log of withdrawnP){
                if (log.args.lender?.toLowerCase() !== addrLower) continue;
                entries.push({
                    type: 'withdraw',
                    market: 'PAS Market',
                    amount: log.args.amount ?? 0n,
                    blockNumber: log.blockNumber ?? 0n,
                    txHash: log.transactionHash ?? ''
                });
            }
            entries.sort((a, b)=>b.blockNumber > a.blockNumber ? 1 : -1);
            setHistory(entries.slice(0, 100));
        } catch (err) {
            console.error('useLendingHistory:', err);
        } finally{
            setLoading(false);
        }
    }, [
        publicClient,
        address
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (address) refresh();
    }, [
        address,
        refresh
    ]);
    return {
        history,
        loading,
        refresh
    };
}
function useBorrowHistory() {
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const [history, setHistory] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const refresh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async ()=>{
        if (!publicClient || !address) return;
        setLoading(true);
        try {
            const addrLower = address.toLowerCase();
            const [borrowedL, repaidL, liquidatedL, borrowedP, repaidP, liquidatedP] = await Promise.all([
                publicClient.getLogs({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Borrowed(address indexed user, uint256 amount, uint8 tier, uint32 ratioBps)'),
                    fromBlock: DEPLOY_BLOCK
                }),
                publicClient.getLogs({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Repaid(address indexed user, uint256 principal, uint256 interest)'),
                    fromBlock: DEPLOY_BLOCK
                }),
                publicClient.getLogs({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Liquidated(address indexed borrower, address indexed liquidator)'),
                    fromBlock: DEPLOY_BLOCK
                }),
                publicClient.getLogs({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Borrowed(address indexed borrower, uint256 usdcAmount)'),
                    fromBlock: DEPLOY_BLOCK
                }),
                publicClient.getLogs({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Repaid(address indexed borrower, uint256 totalOwed)'),
                    fromBlock: DEPLOY_BLOCK
                }),
                publicClient.getLogs({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Liquidated(address indexed borrower, address indexed liquidator, uint256 pasSeized, uint256 usdcRepaid)'),
                    fromBlock: DEPLOY_BLOCK
                })
            ]);
            const entries = [];
            for (const log of borrowedL){
                if (log.args.user?.toLowerCase() !== addrLower) continue;
                entries.push({
                    type: 'borrow',
                    market: 'USDC Market',
                    amount: log.args.amount ?? 0n,
                    collateralSeized: 0n,
                    blockNumber: log.blockNumber ?? 0n,
                    txHash: log.transactionHash ?? '',
                    liquidator: ''
                });
            }
            for (const log of repaidL){
                if (log.args.user?.toLowerCase() !== addrLower) continue;
                const principal = log.args.principal ?? 0n;
                const interest = log.args.interest ?? 0n;
                entries.push({
                    type: 'repay',
                    market: 'USDC Market',
                    amount: principal + interest,
                    collateralSeized: 0n,
                    blockNumber: log.blockNumber ?? 0n,
                    txHash: log.transactionHash ?? '',
                    liquidator: ''
                });
            }
            for (const log of liquidatedL){
                if (log.args.borrower?.toLowerCase() !== addrLower) continue;
                entries.push({
                    type: 'liquidate',
                    market: 'USDC Market',
                    amount: 0n,
                    collateralSeized: 0n,
                    blockNumber: log.blockNumber ?? 0n,
                    txHash: log.transactionHash ?? '',
                    liquidator: log.args.liquidator ?? ''
                });
            }
            for (const log of borrowedP){
                if (log.args.borrower?.toLowerCase() !== addrLower) continue;
                entries.push({
                    type: 'borrow',
                    market: 'PAS Market',
                    amount: log.args.usdcAmount ?? 0n,
                    collateralSeized: 0n,
                    blockNumber: log.blockNumber ?? 0n,
                    txHash: log.transactionHash ?? '',
                    liquidator: ''
                });
            }
            for (const log of repaidP){
                if (log.args.borrower?.toLowerCase() !== addrLower) continue;
                entries.push({
                    type: 'repay',
                    market: 'PAS Market',
                    amount: log.args.totalOwed ?? 0n,
                    collateralSeized: 0n,
                    blockNumber: log.blockNumber ?? 0n,
                    txHash: log.transactionHash ?? '',
                    liquidator: ''
                });
            }
            for (const log of liquidatedP){
                if (log.args.borrower?.toLowerCase() !== addrLower) continue;
                entries.push({
                    type: 'liquidate',
                    market: 'PAS Market',
                    amount: log.args.usdcRepaid ?? 0n,
                    collateralSeized: log.args.pasSeized ?? 0n,
                    blockNumber: log.blockNumber ?? 0n,
                    txHash: log.transactionHash ?? '',
                    liquidator: log.args.liquidator ?? ''
                });
            }
            entries.sort((a, b)=>b.blockNumber > a.blockNumber ? 1 : -1);
            setHistory(entries.slice(0, 100));
        } catch (err) {
            console.error('useBorrowHistory:', err);
        } finally{
            setLoading(false);
        }
    }, [
        publicClient,
        address
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (address) refresh();
    }, [
        address,
        refresh
    ]);
    return {
        history,
        loading,
        refresh
    };
}
}),
"[project]/hooks/useProtocolActions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProtocolActions",
    ()=>useProtocolActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseUnits.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useConnection.js [app-ssr] (ecmascript) <export useConnection as useAccount>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useChainId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWalletClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/addresses.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$ActionLogProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/ActionLogProvider.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function toErrorMessage(error) {
    if (error instanceof Error) return error.message;
    return 'Unknown wallet error';
}
function useProtocolActions() {
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChainId"])();
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const { data: walletClient } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWalletClient"])();
    const { logAction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$ActionLogProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useActionLog"])();
    const ensureWallet = (action, market)=>{
        if (!address || !walletClient || !publicClient) {
            logAction({
                level: 'warning',
                action,
                detail: 'Connect wallet to continue',
                market
            });
            return 'Wallet not connected';
        }
        if (chainId !== __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].chainId) {
            logAction({
                level: 'warning',
                action,
                detail: `Switch network to chain ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].chainId}`,
                market
            });
            return 'Wrong network';
        }
        return null;
    };
    const approveMUSDC = async (spender, amount)=>{
        const missing = ensureWallet('Approve mUSDC', 'system');
        if (missing) return {
            ok: false,
            error: missing
        };
        if (amount <= 0n) {
            logAction({
                level: 'warning',
                action: 'Approve mUSDC',
                detail: 'Approval amount must be greater than 0',
                market: 'system'
            });
            return {
                ok: false,
                error: 'Invalid amount'
            };
        }
        try {
            const hash = await walletClient.writeContract({
                address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].mUSDC,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].ERC20,
                functionName: 'approve',
                args: [
                    spender,
                    amount
                ]
            });
            await publicClient.waitForTransactionReceipt({
                hash
            });
            logAction({
                level: 'success',
                action: 'Approve mUSDC',
                detail: 'Allowance update confirmed',
                txHash: hash,
                market: 'system'
            });
            return {
                ok: true,
                hash
            };
        } catch (error) {
            const message = toErrorMessage(error);
            logAction({
                level: 'error',
                action: 'Approve mUSDC',
                detail: message,
                market: 'system'
            });
            return {
                ok: false,
                error: message
            };
        }
    };
    const tx = async (title, market, run)=>{
        const missing = ensureWallet(title, market);
        if (missing) return {
            ok: false,
            error: missing
        };
        try {
            logAction({
                action: title,
                detail: 'Waiting for wallet confirmation…',
                market
            });
            const hash = await run();
            await publicClient.waitForTransactionReceipt({
                hash
            });
            logAction({
                level: 'success',
                action: title,
                detail: 'Transaction confirmed',
                txHash: hash,
                market
            });
            return {
                ok: true,
                hash
            };
        } catch (error) {
            const message = toErrorMessage(error);
            logAction({
                level: 'error',
                action: title,
                detail: message,
                market
            });
            return {
                ok: false,
                error: message
            };
        }
    };
    return {
        approveMUSDC,
        depositLending: (amount)=>tx('Deposit to KredioLending', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'deposit',
                    args: [
                        amount
                    ]
                })),
        withdrawLending: (amount)=>tx('Withdraw from KredioLending', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'withdraw',
                    args: [
                        amount
                    ]
                })),
        harvestLending: ()=>tx('Harvest lending yield', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'pendingYieldAndHarvest',
                    args: [
                        address
                    ]
                })),
        depositLendingCollateral: (amount)=>tx('Deposit USDC collateral', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'depositCollateral',
                    args: [
                        amount
                    ]
                })),
        withdrawLendingCollateral: ()=>tx('Withdraw USDC collateral', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'withdrawCollateral'
                })),
        borrowLending: (amount)=>tx('Borrow from KredioLending', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'borrow',
                    args: [
                        amount
                    ]
                })),
        repayLending: ()=>tx('Repay KredioLending debt', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'repay'
                })),
        liquidateLending: (borrower)=>tx('Liquidate KredioLending position', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'liquidate',
                    args: [
                        borrower
                    ]
                })),
        adminLiquidateLending: (borrower)=>tx('Admin liquidate KredioLending position', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminLiquidate',
                    args: [
                        borrower
                    ]
                })),
        adminForceCloseLending: (user)=>tx('Force-close KredioLending position', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminForceClose',
                    args: [
                        user
                    ]
                })),
        sweepLendingFees: (to)=>tx('Sweep Lending protocol fees', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'sweepProtocolFees',
                    args: [
                        to
                    ]
                })),
        setLendingMultiplier: (borrower, multiplier)=>tx('Set Lending demo multiplier', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'setDemoMultiplier',
                    args: [
                        borrower,
                        multiplier
                    ]
                })),
        depositPasLend: (amount)=>tx('Deposit to PAS market pool', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'deposit',
                    args: [
                        amount
                    ]
                })),
        withdrawPasLend: (amount)=>tx('Withdraw from PAS market pool', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'withdraw',
                    args: [
                        amount
                    ]
                })),
        harvestPasLend: ()=>tx('Harvest PAS market yield', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'pendingYieldAndHarvest',
                    args: [
                        address
                    ]
                })),
        depositPasCollateral: (amountPasEth)=>tx('Deposit PAS collateral', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'depositCollateral',
                    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseUnits"])(amountPasEth, 18)
                })),
        withdrawPasCollateral: ()=>tx('Withdraw PAS collateral', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'withdrawCollateral'
                })),
        borrowPas: (amount)=>tx('Borrow from PAS market', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'borrow',
                    args: [
                        amount
                    ]
                })),
        repayPas: ()=>tx('Repay PAS market debt', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'repay'
                })),
        liquidatePas: (borrower)=>tx('Liquidate PAS position', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'liquidate',
                    args: [
                        borrower
                    ]
                })),
        adminLiquidatePas: (borrower)=>tx('Admin liquidate PAS position', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminLiquidate',
                    args: [
                        borrower
                    ]
                })),
        adminForceClosePas: (user)=>tx('Force-close PAS market position', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminForceClose',
                    args: [
                        user
                    ]
                })),
        // ── New bulk / demo admin actions ────────────────────────────────
        adminSetLendingTick: (tick)=>tx('Set Lending global tick', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminSetGlobalTick',
                    args: [
                        tick
                    ]
                })),
        adminSetPasTick: (tick)=>tx('Set PAS global tick', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminSetGlobalTick',
                    args: [
                        tick
                    ]
                })),
        adminForceCloseAllLending: (users)=>tx('Force-close ALL Lending positions', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminForceCloseAll',
                    args: [
                        users
                    ]
                })),
        adminForceCloseAllPas: (users)=>tx('Force-close ALL PAS positions', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminForceCloseAll',
                    args: [
                        users
                    ]
                })),
        adminBulkWithdrawLending: (depositors)=>tx('Bulk-withdraw ALL Lending deposits', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminBulkWithdrawDeposits',
                    args: [
                        depositors
                    ]
                })),
        adminBulkWithdrawPas: (depositors)=>tx('Bulk-withdraw ALL PAS deposits', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminBulkWithdrawDeposits',
                    args: [
                        depositors
                    ]
                })),
        adminTickPoolLending: (borrowers)=>tx('Tick Lending pool interest', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminTickPool',
                    args: [
                        borrowers
                    ]
                })),
        adminTickPoolPas: (borrowers)=>tx('Tick PAS pool interest', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminTickPool',
                    args: [
                        borrowers
                    ]
                })),
        adminResetUserScoreLending: (users)=>tx('Reset Lending user scores', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminResetUserScores',
                    args: [
                        users
                    ]
                })),
        adminResetUserScorePas: (users)=>tx('Reset PAS user scores', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminResetUserScores',
                    args: [
                        users
                    ]
                })),
        adminHardResetLending: (to)=>tx('HARD RESET Lending pool', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminHardReset',
                    args: [
                        to
                    ]
                })),
        adminHardResetPas: (to)=>tx('HARD RESET PAS pool', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminHardReset',
                    args: [
                        to
                    ]
                })),
        adminCleanLending: (to, users, depositors)=>tx('Clean Lending pool', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminCleanContract',
                    args: [
                        to,
                        users,
                        depositors
                    ]
                })),
        adminCleanPas: (to, users, depositors)=>tx('Clean PAS pool', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminCleanContract',
                    args: [
                        to,
                        users,
                        depositors
                    ]
                })),
        sweepPasFees: (to)=>tx('Sweep PAS market fees', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'sweepProtocolFees',
                    args: [
                        to
                    ]
                })),
        setPasMultiplier: (user, multiplier)=>tx('Set PAS demo multiplier', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'setDemoMultiplier',
                    args: [
                        user,
                        multiplier
                    ]
                })),
        setPasRiskParams: (ltvBps, liqBonusBps, stalenessLimit, protocolFeeBps)=>tx('Update PAS risk params', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'setRiskParams',
                    args: [
                        ltvBps,
                        liqBonusBps,
                        stalenessLimit,
                        protocolFeeBps
                    ]
                })),
        setPasOracle: (newOracle)=>tx('Set PAS oracle', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'setOracle',
                    args: [
                        newOracle
                    ]
                })),
        pausePas: ()=>tx('Pause PAS market', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'pause'
                })),
        unpausePas: ()=>tx('Unpause PAS market', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'unpause'
                })),
        oracleCrash: (price8)=>tx('Inject oracle crash', 'system', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oracle,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].PAS_ORACLE,
                    functionName: 'crash',
                    args: [
                        price8
                    ]
                })),
        oracleRecover: ()=>tx('Recover oracle', 'system', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oracle,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].PAS_ORACLE,
                    functionName: 'recover'
                })),
        oracleSetPrice: (price8)=>tx('Set oracle price', 'system', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oracle,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].PAS_ORACLE,
                    functionName: 'setPrice',
                    args: [
                        price8
                    ]
                })),
        setGovernanceData: (user, votes, conviction)=>tx('Update GovernanceCache entry', 'system', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].governanceCache,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].GOVERNANCE_CACHE,
                    functionName: 'setGovernanceData',
                    args: [
                        user,
                        votes,
                        conviction
                    ]
                })),
        // ── Intelligent Yield Strategy ────────────────────────────────────
        yieldSetPool: (pool)=>tx('Set yield pool address', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminSetYieldPool',
                    args: [
                        pool
                    ]
                })),
        yieldInvest: (amount)=>tx('Invest into yield pool', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminInvest',
                    args: [
                        amount
                    ]
                })),
        yieldPullBack: (amount)=>tx('Pull back from yield pool', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminPullBack',
                    args: [
                        amount
                    ]
                })),
        yieldClaimAndInject: ()=>tx('Claim yield and inject into lender pool', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminClaimAndInjectYield'
                })),
        yieldSetStrategyParams: (investRatioBps, minBufferBps)=>tx('Update yield strategy params', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminSetStrategyParams',
                    args: [
                        investRatioBps,
                        minBufferBps
                    ]
                })),
        yieldSetRate: (rateBps)=>tx('Set MockYieldPool yield rate', 'system', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].yieldPool,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].MOCK_YIELD_POOL,
                    functionName: 'setYieldRate',
                    args: [
                        rateBps
                    ]
                }))
    };
}
}),
"[project]/components/modules/borrow/BorrowUsdcFeature.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BorrowUsdcFeature",
    ()=>BorrowUsdcFeature
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useConnection.js [app-ssr] (ecmascript) <export useConnection as useAccount>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/addresses.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$input$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/input.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/ProtocolUI.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useProtocolData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolActions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useProtocolActions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAccess$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useAccess.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
// ── Shared sub-components ──────────────────────────────────────────────────
function Spinner({ small }) {
    const s = small ? 'w-3 h-3 border' : 'w-4 h-4 border-2';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-block rounded-full border-current border-t-transparent animate-spin shrink-0 ${s}`
    }, void 0, false, {
        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
        lineNumber: 18,
        columnNumber: 12
    }, this);
}
function Check() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-4 h-4 shrink-0 text-emerald-400",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M5 13l4 4L19 7"
        }, void 0, false, {
            fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
            lineNumber: 23,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
        lineNumber: 22,
        columnNumber: 9
    }, this);
}
function SectionLabel({ n, label, done }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 mb-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0', done ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'),
                children: done ? '✓' : n
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 30,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-semibold text-white",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 36,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
        lineNumber: 29,
        columnNumber: 9
    }, this);
}
function InfoRow({ label, value, tone }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-slate-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 43,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('font-medium', tone === 'green' && 'text-emerald-300', tone === 'yellow' && 'text-amber-300', tone === 'red' && 'text-rose-300', (!tone || tone === 'default') && 'text-white'),
                children: value
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 44,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
        lineNumber: 42,
        columnNumber: 9
    }, this);
}
function CollateralStep({ onSuccess }) {
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const portfolio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserPortfolio"])();
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [dismissed, setDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const amountAtoms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$input$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseUsdcInput"])(input);
    // mUSDC wallet balance
    const { data: balRaw } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].mUSDC,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].ERC20,
        functionName: 'balanceOf',
        args: [
            address ?? '0x0000000000000000000000000000000000000000'
        ],
        query: {
            enabled: !!address
        }
    });
    const musdcBalance = balRaw ?? 0n;
    // Credit score from KredioLending → determines collateral ratio
    const { data: scoreRaw } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
        functionName: 'getScore',
        args: [
            address ?? '0x0000000000000000000000000000000000000000'
        ],
        query: {
            enabled: !!address
        }
    });
    const score = scoreRaw;
    const collateralRatioBps = score ? Number(score[2]) : 20000;
    const interestBps = score ? Number(score[3]) : 500;
    const userTierNum = score ? Number(score[1]) : 0;
    // maxBorrow = (collateral * 10000) / collateralRatioBps
    const maxBorrowAtoms = amountAtoms && collateralRatioBps > 0 ? amountAtoms * 10000n / BigInt(collateralRatioBps) : 0n;
    const overBalance = !!amountAtoms && amountAtoms > musdcBalance;
    const { writeContract: writeApprove, data: approveHash, isPending: approveSigning, isError: approveError, reset: resetApprove } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { isSuccess: approveSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: approveHash
    });
    const { writeContract: writeDeposit, data: depositHash, isPending: depositSigning, isError: depositError, reset: resetDeposit } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { isSuccess: depositSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: depositHash
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (approveError || depositError) {
            setPhase('error');
            const t = setTimeout(()=>{
                setPhase('idle');
                resetApprove();
                resetDeposit();
            }, 3000);
            return ()=>clearTimeout(t);
        }
    }, [
        approveError,
        depositError,
        resetApprove,
        resetDeposit
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (approveSigning) setPhase('approving');
    }, [
        approveSigning
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (depositSigning) setPhase('depositing');
    }, [
        depositSigning
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!approveSuccess || !amountAtoms) return;
        setPhase('approved');
        setTimeout(()=>{
            writeDeposit({
                address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                functionName: 'depositCollateral',
                args: [
                    amountAtoms
                ]
            });
        }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        approveSuccess
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!depositSuccess || !amountAtoms) return;
        setPhase('success');
        portfolio.refresh();
        const mb = collateralRatioBps > 0 ? amountAtoms * 10000n / BigInt(collateralRatioBps) : 0n;
        onSuccess(amountAtoms, mb);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        depositSuccess
    ]);
    const handleDeposit = ()=>{
        if (!amountAtoms) return;
        resetApprove();
        resetDeposit();
        setPhase('approving');
        writeApprove({
            address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].mUSDC,
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].ERC20,
            functionName: 'approve',
            args: [
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
                amountAtoms
            ]
        });
    };
    const isProcessing = phase === 'approving' || phase === 'approved' || phase === 'depositing';
    const btnLabel = phase === 'error' ? 'Action Cancelled' : phase === 'approving' ? 'Step 1/2 - Approving…' : phase === 'approved' ? 'Approved ✓' : phase === 'depositing' ? 'Step 2/2 - Depositing…' : amountAtoms ? `Deposit ${input} mUSDC as Collateral` : 'Deposit Collateral';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            address && score && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-white/10 bg-black/30 px-4 py-3 space-y-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Credit score",
                        value: `${score[0].toString()} (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tierLabel"])(userTierNum)})`
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 141,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Collateral ratio",
                        value: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bpsToPercent"])(collateralRatioBps)} required`
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 142,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Borrow interest",
                        value: `${(interestBps / 100).toFixed(2)}% APR`
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 143,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 140,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-xs uppercase tracking-wide text-slate-400",
                        children: "mUSDC to deposit as collateral"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 148,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: "0",
                                step: "any",
                                placeholder: "0.00",
                                value: input,
                                onChange: (e)=>setInput(e.target.value),
                                disabled: isProcessing || phase === 'success',
                                className: "flex-1 bg-transparent text-xl font-light text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            }, void 0, false, {
                                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                lineNumber: 150,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2.5 py-1",
                                children: "mUSDC"
                            }, void 0, false, {
                                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                lineNumber: 154,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 149,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs px-1 text-slate-500",
                        children: [
                            "Balance: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-300",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])(musdcBalance, 6, 4, false),
                                    " mUSDC"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                lineNumber: 157,
                                columnNumber: 30
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 156,
                        columnNumber: 17
                    }, this),
                    overBalance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-rose-400 px-1",
                        children: "Amount exceeds balance"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 159,
                        columnNumber: 33
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 147,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('rounded-xl border px-4 py-3 space-y-0 transition-opacity', amountAtoms && !overBalance ? 'border-white/10 bg-black/30' : 'border-white/5 bg-black/10 opacity-35 pointer-events-none'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Collateral to deposit",
                        value: `${input || '-'} mUSDC`
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 164,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Max borrowable (based on score)",
                        value: amountAtoms ? `~${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])(maxBorrowAtoms, 6, 2, false)} mUSDC` : '-',
                        tone: "green"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 165,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Borrow interest rate",
                        value: `${(interestBps / 100).toFixed(2)}% APR`
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 166,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 162,
                columnNumber: 13
            }, this),
            !dismissed && !isProcessing && phase !== 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2.5 flex items-start justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-blue-200",
                        children: "ℹ 2 wallet confirmations required: approve mUSDC, then deposit as collateral."
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 171,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setDismissed(true),
                        className: "text-slate-500 hover:text-white text-xs shrink-0",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 172,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 170,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleDeposit,
                disabled: !amountAtoms || overBalance || isProcessing || phase === 'success' || phase === 'error',
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2', isProcessing ? 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed' : phase === 'error' ? 'bg-rose-500/20 border-rose-500/30 text-rose-400 cursor-not-allowed' : !amountAtoms || overBalance ? 'bg-white/5 border border-white/10 text-slate-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white'),
                children: [
                    isProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {}, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 181,
                        columnNumber: 34
                    }, this),
                    btnLabel
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 175,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
        lineNumber: 137,
        columnNumber: 9
    }, this);
}
// ── Step 2: Borrow mUSDC ──────────────────────────────────────────────────
function BorrowStep({ collateralAtoms, maxBorrowAtoms, onSuccess }) {
    const actions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolActions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProtocolActions"])();
    const portfolio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserPortfolio"])();
    const collateralDisplay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])(collateralAtoms, 6, 2, false);
    const maxBorrowDisplay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])(maxBorrowAtoms, 6, 2, false);
    const [pct, setPct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(75);
    const [manualInput, setManualInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [statusMsg, setStatusMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle');
    const borrowAtoms = (()=>{
        if (manualInput && Number(manualInput) > 0) {
            const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$input$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseUsdcInput"])(manualInput);
            return v ? v > maxBorrowAtoms ? maxBorrowAtoms : v : 0n;
        }
        return maxBorrowAtoms > 0n ? maxBorrowAtoms * BigInt(pct) / 100n : 0n;
    })();
    const borrowDisplay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])(borrowAtoms, 6, 2, false);
    // Estimated health in BPS: (collateral * 10000) / borrow - matches contract formula
    const estHealthBps = borrowAtoms > 0n ? collateralAtoms * 10000n / borrowAtoms : BigInt('999999999999999');
    const healthTone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["healthState"])(estHealthBps);
    const handleBorrow = async ()=>{
        if (borrowAtoms === 0n) return;
        setPhase('idle');
        setBusy(true);
        setStatusMsg('Waiting for MetaMask…');
        const res = await actions.borrowLending(borrowAtoms);
        if (res.ok) {
            setStatusMsg('Confirming…');
            await portfolio.refresh();
            setSuccess(true);
            onSuccess();
            setBusy(false);
            setStatusMsg('');
        } else {
            setBusy(false);
            setStatusMsg('');
            setPhase('error');
            setTimeout(()=>setPhase('idle'), 3000);
        }
    };
    if (success) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 text-emerald-300 font-semibold text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Check, {}, void 0, false, {
                            fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                            lineNumber: 239,
                            columnNumber: 97
                        }, this),
                        " Borrowed ",
                        borrowDisplay,
                        " mUSDC"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                    lineNumber: 239,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-slate-400",
                    children: "Your position is active. Manage repayments, view health, and withdraw collateral from your positions page."
                }, void 0, false, {
                    fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                    lineNumber: 240,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/dashboard",
                    className: "inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-indigo-200 transition-colors",
                    children: "View your position →"
                }, void 0, false, {
                    fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                    lineNumber: 241,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
            lineNumber: 238,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-white/10 bg-black/30 px-4 py-3 space-y-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Collateral deposited",
                        value: `${collateralDisplay} mUSDC`
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 252,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Max borrowable",
                        value: `${maxBorrowDisplay} mUSDC`
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 253,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 251,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            25,
                            50,
                            75,
                            100
                        ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setPct(p);
                                    setManualInput('');
                                },
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors', pct === p && !manualInput ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'),
                                children: [
                                    p,
                                    "%"
                                ]
                            }, p, true, {
                                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                lineNumber: 258,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 256,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: "0",
                                step: "any",
                                placeholder: `Max: ${maxBorrowDisplay}`,
                                value: manualInput,
                                onChange: (e)=>{
                                    setManualInput(e.target.value);
                                    setPct(0);
                                },
                                className: "flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            }, void 0, false, {
                                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                lineNumber: 266,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2 py-0.5",
                                children: "mUSDC"
                            }, void 0, false, {
                                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                lineNumber: 269,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 265,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 255,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-white/10 bg-black/30 px-4 py-3 space-y-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Amount to borrow",
                        value: `${borrowDisplay} mUSDC`
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 273,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Est. health ratio",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatHealthFactor"])(estHealthBps),
                        tone: healthTone
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 274,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 272,
                columnNumber: 13
            }, this),
            Number(estHealthBps) < 15000 && borrowAtoms > 0n && Number(estHealthBps) < 999998 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StateNotice"], {
                tone: "warning",
                message: "Health ratio is low - consider borrowing less."
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 278,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleBorrow,
                disabled: borrowAtoms === 0n || busy || phase === 'error',
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2', busy ? 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed' : phase === 'error' ? 'bg-rose-500/20 border-rose-500/30 text-rose-400 cursor-not-allowed' : borrowAtoms === 0n ? 'bg-white/5 border border-white/10 text-slate-600 cursor-not-allowed' : 'bg-emerald-700 hover:bg-emerald-600 text-white'),
                children: busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {}, void 0, false, {
                            fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                            lineNumber: 286,
                            columnNumber: 27
                        }, this),
                        statusMsg
                    ]
                }, void 0, true) : phase === 'error' ? 'Action Cancelled' : `Borrow ${borrowDisplay} mUSDC`
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 280,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
        lineNumber: 250,
        columnNumber: 9
    }, this);
}
function BorrowUsdcFeature() {
    const { isConnected, address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const { isWrongNetwork } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAccess$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccess"])();
    const portfolio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserPortfolio"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('collateral');
    const [collateralAtoms, setCollateralAtoms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0n);
    const [maxBorrowAtoms, setMaxBorrowAtoms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0n);
    const reset = ()=>{
        setStep('collateral');
        setCollateralAtoms(0n);
        setMaxBorrowAtoms(0n);
    };
    const hasActivePosition = portfolio.lendingPosition[6];
    // Fetch credit score at page level to compute maxBorrow for returning depositors
    const { data: scoreRaw } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
        functionName: 'getScore',
        args: [
            address ?? '0x0000000000000000000000000000000000000000'
        ],
        query: {
            enabled: !!address
        }
    });
    // Auto-advance to borrow step for users who already deposited collateral
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (portfolio.loading || !scoreRaw) return;
        const existingCollateral = portfolio.lendingCollateralWallet;
        if (existingCollateral > 0n && !hasActivePosition && step === 'collateral') {
            const score = scoreRaw;
            const ratioBps = Number(score[2]);
            const mb = ratioBps > 0 ? existingCollateral * 10000n / BigInt(ratioBps) : 0n;
            setCollateralAtoms(existingCollateral);
            setMaxBorrowAtoms(mb);
            setStep('borrow');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        portfolio.loading,
        portfolio.lendingCollateralWallet,
        scoreRaw
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-lg mx-auto space-y-4",
        children: [
            !isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StateNotice"], {
                tone: "info",
                message: "Connect MetaMask via the header to borrow."
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 330,
                columnNumber: 34
            }, this),
            isConnected && isWrongNetwork && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StateNotice"], {
                tone: "error",
                message: "Switch to the correct network to continue."
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 331,
                columnNumber: 51
            }, this),
            isConnected && !isWrongNetwork && hasActivePosition && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StateNotice"], {
                        tone: "warning",
                        message: "You have an active borrow position. Repay it first before opening a new one."
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 335,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/dashboard",
                        className: "inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium",
                        children: "Manage your position →"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 336,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                lineNumber: 334,
                columnNumber: 21
            }, this),
            isConnected && !isWrongNetwork && !hasActivePosition && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-xs text-slate-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('font-medium', step === 'collateral' ? 'text-indigo-300' : 'text-emerald-400'),
                                children: "1. Deposit Collateral"
                            }, void 0, false, {
                                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                lineNumber: 347,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-600",
                                children: "→"
                            }, void 0, false, {
                                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                lineNumber: 348,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('font-medium', step === 'borrow' ? 'text-indigo-300' : step === 'done' ? 'text-emerald-400' : 'text-slate-600'),
                                children: "2. Borrow mUSDC"
                            }, void 0, false, {
                                fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                lineNumber: 349,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 346,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: step === 'collateral' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                                    n: 1,
                                    label: "Deposit mUSDC as Collateral"
                                }, void 0, false, {
                                    fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                    lineNumber: 356,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CollateralStep, {
                                    onSuccess: (atoms, mb)=>{
                                        setCollateralAtoms(atoms);
                                        setMaxBorrowAtoms(mb);
                                        setStep('borrow');
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                    lineNumber: 357,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                            lineNumber: 355,
                            columnNumber: 33
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-emerald-500/20 bg-emerald-900/10 p-4 flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Check, {}, void 0, false, {
                                    fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                    lineNumber: 361,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "Step 1 - "
                                        }, void 0, false, {
                                            fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                            lineNumber: 363,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-emerald-300",
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])(collateralAtoms, 6, 2, false),
                                                " mUSDC ready as collateral"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                            lineNumber: 364,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                    lineNumber: 362,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                            lineNumber: 360,
                            columnNumber: 33
                        }, this)
                    }, void 0, false),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: (step === 'borrow' || step === 'done') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                                    n: 2,
                                    label: "Borrow mUSDC",
                                    done: step === 'done'
                                }, void 0, false, {
                                    fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                    lineNumber: 374,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BorrowStep, {
                                    collateralAtoms: collateralAtoms,
                                    maxBorrowAtoms: maxBorrowAtoms,
                                    onSuccess: ()=>setStep('done')
                                }, void 0, false, {
                                    fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                                    lineNumber: 375,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                            lineNumber: 373,
                            columnNumber: 33
                        }, this)
                    }, void 0, false),
                    step === 'done' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: reset,
                        className: "text-xs text-indigo-400 hover:text-indigo-300 transition-colors",
                        children: "← Start another borrow"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
                        lineNumber: 381,
                        columnNumber: 29
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/borrow/BorrowUsdcFeature.tsx",
        lineNumber: 329,
        columnNumber: 17
    }, this);
}
}),
"[project]/lib/xcm.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MUSDC_DECIMALS",
    ()=>MUSDC_DECIMALS,
    "PAS_EVM_DECIMALS",
    ()=>PAS_EVM_DECIMALS,
    "PAS_SUBSTRATE_DECIMALS",
    ()=>PAS_SUBSTRATE_DECIMALS,
    "PEOPLE_RPC",
    ()=>PEOPLE_RPC,
    "PEOPLE_RPCS",
    ()=>PEOPLE_RPCS,
    "fetchPeopleBalance",
    ()=>fetchPeopleBalance,
    "formatPASFromEVM",
    ()=>formatPASFromEVM,
    "formatPASFromPeople",
    ()=>formatPASFromPeople,
    "h160ToSS58",
    ()=>h160ToSS58,
    "pollHubArrival",
    ()=>pollHubArrival,
    "sendXCMToHub",
    ()=>sendXCMToHub
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatUnits.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/address/isAddress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseUnits.js [app-ssr] (ecmascript)");
;
const PEOPLE_RPC = 'wss://sys.ibp.network/people-paseo';
const PEOPLE_RPCS = [
    PEOPLE_RPC,
    'wss://people-paseo.rpc.amforc.com',
    'wss://people-paseo.dotters.network'
];
const PAS_SUBSTRATE_DECIMALS = 10; // PAS on People Chain (Substrate) = 10 decimals (1 PAS = 10^10 planck)
const PAS_EVM_DECIMALS = 18; // PAS on Asset Hub EVM (Frontier) = 18 decimals
const MUSDC_DECIMALS = 6;
async function withPeopleApi(work) {
    const { ApiPromise, WsProvider } = await __turbopack_context__.A("[externals]/@polkadot/api [external] (@polkadot/api, esm_import, [project]/node_modules/@polkadot/api, async loader)");
    const tried = [];
    let lastError;
    for (const endpoint of PEOPLE_RPCS){
        let api = null;
        try {
            // 10-second connect timeout so dead endpoints don't stall the whole flow
            const provider = new WsProvider(endpoint, 1000, {}, 10_000);
            api = await ApiPromise.create({
                provider
            });
            return await work(api);
        } catch (error) {
            tried.push(endpoint);
            lastError = error;
        } finally{
            if (api) {
                try {
                    await api.disconnect();
                } catch  {}
            }
        }
    }
    const reason = lastError instanceof Error ? lastError.message : String(lastError ?? 'Unknown RPC error');
    throw new Error(`People Chain RPC unavailable (${tried.join(', ')}): ${reason}`);
}
async function h160ToSS58(evmAddress) {
    const { hexToU8a } = await __turbopack_context__.A("[externals]/@polkadot/util [external] (@polkadot/util, esm_import, [project]/node_modules/@polkadot/util, async loader)");
    const { encodeAddress } = await __turbopack_context__.A("[externals]/@polkadot/util-crypto [external] (@polkadot/util-crypto, esm_import, [project]/node_modules/@polkadot/util-crypto, async loader)");
    const h160 = hexToU8a(evmAddress);
    if (h160.length !== 20) {
        throw new Error('Invalid EVM address: expected 20-byte H160');
    }
    const id32 = new Uint8Array(32);
    id32.set(h160, 0); // H160 in first 20 bytes
    id32.fill(0xee, 20); // 0xEE padding in last 12 bytes
    return encodeAddress(id32, 0);
}
function formatPASFromEVM(wei) {
    return Number.parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUnits"])(wei, PAS_EVM_DECIMALS)).toFixed(4);
}
function formatPASFromPeople(raw) {
    return Number.parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUnits"])(raw, PAS_SUBSTRATE_DECIMALS)).toFixed(4);
}
async function fetchPeopleBalance(address) {
    return withPeopleApi(async (api)=>{
        const acct = await api.query.system.account(address);
        const free = BigInt(acct.data.free.toString());
        return free;
    });
}
function toSubstrateAmount(amountPAS) {
    const parsed = Number.parseFloat(amountPAS);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        throw new Error('Amount must be greater than 0');
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseUnits"])(amountPAS, PAS_SUBSTRATE_DECIMALS).toString();
}
function normalizeXcmError(error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/cancel|reject|denied|declined/i.test(message)) {
        return new Error('Transaction cancelled.');
    }
    return new Error(message || 'XCM transfer failed');
}
async function sendXCMToHub(params) {
    const { senderAddress, destinationEVM, amountPAS, onStatus } = params;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"])(destinationEVM)) {
        throw new Error('Invalid Hub EVM destination address.');
    }
    try {
        return await withPeopleApi(async (api)=>{
            onStatus?.('connecting', 'Connecting to People Chain...');
            onStatus?.('building', 'Building XCM transaction...');
            const amount = toSubstrateAmount(amountPAS);
            // Convert EVM address to the SS58 AccountId32 that Asset Hub Frontier uses
            // for eth_getBalance. Encoding: H160 (first 20 bytes) || 0xEE×12 (last 12 bytes).
            // This produces a valid SS58 that ParaSpell accepts AND that maps back to the
            // EVM wallet — confirmed working in production.
            const { encodeAddress } = await __turbopack_context__.A("[externals]/@polkadot/util-crypto [external] (@polkadot/util-crypto, esm_import, [project]/node_modules/@polkadot/util-crypto, async loader)");
            const { hexToU8a } = await __turbopack_context__.A("[externals]/@polkadot/util [external] (@polkadot/util, esm_import, [project]/node_modules/@polkadot/util, async loader)");
            const h160 = hexToU8a(destinationEVM);
            const id32 = new Uint8Array(32);
            id32.set(h160, 0);
            id32.fill(0xee, 20);
            const ss58Dest = encodeAddress(id32, 0);
            const { Builder } = await __turbopack_context__.A("[project]/node_modules/@paraspell/sdk-pjs/dist/index.mjs [app-ssr] (ecmascript, async loader)");
            const tx = await Builder(api).from('PeoplePaseo').to('AssetHubPaseo').currency({
                symbol: 'PAS',
                amount
            }).address(ss58Dest).senderAddress(senderAddress).build();
            onStatus?.('awaiting_signature', 'Waiting for Talisman signature...');
            const { web3FromAddress } = await __turbopack_context__.A("[project]/node_modules/@polkadot/extension-dapp/index.js [app-ssr] (ecmascript, async loader)");
            const injector = await web3FromAddress(senderAddress);
            return await new Promise((resolve, reject)=>{
                let unsub = null;
                const cleanup = ()=>{
                    if (unsub) {
                        try {
                            unsub();
                        } catch  {}
                        unsub = null;
                    }
                };
                tx.signAndSend(senderAddress, {
                    signer: injector.signer,
                    nonce: -1
                }, ({ status, dispatchError })=>{
                    if (status.isBroadcast) onStatus?.('broadcasting', 'Broadcasting to network...');
                    if (status.isInBlock) onStatus?.('in_block', 'In block - waiting for finalization...');
                    if (status.isFinalized) {
                        if (dispatchError) {
                            cleanup();
                            if (dispatchError.isModule && dispatchError.asModule) {
                                const decoded = api.registry.findMetaError(dispatchError.asModule);
                                reject(new Error(`${decoded.section}.${decoded.name}: ${decoded.docs.join(' ')}`));
                                return;
                            }
                            reject(new Error(dispatchError.toString()));
                            return;
                        }
                        onStatus?.('finalized', 'Finalized on People Chain.');
                        cleanup();
                        resolve({
                            blockHash: status.asFinalized?.toHex?.() ?? ''
                        });
                    }
                }).then((u)=>{
                    unsub = u;
                }).catch((err)=>{
                    cleanup();
                    reject(err);
                });
            });
        });
    } catch (error) {
        throw normalizeXcmError(error);
    }
}
function pollHubArrival(params) {
    const { address, before, publicClient, onArrival, onTick, onError, intervalMs = 3000, maxDurationMs = 120000, onTimeout } = params;
    let stopped = false;
    let consecutiveErrors = 0;
    const startedAt = Date.now();
    const timer = setInterval(async ()=>{
        if (stopped) return;
        try {
            const current = await publicClient.getBalance({
                address
            });
            consecutiveErrors = 0;
            onTick?.(current);
            if (current > before) {
                stopped = true;
                clearInterval(timer);
                onArrival(current - before);
                return;
            }
        } catch (err) {
            consecutiveErrors++;
            const msg = err instanceof Error ? err.message : String(err);
            console.warn(`[pollHubArrival] getBalance error #${consecutiveErrors}:`, msg);
            if (consecutiveErrors >= 3) {
                onError?.(`Hub RPC error (${consecutiveErrors}x): ${msg}`);
            }
        }
        if (Date.now() - startedAt >= maxDurationMs) {
            stopped = true;
            clearInterval(timer);
            onTimeout?.(Date.now() - startedAt);
        }
    }, intervalMs);
    return ()=>{
        stopped = true;
        clearInterval(timer);
    };
}
}),
"[project]/components/modules/borrow/BorrowPasFeature.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BorrowPasFeature",
    ()=>BorrowPasFeature
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useConnection.js [app-ssr] (ecmascript) <export useConnection as useAccount>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useBalance.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseUnits.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatUnits.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/xcm.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/addresses.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/ProtocolUI.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useProtocolData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolActions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useProtocolActions.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const GAS_BUFFER = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseUnits"])('0.01', 18);
function Spinner({ small }) {
    const s = small ? 'w-3 h-3 border' : 'w-4 h-4 border-2';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-block rounded-full border-current border-t-transparent animate-spin shrink-0 ${s}`
    }, void 0, false, {
        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
        lineNumber: 29,
        columnNumber: 12
    }, this);
}
function Check() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-4 h-4 shrink-0 text-emerald-400",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M5 13l4 4L19 7"
        }, void 0, false, {
            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
            lineNumber: 34,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
        lineNumber: 33,
        columnNumber: 9
    }, this);
}
function SectionLabel({ n, label, done }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 mb-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0', done ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'),
                children: done ? '✓' : n
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 42,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-semibold text-white",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 48,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
        lineNumber: 41,
        columnNumber: 9
    }, this);
}
function InfoRow({ label, value, tone }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-slate-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 56,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('font-medium', tone === 'green' && 'text-emerald-300', tone === 'yellow' && 'text-amber-300', tone === 'red' && 'text-rose-300', (!tone || tone === 'default') && 'text-white'),
                children: value
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 57,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
        lineNumber: 55,
        columnNumber: 9
    }, this);
}
function HealthBar({ ratio }) {
    // Both market contracts return healthRatio as (collateral * 10000) / owed - BPS format
    const isInfinite = ratio > 1_000_000_000n;
    const num = isInfinite ? Infinity : Number(ratio) / 10000;
    const display = isInfinite ? '∞' : num.toFixed(2) + 'x';
    const pct = isInfinite ? 100 : Math.min(num / 3 * 100, 100);
    const tone = num < 1.1 ? 'red' : num < 1.5 ? 'yellow' : 'green';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between text-xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-400",
                        children: "Health Ratio (current)"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 77,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('font-medium', tone === 'red' && 'text-rose-300', tone === 'yellow' && 'text-amber-300', tone === 'green' && 'text-emerald-300'),
                        children: display
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 78,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 76,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-1.5 rounded-full bg-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('h-full rounded-full transition-all', tone === 'red' && 'bg-rose-500', tone === 'yellow' && 'bg-amber-500', tone === 'green' && 'bg-emerald-500'),
                    style: {
                        width: `${isInfinite ? 100 : pct}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                    lineNumber: 85,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 84,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
        lineNumber: 75,
        columnNumber: 9
    }, this);
}
function useBorrowPreview(pasInputStr, ltvBps, oraclePrice8) {
    if (!pasInputStr || Number(pasInputStr) <= 0 || oraclePrice8 === 0n) return null;
    try {
        const pasWei = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseUnits"])(pasInputStr, 18);
        // (18 dec) × price8 (8 dec) / 1e20 → USDC (6 dec)  [matches contract _toUSDCValue]
        const collateralUsdcAtoms = pasWei * oraclePrice8 / BigInt('100000000000000000000');
        const maxBorrowAtoms = collateralUsdcAtoms * ltvBps / 10000n;
        const collateralUsd = Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUnits"])(collateralUsdcAtoms, 6));
        const maxBorrowUsd = Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUnits"])(maxBorrowAtoms, 6));
        const oraclePriceNum = Number(oraclePrice8) / 1e8;
        return {
            collateralUsd,
            maxBorrowAtoms,
            maxBorrowUsd,
            oraclePriceNum
        };
    } catch  {
        return null;
    }
}
// ── Step 1: Deposit Collateral ────────────────────────────────────────────
function DepositStep({ prefillAmount, onSuccess }) {
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const { data: balData, refetch: refetchBal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBalance"])({
        address
    });
    const pasBalance = balData?.value ?? 0n;
    const { oracle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGlobalProtocolData"])();
    const portfolio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserPortfolio"])();
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(prefillAmount ?? '');
    const [debouncedInput, setDebouncedInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(prefillAmount ?? '');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const t = setTimeout(()=>setDebouncedInput(input), 300);
        return ()=>clearTimeout(t);
    }, [
        input
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (prefillAmount) {
            setInput(prefillAmount);
            setDebouncedInput(prefillAmount);
        }
    }, [
        prefillAmount
    ]);
    const { data: ltvBpsRaw } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
        functionName: 'ltvBps'
    });
    const ltvBps = ltvBpsRaw ?? 6500n;
    // KredioPASMarket exposes no public getScore - read from KredioLending which
    // calls the same KreditAgent and returns the same score/rate for this user.
    const { data: scoreRaw } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lending,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
        functionName: 'getScore',
        args: [
            address ?? '0x0000000000000000000000000000000000000000'
        ],
        query: {
            enabled: !!address
        }
    });
    const score = scoreRaw;
    const interestBps = score ? Number(score[3]) : 0;
    const scoreTierLabels = [
        'ANON',
        'BRONZE',
        'SILVER',
        'GOLD',
        'PLATINUM'
    ];
    const preview = useBorrowPreview(debouncedInput, ltvBps, oracle.price8);
    const { writeContract, data: txHash, isPending: isSigning, isError: depositError, reset: resetWrite } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { isLoading: isConfirming, isSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: txHash
    });
    const busy = isSigning || isConfirming;
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (depositError) {
            setPhase('error');
            const t = setTimeout(()=>{
                setPhase('idle');
                resetWrite();
            }, 3000);
            return ()=>clearTimeout(t);
        }
    }, [
        depositError,
        resetWrite
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isSuccess) return;
        refetchBal();
        portfolio.refresh();
        const wei = (()=>{
            try {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseUnits"])(input, 18);
            } catch  {
                return 0n;
            }
        })();
        onSuccess(wei, preview?.maxBorrowAtoms ?? 0n);
        resetWrite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isSuccess
    ]);
    const pasWei = (()=>{
        try {
            return input && Number(input) > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseUnits"])(input, 18) : 0n;
        } catch  {
            return 0n;
        }
    })();
    const overBalance = pasWei > 0n && pasWei > pasBalance;
    const statusMsg = isSigning ? 'Waiting for MetaMask...' : isConfirming ? 'Confirming deposit...' : '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-xs uppercase tracking-wide text-slate-400",
                        children: "PAS to deposit as collateral"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 173,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: "0",
                                step: "any",
                                placeholder: "0.0000",
                                value: input,
                                onChange: (e)=>setInput(e.target.value),
                                disabled: busy,
                                className: "flex-1 bg-transparent text-xl font-light text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            }, void 0, false, {
                                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                lineNumber: 175,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold text-pink-300 bg-pink-500/10 border border-pink-500/20 rounded-lg px-2.5 py-1",
                                children: "PAS"
                            }, void 0, false, {
                                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                lineNumber: 178,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 174,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-xs px-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-500",
                                children: [
                                    "Balance: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-300",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDisplayBalance"])(pasBalance, 18, 4),
                                            " PAS"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                        lineNumber: 181,
                                        columnNumber: 63
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                lineNumber: 181,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    const mx = pasBalance > GAS_BUFFER ? pasBalance - GAS_BUFFER : 0n;
                                    setInput(Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUnits"])(mx, 18)).toFixed(6));
                                },
                                disabled: busy,
                                className: "text-indigo-400 hover:text-indigo-300 font-medium disabled:opacity-40",
                                children: "Max"
                            }, void 0, false, {
                                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                lineNumber: 182,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 180,
                        columnNumber: 17
                    }, this),
                    overBalance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-rose-400 px-1",
                        children: "Amount exceeds balance"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 185,
                        columnNumber: 33
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 172,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('rounded-xl border px-4 py-3 space-y-0 transition-opacity', debouncedInput && Number(debouncedInput) > 0 ? 'border-white/10 bg-black/30 opacity-100' : 'border-white/5 bg-black/10 opacity-35 pointer-events-none'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Collateral value",
                        value: preview ? `~$${preview.collateralUsd.toFixed(2)}` : '-'
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 190,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Credit score",
                        value: score ? `${score[0].toString()} (${score[1] > 0 ? scoreTierLabels[score[1]] : 'ANON'})` : '-'
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 191,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "LTV",
                        value: `${(Number(ltvBps) / 100).toFixed(0)}%`
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 192,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "You can borrow",
                        value: preview ? `~${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])(preview.maxBorrowAtoms, 6, 2, false)} mUSDC` : '-',
                        tone: "green"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 193,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Interest rate",
                        value: `${(interestBps / 100).toFixed(2)}% APY`
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 194,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 188,
                columnNumber: 13
            }, this),
            debouncedInput && Number(debouncedInput) > 0 && portfolio.pasHealthRatio > 0n && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HealthBar, {
                ratio: portfolio.pasHealthRatio
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 198,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>{
                    if (!input || Number(input) <= 0) return;
                    writeContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                        functionName: 'depositCollateral',
                        value: pasWei
                    });
                },
                disabled: !input || Number(input) <= 0 || overBalance || busy || oracle.isCrashed || phase === 'error',
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2', busy ? 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed' : phase === 'error' ? 'bg-rose-500/20 border-rose-500/30 text-rose-400 cursor-not-allowed' : !input || overBalance || oracle.isCrashed ? 'bg-white/5 border border-white/10 text-slate-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white'),
                children: busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {}, void 0, false, {
                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                            lineNumber: 208,
                            columnNumber: 27
                        }, this),
                        statusMsg
                    ]
                }, void 0, true) : phase === 'error' ? 'Action Cancelled' : `Deposit ${input || '0'} PAS as Collateral`
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 201,
                columnNumber: 13
            }, this),
            oracle.isCrashed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StateNotice"], {
                tone: "error",
                message: "Oracle is down - collateral deposits paused."
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 210,
                columnNumber: 34
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
        lineNumber: 171,
        columnNumber: 9
    }, this);
}
// ── Step 2: Borrow mUSDC ─────────────────────────────────────────────────
function BorrowStep({ depositedWei, maxBorrowAtoms, onSuccess }) {
    const { oracle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGlobalProtocolData"])();
    const portfolio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserPortfolio"])();
    const actions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolActions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProtocolActions"])();
    const { data: ltvBpsRaw } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
        functionName: 'ltvBps'
    });
    const ltvBps = ltvBpsRaw ?? 6500n;
    const depositedDisplay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDisplayBalance"])(depositedWei, 18, 4);
    const collateralUsd = Number(depositedWei) / 1e18 * (Number(oracle.price8) / 1e8);
    const maxBorrowDisplay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])(maxBorrowAtoms, 6, 2, false);
    const [pct, setPct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(75);
    const [manualInput, setManualInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const borrowAtoms = (()=>{
        if (manualInput && Number(manualInput) > 0) {
            try {
                const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseUnits"])(manualInput, 6);
                return v > maxBorrowAtoms ? maxBorrowAtoms : v;
            } catch  {
                return 0n;
            }
        }
        return maxBorrowAtoms > 0n ? maxBorrowAtoms * BigInt(pct) / 100n : 0n;
    })();
    const borrowDisplay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])(borrowAtoms, 6, 2, false);
    const estimatedHealth = (()=>{
        if (borrowAtoms === 0n || depositedWei === 0n || oracle.price8 === 0n) return BigInt('999999999999999999999');
        const collValueUsdc = depositedWei * oracle.price8 / BigInt('100000000000000000000');
        if (collValueUsdc === 0n) return BigInt('999999999999999999999');
        return collValueUsdc * BigInt('1000000000000000000') / borrowAtoms;
    })();
    const healthNum = Number(estimatedHealth) / 1e18;
    const healthTone = healthNum > 100 ? 'green' : healthNum < 1.1 ? 'red' : healthNum < 1.3 ? 'yellow' : 'green';
    const liqPrice = oracle.price8 > 0n && depositedWei > 0n && borrowAtoms > 0n ? Number(borrowAtoms) / 1e6 / (Number(depositedWei) / 1e18 * (Number(ltvBps) / 10000)) : null;
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [statusMsg, setStatusMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle');
    const handleBorrow = async ()=>{
        if (borrowAtoms === 0n) return;
        setPhase('idle');
        setBusy(true);
        setStatusMsg('Waiting for MetaMask...');
        const res = await actions.borrowPas(borrowAtoms);
        if (res.ok) {
            setStatusMsg('Confirming borrow...');
            await portfolio.refresh();
            setSuccess(true);
            onSuccess();
            setBusy(false);
            setStatusMsg('');
        } else {
            setBusy(false);
            setStatusMsg('');
            setPhase('error');
            setTimeout(()=>setPhase('idle'), 3000);
        }
    };
    if (success) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 text-emerald-300 font-semibold text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Check, {}, void 0, false, {
                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                            lineNumber: 280,
                            columnNumber: 97
                        }, this),
                        " Borrowed ",
                        borrowDisplay,
                        " mUSDC"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                    lineNumber: 280,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-slate-400",
                    children: "Your position is active. Manage repayments, view health, and withdraw collateral from your positions page."
                }, void 0, false, {
                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                    lineNumber: 281,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/dashboard",
                    className: "inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-indigo-200 transition-colors",
                    children: "View your position →"
                }, void 0, false, {
                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                    lineNumber: 282,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
            lineNumber: 279,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-white/10 bg-black/30 px-4 py-3 space-y-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Collateral deposited",
                        value: `${depositedDisplay} PAS (~$${collateralUsd.toFixed(2)})`
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 293,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Max borrowable",
                        value: `${maxBorrowDisplay} mUSDC`
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 294,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 292,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            25,
                            50,
                            75,
                            100
                        ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setPct(p);
                                    setManualInput('');
                                },
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors', pct === p && !manualInput ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'),
                                children: [
                                    p,
                                    "%"
                                ]
                            }, p, true, {
                                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                lineNumber: 300,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 298,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: "0",
                                step: "any",
                                placeholder: `Max: ${maxBorrowDisplay}`,
                                value: manualInput,
                                onChange: (e)=>{
                                    setManualInput(e.target.value);
                                    setPct(0);
                                },
                                className: "flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            }, void 0, false, {
                                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                lineNumber: 308,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2 py-0.5",
                                children: "mUSDC"
                            }, void 0, false, {
                                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                lineNumber: 311,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 307,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 297,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-white/10 bg-black/30 px-4 py-3 space-y-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Borrowing",
                        value: `${borrowDisplay} mUSDC`
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 316,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Health ratio (est.)",
                        value: healthNum > 100 ? '∞' : healthNum.toFixed(2),
                        tone: healthTone
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 317,
                        columnNumber: 17
                    }, this),
                    liqPrice !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Liquidation at",
                        value: `$${liqPrice.toFixed(4)} / PAS`
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 318,
                        columnNumber: 39
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 315,
                columnNumber: 13
            }, this),
            healthNum < 1.3 && healthNum > 0 && healthNum <= 100 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StateNotice"], {
                tone: "warning",
                message: "Health ratio is low - consider borrowing less to reduce liquidation risk."
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 322,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleBorrow,
                disabled: borrowAtoms === 0n || busy || healthNum < 1.1 && healthNum > 0 || phase === 'error',
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2', busy ? 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed' : phase === 'error' ? 'bg-rose-500/20 border-rose-500/30 text-rose-400 cursor-not-allowed' : borrowAtoms === 0n ? 'bg-white/5 border border-white/10 text-slate-600 cursor-not-allowed' : 'bg-emerald-700 hover:bg-emerald-600 text-white'),
                children: busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {}, void 0, false, {
                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                            lineNumber: 331,
                            columnNumber: 27
                        }, this),
                        statusMsg
                    ]
                }, void 0, true) : phase === 'error' ? 'Action Cancelled' : `Borrow ${borrowDisplay} mUSDC`
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 325,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
        lineNumber: 291,
        columnNumber: 9
    }, this);
}
// ── Hub Tab (2 steps) ─────────────────────────────────────────────────────
function HubTab() {
    const { isConnected, address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const portfolio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserPortfolio"])();
    const actions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolActions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProtocolActions"])();
    const { oracle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGlobalProtocolData"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('deposit');
    const [depositedWei, setDepositedWei] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0n);
    const [maxBorrowAtoms, setMaxBorrowAtoms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0n);
    // Pre-fetch max borrowable for existing collateral (handles returning users)
    const { data: mbRaw } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
        functionName: 'maxBorrowable',
        args: [
            address ?? '0x0000000000000000000000000000000000000000'
        ],
        query: {
            enabled: !!address
        }
    });
    // If user already deposited collateral in a prior session, jump straight to borrow step
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (portfolio.loading || mbRaw === undefined) return;
        const alreadyActive = !!portfolio.pasPosition[7];
        const existingCollateral = portfolio.pasCollateralWallet;
        if (!alreadyActive && existingCollateral > 0n && step === 'deposit') {
            setDepositedWei(existingCollateral);
            setMaxBorrowAtoms(mbRaw ?? 0n);
            setStep('borrow');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        portfolio.loading,
        portfolio.pasCollateralWallet,
        mbRaw
    ]);
    const reset = ()=>{
        setStep('deposit');
        setDepositedWei(0n);
        setMaxBorrowAtoms(0n);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-xs text-slate-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('font-medium', step === 'deposit' ? 'text-indigo-300' : 'text-emerald-400'),
                        children: "1. Deposit Collateral"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 375,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-600",
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 376,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('font-medium', step === 'borrow' ? 'text-indigo-300' : step === 'done' ? 'text-emerald-400' : 'text-slate-600'),
                        children: "2. Borrow mUSDC"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 377,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 374,
                columnNumber: 13
            }, this),
            !isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StateNotice"], {
                tone: "info",
                message: "Connect MetaMask via the header to continue."
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 380,
                columnNumber: 30
            }, this),
            isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: step === 'deposit' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                                    n: 1,
                                    label: "Deposit PAS as Collateral"
                                }, void 0, false, {
                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                    lineNumber: 387,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DepositStep, {
                                    onSuccess: (wei, mb)=>{
                                        setDepositedWei(wei);
                                        setMaxBorrowAtoms(mb);
                                        setStep('borrow');
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                    lineNumber: 388,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                            lineNumber: 386,
                            columnNumber: 29
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-emerald-500/20 bg-emerald-900/10 p-4 flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Check, {}, void 0, false, {
                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                    lineNumber: 392,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "Step 1 - "
                                        }, void 0, false, {
                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                            lineNumber: 394,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-emerald-300",
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDisplayBalance"])(depositedWei, 18, 4),
                                                " PAS deposited as collateral"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                            lineNumber: 395,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                    lineNumber: 393,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                            lineNumber: 391,
                            columnNumber: 29
                        }, this)
                    }, void 0, false),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: (step === 'borrow' || step === 'done') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                                    n: 2,
                                    label: "Borrow mUSDC",
                                    done: step === 'done'
                                }, void 0, false, {
                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                    lineNumber: 404,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BorrowStep, {
                                    depositedWei: depositedWei,
                                    maxBorrowAtoms: maxBorrowAtoms,
                                    onSuccess: ()=>setStep('done')
                                }, void 0, false, {
                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                    lineNumber: 405,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                            lineNumber: 403,
                            columnNumber: 29
                        }, this)
                    }, void 0, false),
                    step === 'done' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: reset,
                        className: "text-xs text-indigo-400 hover:text-indigo-300 transition-colors",
                        children: "← Start another borrow"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 411,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true),
            isConnected && (portfolio.pasPosition[0] > 0n || portfolio.pasPosition[2] > 0n) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-4 py-3 flex items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-slate-400",
                        children: "You have an active PAS borrow position."
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 418,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/dashboard",
                        className: "text-xs font-semibold text-indigo-300 hover:text-indigo-200 transition-colors shrink-0",
                        children: "Manage position →"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 419,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 417,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
        lineNumber: 373,
        columnNumber: 9
    }, this);
}
// ── People Tab (3 steps: Bridge → Deposit → Borrow) ───────────────────────
const XCM_LABELS = {
    connecting: 'Connecting to People Chain...',
    building: 'Building XCM transaction...',
    awaiting_signature: 'Waiting for Talisman signature...',
    broadcasting: 'Broadcasting...',
    in_block: 'Waiting for PAS to arrive on Hub...',
    finalized: 'Waiting for PAS to arrive on Hub...'
};
function PeopleTab() {
    const { address: hubAddress, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const { oracle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGlobalProtocolData"])();
    const { data: ltvBpsRaw } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pasMarket,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
        functionName: 'ltvBps'
    });
    const ltvBps = ltvBpsRaw ?? 6500n;
    const [subAccounts, setSubAccounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAcc, setSelectedAcc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [peopleBalance, setPeopleBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [talismanConnected, setTalismanConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [bridgeAmount, setBridgeAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [bridgeStatus, setBridgeStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [bridging, setBridging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [elapsedSec, setElapsedSec] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [arrivedWei, setArrivedWei] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const pollCleanupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const elapsedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('bridge');
    const [depositedWei, setDepositedWei] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0n);
    const [maxBorrowAtoms, setMaxBorrowAtoms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0n);
    const bridgePreview = useBorrowPreview(bridgeAmount, ltvBps, oracle.price8);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>{
            pollCleanupRef.current?.();
            if (elapsedRef.current) clearInterval(elapsedRef.current);
        }, []);
    async function connectTalisman() {
        setBridgeStatus('Connecting to Talisman...');
        try {
            const { web3Enable, web3Accounts } = await __turbopack_context__.A("[project]/node_modules/@polkadot/extension-dapp/index.js [app-ssr] (ecmascript, async loader)");
            const exts = await web3Enable('Kredio');
            if (!exts.length) {
                setBridgeStatus('No wallet extension found. Install Talisman.');
                return;
            }
            const accounts = await web3Accounts();
            const valid = accounts.filter((a)=>!a.type || a.type === 'sr25519' || a.type === 'ed25519');
            if (!valid.length) {
                setBridgeStatus('No Substrate accounts found.');
                return;
            }
            setSubAccounts(valid);
            setSelectedAcc(valid[0]);
            setTalismanConnected(true);
            setBridgeStatus('');
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchPeopleBalance"])(valid[0].address).then((free)=>setPeopleBalance((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPASFromPeople"])(free))).catch(()=>setPeopleBalance('-'));
        } catch  {
            setBridgeStatus('Failed to connect Talisman.');
        }
    }
    async function handleBridge() {
        if (!selectedAcc || !hubAddress || !publicClient) return;
        setBridging(true);
        setElapsedSec(0);
        elapsedRef.current = setInterval(()=>setElapsedSec((s)=>s + 1), 1000);
        const before = await publicClient.getBalance({
            address: hubAddress
        });
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendXCMToHub"])({
                senderAddress: selectedAcc.address,
                destinationEVM: hubAddress,
                amountPAS: bridgeAmount,
                onStatus: (s)=>setBridgeStatus(XCM_LABELS[s])
            });
            pollCleanupRef.current?.();
            pollCleanupRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pollHubArrival"])({
                address: hubAddress,
                before,
                publicClient,
                onTick: ()=>{},
                onArrival: (delta)=>{
                    setBridgeStatus(`+${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPASFromEVM"])(delta)} PAS arrived on Hub`);
                    setBridging(false);
                    setArrivedWei(delta);
                    if (elapsedRef.current) clearInterval(elapsedRef.current);
                    setStep('deposit');
                },
                onTimeout: ()=>{
                    setBridging(false);
                    setBridgeStatus('Error: PAS did not arrive on Hub within 2 minutes. Check the People Chain extrinsic in Subscan and retry.');
                    if (elapsedRef.current) clearInterval(elapsedRef.current);
                }
            });
        } catch (err) {
            setBridgeStatus(`Error: ${err instanceof Error ? err.message : 'Unknown'}`);
            setBridging(false);
            if (elapsedRef.current) clearInterval(elapsedRef.current);
        }
    }
    const reset = ()=>{
        setStep('bridge');
        setArrivedWei(null);
        setDepositedWei(0n);
        setMaxBorrowAtoms(0n);
        setBridgeStatus('');
    };
    const stepsDone = {
        bridge: step !== 'bridge' && step !== undefined,
        deposit: step === 'borrow' || step === 'done',
        borrow: step === 'done'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1.5 text-xs text-slate-400 flex-wrap",
                children: [
                    'bridge',
                    'deposit',
                    'borrow'
                ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-1.5",
                        children: [
                            i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-600",
                                children: "→"
                            }, void 0, false, {
                                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                lineNumber: 526,
                                columnNumber: 35
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('font-medium', step === s ? 'text-indigo-300' : stepsDone[s] ? 'text-emerald-400' : 'text-slate-600'),
                                children: [
                                    i + 1,
                                    ". ",
                                    s === 'bridge' ? 'Bridge' : s === 'deposit' ? 'Deposit Collateral' : 'Borrow mUSDC'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                lineNumber: 527,
                                columnNumber: 25
                            }, this)
                        ]
                    }, s, true, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 525,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 523,
                columnNumber: 13
            }, this),
            !isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StateNotice"], {
                tone: "info",
                message: "Connect MetaMask via the header first."
            }, void 0, false, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 535,
                columnNumber: 30
            }, this),
            isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: step === 'bridge' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                                    n: 1,
                                    label: "Bridge PAS from People Chain"
                                }, void 0, false, {
                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                    lineNumber: 543,
                                    columnNumber: 33
                                }, this),
                                !talismanConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: connectTalisman,
                                    className: "w-full rounded-xl px-4 py-3 text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-2",
                                    children: "Connect Talisman"
                                }, void 0, false, {
                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                    lineNumber: 545,
                                    columnNumber: 37
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-purple-500/20 bg-purple-500/10 px-3 py-2 flex items-center gap-2 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-2 h-2 rounded-full bg-emerald-400 shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                            lineNumber: 550,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-purple-200 truncate",
                                            children: selectedAcc?.meta?.name ?? selectedAcc?.address.slice(0, 14) + '...'
                                        }, void 0, false, {
                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                            lineNumber: 551,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-auto text-slate-400 shrink-0",
                                            children: [
                                                peopleBalance,
                                                " PAS"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                            lineNumber: 552,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                    lineNumber: 549,
                                    columnNumber: 37
                                }, this),
                                subAccounts.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: selectedAcc?.address,
                                    onChange: (e)=>{
                                        const a = subAccounts.find((x)=>x.address === e.target.value);
                                        if (!a) return;
                                        setSelectedAcc(a);
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchPeopleBalance"])(a.address).then((free)=>setPeopleBalance((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPASFromPeople"])(free))).catch(()=>setPeopleBalance('-'));
                                    },
                                    className: "w-full rounded-xl border border-white/10 bg-black/40 text-sm text-white px-3 py-2 outline-none",
                                    children: subAccounts.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: a.address,
                                            children: a.meta?.name ?? a.address.slice(0, 20) + '...'
                                        }, a.address, false, {
                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                            lineNumber: 565,
                                            columnNumber: 63
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                    lineNumber: 556,
                                    columnNumber: 37
                                }, this),
                                talismanConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs uppercase tracking-wide text-slate-400",
                                                    children: "PAS amount to bridge"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                    lineNumber: 571,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            min: "0",
                                                            step: "any",
                                                            placeholder: "0.0",
                                                            value: bridgeAmount,
                                                            onChange: (e)=>setBridgeAmount(e.target.value),
                                                            disabled: bridging,
                                                            className: "flex-1 bg-transparent text-xl font-light text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                            lineNumber: 573,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-semibold text-pink-300 bg-pink-500/10 border border-pink-500/20 rounded-lg px-2.5 py-1",
                                                            children: "PAS"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                            lineNumber: 575,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                    lineNumber: 572,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-slate-500 px-1 flex gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Arrives at: ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono text-slate-400",
                                                                    children: [
                                                                        hubAddress?.slice(0, 8),
                                                                        "…",
                                                                        hubAddress?.slice(-6)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                                    lineNumber: 578,
                                                                    columnNumber: 67
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                            lineNumber: 578,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "~30 seconds"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                            lineNumber: 579,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                    lineNumber: 577,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                            lineNumber: 570,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('rounded-xl border px-4 py-3 space-y-0 transition-opacity', bridgeAmount && Number(bridgeAmount) > 0 ? 'border-white/10 bg-black/30' : 'border-white/5 bg-black/10 opacity-35 pointer-events-none'),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                                    label: "Projected collateral value",
                                                    value: bridgePreview ? `~$${bridgePreview.collateralUsd.toFixed(2)}` : '-'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                    lineNumber: 584,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                                    label: "Max borrowable",
                                                    value: bridgePreview ? `~${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])(bridgePreview.maxBorrowAtoms, 6, 2, false)} mUSDC` : '-',
                                                    tone: "green"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                    lineNumber: 585,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                                    label: "PAS price",
                                                    value: bridgePreview ? `$${bridgePreview.oraclePriceNum.toFixed(4)}` : '-'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                    lineNumber: 586,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                            lineNumber: 582,
                                            columnNumber: 41
                                        }, this),
                                        bridgeStatus && bridging && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {
                                                    small: true
                                                }, void 0, false, {
                                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                    lineNumber: 590,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-white/80 flex-1",
                                                    children: bridgeStatus
                                                }, void 0, false, {
                                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                    lineNumber: 591,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-slate-500",
                                                    children: [
                                                        elapsedSec,
                                                        "s"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                    lineNumber: 592,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                            lineNumber: 589,
                                            columnNumber: 45
                                        }, this),
                                        bridgeStatus && bridgeStatus.startsWith('Error') && !bridging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/8 px-4 py-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-rose-400 text-sm shrink-0",
                                                    children: "✕"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                    lineNumber: 597,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-rose-300 flex-1 min-w-0 truncate",
                                                    children: bridgeStatus.replace(/^Error:\s*/, '')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                    lineNumber: 598,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setBridgeStatus(''),
                                                    className: "text-slate-500 hover:text-white text-sm leading-none shrink-0",
                                                    "aria-label": "Dismiss",
                                                    children: "✕"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                    lineNumber: 599,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                            lineNumber: 596,
                                            columnNumber: 45
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleBridge,
                                            disabled: !bridgeAmount || Number(bridgeAmount) <= 0 || bridging,
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all flex items-center justify-center gap-2', bridging || !bridgeAmount || Number(bridgeAmount) <= 0 ? 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500'),
                                            children: bridging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {}, void 0, false, {
                                                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                        lineNumber: 607,
                                                        columnNumber: 63
                                                    }, this),
                                                    "Bridging..."
                                                ]
                                            }, void 0, true) : `Bridge ${bridgeAmount || '0'} PAS to Hub`
                                        }, void 0, false, {
                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                            lineNumber: 602,
                                            columnNumber: 45
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                            lineNumber: 542,
                            columnNumber: 29
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-emerald-500/20 bg-emerald-900/10 p-4 flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Check, {}, void 0, false, {
                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                    lineNumber: 615,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "Step 1 - "
                                        }, void 0, false, {
                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                            lineNumber: 617,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-emerald-300",
                                            children: [
                                                "+",
                                                arrivedWei ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPASFromEVM"])(arrivedWei) : bridgeAmount,
                                                " PAS arrived on Hub"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                            lineNumber: 618,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                    lineNumber: 616,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                            lineNumber: 614,
                            columnNumber: 29
                        }, this)
                    }, void 0, false),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: (step === 'deposit' || step === 'borrow' || step === 'done') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: step === 'deposit' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                                        n: 2,
                                        label: "Deposit PAS as Collateral"
                                    }, void 0, false, {
                                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                        lineNumber: 630,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DepositStep, {
                                        prefillAmount: arrivedWei ? Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUnits"])(arrivedWei, 18)).toFixed(6) : undefined,
                                        onSuccess: (wei, mb)=>{
                                            setDepositedWei(wei);
                                            setMaxBorrowAtoms(mb);
                                            setStep('borrow');
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                        lineNumber: 631,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                lineNumber: 629,
                                columnNumber: 37
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-emerald-500/20 bg-emerald-900/10 p-4 flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Check, {}, void 0, false, {
                                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                        lineNumber: 638,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-400",
                                                children: "Step 2 - "
                                            }, void 0, false, {
                                                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                lineNumber: 640,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-emerald-300",
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDisplayBalance"])(depositedWei, 18, 4),
                                                    " PAS deposited as collateral"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                                lineNumber: 641,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                        lineNumber: 639,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                lineNumber: 637,
                                columnNumber: 37
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                            lineNumber: 627,
                            columnNumber: 29
                        }, this)
                    }, void 0, false),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: (step === 'borrow' || step === 'done') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                                    n: 3,
                                    label: "Borrow mUSDC",
                                    done: step === 'done'
                                }, void 0, false, {
                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                    lineNumber: 653,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BorrowStep, {
                                    depositedWei: depositedWei,
                                    maxBorrowAtoms: maxBorrowAtoms,
                                    onSuccess: ()=>setStep('done')
                                }, void 0, false, {
                                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                                    lineNumber: 654,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                            lineNumber: 652,
                            columnNumber: 29
                        }, this)
                    }, void 0, false),
                    step === 'done' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: reset,
                        className: "text-xs text-indigo-400 hover:text-indigo-300 transition-colors",
                        children: "← Start another borrow"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 660,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
        lineNumber: 522,
        columnNumber: 9
    }, this);
}
function BorrowPasFeature() {
    const [source, setSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('hub');
    const tabCls = (active)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('px-4 py-2 rounded-xl text-xs font-semibold border transition-colors', active ? 'bg-white text-black border-white' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-lg mx-auto space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "inline-flex gap-1 rounded-xl border border-white/10 bg-black/30 p-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: tabCls(source === 'hub'),
                        onClick: ()=>setSource('hub'),
                        children: "PAS on Hub"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 679,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: tabCls(source === 'people'),
                        onClick: ()=>setSource('people'),
                        children: "PAS on People Chain"
                    }, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 680,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                lineNumber: 678,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: source === 'hub' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HubTab, {}, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 684,
                        columnNumber: 41
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PeopleTab, {}, void 0, false, {
                        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                        lineNumber: 684,
                        columnNumber: 54
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
                    lineNumber: 683,
                    columnNumber: 17
                }, this)
            }, void 0, false)
        ]
    }, void 0, true, {
        fileName: "[project]/components/modules/borrow/BorrowPasFeature.tsx",
        lineNumber: 677,
        columnNumber: 9
    }, this);
}
}),
"[project]/app/borrow/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BorrowRootPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/ProtocolUI.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$borrow$2f$BorrowUsdcFeature$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/borrow/BorrowUsdcFeature.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$borrow$2f$BorrowPasFeature$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/borrow/BorrowPasFeature.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function BorrowRootPage() {
    const [market, setMarket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('usdc');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageShell"], {
        title: "Borrow",
        subtitle: market === 'usdc' ? "Deposit mUSDC collateral, then borrow based on your credit score." : "Deposit PAS as collateral and borrow mUSDC from KredioPASMarket.",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-lg mx-auto mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl border border-white/10 bg-black/30 p-1 inline-flex gap-1 w-full sm:w-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setMarket('usdc'),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-semibold transition-colors', market === 'usdc' ? 'bg-white text-black' : 'text-slate-300 hover:bg-white/10 hover:text-white'),
                            children: "USDC Collateral"
                        }, void 0, false, {
                            fileName: "[project]/app/borrow/page.tsx",
                            lineNumber: 24,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setMarket('pas'),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-semibold transition-colors', market === 'pas' ? 'bg-white text-black' : 'text-slate-300 hover:bg-white/10 hover:text-white'),
                            children: "PAS Collateral"
                        }, void 0, false, {
                            fileName: "[project]/app/borrow/page.tsx",
                            lineNumber: 33,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/borrow/page.tsx",
                    lineNumber: 23,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/borrow/page.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, this),
            market === 'usdc' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$borrow$2f$BorrowUsdcFeature$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BorrowUsdcFeature"], {}, void 0, false, {
                fileName: "[project]/app/borrow/page.tsx",
                lineNumber: 45,
                columnNumber: 34
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$borrow$2f$BorrowPasFeature$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BorrowPasFeature"], {}, void 0, false, {
                fileName: "[project]/app/borrow/page.tsx",
                lineNumber: 45,
                columnNumber: 58
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/borrow/page.tsx",
        lineNumber: 15,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=_15cde360._.js.map