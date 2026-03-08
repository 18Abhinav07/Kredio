import { CONTRACTS, asAddress } from '../config/contracts';

export const ZERO_ADDR = '0x0000000000000000000000000000000000000000' as const;
export const isDeployed = (addr: string | null | undefined): addr is `0x${string}` =>
    !!addr && addr !== ZERO_ADDR;

export type NetworkConfig = {
    swap: `0x${string}`;
    lending: `0x${string}`;
    pasMarket: `0x${string}`;
    mUSDC: `0x${string}`;
    oracle: `0x${string}`;
    governanceCache: `0x${string}`;
    kreditAgent: `0x${string}`;
    yieldPool: `0x${string}`;
    chainId: number;
    rpc: string;
    explorer: string;
    faucet: string;
    owner: `0x${string}`;
};

export const config: NetworkConfig = {
    swap: asAddress(CONTRACTS.KREDIOSWAP),
    lending: asAddress(CONTRACTS.KREDIOLENDING),
    pasMarket: asAddress(CONTRACTS.KREDIOPASMARKET),
    mUSDC: asAddress(CONTRACTS.MOCKUSDC),
    oracle: asAddress(CONTRACTS.MOCKPASORACLE),
    governanceCache: asAddress(CONTRACTS.GOVERNANCECACHE),
    kreditAgent: asAddress(CONTRACTS.KREDITAGENT),
    yieldPool: asAddress(CONTRACTS.MOCKYIELDPOOL),
    chainId: CONTRACTS.CHAIN_ID,
    rpc: CONTRACTS.RPC,
    explorer: CONTRACTS.EXPLORER,
    faucet: CONTRACTS.FAUCET,
    owner: '0xe37a8983570B39F305fe93D565A29F89366f3fFe',
};

export const legacyAliases = {
    tUSDC: config.mUSDC,
};

export default config;

