// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract StorageTest {
    struct Position {
        uint256 collateral;
        uint256 debt;
        uint256 openedAt;
        uint8 tier;
    }

    mapping(address => Position) public positions;
    mapping(address => uint256) public repaymentCount;
    mapping(address => bool) public hasDefaulted;

    function openPosition(
        uint256 collateral,
        uint256 debt,
        uint8 tier
    ) external {
        positions[msg.sender] = Position({collateral: collateral, debt: debt, openedAt: block.timestamp, tier: tier});
    }

    function incrementRepayment() external {
        repaymentCount[msg.sender]++;
    }

    function flagDefault() external {
        hasDefaulted[msg.sender] = true;
    }

    function getPosition(
        address user
    ) external view returns (uint256, uint256, uint256, uint8) {
        Position memory p = positions[user];
        return (p.collateral, p.debt, p.openedAt, p.tier);
    }
}
