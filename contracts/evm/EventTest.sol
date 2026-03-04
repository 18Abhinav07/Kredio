// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EventTest {
    event AgentScoreComputed(address indexed wallet, uint8 totalScore, string tier, string reasoning);

    function emitTestScore(
        address wallet
    ) external {
        emit AgentScoreComputed(wallet, 76, "GOLD", "Zero slash events. 7 governance votes. Nonce: 187. Tier: GOLD.");
    }
}
