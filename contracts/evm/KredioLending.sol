// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IGovernanceCache} from "./interfaces/IGovernanceCache.sol";

interface IMockUSDC {
    function balanceOf(
        address user
    ) external view returns (uint256);
    function transfer(
        address to,
        uint256 amount
    ) external returns (bool);
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

interface IKreditAgent {
    // Interfaces are kept for clarity; calls use SCALE shim via low-level call.
    function compute_score(
        uint64,
        uint64,
        uint64,
        uint64,
        uint64
    ) external view returns (uint64);
    function collateral_ratio(
        uint64
    ) external view returns (uint64);
    function interest_rate(
        uint64
    ) external view returns (uint64);
    function tier(
        uint64
    ) external view returns (uint8);
    function reasoning(
        uint64,
        uint64,
        uint64,
        uint64,
        uint64
    ) external view returns (bytes32);
}

contract KredioLending is ReentrancyGuard {
    address public admin;

    // External dependencies
    IGovernanceCache public govCache;
    IMockUSDC public usdc;
    address public kreditAgent;

    // Agent selectors (from Phase 1 build)
    bytes4 internal constant SEL_COMPUTE_SCORE = 0x3a518c00;
    bytes4 internal constant SEL_COLLATERAL_RATIO = 0xa70eec89;
    bytes4 internal constant SEL_INTEREST_RATE = 0xb8dc60f2;
    bytes4 internal constant SEL_TIER = 0x2b2bb477;

    uint256 internal constant ACC_PRECISION = 1e12;
    uint256 internal constant PROTOCOL_FEE_BPS = 1000; // 10% of interest to protocol
    uint256 internal constant BPS_DIVISOR = 10_000;

    // Pool accounting
    uint256 public totalDeposited;
    uint256 public totalBorrowed;
    uint256 public accYieldPerShare;
    uint256 public protocolFees;

    // Lender mappings
    mapping(address => uint256) public depositBalance;
    mapping(address => uint256) public yieldDebt;

    // Borrower mappings
    mapping(address => uint256) public collateralBalance;
    mapping(address => uint64) public repaymentCount;
    mapping(address => uint64) public defaultCount;
    mapping(address => Position) public positions;
    mapping(address => uint256) public demoRateMultiplier; // Optional per-borrower rate boost for demoing liquidations

    struct Position {
        uint256 collateral;
        uint256 debt;
        uint256 openedAt;
        uint32 interestBps;
        uint32 collateralRatioBps;
        uint8 tier;
        bool active;
    }

    // Events
    event ScoreComputed(
        address indexed user,
        uint64 totalScore,
        uint8 tier,
        uint32 collateralRatioBps,
        uint32 interestRateBps,
        uint64 balanceTier,
        uint64 govVotes,
        uint64 repayments
    );
    event CollateralDeposited(address indexed user, uint256 amount);
    event Borrowed(address indexed user, uint256 amount, uint8 tier, uint32 ratioBps);
    event Repaid(address indexed user, uint256 principal, uint256 interest);
    event Liquidated(address indexed borrower, address indexed liquidator);
    event ReserveAdded(uint256 amount);
    event CollateralWithdrawn(address indexed user, uint256 amount);
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event YieldHarvested(address indexed lender, uint256 amount);
    event FeeSwept(address indexed to, uint256 amount);
    event DemoMultiplierSet(address indexed borrower, uint256 multiplier);

    // Convenience getters for checklist tooling
    function getAgent() external view returns (address) {
        return kreditAgent;
    }

    function getUsdc() external view returns (address) {
        return address(usdc);
    }

    function getGovCache() external view returns (address) {
        return address(govCache);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "not admin");
        _;
    }

    constructor(
        address _govCache,
        address _usdc,
        address _kreditAgent
    ) {
        require(_govCache != address(0) && _usdc != address(0) && _kreditAgent != address(0), "zero addr");
        admin = msg.sender;
        govCache = IGovernanceCache(_govCache);
        usdc = IMockUSDC(_usdc);
        kreditAgent = _kreditAgent;
    }

    // -------- TIER 1: Core Lending --------

    /// getScore(address) -> (score, tier, collateralRatioBps, interestRateBps)
    function getScore(
        address user
    ) public view returns (uint64, uint8, uint32, uint32) {
        uint64 balanceTier = _balanceTier(user);
        (uint64 votes, uint8 conviction,) = govCache.getGovernanceData(user);
        uint64 repayments = repaymentCount[user];
        uint64 defaults = defaultCount[user];

        uint64 score = _callAgent5(SEL_COMPUTE_SCORE, balanceTier, votes, uint64(conviction), repayments, defaults);

        uint64 ratio = _callAgent1(SEL_COLLATERAL_RATIO, score);
        uint64 rate = _callAgent1(SEL_INTEREST_RATE, score);
        uint8 userTier = _callAgent1U8(SEL_TIER, score);

        return (score, userTier, uint32(ratio), uint32(rate));
    }

    function deposit(
        uint256 amount
    ) external nonReentrant {
        require(amount > 0, "zero amt");
        _harvest(msg.sender);
        depositBalance[msg.sender] += amount;
        totalDeposited += amount;
        yieldDebt[msg.sender] = (depositBalance[msg.sender] * accYieldPerShare) / ACC_PRECISION;
        require(usdc.transferFrom(msg.sender, address(this), amount), "transfer fail");
        emit Deposited(msg.sender, amount);
    }

    function pendingYield(
        address user
    ) public view returns (uint256) {
        uint256 userBalance = depositBalance[user];
        if (userBalance == 0) return 0;
        uint256 accrued = (userBalance * accYieldPerShare) / ACC_PRECISION;
        if (accrued < yieldDebt[user]) {
            return 0;
        }
        return accrued - yieldDebt[user];
    }

    function withdraw(
        uint256 amount
    ) external nonReentrant {
        require(amount > 0, "zero amt");
        require(depositBalance[msg.sender] >= amount, "insufficient");
        _harvest(msg.sender);
        depositBalance[msg.sender] -= amount;
        totalDeposited -= amount;
        yieldDebt[msg.sender] = (depositBalance[msg.sender] * accYieldPerShare) / ACC_PRECISION;
        require(usdc.transfer(msg.sender, amount), "transfer fail");
        emit Withdrawn(msg.sender, amount);
    }

    function pendingYieldAndHarvest(
        address user
    ) external nonReentrant {
        _harvest(user);
    }

    function depositCollateral(
        uint256 amount
    ) external nonReentrant {
        require(amount > 0, "zero amt");
        require(usdc.transferFrom(msg.sender, address(this), amount), "transfer fail");
        collateralBalance[msg.sender] += amount;
        emit CollateralDeposited(msg.sender, amount);
    }

    function fundReserve(
        uint256 amount
    ) external onlyAdmin nonReentrant {
        require(amount > 0, "zero amt");
        require(usdc.transferFrom(msg.sender, address(this), amount), "transfer fail");
        emit ReserveAdded(amount);
    }

    function borrow(
        uint256 borrowAmount
    ) external nonReentrant {
        require(borrowAmount > 0, "zero borrow");
        Position storage p = positions[msg.sender];
        require(!p.active, "active position");
        uint256 userCollateral = collateralBalance[msg.sender];
        require(userCollateral > 0, "no collateral");

        (, uint8 userTier, uint32 ratioBps, uint32 rateBps) = getScore(msg.sender);
        uint256 maxBorrow = (userCollateral * BPS_DIVISOR) / ratioBps;
        require(borrowAmount <= maxBorrow, "exceeds ratio");

        uint256 available = totalDeposited > totalBorrowed ? totalDeposited - totalBorrowed : 0;
        require(available >= borrowAmount, "insufficient liquidity");
        require(usdc.transfer(msg.sender, borrowAmount), "transfer fail");

        p.collateral = userCollateral;
        p.debt = borrowAmount;
        p.openedAt = block.timestamp;
        p.interestBps = rateBps;
        p.collateralRatioBps = ratioBps;
        p.tier = userTier;
        p.active = true;

        collateralBalance[msg.sender] = 0;
        totalBorrowed += borrowAmount;

        emit Borrowed(msg.sender, borrowAmount, userTier, ratioBps);
    }

    function repay() external nonReentrant {
        Position storage p = positions[msg.sender];
        require(p.active, "no position");

        uint256 interest = _accruedInterest(msg.sender, p);
        uint256 totalOwed = p.debt + interest;

        require(usdc.transferFrom(msg.sender, address(this), totalOwed), "transfer fail");

        _distributeInterest(interest);

        totalBorrowed -= p.debt;
        repaymentCount[msg.sender] += 1;

        uint256 collateralToReturn = p.collateral;
        delete positions[msg.sender];

        require(usdc.transfer(msg.sender, collateralToReturn), "collateral transfer fail");
        collateralBalance[msg.sender] = 0;

        emit Repaid(msg.sender, totalOwed - interest, interest);
    }

    function utilizationRate() public view returns (uint256) {
        if (totalDeposited == 0) return 0;
        return (totalBorrowed * BPS_DIVISOR) / totalDeposited;
    }

    function sweepProtocolFees(
        address to
    ) external onlyAdmin nonReentrant {
        require(to != address(0), "zero to");
        uint256 amount = protocolFees;
        protocolFees = 0;
        require(usdc.transfer(to, amount), "transfer fail");
        emit FeeSwept(to, amount);
    }

    /// View helper: accrued interest for an open position
    function accruedInterest(
        address borrower
    ) external view returns (uint256) {
        Position memory pos = positions[borrower];
        if (!pos.active) return 0;
        return _accruedInterestValue(borrower, pos);
    }

    /// View helper: health ratio in basis points; max uint256 if inactive.
    function healthRatio(
        address borrower
    ) external view returns (uint256) {
        Position memory pos = positions[borrower];
        if (!pos.active || pos.debt == 0) return type(uint256).max;
        uint256 owed = pos.debt + _accruedInterestValue(borrower, pos);
        return (pos.collateral * BPS_DIVISOR) / owed;
    }

    /// View helper: full position plus accrued interest in one call.
    function getPositionFull(
        address borrower
    ) external view returns (uint256, uint256, uint256, uint256, uint32, uint8, bool) {
        Position memory pos = positions[borrower];
        uint256 accrued = pos.active ? _accruedInterestValue(borrower, pos) : 0;
        uint256 totalOwed = pos.debt + accrued;
        return (pos.collateral, pos.debt, accrued, totalOwed, pos.interestBps, pos.tier, pos.active);
    }

    function setDemoMultiplier(
        address borrower,
        uint256 multiplier
    ) external onlyAdmin {
        require(multiplier <= 1000, "max 1000x");
        demoRateMultiplier[borrower] = multiplier;
        emit DemoMultiplierSet(borrower, multiplier);
    }

    // -------- TIER 2: Risk Management --------

    function liquidate(
        address borrower
    ) external nonReentrant {
        _liquidate(borrower, false);
    }

    function adminLiquidate(
        address borrower
    ) external onlyAdmin nonReentrant {
        _liquidate(borrower, true);
    }

    /// @notice Force-close a position and any pending collateral without debt repayment.
    /// @dev For testnet / demo resets only. Absorbs outstanding debt as a protocol loss.
    function adminForceClose(
        address user
    ) external onlyAdmin nonReentrant {
        Position storage p = positions[user];
        uint256 collateralToReturn = p.active ? p.collateral : 0;
        uint256 pendingCollateral = collateralBalance[user];

        if (p.active) {
            if (p.debt <= totalBorrowed) totalBorrowed -= p.debt;
            else totalBorrowed = 0;
            delete positions[user];
        }
        if (pendingCollateral > 0) {
            collateralBalance[user] = 0;
            collateralToReturn += pendingCollateral;
        }
        if (collateralToReturn > 0) {
            require(usdc.transfer(user, collateralToReturn), "force-close return fail");
        }
        emit CollateralWithdrawn(user, collateralToReturn);
    }

    // SCALE shim: [4-byte selector][LE u64 per arg] → [0x00][LE u64 result]
    function _callAgent1(
        bytes4 selector,
        uint64 a
    ) internal view returns (uint64) {
        bytes memory input = abi.encodePacked(selector, _le64(a));
        (bool ok, bytes memory data) = kreditAgent.staticcall(input);
        require(ok && data.length >= 9 && data[0] == 0x00, "agent1 fail");
        return _fromLE64(data, 1);
    }

    function _callAgent1U8(
        bytes4 selector,
        uint64 a
    ) internal view returns (uint8) {
        bytes memory input = abi.encodePacked(selector, _le64(a));
        (bool ok, bytes memory data) = kreditAgent.staticcall(input);
        require(ok && data.length >= 2 && data[0] == 0x00, "agent1 fail");
        return uint8(data[1]);
    }

    function _callAgent5(
        bytes4 selector,
        uint64 a,
        uint64 b,
        uint64 c,
        uint64 d,
        uint64 e
    ) internal view returns (uint64) {
        bytes memory input = abi.encodePacked(selector, _le64(a), _le64(b), _le64(c), _le64(d), _le64(e));
        (bool ok, bytes memory data) = kreditAgent.staticcall(input);
        require(ok && data.length >= 9 && data[0] == 0x00, "agent5 fail");
        return _fromLE64(data, 1);
    }

    function _harvest(
        address user
    ) internal {
        uint256 pending = pendingYield(user);
        yieldDebt[user] = (depositBalance[user] * accYieldPerShare) / ACC_PRECISION;
        if (pending > 0) {
            require(usdc.transfer(user, pending), "yield transfer fail");
            emit YieldHarvested(user, pending);
        }
    }

    function withdrawCollateral() external nonReentrant {
        Position storage p = positions[msg.sender];
        require(!p.active, "active position");
        uint256 amount = collateralBalance[msg.sender];
        require(amount > 0, "no collateral");

        collateralBalance[msg.sender] = 0;
        require(usdc.transfer(msg.sender, amount), "collateral transfer fail");
        emit CollateralWithdrawn(msg.sender, amount);
    }

    function _liquidate(
        address borrower,
        bool ignoreHealth
    ) internal {
        Position storage p = positions[borrower];
        require(p.active, "no position");

        uint256 interest = _accruedInterest(borrower, p);
        uint256 totalOwed = p.debt + interest;

        if (!ignoreHealth) {
            uint256 health = (p.collateral * BPS_DIVISOR) / totalOwed;
            require(health < p.collateralRatioBps, "healthy");
        }

        require(usdc.transferFrom(msg.sender, address(this), totalOwed), "repay fail");

        _distributeInterest(interest);
        totalBorrowed -= p.debt;
        defaultCount[borrower] += 1;

        uint256 premium = (totalOwed * 10_500) / 10_000;
        uint256 payout = premium <= p.collateral ? premium : p.collateral;
        uint256 refund = p.collateral > payout ? p.collateral - payout : 0;
        delete positions[borrower];

        if (refund > 0) {
            require(usdc.transfer(borrower, refund), "refund fail");
        }
        require(usdc.transfer(msg.sender, payout), "payout fail");

        emit Liquidated(borrower, msg.sender);
    }

    function _le64(
        uint64 v
    ) internal pure returns (bytes8) {
        return bytes8(
            ((v & 0xFF) << 56) | (((v >> 8) & 0xFF) << 48) | (((v >> 16) & 0xFF) << 40) | (((v >> 24) & 0xFF) << 32)
                | (((v >> 32) & 0xFF) << 24) | (((v >> 40) & 0xFF) << 16) | (((v >> 48) & 0xFF) << 8)
                | ((v >> 56) & 0xFF)
        );
    }

    function _fromLE64(
        bytes memory b,
        uint256 o
    ) internal pure returns (uint64 v) {
        for (uint256 i = 0; i < 8; i++) {
            v |= uint64(uint8(b[o + i])) << (i * 8);
        }
    }

    function _balanceTier(
        address user
    ) internal view returns (uint64) {
        uint256 bal = user.balance;
        if (bal >= 10_000 ether) return 4;
        if (bal >= 1000 ether) return 3;
        if (bal >= 100 ether) return 2;
        if (bal >= 10 ether) return 1;
        return 0;
    }

    function _distributeInterest(
        uint256 interest
    ) internal {
        if (interest == 0) return;

        uint256 protocolCut = (interest * PROTOCOL_FEE_BPS) / BPS_DIVISOR;
        protocolFees += protocolCut;
        uint256 toLenders = interest - protocolCut;

        if (toLenders > 0 && totalDeposited > 0) {
            accYieldPerShare += (toLenders * ACC_PRECISION) / totalDeposited;
        } else {
            protocolFees += toLenders;
        }
    }

    function _accruedInterest(
        address borrower,
        Position storage p
    ) internal view returns (uint256) {
        if (!p.active) return 0;
        uint256 elapsed = block.timestamp - p.openedAt;
        uint256 multiplier = demoRateMultiplier[borrower];
        uint256 rate = multiplier > 0 ? p.interestBps * multiplier : p.interestBps;
        return (p.debt * rate * elapsed) / (BPS_DIVISOR * 365 days);
    }

    function _accruedInterestValue(
        address borrower,
        Position memory p
    ) internal view returns (uint256) {
        if (!p.active) return 0;
        uint256 elapsed = block.timestamp - p.openedAt;
        uint256 multiplier = demoRateMultiplier[borrower];
        uint256 rate = multiplier > 0 ? p.interestBps * multiplier : p.interestBps;
        return (p.debt * rate * elapsed) / (BPS_DIVISOR * 365 days);
    }
}
