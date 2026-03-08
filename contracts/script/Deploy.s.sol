// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../evm/KredioLending.sol";
import "../evm/KredioPASMarket.sol";
import "../evm/KredioXCMSettler.sol";
import "../evm/KredioAccountRegistry.sol";
import "../evm/MockYieldPool.sol";

interface IMintable {
    function mint(
        address to,
        uint256 amount
    ) external;
    function approve(
        address spender,
        uint256 amount
    ) external returns (bool);
    function balanceOf(
        address user
    ) external view returns (uint256);
}

interface IMockOracle {
    function setPrice(
        int256 price
    ) external;
    function latestRoundData() external view returns (uint80, int256, uint256, uint256, uint80);
}

/**
 * @notice Full redeployment script for Kredio Protocol core contracts.
 *
 * Reuses:
 *   - MockUSDC          0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646
 *   - GovernanceCache   0xe4de7eade2c0a65bda6863ad7ba22416c77f3e55
 *   - MockPASOracle     0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7
 *   - KreditAgent       0x8c13E6fFDf27bB51304Efff108C9B646d148E5F3
 *   - KredioSwap        0xaF1d183F4550500Beb517A3249780290A88E6e39
 *
 * Run:
 *   cd contracts
 *   source .env && forge script script/Deploy.s.sol \
 *     --rpc-url $PASSET_RPC --broadcast --private-key $ADMIN -vvv
 */
contract Deploy is Script {
    // ── Immutable dependencies (reused across deployments) ──────────────────
    address constant GOV_CACHE = 0xe4DE7eadE2c0A65BdA6863Ad7bA22416c77F3e55;
    address constant MUSDC = 0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646;
    address constant ORACLE = 0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7;
    address constant KREDIT_AGENT = 0x8c13e6FfDF27BB51304EfFF108c9b646d148e5f3;
    address constant KREDIT_SWAP = 0xaF1d183F4550500Beb517A3249780290A88E6e39;

    // SR25519 precompile address on Asset Hub EVM (address(0) = attested-only mode)
    address constant SR25519_PRECOMPILE = address(0);

    // Liquidity seeds (6 decimals).  Admin needs 800_000 mUSDC to cover both pools.
    uint256 constant SEED_LENDING = 500_000_000_000; // 500 000 mUSDC
    uint256 constant SEED_MARKET = 300_000_000_000; // 300 000 mUSDC
    uint256 constant MINT_TOTAL = SEED_LENDING + SEED_MARKET; // 800 000 mUSDC

    // MockYieldPool initial APY: 6 bps (0.06% APY on first deploy; test script sets 100 000)
    uint256 constant YIELD_RATE_INITIAL = 600; // 6% APY in bps

    function run() external {
        uint256 pk = vm.envUint("ADMIN");
        address deployer = vm.addr(pk);
        vm.startBroadcast(pk);

        IMintable musdc = IMintable(MUSDC);

        // ── 1. Deploy MockYieldPool ────────────────────────────────────────
        MockYieldPool yieldPool = new MockYieldPool(MUSDC, YIELD_RATE_INITIAL);

        // ── 2. Deploy KredioLending ────────────────────────────────────────
        KredioLending lending = new KredioLending(MUSDC, KREDIT_AGENT);

        // ── 3. Wire MockYieldPool into KredioLending ──────────────────────
        lending.adminSetYieldPool(address(yieldPool));

        // ── 4. Deploy KredioPASMarket ──────────────────────────────────────
        KredioPASMarket pasMarket = new KredioPASMarket(MUSDC, KREDIT_AGENT, ORACLE);

        // ── 5. Extend PAS market staleness limit to 24 h ──────────────────
        //   default: ltvBps=6500, liqBonusBps=800, protocolFeeBps=1000;
        //   set stalenessLimit=86400 so oracle never expires during demo
        pasMarket.setRiskParams(6500, 800, 86_400, 1000);

        // ── 6. Refresh oracle price (resets updatedAt on testnet) ─────────
        try IMockOracle(ORACLE).latestRoundData() returns (uint80, int256 price, uint256, uint256, uint80) {
            IMockOracle(ORACLE).setPrice(price > 0 ? price : int256(502_069_300));
        } catch {
            IMockOracle(ORACLE).setPrice(502_069_300); // $5.02 fallback
        }

        // ── 7. Mint liquidity seed to deployer + seed both pools ──────────
        musdc.mint(deployer, MINT_TOTAL);

        musdc.approve(address(lending), SEED_LENDING);
        lending.deposit(SEED_LENDING);

        musdc.approve(address(pasMarket), SEED_MARKET);
        pasMarket.deposit(SEED_MARKET);

        // ── 8. Deploy KredioXCMSettler ────────────────────────────────────
        KredioXCMSettler xcmSettler = new KredioXCMSettler(address(pasMarket), address(lending), KREDIT_SWAP, MUSDC);

        // ── 9. Deploy KredioAccountRegistry ──────────────────────────────
        KredioAccountRegistry accountRegistry = new KredioAccountRegistry(SR25519_PRECOMPILE);

        vm.stopBroadcast();

        // ── Print new addresses ────────────────────────────────────────────
        console.log("=== NEW DEPLOYMENT ADDRESSES ===");
        console.log("MockYieldPool:          ", address(yieldPool));
        console.log("KredioLending:          ", address(lending));
        console.log("KredioPASMarket:        ", address(pasMarket));
        console.log("KredioXCMSettler:       ", address(xcmSettler));
        console.log("KredioAccountRegistry:  ", address(accountRegistry));
        console.log("--- reused ---");
        console.log("MockUSDC:               ", MUSDC);
        console.log("GovernanceCache:        ", GOV_CACHE);
        console.log("MockPASOracle:          ", ORACLE);
        console.log("KreditAgent:            ", KREDIT_AGENT);
        console.log("KredioSwap:             ", KREDIT_SWAP);
    }
}
