// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "forge-std/Test.sol";
import "../src/swap/TesseractSwap.sol";
import "./mocks/MockXC20.sol";

contract TesseractSwapTest is Test {
    TesseractSwap public swap;
    MockXC20 public tokenA;
    MockXC20 public tokenB;

    address public alice = address(0x1);
    address public bob = address(0x2);

    function setUp() public {
        TesseractFactory factory = new TesseractFactory();
        swap = new TesseractSwap(address(factory));
        tokenA = new MockXC20("Token A", "TKA");
        tokenB = new MockXC20("Token B", "TKB");
        
        tokenA.mint(alice, 1000 ether);
        tokenB.mint(alice, 1000 ether);
    }

    function testCreatePairAndAddLiquidity() public {
        vm.startPrank(alice);
        tokenA.approve(address(swap), 100 ether);
        tokenB.approve(address(swap), 100 ether);
        
        // Assuming swap router calls pair creation and liquidity addition
        ( , , uint256 liquidity) = swap.addLiquidity(
            address(tokenA),
            address(tokenB),
            100 ether,
            100 ether,
            90 ether, // Min amount A
            90 ether, // Min amount B
            alice,
            block.timestamp + 3600
        );
        
        assertGt(liquidity, 0, "Should receive LP tokens");
        vm.stopPrank();
    }

    function testSwapExactTokensForTokens() public {
        testCreatePairAndAddLiquidity();
        
        vm.startPrank(bob);
        tokenA.mint(bob, 10 ether);
        tokenA.approve(address(swap), 10 ether);
        
        uint256 balanceBefore = tokenB.balanceOf(bob);
        
        address[] memory path = new address[](2);
        path[0] = address(tokenA);
        path[1] = address(tokenB);

        uint256[] memory amounts = swap.swapExactTokensForTokens(
            10 ether,
            1 ether, // Min amount out (slippage protection)
            path,
            bob,
            block.timestamp + 3600
        );
        
        uint256 balanceAfter = tokenB.balanceOf(bob);
        assertEq(balanceAfter - balanceBefore, amounts[1], "Should receive correct token amount");
        vm.stopPrank();
    }

    function testSwapRevertsOnExpiredDeadline() public {
        testCreatePairAndAddLiquidity();
        
        vm.startPrank(bob);
        tokenA.mint(bob, 10 ether);
        tokenA.approve(address(swap), 10 ether);
        
        address[] memory path = new address[](2);
        path[0] = address(tokenA);
        path[1] = address(tokenB);

        vm.expectRevert("TesseractSwap: EXPIRED");
        swap.swapExactTokensForTokens(
            10 ether,
            1 ether,
            path,
            bob,
            block.timestamp - 1 // Deadline in past
        );
        vm.stopPrank();
    }
}
