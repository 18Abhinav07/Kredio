# Kredio Contracts

Solidity and ink! / Rust smart contracts for the Kredio DeFi credit protocol, deployed on **Polkadot Asset Hub EVM** (chain ID `420420417`). The EVM layer is built with Foundry; the ink! Wasm contracts are built with `cargo-contract`.

---

## Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Contract Reference - EVM](#contract-reference--evm)
4. [Contract Reference - ink!](#contract-reference--ink)
5. [Credit Scoring Algorithm](#credit-scoring-algorithm)
6. [Deployed Addresses](#deployed-addresses)
7. [Prerequisites](#prerequisites)
8. [Build](#build)
9. [Deploy](#deploy)
10. [Testing](#testing)

---

## Overview

The Kredio contract suite spans three execution layers on Polkadot Asset Hub EVM:

**EVM (Solidity)** - User-facing capital flows: lending, collateral markets, swapping, cross-chain bridging, XCM intent settlement, account identity, and governance participation caching. All capital state lives here.

**ink! Wasm - `KreditAgent`** - Deterministic on-chain credit scoring engine. Invoked by EVM market contracts via SCALE-encoded cross-VM `staticcall` in the same block, with no off-chain dependency. Every borrow computes a fresh score atomically and locks the resulting collateral ratio and rate into the position.

**ink! PVM - `NeuralScorer`, `RiskAssessor`, `YieldMind`** - Continuous AI-layer assessment. The backend AI Engine calls these three contracts on every `KredioLending` event and during a 50-block (~5-minute) periodic sweep. Each run emits a full on-chain audit event (`ScoreInferred`, `RiskAssessed`, `AllocationComputed`) visible on the block explorer.

> The EVM ↔ Wasm cross-VM `staticcall` using hardcoded SCALE selectors is a capability unique to Polkadot's hybrid Asset Hub runtime - no other EVM environment supports atomic reads from a live Wasm contract within the same transaction.

---

## Directory Structure

```
contracts/
├── foundry.toml                       ← Foundry project configuration
├── addresses-latest.md                ← Full deployment history and current addresses
├── calc.py                            ← Off-chain yield / interest calculation helper
├── evm/                               ← Solidity contracts
│   ├── KredioLending.sol              ← mUSDC lending pool with credit-scored borrowing
│   ├── KredioPASMarket.sol            ← Native PAS collateral market
│   ├── KredioSwap.sol                 ← PAS → mUSDC oracle-priced swap
│   ├── KredioBridgeMinter.sol         ← Hub-side ETH → mUSDC bridge
│   ├── EthBridgeInbox.sol             ← Source-chain ETH deposit inbox
│   ├── KredioXCMSettler.sol           ← XCM intent settlement engine
│   ├── KredioAccountRegistry.sol      ← SR25519 identity linking
│   ├── GovernanceCache.sol            ← OpenGov participation cache
│   ├── MockPASOracle.sol              ← Chainlink-compatible PAS/USD price feed
│   ├── MockUSDC.sol                   ← Protocol stablecoin (mUSDC, 6 decimals)
│   ├── MockYieldPool.sol              ← External yield source
│   └── interfaces/
│       ├── IPASOracle.sol
│       ├── IGovernanceCache.sol
│       └── IKreditAgent.sol
├── kredit_agent/                      ← KreditAgent ink! Wasm (deterministic scorer)
│   ├── Cargo.toml
│   └── lib.rs
├── pvm/                               ← PVM ink! contracts (AI layer)
│   ├── neural_scorer/                 ← NeuralScorer
│   ├── risk_assessor/                 ← RiskAssessor
│   └── yield_mind/                    ← YieldMind
├── script/                            ← Foundry deploy scripts
│   ├── Deploy.s.sol                   ← Core protocol deployment
│   ├── DeployBridge.s.sol             ← Bridge contracts
│   └── DeployYieldStrategy.s.sol      ← Yield strategy components
└── test/                              ← Foundry test suite
```

---

## Contract Reference - EVM

### KredioLending

**`evm/KredioLending.sol`**

The primary lending pool for mUSDC-collateralised borrowing. Lenders supply mUSDC and earn yield from borrower interest and yield strategy returns. Borrowers post mUSDC as collateral and draw loans at their credit tier rate.

**Lender:**

| Function | Description |
|----------|-------------|
| `deposit(uint256 amount)` | Supply mUSDC liquidity; earns pro-rata yield |
| `withdraw(uint256 amount)` | Retrieve principal plus pending yield |
| `pendingYieldAndHarvest(address user)` | Harvest accumulated yield without withdrawing |

**Borrower:**

| Function | Description |
|----------|-------------|
| `depositCollateral(uint256 amount)` | Post mUSDC collateral |
| `borrow(uint256 amount)` | Open a loan; collateral ratio and rate locked by `KreditAgent` score |
| `repay()` | Repay full position (principal + accrued interest); increments on-chain repayment counter |
| `withdrawCollateral()` | Retrieve collateral after full repayment |
| `healthRatio(address)` | View current position health: `collateral / (debt × ratioBps / 10000)` |

**Liquidation:** `liquidate(address borrower)` - callable by anyone when `healthRatio < 1.0`; caller seizes collateral plus 8% bonus.

**Yield distribution:** Interest and claimed yield flow through `_distributeInterest()`, updating `accYieldPerShare`. Lender shares settle lazily on next deposit/withdraw/harvest - gas cost is constant regardless of lender count.

**Key events:** `Deposited`, `Borrowed`, `Repaid`, `Liquidated`, `CollateralDeposited`, `YieldHarvested`

---

### KredioPASMarket

**`evm/KredioPASMarket.sol`**

Borrowing market backed by **native PAS token** collateral. Uses the on-chain Chainlink-compatible oracle for live PAS/USD pricing at every borrow and liquidation.

| Function | Description |
|----------|-------------|
| `depositCollateral()` | `payable` - deposits `msg.value` PAS as collateral |
| `borrow(uint256 amount)` | Draw mUSDC against collateral at oracle-determined LTV; rate set by `KreditAgent` |
| `repay()` | Repay full position; transfers debt + accrued interest |
| `withdrawCollateral()` | Withdraw PAS collateral (position must be fully repaid) |
| `liquidate(address borrower)` | Seize collateral when health drops below threshold |

**Oracle staleness protection:** Borrows and liquidations revert if oracle data exceeds `stalenessLimit` (default 3600 seconds).

**Admin-configurable risk parameters:** `ltvBps` (default 65%), `liqBonusBps` (default 8%), `protocolFeeBps` (max 20%).

---

### KredioSwap

**`evm/KredioSwap.sol`**

Single-direction swap: native PAS in, mUSDC out, at the current oracle price.

| Function | Description |
|----------|-------------|
| `quoteSwap(uint256 pasWei)` | View-only - returns mUSDC out for a given PAS input |
| `swap(uint256 minMUSDCOut)` | `payable` - executes swap with slippage guard |

Fee: `feeBps` (default 30 bps / 0.3%; maximum 100 bps / 1%). Reverts while `oracle.isCrashed()` is true.

---

### KredioBridgeMinter

**`evm/KredioBridgeMinter.sol`**

Hub-side contract for the cross-chain ETH → mUSDC bridge. Called by the authorised backend relayer after verifying a source-chain deposit.

| Function | Description |
|----------|-------------|
| `processDeposit(sourceTxHash, sourceChainId, sourceUser, hubRecipient, ethAmount)` | Mints mUSDC to `hubRecipient`; replay-protected by `sourceTxHash` |
| `initiateRedeem(sourceTxHash, amount)` | Burns mUSDC for reverse bridge flow |
| `getUserDeposits(user)` | Returns all deposit records for a hub recipient |

---

### EthBridgeInbox

**`evm/EthBridgeInbox.sol`** - deployed on Ethereum Sepolia

Source-chain deposit contract. Users send ETH here; the emitted event is picked up by the backend relayer.

- `deposit(address hubRecipient)` - `payable`; enforces per-deposit min/max bounds
- **Event:** `EthDeposited(address indexed depositor, uint256 ethAmount, address indexed hubRecipient)`

---

### KredioXCMSettler

**`evm/KredioXCMSettler.sol`**

Cross-chain intent settlement engine. Receives compact-encoded payloads from connected parachains via XCM `Transact` and executes the corresponding Kredio protocol action in the same block.

**Supported intents:**

| Code | Intent | Action |
|------|--------|--------|
| `0x01` | `DEPOSIT_COLLATERAL` | Post PAS to KredioPASMarket |
| `0x02` | `BORROW` | Draw mUSDC on KredioPASMarket |
| `0x03` | `REPAY` | Repay PAS market position |
| `0x04` | `DEPOSIT_LEND` | Supply mUSDC to KredioLending |
| `0x05` | `SWAP_AND_LEND` | Swap PAS → mUSDC, then deposit |
| `0x06` | `SWAP_AND_BORROW_COLLATERAL` | Swap PAS → mUSDC, use as collateral |
| `0x07` | `WITHDRAW_COLLATERAL` | Release collateral |
| `0x08` | `FULL_EXIT` | Repay debt + withdraw collateral atomically |

Settlement history is tracked per originating account via `settlementHistory` and `intentNonce`.

---

### KredioAccountRegistry

**`evm/KredioAccountRegistry.sol`**

Links a Substrate (SR25519) public key to an EVM address with cryptographic proof or admin attestation.

| Function | Description |
|----------|-------------|
| `linkAccount(substrateKey, signature)` | Verifies SR25519 signature and creates bidirectional mapping |
| `attestedLink(evmAddress, substrateKey)` | Admin/attester fallback |
| `unlinkAccount()` | Removes the link; increments nonce to prevent replay |
| `substrateKeyOf(address)` | Returns the linked substrate key (zero if unlinked) |

**Events:** `AccountLinked(address indexed evmAddress, bytes32 indexed substrateKey, bool adminAttested, uint256 linkedAt)`, `AccountUnlinked(address indexed evmAddress, bytes32 indexed substrateKey)`

---

### GovernanceCache

**`evm/GovernanceCache.sol`**

Stores each user's Polkadot OpenGov participation on-chain, written by an authorised admin. Used to enrich credit scoring with governance engagement data (Phase 4).

| Function | Description |
|----------|-------------|
| `setGovernanceData(address user, uint64 voteCount, uint8 maxConviction)` | Admin writes |
| `getGovernanceData(address user)` | Returns `(voteCount, maxConviction, cachedAt)` |

---

### PASOracle

**`evm/MockPASOracle.sol`**

Chainlink `AggregatorV3`-compatible price feed for PAS/USD. Updated by the authorised owner (the backend oracle service). In a production deployment this would be replaced by a decentralised oracle - Chainlink on Asset Hub or an Acurast-powered off-chain computation.

| Function | Description |
|----------|-------------|
| `setPrice(int256 price)` | Update on-chain price; reverts if in crash mode |
| `latestRoundData()` | Standard Chainlink interface |
| `crash(int256 crashPrice)` | Halt normal updates |
| `recover()` | Restore normal price feed |

---

### mUSDC

**`evm/MockUSDC.sol`** · 6 decimal places

The protocol stablecoin. Standard ERC-20 with a public `mint(address to, uint256 amount)` testnet faucet. On mainnet replaced by canonical bridged USDC or a Polkadot-native stablecoin.

---

### YieldPool

**`evm/MockYieldPool.sol`**

External yield source integrated with `KredioLending` for idle capital management. Yield accrues at a configurable APY rate (`yieldRateBps`).

| Function | Description |
|----------|-------------|
| `deposit(uint256 amount)` | KredioLending deposits idle mUSDC |
| `withdraw(address to, uint256 amount)` | KredioLending recalls capital |
| `claimYield(address to)` | Distributes accrued yield |
| `pendingYield(address who)` | View current accrued yield |

---

## Contract Reference - ink!

### KreditAgent

**`kredit_agent/lib.rs`** · Wasm, deployed on Asset Hub EVM

The deterministic on-chain credit scoring engine. Invoked by EVM market contracts via SCALE-encoded `staticcall` using fixed 4-byte selectors.

**Messages:**

| Message | Inputs | Output |
|---------|--------|--------|
| `compute_score` | `repayments, liquidations, deposit_tier, blocks_since_first` | `u64` score 0–100 |
| `collateral_ratio` | `score: u64` | `u64` basis points |
| `interest_rate` | `score: u64` | `u64` basis points |
| `tier` | `score: u64` | `u8` (0–5) |
| `reasoning` | All score inputs | `[u8; 256]` human-readable breakdown |

**EVM interop selectors:**

```solidity
bytes4 internal constant SEL_COMPUTE_SCORE    = 0x3a518c00;
bytes4 internal constant SEL_COLLATERAL_RATIO = 0xa70eec89;
bytes4 internal constant SEL_INTEREST_RATE    = 0xb8dc60f2;
bytes4 internal constant SEL_TIER             = 0x2b2bb477;
```

---

### NeuralScorer

**`pvm/neural_scorer/lib.rs`** · ink! PVM, deployed on Asset Hub EVM

Neural cross-validation layer. Independently computes a `neural_score` (0–100) using a weighted combination of normalised input signals, then emits the delta between the neural score and the deterministic score as a confidence measure.

**Message:** `infer(account, repayment_count, liquidation_count, deposit_tier, age_blocks, deterministic_score) → u8`

**Event:** `ScoreInferred { account, neural_score, deterministic_score, confidence_pct, delta_from_rule, model_version }`

---

### RiskAssessor

**`pvm/risk_assessor/lib.rs`** · ink! PVM, deployed on Asset Hub EVM

Real-time liquidation risk scoring for individual positions and batches of up to 16 positions.

**Messages:**
- `assess_position(borrower, collateral_usd_x6, debt_usd_x6, credit_score, price_7d_change_bps, liq_ratio_bps) → PositionRisk`
- `assess_batch(borrowers[16], collaterals[16], debts[16], scores[16], price_change, liq_ratio, active_count) → [PositionRisk; 16]`

**`PositionRisk`:** `{ liquidation_probability_pct, estimated_blocks_to_liq, risk_tier, collateral_buffer_bps, recommended_top_up_atoms }`

**Event:** `RiskAssessed { borrower, risk_tier, liq_prob, buffer_bps, blocks_to_liq }`

---

### YieldMind

**`pvm/yield_mind/lib.rs`** · ink! PVM, deployed on Asset Hub EVM

Computes the optimal allocation split across conservative (6.5% APY), balanced (11% APY), and aggressive (18% APY) yield buckets given current protocol state.

**Message:** `compute_allocation(total_deposited, total_borrowed, strategy_balance, avg_credit_score, volatility_bps, blocks_since_rebalance) → AllocationDecision`

**`AllocationDecision`:** `{ conservative_bps, balanced_bps, aggressive_bps, idle_bps, projected_apy_bps, confidence, reasoning_code }`

Reasoning codes: `0 = Normal`, `1 = HighUtil (>70%)`, `2 = LowUtil (<20%)`, `3 = Volatile`

**Event:** `AllocationComputed { utilization_bps, conservative_bps, balanced_bps, aggressive_bps, idle_bps, projected_apy_bps, reasoning_code }`

---

## Credit Scoring Algorithm

The `KreditAgent` scoring model is fully deterministic and all inputs are on-chain:

```
score = repayment_points(repayments, liquidations)
      + deposit_points(deposit_tier)
      + age_points(blocks_since_first)
```

**Repayment history (max 55 pts):**

| Repayments | Points |
|-----------|--------|
| ≥ 12 | 55 |
| ≥ 8 | 46 |
| ≥ 5 | 36 |
| ≥ 3 | 26 |
| ≥ 2 | 16 |
| ≥ 1 | 8 |
| 0 | 0 |

Liquidation penalties: −20 pts (1 event), −35 pts (2), −55 pts (3+).

**Lending volume (max 35 pts):** Deposit tier (0–7) derived from `totalDepositedEver`. Points = `tier × 5`.

**Account age (max 10 pts):**

| Blocks since first deposit | Points |
|---------------------------|--------|
| ≥ 10,000 | 10 |
| ≥ 2,000 | 5 |
| ≥ 500 | 2 |
| < 500 | 0 |

**Resulting tiers:**

| Tier | Score | Collateral Ratio | Interest Rate |
|------|-------|-----------------|---------------|
| ANON | 0–14 | 200% | 15% APR |
| BRONZE | 15–29 | 175% | 12% APR |
| SILVER | 30–49 | 150% | 10% APR |
| GOLD | 50–64 | 130% | 8% APR |
| PLATINUM | 65–79 | 120% | 6% APR |
| DIAMOND | 80–100 | 110% | 4% APR |

---

## Deployed Addresses

**Network:** Polkadot Asset Hub Testnet · Chain ID `420420417`
**RPC:** `https://eth-rpc-testnet.polkadot.io/`
**Explorer:** `https://blockscout-testnet.polkadot.io`

### EVM Contracts

| Contract | Address |
|----------|---------|
| KredioLending | `0x1eDaD1271FB9d1296939C6f4Fb762752b041C64E` |
| KredioPASMarket | `0x0F90Fe6141AC29a6031C3ae2155749e9f38a0174` |
| KredioSwap | `0xaF1d183F4550500Beb517A3249780290A88E6e39` |
| KredioXCMSettler | `0xbaaE8f7b97ac387DE8C433A218d63166Ce104Bb1` |
| KredioAccountRegistry | `0xBf7ac0e6f0024ED0F2Cf2efb3669E7c389258BFf` |
| PASOracle | `0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7` |
| mUSDC | `0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646` |
| GovernanceCache | `0xe4DE7eadE2c0A65BdA6863Ad7bA22416c77F3e55` |
| YieldPool | `0x1dB4Faad3081aAfe26eC0ef6886F04f28D944AAB` |
| KredioBridgeMinter | Configured via `MINTER_ADDR` environment variable |
| EthBridgeInbox (Sepolia) | Configured via `INBOX_ADDR_11155111` environment variable |

### ink! Contracts

| Contract | Address |
|----------|---------|
| KreditAgent (Wasm) | `0x8c13E6fFDf27bB51304Efff108C9B646d148E5F3` |
| NeuralScorer (PVM) | `0xac6bd3ff3447d8d1689dd4f02899ff558f108e0d` |
| RiskAssessor (PVM) | `0xdB9E48932E061D95E22370235ac3a35332d289f7` |
| YieldMind (PVM) | `0x0b68fbfb596846e4f3a23da10365e0888a182ef3` |

Full deployment history and previous versions: [addresses-latest.md](addresses-latest.md)

---

## Prerequisites

| Tool | Install |
|------|---------|
| Foundry (`forge`, `cast`) | `curl -L https://foundry.paradigm.xyz \| bash && foundryup` |
| Rust + `cargo-contract` | `rustup target add wasm32-unknown-unknown && cargo install cargo-contract` |
| Node.js ≥ 18 | For deployment scripts only |

---

## Build

### EVM contracts

```bash
cd contracts
forge install     # Install lib/ dependencies
forge build       # Compile all Solidity contracts
```

### KreditAgent (ink! Wasm)

```bash
cd contracts/kredit_agent
cargo contract build --release
# Output: target/ink/kredit_agent.contract
```

### PVM ink! contracts

```bash
cargo contract build --release \
  --manifest-path contracts/pvm/neural_scorer/Cargo.toml

cargo contract build --release \
  --manifest-path contracts/pvm/risk_assessor/Cargo.toml

cargo contract build --release \
  --manifest-path contracts/pvm/yield_mind/Cargo.toml
```

---

## Deploy

Create `contracts/.env`:

```env
ADMIN=<private_key_hex>           # No 0x prefix
PRIVATE_KEY=<private_key_hex>
PASSET_RPC=https://eth-rpc-testnet.polkadot.io/
SEPOLIA_RPC=https://rpc.sepolia.org
```

### Core Protocol (Asset Hub)

```bash
cd contracts && source .env

forge script script/Deploy.s.sol \
  --rpc-url $PASSET_RPC \
  --broadcast \
  --private-key $ADMIN \
  -vvv
```

Deploys `KredioLending`, `KredioPASMarket`, `KredioXCMSettler`, `KredioAccountRegistry`, and `YieldPool`; wires the yield pool; seeds both pools with mUSDC liquidity. After deployment, update addresses in `backend/.env` and `frontend/config/contracts.ts`.

### Bridge Contracts

```bash
# EthBridgeInbox on Ethereum Sepolia
forge script script/DeployBridge.s.sol:DeployInbox \
  --rpc-url $SEPOLIA_RPC --chain-id 11155111 \
  --private-key $PRIVATE_KEY --broadcast

# KredioBridgeMinter on Asset Hub
forge script script/DeployBridge.s.sol:DeployMinter \
  --rpc-url $PASSET_RPC --chain-id 420420417 \
  --private-key $PRIVATE_KEY --broadcast
```

### Yield Strategy Components

```bash
forge script script/DeployYieldStrategy.s.sol \
  --rpc-url $PASSET_RPC --broadcast --private-key $PRIVATE_KEY -vvv
```

---

## Testing

```bash
cd contracts

forge test                                                  # All tests
forge test -vvv                                             # With traces and logs
forge test --match-path test/KredioLending.t.sol -vvv      # Single file
forge test --gas-report                                     # Gas usage table
```

The test suite covers full borrower journeys, liquidation scenarios, interest accrual correctness, `KreditAgent` score computation edge cases, bridge flows, and oracle staleness protection.
