// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../evm/KredioLending.sol";
import "../evm/MockYieldPool.sol";

interface IMintableY {
    function mint(
        address to,
        uint256 amount
    ) external;
    function approve(
        address spender,
        uint256 amount
    ) external returns (bool);
}

/**
 * @notice Deploy the Intelligent Yield Strategy components:
 *           1. MockYieldPool  - accrues yield at a configurable APY rate
 *           2. KredioLending v6 - upgraded with strategy invest/pullback logic
 *         Wires them together and seeds the lending pool with 20,000 mUSDC.
 *
 * Reuses:
 *   MockUSDC     0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646
 *   KreditAgent  0x8c13E6fFDf27bB51304Efff108C9B646d148E5F3
 *
 * Run:
 *   cd contracts
 *   forge script script/DeployYieldStrategy.s.sol --rpc-url hub_testnet --broadcast -vvv
 *
 * After deploying:
 *   1. Update LENDING_ADDR in backend .env
 *   2. Update YIELD_POOL_ADDR in backend .env
 *   3. Set YIELD_STRATEGY_ENABLED=true in backend .env
 *   4. Update KREDIOLENDING in frontend/config/contracts.ts
 *   5. Update MOCKYIELDPOOL in frontend/config/contracts.ts
 */
contract DeployYieldStrategy is Script {
    // ── Immutable dependencies (reused) ─────────────────────────────────────
    address constant MUSDC = 0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646;
    address constant KREDIT_AGENT = 0x8c13e6FfDF27BB51304EfFF108c9b646d148e5f3;

    // ── Strategy config ──────────────────────────────────────────────────────
    // 600  bps = 6% APY  (realistic)
    // 60000 bps = 600% APY (fast demo: 1 hour ≈ ~2,700 mUSDC yield on 20k pool)
    // Change to 60000 for live demos to see yield accrue in minutes.
    uint256 constant YIELD_RATE_BPS = 600;

    // Lending pool seed: 20,000 mUSDC (6 decimals)
    uint256 constant POOL_SEED = 20_000_000_000;

    function run() external {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(pk);
        vm.startBroadcast(pk);

        // ── 1. Deploy MockYieldPool ────────────────────────────────────────
        MockYieldPool yieldPool = new MockYieldPool(MUSDC, YIELD_RATE_BPS);

        // ── 2. Deploy KredioLending v6 ────────────────────────────────────
        KredioLending lending = new KredioLending(MUSDC, KREDIT_AGENT);

        // ── 3. Wire: assign yield pool to lending ─────────────────────────
        lending.adminSetYieldPool(address(yieldPool));

        // ── 4. Seed lending pool with 20,000 mUSDC ────────────────────────
        IMintableY musdc = IMintableY(MUSDC);
        musdc.mint(deployer, POOL_SEED);
        musdc.approve(address(lending), POOL_SEED);
        lending.deposit(POOL_SEED);

        vm.stopBroadcast();

        // ── Print deployment summary ───────────────────────────────────────
        console.log("");
        console.log("=== YIELD STRATEGY DEPLOYMENT ===");
        console.log("KredioLending v6:  ", address(lending));
        console.log("MockYieldPool:     ", address(yieldPool));
        console.log("--- reused ---");
        console.log("MockUSDC:          ", MUSDC);
        console.log("KreditAgent:       ", KREDIT_AGENT);
        console.log("");
        console.log("=== NEXT STEPS ===");
        console.log("1. backend/.env  ->  LENDING_ADDR=", address(lending));
        console.log("2. backend/.env  ->  YIELD_POOL_ADDR=", address(yieldPool));
        console.log("3. backend/.env  ->  YIELD_STRATEGY_ENABLED=true");
        console.log("4. frontend/config/contracts.ts -> KREDIOLENDING=", address(lending));
        console.log("5. frontend/config/contracts.ts -> MOCKYIELDPOOL=", address(yieldPool));
        console.log("");
        console.log("To run a fast demo, set YIELD_RATE_BPS=60000 via:");
        console.log(
            "  cast send",
            address(yieldPool),
            "\"setYieldRate(uint256)\" 60000 --rpc-url hub_testnet --private-key $PRIVATE_KEY"
        );
    }
}
