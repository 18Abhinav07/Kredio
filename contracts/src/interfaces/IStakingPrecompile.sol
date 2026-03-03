// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

address constant STAKING_PRECOMPILE = 0x0000000000000000000000000000000000000800;

interface IStakingPrecompile {
    function stake(uint256 amount) external returns (bool);
    function unstake(uint256 amount) external returns (bool);
    function withdraw() external returns (uint256);
    function getRewards(address account) external returns (uint256);
}
