"use client";

import { Grid, PageShell, Panel, StateNotice, StatRow, StatRowSkeleton } from '../../../components/modules/ProtocolUI';
import { bpsToPercent, fmtToken, fmtOraclePrice8, fmtCount, fmtTimestamp, healthState, tierLabel, useGlobalProtocolData, useUserPortfolio, formatHealthFactor } from '../../../hooks/useProtocolData';

export default function MarketsPasPage() {
    const { pasMarket, oracle, refresh, loading, error } = useGlobalProtocolData();
    const portfolio = useUserPortfolio();
    const healthTone = healthState(portfolio.pasHealthRatio);

    return (
        <PageShell title="Market: PAS Collateral" subtitle="KredioPASMarket details with oracle-linked collateral valuation.">
            <Grid>
                <Panel title="PAS Market Metrics">
                    {loading ? <StatRowSkeleton label="Total Deposited" /> : <StatRow label="Total Deposited" value={`${fmtToken(pasMarket.totalDeposited, 6, 2)} mUSDC`} />}
                    {loading ? <StatRowSkeleton label="Total Borrowed" /> : <StatRow label="Total Borrowed" value={`${fmtToken(pasMarket.totalBorrowed, 6, 2)} mUSDC`} />}
                    {loading ? <StatRowSkeleton label="Utilization" /> : <StatRow label="Utilization" value={bpsToPercent(pasMarket.utilizationBps)} />}
                    {loading ? <StatRowSkeleton label="Protocol Fees" /> : <StatRow label="Protocol Fees" value={`${fmtToken(pasMarket.protocolFees, 6, 2)} mUSDC`} />}
                    <button onClick={refresh} className="text-xs text-cyan-300 hover:underline">Refresh</button>
                    {error ? <StateNotice tone="error" message={error} /> : null}
                </Panel>

                <Panel title="Oracle">
                    <StatRow label="Price" value={fmtOraclePrice8(oracle.price8)} />
                    <StatRow label="Round ID" value={fmtCount(oracle.roundId)} />
                    <StatRow label="Updated" value={fmtTimestamp(oracle.updatedAt)} />
                    <StatRow label="Crash Mode" value={oracle.isCrashed ? 'True' : 'False'} tone={oracle.isCrashed ? 'red' : 'green'} />
                </Panel>
            </Grid>

            <Grid>
                <Panel title="My PAS Position" subtitle="Wallet-level state on PAS market.">
                    {!portfolio.loading && portfolio.pasDeposit === 0n && portfolio.pasPosition[2] === 0n
                        ? <StateNotice tone="info" message="No active PAS position yet. Deposit PAS collateral or supply mUSDC to begin." />
                        : null}
                    <StatRow label="Lend Deposit" value={`${fmtToken(portfolio.pasDeposit, 6, 2)} mUSDC`} />
                    <StatRow label="Pending Yield" value={`${fmtToken(portfolio.pasPendingYield, 6, 4)} mUSDC`} />
                    <StatRow label="PAS Collateral" value={fmtToken(portfolio.pasPosition[0], 18, 4)} />
                    <StatRow label="Collateral Value" value={`${fmtToken(portfolio.pasPosition[1], 6, 2)} mUSDC`} />
                    <StatRow label="Debt" value={`${fmtToken(portfolio.pasPosition[2], 6, 2)} mUSDC`} />
                    <StatRow label="Accrued" value={`${fmtToken(portfolio.pasPosition[3], 6, 4)} mUSDC`} />
                    <StatRow label="Total Owed" value={`${fmtToken(portfolio.pasPosition[4], 6, 2)} mUSDC`} />
                    <StatRow label="Rate" value={bpsToPercent(portfolio.pasPosition[5])} />
                    <StatRow label="Tier" value={tierLabel(portfolio.pasPosition[6])} />
                    <StatRow label="Health" value={formatHealthFactor(portfolio.pasHealthRatio)} tone={healthTone === 'red' ? 'red' : healthTone === 'yellow' ? 'yellow' : 'green'} />
                    {portfolio.error ? <StateNotice tone="warning" message={portfolio.error} /> : null}
                </Panel>

                <Panel title="Wallet Context">
                    <StatRow label="Native PAS Balance" value={fmtToken(portfolio.nativePas, 18, 4)} />
                    <StatRow label="mUSDC Collateral Wallet" value={`${fmtToken(portfolio.pasCollateralWallet, 6, 2)} mUSDC`} />
                    <StatRow label="Repayments" value={fmtCount(portfolio.pasRepaymentCount)} />
                    <StatRow label="Defaults" value={fmtCount(portfolio.pasDefaultCount)} />
                </Panel>
            </Grid>
        </PageShell>
    );
}
