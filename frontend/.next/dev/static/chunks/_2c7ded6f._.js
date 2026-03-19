(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/hooks/useProtocolActions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProtocolActions",
    ()=>useProtocolActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useConnection.js [app-client] (ecmascript) <export useConnection as useAccount>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useChainId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWalletClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/addresses.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$ActionLogProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/ActionLogProvider.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
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
    _s();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"])();
    const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChainId"])();
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const { data: walletClient } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletClient"])();
    const { logAction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$ActionLogProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActionLog"])();
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
        if (chainId !== __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].chainId) {
            logAction({
                level: 'warning',
                action,
                detail: `Switch network to chain ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].chainId}`,
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
                address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].mUSDC,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].ERC20,
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
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'deposit',
                    args: [
                        amount
                    ]
                })),
        withdrawLending: (amount)=>tx('Withdraw from KredioLending', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'withdraw',
                    args: [
                        amount
                    ]
                })),
        harvestLending: ()=>tx('Harvest lending yield', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'pendingYieldAndHarvest',
                    args: [
                        address
                    ]
                })),
        depositLendingCollateral: (amount)=>tx('Deposit USDC collateral', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'depositCollateral',
                    args: [
                        amount
                    ]
                })),
        withdrawLendingCollateral: ()=>tx('Withdraw USDC collateral', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'withdrawCollateral'
                })),
        borrowLending: (amount)=>tx('Borrow from KredioLending', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'borrow',
                    args: [
                        amount
                    ]
                })),
        repayLending: ()=>tx('Repay KredioLending debt', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'repay'
                })),
        liquidateLending: (borrower)=>tx('Liquidate KredioLending position', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'liquidate',
                    args: [
                        borrower
                    ]
                })),
        adminLiquidateLending: (borrower)=>tx('Admin liquidate KredioLending position', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminLiquidate',
                    args: [
                        borrower
                    ]
                })),
        adminForceCloseLending: (user)=>tx('Force-close KredioLending position', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminForceClose',
                    args: [
                        user
                    ]
                })),
        sweepLendingFees: (to)=>tx('Sweep Lending protocol fees', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'sweepProtocolFees',
                    args: [
                        to
                    ]
                })),
        setLendingMultiplier: (borrower, multiplier)=>tx('Set Lending demo multiplier', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'setDemoMultiplier',
                    args: [
                        borrower,
                        multiplier
                    ]
                })),
        depositPasLend: (amount)=>tx('Deposit to PAS market pool', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'deposit',
                    args: [
                        amount
                    ]
                })),
        withdrawPasLend: (amount)=>tx('Withdraw from PAS market pool', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'withdraw',
                    args: [
                        amount
                    ]
                })),
        harvestPasLend: ()=>tx('Harvest PAS market yield', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'pendingYieldAndHarvest',
                    args: [
                        address
                    ]
                })),
        depositPasCollateral: (amountPasEth)=>tx('Deposit PAS collateral', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'depositCollateral',
                    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])(amountPasEth, 18)
                })),
        withdrawPasCollateral: ()=>tx('Withdraw PAS collateral', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'withdrawCollateral'
                })),
        borrowPas: (amount)=>tx('Borrow from PAS market', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'borrow',
                    args: [
                        amount
                    ]
                })),
        repayPas: ()=>tx('Repay PAS market debt', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'repay'
                })),
        liquidatePas: (borrower)=>tx('Liquidate PAS position', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'liquidate',
                    args: [
                        borrower
                    ]
                })),
        adminLiquidatePas: (borrower)=>tx('Admin liquidate PAS position', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminLiquidate',
                    args: [
                        borrower
                    ]
                })),
        adminForceClosePas: (user)=>tx('Force-close PAS market position', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminForceClose',
                    args: [
                        user
                    ]
                })),
        // ── New bulk / demo admin actions ────────────────────────────────
        adminSetLendingTick: (tick)=>tx('Set Lending global tick', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminSetGlobalTick',
                    args: [
                        tick
                    ]
                })),
        adminSetPasTick: (tick)=>tx('Set PAS global tick', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminSetGlobalTick',
                    args: [
                        tick
                    ]
                })),
        adminForceCloseAllLending: (users)=>tx('Force-close ALL Lending positions', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminForceCloseAll',
                    args: [
                        users
                    ]
                })),
        adminForceCloseAllPas: (users)=>tx('Force-close ALL PAS positions', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminForceCloseAll',
                    args: [
                        users
                    ]
                })),
        adminBulkWithdrawLending: (depositors)=>tx('Bulk-withdraw ALL Lending deposits', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminBulkWithdrawDeposits',
                    args: [
                        depositors
                    ]
                })),
        adminBulkWithdrawPas: (depositors)=>tx('Bulk-withdraw ALL PAS deposits', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminBulkWithdrawDeposits',
                    args: [
                        depositors
                    ]
                })),
        adminTickPoolLending: (borrowers)=>tx('Tick Lending pool interest', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminTickPool',
                    args: [
                        borrowers
                    ]
                })),
        adminTickPoolPas: (borrowers)=>tx('Tick PAS pool interest', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminTickPool',
                    args: [
                        borrowers
                    ]
                })),
        adminResetUserScoreLending: (users)=>tx('Reset Lending user scores', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminResetUserScores',
                    args: [
                        users
                    ]
                })),
        adminResetUserScorePas: (users)=>tx('Reset PAS user scores', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminResetUserScores',
                    args: [
                        users
                    ]
                })),
        adminHardResetLending: (to)=>tx('HARD RESET Lending pool', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminHardReset',
                    args: [
                        to
                    ]
                })),
        adminHardResetPas: (to)=>tx('HARD RESET PAS pool', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'adminHardReset',
                    args: [
                        to
                    ]
                })),
        sweepPasFees: (to)=>tx('Sweep PAS market fees', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'sweepProtocolFees',
                    args: [
                        to
                    ]
                })),
        setPasMultiplier: (user, multiplier)=>tx('Set PAS demo multiplier', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'setDemoMultiplier',
                    args: [
                        user,
                        multiplier
                    ]
                })),
        setPasRiskParams: (ltvBps, liqBonusBps, stalenessLimit, protocolFeeBps)=>tx('Update PAS risk params', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'setRiskParams',
                    args: [
                        ltvBps,
                        liqBonusBps,
                        stalenessLimit,
                        protocolFeeBps
                    ]
                })),
        setPasOracle: (newOracle)=>tx('Set PAS oracle', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'setOracle',
                    args: [
                        newOracle
                    ]
                })),
        pausePas: ()=>tx('Pause PAS market', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'pause'
                })),
        unpausePas: ()=>tx('Unpause PAS market', 'pas', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'unpause'
                })),
        oracleCrash: (price8)=>tx('Inject oracle crash', 'system', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oracle,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].PAS_ORACLE,
                    functionName: 'crash',
                    args: [
                        price8
                    ]
                })),
        oracleRecover: ()=>tx('Recover oracle', 'system', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oracle,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].PAS_ORACLE,
                    functionName: 'recover'
                })),
        oracleSetPrice: (price8)=>tx('Set oracle price', 'system', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oracle,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].PAS_ORACLE,
                    functionName: 'setPrice',
                    args: [
                        price8
                    ]
                })),
        setGovernanceData: (user, votes, conviction)=>tx('Update GovernanceCache entry', 'system', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].governanceCache,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].GOVERNANCE_CACHE,
                    functionName: 'setGovernanceData',
                    args: [
                        user,
                        votes,
                        conviction
                    ]
                })),
        // ── Intelligent Yield Strategy ────────────────────────────────────
        yieldSetPool: (pool)=>tx('Set yield pool address', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminSetYieldPool',
                    args: [
                        pool
                    ]
                })),
        yieldInvest: (amount)=>tx('Invest into yield pool', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminInvest',
                    args: [
                        amount
                    ]
                })),
        yieldPullBack: (amount)=>tx('Pull back from yield pool', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminPullBack',
                    args: [
                        amount
                    ]
                })),
        yieldClaimAndInject: ()=>tx('Claim yield and inject into lender pool', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminClaimAndInjectYield'
                })),
        yieldSetStrategyParams: (investRatioBps, minBufferBps)=>tx('Update yield strategy params', 'lending', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'adminSetStrategyParams',
                    args: [
                        investRatioBps,
                        minBufferBps
                    ]
                })),
        yieldSetRate: (rateBps)=>tx('Set MockYieldPool yield rate', 'system', ()=>walletClient.writeContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].yieldPool,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].MOCK_YIELD_POOL,
                    functionName: 'setYieldRate',
                    args: [
                        rateBps
                    ]
                }))
    };
}
_s(useProtocolActions, "AjIxsnO3r0B3ys45njL+0D5xhSA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useConnection__as__useAccount$3e$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChainId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$ActionLogProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActionLog"]
    ];
});
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
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
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
"[project]/app/liquidate/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LiquidatePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/addresses.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/input.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useProtocolActions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useProtocolData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$ActionLogProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/ActionLogProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/ProtocolUI.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAccess$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useAccess.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
function LiquidatePage() {
    _s();
    const { isAdmin, isConnected, isWrongNetwork } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAccess$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccess"])();
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"])();
    const actions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProtocolActions"])();
    const { logAction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$ActionLogProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActionLog"])();
    const [borrowerInput, setBorrowerInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lendingHealth, setLendingHealth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0n);
    const [pasHealth, setPasHealth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0n);
    const [exists, setExists] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        lending: false,
        pas: false
    });
    const borrower = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validAddress"])(borrowerInput);
    if (!isAdmin) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageShell"], {
            title: "Liquidation Monitor",
            subtitle: "Admin authorization required.",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
                title: "Access Restricted",
                subtitle: "This page is visible only to the authorized admin wallet.",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatRow"], {
                        label: "Connected",
                        value: isConnected ? 'Yes' : 'No'
                    }, void 0, false, {
                        fileName: "[project]/app/liquidate/page.tsx",
                        lineNumber: 32,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatRow"], {
                        label: "Authorized Admin",
                        value: "No",
                        tone: "red"
                    }, void 0, false, {
                        fileName: "[project]/app/liquidate/page.tsx",
                        lineNumber: 33,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/liquidate/page.tsx",
                lineNumber: 31,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/liquidate/page.tsx",
            lineNumber: 30,
            columnNumber: 13
        }, this);
    }
    const inspect = async ()=>{
        if (!publicClient || !borrower) {
            logAction({
                level: 'warning',
                action: 'Liquidation check',
                detail: 'Enter a valid borrower address',
                market: 'system'
            });
            return;
        }
        if (isWrongNetwork) {
            logAction({
                level: 'warning',
                action: 'Liquidation check',
                detail: 'Switch to Polkadot Hub before reading health',
                market: 'system'
            });
            return;
        }
        setBusy(true);
        try {
            const [lh, ph, lp, pp] = await Promise.all([
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'healthRatio',
                    args: [
                        borrower
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'healthRatio',
                    args: [
                        borrower
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lending,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_LENDING,
                    functionName: 'getPositionFull',
                    args: [
                        borrower
                    ]
                }),
                publicClient.readContract({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$addresses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pasMarket,
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].KREDIO_PAS_MARKET,
                    functionName: 'getPositionFull',
                    args: [
                        borrower
                    ]
                })
            ]);
            setLendingHealth(lh);
            setPasHealth(ph);
            setExists({
                lending: lp[6],
                pas: pp[7]
            });
            logAction({
                action: 'Liquidation check',
                detail: 'Borrower position health refreshed',
                market: 'system'
            });
        } catch (error) {
            logAction({
                level: 'error',
                action: 'Liquidation check',
                detail: error instanceof Error ? error.message : 'Read failed',
                market: 'system'
            });
        } finally{
            setBusy(false);
        }
    };
    const run = async (fn)=>{
        if (!isConnected) {
            logAction({
                level: 'warning',
                action: 'Liquidation action',
                detail: 'Connect wallet first',
                market: 'system'
            });
            return;
        }
        if (isWrongNetwork) {
            logAction({
                level: 'warning',
                action: 'Liquidation action',
                detail: 'Switch to Polkadot Hub before liquidating',
                market: 'system'
            });
            return;
        }
        setBusy(true);
        await fn();
        await inspect();
        setBusy(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageShell"], {
        title: "Liquidation Monitor",
        subtitle: "Check borrower health and execute market liquidation when below threshold.",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Grid"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
                    title: "Inspect Borrower",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionInput"], {
                            label: "Borrower Address",
                            value: borrowerInput,
                            onChange: setBorrowerInput,
                            placeholder: "0x…"
                        }, void 0, false, {
                            fileName: "[project]/app/liquidate/page.tsx",
                            lineNumber: 86,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionButton"], {
                            label: "Load Health",
                            loading: busy,
                            disabled: busy || !borrower,
                            onClick: inspect
                        }, void 0, false, {
                            fileName: "[project]/app/liquidate/page.tsx",
                            lineNumber: 87,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatRow"], {
                            label: "Lending Position Active",
                            value: exists.lending ? 'Yes' : 'No'
                        }, void 0, false, {
                            fileName: "[project]/app/liquidate/page.tsx",
                            lineNumber: 88,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatRow"], {
                            label: "Lending Health",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHealthFactor"])(lendingHealth),
                            tone: Number(lendingHealth) < 11000 ? 'red' : Number(lendingHealth) < 15000 ? 'yellow' : 'green'
                        }, void 0, false, {
                            fileName: "[project]/app/liquidate/page.tsx",
                            lineNumber: 89,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatRow"], {
                            label: "PAS Position Active",
                            value: exists.pas ? 'Yes' : 'No'
                        }, void 0, false, {
                            fileName: "[project]/app/liquidate/page.tsx",
                            lineNumber: 90,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatRow"], {
                            label: "PAS Health",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHealthFactor"])(pasHealth),
                            tone: Number(pasHealth) < 11000 ? 'red' : Number(pasHealth) < 15000 ? 'yellow' : 'green'
                        }, void 0, false, {
                            fileName: "[project]/app/liquidate/page.tsx",
                            lineNumber: 91,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/liquidate/page.tsx",
                    lineNumber: 85,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
                    title: "Liquidator Actions",
                    subtitle: "Admin-only liquidation controls for at-risk positions.",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionButton"], {
                                label: "Liquidate Lending",
                                loading: busy,
                                disabled: busy || !borrower || !exists.lending,
                                variant: "danger",
                                onClick: ()=>run(()=>actions.liquidateLending(borrower))
                            }, void 0, false, {
                                fileName: "[project]/app/liquidate/page.tsx",
                                lineNumber: 96,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$ProtocolUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionButton"], {
                                label: "Liquidate PAS",
                                loading: busy,
                                disabled: busy || !borrower || !exists.pas,
                                variant: "danger",
                                onClick: ()=>run(()=>actions.liquidatePas(borrower))
                            }, void 0, false, {
                                fileName: "[project]/app/liquidate/page.tsx",
                                lineNumber: 103,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/liquidate/page.tsx",
                        lineNumber: 95,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/liquidate/page.tsx",
                    lineNumber: 94,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/liquidate/page.tsx",
            lineNumber: 84,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/liquidate/page.tsx",
        lineNumber: 83,
        columnNumber: 9
    }, this);
}
_s(LiquidatePage, "/BXi5ET34bEu/yMuuvKTQVDDb24=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAccess$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccess"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublicClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProtocolActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProtocolActions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$ActionLogProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActionLog"]
    ];
});
_c = LiquidatePage;
var _c;
__turbopack_context__.k.register(_c, "LiquidatePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_2c7ded6f._.js.map