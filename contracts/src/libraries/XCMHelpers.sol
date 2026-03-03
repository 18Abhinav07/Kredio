// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library XCMHelpers {
    // Encodes a simple transfer XCM message
    // 0x030c: WithdrawAsset
    // 0x0401: BuyExecution
    // 0x0d01: DepositAsset
    function encodeTransferMessage(uint256 amount, bytes32 beneficiary) internal pure returns (bytes memory) {
        return abi.encodePacked(
            hex"030c", // WithdrawAsset instruction
            _encodeMultiAsset(amount),
            hex"0401", // BuyExecution instruction
            hex"04000000000000000000000000000000", // Execution weight (Placeholder implementation)
            hex"0d01", // DepositAsset instruction
            beneficiary
        );
    }

    // Encodes destination parachain location
    function encodeParachainDestination(uint32 parachainId) internal pure returns (bytes memory) {
        // V3 MultiLocation: { parents: 1, interior: X1(Parachain(id)) }
        return abi.encodePacked(
            hex"03",   // V3 version
            hex"01",   // parents = 1
            hex"00",   // X1 interior
            hex"00",   // Parachain junction
            parachainId // Parachain ID (4 bytes)
        );
    }

    // Encodes the concrete fungible asset
    function _encodeMultiAsset(uint256 amount) private pure returns (bytes memory) {
        return abi.encodePacked(
            hex"00", // Concrete asset
            hex"01", // Interior: Here
            hex"01", // Fungible
            amount   // Amount (encoded as compact in a real SCALE implementation; using standard abi.encode for this simplified PoC)
        );
    }
}
