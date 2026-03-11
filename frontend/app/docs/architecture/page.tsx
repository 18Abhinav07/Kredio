export const metadata = { title: "Architecture | Kredio Docs" };

export default function ArchitecturePage() {
    return (
        <div className="animate-in fade-in duration-500">
            <h1>Architecture</h1>
            <p>
                Kredio separates capital logic from intelligence. EVM contracts handle deterministic
                settlement, token custody, and event emission. Wasm and PVM contracts handle computation:
                credit scoring, liquidation risk modelling, and yield allocation. A Node.js backend
                service layer coordinates off-chain activity without holding any protocol state.
            </p>

            <h2 id="layers">Execution Layers</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                <div className="bg-slate-800/20 border border-slate-700 p-5 rounded-lg">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Layer 1</div>
                    <h3 className="text-white mt-0 mb-2 text-base">EVM &mdash; Solidity</h3>
                    <p className="text-sm text-slate-400 mb-0">
                        Capital state, positions, token custody, bridge, and XCM settlement.
                        Standard ethers.js / viem compatible.
                    </p>
                </div>
                <div className="bg-cyan-900/10 border border-cyan-500/30 p-5 rounded-lg">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Layer 2</div>
                    <h3 className="text-cyan-400 mt-0 mb-2 text-base">ink! Wasm &mdash; KreditAgent</h3>
                    <p className="text-sm text-slate-300 mb-0">
                        Deterministic credit scoring. Called atomically via SCALE cross-VM
                        <code> staticcall</code> from EVM market contracts in the same transaction.
                    </p>
                </div>
                <div className="bg-purple-900/10 border border-purple-500/30 p-5 rounded-lg">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Layer 3</div>
                    <h3 className="text-purple-400 mt-0 mb-2 text-base">ink! PVM &mdash; AI Layer</h3>
                    <p className="text-sm text-slate-300 mb-0">
                        NeuralScorer, RiskAssessor, YieldMind. Called by the backend AI Engine;
                        each computation emits a permanent on-chain event.
                    </p>
                </div>
            </div>

            <h3>Layer 1 &mdash; EVM Contracts</h3>
            <p>
                All capital-bearing state lives in Solidity contracts on Polkadot Asset Hub EVM
                (Chain&nbsp;ID&nbsp;<code>420420417</code>). These contracts are optimised for
                gas-efficient financial primitives: token transfers, position accounting, collateral
                management, and event emission. They do not perform heavy computation.
            </p>
            <p>
                Deployed contracts: <code>KredioLending</code>, <code>KredioPASMarket</code>,{' '}
                <code>KredioSwap</code>, <code>KredioXCMSettler</code>,{' '}
                <code>KredioAccountRegistry</code>, <code>GovernanceCache</code>,{' '}
                <code>KredioBridgeMinter</code>, <code>EthBridgeInbox</code>,{' '}
                <code>PASOracle</code>, <code>mUSDC</code>, <code>YieldPool</code>.
            </p>

            <h3>Layer 2 &mdash; ink! Wasm (KreditAgent)</h3>
            <p>
                <code>KreditAgent</code> is compiled to WebAssembly and deployed on Asset Hub EVM
                alongside the Solidity contracts. Market contracts invoke it with a low-level{' '}
                <code>staticcall</code> carrying a SCALE-encoded 4-byte message selector:
            </p>
            <pre><code>{`bytes4 constant SEL_COMPUTE_SCORE    = 0x3a518c00;
bytes4 constant SEL_COLLATERAL_RATIO = 0xa70eec89;
bytes4 constant SEL_INTEREST_RATE    = 0xb8dc60f2;
bytes4 constant SEL_TIER             = 0x2b2bb477;`}</code></pre>
            <p>
                The cross-VM call executes atomically &mdash; same transaction, same block. The score,
                collateral ratio, and interest rate come back ABI-decoded and are immediately locked into
                the new position. No off-chain call, no latency, no trust assumption. This EVM-to-Wasm
                atomic interaction is unique to Polkadot&apos;s hybrid Asset Hub runtime.
            </p>
            <p>
                Because <code>KreditAgent</code> is a Wasm contract, the scoring algorithm can be
                upgraded in place &mdash; incorporating governance signals in Phase 4, cross-chain
                history in Phase 6 &mdash; without redeploying <code>KredioLending</code> or{' '}
                <code>KredioPASMarket</code>.
            </p>

            <h3>Layer 3 &mdash; ink! PVM (AI Assessment)</h3>
            <p>
                Three contracts compiled for PolkaVM run alongside the capital layer. They are called
                by the backend AI Engine &mdash; not by EVM contracts directly &mdash; and each emits
                a full on-chain event after every computation:
            </p>
            <ul>
                <li><strong>NeuralScorer</strong> &mdash; neural cross-validation of the deterministic score; emits <code>ScoreInferred</code> with a confidence delta per borrower</li>
                <li><strong>RiskAssessor</strong> &mdash; forward-looking liquidation risk; emits <code>RiskAssessed</code> with estimated blocks-to-liquidation and recommended collateral top-up</li>
                <li><strong>YieldMind</strong> &mdash; optimal allocation across yield buckets; emits <code>AllocationComputed</code> with a documented reasoning code</li>
            </ul>

            <h2 id="backend">Backend Service Layer</h2>
            <p>
                A Node.js process on port <code>3002</code> coordinates all off-chain activity.
                It reads events from contracts and writes authorised transactions back, holding
                no protocol state of its own.
            </p>

            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-slate-800/50 text-slate-400">
                        <tr>
                            <th className="px-4 py-3 border-b border-slate-700">Service</th>
                            <th className="px-4 py-3 border-b border-slate-700">Role</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-900/20">
                        {([
                            ['Oracle Service', 'Feeds PAS/USD prices to PASOracle on a configurable interval; self-aligns to 80% of the oracle staleness limit so data never expires'],
                            ['Bridge Service', 'Validates source-chain ETH deposits; cross-references CoinGecko and Chainlink (2% divergence tolerance); calls KredioBridgeMinter.processDeposit()'],
                            ['Yield Strategy', 'Monitors pool utilisation; invests idle capital below 40% utilisation; partially recalls above 65%; full emergency recall above 80%'],
                            ['AI Engine', 'Polls KredioLending events; calls NeuralScorer, RiskAssessor, and YieldMind on each event; runs a 50-block (~5 min) sweep of all active borrowers'],
                            ['XCM Acknowledger', 'Monitors KredioXCMSettler for IntentSettled and IntentFailed events; closes the three-event acknowledgment loop for every cross-chain operation'],
                            ['Protocol Ping', 'Keeps GovernanceCache and KredioAccountRegistry active with periodic background transactions; logs KredioSwap live quotes every 50 blocks'],
                        ] as [string, string][]).map(([service, role]) => (
                            <tr key={service} className="border-b border-slate-800">
                                <td className="px-4 py-3 font-mono text-cyan-400 whitespace-nowrap">{service}</td>
                                <td className="px-4 py-3 text-slate-300">{role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2 id="borrow-flow">Borrow Event Flow</h2>
            <p>The complete path from a user borrow to a full AI-layer assessment:</p>
            <ol>
                <li>User calls <code>KredioPASMarket.borrow(amount)</code></li>
                <li>Market calls <code>KreditAgent.compute_score()</code> via SCALE-encoded <code>staticcall</code>; receives score, collateral ratio, and rate in the same transaction</li>
                <li>Position is stored on-chain with locked parameters; <code>Borrowed</code> event emitted</li>
                <li>AI Engine polls the event; triggers <code>NeuralScorer.infer()</code> &mdash; emits <code>ScoreInferred</code></li>
                <li>AI Engine triggers <code>RiskAssessor.assess_position()</code> &mdash; emits <code>RiskAssessed</code></li>
                <li>On the next 50-block sweep, <code>YieldMind.compute_allocation()</code> runs over full pool state &mdash; emits <code>AllocationComputed</code></li>
            </ol>
            <p>
                Steps 4&ndash;6 are permanent, queryable event records on Blockscout. The full credit and
                risk history of every borrower accumulates in the event log from their first interaction.
            </p>

            <h2 id="identity">Identity &amp; Governance</h2>
            <p>
                <code>KredioAccountRegistry</code> binds an EVM address to a Substrate (SR25519) public
                key. The user provides a valid SR25519 signature over a structured payload containing their
                EVM address and a nonce. The registry verifies it on-chain using the Asset Hub System
                precompile&apos;s <code>sr25519Verify</code> function and creates a bidirectional, nonce-protected
                mapping. Replay attacks are blocked by nonce increment on both link and unlink.
            </p>
            <p>
                <code>GovernanceCache</code> stores each user&apos;s OpenGov vote count and conviction level
                on-chain. In Phase 4 this data feeds directly into the <code>KreditAgent</code> scoring
                model &mdash; active governance participants earn a persistent credit bonus. The Polkadot
                ConvictionVoting precompile makes this natively queryable from Asset Hub contracts
                without any off-chain indexer.
            </p>
        </div>
    );
}
