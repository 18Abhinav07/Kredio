'use client';
import * as React from 'react';
import { motion } from 'framer-motion';
import { useSwapLogic } from '../../hooks/useSwapLogic';
import { useAccount, useBalance, usePublicClient, useWalletClient } from 'wagmi';
import { parseEther, formatUnits, formatEther } from 'viem';
import { BRIDGE_DESTINATIONS, DEMO_XCM_MESSAGES } from '../../lib/xcm-builder';
import config, { isDeployed } from '../../lib/addresses';
import { ABIS } from '../../lib/constants';
import { SWAP_TOKENS, type TokenDef } from '../../lib/tokens';

// ── Badge Component ─────────────────────────────────────────────────
function TokenBadge({ token }: { token: TokenDef }) {
    return (
        <span className={`ml-1 px-1.5 py-0.5 text-[10px] rounded border ${token.badge.color} ${token.badge.border}`}>
            {token.badge.label}
        </span>
    );
}

// ── Wrap / Unwrap sub-tab ───────────────────────────────────────────
function WrapTab() {
    const { address, isConnected } = useAccount();
    const { data: pasBalance } = useBalance({ address });
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();

    const [mode, setMode] = React.useState<'wrap' | 'unwrap'>('wrap');
    const [amount, setAmount] = React.useState('');
    const [wpasBalance, setWpasBalance] = React.useState(0n);
    const [loading, setLoading] = React.useState(false);
    const [txHash, setTxHash] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const fetchWpas = React.useCallback(async () => {
        if (!publicClient || !address || !isDeployed(config.wpas)) return;
        try {
            const bal = await publicClient.readContract({
                address: config.wpas, abi: ABIS.WPAS,
                functionName: 'balanceOf', args: [address],
            }) as bigint;
            setWpasBalance(bal);
        } catch { /* noop */ }
    }, [publicClient, address]);

    React.useEffect(() => { if (isConnected) fetchWpas(); }, [isConnected, fetchWpas]);

    const handleWrap = async () => {
        if (!walletClient || !publicClient || !address || !isDeployed(config.wpas)) return;
        if (!amount || parseFloat(amount) <= 0) return;
        setLoading(true); setError(null);
        try {
            const value = parseEther(amount);
            const tx = await walletClient.writeContract({
                address: config.wpas, abi: ABIS.WPAS,
                functionName: 'deposit', value,
            });
            await publicClient.waitForTransactionReceipt({ hash: tx });
            setTxHash(tx);
            setAmount('');
            fetchWpas();
        } catch (e: any) {
            setError(e.message?.slice(0, 120));
        } finally { setLoading(false); }
    };

    const handleUnwrap = async () => {
        if (!walletClient || !publicClient || !address || !isDeployed(config.wpas)) return;
        if (!amount || parseFloat(amount) <= 0) return;
        setLoading(true); setError(null);
        try {
            const value = parseEther(amount);
            const tx = await walletClient.writeContract({
                address: config.wpas, abi: ABIS.WPAS,
                functionName: 'withdraw', args: [value],
            });
            await publicClient.waitForTransactionReceipt({ hash: tx });
            setTxHash(tx);
            setAmount('');
            fetchWpas();
        } catch (e: any) {
            setError(e.message?.slice(0, 120));
        } finally { setLoading(false); }
    };

    const maxBalance = mode === 'wrap'
        ? (pasBalance ? formatEther(pasBalance.value) : '0')
        : formatEther(wpasBalance);

    return (
        <div className="space-y-4">
            {/* Wrap / Unwrap toggle */}
            <div className="flex gap-2">
                <button
                    onClick={() => { setMode('wrap'); setAmount(''); }}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${mode === 'wrap'
                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                        : 'bg-white/5 text-muted border border-glass-border hover:text-foreground'
                        }`}
                >
                    Wrap PAS → WPAS
                </button>
                <button
                    onClick={() => { setMode('unwrap'); setAmount(''); }}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${mode === 'unwrap'
                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                        : 'bg-white/5 text-muted border border-glass-border hover:text-foreground'
                        }`}
                >
                    Unwrap WPAS → PAS
                </button>
            </div>

            {/* Amount input */}
            <div className="rounded-2xl border border-glass-border bg-surface/50 backdrop-blur-lg p-4 space-y-2">
                <div className="flex justify-between text-xs text-muted">
                    <span>{mode === 'wrap' ? 'PAS to wrap' : 'WPAS to unwrap'}</span>
                    <button
                        onClick={() => setAmount(maxBalance)}
                        className="text-brand-subtle hover:underline"
                    >
                        Max: {parseFloat(maxBalance).toFixed(4)}
                    </button>
                </div>
                <input
                    type="number" value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-transparent text-2xl font-mono text-foreground placeholder:text-muted/30 focus:outline-none"
                />
            </div>

            {/* Info */}
            <div className="flex justify-between text-xs text-muted px-1">
                <span>Your WPAS balance</span>
                <span>{parseFloat(formatEther(wpasBalance)).toFixed(4)} WPAS</span>
            </div>

            {/* Action button */}
            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={mode === 'wrap' ? handleWrap : handleUnwrap}
                disabled={!isConnected || loading || !amount || parseFloat(amount) <= 0 || !isDeployed(config.wpas)}
                className="w-full py-3 rounded-2xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:shadow-lg hover:shadow-orange-500/20"
            >
                {!isConnected ? 'Connect Wallet'
                    : !isDeployed(config.wpas) ? 'WPAS Not Deployed'
                        : loading ? 'Confirming…'
                            : mode === 'wrap' ? 'Wrap PAS → WPAS'
                                : 'Unwrap WPAS → PAS'}
            </motion.button>

            {error && <p className="text-sm text-red-400 bg-red-400/10 rounded-xl px-4 py-2 break-all">{error}</p>}
            {txHash && (
                <div className="text-xs text-green-400 bg-green-400/10 rounded-xl px-4 py-2 space-y-1">
                    <p>✓ Transaction confirmed</p>
                    <code className="block text-xs break-all opacity-70">{txHash}</code>
                    {config.explorer && (
                        <a href={`${config.explorer}/tx/${txHash}`} target="_blank" rel="noopener noreferrer"
                            className="inline-block mt-1 text-brand-subtle hover:underline">View on Subscan ↗</a>
                    )}
                </div>
            )}
        </div>
    );
}

// ── Main SwapWidget with Swap + Wrap sub-tabs ───────────────────────
export function SwapWidget() {
    const {
        reserveA, reserveB, balanceA, balanceB, estimatedOut,
        isLoading, error, isConnected, formatAmount,
        fetchPoolData, estimateOutput, executeSwap, executeSwapAndBridge,
    } = useSwapLogic();

    const [subTab, setSubTab] = React.useState<'swap' | 'wrap'>('swap');
    const [amountIn, setAmountIn] = React.useState('');
    const [assetIn, setAssetIn] = React.useState(SWAP_TOKENS[0]);
    const [assetOut, setAssetOut] = React.useState(SWAP_TOKENS.length > 1 ? SWAP_TOKENS[1] : SWAP_TOKENS[0]);
    const [slippage, setSlippage] = React.useState('1.0');
    const [bridgeMode, setBridgeMode] = React.useState(false);
    const [bridgeDest, setBridgeDest] = React.useState<typeof BRIDGE_DESTINATIONS[number]>(BRIDGE_DESTINATIONS[0]);
    const [txHash, setTxHash] = React.useState<string | null>(null);

    // Fetch pool data when assets change
    React.useEffect(() => {
        if (isConnected && assetIn.assetId && assetOut.assetId) {
            fetchPoolData(assetIn.assetId, assetOut.assetId);
        }
    }, [isConnected, assetIn.assetId, assetOut.assetId, fetchPoolData]);

    // Estimate output when amount changes
    React.useEffect(() => {
        if (!assetIn.assetId || !assetOut.assetId) return;
        const reserveIn = assetIn.assetId < assetOut.assetId ? reserveA : reserveB;
        const reserveOut = assetIn.assetId < assetOut.assetId ? reserveB : reserveA;
        estimateOutput(amountIn, reserveIn, reserveOut, assetIn.decimals);
    }, [amountIn, reserveA, reserveB, assetIn, assetOut, estimateOutput]);

    const handleFlip = () => {
        setAssetIn(assetOut);
        setAssetOut(assetIn);
        setAmountIn('');
    };

    const handleSwap = async () => {
        if (!amountIn || parseFloat(amountIn) <= 0 || !assetIn.assetId || !assetOut.assetId) return;
        const slippageBps = parseFloat(slippage) / 100;
        const minOut = estimatedOut > 0n
            ? formatAmount(estimatedOut - BigInt(Math.floor(Number(estimatedOut) * slippageBps)), assetOut.decimals)
            : '0';

        let hash: string | undefined;
        if (bridgeMode) {
            hash = await executeSwapAndBridge(
                assetIn.assetId, assetOut.assetId, amountIn, minOut,
                bridgeDest.value as `0x${string}`,
                DEMO_XCM_MESSAGES.TRANSFER_TO_RELAY as `0x${string}`,
                assetIn.decimals, assetOut.decimals,
            );
        } else {
            hash = await executeSwap(assetIn.assetId, assetOut.assetId, amountIn, minOut, assetIn.decimals, assetOut.decimals);
        }
        if (hash) {
            setTxHash(hash);
            setAmountIn('');
            if (assetIn.assetId && assetOut.assetId) fetchPoolData(assetIn.assetId, assetOut.assetId);
        }
    };

    const userBalance = assetIn.assetId && assetOut.assetId && assetIn.assetId < assetOut.assetId ? balanceA : balanceB;

    return (
        <div className="w-full max-w-md mx-auto space-y-4">
            {/* Sub-tab header: Swap | Wrap */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setSubTab('swap')}
                    className={`text-lg font-bold transition-colors ${subTab === 'swap' ? 'text-foreground' : 'text-muted hover:text-foreground/70'}`}
                >
                    Swap
                </button>
                <span className="text-muted/30">|</span>
                <button
                    onClick={() => setSubTab('wrap')}
                    className={`text-lg font-bold transition-colors ${subTab === 'wrap' ? 'text-foreground' : 'text-muted hover:text-foreground/70'}`}
                >
                    Wrap
                </button>
                {subTab === 'swap' && (
                    <div className="ml-auto">
                        <button
                            onClick={() => setBridgeMode(!bridgeMode)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${bridgeMode
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : 'bg-white/5 text-muted border border-glass-border hover:text-foreground'
                                }`}
                        >
                            XCM Bridge {bridgeMode ? '✓' : ''}
                        </button>
                    </div>
                )}
            </div>

            {/* ── Wrap sub-tab ── */}
            {subTab === 'wrap' && <WrapTab />}

            {/* ── Swap sub-tab ── */}
            {subTab === 'swap' && (
                <>
                    {/* Input Token */}
                    <div className="rounded-2xl border border-glass-border bg-surface/50 backdrop-blur-lg p-4 space-y-2">
                        <div className="flex justify-between text-xs text-muted">
                            <span className="flex items-center">You pay <TokenBadge token={assetIn} /></span>
                            <span>Balance: {isConnected ? formatAmount(userBalance, assetIn.decimals) : '—'} {assetIn.symbol}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="number" value={amountIn}
                                onChange={e => setAmountIn(e.target.value)}
                                placeholder="0.0"
                                className="flex-1 bg-transparent text-2xl font-mono text-foreground placeholder:text-muted/30 focus:outline-none"
                            />
                            <select
                                value={assetIn.assetId ?? ''}
                                onChange={e => {
                                    const t = SWAP_TOKENS.find(t => t.assetId === Number(e.target.value))!;
                                    if (t.assetId === assetOut.assetId) handleFlip();
                                    else setAssetIn(t);
                                }}
                                className="bg-white/10 border border-glass-border rounded-xl px-3 py-2 text-sm text-foreground font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-subtle appearance-none"
                            >
                                {SWAP_TOKENS.map(t => (
                                    <option key={t.assetId} value={t.assetId!} className="bg-gray-900 text-white">{t.symbol}</option>
                                ))}
                            </select>
                        </div>
                        {isConnected && userBalance > 0n && (
                            <button onClick={() => setAmountIn(formatAmount(userBalance, assetIn.decimals))}
                                className="text-xs text-brand-subtle hover:underline">Max</button>
                        )}
                        {assetIn.symbol === 'WPAS' && (
                            <p className="text-xs text-orange-300/70">
                                Need WPAS? Switch to the <button className="underline hover:text-orange-200" onClick={() => setSubTab('wrap')}>Wrap</button> tab
                            </p>
                        )}
                    </div>

                    {/* Flip */}
                    <div className="flex justify-center -my-2 relative z-10">
                        <motion.button whileHover={{ rotate: 180, scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            onClick={handleFlip}
                            className="w-10 h-10 rounded-full bg-surface border border-glass-border flex items-center justify-center text-muted hover:text-foreground transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                        </motion.button>
                    </div>

                    {/* Output Token */}
                    <div className="rounded-2xl border border-glass-border bg-surface/50 backdrop-blur-lg p-4 space-y-2">
                        <div className="flex justify-between text-xs text-muted">
                            <span className="flex items-center">You receive <TokenBadge token={assetOut} /></span>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="flex-1 text-2xl font-mono text-foreground/80">
                                {estimatedOut > 0n ? formatAmount(estimatedOut, assetOut.decimals) : '0.0'}
                            </p>
                            <select
                                value={assetOut.assetId ?? ''}
                                onChange={e => {
                                    const t = SWAP_TOKENS.find(t => t.assetId === Number(e.target.value))!;
                                    if (t.assetId === assetIn.assetId) handleFlip();
                                    else setAssetOut(t);
                                }}
                                className="bg-white/10 border border-glass-border rounded-xl px-3 py-2 text-sm text-foreground font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-subtle appearance-none"
                            >
                                {SWAP_TOKENS.map(t => (
                                    <option key={t.assetId} value={t.assetId!} className="bg-gray-900 text-white">{t.symbol}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Bridge Destination */}
                    {bridgeMode && (
                        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-lg p-4 space-y-2">
                            <div className="text-xs text-cyan-300 font-medium">XCM Bridge Destination</div>
                            <select
                                value={bridgeDest.value}
                                onChange={e => setBridgeDest(BRIDGE_DESTINATIONS.find(d => d.value === e.target.value)!)}
                                className="w-full bg-black/30 border border-cyan-500/20 rounded-xl px-3 py-2 text-sm text-foreground font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-500/50 appearance-none"
                            >
                                {BRIDGE_DESTINATIONS.map(d => (
                                    <option key={d.value} value={d.value} className="bg-gray-900 text-white">{d.label}</option>
                                ))}
                            </select>
                            <p className="text-xs text-muted">Atomic: swap → weighMessage → XCM execute in one transaction</p>
                        </div>
                    )}

                    {/* Pool Info */}
                    {reserveA > 0n && assetIn.assetId && assetOut.assetId && (
                        <div className="flex justify-between text-xs text-muted px-1">
                            <span>Pool Reserves</span>
                            <span>
                                {formatAmount(reserveA, assetIn.assetId < assetOut.assetId ? assetIn.decimals : assetOut.decimals)} / {formatAmount(reserveB, assetIn.assetId < assetOut.assetId ? assetOut.decimals : assetIn.decimals)}
                            </span>
                        </div>
                    )}

                    {/* Slippage */}
                    <div className="flex items-center justify-between text-xs text-muted px-1">
                        <span>Slippage tolerance</span>
                        <div className="flex items-center gap-1">
                            {['0.5', '1.0', '3.0'].map(s => (
                                <button key={s} onClick={() => setSlippage(s)}
                                    className={`px-2 py-0.5 rounded text-xs ${slippage === s ? 'bg-brand-subtle/20 text-brand-subtle' : 'bg-white/5 hover:bg-white/10'}`}>
                                    {s}%
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Swap Button */}
                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                        onClick={handleSwap}
                        disabled={!isConnected || isLoading || !amountIn || parseFloat(amountIn) <= 0}
                        className="w-full py-3 rounded-2xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-brand-subtle to-purple-500 text-white hover:shadow-lg hover:shadow-brand-subtle/20">
                        {!isConnected ? 'Connect Wallet'
                            : isLoading ? 'Confirming…'
                                : !amountIn || parseFloat(amountIn) <= 0 ? 'Enter Amount'
                                    : bridgeMode ? `Swap & Bridge to ${bridgeDest.label}`
                                        : `Swap ${assetIn.symbol} → ${assetOut.symbol}`}
                    </motion.button>

                    {/* Error */}
                    {error && <p className="text-sm text-red-400 bg-red-400/10 rounded-xl px-4 py-2 break-all">{error}</p>}

                    {/* Tx confirmation */}
                    {txHash && (
                        <div className="text-xs text-green-400 bg-green-400/10 rounded-xl px-4 py-2 space-y-1">
                            <p>✓ Transaction confirmed</p>
                            <code className="block text-xs break-all opacity-70">{txHash}</code>
                            {config.explorer && (
                                <a href={`${config.explorer}/tx/${txHash}`} target="_blank" rel="noopener noreferrer"
                                    className="inline-block mt-1 text-brand-subtle hover:underline">View on Subscan ↗</a>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
