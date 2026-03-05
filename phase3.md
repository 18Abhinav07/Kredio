Here are the segments in exact build order. Each is a self-contained unit the agent can execute fully before moving to the next.

***

## Segment 1 — Deploy KredioSwap Contract

```
SEGMENT 1: Deploy KredioSwap Contract
======================================
Goal: Deploy KredioSwap.sol and seed the mUSDC reserve.

CONTEXT:
  Network: Hub Testnet, chainId 420420417
  RPC: https://eth-rpc-testnet.polkadot.io/
  MockUSDC: 0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646 (6 decimals, free mint)
  MockPASOracle: 0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7 (PAS/USD, 8 dec)
  Deployer: 0xe37a8983570B39F305fe93D565A29F89366f3fFe

TASK:
  1. Write contracts/evm/KredioSwap.sol with this exact spec:
       - Reads MockPASOracle.latestRoundData() for price
       - Reads MockPASOracle.isCrashed() — revert if true
       - quoteSwap(uint256 pasWei) view returns mUSDC amount
           formula: (pasWei × price) / 1e20, then subtract feeBps (default 30)
           pasWei = 18 decimals, price = 8 decimals, output = 6 decimals
       - swap(uint256 minMUSDCOut) external payable
           uses msg.value as pasWei input
           transfers mUSDC to msg.sender
           emits Swapped(address user, uint256 pasWei, uint256 mUSDCOut)
       - fundReserve(uint256 amount) onlyOwner
           pulls mUSDC from owner via transferFrom
       - withdrawPAS() onlyOwner — sends ETH balance to owner
       - withdrawReserve(uint256 amount) onlyOwner
       - setFee(uint256 bps) onlyOwner — max 100
       - reserveBalance() view returns mUSDC.balanceOf(this)
       - receive() external payable

  2. Deploy:
       forge create evm/KredioSwap.sol:KredioSwap \
         --rpc-url https://eth-rpc-testnet.polkadot.io/ \
         --private-key $PRIVATE_KEY --legacy

  3. Seed reserve:
       cast send MockUSDC "mint(address,uint256)" $DEPLOYER 100000000000 --legacy
       cast send MockUSDC "approve(address,uint256)" $SWAP_ADDR 100000000000 --legacy
       cast send $SWAP_ADDR "fundReserve(uint256)" 100000000000 --legacy

  4. Verify:
       cast call $SWAP_ADDR "reserveBalance()(uint256)"
       → must return 100000000000
       cast call $SWAP_ADDR "quoteSwap(uint256)(uint256)" 1000000000000000000
       → must return ~500000

  5. Save deployed address to:
       contracts/addresses-latest.md as KredioSwap
       frontend/src/lib/contracts.ts as KREDIO_SWAP_ADDRESS
       Add full ABI from out/KredioSwap.sol/KredioSwap.json
         as KREDIO_SWAP_ABI in contracts.ts

DONE WHEN: reserveBalance and quoteSwap both return correct values.
```

***

## Segment 2 — Shared XCM Utility

```
SEGMENT 2: Build lib/xcm.ts
============================
Goal: Single shared file for all XCM operations.
      All future pages import from here. No XCM logic in page files.

CONTEXT:
  People Chain RPC: wss://people-paseo.rpc.amforc.com
  PAS on People Chain = 10 decimals
  PAS on Hub EVM getBalance() = 18 decimals (wei)
  XCM proven working with:
    Builder(api).from('PeoplePaseo').to('AssetHubPaseo')
    .currency({ symbol: 'PAS', amount }) — amount in 10 decimal string
    .address(ss58Dest)   ← H160 converted to SS58 AccountId32
    .senderAddress(talismanAddress)
    .build()
    then signAndSend with { signer: injector.signer, nonce: -1 }

FILE: frontend/src/lib/xcm.ts

MUST EXPORT:

  1. Constants:
       PEOPLE_RPC
       PAS_SUBSTRATE_DECIMALS = 10
       PAS_EVM_DECIMALS = 18

  2. h160ToSS58(evmAddress: string): string
       H160 (20 bytes) + 0xEE × 12 bytes = AccountId32 (32 bytes)
       encodeAddress with prefix 0 (Paseo)

  3. formatPASFromEVM(wei: bigint, dp = 4): string
       divide by 1e18

  4. formatPASFromPeople(raw: bigint, dp = 4): string
       divide by 1e10

  5. fetchPeopleBalance(address: string): Promise<bigint>
       WsProvider → ApiPromise.create
       api.query.system.account(address)
       return free balance as bigint
       disconnect in finally

  6. sendXCMToHub(params: {
       senderAddress: string,
       destinationEVM: string,
       amountPAS: string,
       onStatus: (msg: string) => void
     }): Promise<{ blockHash: string }>
       converts amountPAS → substrate units (× 1e10, as string)
       converts destinationEVM → SS58 via h160ToSS58
       creates ApiPromise with PEOPLE_RPC
       builds and sends tx as proven working
       resolves on isFinalized with no dispatchError
       rejects with plain English message on cancel or error
       always disconnects in finally

  7. pollHubArrival(params: {
       address: string,
       before: bigint,
       publicClient: any,
       onArrival: (delta: bigint) => void,
       onTick?: (current: bigint) => void,
       intervalMs?: number
     }): () => void
       polls publicClient.getBalance every intervalMs (default 3000)
       calls onTick on every poll
       calls onArrival and stops when balance > before
       returns cleanup function

DONE WHEN: File compiles with no TypeScript errors.
```

***

## Segment 3 — Cleanup /xcm-test Page

```
SEGMENT 3: Cleanup /xcm-test Page
===================================
Goal: Remove faucet, use shared lib/xcm.ts, fix balance display.

CHANGES ONLY — do not rewrite the page from scratch:

  1. REMOVE entirely:
       Any mUSDC mint or faucet button, section, or state
       Any inline h160ToSS58 function (import from lib/xcm.ts)
       Any inline XCM send logic (replace with sendXCMToHub)
       Any inline pollHubArrival logic (replace with imported version)

  2. FIX balance display:
       Hub EVM getBalance returns wei (18 decimals)
       Replace any division by 1e10 with division by 1e18
       Use formatPASFromEVM() from lib/xcm.ts

  3. IMPORT from lib/xcm.ts:
       sendXCMToHub, pollHubArrival, fetchPeopleBalance,
       formatPASFromEVM, formatPASFromPeople, PEOPLE_RPC

  4. NAV label:
       In the navigation component, label this route "Bridge"
       Page h1 title stays "Cross-Chain Test"

  5. Keep unchanged:
       All UI layout and components
       MetaMask connect (Step 1)
       Talisman connect (Step 2)
       Amount input and send button
       Status messages and balance tracker

DONE WHEN: /xcm-test works identically to before,
           balance shows correct PAS amount,
           no faucet section visible.
```

***

## Segment 4 — Build /swap Page

```
SEGMENT 4: Build /swap Page
============================
Goal: PAS on Hub EVM → swap to mUSDC via KredioSwap contract.
      Single transaction. No steps. Clean swap card UI.

FILE: frontend/src/app/swap/page.tsx

CONTRACT CALLS:
  Read: KredioSwap.quoteSwap(pasWei) — live quote as user types
  Write: KredioSwap.swap(minOut) with msg.value = pasWei

UI LAYOUT (single card):

  Header: "Swap" with subtitle "PAS → mUSDC"

  Input section — "You Pay":
    Numeric input for PAS amount
    Below input: "Balance: X.XXXX PAS" (from publicClient.getBalance)
    "Max" button fills in full balance minus small gas buffer

  Quote section — "You Receive":
    Shows estimated mUSDC output from quoteSwap()
    Updates with 300ms debounce as user types
    Shows: exchange rate "1 PAS ≈ $X.XX" (from oracle answer / 1e8)
    Shows: fee "0.3% = X.XX mUSDC"
    Greyed placeholder until user types

  Swap button:
    Disabled states: no input, amount > balance, oracle crashed, loading
    Default: "Swap PAS → mUSDC"
    Loading (signing): spinner + "Waiting for MetaMask..."
    Loading (confirming): spinner + "Confirming..."
    Success: checkmark + "Done"

  Success banner (shows below button after tx):
    "+X.XX mUSDC received"
    Fades out after 5s, resets form

IMPLEMENTATION RULES:
  Use useReadContract for quoteSwap (not useEffect + fetch)
  Use useWriteContract for swap
  msg.value = parseUnits(amount, 18) as bigint
  minOut = quoteResult × 99n / 100n (1% slippage)
  After success: invalidate/refetch PAS and mUSDC balances
  Show mUSDC balance below the receive section
  Do NOT use approve — swap() is payable, no ERC20 needed

DECIMAL RULES:
  User input "1" → parseUnits("1", 18) → 1000000000000000000n for msg.value
  quoteSwap returns mUSDC in 6 decimals → divide by 1e6 for display

DONE WHEN:
  Typing 1 PAS shows correct mUSDC estimate
  Clicking Swap shows MetaMask popup with correct value
  After confirm: mUSDC balance increases, PAS balance decreases
```

***

## Segment 5 — Shared Step Components

```
SEGMENT 5: Build Shared Step UI Components
============================================
Goal: Reusable components for all multi-step flows.
      Used by /borrow and /lend in Segments 6 and 7.

BUILD TWO COMPONENTS:

──────────────────────────────────
COMPONENT 1: StepFlow
FILE: frontend/src/components/StepFlow.tsx
──────────────────────────────────

Props:
  steps: Array<{ id: number, label: string, icon?: ReactNode }>
  currentStep: number
  completedSteps: number[]
  children: ReactNode (only current step content rendered)

Renders:
  Horizontal step indicator bar at top:
    Each step = circle + label
    Completed = filled circle + checkmark
    Current = filled circle + number + subtle pulse animation
    Future = empty circle + greyed label
    Connected by a line between circles
    Line segment fills/colors as steps complete

  Step cards below:
    Only current step card is expanded
    Completed steps shown as collapsed cards:
      Compact row with: step number, step label, green checkmark,
      one-line result summary (passed as completedSummary prop)
    Collapsed cards have no interaction

  Transition:
    Collapse animation: 150ms ease-out
    Expand animation: 150ms ease-in
    Step indicator updates simultaneously with card transition

──────────────────────────────────
COMPONENT 2: TalismanConnect
FILE: frontend/src/components/TalismanConnect.tsx
──────────────────────────────────

Props:
  onConnected: (address: string) => void
  onBalanceLoaded?: (balance: bigint) => void

Internal states: idle | connecting | connected | error

Renders by state:
  idle:
    Button "Connect Talisman" with Talisman logo icon
  connecting:
    Spinner + "Connecting to Talisman..."
  connected:
    Account name (from meta.name)
    Address truncated: first 6 + ... + last 4 chars
    Balance: "X.XXXX PAS on People Chain"
    Small green dot indicator
  error:
    Red text with plain English error message
    "Retry" button

Behavior:
  On mount: silently try web3Enable to detect existing session
  If already enabled: skip to connected state
  fetchPeopleBalance from lib/xcm.ts for balance
  Multiple accounts: show dropdown selector, update balance on change

──────────────────────────────────
COMPONENT 3: StepActionButton
FILE: frontend/src/components/StepActionButton.tsx
──────────────────────────────────

Props:
  label: string
  loadingLabel: string
  isLoading: boolean
  isSuccess: boolean
  isDisabled: boolean
  onClick: () => void

Renders:
  disabled: greyed button, no interaction
  default: full color, shows label
  loading: spinner on left + loadingLabel, non-interactive
  success: checkmark icon + "Done", green tint, non-interactive

DONE WHEN:
  All three components render correctly
  StepFlow transitions work smoothly
  TalismanConnect detects existing session on mount
```

***

## Segment 6 — Update /borrow Page

```
SEGMENT 6: Update /borrow Page
================================
Goal: Add "PAS on Hub" / "PAS on People" source selector.
      "PAS on Hub" = existing flow unchanged.
      "PAS on People" = new 3-step bridge + deposit + borrow flow.

EXISTING PAGE: keep all existing functionality.
Only add the source selector and new "PAS on People" tab content.

──────────────────────────────────
SOURCE SELECTOR (add at top of page):
──────────────────────────────────
  Two pill/tab buttons:
    "PAS on Hub"      (default selected)
    "PAS on People"
  
  Switching tabs resets any in-progress flow state.
  Switching tabs does NOT reset wallet connections.

──────────────────────────────────
"PAS on Hub" tab content:
──────────────────────────────────
  Render existing borrow flow exactly as it is today.
  No changes whatsoever.

──────────────────────────────────
"PAS on People" tab content:
──────────────────────────────────
  Uses StepFlow component (Segment 5) with 3 steps.
  Uses TalismanConnect component (Segment 5) in Step 1.
  Uses StepActionButton (Segment 5) for all action buttons.
  Uses sendXCMToHub and pollHubArrival from lib/xcm.ts.

  STEP 1 — Bridge PAS
    Content:
      TalismanConnect component
      (only show amount input and button after connected)
      Input: PAS amount to bridge
      Info row: "Destination: your Hub address (MetaMask)"
      Info row: "Estimated arrival: ~30 seconds"
    
    Button: "Bridge X PAS to Hub"
    
    Loader messages in order:
      "Connecting to People Chain..."
      "Building XCM transaction..."
      "Waiting for Talisman signature..."
      "Broadcasting to network..."
      "Waiting for PAS to arrive on Hub..." 
        + live counter showing Hub balance delta every 3s
    
    On arrival detected:
      completedSummary: "+X.XXXX PAS arrived on Hub"
      auto-advance to Step 2 after 1.5s

  STEP 2 — Deposit Collateral
    Content:
      Info row: "Available: X.XXXX PAS on Hub" (live getBalance)
      Input: amount to deposit (pre-filled with arrived amount)
        user can reduce but not exceed Hub balance
      Info row: "Collateral ratio: 65% LTV"
    
    Button: "Deposit X PAS as Collateral"
    Contract: KredioPASMarket.depositCollateral() payable
      value = parseUnits(input, 18)
    
    Loader messages:
      "Waiting for MetaMask..."
      "Confirming deposit..."
    
    On success:
      completedSummary: "X.XXXX PAS deposited as collateral"
      auto-advance to Step 3

  STEP 3 — Borrow mUSDC
    Content:
      Info row: "Collateral: X.XXXX PAS"
      Info row: "Max borrowable: X.XX mUSDC" (KredioPASMarket.maxBorrowable)
      Input: mUSDC amount to borrow (max = maxBorrowable / 1e6)
      Health ratio preview row:
        updates live as user adjusts input
        reads KredioPASMarket.healthRatio() after deposit
        shows warning icon if projected ratio < 1.3
    
    Button: "Borrow X mUSDC"
    Contract: KredioPASMarket.borrow(uint256) — amount × 1e6
    
    Loader messages:
      "Waiting for MetaMask..."
      "Confirming borrow..."
    
    On success:
      Show final position card:
        "Collateral: X.XXXX PAS"
        "Borrowed: X.XX mUSDC"
        "Health Ratio: X.XX"
      Show "View Position" link to existing position section

DONE WHEN:
  Source selector switches tabs cleanly
  "PAS on Hub" tab is unchanged
  "PAS on People" completes all 3 steps end to end
  Position shows correctly after Step 3
```

***

## Segment 7 — Update /lend Page

```
SEGMENT 7: Update /lend Page
==============================
Goal: Add source selector with 3 options.
      "mUSDC" = existing unchanged.
      "Swap & Lend" = PAS on Hub, 2 steps.
      "Bridge & Lend" = PAS on People, 3 steps.

EXISTING PAGE: keep all existing functionality.
Only add the source selector and new tab content.

──────────────────────────────────
SOURCE SELECTOR (add at top of page):
──────────────────────────────────
  Three pill/tab buttons:
    "mUSDC"          (default selected)
    "Swap & Lend"
    "Bridge & Lend"
  
  Switching resets in-progress flow state, not wallet state.

──────────────────────────────────
"mUSDC" tab: unchanged.
──────────────────────────────────

──────────────────────────────────
"Swap & Lend" tab — 2 steps:
──────────────────────────────────
  Uses StepFlow with 2 steps.

  STEP 1 — Swap PAS → mUSDC
    Content:
      Input: PAS amount
      Balance row: "X.XXXX PAS in wallet"
      Live quote from KredioSwap.quoteSwap()
      Rate row: "1 PAS ≈ $X.XX · Fee 0.3%"
    
    Button: "Swap X PAS → Y mUSDC"
    Contract: KredioSwap.swap(minOut) payable
      value = parseUnits(input, 18)
      minOut = quote × 99n / 100n
    
    Loader: "Waiting for MetaMask..." → "Confirming swap..."
    
    On success:
      completedSummary: "Swapped X PAS → Y mUSDC"
      store received mUSDC amount in flow state
      auto-advance to Step 2

  STEP 2 — Lend mUSDC
    Content:
      Input: mUSDC to lend (pre-filled with Step 1 output)
      APY row: derived from KredioLending.utilizationRate()
      Yield preview: "Earning ~X.XX% APY"
    
    Action is TWO transactions — show clearly as sub-steps:
      Sub-step 1: Approve
        Button label changes to "Approving..." during tx
      Sub-step 2: Deposit
        Button label changes to "Depositing..." during tx
      Single "Approve & Lend" button triggers both in sequence
    
    Contracts:
      MockUSDC.approve(KredioLending, amount × 1e6)
      KredioLending.deposit(amount × 1e6)
    
    On success:
      Show: "Lending X.XX mUSDC at X.XX% APY"

──────────────────────────────────
"Bridge & Lend" tab — 3 steps:
──────────────────────────────────
  Uses StepFlow with 3 steps.

  STEP 1 — Bridge PAS from People Chain
    Identical to /borrow Segment 6 Step 1.
    Same component logic, same lib/xcm.ts calls.
    completedSummary: "+X.XXXX PAS arrived on Hub"
    auto-advance to Step 2.

  STEP 2 — Swap PAS → mUSDC
    Identical to "Swap & Lend" Step 1 above.
    Pre-fill input with arrived PAS amount from Step 1.
    completedSummary: "Swapped X PAS → Y mUSDC"
    auto-advance to Step 3.

  STEP 3 — Lend mUSDC
    Identical to "Swap & Lend" Step 2 above.
    Pre-fill input with mUSDC from Step 2.
    On success: show final position.

DONE WHEN:
  All three tabs switch cleanly
  "mUSDC" tab unchanged
  "Swap & Lend" completes in 2 steps with correct balances
  "Bridge & Lend" completes in 3 steps with correct balances
```

***

## Segment 8 — Navigation Update

```
SEGMENT 8: Update Navigation
==============================
Goal: Add Swap and Bridge to main nav. Nothing else changes.

CHANGES:
  In the main navigation component (wherever nav links are defined):
  
  ADD:
    { label: "Swap",   href: "/swap" }
    { label: "Bridge", href: "/xcm-test" }
  
  KEEP all existing nav items exactly as-is.
  Order suggestion: Lend · Borrow · Swap · Bridge

  Do NOT add Talisman connect button to the header.
  Do NOT add any wallet UI to the nav bar.

DONE WHEN: Both new links appear in nav and route correctly.
```

***

**Execute in order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8.**
Each segment is independent and verifiable before the next starts.