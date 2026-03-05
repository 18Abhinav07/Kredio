# Latest Deployment Addresses (Polkadot EVM Testnet)

- Network RPC: https://eth-rpc-testnet.polkadot.io/
- KredioLending (v3 with demo helpers): 0x717A1e2967af17CbE92abd70072aCe823a9B22B4
- Mock USDC: 0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646
- KreditAgent: 0x8c13E6fFDf27bB51304Efff108C9B646d148E5F3
- GovernanceCache: 0xE4De7eade2C0A65bDa6863ad7BA22416c77f3e55
- MockPASOracle (initial 5.8507 PAS/USD, tx 0x7764790301ca45c156f4329ad317a6542913041e739065834a183b3dc1eddaf1): 0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7
- KredioPASMarket (v1 — DEPRECATED, tx 0x82bebb136ca546b816908f40617916b545092e7d935c11249db8536e537d15a5): 0x079028376Dbb513C7240077b111E21045dc34770
- KredioPASMarket (v2 — repay fix, tx 0x3b2e839eca6ba813a20ea836aae2463468ec0b4f0ceaad3ec5888d73289e3edb): 0xEB07B0A98b974552E79055C00d92dA04affEef71
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
