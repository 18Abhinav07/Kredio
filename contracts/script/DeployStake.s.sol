// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import {TesseractStake} from "../src/stake/TesseractStake.sol";
import {LstDOT} from "../src/stake/LstDOT.sol";
// Use a placeholder DOT address for testnet
address constant TESTNET_DOT = address(0x123);

contract DeployStake is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        TesseractStake stake = new TesseractStake(TESTNET_DOT);

        vm.stopBroadcast();
    }
}
