# Tesseract 2.0 — Complete End-to-End Contract Test Directive

***

## Philosophy
These are not unit tests. Each scenario tests a complete user journey from entry to exit, verifying every state change, every event, every edge case, and every revert condition. Every number must be verified mathematically, not just "greater than zero."

***

## Setup Requirements Before Any Test

Deploy the complete local stack in this exact order and store every address:
```
MockSystem → MockXcm → MockAsset(USDT) → MockAsset(USDC) → WPAS
→ TesseractSwap(xcm, system)
→ registerAsset(1, usdt), registerAsset(2, usdc), registerAsset(9999, wpas)
→ TesseractVault(usdt, xcm, system, address(0), "tvUSDT", "tvUSDT")
→ MockTesseractCompute (a simple mock that returns a fixed bestIndex)
→ vault.setComputeContract(mockCompute)
→ Mint 1,000,000 USDT and 1,000,000 USDC to three test wallets: Alice, Bob, Charlie
→ Give Alice, Bob, Charlie 100 ETH each for WPAS wrapping
```

***

## Suite 1 — TesseractSwap: Pool Creation and Liquidity

### Test 1.1 — First Liquidity Deposit (Pool Bootstrap)
```
Action:
  Alice calls addLiquidity(assetA=1, assetB=2, amountA=10_000, amountB=10_000)

Verify ALL of the following:
  Pool ID = hashBlake256(encodePacked(1, 2)) — compute expected value and match exactly
  Pool reserveA = 10_000 exactly
  Pool reserveB = 10_000 exactly
  Alice's shares = sqrt(10_000 * 10_000) = 10_000 exactly
  Pool totalShares = 10_000 exactly
  Alice's USDT balance decreased by exactly 10_000
  Alice's USDC balance decreased by exactly 10_000
  Contract's USDT balance increased by exactly 10_000
  Contract's USDC balance increased by exactly 10_000
  LiquidityAdded event emitted with correct poolId, user, shares
```

### Test 1.2 — Pool ID Symmetry
```
Action:
  Compute getPoolId(1, 2)
  Compute getPoolId(2, 1)

Verify:
  Both return identical bytes32
  Neither is bytes32(0)
  This proves sorting works regardless of input order
```

### Test 1.3 — Second Liquidity Deposit (Proportional Shares)
```
State: Pool has 10_000/10_000 reserves, 10_000 total shares (from Test 1.1)

Action:
  Bob calls addLiquidity(1, 2, amountA=5_000, amountB=5_000)

Verify:
  Bob's shares = min(5_000 * 10_000 / 10_000, 5_000 * 10_000 / 10_000) = 5_000 exactly
  Pool totalShares = 15_000
  Pool reserveA = 15_000
  Pool reserveB = 15_000
  Bob's USDT decreased by 5_000 exactly
  Bob's USDC decreased by 5_000 exactly
```

### Test 1.4 — Imbalanced Second Deposit
```
State: Pool has 15_000/15_000 (from Test 1.3)

Action:
  Charlie calls addLiquidity(1, 2, amountA=6_000, amountB=3_000)

Verify:
  Charlie's shares = min(6_000 * 15_000 / 15_000, 3_000 * 15_000 / 15_000)
                   = min(6_000, 3_000) = 3_000
  Pool totalShares = 18_000
  Pool reserveA = 21_000
  Pool reserveB = 18_000
  Charlie's USDT decreased by 6_000
  Charlie's USDC decreased by 3_000
  Note: Charlie deposited extra USDT but got shares based on limiting token
```

### Test 1.5 — Remove Liquidity (Full Proportional Return)
```
State: Pool from Test 1.4

Action:
  Alice calls removeLiquidity(1, 2, shares=10_000)

Verify:
  Alice's returned USDT = 10_000 * 21_000 / 18_000 = 11_666 (verify exact integer math)
  Alice's returned USDC = 10_000 * 18_000 / 18_000 = 10_000
  Pool totalShares = 8_000
  Alice's share balance = 0
  LiquidityRemoved event emitted with correct values
```

***

## Suite 2 — TesseractSwap: Swap Math

### Test 2.1 — Standard Swap (Verify Exact Output)
```
State: Fresh pool, 100_000 USDT / 100_000 USDC, 100_000 shares

Action:
  Alice calls swap(assetIdIn=1, assetIdOut=2, amountIn=1_000, minAmountOut=0)

Expected output (compute manually):
  amountInWithFee = 1_000 * 997 = 997_000
  amountOut = (997_000 * 100_000) / (100_000 * 1000 + 997_000)
            = 99_700_000_000 / 100_997_000
            = 987 (verify exact integer division)

Verify:
  Alice receives exactly 987 USDC (not "approximately", exactly 987)
  Pool reserveA = 101_000
  Pool reserveB = 99_013
  k_after = 101_000 * 99_013 = 10_001_313_000
  k_before = 100_000 * 100_000 = 10_000_000_000
  k_after > k_before ✅ (fees increase k — this is correct)
  Swap event emitted with all correct parameters
```

### Test 2.2 — Reverse Swap (USDC → USDT)
```
State: Pool from Test 2.1 (101_000 / 99_013)

Action:
  Bob calls swap(assetIdIn=2, assetIdOut=1, amountIn=500, minAmountOut=0)

Verify:
  Compute expected output manually using x*y=k formula
  Bob receives exact expected amount
  Pool reserves update correctly
  k_after >= k_before
```

### Test 2.3 — Slippage Protection Triggers
```
Action:
  Alice calls swap(1, 2, amountIn=1_000, minAmountOut=999)
  (Expected output is ~987, which is less than 999)

Verify:
  Transaction reverts with "slippage exceeded" (or equivalent message)
  Pool state is unchanged after revert
  Alice's balance is unchanged after revert
```

### Test 2.4 — Slippage Protection Passes at Boundary
```
Action:
  Alice calls swap(1, 2, amountIn=1_000, minAmountOut=987)
  (minAmountOut exactly equals expected output)

Verify:
  Transaction succeeds
  Alice receives exactly 987
```

### Test 2.5 — Large Swap Price Impact
```
Action:
  Alice calls swap(1, 2, amountIn=50_000, minAmountOut=0)
  (50% of pool size — large price impact)

Verify:
  Output is significantly less than 50_000 due to price impact
  Compute exact expected output manually and verify
  k invariant holds
  Pool does not go to zero on either side
```

### Test 2.6 — Swap With Zero Reserve Fails
```
Action:
  Attempt to swap on a pool that has never had liquidity added
  (assetIdIn=1, assetIdOut=3 — assetId 3 has no pool)

Verify:
  Transaction reverts (division by zero or require fails)
  No state changes
```

### Test 2.7 — Sequential Swaps Maintain k Invariant
```
Action:
  Execute 10 sequential swaps alternating direction
  Record k = reserveA * reserveB after each swap

Verify:
  k never decreases between any two consecutive swaps
  Final reserves are mathematically consistent with all inputs
```

***

## Suite 3 — TesseractSwap: XCM Bridge

### Test 3.1 — swapAndBridgeXCM Full Flow
```
Action:
  Alice calls swapAndBridgeXCM(
    assetIdIn=1, assetIdOut=2,
    amountIn=1_000, minAmountOut=0,
    xcmDestination=<valid bytes>,
    xcmMessage=<valid bytes>
  )

Verify:
  Swap event emitted with correct assetIdIn, assetIdOut, amountIn, amountOut
  BridgeXCM event emitted with correct user, assetIdOut, destination
  MockXcm.Executed event emitted — confirms weighMessage then execute were called
  MockXcm was called with weighMessage BEFORE execute
    (verify via event ordering in transaction receipt)
  Alice's USDT balance decreased by exactly amountIn
  Pool state updated correctly (same math as Test 2.1)
  All three events present in same transaction receipt
```

### Test 3.2 — swapAndBridgeXCM Slippage Still Protected
```
Action:
  Alice calls swapAndBridgeXCM with minAmountOut=999 (too high)

Verify:
  Transaction reverts on slippage check
  No XCM call was made (MockXcm.Executed event absent)
  Pool state unchanged
  Alice balance unchanged
```

### Test 3.3 — swapAndBridgeXCM Is Atomic
```
Action:
  Deploy a MockXcm that reverts on execute()
  Redeploy TesseractSwap with this reverting MockXcm
  Call swapAndBridgeXCM

Verify:
  Entire transaction reverts
  Pool reserves unchanged
  Alice's token balances unchanged
  No partial state (swap did not happen without bridge)
```

***

## Suite 4 — TesseractSwap: Security

### Test 4.1 — Reentrancy Attack on swap()
```
Setup:
  Deploy ReentrancyAttacker contract with a receive() or callback that
  calls swap() on TesseractSwap again

Action:
  Trigger the attack through an initial swap call

Verify:
  Transaction reverts with reentrancy guard error
  Pool state is unchanged
  No tokens were drained
```

### Test 4.2 — Reentrancy Attack on addLiquidity()
```
Same pattern as Test 4.1 but targeting addLiquidity
Verify: reverts, no state change
```

### Test 4.3 — registerAsset Access Control
```
Action:
  Bob (non-owner) calls registerAsset(5, someAddress)

Verify:
  Transaction reverts with ownership error
  Asset mapping unchanged
```

### Test 4.4 — Swap With Unregistered Asset
```
Action:
  Call swap with assetIdIn=99 (not registered)

Verify:
  Transaction reverts
  Error is meaningful (not a silent zero address call)
```

***

## Suite 5 — TesseractVault: ERC-4626

### Test 5.1 — First Deposit (1:1 Shares)
```
Action:
  Alice calls deposit(assets=10_000, receiver=Alice)

Verify:
  Alice receives exactly 10_000 shares (1:1 on first deposit)
  vault.totalAssets() = 10_000
  vault.totalSupply() = 10_000
  vault.balanceOf(Alice) = 10_000
  Alice's USDT balance decreased by exactly 10_000
  Vault's USDT balance increased by exactly 10_000
  Deposit event emitted with correct caller, receiver, assets, shares
```

### Test 5.2 — Second Deposit (Proportional Shares)
```
State: Vault has 10_000 assets, 10_000 shares (from Test 5.1)

Action:
  Bob calls deposit(assets=5_000, receiver=Bob)

Verify:
  Bob's shares = 5_000 * 10_000 / 10_000 = 5_000
  vault.totalAssets() = 15_000
  vault.totalSupply() = 15_000
  vault.balanceOf(Bob) = 5_000
```

### Test 5.3 — previewDeposit Matches Actual Deposit
```
Action:
  Call previewDeposit(3_000) → record expected_shares
  Charlie calls deposit(3_000, Charlie) → record actual_shares

Verify:
  expected_shares === actual_shares exactly
  No rounding discrepancy
```

### Test 5.4 — Withdraw Full Position
```
State: Alice has 10_000 shares, totalAssets=18_000, totalSupply=18_000

Action:
  Alice calls withdraw(shares=10_000, receiver=Alice)

Verify:
  Alice receives = 10_000 * 18_000 / 18_000 = 10_000 USDT
  vault.totalSupply() = 8_000
  vault.totalAssets() = 8_000
  vault.balanceOf(Alice) = 0
  Withdraw event emitted with correct values
```

### Test 5.5 — previewWithdraw Matches Actual Withdraw
```
Action:
  Call previewWithdraw(Bob's shares) → record expected_assets
  Bob calls withdraw(Bob's shares, Bob) → record actual_assets

Verify:
  expected_assets === actual_assets exactly
```

### Test 5.6 — Withdraw More Than Balance Fails
```
Action:
  Alice calls withdraw(shares=999_999, receiver=Alice)
  (Alice has fewer shares)

Verify:
  Transaction reverts with "insufficient shares"
  No state changes
  Alice balance unchanged
```

### Test 5.7 — Share Price Integrity After Multiple Operations
```
Action:
  Deposit 10_000 (Alice)
  Deposit 10_000 (Bob)
  Withdraw 5_000 shares (Alice)
  Deposit 20_000 (Charlie)
  Withdraw all shares (Bob)

After each operation verify:
  share price = totalAssets / totalSupply remains consistent
  No user can withdraw more assets than they deposited (in a no-yield scenario)
  Sum of all withdrawable assets = totalAssets at every point
```

***

## Suite 6 — TesseractVault: Rebalance and Cross-VM

### Test 6.1 — Weight Guard Blocks Low-Weight Execution
```
Setup:
  Deploy MockSystemLowWeight that returns weightLeft = (1_000_000, 0)
  Deploy TesseractVault with MockSystemLowWeight

Action:
  Owner calls rebalance([100, 500, 200], xcmMessage)

Verify:
  Transaction reverts with "insufficient weight for XCM execution"
  No cross-VM call was made (MockCompute not called)
  No XCM was sent (MockXcm.Executed absent)
  Vault state unchanged
```

### Test 6.2 — Weight Guard Passes at Boundary
```
Setup:
  Deploy MockSystemBoundary that returns weightLeft = (5_000_000_001, 0)
  (just above the 5B threshold)

Action:
  Owner calls rebalance([100, 500, 200], xcmMessage)

Verify:
  Transaction succeeds (weight guard passes)
  Cross-VM call is made
  XCM is executed
```

### Test 6.3 — Cross-VM Call Returns Correct Strategy Index
```
Setup:
  MockTesseractCompute.getBestStrategy([100, 500, 200, 350]) returns 1
  (index of 500, the highest value)

Action:
  Owner calls rebalance([100, 500, 200, 350], xcmMessage)

Verify:
  MockTesseractCompute.getBestStrategy was called with [100, 500, 200, 350]
  Return value was 1
  Rebalanced event contains bestIndex=1
  XCM execution happened after getBestStrategy returned
```

### Test 6.4 — Full Rebalance Sequence Order
```
Action:
  Owner calls rebalance with valid aprs and xcmMessage

Verify the EXACT ORDER of operations by checking event ordering:
  1. weightLeft() was called (MockSystem event or return value checked)
  2. getBestStrategy() cross-VM call happened second
  3. weighMessage() called third
  4. execute() called fourth — NEVER before weighMessage
  
Event order in transaction receipt must reflect this sequence.
If events are out of order, the implementation is wrong.
```

### Test 6.5 — Rebalance Only Owner
```
Action:
  Bob (non-owner) calls rebalance([100, 200], xcmMessage)

Verify:
  Transaction reverts with ownership error
  No cross-VM call
  No XCM sent
```

### Test 6.6 — setComputeContract One-Time Only
```
Action:
  Owner calls setComputeContract(computeAddress1) — succeeds
  Owner calls setComputeContract(computeAddress2) — must fail

Verify:
  First call: computeContract = computeAddress1
  Second call: reverts with appropriate error
  computeContract still = computeAddress1 after revert
```

***

## Suite 7 — TesseractCompute (PVM Logic)

### Test 7.1 — getBestStrategy Correctness
```
Test with multiple input arrays, verify exact output each time:

  Input: [100]              → expected index: 0
  Input: [100, 500, 200]    → expected index: 1
  Input: [500, 100, 200]    → expected index: 0
  Input: [100, 200, 500]    → expected index: 2
  Input: [500, 500, 500]    → expected index: 0 (first occurrence of max)
  Input: [0, 0, 1]          → expected index: 2
  Input: [999, 0, 0]        → expected index: 0

Each must return the exact expected index, not just a plausible value.
```

### Test 7.2 — getAssetBalance Returns Correct Value
```
Setup:
  Mint 50_000 USDT to the TesseractCompute contract address

Action:
  Call getAssetBalance(usdtAddress)

Verify:
  Returns exactly 50_000
  Does not return the caller's balance or any other address's balance
```

### Test 7.3 — systemInfo Returns Live Values
```
Action:
  Call systemInfo()

Verify:
  refTime is a non-zero uint64
  proofSize is a non-zero uint64
  codeHash is a non-zero bytes32
  All three values are consistent with what the System precompile returns
```

### Test 7.4 — routeToParachain Authorization
```
Action:
  Bob (not authorizedCaller) calls routeToParachain(destination, message)

Verify:
  Transaction reverts with "not authorized"
  No XCM was sent (MockXcm.Executed absent)
```

### Test 7.5 — routeToParachain XCM Order
```
Action:
  authorizedCaller calls routeToParachain(destination, message)

Verify:
  MockXcm.Executed event emitted
  weighMessage was called BEFORE execute
  Routed event emitted with correct destination, refTime, proofSize
```

***

## Suite 8 — WPAS Wrapper

### Test 8.1 — Wrap PAS → WPAS
```
Action:
  Alice sends 1 ETH (1e18 wei) to wpas.deposit()

Verify:
  wpas.balanceOf(Alice) = 1e18 exactly
  wpas.totalSupply() = 1e18
  WPAS contract ETH balance = 1e18
  Deposit event emitted
```

### Test 8.2 — Unwrap WPAS → PAS
```
Action:
  Alice calls wpas.withdraw(5e17)

Verify:
  wpas.balanceOf(Alice) decreased by exactly 5e17
  Alice's ETH balance increased by exactly 5e17 (minus gas)
  Withdrawal event emitted
```

### Test 8.3 — WPAS in AMM Pool
```
Action:
  Alice approves TesseractSwap for WPAS
  Alice calls addLiquidity(9999, 1, wpasAmount, usdtAmount)

Verify:
  Pool created successfully
  WPAS and USDT transferred to contract
  Shares minted correctly
  Pool ID is different from USDT/USDC pool
```

### Test 8.4 — Withdraw More Than Balance Fails
```
Action:
  Alice calls wpas.withdraw(999e18) when she has 5e17

Verify:
  Transaction reverts
  No ETH transferred
  WPAS balance unchanged
```

***

## Suite 9 — Full Integration: Complete User Journey

### Test 9.1 — Alice's Complete DeFi Lifecycle
```
This is the full product demo in test form.

Step 1: Alice wraps 10 PAS into WPAS
  → verify WPAS balance = 10e18

Step 2: Alice adds liquidity to WPAS/USDT pool
  → Alice deposits 10e18 WPAS + 1000 USDT
  → verify pool created, shares minted, k = 10e18 * 1000

Step 3: Bob swaps USDT → WPAS
  → Bob swaps 100 USDT for WPAS
  → verify exact output using formula
  → verify k increased

Step 4: Alice swaps and bridges in one transaction
  → Alice swaps 500 USDT → USDC via swapAndBridgeXCM
  → verify Swap event, BridgeXCM event, MockXcm.Executed event
  → verify all three in same transaction

Step 5: Alice deposits USDT into vault
  → Alice deposits 500 USDT
  → verify shares received, totalAssets updated

Step 6: Owner triggers rebalance
  → owner calls rebalance([200, 800, 400], xcmMessage)
  → verify weight guard passed
  → verify getBestStrategy returned index 1
  → verify XCM executed
  → verify Rebalanced event with bestIndex=1

Step 7: Alice withdraws from vault
  → Alice withdraws all her shares
  → verify she receives her USDT back
  → vault totalAssets decreases correctly

Step 8: Alice removes liquidity from pool
  → Alice removes all her shares
  → verify she receives proportional WPAS and USDT back
  → pool totalShares decreases correctly

Final state verification:
  Alice's net position: started with X USDT and Y PAS
  After all operations: verify position is consistent with all trades
  No tokens lost to rounding beyond acceptable 1-wei tolerance
  All contracts have zero unexpected balances
```

***

## Suite 10 — Edge Cases and Boundary Conditions

### Test 10.1 — Deposit Zero Amount
```
Action: deposit(0, Alice)
Verify: reverts or mints zero shares with no state change
```

### Test 10.2 — Withdraw Zero Shares
```
Action: withdraw(0, Alice)
Verify: reverts or returns zero with no state change
```

### Test 10.3 — addLiquidity With Zero Amount
```
Action: addLiquidity(1, 2, 0, 1000)
Verify: reverts — cannot create pool with zero on one side
```

### Test 10.4 — Swap Entire Reserve
```
Action: swap amountIn = reserveA (entire reserve)
Verify: output is very small but non-zero, contract does not break
Pool remains functional for further swaps
```

### Test 10.5 — Multiple Pools Are Independent
```
Action:
  Create pool USDT/USDC (assetIds 1, 2)
  Create pool WPAS/USDT (assetIds 9999, 1)
  Swap in pool 1

Verify:
  Pool 2 reserves completely unchanged
  Pool IDs are different bytes32 values
  getPoolId(1, 2) ≠ getPoolId(9999, 1) — obviously true but verify
```

### Test 10.6 — Vault With No Compute Contract Set
```
State: vault.computeContract = address(0) (not yet set)

Action:
  Owner calls rebalance([100, 200], xcmMessage)

Verify:
  Transaction reverts with meaningful error
  Not a silent call to address(0)
```

***

## Pass Criteria

Every single assertion in every test must pass. There are no "soft" tests here. The following numbers must match exactly:

- All token balance changes: exact to the wei
- All share calculations: exact integer math verified manually
- All k invariant checks: k_after >= k_before after every swap
- All event parameters: exact values, not just event name
- All revert conditions: exact revert message matches

**If any test fails: stop, fix the contract, rerun from Suite 1. Do not proceed to deployment with any failing test.**