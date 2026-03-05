# Latest Deployment Addresses (Polkadot EVM Testnet)

- Network RPC: https://eth-rpc-testnet.polkadot.io/
- **KredioLending (v4 — adminForceClose): 0xcf18DC673511885e2FC4aEafEc734bC408A9bA9A**
- **KredioPASMarket (v4 — adminForceClose): 0x6345aE4ff56F3b74c32221180afbF710371Deed5**
- Mock USDC: 0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646
- KreditAgent: 0x8c13E6fFDf27bB51304Efff108C9B646d148E5F3
- GovernanceCache: 0xe4DE7eadE2c0A65BdA6863Ad7bA22416c77F3e55
- MockPASOracle: 0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7
- KredioSwap (v1): 0xaF1d183F4550500Beb517A3249780290A88E6e39

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
