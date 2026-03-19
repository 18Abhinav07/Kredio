module.exports = [
"[project]/node_modules/@polkadot/extension-dapp/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[externals]/@polkadot/util [external] (@polkadot/util, esm_import, [project]/node_modules/@polkadot/extension-dapp/node_modules/@polkadot/util)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@polkadot/util-95d689fd5068cdd7");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@polkadot/util-crypto [external] (@polkadot/util-crypto, esm_import, [project]/node_modules/@polkadot/extension-dapp/node_modules/@polkadot/util-crypto)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@polkadot/util-crypto-5e266647012d212e");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/node_modules/@polkadot/extension-dapp/util.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "documentReadyPromise",
    ()=>documentReadyPromise
]);
function documentReadyPromise(creator) {
    return new Promise((resolve)=>{
        if (document.readyState === 'complete') {
            resolve(creator());
        } else {
            window.addEventListener('load', ()=>resolve(creator()));
        }
    });
}
}),
"[project]/node_modules/@polkadot/extension-dapp/bundle.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "isWeb3Injected",
    ()=>isWeb3Injected,
    "web3Accounts",
    ()=>web3Accounts,
    "web3AccountsSubscribe",
    ()=>web3AccountsSubscribe,
    "web3Enable",
    ()=>web3Enable,
    "web3EnablePromise",
    ()=>web3EnablePromise,
    "web3FromAddress",
    ()=>web3FromAddress,
    "web3FromSource",
    ()=>web3FromSource,
    "web3ListRpcProviders",
    ()=>web3ListRpcProviders,
    "web3UseRpcProvider",
    ()=>web3UseRpcProvider
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$29$__ = __turbopack_context__.i("[externals]/@polkadot/util [external] (@polkadot/util, esm_import, [project]/node_modules/@polkadot/extension-dapp/node_modules/@polkadot/util)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util$2d$crypto__$5b$external$5d$__$2840$polkadot$2f$util$2d$crypto$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$2d$crypto$29$__ = __turbopack_context__.i("[externals]/@polkadot/util-crypto [external] (@polkadot/util-crypto, esm_import, [project]/node_modules/@polkadot/extension-dapp/node_modules/@polkadot/util-crypto)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/extension-dapp/util.js [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util$2d$crypto__$5b$external$5d$__$2840$polkadot$2f$util$2d$crypto$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$2d$crypto$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util$2d$crypto__$5b$external$5d$__$2840$polkadot$2f$util$2d$crypto$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$2d$crypto$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const win = window;
win.injectedWeb3 = win.injectedWeb3 || {};
let isWeb3Injected = web3IsInjected();
let web3EnablePromise = null;
;
/** @internal true when anything has been injected and is available */ function web3IsInjected() {
    return Object.values(win.injectedWeb3).filter(({ connect, enable })=>!!(connect || enable)).length !== 0;
}
/** @internal throw a consistent error when not extensions have not been enabled */ function throwError(method) {
    throw new Error(`${method}: web3Enable(originName) needs to be called before ${method}`);
}
/** @internal map from Array<InjectedAccount> to Array<InjectedAccountWithMeta> */ function mapAccounts(source, list, ss58Format) {
    return list.map(({ address, genesisHash, name, type })=>({
            address: address.length === 42 ? address : (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util$2d$crypto__$5b$external$5d$__$2840$polkadot$2f$util$2d$crypto$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$2d$crypto$29$__["encodeAddress"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util$2d$crypto__$5b$external$5d$__$2840$polkadot$2f$util$2d$crypto$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$2d$crypto$29$__["decodeAddress"])(address), ss58Format),
            meta: {
                genesisHash,
                name,
                source
            },
            type
        }));
}
/** @internal filter accounts based on genesisHash and type of account */ function filterAccounts(list, genesisHash, type) {
    return list.filter((a)=>(!a.type || !type || type.includes(a.type)) && (!a.genesisHash || !genesisHash || a.genesisHash === genesisHash));
}
/** @internal retrieves all the extensions available on the window */ function getWindowExtensions(originName) {
    return Promise.all(Object.entries(win.injectedWeb3).map(([nameOrHash, { connect, enable, version }])=>Promise.resolve().then(()=>connect ? connect(originName) : enable ? enable(originName).then((e)=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$29$__["objectSpread"])({
                    name: nameOrHash,
                    version: version || 'unknown'
                }, e)) : Promise.reject(new Error('No connect(..) or enable(...) hook found'))).catch(({ message })=>{
            console.error(`Error initializing ${nameOrHash}: ${message}`);
        }))).then((exts)=>exts.filter((e)=>!!e));
}
/** @internal Ensure the enable promise is resolved and filter by extensions */ async function filterEnable(caller, extensions) {
    if (!web3EnablePromise) {
        return throwError(caller);
    }
    const sources = await web3EnablePromise;
    return sources.filter(({ name })=>!extensions || extensions.includes(name));
}
function web3Enable(originName, compatInits = []) {
    if (!originName) {
        throw new Error('You must pass a name for your app to the web3Enable function');
    }
    const initCompat = compatInits.length ? Promise.all(compatInits.map((c)=>c().catch(()=>false))) : Promise.resolve([
        true
    ]);
    web3EnablePromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["documentReadyPromise"])(()=>initCompat.then(()=>getWindowExtensions(originName).then((values)=>values.map((e)=>{
                    // if we don't have an accounts subscriber, add a single-shot version
                    if (!e.accounts.subscribe) {
                        e.accounts.subscribe = (cb)=>{
                            e.accounts.get().then(cb).catch(console.error);
                            return ()=>{
                            // no ubsubscribe needed, this is a single-shot
                            };
                        };
                    }
                    return e;
                })).catch(()=>[]).then((values)=>{
                const names = values.map(({ name, version })=>`${name}/${version}`);
                isWeb3Injected = web3IsInjected();
                console.info(`web3Enable: Enabled ${values.length} extension${values.length !== 1 ? 's' : ''}: ${names.join(', ')}`);
                return values;
            })));
    return web3EnablePromise;
}
async function web3Accounts({ accountType, extensions, genesisHash, ss58Format } = {}) {
    const accounts = [];
    const sources = await filterEnable('web3Accounts', extensions);
    const retrieved = await Promise.all(sources.map(async ({ accounts, name: source })=>{
        try {
            const list = await accounts.get();
            return mapAccounts(source, filterAccounts(list, genesisHash, accountType), ss58Format);
        } catch  {
            // cannot handle this one
            return [];
        }
    }));
    retrieved.forEach((result)=>{
        accounts.push(...result);
    });
    console.info(`web3Accounts: Found ${accounts.length} address${accounts.length !== 1 ? 'es' : ''}`);
    return accounts;
}
async function web3AccountsSubscribe(cb, { accountType, extensions, genesisHash, ss58Format } = {}) {
    const sources = await filterEnable('web3AccountsSubscribe', extensions);
    const accounts = {};
    const triggerUpdate = ()=>cb(Object.entries(accounts).reduce((result, [source, list])=>{
            result.push(...mapAccounts(source, filterAccounts(list, genesisHash, accountType), ss58Format));
            return result;
        }, []));
    const unsubs = sources.map(({ accounts: { subscribe }, name: source })=>subscribe((result)=>{
            accounts[source] = result;
            try {
                const result = triggerUpdate();
                if (result && (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$29$__["isPromise"])(result)) {
                    result.catch(console.error);
                }
            } catch (error) {
                console.error(error);
            }
        }));
    return ()=>{
        unsubs.forEach((unsub)=>{
            unsub();
        });
    };
}
async function web3FromSource(source) {
    if (!web3EnablePromise) {
        return throwError('web3FromSource');
    }
    const sources = await web3EnablePromise;
    const found = source && sources.find(({ name })=>name === source);
    if (!found) {
        throw new Error(`web3FromSource: Unable to find an injected ${source}`);
    }
    return found;
}
async function web3FromAddress(address) {
    if (!web3EnablePromise) {
        return throwError('web3FromAddress');
    }
    const accounts = await web3Accounts();
    let found;
    if (address) {
        const accountU8a = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util$2d$crypto__$5b$external$5d$__$2840$polkadot$2f$util$2d$crypto$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$2d$crypto$29$__["decodeAddress"])(address);
        found = accounts.find((account)=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$29$__["u8aEq"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util$2d$crypto__$5b$external$5d$__$2840$polkadot$2f$util$2d$crypto$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$2d$crypto$29$__["decodeAddress"])(account.address), accountU8a));
    }
    if (!found) {
        throw new Error(`web3FromAddress: Unable to find injected ${address}`);
    }
    return web3FromSource(found.meta.source);
}
async function web3ListRpcProviders(source) {
    const { provider } = await web3FromSource(source);
    if (!provider) {
        console.warn(`Extension ${source} does not expose any provider`);
        return null;
    }
    return provider.listProviders();
}
async function web3UseRpcProvider(source, key) {
    const { provider } = await web3FromSource(source);
    if (!provider) {
        throw new Error(`Extension ${source} does not expose any provider`);
    }
    const meta = await provider.startProvider(key);
    return {
        meta,
        provider
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/node_modules/@polkadot/extension-dapp/packageInfo.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "packageInfo",
    ()=>packageInfo
]);
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("node_modules/@polkadot/extension-dapp/packageInfo.js")}`;
    }
};
const packageInfo = {
    name: '@polkadot/extension-dapp',
    path: __TURBOPACK__import$2e$meta__ && __TURBOPACK__import$2e$meta__.url ? new URL(__TURBOPACK__import$2e$meta__.url).pathname.substring(0, new URL(__TURBOPACK__import$2e$meta__.url).pathname.lastIndexOf('/') + 1) : 'auto',
    type: 'esm',
    version: '0.62.6'
};
}),
"[project]/node_modules/@polkadot/extension-dapp/wrapBytes.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ETHEREUM",
    ()=>ETHEREUM,
    "POSTFIX",
    ()=>POSTFIX,
    "PREFIX",
    ()=>PREFIX,
    "isWrapped",
    ()=>isWrapped,
    "unwrapBytes",
    ()=>unwrapBytes,
    "wrapBytes",
    ()=>wrapBytes
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$29$__ = __turbopack_context__.i("[externals]/@polkadot/util [external] (@polkadot/util, esm_import, [project]/node_modules/@polkadot/extension-dapp/node_modules/@polkadot/util)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const ETHEREUM = __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$29$__["U8A_WRAP_ETHEREUM"];
const POSTFIX = __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$29$__["U8A_WRAP_POSTFIX"];
const PREFIX = __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$29$__["U8A_WRAP_PREFIX"];
const isWrapped = __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$29$__["u8aIsWrapped"];
const unwrapBytes = __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$29$__["u8aUnwrapBytes"];
const wrapBytes = __TURBOPACK__imported__module__$5b$externals$5d2f40$polkadot$2f$util__$5b$external$5d$__$2840$polkadot$2f$util$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$node_modules$2f40$polkadot$2f$util$29$__["u8aWrapBytes"];
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/node_modules/@polkadot/extension-dapp/bundle.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "isWeb3Injected",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isWeb3Injected"],
    "packageInfo",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$packageInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["packageInfo"],
    "unwrapBytes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$wrapBytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unwrapBytes"],
    "web3Accounts",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["web3Accounts"],
    "web3AccountsSubscribe",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["web3AccountsSubscribe"],
    "web3Enable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["web3Enable"],
    "web3EnablePromise",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["web3EnablePromise"],
    "web3FromAddress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["web3FromAddress"],
    "web3FromSource",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["web3FromSource"],
    "web3ListRpcProviders",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["web3ListRpcProviders"],
    "web3UseRpcProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["web3UseRpcProvider"],
    "wrapBytes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$wrapBytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wrapBytes"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/extension-dapp/bundle.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$packageInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/extension-dapp/packageInfo.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$wrapBytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/extension-dapp/wrapBytes.js [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$wrapBytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$wrapBytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/node_modules/@polkadot/extension-dapp/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "isWeb3Injected",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isWeb3Injected"],
    "packageInfo",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["packageInfo"],
    "unwrapBytes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unwrapBytes"],
    "web3Accounts",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["web3Accounts"],
    "web3AccountsSubscribe",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["web3AccountsSubscribe"],
    "web3Enable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["web3Enable"],
    "web3EnablePromise",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["web3EnablePromise"],
    "web3FromAddress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["web3FromAddress"],
    "web3FromSource",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["web3FromSource"],
    "web3ListRpcProviders",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["web3ListRpcProviders"],
    "web3UseRpcProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["web3UseRpcProvider"],
    "wrapBytes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wrapBytes"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/extension-dapp/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/extension-dapp/bundle.js [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4a1c1ecf._.js.map