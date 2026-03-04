'use client';
import * as React from 'react';
import { useAccount, useBalance, usePublicClient, useWalletClient } from 'wagmi';
import { formatUnits, parseEther } from 'viem';
import config, { isDeployed } from '../../lib/addresses';
import { ABIS } from '../../lib/constants';
import { ALL_TOKENS, TUSDC, type TokenDef } from '../../lib/tokens';

/* ── Row data ─────────────────────────────────────────────────────── */
type Row = { token: TokenDef; balance: string; raw: bigint };

/* ── Helpers ──────────────────────────────────────────────────────── */
const fmt = (v: bigint, d: number) => parseFloat(formatUnits(v, d)).toFixed(d > 10 ? 4 : 2);

const readErc20 = async (
    pc: ReturnType<typeof usePublicClient>,
    token: `0x${string}`,
    who: `0x${string}`,
) => {
    if (!pc) return 0n;
    return (await pc.readContract({
        address: token,
        abi: ABIS.ERC20,
        functionName: 'balanceOf',
        args: [who],
    })) as bigint;
};

/* ── Contract address for a token ─────────────────────────────────── */
function addrFor(token: TokenDef): `0x${string}` | null {
    if (token.symbol === 'WPAS') return isDeployed(config.wpas) ? config.wpas : null;
    if (token.symbol === 'tUSDC') return isDeployed(config.tUSDC) ? config.tUSDC : null;
    if (token.symbol === 'tvtUSDC') return isDeployed(config.vault) ? config.vault : null;
    return null; // PAS = native, handled separately
}

/* ================================================================= */
export function WalletPanel({ onClose }: { onClose: () => void }) {
    const { address, isConnected } = useAccount();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();
    const { data: pasBalance } = useBalance({ address });

    const [rows, setRows] = React.useState<Row[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [mintStatus, setMintStatus] = React.useState('');
    const [wrapStatus, setWrapStatus] = React.useState('');

    /* ── Fetch all 4 balances ──────────────────────────────────────── */
    const fetchBalances = React.useCallback(async () => {
        if (!publicClient || !address) return;

        const out: Row[] = [];
        for (const token of ALL_TOKENS) {
            if (token.symbol === 'PAS') {
                out.push({ token, balance: '0', raw: 0n });
                continue;
            }
            const addr = addrFor(token);
            if (!addr) {
                out.push({ token, balance: '0', raw: 0n });
                continue;
            }
            try {
                const bal = await readErc20(publicClient, addr, address);
                out.push({ token, balance: formatUnits(bal, token.decimals), raw: bal });
            } catch {
                out.push({ token, balance: '0', raw: 0n });
            }
        }
        setRows(out);
    }, [publicClient, address]);

    React.useEffect(() => {
        if (isConnected) fetchBalances();
    }, [isConnected, fetchBalances]);

    /* ── tUSDC Faucet ─────────────────────────────────────────────── */
    const handleMintTUSDC = async () => {
        if (!walletClient || !publicClient || !address || !isDeployed(config.tUSDC)) return;
        setLoading(true);
        setMintStatus('');
        try {
            const tx = await walletClient.writeContract({
                address: config.tUSDC,
                abi: ABIS.MOCK_ASSET,
                functionName: 'mint',
                args: [address, TUSDC.faucet!.amount], // 1,000 x 10^6
            });
            await publicClient.waitForTransactionReceipt({ hash: tx });
            setMintStatus('Minted 1,000 tUSDC!');
            fetchBalances();
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message.slice(0, 80) : 'Unknown error';
            setMintStatus(`Error: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    /* ── Wrap PAS -> WPAS ─────────────────────────────────────────── */
    const handleWrap = async () => {
        if (!walletClient || !publicClient || !address || !isDeployed(config.wpas)) return;
        setLoading(true);
        setWrapStatus('');
        try {
            const tx = await walletClient.writeContract({
                address: config.wpas,
                abi: ABIS.WPAS,
                functionName: 'deposit',
                value: parseEther('1'),
            });
            await publicClient.waitForTransactionReceipt({ hash: tx });
            setWrapStatus('Wrapped 1 PAS \u2192 1 WPAS');
            fetchBalances();
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message.slice(0, 80) : 'Unknown error';
            setWrapStatus(`Error: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    /* ── Unwrap WPAS -> PAS ───────────────────────────────────────── */
    const handleUnwrap = async () => {
        if (!walletClient || !publicClient || !address || !isDeployed(config.wpas)) return;
        setLoading(true);
        setWrapStatus('');
        try {
            const tx = await walletClient.writeContract({
                address: config.wpas,
                abi: ABIS.WPAS,
                functionName: 'withdraw',
                args: [parseEther('1')],
            });
            await publicClient.waitForTransactionReceipt({ hash: tx });
            setWrapStatus('Unwrapped 1 WPAS \u2192 1 PAS');
            fetchBalances();
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message.slice(0, 80) : 'Unknown error';
            setWrapStatus(`Error: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    /* ── Render ────────────────────────────────────────────────────── */
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className="w-full max-w-sm rounded-2xl border border-glass-border bg-surface backdrop-blur-xl p-6 space-y-5 shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-foreground">Wallet</h3>
                    <button onClick={onClose} className="text-muted hover:text-foreground transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {!isConnected ? (
                    <p className="text-sm text-muted">Connect your wallet to see balances.</p>
                ) : (
                    <>
                        {/* PAS (native) */}
                        <div className="rounded-xl border border-glass-border bg-black/20 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-muted">Native PAS</p>
                                    <p className="text-xl font-mono text-foreground">
                                        {pasBalance ? fmt(pasBalance.value, 18) : '\u2014'}
                                    </p>
                                </div>
                                <span className="px-2 py-0.5 text-xs rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                                    Native
                                </span>
                            </div>
                            {pasBalance && pasBalance.value === 0n && config.faucet && (
                                <a
                                    href={config.faucet}
                                    target="_blank" rel="noopener noreferrer"
                                    className="mt-2 inline-block text-xs text-brand-subtle hover:underline"
                                >
                                    Get PAS from faucet {'\u2197'}
                                </a>
                            )}
                        </div>

                        {/* ERC-20 Balances (WPAS, tUSDC, tvtUSDC) */}
                        <div className="space-y-2">
                            <p className="text-xs text-muted font-medium">Token Balances</p>
                            {rows.filter(r => r.token.symbol !== 'PAS').map(r => (
                                <div key={r.token.symbol} className="flex items-center justify-between rounded-lg bg-black/10 px-3 py-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-foreground font-medium">{r.token.symbol}</span>
                                        <span className={`px-1.5 py-0.5 text-[10px] rounded ${r.token.badge.color} border ${r.token.badge.border}`}>
                                            {r.token.badge.label}
                                        </span>
                                    </div>
                                    <span className="text-sm font-mono text-foreground/80">
                                        {fmt(r.raw, r.token.decimals)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Wrap / Unwrap (WPAS) */}
                        {isDeployed(config.wpas) && (
                            <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-3 space-y-2">
                                <p className="text-xs text-orange-300 font-medium">Wrap / Unwrap PAS</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleWrap}
                                        disabled={loading}
                                        className="flex-1 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-medium disabled:opacity-50 transition-colors"
                                    >
                                        Wrap 1 PAS
                                    </button>
                                    <button
                                        onClick={handleUnwrap}
                                        disabled={loading}
                                        className="flex-1 py-2 rounded-lg bg-orange-600/70 hover:bg-orange-500 text-white text-xs font-medium disabled:opacity-50 transition-colors"
                                    >
                                        Unwrap 1 WPAS
                                    </button>
                                </div>
                                {wrapStatus && (
                                    <p className={`text-xs ${wrapStatus.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
                                        {wrapStatus}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* tUSDC Faucet */}
                        {isDeployed(config.tUSDC) && (
                            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3 space-y-2">
                                <p className="text-xs text-yellow-300 font-medium">tUSDC Faucet</p>
                                <button
                                    onClick={handleMintTUSDC}
                                    disabled={loading}
                                    className="w-full py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-white text-xs font-medium disabled:opacity-50 transition-colors"
                                >
                                    {loading ? 'Minting\u2026' : 'Mint 1,000 tUSDC'}
                                </button>
                                {mintStatus && (
                                    <p className={`text-xs ${mintStatus.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
                                        {mintStatus}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Faucet link */}
                        {config.faucet && (
                            <div className="text-xs text-muted">
                                <a
                                    href={config.faucet}
                                    target="_blank" rel="noopener noreferrer"
                                    className="text-brand-subtle hover:underline"
                                >
                                    Polkadot Faucet {'\u2197'}
                                </a>
                                {' \u2014 Get PAS for gas'}
                            </div>
                        )}

                        {/* Refresh */}
                        <button
                            onClick={fetchBalances}
                            className="w-full text-xs text-muted hover:text-foreground transition-colors py-1"
                        >
                            {'\u21bb'} Refresh Balances
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
