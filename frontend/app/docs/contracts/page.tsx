export const metadata = { title: "Contracts & Integration | Kredio Docs" };

export default function ContractsPage() {
    return (
        <div className="animate-in fade-in duration-500">
            <h1>Contracts &amp; Integration</h1>
            <p>
                All contracts are deployed on <strong>Polkadot Asset Hub Testnet</strong>{' '}
                (Chain ID <code>420420417</code>). EVM contracts are compatible with standard
                ethers.js and viem tooling. The ink! Wasm and PVM contracts are invoked internally
                by the backend service layer.
            </p>

            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 my-6 text-sm">
                <strong>Network:</strong> Polkadot Asset Hub Testnet
                {' · '}<strong>RPC:</strong> <code>https://eth-rpc-testnet.polkadot.io/</code>
                {' · '}<strong>Explorer:</strong>{' '}
                <a href="https://blockscout-testnet.polkadot.io">blockscout-testnet.polkadot.io</a>
            </div>

            <h2 id="evm-contracts">EVM Contracts</h2>

            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-slate-800/50 text-slate-400">
                        <tr>
                            <th className="px-4 py-3 border-b border-slate-700">Contract</th>
                            <th className="px-4 py-3 border-b border-slate-700">Address</th>
                            <th className="px-4 py-3 border-b border-slate-700">Description</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-900/20">
                        {([
                            ['KredioLending', '0x1eDaD1271FB9d1296939C6f4Fb762752b041C64E', 'mUSDC lending pool with credit-scored borrowing and yield routing'],
                            ['KredioPASMarket', '0x0F90Fe6141AC29a6031C3ae2155749e9f38a0174', 'Native PAS collateral market; oracle-priced LTV and liquidation'],
                            ['KredioSwap', '0xaF1d183F4550500Beb517A3249780290A88E6e39', 'Oracle-priced PAS → mUSDC swap with slippage guard'],
                            ['KredioXCMSettler', '0xbaaE8f7b97ac387DE8C433A218d63166Ce104Bb1', 'XCM intent settlement engine; decodes and executes parachain Transact payloads'],
                            ['KredioAccountRegistry', '0xBf7ac0e6f0024ED0F2Cf2efb3669E7c389258BFf', 'SR25519 Substrate key ↔ EVM address binding with on-chain verification'],
                            ['GovernanceCache', '0xe4DE7eadE2c0A65BdA6863Ad7bA22416c77F3e55', 'On-chain OpenGov vote count and conviction cache (Phase 4 credit input)'],
                            ['PASOracle', '0x1494432a8Af6fa8c03C0d7DD7720E298D85C55c7', 'Chainlink AggregatorV3-compatible PAS/USD price feed'],
                            ['mUSDC', '0x5998cE005b4f3923c988Ae31940fAa1DEAC0c646', 'Protocol stablecoin; 6 decimals; public testnet faucet via mint()'],
                            ['YieldPool', '0x1dB4Faad3081aAfe26eC0ef6886F04f28D944AAB', 'External yield destination for idle lending capital'],
                            ['KredioBridgeMinter', 'configured via MINTER_ADDR env', 'Hub-side ETH → mUSDC bridge minter; replay-protected by source tx hash'],
                            ['EthBridgeInbox (Sepolia)', 'configured via INBOX_ADDR env', 'Source-chain ETH deposit contract; emits EthDeposited trigger event'],
                        ] as [string, string, string][]).map(([name, addr, desc]) => (
                            <tr key={name} className="border-b border-slate-800">
                                <td className="px-4 py-3 font-mono text-cyan-400 whitespace-nowrap">{name}</td>
                                <td className="px-4 py-3 font-mono text-xs text-slate-400 whitespace-nowrap">{addr}</td>
                                <td className="px-4 py-3 text-slate-300">{desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2 id="ink-contracts">ink! Contracts</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                {([
                    ['text-cyan-400', 'KreditAgent', '0x8c13E6fFDf27bB51304Efff108C9B646d148E5F3', 'ink! Wasm', 'Deterministic credit scorer; invoked atomically via SCALE staticcall from EVM markets'],
                    ['text-emerald-400', 'NeuralScorer', '0xac6bd3ff3447d8d1689dd4f02899ff558f108e0d', 'ink! PVM', 'Neural cross-validation; emits ScoreInferred with confidence delta'],
                    ['text-amber-400', 'RiskAssessor', '0xdB9E48932E061D95E22370235ac3a35332d289f7', 'ink! PVM', 'Forward-looking liquidation risk; emits RiskAssessed with blocks-to-liq'],
                    ['text-pink-400', 'YieldMind', '0x0b68fbfb596846e4f3a23da10365e0888a182ef3', 'ink! PVM', 'Optimal capital allocation across yield buckets; emits AllocationComputed'],
                ] as [string, string, string, string, string][]).map(([color, name, addr, type_, desc]) => (
                    <div key={name} className="bg-slate-800/30 p-4 rounded border border-slate-700">
                        <div className="flex items-baseline justify-between mb-1">
                            <h4 className={`${color} mt-0 mb-0 font-mono text-sm`}>{name}</h4>
                            <span className="text-xs text-slate-500">{type_}</span>
                        </div>
                        <p className="text-xs font-mono text-slate-500 mb-2">{addr}</p>
                        <p className="text-sm m-0 text-slate-400">{desc}</p>
                    </div>
                ))}
            </div>

            <h2 id="build">Build from Source</h2>

            <h3>Prerequisites</h3>
            <ul>
                <li>Foundry (<code>forge</code>, <code>cast</code>) &mdash; <code>curl -L https://foundry.paradigm.xyz | bash && foundryup</code></li>
                <li>Rust + <code>cargo-contract</code> &mdash; <code>rustup target add wasm32-unknown-unknown && cargo install cargo-contract</code></li>
                <li>Node.js &ge; 18 (for deployment scripts)</li>
            </ul>

            <h3>EVM Contracts</h3>
            <pre><code>{`cd contracts
forge install       # install lib/ dependencies
forge build         # compile all Solidity contracts
forge test          # run full test suite
forge test -vvv     # with traces and logs`}</code></pre>

            <h3>KreditAgent (ink! Wasm)</h3>
            <pre><code>{`cd contracts/kredit_agent
cargo contract build --release
# Output: target/ink/kredit_agent.contract`}</code></pre>

            <h3>PVM ink! Contracts</h3>
            <pre><code>{`cargo contract build --release \
  --manifest-path contracts/pvm/neural_scorer/Cargo.toml

cargo contract build --release \
  --manifest-path contracts/pvm/risk_assessor/Cargo.toml

cargo contract build --release \
  --manifest-path contracts/pvm/yield_mind/Cargo.toml`}</code></pre>

            <h2 id="deploy">Deploy</h2>
            <p>Create <code>contracts/.env</code>:</p>
            <pre><code>{`ADMIN=<private_key_hex>   # no 0x prefix
PASET_RPC=https://eth-rpc-testnet.polkadot.io/
SEPOLIA_RPC=https://rpc.sepolia.org`}</code></pre>

            <pre><code>{`# Core protocol (Asset Hub)
cd contracts && source .env
forge script script/Deploy.s.sol \
  --rpc-url $PASET_RPC --broadcast --private-key $ADMIN -vvv

# Bridge contracts
forge script script/DeployBridge.s.sol:DeployInbox \
  --rpc-url $SEPOLIA_RPC --chain-id 11155111 \
  --private-key $ADMIN --broadcast

forge script script/DeployBridge.s.sol:DeployMinter \
  --rpc-url $PASET_RPC --chain-id 420420417 \
  --private-key $ADMIN --broadcast`}</code></pre>

            <p>
                After deployment, update contract addresses in <code>backend/.env</code> and{' '}
                <code>frontend/config/contracts.ts</code>.
            </p>

            <h2 id="integration">Frontend Integration</h2>
            <p>
                All contract ABIs are available in <code>frontend/lib/constants.ts</code> and
                addresses are centralised in <code>frontend/config/contracts.ts</code>, keyed by
                Chain ID. The <code>useProtocolData</code> and <code>useProtocolActions</code> hooks
                cover the full set of read and write operations for all user-facing contracts.
            </p>
            <pre><code>{`// Read all protocol state in a single batched RPC call
const {
  creditScore, creditTier, collateralRatio, interestRate,
  healthRatio, lendingPosition, borrowPosition,
  pasPrice, protocolTotals,
} = useProtocolData()

// Execute any protocol action
const { deposit, borrow, repay, liquidate, swap } = useProtocolActions()`}</code></pre>
        </div>
    );
}
