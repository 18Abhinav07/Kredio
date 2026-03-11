export const metadata = { title: 'Roadmap & Vision | Kredio Docs' };

export default function RoadmapPage() {
    return (
        <div className="animate-in fade-in duration-500">
            <h1>Roadmap &amp; Vision</h1>
            <p className="text-xl text-slate-300 mb-8 border-l-4 border-cyan-500 pl-4">
                What we built, why it compounds, and where it goes from here.
            </p>

            {/* ── The Premise ─────────────────────────────────────────── */}
            <h2 id="premise">The Premise</h2>
            <p>
                DeFi has not solved credit. It has avoided it. Every lending protocol built in the last five years
                operates on the same unstated assumption: that all borrowers are identical, trust no one, and overcollateralise
                the system into functional solvency. This works for processing volume. It works poorly for the actual use
                case of credit - rewarding participants who have demonstrated verifiable financial behaviour over time.
            </p>
            <p>
                On-chain data has always contained enough signal to build a genuine credit layer. Repayment records,
                deposit history, liquidation events, governance participation - all timestamped, all immutable. The
                obstacle is constructing a scoring engine that can consume that data inside a smart contract, return a
                defensible result, and do it without introducing an off-chain trust dependency at the critical step.
            </p>
            <p>
                Polkadot Asset Hub, with its hybrid EVM-plus-Wasm runtime and native XCM, makes this solvable in a
                way it isn&apos;t on any other execution environment. Kredio is the protocol that solves it.
            </p>

            {/* ── What We Built ─────────────────────────────────────────── */}
            <h2 id="intelligence-layer">What We Built: The Intelligence Layer</h2>

            <h3>Dual-Mode Credit Scoring</h3>
            <p>
                Credit scoring at Kredio is intentionally two-part. <code>KreditAgent</code> is an ink! Wasm
                contract that computes a deterministic score from four on-chain inputs - repayment history, deposit
                volume, liquidation record, and account age - and returns a collateral ratio and interest rate via
                a SCALE-encoded cross-VM <code>staticcall</code> from inside the Solidity market contract. The
                score, ratio, and rate are all computed and locked into the position atomically, in the same
                transaction, with no oracle delay and no possibility of front-running.
            </p>
            <p>
                <code>NeuralScorer</code> is the second layer - a PVM contract that runs independently after
                every borrow event and emits a confidence delta on-chain. It catches the gap between the
                deterministic score and the statistical behaviour of the broader borrower pool. A score of 72
                may be mechanically correct but statistically unusual for an address of that age; the NeuralScorer
                surfaces that discrepancy as a permanent event record. Together the two layers produce a score
                that is simultaneously provably derived and continuously audited.
            </p>

            <h3>Forward-Looking Risk Assessment</h3>
            <p>
                Most DeFi protocols check position health at liquidation time. <code>RiskAssessor</code> checks
                it continuously. It estimates the number of blocks before a position would cross the liquidation
                threshold, given current collateral values, the outstanding debt, market volatility, and the
                position&apos;s tier-specific collateral ratio. The result - <code>estimated_blocks_to_liq</code> -
                is emitted on-chain after every scan, forming a per-borrower risk timeline that accumulates
                across the full life of the protocol.
            </p>
            <p>
                This matters for protocol health. A system that only detects liquidation events learns about
                risk after the fact. A system that sees estimated blocks-to-liquidation across all open positions
                has predictive capital coverage information - and that data becomes the training signal for Phase 4.
            </p>

            <h3>Autonomous Yield Intelligence</h3>
            <p>
                <code>YieldMind</code> determines where idle capital should sit at any given moment. It takes
                the current pool utilisation rate, the yield differential between custody and deployment, and the
                minimum liquidity buffer as inputs, and emits a recommended allocation split across internal
                custody and external yield sources. Each decision comes with a documented <code>reasoning_code</code>
                - an integer that maps to the specific market condition that drove the output - making every
                capital allocation decision auditable in retrospect.
            </p>

            {/* ── Score in Six Tiers ─────────────────────────────────────────── */}
            <h2 id="tiers">The Score in Six Tiers</h2>
            <p>
                The credit score maps to six discrete borrowing tiers. Higher scores unlock better loan-to-value
                ratios and lower interest rates. On mainnet, the tier structure is designed as follows:
            </p>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-slate-800/50 text-slate-400">
                        <tr>
                            <th className="px-4 py-3 border-b border-slate-700">Tier</th>
                            <th className="px-4 py-3 border-b border-slate-700">Score Range</th>
                            <th className="px-4 py-3 border-b border-slate-700">Max LTV</th>
                            <th className="px-4 py-3 border-b border-slate-700">Interest Rate</th>
                            <th className="px-4 py-3 border-b border-slate-700">Access</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-900/20">
                        {[
                            ['Anon', '0 – 19', '30%', '22%', 'New or unverified address'],
                            ['Bronze', '20 – 39', '45%', '15%', '1+ successful repayments'],
                            ['Silver', '40 – 59', '60%', '10%', 'Established deposit and repayment history'],
                            ['Gold', '60 – 74', '72%', '7%', 'Consistent borrower with low liquidation exposure'],
                            ['Platinum', '75 – 89', '80%', '5%', 'Long-tenure borrower; active governance participant'],
                            ['Elite', '90 – 100', '85%', '3%', 'Top-decile borrower with verified on-chain identity'],
                        ].map(([tier, range, ltv, rate, access]) => (
                            <tr key={tier} className="border-b border-slate-800">
                                <td className="px-4 py-3 font-mono font-medium text-cyan-300">{tier}</td>
                                <td className="px-4 py-3 text-slate-300">{range}</td>
                                <td className="px-4 py-3 text-slate-300">{ltv}</td>
                                <td className="px-4 py-3 text-slate-300">{rate}</td>
                                <td className="px-4 py-3 text-slate-400 text-xs">{access}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p>
                Movement between tiers is automatic and continuous. Every completed repayment increments the
                on-chain counter. Every deposit contributes to the deposit volume signal. Account age accrues
                passively. There is no application, no approval gate, and no human decision - the score is
                a function of behaviour, re-computed on every borrow.
            </p>

            {/* ── XCM Settlement Engine ─────────────────────────────────────────── */}
            <h2 id="xcm-engine">The XCM Settlement Engine</h2>
            <p>
                <code>KredioXCMSettler</code> lets any Polkadot parachain with XCM Transact capability execute
                Kredio protocol actions without the user leaving their home chain. A borrower on Hydration or
                Bifrost sends a single XCM extrinsic with a compact-encoded intent payload. On Asset Hub, the
                settler decodes the intent and executes the corresponding protocol action in the same block -
                atomically, with full settlement guarantees.
            </p>
            <p>
                Every intent produces three on-chain events: received, dispatched, and acknowledged. This
                three-event lifecycle provides a complete, auditable record of every cross-chain protocol
                interaction. The intent separation matters - a <code>SWAP_AND_LEND</code> intent and a plain
                <code>DEPOSIT_LEND</code> intent follow the same settlement path but carry different protocol
                implications; they are distinct by design rather than handled by a single catch-all route.
            </p>
            <p>
                <code>FULL_EXIT</code> is the most powerful intent: repay outstanding debt and withdraw
                collateral in a single XCM extrinsic from a remote chain. A cross-chain borrower who opened
                a position via XCM can close it entirely without switching chains or interacting with Asset
                Hub directly.
            </p>

            {/* ── Mainnet: What Plugs In ─────────────────────────────────────────── */}
            <h2>Mainnet: What Plugs In</h2>

            <h3>Productive Collateral</h3>
            <p>
                On testnet, collateral is held in custody while a position is open. On mainnet, collateral
                will be deployed to yield while locked. The primary integration is DOT staked via Bifrost&apos;s
                liquid staking pool - a depositor posts DOT collateral, which is converted to vDOT earning
                approximately 15% APR, and the collateral balance is denominated in the live vDOT/USD oracle
                price. Collateral earns its keep while it secures the loan.
            </p>
            <p>
                This changes the protocol&apos;s capital efficiency fundamentally. A 200% collateralisation
                requirement against earning collateral is economically different from 200% against idle
                collateral - the yield offsets a meaningful fraction of the borrowing cost and reduces the
                net cost of borrowing for lower-tier users.
            </p>

            <h3>Real Yield for Depositors</h3>
            <p>
                YieldMind will route idle lending pool capital to external yield sources. The two primary
                targets at mainnet are Bifrost (conservative yield, liquid staking returns) and Hydration
                Omnipool (higher yield, liquidity provision exposure). YieldMind selects between them based
                on current protocol utilisation, pool depth, and volatility signals - not a hardcoded split.
                Depositors earn a blended yield from borrower interest plus the external routing decision,
                with the allocation logic fully auditable on-chain via the emitted <code>AllocationComputed</code> events.
            </p>

            <h3>ETH Liquidity Without Intermediaries</h3>
            <p>
                The ETH bridge at mainnet will route through Snowbridge - the trustless, governance-secured
                bridge between Ethereum and Polkadot Asset Hub. Snowbridge eliminates the relayer trust
                assumption present in the testnet implementation; deposits are verified by Ethereum consensus
                light client proofs running inside Polkadot, with no custodian and no multisig. ETH holders
                gain access to the Kredio credit system without bridging through a centralised intermediary.
            </p>

            <h3>Multi-Asset Collateral at Mainnet Depth</h3>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-slate-800/50 text-slate-400">
                        <tr>
                            <th className="px-4 py-3 border-b border-slate-700">Asset</th>
                            <th className="px-4 py-3 border-b border-slate-700">Form</th>
                            <th className="px-4 py-3 border-b border-slate-700">Collateral Role</th>
                            <th className="px-4 py-3 border-b border-slate-700">Yield While Locked</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-900/20">
                        {[
                            ['DOT', 'Native', 'Primary collateral; converted to vDOT on deposit', '~15% via Bifrost'],
                            ['vDOT', 'Bifrost LST', 'Direct vDOT collateral; LTV capped at oracle price', 'Continuous accrual'],
                            ['ETH', 'Snowbridge wrapped', 'ETH-denominated borrow exposure', 'Optional Hydration LP routing'],
                            ['USDT', 'Asset Hub native', 'Stablecoin collateral; lower volatility discount applied', 'Bifrost stable pools'],
                            ['KSM', 'XCM from Kusama', 'Kusama network collateral via XCM Settler intent', 'Kusama staking yield'],
                            ['HDX', 'Hydration native', 'Hydration-native collateral; oracle via Hydration price feed', 'Omnipool farming'],
                        ].map(([asset, form, role, yld]) => (
                            <tr key={asset} className="border-b border-slate-800">
                                <td className="px-4 py-3 font-mono font-medium text-cyan-300">{asset}</td>
                                <td className="px-4 py-3 text-slate-400 text-xs">{form}</td>
                                <td className="px-4 py-3 text-slate-300">{role}</td>
                                <td className="px-4 py-3 text-slate-400 text-xs">{yld}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2>The Connected Protocol</h2>
            <p>
                Kredio is not a standalone lending pool. It is a credit layer that sits on top of the Polkadot
                ecosystem&apos;s native yield infrastructure. The XCM Settler accepts intent from parachains that
                have no lending market of their own. YieldMind routes capital to Hydration and Bifrost. The
                ETH bridge brings Ethereum capital into the credit system. The identity registry allows KILT
                credentials to deepen the score for users who choose to link them.
            </p>
            <p>
                Each integration compresses the effective cost of Kredio&apos;s value proposition. Borrowers benefit
                from productive collateral; lenders benefit from external yield routing; parachains benefit from
                cross-chain credit access. The protocol is designed so that adding one integration makes every
                other integration more valuable.
            </p>

            {/* ── Phase Timeline ─────────────────────────────────────────── */}
            <h2 id="phases">Development Phases</h2>

            {/* Phase 2 */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-cyan-900/50 border border-cyan-500/40 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Phase 2</span>
                </div>
                <h3 className="text-white mt-0 mb-3">computeScore as Ecosystem Infrastructure</h3>
                <p className="text-slate-300">
                    The <code>KreditAgent.compute_score()</code> call will be opened as an XCM-queryable endpoint
                    accessible to any Polkadot parachain. Any protocol on the network - a money market on
                    Hydration, an options vault on Acala, a lending product on Moonbeam - will be able to query
                    a borrower&apos;s Kredio credit score directly via XCM, use it for underwriting decisions, and pass
                    the result back to their own contract.
                </p>
                <p className="text-slate-300 mb-0">
                    This makes the Kredio score an ecosystem primitive. Protocols that integrate it get an
                    instant risk signal for counterparty assessment; borrowers who have built a strong score carry
                    that signal across the whole network. The score becomes portable reputation.
                </p>
            </div>

            {/* Phase 3 */}
            <div className="bg-slate-800/30 border border-purple-500/20 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-purple-900/50 border border-purple-500/40 text-purple-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Phase 3</span>
                </div>
                <h3 className="text-white mt-0 mb-3">Identity Deepens the Score</h3>
                <p className="text-slate-300">
                    The KILT Protocol&apos;s Decentralised Identity Provider (DIP) integration allows users to attach
                    verifiable credentials to their on-chain identity without exposing the underlying data. A user
                    who chooses to link their KILT-attested identity to their Kredio account gains access to
                    credential-specific score bonuses:
                </p>
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-slate-900/50 text-slate-500">
                            <tr>
                                <th className="px-4 py-3 border-b border-slate-700">Credential Type</th>
                                <th className="px-4 py-3 border-b border-slate-700">Score Bonus</th>
                                <th className="px-4 py-3 border-b border-slate-700">Rationale</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['KYC-attested identity', '+8 points', 'Reduces anonymity risk; regulatory positioning'],
                                ['Proof of income (traditional)', '+6 points', 'Off-chain financial capacity signal'],
                                ['Professional credential', '+4 points', 'Qualitative counterparty quality signal'],
                                ['Linked social proof (GitHub, etc.)', '+3 points', 'Reputation continuity across identities'],
                            ].map(([cred, bonus, rationale]) => (
                                <tr key={cred} className="border-b border-slate-800">
                                    <td className="px-4 py-3 text-slate-300">{cred}</td>
                                    <td className="px-4 py-3 text-cyan-400 font-mono">{bonus}</td>
                                    <td className="px-4 py-3 text-slate-500 text-xs">{rationale}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-sm text-slate-400 mt-4 mb-0">
                    Verification is zero-knowledge at the contract level - the credential issuer is verified, but
                    the underlying data is not stored or visible on-chain. Linking is always opt-in. Unlinked
                    addresses continue to operate on purely on-chain signals with no penalty.
                </p>
            </div>

            {/* Phase 4 */}
            <div className="bg-slate-800/30 border border-amber-500/20 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-amber-900/50 border border-amber-500/40 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Phase 4</span>
                </div>
                <h3 className="text-white mt-0 mb-3">The Neural Layer Becomes a Learning System</h3>
                <p className="text-slate-300">
                    In Phase 4, the NeuralScorer&apos;s model weights shift from static, deployment-time parameters to
                    a continuously updated training pipeline. The training signal is the on-chain event log itself -
                    every <code>RiskAssessed</code> event with a subsequent liquidation or successful repayment
                    outcome becomes a labelled sample. The pipeline runs off-chain as a batch process and
                    produces updated PVM bytecode that passes a governance attestation step before deployment.
                </p>
                <p className="text-slate-300">
                    The RiskAssessor benefits in parallel - its liquidation timing estimates improve as the
                    historical dataset grows. Early in the protocol&apos;s life, estimates are coarse. By Month 24,
                    with thousands of completed positions, the <code>estimated_blocks_to_liq</code> signal
                    becomes a materially accurate predictive tool.
                </p>
                <p className="text-slate-300 mb-0">
                    Crucially, the model upgrade mechanism is governed - no admin key can unilaterally push
                    new model parameters. Weight updates require an on-chain proposal and confirmation period,
                    keeping the AI layer inside the same governance framework as the rest of the protocol.
                </p>
            </div>

            {/* Phase 5 */}
            <div className="bg-slate-800/30 border border-emerald-500/20 rounded-lg p-6 my-6">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-emerald-900/50 border border-emerald-500/40 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Phase 5</span>
                </div>
                <h3 className="text-white mt-0 mb-3">KRED: Governance Owned by the Protocol&apos;s Best Users</h3>
                <p className="text-slate-300">
                    KRED is the protocol&apos;s governance token. Distribution is not based on liquidity mining
                    or participation incentives - it is based on credit score and protocol tenure. Users who
                    have demonstrated responsible borrowing behaviour over a meaningful time window receive a
                    higher governance allocation. The protocol&apos;s decision-makers are structurally selected to
                    be its best actors.
                </p>
                <p className="text-slate-300">KRED governs:</p>
                <ul>
                    <li>Tier boundary parameters (score range per tier, LTV ceilings)</li>
                    <li>Interest rate curves and the yield strategy allocation bands</li>
                    <li>Approved external yield destinations and maximum capital concentration per destination</li>
                    <li>NeuralScorer model update proposals and confirmation periods</li>
                    <li>New collateral asset onboarding and liquidation parameters</li>
                </ul>
                <p className="text-slate-300 mb-0">
                    The feedback loop is intentional: KRED is earned by good borrowing; governance rights improve
                    borrowing conditions; better conditions attract higher-quality borrowers; the protocol&apos;s
                    credit data gets richer and more predictive. Each phase makes the next one more valuable.
                </p>
            </div>

            {/* ── Why This Compounds ─────────────────────────────────────────── */}
            <h2>Why This Compounds</h2>
            <p>
                Standard DeFi yield compounds trivially - principal grows, interest compounds on a larger
                base. The compounding in Kredio is structural. Credit reputation accumulates and cannot be
                instantaneously replicated. A borrower who reaches Elite tier over eighteen months of on-chain
                behaviour has built something that a new wallet cannot reproduce overnight. That asymmetry is
                non-trivial: it creates a meaningful incentive to protect reputation rather than exploit the
                protocol and restart.
            </p>
            <p>
                The AI layer compounds separately. NeuralScorer confidence deltas accumulate across thousands
                of borrow events and become the training data for Phase 4 model updates. RiskAssessor&apos;s
                historical estimates versus actual liquidation outcomes become a ground truth dataset that
                makes future estimates more accurate. YieldMind allocation history becomes a backtestable
                track record that informs future strategy selection. The evidence base grows with every
                transaction.
            </p>
            <p>
                The ecosystem integration compounds further still. When computeScore becomes an XCM endpoint
                in Phase 2, every parachain that queries it adds a new dimension to the network&apos;s understanding
                of that borrower - and every additional data point deepens the NeuralScorer&apos;s cross-validation
                capability.
            </p>

            {/* ── On the Build Choices ─────────────────────────────────────────── */}
            <h2>On the Build Choices</h2>
            <p>
                Kredio is built on Polkadot Asset Hub because it is the only execution environment that
                supports atomic EVM-to-Wasm cross-VM calls today. The <code>KreditAgent</code> invocation
                pattern is not a workaround or an approximation - it is a native runtime feature. Attempting
                to replicate the same architecture on any other EVM chain would require an oracle round-trip
                and the off-chain trust assumption that makes the scoring system less defensible.
            </p>
            <p>
                The three-phase scoring design - deterministic foundation, neural validation, continuous risk
                assessment - is a deliberate choice not to collapse all intelligence into one model. A single
                model that combines all signals is harder to audit, harder to upgrade, and harder to trust.
                Three contracts with distinct responsibilities and separate on-chain event records are
                individually inspectable and independently upgradeable.
            </p>
            <p>
                Some protocol interfaces today are functional placeholders for the mainnet architecture
                described above. The XCM Settler intent system, the account registry, the governance cache,
                and the AI event log are all production-grade infrastructure - the data and records they
                produce on testnet are structurally identical to what mainnet will use. The protocol is not
                being rebuilt for mainnet; it is being extended.
            </p>

            <div className="bg-cyan-900/10 border border-cyan-500/20 rounded-lg p-6 mt-10">
                <p className="text-sm text-slate-300 mb-1 font-medium">Currently live on testnet</p>
                <p className="text-sm text-slate-400 mb-0">
                    Everything described in this document - the dual-mode scoring, the risk assessment layer,
                    the XCM settler, the ETH bridge, and the yield intelligence system - is deployed and
                    active on Polkadot Asset Hub Paseo testnet today. The testnet is the prototype for the
                    mainnet architecture described above, not a preview of it.
                </p>
            </div>
        </div>
    );
}
