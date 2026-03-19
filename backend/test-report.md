# Kredio Full Test Run Report

- **Run Date:** 2026-03-19T08:50:39.754Z
- **Duration:** 843.8s

## Pre-Test Snapshots
### KredioLending
- Total Deposited: 1,100,000.00 mUSDC
- Total Borrowed: 50,000.00 mUSDC

### Users Initial
- USER1 (0x5EF0a87f578778Fc78cbFe318D3444D71Ff638da): 200,000 mUSDC, 50,000 PAS
- USER2 (0x8fb792EdBbA0A3b4e83Fffe790a8F080FD9C46CE): 200,000 mUSDC, 50,000 PAS
- USER3 (0x7B8428750F29381Ef4190a0a9F8c294ac123014e): 200,000 mUSDC, 50,000 PAS
- USER4 (0x6bA56a179ff0C0E08B60EBe2a3f03141CEacE50F): 200,000 mUSDC, 50,000 PAS
- USER5 (0x105952E94C36916757785C4F7f92DAf5f1cC99ad): 200,000 mUSDC, 50,000 PAS
- USER6 (0x863930353d628aA250fB98A4Eb2C1bAa649d5617): 200,000 mUSDC, 50,000 PAS

## Active Execution Log

| Step | Actor | Action | Params | Expected | Status | TxHash/Err |
|---|---|---|---|---|---|---|
| 1 | ADMIN | Pull back 250,000.00 mUSDC from yield pool → KredioLending | - | **Exp:** investedAmount → 0; contract USDC balance restores; YieldPool principal drops <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | FAIL | could not coalesce error |
| 2 | ADMIN | Bulk-withdraw 3 depositor(s) from KredioLending | - | **Exp:** depositBalance zeroed for all; USDC returned to depositors <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | FAIL | execution reverted: "insufficient" |
| 3 | ADMIN | Force-close all borrower positions in KredioLending | - | **Exp:** All borrow positions closed; USDC collateral returned; totalBorrowed → 0 <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0x335cef911459f450fedcbd0a82c1f750f31c39c3383bc43cf163455ebeb6b43d` |
| 4 | ADMIN | Hard-reset KredioLending (sweep all USDC dust to admin) | - | **Exp:** totalDeposited=0, totalBorrowed=0, accYieldPerShare=0, globalTick=0 <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0xc57009f38c4e6aa91041300c9d81299df6efb5fbf9b5d6713f0d6de405b89e15` |
| 5 | ADMIN | Reset credit scores for all known addresses (KredioLending) | - | **Exp:** repaymentCount/liquidationCount/totalDepositedEver = 0 for all <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | FAIL | 80A047F301000000:error:0A0003FC:SSL routines:ssl3_read_bytes:sslv3 alert bad record mac:../deps/openssl/openssl/ssl/record/rec_layer_s3.c:1605:SSL alert number 20
 |
| 6 | ADMIN | Force-close all positions in KredioPASMarket (return PAS collateral) | - | **Exp:** All PAS positions closed; PAS returned to borrowers; totalBorrowed → 0 <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0xfe6463e0523c23cc32b4ab67f4324f8ddd790a3b9e9c4b8353bc5067715739ff` |
| 7 | ADMIN | Bulk-withdraw 1 depositor(s) from KredioPASMarket | - | **Exp:** PM depositBalances zeroed; mUSDC returned <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | FAIL | execution reverted: "insufficient" |
| 8 | ADMIN | Hard-reset KredioPASMarket | - | **Exp:** PM totalDeposited=0, totalBorrowed=0, accYieldPerShare=0 <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | FAIL | could not coalesce error |
| 9 | ADMIN | Reset credit scores for all known addresses (KredioPASMarket) | - | **Exp:** PM credit scores cleared <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0x5b93060fbc63e5c50b62b476fa7d12c026c7ceddf8bb2563483bbddb54d6c47d` |
| 10 | ADMIN | Set yield pool rate to 100 000 bps (1 000% APY) | - | **Exp:** yieldRateBps = 100 000; yield accrues rapidly for demo <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0xcf643c9daf33a68873c0d1e31f8d6f1b75df7ffaca88bca0a81a328c67f22b29` |
| 11 | ADMIN | Set KredioLending globalTick = 86400 (1 s = 1 day interest) | tickMultiplier=86400 | **Exp:** globalTick = 86400 <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0xcf66fc350fa34c8e6609ebb5dbec99e94215074a95e6890786e82fb0b5762829` |
| 12 | ADMIN | Set KredioPASMarket globalTick = 86400 | tickMultiplier=86400 | **Exp:** globalTick = 86400 <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0x58473e689096c09ccd3fa358ad850eb15b901fc138974dd0adbcaa847ba22219` |
| 13 | ADMIN | Wire MockYieldPool to KredioLending | - | **Exp:** yieldPool set; lending can now invest/pull/claim <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0xa4d4145434cdcd2ca87242e249ba312eea8df7aad695cf8351a5b9423468313e` |
| 14 | ADMIN | Set KredioPASMarket risk params (stalenessLimit=86400, others unchanged) | - | **Exp:** stalenessLimit = 86400 s (24 h); ltvBps=6500, liqBonusBps=800, protocolFeeBps=1000 <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0x6367847b1d7e417f6ffed5ab4ff4c6f8270211124b222ec15952a96a9509808b` |
| 15 | ADMIN | Refresh oracle price to 562440000 (reset updatedAt) | - | **Exp:** oracle.updatedAt = now; staleness check will pass for 86400 s <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0xaf696a5198a0a3705addb61282cab9d0174410174e3978af1d7449a9641d076d` |
| 16 | ADMIN | Approve MaxUint256 mUSDC to KredioLending | - | **Exp:** Admin can deposit + fundReserve without re-approving <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | FAIL | could not coalesce error |
| 17 | ADMIN | Approve MaxUint256 mUSDC to KredioPASMarket | - | **Exp:** Admin can deposit + liquidate without re-approving <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0x720f6d7b3964a2b4383477052bf2d564692f382b92c6ec09316336ff398af832` |
| 18 | ADMIN | Deposit 500 000 mUSDC into KredioLending (admin liquidity base) | - | **Exp:** KredioLending.totalDeposited = 500 000; admin is a lender <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | FAIL | could not coalesce error |
| 19 | ADMIN | Deposit 300 000 mUSDC into KredioPASMarket (admin liquidity base) | - | **Exp:** KredioPASMarket.totalDeposited = 300 000 <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0x32d3c12241483bc0a1e217e86a9f0005f88197bb71618706617765da1522c867` |
| 20 | USER1 | Approve 50 000 mUSDC to KredioLending | MAX or exact amount | **Exp:** Allowance set <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0x94fdcd41da57c388146a7b25a16affaab5de567b6337670c63adb5d9ac3ceb1f` |
| 21 | USER1 | Deposit 50 000 mUSDC into KredioLending | - | **Exp:** depositBalance[USER1] += 50 000; KredioLending.totalDeposited += 50 000 <br> **Obs. Before:** {depositBalance:0,totalDeposited:0} <br> **Obs. After:** {depositBalance:100000000000,totalDeposited:100000000000} | PASS | `0xda98a461b9bc0fe85f72bc29cb364508b0e55676ff7a5a1472b6c80b47b2063e` |
| 22 | USER3 | Approve 80 000 mUSDC to KredioPASMarket | MAX or exact amount | **Exp:** Allowance set <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0xf77465dfb7b97c3093a8d35ead4c8a00106502fbea1ab66d49df0f3dfebe780a` |
| 23 | USER3 | Deposit 80 000 mUSDC into KredioPASMarket | - | **Exp:** PM depositBalance[USER3] += 80 000; PM totalDeposited += 80 000 <br> **Obs. Before:** {depositBalance:0,totalDeposited:600000000000} <br> **Obs. After:** N/A | FAIL | could not coalesce error |
| 24 | USER2 | Approve 20 000 mUSDC to KredioLending (collateral) | MAX or exact amount | **Exp:** Allowance set <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0xce720bffdcb02695528a6d3607c60b589d845a47ad8589a09df17173b697596b` |
| 25 | USER2 | Deposit 20 000 mUSDC as USDC collateral into KredioLending | - | **Exp:** collateralBalance[USER2] += 20 000 <br> **Obs. Before:** {collateralBalance:0} <br> **Obs. After:** {collateralBalance:100000000000} | PASS | `0x685d1990223c4173f0b4453048579ebebb33ca89e2e3606ad4c15b459a8c51c9` |
| 26 | USER2 | Borrow 51,779.9353 mUSDC from KredioLending (credit-score gated) | borrowAmount=51,779.9353 | **Exp:** Position opened: debt=51,779.9353, collateral=100 000; totalBorrowed += 51,779.9353 <br> **Obs. Before:** {totalBorrowed:0,mUSDCBal:447990276809} <br> **Obs. After:** {totalBorrowed:51779935274,mUSDCBal:499770212083} | PASS | `0xbb6c69d352944dce04b20679fd32a45017bb2a23713b16db68863cacdce02e77` |
| 27 | USER4 | depositCollateral - lock 300 PAS in KredioPASMarket | - | **Exp:** collateralBalance[USER4] += 300 PAS (wei) <br> **Obs. Before:** {collateralBalance:0} <br> **Obs. After:** {collateralBalance:800000000000000000000} | PASS | `0x82e31b5fb4913f38c089cddd908bbc8e035bb8c30d91f6f6ca21228c301288d3` |
| 28 | USER4 | Borrow 2,047.2816 mUSDC from KredioPASMarket (PAS-collateral gated) | - | **Exp:** Position opened; USER4 receives 2,047.2816 mUSDC; PM totalBorrowed += 2,047.2816 <br> **Obs. Before:** {totalBorrowed:0,mUSDCBal:399366608339} <br> **Obs. After:** {totalBorrowed:2047281600,mUSDCBal:401413889939} | PASS | `0x941330191fdbbab4c36d5b8e07732cc9dbfe38957e62391236ebe75560345e08` |
| 29 | USER5 | depositCollateral - lock 400 PAS in KredioPASMarket | - | **Exp:** collateralBalance[USER5] += 400 PAS <br> **Obs. Before:** {collateralBalance:0} <br> **Obs. After:** {collateralBalance:900000000000000000000} | PASS | `0x3479364bb4f9f6a105868160ad2614c7d17996f62d5c2633a560e6f0414bbf99` |
| 30 | USER5 | Borrow 3,125.7603 mUSDC at 95% LTV (near liquidation) | - | **Exp:** Position opened at 95% LTV; interest accrual will breach health threshold <br> **Obs. Before:** {totalBorrowed:2047281600} <br> **Obs. After:** {totalBorrowed:5173041900} | PASS | `0x74aafb5cf9eea91e02e4733d8ce57831709e3dc581f628772540de4aaf201d0d` |
| 31 | ADMIN | adminTickPool for USER2 in KredioLending | - | **Exp:** USER2 interest capitalised into debt; accYieldPerShare++ for all lenders <br> **Obs. Before:** {accruedInterest:1872589440,pendingUser1:0} <br> **Obs. After:** N/A | FAIL | could not coalesce error |
| 32 | ADMIN | adminTickPool for USER4 + USER5 in KredioPASMarket | - | **Exp:** USER4/USER5 interest capitalised; accYieldPerShare++ for PM lenders <br> **Obs. Before:** {u3Pending:0} <br> **Obs. After:** {u3Pending:0,adminPending:253807226} | PASS | `0xce0c09c425975d9bb7fa4525f6177ad4096d32d3c7667a3121ae7ae92928ff0b` |
| 33 | ADMIN | adminLiquidate USER5 (totalOwed≈3,308.5885 mUSDC, seize PAS + bonus) | - | **Exp:** USER5 position deleted; admin pays 3,308.5885 mUSDC; admin receives ~400 PAS (with bonus); interest distributed to PM lenders <br> **Obs. Before:** {active:true,lenderYieldBefore:0,adminPASBefore:15537850524577737353848} <br> **Obs. After:** {active:false,lenderYieldAfter:0,adminPASAfter:16226487891192350237449} | PASS | `0x0ef01f91d22bde2cc9faddd201a012e8b262f7cd3007eeb811cafec080aef432` |
| 34 | ADMIN | adminClaimAndInjectYield - mint 45.6621 mUSDC yield → distribute to lenders | - | **Exp:** MockYieldPool mints fresh mUSDC to KredioLending; accYieldPerShare增加; USER1+ADMIN earn pro-rata yield <br> **Obs. Before:** {pendingUser1:0,pendingAdmin:0,totalEarned:14106116076} <br> **Obs. After:** {pendingUser1:44520548,pendingAdmin:0} | PASS | `0xa845b439948420864ead3f3fe921f574bf0581cef36b0747a9963bcb00862623` |
| 35 | USER1 | Harvest 44.5205 mUSDC yield from KredioLending | harvestAmount=44.5205 | **Exp:** USER1.mUSDC += 44.5205; pendingYield[USER1] → 0 <br> **Obs. Before:** {mUSDCBal:1171500356653,pendingYield:44520548} <br> **Obs. After:** {mUSDCBal:1171544877201,pendingYield:0} | PASS | `0xe054793fd2cbff10f982ca1d4b20ce03176474413922ca646135bc82e6d5f9b0` |
| 36 | USER3 | Harvest 0.00 mUSDC yield from KredioPASMarket | harvestAmount=0.00 | **Exp:** USER3.mUSDC += 0.00; pendingYield[USER3] → 0 <br> **Obs. Before:** {mUSDCBal:6525164497492,pendingYield:0} <br> **Obs. After:** N/A | FAIL | could not coalesce error |
| 37 | USER2 | Approve 66,517.4004 mUSDC to KredioLending for repayment | - | **Exp:** Allowance ≥ totalOwed <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0xebc6170810efb65ee8a10951788932c52a0c071413fda6645d7a5d3ff27bdb16` |
| 38 | USER2 | repay() - pay 61,517.4004 mUSDC (principal + interest) | principal=51,779.9353, interest=9,737.4651 | **Exp:** Position deleted; collateral 100 000 mUSDC returned to USER2; interest distributed to lenders; repaymentCount[USER2]++ <br> **Obs. Before:** {active:true,totalBorrowed:51779935274,mUSDCBal:499770212083} <br> **Obs. After:** {active:false,totalBorrowed:0,mUSDCBal:537503775945} | PASS | `0x48cc0441c76bbffa817278e0006cdbbd92c6928032897cc0ca4d3be0251302db` |
| 39 | USER4 | Approve 2,506.9439 mUSDC to KredioPASMarket | MAX or exact amount | **Exp:** Allowance set <br> **Obs. Before:** N/A <br> **Obs. After:** N/A | PASS | `0x94f7b1869d5e9c060c532bae53fd7dcfe95eb18e1c7101808bf557d6a98b1cf8` |
| 40 | USER4 | repay() - pay 2,456.9439 mUSDC (principal + interest) | principal=2,106.5125, interest=350.4313 | **Exp:** Position inactive; totalBorrowed decreases; interest to PM lenders; repaymentCount[USER4]++ <br> **Obs. Before:** {totalBorrowed:2106512541,mUSDCBal:401413889939} <br> **Obs. After:** {totalBorrowed:0,mUSDCBal:398926473761} | PASS | `0x46025d0f1b63be7a82dbba22efbe92d4cddefe10919794f0d7940c09442ea06f` |
| 41 | USER4 | withdrawCollateral() - retrieve 300 PAS from KredioPASMarket | - | **Exp:** USER4 receives 300 PAS; collateralBalance[USER4] → 0 <br> **Obs. Before:** {pasBal:299774801915400000000} <br> **Obs. After:** {pasBal:1099793839483000000000} | PASS | `0x44e19b69bf926e717bc4e5e31035e0f0debeef28fe1d041ae06030b4477af48a` |
| 42 | USER1 | withdraw(100,000.00) - full withdrawal from KredioLending | - | **Exp:** USER1 gets deposit back (auto-pulls from yield pool if needed) + any remaining yield; totalDeposited decreases <br> **Obs. Before:** {depositBalance:100000000000,lendingUSDC:110491447591,user1USDC:1171544877201} <br> **Obs. After:** {depositBalance:0,lendingUSDC:1053596813,user1USDC:1280982727979} | PASS | `0x263e6b6e808a8e274226216f2381017f121a770d6ffa5ee199f3f9ebd473a828` |

## Post-Test Snapshots
### KredioLending (Final)
- Total Deposited: 0.00 mUSDC
- Total Borrowed: 0.00 mUSDC
- Protocol Fees: 1,053.5968 mUSDC

### Mock Yield Pool (Final)
- Total Principal: 494,995.7808 mUSDC
- Pending Yield: 16.172 mUSDC
