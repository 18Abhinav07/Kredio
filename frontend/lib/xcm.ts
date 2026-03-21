import { formatUnits, isAddress, parseUnits } from 'viem';
import type { ApiPromise as PolkadotApiPromise } from '@polkadot/api';

// Primary: wss://sys.ibp.network/people-paseo is the only officially listed
// People Paseo endpoint on paseo.site; others kept as fallbacks.
export const PEOPLE_RPC = 'wss://people-paseo.rpc.amforc.com';
export const PEOPLE_RPCS = [
    PEOPLE_RPC,
    'wss://sys.ibp.network/people-paseo',
    'wss://people-paseo.rpc.amforc.com',
    'wss://people-paseo.dotters.network',
    // NOTE: wss://rpc.people-paseo.luckyfriday.io was removed - endpoint is dead (2026-03-20)
];
export const PAS_SUBSTRATE_DECIMALS = 10; // PAS on People Chain (Substrate) = 10 decimals (1 PAS = 10^10 planck)
export const PAS_EVM_DECIMALS = 18;        // PAS on Asset Hub EVM (Frontier) = 18 decimals
export const MUSDC_DECIMALS = 6;

export type XcmStatusStage =
    | 'connecting'
    | 'building'
    | 'awaiting_signature'
    | 'broadcasting'
    | 'in_block'
    | 'finalized';

export type SendXcmParams = {
    senderAddress: string;
    destinationEVM: `0x${string}`;
    amountPAS: string;
    onStatus?: (stage: XcmStatusStage, detail?: string) => void;
};

export type PollHubArrivalParams = {
    address: `0x${string}`;
    before: bigint;
    publicClient: {
        getBalance: (args: { address: `0x${string}` }) => Promise<bigint>;
    };
    onArrival: (delta: bigint) => void;
    onTick?: (current: bigint) => void;
    onError?: (err: string) => void;
    intervalMs?: number;
    maxDurationMs?: number;
    onTimeout?: (elapsedMs: number) => void;
};

async function withPeopleApi<T>(work: (api: PolkadotApiPromise) => Promise<T>): Promise<T> {
    const { ApiPromise, WsProvider } = await import('@polkadot/api');
    const tried: string[] = [];
    let lastError: unknown;

    for (const endpoint of PEOPLE_RPCS) {
        let api: InstanceType<typeof ApiPromise> | null = null;
        try {
            // 10-second connect timeout so dead endpoints don't stall the whole flow
            const provider = new WsProvider(endpoint, 1000, {}, 10_000);
            api = await ApiPromise.create({ provider });
            return await work(api);
        } catch (error) {
            tried.push(endpoint);
            lastError = error;
        } finally {
            if (api) {
                try { await api.disconnect(); } catch { /* ignore */ }
            }
        }
    }

    const reason = lastError instanceof Error ? lastError.message : String(lastError ?? 'Unknown RPC error');
    throw new Error(`People Chain RPC unavailable (${tried.join(', ')}): ${reason}`);
}

// Converts an EVM H160 address to the SS58 AccountId32 used by Asset Hub Paseo's Frontier EVM.
// The mapping is: AccountId32 = H160_bytes (first 20 bytes) || 0xEE × 12 (last 12 bytes).
// This is the encoding that Asset Hub Frontier resolves for eth_getBalance — PAS arriving at
// this AccountId32 shows in MetaMask immediately via eth_getBalance on the original H160.
export async function h160ToSS58(evmAddress: string): Promise<string> {
    const { hexToU8a } = await import('@polkadot/util');
    const { encodeAddress } = await import('@polkadot/util-crypto');
    const h160 = hexToU8a(evmAddress);
    if (h160.length !== 20) {
        throw new Error('Invalid EVM address: expected 20-byte H160');
    }
    const id32 = new Uint8Array(32);
    id32.set(h160, 0);       // H160 in first 20 bytes
    id32.fill(0xee, 20);     // 0xEE padding in last 12 bytes
    return encodeAddress(id32, 0);
}

export function formatPASFromEVM(wei: bigint): string {
    return Number.parseFloat(formatUnits(wei, PAS_EVM_DECIMALS)).toFixed(4);
}

export function formatPASFromPeople(raw: bigint): string {
    return Number.parseFloat(formatUnits(raw, PAS_SUBSTRATE_DECIMALS)).toFixed(4);
}

export async function fetchPeopleBalance(address: string): Promise<bigint> {
    return withPeopleApi(async (api) => {
        const acct = await api.query.system.account(address);
        const free = BigInt((acct as unknown as { data: { free: { toString: () => string } } }).data.free.toString());
        return free;
    });
}

function toSubstrateAmount(amountPAS: string): string {
    const parsed = Number.parseFloat(amountPAS);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        throw new Error('Amount must be greater than 0');
    }
    return parseUnits(amountPAS, PAS_SUBSTRATE_DECIMALS).toString();
}

function normalizeXcmError(error: unknown): Error {
    const message = error instanceof Error ? error.message : String(error);
    if (/cancel|reject|denied|declined/i.test(message)) {
        return new Error('Transaction cancelled.');
    }
    return new Error(message || 'XCM transfer failed');
}

async function getBuilder(api: any) {
    const { Builder } = await import("@paraspell/sdk-pjs");
    return Builder(api);
}

export async function sendXCMToHub(params: SendXcmParams): Promise<{ blockHash: string }> {
    const { senderAddress, destinationEVM, amountPAS, onStatus } = params;
    if (!isAddress(destinationEVM)) {
        throw new Error('Invalid Hub EVM destination address.');
    }

    try {
        return await withPeopleApi(async (api) => {
            onStatus?.('connecting', 'Connecting to People Chain...');
            onStatus?.('building', 'Building XCM transaction...');

            const amount = toSubstrateAmount(amountPAS);

            // Convert EVM address to the SS58 AccountId32 that Asset Hub Frontier uses
            // for eth_getBalance. Encoding: H160 (first 20 bytes) || 0xEE×12 (last 12 bytes).
            // This produces a valid SS58 that ParaSpell accepts AND that maps back to the
            // EVM wallet — confirmed working in production.
            const { encodeAddress } = await import('@polkadot/util-crypto');
            const { hexToU8a } = await import('@polkadot/util');
            const h160 = hexToU8a(destinationEVM);
            const id32 = new Uint8Array(32);
            id32.set(h160, 0);
            id32.fill(0xee, 20);
            const ss58Dest = encodeAddress(id32, 0);

            const builder = await getBuilder(api);
            const tx = await builder
                .from('PeoplePaseo')
                .to('AssetHubPaseo')
                .currency({ symbol: 'PAS', amount })
                .address(ss58Dest)
                .senderAddress(senderAddress)
                .build();

            onStatus?.('awaiting_signature', 'Waiting for Talisman signature...');
            const { web3FromAddress } = await import('@polkadot/extension-dapp');
            const injector = await web3FromAddress(senderAddress);

            return await new Promise<{ blockHash: string }>((resolve, reject) => {
                let unsub: (() => void) | null = null;
                const cleanup = () => {
                    if (unsub) { try { unsub(); } catch { /* ignore */ } unsub = null; }
                };

                tx.signAndSend(
                    senderAddress,
                    { signer: injector.signer, nonce: -1 },
                    ({ status, dispatchError }: {
                        status: { isBroadcast?: boolean; isInBlock: boolean; isFinalized: boolean; asFinalized?: { toHex: () => string } };
                        dispatchError?: { isModule?: boolean; asModule?: unknown; toString: () => string };
                    }) => {
                        if (status.isBroadcast) onStatus?.('broadcasting', 'Broadcasting to network...');
                        if (status.isInBlock) onStatus?.('in_block', 'In block - waiting for finalization...');
                        if (status.isFinalized) {
                            if (dispatchError) {
                                cleanup();
                                if (dispatchError.isModule && dispatchError.asModule) {
                                    const decoded = api.registry.findMetaError(
                                        dispatchError.asModule as Parameters<typeof api.registry.findMetaError>[0]
                                    );
                                    reject(new Error(`${decoded.section}.${decoded.name}: ${decoded.docs.join(' ')}`));
                                    return;
                                }
                                reject(new Error(dispatchError.toString()));
                                return;
                            }
                            onStatus?.('finalized', 'Finalized on People Chain.');
                            cleanup();
                            resolve({ blockHash: status.asFinalized?.toHex?.() ?? '' });
                        }
                    },
                )
                    .then((u) => { unsub = u; })
                    .catch((err: unknown) => { cleanup(); reject(err); });
            });
        });
    } catch (error: unknown) {
        throw normalizeXcmError(error);
    }
}

export function pollHubArrival(params: PollHubArrivalParams): () => void {
    const { address, before, publicClient, onArrival, onTick, onError, intervalMs = 3000, maxDurationMs = 120000, onTimeout } = params;

    let stopped = false;
    let consecutiveErrors = 0;
    const startedAt = Date.now();
    const timer = setInterval(async () => {
        if (stopped) return;

        try {
            const current = await publicClient.getBalance({ address });
            consecutiveErrors = 0;
            onTick?.(current);

            if (current > before) {
                stopped = true;
                clearInterval(timer);
                onArrival(current - before);
                return;
            }
        } catch (err) {
            consecutiveErrors++;
            const msg = err instanceof Error ? err.message : String(err);
            console.warn(`[pollHubArrival] getBalance error #${consecutiveErrors}:`, msg);
            if (consecutiveErrors >= 3) {
                onError?.(`Hub RPC error (${consecutiveErrors}x): ${msg}`);
            }
        }

        if (Date.now() - startedAt >= maxDurationMs) {
            stopped = true;
            clearInterval(timer);
            onTimeout?.(Date.now() - startedAt);
        }
    }, intervalMs);

    return () => {
        stopped = true;
        clearInterval(timer);
    };
}
