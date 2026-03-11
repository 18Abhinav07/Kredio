// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../evm/EthBridgeInbox.sol";
import "../evm/KredioBridgeMinter.sol";

// ─────────────────────────────────────────────────────────────────────────────
// DeployInbox - deploy EthBridgeInbox on Ethereum Sepolia (chainId 11155111)
//
// Usage:
//   forge script script/DeployBridge.s.sol:DeployInbox \
//     --rpc-url $SEPOLIA_RPC \
//     --chain-id 11155111 \
//     --private-key $PRIVATE_KEY \
//     --broadcast \
//     --verify \
//     --etherscan-api-key $ETHERSCAN_KEY
// ─────────────────────────────────────────────────────────────────────────────
contract DeployInbox is Script {
    function run() external {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(pk);
        EthBridgeInbox inbox = new EthBridgeInbox();
        vm.stopBroadcast();

        console2.log("=== EthBridgeInbox deployed ===");
        console2.log("Address  :", address(inbox));
        console2.log("Chain ID :", block.chainid);
        console2.log("Owner    :", inbox.owner());
        console2.log("Min deposit (ETH):", inbox.MIN_DEPOSIT());
        console2.log("Max deposit (ETH):", inbox.MAX_DEPOSIT());
        console2.log("");
        console2.log(">> Add to backend/.env:");
        console2.log("INBOX_ADDR_11155111=", address(inbox));
        console2.log("");
        console2.log(">> Add to frontend/.env.local:");
        console2.log("NEXT_PUBLIC_INBOX_SEPOLIA=", address(inbox));
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// DeployMinter - deploy KredioBridgeMinter on Hub Testnet (chainId 420420417)
//
// Usage:
//   forge script script/DeployBridge.s.sol:DeployMinter \
//     --rpc-url $PASSET_RPC \
//     --chain-id 420420417 \
//     --private-key $PRIVATE_KEY \
//     --broadcast
// ─────────────────────────────────────────────────────────────────────────────
contract DeployMinter is Script {
    // Existing deployed MockUSDC on Hub - unchanged
    address constant MUSDC = 0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646;

    function run() external {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(pk);

        vm.startBroadcast(pk);
        // Relayer = deployer wallet (same key used by backend)
        KredioBridgeMinter minter = new KredioBridgeMinter(MUSDC, deployer);
        vm.stopBroadcast();

        console2.log("=== KredioBridgeMinter deployed ===");
        console2.log("Address  :", address(minter));
        console2.log("Chain ID :", block.chainid);
        console2.log("mUSDC    :", MUSDC);
        console2.log("Relayer  :", deployer);
        console2.log("");
        console2.log(">> Add to backend/.env:");
        console2.log("MINTER_ADDR=", address(minter));
        console2.log("");
        console2.log(">> Add to frontend/.env.local:");
        console2.log("NEXT_PUBLIC_BRIDGE_MINTER=", address(minter));
    }
}
