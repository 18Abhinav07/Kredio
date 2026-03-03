// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IStakingPrecompile} from "../../src/interfaces/IStakingPrecompile.sol";
import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract MockStaking is IStakingPrecompile {
    IERC20 public immutable dotToken;
    
    mapping(address => uint256) public stakedBalances;
    mapping(address => uint256) public pendingRewards;

    constructor(address _dotToken) {
        dotToken = IERC20(_dotToken);
    }

    function stake(uint256 amount) external override returns (bool) {
        stakedBalances[msg.sender] += amount;
        return true;
    }

    function unstake(uint256 amount) external override returns (bool) {
        require(stakedBalances[msg.sender] >= amount, "MockStaking: INSUFFICIENT_STAKE");
        stakedBalances[msg.sender] -= amount;
        return true;
    }

    function withdraw() external view override returns (uint256) {
        // Return full balance available to address for mock simplicity.
        return dotToken.balanceOf(address(this));
    }

    function getRewards(address account) external override returns (uint256) {
        uint256 rewards = pendingRewards[account];
        pendingRewards[account] = 0;
        return rewards;
    }

    // Helper for tests to simulate reward distribution
    function addRewards(address account, uint256 amount) external {
        pendingRewards[account] += amount;
    }
}
