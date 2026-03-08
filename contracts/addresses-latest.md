# Latest Deployment Addresses (Polkadot EVM Testnet)

- Network RPC: https://eth-rpc-testnet.polkadot.io/
- **KredioLending (v7 — adminHardReset fix + clean deploy): 0x1eDaD1271FB9d1296939C6f4Fb762752b041C64E**
- **KredioPASMarket (v6 — full admin batch functions, clean deploy): 0x0F90Fe6141AC29a6031C3ae2155749e9f38a0174**
- **KredioXCMSettler (v1): 0xbaaE8f7b97ac387DE8C433A218d63166Ce104Bb1**
- **KredioAccountRegistry (v1): 0xBf7ac0e6f0024ED0F2Cf2efb3669E7c389258BFf**
- MockYieldPool (v1 — reused, wired to new KredioLending): 0x1dB4Faad3081aAfe26eC0ef6886F04f28D944AAB
- Mock USDC: 0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646
- KreditAgent: 0x8c13E6fFDf27bB51304Efff108C9B646d148E5F3
- GovernanceCache: 0xe4DE7eadE2c0A65BdA6863Ad7bA22416c77F3e55
- MockPASOracle: 0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7
- KredioSwap (v1): 0xaF1d183F4550500Beb517A3249780290A88E6e39

Deploy date: 2026-03-09 (full redeployment — clean state, all contracts at parity with source)

Changes from previous deployment:
- KredioLending v7: new deploy with adminHardReset fix (investedAmount now zeroed on reset)
- KredioPASMarket v6: new deploy — source now matches deployed bytecode (all admin batch functions present)
- KredioXCMSettler + KredioAccountRegistry: now deployed (were PENDING)
- Deploy.s.sol: updated to use ADMIN env var (was PRIVATE_KEY), deploy MockYieldPool, wire yield pool, seed 500k/300k
- MockYieldPool: reused existing; wired to new KredioLending via adminSetYieldPool post-deploy
- KredioLending seeded with 500 000 mUSDC; KredioPASMarket seeded with 300 000 mUSDC

Previous deployments:
- KredioLending (v6 — Intelligent Yield Strategy): 0xea6075702F8BCbb11Af4A48E2647EfDfaEFBa611
- KredioPASMarket (v5 — new credit score, stale deploy): 0x05d9B20573A6C7500d8b320902B473e1A442dbA5
- KredioPASMarket (v5 old — missing batch admin functions): 0x879F48C0f1982F6Bb7932ed651f278e47c261E03
- KredioPASMarket (v3 — withdraw fix): 0xE748Afa4c5e5bDD3c31c779759Baf294dFb7f95E
- KredioLending (v3): 0x717A1e2967af17CbE92abd70072aCe823a9B22B4

Accounts:
- ADMIN: 0xe37a8983570B39F305fe93D565A29F89366f3fFe

- Network RPC: https://eth-rpc-testnet.polkadot.io/
- **KredioLending (v6 — Intelligent Yield Strategy): 0xea6075702F8BCbb11Af4A48E2647EfDfaEFBa611**
- **MockYieldPool (v1 — 6% APY, 2026-03-08): 0x1dB4Faad3081aAfe26eC0ef6886F04f28D944AAB**
- **KredioPASMarket (v5 — new credit score): 0x879F48C0f1982F6Bb7932ed651f278e47c261E03**
- **KredioXCMSettler (v1 — Phase 3 foundation): PENDING DEPLOY**
- **KredioAccountRegistry (v1 — Phase 3 foundation): PENDING DEPLOY**
- Mock USDC: 0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646
- KreditAgent: 0x8c13E6fFDf27bB51304Efff108C9B646d148E5F3
- GovernanceCache: 0xe4DE7eadE2c0A65BdA6863Ad7bA22416c77F3e55 (retained, not used by scoring)
- MockPASOracle: 0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7
- KredioSwap (v1): 0xaF1d183F4550500Beb517A3249780290A88E6e39

Credit score system (v5):
- Score inputs: repayments + liquidations + totalDepositedEver + firstSeenBlock
- Components: Repayment History (55pts) + Lending Volume (35pts) + Account Age (10pts)
- Tiers: ANON(0-14) / BRONZE(15-29) / SILVER(30-49) / GOLD(50-64) / PLATINUM(65-79) / DIAMOND(80-100)

Previous deployments:
- KredioLending (v3): 0x717A1e2967af17CbE92abd70072aCe823a9B22B4
- KredioPASMarket (v3 — withdraw fix): 0xE748Afa4c5e5bDD3c31c779759Baf294dFb7f95E
- KredioPASMarket (v2 — repay fix): 0xEB07B0A98b974552E79055C00d92dA04affEef71
- KredioPASMarket (v1 — DEPRECATED): 0x079028376Dbb513C7240077b111E21045dc34770
- KredioPASMarket (v3 — withdraw fix, tx 0x567730d88e21373ce15c32f9ab35a818eb5d138c70d427e378406673f3acb4b4): 0xE748Afa4c5e5bDD3c31c779759Baf294dFb7f95E
- KredioSwap (v1, tx 0x729a0ed9dcdd72f0bc8cf391f407b2513bde627a99667741ec20dea011d68ada): 0xaF1d183F4550500Beb517A3249780290A88E6e39

Accounts used in testing
- ADMIN: 0xe37a8983570B39F305fe93D565A29F89366f3fFe
- USER2: 0x105952E94C36916757785C4F7f92DAf5f1cC99ad
- USER3: 0x863930353d628aA250fB98A4Eb2C1bAa649d5617

Notes
- Pool seeded with 20,000,000,000 USDC liquidity; totalBorrowed=0 after demo liquidation.
- Demo-mode liquidation executed with 1000x rate multiplier (borrow 823,000,000 vs 1,000,000,000 collateral); liquidated by USER2 once health < collateralRatioBps.
- KredioSwap reserve seeded via `fundReserve(100000000000)`; `reserveBalance()` = 100000000000.
- KredioSwap `quoteSwap(1e18)` at current oracle price returns 5020693 mUSDC units.

FINAL-SIGNOFF (Phase 1 + 2)
- Date: 2026-03-05
- Status: CLOSED ✅
- Tier 1A Full borrower journey: ✅
- Tier 1B Full liquidation journey: ✅
- Tier 1C Shared scoring input path (GovernanceCache → both markets): ✅
- Tier 1D GovernanceCache feeds both markets: ✅
- Tier 2A Pool accounting (corrected invariant): ✅
- Tier 2B Interest split formula: ✅
- Tier 2C Liquidation seize amount formula: ✅
- Tier 3A Position isolation: ✅
- Tier 3B Liquidity isolation: ✅
- Tier 3C Liquidation isolation: ✅
- Tier 4A Feeder advance reflected on-chain: ✅
- Tier 4B Crash → liquidation → recover cycle: ✅
- Tier 4C DEMO vs REAL price parity: ✅
- Tier 5 Access control + pause semantics: ✅
- KredioPASMarket smoke checklist: 40/40 ✅
- KredioLending smoke liveness check: ✅ (`getPositionFull` shows active borrow path live)
