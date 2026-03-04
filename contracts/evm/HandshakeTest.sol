// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Minimal SCALE-call shim for the ink!/PolkaVM agent.
contract HandshakeTest {
    address public agent;

    constructor(
        address _agent
    ) {
        agent = _agent;
    }

    function testCall(
        uint64 slashCount,
        uint64 voteCount
    ) external view returns (uint64) {
        // Compose call data: [selector (4 bytes)] [slashCount LE] [voteCount LE]
        bytes4 selector = 0x7f664409; // score
        bytes memory payload = new bytes(4 + 8 + 8);
        payload[0] = selector[0];
        payload[1] = selector[1];
        payload[2] = selector[2];
        payload[3] = selector[3];
        _writeLE8(payload, 4, slashCount);
        _writeLE8(payload, 12, voteCount);

        (bool ok, bytes memory out) = agent.staticcall(payload);
        require(ok, "agent call failed");
        require(out.length >= 9 && out[0] == 0x00, "agent returned error");
        return _readLE8(out, 1);
    }

    function _writeLE8(
        bytes memory buf,
        uint256 offset,
        uint64 v
    ) private pure {
        for (uint256 i = 0; i < 8; i++) {
            buf[offset + i] = bytes1(uint8(v >> (8 * i)));
        }
    }

    function _readLE8(
        bytes memory buf,
        uint256 offset
    ) private pure returns (uint64 res) {
        for (uint256 i = 0; i < 8; i++) {
            res |= uint64(uint8(buf[offset + i])) << (8 * i);
        }
    }
}
