export const metadata = { title: "Core Products | Kredio Docs" };

export default function ProductsPage() {
    return (
        <div className="animate-in fade-in duration-500">
            <h1>Core Products</h1>
            <p>
                Kredio deploys five distinct product surfaces on Polkadot Asset Hub EVM. Each contract
                is live, verified, and queryable on Blockscout today.
            </p>

            <hr className="my-10 border-slate-800" />

            <h2 id="lending">KredioLending &mdash; mUSDC Lending Market</h2>
            <p>
                The primary lending pool. Lenders supply mUSDC and earn continuous yield from borrower
                interest and the automated yield strategy. Borrowers post mUSDC as collateral and draw
                loans at the rate determined by their <code>KreditAgent</code> credit score.
            </p>

            <h3>For Lenders</h3>
            <ul>
                <li>Deposit mUSDC to earn yield from active borrower interest payments</li>
                <li>Yield accumulates in real time via a share-based accumulator (<code>accYieldPerShare</code>); harvestable at any time with constant gas cost regardless of total lender count</li>
                <li>Idle capital is automatically deployed to the external yield source when pool utilisation drops below 40%, recalled the moment borrowers demand it &mdash; lenders earn more without any additional action</li>
            </ul>

            <h3>For Borrowers</h3>
            <ul>
                <li>Post mUSDC as collateral and borrow at your credit-tier rate</li>
                <li>Collateral ratio and interest rate computed live at borrow time from <code>KreditAgent</code> and locked into the position at open &mdash; no oracle delay, no off-chain step</li>
                <li>Repay in full at any time; each repayment increments your on-chain repayment counter, improving future credit tier eligibility</li>
                <li>Position health: <code>healthRatio = collateral / (debt &times; ratioBps / 10000)</code>. When health drops below 1.0, any caller may liquidate and receive the collateral plus an 8% bonus</li>
            </ul>

            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-5 my-6">
                <h4 className="text-white mt-0 mb-3 font-medium">Intelligent Yield Strategy</h4>
                <p className="text-sm text-slate-300 mb-2">
                    The yield strategy service monitors real-time pool utilisation and moves capital
                    across four zones:
                </p>
                <ul className="text-sm">
                    <li><strong>Below 40%</strong> &mdash; Invest idle capital; lenders earn the external yield rate on top of borrower interest</li>
                    <li><strong>40%&ndash;65%</strong> &mdash; Hold current allocation; no rebalance required</li>
                    <li><strong>65%&ndash;80%</strong> &mdash; Partially recall invested capital to restore liquidity headroom</li>
                    <li><strong>Above 80%</strong> &mdash; Immediately recall all invested capital; full liquidity buffer restored</li>
                </ul>
                <p className="text-sm text-slate-400 mb-0 mt-2">
                    A minimum 20% buffer of total deposits is always kept liquid. Rebalance actions
                    under 100 mUSDC are skipped to prevent dust transactions.
                </p>
            </div>
            <p className="text-sm text-slate-400">
                <strong>Contract:</strong> <code>0x1eDaD1271FB9d1296939C6f4Fb762752b041C64E</code> &middot; Asset Hub EVM
            </p>

            <hr className="my-10 border-slate-800" />

            <h2 id="pas-market">KredioPASMarket &mdash; PAS Collateral Market</h2>
            <p>
                An independent market for borrowing mUSDC against native PAS token collateral. PAS is
                deposited as a <code>payable</code> call &mdash; no ERC-20 approve step required.
            </p>
            <ul>
                <li>Live PAS/USD pricing from the on-chain Chainlink-compatible oracle determines collateral value at both borrow time and liquidation</li>
                <li>Maximum loan-to-value: <strong>65%</strong> of oracle-priced collateral, regardless of credit tier</li>
                <li>Borrow interest rate is dynamically adjusted by credit score &mdash; from 15% APR at ANON to 4% APR at DIAMOND</li>
                <li>Oracle staleness guard: borrows and liquidations revert automatically if price data exceeds its configured staleness limit</li>
                <li>Liquidation bonus: 8% of seized collateral paid to the liquidation caller</li>
                <li>Admin-configurable risk parameters: <code>ltvBps</code>, <code>liqBonusBps</code>, and <code>protocolFeeBps</code> (capped at 20% by contract)</li>
            </ul>
            <p className="text-sm text-slate-400">
                <strong>Contract:</strong> <code>0x0F90Fe6141AC29a6031C3ae2155749e9f38a0174</code> &middot; Asset Hub EVM
            </p>

            <hr className="my-10 border-slate-800" />

            <h2 id="swap">KredioSwap &mdash; PAS to mUSDC</h2>
            <p>
                A single-direction oracle-priced swap: native PAS in, mUSDC out. The exchange rate is
                determined entirely by the live on-chain PAS/USD oracle price &mdash; no AMM, no price
                impact on large trades, no MEV surface.
            </p>
            <ul>
                <li><code>quoteSwap(uint256 pasWei)</code> &mdash; view-only pre-execution quote; exact mUSDC output before any on-chain commitment</li>
                <li><code>swap(uint256 minMUSDCOut)</code> &mdash; executes with a slippage guard; reverts if output falls below the caller-specified minimum</li>
                <li>Fee: 30 basis points (0.3%), capped at a maximum of 100 bps (1%) by the contract</li>
                <li>Swap is automatically suspended while the oracle is in crash mode, protecting users from stale pricing</li>
            </ul>
            <p className="text-sm text-slate-400">
                <strong>Contract:</strong> <code>0xaF1d183F4550500Beb517A3249780290A88E6e39</code> &middot; Asset Hub EVM
            </p>

            <hr className="my-10 border-slate-800" />

            <h2 id="bridge">ETH Bridge &mdash; Cross-Chain Liquidity Entry</h2>
            <p>
                A two-contract deposit bridge that accepts ETH from Ethereum (Sepolia on testnet) and
                mints mUSDC on Asset Hub, handled by an authorised backend relayer.
            </p>

            <div className="space-y-3 my-6">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded">
                    <code className="text-amber-400">EthBridgeInbox</code>
                    <span className="text-xs text-slate-500 ml-3">Ethereum Sepolia</span>
                    <p className="mt-2 text-sm text-slate-400 mb-0">
                        Accepts ETH deposits with configurable per-deposit min/max bounds. Emits{' '}
                        <code>EthDeposited(depositor, ethAmount, hubRecipient)</code> &mdash; the event
                        that triggers the relay.
                    </p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded">
                    <code className="text-cyan-400">KredioBridgeMinter</code>
                    <span className="text-xs text-slate-500 ml-3">Asset Hub EVM</span>
                    <p className="mt-2 text-sm text-slate-400 mb-0">
                        Receives the relay call after the backend validates the source deposit.
                        ETH/USD price is cross-referenced between CoinGecko and the on-chain Chainlink
                        feed &mdash; deposits are rejected when the two sources diverge by more than 2%.
                        Mints mUSDC equal to <code>ethAmount &times; ethUSD &times; (1 &minus; feeBps / 10000)</code>{' '}
                        to the Hub recipient. Replay protection is enforced at the contract level:
                        each source transaction hash can only be processed once.
                    </p>
                </div>
            </div>
            <p className="text-sm text-slate-400">
                Bridge fee: 0.2%. On mainnet, the trusted relayer key will be replaced by an
                XCM reserve transfer flow &mdash; no custody, no new trust assumptions.
            </p>

            <hr className="my-10 border-slate-800" />

            <h2 id="xcm-settler">KredioXCMSettler &mdash; Cross-Chain Intent Engine</h2>
            <p>
                Enables any Polkadot parachain with XCM Transact capability to execute Kredio protocol
                actions without the user leaving their home chain. The settler receives a
                compact-encoded intent payload and executes the corresponding protocol action in the
                same block, with full atomicity.
            </p>

            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-slate-800/50 text-slate-400">
                        <tr>
                            <th className="px-4 py-3 border-b border-slate-700">Code</th>
                            <th className="px-4 py-3 border-b border-slate-700">Intent</th>
                            <th className="px-4 py-3 border-b border-slate-700">Protocol Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-900/20">
                        {([
                            ['0x01', 'DEPOSIT_COLLATERAL', 'Post PAS to KredioPASMarket'],
                            ['0x02', 'BORROW', 'Draw mUSDC against deposited collateral'],
                            ['0x03', 'REPAY', 'Repay outstanding PAS market debt'],
                            ['0x04', 'DEPOSIT_LEND', 'Supply mUSDC to KredioLending pool'],
                            ['0x05', 'SWAP_AND_LEND', 'Swap PAS to mUSDC, then deposit &mdash; one XCM call'],
                            ['0x06', 'SWAP_AND_BORROW_COLLATERAL', 'Swap PAS to mUSDC, use as collateral &mdash; atomic'],
                            ['0x07', 'WITHDRAW_COLLATERAL', 'Release collateral from KredioPASMarket'],
                            ['0x08', 'FULL_EXIT', 'Repay debt + withdraw collateral in a single XCM extrinsic'],
                        ] as [string, string, string][]).map(([code, intent, action]) => (
                            <tr key={code} className="border-b border-slate-800">
                                <td className="px-4 py-3 font-mono text-slate-400">{code}</td>
                                <td className="px-4 py-3 font-mono text-sm text-cyan-300">{intent}</td>
                                <td className="px-4 py-3 text-slate-300" dangerouslySetInnerHTML={{ __html: action }} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p>
                <code>FULL_EXIT</code> is the standout intent: a single XCM extrinsic from a home
                parachain closes an entire Kredio position and returns collateral to the originating
                account. No multi-step manual flow, no chain switching required.
            </p>
            <p>
                Every intent produces three on-chain events &mdash; received, dispatched,
                acknowledged &mdash; forming a complete and auditable lifecycle visible on Blockscout.
            </p>
            <p className="text-sm text-slate-400">
                <strong>Contract:</strong> <code>0xbaaE8f7b97ac387DE8C433A218d63166Ce104Bb1</code> &middot; Asset Hub EVM
            </p>
        </div>
    );
}
