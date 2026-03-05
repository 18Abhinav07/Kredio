// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../evm/KredioLending.sol";
import "../evm/KredioPASMarket.sol";

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

/**
 * @notice Full redeployment script for KredioLending + KredioPASMarket.
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
 *   forge script script/Deploy.s.sol --rpc-url hub_testnet --broadcast -vvv
 */
contract Deploy is Script {
    // ── Immutable dependencies (reused across deployments) ──────────────────
    address constant GOV_CACHE = 0xe4DE7eadE2c0A65BdA6863Ad7bA22416c77F3e55;
    address constant MUSDC = 0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646;
    address constant ORACLE = 0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7;
    address constant KREDIT_AGENT = 0x8c13e6FfDF27BB51304EfFF108c9b646d148e5f3;

    // Pool liquidity seed: 20,000 mUSDC (6 decimals) per pool
    uint256 constant POOL_SEED = 20_000_000_000; // 20,000 mUSDC atoms

    function run() external {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(pk);

        // ── 1. Deploy KredioLending ────────────────────────────────────────
        KredioLending lending = new KredioLending(GOV_CACHE, MUSDC, KREDIT_AGENT);

        // ── 2. Deploy KredioPASMarket ──────────────────────────────────────
        KredioPASMarket pasMarket = new KredioPASMarket(GOV_CACHE, MUSDC, KREDIT_AGENT, ORACLE);

        // ── 3. Seed lending pool (lender deposit so totalDeposited > 0) ────
        IMintable musdc = IMintable(MUSDC);
        musdc.mint(msg.sender, POOL_SEED * 2);

        musdc.approve(address(lending), POOL_SEED);
        lending.deposit(POOL_SEED);

        // ── 4. Seed PAS market pool ────────────────────────────────────────
        musdc.approve(address(pasMarket), POOL_SEED);
        pasMarket.deposit(POOL_SEED);

        vm.stopBroadcast();

        // ── Print new addresses ────────────────────────────────────────────
        console.log("=== NEW DEPLOYMENT ADDRESSES ===");
        console.log("KredioLending:  ", address(lending));
        console.log("KredioPASMarket:", address(pasMarket));
        console.log("--- reused ---");
        console.log("MockUSDC:       ", MUSDC);
        console.log("GovernanceCache:", GOV_CACHE);
        console.log("MockPASOracle:  ", ORACLE);
        console.log("KreditAgent:    ", KREDIT_AGENT);
    }
}
