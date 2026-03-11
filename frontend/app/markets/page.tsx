"use client";

import { Grid, PageShell, Panel, StatRow } from '../../components/modules/ProtocolUI';
import { bpsToPercent, fmtToken, fmtOraclePrice8, fmtCount, fmtTimestamp, useGlobalProtocolData } from '../../hooks/useProtocolData';

function estLenderAPY(utilizationBps: bigint, avgBorrowRateBps = 1100): string {
    const util = Number(utilizationBps) / 10_000;
    const apy = util * (avgBorrowRateBps / 10_000) * 0.9 * 100;
    return `${apy.toFixed(2)}%`;
}

export default function MarketsIndexPage() {
    const { lending, pasMarket, oracle, refresh } = useGlobalProtocolData();

    return (
        <PageShell title="Markets" subtitle="All protocol markets - USDC lending, PAS-collateral lending, and PAS borrowing.">

            {/* ── Row 1: USDC Lending ── */}
            <Panel title="USDC Lending Market" subtitle="KredioLending - mUSDC collateral borrowing pool.">
                <StatRow label="Total Deposited" value={`${fmtToken(lending.totalDeposited, 6, 2)} mUSDC`} />
                <StatRow label="Total Borrowed" value={`${fmtToken(lending.totalBorrowed, 6, 2)} mUSDC`} />
                <StatRow label="Utilization" value={bpsToPercent(lending.utilizationBps)} />
                <StatRow label="Est. Lender APY" value={estLenderAPY(lending.utilizationBps)} tone="green" />
                <StatRow label="Protocol Fees" value={`${fmtToken(lending.protocolFees, 6, 6)} mUSDC`} />
            </Panel>

            {/* ── Row 2: PAS Market ── */}
            <Panel title="PAS Collateral Market" subtitle="KredioPASMarket - native PAS collateral borrowing pool with oracle pricing.">
                <Grid>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Pool Metrics</p>
                        <StatRow label="Total Deposited" value={`${fmtToken(pasMarket.totalDeposited, 6, 2)} mUSDC`} />
                        <StatRow label="Total Borrowed" value={`${fmtToken(pasMarket.totalBorrowed, 6, 2)} mUSDC`} />
                        <StatRow label="Utilization" value={bpsToPercent(pasMarket.utilizationBps)} />
                        <StatRow label="Est. Lender APY" value={estLenderAPY(pasMarket.utilizationBps, 1600)} tone="green" />
                        <StatRow label="Protocol Fees" value={`${fmtToken(pasMarket.protocolFees, 6, 6)} mUSDC`} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">PAS Oracle</p>
                        <StatRow label="Price" value={fmtOraclePrice8(oracle.price8)} tone={oracle.isCrashed ? 'red' : 'green'} />
                        <StatRow label="Round ID" value={fmtCount(oracle.roundId)} />
                        <StatRow label="Last Update" value={fmtTimestamp(oracle.updatedAt)} />
                        <StatRow label="Crash Mode" value={oracle.isCrashed ? 'Active' : 'Normal'} tone={oracle.isCrashed ? 'red' : 'green'} />
                    </div>
                </Grid>
            </Panel>

            <button onClick={refresh} className="text-sm text-cyan-300 hover:underline">Refresh Market Data</button>
        </PageShell>
    );
}
