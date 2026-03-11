import { defineChain } from 'viem'
import { sepolia } from 'viem/chains'
import { http, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { CONTRACTS } from '../config/contracts'

export const passetHub = defineChain({
    id: CONTRACTS.CHAIN_ID,
    name: 'Polkadot Hub Paseo Testnet',
    nativeCurrency: { name: 'PAS', symbol: 'PAS', decimals: 18 },
    rpcUrls: {
        default: { http: [CONTRACTS.RPC] },
    },
    blockExplorers: {
        default: { name: 'Subscan', url: CONTRACTS.EXPLORER },
    },
    testnet: true,
});

// Sepolia is supported for the ETH bridge inbox deposits.
// MetaMask will auto-switch to it when the user selects "Ethereum Sepolia"
// in the bridge UI (useSwitchChain({ chainId: sepolia.id })).
export { sepolia };

export const SEPOLIA_CHAIN_ID = sepolia.id; // 11155111

export const wagmiConfig = createConfig({
    chains: [passetHub, sepolia],
    connectors: [
        injected(),
    ],
    transports: {
        [passetHub.id]: http(CONTRACTS.RPC),
        // Explicit public RPC - viem's default (thirdweb) blocks CORS from localhost
        [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com'),
    },
});

// Backward compat alias
export const paseoTestnet = passetHub;
