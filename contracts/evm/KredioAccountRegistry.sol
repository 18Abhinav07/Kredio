// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

// ─────────────────────────────────────────────────────────────────────────────
// SR25519 Precompile interface
//
// On Asset Hub EVM the sr25519 precompile address and ABI are chain-specific.
// The owner can configure `sr25519Verifier` post-deployment once the address is
// known. Passing address(0) disables cryptographic verification and forces the
// use of attestedLink() by an authorised attester.
// ─────────────────────────────────────────────────────────────────────────────

interface ISR25519Verifier {
    /// @param publicKey  32-byte SR25519 public key.
    /// @param signature  64-byte SR25519 signature.
    /// @param message    Arbitrary byte message that was signed.
    /// @return           True iff the signature is valid for (publicKey, message).
    function verify(
        bytes32 publicKey,
        bytes calldata signature,
        bytes calldata message
    ) external view returns (bool);
}

/// @title  KredioAccountRegistry
/// @notice Links a user's Substrate/Talisman (SR25519) identity to their
///         Hub EVM address with cryptographic proof.
///
///         Enables:
///           - Phase 4 governance-score sync for on-chain credit enrichment.
///           - Cross-chain identity for multi-parachain position management.
///           - Attested fallback when the SR25519 precompile is unavailable.
///
///         One-to-one mapping enforced in both directions.
///         Nonce increments on link AND unlink - old signatures are permanently
///         invalid after any state change.
///
/// @dev Deployed on Hub EVM (chainId 420420417).
///      Constructor sets owner = deployer and deployer as first attester.
contract KredioAccountRegistry {
    using Strings for uint256;
    using Strings for address;

    // ─────────────────────────────────────────────────────────────────────────
    // State
    // ─────────────────────────────────────────────────────────────────────────

    address public owner;

    /// @notice Configurable SR25519 precompile address.
    ///         Set to address(0) to disable on-chain cryptographic verification
    ///         and require admin attestation for all links.
    address public sr25519Verifier;

    // Primary mappings (both directions)
    mapping(address => bytes32) public substrateKeyOf;
    mapping(bytes32 => address) public evmAddressOf;

    struct AccountLink {
        address evmAddress;
        bytes32 substrateKey;
        uint256 linkedAt; // block number
        uint256 linkedTimestamp; // block.timestamp
        bool adminAttested; // true if created via attestedLink()
        bool active; // false after unlinkAccount()
    }

    mapping(address => AccountLink) public linkOf;

    /// @notice Per-EVM-address nonce. Increments on both link and unlink.
    ///         Prevents signature replay after any state change.
    mapping(address => uint64) public linkNonce;

    mapping(address => bool) public attesters;

    uint256 public totalLinked;
    uint256 public totalUnlinked;

    // ─────────────────────────────────────────────────────────────────────────
    // Events
    // ─────────────────────────────────────────────────────────────────────────

    event AccountLinked(address indexed evmAddress, bytes32 indexed substrateKey, bool adminAttested, uint256 linkedAt);

    event AccountUnlinked(address indexed evmAddress, bytes32 indexed substrateKey);

    event AttesterUpdated(address indexed attester, bool status);

    event LinkAttemptFailed(address indexed evmAddress, bytes32 substrateKey, string reason);

    event SR25519VerifierUpdated(address indexed newVerifier);

    // ─────────────────────────────────────────────────────────────────────────
    // Modifiers
    // ─────────────────────────────────────────────────────────────────────────

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    modifier onlyAttester() {
        require(attesters[msg.sender], "not attester");
        _;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Constructor
    // ─────────────────────────────────────────────────────────────────────────

    /// @param _sr25519Verifier Address of the SR25519 precompile, or address(0)
    ///                         to start in attested-only mode.
    constructor(
        address _sr25519Verifier
    ) {
        owner = msg.sender;
        sr25519Verifier = _sr25519Verifier;
        // Deployer is the first authorised attester.
        attesters[msg.sender] = true;
        emit AttesterUpdated(msg.sender, true);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Core: linkAccount
    // ─────────────────────────────────────────────────────────────────────────

    /// @notice Links msg.sender's EVM address to `substratePublicKey`.
    ///         The caller must provide a valid SR25519 signature produced by
    ///         the Substrate private key corresponding to `substratePublicKey`
    ///         over the exact message returned by getLinkMessage(msg.sender).
    ///
    ///         If no SR25519 verifier is configured, reverts with a message
    ///         directing the user to use attestedLink().
    ///
    /// @param substratePublicKey 32-byte SR25519 public key (SS58 raw bytes).
    /// @param substrateSignature 64-byte SR25519 signature over getLinkMessage(msg.sender).
    function linkAccount(
        bytes32 substratePublicKey,
        bytes calldata substrateSignature
    ) external {
        require(substratePublicKey != bytes32(0), "zero substrate key");
        require(substrateKeyOf[msg.sender] == bytes32(0), "EVM address already linked");
        require(evmAddressOf[substratePublicKey] == address(0), "substrate key already linked");

        if (sr25519Verifier == address(0)) {
            emit LinkAttemptFailed(msg.sender, substratePublicKey, "SR25519 verifier not configured");
            revert("Use attestedLink for manual verification");
        }

        bytes memory message = _buildMessage(msg.sender);
        bool valid = _verifySignature(substratePublicKey, substrateSignature, message);

        if (!valid) {
            emit LinkAttemptFailed(msg.sender, substratePublicKey, "invalid signature");
            revert("invalid substrate signature");
        }

        _commitLink(msg.sender, substratePublicKey, false);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Core: unlinkAccount
    // ─────────────────────────────────────────────────────────────────────────

    /// @notice Removes the link for msg.sender.
    ///         Increments linkNonce so any previously-valid signature is invalidated.
    function unlinkAccount() external {
        bytes32 key = substrateKeyOf[msg.sender];
        require(key != bytes32(0), "not linked");

        _commitUnlink(msg.sender, key);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Admin fallback: attestedLink / attestedUnlink
    // ─────────────────────────────────────────────────────────────────────────

    /// @notice Creates a link without on-chain signature verification.
    ///         The attester is responsible for verifying the Substrate signature
    ///         off-chain before calling this function.
    ///         Any link created here is permanently flagged as `adminAttested`.
    function attestedLink(
        address evmAddress,
        bytes32 substratePublicKey
    ) external onlyAttester {
        require(evmAddress != address(0), "zero evm address");
        require(substratePublicKey != bytes32(0), "zero substrate key");
        require(substrateKeyOf[evmAddress] == bytes32(0), "EVM address already linked");
        require(evmAddressOf[substratePublicKey] == address(0), "substrate key already linked");

        _commitLink(evmAddress, substratePublicKey, true);
    }

    /// @notice Removes a link via admin fallback.
    function attestedUnlink(
        address evmAddress
    ) external onlyAttester {
        bytes32 key = substrateKeyOf[evmAddress];
        require(key != bytes32(0), "not linked");

        _commitUnlink(evmAddress, key);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // View functions
    // ─────────────────────────────────────────────────────────────────────────

    /// @notice Returns true if `evmAddress` has an active link.
    function isLinked(
        address evmAddress
    ) external view returns (bool) {
        return linkOf[evmAddress].active;
    }

    /// @notice Returns link metadata for `evmAddress`.
    function getLink(
        address evmAddress
    ) external view returns (bytes32 substrateKey, uint256 linkedAt, bool adminAttested, bool active) {
        AccountLink storage l = linkOf[evmAddress];
        return (l.substrateKey, l.linkedAt, l.adminAttested, l.active);
    }

    /// @notice Returns the EVM address linked to `substrateKey`, or address(0).
    function getEvmAddress(
        bytes32 substrateKey
    ) external view returns (address) {
        return evmAddressOf[substrateKey];
    }

    /// @notice Returns the exact message string the user must sign with their
    ///         Substrate wallet given the current nonce for `evmAddress`.
    ///         The frontend should call this and pass the result to Talisman's
    ///         signRaw() or equivalent.
    function getLinkMessage(
        address evmAddress
    ) external view returns (string memory) {
        return string(_buildMessage(evmAddress));
    }

    /// @notice Exposes signature verification as a view function.
    ///         Returns false if no verifier is configured.
    ///         Useful for off-chain simulation and testing.
    function verifySignature(
        bytes32 substratePublicKey,
        bytes calldata signature,
        bytes calldata message
    ) external view returns (bool valid) {
        if (sr25519Verifier == address(0)) return false;
        return _verifySignature(substratePublicKey, signature, message);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Admin functions
    // ─────────────────────────────────────────────────────────────────────────

    function setAttester(
        address attester,
        bool status
    ) external onlyOwner {
        require(attester != address(0), "zero addr");
        attesters[attester] = status;
        emit AttesterUpdated(attester, status);
    }

    function setSR25519Verifier(
        address verifier
    ) external onlyOwner {
        sr25519Verifier = verifier;
        emit SR25519VerifierUpdated(verifier);
    }

    function transferOwnership(
        address newOwner
    ) external onlyOwner {
        require(newOwner != address(0), "zero addr");
        owner = newOwner;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Internal helpers
    // ─────────────────────────────────────────────────────────────────────────

    /// @dev Writes link state, increments nonce, emits AccountLinked.
    function _commitLink(
        address evmAddress,
        bytes32 substrateKey,
        bool adminAttested
    ) internal {
        substrateKeyOf[evmAddress] = substrateKey;
        evmAddressOf[substrateKey] = evmAddress;
        linkNonce[evmAddress] += 1;
        totalLinked += 1;

        linkOf[evmAddress] = AccountLink({
            evmAddress: evmAddress,
            substrateKey: substrateKey,
            linkedAt: block.number,
            linkedTimestamp: block.timestamp,
            adminAttested: adminAttested,
            active: true
        });

        emit AccountLinked(evmAddress, substrateKey, adminAttested, block.number);
    }

    /// @dev Clears link state, increments nonce, emits AccountUnlinked.
    function _commitUnlink(
        address evmAddress,
        bytes32 substrateKey
    ) internal {
        delete evmAddressOf[substrateKey];
        delete substrateKeyOf[evmAddress];
        linkNonce[evmAddress] += 1;
        linkOf[evmAddress].active = false;
        totalUnlinked += 1;

        emit AccountUnlinked(evmAddress, substrateKey);
    }

    /// @dev Constructs the canonical message the Substrate wallet must sign.
    ///      Bound to: evmAddress (cannot be used for another), chainId (cannot
    ///      be replayed on a different network), linkNonce (cannot be replayed
    ///      after any link/unlink state change).
    ///
    ///      Format:
    ///        "Kredio Account Link\n"
    ///        "EVM: 0x<evmAddress>\n"
    ///        "Chain: <chainId>\n"
    ///        "Nonce: <linkNonce[evmAddress]>"
    function _buildMessage(
        address evmAddress
    ) internal view returns (bytes memory) {
        return abi.encodePacked(
            "Kredio Account Link\n",
            "EVM: ",
            _toHexString(evmAddress),
            "\n",
            "Chain: ",
            block.chainid.toString(),
            "\n",
            "Nonce: ",
            uint256(linkNonce[evmAddress]).toString()
        );
    }

    /// @dev Calls the configured SR25519 precompile.
    ///      Returns false on any revert from the precompile rather than bubbling up,
    ///      so an unexpected precompile failure is surfaced as an invalid signature
    ///      rather than a hard revert.
    function _verifySignature(
        bytes32 publicKey,
        bytes calldata signature,
        bytes memory message
    ) internal view returns (bool) {
        try ISR25519Verifier(sr25519Verifier).verify(publicKey, signature, message) returns (bool result) {
            return result;
        } catch {
            return false;
        }
    }

    /// @dev Returns the EVM address as a lowercase hex string prefixed with "0x".
    function _toHexString(
        address addr
    ) internal pure returns (string memory) {
        bytes20 addrBytes = bytes20(addr);
        bytes memory hexChars = "0123456789abcdef";
        bytes memory result = new bytes(42); // "0x" + 40 hex chars
        result[0] = "0";
        result[1] = "x";
        for (uint256 i = 0; i < 20; i++) {
            uint8 b = uint8(addrBytes[i]);
            result[2 + i * 2] = hexChars[b >> 4];
            result[3 + i * 2] = hexChars[b & 0x0f];
        }
        return string(result);
    }
}
