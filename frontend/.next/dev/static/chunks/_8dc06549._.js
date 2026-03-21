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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/address/isAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseUnits.js [app-client] (ecmascript)");
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
    const { ApiPromise, WsProvider } = await __turbopack_context__.A("[project]/node_modules/@polkadot/api/index.js [app-client] (ecmascript, async loader)");
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
    const { hexToU8a } = await __turbopack_context__.A("[project]/node_modules/@polkadot/util/index.js [app-client] (ecmascript, async loader)");
    const { encodeAddress } = await __turbopack_context__.A("[project]/node_modules/@polkadot/util-crypto/index.js [app-client] (ecmascript, async loader)");
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
    return Number.parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(wei, PAS_EVM_DECIMALS)).toFixed(4);
}
function formatPASFromPeople(raw) {
    return Number.parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(raw, PAS_SUBSTRATE_DECIMALS)).toFixed(4);
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])(amountPAS, PAS_SUBSTRATE_DECIMALS).toString();
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
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(destinationEVM)) {
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
            const { encodeAddress } = await __turbopack_context__.A("[project]/node_modules/@polkadot/util-crypto/index.js [app-client] (ecmascript, async loader)");
            const { hexToU8a } = await __turbopack_context__.A("[project]/node_modules/@polkadot/util/index.js [app-client] (ecmascript, async loader)");
            const h160 = hexToU8a(destinationEVM);
            const id32 = new Uint8Array(32);
            id32.set(h160, 0);
            id32.fill(0xee, 20);
            const ss58Dest = encodeAddress(id32, 0);
            const { Builder } = await __turbopack_context__.A("[project]/node_modules/@paraspell/sdk-pjs/dist/index.mjs [app-client] (ecmascript, async loader)");
            const tx = await Builder(api).from('PeoplePaseo').to('AssetHubPaseo').currency({
                symbol: 'PAS',
                amount
            }).address(ss58Dest).senderAddress(senderAddress).build();
            onStatus?.('awaiting_signature', 'Waiting for Talisman signature...');
            const { web3FromAddress } = await __turbopack_context__.A("[project]/node_modules/@polkadot/extension-dapp/index.js [app-client] (ecmascript, async loader)");
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
"[project]/hooks/useProtocolData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/abitype/dist/esm/human-readable/parseAbiItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useConnection.js [app-client] (ecmascript) <export useConnection as useAccount>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useBalance.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/addresses.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
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
    _s();
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const [lending, setLending] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](defaultMarket);
    const [pasMarket, setPasMarket] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](defaultMarket);
    const [oracle, setOracle] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](defaultOracle);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const refresh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useGlobalProtocolData.useCallback[refresh]": async ()=>{
            if (!publicClient) return;
            setLoading(true);
            setError(null);
            try {
                const [lendingDeposited, lendingBorrowed, lendingUtil, lendingFees, pasDeposited, pasBorrowed, pasUtil, pasFees, oracleTuple, isCrashed] = await Promise.all([
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                        functionName: 'totalDeposited'
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                        functionName: 'totalBorrowed'
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                        functionName: 'utilizationRate'
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                        functionName: 'protocolFees'
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                        functionName: 'totalDeposited'
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                        functionName: 'totalBorrowed'
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                        functionName: 'utilizationRate'
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                        functionName: 'protocolFees'
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oracle,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].PAS_ORACLE,
                        functionName: 'latestRoundData'
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oracle,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].PAS_ORACLE,
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
        }
    }["useGlobalProtocolData.useCallback[refresh]"], [
        publicClient
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useGlobalProtocolData.useEffect": ()=>{
            refresh();
            const id = window.setInterval(refresh, 30_000);
            return ({
                "useGlobalProtocolData.useEffect": ()=>window.clearInterval(id)
            })["useGlobalProtocolData.useEffect"];
        }
    }["useGlobalProtocolData.useEffect"], [
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
_s(useGlobalProtocolData, "Np8ViA5+oOjboypDaf6TXU9kVUE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"]
    ];
});
function useUserScore() {
    _s1();
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const [score, setScore] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](defaultScore);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const refresh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useUserScore.useCallback[refresh]": async ()=>{
            if (!publicClient || !address) return;
            setLoading(true);
            setError(null);
            try {
                const [res, blockNumber] = await Promise.all([
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
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
        }
    }["useUserScore.useCallback[refresh]"], [
        publicClient,
        address
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useUserScore.useEffect": ()=>{
            if (address) refresh();
        }
    }["useUserScore.useEffect"], [
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
_s1(useUserScore, "PMaMjBvgyWtD6znaYB9UlX8LSck=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"]
    ];
});
function useUserPortfolio() {
    _s2();
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const { data: nativePas } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBalance"])({
        address
    });
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [state, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
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
    const hasLoadedOnce = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const refresh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useUserPortfolio.useCallback[refresh]": async ()=>{
            if (!publicClient || !address) return;
            // Only show the loading spinner for the initial fetch; background ticks are silent.
            if (!hasLoadedOnce.current) setLoading(true);
            setError(null);
            try {
                const [lendingDeposit, lendingPendingYield, lendingCollateralWallet, lendingPosition, lendingHealthRatio, pasDeposit, pasPendingYield, pasCollateralWallet, pasPosition, pasHealthRatio, governance, lendingRepaymentCount, lendingLiquidationCount, lendingTotalDepositedEver, lendingFirstSeenBlock, pasRepaymentCount, pasLiquidationCount, pasTotalDepositedEver, pasFirstSeenBlock] = await Promise.all([
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                        functionName: 'depositBalance',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                        functionName: 'pendingYield',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                        functionName: 'collateralBalance',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                        functionName: 'getPositionFull',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                        functionName: 'healthRatio',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                        functionName: 'depositBalance',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                        functionName: 'pendingYield',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                        functionName: 'collateralBalance',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                        functionName: 'getPositionFull',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                        functionName: 'healthRatio',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].governanceCache,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].GOVERNANCE_CACHE,
                        functionName: 'getGovernanceData',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                        functionName: 'repaymentCount',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                        functionName: 'liquidationCount',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                        functionName: 'totalDepositedEver',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                        functionName: 'firstSeenBlock',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                        functionName: 'repaymentCount',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                        functionName: 'liquidationCount',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                        functionName: 'totalDepositedEver',
                        args: [
                            address
                        ]
                    }),
                    publicClient.readContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
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
        }
    }["useUserPortfolio.useCallback[refresh]"], [
        publicClient,
        address
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useUserPortfolio.useEffect": ()=>{
            if (address) {
                refresh();
                const id = window.setInterval(refresh, 30_000);
                return ({
                    "useUserPortfolio.useEffect": ()=>window.clearInterval(id)
                })["useUserPortfolio.useEffect"];
            }
        }
    }["useUserPortfolio.useEffect"], [
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
_s2(useUserPortfolio, "HNagXk/F4GOlP9JCcmojzHGj4jM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBalance"]
    ];
});
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(value, 6, 2, false);
}
function fmtToken(value, decimals, digits = 4) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(value, decimals, digits, false);
}
function fmtCount(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatInteger"])(value);
}
function fmtOraclePrice8(value) {
    return `$${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(value, 8, 4, true)}`;
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
    _s3();
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const [strategy, setStrategy] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](defaultStrategy);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const refresh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useStrategyData.useCallback[refresh]": async ()=>{
            if (!publicClient) return;
            setLoading(true);
            try {
                const result = await publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
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
        }
    }["useStrategyData.useCallback[refresh]"], [
        publicClient
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useStrategyData.useEffect": ()=>{
            refresh();
            const id = window.setInterval(refresh, 30_000);
            return ({
                "useStrategyData.useEffect": ()=>window.clearInterval(id)
            })["useStrategyData.useEffect"];
        }
    }["useStrategyData.useEffect"], [
        refresh
    ]);
    return {
        strategy,
        loading,
        refresh
    };
}
_s3(useStrategyData, "fD4PSX1hKJN5PX1fv/9anPVCyd8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"]
    ];
});
// First block of the deployed contracts (0x5c2456 = 6,038,614)
const DEPLOY_BLOCK = 6_038_614n;
function useLendingHistory() {
    _s4();
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const [history, setHistory] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const refresh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useLendingHistory.useCallback[refresh]": async ()=>{
            if (!publicClient || !address) return;
            setLoading(true);
            try {
                const addrLower = address.toLowerCase();
                const [harvestedL, depositedL, withdrawnL, harvestedP, depositedP, withdrawnP] = await Promise.all([
                    publicClient.getLogs({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiItem"])('event YieldHarvested(address indexed lender, uint256 amount)'),
                        fromBlock: DEPLOY_BLOCK
                    }),
                    publicClient.getLogs({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Deposited(address indexed user, uint256 amount)'),
                        fromBlock: DEPLOY_BLOCK
                    }),
                    publicClient.getLogs({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Withdrawn(address indexed user, uint256 amount)'),
                        fromBlock: DEPLOY_BLOCK
                    }),
                    publicClient.getLogs({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiItem"])('event YieldHarvested(address indexed lender, uint256 amount)'),
                        fromBlock: DEPLOY_BLOCK
                    }),
                    publicClient.getLogs({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Deposited(address indexed lender, uint256 amount)'),
                        fromBlock: DEPLOY_BLOCK
                    }),
                    publicClient.getLogs({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Withdrawn(address indexed lender, uint256 amount)'),
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
                entries.sort({
                    "useLendingHistory.useCallback[refresh]": (a, b)=>b.blockNumber > a.blockNumber ? 1 : -1
                }["useLendingHistory.useCallback[refresh]"]);
                setHistory(entries.slice(0, 100));
            } catch (err) {
                console.error('useLendingHistory:', err);
            } finally{
                setLoading(false);
            }
        }
    }["useLendingHistory.useCallback[refresh]"], [
        publicClient,
        address
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useLendingHistory.useEffect": ()=>{
            if (address) refresh();
        }
    }["useLendingHistory.useEffect"], [
        address,
        refresh
    ]);
    return {
        history,
        loading,
        refresh
    };
}
_s4(useLendingHistory, "9SKpMxdcfn4A4QmVDAz0xDS7MT8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"]
    ];
});
function useBorrowHistory() {
    _s5();
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const [history, setHistory] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const refresh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useBorrowHistory.useCallback[refresh]": async ()=>{
            if (!publicClient || !address) return;
            setLoading(true);
            try {
                const addrLower = address.toLowerCase();
                const [borrowedL, repaidL, liquidatedL, borrowedP, repaidP, liquidatedP] = await Promise.all([
                    publicClient.getLogs({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Borrowed(address indexed user, uint256 amount, uint8 tier, uint32 ratioBps)'),
                        fromBlock: DEPLOY_BLOCK
                    }),
                    publicClient.getLogs({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Repaid(address indexed user, uint256 principal, uint256 interest)'),
                        fromBlock: DEPLOY_BLOCK
                    }),
                    publicClient.getLogs({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                        event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Liquidated(address indexed borrower, address indexed liquidator)'),
                        fromBlock: DEPLOY_BLOCK
                    }),
                    publicClient.getLogs({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Borrowed(address indexed borrower, uint256 usdcAmount)'),
                        fromBlock: DEPLOY_BLOCK
                    }),
                    publicClient.getLogs({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Repaid(address indexed borrower, uint256 totalOwed)'),
                        fromBlock: DEPLOY_BLOCK
                    }),
                    publicClient.getLogs({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                        event: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiItem"])('event Liquidated(address indexed borrower, address indexed liquidator, uint256 pasSeized, uint256 usdcRepaid)'),
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
                entries.sort({
                    "useBorrowHistory.useCallback[refresh]": (a, b)=>b.blockNumber > a.blockNumber ? 1 : -1
                }["useBorrowHistory.useCallback[refresh]"]);
                setHistory(entries.slice(0, 100));
            } catch (err) {
                console.error('useBorrowHistory:', err);
            } finally{
                setLoading(false);
            }
        }
    }["useBorrowHistory.useCallback[refresh]"], [
        publicClient,
        address
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useBorrowHistory.useEffect": ()=>{
            if (address) refresh();
        }
    }["useBorrowHistory.useEffect"], [
        address,
        refresh
    ]);
    return {
        history,
        loading,
        refresh
    };
}
_s5(useBorrowHistory, "9SKpMxdcfn4A4QmVDAz0xDS7MT8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/input.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parsePasInput",
    ()=>parsePasInput,
    "parseUsdcInput",
    ()=>parseUsdcInput,
    "validAddress",
    ()=>validAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/address/isAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseUnits.js [app-client] (ecmascript)");
;
function parseUsdcInput(raw) {
    const cleaned = raw.trim();
    if (!cleaned) return null;
    const value = Number(cleaned);
    if (!Number.isFinite(value) || value <= 0) return null;
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])(cleaned, 6);
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])(cleaned, 18);
    } catch  {
        return null;
    }
}
function validAddress(raw) {
    const addr = raw.trim();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(addr) ? addr : null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lend/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LendUsdcPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useConnection.js [app-client] (ecmascript) <export useConnection as useAccount>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useBalance.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/xcm.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/addresses.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/ProtocolUI.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useProtocolData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$ActionLogProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/ActionLogProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/input.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAccess$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useAccess.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
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
;
const GAS_BUFFER = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])('0.01', 18);
function Spinner({ small }) {
    const s = small ? 'w-3 h-3 border' : 'w-4 h-4 border-2';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-block rounded-full border-current border-t-transparent animate-spin shrink-0 ${s}`
    }, void 0, false, {
        fileName: "[project]/app/lend/page.tsx",
        lineNumber: 27,
        columnNumber: 12
    }, this);
}
_c = Spinner;
function Check() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-4 h-4 shrink-0 text-emerald-400",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M5 13l4 4L19 7"
        }, void 0, false, {
            fileName: "[project]/app/lend/page.tsx",
            lineNumber: 32,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/lend/page.tsx",
        lineNumber: 31,
        columnNumber: 9
    }, this);
}
_c1 = Check;
function SectionLabel({ n, label, done }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 mb-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0', done ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'),
                children: done ? '✓' : n
            }, void 0, false, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 39,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-semibold text-white",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 43,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/lend/page.tsx",
        lineNumber: 38,
        columnNumber: 9
    }, this);
}
_c2 = SectionLabel;
function InfoRow({ label, value, tone }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-slate-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('font-medium', tone === 'green' ? 'text-emerald-300' : tone === 'yellow' ? 'text-amber-300' : tone === 'red' ? 'text-rose-300' : 'text-white'),
                children: value
            }, void 0, false, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 51,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/lend/page.tsx",
        lineNumber: 49,
        columnNumber: 9
    }, this);
}
_c3 = InfoRow;
function LendDepositCard({ prefillAmount, onSuccess, contractAddr, market }) {
    _s();
    const { address, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const { isWrongNetwork } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAccess$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccess"])();
    const { logAction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$ActionLogProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActionLog"])();
    const { lending, pasMarket } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProtocolData"])();
    const portfolio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserPortfolio"])();
    const [amountInput, setAmountInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(prefillAmount ?? '');
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [dismissed, setDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LendDepositCard.useEffect": ()=>{
            if (prefillAmount) setAmountInput(prefillAmount);
        }
    }["LendDepositCard.useEffect"], [
        prefillAmount
    ]);
    const amountAtoms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUsdcInput"])(amountInput);
    const { data: balRaw } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].mUSDC,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].ERC20,
        functionName: 'balanceOf',
        args: [
            address ?? '0x0000000000000000000000000000000000000000'
        ],
        query: {
            enabled: !!address
        }
    });
    const musdcBalance = balRaw ?? 0n;
    const marketData = market === 'pas' ? pasMarket : lending;
    const utilBps = marketData.utilizationBps;
    // Estimated lender APY: avg borrow rate (~10%) × utilization × 90% (after 10% protocol fee)
    const aprNum = Number(utilBps) / 10000 * 9;
    const aprDisplay = utilBps === 0n ? '-' : `${aprNum.toFixed(2)}%`;
    const yearlyYield = amountAtoms && utilBps > 0n ? Number(amountAtoms) / 1e6 * (aprNum / 100) : 0;
    const { writeContract: writeApprove, data: approveHash, isPending: approveSigning, isError: approveError, reset: resetApprove } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { isSuccess: approveSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: approveHash
    });
    const { writeContract: writeDeposit, data: depositHash, isPending: depositSigning, isError: depositError, reset: resetDeposit } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { isSuccess: depositSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: depositHash
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LendDepositCard.useEffect": ()=>{
            if (approveError || depositError) {
                setPhase('error');
                const t = setTimeout({
                    "LendDepositCard.useEffect.t": ()=>{
                        setPhase('idle');
                        resetApprove();
                        resetDeposit();
                    }
                }["LendDepositCard.useEffect.t"], 3000);
                return ({
                    "LendDepositCard.useEffect": ()=>clearTimeout(t)
                })["LendDepositCard.useEffect"];
            }
        }
    }["LendDepositCard.useEffect"], [
        approveError,
        depositError,
        resetApprove,
        resetDeposit
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LendDepositCard.useEffect": ()=>{
            if (approveSigning) setPhase('approving');
        }
    }["LendDepositCard.useEffect"], [
        approveSigning
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LendDepositCard.useEffect": ()=>{
            if (depositSigning) setPhase('depositing');
        }
    }["LendDepositCard.useEffect"], [
        depositSigning
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LendDepositCard.useEffect": ()=>{
            if (!approveSuccess || !amountAtoms) return;
            setPhase('approved');
            setTimeout({
                "LendDepositCard.useEffect": ()=>writeDeposit({
                        address: contractAddr,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                        functionName: 'deposit',
                        args: [
                            amountAtoms
                        ]
                    })
            }["LendDepositCard.useEffect"], 300);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["LendDepositCard.useEffect"], [
        approveSuccess
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LendDepositCard.useEffect": ()=>{
            if (!depositSuccess) return;
            setPhase('success');
            portfolio.refresh();
            logAction({
                level: 'success',
                action: `Deposit mUSDC (${market})`,
                detail: `Deposited ${amountInput} mUSDC`,
                market
            });
            onSuccess?.(amountInput);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["LendDepositCard.useEffect"], [
        depositSuccess
    ]);
    const handleLend = ()=>{
        if (!amountAtoms || !isConnected || isWrongNetwork) return;
        resetApprove();
        resetDeposit();
        setPhase('approving');
        writeApprove({
            address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].mUSDC,
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].ERC20,
            functionName: 'approve',
            args: [
                contractAddr,
                amountAtoms
            ]
        });
    };
    const reset = ()=>{
        setPhase('idle');
        setAmountInput('');
        resetApprove();
        resetDeposit();
    };
    const isProcessing = phase === 'approving' || phase === 'approved' || phase === 'depositing';
    const btnLabel = phase === 'error' ? 'Action Cancelled' : phase === 'approving' ? 'Step 1/2 - Approving…' : phase === 'approved' ? 'Approved ✓' : phase === 'depositing' ? 'Step 2/2 - Depositing…' : amountInput ? `Lend ${amountInput} mUSDC` : 'Lend mUSDC';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-xs uppercase tracking-wide text-slate-400",
                        children: "Amount (mUSDC)"
                    }, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 136,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: "0",
                                step: "any",
                                placeholder: "0.00",
                                value: amountInput,
                                onChange: (e)=>setAmountInput(e.target.value),
                                disabled: isProcessing || phase === 'success',
                                className: "flex-1 bg-transparent text-xl font-light text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            }, void 0, false, {
                                fileName: "[project]/app/lend/page.tsx",
                                lineNumber: 138,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2.5 py-1",
                                children: "mUSDC"
                            }, void 0, false, {
                                fileName: "[project]/app/lend/page.tsx",
                                lineNumber: 141,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 137,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs px-1 text-slate-500",
                        children: [
                            "Balance: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-300",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDisplayBalance"])(musdcBalance, 6, 4),
                                    " mUSDC"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/lend/page.tsx",
                                lineNumber: 143,
                                columnNumber: 71
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 143,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 135,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('rounded-xl border px-4 py-3 transition-opacity', amountInput && Number(amountInput) > 0 ? 'border-white/10 bg-black/30' : 'border-white/5 bg-black/10 opacity-35 pointer-events-none'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Pool APY (est.)",
                        value: aprDisplay
                    }, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 146,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Pool utilization",
                        value: `${(Number(utilBps) / 100).toFixed(2)}%`
                    }, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 147,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Your yield / year (est.)",
                        value: `~${yearlyYield.toFixed(4)} mUSDC`
                    }, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 148,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 145,
                columnNumber: 13
            }, this),
            !dismissed && !isProcessing && phase !== 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2.5 flex items-start justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-blue-200",
                        children: "ℹ 2 wallet confirmations required: approve, then deposit."
                    }, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 152,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setDismissed(true),
                        className: "text-slate-500 hover:text-white text-xs shrink-0",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 153,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 151,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: phase === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-emerald-300 font-semibold text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Check, {}, void 0, false, {
                                    fileName: "[project]/app/lend/page.tsx",
                                    lineNumber: 160,
                                    columnNumber: 105
                                }, this),
                                " Deposited ",
                                amountInput,
                                " mUSDC"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 160,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                            label: "Earning",
                            value: `${aprDisplay} APY`
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 161,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                            label: "Est. yield / year",
                            value: `~${yearlyYield.toFixed(4)} mUSDC`
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 162,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/dashboard",
                            className: "inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-indigo-200 transition-colors mt-1",
                            children: "View your position →"
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 163,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/lend/page.tsx",
                    lineNumber: 159,
                    columnNumber: 21
                }, this)
            }, void 0, false),
            phase !== 'success' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleLend,
                disabled: !amountAtoms || isProcessing || !isConnected || phase === 'error',
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2', isProcessing ? 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed' : phase === 'error' ? 'bg-rose-500/20 border-rose-500/30 text-rose-400 cursor-not-allowed' : !amountAtoms || !isConnected ? 'bg-white/5 border border-white/10 text-slate-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white'),
                children: [
                    isProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {}, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 177,
                        columnNumber: 38
                    }, this),
                    btnLabel
                ]
            }, void 0, true, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 171,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: reset,
                className: "w-full rounded-xl px-4 py-3 text-sm font-semibold border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition-colors",
                children: "Lend more mUSDC"
            }, void 0, false, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 180,
                columnNumber: 17
            }, this),
            !isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNotice"], {
                tone: "info",
                message: "Connect MetaMask via the header to lend."
            }, void 0, false, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 184,
                columnNumber: 30
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/lend/page.tsx",
        lineNumber: 134,
        columnNumber: 9
    }, this);
}
_s(LendDepositCard, "GnZW8lIpPO99jqiYsdKO8WvRQWo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAccess$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccess"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$ActionLogProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActionLog"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProtocolData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserPortfolio"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"]
    ];
});
_c4 = LendDepositCard;
/* ── Swap step (PAS → mUSDC via KredioSwap) ────────────────────────────── */ function SwapStep({ onSuccess }) {
    _s1();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const { data: balData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBalance"])({
        address
    });
    const pasBalance = balData?.value ?? 0n;
    const { oracle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProtocolData"])();
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [debouncedAmount, setDebouncedAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SwapStep.useEffect": ()=>{
            const t = setTimeout({
                "SwapStep.useEffect.t": ()=>setDebouncedAmount(amount)
            }["SwapStep.useEffect.t"], 300);
            return ({
                "SwapStep.useEffect": ()=>clearTimeout(t)
            })["SwapStep.useEffect"];
        }
    }["SwapStep.useEffect"], [
        amount
    ]);
    const pasWeiD = (()=>{
        try {
            return debouncedAmount && Number(debouncedAmount) > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])(debouncedAmount, 18) : 0n;
        } catch  {
            return 0n;
        }
    })();
    const pasWei = (()=>{
        try {
            return amount && Number(amount) > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])(amount, 18) : 0n;
        } catch  {
            return 0n;
        }
    })();
    const { data: quoteResult, isFetching: quoteFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].swap,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_SWAP,
        functionName: 'quoteSwap',
        args: [
            pasWeiD
        ],
        query: {
            enabled: pasWeiD > 0n && !oracle.isCrashed
        }
    });
    const { data: feeBpsRaw } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].swap,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_SWAP,
        functionName: 'feeBps'
    });
    const feeBps = feeBpsRaw ?? 30n;
    const { writeContract, data: txHash, isPending: isSigning, isError: swapError, reset: resetWrite } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { isLoading: isConfirming, isSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash: txHash
    });
    const lastQuoteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0n);
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SwapStep.useEffect": ()=>{
            if (swapError) {
                setPhase('error');
                const t = setTimeout({
                    "SwapStep.useEffect.t": ()=>{
                        setPhase('idle');
                        resetWrite();
                    }
                }["SwapStep.useEffect.t"], 3000);
                return ({
                    "SwapStep.useEffect": ()=>clearTimeout(t)
                })["SwapStep.useEffect"];
            }
        }
    }["SwapStep.useEffect"], [
        swapError,
        resetWrite
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SwapStep.useEffect": ()=>{
            if (!isSuccess) return;
            const received = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(lastQuoteRef.current, 6, 4, false);
            onSuccess(received);
            resetWrite();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["SwapStep.useEffect"], [
        isSuccess
    ]);
    const busy = isSigning || isConfirming;
    const overBalance = pasWei > 0n && pasWei > pasBalance;
    const hasQuote = !quoteFetching && quoteResult !== undefined && pasWeiD > 0n;
    const quoteDisplay = hasQuote ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(quoteResult, 6, 4, false) : null;
    const oraclePrice = oracle.price8 > 0n ? Number(oracle.price8) / 1e8 : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-xs uppercase tracking-wide text-slate-400",
                        children: "PAS to swap"
                    }, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 232,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: "0",
                                step: "any",
                                placeholder: "0.0",
                                value: amount,
                                onChange: (e)=>setAmount(e.target.value),
                                disabled: busy,
                                className: "flex-1 bg-transparent text-xl font-light text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            }, void 0, false, {
                                fileName: "[project]/app/lend/page.tsx",
                                lineNumber: 234,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold text-pink-300 bg-pink-500/10 border border-pink-500/20 rounded-lg px-2.5 py-1",
                                children: "PAS"
                            }, void 0, false, {
                                fileName: "[project]/app/lend/page.tsx",
                                lineNumber: 237,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 233,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-xs px-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-500",
                                children: [
                                    "Balance: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-300",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDisplayBalance"])(pasBalance, 18, 4),
                                            " PAS"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/lend/page.tsx",
                                        lineNumber: 240,
                                        columnNumber: 63
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/lend/page.tsx",
                                lineNumber: 240,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    const mx = pasBalance > GAS_BUFFER ? pasBalance - GAS_BUFFER : 0n;
                                    setAmount(Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(mx, 18)).toFixed(6));
                                },
                                disabled: busy,
                                className: "text-indigo-400 hover:text-indigo-300 font-medium disabled:opacity-40",
                                children: "Max"
                            }, void 0, false, {
                                fileName: "[project]/app/lend/page.tsx",
                                lineNumber: 241,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 239,
                        columnNumber: 17
                    }, this),
                    overBalance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-rose-400 px-1",
                        children: "Amount exceeds balance"
                    }, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 244,
                        columnNumber: 33
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 231,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 rounded-xl border px-4 py-3 transition-colors', hasQuote ? 'border-emerald-500/20 bg-emerald-900/10' : 'border-white/5 bg-black/20'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: quoteFetching && pasWeiD > 0n ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center gap-2 text-slate-500 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {
                                    small: true
                                }, void 0, false, {
                                    fileName: "[project]/app/lend/page.tsx",
                                    lineNumber: 248,
                                    columnNumber: 119
                                }, this),
                                "Calculating..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 248,
                            columnNumber: 54
                        }, this) : quoteDisplay ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-2xl font-light text-emerald-300",
                            children: quoteDisplay
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 249,
                            columnNumber: 42
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-2xl font-light text-slate-600",
                            children: "-"
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 250,
                            columnNumber: 31
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 247,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-xs font-semibold rounded-lg px-2.5 py-1', hasQuote ? 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/20' : 'text-slate-600 bg-white/5 border border-white/10'),
                        children: "mUSDC"
                    }, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 252,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 246,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('rounded-xl border px-4 py-3 transition-opacity', hasQuote ? 'border-white/10 bg-black/30' : 'border-white/5 bg-black/10 opacity-35 pointer-events-none'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: "Rate",
                        value: oraclePrice ? `1 PAS ≈ $${oraclePrice.toFixed(4)}` : '-'
                    }, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 255,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                        label: `Fee (${Number(feeBps) / 100}%)`,
                        value: hasQuote ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(quoteResult * feeBps / (10000n - feeBps), 6, 4, false)} mUSDC` : '-'
                    }, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 256,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 254,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>{
                    if (!amount || !quoteResult) return;
                    lastQuoteRef.current = quoteResult;
                    writeContract({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].swap,
                        abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_SWAP,
                        functionName: 'swap',
                        args: [
                            quoteResult * 99n / 100n
                        ],
                        value: pasWei
                    });
                },
                disabled: !amount || Number(amount) <= 0 || overBalance || busy || oracle.isCrashed || !quoteResult || phase === 'error',
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2', busy ? 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed' : phase === 'error' ? 'bg-rose-500/20 border-rose-500/30 text-rose-400 cursor-not-allowed' : !amount || overBalance || oracle.isCrashed || !quoteResult ? 'bg-white/5 border border-white/10 text-slate-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white'),
                children: busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {}, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 268,
                            columnNumber: 27
                        }, this),
                        isSigning ? 'Waiting for MetaMask…' : 'Confirming…'
                    ]
                }, void 0, true) : phase === 'error' ? 'Action Cancelled' : `Swap ${amount || '0'} PAS → mUSDC`
            }, void 0, false, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 258,
                columnNumber: 13
            }, this),
            oracle.isCrashed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNotice"], {
                tone: "error",
                message: "Oracle is down - swaps paused."
            }, void 0, false, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 270,
                columnNumber: 34
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/lend/page.tsx",
        lineNumber: 230,
        columnNumber: 9
    }, this);
}
_s1(SwapStep, "YaxgihVajTKEuwgSef3DjbKsIPE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBalance"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProtocolData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"]
    ];
});
_c5 = SwapStep;
/* ── Swap & Lend tab (2-step) ────────────────────────────────────────────── */ function SwapAndLendTab({ contractAddr, market }) {
    _s2();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('swap');
    const [swappedMusdc, setSwappedMusdc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const reset = ()=>{
        setStep('swap');
        setSwappedMusdc('');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-xs text-slate-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('font-medium', step === 'swap' ? 'text-indigo-300' : 'text-emerald-400'),
                        children: "1. Swap PAS → mUSDC"
                    }, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 284,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-600",
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 285,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('font-medium', step === 'lend' ? 'text-indigo-300' : step === 'done' ? 'text-emerald-400' : 'text-slate-600'),
                        children: "2. Lend mUSDC"
                    }, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 286,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 283,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: step === 'swap' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                            n: 1,
                            label: "Swap PAS → mUSDC"
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 291,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SwapStep, {
                            onSuccess: (r)=>{
                                setSwappedMusdc(r);
                                setStep('lend');
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 292,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/lend/page.tsx",
                    lineNumber: 290,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Check, {}, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 296,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-slate-400",
                                    children: "Step 1 - "
                                }, void 0, false, {
                                    fileName: "[project]/app/lend/page.tsx",
                                    lineNumber: 297,
                                    columnNumber: 50
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-emerald-300",
                                    children: [
                                        "Swapped PAS → ",
                                        swappedMusdc,
                                        " mUSDC"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/lend/page.tsx",
                                    lineNumber: 297,
                                    columnNumber: 99
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 297,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/lend/page.tsx",
                    lineNumber: 295,
                    columnNumber: 21
                }, this)
            }, void 0, false),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: (step === 'lend' || step === 'done') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                            n: 2,
                            label: "Lend mUSDC",
                            done: step === 'done'
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 304,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LendDepositCard, {
                            prefillAmount: swappedMusdc,
                            onSuccess: ()=>setStep('done'),
                            contractAddr: contractAddr,
                            market: market
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 305,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/lend/page.tsx",
                    lineNumber: 303,
                    columnNumber: 21
                }, this)
            }, void 0, false),
            step === 'done' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: reset,
                className: "text-xs text-indigo-400 hover:text-indigo-300",
                children: "← Start again"
            }, void 0, false, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 309,
                columnNumber: 33
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/lend/page.tsx",
        lineNumber: 282,
        columnNumber: 9
    }, this);
}
_s2(SwapAndLendTab, "c4sFAnaWgBSvUVcF6TMDdD9wBws=");
_c6 = SwapAndLendTab;
/* ── Bridge & Lend tab (3-step) ──────────────────────────────────────────── */ const XCM_LABELS = {
    connecting: 'Connecting to People Chain…',
    building: 'Building XCM transaction…',
    awaiting_signature: 'Waiting for Talisman signature…',
    broadcasting: 'Broadcasting…',
    in_block: 'Waiting for PAS to arrive on Hub…',
    finalized: 'Waiting for PAS to arrive on Hub…'
};
function BridgeAndLendTab({ contractAddr, market }) {
    _s3();
    const { address: hubAddress, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const { oracle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProtocolData"])();
    const [subAccounts, setSubAccounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAcc, setSelectedAcc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [peopleBalance, setPeopleBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [talismanConnected, setTalismanConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [bridgeAmount, setBridgeAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [bridgeStatus, setBridgeStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [bridging, setBridging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [elapsedSec, setElapsedSec] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [arrivedWei, setArrivedWei] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const pollCleanupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const elapsedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('bridge');
    const [swappedMusdc, setSwappedMusdc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const previewMusdc = (()=>{
        if (!bridgeAmount || Number(bridgeAmount) <= 0 || oracle.price8 === 0n) return null;
        try {
            // bridgeAmount is a plain human PAS value (e.g. "1" = 1 PAS).
            // oracle.price8 is PAS/USD with 8 decimals (e.g. 464340000 = $4.6434).
            // mUSDC has 6 decimals. Fee = 0.30% (9970/10000).
            const pasParsed = parseFloat(bridgeAmount);
            const priceUSD = Number(oracle.price8) / 1e8;
            const mUSDCAtoms = BigInt(Math.floor(pasParsed * priceUSD * 0.9970 * 1e6));
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(mUSDCAtoms, 6, 2, false);
        } catch  {
            return null;
        }
    })();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BridgeAndLendTab.useEffect": ()=>({
                "BridgeAndLendTab.useEffect": ()=>{
                    pollCleanupRef.current?.();
                    if (elapsedRef.current) clearInterval(elapsedRef.current);
                }
            })["BridgeAndLendTab.useEffect"]
    }["BridgeAndLendTab.useEffect"], []);
    async function connectTalisman() {
        setBridgeStatus('Connecting to Talisman…');
        try {
            const { web3Enable, web3Accounts } = await __turbopack_context__.A("[project]/node_modules/@polkadot/extension-dapp/index.js [app-client] (ecmascript, async loader)");
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchPeopleBalance"])(valid[0].address).then((f)=>setPeopleBalance((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPASFromPeople"])(f))).catch(()=>setPeopleBalance('-'));
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendXCMToHub"])({
                senderAddress: selectedAcc.address,
                destinationEVM: hubAddress,
                amountPAS: bridgeAmount,
                onStatus: (s)=>setBridgeStatus(XCM_LABELS[s])
            });
            pollCleanupRef.current?.();
            pollCleanupRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pollHubArrival"])({
                address: hubAddress,
                before,
                publicClient,
                onTick: ()=>{},
                onError: (msg)=>setBridgeStatus(`Polling error: ${msg}`),
                onArrival: (delta)=>{
                    setBridgeStatus(`+${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPASFromEVM"])(delta)} PAS arrived on Hub`);
                    setBridging(false);
                    setArrivedWei(delta);
                    if (elapsedRef.current) clearInterval(elapsedRef.current);
                    setStep('swap');
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
        setSwappedMusdc('');
        setBridgeStatus('');
    };
    const stepsDone = {
        bridge: step !== 'bridge',
        swap: step === 'lend' || step === 'done',
        lend: step === 'done'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1.5 text-xs text-slate-400 flex-wrap",
                children: [
                    'bridge',
                    'swap',
                    'lend'
                ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-1.5",
                        children: [
                            i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-600",
                                children: "→"
                            }, void 0, false, {
                                fileName: "[project]/app/lend/page.tsx",
                                lineNumber: 408,
                                columnNumber: 35
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('font-medium', step === s ? 'text-indigo-300' : stepsDone[s] ? 'text-emerald-400' : 'text-slate-600'),
                                children: [
                                    i + 1,
                                    ". ",
                                    s === 'bridge' ? 'Bridge PAS' : s === 'swap' ? 'Swap → mUSDC' : 'Lend mUSDC'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/lend/page.tsx",
                                lineNumber: 409,
                                columnNumber: 25
                            }, this)
                        ]
                    }, s, true, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 407,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 405,
                columnNumber: 13
            }, this),
            !isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNotice"], {
                tone: "info",
                message: "Connect MetaMask via the header first."
            }, void 0, false, {
                fileName: "[project]/app/lend/page.tsx",
                lineNumber: 415,
                columnNumber: 30
            }, this),
            isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: step === 'bridge' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                                    n: 1,
                                    label: "Bridge PAS from People Chain to Hub"
                                }, void 0, false, {
                                    fileName: "[project]/app/lend/page.tsx",
                                    lineNumber: 421,
                                    columnNumber: 33
                                }, this),
                                !talismanConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: connectTalisman,
                                    className: "w-full rounded-xl px-4 py-3 text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white",
                                    children: "Connect Talisman"
                                }, void 0, false, {
                                    fileName: "[project]/app/lend/page.tsx",
                                    lineNumber: 423,
                                    columnNumber: 37
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-purple-500/20 bg-purple-500/10 px-3 py-2 flex items-center gap-2 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-2 h-2 rounded-full bg-emerald-400 shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/app/lend/page.tsx",
                                            lineNumber: 429,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-purple-200 truncate",
                                            children: selectedAcc?.meta?.name ?? selectedAcc?.address.slice(0, 14) + '…'
                                        }, void 0, false, {
                                            fileName: "[project]/app/lend/page.tsx",
                                            lineNumber: 430,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-auto text-slate-400 shrink-0",
                                            children: [
                                                peopleBalance,
                                                " PAS"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lend/page.tsx",
                                            lineNumber: 431,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/lend/page.tsx",
                                    lineNumber: 428,
                                    columnNumber: 37
                                }, this),
                                subAccounts.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: selectedAcc?.address,
                                    onChange: (e)=>{
                                        const a = subAccounts.find((x)=>x.address === e.target.value);
                                        if (!a) return;
                                        setSelectedAcc(a);
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchPeopleBalance"])(a.address).then((free)=>setPeopleBalance((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPASFromPeople"])(free))).catch(()=>setPeopleBalance('-'));
                                    },
                                    className: "w-full rounded-xl border border-white/10 bg-black/40 text-sm text-white px-3 py-2 outline-none",
                                    children: subAccounts.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: a.address,
                                            children: a.meta?.name ?? a.address.slice(0, 20) + '…'
                                        }, a.address, false, {
                                            fileName: "[project]/app/lend/page.tsx",
                                            lineNumber: 445,
                                            columnNumber: 63
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/lend/page.tsx",
                                    lineNumber: 435,
                                    columnNumber: 37
                                }, this),
                                talismanConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs uppercase tracking-wide text-slate-400",
                                                    children: "PAS amount to bridge"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lend/page.tsx",
                                                    lineNumber: 451,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            min: "0",
                                                            step: "any",
                                                            placeholder: "0.0",
                                                            value: bridgeAmount,
                                                            onChange: (e)=>setBridgeAmount(e.target.value),
                                                            disabled: bridging,
                                                            className: "flex-1 bg-transparent text-xl font-light text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lend/page.tsx",
                                                            lineNumber: 453,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-semibold text-pink-300 bg-pink-500/10 border border-pink-500/20 rounded-lg px-2.5 py-1",
                                                            children: "PAS"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lend/page.tsx",
                                                            lineNumber: 456,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lend/page.tsx",
                                                    lineNumber: 452,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lend/page.tsx",
                                            lineNumber: 450,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('rounded-xl border px-4 py-3 transition-opacity', bridgeAmount && Number(bridgeAmount) > 0 ? 'border-white/10 bg-black/30' : 'border-white/5 bg-black/10 opacity-35 pointer-events-none'),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                                    label: "Expected mUSDC after swap",
                                                    value: previewMusdc ? `~${previewMusdc} mUSDC` : '-',
                                                    tone: "green"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lend/page.tsx",
                                                    lineNumber: 460,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                                    label: "PAS price",
                                                    value: oracle.price8 > 0n ? `$${(Number(oracle.price8) / 1e8).toFixed(4)}` : '-'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lend/page.tsx",
                                                    lineNumber: 461,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                                    label: "Estimated time",
                                                    value: "~30 seconds"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lend/page.tsx",
                                                    lineNumber: 462,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lend/page.tsx",
                                            lineNumber: 459,
                                            columnNumber: 41
                                        }, this),
                                        bridgeStatus && bridging && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {
                                                    small: true
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lend/page.tsx",
                                                    lineNumber: 466,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-white/80 flex-1",
                                                    children: bridgeStatus
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lend/page.tsx",
                                                    lineNumber: 467,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-slate-500",
                                                    children: [
                                                        elapsedSec,
                                                        "s"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lend/page.tsx",
                                                    lineNumber: 468,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lend/page.tsx",
                                            lineNumber: 465,
                                            columnNumber: 45
                                        }, this),
                                        bridgeStatus && bridgeStatus.startsWith('Error') && !bridging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/8 px-4 py-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-rose-400 text-sm shrink-0",
                                                    children: "✕"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lend/page.tsx",
                                                    lineNumber: 473,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-rose-300 flex-1 min-w-0 truncate",
                                                    children: bridgeStatus.replace(/^Error:\s*/, '')
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lend/page.tsx",
                                                    lineNumber: 474,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setBridgeStatus(''),
                                                    className: "text-slate-500 hover:text-white text-sm leading-none shrink-0",
                                                    "aria-label": "Dismiss",
                                                    children: "✕"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lend/page.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lend/page.tsx",
                                            lineNumber: 472,
                                            columnNumber: 45
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleBridge,
                                            disabled: !bridgeAmount || Number(bridgeAmount) <= 0 || bridging,
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all flex items-center justify-center gap-2', bridging || !bridgeAmount || Number(bridgeAmount) <= 0 ? 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500'),
                                            children: bridging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {}, void 0, false, {
                                                        fileName: "[project]/app/lend/page.tsx",
                                                        lineNumber: 482,
                                                        columnNumber: 63
                                                    }, this),
                                                    "Bridging…"
                                                ]
                                            }, void 0, true) : `Bridge ${bridgeAmount || '0'} PAS to Hub`
                                        }, void 0, false, {
                                            fileName: "[project]/app/lend/page.tsx",
                                            lineNumber: 478,
                                            columnNumber: 45
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 420,
                            columnNumber: 29
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Check, {}, void 0, false, {
                                    fileName: "[project]/app/lend/page.tsx",
                                    lineNumber: 490,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "Step 1 - "
                                        }, void 0, false, {
                                            fileName: "[project]/app/lend/page.tsx",
                                            lineNumber: 491,
                                            columnNumber: 58
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-emerald-300",
                                            children: [
                                                "+",
                                                arrivedWei ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$xcm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPASFromEVM"])(arrivedWei) : bridgeAmount,
                                                " PAS arrived on Hub"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lend/page.tsx",
                                            lineNumber: 491,
                                            columnNumber: 107
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/lend/page.tsx",
                                    lineNumber: 491,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 489,
                            columnNumber: 29
                        }, this)
                    }, void 0, false),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: (step === 'swap' || step === 'lend' || step === 'done') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: step === 'swap' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                                        n: 2,
                                        label: "Swap PAS → mUSDC"
                                    }, void 0, false, {
                                        fileName: "[project]/app/lend/page.tsx",
                                        lineNumber: 500,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SwapStep, {
                                        onSuccess: (r)=>{
                                            setSwappedMusdc(r);
                                            setStep('lend');
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/lend/page.tsx",
                                        lineNumber: 501,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/lend/page.tsx",
                                lineNumber: 499,
                                columnNumber: 37
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-emerald-500/20 bg-emerald-900/10 p-4 flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Check, {}, void 0, false, {
                                        fileName: "[project]/app/lend/page.tsx",
                                        lineNumber: 505,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-400",
                                                children: "Step 2 - "
                                            }, void 0, false, {
                                                fileName: "[project]/app/lend/page.tsx",
                                                lineNumber: 506,
                                                columnNumber: 66
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-emerald-300",
                                                children: [
                                                    "Swapped → ",
                                                    swappedMusdc,
                                                    " mUSDC"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lend/page.tsx",
                                                lineNumber: 506,
                                                columnNumber: 115
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/lend/page.tsx",
                                        lineNumber: 506,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/lend/page.tsx",
                                lineNumber: 504,
                                columnNumber: 37
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 497,
                            columnNumber: 29
                        }, this)
                    }, void 0, false),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: (step === 'lend' || step === 'done') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                                    n: 3,
                                    label: "Lend mUSDC",
                                    done: step === 'done'
                                }, void 0, false, {
                                    fileName: "[project]/app/lend/page.tsx",
                                    lineNumber: 515,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LendDepositCard, {
                                    prefillAmount: swappedMusdc,
                                    onSuccess: ()=>setStep('done'),
                                    contractAddr: contractAddr,
                                    market: market
                                }, void 0, false, {
                                    fileName: "[project]/app/lend/page.tsx",
                                    lineNumber: 516,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 514,
                            columnNumber: 29
                        }, this)
                    }, void 0, false),
                    step === 'done' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: reset,
                        className: "text-xs text-indigo-400 hover:text-indigo-300",
                        children: "← Start again"
                    }, void 0, false, {
                        fileName: "[project]/app/lend/page.tsx",
                        lineNumber: 520,
                        columnNumber: 41
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/app/lend/page.tsx",
        lineNumber: 404,
        columnNumber: 9
    }, this);
}
_s3(BridgeAndLendTab, "Go/LVRBZFz1cagDr5MTqSUBXJ6Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProtocolData"]
    ];
});
_c7 = BridgeAndLendTab;
function LendUsdcPage() {
    _s4();
    const [source, setSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('musdc');
    const [marketAction, setMarketAction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('lending');
    const { lending, pasMarket } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProtocolData"])();
    const tabCls = (active)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-3 py-2 rounded-xl text-xs font-semibold border transition-colors', active ? 'bg-white text-black border-white' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10');
    const mktCls = (active)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-4 py-2 rounded-xl text-sm font-semibold border transition-all', active ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10');
    const activeMarketAddr = marketAction === 'pas' ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageShell"], {
        title: "Lend",
        subtitle: "Earn yield by lending mUSDC to the protocols. Source from mUSDC, Hub PAS, or People Chain PAS.",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-lg mx-auto space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-2 p-1 rounded-2xl border border-white/10 bg-black/40",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: mktCls(marketAction === 'lending'),
                            onClick: ()=>setMarketAction('lending'),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "USDC Market"
                                    }, void 0, false, {
                                        fileName: "[project]/app/lend/page.tsx",
                                        lineNumber: 550,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] opacity-60 font-medium",
                                        children: "Supply main pool"
                                    }, void 0, false, {
                                        fileName: "[project]/app/lend/page.tsx",
                                        lineNumber: 551,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/lend/page.tsx",
                                lineNumber: 549,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 548,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: mktCls(marketAction === 'pas'),
                            onClick: ()=>setMarketAction('pas'),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "PAS Market"
                                    }, void 0, false, {
                                        fileName: "[project]/app/lend/page.tsx",
                                        lineNumber: 556,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] opacity-60 font-medium",
                                        children: "Supply PAS borrowers"
                                    }, void 0, false, {
                                        fileName: "[project]/app/lend/page.tsx",
                                        lineNumber: 557,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/lend/page.tsx",
                                lineNumber: 555,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 554,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/lend/page.tsx",
                    lineNumber: 547,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "inline-flex gap-1 rounded-xl border border-white/10 bg-black/30 p-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: tabCls(source === 'musdc'),
                            onClick: ()=>setSource('musdc'),
                            children: "mUSDC"
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 563,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: tabCls(source === 'swap'),
                            onClick: ()=>setSource('swap'),
                            children: "Swap & Lend"
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 564,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: tabCls(source === 'bridge'),
                            onClick: ()=>setSource('bridge'),
                            children: "Bridge & Lend"
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 565,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/lend/page.tsx",
                    lineNumber: 562,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        source === 'musdc' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-base font-semibold text-white mb-4",
                                    children: "Lend mUSDC directly"
                                }, void 0, false, {
                                    fileName: "[project]/app/lend/page.tsx",
                                    lineNumber: 571,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LendDepositCard, {
                                    contractAddr: activeMarketAddr,
                                    market: marketAction
                                }, void 0, false, {
                                    fileName: "[project]/app/lend/page.tsx",
                                    lineNumber: 572,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 570,
                            columnNumber: 25
                        }, this),
                        source === 'swap' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SwapAndLendTab, {
                            contractAddr: activeMarketAddr,
                            market: marketAction
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 575,
                            columnNumber: 43
                        }, this),
                        source === 'bridge' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BridgeAndLendTab, {
                            contractAddr: activeMarketAddr,
                            market: marketAction
                        }, void 0, false, {
                            fileName: "[project]/app/lend/page.tsx",
                            lineNumber: 576,
                            columnNumber: 45
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/lend/page.tsx",
                    lineNumber: 568,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/lend/page.tsx",
            lineNumber: 545,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/lend/page.tsx",
        lineNumber: 544,
        columnNumber: 9
    }, this);
}
_s4(LendUsdcPage, "UUhFds7U+MzHhllPN7oSz0cIEBg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalProtocolData"]
    ];
});
_c8 = LendUsdcPage;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "Spinner");
__turbopack_context__.k.register(_c1, "Check");
__turbopack_context__.k.register(_c2, "SectionLabel");
__turbopack_context__.k.register(_c3, "InfoRow");
__turbopack_context__.k.register(_c4, "LendDepositCard");
__turbopack_context__.k.register(_c5, "SwapStep");
__turbopack_context__.k.register(_c6, "SwapAndLendTab");
__turbopack_context__.k.register(_c7, "BridgeAndLendTab");
__turbopack_context__.k.register(_c8, "LendUsdcPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_8dc06549._.js.map