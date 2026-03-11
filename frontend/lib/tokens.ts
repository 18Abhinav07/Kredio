// ─── Token Registry - Phase 1 ───────────────────────────────────────
// Single source of truth for all token metadata used in the frontend.
// PAS is native (no ERC-20 address). Everything else has a contract.

export type TokenDef = {
    symbol: string;
    name: string;
    decimals: number;
    assetId: number | null;
    badge: { label: string; color: string; border: string };
    faucet?: { amount: bigint; label: string };
};

// ── PAS (native) ────────────────────────────────────────────────────
export const PAS: TokenDef = {
    symbol: 'PAS',
    name: 'Polkadot Hub Testnet',
    decimals: 18,
    assetId: null,
    badge: { label: 'Native', color: 'bg-pink-500/20 text-pink-300', border: 'border-pink-500/30' },
};

// ── tUSDC (test stablecoin) ─────────────────────────────────────────
export const TUSDC: TokenDef = {
    symbol: 'mUSDC',
    name: 'Mock USD Coin',
    decimals: 6,
    assetId: 8888,
    badge: { label: 'Protocol Stable', color: 'bg-yellow-500/20 text-yellow-300', border: 'border-yellow-500/30' },
    faucet: { amount: 1_000n * 10n ** 6n, label: 'Mint 1,000 mUSDC' },
};

// ── Ordered list used by WalletPanel ────────────────────────────────
export const ALL_TOKENS: TokenDef[] = [PAS, TUSDC];
