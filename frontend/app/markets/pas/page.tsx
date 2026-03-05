"use client";

import { Grid, PageShell, Panel, StateNotice, StatRow, StatRowSkeleton } from '../../../components/modules/ProtocolUI';
import { bpsToPercent, fmtToken, fmtOraclePrice8, fmtCount, fmtTimestamp, useGlobalProtocolData } from '../../../hooks/useProtocolData';

export default function MarketsPasPage() {
    const { pasMarket, oracle, refresh, loading, error } = useGlobalProtocolData();

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
        </PageShell>
    );
}
