// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IMockUSDC {
    function mint(
        address to,
        uint256 amount
    ) external;
}

interface IERC20Minimal {
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

/// @title KredioBridgeMinter
/// @notice Deployed on Hub (chainId 420420417).
///         The backend relayer calls processDeposit() after verifying an
///         EthDeposited event on the source chain, which mints mUSDC to
///         the hubRecipient.
///         Users call initiateRedeem() to burn their mUSDC; the backend
///         then sends ETH back to the original depositor on the source chain.
contract KredioBridgeMinter {
    address public immutable owner;
    address public relayer;
    address public immutable mUSDC;

    struct DepositRecord {
        uint32 sourceChainId;
        address sourceUser; // depositor on source chain
        address hubRecipient; // mUSDC receiver on Hub
        uint256 ethAmount; // source ETH in wei (18-dec)
        uint256 mUSDCMinted; // mUSDC minted (6-dec)
        uint256 timestamp;
        bool redeemed;
    }

    // sourceTxHash → record (txHash from source chain is the unique key)
    mapping(bytes32 => DepositRecord) public deposits;

    // hubRecipient → list of sourceTxHashes (for getUserDeposits())
    mapping(address => bytes32[]) private _userDeposits;

    event DepositProcessed(
        bytes32 indexed sourceTxHash, address indexed hubRecipient, uint256 mUSDCMinted, uint32 sourceChainId
    );

    event Redeemed(bytes32 indexed sourceTxHash, address indexed user, uint256 amount);

    event RelayerUpdated(address indexed newRelayer);

    error NotOwner();
    error NotRelayer();
    error AlreadyProcessed();
    error ZeroRecipient();
    error ZeroSourceUser();
    error ZeroOut();
    error UnknownDeposit();
    error AlreadyRedeemed();
    error NotDepositRecipient();
    error InvalidRedeemAmount();
    error ZeroAddress();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    modifier onlyRelayer() {
        if (msg.sender != relayer) revert NotRelayer();
        _;
    }

    constructor(
        address _mUSDC,
        address _relayer
    ) {
        if (_mUSDC == address(0)) revert ZeroAddress();
        if (_relayer == address(0)) revert ZeroAddress();
        owner = msg.sender;
        mUSDC = _mUSDC;
        relayer = _relayer;
    }

    /// @notice Called by the backend relayer after verifying the source chain tx.
    /// @param sourceTxHash  Transaction hash of EthDeposited event on source chain.
    /// @param hubRecipient  Address that receives mUSDC on Hub.
    /// @param sourceUser    Original depositor on the source chain (for redeem payout).
    /// @param ethAmount     ETH deposited on source chain (wei, 18-dec).
    /// @param mUSDCOut      mUSDC to mint (6-dec).
    /// @param sourceChainId EIP-155 chain ID of the source chain.
    function processDeposit(
        bytes32 sourceTxHash,
        address hubRecipient,
        address sourceUser,
        uint256 ethAmount,
        uint256 mUSDCOut,
        uint32 sourceChainId
    ) external onlyRelayer {
        if (deposits[sourceTxHash].timestamp != 0) revert AlreadyProcessed();
        if (hubRecipient == address(0)) revert ZeroRecipient();
        if (sourceUser == address(0)) revert ZeroSourceUser();
        if (mUSDCOut == 0) revert ZeroOut();

        deposits[sourceTxHash] = DepositRecord({
            sourceChainId: sourceChainId,
            sourceUser: sourceUser,
            hubRecipient: hubRecipient,
            ethAmount: ethAmount,
            mUSDCMinted: mUSDCOut,
            timestamp: block.timestamp,
            redeemed: false
        });

        _userDeposits[hubRecipient].push(sourceTxHash);

        // MockUSDC.mint() is publicly callable - no permission needed
        IMockUSDC(mUSDC).mint(hubRecipient, mUSDCOut);

        emit DepositProcessed(sourceTxHash, hubRecipient, mUSDCOut, sourceChainId);
    }

    /// @notice User burns their mUSDC to trigger ETH redemption on the source chain.
    ///         The backend watches the Redeemed event and sends ETH to sourceUser
    ///         from the admin wallet on the source chain.
    /// @param sourceTxHash  The source chain tx hash of the original deposit.
    /// @param redeemAmount  Amount of mUSDC to redeem (must be <= mUSDCMinted, 6-dec).
    function initiateRedeem(
        bytes32 sourceTxHash,
        uint256 redeemAmount
    ) external {
        DepositRecord storage r = deposits[sourceTxHash];
        if (r.timestamp == 0) revert UnknownDeposit();
        if (r.redeemed) revert AlreadyRedeemed();
        if (msg.sender != r.hubRecipient) revert NotDepositRecipient();
        if (redeemAmount == 0 || redeemAmount > r.mUSDCMinted) revert InvalidRedeemAmount();

        r.redeemed = true;

        // Pull mUSDC from user into this contract (effectively held/burned for testnet)
        // User must call mUSDC.approve(minterAddress, redeemAmount) first
        bool ok = IERC20Minimal(mUSDC).transferFrom(msg.sender, address(this), redeemAmount);
        require(ok, "transferFrom failed");

        emit Redeemed(sourceTxHash, msg.sender, redeemAmount);
    }

    /// @notice Returns all soureTxHashes for a given hub address (for history UI).
    function getUserDeposits(
        address user
    ) external view returns (bytes32[] memory) {
        return _userDeposits[user];
    }

    /// @notice Owner can rotate the relayer address (e.g., key rotation).
    function setRelayer(
        address newRelayer
    ) external onlyOwner {
        if (newRelayer == address(0)) revert ZeroAddress();
        relayer = newRelayer;
        emit RelayerUpdated(newRelayer);
    }
}
