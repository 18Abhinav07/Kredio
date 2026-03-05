```
PHASE 3 BUILD GUIDE — KREDIO
==============================
This is a guidelines and architecture document.
Do NOT copy-paste code from here.
Read every section fully before writing any code.
Execute in exact order. Verify each step before proceeding.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 0 — GROUND RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Do not modify any deployed contract.
2. Do not redeploy any existing contract.
3. Do not change oracle, lending pool, or PAS market logic.
4. Every new UI feature must reuse existing wagmi hooks,
   existing contract ABIs, and the proven XCM send flow.
5. The XCM send flow that is proven working must not be changed.
   It lives in lib/xcm.ts as a shared utility.
6. All multi-step flows must be sequential.
   Never show step N+1 until step N is confirmed on-chain.
7. UI must match the existing design system exactly.
   Use the same components, colors, spacing, and typography
   already present in the codebase.
8. Remove the mUSDC faucet/mint section from /xcm-test entirely.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1 — EXISTING CONTRACTS (READ ONLY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

These are deployed and working. Do not touch them.

  MockUSDC          0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646
  GovernanceCache   0xE4De7eade2C0A65bDa6863ad7BA22416c77f3e55
  KreditAgent       0x8c13E6fFDf27bB51304Efff108C9B646d148E5F3
  MockPASOracle     0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7
  KredioLending     0x717A1e2967af17CbE92abd70072aCe823a9B22B4
  KredioPASMarket   0xE748Afa4c5e5bDD3c31c779759Baf294dFb7f95E
  Chain ID          420420417
  Hub RPC           https://eth-rpc-testnet.polkadot.io/
  People Chain RPC  wss://people-paseo.rpc.amforc.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2 — NEW CONTRACT: KredioSwap
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PURPOSE:
  Allows users with PAS on Hub EVM to swap PAS → mUSDC.
  Uses MockPASOracle for live pricing.
  Holds a mUSDC reserve seeded by admin.
  No approval needed from user — swap takes msg.value (native PAS).

CONTRACT SPEC:

  State variables:
    mUSDC address     → MockUSDC contract
    oracle address    → MockPASOracle contract
    owner address     → deployer
    feeBps uint256    → 30 (0.3%), settable by owner, max 100

  View functions:
    quoteSwap(uint256 pasWei) returns (uint256 mUSDCOut)
      → reads oracle latestRoundData()
      → reverts if oracle.isCrashed()
      → pasWei is 18 decimals (Hub EVM wei)
      → price is 8 decimals (Chainlink style)
      → mUSDCOut is 6 decimals
      → formula: (pasWei × price) / 1e20, then deduct feeBps
    
    reserveBalance() returns (uint256)
      → returns mUSDC.balanceOf(address(this))

  Write functions:
    swap(uint256 minMUSDCOut) external payable
      → calls quoteSwap(msg.value) internally
      → requires result >= minMUSDCOut (slippage protection)
      → requires reserveBalance >= output
      → transfers mUSDC to msg.sender
      → emits Swapped event

    fundReserve(uint256 amount) onlyOwner
      → pulls mUSDC from owner via transferFrom
      → emits ReserveFunded event

    withdrawPAS() onlyOwner
      → sends all collected PAS to owner

    withdrawReserve(uint256 amount) onlyOwner
      → sends mUSDC back to owner

    setFee(uint256 newFeeBps) onlyOwner
      → max 100 bps (1%)

  Events:
    Swapped(address indexed user, uint256 pasWei, uint256 mUSDCOut)
    ReserveFunded(address indexed by, uint256 amount)

DEPLOY SEQUENCE:
  1. forge create KredioSwap with --legacy flag
  2. mint 1000000 mUSDC to deployer via MockUSDC.mint()
  3. approve KredioSwap to pull that amount
  4. call fundReserve(100_000 * 1e6)
  5. verify reserveBalance() returns 1000000000000
  6. verify quoteSwap(1e18) returns ~500000 (0.5 mUSDC at $5 PAS)
  7. save address to addresses-latest.md and contracts.ts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3 — SHARED UTILITY: lib/xcm.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PURPOSE:
  Single source of truth for all XCM operations.
  All pages that need XCM import from here.
  Never duplicate XCM logic in page files.

MUST CONTAIN:

  Constants:
    PEOPLE_RPC = 'wss://people-paseo.rpc.amforc.com'
    PAS_SUBSTRATE_DECIMALS = 10   (People Chain balance)
    PAS_EVM_DECIMALS = 18         (Hub EVM getBalance wei)
    MUSDC_DECIMALS = 6

  h160ToSS58(evmAddress: string): string
    → converts MetaMask H160 to SS58 AccountId32
    → AccountId32 = H160 bytes (20) + 0xEE × 12 bytes
    → encode with Paseo prefix 0
    → this is required before passing any EVM address to ParaSpell

  formatPASFromEVM(wei: bigint): string
    → divide by 1e18, return fixed 4 decimal string

  formatPASFromPeople(raw: bigint): string
    → divide by 1e10, return fixed 4 decimal string

  fetchPeopleBalance(address: string): Promise<bigint>
    → creates WsProvider → ApiPromise with PEOPLE_RPC
    → queries api.query.system.account(address)
    → disconnects after query
    → returns free balance as bigint

  sendXCMToHub(params): Promise<{ blockHash: string }>
    → params: senderAddress, destinationEVM, amountPAS (human string), onStatus callback
    → internally: converts amountPAS to substrate units (×10^10)
    → converts destinationEVM to SS58 via h160ToSS58
    → creates ApiPromise with PEOPLE_RPC
    → builds tx via Builder(api).from('PeoplePaseo').to('AssetHubPaseo')
      .currency({ symbol: 'PAS', amount }).address(ss58Dest)
      .senderAddress(senderAddress).build()
    → gets injector via web3FromAddress(senderAddress)
    → calls tx.signAndSend with injector.signer and nonce: -1
    → resolves on isFinalized with no dispatchError
    → rejects with clear error message on failure or cancellation
    → always disconnects api in finally block

  pollHubArrival(params): () => void (cleanup function)
    → params: address, before (bigint), publicClient, onArrival, onTick, intervalMs
    → polls publicClient.getBalance every intervalMs (default 3000)
    → calls onTick(current) on every tick
    → calls onArrival(delta) and stops when balance > before
    → returns a cleanup function to stop polling

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4 — DECIMAL REFERENCE (CRITICAL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Never get these wrong. Every conversion must use these exactly.

  SOURCE                          DECIMALS   DIVIDE BY
  ──────────────────────────────────────────────────────
  People Chain PAS balance        10         1e10
  Hub EVM getBalance() (wei)      18         1e18
  Hub EVM msg.value (contracts)   18         —
  mUSDC ERC20 amounts             6          1e6
  Oracle PAS/USD price answer     8          1e8
  KredioSwap.quoteSwap() input    18 (wei)   —
  KredioSwap.quoteSwap() output   6 (mUSDC)  1e6
  XCM send amount parameter       10         —

  WHEN USER TYPES "1" PAS:
    For XCM send        → multiply by 1e10 → "10000000000"
    For swap msg.value  → multiply by 1e18 → BigInt("1000000000000000000")
    For display         → keep as "1.0000"

  WHEN USER TYPES "100" mUSDC:
    For borrow()        → multiply by 1e6 → 100000000
    For deposit()       → multiply by 1e6 → 100000000
    For approve()       → multiply by 1e6 → 100000000

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5 — UX ARCHITECTURE (READ CAREFULLY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GLOBAL PATTERN FOR ALL MULTI-STEP FLOWS:

  Every multi-step action must follow this exact UX pattern:

  1. SOURCE SELECTOR (tabs)
     User first picks their asset source:
       "PAS on Hub"       → they already have PAS in MetaMask
       "PAS on People"    → they have PAS on People Chain in Talisman
     
     This selector is always shown first, before any input fields.
     Switching tabs resets any in-progress flow state.

  2. STEP INDICATOR
     Show a horizontal step bar:
       ● Step 1  →  ○ Step 2  →  ○ Step 3
     Active step is filled. Completed steps show a checkmark.
     Future steps are greyed out.
     This is always visible once a flow starts.

  3. STEP CONTENT AREA
     Only the current step's UI is shown.
     Previous step results are summarized in a compact
     "completed" card above the current step — not re-editable.

  4. ACTION BUTTON STATES
     Every button must have four states:
       Default:    shows action label
       Loading:    shows spinner + action verb (e.g. "Signing...")
       Success:    shows checkmark + result summary
       Error:      shows error message + retry option
     
     Button must be disabled while loading.
     Never show a spinner without a label explaining what is happening.

  5. STEP TRANSITION
     After a step completes on-chain:
       → Show a success state in current step card for 1.5s
       → Auto-advance to next step
       → Do NOT require manual "Next" click after on-chain confirmation
     
     Exception: if next step requires a new user decision
     (e.g. choosing borrow amount), auto-advance is fine but
     focus the input field.

  6. LOADER MESSAGES (contextual, not generic)
     Each async phase must show a specific message:
       Connecting to People Chain...
       Building XCM transaction...
       Waiting for Talisman signature...
       Broadcasting to network...
       In block — waiting for finalization...
       Waiting for PAS to arrive on Hub... (with live counter)
       Submitting to Hub...
       Waiting for confirmation...
     
     Never show just "Loading..." or a bare spinner.

  7. TALISMAN CONNECT
     Only show Talisman connect UI on tabs that need it
     ("PAS on People" tabs only).
     Show it inline in the step, not in a modal or header.
     Once connected, show account name + balance compactly.
     Do not re-ask for connection if already connected in session.

  8. ERROR HANDLING
     Every async operation must have a catch block.
     User-facing errors must be plain English:
       "Talisman was not found. Please install it."
       "Transaction cancelled."
       "Not enough PAS on People Chain."
       "Swap failed: reserve is low."
       "Borrow failed: health ratio too low."
     
     Never show raw error objects or contract revert strings to users.
     Always show a Retry button on error.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 6 — PAGE: /xcm-test (CLEANUP ONLY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Changes:
  REMOVE: Any mUSDC faucet or mint button/section
  REMOVE: Inline XCM logic — replace with calls to lib/xcm.ts
  KEEP:   All existing working UI exactly as-is
  FIX:    Balance display divisor must be 1e18 for Hub EVM wei
  RENAME: Nav label to "Bridge" (page title stays "Cross-Chain Test")

This page is a developer/test utility. Keep it simple.
Do not add new features here.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 7 — PAGE: /swap
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PURPOSE: User swaps PAS (Hub EVM) → mUSDC using KredioSwap contract.

LAYOUT:
  Single card, no tabs, no steps (this is a single transaction).

  Top section:
    "You Pay" label
    Input field: numeric, PAS amount, shows Hub EVM PAS balance below
    Live quote updates as user types (debounced 300ms)
    Quote reads KredioSwap.quoteSwap(pasWei) as a view call

  Middle section:
    "You Receive" label
    Estimated mUSDC output (from quote, greyed until input)
    Exchange rate: "1 PAS ≈ $X.XX" (derived from oracle)
    Fee: "0.3% (X.XX mUSDC)"
    Slippage: "Max slippage: 1%"

  Bottom section:
    Swap button (disabled if no amount, or amount > balance, or oracle crashed)
    Button states: Default / Signing / Confirming / Done

  After success:
    Show inline success banner: "+X.XX mUSDC received"
    Refresh PAS and mUSDC balances
    Reset input after 3s

IMPLEMENTATION NOTES:
  Quote is a read call — use useReadContract or direct publicClient.readContract
  Swap is a write call — use useWriteContract
  msg.value = parseEther(amount) (18 decimals)
  minOut = quoteResult × 99 / 100 (1% slippage)
  Do not use approve — swap() is payable, no ERC20 input

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 8 — PAGE: /borrow (TAB UPDATES)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXISTING TABS: keep all existing tabs and their functionality unchanged.

ADD a new top-level source selector with two options:
  "PAS on Hub"     → existing PAS collateral flow (no changes)
  "PAS on People"  → new multi-step bridge + borrow flow

Both options use KredioPASMarket (same contract, same functions).
The only difference is how PAS gets to Hub.

──────────────────────────────────
"PAS on Hub" tab:
──────────────────────────────────
  Show existing deposit collateral + borrow flow.
  No changes. Just label it clearly.

──────────────────────────────────
"PAS on People" tab — 3-step flow:
──────────────────────────────────

  STEP 1: Bridge PAS from People Chain
    
    Show:
      Talisman connect (inline, compact)
      People Chain balance once connected
      Input: how much PAS to bridge
      Estimated arrival time: ~30 seconds
      Destination: user's Hub EVM address (from MetaMask)
    
    Action: "Bridge PAS to Hub"
    
    Loader sequence:
      "Connecting to People Chain..."
      "Building XCM transaction..."
      "Waiting for Talisman signature..."
      "Broadcasting..."
      "In block — waiting for arrival on Hub..."
      Live balance counter polling Hub every 3s
    
    Completion:
      Show "+X.XXXX PAS arrived on Hub"
      Show completed card summary
      Auto-advance to Step 2

  STEP 2: Deposit PAS as Collateral
    
    Show:
      Arrived PAS amount (from Step 1)
      Current Hub PAS balance (from getBalance)
      Input: how much to deposit as collateral
        (pre-filled with arrived amount, user can adjust)
      Estimated max borrow (reads KredioPASMarket.maxBorrowable
        after hypothetical deposit — or just show after deposit)
    
    Action: "Deposit Collateral"
    Contract: KredioPASMarket.depositCollateral()
      payable — msg.value = depositAmount in wei (18 dec)
    
    Loader sequence:
      "Waiting for MetaMask confirmation..."
      "Submitting to Hub..."
      "Waiting for confirmation..."
    
    Completion:
      Show collateral balance updated
      Show max borrowable amount
      Auto-advance to Step 3

  STEP 3: Borrow mUSDC
    
    Show:
      Collateral deposited (from Step 2)
      Max borrowable: reads KredioPASMarket.maxBorrowable(address)
      Health ratio preview: reads KredioPASMarket.healthRatio(address)
        Update preview live as user adjusts borrow amount
      Warning if health ratio would go below 1.3
      Input: borrow amount in mUSDC (slider or number input)
        Max = maxBorrowable / 1e6
    
    Action: "Borrow mUSDC"
    Contract: KredioPASMarket.borrow(uint256 borrowAmount)
      borrowAmount in 6 decimals
    
    Loader sequence:
      "Waiting for MetaMask confirmation..."
      "Submitting to Hub..."
      "Waiting for confirmation..."
    
    Completion:
      Show "+X.XX mUSDC received in wallet"
      Show final position summary:
        Collateral: X.XXXX PAS
        Borrowed: X.XX mUSDC
        Health Ratio: X.XX
      Show "View Position" button linking to position details

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 9 — PAGE: /lend (TAB UPDATES)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXISTING TABS: keep all existing tabs and their functionality unchanged.

ADD a new top-level source selector with three options:
  "mUSDC"           → existing lend flow (no changes)
  "Swap & Lend"     → PAS on Hub, swap to mUSDC then lend
  "Bridge & Lend"   → PAS on People Chain, bridge then swap then lend

──────────────────────────────────
"mUSDC" tab:
──────────────────────────────────
  Keep exactly as-is.

──────────────────────────────────
"Swap & Lend" tab — 2-step flow (PAS already on Hub):
──────────────────────────────────

  STEP 1: Swap PAS → mUSDC
    
    Show:
      Hub PAS balance (from getBalance)
      Input: PAS amount to swap
      Live quote from KredioSwap.quoteSwap()
      Exchange rate and fee
    
    Action: "Swap PAS → mUSDC"
    Contract: KredioSwap.swap(minOut) payable
    
    Completion:
      Show "+X.XX mUSDC received"
      Auto-advance to Step 2

  STEP 2: Lend mUSDC
    
    Show:
      mUSDC received in Step 1 (pre-fill amount)
      Current pool APY (derived from KredioLending.utilizationRate())
      Estimated yield preview
    
    Action: "Approve & Lend"
    Sequence:
      1. MockUSDC.approve(KredioLending, amount)
      2. KredioLending.deposit(amount)
    
    Show two sub-steps in loader:
      "Approving mUSDC..." (MetaMask step 1)
      "Depositing to lending pool..." (MetaMask step 2)
    
    Completion:
      Show lending position: X.XX mUSDC earning X.XX% APY

──────────────────────────────────
"Bridge & Lend" tab — 3-step flow (PAS on People Chain):
──────────────────────────────────

  STEP 1: Bridge PAS from People Chain
    Identical to /borrow "PAS on People" Step 1.
    Use the same sendXCMToHub() from lib/xcm.ts.
    Completion: auto-advance to Step 2.

  STEP 2: Swap PAS → mUSDC
    Identical to "Swap & Lend" Step 1 above.
    Pre-fill with arrived PAS amount.
    Completion: auto-advance to Step 3.

  STEP 3: Lend mUSDC
    Identical to "Swap & Lend" Step 2 above.
    Pre-fill with swapped mUSDC amount.
    Completion: show final lending position.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 10 — SHARED STEP COMPONENT SPEC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Build one reusable StepFlow component used by both /borrow and /lend.

  Props:
    steps: Step[]          each step has id, label, icon
    currentStep: number
    completedSteps: Set<number>

  Step indicator renders as horizontal bar:
    Completed step → filled circle with checkmark icon
    Current step   → filled circle with step number, pulsing ring
    Future step    → empty circle, greyed label

  Step card:
    Each step renders in a card with:
      Step number badge (top left)
      Step title (bold)
      Content area (input, info, button)
      Completed state: collapsed card with green checkmark
        and one-line summary of what was done

  Transition animation:
    When step completes → card shrinks to collapsed state (200ms ease)
    Next step card expands (200ms ease)
    Step indicator updates simultaneously

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 11 — SHARED TALISMAN CONNECT COMPONENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Build one reusable TalismanConnect component.
Used inline inside steps that need People Chain.

  States:
    Not connected → shows "Connect Talisman" button
    Connecting    → shows spinner + "Connecting..."
    Connected     → shows account name, truncated address,
                    People Chain PAS balance
    Error         → shows error + retry

  On connect:
    Calls web3Enable('Kredio')
    Calls web3Accounts() filtered to sr25519/ed25519
    Fetches People Chain balance via fetchPeopleBalance() from lib/xcm.ts
    Stores in local state

  Session persistence:
    If Talisman was connected earlier in the session,
    auto-reconnect silently on mount (try web3Enable without UI)
    If successful, skip the connect button entirely

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 12 — NAVIGATION UPDATES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Add to main navigation:
  Swap     → /swap
  Bridge   → /xcm-test  (label only, not page title)

Existing nav items: keep all as-is.

Do NOT add Talisman connect to the global header.
Talisman connect only appears inside specific step flows.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 13 — DO NOT BUILD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✗ KredioXCMReceiver contract — not needed
  ✗ Reverse XCM (Hub → People Chain)
  ✗ Any oracle changes
  ✗ Any changes to existing contracts
  ✗ WalletConnect or Coinbase connectors
  ✗ Governance or voting UI
  ✗ Any faucet or mock mint UI
  ✗ Any new markets or pools

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 14 — VERIFICATION CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After deploying KredioSwap:
  reserveBalance() returns 100000000000
  quoteSwap(1e18) returns approximately 500000
  swap() with 1e18 value transfers mUSDC and emits Swapped event

After building /swap:
  Typing PAS amount updates quote in under 500ms
  Swap button is disabled with 0 input or amount > balance
  MetaMask popup appears on click
  mUSDC balance increases after confirmation
  PAS balance decreases after confirmation

After updating /borrow:
  Source selector switches between "PAS on Hub" and "PAS on People"
  "PAS on Hub" tab shows existing flow unchanged
  "PAS on People" shows Step 1 first
  Step indicator shows correct active state
  After XCM arrival, Step 2 appears with pre-filled amount
  After collateral deposit, Step 3 appears with maxBorrowable
  After borrow, position summary shows correct values

After updating /lend:
  Source selector switches between all three options
  "mUSDC" tab shows existing flow unchanged
  "Swap & Lend" completes in 2 steps with correct amounts
  "Bridge & Lend" completes in 3 steps with correct amounts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 15 — BUILD ORDER (STRICT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  1. Deploy KredioSwap.sol
  2. Seed reserve and verify
  3. Update contracts.ts with address + ABI
  4. Build lib/xcm.ts shared utility
  5. Cleanup /xcm-test (remove faucet, use lib/xcm.ts)
  6. Build /swap page
  7. Build shared StepFlow component
  8. Build shared TalismanConnect component
  9. Update /borrow page with source selector + PAS on People flow
  10. Update /lend page with source selector + Swap & Lend + Bridge & Lend flows
  11. Update navigation
  12. Run full verification checklist
```