'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useAccount, useBalance, usePublicClient, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { motion, AnimatePresence } from 'framer-motion';
import {
    fetchPeopleBalance,
    formatPASFromEVM,
    formatPASFromPeople,
    pollHubArrival,
    sendXCMToHub,
    type XcmStatusStage,
} from '../../../lib/xcm';
import config from '../../../lib/addresses';
import { ABIS } from '../../../lib/constants';
import { formatDisplayBalance, formatTokenAmount, cn } from '../../../lib/utils';
import { PageShell, StatRow, StateNotice } from '../../../components/modules/ProtocolUI';
import { useUserPortfolio, useGlobalProtocolData, formatHealthFactor, healthState, fmtToken, fmtOraclePrice8 } from '../../../hooks/useProtocolData';
import { useProtocolActions } from '../../../hooks/useProtocolActions';

const GAS_BUFFER = parseUnits('0.01', 18);

type SubstrateAccount = { address: string; type?: string; meta?: { name?: string } };
type SourceTab = 'hub' | 'people';

function Spinner({ small }: { small?: boolean }) {
    const s = small ? 'w-3 h-3 border' : 'w-4 h-4 border-2';
    return <span className={`inline-block rounded-full border-current border-t-transparent animate-spin shrink-0 ${s}`} />;
}
function Check() {
    return (
        <svg className="w-4 h-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}

function SectionLabel({ n, label, done }: { n: number; label: string; done?: boolean }) {
    return (
        <div className="flex items-center gap-2 mb-4">
            <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                done ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
            )}>
                {done ? '✓' : n}
            </div>
            <span className="text-sm font-semibold text-white">{label}</span>
        </div>
    );
}

function InfoRow({ label, value, tone }: { label: string; value: string; tone?: 'green' | 'yellow' | 'red' | 'default' }) {
    return (
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
            <span className="text-slate-400">{label}</span>
            <span className={cn('font-medium',
                tone === 'green' && 'text-emerald-300',
                tone === 'yellow' && 'text-amber-300',
                tone === 'red' && 'text-rose-300',
                (!tone || tone === 'default') && 'text-white'
            )}>{value}</span>
        </div>
    );
}

function HealthBar({ ratio }: { ratio: bigint }) {
    // Both market contracts return healthRatio as (collateral * 10000) / owed — BPS format
    const isInfinite = ratio > 1_000_000_000n;
    const num = isInfinite ? Infinity : Number(ratio) / 10000;
    const display = isInfinite ? '∞' : num.toFixed(2) + 'x';
    const pct = isInfinite ? 100 : Math.min((num / 3) * 100, 100);
    const tone = num < 1.1 ? 'red' : num < 1.5 ? 'yellow' : 'green';
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
                <span className="text-slate-400">Health Ratio (current)</span>
                <span className={cn('font-medium',
                    tone === 'red' && 'text-rose-300',
                    tone === 'yellow' && 'text-amber-300',
                    tone === 'green' && 'text-emerald-300'
                )}>{display}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10">
                <div className={cn('h-full rounded-full transition-all',
                    tone === 'red' && 'bg-rose-500',
                    tone === 'yellow' && 'bg-amber-500',
                    tone === 'green' && 'bg-emerald-500'
                )} style={{ width: `${isInfinite ? 100 : pct}%` }} />
            </div>
        </div>
    );
}

function useBorrowPreview(pasInputStr: string, ltvBps: bigint, oraclePrice8: bigint) {
    if (!pasInputStr || Number(pasInputStr) <= 0 || oraclePrice8 === 0n) return null;
    try {
        const pasWei = parseUnits(pasInputStr, 18);
        // (18 dec) × price8 (8 dec) / 1e20 → USDC (6 dec)  [matches contract _toUSDCValue]
        const collateralUsdcAtoms = (pasWei * oraclePrice8) / BigInt('100000000000000000000');
        const maxBorrowAtoms = (collateralUsdcAtoms * ltvBps) / 10000n;
        const collateralUsd = Number(formatUnits(collateralUsdcAtoms, 6));
        const maxBorrowUsd = Number(formatUnits(maxBorrowAtoms, 6));
        const oraclePriceNum = Number(oraclePrice8) / 1e8;
        return { collateralUsd, maxBorrowAtoms, maxBorrowUsd, oraclePriceNum };
    } catch { return null; }
}

// ── Step 1: Deposit Collateral ────────────────────────────────────────────
function DepositStep({ prefillAmount, onSuccess }: {
    prefillAmount?: string;
    onSuccess: (depositedWei: bigint, maxBorrowAtoms: bigint) => void;
}) {
    const { address } = useAccount();
    const { data: balData, refetch: refetchBal } = useBalance({ address });
    const pasBalance = balData?.value ?? 0n;
    const { oracle } = useGlobalProtocolData();
    const portfolio = useUserPortfolio();

    const [input, setInput] = useState(prefillAmount ?? '');
    const [debouncedInput, setDebouncedInput] = useState(prefillAmount ?? '');
    useEffect(() => { const t = setTimeout(() => setDebouncedInput(input), 300); return () => clearTimeout(t); }, [input]);
    useEffect(() => { if (prefillAmount) { setInput(prefillAmount); setDebouncedInput(prefillAmount); } }, [prefillAmount]);

    const { data: ltvBpsRaw } = useReadContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'ltvBps' });
    const ltvBps = (ltvBpsRaw as bigint | undefined) ?? 6500n;

    // KredioPASMarket exposes no public getScore — read from KredioLending which
    // calls the same KreditAgent and returns the same score/rate for this user.
    const { data: scoreRaw } = useReadContract({
        address: config.lending, abi: ABIS.KREDIO_LENDING,
        functionName: 'getScore',
        args: [address ?? '0x0000000000000000000000000000000000000000'],
        query: { enabled: !!address }
    });
    const score = scoreRaw as readonly [bigint, number, number, number] | undefined;
    const interestBps = score ? Number(score[3]) : 0;
    const scoreTierLabels = ['ANON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM'];

    const preview = useBorrowPreview(debouncedInput, ltvBps, oracle.price8);

    const { writeContract, data: txHash, isPending: isSigning, reset: resetWrite } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });
    const busy = isSigning || isConfirming;

    useEffect(() => {
        if (!isSuccess) return;
        refetchBal();
        portfolio.refresh();
        const wei = (() => { try { return parseUnits(input, 18); } catch { return 0n; } })();
        onSuccess(wei, preview?.maxBorrowAtoms ?? 0n);
        resetWrite();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    const pasWei = (() => { try { return input && Number(input) > 0 ? parseUnits(input, 18) : 0n; } catch { return 0n; } })();
    const overBalance = pasWei > 0n && pasWei > pasBalance;

    const statusMsg = isSigning ? 'Waiting for MetaMask...' : isConfirming ? 'Confirming deposit...' : '';

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-slate-400">PAS to deposit as collateral</label>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                    <input type="number" min="0" step="any" placeholder="0.0000"
                        value={input} onChange={e => setInput(e.target.value)} disabled={busy}
                        className="flex-1 bg-transparent text-xl font-light text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                    <span className="text-xs font-semibold text-pink-300 bg-pink-500/10 border border-pink-500/20 rounded-lg px-2.5 py-1">PAS</span>
                </div>
                <div className="flex justify-between text-xs px-1">
                    <span className="text-slate-500">Balance: <span className="text-slate-300">{formatDisplayBalance(pasBalance, 18, 4)} PAS</span></span>
                    <button onClick={() => { const mx = pasBalance > GAS_BUFFER ? pasBalance - GAS_BUFFER : 0n; setInput(Number(formatUnits(mx, 18)).toFixed(6)); }}
                        disabled={busy} className="text-indigo-400 hover:text-indigo-300 font-medium disabled:opacity-40">Max</button>
                </div>
                {overBalance && <p className="text-xs text-rose-400 px-1">Amount exceeds balance</p>}
            </div>

            <div className={cn('rounded-xl border px-4 py-3 space-y-0 transition-opacity',
                debouncedInput && Number(debouncedInput) > 0 ? 'border-white/10 bg-black/30 opacity-100' : 'border-white/5 bg-black/10 opacity-35 pointer-events-none')}>
                <InfoRow label="Collateral value" value={preview ? `~$${preview.collateralUsd.toFixed(2)}` : '—'} />
                <InfoRow label="Credit score" value={score ? `${score[0].toString()} (${score[1] > 0 ? scoreTierLabels[score[1]] : 'ANON'})` : '—'} />
                <InfoRow label="LTV" value={`${(Number(ltvBps) / 100).toFixed(0)}%`} />
                <InfoRow label="You can borrow" value={preview ? `~${formatTokenAmount(preview.maxBorrowAtoms, 6, 2, false)} mUSDC` : '—'} tone="green" />
                <InfoRow label="Interest rate" value={`${(interestBps / 100).toFixed(2)}% APY`} />
            </div>

            {debouncedInput && Number(debouncedInput) > 0 && portfolio.pasHealthRatio > 0n && (
                <HealthBar ratio={portfolio.pasHealthRatio} />
            )}

            <button onClick={() => { if (!input || Number(input) <= 0) return; writeContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'depositCollateral', value: pasWei }); }}
                disabled={!input || Number(input) <= 0 || overBalance || busy || oracle.isCrashed}
                className={cn('w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2',
                    busy ? 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed'
                        : !input || overBalance || oracle.isCrashed ? 'bg-white/5 border border-white/10 text-slate-600 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white')}>
                {busy ? <><Spinner />{statusMsg}</> : `Deposit ${input || '0'} PAS as Collateral`}
            </button>
            {oracle.isCrashed && <StateNotice tone="error" message="Oracle is down — collateral deposits paused." />}
        </div>
    );
}

// ── Step 2: Borrow mUSDC ─────────────────────────────────────────────────
function BorrowStep({ depositedWei, maxBorrowAtoms, onSuccess }: {
    depositedWei: bigint;
    maxBorrowAtoms: bigint;
    onSuccess: () => void;
}) {
    const { oracle } = useGlobalProtocolData();
    const portfolio = useUserPortfolio();
    const actions = useProtocolActions(); const { data: ltvBpsRaw } = useReadContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'ltvBps' });
    const ltvBps = (ltvBpsRaw as bigint | undefined) ?? 6500n;
    const depositedDisplay = formatDisplayBalance(depositedWei, 18, 4);
    const collateralUsd = (Number(depositedWei) / 1e18) * (Number(oracle.price8) / 1e8);
    const maxBorrowDisplay = formatTokenAmount(maxBorrowAtoms, 6, 2, false);

    const [pct, setPct] = useState(75);
    const [manualInput, setManualInput] = useState('');

    const borrowAtoms: bigint = (() => {
        if (manualInput && Number(manualInput) > 0) {
            try { const v = parseUnits(manualInput, 6); return v > maxBorrowAtoms ? maxBorrowAtoms : v; } catch { return 0n; }
        }
        return maxBorrowAtoms > 0n ? (maxBorrowAtoms * BigInt(pct)) / 100n : 0n;
    })();

    const borrowDisplay = formatTokenAmount(borrowAtoms, 6, 2, false);

    const estimatedHealth: bigint = (() => {
        if (borrowAtoms === 0n || depositedWei === 0n || oracle.price8 === 0n) return BigInt('999999999999999999999');
        const collValueUsdc = (depositedWei * oracle.price8) / BigInt('100000000000000000000');
        if (collValueUsdc === 0n) return BigInt('999999999999999999999');
        return (collValueUsdc * BigInt('1000000000000000000')) / borrowAtoms;
    })();
    const healthNum = Number(estimatedHealth) / 1e18;
    const healthTone = healthNum > 100 ? 'green' : healthNum < 1.1 ? 'red' : healthNum < 1.3 ? 'yellow' : 'green';
    const liqPrice = oracle.price8 > 0n && depositedWei > 0n && borrowAtoms > 0n
        ? (Number(borrowAtoms) / 1e6) / ((Number(depositedWei) / 1e18) * (Number(ltvBps) / 10000))
        : null;

    const [busy, setBusy] = useState(false);
    const [success, setSuccess] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');

    const handleBorrow = async () => {
        if (borrowAtoms === 0n) return;
        setBusy(true);
        setStatusMsg('Waiting for MetaMask...');
        const res = await actions.borrowPas(borrowAtoms);
        if (res.ok) {
            setStatusMsg('Confirming borrow...');
            await portfolio.refresh();
            setSuccess(true);
            onSuccess();
        }
        setBusy(false);
        setStatusMsg('');
    };

    if (success) {
        return (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm"><Check /> Borrowed {borrowDisplay} mUSDC</div>
                <p className="text-xs text-slate-400">Your position is active. Manage repayments, view health, and withdraw collateral from your positions page.</p>
                <Link href="/dashboard"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-indigo-200 transition-colors">
                    View your position →
                </Link>
            </motion.div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 space-y-0">
                <InfoRow label="Collateral deposited" value={`${depositedDisplay} PAS (~$${collateralUsd.toFixed(2)})`} />
                <InfoRow label="Max borrowable" value={`${maxBorrowDisplay} mUSDC`} />
            </div>

            <div className="space-y-2">
                <div className="flex gap-2">
                    {[25, 50, 75, 100].map(p => (
                        <button key={p} onClick={() => { setPct(p); setManualInput(''); }}
                            className={cn('flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors',
                                pct === p && !manualInput ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10')}>
                            {p}%
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5">
                    <input type="number" min="0" step="any" placeholder={`Max: ${maxBorrowDisplay}`}
                        value={manualInput} onChange={e => { setManualInput(e.target.value); setPct(0); }}
                        className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                    <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2 py-0.5">mUSDC</span>
                </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 space-y-0">
                <InfoRow label="Borrowing" value={`${borrowDisplay} mUSDC`} />
                <InfoRow label="Health ratio (est.)" value={healthNum > 100 ? '∞' : healthNum.toFixed(2)} tone={healthTone} />
                {liqPrice !== null && <InfoRow label="Liquidation at" value={`$${liqPrice.toFixed(4)} / PAS`} />}
            </div>

            {healthNum < 1.3 && healthNum > 0 && healthNum <= 100 && (
                <StateNotice tone="warning" message="Health ratio is low — consider borrowing less to reduce liquidation risk." />
            )}

            <button onClick={handleBorrow} disabled={borrowAtoms === 0n || busy || (healthNum < 1.1 && healthNum > 0)}
                className={cn('w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2',
                    busy ? 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed'
                        : borrowAtoms === 0n ? 'bg-white/5 border border-white/10 text-slate-600 cursor-not-allowed'
                            : 'bg-emerald-700 hover:bg-emerald-600 text-white')}>
                {busy ? <><Spinner />{statusMsg}</> : `Borrow ${borrowDisplay} mUSDC`}
            </button>
        </div>
    );
}

// ── Hub Tab (2 steps) ─────────────────────────────────────────────────────
function HubTab() {
    const { isConnected, address } = useAccount();
    const portfolio = useUserPortfolio();
    const actions = useProtocolActions();
    const { oracle } = useGlobalProtocolData();

    type HubStep = 'deposit' | 'borrow' | 'done';
    const [step, setStep] = useState<HubStep>('deposit');
    const [depositedWei, setDepositedWei] = useState<bigint>(0n);
    const [maxBorrowAtoms, setMaxBorrowAtoms] = useState<bigint>(0n);

    // Pre-fetch max borrowable for existing collateral (handles returning users)
    const { data: mbRaw } = useReadContract({
        address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'maxBorrowable',
        args: [address ?? '0x0000000000000000000000000000000000000000'],
        query: { enabled: !!address },
    });

    // If user already deposited collateral in a prior session, jump straight to borrow step
    useEffect(() => {
        if (portfolio.loading || mbRaw === undefined) return;
        const alreadyActive = !!portfolio.pasPosition[7];
        const existingCollateral = portfolio.pasCollateralWallet;
        if (!alreadyActive && existingCollateral > 0n && step === 'deposit') {
            setDepositedWei(existingCollateral);
            setMaxBorrowAtoms((mbRaw as bigint) ?? 0n);
            setStep('borrow');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [portfolio.loading, portfolio.pasCollateralWallet, mbRaw]);

    const reset = () => { setStep('deposit'); setDepositedWei(0n); setMaxBorrowAtoms(0n); };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className={cn('font-medium', step === 'deposit' ? 'text-indigo-300' : 'text-emerald-400')}>1. Deposit Collateral</span>
                <span className="text-slate-600">→</span>
                <span className={cn('font-medium', step === 'borrow' ? 'text-indigo-300' : step === 'done' ? 'text-emerald-400' : 'text-slate-600')}>2. Borrow mUSDC</span>
            </div>

            {!isConnected && <StateNotice tone="info" message="Connect MetaMask via the header to continue." />}

            {isConnected && (
                <>
                    <AnimatePresence mode="wait">
                        {step === 'deposit' ? (
                            <motion.div key="dep-active" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5">
                                <SectionLabel n={1} label="Deposit PAS as Collateral" />
                                <DepositStep onSuccess={(wei, mb) => { setDepositedWei(wei); setMaxBorrowAtoms(mb); setStep('borrow'); }} />
                            </motion.div>
                        ) : (
                            <motion.div key="dep-done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="rounded-2xl border border-emerald-500/20 bg-emerald-900/10 p-4 flex items-center gap-3">
                                <Check />
                                <div className="text-sm">
                                    <span className="text-slate-400">Step 1 — </span>
                                    <span className="text-emerald-300">{formatDisplayBalance(depositedWei, 18, 4)} PAS deposited as collateral</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {(step === 'borrow' || step === 'done') && (
                            <motion.div key="borrow-panel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5">
                                <SectionLabel n={2} label="Borrow mUSDC" done={step === 'done'} />
                                <BorrowStep depositedWei={depositedWei} maxBorrowAtoms={maxBorrowAtoms} onSuccess={() => setStep('done')} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {step === 'done' && (
                        <button onClick={reset} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">← Start another borrow</button>
                    )}
                </>
            )}

            {isConnected && (portfolio.pasPosition[0] > 0n || portfolio.pasPosition[2] > 0n) && (
                <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-4 py-3 flex items-center justify-between gap-3">
                    <p className="text-xs text-slate-400">You have an active PAS borrow position.</p>
                    <Link href="/dashboard"
                        className="text-xs font-semibold text-indigo-300 hover:text-indigo-200 transition-colors shrink-0">
                        Manage position →
                    </Link>
                </div>
            )}
        </div>
    );
}

// ── People Tab (3 steps: Bridge → Deposit → Borrow) ───────────────────────
const XCM_LABELS: Record<XcmStatusStage, string> = {
    connecting: 'Connecting to People Chain...',
    building: 'Building XCM transaction...',
    awaiting_signature: 'Waiting for Talisman signature...',
    broadcasting: 'Broadcasting...',
    in_block: 'Waiting for PAS to arrive on Hub...',
    finalized: 'Waiting for PAS to arrive on Hub...',
};

function PeopleTab() {
    const { address: hubAddress, isConnected } = useAccount();
    const publicClient = usePublicClient();
    const { oracle } = useGlobalProtocolData();
    const { data: ltvBpsRaw } = useReadContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'ltvBps' });
    const ltvBps = (ltvBpsRaw as bigint | undefined) ?? 6500n;

    const [subAccounts, setSubAccounts] = useState<SubstrateAccount[]>([]);
    const [selectedAcc, setSelectedAcc] = useState<SubstrateAccount | null>(null);
    const [peopleBalance, setPeopleBalance] = useState('');
    const [talismanConnected, setTalismanConnected] = useState(false);

    const [bridgeAmount, setBridgeAmount] = useState('');
    const [bridgeStatus, setBridgeStatus] = useState('');
    const [bridging, setBridging] = useState(false);
    const [elapsedSec, setElapsedSec] = useState(0);
    const [arrivedWei, setArrivedWei] = useState<bigint | null>(null);

    const pollCleanupRef = useRef<(() => void) | null>(null);
    const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null);

    type PeopleStep = 'bridge' | 'deposit' | 'borrow' | 'done';
    const [step, setStep] = useState<PeopleStep>('bridge');
    const [depositedWei, setDepositedWei] = useState<bigint>(0n);
    const [maxBorrowAtoms, setMaxBorrowAtoms] = useState<bigint>(0n);

    const bridgePreview = useBorrowPreview(bridgeAmount, ltvBps, oracle.price8);

    useEffect(() => () => { pollCleanupRef.current?.(); if (elapsedRef.current) clearInterval(elapsedRef.current); }, []);

    async function connectTalisman() {
        setBridgeStatus('Connecting to Talisman...');
        try {
            const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
            const exts = await web3Enable('Kredio');
            if (!exts.length) { setBridgeStatus('No wallet extension found. Install Talisman.'); return; }
            const accounts = (await web3Accounts()) as SubstrateAccount[];
            const valid = accounts.filter(a => !a.type || a.type === 'sr25519' || a.type === 'ed25519');
            if (!valid.length) { setBridgeStatus('No Substrate accounts found.'); return; }
            setSubAccounts(valid);
            setSelectedAcc(valid[0]);
            setTalismanConnected(true);
            setBridgeStatus('');
            fetchPeopleBalance(valid[0].address).then(free => setPeopleBalance(formatPASFromPeople(free))).catch(() => setPeopleBalance('—'));
        } catch { setBridgeStatus('Failed to connect Talisman.'); }
    }

    async function handleBridge() {
        if (!selectedAcc || !hubAddress || !publicClient) return;
        setBridging(true);
        setElapsedSec(0);
        elapsedRef.current = setInterval(() => setElapsedSec(s => s + 1), 1000);
        const before = await publicClient.getBalance({ address: hubAddress });
        try {
            await sendXCMToHub({ senderAddress: selectedAcc.address, destinationEVM: hubAddress, amountPAS: bridgeAmount, onStatus: s => setBridgeStatus(XCM_LABELS[s]) });
            pollCleanupRef.current?.();
            pollCleanupRef.current = pollHubArrival({
                address: hubAddress, before, publicClient,
                onTick: () => { },
                onArrival: delta => {
                    setBridgeStatus(`+${formatPASFromEVM(delta)} PAS arrived on Hub`);
                    setBridging(false);
                    setArrivedWei(delta);
                    if (elapsedRef.current) clearInterval(elapsedRef.current);
                    setStep('deposit');
                },
            });
        } catch (err) {
            setBridgeStatus(`Error: ${err instanceof Error ? err.message : 'Unknown'}`);
            setBridging(false);
            if (elapsedRef.current) clearInterval(elapsedRef.current);
        }
    }

    const reset = () => { setStep('bridge'); setArrivedWei(null); setDepositedWei(0n); setMaxBorrowAtoms(0n); setBridgeStatus(''); };
    const stepsDone = { bridge: step !== 'bridge' && step !== undefined, deposit: step === 'borrow' || step === 'done', borrow: step === 'done' };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 flex-wrap">
                {(['bridge', 'deposit', 'borrow'] as const).map((s, i) => (
                    <span key={s} className="flex items-center gap-1.5">
                        {i > 0 && <span className="text-slate-600">→</span>}
                        <span className={cn('font-medium',
                            step === s ? 'text-indigo-300' : stepsDone[s] ? 'text-emerald-400' : 'text-slate-600')}>
                            {i + 1}. {s === 'bridge' ? 'Bridge' : s === 'deposit' ? 'Deposit Collateral' : 'Borrow mUSDC'}
                        </span>
                    </span>
                ))}
            </div>

            {!isConnected && <StateNotice tone="info" message="Connect MetaMask via the header first." />}

            {isConnected && (
                <>
                    {/* Step 1 */}
                    <AnimatePresence mode="wait">
                        {step === 'bridge' ? (
                            <motion.div key="bridge-active" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 space-y-4">
                                <SectionLabel n={1} label="Bridge PAS from People Chain" />
                                {!talismanConnected ? (
                                    <button onClick={connectTalisman} className="w-full rounded-xl px-4 py-3 text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-2">
                                        Connect Talisman
                                    </button>
                                ) : (
                                    <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-3 py-2 flex items-center gap-2 text-xs">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                                        <span className="text-purple-200 truncate">{selectedAcc?.meta?.name ?? (selectedAcc?.address.slice(0, 14) + '...')}</span>
                                        <span className="ml-auto text-slate-400 shrink-0">{peopleBalance} PAS</span>
                                    </div>
                                )}
                                {subAccounts.length > 1 && (
                                    <select value={selectedAcc?.address} onChange={e => { const a = subAccounts.find(x => x.address === e.target.value); if (a) setSelectedAcc(a); }}
                                        className="w-full rounded-xl border border-white/10 bg-black/40 text-sm text-white px-3 py-2 outline-none">
                                        {subAccounts.map(a => <option key={a.address} value={a.address}>{a.meta?.name ?? a.address.slice(0, 20) + '...'}</option>)}
                                    </select>
                                )}
                                {talismanConnected && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-wide text-slate-400">PAS amount to bridge</label>
                                            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                                                <input type="number" min="0" step="any" placeholder="0.0" value={bridgeAmount} onChange={e => setBridgeAmount(e.target.value)} disabled={bridging}
                                                    className="flex-1 bg-transparent text-xl font-light text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                                <span className="text-xs font-semibold text-pink-300 bg-pink-500/10 border border-pink-500/20 rounded-lg px-2.5 py-1">PAS</span>
                                            </div>
                                            <div className="text-xs text-slate-500 px-1 flex gap-4">
                                                <span>Arrives at: <span className="font-mono text-slate-400">{hubAddress?.slice(0, 8)}…{hubAddress?.slice(-6)}</span></span>
                                                <span>~30 seconds</span>
                                            </div>
                                        </div>
                                        <div className={cn('rounded-xl border px-4 py-3 space-y-0 transition-opacity',
                                            bridgeAmount && Number(bridgeAmount) > 0 ? 'border-white/10 bg-black/30' : 'border-white/5 bg-black/10 opacity-35 pointer-events-none')}>
                                            <InfoRow label="Projected collateral value" value={bridgePreview ? `~$${bridgePreview.collateralUsd.toFixed(2)}` : '—'} />
                                            <InfoRow label="Max borrowable" value={bridgePreview ? `~${formatTokenAmount(bridgePreview.maxBorrowAtoms, 6, 2, false)} mUSDC` : '—'} tone="green" />
                                            <InfoRow label="PAS price" value={bridgePreview ? `$${bridgePreview.oraclePriceNum.toFixed(4)}` : '—'} />
                                        </div>
                                        {bridgeStatus && (
                                            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2.5 space-y-1">
                                                <div className="flex items-center gap-2 text-xs text-blue-200">{bridging && <Spinner small />}{bridgeStatus}</div>
                                                {bridging && <div className="text-xs text-slate-500">{elapsedSec}s elapsed</div>}
                                            </div>
                                        )}
                                        <button onClick={handleBridge} disabled={!bridgeAmount || Number(bridgeAmount) <= 0 || bridging}
                                            className={cn('w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all flex items-center justify-center gap-2',
                                                bridging || !bridgeAmount || Number(bridgeAmount) <= 0
                                                    ? 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed'
                                                    : 'bg-purple-600 hover:bg-purple-500')}>
                                            {bridging ? <><Spinner />Bridging...</> : `Bridge ${bridgeAmount || '0'} PAS to Hub`}
                                        </button>
                                    </>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div key="bridge-done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="rounded-2xl border border-emerald-500/20 bg-emerald-900/10 p-4 flex items-center gap-3">
                                <Check />
                                <div className="text-sm">
                                    <span className="text-slate-400">Step 1 — </span>
                                    <span className="text-emerald-300">+{arrivedWei ? formatPASFromEVM(arrivedWei) : bridgeAmount} PAS arrived on Hub</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Step 2 */}
                    <AnimatePresence>
                        {(step === 'deposit' || step === 'borrow' || step === 'done') && (
                            <motion.div key="dep-panel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                                {step === 'deposit' ? (
                                    <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5">
                                        <SectionLabel n={2} label="Deposit PAS as Collateral" />
                                        <DepositStep
                                            prefillAmount={arrivedWei ? Number(formatUnits(arrivedWei, 18)).toFixed(6) : undefined}
                                            onSuccess={(wei, mb) => { setDepositedWei(wei); setMaxBorrowAtoms(mb); setStep('borrow'); }}
                                        />
                                    </div>
                                ) : (
                                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/10 p-4 flex items-center gap-3">
                                        <Check />
                                        <div className="text-sm">
                                            <span className="text-slate-400">Step 2 — </span>
                                            <span className="text-emerald-300">{formatDisplayBalance(depositedWei, 18, 4)} PAS deposited as collateral</span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Step 3 */}
                    <AnimatePresence>
                        {(step === 'borrow' || step === 'done') && (
                            <motion.div key="borrow-panel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5">
                                <SectionLabel n={3} label="Borrow mUSDC" done={step === 'done'} />
                                <BorrowStep depositedWei={depositedWei} maxBorrowAtoms={maxBorrowAtoms} onSuccess={() => setStep('done')} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {step === 'done' && (
                        <button onClick={reset} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">← Start another borrow</button>
                    )}
                </>
            )}
        </div>
    );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function BorrowPasPage() {
    const [source, setSource] = useState<SourceTab>('hub');
    const tabCls = (active: boolean) => cn(
        'px-4 py-2 rounded-xl text-xs font-semibold border transition-colors',
        active ? 'bg-white text-black border-white' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
    );
    return (
        <PageShell title="Borrow" subtitle="Deposit PAS as collateral and borrow mUSDC from KredioPASMarket.">
            <div className="max-w-lg mx-auto space-y-4">
                <div className="inline-flex gap-1 rounded-xl border border-white/10 bg-black/30 p-1">
                    <button className={tabCls(source === 'hub')} onClick={() => setSource('hub')}>PAS on Hub</button>
                    <button className={tabCls(source === 'people')} onClick={() => setSource('people')}>PAS on People Chain</button>
                </div>
                <AnimatePresence mode="wait">
                    <motion.div key={source} initial={{ opacity: 0, x: source === 'hub' ? -8 : 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                        {source === 'hub' ? <HubTab /> : <PeopleTab />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </PageShell>
    );
}
