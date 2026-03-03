# Tesseract 2.0 — Complete Build Directive for Antigravity

***

## 0. What You Are Building

Tesseract is a cross-chain DeFi primitive layer on Polkadot Hub. It consists of three smart contract modules and a frontend. Two modules are EVM contracts. One module is a PVM contract compiled with a different toolchain. They interact with each other and with Polkadot's native runtime precompiles.

**The product is not a generic Ethereum DeFi fork. Every design decision that deviates from standard Ethereum patterns exists because Polkadot Hub enables something Ethereum cannot do. Preserve these deviations. Do not simplify them away.**

***

## 1. Confirmed Precompile Registry

These are the only external addresses you will ever hardcode. Everything else is injected via constructor.

```
SYSTEM_PRECOMPILE   = 0x0000000000000000000000000000000000000900
STORAGE_PRECOMPILE  = 0x0000000000000000000000000000000000000901
XCM_PRECOMPILE      = 0x00000000000000000000000000000000000a0000

ECRECOVER           = 0x0000000000000000000000000000000000000001
SHA256              = 0x0000000000000000000000000000000000000002
BLAKE2F             = 0x0000000000000000000000000000000000000009
```

**XC-20 / ERC-20 Asset Precompile Address Formula:**
```
address = 0x[assetId padded to 8 hex digits][24 zero characters][01200000]

Example — USDT (assetId = 1984 = 0x7C0):
→ 0x000007C000000000000000000000000001200000

Example — USDC (assetId = 1337 = 0x539):
→ 0x0000053900000000000000000000000001200000
```

**There is no staking precompile. There is no DOT ERC-20 at any fixed address. Do not use `0x0800`, `0x123`, or any address not in this registry.**

***

## 2. Network Configuration

```
Testnet Name  : Passet Hub (Polkadot Hub TestNet)
RPC Endpoint  : https://testnet-passet-hub-eth-rpc.polkadot.io
Chain ID      : Confirm from docs.polkadot.com/smart-contracts/connect/
Block Explorer: Subscan Paseo — https://paseo.subscan.io
Faucet        : https://faucet.polkadot.io/westend
Contracts UI  : https://contracts.polkadot.io (for PVM deployment)
```

***

## 3. Toolchain Setup

### 3.1 EVM Toolchain
```
Node.js       : v20+
Hardhat       : latest
ethers.js     : v6
OpenZeppelin  : v5 (EVM contracts only)
Foundry       : for gas profiling EVM contracts only
```

### 3.2 PVM Toolchain
```
resolc        : npm install -g @parity/revive
Verify        : resolc --version
Rust          : rustup install stable
Rust target   : rustup target add riscv32em-unknown-none-elf
Compile Rust  : cargo build --target riscv32em-unknown-none-elf --release
Compile PVM   : resolc TesseractCompute.sol --output-dir ./artifacts/pvm
Deploy PVM    : via contracts.polkadot.io UI or polkadot-js script
```

***

## 4. Repository Structure

```
tesseract/
├── contracts/
│   ├── evm/
│   │   ├── TesseractSwap.sol
│   │   ├── TesseractVault.sol
│   │   └── interfaces/
│   │       ├── IERC20.sol
│   │       ├── IXcm.sol
│   │       └── ISystem.sol
│   ├── pvm/
│   │   └── TesseractCompute.sol   ← single self-contained file, no imports
│   └── mocks/
│       ├── MockAsset.sol
│       ├── MockXcm.sol
│       └── MockSystem.sol
├── rust/
│   ├── Cargo.toml
│   └── src/
│       └── lib.rs                 ← Rust math library for PVM FFI
├── scripts/
│   ├── deploy.local.js
│   ├── deploy.hubTestnet.js
│   └── deploy.config.js
├── test/
│   ├── TesseractSwap.test.js
│   ├── TesseractVault.test.js
│   └── TesseractCompute.test.js   ← polkadot-js based, not Foundry
├── frontend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── addresses.local.js
│   │   │   └── addresses.hubTestnet.js
│   │   ├── components/
│   │   │   ├── SwapWidget.jsx
│   │   │   ├── VaultWidget.jsx
│   │   │   └── ComputeDashboard.jsx
│   │   └── hooks/
│   │       ├── useSwap.js
│   │       ├── useVault.js
│   │       └── useCompute.js
└── docs/
    └── architecture.md
```

***

## 5. Shared Interfaces (EVM contracts only)

Place these in `contracts/evm/interfaces/`. These are standard imports for EVM contracts. **Do not import these in the PVM contract.**

### `IXcm.sol`
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

address constant XCM_PRECOMPILE_ADDRESS = 
    address(0x00000000000000000000000000000000000a0000);

interface IXcm {
    struct Weight {
        uint64 refTime;
        uint64 proofSize;
    }
    function execute(bytes calldata message, Weight calldata weight) external;
    function send(bytes calldata destination, bytes calldata message) external;
    function weighMessage(bytes calldata message) 
        external view returns (Weight memory weight);
}
```

### `ISystem.sol`
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

address constant SYSTEM_PRECOMPILE_ADDRESS = 
    address(0x0000000000000000000000000000000000000900);

interface ISystem {
    function hashBlake256(bytes memory input) 
        external pure returns (bytes32 digest);
    function hashBlake128(bytes memory input) 
        external pure returns (bytes32 digest);
    function toAccountId(address input) 
        external view returns (bytes memory account_id);
    function callerIsOrigin() external view returns (bool);
    function callerIsRoot() external view returns (bool);
    function minimumBalance() external view returns (uint);
    function ownCodeHash() external view returns (bytes32);
    function weightLeft() external view returns (uint64 refTime, uint64 proofSize);
    function terminate(address beneficiary) external;
    function sr25519Verify(
        uint8[64] calldata signature,
        bytes calldata message,
        bytes32 publicKey
    ) external view returns (bool);
    function ecdsaToEthAddress(uint8[33] calldata publicKey) 
        external view returns (bytes20);
}
```

### `IERC20.sol`
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) 
        external view returns (uint256);
    function transferFrom(address from, address to, uint256 amount) 
        external returns (bool);
}
```

***

## 6. Mock Contracts (Local Dev and CI Only)

### Rules
- Never deployed to Hub TestNet
- Must mirror real precompile interfaces exactly
- `MockXcm.weighMessage` must return a valid non-zero weight or downstream tests fail
- `MockSystem.hashBlake256` returns `keccak256` as a local approximation — this is acceptable for logic testing only

### `MockAsset.sol`
```
Implements: IERC20 + mint(address, uint256)
decimals: 10 (matches Polkadot Assets pallet standard)
No access control on mint (dev convenience)
```

### `MockXcm.sol`
```
Implements: IXcm interface
execute: emits event Executed(bytes message, Weight weight)
send: emits event Sent(bytes destination, bytes message)
weighMessage: returns Weight({ refTime: 10_000_000_000, proofSize: 65_536 })
```

### `MockSystem.sol`
```
Implements: ISystem interface
hashBlake256: returns keccak256(input)
weightLeft: returns (50_000_000_000, 1_000_000)
minimumBalance: returns 10_000
toAccountId: returns abi.encodePacked(input)
callerIsOrigin: returns true
ownCodeHash: returns bytes32(0)
```

***

## 7. Contract A — `TesseractSwap.sol` (EVM)

### Purpose
Constant-product AMM where every pool token is a Polkadot Assets pallet token accessed via ERC-20 precompile. Pool IDs use BLAKE2 instead of keccak256. Supports atomic swap + XCM bridge in one transaction.

### Constructor Parameters
```
address _xcmPrecompile      → XCM_PRECOMPILE_ADDRESS on Hub TestNet
address _systemPrecompile   → SYSTEM_PRECOMPILE_ADDRESS on Hub TestNet
```

### State Variables
```
address public xcmPrecompile
address public systemPrecompile
address public owner
mapping(uint32 => address) public assetPrecompile
    // assetId → ERC-20 precompile address

struct Pool {
    uint256 reserveA
    uint256 reserveB
    uint256 totalShares
    mapping(address => uint256) shares
}
mapping(bytes32 => Pool) public pools
    // poolId (blake256 of sorted assetIds) → Pool
```

### Asset Registration
```
function registerAsset(uint32 assetId, address precompileAddr)
    onlyOwner
    
On Hub TestNet call:
    registerAsset(1984, 0x000007C000000000000000000000000001200000)  // USDT
    registerAsset(1337, 0x0000053900000000000000000000000001200000)  // USDC (if registered)
```

### Pool ID Derivation
```
function getPoolId(uint32 assetA, uint32 assetB) → bytes32
    Sort assetA and assetB so lower ID is always first
    Return ISystem(systemPrecompile).hashBlake256(abi.encodePacked(sorted_a, sorted_b))
    
WHY: This uses Polkadot's native BLAKE2 hashing instead of keccak256.
     This is a genuine Polkadot-native design that judges can verify on-chain.
     Do not replace with keccak256.
```

### Functions

**`addLiquidity`**
```
Parameters: uint32 assetA, uint32 assetB, uint256 amountA, uint256 amountB
Logic:
    Pull amountA of assetA from msg.sender via transferFrom
    Pull amountB of assetB from msg.sender via transferFrom
    If pool is empty: shares = sqrt(amountA * amountB)
    Else: shares = min(amountA * totalShares / reserveA, amountB * totalShares / reserveB)
    Update reserves and shares
    Emit LiquidityAdded(msg.sender, poolId, shares)
```

**`removeLiquidity`**
```
Parameters: uint32 assetA, uint32 assetB, uint256 shares
Logic:
    amountA = shares * reserveA / totalShares
    amountB = shares * reserveB / totalShares
    Burn shares, update reserves
    Transfer tokens back to msg.sender
    Emit LiquidityRemoved(msg.sender, poolId, shares)
```

**`swap`**
```
Parameters: uint32 assetIdIn, uint32 assetIdOut, uint256 amountIn, uint256 minAmountOut
Logic:
    amountInWithFee = amountIn * 997
    amountOut = (amountInWithFee * reserveOut) / (reserveIn * 1000 + amountInWithFee)
    require(amountOut >= minAmountOut)
    Pull tokenIn from msg.sender, push tokenOut to msg.sender
    Update reserves
    Emit Swap(msg.sender, assetIdIn, assetIdOut, amountIn, amountOut)
Returns: uint256 amountOut
```

**`swapAndBridgeXCM`** ← THE KEY POLKADOT-NATIVE FUNCTION
```
Parameters:
    uint32 assetIdIn
    uint32 assetIdOut
    uint256 amountIn
    uint256 minAmountOut
    bytes calldata xcmDestination    ← SCALE-encoded MultiLocation
    bytes calldata xcmMessage        ← SCALE-encoded Versioned XCM message
    
Logic:
    Step 1: Call swap() internally → get amountOut
    Step 2: IXcm.Weight memory w = IXcm(xcmPrecompile).weighMessage(xcmMessage)
    Step 3: IXcm(xcmPrecompile).execute(xcmMessage, w)
    Emit BridgeXCM(msg.sender, assetIdOut, amountOut, xcmDestination)

WHY weighMessage before execute:
    If execute is called without correct weight, assets can get trapped
    on the destination chain with no way to recover them.
    weighMessage computes the exact weight. Always call it first.
```

### Security
```
nonReentrant on: addLiquidity, removeLiquidity, swap, swapAndBridgeXCM
Use OpenZeppelin ReentrancyGuard (EVM contract, imports are allowed)
onlyOwner on: registerAsset
```

### Gas Target
```
forge test --gas-report
swap() must be under 200,000 gas
addLiquidity() must be under 250,000 gas
If over: pack Pool struct variables, use uint128 for reserves
```

***

## 8. Contract B — `TesseractVault.sol` (EVM)

### Purpose
ERC-4626 compliant yield vault. Accepts one underlying ERC-20 asset. Issues vault shares. Rebalances via XCM with a weight guard. Delegates strategy selection to the PVM TesseractCompute contract via cross-VM call.

### Constructor Parameters
```
address _asset              → ERC-20 precompile address of underlying token
                              (e.g. USDT = 0x000007C000000000000000000000000001200000)
address _xcmPrecompile      → XCM_PRECOMPILE_ADDRESS
address _systemPrecompile   → SYSTEM_PRECOMPILE_ADDRESS
address _computeContract    → pass address(0) initially, set after PVM deployment
string  _name               → vault share token name (e.g. "Tesseract Vault USDT")
string  _symbol             → vault share token symbol (e.g. "tvUSDT")
```

### State Variables
```
IERC20  public immutable asset
address public xcmPrecompile
address public systemPrecompile
address public computeContract
address public owner
uint256 public totalAssets
uint256 public totalSupply
mapping(address => uint256) public balanceOf
string  public name
string  public symbol
```

### Functions

**`deposit`** (ERC-4626)
```
Parameters: uint256 assets, address receiver
shares = totalSupply == 0 ? assets : (assets * totalSupply) / totalAssets
Pull assets from msg.sender
Mint shares to receiver
Update totalAssets, totalSupply
Emit Deposit(msg.sender, receiver, assets, shares)
Returns: uint256 shares
```

**`withdraw`** (ERC-4626)
```
Parameters: uint256 shares, address receiver
assets = (shares * totalAssets) / totalSupply
Burn shares from msg.sender
Push assets to receiver
Update totalAssets, totalSupply
Emit Withdraw(msg.sender, receiver, assets, shares)
Returns: uint256 assets
```

**`previewDeposit`** / **`previewWithdraw`** — view functions, standard ERC-4626 math

**`rebalance`** ← THE CROSS-VM + XCM FUNCTION
```
Parameters: uint64[] calldata strategyAprs, bytes calldata xcmMessage
Access: onlyOwner

Step 1 — WEIGHT GUARD (Polkadot-native safety check):
    (uint64 refTime, uint64 proofSize) = ISystem(systemPrecompile).weightLeft()
    require(refTime > 5_000_000_000, "insufficient weight for XCM execution")
    
    WHY: Polkadot's weight system can run out of compute mid-block.
         This guard ensures we have enough headroom before spending
         tokens on an XCM call that might not complete.
         Ethereum has no equivalent concept.

Step 2 — CROSS-VM CALL (EVM → PVM):
    uint64 bestIndex = ITesseractCompute(computeContract)
                           .getBestStrategy(strategyAprs)
    
    WHY: TesseractCompute is a PVM contract. This call crosses VM boundaries
         at the runtime level. The Polkadot Hub runtime dispatches it
         automatically — no bridge, no special encoding needed.
         From Solidity's perspective this is a normal interface call.

Step 3 — XCM EXECUTION:
    IXcm.Weight memory w = IXcm(xcmPrecompile).weighMessage(xcmMessage)
    IXcm(xcmPrecompile).execute(xcmMessage, w)
    
Emit Rebalanced(bestIndex, xcmMessage, w.refTime, w.proofSize)
```

**`setComputeContract`**
```
Parameters: address _compute
Access: onlyOwner
Sets computeContract
Can only be set once (add a check: require(computeContract == address(0)))
```

### Security
```
nonReentrant on: deposit, withdraw, rebalance
Use OpenZeppelin ReentrancyGuard
onlyOwner on: rebalance, setComputeContract
```

***

## 9. Contract C — `TesseractCompute.sol` (PVM)

### Critical PVM Rules — Read Before Writing Any Code
```
1. SINGLE FILE. No imports of any kind. Not even // import statements.
2. Every interface (IERC20, IXcm, ISystem, ITesseractCompute) must be
   written inline inside this one file.
3. No OpenZeppelin. No external libraries.
4. No assembly blocks. No inline YUL.
5. No public library functions. Internal pure helpers are fine.
6. No complex inheritance. Single contract only.
7. Keep functions simple and linear. No complex loops over large arrays
   in Solidity — offload those to Rust.
8. If resolc compilation fails with a code size error, split large
   functions into smaller internal functions.
```

### Inline Interfaces Required in This File
Copy these verbatim at the top of `TesseractCompute.sol`:
```solidity
// ─── Inline Interface: IERC20 ────────────────────────────────────
interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) 
        external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) 
        external view returns (uint256);
}

// ─── Inline Interface: IXcm ──────────────────────────────────────
interface IXcm {
    struct Weight { uint64 refTime; uint64 proofSize; }
    function execute(bytes calldata message, Weight calldata weight) external;
    function send(bytes calldata destination, bytes calldata message) external;
    function weighMessage(bytes calldata message) 
        external view returns (Weight memory weight);
}

// ─── Inline Interface: ISystem ───────────────────────────────────
interface ISystem {
    function hashBlake256(bytes memory input) 
        external pure returns (bytes32 digest);
    function weightLeft() 
        external view returns (uint64 refTime, uint64 proofSize);
    function ownCodeHash() external view returns (bytes32);
    function minimumBalance() external view returns (uint);
    function toAccountId(address input) 
        external view returns (bytes memory);
    function callerIsOrigin() external view returns (bool);
}

// ─── Inline Reentrancy Guard ──────────────────────────────────────
// Cannot use OpenZeppelin in PVM. This is the manual equivalent.
abstract contract ReentrancyGuard {
    uint256 private _status;
    constructor() { _status = 1; }
    modifier nonReentrant() {
        require(_status != 2, "reentrant call");
        _status = 2;
        _;
        _status = 1;
    }
}
```

### Constructor Parameters
```
address _xcmPrecompile      → 0x00000000000000000000000000000000000a0000
address _systemPrecompile   → 0x0000000000000000000000000000000000000900
address _vaultContract      → TesseractVault address (set after vault deployment)
address _authorizedCaller   → only this address can call routeToParachain
```

### Rust FFI Integration — How It Actually Works

**This is not `extern "C"` syntax inside Solidity. That is incorrect.**

The integration works at the **compiler level**:

```
Step 1: Write lib.rs with the math function
Step 2: Compile lib.rs → static .a library targeting riscv32em-unknown-none-elf
Step 3: resolc links the .a file into the compiled .polkavm blob
Step 4: In Solidity, the linked function is called as a normal internal function
```

The Rust library (`rust/src/lib.rs`) spec:
```rust
Target    : riscv32em-unknown-none-elf
No std    : #![no_std]
Purpose   : Receive array of u64 APR values, return index of maximum value
Function  : compute_optimal_route(aprs: *const u64, len: usize) -> u64
Why Rust  : Sorting/max-finding over large arrays is O(n) in Solidity with
            expensive SLOAD per iteration. In PolkaVM RISC-V this runs as
            native machine code — documented gas optimization via PolkaVM
            RISC-V execution. This satisfies the PVM-experiments category.
```

Compile command:
```bash
cargo build --target riscv32em-unknown-none-elf --release
```

### Functions

**`getBestStrategy`**
```
Parameters: uint64[] calldata aprs
Returns: uint64 bestIndex

Logic:
    Calls the linked Rust function compute_optimal_route(aprs, aprs.length)
    Returns the index of the highest APR value
    
Purpose: Called by TesseractVault.rebalance() via cross-VM call.
         Returns which strategy index to route funds toward.
         
Gas note: Document inline — "Optimization: max-search delegated to 
          PolkaVM RISC-V native execution via linked Rust library.
          Avoids O(n) Solidity loop with SLOAD per iteration."
```

**`routeToParachain`**
```
Parameters: bytes calldata destination, bytes calldata message
Access: only _authorizedCaller (the vault)

Logic:
    Step 1: IXcm.Weight memory w = IXcm(xcmPrecompile).weighMessage(message)
    Step 2: IXcm(xcmPrecompile).execute(message, w)
    Emit Routed(destination, w.refTime, w.proofSize)
    
Purpose: Called by TesseractVault after getBestStrategy determines the
         destination. Executes the actual XCM from the PVM layer.
         This proves PVM can call native XCM precompile directly.
```

**`getAssetBalance`**
```
Parameters: address assetPrecompile
Returns: uint256

Logic: return IERC20(assetPrecompile).balanceOf(address(this))

Purpose: Demonstrates operating on Polkadot native Assets pallet tokens
         from inside a PVM contract. Satisfies "Applications using 
         Polkadot native Assets" track category.
```

**`systemInfo`**
```
Returns: uint64 refTime, uint64 proofSize, bytes32 codeHash

Logic:
    (refTime, proofSize) = ISystem(systemPrecompile).weightLeft()
    codeHash = ISystem(systemPrecompile).ownCodeHash()
    
Purpose: Used by the frontend ComputeDashboard to show live PVM
         execution stats. Judges can verify this is running on PVM
         by checking the code hash matches the deployed blob.
```

### Compilation and Deployment
```
Compile:
    resolc contracts/pvm/TesseractCompute.sol --output-dir ./artifacts/pvm

Deploy:
    Option A: Upload .polkavm blob at contracts.polkadot.io
    Option B: Use polkadot-js script with api.tx.contracts.instantiateWithCode()

After deployment:
    Note the deployed contract address
    Call vault.setComputeContract(computeAddress) from the vault owner
```

***

## 10. Deployment Scripts

### `deploy.config.js`
```javascript
module.exports = {
  local: {
    network:  "hardhat",
    usdt:     null,   // deploy MockAsset
    usdc:     null,   // deploy MockAsset
    xcm:      null,   // deploy MockXcm
    system:   null,   // deploy MockSystem
  },
  hubTestnet: {
    network:  "passet",
    rpc:      "https://testnet-passet-hub-eth-rpc.polkadot.io",
    usdt:     "0x000007C000000000000000000000000001200000",
    usdc:     null,   // register when assetId confirmed
    xcm:      "0x00000000000000000000000000000000000a0000",
    system:   "0x0000000000000000000000000000000000000900",
  }
}
```

### `deploy.local.js` — Sequence
```
1. Deploy MockAsset("USD Tether", "USDT")         → save as mockUSDT
2. Deploy MockAsset("USD Coin", "USDC")            → save as mockUSDC
3. Deploy MockXcm()                                → save as mockXcm
4. Deploy MockSystem()                             → save as mockSystem
5. Deploy TesseractSwap(mockXcm, mockSystem)       → save as swap
6. Deploy TesseractVault(
       mockUSDT, mockXcm, mockSystem,
       address(0), "Tesseract Vault USDT", "tvUSDT"
   )                                               → save as vault
7. swap.registerAsset(1, mockUSDT)
8. swap.registerAsset(2, mockUSDC)
9. mockUSDT.mint(deployer, 100_000 * 10**10)
10. mockUSDC.mint(deployer, 100_000 * 10**10)
11. Log all addresses to addresses.local.json
```

### `deploy.hubTestnet.js` — Sequence
```
1. Deploy TesseractSwap(
       "0x00000000000000000000000000000000000a0000",
       "0x0000000000000000000000000000000000000900"
   )                                               → save address

2. Deploy TesseractVault(
       "0x000007C000000000000000000000000001200000",
       "0x00000000000000000000000000000000000a0000",
       "0x0000000000000000000000000000000000000900",
       address(0),
       "Tesseract Vault USDT",
       "tvUSDT"
   )                                               → save address

3. swap.registerAsset(1984, "0x000007C000000000000000000000000001200000")

4. [PAUSE] Compile and deploy TesseractCompute via resolc + contracts.polkadot.io
           Note the deployed PVM contract address

5. vault.setComputeContract(pvmAddress)

6. Log all addresses to addresses.hubTestnet.json
```

### Verification Sequence (Run After Hub TestNet Deployment)
```
Check 1: swap.getPoolId(1984, X) → must return non-zero bytes32
         Confirms System precompile is live

Check 2: IERC20("0x000007C0…").balanceOf(anyAddress) → must return a number
         Confirms ERC-20 precompile is live and USDT is registered

Check 3: IXcm("0x000…a0000").weighMessage(validScaleMessage) → must return Weight
         Confirms XCM precompile is live

Check 4: swap.addLiquidity(1984, X, amount, amount) → must not revert
         Confirms AMM logic

Check 5: swap.swap(1984, X, amount, 0) → must return amountOut > 0
         Confirms swap math

Check 6: swap.swapAndBridgeXCM(...) → must emit BridgeXCM event
         Check transaction on Subscan → find XCM message
         THIS IS THE HEADLINE DEMO
```

***

## 11. Testing Protocol

### EVM Tests (Hardhat + Foundry)
```
TesseractSwap.test.js:
    - addLiquidity with two mock assets
    - swap produces correct amountOut (verify x*y=k invariant)
    - swapAndBridgeXCM emits BridgeXCM event and MockXcm Executed event
    - getPoolId returns same result regardless of asset order
    - swap reverts correctly on slippage exceed
    - reentrancy attack attempt is blocked

TesseractVault.test.js:
    - deposit mints correct shares
    - withdraw returns correct assets
    - previewDeposit/previewWithdraw match actual results
    - rebalance fails if weightLeft is below threshold (mock this)
    - rebalance calls MockXcm.execute
    - setComputeContract can only be called once

forge test --gas-report:
    - swap: must be < 200,000 gas
    - addLiquidity: must be < 250,000 gas
    - deposit: must be < 150,000 gas
```

### PVM Tests (polkadot-js)
```
TesseractCompute.test.js (polkadot-js based):
    - Deploy .polkavm blob to Passet Hub
    - Call systemInfo() → verify refTime and proofSize are non-zero
    - Call getAssetBalance(usdtPrecompile) → verify returns uint256
    - Call getBestStrategy([100, 500, 200, 350]) → must return 1 (index of 500)
    - Call routeToParachain with SCALE-encoded message → verify Routed event
    - Verify cross-VM call: vault.rebalance() triggers getBestStrategy on PVM
```

***

## 12. Frontend

### Address Config Pattern
```javascript
// src/config/addresses.js
const env = process.env.NEXT_PUBLIC_NETWORK || "local"

const addresses = {
  local: require("../../scripts/artifacts/addresses.local.json"),
  hubTestnet: {
    swap:    "<from deployment>",
    vault:   "<from deployment>",
    compute: "<from pvm deployment>",
    usdt:    "0x000007C000000000000000000000000001200000",
    xcm:     "0x00000000000000000000000000000000000a0000",
    system:  "0x0000000000000000000000000000000000000900",
  }
}

export default addresses[env]
```

### Tab 1 — Swap Widget
```
- Token A / Token B selector (shows registered assets by name)
- Amount input
- Live price output (computed from reserves)
- Slippage tolerance slider (default 0.5%)
- Toggle: "Bridge to Parachain after swap"
  - If on: show destination chain dropdown + SCALE message field
  - If on: shows estimated XCM weight from weighMessage
- Submit button → calls swap() or swapAndBridgeXCM()
- Post-tx: show tx hash + Subscan link
- If XCM was sent: show "XCM Message Sent" with direct Subscan Paseo link
```

### Tab 2 — Vault Widget
```
- Shows: Total TVL, Your Shares, Share Price (totalAssets/totalSupply)
- Deposit tab: amount input → calls deposit()
- Withdraw tab: shares input → calls withdraw()
- Rebalance section (owner only, shown only if connected wallet = owner):
  - APR inputs for each strategy
  - XCM message input (SCALE-encoded)
  - Calls rebalance() → triggers full EVM→PVM→XCM flow
  - Shows transaction on Subscan with XCM message status
```

### Tab 3 — Compute Dashboard (PVM)
```
- Header: "TesseractCompute — PVM Contract" with PVM badge
- Live Stats section:
  - Calls systemInfo() every 30 seconds
  - Shows: refTime Remaining, Proof Size, Contract Code Hash
- Strategy Optimizer section:
  - Input: paste comma-separated APR values
  - Button: "Find Best Strategy" → calls getBestStrategy()
  - Output: highlights winning strategy index
- Activity Log:
  - Shows recent cross-VM calls: "EVM Vault → PVM Compute"
  - Shows recent XCM executions with Subscan links
- All contract addresses shown with copy buttons and Subscan links
```

### Balance Fetching
```
Fetch simultaneously (Promise.all):
1. Native PAS balance: provider.getBalance(address)
2. USDT balance: IERC20(usdtPrecompile).balanceOf(address)
3. Vault shares: vault.balanceOf(address)
4. Vault underlying: vault.previewWithdraw(vault.balanceOf(address))

Display as unified "Wallet" panel
Do NOT attempt Substrate/relay chain balance fetching from the EVM frontend
```

***

## 13. Documentation Requirements

### `README.md` Must Contain
```
1. What Tesseract is (2-3 sentences)
2. Why it is only possible on Polkadot Hub (list the 4 specific features:
   BLAKE2 pool IDs, XCM atomic swap+bridge, EVM→PVM cross-VM calls, Rust FFI)
3. Architecture diagram (ASCII or image)
4. Local setup: git clone → npm install → deploy.local.js → tests → frontend
5. Hub TestNet deployment: all contract addresses
6. How to test swapAndBridgeXCM on testnet
7. Roadmap: Phase 2 = native staking when staking precompile is live on Hub mainnet
```

### Architecture Diagram (Required)
```
User Wallet (MetaMask / Talisman)
    │
    ├─── Tab: Swap ──────────────────────────────────────────────────────┐
    │    TesseractSwap.sol [EVM]                                          │
    │    ├── ERC-20 Precompile (USDT/USDC via 0x000007C0…)               │
    │    ├── System Precompile (BLAKE2 pool IDs via 0x…0900)             │
    │    └── XCM Precompile (bridge after swap via 0x…a0000)             │
    │                                               ↓ cross-chain        │
    │                                         [Destination Parachain]    │
    │                                                                     │
    ├─── Tab: Vault ─────────────────────────────────────────────────────┤
    │    TesseractVault.sol [EVM]                                         │
    │    ├── ERC-4626 shares (tvUSDT)                                     │
    │    ├── System Precompile (weightLeft guard via 0x…0900)            │
    │    ├── XCM Precompile (rebalance via 0x…a0000)                     │
    │    └── Cross-VM Call ──────────────────────────────────────────────┤
    │                           ↓                                         │
    ├─── Tab: Compute ───────────────────────────────────────────────────┤
    │    TesseractCompute.sol [PVM — compiled with resolc]                │
    │    ├── Rust FFI: compute_optimal_route() [riscv32em]               │
    │    ├── XCM Precompile (route from PVM via 0x…a0000)                │
    │    ├── ERC-20 Precompile (read asset balances)                      │
    │    └── System Precompile (runtime info via 0x…0900)                │
    └────────────────────────────────────────────────────────────────────┘
                    ↕ Polkadot Hub Runtime
              [Paseo Relay Chain / Parachains via XCM]
```

***

## 14. Submission Checklist

### Disqualification Prevention
```
□ Repo is public on GitHub — set public from Day 1 of hacking period
□ All team members verified via Polkadot Official Discord
□ Commit daily — do not push everything in one batch at the end
□ Codebase originality — BLAKE2 pool IDs + XCM routing + PVM module + Rust FFI
  ensures well below 70% similarity to any upstream fork
□ Only hackathon-period code in the submission branch
```

### Winner Criteria
```
□ All team members have Polkadot on-chain identity set up via Polkassembly
□ GitBook or README: architecture, setup guide, Hub TestNet addresses
□ Demo video:
    - Show Swap tab → perform a swap
    - Show swapAndBridgeXCM → link to Subscan XCM message
    - Show Vault deposit
    - Show rebalance() → EVM→PVM cross-VM call → XCM execution → Subscan
    - Show Compute Dashboard → systemInfo() live stats → getBestStrategy()
□ Hosted deployment on Hub TestNet (Passet Hub)
□ README roadmap section: Phase 2 native staking
```

### Track Submissions
```
Track 1 (EVM — DeFi/Stablecoin):
    Lead contract: TesseractSwap + TesseractVault
    Key claims: XC-20 AMM, ERC-4626, BLAKE2 pool IDs, atomic swap+XCM bridge

Track 2 (PVM — all three sub-categories):
    Lead contract: TesseractCompute
    Sub-category 1: "Accessing Polkadot native functionality — build with precompiles"
        → routeToParachain() calls XCM precompile from PVM
    Sub-category 2: "Applications using Polkadot native Assets"
        → getAssetBalance() reads Polkadot Assets pallet tokens from PVM
    Sub-category 3: "PVM-experiments: Call Rust or C++ libraries from Solidity"
        → getBestStrategy() calls linked Rust compute_optimal_route()
```