// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import {TesseractVault} from "../src/vault/TesseractVault.sol";
import {BifrostStrategy} from "../src/vault/strategies/BifrostStrategy.sol";
import {AcalaStrategy} from "../src/vault/strategies/AcalaStrategy.sol";

address constant TESTNET_LSTDOT = address(0x456);

contract DeployVault is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        TesseractVault vault = new TesseractVault(TESTNET_LSTDOT);

        BifrostStrategy bifrost = new BifrostStrategy(address(vault), bytes32(uint256(2001)), address(0x0));
        AcalaStrategy acala = new AcalaStrategy(address(vault), bytes32(uint256(2000)), address(0x0));

        vm.stopBroadcast();
    }
}
