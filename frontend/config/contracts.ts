import { getAddress } from 'viem';

export const CONTRACTS = {
    KREDIOLENDING: '0x717A1e2967af17CbE92abd70072aCe823a9B22B4',
    KREDIOPASMARKET: '0xE748Afa4c5e5bDD3c31c779759Baf294dFb7f95E',
    KREDIOSWAP: '0xaF1d183F4550500Beb517A3249780290A88E6e39',
    MOCKUSDC: '0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646',
    MOCKPASORACLE: '0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7',
    GOVERNANCECACHE: '0xe4de7eade2c0a65bda6863ad7ba22416c77f3e55',
    KREDITAGENT: '0x8c13E6fFDf27bB51304Efff108C9B646d148E5F3',
    CHAIN_ID: 420420417,
    RPC: 'https://eth-rpc-testnet.polkadot.io/',
    EXPLORER: 'https://paseo.subscan.io',
    FAUCET: 'https://faucet.polkadot.io/',
} as const;

export const KREDIO_SWAP_ADDRESS = '0xaF1d183F4550500Beb517A3249780290A88E6e39' as const;

export const KREDIO_SWAP_ABI = [
    { type: 'constructor', inputs: [{ name: '_mUSDC', type: 'address' }, { name: '_oracle', type: 'address' }], stateMutability: 'nonpayable' },
    { type: 'function', name: 'MAX_FEE_BPS', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'feeBps', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'fundReserve', inputs: [{ name: 'amount', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
    { type: 'function', name: 'mUSDC', inputs: [], outputs: [{ name: '', type: 'address' }], stateMutability: 'view' },
    { type: 'function', name: 'oracle', inputs: [], outputs: [{ name: '', type: 'address' }], stateMutability: 'view' },
    { type: 'function', name: 'owner', inputs: [], outputs: [{ name: '', type: 'address' }], stateMutability: 'view' },
    { type: 'function', name: 'quoteSwap', inputs: [{ name: 'pasWei', type: 'uint256' }], outputs: [{ name: 'mUSDCOut', type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'renounceOwnership', inputs: [], outputs: [], stateMutability: 'nonpayable' },
    { type: 'function', name: 'reserveBalance', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
    { type: 'function', name: 'setFee', inputs: [{ name: 'newFeeBps', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
    { type: 'function', name: 'swap', inputs: [{ name: 'minMUSDCOut', type: 'uint256' }], outputs: [], stateMutability: 'payable' },
    { type: 'function', name: 'transferOwnership', inputs: [{ name: 'newOwner', type: 'address' }], outputs: [], stateMutability: 'nonpayable' },
    { type: 'function', name: 'withdrawPAS', inputs: [], outputs: [], stateMutability: 'nonpayable' },
    { type: 'function', name: 'withdrawReserve', inputs: [{ name: 'amount', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
    { type: 'event', name: 'OwnershipTransferred', inputs: [{ name: 'previousOwner', type: 'address', indexed: true }, { name: 'newOwner', type: 'address', indexed: true }], anonymous: false },
    { type: 'event', name: 'ReserveFunded', inputs: [{ name: 'by', type: 'address', indexed: true }, { name: 'amount', type: 'uint256', indexed: false }], anonymous: false },
    { type: 'event', name: 'Swapped', inputs: [{ name: 'user', type: 'address', indexed: true }, { name: 'pasWei', type: 'uint256', indexed: false }, { name: 'mUSDCOut', type: 'uint256', indexed: false }], anonymous: false },
    { type: 'error', name: 'OwnableInvalidOwner', inputs: [{ name: 'owner', type: 'address' }] },
    { type: 'error', name: 'OwnableUnauthorizedAccount', inputs: [{ name: 'account', type: 'address' }] },
    { type: 'error', name: 'ReentrancyGuardReentrantCall', inputs: [] },
] as const;

export type AddressLike = `0x${string}`;

export const asAddress = (value: string): AddressLike => getAddress(value);
