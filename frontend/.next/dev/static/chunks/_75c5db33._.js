(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/xcm.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$api$2f$promise$2f$Api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/api/promise/Api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$provider$2f$ws$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-provider/ws/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$pjs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@paraspell/sdk-pjs/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$2f$hex$2f$toU8a$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/util/hex/toU8a.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$2d$crypto$2f$address$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/util-crypto/address/encode.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatUnits.js [app-client] (ecmascript)");
;
;
;
;
;
const PEOPLE_RPC = 'wss://people-paseo.rpc.amforc.com';
const PAS_SUBSTRATE_DECIMALS = 10;
const PAS_EVM_DECIMALS = 18;
const MUSDC_DECIMALS = 6;
function h160ToSS58(evmAddress) {
    const h160 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$2f$hex$2f$toU8a$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToU8a"])(evmAddress);
    if (h160.length !== 20) {
        throw new Error('Invalid EVM address: expected 20-byte H160');
    }
    const pad = new Uint8Array(12).fill(0xee);
    const id32 = new Uint8Array(32);
    id32.set(h160, 0);
    id32.set(pad, 20);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$util$2d$crypto$2f$address$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeAddress"])(id32, 0);
}
function formatPASFromEVM(wei) {
    return Number.parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(wei, PAS_EVM_DECIMALS)).toFixed(4);
}
function formatPASFromPeople(raw) {
    return Number.parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(raw, PAS_SUBSTRATE_DECIMALS)).toFixed(4);
}
async function fetchPeopleBalance(address) {
    const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$provider$2f$ws$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WsProvider"](PEOPLE_RPC);
    const api = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$api$2f$promise$2f$Api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiPromise"].create({
        provider
    });
    try {
        const acct = await api.query.system.account(address);
        const free = BigInt(acct.data.free.toString());
        return free;
    } finally{
        await api.disconnect();
    }
}
function toSubstrateAmount(amountPAS) {
    const parsed = Number.parseFloat(amountPAS);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        throw new Error('Amount must be greater than 0');
    }
    return String(Math.round(parsed * 10 ** PAS_SUBSTRATE_DECIMALS));
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
    let api = null;
    try {
        onStatus?.('connecting', 'Connecting to People Chain...');
        const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$provider$2f$ws$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WsProvider"](PEOPLE_RPC);
        api = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$api$2f$promise$2f$Api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiPromise"].create({
            provider
        });
        onStatus?.('building', 'Building XCM transaction...');
        const amount = toSubstrateAmount(amountPAS);
        const ss58Dest = h160ToSS58(destinationEVM);
        const tx = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paraspell$2f$sdk$2d$pjs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Builder"])(api).from('PeoplePaseo').to('AssetHubPaseo').currency({
            symbol: 'PAS',
            amount
        }).address(ss58Dest).senderAddress(senderAddress).build();
        onStatus?.('awaiting_signature', 'Waiting for Talisman signature...');
        const { web3FromAddress } = await __turbopack_context__.A("[project]/node_modules/@polkadot/extension-dapp/index.js [app-client] (ecmascript, async loader)");
        const injector = await web3FromAddress(senderAddress);
        return await new Promise((resolve, reject)=>{
            tx.signAndSend(senderAddress, {
                signer: injector.signer,
                nonce: -1
            }, ({ status, dispatchError })=>{
                if (status.isBroadcast) {
                    onStatus?.('broadcasting', 'Broadcasting to network...');
                }
                if (status.isInBlock) {
                    onStatus?.('in_block', 'In block - waiting for finalization...');
                }
                if (status.isFinalized) {
                    if (dispatchError) {
                        reject(new Error(dispatchError.toString()));
                        return;
                    }
                    onStatus?.('finalized', 'Finalized on People Chain.');
                    const blockHash = status.asFinalized?.toHex?.() ?? '';
                    resolve({
                        blockHash
                    });
                }
            }).catch((err)=>reject(err));
        });
    } catch (error) {
        throw normalizeXcmError(error);
    } finally{
        if (api) {
            await api.disconnect();
        }
    }
}
function pollHubArrival(params) {
    const { address, before, publicClient, onArrival, onTick, intervalMs = 3000 } = params;
    let stopped = false;
    const timer = setInterval(async ()=>{
        if (stopped) return;
        const current = await publicClient.getBalance({
            address
        });
        onTick?.(current);
        if (current > before) {
            stopped = true;
            clearInterval(timer);
            onArrival(current - before);
        }
    }, intervalMs);
    return ()=>{
        stopped = true;
        clearInterval(timer);
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/modules/ProtocolUI.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function PageShell({ title, subtitle, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl sm:text-3xl font-semibold text-white",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/modules/ProtocolUI.tsx",
                        lineNumber: 12,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_c = PageShell;
function Grid({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 xl:grid-cols-2 gap-4",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/modules/ProtocolUI.tsx",
        lineNumber: 21,
        columnNumber: 12
    }, this);
}
_c1 = Grid;
function Panel({ title, subtitle, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].section, {
        whileHover: {
            y: -2
        },
        transition: {
            duration: 0.18,
            ease: 'easeOut'
        },
        className: "rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 hover:border-white/20 hover:bg-black/35 transition-colors",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-base font-semibold text-white",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/modules/ProtocolUI.tsx",
                        lineNumber: 32,
                        columnNumber: 17
                    }, this),
                    subtitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_c2 = Panel;
function StatRow({ label, value, tone = 'default' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-slate-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 43,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
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
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('font-medium', tone === 'default' && 'text-white', tone === 'green' && 'text-emerald-300', tone === 'yellow' && 'text-amber-300', tone === 'red' && 'text-rose-300'),
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
_c3 = StatRow;
function StatRowSkeleton({ label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-slate-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 66,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c4 = StatRowSkeleton;
function StateNotice({ tone, message }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('rounded-xl border px-3 py-2 text-xs', tone === 'info' && 'border-cyan-400/30 bg-cyan-500/10 text-cyan-200', tone === 'warning' && 'border-amber-400/30 bg-amber-500/10 text-amber-200', tone === 'error' && 'border-rose-400/30 bg-rose-500/10 text-rose-200'),
        children: message
    }, void 0, false, {
        fileName: "[project]/components/modules/ProtocolUI.tsx",
        lineNumber: 80,
        columnNumber: 9
    }, this);
}
_c5 = StateNotice;
function ActionInput({ label, value, onChange, placeholder }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "block space-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs uppercase tracking-wide text-slate-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 106,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
_c6 = ActionInput;
function ActionButton({ label, onClick, disabled, loading, variant = 'primary' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled || loading,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-3 py-2 rounded-xl text-sm font-medium border transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2', variant === 'primary' && 'bg-white text-black border-white hover:bg-white/90', variant === 'ghost' && 'bg-white/5 text-white border-white/15 hover:bg-white/10', variant === 'danger' && 'bg-rose-500/20 text-rose-200 border-rose-400/30 hover:bg-rose-500/25'),
        children: [
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c7 = ActionButton;
function RouteShortcut({ href, label, description }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: "group block rounded-xl border border-white/10 bg-black/20 p-3 hover:border-white/20 hover:bg-black/35 transition-colors",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-medium text-white",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 150,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_c8 = RouteShortcut;
function MarketModeSwitch({ base, active }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-white/10 bg-black/30 p-1 inline-flex gap-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: `${base}/usdc`,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', active === 'usdc' ? 'bg-white text-black' : 'text-slate-300 hover:bg-white/10 hover:text-white'),
                children: "USDC Collateral"
            }, void 0, false, {
                fileName: "[project]/components/modules/ProtocolUI.tsx",
                lineNumber: 165,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: `${base}/pas`,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', active === 'pas' ? 'bg-white text-black' : 'text-slate-300 hover:bg-white/10 hover:text-white'),
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
_c9 = MarketModeSwitch;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "PageShell");
__turbopack_context__.k.register(_c1, "Grid");
__turbopack_context__.k.register(_c2, "Panel");
__turbopack_context__.k.register(_c3, "StatRow");
__turbopack_context__.k.register(_c4, "StatRowSkeleton");
__turbopack_context__.k.register(_c5, "StateNotice");
__turbopack_context__.k.register(_c6, "ActionInput");
__turbopack_context__.k.register(_c7, "ActionButton");
__turbopack_context__.k.register(_c8, "RouteShortcut");
__turbopack_context__.k.register(_c9, "MarketModeSwitch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useEthBridge.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ETH_BRIDGE_CHAINS",
    ()=>ETH_BRIDGE_CHAINS,
    "useEthBridge",
    ()=>useEthBridge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useConnection.js [app-client] (ecmascript) <export useConnection as useAccount>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useChainId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWalletClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// ─── Retry helper ────────────────────────────────────────────────────────
async function withRetry(fn, attempts, delayMs) {
    let lastErr;
    for(let i = 0; i < attempts; i++){
        try {
            return await fn();
        } catch (err) {
            lastErr = err;
            if (i < attempts - 1) await new Promise((r)=>setTimeout(r, delayMs));
        }
    }
    throw lastErr;
}
const ETH_BRIDGE_CHAINS = [
    {
        chainId: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGE"].SEPOLIA_CHAIN_ID,
        name: 'Ethereum Sepolia',
        inboxAddress: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGE"].INBOX_SEPOLIA
    }
];
function useEthBridge() {
    _s();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChainId"])();
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])();
    // Pinned clients - independent of the currently active wallet chain
    const sepoliaPublicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])({
        chainId: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGE"].SEPOLIA_CHAIN_ID
    });
    const hubPublicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])({
        chainId: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACTS"].CHAIN_ID
    });
    const { data: walletClient } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletClient"])();
    // Ref so redeemDeposit always reads the latest walletClient even inside
    // a stale closure after switchChainAsync (avoids the narrowed-type issue
    // that useWalletClient({ chainId }) introduces).
    const walletClientRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(walletClient);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEthBridge.useEffect": ()=>{
            walletClientRef.current = walletClient;
        }
    }["useEthBridge.useEffect"], [
        walletClient
    ]);
    const { switchChainAsync } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [quote, setQuote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [quoteLoading, setQuoteLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastTxHash, setLastTxHash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mintedResult, setMintedResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Isolated reclaim state - never touches deposit `status`
    const [reclaimingTx, setReclaimingTx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [reclaimErrorTx, setReclaimErrorTx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [reclaimError, setReclaimError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [reclaimStep, setReclaimStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const quoteTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ── Quote polling ───────────────────────────────────────────────────
    const fetchQuote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEthBridge.useCallback[fetchQuote]": async (sourceChainId, ethAmount)=>{
            const amt = parseFloat(ethAmount);
            if (!Number.isFinite(amt) || amt <= 0) {
                setQuote(null);
                return;
            }
            setQuoteLoading(true);
            try {
                const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGE"].BACKEND_URL}/bridge/quote?chainId=${sourceChainId}&ethAmount=${amt}`);
                if (!res.ok) throw new Error(`Quote failed: ${res.status}`);
                const data = await res.json();
                setQuote(data);
            } catch (err) {
                console.warn('[useEthBridge] quote error:', err);
                setQuote(null);
            } finally{
                setQuoteLoading(false);
            }
        }
    }["useEthBridge.useCallback[fetchQuote]"], []);
    // Auto-refresh quote every 30 s
    const scheduleQuoteRefresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEthBridge.useCallback[scheduleQuoteRefresh]": (chainId, amount)=>{
            if (quoteTimerRef.current) clearTimeout(quoteTimerRef.current);
            quoteTimerRef.current = setTimeout({
                "useEthBridge.useCallback[scheduleQuoteRefresh]": ()=>fetchQuote(chainId, amount)
            }["useEthBridge.useCallback[scheduleQuoteRefresh]"], 30_000);
        }
    }["useEthBridge.useCallback[scheduleQuoteRefresh]"], [
        fetchQuote
    ]);
    // ── Main deposit flow ────────────────────────────────────────────────
    // 1. Switch MetaMask to source chain
    // 2. Call inbox.deposit(paddedHubAddress, { value })
    // 3. Await tx receipt
    // 4. POST /bridge/deposit → backend verifies + mints
    const depositETH = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEthBridge.useCallback[depositETH]": async (sourceChainId, ethAmountEth, hubRecipient)=>{
            if (!address || !walletClient || !publicClient) {
                setErrorMsg('Connect MetaMask first');
                return;
            }
            const chain = ETH_BRIDGE_CHAINS.find({
                "useEthBridge.useCallback[depositETH].chain": (c)=>c.chainId === sourceChainId
            }["useEthBridge.useCallback[depositETH].chain"]);
            if (!chain?.inboxAddress) {
                setErrorMsg('Inbox contract not deployed for this chain yet');
                return;
            }
            setStatus('idle');
            setErrorMsg(null);
            setMintedResult(null);
            try {
                // ── Step 1: switch chain ──────────────────────────────────
                if (chainId !== sourceChainId) {
                    setStatus('switching-chain');
                    await switchChainAsync({
                        chainId: sourceChainId
                    });
                }
                // ── Step 2: call inbox.deposit() ──────────────────────────
                setStatus('depositing');
                // Pad the Hub EVM address to bytes32 (left-pad with zeros)
                const checksummed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(hubRecipient);
                const hubRecipientBytes32 = '0x' + checksummed.slice(2).toLowerCase().padStart(64, '0');
                const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(ethAmountEth);
                const txHash = await walletClient.writeContract({
                    address: chain.inboxAddress,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].ETH_BRIDGE_INBOX,
                    functionName: 'deposit',
                    args: [
                        hubRecipientBytes32
                    ],
                    value
                });
                setLastTxHash(txHash);
                // ── Step 3: poll RPC every 3 s until TX is mined ─────────
                setStatus('awaiting-receipt');
                if (!sepoliaPublicClient) throw new Error('Sepolia RPC client unavailable');
                let mined = false;
                while(!mined){
                    try {
                        const receipt = await sepoliaPublicClient.getTransactionReceipt({
                            hash: txHash
                        });
                        if (receipt) mined = true;
                    } catch  {}
                    if (!mined) await new Promise({
                        "useEthBridge.useCallback[depositETH]": (r)=>setTimeout(r, 3_000)
                    }["useEthBridge.useCallback[depositETH]"]);
                }
                // ── Step 4+5: verify on backend (Hub mint), with retry ──
                setStatus('verifying');
                const mintResult = await withRetry({
                    "useEthBridge.useCallback[depositETH]": async ()=>{
                        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGE"].BACKEND_URL}/bridge/deposit`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                chainId: sourceChainId,
                                txHash,
                                hubRecipient: checksummed
                            })
                        });
                        const d = await res.json();
                        if (!res.ok) throw new Error(d.error ?? 'Backend error');
                        return d;
                    }
                }["useEthBridge.useCallback[depositETH]"], 3, 5_000);
                setStatus('minting');
                setMintedResult({
                    hubTx: mintResult.hubTx,
                    mUSDCHuman: mintResult.mUSDCHuman
                });
                setStatus('minted');
                // Auto-refresh history so Reclaim tab is immediately up to date
                await fetchHistory(address);
                // ── Step 6: switch back to Hub ────────────────────────────
                if (chainId !== __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACTS"].CHAIN_ID) {
                    await switchChainAsync({
                        chainId: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACTS"].CHAIN_ID
                    }).catch({
                        "useEthBridge.useCallback[depositETH]": ()=>{}
                    }["useEthBridge.useCallback[depositETH]"]);
                }
            } catch (err) {
                const msg = err instanceof Error ? err.message : 'Unknown error';
                setErrorMsg(msg);
                setStatus('error');
            }
        }
    }["useEthBridge.useCallback[depositETH]"], [
        address,
        chainId,
        walletClient,
        publicClient,
        sepoliaPublicClient,
        switchChainAsync
    ]);
    // ── Redeem flow ──────────────────────────────────────────────────────
    // Uses isolated state so it never interferes with the deposit flow.
    const redeemDeposit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEthBridge.useCallback[redeemDeposit]": async (sourceTxHash, redeemAmount)=>{
            if (!address || !walletClientRef.current || !hubPublicClient) {
                setReclaimError('Connect MetaMask first');
                return;
            }
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGE"].MINTER) {
                setReclaimError('Minter contract not deployed yet');
                return;
            }
            setReclaimingTx(sourceTxHash);
            setReclaimError(null);
            setReclaimErrorTx(null);
            setReclaimStep('switching-chain');
            try {
                // Ensure on Hub - switch if needed; walletClientRef.current will
                // be updated by the useEffect above once the re-render fires.
                if (chainId !== __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACTS"].CHAIN_ID) {
                    await switchChainAsync({
                        chainId: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACTS"].CHAIN_ID
                    });
                    // Brief yield so wagmi can flush the new walletClient into the ref
                    await new Promise({
                        "useEthBridge.useCallback[redeemDeposit]": (r)=>setTimeout(r, 100)
                    }["useEthBridge.useCallback[redeemDeposit]"]);
                }
                const wc = walletClientRef.current;
                // Approve mUSDC
                setReclaimStep('approving');
                const approveTx = await wc.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACTS"].MOCKUSDC,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].ERC20,
                    functionName: 'approve',
                    args: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGE"].MINTER,
                        redeemAmount
                    ]
                });
                await hubPublicClient.waitForTransactionReceipt({
                    hash: approveTx
                });
                // initiateRedeem on Hub
                setReclaimStep('redeeming');
                const redeemTx = await wc.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGE"].MINTER,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_BRIDGE_MINTER,
                    functionName: 'initiateRedeem',
                    args: [
                        sourceTxHash,
                        redeemAmount
                    ]
                });
                await hubPublicClient.waitForTransactionReceipt({
                    hash: redeemTx
                });
                // Notify backend to release ETH from inbox (Source-chain tx), with retry
                setReclaimStep('releasing');
                const redeemData = await withRetry({
                    "useEthBridge.useCallback[redeemDeposit]": async ()=>{
                        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGE"].BACKEND_URL}/bridge/redeem`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                sourceTxHash
                            })
                        });
                        const d = await res.json();
                        if (!res.ok) throw new Error(d.error ?? 'Backend redeem error');
                        return d;
                    }
                }["useEthBridge.useCallback[redeemDeposit]"], 3, 5_000);
                console.log(`[bridge] ETH released: ${redeemData.ethSentHuman} ETH | relayTx=${redeemData.relayTxHash}`);
                // Refresh history so the record flips to "redeemed"
                await fetchHistory(address);
            } catch (err) {
                const msg = err instanceof Error ? err.message : 'Unknown error';
                setReclaimError(msg);
                setReclaimErrorTx(sourceTxHash);
            } finally{
                setReclaimingTx(null);
                setReclaimStep('');
            }
        }
    }["useEthBridge.useCallback[redeemDeposit]"], [
        address,
        chainId,
        hubPublicClient,
        switchChainAsync
    ]);
    // ── Deposit history (Hub read) ───────────────────────────────────────
    const fetchHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEthBridge.useCallback[fetchHistory]": async (user)=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGE"].MINTER) return;
            try {
                // We read from Hub - create a direct viem publicClient to avoid chain mismatch
                const { createPublicClient, http } = await __turbopack_context__.A("[project]/node_modules/viem/_esm/index.js [app-client] (ecmascript, async loader)");
                const hubClient = createPublicClient({
                    transport: http(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACTS"].RPC)
                });
                const hashes = await hubClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGE"].MINTER,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_BRIDGE_MINTER,
                    functionName: 'getUserDeposits',
                    args: [
                        user
                    ]
                });
                const records = await Promise.all(hashes.map({
                    "useEthBridge.useCallback[fetchHistory]": async (h)=>{
                        const statusRes = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGE"].BACKEND_URL}/bridge/status?txHash=${h}`);
                        const record = statusRes.ok ? await statusRes.json() : {
                            status: 'pending'
                        };
                        return {
                            sourceTxHash: h,
                            ...record
                        };
                    }
                }["useEthBridge.useCallback[fetchHistory]"]));
                setHistory(records.reverse()); // newest first
            } catch (err) {
                console.warn('[useEthBridge] fetchHistory error:', err);
            }
        }
    }["useEthBridge.useCallback[fetchHistory]"], []);
    // Load history when address available on Hub
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEthBridge.useEffect": ()=>{
            if (address) fetchHistory(address);
        }
    }["useEthBridge.useEffect"], [
        address,
        fetchHistory
    ]);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEthBridge.useCallback[reset]": ()=>{
            setStatus('idle');
            setErrorMsg(null);
            setMintedResult(null);
            setLastTxHash(null);
        }
    }["useEthBridge.useCallback[reset]"], []);
    const clearReclaimError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEthBridge.useCallback[clearReclaimError]": ()=>{
            setReclaimError(null);
            setReclaimErrorTx(null);
        }
    }["useEthBridge.useCallback[clearReclaimError]"], []);
    return {
        // State
        status,
        errorMsg,
        quote,
        quoteLoading,
        lastTxHash,
        mintedResult,
        history,
        // Reclaim-specific state
        reclaimingTx,
        reclaimErrorTx,
        reclaimError,
        reclaimStep,
        // Actions
        fetchQuote,
        scheduleQuoteRefresh,
        depositETH,
        redeemDeposit,
        fetchHistory,
        reset,
        clearReclaimError
    };
}
_s(useEthBridge, "Rj2PUfO8i7TXt5vVYs4U4CPO//A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChainId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/bridge/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BridgePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useConnection.js [app-client] (ecmascript) <export useConnection as useAccount>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useChainId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/xcm.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/ProtocolUI.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useEthBridge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useEthBridge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/contracts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
// ─── Constants ─────────────────────────────────────────────────────────────
const MIN_ETH = 0.001;
const MAX_ETH = 1;
function explorerTx(chainId, txHash) {
    if (chainId === __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGE"].SEPOLIA_CHAIN_ID) return `https://sepolia.etherscan.io/tx/${txHash}`;
    // Hub Testnet - Blockscout
    return `https://blockscout-testnet.polkadot.io/tx/${txHash}`;
}
const XCM_STAGE_LABELS = {
    connecting: 'Connecting to People Chain',
    building: 'Building XCM transaction',
    awaiting_signature: 'Waiting for signature',
    broadcasting: 'Broadcasting to network',
    in_block: 'In block on People Chain',
    finalized: 'Finalized - awaiting Hub arrival'
};
const XCM_STAGES = [
    'connecting',
    'building',
    'awaiting_signature',
    'broadcasting',
    'in_block',
    'finalized'
];
// ─── ETH pipeline status labels (chain-prefixed) ──────────────────────────────────
const BRIDGE_STATUS_LABELS = {
    'switching-chain': '[Sepolia] Switching network…',
    'depositing': '[Sepolia] Locking ETH in inbox contract…',
    'awaiting-receipt': '[Sepolia] Waiting for confirmation…',
    'verifying': '[Sepolia → Hub] Verifying deposit & minting…',
    'minting': '[Hub] Minting mUSDC on Polkadot Hub…'
};
function statusToStepLabel(s) {
    return BRIDGE_STATUS_LABELS[s] ?? 'Finishing up…';
}
// ─── Shared sub-components ──────────────────────────────────────────────────
function StepConnector({ done }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center pl-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-px h-4 transition-colors duration-500', done ? 'bg-emerald-500/60' : 'bg-white/10')
        }, void 0, false, {
            fileName: "[project]/app/bridge/page.tsx",
            lineNumber: 73,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/bridge/page.tsx",
        lineNumber: 72,
        columnNumber: 9
    }, this);
}
_c = StepConnector;
function WalletStep({ index, title, subtitle, done, locked, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('rounded-2xl border p-5 transition-all duration-300', done ? 'border-emerald-500/30 bg-emerald-500/5' : locked ? 'border-white/5 bg-black/20 opacity-50 pointer-events-none' : 'border-white/10 bg-black/30 backdrop-blur-xl hover:border-white/20'),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm font-semibold', done ? 'border-emerald-500/60 bg-emerald-500/20 text-emerald-300' : locked ? 'border-white/10 bg-white/5 text-slate-600' : 'border-violet-500/50 bg-violet-500/10 text-violet-300'),
                    children: done ? '✓' : index
                }, void 0, false, {
                    fileName: "[project]/app/bridge/page.tsx",
                    lineNumber: 94,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-sm font-semibold', done ? 'text-emerald-300' : locked ? 'text-slate-600' : 'text-white'),
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 105,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-slate-500 mt-0.5",
                            children: subtitle
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 109,
                            columnNumber: 21
                        }, this),
                        !locked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 110,
                            columnNumber: 33
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/bridge/page.tsx",
                    lineNumber: 104,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/bridge/page.tsx",
            lineNumber: 93,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/bridge/page.tsx",
        lineNumber: 85,
        columnNumber: 9
    }, this);
}
_c1 = WalletStep;
// ─── Inline pipeline (shown within the Deposit panel while in-flight) ──────────
function InlineProgress({ status, txHash, srcChainId }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "block w-3.5 h-3.5 rounded-full border-2 border-violet-400 border-t-transparent animate-spin flex-shrink-0"
                }, void 0, false, {
                    fileName: "[project]/app/bridge/page.tsx",
                    lineNumber: 127,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm text-white/90",
                    children: statusToStepLabel(status)
                }, void 0, false, {
                    fileName: "[project]/app/bridge/page.tsx",
                    lineNumber: 128,
                    columnNumber: 17
                }, this),
                txHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: explorerTx(srcChainId, txHash),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "ml-auto text-xs text-slate-500 hover:text-slate-300 underline shrink-0",
                    children: "Tx ↗"
                }, void 0, false, {
                    fileName: "[project]/app/bridge/page.tsx",
                    lineNumber: 130,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/bridge/page.tsx",
            lineNumber: 126,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/bridge/page.tsx",
        lineNumber: 125,
        columnNumber: 9
    }, this);
}
_c2 = InlineProgress;
function XcmPipeline({ currentStage, arrived }) {
    if (!currentStage) return null;
    const currentIdx = XCM_STAGES.indexOf(currentStage);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
        title: "XCM Pipeline",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-1 pt-1",
            children: [
                XCM_STAGES.map((stage, i)=>{
                    const isDone = arrived ? true : i < currentIdx;
                    const isActive = !arrived && i === currentIdx;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 py-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0 w-5 h-5 flex items-center justify-center",
                                children: isDone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-emerald-400 text-sm",
                                    children: "✓"
                                }, void 0, false, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 153,
                                    columnNumber: 37
                                }, this) : isActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "block w-3 h-3 rounded-full border-2 border-violet-400 border-t-transparent animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 155,
                                    columnNumber: 37
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "block w-2 h-2 rounded-full bg-white/15"
                                }, void 0, false, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 157,
                                    columnNumber: 37
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/bridge/page.tsx",
                                lineNumber: 151,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-sm', isDone ? 'text-emerald-300' : isActive ? 'text-white font-medium' : 'text-slate-600'),
                                children: XCM_STAGE_LABELS[stage]
                            }, void 0, false, {
                                fileName: "[project]/app/bridge/page.tsx",
                                lineNumber: 160,
                                columnNumber: 29
                            }, this)
                        ]
                    }, stage, true, {
                        fileName: "[project]/app/bridge/page.tsx",
                        lineNumber: 150,
                        columnNumber: 25
                    }, this);
                }),
                arrived && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 py-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-shrink-0 w-5 h-5 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-emerald-400 text-sm",
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/app/bridge/page.tsx",
                                lineNumber: 172,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 171,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-emerald-300 font-medium",
                            children: "PAS arrived on Hub"
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 174,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/bridge/page.tsx",
                    lineNumber: 170,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/bridge/page.tsx",
            lineNumber: 145,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/bridge/page.tsx",
        lineNumber: 144,
        columnNumber: 9
    }, this);
}
_c3 = XcmPipeline;
function BridgeTabBar({ active, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-1 rounded-xl border border-white/10 bg-black/30 p-1 w-fit",
        children: [
            'pas',
            'eth'
        ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onChange(t),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-5 py-2 rounded-lg text-sm font-medium transition-all', active === t ? 'bg-violet-600/70 text-white shadow' : 'text-slate-400 hover:text-white'),
                children: t === 'pas' ? 'PAS via XCM' : 'ETH → mUSDC'
            }, t, false, {
                fileName: "[project]/app/bridge/page.tsx",
                lineNumber: 189,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/bridge/page.tsx",
        lineNumber: 187,
        columnNumber: 9
    }, this);
}
_c4 = BridgeTabBar;
function BridgePage() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('pas');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageShell"], {
        title: "Bridge",
        subtitle: "Transfer assets to Hub Testnet.",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BridgeTabBar, {
                    active: activeTab,
                    onChange: setActiveTab
                }, void 0, false, {
                    fileName: "[project]/app/bridge/page.tsx",
                    lineNumber: 206,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/bridge/page.tsx",
                lineNumber: 205,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: activeTab === 'pas' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PasTab, {}, void 0, false, {
                        fileName: "[project]/app/bridge/page.tsx",
                        lineNumber: 210,
                        columnNumber: 44
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EthTab, {}, void 0, false, {
                        fileName: "[project]/app/bridge/page.tsx",
                        lineNumber: 210,
                        columnNumber: 57
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/bridge/page.tsx",
                    lineNumber: 209,
                    columnNumber: 17
                }, this)
            }, void 0, false)
        ]
    }, void 0, true, {
        fileName: "[project]/app/bridge/page.tsx",
        lineNumber: 204,
        columnNumber: 9
    }, this);
}
_s(BridgePage, "hJfL/L0bl03vFLVPdUpSd52IGoM=");
_c5 = BridgePage;
// ═══════════════════════════════════════════════════════════════════════════
// PAS XCM Tab - sequential progressive steps
// ═══════════════════════════════════════════════════════════════════════════
function PasTab() {
    _s1();
    const { address: hubAddress, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const [substrateAccounts, setSubstrateAccounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAccount, setSelectedAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [peopleBalance, setPeopleBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [talismanConnected, setTalismanConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('1');
    const [statusMsg, setStatusMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sending, setSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [balanceBefore, setBalanceBefore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [balanceNow, setBalanceNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [arrived, setArrived] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentStage, setCurrentStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hasSent, setHasSent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pollCleanupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])();
    async function connectTalisman() {
        setStatusMsg('Connecting…');
        try {
            const { web3Enable, web3Accounts } = await __turbopack_context__.A("[project]/node_modules/@polkadot/extension-dapp/index.js [app-client] (ecmascript, async loader)");
            const exts = await web3Enable('Kredio Bridge');
            if (!exts.length) {
                setStatusMsg('No wallet extension found. Install Talisman.');
                return;
            }
            const accounts = await web3Accounts();
            const filtered = accounts.filter((a)=>a.type === 'sr25519' || a.type === 'ed25519' || !a.type);
            if (!filtered.length) {
                setStatusMsg('No Substrate accounts found in Talisman.');
                return;
            }
            setSubstrateAccounts(filtered);
            setSelectedAccount(filtered[0]);
            setTalismanConnected(true);
            setStatusMsg('');
            await updatePeopleBalance(filtered[0].address);
        } catch  {
            setStatusMsg('Failed to connect Talisman.');
        }
    }
    async function updatePeopleBalance(address) {
        try {
            const free = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchPeopleBalance"])(address);
            setPeopleBalance((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPASFromPeople"])(free));
        } catch  {
            setPeopleBalance('-');
        }
    }
    async function sendXCM() {
        if (!selectedAccount || !hubAddress) return;
        setSending(true);
        setArrived(false);
        setHasSent(true);
        setStatusMsg('');
        try {
            let snapshot;
            if (publicClient) {
                snapshot = await publicClient.getBalance({
                    address: hubAddress
                });
                setBalanceBefore(snapshot);
                setBalanceNow(snapshot);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["h160ToSS58"])(hubAddress);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendXCMToHub"])({
                senderAddress: selectedAccount.address,
                destinationEVM: hubAddress,
                amountPAS: amount,
                onStatus: (stage, detail)=>{
                    setCurrentStage(stage);
                    setStatusMsg(detail || XCM_STAGE_LABELS[stage]);
                    if (stage === 'in_block') setSending(false);
                }
            });
            if (snapshot !== undefined && publicClient) {
                pollCleanupRef.current?.();
                pollCleanupRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pollHubArrival"])({
                    address: hubAddress,
                    before: snapshot,
                    publicClient,
                    onTick: (cur)=>setBalanceNow(cur),
                    onArrival: (delta)=>{
                        setArrived(true);
                        setStatusMsg(`+${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPASFromEVM"])(delta)} PAS arrived on Hub`);
                        setSending(false);
                    }
                });
            }
        } catch (err) {
            setStatusMsg(`Error: ${err instanceof Error ? err.message : String(err)}`);
            setSending(false);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PasTab.useEffect": ()=>({
                "PasTab.useEffect": ()=>{
                    pollCleanupRef.current?.();
                }
            })["PasTab.useEffect"]
    }["PasTab.useEffect"], []);
    const fmtWei = (w)=>w !== null ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPASFromEVM"])(w)} PAS` : '-';
    const canSend = isConnected && talismanConnected && !sending && parseFloat(amount) > 0;
    const isError = statusMsg.toLowerCase().startsWith('error') || statusMsg.toLowerCase().includes('failed');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3 max-w-lg mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WalletStep, {
                index: 1,
                title: "Connect MetaMask",
                subtitle: "Your EVM address on Hub Testnet receives the PAS.",
                done: isConnected,
                locked: false,
                children: isConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatRow"], {
                            label: "Address",
                            value: `${hubAddress?.slice(0, 10)}…${hubAddress?.slice(-6)}`
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 326,
                            columnNumber: 25
                        }, this),
                        balanceNow !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatRow"], {
                            label: "Hub Balance",
                            value: fmtWei(balanceNow),
                            tone: arrived ? 'green' : 'default'
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 328,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/bridge/page.tsx",
                    lineNumber: 325,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-slate-400",
                    children: "Use the wallet button in the header to connect."
                }, void 0, false, {
                    fileName: "[project]/app/bridge/page.tsx",
                    lineNumber: 332,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/bridge/page.tsx",
                lineNumber: 317,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepConnector, {
                done: isConnected
            }, void 0, false, {
                fileName: "[project]/app/bridge/page.tsx",
                lineNumber: 336,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WalletStep, {
                index: 2,
                title: "Connect Talisman",
                subtitle: "Substrate wallet holding PAS on People Chain.",
                done: talismanConnected,
                locked: !isConnected,
                children: !talismanConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionButton"], {
                            label: "Connect Talisman",
                            onClick: connectTalisman,
                            variant: "primary"
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 348,
                            columnNumber: 25
                        }, this),
                        statusMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-slate-400",
                            children: statusMsg
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 349,
                            columnNumber: 39
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/bridge/page.tsx",
                    lineNumber: 347,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatRow"], {
                            label: "Account",
                            value: selectedAccount?.meta?.name || 'Account'
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 353,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatRow"], {
                            label: "Address",
                            value: `${selectedAccount?.address.slice(0, 10)}…${selectedAccount?.address.slice(-6)}`
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 354,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatRow"], {
                            label: "Balance",
                            value: peopleBalance ? `${peopleBalance} PAS` : '-'
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 355,
                            columnNumber: 25
                        }, this),
                        substrateAccounts.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            className: "w-full mt-1 rounded-xl border border-white/10 bg-black/40 text-sm text-white px-3 py-2 outline-none focus:border-white/30",
                            onChange: (e)=>{
                                const acc = substrateAccounts.find((a)=>a.address === e.target.value) || null;
                                setSelectedAccount(acc);
                                if (acc) updatePeopleBalance(acc.address);
                            },
                            children: substrateAccounts.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: a.address,
                                    children: [
                                        a.meta?.name || 'Account',
                                        " - ",
                                        a.address.slice(0, 12),
                                        "…"
                                    ]
                                }, a.address, true, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 366,
                                    columnNumber: 37
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 357,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/bridge/page.tsx",
                    lineNumber: 352,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/bridge/page.tsx",
                lineNumber: 339,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepConnector, {
                done: talismanConnected
            }, void 0, false, {
                fileName: "[project]/app/bridge/page.tsx",
                lineNumber: 376,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WalletStep, {
                index: 3,
                title: "Send PAS to Hub",
                subtitle: "Amount deducted from People Chain, delivered to your Hub EVM address.",
                done: arrived,
                locked: !talismanConnected || !isConnected,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-xs uppercase tracking-wide text-slate-400",
                                    children: "Amount"
                                }, void 0, false, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 388,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mt-1.5 flex-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: amount,
                                            min: "0.1",
                                            step: "0.1",
                                            onChange: (e)=>setAmount(e.target.value),
                                            disabled: sending,
                                            className: "w-36 rounded-xl border border-white/10 bg-black/40 text-sm text-white px-3 py-2 outline-none focus:border-violet-500/40 disabled:opacity-50"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bridge/page.tsx",
                                            lineNumber: 390,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-slate-400",
                                            children: "PAS"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bridge/page.tsx",
                                            lineNumber: 399,
                                            columnNumber: 29
                                        }, this),
                                        [
                                            1,
                                            5,
                                            10
                                        ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setAmount(String(v)),
                                                disabled: sending,
                                                className: "text-xs text-slate-500 hover:text-white border border-white/10 px-2 py-1 rounded-lg transition-colors disabled:opacity-30",
                                                children: v
                                            }, v, false, {
                                                fileName: "[project]/app/bridge/page.tsx",
                                                lineNumber: 401,
                                                columnNumber: 33
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 389,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 387,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-slate-500",
                            children: [
                                "To: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono text-slate-400",
                                    children: hubAddress ?? '-'
                                }, void 0, false, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 409,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 408,
                            columnNumber: 21
                        }, this),
                        arrived ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-sm text-emerald-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "✓"
                                }, void 0, false, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 413,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "PAS arrived on Hub"
                                }, void 0, false, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 414,
                                    columnNumber: 29
                                }, this),
                                balanceBefore !== null && balanceNow !== null && balanceNow > balanceBefore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-emerald-400 font-semibold",
                                    children: [
                                        "+",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPASFromEVM"])(balanceNow - balanceBefore),
                                        " PAS"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 416,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 412,
                            columnNumber: 25
                        }, this) : isError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/8 px-4 py-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-rose-400 text-sm shrink-0",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 423,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-rose-300 flex-1 min-w-0 truncate",
                                    children: statusMsg
                                }, void 0, false, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 424,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setStatusMsg(''),
                                    className: "text-slate-500 hover:text-white text-sm leading-none shrink-0",
                                    "aria-label": "Dismiss",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 425,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 422,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionButton"], {
                            label: sending ? 'Sending via XCM…' : 'Send PAS via Talisman',
                            onClick: sendXCM,
                            disabled: !canSend,
                            loading: sending,
                            variant: "primary"
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 428,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/bridge/page.tsx",
                    lineNumber: 386,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/bridge/page.tsx",
                lineNumber: 379,
                columnNumber: 13
            }, this),
            hasSent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(XcmPipeline, {
                    currentStage: currentStage,
                    arrived: arrived
                }, void 0, false, {
                    fileName: "[project]/app/bridge/page.tsx",
                    lineNumber: 442,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/bridge/page.tsx",
                lineNumber: 441,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/bridge/page.tsx",
        lineNumber: 314,
        columnNumber: 9
    }, this);
}
_s1(PasTab, "zciMNOONGkO2NxntqqJncOstQbw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"]
    ];
});
_c6 = PasTab;
function EthTab() {
    _s2();
    const [innerTab, setInnerTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('bridge');
    const { address, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChainId"])();
    const { switchChainAsync } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const { status, errorMsg, quote, quoteLoading, lastTxHash, mintedResult, history, reclaimingTx, reclaimErrorTx, reclaimError, reclaimStep, fetchQuote, depositETH, redeemDeposit, fetchHistory, reset, clearReclaimError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useEthBridge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEthBridge"])();
    const [selectedChainId, setSelectedChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGE"].SEPOLIA_CHAIN_ID);
    const [ethAmount, setEthAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [quoteAge, setQuoteAge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EthTab.useEffect": ()=>{
            const n = parseFloat(ethAmount);
            if (Number.isFinite(n) && n >= MIN_ETH && n <= MAX_ETH) fetchQuote(selectedChainId, ethAmount);
        }
    }["EthTab.useEffect"], [
        ethAmount,
        selectedChainId,
        fetchQuote
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EthTab.useEffect": ()=>{
            if (!quote) return;
            const start = new Date(quote.freshAt).getTime();
            const id = setInterval({
                "EthTab.useEffect.id": ()=>setQuoteAge(Math.floor((Date.now() - start) / 1000))
            }["EthTab.useEffect.id"], 1000);
            return ({
                "EthTab.useEffect": ()=>clearInterval(id)
            })["EthTab.useEffect"];
        }
    }["EthTab.useEffect"], [
        quote
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EthTab.useEffect": ()=>{
            if (!quote || !ethAmount) return;
            const id = setTimeout({
                "EthTab.useEffect.id": ()=>fetchQuote(selectedChainId, ethAmount)
            }["EthTab.useEffect.id"], 30_000);
            return ({
                "EthTab.useEffect": ()=>clearTimeout(id)
            })["EthTab.useEffect"];
        }
    }["EthTab.useEffect"], [
        quote,
        ethAmount,
        selectedChainId,
        fetchQuote
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EthTab.useEffect": ()=>{
            if (innerTab === 'reclaim' && address) fetchHistory(address);
        }
    }["EthTab.useEffect"], [
        innerTab,
        address,
        fetchHistory
    ]);
    const handleChainSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EthTab.useCallback[handleChainSelect]": async (id)=>{
            setSelectedChainId(id);
            if (isConnected && chainId !== id) {
                try {
                    await switchChainAsync({
                        chainId: id
                    });
                } catch  {}
            }
        }
    }["EthTab.useCallback[handleChainSelect]"], [
        isConnected,
        chainId,
        switchChainAsync
    ]);
    const handleDeposit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EthTab.useCallback[handleDeposit]": async ()=>{
            if (!address) return;
            await depositETH(selectedChainId, ethAmount, address);
        }
    }["EthTab.useCallback[handleDeposit]"], [
        address,
        depositETH,
        selectedChainId,
        ethAmount
    ]);
    const numAmt = parseFloat(ethAmount);
    const valid = Number.isFinite(numAmt) && numAmt >= MIN_ETH && numAmt <= MAX_ETH;
    const busy = status !== 'idle' && status !== 'minted' && status !== 'error';
    const RECLAIM_STEP_LABELS = {
        'switching-chain': 'Switching to Hub…',
        'approving': 'Approving mUSDC…',
        'redeeming': 'Burning mUSDC on Hub…',
        'releasing': 'Releasing ETH on Sepolia…'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 max-w-lg mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 rounded-xl border border-white/10 bg-black/20 p-1 w-fit",
                children: [
                    'bridge',
                    'reclaim'
                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setInnerTab(t),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-4 py-1.5 rounded-lg text-sm font-medium transition-all', innerTab === t ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'),
                        children: t === 'bridge' ? 'Bridge' : 'Reclaim'
                    }, t, false, {
                        fileName: "[project]/app/bridge/page.tsx",
                        lineNumber: 523,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/bridge/page.tsx",
                lineNumber: 521,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: innerTab === 'bridge' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
                            title: "Source Chain",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 gap-2 pt-1",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useEthBridge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ETH_BRIDGE_CHAINS"].map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleChainSelect(c.chainId),
                                        disabled: !c.inboxAddress || busy,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all', selectedChainId === c.chainId ? 'border-violet-500/50 bg-violet-500/10 text-white' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10', !c.inboxAddress && 'opacity-40 cursor-not-allowed'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: c.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/bridge/page.tsx",
                                                lineNumber: 552,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    chainId === c.chainId && isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2 h-2 rounded-full bg-emerald-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/bridge/page.tsx",
                                                        lineNumber: 555,
                                                        columnNumber: 49
                                                    }, this),
                                                    !c.inboxAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-slate-500",
                                                        children: "coming soon"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/bridge/page.tsx",
                                                        lineNumber: 558,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/bridge/page.tsx",
                                                lineNumber: 553,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, c.chainId, true, {
                                        fileName: "[project]/app/bridge/page.tsx",
                                        lineNumber: 540,
                                        columnNumber: 37
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/bridge/page.tsx",
                                lineNumber: 538,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 537,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
                            title: "Amount",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 pt-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: MIN_ETH,
                                                max: MAX_ETH,
                                                step: "0.001",
                                                value: ethAmount,
                                                onChange: (e)=>setEthAmount(e.target.value),
                                                placeholder: "0.01",
                                                disabled: busy,
                                                className: "w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 pr-36"
                                            }, void 0, false, {
                                                fileName: "[project]/app/bridge/page.tsx",
                                                lineNumber: 570,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute right-3 top-1/2 -translate-y-1/2 flex gap-1.5",
                                                children: [
                                                    0.001,
                                                    0.01,
                                                    0.1
                                                ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setEthAmount(String(v)),
                                                        disabled: busy,
                                                        className: "text-xs text-slate-400 hover:text-white border border-white/10 px-2 py-0.5 rounded-lg transition-colors disabled:opacity-30",
                                                        children: v
                                                    }, v, false, {
                                                        fileName: "[project]/app/bridge/page.tsx",
                                                        lineNumber: 586,
                                                        columnNumber: 45
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/bridge/page.tsx",
                                                lineNumber: 584,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/bridge/page.tsx",
                                        lineNumber: 569,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-500",
                                        children: [
                                            "Min ",
                                            MIN_ETH,
                                            " · Max ",
                                            MAX_ETH,
                                            " ETH · 0.20% fee"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/bridge/page.tsx",
                                        lineNumber: 593,
                                        columnNumber: 33
                                    }, this),
                                    (quote || quoteLoading) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('rounded-xl border px-4 py-3 transition-all', quoteLoading ? 'border-white/5' : 'border-violet-500/20 bg-violet-500/5'),
                                        children: quoteLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-slate-400 animate-pulse",
                                            children: "Fetching price…"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bridge/page.tsx",
                                            lineNumber: 601,
                                            columnNumber: 45
                                        }, this) : quote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-sm flex-wrap",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white font-medium",
                                                            children: [
                                                                quote.ethAmountEth,
                                                                " ETH"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/bridge/page.tsx",
                                                            lineNumber: 605,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-500",
                                                            children: "→"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/bridge/page.tsx",
                                                            lineNumber: 606,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-emerald-300",
                                                            children: [
                                                                "$",
                                                                (parseFloat(quote.ethAmountEth) * quote.ethPriceUSD).toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/bridge/page.tsx",
                                                            lineNumber: 607,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-500",
                                                            children: "→"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/bridge/page.tsx",
                                                            lineNumber: 608,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-violet-300 font-semibold",
                                                            children: [
                                                                quote.mUSDCOutHuman,
                                                                " mUSDC"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/bridge/page.tsx",
                                                            lineNumber: 609,
                                                            columnNumber: 53
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/bridge/page.tsx",
                                                    lineNumber: 604,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-500",
                                                    children: [
                                                        "ETH/USD $",
                                                        quote.ethPriceUSD.toFixed(2),
                                                        " · fee ",
                                                        quote.feePct,
                                                        " · ",
                                                        quoteAge,
                                                        "s ago"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/bridge/page.tsx",
                                                    lineNumber: 611,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/bridge/page.tsx",
                                            lineNumber: 603,
                                            columnNumber: 45
                                        }, this) : null
                                    }, void 0, false, {
                                        fileName: "[project]/app/bridge/page.tsx",
                                        lineNumber: 596,
                                        columnNumber: 37
                                    }, this),
                                    address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-500",
                                        children: [
                                            "mUSDC minted to:",
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-slate-400",
                                                children: [
                                                    address.slice(0, 10),
                                                    "…",
                                                    address.slice(-6)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/bridge/page.tsx",
                                                lineNumber: 622,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/bridge/page.tsx",
                                        lineNumber: 620,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/bridge/page.tsx",
                                lineNumber: 568,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 567,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
                            title: "Deposit",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 pt-1",
                                children: !isConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNotice"], {
                                    tone: "info",
                                    message: "Connect MetaMask to continue."
                                }, void 0, false, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 632,
                                    columnNumber: 37
                                }, this) : status === 'minted' ? /* Success card - dismissed manually with ✕ */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl bg-emerald-500/10 border border-emerald-500/25 px-4 py-3 space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-semibold text-emerald-300",
                                                    children: [
                                                        "✓ Minted ",
                                                        mintedResult?.mUSDCHuman,
                                                        " mUSDC"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/bridge/page.tsx",
                                                    lineNumber: 637,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: reset,
                                                    className: "text-slate-500 hover:text-white text-base leading-none ml-3",
                                                    "aria-label": "Dismiss",
                                                    children: "✕"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/bridge/page.tsx",
                                                    lineNumber: 640,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/bridge/page.tsx",
                                            lineNumber: 636,
                                            columnNumber: 41
                                        }, this),
                                        mintedResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: explorerTx(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACTS"].CHAIN_ID, mintedResult.hubTx),
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "text-xs text-slate-400 hover:text-white underline block",
                                            children: "View Hub Tx ↗"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bridge/page.tsx",
                                            lineNumber: 647,
                                            columnNumber: 45
                                        }, this),
                                        lastTxHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: explorerTx(selectedChainId, lastTxHash),
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "text-xs text-slate-400 hover:text-white underline block",
                                            children: "View Source Tx ↗"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bridge/page.tsx",
                                            lineNumber: 652,
                                            columnNumber: 45
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 635,
                                    columnNumber: 37
                                }, this) : status === 'error' ? /* Error card - replaces button, dismissed with ✕ */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/8 px-4 py-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-rose-400 text-sm shrink-0",
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bridge/page.tsx",
                                            lineNumber: 660,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-rose-300 flex-1 min-w-0 break-words",
                                            children: errorMsg ?? 'Transaction failed'
                                        }, void 0, false, {
                                            fileName: "[project]/app/bridge/page.tsx",
                                            lineNumber: 661,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: reset,
                                            className: "text-slate-500 hover:text-white text-sm leading-none shrink-0",
                                            "aria-label": "Dismiss",
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/app/bridge/page.tsx",
                                            lineNumber: 662,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 659,
                                    columnNumber: 37
                                }, this) : busy ? /* Inline pipeline - replaces button while active */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InlineProgress, {
                                    status: status,
                                    txHash: lastTxHash,
                                    srcChainId: selectedChainId
                                }, void 0, false, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 666,
                                    columnNumber: 37
                                }, this) : chainId !== selectedChainId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleChainSelect(selectedChainId),
                                    className: "w-full py-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-sm font-medium hover:bg-amber-500/25 transition-all",
                                    children: [
                                        "Switch to ",
                                        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useEthBridge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ETH_BRIDGE_CHAINS"].find((c)=>c.chainId === selectedChainId)?.name ?? 'Source Chain'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 672,
                                    columnNumber: 37
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleDeposit,
                                    disabled: !valid || !address,
                                    className: "w-full py-3.5 rounded-xl bg-violet-600/80 border border-violet-500/30 text-white text-sm font-semibold hover:bg-violet-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed",
                                    children: `Deposit ${ethAmount || '-'} ETH`
                                }, void 0, false, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 679,
                                    columnNumber: 37
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/bridge/page.tsx",
                                lineNumber: 630,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 629,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/bridge/page.tsx",
                    lineNumber: 535,
                    columnNumber: 21
                }, this) : /* ── Reclaim tab ── */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
                        title: "Reclaim ETH",
                        subtitle: "Burn mUSDC to receive your original ETH back on the source chain.",
                        children: !isConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNotice"], {
                            tone: "info",
                            message: "Connect MetaMask to view your deposits."
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 697,
                            columnNumber: 33
                        }, this) : history.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-slate-500 py-2",
                            children: "No deposits found for this address."
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 699,
                            columnNumber: 33
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 pt-1",
                            children: history.map((rec)=>{
                                const srcChain = __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useEthBridge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ETH_BRIDGE_CHAINS"].find((c)=>c.chainId === rec.sourceChainId);
                                const ethF = rec.ethAmount ? parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(BigInt(rec.ethAmount))).toFixed(4) : '?';
                                const canRedeem = rec.status === 'minted' && !rec.redeemed;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('rounded-xl border px-4 py-3 space-y-2', rec.status === 'redeemed' ? 'border-white/5 bg-white/3 opacity-60' : canRedeem ? 'border-amber-500/20 bg-amber-500/5' : 'border-white/10 bg-white/5'),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-slate-400",
                                                    children: srcChain?.name ?? `Chain ${rec.sourceChainId}`
                                                }, void 0, false, {
                                                    fileName: "[project]/app/bridge/page.tsx",
                                                    lineNumber: 723,
                                                    columnNumber: 53
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-xs px-2 py-0.5 rounded-full font-medium', rec.status === 'redeemed' ? 'bg-slate-500/20 text-slate-400' : rec.status === 'minted' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'),
                                                    children: rec.status
                                                }, void 0, false, {
                                                    fileName: "[project]/app/bridge/page.tsx",
                                                    lineNumber: 726,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/bridge/page.tsx",
                                            lineNumber: 722,
                                            columnNumber: 49
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-white",
                                            children: [
                                                ethF,
                                                " ETH",
                                                ' ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-500",
                                                    children: "→"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/bridge/page.tsx",
                                                    lineNumber: 739,
                                                    columnNumber: 53
                                                }, this),
                                                ' ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-violet-300",
                                                    children: [
                                                        rec.mUSDCHuman ?? '?',
                                                        " mUSDC"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/bridge/page.tsx",
                                                    lineNumber: 740,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/bridge/page.tsx",
                                            lineNumber: 737,
                                            columnNumber: 49
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: explorerTx(rec.sourceChainId ?? __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRIDGE"].SEPOLIA_CHAIN_ID, rec.sourceTxHash),
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "text-xs text-slate-500 hover:text-white underline",
                                                    children: "Source Tx ↗"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/bridge/page.tsx",
                                                    lineNumber: 743,
                                                    columnNumber: 53
                                                }, this),
                                                canRedeem && (reclaimingTx === rec.sourceTxHash ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-1.5 text-xs text-amber-300",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "animate-spin h-3 w-3",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                    className: "opacity-25",
                                                                    cx: "12",
                                                                    cy: "12",
                                                                    r: "10",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/bridge/page.tsx",
                                                                    lineNumber: 755,
                                                                    columnNumber: 69
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    className: "opacity-75",
                                                                    fill: "currentColor",
                                                                    d: "M4 12a8 8 0 018-8v8z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/bridge/page.tsx",
                                                                    lineNumber: 756,
                                                                    columnNumber: 69
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/bridge/page.tsx",
                                                            lineNumber: 754,
                                                            columnNumber: 65
                                                        }, this),
                                                        RECLAIM_STEP_LABELS[reclaimStep] ?? 'Processing…'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/bridge/page.tsx",
                                                    lineNumber: 753,
                                                    columnNumber: 61
                                                }, this) : reclaimErrorTx === rec.sourceTxHash && reclaimError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-rose-300 truncate max-w-[180px]",
                                                            children: reclaimError
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/bridge/page.tsx",
                                                            lineNumber: 762,
                                                            columnNumber: 65
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: clearReclaimError,
                                                            className: "text-slate-500 hover:text-white text-xs leading-none shrink-0",
                                                            "aria-label": "Dismiss",
                                                            children: "✕"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/bridge/page.tsx",
                                                            lineNumber: 763,
                                                            columnNumber: 65
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/bridge/page.tsx",
                                                    lineNumber: 761,
                                                    columnNumber: 61
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        const minted = BigInt(rec.mUSDCMinted ?? '0');
                                                        redeemDeposit(rec.sourceTxHash, minted);
                                                    },
                                                    disabled: !!reclaimingTx,
                                                    className: "text-xs px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 disabled:opacity-40 transition-all font-medium",
                                                    children: [
                                                        "Reclaim ",
                                                        ethF,
                                                        " ETH"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/bridge/page.tsx",
                                                    lineNumber: 766,
                                                    columnNumber: 61
                                                }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/bridge/page.tsx",
                                            lineNumber: 742,
                                            columnNumber: 49
                                        }, this)
                                    ]
                                }, rec.sourceTxHash, true, {
                                    fileName: "[project]/app/bridge/page.tsx",
                                    lineNumber: 711,
                                    columnNumber: 45
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/bridge/page.tsx",
                            lineNumber: 701,
                            columnNumber: 33
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/bridge/page.tsx",
                        lineNumber: 695,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/bridge/page.tsx",
                    lineNumber: 694,
                    columnNumber: 21
                }, this)
            }, void 0, false)
        ]
    }, void 0, true, {
        fileName: "[project]/app/bridge/page.tsx",
        lineNumber: 518,
        columnNumber: 9
    }, this);
}
_s2(EthTab, "FeCbr3IkNSPi8Z2p76xFet53Zzo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChainId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useEthBridge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEthBridge"]
    ];
});
_c7 = EthTab;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "StepConnector");
__turbopack_context__.k.register(_c1, "WalletStep");
__turbopack_context__.k.register(_c2, "InlineProgress");
__turbopack_context__.k.register(_c3, "XcmPipeline");
__turbopack_context__.k.register(_c4, "BridgeTabBar");
__turbopack_context__.k.register(_c5, "BridgePage");
__turbopack_context__.k.register(_c6, "PasTab");
__turbopack_context__.k.register(_c7, "EthTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_75c5db33._.js.map