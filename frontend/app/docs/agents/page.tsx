export const metadata = { title: "AI Agent Workflows | Kredio Docs" };

export default function AgentsPage() {
    return (
        <div className="animate-in fade-in duration-500">
            <h1>AI Agent Workflows</h1>
            <p>
                Four smart contracts form Kredio&apos;s intelligence layer: one deterministic Wasm scorer
                invoked atomically at borrow time, and three PVM contracts that run continuously alongside
                every active borrower position. Together they produce a complete, permanent, on-chain
                record of credit quality and risk state for every participant.
            </p>

            <div className="not-prose grid grid-cols-2 sm:grid-cols-4 gap-3 my-8">
                {([
                    ['1', 'KreditAgent', 'ink! Wasm', 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'],
                    ['2', 'NeuralScorer', 'ink! PVM', 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'],
                    ['3', 'RiskAssessor', 'ink! PVM', 'bg-amber-500/10 border-amber-500/30 text-amber-400'],
                    ['4', 'YieldMind', 'ink! PVM', 'bg-pink-500/10 border-pink-500/30 text-pink-400'],
                ] as [string, string, string, string][]).map(([num, name, type_, colors]) => (
                    <a key={name} href={`#${name.toLowerCase().replace(/([A-Z])/g, (m, c, i) => i > 0 ? '-' + c.toLowerCase() : c.toLowerCase())}`}
                        className={`flex flex-col gap-1 p-3 rounded-lg border ${colors} no-underline hover:opacity-80 transition-opacity`}>
                        <span className="text-[10px] uppercase tracking-widest opacity-60">{num} · {type_}</span>
                        <span className="text-sm font-medium font-mono">{name}</span>
                    </a>
                ))}
            </div>

            <div className="space-y-0">

                {/* ── KreditAgent ────────────────────────────────────────── */}
                <section id="kredit-agent" className="scroll-mt-20 pt-2">
                    <div className="not-prose mb-6">
                        <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-6 h-6 rounded bg-cyan-500/20 flex items-center justify-center border border-cyan-500/40 shrink-0">
                                <span className="text-cyan-400 text-[10px] font-bold">1</span>
                            </div>
                            <span className="text-[11px] text-slate-500 uppercase tracking-widest font-medium">ink! Wasm &mdash; Deterministic</span>
                        </div>
                        <h2 className="text-[1.4rem] font-medium text-white tracking-tight leading-snug border-b border-white/10 pb-3 mt-1 mb-0">
                            KreditAgent &mdash; Deterministic Credit Scorer
                        </h2>
                    </div>
                    <p>
                        The foundation of the credit system. <code>KreditAgent</code> is an ink! Wasm
                        contract called atomically by EVM market contracts via SCALE-encoded{' '}
                        <code>staticcall</code> at every borrow. It computes a score from 0 to 100
                        entirely from on-chain protocol storage &mdash; nothing is self-reported.
                    </p>

                    <h3>Scoring Inputs</h3>
                    <div className="not-prose overflow-x-auto my-5">
                        <table className="min-w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-slate-800/50 text-slate-400">
                                <tr>
                                    <th className="px-4 py-3 border-b border-slate-700">Input</th>
                                    <th className="px-4 py-3 border-b border-slate-700">Source</th>
                                    <th className="px-4 py-3 border-b border-slate-700">Max Weight</th>
                                </tr>
                            </thead>
                            <tbody className="bg-slate-900/20">
                                {([
                                    ['Repayment count', 'Protocol storage; incremented only on successful repay()', '+55 pts'],
                                    ['Liquidation count', 'Protocol storage; incremented at liquidation event', 'up to −55 pts penalty'],
                                    ['Deposit tier (0–7)', 'Derived from lifetime cumulative deposit volume', '+35 pts'],
                                    ['Account age', 'Block delta since first deposit in contract storage', '+10 pts'],
                                ] as [string, string, string][]).map(([input, source, weight]) => (
                                    <tr key={input} className="border-b border-slate-800">
                                        <td className="px-4 py-3 font-medium text-white">{input}</td>
                                        <td className="px-4 py-3 text-slate-400">{source}</td>
                                        <td className="px-4 py-3 font-mono text-cyan-400">{weight}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h3>Credit Tiers</h3>
                    <p>The score maps to six credit tiers, each with a distinct collateral ratio and interest rate:</p>
                    <div className="not-prose overflow-x-auto my-5">
                        <table className="min-w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-slate-800/50 text-slate-400">
                                <tr>
                                    <th className="px-4 py-3 border-b border-slate-700">Tier</th>
                                    <th className="px-4 py-3 border-b border-slate-700">Score</th>
                                    <th className="px-4 py-3 border-b border-slate-700">Collateral Ratio</th>
                                    <th className="px-4 py-3 border-b border-slate-700">Interest Rate</th>
                                </tr>
                            </thead>
                            <tbody className="bg-slate-900/20">
                                {([
                                    ['ANON',     '0–14',   '200%', '15% APR'],
                                    ['BRONZE',   '15–29',  '175%', '12% APR'],
                                    ['SILVER',   '30–49',  '150%', '10% APR'],
                                    ['GOLD',     '50–64',  '130%', '8% APR'],
                                    ['PLATINUM', '65–79',  '120%', '6% APR'],
                                    ['DIAMOND',  '80–100', '110%', '4% APR'],
                                ] as [string, string, string, string][]).map(([tier, score, ratio, rate]) => (
                                    <tr key={tier} className="border-b border-slate-800">
                                        <td className="px-4 py-3 font-mono font-semibold text-white">{tier}</td>
                                        <td className="px-4 py-3 text-slate-300">{score}</td>
                                        <td className="px-4 py-3 text-slate-300">{ratio}</td>
                                        <td className="px-4 py-3 text-emerald-400">{rate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h3>Liquidation Penalty</h3>
                    <p>
                        A single liquidation event deducts 20 points. Two liquidations deduct 35.
                        Three or more deduct 55 &mdash; enough to reset a DIAMOND borrower back to
                        ANON. This penalty is hard-coded in protocol storage and cannot be disputed.
                    </p>
                    <p className="text-sm text-slate-500">
                        <strong className="text-slate-400">Address:</strong>{' '}
                        <code>0x8c13E6fFDf27bB51304Efff108C9B646d148E5F3</code>
                        {' · '}ink! Wasm, Asset Hub EVM
                    </p>
                </section>

                <hr className="border-slate-800 my-12" />

                {/* ── NeuralScorer ────────────────────────────────────────── */}
                <section id="neural-scorer" className="scroll-mt-20">
                    <div className="not-prose mb-6">
                        <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 shrink-0">
                                <span className="text-emerald-400 text-[10px] font-bold">2</span>
                            </div>
                            <span className="text-[11px] text-slate-500 uppercase tracking-widest font-medium">ink! PVM &mdash; Neural Cross-Validation</span>
                        </div>
                        <h2 className="text-[1.4rem] font-medium text-white tracking-tight leading-snug border-b border-white/10 pb-3 mt-1 mb-0">
                            NeuralScorer &mdash; Neural Cross-Validation
                        </h2>
                    </div>
                    <p>
                        A static rule-based system can be gamed. A borrower who understands the weights
                        can engineer transactions to produce a high score while carrying genuine default
                        risk. The <strong>NeuralScorer</strong> is the answer to this. It independently
                        computes a weighted neural score from the same four inputs as{' '}
                        <code>KreditAgent</code>, using different weight matrices, and compares the
                        result against the deterministic baseline.
                    </p>
                    <p>
                        The meaningful output is not the neural score in isolation &mdash; it is the
                        delta between the neural score and the deterministic score. A borrower whose
                        behaviour is genuinely healthy will produce a small, consistent delta. A borrower
                        engineering transactions to inflate the rule-based score will produce a growing
                        divergence as the neural model weighs input combinations differently.
                    </p>

                    <h3>Event Output</h3>
                    <p>One <code>ScoreInferred</code> event is emitted per call:</p>
                    <pre><code>{`ScoreInferred {
  account,
  neural_score,        // 0–100
  deterministic_score, // from KreditAgent
  confidence_pct,      // how closely the models agree
  delta_from_rule,     // signed difference
  model_version
}`}</code></pre>

                    <p>
                        The <code>confidence_pct</code> is the protocol&apos;s real-time view of how
                        much it trusts any individual score. High confidence means both models agree
                        &mdash; the borrower&apos;s profile is consistent. A widening delta is an early
                        signal of score manipulation or an unusual behavioural pattern worth monitoring.
                    </p>
                    <p className="text-sm text-slate-500">
                        <strong className="text-slate-400">Address:</strong>{' '}
                        <code>0xac6bd3ff3447d8d1689dd4f02899ff558f108e0d</code>
                        {' · '}ink! PVM, Asset Hub EVM
                    </p>
                </section>

                <hr className="border-slate-800 my-12" />

                {/* ── RiskAssessor ────────────────────────────────────────── */}
                <section id="risk-assessor" className="scroll-mt-20">
                    <div className="not-prose mb-6">
                        <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-6 h-6 rounded bg-amber-500/20 flex items-center justify-center border border-amber-500/40 shrink-0">
                                <span className="text-amber-400 text-[10px] font-bold">3</span>
                            </div>
                            <span className="text-[11px] text-slate-500 uppercase tracking-widest font-medium">ink! PVM &mdash; Forward-Looking Risk</span>
                        </div>
                        <h2 className="text-[1.4rem] font-medium text-white tracking-tight leading-snug border-b border-white/10 pb-3 mt-1 mb-0">
                            RiskAssessor &mdash; Forward-Looking Position Risk
                        </h2>
                    </div>
                    <p>
                        Rather than evaluating positions against where they currently sit,{' '}
                        <strong>RiskAssessor</strong> evaluates positions against where they are going.
                        It factors the seven-day price trend into every assessment alongside current
                        health ratio and credit score, producing a concrete countdown rather than a
                        colour code.
                    </p>
                    <p>
                        A position that looks healthy on a snapshot but is sitting on a sustained price
                        decline is classified into a different risk tier than an identical position in a
                        stable market. This distinction matters to the protocol treasury and to the
                        borrower managing their position.
                    </p>

                    <h3>Inputs</h3>
                    <ul>
                        <li><code>borrower</code> &mdash; position address</li>
                        <li><code>collateral_usd_x6</code> &mdash; collateral value in micro-USD</li>
                        <li><code>debt_usd_x6</code> &mdash; outstanding debt in micro-USD</li>
                        <li><code>credit_score</code> &mdash; current KreditAgent score (0–100)</li>
                        <li><code>price_7d_change_bps</code> &mdash; signed 7-day price trend in basis points</li>
                        <li><code>liq_ratio_bps</code> &mdash; position-specific liquidation threshold</li>
                    </ul>

                    <h3>Output per Position</h3>
                    <pre><code>{`PositionRisk {
  liquidation_probability_pct,  // 0–100
  estimated_blocks_to_liq,      // concrete countdown
  risk_tier,                    // Safe / Watch / Warning / Critical
  collateral_buffer_bps,        // current safety margin
  recommended_top_up_atoms      // exact amount to return to safe zone
}`}</code></pre>

                    <p>
                        Single-position and 16-position batch modes are both supported.
                        The batch mode allows the AI Engine to assess the entire active borrower
                        pool in a single on-chain call during the periodic sweep.
                    </p>
                    <p className="text-sm text-slate-500">
                        <strong className="text-slate-400">Address:</strong>{' '}
                        <code>0xdB9E48932E061D95E22370235ac3a35332d289f7</code>
                        {' · '}ink! PVM, Asset Hub EVM
                    </p>
                </section>

                <hr className="border-slate-800 my-12" />

                {/* ── YieldMind ────────────────────────────────────────── */}
                <section id="yield-mind" className="scroll-mt-20">
                    <div className="not-prose mb-6">
                        <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-6 h-6 rounded bg-pink-500/20 flex items-center justify-center border border-pink-500/40 shrink-0">
                                <span className="text-pink-400 text-[10px] font-bold">4</span>
                            </div>
                            <span className="text-[11px] text-slate-500 uppercase tracking-widest font-medium">ink! PVM &mdash; Yield Allocation</span>
                        </div>
                        <h2 className="text-[1.4rem] font-medium text-white tracking-tight leading-snug border-b border-white/10 pb-3 mt-1 mb-0">
                            YieldMind &mdash; Autonomous Yield Allocation
                        </h2>
                    </div>
                    <p>
                        <strong>YieldMind</strong> reads three signals &mdash; pool utilisation, price
                        volatility, and the weighted average credit score of the active borrower base
                        &mdash; and computes the optimal allocation of idle capital across three yield
                        buckets: conservative (6.5% APY), balanced (11% APY), and aggressive (18% APY).
                    </p>

                    <h3>Market Condition Routing</h3>
                    <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-6">
                        <div className="border border-slate-700 bg-slate-800/30 p-4 rounded-lg">
                            <div className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-medium">High Utilisation</div>
                            <div className="text-sm text-slate-300 leading-relaxed">All capital stays liquid. External deployment halted until borrower demand eases.</div>
                        </div>
                        <div className="border border-rose-900/50 bg-rose-900/10 p-4 rounded-lg">
                            <div className="text-xs text-rose-400 uppercase tracking-wider mb-2 font-medium">High Volatility</div>
                            <div className="text-sm text-slate-300 leading-relaxed">All active deployments routed strictly to the conservative bucket. Capital preservation first.</div>
                        </div>
                        <div className="border border-emerald-900/50 bg-emerald-900/10 p-4 rounded-lg">
                            <div className="text-xs text-emerald-400 uppercase tracking-wider mb-2 font-medium">Normal Conditions</div>
                            <div className="text-sm text-slate-300 leading-relaxed">Allocation scales across all three buckets based on average platform credit quality and volatility.</div>
                        </div>
                    </div>

                    <h3>Decision Output</h3>
                    <pre><code>{`AllocationDecision {
  conservative_bps,  // share to 6.5% APY bucket
  balanced_bps,      // share to 11% APY bucket
  aggressive_bps,    // share to 18% APY bucket
  idle_bps,          // retained as liquid buffer
  projected_apy_bps, // blended APY of this allocation
  confidence,
  reasoning_code     // 0=Normal, 1=HighUtil, 2=LowUtil, 3=Volatile
}`}</code></pre>

                    <p>
                        The <code>reasoning_code</code> documents the logic behind each allocation
                        decision on-chain &mdash; not just what was decided, but why.
                    </p>
                    <p className="text-sm text-slate-500">
                        <strong className="text-slate-400">Address:</strong>{' '}
                        <code>0x0b68fbfb596846e4f3a23da10365e0888a182ef3</code>
                        {' · '}ink! PVM, Asset Hub EVM
                    </p>
                </section>

            </div>

            {/* ── Trigger Schedule ────────────────────────────────────────── */}
            <h2 id="trigger-schedule">Trigger Schedule</h2>
            <p>
                The AI Engine calls these contracts on two cadences &mdash; event-driven (immediate)
                and periodic (every 50 blocks, approximately every five minutes):
            </p>
            <div className="not-prose overflow-x-auto my-5">
                <table className="min-w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-slate-800/50 text-slate-400">
                        <tr>
                            <th className="px-4 py-3 border-b border-slate-700">Trigger</th>
                            <th className="px-4 py-3 border-b border-slate-700">Contracts Called</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-900/20">
                        {([
                            ['Borrowed event', 'NeuralScorer.infer() for the new borrower'],
                            ['CollateralDeposited event', 'RiskAssessor.assess_position() for the depositor'],
                            ['Liquidated event', 'RiskAssessor.assess_position() for the liquidated borrower'],
                            ['Deposited / YieldHarvested event', 'YieldMind.compute_allocation() over full pool state'],
                            ['Every 50 blocks (~5 min)', 'NeuralScorer + RiskAssessor for all active borrowers; YieldMind unconditionally'],
                        ] as [string, string][]).map(([trigger, action]) => (
                            <tr key={trigger} className="border-b border-slate-800">
                                <td className="px-4 py-3 text-slate-300 font-mono text-xs whitespace-nowrap">{trigger}</td>
                                <td className="px-4 py-3 text-slate-400">{action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p>
                When no active borrowers are present on testnet, the AI Engine uses the deployer
                address as a sentinel to keep all three PVM contracts emitting events on a regular
                cadence &mdash; ensuring the on-chain event record remains continuous.
            </p>
        </div>
    );
}
