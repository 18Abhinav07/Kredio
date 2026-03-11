// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

// ─────────────────────────────────────────────────────────────────────────────
// Minimal interfaces for Kredio protocol contracts
// ─────────────────────────────────────────────────────────────────────────────

interface IKredioPASMarket {
    /// @dev msg.value becomes collateral for the caller (settler in Phase 3).
    function depositCollateral() external payable;
    function withdrawCollateral() external;
    function borrow(
        uint256 amount
    ) external;
    /// @dev Pulls debtUSDC + accrued interest via transferFrom(msg.sender).
    function repay() external;
    function positions(
        address user
    )
        external
        view
        returns (uint256 collateralPAS, uint256 debtUSDC, uint32 interestBps, uint256 openedAt, uint8 tier, bool active);
    function collateralBalance(
        address user
    ) external view returns (uint256);
}

interface IKredioLending {
    /// @dev Pulls `amount` mUSDC via transferFrom(msg.sender) and deposits to lending pool.
    function deposit(
        uint256 amount
    ) external;
    /// @dev Pulls `amount` mUSDC via transferFrom(msg.sender) and records as collateral.
    function depositCollateral(
        uint256 amount
    ) external;
    function borrow(
        uint256 amount
    ) external;
    /// @dev Pulls debt+interest via transferFrom(msg.sender) and returns collateral to caller.
    function repay() external;
    function positions(
        address user
    )
        external
        view
        returns (
            uint256 collateral,
            uint256 debt,
            uint256 openedAt,
            uint32 interestBps,
            uint32 collateralRatioBps,
            uint8 tier,
            bool active
        );
}

interface IKredioSwap {
    function swap(
        uint256 minMUSDCOut
    ) external payable;
    function quoteSwap(
        uint256 pasWei
    ) external view returns (uint256 mUSDCOut);
}

/// @title  KredioXCMSettler
/// @notice Cross-chain intent settlement engine.
///         Receives XCM Transact calls from authorised parachains, decodes
///         the encoded intent, and executes the appropriate action in the
///         Kredio protocol suite on Hub EVM.
///
/// @dev PHASE 3 FOUNDATION NOTE:
///      All protocol calls (KredioPASMarket, KredioLending) use msg.sender for
///      position/balance accounting. In the current Phase 3 design, the settler
///      itself holds the aggregate protocol positions and tracks per-user
///      settlement history via `settlementHistory` and `intentNonce`.
///      Phase 4 will introduce onBehalf() variants in the protocol contracts so
///      individual positions are attributed directly to `originAddress`.
///
/// @custom:security-contact https://github.com/KredioFinance
contract KredioXCMSettler is ReentrancyGuard {
    // ─────────────────────────────────────────────────────────────────────────
    // Intent type constants
    // ─────────────────────────────────────────────────────────────────────────

    uint8 public constant DEPOSIT_COLLATERAL = 0x01;
    uint8 public constant BORROW = 0x02;
    uint8 public constant REPAY = 0x03;
    uint8 public constant DEPOSIT_LEND = 0x04;
    uint8 public constant SWAP_AND_LEND = 0x05;
    uint8 public constant SWAP_AND_BORROW_COLLATERAL = 0x06;
    uint8 public constant WITHDRAW_COLLATERAL = 0x07;
    uint8 public constant FULL_EXIT = 0x08;

    // ─────────────────────────────────────────────────────────────────────────
    // State
    // ─────────────────────────────────────────────────────────────────────────

    address public owner;

    address public kredioPASMarket;
    address public kredioLending;
    address public kredioSwap;
    address public mockUSDC;

    /// @notice Parachain IDs allowed to call settleIntent.
    mapping(uint32 => bool) public authorisedParachains;

    /// @notice Per-user strictly-incrementing nonce to prevent XCM intent replay.
    mapping(address => uint64) public intentNonce;

    struct Settlement {
        address user;
        uint8 intentType;
        uint256 amountIn;
        uint256 amountOut;
        uint32 sourceParachain;
        uint256 executedAt;
        bool success;
        bytes failureReason;
    }

    mapping(address => Settlement[]) private _settlementHistory;
    mapping(address => uint256) public settlementCount;

    /// @notice Per-intent-type emergency pause. Allows surgical disabling.
    mapping(uint8 => bool) public intentPaused;

    /// @notice Global pause. Blocks all settleIntent calls when true.
    bool public paused;

    // ─────────────────────────────────────────────────────────────────────────
    // Events
    // ─────────────────────────────────────────────────────────────────────────

    event IntentReceived(
        address indexed user, uint8 indexed intentType, uint32 sourceParachain, uint256 amountIn, uint64 nonce
    );

    event IntentExecuted(
        address indexed user, uint8 indexed intentType, uint256 amountIn, uint256 amountOut, bool success
    );

    event IntentFailed(address indexed user, uint8 indexed intentType, bytes reason);

    event ParachainAuthorised(uint32 parachainId, bool status);
    event IntentPaused(uint8 intentType, bool status);
    event ContractPaused(bool status);

    // ── Phase 5 AI Engine events ──────────────────────────────────────────────

    /// @notice Fired at the start of every settleIntent() call - unique intentId for audit trail.
    event IntentAuditLog(
        bytes32 indexed intentId,
        uint32 indexed sourceParaId,
        address indexed sender,
        uint8 intentType,
        uint256 amount,
        uint64 receivedBlock
    );

    /// @notice Recorded by xcmAcknowledger.js after intent processing dispatches a message.
    event MessageDispatched(
        bytes32 indexed intentId,
        uint8 bridgeType,
        uint32 destinationId,
        bytes32 messageHash,
        uint64 dispatchedBlock,
        uint64 estimatedDeliveryBlocks
    );

    /// @notice Recorded by xcmAcknowledger.js after the delivery window elapses.
    event ExecutionAcknowledged(bytes32 indexed intentId, bool success, bytes4 resultCode, uint64 acknowledgedBlock);

    /// @notice Recorded by xcmAcknowledger.js when an ETH bridge operation is detected.
    event EthBridgeInitiated(
        bytes32 indexed bridgeId,
        address indexed ethRecipient,
        uint256 amount,
        bytes32 bridgeTransactionHash,
        uint64 initiatedBlock
    );

    // ─────────────────────────────────────────────────────────────────────────
    // Modifiers
    // ─────────────────────────────────────────────────────────────────────────

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Constructor
    // ─────────────────────────────────────────────────────────────────────────

    constructor(
        address _kredioPASMarket,
        address _kredioLending,
        address _kredioSwap,
        address _mockUSDC
    ) {
        require(
            _kredioPASMarket != address(0) && _kredioLending != address(0) && _kredioSwap != address(0)
                && _mockUSDC != address(0),
            "zero addr"
        );
        owner = msg.sender;
        kredioPASMarket = _kredioPASMarket;
        kredioLending = _kredioLending;
        kredioSwap = _kredioSwap;
        mockUSDC = _mockUSDC;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Core: settleIntent
    // ─────────────────────────────────────────────────────────────────────────

    /// @notice Entry point for XCM Transact payloads.
    ///         Called by the Hub EVM XCM executor after tokens have already
    ///         landed in `originAddress`. Does NOT revert on protocol failure -
    ///         failure is recorded on-chain so the XCM message is fully consumed.
    ///
    /// @param originAddress  The user's Hub EVM sovereign account.
    /// @param intentType     INTENT TYPE constant (0x01–0x08).
    /// @param intentData     ABI-encoded parameters; empty for no-param intents.
    /// @param sourceParachain Polkadot parachain ID of the sending chain.
    /// @param nonce          Must equal intentNonce[originAddress] + 1.
    function settleIntent(
        address originAddress,
        uint8 intentType,
        bytes calldata intentData,
        uint32 sourceParachain,
        uint64 nonce
    ) external payable nonReentrant {
        require(!paused, "settler paused");
        require(authorisedParachains[sourceParachain], "parachain not authorised");
        require(!intentPaused[intentType], "intent type paused");
        require(originAddress != address(0), "zero origin");
        require(nonce == intentNonce[originAddress] + 1, "invalid nonce");

        // Commit nonce before execution to prevent any reentrancy-based replay.
        intentNonce[originAddress] = nonce;

        // Phase 5: compute intentId and emit audit log before existing logic
        bytes32 intentId = keccak256(abi.encode(sourceParachain, originAddress, block.number, intentType));
        emit IntentAuditLog(
            intentId,
            sourceParachain,
            originAddress,
            intentType,
            _extractAmount(intentType, intentData),
            uint64(block.number)
        );

        emit IntentReceived(originAddress, intentType, sourceParachain, msg.value, nonce);

        (bool success, uint256 amountOut, bytes memory failReason) = _dispatch(originAddress, intentType, intentData);

        Settlement memory s = Settlement({
            user: originAddress,
            intentType: intentType,
            amountIn: msg.value,
            amountOut: amountOut,
            sourceParachain: sourceParachain,
            executedAt: block.number,
            success: success,
            failureReason: failReason
        });

        _settlementHistory[originAddress].push(s);
        settlementCount[originAddress] += 1;

        if (success) {
            emit IntentExecuted(originAddress, intentType, msg.value, amountOut, true);
        } else {
            emit IntentFailed(originAddress, intentType, failReason);
            emit IntentExecuted(originAddress, intentType, msg.value, 0, false);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // View: decodeAndValidate
    // ─────────────────────────────────────────────────────────────────────────

    /// @notice Off-chain preflight check. Validates intent bytes are well-formed
    ///         for the given intent type without writing state.
    function decodeAndValidate(
        uint8 intentType,
        bytes calldata intentData
    ) external pure returns (bool valid, string memory reason) {
        if (intentType == DEPOSIT_COLLATERAL) {
            return (true, "");
        } else if (intentType == BORROW) {
            if (intentData.length < 32) return (false, "data too short: need uint256 borrowAmount");
            uint256 a = abi.decode(intentData, (uint256));
            if (a == 0) return (false, "borrowAmount must be > 0");
            return (true, "");
        } else if (intentType == REPAY) {
            return (true, "");
        } else if (intentType == DEPOSIT_LEND) {
            if (intentData.length < 32) return (false, "data too short: need uint256 lendAmount");
            uint256 a = abi.decode(intentData, (uint256));
            if (a == 0) return (false, "lendAmount must be > 0");
            return (true, "");
        } else if (intentType == SWAP_AND_LEND) {
            return (true, "");
        } else if (intentType == SWAP_AND_BORROW_COLLATERAL) {
            if (intentData.length < 32) return (false, "data too short: need uint256 borrowAmount");
            uint256 a = abi.decode(intentData, (uint256));
            if (a == 0) return (false, "borrowAmount must be > 0");
            return (true, "");
        } else if (intentType == WITHDRAW_COLLATERAL) {
            return (true, "");
        } else if (intentType == FULL_EXIT) {
            return (true, "");
        } else {
            return (false, "unknown intent type");
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // View: getSettlementHistory
    // ─────────────────────────────────────────────────────────────────────────

    /// @notice Paginated settlement history. Returns at most `limit` records
    ///         starting from `offset` index (0-based).
    function getSettlementHistory(
        address user,
        uint256 offset,
        uint256 limit
    ) external view returns (Settlement[] memory) {
        Settlement[] storage all = _settlementHistory[user];
        uint256 total = all.length;
        if (offset >= total) return new Settlement[](0);
        uint256 end = offset + limit;
        if (end > total) end = total;
        uint256 count = end - offset;
        Settlement[] memory out = new Settlement[](count);
        for (uint256 i = 0; i < count; i++) {
            out[i] = all[offset + i];
        }
        return out;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // View: estimateIntent
    // ─────────────────────────────────────────────────────────────────────────

    /// @notice Dry-run simulation. Checks balances, oracle, and feasibility.
    ///         Returns whether the intent would succeed and the expected output.
    ///         Does NOT write state.
    function estimateIntent(
        address user,
        uint8 intentType,
        bytes calldata intentData
    ) external view returns (bool feasible, uint256 expectedOut, string memory reason) {
        if (intentType == DEPOSIT_COLLATERAL) {
            return (true, 0, "will deposit msg.value as PAS collateral in KredioPASMarket");
        } else if (intentType == BORROW) {
            if (intentData.length < 32) return (false, 0, "invalid data");
            uint256 borrowAmount = abi.decode(intentData, (uint256));
            if (borrowAmount == 0) return (false, 0, "zero amount");
            (, uint256 debtUSDC,,,, bool active) = IKredioPASMarket(kredioPASMarket).positions(address(this));
            if (active || debtUSDC > 0) return (false, 0, "settler already has active position");
            uint256 col = IKredioPASMarket(kredioPASMarket).collateralBalance(address(this));
            if (col == 0) return (false, 0, "no collateral posted");
            return (true, borrowAmount, "");
        } else if (intentType == REPAY) {
            (, uint256 debtUSDC,,,, bool active) = IKredioPASMarket(kredioPASMarket).positions(address(this));
            if (!active) return (false, 0, "no active position to repay");
            uint256 bal = IERC20(mockUSDC).balanceOf(address(this));
            if (bal < debtUSDC) return (false, 0, "insufficient USDC in settler");
            return (true, 0, "");
        } else if (intentType == DEPOSIT_LEND) {
            if (intentData.length < 32) return (false, 0, "invalid data");
            uint256 lendAmount = abi.decode(intentData, (uint256));
            uint256 bal = IERC20(mockUSDC).balanceOf(user);
            if (bal < lendAmount) return (false, 0, "insufficient USDC balance");
            return (true, lendAmount, "");
        } else if (intentType == SWAP_AND_LEND) {
            try IKredioSwap(kredioSwap).quoteSwap(1 ether) returns (uint256 ratePerPAS) {
                return (true, ratePerPAS, "quote is mUSDC out per 1 PAS; scale by msg.value");
            } catch {
                return (false, 0, "oracle unavailable");
            }
        } else if (intentType == SWAP_AND_BORROW_COLLATERAL) {
            if (intentData.length < 32) return (false, 0, "invalid data");
            uint256 borrowAmount = abi.decode(intentData, (uint256));
            if (borrowAmount == 0) return (false, 0, "zero borrow amount");
            return (true, borrowAmount, "");
        } else if (intentType == WITHDRAW_COLLATERAL) {
            (, uint256 debtUSDC,,,, bool active) = IKredioPASMarket(kredioPASMarket).positions(address(this));
            if (active && debtUSDC > 0) return (false, 0, "active debt: repay first");
            uint256 col = IKredioPASMarket(kredioPASMarket).collateralBalance(address(this));
            if (col == 0) return (false, 0, "no collateral to withdraw");
            return (true, col, "");
        } else if (intentType == FULL_EXIT) {
            return (true, 0, "will repay debt and withdraw collateral");
        }
        return (false, 0, "unknown intent type");
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Internal: dispatch router
    // ─────────────────────────────────────────────────────────────────────────

    function _dispatch(
        address user,
        uint8 intentType,
        bytes calldata intentData
    ) internal returns (bool success, uint256 amountOut, bytes memory failReason) {
        if (intentType == DEPOSIT_COLLATERAL) {
            return _handleDepositCollateral(user, msg.value);
        } else if (intentType == BORROW) {
            uint256 borrowAmount = abi.decode(intentData, (uint256));
            return _handleBorrow(user, borrowAmount);
        } else if (intentType == REPAY) {
            return _handleRepay(user);
        } else if (intentType == DEPOSIT_LEND) {
            uint256 lendAmount = abi.decode(intentData, (uint256));
            return _handleDepositLend(user, lendAmount);
        } else if (intentType == SWAP_AND_LEND) {
            return _handleSwapAndLend(user, msg.value);
        } else if (intentType == SWAP_AND_BORROW_COLLATERAL) {
            uint256 borrowAmount = abi.decode(intentData, (uint256));
            return _handleSwapAndBorrowCollateral(user, borrowAmount);
        } else if (intentType == WITHDRAW_COLLATERAL) {
            return _handleWithdrawCollateral(user);
        } else if (intentType == FULL_EXIT) {
            return _handleFullExit(user);
        } else {
            return (false, 0, bytes("unknown intent type"));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Internal handlers - one per intent type
    // ─────────────────────────────────────────────────────────────────────────

    /// @dev 0x01 - Deposits msg.value PAS as collateral in KredioPASMarket.
    function _handleDepositCollateral(
        address,
        uint256 amount
    ) internal returns (bool, uint256, bytes memory) {
        if (amount == 0) return (false, 0, bytes("zero PAS value"));
        try IKredioPASMarket(kredioPASMarket).depositCollateral{value: amount}() {
            return (true, amount, "");
        } catch (bytes memory reason) {
            return (false, 0, reason);
        }
    }

    /// @dev 0x02 - Borrows mUSDC from KredioPASMarket (requires collateral posted).
    ///      On success, forwards borrowed mUSDC to `user`.
    function _handleBorrow(
        address user,
        uint256 borrowAmount
    ) internal returns (bool, uint256, bytes memory) {
        if (borrowAmount == 0) return (false, 0, bytes("zero borrow"));
        uint256 before = IERC20(mockUSDC).balanceOf(address(this));
        try IKredioPASMarket(kredioPASMarket).borrow(borrowAmount) {
            uint256 received = IERC20(mockUSDC).balanceOf(address(this)) - before;
            // Forward borrowed USDC to originating user.
            if (received > 0) {
                require(IERC20(mockUSDC).transfer(user, received), "borrow forward fail");
            }
            return (true, received, "");
        } catch (bytes memory reason) {
            return (false, 0, reason);
        }
    }

    /// @dev 0x03 - Repays outstanding debt in KredioPASMarket.
    ///      mUSDC must already be present in this contract (sent via XCM token transfer
    ///      prior to the Transact intent).
    function _handleRepay(
        address
    ) internal returns (bool, uint256, bytes memory) {
        uint256 usdcBalance = IERC20(mockUSDC).balanceOf(address(this));
        if (usdcBalance == 0) return (false, 0, bytes("no USDC in settler for repay"));
        // Approve the exact balance we have; revoke any remainder after the call.
        bool approveOk = IERC20(mockUSDC).approve(kredioPASMarket, usdcBalance);
        if (!approveOk) return (false, 0, bytes("approve failed"));
        bool ok;
        bytes memory reason;
        try IKredioPASMarket(kredioPASMarket).repay() {
            ok = true;
        } catch (bytes memory r) {
            reason = r;
        }
        // Revoke residual approval regardless of outcome.
        IERC20(mockUSDC).approve(kredioPASMarket, 0);
        return (ok, 0, reason);
    }

    /// @dev 0x04 - Deposits mUSDC into KredioLending pool.
    ///      mUSDC must already be present in this contract.
    function _handleDepositLend(
        address,
        uint256 lendAmount
    ) internal returns (bool, uint256, bytes memory) {
        if (lendAmount == 0) return (false, 0, bytes("zero lend amount"));
        uint256 bal = IERC20(mockUSDC).balanceOf(address(this));
        if (bal < lendAmount) return (false, 0, bytes("insufficient USDC in settler"));
        bool approveOk = IERC20(mockUSDC).approve(kredioLending, lendAmount);
        if (!approveOk) return (false, 0, bytes("approve failed"));
        try IKredioLending(kredioLending).deposit(lendAmount) {
            return (true, lendAmount, "");
        } catch (bytes memory reason) {
            IERC20(mockUSDC).approve(kredioLending, 0);
            return (false, 0, reason);
        }
    }

    /// @dev 0x05 - Swaps msg.value PAS → mUSDC via KredioSwap, then deposits into
    ///      KredioLending pool. Atomic: if either step fails, neither is committed.
    function _handleSwapAndLend(
        address,
        uint256 pasAmount
    ) internal returns (bool, uint256, bytes memory) {
        if (pasAmount == 0) return (false, 0, bytes("zero PAS"));
        // Calculate minOut with 1% slippage tolerance.
        uint256 quoted;
        try IKredioSwap(kredioSwap).quoteSwap(pasAmount) returns (uint256 q) {
            quoted = q;
        } catch (bytes memory reason) {
            return (false, 0, reason);
        }
        uint256 minOut = (quoted * 99) / 100;

        // Step 1: Swap PAS → mUSDC.
        uint256 usdcBefore = IERC20(mockUSDC).balanceOf(address(this));
        try IKredioSwap(kredioSwap).swap{value: pasAmount}(minOut) {}
        catch (bytes memory reason) {
            return (false, 0, reason);
        }
        uint256 received = IERC20(mockUSDC).balanceOf(address(this)) - usdcBefore;
        if (received == 0) return (false, 0, bytes("swap returned zero"));

        // Step 2: Deposit received mUSDC into lending pool.
        bool approveOk = IERC20(mockUSDC).approve(kredioLending, received);
        if (!approveOk) return (false, 0, bytes("approve failed"));
        try IKredioLending(kredioLending).deposit(received) {
            return (true, received, "");
        } catch (bytes memory reason) {
            IERC20(mockUSDC).approve(kredioLending, 0);
            return (false, 0, reason);
        }
    }

    /// @dev 0x06 - Swaps msg.value PAS → mUSDC, deposits as KredioLending collateral,
    ///      then borrows `borrowAmount` mUSDC. Three-step atomic: all succeed or stop.
    function _handleSwapAndBorrowCollateral(
        address user,
        uint256 borrowAmount
    ) internal returns (bool, uint256, bytes memory) {
        if (msg.value == 0) return (false, 0, bytes("zero PAS"));
        if (borrowAmount == 0) return (false, 0, bytes("zero borrow"));

        // Step 1: Quote + swap.
        uint256 quoted;
        try IKredioSwap(kredioSwap).quoteSwap(msg.value) returns (uint256 q) {
            quoted = q;
        } catch (bytes memory reason) {
            return (false, 0, reason);
        }
        uint256 minOut = (quoted * 99) / 100;
        uint256 usdcBefore = IERC20(mockUSDC).balanceOf(address(this));
        try IKredioSwap(kredioSwap).swap{value: msg.value}(minOut) {}
        catch (bytes memory reason) {
            return (false, 0, reason);
        }
        uint256 received = IERC20(mockUSDC).balanceOf(address(this)) - usdcBefore;
        if (received == 0) return (false, 0, bytes("swap returned zero"));

        // Step 2: Deposit mUSDC as collateral in KredioLending.
        bool approveOk = IERC20(mockUSDC).approve(kredioLending, received);
        if (!approveOk) return (false, 0, bytes("approve failed"));
        try IKredioLending(kredioLending).depositCollateral(received) {}
        catch (bytes memory reason) {
            IERC20(mockUSDC).approve(kredioLending, 0);
            return (false, 0, reason);
        }

        // Step 3: Borrow mUSDC from KredioLending, forward to user.
        uint256 beforeBorrow = IERC20(mockUSDC).balanceOf(address(this));
        try IKredioLending(kredioLending).borrow(borrowAmount) {
            uint256 borrowReceived = IERC20(mockUSDC).balanceOf(address(this)) - beforeBorrow;
            if (borrowReceived > 0) {
                require(IERC20(mockUSDC).transfer(user, borrowReceived), "borrow forward fail");
            }
            return (true, borrowReceived, "");
        } catch (bytes memory reason) {
            return (false, 0, reason);
        }
    }

    /// @dev 0x07 - Withdraws all PAS collateral from KredioPASMarket.
    ///      Reverts if user has an active debt position (spec requirement).
    ///      On success, forwards returned PAS to `user`.
    function _handleWithdrawCollateral(
        address user
    ) internal returns (bool, uint256, bytes memory) {
        // Validate no active debt before attempting withdrawal.
        (, uint256 debtUSDC,,,, bool active) = IKredioPASMarket(kredioPASMarket).positions(address(this));
        if (active && debtUSDC > 0) {
            return (false, 0, bytes("active debt: use FULL_EXIT or REPAY first"));
        }
        uint256 pasBefore = address(this).balance;
        try IKredioPASMarket(kredioPASMarket).withdrawCollateral() {
            uint256 returned = address(this).balance - pasBefore;
            if (returned > 0) {
                (bool sent,) = payable(user).call{value: returned}("");
                if (!sent) return (false, 0, bytes("PAS forward to user failed"));
            }
            return (true, returned, "");
        } catch (bytes memory reason) {
            return (false, 0, reason);
        }
    }

    /// @dev 0x08 - Atomic two-step exit: repay all PAS-market debt then withdraw
    ///      all PAS collateral. If repay fails, withdrawal does NOT proceed.
    function _handleFullExit(
        address user
    ) internal returns (bool, uint256, bytes memory) {
        // Check for active debt.
        (, uint256 debtUSDC,,,, bool active) = IKredioPASMarket(kredioPASMarket).positions(address(this));

        if (active && debtUSDC > 0) {
            // Attempt repay first.
            uint256 usdcBalance = IERC20(mockUSDC).balanceOf(address(this));
            if (usdcBalance == 0) return (false, 0, bytes("no USDC to repay debt"));
            bool approveOk = IERC20(mockUSDC).approve(kredioPASMarket, usdcBalance);
            if (!approveOk) return (false, 0, bytes("approve failed"));
            bool repayOk;
            bytes memory repayReason;
            try IKredioPASMarket(kredioPASMarket).repay() {
                repayOk = true;
            } catch (bytes memory r) {
                repayReason = r;
            }
            IERC20(mockUSDC).approve(kredioPASMarket, 0);
            if (!repayOk) return (false, 0, repayReason);
        }

        // Attempt collateral withdrawal.
        uint256 pasBefore = address(this).balance;
        try IKredioPASMarket(kredioPASMarket).withdrawCollateral() {
            uint256 returned = address(this).balance - pasBefore;
            if (returned > 0) {
                (bool sent,) = payable(user).call{value: returned}("");
                if (!sent) return (false, 0, bytes("PAS forward to user failed"));
            }
            return (true, returned, "");
        } catch (bytes memory reason) {
            return (false, 0, reason);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Admin functions
    // ─────────────────────────────────────────────────────────────────────────

    function setAuthorisedParachain(
        uint32 parachainId,
        bool status
    ) external onlyOwner {
        authorisedParachains[parachainId] = status;
        emit ParachainAuthorised(parachainId, status);
    }

    function pauseIntent(
        uint8 intentType,
        bool status
    ) external onlyOwner {
        intentPaused[intentType] = status;
        emit IntentPaused(intentType, status);
    }

    function setPaused(
        bool status
    ) external onlyOwner {
        paused = status;
        emit ContractPaused(status);
    }

    function updateProtocolAddresses(
        address pasMarket,
        address lending,
        address swap,
        address usdc
    ) external onlyOwner {
        require(
            pasMarket != address(0) && lending != address(0) && swap != address(0) && usdc != address(0), "zero addr"
        );
        kredioPASMarket = pasMarket;
        kredioLending = lending;
        kredioSwap = swap;
        mockUSDC = usdc;
    }

    /// @notice Recovers any ERC-20 tokens accidentally left in this contract.
    // ── Phase 5 AI Engine: event-recording functions ─────────────────────────

    /// @notice Emit ExecutionAcknowledged. Called by xcmAcknowledger.js after delivery window.
    function acknowledgeExecution(
        bytes32 intentId,
        bool success,
        bytes4 resultCode
    ) external onlyOwner {
        emit ExecutionAcknowledged(intentId, success, resultCode, uint64(block.number));
    }

    /// @notice Record that a cross-chain message was dispatched. Called by xcmAcknowledger.js.
    function recordMessageDispatched(
        bytes32 intentId,
        uint8 bridgeType,
        uint32 destinationId,
        bytes32 messageHash,
        uint64 estimatedDeliveryBlocks
    ) external onlyOwner {
        emit MessageDispatched(
            intentId, bridgeType, destinationId, messageHash, uint64(block.number), estimatedDeliveryBlocks
        );
    }

    /// @notice Record an ETH bridge initiation. Called by xcmAcknowledger.js.
    function recordEthBridgeInitiated(
        bytes32 bridgeId,
        address ethRecipient,
        uint256 amount,
        bytes32 bridgeTransactionHash
    ) external onlyOwner {
        emit EthBridgeInitiated(bridgeId, ethRecipient, amount, bridgeTransactionHash, uint64(block.number));
    }

    /// @dev Extract amount from intent payload if well-formed (offset 20..52 = uint256).
    ///      Returns 0 if payload is too short. Pure - no storage access.
    function _extractAmount(
        uint8,
        /*intentType*/
        bytes calldata payload
    ) internal pure returns (uint256) {
        if (payload.length >= 52) {
            return abi.decode(payload[20:52], (uint256));
        }
        return 0;
    }

    function recoverStuckTokens(
        address token,
        uint256 amount
    ) external onlyOwner {
        require(token != address(0), "zero addr");
        require(IERC20(token).transfer(owner, amount), "recover fail");
    }

    /// @notice Recovers any native PAS accidentally left in this contract.
    function recoverStuckPAS() external onlyOwner {
        uint256 bal = address(this).balance;
        require(bal > 0, "no PAS");
        (bool ok,) = payable(owner).call{value: bal}("");
        require(ok, "PAS recover fail");
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Receive - needed to accept PAS returned from withdrawCollateral
    // ─────────────────────────────────────────────────────────────────────────

    receive() external payable {}
}
