// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// XC-20 assets use precompile addresses
// Address format: 0xFFFFFFFF + asset_id (32 bits)
interface IERC20Precompile {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}
