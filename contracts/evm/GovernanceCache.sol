// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract GovernanceCache {
    struct GovData {
        uint64 voteCount;
        uint8 maxConviction;
        uint256 cachedAt;
    }

    address public admin;
    mapping(address => GovData) public cache;

    constructor() {
        admin = msg.sender;
    }

    function setGovernanceData(
        address user,
        uint64 voteCount,
        uint8 maxConviction
    ) external {
        require(msg.sender == admin, "not admin");
        cache[user] = GovData({voteCount: voteCount, maxConviction: maxConviction, cachedAt: block.timestamp});
    }

    function getGovernanceData(
        address user
    ) external view returns (uint64, uint8, uint256) {
        GovData memory d = cache[user];
        return (d.voteCount, d.maxConviction, d.cachedAt);
    }
}
