// ─── Token Registry — Phase 1 ───────────────────────────────────────
// Single source of truth for all token metadata used in the frontend.
// PAS is native (no ERC-20 address). Everything else has a contract.

export type TokenDef = {
    symbol: string;
    name: string;
    decimals: number;
    assetId: number | null;      // swap contract asset ID (null = native PAS)
    badge: { label: string; color: string; border: string };
    faucet?: { amount: bigint; label: string };
    wrap?: { direction: 'wrap' | 'unwrap'; counterpart: string };
};

// ── PAS (native) ────────────────────────────────────────────────────
export const PAS: TokenDef = {
    symbol: 'PAS',
    name: 'Polkadot Hub Testnet',
    decimals: 18,
    assetId: null,
    badge: { label: 'Native', color: 'bg-pink-500/20 text-pink-300', border: 'border-pink-500/30' },
};

// ── WPAS (wrapped PAS) ──────────────────────────────────────────────
export const WPAS: TokenDef = {
    symbol: 'WPAS',
    name: 'Wrapped PAS',
    decimals: 18,
    assetId: 9999,
    badge: { label: 'Wrapped PAS', color: 'bg-orange-500/20 text-orange-300', border: 'border-orange-500/30' },
    wrap: { direction: 'unwrap', counterpart: 'PAS' },
};

// ── tUSDC (test stablecoin) ─────────────────────────────────────────
export const TUSDC: TokenDef = {
    symbol: 'tUSDC',
    name: 'Test USD Coin',
    decimals: 6,
    assetId: 8888,
    badge: { label: 'Testnet Mock', color: 'bg-yellow-500/20 text-yellow-300', border: 'border-yellow-500/30' },
    faucet: { amount: 1_000n * 10n ** 6n, label: 'Mint 1,000 tUSDC' },
};

// ── tvtUSDC (vault shares, read-only display) ───────────────────────
export const TVTUSDC: TokenDef = {
    symbol: 'tvtUSDC',
    name: 'Tesseract Vault tUSDC',
    decimals: 6,  // shares track underlying decimals (1:1 on first deposit)
    assetId: null,
    badge: { label: 'Vault Share', color: 'bg-green-500/20 text-green-300', border: 'border-green-500/30' },
};

// ── Ordered list used by WalletPanel and SwapWidget ─────────────────
export const ALL_TOKENS: TokenDef[] = [PAS, WPAS, TUSDC, TVTUSDC];

// Swappable tokens (registered in the swap contract, excludes PAS native)
export const SWAP_TOKENS: TokenDef[] = [WPAS, TUSDC];

// Helper: find token by symbol
export function getToken(symbol: string): TokenDef | undefined {
    return ALL_TOKENS.find(t => t.symbol === symbol);
}
