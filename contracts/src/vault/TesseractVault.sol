// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC4626} from "openzeppelin-contracts/contracts/token/ERC20/extensions/ERC4626.sol";
import {ERC20} from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {IXcm, XCM_PRECOMPILE} from "../interfaces/IXCM.sol";

contract TesseractVault is ERC4626 {
    struct Strategy {
        bytes32 parachainId;
        address protocolAddress;
        uint256 allocatedAmount;
        uint256 targetAllocation;
        uint256 lastAPY;
        bool active;
    }

    IERC20 public immutable lstDOT;
    IXcm public immutable xcmPrecompile;

    mapping(bytes32 => Strategy) public strategies;
    bytes32[] public activeStrategies;

    constructor(address _lstDOT) ERC4626(IERC20(_lstDOT)) ERC20("Tesseract Vault", "tvLSTDOT") {
        lstDOT = IERC20(_lstDOT);
        xcmPrecompile = IXcm(XCM_PRECOMPILE);
    }

    function totalAssets() public view override returns (uint256) {
        uint256 total = lstDOT.balanceOf(address(this)); // Idle balance

        // Add allocated amounts across all active strategies
        for (uint256 i = 0; i < activeStrategies.length; i++) {
            total += strategies[activeStrategies[i]].allocatedAmount;
        }

        return total;
    }
}
