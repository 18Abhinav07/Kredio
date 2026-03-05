import { getAddress } from 'viem';

export const CONTRACTS = {
    KREDIOLENDING: '0x717A1e2967af17CbE92abd70072aCe823a9B22B4',
    KREDIOPASMARKET: '0xE748Afa4c5e5bDD3c31c779759Baf294dFb7f95E',
    MOCKUSDC: '0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646',
    MOCKPASORACLE: '0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7',
    GOVERNANCECACHE: '0xe4de7eade2c0a65bda6863ad7ba22416c77f3e55',
    KREDITAGENT: '0x8c13E6fFDf27bB51304Efff108C9B646d148E5F3',
    CHAIN_ID: 420420417,
    RPC: 'https://eth-rpc-testnet.polkadot.io/',
    EXPLORER: 'https://paseo.subscan.io',
    FAUCET: 'https://faucet.polkadot.io/',
} as const;

export type AddressLike = `0x${string}`;

export const asAddress = (value: string): AddressLike => getAddress(value);
