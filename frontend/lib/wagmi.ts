import { http, createConfig } from 'wagmi'
import { custom, injected } from 'wagmi/connectors'

export const paseoTestnet = {
    id: 420420417,
    name: 'Polkadot Hub TestNet',
    nativeCurrency: { name: 'PAS', symbol: 'PAS', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://eth-rpc-testnet.polkadot.io/'], webSocket: ['wss://asset-hub-paseo-rpc.n.dwellir.com'] },
    },
    blockExplorers: {
        default: { name: 'Blockscout', url: 'https://blockscout-testnet.polkadot.io/' },
    },
} as const;

export const wagmiConfig = createConfig({
    chains: [paseoTestnet],
    connectors: [
        injected(),
    ],
    transports: {
        [paseoTestnet.id]: http('https://eth-rpc-testnet.polkadot.io/'),
    },
});
