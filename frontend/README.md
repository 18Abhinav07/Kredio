# Kredio Frontend

Next.js application for the Kredio DeFi credit protocol on Polkadot Asset Hub EVM.

---

## Contents

1. [Technology Stack](#technology-stack)
2. [Directory Structure](#directory-structure)
3. [Pages](#pages)
4. [Hooks](#hooks)
5. [Library Utilities](#library-utilities)
6. [Contract Configuration](#contract-configuration)
7. [Environment Variables](#environment-variables)
8. [Running Locally](#running-locally)
9. [Production Build](#production-build)
10. [Network Configuration](#network-configuration)

---

## Technology Stack

| Package | Version | Purpose |
|---------|---------|---------|
| Next.js | 16 (App Router) | React framework - SSR, routing, API routes |
| React | 19 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3 | Utility-first styling |
| wagmi | v3 | EVM wallet hooks and transaction management |
| viem | v2 | Low-level EVM RPC client |
| RainbowKit | v2 | Wallet connect UX |
| @polkadot/api | 16 | Substrate/AssetHub RPC - for XCM and native queries |
| @paraspell/sdk-pjs | Latest | XCM intent builder |

---

## Directory Structure

```
frontend/
├── app/                      ← Next.js App Router pages
│   ├── layout.tsx            ← Root layout with provider wrappers
│   ├── page.tsx              ← Landing page
│   ├── dashboard/            ← Portfolio summary
│   ├── score/                ← Credit score display and history
│   ├── lend/                 ← Deposit and withdraw liquidity
│   ├── borrow/               ← Open and manage loan positions
│   ├── positions/            ← All active positions (lend + borrow)
│   ├── liquidate/            ← Liquidation monitor and executor
│   ├── swap/                 ← PAS → mUSDC swap interface
│   ├── bridge/               ← ETH → mUSDC cross-chain bridge
│   ├── markets/              ← Live protocol market data
│   └── admin/                ← Admin tools (oracle updates, governance cache)
├── components/
│   ├── landing-modules/      ← Sections for the landing page
│   ├── modules/              ← Shared page-level UI modules
│   └── providers/            ← wagmi / RainbowKit / Polkadot provider tree
├── config/
│   └── contracts.ts          ← All contract addresses keyed by chain ID
├── hooks/                    ← Protocol-level React hooks
│   ├── useAccess.ts
│   ├── useProtocolData.ts
│   ├── useProtocolActions.ts
│   └── useEthBridge.ts
├── lib/
│   ├── addresses.ts          ← Address helpers
│   ├── constants.ts          ← ABIs and protocol constants
│   ├── tokens.ts             ← Token definitions
│   ├── input.ts              ← Input parsing helpers
│   └── action-log.ts         ← Client-side transaction log
├── styles/
│   └── globals.css           ← Tailwind base styles
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Product landing page with protocol overview and entry points |
| `/dashboard` | Portfolio view: total supplied, total borrowed, net yield, credit tier |
| `/score` | Credit score dial with tier breakdown, repayment history, and scoring explanation |
| `/lend` | Deposit mUSDC to earn yield; view current APY and pending earnings |
| `/borrow` | Post collateral and draw a loan; displays credit tier rate and health ratio |
| `/positions` | Active lending and borrowing positions with real-time health ratios |
| `/liquidate` | Lists at-risk positions; one-click liquidation with expected profit display |
| `/swap` | Swap native PAS to mUSDC at the live oracle price; shows quote before execution |
| `/bridge` | Source-chain ETH deposit form, bridge status tracker, and history |
| `/markets` | Protocol-wide stats: TVL, utilisation, supply/borrow rates, oracle price |
| `/admin` | Oracle price updates, governance data cache, protocol parameter overview |

---

## Hooks

### `useAccess`

Checks wallet connection state and chain compatibility.

```ts
const { isConnected, isCorrectChain, switchToAssetHub } = useAccess()
```

Returns a typed `SwitchChainResult` from wagmi when switching.

---

### `useProtocolData`

Reads all live on-chain state needed to render the protocol pages.

```ts
const {
  creditScore,       // u64 - raw score from KreditAgent
  creditTier,        // 0–5
  collateralRatio,   // bps
  interestRate,      // bps
  healthRatio,       // scaled × 100
  lendingPosition,   // { deposited, pendingYield }
  borrowPosition,    // { collateral, debt }
  pasPrice,          // USD × 1e8
  protocolTotals,    // { totalLiquidity, totalBorrowed, utilization }
  isLoading,
  refetch,
} = useProtocolData()
```

All reads are made with `useReadContracts` in a single batched RPC call.

---

### `useProtocolActions`

Prepares and executes write transactions for every supported user action.

```ts
const { deposit, withdraw, depositCollateral, borrow, repay, liquidate, swap } = useProtocolActions()
```

Each action returns `{ write, isPending, isSuccess, txHash, error }`. Transactions are prepared with `useSimulateContract` before execution to surface errors before the user signs.

---

### `useEthBridge`

Multi-stage cross-chain bridge flow: source-chain deposit → backend relay detection → Hub-side mint.

```ts
const {
  stage,             // BridgeStage enum
  depositOnSource,   // (ethAmount: bigint) => void
  bridgeStatus,      // 'idle' | 'submitted' | 'relaying' | 'minted' | 'failed'
  sourceTxHash,
  hubTxHash,
  error,
} = useEthBridge()
```

**`BridgeStage`:** `Idle → SubmittedSource → RelayDetected → MintedOnHub`

Polls the backend `/api/bridge/status/:txHash` endpoint at 6-second intervals after a source deposit.

---

## Library Utilities

### `lib/constants.ts`

ABIs for all on-chain contracts: `LENDING_ABI`, `PAS_MARKET_ABI`, `SWAP_ABI`, `ORACLE_ABI`, `XCM_SETTLER_ABI`, `KREDIT_AGENT_ABI`. Token constants and decimal helpers.

### `lib/tokens.ts`

Token definitions including native PAS and mUSDC with decimals, symbols, and logo URIs.

### `lib/input.ts`

`parseUnits` wrappers with validation; converts string amounts into `bigint` wei amounts for contract calls.

### `lib/action-log.ts`

Client-side (localStorage) append-only log for submitted transactions. Used by `/positions` and `/dashboard` for recent activity display without requiring an indexer.

---

## Contract Configuration

**`config/contracts.ts`** - typed address map keyed by chain ID:

| Contract Name | Chain ID `420420417` |
|---------------|---------------------|
| `KredioLending` | `0x1eDaD1271FB9d1296939C6f4Fb762752b041C64E` |
| `KredioPASMarket` | `0x0F90Fe6141AC29a6031C3ae2155749e9f38a0174` |
| `KredioSwap` | `0xaF1d183F4550500Beb517A3249780290A88E6e39` |
| `KredioXCMSettler` | `0xbaaE8f7b97ac387DE8C433A218d63166Ce104Bb1` |
| `KredioAccountRegistry` | `0xBf7ac0e6f0024ED0F2Cf2efb3669E7c389258BFf` |
| `PASOracle` | `0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7` |
| `mUSDC` | `0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646` |
| `GovernanceCache` | `0xe4DE7eadE2c0A65BdA6863Ad7bA22416c77F3e55` |
| `YieldPool` | `0x1dB4Faad3081aAfe26eC0ef6886F04f28D944AAB` |
| `KreditAgent` (ink!) | `0x8c13E6fFDf27bB51304Efff108C9B646d148E5F3` |

The following contracts are called by the backend AI Engine and are not directly queried by the frontend. They are listed here as a deployment reference:

| Contract | Address |
|---|---|
| `NeuralScorer` (PVM) | `0xac6bd3ff3447d8d1689dd4f02899ff558f108e0d` |
| `RiskAssessor` (PVM) | `0xdB9E48932E061D95E22370235ac3a35332d289f7` |
| `YieldMind` (PVM) | `0x0b68fbfb596846e4f3a23da10365e0888a182ef3` |

---

## Environment Variables

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3002
NEXT_PUBLIC_INBOX_SEPOLIA=<EthBridgeInbox address on Sepolia>
NEXT_PUBLIC_BRIDGE_MINTER=<KredioBridgeMinter address on Asset Hub>
```

---

## Running Locally

```bash
cd frontend
npm install
npm run dev       # Starts dev server at http://localhost:3000
```

The dev server proxies backend calls to `NEXT_PUBLIC_BACKEND_URL`. Ensure the backend is running on port 3002 first.

---

## Production Build

```bash
npm run build     # Type-checks + bundles
npm start         # Serves the production build on port 3000
```

---

## Network Configuration

### Supported Chains

| Chain | Chain ID | RPC | Explorer |
|-------|---------|-----|---------|
| Polkadot Asset Hub Testnet | `420420417` | `https://eth-rpc-testnet.polkadot.io/` | `https://blockscout-testnet.polkadot.io` |
| Ethereum Sepolia (bridge) | `11155111` | `https://rpc.sepolia.org` | `https://sepolia.etherscan.io` |

### Manual MetaMask configuration (Polkadot Asset Hub Testnet)

| Parameter | Value |
|-----------|-------|
| Network Name | Polkadot Asset Hub Testnet |
| New RPC URL | `https://eth-rpc-testnet.polkadot.io/` |
| Chain ID | `420420417` |
| Currency Symbol | `PAS` |
| Block Explorer URL | `https://blockscout-testnet.polkadot.io` |

Testnet PAS faucet: `https://faucet.polkadot.io/`
