import { defineChain } from 'viem'
import { http, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'

export const passetHub = defineChain({
    id: 420420417,
    name: 'Passet Hub TestNet',
    nativeCurrency: { name: 'PAS', symbol: 'PAS', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://eth-rpc-testnet.polkadot.io/'] },
    },
    blockExplorers: {
        default: { name: 'Subscan', url: 'https://paseo.subscan.io/' },
    },
    testnet: true,
});

export const wagmiConfig = createConfig({
    chains: [passetHub],
    connectors: [
        injected(),
    ],
    transports: {
        [passetHub.id]: http('https://eth-rpc-testnet.polkadot.io/'),
    },
});

// Backward compat alias
export const paseoTestnet = passetHub;
