'use client';
import * as React from 'react';
import { motion } from 'framer-motion';
import { useVaultLogic } from '../../hooks/useVaultLogic';
import { DEMO_XCM_MESSAGES } from '../../lib/xcm-builder';
import config from '../../lib/addresses';

export function VaultDashboard() {
    const {
        totalAssets, totalSupply, userShares, userAssetsValue, sharePrice,
        isLoading, error, isConnected, isOwner, computeContract, decimals,
        fetchVaultData, deposit, withdraw, rebalance, formatAmount,
    } = useVaultLogic();

    const [activeTab, setActiveTab] = React.useState<'deposit' | 'withdraw'>('deposit');
    const [amount, setAmount] = React.useState('');
    const [aprInput, setAprInput] = React.useState('100, 500, 200, 350');
    const [txHash, setTxHash] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (isConnected) fetchVaultData();
    }, [isConnected, fetchVaultData]);

    const handleDeposit = async () => {
        if (!amount || parseFloat(amount) <= 0) return;
        const hash = await deposit(amount);
        if (hash) { setTxHash(hash); setAmount(''); }
    };

    const handleWithdraw = async () => {
        if (!amount || parseFloat(amount) <= 0) return;
        const hash = await withdraw(amount);
        if (hash) { setTxHash(hash); setAmount(''); }
    };

    const handleRebalance = async () => {
        const aprs = aprInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
        if (aprs.length === 0) return;
        const hash = await rebalance(aprs, DEMO_XCM_MESSAGES.TRANSFER_TO_RELAY as `0x${string}`);
        if (hash) setTxHash(hash);
    };

    const isZeroCompute = computeContract === '0x0000000000000000000000000000000000000000';

    return (
        <div className="w-full max-w-lg mx-auto space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-foreground">TesseractVault</h2>
                <span className="px-2 py-0.5 text-xs font-bold rounded bg-green-500/20 text-green-300 border border-green-500/30">
                    ERC-4626
                </span>
            </div>

            {/* TVL Stats */}
            <div className="rounded-2xl border border-glass-border bg-surface/50 backdrop-blur-lg p-5">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <p className="text-xs text-muted">Total Assets (TVL)</p>
                        <p className="text-lg font-mono text-foreground">
                            {totalAssets > 0n ? formatAmount(totalAssets) : '0'} <span className="text-xs text-muted">tUSDC</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-muted">Your Shares</p>
                        <p className="text-lg font-mono text-foreground">
                            {userShares > 0n ? formatAmount(userShares) : '0'} <span className="text-xs text-muted">tvtUSDC</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-muted">Share Price</p>
                        <p className="text-lg font-mono text-foreground">{sharePrice}</p>
                    </div>
                </div>
                {userAssetsValue > 0n && (
                    <p className="text-xs text-muted mt-2">
                        Your position: ≈ {formatAmount(userAssetsValue)} tUSDC
                    </p>
                )}
            </div>

            {/* Deposit / Withdraw Tabs */}
            <div className="rounded-2xl border border-glass-border bg-surface/50 backdrop-blur-lg p-5 space-y-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => { setActiveTab('deposit'); setAmount(''); }}
                        className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === 'deposit'
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-white/5 text-muted border border-glass-border hover:text-foreground'
                            }`}
                    >
                        Deposit
                    </button>
                    <button
                        onClick={() => { setActiveTab('withdraw'); setAmount(''); }}
                        className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === 'withdraw'
                            ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                            : 'bg-white/5 text-muted border border-glass-border hover:text-foreground'
                            }`}
                    >
                        Withdraw
                    </button>
                </div>

                <div>
                    <div className="flex justify-between text-xs text-muted mb-1">
                        <span>{activeTab === 'deposit' ? 'tUSDC to deposit' : 'tvtUSDC shares to burn'}</span>
                        <span>
                            {activeTab === 'withdraw' && userShares > 0n && (
                                <button onClick={() => setAmount(formatAmount(userShares))} className="text-brand-subtle hover:underline">
                                    Max: {formatAmount(userShares)}
                                </button>
                            )}
                        </span>
                    </div>
                    <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="0.0"
                        className="w-full bg-black/30 border border-glass-border rounded-xl px-4 py-3 text-lg font-mono text-foreground placeholder:text-muted/30 focus:outline-none focus:ring-1 focus:ring-brand-subtle"
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={activeTab === 'deposit' ? handleDeposit : handleWithdraw}
                    disabled={!isConnected || isLoading || !amount || parseFloat(amount) <= 0}
                    className={`w-full py-3 rounded-2xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed text-white ${activeTab === 'deposit'
                        ? 'bg-gradient-to-r from-green-600 to-emerald-500 hover:shadow-lg hover:shadow-green-500/20'
                        : 'bg-gradient-to-r from-orange-600 to-amber-500 hover:shadow-lg hover:shadow-orange-500/20'
                        }`}
                >
                    {!isConnected
                        ? 'Connect Wallet'
                        : isLoading
                            ? 'Confirming…'
                            : activeTab === 'deposit'
                                ? 'Deposit tUSDC'
                                : 'Withdraw tUSDC'
                    }
                </motion.button>
            </div>

            {/* Rebalance (Owner Only) */}
            {isOwner && (
                <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 backdrop-blur-lg p-5 space-y-3">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">Rebalance</h3>
                        <span className="px-2 py-0.5 text-xs rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            Owner
                        </span>
                    </div>
                    <p className="text-xs text-muted">
                        Triggers: weight guard → cross-VM call to PVM → XCM execute
                    </p>
                    <input
                        type="text"
                        value={aprInput}
                        onChange={e => setAprInput(e.target.value)}
                        placeholder="APRs (comma-separated bps)"
                        className="w-full bg-black/30 border border-purple-500/20 rounded-xl px-3 py-2 text-sm text-foreground font-mono placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                    />
                    <div className="flex items-center gap-2 text-xs text-muted">
                        <span className={`w-2 h-2 rounded-full ${isZeroCompute ? 'bg-yellow-400' : 'bg-green-400'}`} />
                        <span>
                            PVM Compute: {isZeroCompute ? 'Not set' : `${computeContract.slice(0, 10)}…`}
                        </span>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleRebalance}
                        disabled={isLoading}
                        className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium disabled:opacity-50 transition-colors"
                    >
                        {isLoading ? 'Rebalancing…' : 'Execute Rebalance'}
                    </motion.button>
                </div>
            )}

            {/* Contract Info */}
            <div className="text-xs text-muted space-y-1 px-1">
                <div className="flex justify-between">
                    <span>Vault Contract</span>
                    <code className="font-mono">{config.vault.slice(0, 10)}…{config.vault.slice(-6)}</code>
                </div>
                <div className="flex justify-between">
                    <span>Underlying Asset</span>
                    <code className="font-mono">{config.tUSDC.slice(0, 10)}…{config.tUSDC.slice(-6)}</code>
                </div>
                <div className="flex justify-between">
                    <span>Total Supply</span>
                    <span>{totalSupply > 0n ? formatAmount(totalSupply) : '0'} tvtUSDC</span>
                </div>
            </div>

            {/* Error */}
            {error && (
                <p className="text-sm text-red-400 bg-red-400/10 rounded-xl px-4 py-2 break-all">{error}</p>
            )}

            {/* Tx confirmation + Subscan link */}
            {txHash && (
                <div className="text-xs text-green-400 bg-green-400/10 rounded-xl px-4 py-2 space-y-1">
                    <p>✓ Transaction confirmed</p>
                    <code className="block text-xs break-all opacity-70">{txHash}</code>
                    {config.explorer && (
                        <a
                            href={`${config.explorer}/tx/${txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-1 text-brand-subtle hover:underline"
                        >
                            View on Subscan ↗
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}
