'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useAccount, useBalance, useReadContract, usePublicClient, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { motion, AnimatePresence } from 'framer-motion';
import {
    fetchPeopleBalance, formatPASFromEVM, formatPASFromPeople,
    pollHubArrival, sendXCMToHub, type XcmStatusStage,
} from '../../../lib/xcm';
import config from '../../../lib/addresses';
import { ABIS } from '../../../lib/constants';
import { formatDisplayBalance, formatTokenAmount, cn } from '../../../lib/utils';
import { PageShell, StateNotice } from '../../../components/modules/ProtocolUI';
import { useGlobalProtocolData, useUserPortfolio } from '../../../hooks/useProtocolData';
import { useActionLog } from '../../../components/providers/ActionLogProvider';
import { parseUsdcInput } from '../../../lib/input';
import { useAccess } from '../../../hooks/useAccess';

const GAS_BUFFER = parseUnits('0.01', 18);
type SourceTab = 'musdc' | 'swap' | 'bridge';
type SubstrateAccount = { address: string; type?: string; meta?: { name?: string } };

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
            <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                done ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30')}>
                {done ? '✓' : n}
            </div>
            <span className="text-sm font-semibold text-white">{label}</span>
        </div>
    );
}
function InfoRow({ label, value, tone }: { label: string; value: string; tone?: 'green' | 'yellow' | 'red' }) {
    return (
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
            <span className="text-slate-400">{label}</span>
            <span className={cn('font-medium',
                tone === 'green' ? 'text-emerald-300' : tone === 'yellow' ? 'text-amber-300' : tone === 'red' ? 'text-rose-300' : 'text-white'
            )}>{value}</span>
        </div>
    );
}

/* ── Seamless Approve + Deposit card ───────────────────────────────────── */
type LendPhase = 'idle' | 'approving' | 'approved' | 'depositing' | 'success';

function LendDepositCard({
    prefillAmount, onSuccess, contractAddr, market,
}: {
    prefillAmount?: string;
    onSuccess?: (amount: string) => void;
    contractAddr: `0x${string}`;
    market: 'pas' | 'lending';
}) {
    const { address, isConnected } = useAccount();
    const { isWrongNetwork } = useAccess();
    const { logAction } = useActionLog();
    const { pasMarket } = useGlobalProtocolData();
    const portfolio = useUserPortfolio();

    const [amountInput, setAmountInput] = useState(prefillAmount ?? '');
    const [phase, setPhase] = useState<LendPhase>('idle');
    const [dismissed, setDismissed] = useState(false);
    useEffect(() => { if (prefillAmount) setAmountInput(prefillAmount); }, [prefillAmount]);

    const amountAtoms = parseUsdcInput(amountInput);
    const { data: balRaw } = useReadContract({
        address: config.mUSDC, abi: ABIS.ERC20, functionName: 'balanceOf',
        args: [address ?? '0x0000000000000000000000000000000000000000'],
        query: { enabled: !!address },
    });
    const musdcBalance = (balRaw as bigint | undefined) ?? 0n;
    const utilBps = pasMarket.utilizationBps;
    // Estimated lender APY: avg borrow rate (~10%) × utilization × 90% (after 10% protocol fee)
    const aprNum = (Number(utilBps) / 10000) * 9;
    const aprDisplay = utilBps === 0n ? '—' : `${aprNum.toFixed(2)}%`;
    const yearlyYield = amountAtoms && utilBps > 0n ? (Number(amountAtoms) / 1e6) * (aprNum / 100) : 0;

    const { writeContract: writeApprove, data: approveHash, isPending: approveSigning, reset: resetApprove } = useWriteContract();
    const { isSuccess: approveSuccess } = useWaitForTransactionReceipt({ hash: approveHash });
    const { writeContract: writeDeposit, data: depositHash, isPending: depositSigning, reset: resetDeposit } = useWriteContract();
    const { isSuccess: depositSuccess } = useWaitForTransactionReceipt({ hash: depositHash });

    useEffect(() => { if (approveSigning) setPhase('approving'); }, [approveSigning]);
    useEffect(() => { if (depositSigning) setPhase('depositing'); }, [depositSigning]);
    useEffect(() => {
        if (!approveSuccess || !amountAtoms) return;
        setPhase('approved');
        setTimeout(() => writeDeposit({ address: contractAddr, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'deposit', args: [amountAtoms] }), 300);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [approveSuccess]);
    useEffect(() => {
        if (!depositSuccess) return;
        setPhase('success'); portfolio.refresh();
        logAction({ level: 'success', action: `Deposit mUSDC (${market})`, detail: `Deposited ${amountInput} mUSDC`, market });
        onSuccess?.(amountInput);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [depositSuccess]);

    const handleLend = () => {
        if (!amountAtoms || !isConnected || isWrongNetwork) return;
        resetApprove(); resetDeposit(); setPhase('approving');
        writeApprove({ address: config.mUSDC, abi: ABIS.ERC20, functionName: 'approve', args: [contractAddr, amountAtoms] });
    };
    const reset = () => { setPhase('idle'); setAmountInput(''); resetApprove(); resetDeposit(); };
    const isProcessing = phase === 'approving' || phase === 'approved' || phase === 'depositing';
    const btnLabel = phase === 'approving' ? 'Step 1/2 — Approving…' : phase === 'approved' ? 'Approved ✓' : phase === 'depositing' ? 'Step 2/2 — Depositing…' : amountInput ? `Lend ${amountInput} mUSDC` : 'Lend mUSDC';

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-slate-400">Amount (mUSDC)</label>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                    <input type="number" min="0" step="any" placeholder="0.00" value={amountInput}
                        onChange={e => setAmountInput(e.target.value)} disabled={isProcessing || phase === 'success'}
                        className="flex-1 bg-transparent text-xl font-light text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                    <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2.5 py-1">mUSDC</span>
                </div>
                <div className="text-xs px-1 text-slate-500">Balance: <span className="text-slate-300">{formatDisplayBalance(musdcBalance, 6, 4)} mUSDC</span></div>
            </div>
            <div className={cn('rounded-xl border px-4 py-3 transition-opacity', amountInput && Number(amountInput) > 0 ? 'border-white/10 bg-black/30' : 'border-white/5 bg-black/10 opacity-35 pointer-events-none')}>
                <InfoRow label="Pool APY (est.)" value={aprDisplay} />
                <InfoRow label="Pool utilization" value={`${(Number(utilBps) / 100).toFixed(2)}%`} />
                <InfoRow label="Your yield / year (est.)" value={`~${yearlyYield.toFixed(4)} mUSDC`} />
            </div>
            {!dismissed && !isProcessing && phase !== 'success' && (
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2.5 flex items-start justify-between gap-2">
                    <p className="text-xs text-blue-200">ℹ 2 wallet confirmations required: approve, then deposit.</p>
                    <button onClick={() => setDismissed(true)} className="text-slate-500 hover:text-white text-xs shrink-0">✕</button>
                </div>
            )}
            <AnimatePresence>
                {isProcessing && (
                    <motion.div key="prog" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 space-y-2">
                        <div className="flex items-center gap-3">
                            <div className={cn('flex items-center gap-2 text-xs flex-1', phase === 'approved' || phase === 'depositing' ? 'text-emerald-400' : 'text-indigo-300')}>
                                {phase === 'approved' || phase === 'depositing' ? <Check /> : <Spinner small />} Step 1/2 — Approve
                            </div>
                            <div className={cn('flex items-center gap-2 text-xs flex-1', phase === 'depositing' ? 'text-indigo-300' : 'text-slate-600')}>
                                {phase === 'depositing' ? <Spinner small /> : <span className="w-4 h-4" />} Step 2/2 — Deposit
                            </div>
                        </div>
                        <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                            <motion.div className="h-full bg-indigo-500 rounded-full" initial={{ width: '0%' }}
                                animate={{ width: phase === 'approved' ? '50%' : phase === 'depositing' ? '75%' : '25%' }} transition={{ duration: 0.4 }} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {phase === 'success' && (
                    <motion.div key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-2">
                        <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm"><Check /> Deposited {amountInput} mUSDC</div>
                        <InfoRow label="Earning" value={`${aprDisplay} APY`} />
                        <InfoRow label="Est. yield / year" value={`~${yearlyYield.toFixed(4)} mUSDC`} />
                        <Link href="/dashboard"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-indigo-200 transition-colors mt-1">
                            View your position →
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
            {phase !== 'success' ? (
                <button onClick={handleLend} disabled={!amountAtoms || isProcessing || !isConnected}
                    className={cn('w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2',
                        isProcessing ? 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed'
                            : !amountAtoms || !isConnected ? 'bg-white/5 border border-white/10 text-slate-600 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white')}>
                    {isProcessing && <Spinner />}{btnLabel}
                </button>
            ) : (
                <button onClick={reset} className="w-full rounded-xl px-4 py-3 text-sm font-semibold border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition-colors">
                    Lend more mUSDC
                </button>
            )}
            {!isConnected && <StateNotice tone="info" message="Connect MetaMask via the header to lend." />}
        </div>
    );
}

/* ── Swap step (PAS → mUSDC via KredioSwap) ────────────────────────────── */
function SwapStep({ onSuccess }: { onSuccess: (receivedMusdc: string) => void }) {
    const { address } = useAccount();
    const { data: balData } = useBalance({ address });
    const pasBalance = balData?.value ?? 0n;
    const { oracle } = useGlobalProtocolData();
    const [amount, setAmount] = useState('');
    const [debouncedAmount, setDebouncedAmount] = useState('');
    useEffect(() => { const t = setTimeout(() => setDebouncedAmount(amount), 300); return () => clearTimeout(t); }, [amount]);
    const pasWeiD = (() => { try { return debouncedAmount && Number(debouncedAmount) > 0 ? parseUnits(debouncedAmount, 18) : 0n; } catch { return 0n; } })();
    const pasWei = (() => { try { return amount && Number(amount) > 0 ? parseUnits(amount, 18) : 0n; } catch { return 0n; } })();
    const { data: quoteResult, isFetching: quoteFetching } = useReadContract({
        address: config.swap, abi: ABIS.KREDIO_SWAP, functionName: 'quoteSwap', args: [pasWeiD],
        query: { enabled: pasWeiD > 0n && !oracle.isCrashed },
    });
    const { data: feeBpsRaw } = useReadContract({ address: config.swap, abi: ABIS.KREDIO_SWAP, functionName: 'feeBps' });
    const feeBps = (feeBpsRaw as bigint | undefined) ?? 30n;
    const { writeContract, data: txHash, isPending: isSigning, reset: resetWrite } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });
    const lastQuoteRef = useRef<bigint>(0n);
    useEffect(() => {
        if (!isSuccess) return;
        const received = formatTokenAmount(lastQuoteRef.current, 6, 4, false);
        onSuccess(received); resetWrite();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);
    const busy = isSigning || isConfirming;
    const overBalance = pasWei > 0n && pasWei > pasBalance;
    const hasQuote = !quoteFetching && quoteResult !== undefined && pasWeiD > 0n;
    const quoteDisplay = hasQuote ? formatTokenAmount(quoteResult as bigint, 6, 4, false) : null;
    const oraclePrice = oracle.price8 > 0n ? Number(oracle.price8) / 1e8 : null;
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-slate-400">PAS to swap</label>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                    <input type="number" min="0" step="any" placeholder="0.0" value={amount}
                        onChange={e => setAmount(e.target.value)} disabled={busy}
                        className="flex-1 bg-transparent text-xl font-light text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                    <span className="text-xs font-semibold text-pink-300 bg-pink-500/10 border border-pink-500/20 rounded-lg px-2.5 py-1">PAS</span>
                </div>
                <div className="flex justify-between text-xs px-1">
                    <span className="text-slate-500">Balance: <span className="text-slate-300">{formatDisplayBalance(pasBalance, 18, 4)} PAS</span></span>
                    <button onClick={() => { const mx = pasBalance > GAS_BUFFER ? pasBalance - GAS_BUFFER : 0n; setAmount(Number(formatUnits(mx, 18)).toFixed(6)); }}
                        disabled={busy} className="text-indigo-400 hover:text-indigo-300 font-medium disabled:opacity-40">Max</button>
                </div>
                {overBalance && <p className="text-xs text-rose-400 px-1">Amount exceeds balance</p>}
            </div>
            <div className={cn('flex items-center gap-2 rounded-xl border px-4 py-3 transition-colors', hasQuote ? 'border-emerald-500/20 bg-emerald-900/10' : 'border-white/5 bg-black/20')}>
                <div className="flex-1">
                    {quoteFetching && pasWeiD > 0n ? <span className="flex items-center gap-2 text-slate-500 text-sm"><Spinner small />Calculating...</span>
                        : quoteDisplay ? <span className="text-2xl font-light text-emerald-300">{quoteDisplay}</span>
                            : <span className="text-2xl font-light text-slate-600">—</span>}
                </div>
                <span className={cn('text-xs font-semibold rounded-lg px-2.5 py-1', hasQuote ? 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/20' : 'text-slate-600 bg-white/5 border border-white/10')}>mUSDC</span>
            </div>
            <div className={cn('rounded-xl border px-4 py-3 transition-opacity', hasQuote ? 'border-white/10 bg-black/30' : 'border-white/5 bg-black/10 opacity-35 pointer-events-none')}>
                <InfoRow label="Rate" value={oraclePrice ? `1 PAS ≈ $${oraclePrice.toFixed(4)}` : '—'} />
                <InfoRow label={`Fee (${Number(feeBps) / 100}%)`} value={hasQuote ? `${formatTokenAmount(((quoteResult as bigint) * feeBps) / (10000n - feeBps), 6, 4, false)} mUSDC` : '—'} />
            </div>
            <button onClick={() => {
                if (!amount || !quoteResult) return;
                lastQuoteRef.current = quoteResult as bigint;
                writeContract({ address: config.swap, abi: ABIS.KREDIO_SWAP, functionName: 'swap', args: [((quoteResult as bigint) * 99n) / 100n], value: pasWei });
            }} disabled={!amount || Number(amount) <= 0 || overBalance || busy || oracle.isCrashed || !quoteResult}
                className={cn('w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2',
                    busy ? 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed'
                        : !amount || overBalance || oracle.isCrashed || !quoteResult ? 'bg-white/5 border border-white/10 text-slate-600 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white')}>
                {busy ? <><Spinner />{isSigning ? 'Waiting for MetaMask…' : 'Confirming…'}</> : `Swap ${amount || '0'} PAS → mUSDC`}
            </button>
            {oracle.isCrashed && <StateNotice tone="error" message="Oracle is down — swaps paused." />}
        </div>
    );
}

/* ── Swap & Lend tab (2-step) ────────────────────────────────────────────── */
function SwapAndLendTab({ contractAddr, market }: { contractAddr: `0x${string}`; market: 'pas' | 'lending' }) {
    type Step = 'swap' | 'lend' | 'done';
    const [step, setStep] = useState<Step>('swap');
    const [swappedMusdc, setSwappedMusdc] = useState('');
    const reset = () => { setStep('swap'); setSwappedMusdc(''); };
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className={cn('font-medium', step === 'swap' ? 'text-indigo-300' : 'text-emerald-400')}>1. Swap PAS → mUSDC</span>
                <span className="text-slate-600">→</span>
                <span className={cn('font-medium', step === 'lend' ? 'text-indigo-300' : step === 'done' ? 'text-emerald-400' : 'text-slate-600')}>2. Lend mUSDC</span>
            </div>
            <AnimatePresence mode="wait">
                {step === 'swap' ? (
                    <motion.div key="s" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                        className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5">
                        <SectionLabel n={1} label="Swap PAS → mUSDC" />
                        <SwapStep onSuccess={r => { setSwappedMusdc(r); setStep('lend'); }} />
                    </motion.div>
                ) : (
                    <motion.div key="sd" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="rounded-2xl border border-emerald-500/20 bg-emerald-900/10 p-4 flex items-center gap-3">
                        <Check />
                        <div className="text-sm"><span className="text-slate-400">Step 1 — </span><span className="text-emerald-300">Swapped PAS → {swappedMusdc} mUSDC</span></div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {(step === 'lend' || step === 'done') && (
                    <motion.div key="l" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5">
                        <SectionLabel n={2} label="Lend mUSDC" done={step === 'done'} />
                        <LendDepositCard prefillAmount={swappedMusdc} onSuccess={() => setStep('done')} contractAddr={contractAddr} market={market} />
                    </motion.div>
                )}
            </AnimatePresence>
            {step === 'done' && <button onClick={reset} className="text-xs text-indigo-400 hover:text-indigo-300">← Start again</button>}
        </div>
    );
}

/* ── Bridge & Lend tab (3-step) ──────────────────────────────────────────── */
const XCM_LABELS: Record<XcmStatusStage, string> = {
    connecting: 'Connecting to People Chain…',
    building: 'Building XCM transaction…',
    awaiting_signature: 'Waiting for Talisman signature…',
    broadcasting: 'Broadcasting…',
    in_block: 'Waiting for PAS to arrive on Hub…',
    finalized: 'Waiting for PAS to arrive on Hub…',
};

function BridgeAndLendTab({ contractAddr, market }: { contractAddr: `0x${string}`; market: 'pas' | 'lending' }) {
    const { address: hubAddress, isConnected } = useAccount();
    const publicClient = usePublicClient();
    const { oracle } = useGlobalProtocolData();
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
    type BStep = 'bridge' | 'swap' | 'lend' | 'done';
    const [step, setStep] = useState<BStep>('bridge');
    const [swappedMusdc, setSwappedMusdc] = useState('');
    const previewMusdc = (() => {
        if (!bridgeAmount || Number(bridgeAmount) <= 0 || oracle.price8 === 0n) return null;
        try {
            const pw = parseUnits(bridgeAmount, 18);
            const atoms = (pw * oracle.price8 * 9970n) / (BigInt('100000000000000000000000000') * 10000n);
            return formatTokenAmount(atoms, 6, 2, false);
        } catch { return null; }
    })();
    useEffect(() => () => { pollCleanupRef.current?.(); if (elapsedRef.current) clearInterval(elapsedRef.current); }, []);

    async function connectTalisman() {
        setBridgeStatus('Connecting to Talisman…');
        try {
            const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
            const exts = await web3Enable('Kredio');
            if (!exts.length) { setBridgeStatus('No wallet extension found. Install Talisman.'); return; }
            const accounts = (await web3Accounts()) as SubstrateAccount[];
            const valid = accounts.filter(a => !a.type || a.type === 'sr25519' || a.type === 'ed25519');
            if (!valid.length) { setBridgeStatus('No Substrate accounts found.'); return; }
            setSubAccounts(valid); setSelectedAcc(valid[0]); setTalismanConnected(true); setBridgeStatus('');
            fetchPeopleBalance(valid[0].address).then(f => setPeopleBalance(formatPASFromPeople(f))).catch(() => setPeopleBalance('—'));
        } catch { setBridgeStatus('Failed to connect Talisman.'); }
    }

    async function handleBridge() {
        if (!selectedAcc || !hubAddress || !publicClient) return;
        setBridging(true); setElapsedSec(0);
        elapsedRef.current = setInterval(() => setElapsedSec(s => s + 1), 1000);
        const before = await publicClient.getBalance({ address: hubAddress });
        try {
            await sendXCMToHub({ senderAddress: selectedAcc.address, destinationEVM: hubAddress, amountPAS: bridgeAmount, onStatus: s => setBridgeStatus(XCM_LABELS[s]) });
            pollCleanupRef.current?.();
            pollCleanupRef.current = pollHubArrival({
                address: hubAddress, before, publicClient, onTick: () => { },
                onArrival: delta => {
                    setBridgeStatus(`+${formatPASFromEVM(delta)} PAS arrived on Hub`);
                    setBridging(false); setArrivedWei(delta);
                    if (elapsedRef.current) clearInterval(elapsedRef.current);
                    setStep('swap');
                },
            });
        } catch (err) {
            setBridgeStatus(`Error: ${err instanceof Error ? err.message : 'Unknown'}`);
            setBridging(false);
            if (elapsedRef.current) clearInterval(elapsedRef.current);
        }
    }

    const reset = () => { setStep('bridge'); setArrivedWei(null); setSwappedMusdc(''); setBridgeStatus(''); };
    const stepsDone = { bridge: step !== 'bridge', swap: step === 'lend' || step === 'done', lend: step === 'done' };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 flex-wrap">
                {(['bridge', 'swap', 'lend'] as const).map((s, i) => (
                    <span key={s} className="flex items-center gap-1.5">
                        {i > 0 && <span className="text-slate-600">→</span>}
                        <span className={cn('font-medium', step === s ? 'text-indigo-300' : stepsDone[s] ? 'text-emerald-400' : 'text-slate-600')}>
                            {i + 1}. {s === 'bridge' ? 'Bridge PAS' : s === 'swap' ? 'Swap → mUSDC' : 'Lend mUSDC'}
                        </span>
                    </span>
                ))}
            </div>
            {!isConnected && <StateNotice tone="info" message="Connect MetaMask via the header first." />}
            {isConnected && (
                <>
                    <AnimatePresence mode="wait">
                        {step === 'bridge' ? (
                            <motion.div key="ba" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 space-y-4">
                                <SectionLabel n={1} label="Bridge PAS from People Chain to Hub" />
                                {!talismanConnected ? (
                                    <button onClick={connectTalisman}
                                        className="w-full rounded-xl px-4 py-3 text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white">
                                        Connect Talisman
                                    </button>
                                ) : (
                                    <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-3 py-2 flex items-center gap-2 text-xs">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                                        <span className="text-purple-200 truncate">{selectedAcc?.meta?.name ?? (selectedAcc?.address.slice(0, 14) + '…')}</span>
                                        <span className="ml-auto text-slate-400 shrink-0">{peopleBalance} PAS</span>
                                    </div>
                                )}
                                {subAccounts.length > 1 && (
                                    <select value={selectedAcc?.address}
                                        onChange={e => { const a = subAccounts.find(x => x.address === e.target.value); if (a) setSelectedAcc(a); }}
                                        className="w-full rounded-xl border border-white/10 bg-black/40 text-sm text-white px-3 py-2 outline-none">
                                        {subAccounts.map(a => <option key={a.address} value={a.address}>{a.meta?.name ?? a.address.slice(0, 20) + '…'}</option>)}
                                    </select>
                                )}
                                {talismanConnected && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-wide text-slate-400">PAS amount to bridge</label>
                                            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                                                <input type="number" min="0" step="any" placeholder="0.0" value={bridgeAmount}
                                                    onChange={e => setBridgeAmount(e.target.value)} disabled={bridging}
                                                    className="flex-1 bg-transparent text-xl font-light text-white placeholder-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                                <span className="text-xs font-semibold text-pink-300 bg-pink-500/10 border border-pink-500/20 rounded-lg px-2.5 py-1">PAS</span>
                                            </div>
                                        </div>
                                        <div className={cn('rounded-xl border px-4 py-3 transition-opacity', bridgeAmount && Number(bridgeAmount) > 0 ? 'border-white/10 bg-black/30' : 'border-white/5 bg-black/10 opacity-35 pointer-events-none')}>
                                            <InfoRow label="Expected mUSDC after swap" value={previewMusdc ? `~${previewMusdc} mUSDC` : '—'} tone="green" />
                                            <InfoRow label="PAS price" value={oracle.price8 > 0n ? `$${(Number(oracle.price8) / 1e8).toFixed(4)}` : '—'} />
                                            <InfoRow label="Estimated time" value="~30 seconds" />
                                        </div>
                                        {bridgeStatus && (
                                            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2.5 space-y-1">
                                                <div className="flex items-center gap-2 text-xs text-blue-200">{bridging && <Spinner small />}{bridgeStatus}</div>
                                                {bridging && <div className="text-xs text-slate-500">{elapsedSec}s elapsed</div>}
                                            </div>
                                        )}
                                        <button onClick={handleBridge}
                                            disabled={!bridgeAmount || Number(bridgeAmount) <= 0 || bridging}
                                            className={cn('w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all flex items-center justify-center gap-2',
                                                bridging || !bridgeAmount || Number(bridgeAmount) <= 0 ? 'bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500')}>
                                            {bridging ? <><Spinner />Bridging…</> : `Bridge ${bridgeAmount || '0'} PAS to Hub`}
                                        </button>
                                    </>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="rounded-2xl border border-emerald-500/20 bg-emerald-900/10 p-4 flex items-center gap-3">
                                <Check />
                                <div className="text-sm"><span className="text-slate-400">Step 1 — </span><span className="text-emerald-300">+{arrivedWei ? formatPASFromEVM(arrivedWei) : bridgeAmount} PAS arrived on Hub</span></div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {(step === 'swap' || step === 'lend' || step === 'done') && (
                            <motion.div key="sp" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                                {step === 'swap' ? (
                                    <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5">
                                        <SectionLabel n={2} label="Swap PAS → mUSDC" />
                                        <SwapStep onSuccess={r => { setSwappedMusdc(r); setStep('lend'); }} />
                                    </div>
                                ) : (
                                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/10 p-4 flex items-center gap-3">
                                        <Check />
                                        <div className="text-sm"><span className="text-slate-400">Step 2 — </span><span className="text-emerald-300">Swapped → {swappedMusdc} mUSDC</span></div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {(step === 'lend' || step === 'done') && (
                            <motion.div key="lp" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5">
                                <SectionLabel n={3} label="Lend mUSDC" done={step === 'done'} />
                                <LendDepositCard prefillAmount={swappedMusdc} onSuccess={() => setStep('done')} contractAddr={contractAddr} market={market} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {step === 'done' && <button onClick={reset} className="text-xs text-indigo-400 hover:text-indigo-300">← Start again</button>}
                </>
            )}
        </div>
    );
}

/* ── Main page ──────────────────────────────────────────────────────────── */
export default function LendPasPage() {
    const [source, setSource] = useState<SourceTab>('musdc');
    const tabCls = (active: boolean) => cn(
        'px-3 py-2 rounded-xl text-xs font-semibold border transition-colors',
        active ? 'bg-white text-black border-white' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
    );
    return (
        <PageShell title="Lend" subtitle="Earn yield by lending mUSDC to the PAS-collateral pool. Source from mUSDC, Hub PAS, or People Chain PAS.">
            <div className="max-w-lg mx-auto space-y-4">
                <div className="inline-flex gap-1 rounded-xl border border-white/10 bg-black/30 p-1">
                    <button className={tabCls(source === 'musdc')} onClick={() => setSource('musdc')}>mUSDC</button>
                    <button className={tabCls(source === 'swap')} onClick={() => setSource('swap')}>Swap &amp; Lend</button>
                    <button className={tabCls(source === 'bridge')} onClick={() => setSource('bridge')}>Bridge &amp; Lend</button>
                </div>
                <AnimatePresence mode="wait">
                    <motion.div key={source}
                        initial={{ opacity: 0, x: source === 'musdc' ? -8 : 8 }}
                        animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                        {source === 'musdc' && (
                            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5">
                                <h2 className="text-base font-semibold text-white mb-4">Lend mUSDC directly</h2>
                                <LendDepositCard contractAddr={config.pasMarket} market="pas" />
                            </div>
                        )}
                        {source === 'swap' && <SwapAndLendTab contractAddr={config.pasMarket} market="pas" />}
                        {source === 'bridge' && <BridgeAndLendTab contractAddr={config.pasMarket} market="pas" />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </PageShell>
    );
}
