'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAccount, usePublicClient, useChainId, useSwitchChain } from 'wagmi';
import { formatEther } from 'viem';
import {
    fetchPeopleBalance,
    formatPASFromEVM,
    formatPASFromPeople,
    pollHubArrival,
    sendXCMToHub,
    type XcmStatusStage,
} from '../../lib/xcm';
import {
    PageShell,
    Panel,
    StatRow,
    StateNotice,
    ActionButton,
} from '../../components/modules/ProtocolUI';
import {
    useEthBridge,
    ETH_BRIDGE_CHAINS,
    type BridgeStatus,
} from '../../hooks/useEthBridge';
import { BRIDGE, CONTRACTS } from '../../config/contracts';
import { cn } from '../../lib/utils';

// ─── Constants ─────────────────────────────────────────────────────────────
const MIN_ETH = 0.001;
const MAX_ETH = 1;

function explorerTx(chainId: number, txHash: string) {
    if (chainId === BRIDGE.SEPOLIA_CHAIN_ID) return `https://sepolia.etherscan.io/tx/${txHash}`;
    // Hub Testnet - Blockscout
    return `https://blockscout-testnet.polkadot.io/tx/${txHash}`;
}

// ─── XCM types ──────────────────────────────────────────────────────────────
type SubstrateAccount = { address: string; type?: string; meta?: { name?: string } };

const XCM_STAGE_LABELS: Record<XcmStatusStage, string> = {
    connecting: 'Connecting to People Chain',
    building: 'Building XCM transaction',
    awaiting_signature: 'Waiting for signature',
    broadcasting: 'Broadcasting to network',
    in_block: 'In block on People Chain',
    finalized: 'Finalized - awaiting Hub arrival',
};

const XCM_STAGES: XcmStatusStage[] = [
    'connecting', 'building', 'awaiting_signature', 'broadcasting', 'in_block', 'finalized',
];

// ─── ETH pipeline status labels (chain-prefixed) ──────────────────────────────────
const BRIDGE_STATUS_LABELS: Partial<Record<BridgeStatus, string>> = {
    'switching-chain': '[Sepolia] Switching network…',
    'depositing': '[Sepolia] Locking ETH in inbox contract…',
    'awaiting-receipt': '[Sepolia] Waiting for confirmation…',
    'verifying': '[Sepolia → Hub] Verifying deposit & minting…',
    'minting': '[Hub] Minting mUSDC on Polkadot Hub…',
};
function statusToStepLabel(s: BridgeStatus): string {
    return BRIDGE_STATUS_LABELS[s] ?? 'Finishing up…';
}

// ─── Shared sub-components ──────────────────────────────────────────────────

function StepConnector({ done }: { done: boolean }) {
    return (
        <div className="flex justify-center pl-10">
            <div className={cn('w-px h-4 transition-colors duration-500', done ? 'bg-emerald-500/60' : 'bg-white/10')} />
        </div>
    );
}

function WalletStep({
    index, title, subtitle, done, locked, children,
}: {
    index: number; title: string; subtitle: string;
    done: boolean; locked: boolean; children: React.ReactNode;
}) {
    return (
        <div className={cn(
            'rounded-2xl border p-5 transition-all duration-300',
            done
                ? 'border-emerald-500/30 bg-emerald-500/5'
                : locked
                    ? 'border-white/5 bg-black/20 opacity-50 pointer-events-none'
                    : 'border-white/10 bg-black/30 backdrop-blur-xl hover:border-white/20',
        )}>
            <div className="flex items-start gap-4">
                <div className={cn(
                    'flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm font-semibold',
                    done
                        ? 'border-emerald-500/60 bg-emerald-500/20 text-emerald-300'
                        : locked
                            ? 'border-white/10 bg-white/5 text-slate-600'
                            : 'border-violet-500/50 bg-violet-500/10 text-violet-300',
                )}>
                    {done ? '✓' : index}
                </div>
                <div className="flex-1 min-w-0">
                    <p className={cn(
                        'text-sm font-semibold',
                        done ? 'text-emerald-300' : locked ? 'text-slate-600' : 'text-white',
                    )}>{title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
                    {!locked && <div className="mt-3">{children}</div>}
                </div>
            </div>
        </div>
    );
}

// ─── Inline pipeline (shown within the Deposit panel while in-flight) ──────────
function InlineProgress({
    status, txHash, srcChainId,
}: {
    status: BridgeStatus;
    txHash?: `0x${string}` | null; srcChainId: number;
}) {
    return (
        <div className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3">
            <div className="flex items-center gap-2.5">
                <span className="block w-3.5 h-3.5 rounded-full border-2 border-violet-400 border-t-transparent animate-spin flex-shrink-0" />
                <span className="text-sm text-white/90">{statusToStepLabel(status)}</span>
                {txHash && (
                    <a href={explorerTx(srcChainId, txHash)} target="_blank" rel="noopener noreferrer"
                        className="ml-auto text-xs text-slate-500 hover:text-slate-300 underline shrink-0">
                        Tx ↗
                    </a>
                )}
            </div>
        </div>
    );
}

function XcmPipeline({ currentStage, arrived }: { currentStage: XcmStatusStage | null; arrived: boolean }) {
    if (!currentStage) return null;
    const currentIdx = XCM_STAGES.indexOf(currentStage);
    return (
        <Panel title="XCM Pipeline">
            <div className="space-y-1 pt-1">
                {XCM_STAGES.map((stage, i) => {
                    const isDone = arrived ? true : i < currentIdx;
                    const isActive = !arrived && i === currentIdx;
                    return (
                        <div key={stage} className="flex items-center gap-3 py-1.5">
                            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                {isDone ? (
                                    <span className="text-emerald-400 text-sm">✓</span>
                                ) : isActive ? (
                                    <span className="block w-3 h-3 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
                                ) : (
                                    <span className="block w-2 h-2 rounded-full bg-white/15" />
                                )}
                            </div>
                            <span className={cn(
                                'text-sm',
                                isDone ? 'text-emerald-300' : isActive ? 'text-white font-medium' : 'text-slate-600',
                            )}>
                                {XCM_STAGE_LABELS[stage]}
                            </span>
                        </div>
                    );
                })}
                {arrived && (
                    <div className="flex items-center gap-3 py-1.5">
                        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                            <span className="text-emerald-400 text-sm">✓</span>
                        </div>
                        <span className="text-sm text-emerald-300 font-medium">PAS arrived on Hub</span>
                    </div>
                )}
            </div>
        </Panel>
    );
}

// ─── Top-level tab ───────────────────────────────────────────────────────────
type BridgeTab = 'pas' | 'eth';

function BridgeTabBar({ active, onChange }: { active: BridgeTab; onChange: (t: BridgeTab) => void }) {
    return (
        <div className="flex gap-1 rounded-xl border border-white/10 bg-black/30 p-1 w-fit">
            {(['pas', 'eth'] as BridgeTab[]).map((t) => (
                <button key={t} onClick={() => onChange(t)}
                    className={cn(
                        'px-5 py-2 rounded-lg text-sm font-medium transition-all',
                        active === t ? 'bg-violet-600/70 text-white shadow' : 'text-slate-400 hover:text-white',
                    )}>
                    {t === 'pas' ? 'PAS via XCM' : 'ETH → mUSDC'}
                </button>
            ))}
        </div>
    );
}

export default function BridgePage() {
    const [activeTab, setActiveTab] = useState<BridgeTab>('pas');
    return (
        <PageShell title="Bridge" subtitle="Transfer assets to Hub Testnet.">
            <div className="mb-2">
                <BridgeTabBar active={activeTab} onChange={setActiveTab} />
            </div>
            <>
                <div>
                    {activeTab === 'pas' ? <PasTab /> : <EthTab />}
                </div>
            </>
        </PageShell>
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAS XCM Tab - sequential progressive steps
// ═══════════════════════════════════════════════════════════════════════════
function PasTab() {
    const { address: hubAddress, isConnected } = useAccount();
    const [substrateAccounts, setSubstrateAccounts] = useState<SubstrateAccount[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<SubstrateAccount | null>(null);
    const [peopleBalance, setPeopleBalance] = useState<string>('');
    const [talismanConnected, setTalismanConnected] = useState(false);
    const [amount, setAmount] = useState('1');
    const [statusMsg, setStatusMsg] = useState<string>('');
    const [sending, setSending] = useState(false);
    const [balanceBefore, setBalanceBefore] = useState<bigint | null>(null);
    const [balanceNow, setBalanceNow] = useState<bigint | null>(null);
    const [arrived, setArrived] = useState(false);
    const [currentStage, setCurrentStage] = useState<XcmStatusStage | null>(null);
    const [hasSent, setHasSent] = useState(false);
    const pollCleanupRef = useRef<(() => void) | null>(null);
    const publicClient = usePublicClient();

    async function connectTalisman() {
        setStatusMsg('Connecting…');
        try {
            const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
            const exts = await web3Enable('Kredio Bridge');
            if (!exts.length) { setStatusMsg('No wallet extension found. Install Talisman.'); return; }
            const accounts = (await web3Accounts()) as SubstrateAccount[];
            const filtered = accounts.filter((a) => a.type === 'sr25519' || a.type === 'ed25519' || !a.type);
            if (!filtered.length) { setStatusMsg('No Substrate accounts found in Talisman.'); return; }
            setSubstrateAccounts(filtered);
            setSelectedAccount(filtered[0]);
            setTalismanConnected(true);
            setStatusMsg('');
            await updatePeopleBalance(filtered[0].address);
        } catch {
            setStatusMsg('Failed to connect Talisman.');
        }
    }

    async function updatePeopleBalance(address: string) {
        try {
            const free = await fetchPeopleBalance(address);
            setPeopleBalance(formatPASFromPeople(free));
        } catch { setPeopleBalance('-'); }
    }

    async function sendXCM() {
        if (!selectedAccount || !hubAddress) return;
        setSending(true);
        setArrived(false);
        setHasSent(true);
        setStatusMsg('');
        try {
            let snapshot: bigint | undefined;
            if (publicClient) {
                snapshot = await publicClient.getBalance({ address: hubAddress as `0x${string}` });
                setBalanceBefore(snapshot);
                setBalanceNow(snapshot);
            }
            // h160ToSS58 is called internally by sendXCMToHub below
            await sendXCMToHub({
                senderAddress: selectedAccount.address,
                destinationEVM: hubAddress,
                amountPAS: amount,
                onStatus: (stage: XcmStatusStage, detail?: string) => {
                    setCurrentStage(stage);
                    setStatusMsg(detail || XCM_STAGE_LABELS[stage]);
                },
            });
            if (snapshot !== undefined && publicClient) {
                pollCleanupRef.current?.();
                pollCleanupRef.current = pollHubArrival({
                    address: hubAddress,
                    before: snapshot,
                    publicClient,
                    onTick: (cur: bigint) => setBalanceNow(cur),
                    onArrival: (delta: bigint) => {
                        setArrived(true);
                        setStatusMsg(`+${formatPASFromEVM(delta)} PAS arrived on Hub`);
                        setSending(false);
                    },
                    onTimeout: () => {
                        setSending(false);
                        setStatusMsg('Error: PAS did not arrive on Hub within 2 minutes. Check the People Chain extrinsic in Subscan and retry.');
                    },
                });
            } else {
                setSending(false);
            }
        } catch (err) {
            setStatusMsg(`Error: ${err instanceof Error ? err.message : String(err)}`);
            setSending(false);
        }
    }

    useEffect(() => () => { pollCleanupRef.current?.(); }, []);

    const fmtWei = (w: bigint | null) => w !== null ? `${formatPASFromEVM(w)} PAS` : '-';
    const canSend = isConnected && talismanConnected && !sending && parseFloat(amount) > 0;
    const isError = statusMsg.toLowerCase().startsWith('error') || statusMsg.toLowerCase().includes('failed');

    return (
        <div className="space-y-3 max-w-lg mx-auto">

            {/* Step 1 – MetaMask */}
            <WalletStep
                index={1}
                title="Connect MetaMask"
                subtitle="Your EVM address on Hub Testnet receives the PAS."
                done={isConnected}
                locked={false}
            >
                {isConnected ? (
                    <div className="space-y-2">
                        <StatRow label="Address" value={`${hubAddress?.slice(0, 10)}…${hubAddress?.slice(-6)}`} />
                        {balanceNow !== null && (
                            <StatRow label="Hub Balance" value={fmtWei(balanceNow)} tone={arrived ? 'green' : 'default'} />
                        )}
                    </div>
                ) : (
                    <p className="text-xs text-slate-400">Use the wallet button in the header to connect.</p>
                )}
            </WalletStep>

            <StepConnector done={isConnected} />

            {/* Step 2 – Talisman */}
            <WalletStep
                index={2}
                title="Connect Talisman"
                subtitle="Substrate wallet holding PAS on People Chain."
                done={talismanConnected}
                locked={!isConnected}
            >
                {!talismanConnected ? (
                    <div className="space-y-2">
                        <ActionButton label="Connect Talisman" onClick={connectTalisman} variant="primary" />
                        {statusMsg && <p className="text-xs text-slate-400">{statusMsg}</p>}
                    </div>
                ) : (
                    <div className="space-y-2">
                        <StatRow label="Account" value={selectedAccount?.meta?.name || 'Account'} />
                        <StatRow label="Address" value={`${selectedAccount?.address.slice(0, 10)}…${selectedAccount?.address.slice(-6)}`} />
                        <StatRow label="Balance" value={peopleBalance ? `${peopleBalance} PAS` : '-'} />
                        {substrateAccounts.length > 1 && (
                            <select
                                className="w-full mt-1 rounded-xl border border-white/10 bg-black/40 text-sm text-white px-3 py-2 outline-none focus:border-white/30"
                                onChange={(e) => {
                                    const acc = substrateAccounts.find((a) => a.address === e.target.value) || null;
                                    setSelectedAccount(acc);
                                    if (acc) updatePeopleBalance(acc.address);
                                }}
                            >
                                {substrateAccounts.map((a) => (
                                    <option key={a.address} value={a.address}>
                                        {a.meta?.name || 'Account'} - {a.address.slice(0, 12)}…
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                )}
            </WalletStep>

            <StepConnector done={talismanConnected} />

            {/* Step 3 – Send */}
            <WalletStep
                index={3}
                title="Send PAS to Hub"
                subtitle="Amount deducted from People Chain, delivered to your Hub EVM address."
                done={arrived}
                locked={!talismanConnected || !isConnected}
            >
                <div className="space-y-3">
                    <div>
                        <label className="text-xs uppercase tracking-wide text-slate-400">Amount</label>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <input
                                type="number"
                                value={amount}
                                min="0.1"
                                step="0.1"
                                onChange={(e) => setAmount(e.target.value)}
                                disabled={sending}
                                className="w-36 rounded-xl border border-white/10 bg-black/40 text-sm text-white px-3 py-2 outline-none focus:border-violet-500/40 disabled:opacity-50"
                            />
                            <span className="text-sm text-slate-400">PAS</span>
                            {[1, 5, 10].map(v => (
                                <button key={v} onClick={() => setAmount(String(v))} disabled={sending}
                                    className="text-xs text-slate-500 hover:text-white border border-white/10 px-2 py-1 rounded-lg transition-colors disabled:opacity-30">
                                    {v}
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className="text-xs text-slate-500">
                        To: <span className="font-mono text-slate-400">{hubAddress ?? '-'}</span>
                    </p>
                    {arrived ? (
                        <div className="flex items-center gap-2 text-sm text-emerald-300">
                            <span>✓</span>
                            <span>PAS arrived on Hub</span>
                            {balanceBefore !== null && balanceNow !== null && balanceNow > balanceBefore && (
                                <span className="text-emerald-400 font-semibold">
                                    +{formatPASFromEVM(balanceNow - balanceBefore)} PAS
                                </span>
                            )}
                        </div>
                    ) : isError ? (
                        <div className="flex items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/8 px-4 py-3">
                            <span className="text-rose-400 text-sm shrink-0">✕</span>
                            <span className="text-sm text-rose-300 flex-1 min-w-0 truncate">{statusMsg}</span>
                            <button onClick={() => setStatusMsg('')} className="text-slate-500 hover:text-white text-sm leading-none shrink-0" aria-label="Dismiss">✕</button>
                        </div>
                    ) : (
                        <ActionButton
                            label={sending ? 'Sending via XCM…' : 'Send PAS via Talisman'}
                            onClick={sendXCM}
                            disabled={!canSend}
                            loading={sending}
                            variant="primary"
                        />
                    )}
                </div>
            </WalletStep>

            {/* XCM Pipeline */}
            {hasSent && (
                <div className="pt-1">
                    <XcmPipeline currentStage={currentStage} arrived={arrived} />
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// ETH → mUSDC Tab - Bridge / Reclaim inner tabs
// ═══════════════════════════════════════════════════════════════════════════
type EthInnerTab = 'bridge' | 'reclaim';

function EthTab() {
    const [innerTab, setInnerTab] = useState<EthInnerTab>('bridge');
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const { switchChainAsync } = useSwitchChain();

    const {
        status, errorMsg, quote, quoteLoading,
        lastTxHash, mintedResult, history,
        reclaimingTx, reclaimErrorTx, reclaimError, reclaimStep,
        fetchQuote, depositETH, redeemDeposit,
        fetchHistory, reset, clearReclaimError,
    } = useEthBridge();

    const [selectedChainId, setSelectedChainId] = useState<number>(BRIDGE.SEPOLIA_CHAIN_ID);
    const [ethAmount, setEthAmount] = useState<string>('');
    const [quoteAge, setQuoteAge] = useState<number>(0);

    useEffect(() => {
        const n = parseFloat(ethAmount);
        if (Number.isFinite(n) && n >= MIN_ETH && n <= MAX_ETH) fetchQuote(selectedChainId, ethAmount);
    }, [ethAmount, selectedChainId, fetchQuote]);

    useEffect(() => {
        if (!quote) return;
        const start = new Date(quote.freshAt).getTime();
        const id = setInterval(() => setQuoteAge(Math.floor((Date.now() - start) / 1000)), 1000);
        return () => clearInterval(id);
    }, [quote]);

    useEffect(() => {
        if (!quote || !ethAmount) return;
        const id = setTimeout(() => fetchQuote(selectedChainId, ethAmount), 30_000);
        return () => clearTimeout(id);
    }, [quote, ethAmount, selectedChainId, fetchQuote]);

    useEffect(() => {
        if (innerTab === 'reclaim' && address) fetchHistory(address);
    }, [innerTab, address, fetchHistory]);

    const handleChainSelect = useCallback(async (id: number) => {
        setSelectedChainId(id);
        if (isConnected && chainId !== id) {
            try { await switchChainAsync({ chainId: id }); } catch { /* user rejected */ }
        }
    }, [isConnected, chainId, switchChainAsync]);

    const handleDeposit = useCallback(async () => {
        if (!address) return;
        await depositETH(selectedChainId, ethAmount, address);
    }, [address, depositETH, selectedChainId, ethAmount]);

    const numAmt = parseFloat(ethAmount);
    const valid = Number.isFinite(numAmt) && numAmt >= MIN_ETH && numAmt <= MAX_ETH;
    const busy = status !== 'idle' && status !== 'minted' && status !== 'error';

    const RECLAIM_STEP_LABELS: Record<string, string> = {
        'switching-chain': 'Switching to Hub…',
        'approving': 'Approving mUSDC…',
        'redeeming': 'Burning mUSDC on Hub…',
        'releasing': 'Releasing ETH on Sepolia…',
    };

    return (
        <div className="space-y-4 max-w-lg mx-auto">

            {/* Inner tab bar */}
            <div className="flex gap-1 rounded-xl border border-white/10 bg-black/20 p-1 w-fit">
                {(['bridge', 'reclaim'] as EthInnerTab[]).map((t) => (
                    <button key={t} onClick={() => setInnerTab(t)}
                        className={cn(
                            'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
                            innerTab === t ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white',
                        )}>
                        {t === 'bridge' ? 'Bridge' : 'Reclaim'}
                    </button>
                ))}
            </div>

            <>
                {innerTab === 'bridge' ? (
                    <div className="space-y-4">
                        {/* Source chain */}
                        <Panel title="Source Chain">
                            <div className="grid grid-cols-1 gap-2 pt-1">
                                {ETH_BRIDGE_CHAINS.map((c: typeof ETH_BRIDGE_CHAINS[0]) => (
                                    <button
                                        key={c.chainId}
                                        onClick={() => handleChainSelect(c.chainId)}
                                        disabled={!c.inboxAddress || busy}
                                        className={cn(
                                            'flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all',
                                            selectedChainId === c.chainId
                                                ? 'border-violet-500/50 bg-violet-500/10 text-white'
                                                : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10',
                                            !c.inboxAddress && 'opacity-40 cursor-not-allowed',
                                        )}
                                    >
                                        <span>{c.name}</span>
                                        <span className="flex items-center gap-2">
                                            {chainId === c.chainId && isConnected && (
                                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                            )}
                                            {!c.inboxAddress && (
                                                <span className="text-xs text-slate-500">coming soon</span>
                                            )}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </Panel>

                        {/* Amount + quote */}
                        <Panel title="Amount">
                            <div className="space-y-3 pt-1">
                                <div className="relative">
                                    <input
                                        type="number"
                                        min={MIN_ETH}
                                        max={MAX_ETH}
                                        step="0.001"
                                        value={ethAmount}
                                        onChange={e => setEthAmount(e.target.value)}
                                        placeholder="0.01"
                                        disabled={busy}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600
                                                   focus:outline-none focus:border-violet-500/50 transition-colors
                                                   [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                                                   disabled:opacity-50 pr-36"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1.5">
                                        {[0.001, 0.01, 0.1].map(v => (
                                            <button key={v} onClick={() => setEthAmount(String(v))} disabled={busy}
                                                className="text-xs text-slate-400 hover:text-white border border-white/10 px-2 py-0.5 rounded-lg transition-colors disabled:opacity-30">
                                                {v}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500">Min {MIN_ETH} · Max {MAX_ETH} ETH · 0.20% fee</p>

                                {(quote || quoteLoading) && (
                                    <div className={cn(
                                        'rounded-xl border px-4 py-3 transition-all',
                                        quoteLoading ? 'border-white/5' : 'border-violet-500/20 bg-violet-500/5',
                                    )}>
                                        {quoteLoading ? (
                                            <p className="text-sm text-slate-400 animate-pulse">Fetching price…</p>
                                        ) : quote ? (
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm flex-wrap">
                                                    <span className="text-white font-medium">{quote.ethAmountEth} ETH</span>
                                                    <span className="text-slate-500">→</span>
                                                    <span className="text-emerald-300">${(parseFloat(quote.ethAmountEth) * quote.ethPriceUSD).toFixed(2)}</span>
                                                    <span className="text-slate-500">→</span>
                                                    <span className="text-violet-300 font-semibold">{quote.mUSDCOutHuman} mUSDC</span>
                                                </div>
                                                <p className="text-xs text-slate-500">
                                                    ETH/USD ${quote.ethPriceUSD.toFixed(2)} · fee {quote.feePct} · {quoteAge}s ago
                                                </p>
                                            </div>
                                        ) : null}
                                    </div>
                                )}

                                {address && (
                                    <p className="text-xs text-slate-500">
                                        mUSDC minted to:{' '}
                                        <span className="font-mono text-slate-400">{address.slice(0, 10)}…{address.slice(-6)}</span>
                                    </p>
                                )}
                            </div>
                        </Panel>

                        {/* Action */}
                        <Panel title="Deposit">
                            <div className="space-y-3 pt-1">
                                {!isConnected ? (
                                    <StateNotice tone="info" message="Connect MetaMask to continue." />
                                ) : status === 'minted' ? (
                                    /* Success card - dismissed manually with ✕ */
                                    <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 px-4 py-3 space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-emerald-300">
                                                ✓ Minted {mintedResult?.mUSDCHuman} mUSDC
                                            </p>
                                            <button
                                                onClick={reset}
                                                className="text-slate-500 hover:text-white text-base leading-none ml-3"
                                                aria-label="Dismiss"
                                            >✕</button>
                                        </div>
                                        {mintedResult && (
                                            <a href={explorerTx(CONTRACTS.CHAIN_ID, mintedResult.hubTx)} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-white underline block">
                                                View Hub Tx ↗
                                            </a>
                                        )}
                                        {lastTxHash && (
                                            <a href={explorerTx(selectedChainId, lastTxHash)} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-white underline block">
                                                View Source Tx ↗
                                            </a>
                                        )}
                                    </div>
                                ) : status === 'error' ? (
                                    /* Error card - replaces button, dismissed with ✕ */
                                    <div className="flex items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/8 px-4 py-3">
                                        <span className="text-rose-400 text-sm shrink-0">✕</span>
                                        <span className="text-sm text-rose-300 flex-1 min-w-0 break-words">{errorMsg ?? 'Transaction failed'}</span>
                                        <button onClick={reset} className="text-slate-500 hover:text-white text-sm leading-none shrink-0" aria-label="Dismiss">✕</button>
                                    </div>
                                ) : busy ? (
                                    /* Inline pipeline - replaces button while active */
                                    <InlineProgress
                                        status={status}
                                        txHash={lastTxHash}
                                        srcChainId={selectedChainId}
                                    />
                                ) : chainId !== selectedChainId ? (
                                    <button
                                        onClick={() => handleChainSelect(selectedChainId)}
                                        className="w-full py-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-sm font-medium hover:bg-amber-500/25 transition-all"
                                    >
                                        Switch to {ETH_BRIDGE_CHAINS.find((c: typeof ETH_BRIDGE_CHAINS[0]) => c.chainId === selectedChainId)?.name ?? 'Source Chain'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleDeposit}
                                        disabled={!valid || !address}
                                        className="w-full py-3.5 rounded-xl bg-violet-600/80 border border-violet-500/30 text-white text-sm font-semibold
                                                   hover:bg-violet-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        {`Deposit ${ethAmount || '-'} ETH`}
                                    </button>
                                )}
                            </div>
                        </Panel>

                    </div>
                ) : (
                    /* ── Reclaim tab ── */
                    <div>
                        <Panel title="Reclaim ETH" subtitle="Burn mUSDC to receive your original ETH back on the source chain.">
                            {!isConnected ? (
                                <StateNotice tone="info" message="Connect MetaMask to view your deposits." />
                            ) : history.length === 0 ? (
                                <p className="text-sm text-slate-500 py-2">No deposits found for this address.</p>
                            ) : (
                                <div className="space-y-3 pt-1">
                                    {history.map((rec) => {
                                        const srcChain = ETH_BRIDGE_CHAINS.find(
                                            (c: typeof ETH_BRIDGE_CHAINS[0]) => c.chainId === rec.sourceChainId,
                                        );
                                        const ethF = rec.ethAmount
                                            ? parseFloat(formatEther(BigInt(rec.ethAmount))).toFixed(4)
                                            : '?';
                                        const canRedeem = rec.status === 'minted' && !rec.redeemed;
                                        return (
                                            <div
                                                key={rec.sourceTxHash}
                                                className={cn(
                                                    'rounded-xl border px-4 py-3 space-y-2',
                                                    rec.status === 'redeemed'
                                                        ? 'border-white/5 bg-white/3 opacity-60'
                                                        : canRedeem
                                                            ? 'border-amber-500/20 bg-amber-500/5'
                                                            : 'border-white/10 bg-white/5',
                                                )}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-400">
                                                        {srcChain?.name ?? `Chain ${rec.sourceChainId}`}
                                                    </span>
                                                    <span className={cn(
                                                        'text-xs px-2 py-0.5 rounded-full font-medium',
                                                        rec.status === 'redeemed'
                                                            ? 'bg-slate-500/20 text-slate-400'
                                                            : rec.status === 'minted'
                                                                ? 'bg-emerald-500/20 text-emerald-300'
                                                                : 'bg-amber-500/20 text-amber-300',
                                                    )}>
                                                        {rec.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-white">
                                                    {ethF} ETH{' '}
                                                    <span className="text-slate-500">→</span>{' '}
                                                    <span className="text-violet-300">{rec.mUSDCHuman ?? '?'} mUSDC</span>
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <a
                                                        href={explorerTx(rec.sourceChainId ?? BRIDGE.SEPOLIA_CHAIN_ID, rec.sourceTxHash)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-slate-500 hover:text-white underline"
                                                    >
                                                        Source Tx ↗
                                                    </a>
                                                    {canRedeem && (
                                                        reclaimingTx === rec.sourceTxHash ? (
                                                            <span className="flex items-center gap-1.5 text-xs text-amber-300">
                                                                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                                </svg>
                                                                {RECLAIM_STEP_LABELS[reclaimStep] ?? 'Processing…'}
                                                            </span>
                                                        ) : reclaimErrorTx === rec.sourceTxHash && reclaimError ? (
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs text-rose-300 truncate max-w-[180px]">{reclaimError}</span>
                                                                <button onClick={clearReclaimError} className="text-slate-500 hover:text-white text-xs leading-none shrink-0" aria-label="Dismiss">✕</button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => {
                                                                    const minted = BigInt(rec.mUSDCMinted ?? '0');
                                                                    redeemDeposit(rec.sourceTxHash, minted);
                                                                }}
                                                                disabled={!!reclaimingTx}
                                                                className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 disabled:opacity-40 transition-all font-medium"
                                                            >
                                                                Reclaim {ethF} ETH
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </Panel>
                    </div>
                )}
            </>
        </div>
    );
}
