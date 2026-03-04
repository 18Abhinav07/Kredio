// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Multi-call SCALE shim targeting the ink!/PolkaVM agent.
contract MultiCallTest {
    address public agent;

    constructor(
        address _agent
    ) {
        agent = _agent;
    }

    // Calls score(slash_count, vote_count)
    function getScore(
        uint64 slashCount,
        uint64 voteCount
    ) external returns (uint64) {
        bytes4 selector = 0x7f664409; // score
        return _callAgent2(selector, slashCount, voteCount);
    }

    // Calls collateral_ratio(score)
    function getRatio(
        uint64 score
    ) external returns (uint64) {
        bytes4 selector = 0xa70eec89; // collateral_ratio
        return _callAgent1(selector, score);
    }

    function _callAgent2(
        bytes4 sel,
        uint64 a,
        uint64 b
    ) internal returns (uint64) {
        bytes memory data = abi.encodePacked(sel, _le64(a), _le64(b));
        (bool ok, bytes memory res) = agent.call(data);
        require(ok && res.length >= 9 && res[0] == 0x00, "agent call failed");
        return _fromLE64(res, 1);
    }

    function _callAgent1(
        bytes4 sel,
        uint64 a
    ) internal returns (uint64) {
        bytes memory data = abi.encodePacked(sel, _le64(a));
        (bool ok, bytes memory res) = agent.call(data);
        require(ok && res.length >= 9 && res[0] == 0x00, "agent call failed");
        return _fromLE64(res, 1);
    }

    function _le64(
        uint64 v
    ) internal pure returns (bytes8) {
        return bytes8(
            ((v & 0xFF) << 56) | (((v >> 8) & 0xFF) << 48) | (((v >> 16) & 0xFF) << 40) | (((v >> 24) & 0xFF) << 32)
                | (((v >> 32) & 0xFF) << 24) | (((v >> 40) & 0xFF) << 16) | (((v >> 48) & 0xFF) << 8)
                | ((v >> 56) & 0xFF)
        );
    }

    function _fromLE64(
        bytes memory b,
        uint256 o
    ) internal pure returns (uint64 v) {
        for (uint256 i = 0; i < 8; i++) {
            v |= uint64(uint8(b[o + i])) << (i * 8);
        }
    }
}
