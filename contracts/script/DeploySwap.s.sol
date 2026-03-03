// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import {TesseractFactory} from "../src/swap/TesseractFactory.sol";
import {TesseractSwap} from "../src/swap/TesseractSwap.sol";

contract DeploySwap is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        TesseractFactory factory = new TesseractFactory();
        TesseractSwap swap = new TesseractSwap(address(factory));

        vm.stopBroadcast();
    }
}
