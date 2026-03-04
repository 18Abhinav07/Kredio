// ─── Address Configuration — Phase 1 ────────────────────────────────
// All contract addresses loaded from env vars.
// Set NEXT_PUBLIC_NETWORK=hubTestnet for real precompiles.
//
// IMPORTANT: Next.js only inlines NEXT_PUBLIC_* when accessed via
// process.env.NEXT_PUBLIC_XXX (dot notation). Dynamic bracket access
// like process.env[key] does NOT work in the browser bundle.

export const ZERO_ADDR = '0x0000000000000000000000000000000000000000' as const;
export const isDeployed = (addr: string | null | undefined): addr is `0x${string}` =>
    !!addr && addr !== ZERO_ADDR;

export type NetworkConfig = {
    swap: `0x${string}`;
    vault: `0x${string}`;
    compute: `0x${string}`;
    wpas: `0x${string}`;
    tUSDC: `0x${string}`;
    xcm: `0x${string}`;
    system: `0x${string}`;
    chainId: number;
    rpc: string;
    explorer: string;
    faucet: string;
};

const addr = (v: string | undefined): `0x${string}` =>
    (v || ZERO_ADDR) as `0x${string}`;

const localConfig: NetworkConfig = {
    swap: addr(process.env.NEXT_PUBLIC_SWAP_ADDR),
    vault: addr(process.env.NEXT_PUBLIC_VAULT_ADDR),
    compute: addr(process.env.NEXT_PUBLIC_COMPUTE_ADDR),
    wpas: addr(process.env.NEXT_PUBLIC_WPAS_ADDR),
    tUSDC: addr(process.env.NEXT_PUBLIC_TUSDC_ADDR),
    xcm: ZERO_ADDR as `0x${string}`,
    system: ZERO_ADDR as `0x${string}`,
    chainId: 31337,
    rpc: 'http://127.0.0.1:8545',
    explorer: '',
    faucet: '',
};

const hubTestnetConfig: NetworkConfig = {
    swap: addr(process.env.NEXT_PUBLIC_SWAP_ADDR),
    vault: addr(process.env.NEXT_PUBLIC_VAULT_ADDR),
    compute: addr(process.env.NEXT_PUBLIC_COMPUTE_ADDR),
    wpas: addr(process.env.NEXT_PUBLIC_WPAS_ADDR),
    tUSDC: addr(process.env.NEXT_PUBLIC_TUSDC_ADDR),
    xcm: '0x00000000000000000000000000000000000a0000' as `0x${string}`,
    system: '0x0000000000000000000000000000000000000900' as `0x${string}`,
    chainId: 420420417,
    rpc: 'https://eth-rpc-testnet.polkadot.io/',
    explorer: 'https://paseo.subscan.io',
    faucet: 'https://faucet.polkadot.io/',
};

const network = process.env.NEXT_PUBLIC_NETWORK || 'local';
export const config: NetworkConfig = network === 'hubTestnet' ? hubTestnetConfig : localConfig;
export default config;

