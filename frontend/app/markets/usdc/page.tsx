"use client";

import { Grid, PageShell, Panel, StateNotice, StatRow, StatRowSkeleton } from '../../../components/modules/ProtocolUI';
import { formatHealthFactor, bpsToPercent, fmtToken, healthState, tierLabel, useGlobalProtocolData, useUserPortfolio, useUserScore } from '../../../hooks/useProtocolData';

export default function MarketsUsdcPage() {
    const { lending, refresh, loading, error } = useGlobalProtocolData();
    const score = useUserScore();
    const portfolio = useUserPortfolio();
    const healthTone = healthState(portfolio.lendingHealthRatio);

    return (
        <PageShell title="Market: USDC Lending" subtitle="KredioLending market detail for lenders and borrowers.">
            <Grid>
                <Panel title="Pool Metrics">
                    {loading ? <StatRowSkeleton label="Total Deposited" /> : <StatRow label="Total Deposited" value={`${fmtToken(lending.totalDeposited, 6, 2)} mUSDC`} />}
                    {loading ? <StatRowSkeleton label="Total Borrowed" /> : <StatRow label="Total Borrowed" value={`${fmtToken(lending.totalBorrowed, 6, 2)} mUSDC`} />}
                    {loading ? <StatRowSkeleton label="Utilization" /> : <StatRow label="Utilization" value={bpsToPercent(lending.utilizationBps)} />}
                    {loading ? <StatRowSkeleton label="Protocol Fees" /> : <StatRow label="Protocol Fees" value={`${fmtToken(lending.protocolFees, 6, 2)} mUSDC`} />}
                    <button onClick={refresh} className="text-xs text-cyan-300 hover:underline">Refresh</button>
                    {error ? <StateNotice tone="error" message={error} /> : null}
                </Panel>

                <Panel title="My Position" subtitle="Current lender and borrower values for connected wallet.">
                    {!portfolio.loading && portfolio.lendingDeposit === 0n && portfolio.lendingPosition[1] === 0n
                        ? <StateNotice tone="info" message="No active USDC position yet. Deposit collateral and borrow or lend to get started." />
                        : null}
                    <StatRow label="Deposit Balance" value={`${fmtToken(portfolio.lendingDeposit, 6, 2)} mUSDC`} />
                    <StatRow label="Pending Yield" value={`${fmtToken(portfolio.lendingPendingYield, 6, 4)} mUSDC`} />
                    <StatRow label="Collateral" value={`${fmtToken(portfolio.lendingPosition[0], 6, 2)} mUSDC`} />
                    <StatRow label="Debt" value={`${fmtToken(portfolio.lendingPosition[1], 6, 2)} mUSDC`} />
                    <StatRow label="Accrued Interest" value={`${fmtToken(portfolio.lendingPosition[2], 6, 4)} mUSDC`} />
                    <StatRow label="Total Owed" value={`${fmtToken(portfolio.lendingPosition[3], 6, 2)} mUSDC`} />
                    <StatRow label="Rate" value={bpsToPercent(portfolio.lendingPosition[4])} />
                    <StatRow label="Tier" value={tierLabel(portfolio.lendingPosition[5])} />
                    <StatRow label="Health" value={formatHealthFactor(portfolio.lendingHealthRatio)} tone={healthTone === 'red' ? 'red' : healthTone === 'yellow' ? 'yellow' : 'green'} />
                    {portfolio.error ? <StateNotice tone="warning" message={portfolio.error} /> : null}
                </Panel>
            </Grid>

            <Panel title="Score Context" subtitle="Borrow terms are score-adjusted.">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
                    <div className="rounded-xl border border-white/10 bg-black/25 p-3"><p className="text-slate-400 text-xs">Score</p><p className="text-white font-medium">{score.score.score.toString()}</p></div>
                    <div className="rounded-xl border border-white/10 bg-black/25 p-3"><p className="text-slate-400 text-xs">Tier</p><p className="text-white font-medium">{tierLabel(score.score.tier)}</p></div>
                    <div className="rounded-xl border border-white/10 bg-black/25 p-3"><p className="text-slate-400 text-xs">Collateral Ratio</p><p className="text-white font-medium">{bpsToPercent(score.score.collateralRatioBps)}</p></div>
                    <div className="rounded-xl border border-white/10 bg-black/25 p-3"><p className="text-slate-400 text-xs">Borrow Rate</p><p className="text-white font-medium">{bpsToPercent(score.score.interestRateBps)}</p></div>
                </div>
            </Panel>
        </PageShell>
    );
}
