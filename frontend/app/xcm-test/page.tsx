'use client';

import { useState, useEffect, useRef } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { formatUnits } from 'viem';

const PEOPLE_RPC = 'wss://people-paseo.rpc.amforc.com';
// Backup RPC if the primary endpoint is unavailable:
// const PEOPLE_RPC = 'wss://rpc-people-paseo.luckyfriday.io';
const HUB_RPC = 'https://eth-rpc-testnet.polkadot.io/';
const PEOPLE_PAS_DECIMALS = 10; // People chain native PAS precision
const HUB_PAS_DECIMALS = 18; // Hub EVM native balance precision

type SubstrateAccount = {
    address: string;
    type?: string;
    meta?: { name?: string };
};

type PeopleApi = ApiPromiseType & {
    query: {
        system: {
            account: (address: string) => Promise<{data: {free: {toString: () => string}}}>;
        };
    };
};

function serializeError(error: unknown) {
    if (error instanceof Error) {
        const out: Record<string, unknown> = {
            name: error.name,
            message: error.message,
            stack: error.stack,
        };
        const maybeWithCause = error as Error & {cause?: unknown};
        if (maybeWithCause.cause !== undefined) {
            out.cause = maybeWithCause.cause;
        }
        return out;
    }
    return {
        message: String(error),
        raw: error,
    };
}

function logInfo(step: string, detail?: Record<string, unknown>) {
    if (detail) {
        console.info(`[XCM-Test] ${step}`, detail);
        return;
    }
    console.info(`[XCM-Test] ${step}`);
}

function logError(step: string, error: unknown, detail?: Record<string, unknown>) {
    const payload = {
        ...serializeError(error),
        ...(detail || {}),
    };
    console.error(`[XCM-Test] ${step}`, payload);
}

export default function XCMTestPage() {
    // MetaMask state
    const {address: hubAddress, isConnected} = useAccount();

    // Talisman state
    const [substrateAccounts, setSubstrateAccounts] = useState<SubstrateAccount[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<SubstrateAccount | null>(null);
    const [peopleBalance, setPeopleBalance] = useState<string>('');
    const [talismanConnected, setTalismanConnected] = useState(false);

    // XCM state
    const [amount, setAmount] = useState('1');
    const [status, setStatus] = useState<string>('');
    const [sending, setSending] = useState(false);

    // Balance polling state
    const [balanceBefore, setBalanceBefore] = useState<bigint | null>(null);
    const [balanceNow, setBalanceNow] = useState<bigint | null>(null);
    const [arrived, setArrived] = useState(false);
    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const publicClient = usePublicClient();

    // ── Connect Talisman ──
    async function connectTalisman() {
        setStatus('Connecting to Talisman...');
        logInfo('connectTalisman:start');
        try {
            const {web3Enable, web3Accounts} = await import('@polkadot/extension-dapp');
            const extensions = await web3Enable('Kredio XCM Test');
            logInfo('connectTalisman:extensionsLoaded', {count: extensions.length});
            if (!extensions.length) {
                setStatus('❌ No wallet extension found. Install Talisman.');
                logInfo('connectTalisman:noExtensions');
                return;
            }
            const accounts = (await web3Accounts()) as SubstrateAccount[];
            const peopleAccounts = accounts.filter((a) => a.type === 'sr25519' || a.type === 'ed25519' || !a.type);
            logInfo('connectTalisman:accountsLoaded', {totalAccounts: accounts.length, peopleAccounts: peopleAccounts.length});
            if (!peopleAccounts.length) {
                setStatus('❌ No Substrate accounts found in Talisman.');
                logInfo('connectTalisman:noSubstrateAccounts');
                return;
            }
            setSubstrateAccounts(peopleAccounts);
            setSelectedAccount(peopleAccounts[0]);
            setTalismanConnected(true);
            setStatus('✅ Talisman connected.');
            logInfo('connectTalisman:connected', {selectedAccount: peopleAccounts[0].address});
            await fetchPeopleBalance(peopleAccounts[0].address);
        } catch (error: unknown) {
            setStatus('❌ Failed to connect Talisman. See console logs.');
            logError('connectTalisman:failed', error);
        }
    }

    // ── Fetch People Chain PAS balance ──
    async function fetchPeopleBalance(address: string) {
        let api: PeopleApi | null = null;
        try {
            logInfo('fetchPeopleBalance:start', {address, rpc: PEOPLE_RPC});
            const {WsProvider, ApiPromise} = await import('@polkadot/api');
            const provider = new WsProvider(PEOPLE_RPC);
            api = await ApiPromise.create({provider}) as unknown as PeopleApi;

            const acct = await api.query.system.account(address);
            const free = BigInt(acct.data.free.toString());
            const readable = Number.parseFloat(formatUnits(free, PEOPLE_PAS_DECIMALS)).toFixed(4);
            setPeopleBalance(readable);
            console.log('[XCM-Test] peopleBalance raw:', acct.data.free.toString());
            logInfo('fetchPeopleBalance:success', {rawFree: free.toString(), readable});
        } catch (error: unknown) {
            console.error('[XCM-Test] fetchPeopleBalance failed:', error instanceof Error ? error.message : String(error));
            setPeopleBalance('check Talisman');
            logError('fetchPeopleBalance:failed', error, {address, rpc: PEOPLE_RPC});
        } finally {
            if (api) {
                try {
                    await api.disconnect();
                } catch (disconnectError) {
                    logError('fetchPeopleBalance:disconnectFailed', disconnectError);
                }
            }
        }
    }

    // ── Snapshot Hub balance before send ──
    async function snapshotBalanceBefore() {
        if (!hubAddress || !publicClient) {
            logInfo('snapshotBalanceBefore:skipped', {hubAddress: hubAddress || null, hasPublicClient: !!publicClient});
            return;
        }
        const bal = await publicClient.getBalance({address: hubAddress as `0x${string}`});
        setBalanceBefore(bal);
        setBalanceNow(bal);
        logInfo('snapshotBalanceBefore:success', {
            hubAddress,
            rawBalance: bal.toString(),
            formattedHub18: Number.parseFloat(formatUnits(bal, HUB_PAS_DECIMALS)).toFixed(6),
            formattedPeople10: Number.parseFloat(formatUnits(bal, PEOPLE_PAS_DECIMALS)).toFixed(6),
        });
        return bal;
    }

    // ── Poll Hub balance every 3s ──
    function startPolling(before: bigint) {
        logInfo('startPolling:start', {before: before.toString()});
        pollRef.current = setInterval(async () => {
            try {
                if (!hubAddress || !publicClient) {
                    logInfo('startPolling:skippedTick', {hubAddress: hubAddress || null, hasPublicClient: !!publicClient});
                    return;
                }
                const bal = await publicClient.getBalance({
                    address: hubAddress as `0x${string}`,
                });
                setBalanceNow(bal);
                logInfo('startPolling:tick', {rawBalance: bal.toString(), hubAddress});
                if (bal > before + BigInt(0)) {
                    const delta = bal - before;
                    const readable = Number.parseFloat(formatUnits(delta, HUB_PAS_DECIMALS)).toFixed(4);
                    setStatus(`✅ SUCCESS: +${readable} PAS arrived on Hub!`);
                    setArrived(true);
                    setSending(false);
                    logInfo('startPolling:arrivalDetected', {deltaRaw: delta.toString(), deltaReadable: readable});
                    if (pollRef.current) clearInterval(pollRef.current);
                }
            } catch (error: unknown) {
                logError('startPolling:tickFailed', error, {before: before.toString(), hubAddress: hubAddress || null});
            }
        }, 3000);
    }

    // ── Send XCM ──
    async function sendXCM() {
        if (!selectedAccount || !hubAddress) {
            setStatus('❌ Connect both wallets first.');
            logInfo('sendXCM:blockedMissingWallets', {selectedAccount: selectedAccount?.address || null, hubAddress: hubAddress || null});
            return;
        }

        setSending(true);
        setArrived(false);
        setStatus('Preparing XCM transaction...');
        logInfo('sendXCM:start', {
            selectedAccount: selectedAccount.address,
            hubAddress,
            amountInput: amount,
            peopleRpc: PEOPLE_RPC,
            hubRpc: HUB_RPC,
        });

        let api: ApiPromiseType | null = null;
        try {
            // snapshot balance before
            const before = await snapshotBalanceBefore();

            // amount in PAS units (10 decimals)
            const amountInUnits = String(Math.round(parseFloat(amount) * 10 ** PEOPLE_PAS_DECIMALS));
            logInfo('sendXCM:amountParsed', {amountInput: amount, amountInUnits});

            // H160 -> SS58 AccountId32 conversion (Paseo prefix = 0)
            const {hexToU8a} = await import('@polkadot/util');
            const {encodeAddress} = await import('@polkadot/util-crypto');
            const h160 = hexToU8a(hubAddress);
            const pad = new Uint8Array(12).fill(0xee);
            const id32 = new Uint8Array(32);
            id32.set(h160, 0);
            id32.set(pad, 20);
            const ss58Dest = encodeAddress(id32, 0);
            console.log('[XCM-Test] H160:', hubAddress);
            console.log('[XCM-Test] SS58 dest:', ss58Dest);
            logInfo('sendXCM:destinationConverted', {hubAddress, ss58Dest});

            // build XCM tx via ParaSpell
            const {WsProvider, ApiPromise} = await import('@polkadot/api');
            const {Builder} = await import('@paraspell/sdk-pjs');
            const provider = new WsProvider(PEOPLE_RPC);
            api = await ApiPromise.create({provider});
            logInfo('sendXCM:apiConnected', {rpc: PEOPLE_RPC});

            const tx = await Builder(api)
                .from('PeoplePaseo')
                .to('AssetHubPaseo')
                .currency({symbol: 'PAS', amount: amountInUnits})
                .address(ss58Dest)
                .senderAddress(selectedAccount.address)
                .build();
            logInfo('sendXCM:txBuilt', {destination: ss58Dest, amountInUnits});
            console.log('[XCM-Test] tx built:', typeof tx?.method?.toHuman === 'function' ? tx.method.toHuman() : 'toHuman unavailable');

            setStatus('Waiting for Talisman signature...');

            // sign and send via Talisman injector
            const {web3FromAddress} = await import('@polkadot/extension-dapp');
            const injector = await web3FromAddress(selectedAccount.address);
            logInfo('sendXCM:injectorReady', {selectedAccount: selectedAccount.address});

            await new Promise<void>((resolve, reject) => {
                tx.signAndSend(selectedAccount.address, {signer: injector.signer}, ({status: txStatus, dispatchError}: {status: {isInBlock: boolean; isFinalized: boolean; toString?: () => string}; dispatchError?: {toString: () => string}}) => {
                    logInfo('sendXCM:statusUpdate', {
                        status: txStatus.toString ? txStatus.toString() : 'unknown',
                        isInBlock: txStatus.isInBlock,
                        isFinalized: txStatus.isFinalized,
                        hasDispatchError: !!dispatchError,
                    });
                    if (txStatus.isInBlock) {
                        setStatus('📦 In block. Waiting for XCM arrival on Hub (~30s)...');
                        setSending(false);
                    }
                    if (txStatus.isFinalized) {
                        if (dispatchError) {
                            logError('sendXCM:dispatchError', new Error(dispatchError.toString()));
                            reject(new Error(dispatchError.toString()));
                        } else {
                            logInfo('sendXCM:finalizedNoDispatchError');
                            resolve();
                        }
                    }
                });
            });

            // start polling Hub balance
            if (before !== undefined) {
                startPolling(before);
            }

        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setStatus(`❌ Error: ${message}`);
            setSending(false);
            logError('sendXCM:failed', err, {
                selectedAccount: selectedAccount.address,
                hubAddress,
                amountInput: amount,
            });
        } finally {
            if (api) {
                try {
                    await api.disconnect();
                    logInfo('sendXCM:apiDisconnected');
                } catch (disconnectError) {
                    logError('sendXCM:disconnectFailed', disconnectError);
                }
            }
        }
    }

    // cleanup
    useEffect(() => {
        return () => {
            if (pollRef.current) {
                clearInterval(pollRef.current);
                logInfo('cleanup:pollingCleared');
            }
        };
    }, []);

    const fmt = (wei: bigint | null) =>
        wei !== null
            ? `${Number.parseFloat(formatUnits(wei, HUB_PAS_DECIMALS)).toFixed(4)} PAS`
            : '...';

    return (
        <div className="max-w-lg mx-auto mt-12 p-6 border rounded-xl space-y-6">
            <h1 className="text-2xl font-bold">Cross-Chain Test</h1>
            <p className="text-sm text-gray-500">
                Send PAS from People Chain -&gt; Hub EVM via XCM.
                This validates the cross-chain bridge before full integration.
            </p>
            <p className="text-xs text-gray-400">Hub RPC: {HUB_RPC}</p>

            {/* Step 1 — MetaMask */}
            <div className="space-y-1">
                <p className="font-semibold">Step 1 — Hub Wallet (MetaMask)</p>
                {isConnected
                    ? <p className="text-green-600 text-sm">✅ {hubAddress}</p>
                    : <p className="text-sm text-gray-400">Connect MetaMask via header</p>}
            </div>

            {/* Step 2 — Talisman */}
            <div className="space-y-2">
                <p className="font-semibold">Step 2 — People Chain Wallet (Talisman)</p>
                {!talismanConnected
                    ? <button
                        onClick={connectTalisman}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm"
                    >Connect Talisman</button>
                    : <div className="text-sm space-y-1">
                        <p className="text-green-600">✅ {selectedAccount?.meta?.name}</p>
                        <p className="text-gray-500 font-mono text-xs">
                            {selectedAccount?.address}
                        </p>
                        <p className="text-gray-600">Balance: {peopleBalance} PAS</p>
                        {substrateAccounts.length > 1 && (
                            <select
                                className="border rounded p-1 text-xs"
                                onChange={(e) => {
                                    const acc = substrateAccounts.find((a) => a.address === e.target.value) || null;
                                    setSelectedAccount(acc);
                                    if (acc) fetchPeopleBalance(acc.address);
                                }}
                            >
                                {substrateAccounts.map((a) => (
                                    <option key={a.address} value={a.address}>
                                        {a.meta?.name || 'Account'} - {a.address.slice(0, 8)}...
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                }
            </div>

            {/* Step 3 — Amount + Send */}
            <div className="space-y-3">
                <p className="font-semibold">Step 3 — Send PAS to Hub</p>
                <div className="flex items-center gap-3">
                    <input
                        type="number"
                        value={amount}
                        min="0.1"
                        step="0.1"
                        onChange={(e) => setAmount(e.target.value)}
                        className="border rounded p-2 w-28 text-sm"
                    />
                    <span className="text-sm text-gray-500">PAS</span>
                </div>
                <p className="text-xs text-gray-400">
                    Destination: {hubAddress ?? 'connect MetaMask'}
                </p>
                <button
                    onClick={sendXCM}
                    disabled={sending || !isConnected || !talismanConnected}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold
                     disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {sending ? 'Sending...' : 'Send PAS via Talisman →'}
                </button>
            </div>

            {/* Status */}
            {status && (
                <div className={`p-3 rounded-lg text-sm ${
                    arrived
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-gray-50 text-gray-600 border border-gray-200'
                }`}>
                    {status}
                </div>
            )}

            {/* Balance tracker */}
            {balanceBefore !== null && (
                <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-1">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Hub balance before:</span>
                        <span>{fmt(balanceBefore)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Hub balance now:</span>
                        <span className={arrived ? 'text-green-600 font-bold' : ''}>
                            {fmt(balanceNow)}
                        </span>
                    </div>
                    {!arrived && (
                        <p className="text-xs text-gray-400 text-center pt-1">
                            polling every 3s... XCM takes ~30s
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
