// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

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
    function approve(
        address spender,
        uint256 amount
    ) external returns (bool);
}

interface IYieldPool {
    function deposit(
        uint256 amount
    ) external;
    function withdraw(
        address to,
        uint256 amount
    ) external;
    function claimYield(
        address to
    ) external returns (uint256);
    function pendingYield(
        address who
    ) external view returns (uint256);
}

interface IKreditAgent {
    // Interfaces are kept for clarity; calls use SCALE shim via low-level call.
    function compute_score(
        uint64 repayments,
        uint64 liquidations,
        uint64 deposit_tier,
        uint64 blocks_since_first
    ) external view returns (uint64);
    function collateral_ratio(
        uint64 score
    ) external view returns (uint64);
    function interest_rate(
        uint64 score
    ) external view returns (uint64);
    function tier(
        uint64 score
    ) external view returns (uint8);
}

contract KredioLending is ReentrancyGuard {
    address public admin;

    // External dependencies
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

    // ── Intelligent yield strategy ──────────────────────────────────────────
    IYieldPool public yieldPool; // MockYieldPool address
    uint256 public investedAmount; // mUSDC currently deployed externally
    uint256 public totalStrategyYieldEarned; // lifetime cumulative yield injected

    // Strategy config (all admin-settable)
    uint256 public investRatioBps = 5000; // invest 50% of idle capital
    uint256 public minBufferBps = 2000; // always keep 20% of deposits liquid

    // Lender mappings
    mapping(address => uint256) public depositBalance;
    mapping(address => uint256) public yieldDebt;

    // Borrower mappings
    mapping(address => uint256) public collateralBalance;
    mapping(address => uint64) public repaymentCount;
    mapping(address => uint64) public liquidationCount;
    mapping(address => Position) public positions;
    mapping(address => uint256) public demoRateMultiplier; // Optional per-borrower rate boost for demoing liquidations

    /// @notice Global interest tick multiplier applied to ALL positions (0 = disabled = 1x).
    /// @dev 525600 ≈ one year per second; 60 ≈ one minute of interest per second.
    uint256 public globalTick;

    // Credit score inputs
    mapping(address => uint256) public totalDepositedEver; // cumulative lifetime deposits (never decrements)
    mapping(address => uint256) public firstSeenBlock; // block of first deposit(), never updated after

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
        uint64 depositTier,
        uint64 repayments,
        uint64 liquidations
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
    event GlobalTickSet(uint256 tick);
    event UserScoreReset(address indexed user);
    event PoolTicked(uint256 totalInterestDistributed);
    event HardReset(address indexed to, uint256 usdcSwept);

    // Strategy events
    event YieldPoolSet(address indexed pool);
    event FundsInvested(uint256 amount, uint256 totalInvested);
    event FundsPulledBack(uint256 amount, uint256 totalInvested);
    event ExternalYieldInjected(uint256 amount, uint256 totalStrategyYieldEarned);
    event StrategyParamsUpdated(uint256 investRatioBps, uint256 minBufferBps);

    // Convenience getters for checklist tooling
    function getAgent() external view returns (address) {
        return kreditAgent;
    }

    function getUsdc() external view returns (address) {
        return address(usdc);
    }

    // ── Strategy view helpers ──────────────────────────────────────────────

    /// @notice Pending yield sitting in the yield pool waiting to be claimed.
    function pendingStrategyYield() external view returns (uint256) {
        if (address(yieldPool) == address(0)) return 0;
        return yieldPool.pendingYield(address(this));
    }

    /// @notice Full strategy status in one call (for frontend + backend monitor).
    function strategyStatus()
        external
        view
        returns (
            address pool,
            uint256 invested,
            uint256 totalEarned,
            uint256 pendingYield_,
            uint256 investRatio_,
            uint256 minBuffer_
        )
    {
        return (
            address(yieldPool),
            investedAmount,
            totalStrategyYieldEarned,
            address(yieldPool) != address(0) ? yieldPool.pendingYield(address(this)) : 0,
            investRatioBps,
            minBufferBps
        );
    }

    // ── Strategy admin functions ───────────────────────────────────────────

    /// @notice Wire the yield pool. One-time setup after deploying MockYieldPool.
    function adminSetYieldPool(
        address pool
    ) external onlyAdmin {
        require(pool != address(0), "zero addr");
        yieldPool = IYieldPool(pool);
        emit YieldPoolSet(pool);
    }

    /// @notice Deploy idle capital to the yield pool.
    /// @dev Enforces min-buffer: 20% of totalDeposited must remain liquid after invest.
    function adminInvest(
        uint256 amount
    ) external onlyAdmin nonReentrant {
        require(address(yieldPool) != address(0), "no pool");
        require(amount > 0, "zero amt");

        uint256 idle = totalDeposited > totalBorrowed ? totalDeposited - totalBorrowed : 0;
        uint256 curLiquid = idle > investedAmount ? idle - investedAmount : 0;
        require(curLiquid >= amount, "not enough liquid capital");

        uint256 liquidAfter = curLiquid - amount;
        uint256 minBuffer = (totalDeposited * minBufferBps) / BPS_DIVISOR;
        require(liquidAfter >= minBuffer, "would breach min buffer");

        investedAmount += amount;
        require(usdc.approve(address(yieldPool), amount), "approve fail");
        yieldPool.deposit(amount);
        emit FundsInvested(amount, investedAmount);
    }

    /// @notice Pull principal back from yield pool to this contract.
    /// @dev Yield accumulated in the pool is NOT claimed here — call adminClaimAndInjectYield separately.
    function adminPullBack(
        uint256 amount
    ) external onlyAdmin nonReentrant {
        require(address(yieldPool) != address(0), "no pool");
        require(amount > 0, "zero amt");
        require(investedAmount >= amount, "exceeds invested");
        investedAmount -= amount;
        yieldPool.withdraw(address(this), amount);
        emit FundsPulledBack(amount, investedAmount);
    }

    /// @notice Claim yield from pool and distribute it to lenders via accYieldPerShare.
    /// @dev Yield is minted directly into this contract by MockYieldPool.claimYield(),
    ///      then flows through _distributeInterest so all lenders earn their pro-rata share.
    function adminClaimAndInjectYield() external onlyAdmin nonReentrant {
        require(address(yieldPool) != address(0), "no pool");
        uint256 amount = yieldPool.claimYield(address(this));
        require(amount > 0, "no yield"); // should not happen but guard against it
        _distributeInterest(amount);
        totalStrategyYieldEarned += amount;
        emit ExternalYieldInjected(amount, totalStrategyYieldEarned);
    }

    /// @notice Tune strategy parameters.
    function adminSetStrategyParams(
        uint256 _investRatioBps,
        uint256 _minBufferBps
    ) external onlyAdmin {
        require(_investRatioBps <= 7000, "max 70%");
        require(_minBufferBps >= 1000 && _minBufferBps <= 5000, "buffer 10%-50%");
        investRatioBps = _investRatioBps;
        minBufferBps = _minBufferBps;
        emit StrategyParamsUpdated(_investRatioBps, _minBufferBps);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "not admin");
        _;
    }

    constructor(
        address _usdc,
        address _kreditAgent
    ) {
        require(_usdc != address(0) && _kreditAgent != address(0), "zero addr");
        admin = msg.sender;
        usdc = IMockUSDC(_usdc);
        kreditAgent = _kreditAgent;
    }

    // -------- TIER 1: Core Lending --------

    /// getScore(address) -> (score, tier, collateralRatioBps, interestRateBps)
    function getScore(
        address user
    ) public view returns (uint64, uint8, uint32, uint32) {
        uint64 depositTier = _depositTier(user);
        uint64 repayments = repaymentCount[user];
        uint64 liquidations = liquidationCount[user];
        uint64 blocksSinceFirst = firstSeenBlock[user] > 0 ? uint64(block.number - firstSeenBlock[user]) : 0;

        uint64 score = _callAgent4(SEL_COMPUTE_SCORE, repayments, liquidations, depositTier, blocksSinceFirst);

        uint64 ratio = _callAgent1(SEL_COLLATERAL_RATIO, score);
        uint64 rate = _callAgent1(SEL_INTEREST_RATE, score);
        uint8 userTier = _callAgent1U8(SEL_TIER, score);

        return (score, userTier, uint32(ratio), uint32(rate));
    }

    function deposit(
        uint256 amount
    ) external nonReentrant {
        require(amount > 0, "zero amt");
        if (firstSeenBlock[msg.sender] == 0) {
            firstSeenBlock[msg.sender] = block.number;
        }
        totalDepositedEver[msg.sender] += amount;
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

        // Auto-pull from yield pool if the liquid lending balance is short.
        // Computed BEFORE decrementing totalDeposited so the math is correct.
        _ensureLiquidity(amount);

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

        // Total capacity check (ignores where the capital physically is).
        uint256 idle = totalDeposited > totalBorrowed ? totalDeposited - totalBorrowed : 0;
        require(idle >= borrowAmount, "insufficient liquidity");

        // Auto-pull invested capital if needed so the borrow can proceed.
        _ensureLiquidity(borrowAmount);

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
        require(multiplier <= 1_000_000, "max 1M");
        demoRateMultiplier[borrower] = multiplier;
        emit DemoMultiplierSet(borrower, multiplier);
    }

    /// @notice Set global interest tick multiplier for ALL positions simultaneously.
    /// @param tick 0 = disabled (1x normal), N = Nx accelerated. 60 = 1 sec equals 1 min of interest.
    function adminSetGlobalTick(
        uint256 tick
    ) external onlyAdmin {
        require(tick <= 1_000_000, "max 1M");
        globalTick = tick;
        emit GlobalTickSet(tick);
    }

    /// @notice Reset a single user's credit score history.
    function adminResetUserScore(
        address user
    ) external onlyAdmin {
        repaymentCount[user] = 0;
        liquidationCount[user] = 0;
        firstSeenBlock[user] = 0;
        totalDepositedEver[user] = 0;
        demoRateMultiplier[user] = 0;
        emit UserScoreReset(user);
    }

    /// @notice Batch-reset credit score history for multiple users.
    function adminResetUserScores(
        address[] calldata users
    ) external onlyAdmin {
        for (uint256 i = 0; i < users.length; i++) {
            repaymentCount[users[i]] = 0;
            liquidationCount[users[i]] = 0;
            firstSeenBlock[users[i]] = 0;
            totalDepositedEver[users[i]] = 0;
            demoRateMultiplier[users[i]] = 0;
            emit UserScoreReset(users[i]);
        }
    }

    /// @notice Batch force-close positions and return USDC collateral. Absorbs unpaid debt.
    function adminForceCloseAll(
        address[] calldata users
    ) external onlyAdmin nonReentrant {
        for (uint256 i = 0; i < users.length; i++) {
            address user = users[i];
            Position storage p = positions[user];
            uint256 collateralToReturn = 0;

            if (p.active) {
                if (p.debt <= totalBorrowed) totalBorrowed -= p.debt;
                else totalBorrowed = 0;
                collateralToReturn += p.collateral;
                delete positions[user];
            }

            uint256 pendingCollateral = collateralBalance[user];
            if (pendingCollateral > 0) {
                collateralBalance[user] = 0;
                collateralToReturn += pendingCollateral;
            }

            if (collateralToReturn > 0) {
                require(usdc.transfer(user, collateralToReturn), "bulk force-close fail");
            }
            emit CollateralWithdrawn(user, collateralToReturn);
        }
    }

    /// @notice Force-withdraw deposits for a batch of lenders without the normal liquidity check.
    /// @dev Call after adminForceCloseAll so totalBorrowed = 0. Absorbs any yield shortfall.
    function adminBulkWithdrawDeposits(
        address[] calldata depositors
    ) external onlyAdmin nonReentrant {
        for (uint256 i = 0; i < depositors.length; i++) {
            address depositor = depositors[i];
            uint256 amount = depositBalance[depositor];
            if (amount == 0) continue;
            depositBalance[depositor] = 0;
            yieldDebt[depositor] = 0;
            if (totalDeposited >= amount) totalDeposited -= amount;
            else totalDeposited = 0;
            require(usdc.transfer(depositor, amount), "bulk withdraw fail");
            emit Withdrawn(depositor, amount);
        }
    }

    /// @notice Force-accrue interest for borrowers and immediately distribute it as yield to lenders.
    /// @dev Capitalises accrued interest into the borrower's principal and resets their clock.
    ///      This lets lenders see real-time yield growth without waiting for borrower repayments.
    function adminTickPool(
        address[] calldata borrowers
    ) external onlyAdmin nonReentrant {
        uint256 totalInterest = 0;
        for (uint256 i = 0; i < borrowers.length; i++) {
            Position storage p = positions[borrowers[i]];
            if (!p.active) continue;
            uint256 interest = _accruedInterest(borrowers[i], p);
            if (interest == 0) continue;
            p.debt += interest;
            p.openedAt = block.timestamp;
            totalBorrowed += interest;
            _distributeInterest(interest);
            totalInterest += interest;
        }
        emit PoolTicked(totalInterest);
    }

    /// @notice Nuclear reset: zero all pool accounting and sweep all USDC to admin.
    /// @dev ALL user deposits are sent to `to`. For testnet fresh-start resets only.
    function adminHardReset(
        address to
    ) external onlyAdmin nonReentrant {
        require(to != address(0), "zero addr");
        totalBorrowed = 0;
        totalDeposited = 0;
        accYieldPerShare = 0;
        protocolFees = 0;
        globalTick = 0;
        investedAmount = 0;
        uint256 bal = usdc.balanceOf(address(this));
        if (bal > 0) require(usdc.transfer(to, bal), "sweep fail");
        emit HardReset(to, bal);
    }

    // ── TIER 2: Risk Management ────────────────────────────────────────────

    // ── Internal helpers ──────────────────────────────────────────────────

    /// @dev Pulls `amount` mUSDC back from yield pool if the current liquid
    ///      lending balance would be insufficient.  Called from withdraw() and
    ///      borrow() so those functions don't accumulate extra stack variables.
    function _ensureLiquidity(
        uint256 amount
    ) internal {
        if (address(yieldPool) == address(0) || investedAmount == 0) return;
        uint256 idle = totalDeposited > totalBorrowed ? totalDeposited - totalBorrowed : 0;
        uint256 lendingLiquid = idle > investedAmount ? idle - investedAmount : 0;
        if (lendingLiquid < amount) {
            uint256 deficit = amount - lendingLiquid;
            uint256 toPull = deficit > investedAmount ? investedAmount : deficit;
            investedAmount -= toPull;
            yieldPool.withdraw(address(this), toPull);
            emit FundsPulledBack(toPull, investedAmount);
        }
    }

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

    function _callAgent4(
        bytes4 selector,
        uint64 a,
        uint64 b,
        uint64 c,
        uint64 d
    ) internal view returns (uint64) {
        bytes memory input = abi.encodePacked(selector, _le64(a), _le64(b), _le64(c), _le64(d));
        (bool ok, bytes memory data) = kreditAgent.staticcall(input);
        require(ok && data.length >= 9 && data[0] == 0x00, "agent4 fail");
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
        liquidationCount[borrower] += 1;

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

    function _depositTier(
        address user
    ) internal view returns (uint64) {
        uint256 d = totalDepositedEver[user];
        if (d >= 100_000_000_000) return 7;
        if (d >= 75_000_000_000) return 6;
        if (d >= 55_000_000_000) return 5;
        if (d >= 35_000_000_000) return 4;
        if (d >= 20_000_000_000) return 3;
        if (d >= 10_000_000_000) return 2;
        if (d >= 5_000_000_000) return 1;
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

    function _effectiveMultiplier(
        address borrower
    ) internal view returns (uint256) {
        uint256 userM = demoRateMultiplier[borrower];
        uint256 effM = globalTick > userM ? globalTick : userM;
        return effM == 0 ? 1 : effM;
    }

    function _accruedInterest(
        address borrower,
        Position storage p
    ) internal view returns (uint256) {
        if (!p.active) return 0;
        uint256 elapsed = block.timestamp - p.openedAt;
        uint256 rate = uint256(p.interestBps) * _effectiveMultiplier(borrower);
        return (p.debt * rate * elapsed) / (BPS_DIVISOR * 365 days);
    }

    function _accruedInterestValue(
        address borrower,
        Position memory p
    ) internal view returns (uint256) {
        if (!p.active) return 0;
        uint256 elapsed = block.timestamp - p.openedAt;
        uint256 rate = uint256(p.interestBps) * _effectiveMultiplier(borrower);
        return (p.debt * rate * elapsed) / (BPS_DIVISOR * 365 days);
    }
}
