"use client";

import { PageShell, Panel, StateNotice, StatRow, StatRowSkeleton } from '../../../components/modules/ProtocolUI';
import { bpsToPercent, fmtToken, useGlobalProtocolData } from '../../../hooks/useProtocolData';

export default function MarketsUsdcPage() {
    const { lending, refresh, loading, error } = useGlobalProtocolData();

    return (
        <PageShell title="Market: USDC Lending" subtitle="KredioLending pool metrics.">
            <Panel title="Pool Metrics">
                {loading ? <StatRowSkeleton label="Total Deposited" /> : <StatRow label="Total Deposited" value={`${fmtToken(lending.totalDeposited, 6, 2)} mUSDC`} />}
                {loading ? <StatRowSkeleton label="Total Borrowed" /> : <StatRow label="Total Borrowed" value={`${fmtToken(lending.totalBorrowed, 6, 2)} mUSDC`} />}
                {loading ? <StatRowSkeleton label="Utilization" /> : <StatRow label="Utilization" value={bpsToPercent(lending.utilizationBps)} />}
                {loading ? <StatRowSkeleton label="Protocol Fees" /> : <StatRow label="Protocol Fees" value={`${fmtToken(lending.protocolFees, 6, 2)} mUSDC`} />}
                <button onClick={refresh} className="text-xs text-cyan-300 hover:underline mt-1">Refresh</button>
                {error ? <StateNotice tone="error" message={error} /> : null}
            </Panel>
        </PageShell>
    );
}
