// ─── Contract ABIs matching the Tesseract 2.0 Solidity contracts ─────
// These exactly match the function signatures in TesseractSwap.sol,
// TesseractVault.sol, and TesseractCompute.sol.
// Parsed via viem's parseAbi so wagmi readContract/writeContract work correctly.

import { parseAbi } from 'viem';

export const ABIS = {
    // Standard ERC-20 (10 decimals on Polkadot Assets pallet)
    ERC20: parseAbi([
        'function balanceOf(address owner) view returns (uint256)',
        'function allowance(address owner, address spender) view returns (uint256)',
        'function approve(address spender, uint256 amount) returns (bool)',
        'function transfer(address to, uint256 amount) returns (bool)',
        'function transferFrom(address from, address to, uint256 amount) returns (bool)',
        'function symbol() view returns (string)',
        'function decimals() view returns (uint8)',
        'function totalSupply() view returns (uint256)',
    ]),

    // TesseractSwap — evm/TesseractSwap.sol
    SWAP: parseAbi([
        'function registerAsset(uint32 assetId, address precompileAddr) external',
        'function getPoolId(uint32 assetA, uint32 assetB) view returns (bytes32)',
        'function addLiquidity(uint32 assetA, uint32 assetB, uint256 amountA, uint256 amountB) external returns (uint256 shares)',
        'function removeLiquidity(uint32 assetA, uint32 assetB, uint256 shares) external returns (uint256 amountA, uint256 amountB)',
        'function swap(uint32 assetIdIn, uint32 assetIdOut, uint256 amountIn, uint256 minAmountOut) external returns (uint256 amountOut)',
        'function swapAndBridgeXCM(uint32 assetIdIn, uint32 assetIdOut, uint256 amountIn, uint256 minAmountOut, bytes xcmDestination, bytes xcmMessage) external returns (uint256 amountOut)',
        'function getReserves(uint32 assetA, uint32 assetB) view returns (uint256 reserveA, uint256 reserveB)',
        'function getPoolShares(bytes32 poolId, address user) view returns (uint256)',
        'function assetPrecompile(uint32 assetId) view returns (address)',
        'function owner() view returns (address)',
        'event Swap(address indexed sender, uint32 assetIdIn, uint32 assetIdOut, uint256 amountIn, uint256 amountOut)',
        'event BridgeXCM(address indexed sender, uint32 assetIdOut, uint256 amountOut, bytes xcmDestination)',
        'event LiquidityAdded(address indexed provider, bytes32 indexed poolId, uint256 shares)',
        'event LiquidityRemoved(address indexed provider, bytes32 indexed poolId, uint256 shares)',
    ]),

    // TesseractVault — evm/TesseractVault.sol (ERC-4626)
    VAULT: parseAbi([
        'function deposit(uint256 assets, address receiver) external returns (uint256 shares)',
        'function withdraw(uint256 shares, address receiver) external returns (uint256 assets)',
        'function previewDeposit(uint256 assets) view returns (uint256)',
        'function previewWithdraw(uint256 shares) view returns (uint256)',
        'function convertToShares(uint256 assets) view returns (uint256)',
        'function convertToAssets(uint256 shares) view returns (uint256)',
        'function rebalance(uint64[] strategyAprs, bytes xcmMessage) external',
        'function setComputeContract(address _compute) external',
        'function totalAssets() view returns (uint256)',
        'function totalSupply() view returns (uint256)',
        'function balanceOf(address account) view returns (uint256)',
        'function name() view returns (string)',
        'function symbol() view returns (string)',
        'function decimals() view returns (uint8)',
        'function computeContract() view returns (address)',
        'function owner() view returns (address)',
        'event Deposit(address indexed sender, address indexed receiver, uint256 assets, uint256 shares)',
        'event Withdraw(address indexed sender, address indexed receiver, uint256 assets, uint256 shares)',
        'event Rebalanced(uint64 bestStrategyIndex, bytes xcmMessage, uint64 refTime, uint64 proofSize)',
    ]),

    // TesseractCompute — pvm/TesseractCompute.sol (PVM)
    COMPUTE: parseAbi([
        'function getBestStrategy(uint64[] aprs) external returns (uint64 bestIndex)',
        'function routeToParachain(bytes destination, bytes message) external',
        'function getAssetBalance(address assetPrecompile) view returns (uint256)',
        'function systemInfo() view returns (uint64 refTime, uint64 proofSize, bytes32 codeHash)',
        'function authorizedCaller() view returns (address)',
        'function owner() view returns (address)',
        'event StrategySelected(uint64 bestIndex, uint256 aprCount)',
        'event Routed(bytes destination, uint64 refTime, uint64 proofSize)',
    ]),

    // MockAsset
    MOCK_ASSET: parseAbi([
        'function balanceOf(address owner) view returns (uint256)',
        'function allowance(address owner, address spender) view returns (uint256)',
        'function approve(address spender, uint256 amount) returns (bool)',
        'function mint(address to, uint256 amount) external',
        'function decimals() view returns (uint8)',
        'function symbol() view returns (string)',
        'function name() view returns (string)',
    ]),

    // WPAS — Wrapped PAS (deposit/withdraw native PAS)
    WPAS: parseAbi([
        'function deposit() payable',
        'function withdraw(uint256 amount) external',
        'function balanceOf(address owner) view returns (uint256)',
        'function approve(address spender, uint256 amount) returns (bool)',
        'function allowance(address owner, address spender) view returns (uint256)',
        'function transfer(address to, uint256 amount) returns (bool)',
        'function totalSupply() view returns (uint256)',
        'function symbol() view returns (string)',
        'function name() view returns (string)',
        'function decimals() view returns (uint8)',
        'event Deposit(address indexed from, uint256 amount)',
        'event Withdrawal(address indexed to, uint256 amount)',
    ]),
};
