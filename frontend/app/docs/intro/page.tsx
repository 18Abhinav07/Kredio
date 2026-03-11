export const metadata = { title: "Introduction | Kredio Docs" };

export default function IntroPage() {
    return (
        <div className="animate-in fade-in duration-500">
            <h1>Introduction to Kredio</h1>
            <p className="text-xl text-slate-300 mb-8 border-l-4 border-cyan-500 pl-4">
                A credit protocol with memory. Built on Polkadot Asset Hub &mdash; live on testnet today.
            </p>

            <h2 id="problem">The Problem</h2>
            <p>
                DeFi lending has not solved credit. It has avoided it. Every protocol built in the last five years
                operates on the same assumption: trust no one, require overcollateralisation, charge everyone the
                same rate.
            </p>
            <p>
                This works well enough to process volume. It does not work for participants who have built
                genuine on-chain track records &mdash; borrowers who have repaid consistently across months or years,
                who participate in governance, who carry a verifiable financial history. They get priced
                identically to a wallet opened this morning.
            </p>
            <p>
                The data to fix this has always existed. Every repayment, every liquidation, every governance
                vote is timestamped and immutable on-chain. The obstacle is turning that record into a
                defensible, manipulation-resistant credit score that materially changes borrowing terms &mdash; all
                inside smart contracts, with no off-chain trust assumption.
            </p>
            <p>That is what Kredio is.</p>

            <h2 id="what-it-does">What Kredio Does</h2>
            <p>
                Kredio assigns every borrower a credit score from 0 to 100, computed live at borrow time from
                four fully on-chain inputs: repayment history, deposit volume, liquidation record, and account
                age. The score maps directly to a collateral ratio and interest rate &mdash; locked into each
                position at open, with no external oracle and no manual review.
            </p>
            <p>
                A first-time borrower at <strong>ANON</strong> tier posts 200% collateral and pays 15% APR.
                The same borrower after twelve repayments reaches <strong>DIAMOND</strong> tier &mdash; 110%
                collateral, 4% APR. The improvement is earned entirely through behaviour. No application. No
                identity verification required. No human in the loop.
            </p>

            <div className="bg-slate-800/30 border border-cyan-500/20 rounded-lg p-6 my-8">
                <h3 className="text-cyan-400 mt-0">Live on Polkadot Asset Hub Testnet</h3>
                <p className="mb-2 text-sm">
                    All contracts are deployed and active on Paseo testnet (Chain ID{' '}
                    <code>420420417</code>). Credit scoring, lending markets, PAS collateral market,
                    cross-chain bridge, and the full AI scoring layer are running and emitting
                    on-chain events right now.
                </p>
                <p className="mb-0 text-sm text-slate-400">
                    Explorer:{' '}
                    <a href="https://blockscout-testnet.polkadot.io">blockscout-testnet.polkadot.io</a>
                    {' · '}
                    Primary lending contract:{' '}
                    <code>0x1eDaD1271FB9d1296939C6f4Fb762752b041C64E</code>
                </p>
            </div>

            <h2 id="layers">Three Execution Layers</h2>
            <p>
                Kredio is a hybrid protocol combining three execution environments, each handling what
                it is architecturally best suited for.
            </p>

            <div className="space-y-4 my-6">
                <div className="bg-slate-800/20 border border-slate-700 p-5 rounded-lg">
                    <h3 className="text-white mt-0 mb-2">EVM &mdash; Capital and Settlement</h3>
                    <p className="text-sm text-slate-400 mb-0">
                        Solidity contracts on Polkadot Asset Hub EVM handle all capital flows: lending,
                        collateral management, swapping, cross-chain bridging, and XCM intent execution.
                        All user-facing protocol state lives here. Standard ethers.js and viem compatible.
                    </p>
                </div>
                <div className="bg-cyan-900/10 border border-cyan-500/30 p-5 rounded-lg">
                    <h3 className="text-cyan-400 mt-0 mb-2">ink! Wasm &mdash; Deterministic Credit Scoring</h3>
                    <p className="text-sm text-slate-300 mb-0">
                        <code>KreditAgent</code> is an ink! Wasm contract invoked by Solidity market
                        contracts via SCALE-encoded cross-VM <code>staticcall</code> &mdash; in the same
                        block, with no off-chain dependency. This atomic EVM-to-Wasm call is unique to
                        Polkadot&apos;s hybrid Asset Hub runtime.
                    </p>
                </div>
                <div className="bg-purple-900/10 border border-purple-500/30 p-5 rounded-lg">
                    <h3 className="text-purple-400 mt-0 mb-2">ink! PVM &mdash; Continuous AI Assessment</h3>
                    <p className="text-sm text-slate-300 mb-0">
                        Three PVM contracts &mdash; <code>NeuralScorer</code>, <code>RiskAssessor</code>,
                        and <code>YieldMind</code> &mdash; run continuously alongside the protocol, called
                        by the backend AI Engine on every lending event. Each emits a permanent on-chain
                        audit event after every computation.
                    </p>
                </div>
            </div>

            <h2>Where to Go Next</h2>
            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {([
                    { href: '/docs/architecture', title: 'Architecture', desc: 'How the three execution layers communicate and coordinate' },
                    { href: '/docs/products', title: 'Core Products', desc: 'Lending, PAS market, swap, ETH bridge, and XCM settler' },
                    { href: '/docs/agents', title: 'AI Agent Workflows', desc: 'Credit scoring, risk assessment, and yield intelligence' },
                    { href: '/docs/contracts', title: 'Contracts & Integration', desc: 'Deployed addresses, build steps, and frontend hooks' },
                    { href: '/docs/roadmap', title: 'Roadmap & Vision', desc: 'Mainnet architecture and the long-term compounding model' },
                ] as { href: string; title: string; desc: string }[]).map((link) => (
                    <a key={link.href} href={link.href} className="block p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg hover:border-slate-600 hover:bg-slate-800/50 transition-all group no-underline">
                        <div className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors mb-1">{link.title} &rarr;</div>
                        <div className="text-xs text-slate-500 leading-relaxed">{link.desc}</div>
                    </a>
                ))}
            </div>
        </div>
    );
}
