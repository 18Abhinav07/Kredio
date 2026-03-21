# Kredio Product Simulation Report

- Run Date: 2026-03-20T08:31:41.207Z
- Duration: 1089.6s
- Chain: 420420417
- RPC: https://eth-rpc-testnet.polkadot.io/
- Steps: 48 | Passed: 41 | Failed: 7

## Scenario Objective

- Convert testing flow into product-style multi-user simulation
- Required user flow enforced: USER1/USER2 deposit, USER3/USER4 borrow+repay, USER1/USER2 harvest+withdraw
- Intelligent yield exercised under stressed liquidity and validated via depositor pending-yield progression
- Oracle crash simulation executed and liquidation verified
- Expected failures classified separately from true failures

## Initial Targets

| Metric | Target |
|---|---:|
| User mUSDC funding floor | 200,000 |
| User PAS funding floor | 500 |

## Contract Addresses

| Contract | Address |
|---|---|
| MUSDC | 0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646 |
| LENDING | 0x61c6b46f5094f2867Dce66497391d0fd41796CEa |
| PAS_MARKET | 0x5617dBa1b13155fD6fD62f82ef6D9e8F0F3B0E86 |
| YIELD_POOL | 0x1dB4Faad3081aAfe26eC0ef6886F04f28D944AAB |
| ORACLE | 0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7 |

## Step-by-Step Execution

| # | Phase | Actor | Contract | Action | Expected | Status | Tx Hash | Gas | Notes |
|---:|---|---|---|---|---|---|---|---:|---|
| 1 | PHASE 1 | ADMIN | KredioLending | Reset globalTick=0 on Lending | Lending tick reset | PASS | `0x40c9f5c9ee468e3f2b9a005c30a31cc88873f4ec949073beb0d6e1b997d63407` | 0 | - |
| 2 | PHASE 1 | ADMIN | KredioPASMarket | Reset globalTick=0 on PASMarket | PASMarket tick reset | PASS | `0x56cf5d74230fe1d6d6b9fcd79eafec9dfb669317afab47ca5895bfb03b4fe0da` | 0 | - |
| 3 | PHASE 1 | ADMIN | KredioLending | adminCleanContract on Lending (7 users) | Lending clean state | PASS | `0x4bdc2f10013b71fd990ed3c017718e4c2983c3d16ac3e84d381825475d1fa8f7` | 0 | - |
| 4 | PHASE 1 | ADMIN | KredioPASMarket | adminCleanContract on PASMarket (7 users) | PAS clean state | PASS | `0xbeb9fa13f1cb885d3f30a5073b83af38e95b7ed788122964675a3b5653d0b1d6` | 0 | - |
| 5 | PHASE 1 | ADMIN | READ_ONLY_CHECK | Verify clean deposits are zero | Both market totalDeposited should be zero after clean | PASS | - | - | Both markets clean |
| 6 | PHASE 2 | ADMIN | KredioLending | Set lending tick multiplier = 86400 | 1 second -> 1 day interest simulation | PASS | `0x1f3242cb5eca561f89c4d0b0e3aebe58b6cabd8d1050f077e90ad2a378a325fc` | 21820 | - |
| 7 | PHASE 2 | ADMIN | KredioPASMarket | Set PAS market tick multiplier = 86400 | 1 second -> 1 day interest simulation | PASS | `0x794e4e56a8528da7d6377cc704504c4ddedd9ceb75b6d8db91f497f49e7da101` | 21820 | - |
| 8 | PHASE 2 | ADMIN | KredioLending | Wire yield pool to lending | Lending strategyStatus.pool points to deployed yield pool | PASS | `0x08c7b96f8f3fd356c5ad473e572c0cb4e384d60d7483c7469dd5e20d94bc8e5b` | 1271 | - |
| 9 | PHASE 2 | ADMIN | KredioPASMarket | Set PAS risk params (ltv=6500, bonus=800, stale=86400, fee=1000) | Stable testing risk profile | PASS | `0x27483c8b7e1c1a23bc7ed696ce6589f3ba46f0da46a385418fadf512dc31fa8d` | 1940 | - |
| 10 | PHASE 2 | ADMIN | MockYieldPool | Set yield pool rate to 100000 bps | Fast visible external yield accrual | PASS | `0x3093d985bcb0c04761cbd13d881aa0e1cce4da02175208e6d286d55afba90ee6` | 1180 | - |
| 11 | PHASE 2 | ADMIN | MockPASOracle | Refresh oracle with normal price 572250000 | Fresh normal oracle baseline before borrow simulation | PASS | `0x7019a2021680e02c2140f7c546556b8327fc9299235ee310d9f9aa569e807d90` | 1543 | - |
| 12 | PHASE 2 | ADMIN | MockUSDC | Approve max mUSDC -> Lending | Admin can seed liquidity and support strategy ops | PASS | `0xa376072fdd3d55f1b51e710d2b1b8388788f9f821602eab34f65062c9643a1dd` | 1256 | - |
| 13 | PHASE 2 | ADMIN | MockUSDC | Approve max mUSDC -> PASMarket | Admin can seed PAS market + liquidations | PASS | `0x792b0ff4751c451008487519377c56042303833eebe20713fa4d73f310c9e6e9` | 1256 | - |
| 14 | PHASE 2 | ADMIN | KredioLending | Seed Lending with 700000 mUSDC | Initial deep liquidity for simulation | PASS | `0x5f958697ddf23c5b80db5060c9587733cdd3501d014e5e5d91ee5c33e153e7c0` | 106701 | - |
| 15 | PHASE 2 | ADMIN | KredioPASMarket | Seed PASMarket with 350000 mUSDC | Initial PAS market liquidity | PASS | `0x67f82515fb876f64785b7128f6a76a074de00c6ceaef775978e4cad37a4a579c` | 106792 | - |
| 16 | PHASE 3 | USER1 | MockUSDC | Approve 120,000.00 mUSDC to Lending | USER1 allowance set | PASS | `0xf5bfd4e43d5160b2c8fa288321b58f7b6e56bfde6fbbaeb6840e829c0e6954c2` | 21885 | - |
| 17 | PHASE 3 | USER1 | KredioLending | Deposit 120,000.00 mUSDC to Lending | USER1 becomes depositor | PASS | `0x9d50aa47466bfd37e1b8ebc078d5751a2b01c9cf1f630aba4bb9ef94c413a5e0` | 44766 | - |
| 18 | PHASE 3 | USER2 | MockUSDC | Approve 90,000.00 mUSDC to Lending | USER2 allowance set | PASS | `0xb64651173fd9d247b0af20bb4be300d1e2c83e148b72627e9f30a289606187d8` | 1246 | - |
| 19 | PHASE 3 | USER2 | KredioLending | Deposit 90,000.00 mUSDC to Lending | USER2 becomes depositor | PASS | `0x1308b081ae33a95f138bc2124026f60458c247d6bd018fa95f583af620531c8e` | 44766 | - |
| 20 | PHASE 3 | ADMIN | KredioLending | Invest idle 350,000.00 mUSDC into strategy | investedAmount increases and strategy accrues yield | PASS | `0x8e32afa78549f58e090816bd9cdef6ba91986ca47f0e8e9956337cc7416f592c` | 24997 | - |
| 21 | PHASE 3 | ADMIN | READ_ONLY_CHECK | Check strategy pending yield > 0 after invest | Strategy pending yield should increase after invest + time | PASS | - | - | pendingStrategyYield=10.6545 mUSDC |
| 22 | PHASE 3 | USER3 | MockUSDC | Approve 70,000.00 mUSDC collateral to Lending | USER3 collateral allowance ready | PASS | `0x7bbd3658429ad095e1ad0f6668ee1754134a6cc5a9032c9a0a668696e4c23b14` | 1256 | - |
| 23 | PHASE 3 | USER3 | KredioLending | Deposit 70,000.00 mUSDC collateral to Lending | USER3 collateral set for borrowing | PASS | `0x582ffaa6fceb94d22b1282a56862abcd01812c41fa0fa3dbd5a3881a8585d36b` | 2318 | - |
| 24 | PHASE 3 | USER3 | KredioLending | Borrow 35,000.00 mUSDC from Lending | USER3 debt opens and pool utilization increases | FAIL | `0x92da5b836bb8e68b49471e8a89ec00672ca2cd2e1321ef74bf1c733111948b3d` | - | tx 0x92da5b836bb8e68b49471e8a89ec00672ca2cd2e1321ef74bf1c733111948b3d not mined within 180s |
| 25 | PHASE 3 | ADMIN | KredioLending | Tick Lending pool for USER3 debt capitalization | Borrow interest converted into lender yield | FAIL | `0x244d86356900acb1098a04bd879c30f3fba424fe44c09ede5bd9e91f61be2f9b` | - | tx 0x244d86356900acb1098a04bd879c30f3fba424fe44c09ede5bd9e91f61be2f9b not mined within 180s |
| 26 | PHASE 3 | USER3 | MockUSDC | Approve 1,000.00 mUSDC for Lending repay | Repay allowance set | PASS | `0x8a48b67e7492b2f0249ffffc92438bfd27a87acd9a56eca9b2542fa0c85e4c55` | 21895 | - |
| 27 | PHASE 3 | USER3 | KredioLending | Repay Lending debt (owed 0.00 mUSDC) | USER3 lending debt closed and collateral returned | FAIL | - | - | execution reverted: "no position" |
| 28 | PHASE 3 | USER4 | KredioPASMarket | Deposit 40 PAS collateral into PASMarket | USER4 PAS collateral active | PASS | `0x28cdeddb538e8b372eda5bde8e914ad1c2132d4f38d909722856a99da8fd236b` | 22057 | - |
| 29 | PHASE 3 | USER4 | KredioPASMarket | Borrow 104.1495 mUSDC from PASMarket | USER4 PAS debt opens | PASS | `0x97b6e70f791b23c3fb90410de06ec9cccb2c8604c3205a9e36ab7d11acc96e3d` | 108093 | - |
| 30 | PHASE 3 | ADMIN | KredioPASMarket | Tick PASMarket for USER4 debt capitalization | PAS debt interest capitalized | PASS | `0x95814f903516e4bac1158918b3a053f16f0f0eb942e32406994ccc3307cda065` | 44692 | - |
| 31 | PHASE 3 | USER4 | MockUSDC | Approve 304.9028 mUSDC for PAS repay | Repay allowance set | PASS | `0xb530d9864f4ce42313d102ce182d513a8789d5b43505923cd78ed004035c9082` | 1246 | - |
| 32 | PHASE 3 | USER4 | KredioPASMarket | Repay PAS debt (owed 104.9028 mUSDC) | USER4 PAS position closed after repayment | PASS | `0x4917bacb6b4f3f894cfb2f0f7cc7a675b846860b00c81292008e00954d67daa9` | 0 | USER4 active=false |
| 33 | PHASE 3 | USER4 | KredioPASMarket | Withdraw PAS collateral after full repay | Collateral withdrawal succeeds after debt close | PASS | `0xe6c29fbc1a0e57c86611621f6cbc9ac74ae403654aaa7eaa567595f01246434e` | 0 | - |
| 34 | PHASE 3 | USER4 | KredioPASMarket | Deposit 30 PAS collateral for high-risk position | Risky collateral position opened | PASS | `0xc4cad7e12cd1957522164d33ac4b495e875de650416fa82c0644fbdb2050b93d` | 22057 | - |
| 35 | PHASE 3 | USER4 | KredioPASMarket | Borrow 103.7775 mUSDC at high LTV | Position vulnerable to oracle downside move | FAIL | - | - | execution reverted: "exceeds LTV" |
| 36 | PHASE 3 | ADMIN | MockPASOracle | Crash oracle price to 47687500 for liquidation test | Collateral value drops sharply, risky position becomes liquidatable | FAIL | `0xd15d3b86948009954212a905a0b6f42223b94f4f1db18e130ce324d44937e23a` | - | tx 0xd15d3b86948009954212a905a0b6f42223b94f4f1db18e130ce324d44937e23a not mined within 180s |
| 37 | PHASE 3 | ADMIN | KredioPASMarket | Liquidate USER4 risky PAS position | Liquidation succeeds and closes USER4 risky PAS debt | FAIL | - | - | execution reverted: "no position" |
| 38 | PHASE 3 | USER4 | KredioPASMarket | Expected failure: withdrawCollateral after liquidation | No collateral left to withdraw after liquidation | UNEXPECTED_SUCCESS | `0x646f0006f9200b321bfa75d5dc2a8774b378c9450288acaa0dd1fb66a46e67a7` | 0 | Transaction succeeded but failure was expected |
| 39 | PHASE 3 | ADMIN | MockPASOracle | Recover oracle to normal price 572250000 | Restore normal pricing after crash simulation | PASS | `0xb1861f608fb9b997dd4d5cb0d00fa58b609c6743c6f6a699265213fc59ddf619` | 1543 | - |
| 40 | PHASE 3 | ADMIN | KredioLending | Claim strategy yield and inject to lending pool | External strategy yield distributed to lenders | PASS | `0x372c8f5a66dced093f461d6b54866a12e2777f306163706b6324f6c874b35fb0` | 3512 | U1 pending: 12.2655 -> 13.4984, U2 pending: 9.1992 -> 10.1238 |
| 41 | PHASE 3 | USER1 | KredioLending | Harvest Lending yield (13.4984 mUSDC pending) | USER1 pending yield becomes near zero | PASS | `0x0eb828eeac591d022a35d6cc840b80103b8ec0659885a69c14e6ff623b8c21a5` | 23039 | remaining pending=0.00 mUSDC |
| 42 | PHASE 3 | USER2 | KredioLending | Harvest Lending yield (10.1238 mUSDC pending) | USER2 pending yield becomes near zero | PASS | `0x2d4c5d47ca3a70b679b17e0959e56ba3587aa163d1865b81827e1c476233cfbd` | 23039 | remaining pending=0.00 mUSDC |
| 43 | PHASE 3 | USER1 | KredioLending | Withdraw full lending deposit (120,000.00 mUSDC) | USER1 principal withdrawn | PASS | `0x72ce0907f2ae46104984c4e79d029ee1608875ac00bd8345f7c1edfd4a3edfcd` | 0 | remaining deposit=0.00 mUSDC |
| 44 | PHASE 3 | USER2 | KredioLending | Withdraw full lending deposit (90,000.00 mUSDC) | USER2 principal withdrawn | PASS | `0x0839d85b8e54c7e23e1753b8c5b9911921dab8405dd6fd7e556bb8f709b65acb` | 0 | remaining deposit=0.00 mUSDC |
| 45 | PHASE 4 | ADMIN | KredioLending | Set lending tick back to 0 | Disable accelerated interest after simulation | PASS | `0xd44805a89e459e1685b7304f9037bcdef3203bcfcef02d2893c9b208d0061d7e` | 0 | - |
| 46 | PHASE 4 | ADMIN | KredioPASMarket | Set PAS market tick back to 0 | Disable accelerated interest after simulation | PASS | `0xe6db27344c4d82536eabd143d50ecc9b8205c8060e3cbea1487b4f3b160d162d` | 0 | - |
| 47 | PHASE 4 | ADMIN | KredioLending | Post-clean Lending (7 users) | Fresh lending state for next run | PASS | `0x5e51b18c7b4508c566ba701599a987d3f0d90de986e5c1d3688652bcc3152a16` | 0 | - |
| 48 | PHASE 4 | ADMIN | KredioPASMarket | Post-clean PASMarket (7 users) | Fresh PAS market state for next run | PASS | `0xe4988cba3e0996966c56586602cb0828e718e815d114d669f30365b56478abaa` | 0 | - |

## Post Simulation Snapshots

### Lending

- totalDeposited: 0.00 mUSDC
- totalBorrowed: 0.00 mUSDC
- investedAmount: 0.00 mUSDC
- protocolFees: 0.00 mUSDC
- utilizationRate: 0.00%

### PAS Market

- totalDeposited: 0.00 mUSDC
- totalBorrowed: 0.00 mUSDC
- protocolFees: 0.00 mUSDC
- utilizationRate: 0.00%

### Yield Pool

- totalPrincipal: 494,995.7808 mUSDC
- pendingForLending: 8.6568 mUSDC
- yieldRateBps: 100000

## Final User Balances

| Account | Address | mUSDC | PAS |
|---|---|---:|---:|
| ADMIN | 0xe37a8983570B39F305fe93D565A29F89366f3fFe | 2,808,119.854 | 16,017.3815 |
| USER1 | 0x5EF0a87f578778Fc78cbFe318D3444D71Ff638da | 1,283,781.5182 | 2,199.3163 |
| USER2 | 0x8fb792EdBbA0A3b4e83Fffe790a8F080FD9C46CE | 526,614.2196 | 1,099.3168 |
| USER3 | 0x7B8428750F29381Ef4190a0a9F8c294ac123014e | 6,524,469.1229 | 1,096.0312 |
| USER4 | 0x6bA56a179ff0C0E08B60EBe2a3f03141CEacE50F | 400,156.2469 | 777.5705 |
| USER5 | 0x105952E94C36916757785C4F7f92DAf5f1cC99ad | 1,037,258.5014 | 1,000.00 |
| USER6 | 0x863930353d628aA250fB98A4Eb2C1bAa649d5617 | 831,987.9142 | 1,999.8654 |

## Failure Classification

- PASS: Action executed and validation passed
- EXPECTED_FAIL: Revert/failure that was intentionally expected
- VERIFY_FAIL: Transaction mined but expected post-state was not reached
- FAIL: Unexpected execution failure
- UNEXPECTED_SUCCESS: Action was expected to fail but succeeded
