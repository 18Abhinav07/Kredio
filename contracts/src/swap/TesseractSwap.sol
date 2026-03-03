// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {TesseractFactory} from "./TesseractFactory.sol";
import {TesseractPair} from "./TesseractPair.sol";
import {ERC20} from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {IXcm, XCM_PRECOMPILE} from "../interfaces/IXCM.sol";

contract TesseractSwap {
    address public immutable factory;

    modifier ensure(uint256 deadline) {
        require(deadline >= block.timestamp, "TesseractSwap: EXPIRED");
        _;
    }

    event CrossChainSwap(address indexed sender, address indexed tokenIn, address indexed tokenOut, uint256 amountIn, uint256 amountOut);

    constructor(address _factory) {
        factory = _factory;
    }

    // --- Library Functions (Normally in a separate library, simplified for the router) ---
    
    // fetches and sorts the reserves for a pair
    function getReserves(address factoryAddress, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1) = TesseractPair(TesseractFactory(factoryAddress).getPair(tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
    
    // returns sorted token addresses, used to handle return values from pairs sorted in this order
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, "TesseractLibrary: IDENTICAL_ADDRESSES");
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), "TesseractLibrary: ZERO_ADDRESS");
    }

    // given some amount of an asset and pair reserves, returns an equivalent amount of the other asset
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, "TesseractLibrary: INSUFFICIENT_AMOUNT");
        require(reserveA > 0 && reserveB > 0, "TesseractLibrary: INSUFFICIENT_LIQUIDITY");
        amountB = (amountA * reserveB) / reserveA;
    }
    
    // given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) public pure returns (uint amountOut) {
        require(amountIn > 0, "TesseractLibrary: INSUFFICIENT_INPUT_AMOUNT");
        require(reserveIn > 0 && reserveOut > 0, "TesseractLibrary: INSUFFICIENT_LIQUIDITY");
        uint amountInWithFee = amountIn * 997;
        uint numerator = amountInWithFee * reserveOut;
        uint denominator = (reserveIn * 1000) + amountInWithFee;
        amountOut = numerator / denominator;
    }


    // --- Router Functions ---

    function _addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin
    ) internal returns (uint256 amountA, uint256 amountB) {
        // create the pair if it doesn't exist yet
        if (TesseractFactory(factory).getPair(tokenA, tokenB) == address(0)) {
            TesseractFactory(factory).createPair(tokenA, tokenB);
        }
        (uint256 reserveA, uint256 reserveB) = getReserves(factory, tokenA, tokenB);
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
        } else {
            uint256 amountBOptimal = quote(amountADesired, reserveA, reserveB);
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, "TesseractSwap: INSUFFICIENT_B_AMOUNT");
                (amountA, amountB) = (amountADesired, amountBOptimal);
            } else {
                uint256 amountAOptimal = quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, "TesseractSwap: INSUFFICIENT_A_AMOUNT");
                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }
        }
    }

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external ensure(deadline) returns (uint256 amountA, uint256 amountB, uint256 liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = TesseractFactory(factory).getPair(tokenA, tokenB);
        
        IERC20(tokenA).transferFrom(msg.sender, pair, amountA);
        IERC20(tokenB).transferFrom(msg.sender, pair, amountB);
        
        liquidity = TesseractPair(pair).mint(to);
    }

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external ensure(deadline) returns (uint256[] memory amounts) {
        require(path.length >= 2, "TesseractSwap: INVALID_PATH");
        amounts = new uint256[](path.length);
        amounts[0] = amountIn;
        
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
        
        require(amounts[amounts.length - 1] >= amountOutMin, "TesseractSwap: INSUFFICIENT_OUTPUT_AMOUNT");
        
        // Transfer initial tokens to first pair
        address pair = TesseractFactory(factory).getPair(path[0], path[1]);
        IERC20(path[0]).transferFrom(msg.sender, pair, amounts[0]);
        
        // Execute the swap
        _swap(amounts, path, to);
    }

    function swapAndBridgeXCM(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 minAmountOut,
        bytes calldata destinationParachain,
        bytes calldata xcmMessage,
        uint256 deadline
    ) external ensure(deadline) returns (uint256 amountOut) {
        // 1. Execute local swap
        address[] memory path = new address[](2);
        path[0] = tokenIn;
        path[1] = tokenOut;

        {
            (uint reserveIn, uint reserveOut) = getReserves(factory, tokenIn, tokenOut);
            amountOut = getAmountOut(amountIn, reserveIn, reserveOut);
            require(amountOut >= minAmountOut, "TesseractSwap: SLIPPAGE_TOO_HIGH");
        }

        // Transfer initial tokens to first pair
        IERC20(tokenIn).transferFrom(msg.sender, TesseractFactory(factory).getPair(tokenIn, tokenOut), amountIn);

        {
            uint[] memory amounts = new uint[](2);
            amounts[0] = amountIn;
            amounts[1] = amountOut;
            // Output tokens stay in the router temporarily to be bridged
            _swap(amounts, path, address(this));
        }

        // 2. Call XCM precompile to bridge output tokens
        IXcm(XCM_PRECOMPILE).send(destinationParachain, xcmMessage);

        emit CrossChainSwap(msg.sender, tokenIn, tokenOut, amountIn, amountOut);
    }

    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = sortTokens(input, output);
            uint amountOut = amounts[i + 1];
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
            address to = i < path.length - 2 ? TesseractFactory(factory).getPair(output, path[i + 2]) : _to;
            TesseractPair(TesseractFactory(factory).getPair(input, output)).swap(
                amount0Out, amount1Out, to
            );
        }
    }
}
