// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IXcm} from "../../src/interfaces/IXCM.sol";

contract MockXCM is IXcm {
    event XCMSent(bytes destination, bytes message);
    event XCMExecuted(bytes message, Weight weight);

    function send(bytes calldata destination, bytes calldata message) external override {
        emit XCMSent(destination, message);
    }

    function execute(bytes calldata message, Weight calldata weight) external override {
        emit XCMExecuted(message, weight);
    }

    function weighMessage(bytes calldata /*message*/) external pure override returns (Weight memory) {
        return Weight(1000, 1000);
    }
}
