// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ReentrancyGuard} from "openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {IStakingPrecompile, STAKING_PRECOMPILE} from "../interfaces/IStakingPrecompile.sol";
import {LstDOT} from "./LstDOT.sol";

contract TesseractStake is ReentrancyGuard {
    IERC20 public immutable dotToken;
    LstDOT public immutable lstDOT;
    IStakingPrecompile public immutable stakingPrecompile;

    uint256 public totalStakedDOT;
    uint256 public accumulatedRewards;

    event Staked(address indexed user, uint256 dotAmount, uint256 lstDOTAmount);
    event Unstaked(address indexed user, uint256 lstDOTAmount, uint256 dotAmount);
    event RewardsUpdated(uint256 newRewards, uint256 totalAccumulated);

    constructor(address _dotTokenAddress) {
        dotToken = IERC20(_dotTokenAddress);
        lstDOT = new LstDOT(address(this));
        stakingPrecompile = IStakingPrecompile(STAKING_PRECOMPILE);
    }

    function exchangeRate() public view returns (uint256) {
        uint256 totalLst = lstDOT.totalSupply();
        if (totalLst == 0) return 1e18; // 1:1 ratio initially
        return ((totalStakedDOT + accumulatedRewards) * 1e18) / totalLst;
    }

    function stake(uint256 dotAmount) external nonReentrant returns (uint256 lstDOTAmount) {
        require(dotAmount > 0, "TesseractStake: INVALID_AMOUNT");

        // Calculate amount to mint based on current exchange rate
        uint256 rate = exchangeRate();
        lstDOTAmount = (dotAmount * 1e18) / rate;

        // Transfer DOT from user
        dotToken.transferFrom(msg.sender, address(this), dotAmount);

        // Required approvals for precompile, skipping in POC assuming precompile can hook into balance
        // Stake via precompile
        require(stakingPrecompile.stake(dotAmount), "TesseractStake: STAKE_FAILED");

        totalStakedDOT += dotAmount;
        lstDOT.mint(msg.sender, lstDOTAmount);

        emit Staked(msg.sender, dotAmount, lstDOTAmount);
    }

    function unstake(uint256 lstDOTAmount) external nonReentrant returns (uint256 dotAmount) {
        require(lstDOTAmount > 0, "TesseractStake: INVALID_AMOUNT");

        uint256 rate = exchangeRate();
        dotAmount = (lstDOTAmount * rate) / 1e18;

        require(totalStakedDOT >= dotAmount, "TesseractStake: INSUFFICIENT_LIQUIDITY");

        // Burn user's lstDOT
        lstDOT.burnFrom(msg.sender, lstDOTAmount);

        // Unstake via precompile
        require(stakingPrecompile.unstake(dotAmount), "TesseractStake: UNSTAKE_FAILED");
        totalStakedDOT -= dotAmount;

        // Note: Real unstaking has a ~28-day unbonding period on Polkadot.
        // For hackathon MVP/POC, we assume immediate withdrawal.
        uint256 withdrawn = stakingPrecompile.withdraw();
        require(withdrawn >= dotAmount, "TesseractStake: WITHDRAW_FAILED");

        dotToken.transfer(msg.sender, dotAmount);

        emit Unstaked(msg.sender, lstDOTAmount, dotAmount);
    }

    function updateRewards() external {
        uint256 newRewards = stakingPrecompile.getRewards(address(this));
        if (newRewards > 0) {
            accumulatedRewards += newRewards;
            emit RewardsUpdated(newRewards, accumulatedRewards);
        }
    }
}
