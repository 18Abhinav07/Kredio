import { getAddress } from 'viem';

export const CONTRACTS = {
    KREDIOLENDING: '0x1eDaD1271FB9d1296939C6f4Fb762752b041C64E',
    KREDIOPASMARKET: '0x0F90Fe6141AC29a6031C3ae2155749e9f38a0174',
    KREDIOSWAP: '0xaF1d183F4550500Beb517A3249780290A88E6e39',
    MOCKUSDC: '0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646',
    MOCKPASORACLE: '0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7',
    GOVERNANCECACHE: '0xe4de7eade2c0a65bda6863ad7ba22416c77f3e55',
    KREDITAGENT: '0x8c13E6fFDf27bB51304Efff108C9B646d148E5F3',
    // Reused existing MockYieldPool (wired to new KredioLending post-deploy)
    MOCKYIELDPOOL: '0x1dB4Faad3081aAfe26eC0ef6886F04f28D944AAB',
    CHAIN_ID: 420420417,
    RPC: 'https://eth-rpc-testnet.polkadot.io/',
    EXPLORER: 'https://blockscout-testnet.polkadot.io',
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

// ─── ETH Bridge ────────────────────────────────────────────────────────────
// Fill in INBOX_SEPOLIA and BRIDGE_MINTER after deploying the bridge contracts.
// See contracts/script/DeployBridge.s.sol for deploy instructions.
export const BRIDGE = {
    // EthBridgeInbox deployed on Ethereum Sepolia (chainId 11155111)
    INBOX_SEPOLIA: (process.env.NEXT_PUBLIC_INBOX_SEPOLIA ?? '') as `0x${string}`,
    // KredioBridgeMinter deployed on Hub (chainId 420420417)
    MINTER: (process.env.NEXT_PUBLIC_BRIDGE_MINTER ?? '') as `0x${string}`,
    // Backend service URL (oracle feeder + bridge relayer)
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3002',
    // Sepolia chain ID
    SEPOLIA_CHAIN_ID: 11155111,
} as const;
