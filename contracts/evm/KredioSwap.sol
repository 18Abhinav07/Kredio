// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IPASOracleExtended {
    function latestRoundData() external view returns (uint80, int256, uint256, uint256, uint80);
    function isCrashed() external view returns (bool);
}

/// @notice Swap native PAS (msg.value) for mUSDC using oracle price.
contract KredioSwap is Ownable, ReentrancyGuard {
    IERC20 public immutable mUSDC;
    IPASOracleExtended public immutable oracle;

    uint256 public feeBps = 30; // 0.3%
    uint256 public constant MAX_FEE_BPS = 100; // 1%
    uint256 internal constant BPS_DIVISOR = 10_000;

    event Swapped(address indexed user, uint256 pasWei, uint256 mUSDCOut);
    event ReserveFunded(address indexed by, uint256 amount);

    constructor(address _mUSDC, address _oracle) Ownable(msg.sender) {
        require(_mUSDC != address(0) && _oracle != address(0), "zero addr");
        mUSDC = IERC20(_mUSDC);
        oracle = IPASOracleExtended(_oracle);
    }

    function quoteSwap(uint256 pasWei) public view returns (uint256 mUSDCOut) {
        require(pasWei > 0, "zero amount");
        require(!oracle.isCrashed(), "oracle crashed");

        (, int256 answer,,,) = oracle.latestRoundData();
        require(answer > 0, "oracle price invalid");

        // pasWei(18) * price(8) / 1e20 = mUSDC(6)
        uint256 grossOut = (pasWei * uint256(answer)) / 1e20;
        uint256 fee = (grossOut * feeBps) / BPS_DIVISOR;
        mUSDCOut = grossOut - fee;
    }

    function reserveBalance() public view returns (uint256) {
        return mUSDC.balanceOf(address(this));
    }

    function swap(uint256 minMUSDCOut) external payable nonReentrant {
        uint256 out = quoteSwap(msg.value);
        require(out >= minMUSDCOut, "slippage");
        require(reserveBalance() >= out, "reserve low");
        require(mUSDC.transfer(msg.sender, out), "transfer fail");
        emit Swapped(msg.sender, msg.value, out);
    }

    function fundReserve(uint256 amount) external onlyOwner {
        require(amount > 0, "zero amount");
        require(mUSDC.transferFrom(msg.sender, address(this), amount), "transfer fail");
        emit ReserveFunded(msg.sender, amount);
    }

    function withdrawPAS() external onlyOwner nonReentrant {
        uint256 bal = address(this).balance;
        require(bal > 0, "no pas");
        (bool ok,) = payable(msg.sender).call{value: bal}("");
        require(ok, "pas transfer fail");
    }

    function withdrawReserve(uint256 amount) external onlyOwner nonReentrant {
        require(amount > 0, "zero amount");
        require(mUSDC.transfer(msg.sender, amount), "transfer fail");
    }

    function setFee(uint256 newFeeBps) external onlyOwner {
        require(newFeeBps <= MAX_FEE_BPS, "fee too high");
        feeBps = newFeeBps;
    }
}
