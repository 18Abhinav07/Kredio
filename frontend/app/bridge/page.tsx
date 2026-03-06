'use client';

import { useState, useEffect, useRef } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import {
    fetchPeopleBalance,
    formatPASFromEVM,
    formatPASFromPeople,
    h160ToSS58,
    PAS_SUBSTRATE_DECIMALS,
    PEOPLE_RPC,
    pollHubArrival,
    sendXCMToHub,
    type XcmStatusStage,
} from '../../lib/xcm';
import {
    PageShell,
    Grid,
    Panel,
    StatRow,
    StateNotice,
    ActionButton,
} from '../../components/modules/ProtocolUI';

type SubstrateAccount = {
    address: string;
    type?: string;
    meta?: { name?: string };
};

const STAGE_LABELS: Record<XcmStatusStage, string> = {
    connecting: 'Connecting to People Chain...',
    building: 'Building XCM transaction...',
    awaiting_signature: 'Waiting for Talisman signature...',
    broadcasting: 'Broadcasting to network...',
    in_block: 'In block — waiting for XCM arrival on Hub (~30s)...',
    finalized: 'Finalized on People Chain — waiting for Hub arrival...',
};

function logInfo(step: string, detail?: Record<string, unknown>) {
    if (detail) { console.info(`[XCM-Test] ${step}`, detail); return; }
    console.info(`[XCM-Test] ${step}`);
}

function logError(step: string, error: unknown, detail?: Record<string, unknown>) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`[XCM-Test] ${step}`, { message: msg, ...(detail || {}) });
}

export default function XCMTestPage() {
    const { address: hubAddress, isConnected } = useAccount();

    const [substrateAccounts, setSubstrateAccounts] = useState<SubstrateAccount[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<SubstrateAccount | null>(null);
    const [peopleBalance, setPeopleBalance] = useState<string>('');
    const [talismanConnected, setTalismanConnected] = useState(false);

    const [amount, setAmount] = useState('1');
    const [status, setStatus] = useState<string>('');
    const [sending, setSending] = useState(false);

    const [balanceBefore, setBalanceBefore] = useState<bigint | null>(null);
    const [balanceNow, setBalanceNow] = useState<bigint | null>(null);
    const [arrived, setArrived] = useState(false);
    const pollCleanupRef = useRef<(() => void) | null>(null);

    const publicClient = usePublicClient();

    async function connectTalisman() {
        setStatus('Connecting to Talisman...');
        logInfo('connectTalisman:start');
        try {
            const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
            const extensions = await web3Enable('Kredio Bridge');
            if (!extensions.length) {
                setStatus('No wallet extension found. Install Talisman.');
                return;
            }
            const accounts = (await web3Accounts()) as SubstrateAccount[];
            const peopleAccounts = accounts.filter((a) => a.type === 'sr25519' || a.type === 'ed25519' || !a.type);
            if (!peopleAccounts.length) {
                setStatus('No Substrate accounts found in Talisman.');
                return;
            }
            setSubstrateAccounts(peopleAccounts);
            setSelectedAccount(peopleAccounts[0]);
            setTalismanConnected(true);
            setStatus('Talisman connected.');
            logInfo('connectTalisman:connected', { address: peopleAccounts[0].address });
            await updatePeopleBalance(peopleAccounts[0].address);
        } catch (error: unknown) {
            setStatus('Failed to connect Talisman.');
            logError('connectTalisman:failed', error);
        }
    }

    async function updatePeopleBalance(address: string) {
        try {
            const free = await fetchPeopleBalance(address);
            setPeopleBalance(formatPASFromPeople(free));
            logInfo('fetchPeopleBalance:success', { rawFree: free.toString() });
        } catch (error: unknown) {
            setPeopleBalance('—');
            logError('fetchPeopleBalance:failed', error, { address });
        }
    }

    async function snapshotBalanceBefore() {
        if (!hubAddress || !publicClient) return undefined;
        const bal = await publicClient.getBalance({ address: hubAddress as `0x${string}` });
        setBalanceBefore(bal);
        setBalanceNow(bal);
        return bal;
    }

    async function sendXCM() {
        if (!selectedAccount || !hubAddress) {
            setStatus('Connect both wallets first.');
            return;
        }
        setSending(true);
        setArrived(false);
        setStatus('Preparing XCM transaction...');
        logInfo('sendXCM:start', { sender: selectedAccount.address, dest: hubAddress, amount });

        try {
            const before = await snapshotBalanceBefore();

            const ss58Dest = h160ToSS58(hubAddress);
            logInfo('sendXCM:destinationConverted', { hubAddress, ss58Dest });

            await sendXCMToHub({
                senderAddress: selectedAccount.address,
                destinationEVM: hubAddress,
                amountPAS: amount,
                onStatus: (stage: XcmStatusStage, detail?: string) => {
                    logInfo('sendXCM:statusUpdate', { stage, detail });
                    setStatus(detail || STAGE_LABELS[stage]);
                    if (stage === 'in_block') setSending(false);
                },
            });

            if (before !== undefined && publicClient) {
                pollCleanupRef.current?.();
                pollCleanupRef.current = pollHubArrival({
                    address: hubAddress,
                    before,
                    publicClient,
                    onTick: (current: bigint) => setBalanceNow(current),
                    onArrival: (delta: bigint) => {
                        const readable = formatPASFromEVM(delta);
                        setStatus(`+${readable} PAS arrived on Hub`);
                        setArrived(true);
                        setSending(false);
                        logInfo('startPolling:arrived', { delta: delta.toString(), readable });
                    },
                });
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setStatus(`Error: ${message}`);
            setSending(false);
            logError('sendXCM:failed', err, { sender: selectedAccount.address, dest: hubAddress });
        }
    }

    useEffect(() => {
        return () => { pollCleanupRef.current?.(); };
    }, []);

    const fmtWei = (wei: bigint | null) =>
        wei !== null ? `${formatPASFromEVM(wei)} PAS` : '—';

    const canSend = isConnected && talismanConnected && !sending && parseFloat(amount) > 0;

    return (
        <PageShell
            title="Cross-Chain Transfer"
            subtitle="Bridge PAS from People Chain to Hub EVM via XCM. Connects Talisman (Substrate) with your MetaMask (EVM) address."
        >
            <Grid>
                {/* Step 1 — Hub Wallet */}
                <Panel title="Step 1 — Hub Wallet (MetaMask)" subtitle="Your EVM destination address on Asset Hub.">
                    {isConnected ? (
                        <>
                            <StatRow label="Status" value="Connected" tone="green" />
                            <StatRow label="Address" value={`${hubAddress?.slice(0, 8)}…${hubAddress?.slice(-6)}`} />
                            <StatRow
                                label="Hub Balance"
                                value={balanceNow !== null ? fmtWei(balanceNow) : '—'}
                                tone={arrived ? 'green' : 'default'}
                            />
                        </>
                    ) : (
                        <StateNotice tone="info" message="Connect MetaMask via the header to set your Hub destination address." />
                    )}
                </Panel>

                {/* Step 2 — Talisman */}
                <Panel title="Step 2 — People Chain Wallet (Talisman)" subtitle="Substrate account that holds PAS on People Chain.">
                    {!talismanConnected ? (
                        <div className="space-y-3">
                            <StateNotice tone="info" message="Connect Talisman to select the source account for your PAS transfer." />
                            <ActionButton label="Connect Talisman" onClick={connectTalisman} variant="primary" />
                        </div>
                    ) : (
                        <>
                            <StatRow label="Status" value="Connected" tone="green" />
                            <StatRow label="Account" value={selectedAccount?.meta?.name || 'Account'} />
                            <StatRow
                                label="Address"
                                value={selectedAccount ? `${selectedAccount.address.slice(0, 8)}…${selectedAccount.address.slice(-6)}` : '—'}
                            />
                            <StatRow label="People Chain Balance" value={peopleBalance ? `${peopleBalance} PAS` : '—'} />
                            {substrateAccounts.length > 1 && (
                                <div className="pt-1">
                                    <label className="block space-y-1">
                                        <span className="text-xs uppercase tracking-wide text-slate-400">Switch Account</span>
                                        <select
                                            className="w-full rounded-xl border border-white/10 bg-black/40 text-sm text-white px-3 py-2 outline-none focus:border-white/30"
                                            onChange={(e) => {
                                                const acc = substrateAccounts.find((a) => a.address === e.target.value) || null;
                                                setSelectedAccount(acc);
                                                if (acc) updatePeopleBalance(acc.address);
                                            }}
                                        >
                                            {substrateAccounts.map((a) => (
                                                <option key={a.address} value={a.address}>
                                                    {a.meta?.name || 'Account'} — {a.address.slice(0, 10)}…
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            )}
                        </>
                    )}
                </Panel>
            </Grid>

            {/* Step 3 — Send */}
            <Panel title="Step 3 — Send PAS to Hub" subtitle="Amount is taken from your People Chain balance and delivered to your Hub EVM address.">
                <div className="space-y-4">
                    <label className="block space-y-1">
                        <span className="text-xs uppercase tracking-wide text-slate-400">Amount (PAS)</span>
                        <div className="flex items-center gap-3">
                            <input
                                type="number"
                                value={amount}
                                min="0.1"
                                step="0.1"
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-40 rounded-xl border border-white/10 bg-black/40 text-sm text-white px-3 py-2 outline-none focus:border-white/30"
                            />
                            <span className="text-sm text-slate-400">PAS</span>
                        </div>
                    </label>

                    <div className="text-xs text-slate-500">
                        Destination: <span className="font-mono text-slate-400">{hubAddress ?? 'connect MetaMask'}</span>
                    </div>

                    <ActionButton
                        label={sending ? 'Sending via XCM...' : 'Send PAS via Talisman'}
                        onClick={sendXCM}
                        disabled={!canSend}
                        loading={sending}
                        variant="primary"
                    />

                    {!isConnected && <StateNotice tone="warning" message="Connect MetaMask first to set your Hub destination." />}
                    {isConnected && !talismanConnected && <StateNotice tone="warning" message="Connect Talisman above to sign the XCM transaction." />}
                </div>
            </Panel>

            <Grid>
                {/* Status */}
                <Panel title="Transaction Status" subtitle="Live XCM pipeline and arrival confirmation.">
                    {status ? (
                        <StateNotice
                            tone={arrived ? 'info' : status.toLowerCase().includes('error') || status.toLowerCase().includes('failed') ? 'error' : 'info'}
                            message={status}
                        />
                    ) : (
                        <p className="text-sm text-slate-500">No active transaction.</p>
                    )}
                    {arrived && (
                        <div className="pt-2">
                            <StateNotice tone="info" message="XCM delivery confirmed. PAS balance updated on Hub." />
                        </div>
                    )}
                    {sending && (
                        <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
                            <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                            XCM relay in progress — typically ~30s
                        </div>
                    )}
                </Panel>

                {/* Balance Tracker */}
                <Panel title="Hub Balance Tracker" subtitle="Monitors your EVM balance until XCM funds arrive.">
                    {balanceBefore !== null ? (
                        <>
                            <StatRow label="Balance before" value={fmtWei(balanceBefore)} />
                            <StatRow
                                label="Balance now"
                                value={fmtWei(balanceNow)}
                                tone={arrived ? 'green' : 'default'}
                            />
                            {arrived && balanceBefore !== null && balanceNow !== null && (
                                <StatRow
                                    label="Received"
                                    value={`+${formatPASFromEVM(balanceNow - balanceBefore)} PAS`}
                                    tone="green"
                                />
                            )}
                            {!arrived && (
                                <p className="text-xs text-slate-500 pt-1">Polling every 3s — XCM takes ~30s</p>
                            )}
                        </>
                    ) : (
                        <p className="text-sm text-slate-500">Send a transaction to start tracking.</p>
                    )}
                </Panel>
            </Grid>

            {/* Info */}
            <Panel title="Network Info" subtitle="Chain configuration for this bridge route.">
                <StatRow label="Source" value="People Chain (Paseo)" />
                <StatRow label="Destination" value="Asset Hub (Paseo EVM)" />
                <StatRow label="People RPC" value={PEOPLE_RPC} />
                <StatRow label="Source Decimals" value={`${PAS_SUBSTRATE_DECIMALS} (Substrate)`} />
                <StatRow label="Destination Decimals" value="18 (EVM wei)" />
            </Panel>
        </PageShell>
    );
}
