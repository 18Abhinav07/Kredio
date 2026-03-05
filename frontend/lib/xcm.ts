import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { Builder } from '@paraspell/sdk-pjs';
import { hexToU8a } from '@polkadot/util';
import { encodeAddress } from '@polkadot/util-crypto';
import { formatUnits } from 'viem';

export const PEOPLE_RPC = 'wss://people-paseo.rpc.amforc.com';
export const PAS_SUBSTRATE_DECIMALS = 10;
export const PAS_EVM_DECIMALS = 18;
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
    intervalMs?: number;
};

export function h160ToSS58(evmAddress: string): string {
    const h160 = hexToU8a(evmAddress);
    if (h160.length !== 20) {
        throw new Error('Invalid EVM address: expected 20-byte H160');
    }

    const pad = new Uint8Array(12).fill(0xee);
    const id32 = new Uint8Array(32);
    id32.set(h160, 0);
    id32.set(pad, 20);
    return encodeAddress(id32, 0);
}

export function formatPASFromEVM(wei: bigint): string {
    return Number.parseFloat(formatUnits(wei, PAS_EVM_DECIMALS)).toFixed(4);
}

export function formatPASFromPeople(raw: bigint): string {
    return Number.parseFloat(formatUnits(raw, PAS_SUBSTRATE_DECIMALS)).toFixed(4);
}

export async function fetchPeopleBalance(address: string): Promise<bigint> {
    const provider = new WsProvider(PEOPLE_RPC);
    const api = await ApiPromise.create({ provider });
    try {
        const acct = await api.query.system.account(address);
        const free = BigInt((acct as unknown as { data: { free: { toString: () => string } } }).data.free.toString());
        return free;
    } finally {
        await api.disconnect();
    }
}

function toSubstrateAmount(amountPAS: string): string {
    const parsed = Number.parseFloat(amountPAS);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        throw new Error('Amount must be greater than 0');
    }
    return String(Math.round(parsed * 10 ** PAS_SUBSTRATE_DECIMALS));
}

function normalizeXcmError(error: unknown): Error {
    const message = error instanceof Error ? error.message : String(error);
    if (/cancel|reject|denied|declined/i.test(message)) {
        return new Error('Transaction cancelled.');
    }
    return new Error(message || 'XCM transfer failed');
}

export async function sendXCMToHub(params: SendXcmParams): Promise<{ blockHash: string }> {
    const { senderAddress, destinationEVM, amountPAS, onStatus } = params;
    let api: ApiPromise | null = null;

    try {
        onStatus?.('connecting', 'Connecting to People Chain...');
        const provider = new WsProvider(PEOPLE_RPC);
        api = await ApiPromise.create({ provider });

        onStatus?.('building', 'Building XCM transaction...');
        const amount = toSubstrateAmount(amountPAS);
        const ss58Dest = h160ToSS58(destinationEVM);

        const tx = await Builder(api)
            .from('PeoplePaseo')
            .to('AssetHubPaseo')
            .currency({ symbol: 'PAS', amount })
            .address(ss58Dest)
            .senderAddress(senderAddress)
            .build();

        onStatus?.('awaiting_signature', 'Waiting for Talisman signature...');
        const injector = await web3FromAddress(senderAddress);

        return await new Promise<{ blockHash: string }>((resolve, reject) => {
            tx.signAndSend(
                senderAddress,
                { signer: injector.signer, nonce: -1 },
                ({ status, dispatchError }: { status: { isBroadcast?: boolean; isInBlock: boolean; isFinalized: boolean; asFinalized?: { toHex: () => string } }; dispatchError?: { toString: () => string } }) => {
                    if (status.isBroadcast) {
                        onStatus?.('broadcasting', 'Broadcasting to network...');
                    }
                    if (status.isInBlock) {
                        onStatus?.('in_block', 'In block - waiting for finalization...');
                    }
                    if (status.isFinalized) {
                        if (dispatchError) {
                            reject(new Error(dispatchError.toString()));
                            return;
                        }
                        onStatus?.('finalized', 'Finalized on People Chain.');
                        const blockHash = status.asFinalized?.toHex?.() ?? '';
                        resolve({ blockHash });
                    }
                },
            ).catch((err: unknown) => reject(err));
        });
    } catch (error: unknown) {
        throw normalizeXcmError(error);
    } finally {
        if (api) {
            await api.disconnect();
        }
    }
}

export function pollHubArrival(params: PollHubArrivalParams): () => void {
    const { address, before, publicClient, onArrival, onTick, intervalMs = 3000 } = params;

    let stopped = false;
    const timer = setInterval(async () => {
        if (stopped) return;

        const current = await publicClient.getBalance({ address });
        onTick?.(current);

        if (current > before) {
            stopped = true;
            clearInterval(timer);
            onArrival(current - before);
        }
    }, intervalMs);

    return () => {
        stopped = true;
        clearInterval(timer);
    };
}
