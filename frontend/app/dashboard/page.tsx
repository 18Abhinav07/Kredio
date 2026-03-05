"use client";

import { useAccount } from 'wagmi';
import { Grid, PageShell, Panel, StateNotice, StatRow, StatRowSkeleton } from '../../components/modules/ProtocolUI';
import { bpsToPercent, fmtToken, fmtOraclePrice8, fmtCount, fmtTimestamp, useGlobalProtocolData, useUserPortfolio, useUserScore, tierLabel } from '../../hooks/useProtocolData';

export default function DashboardPage() {
    const { address, isConnected } = useAccount();
    const { lending, pasMarket, oracle, loading, error, refresh } = useGlobalProtocolData();
    const score = useUserScore();
    const portfolio = useUserPortfolio();

    return (
        <PageShell title="Dashboard" subtitle="Live protocol telemetry, wallet risk profile, and execution shortcuts.">
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                <div className="rounded-xl border border-white/10 bg-black/25 p-4 hover:border-white/20 transition-colors">
                    <p className="text-[11px] uppercase tracking-wider text-slate-400">Total Liquidity</p>
                    <p className="text-xl text-white font-semibold mt-1">{fmtToken(lending.totalDeposited + pasMarket.totalDeposited, 6, 2)} mUSDC</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-4 hover:border-white/20 transition-colors">
                    <p className="text-[11px] uppercase tracking-wider text-slate-400">Total Borrowed</p>
                    <p className="text-xl text-white font-semibold mt-1">{fmtToken(lending.totalBorrowed + pasMarket.totalBorrowed, 6, 2)} mUSDC</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-4 hover:border-white/20 transition-colors">
                    <p className="text-[11px] uppercase tracking-wider text-slate-400">My Tier</p>
                    <p className="text-xl text-white font-semibold mt-1">{tierLabel(score.score.tier)}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-4 hover:border-white/20 transition-colors">
                    <p className="text-[11px] uppercase tracking-wider text-slate-400">Oracle Status</p>
                    <p className={`text-xl font-semibold mt-1 ${oracle.isCrashed ? 'text-rose-300' : 'text-emerald-300'}`}>{oracle.isCrashed ? 'Crash Mode' : 'Healthy'}</p>
                </div>
            </section>

            <Grid>
                <Panel title="Protocol Snapshot" subtitle="Core lending and PAS market metrics.">
                    {loading ? <StatRowSkeleton label="Lending Deposits" /> : <StatRow label="Lending Deposits" value={`${fmtToken(lending.totalDeposited, 6, 2)} mUSDC`} />}
                    {loading ? <StatRowSkeleton label="Lending Borrowed" /> : <StatRow label="Lending Borrowed" value={`${fmtToken(lending.totalBorrowed, 6, 2)} mUSDC`} />}
                    {loading ? <StatRowSkeleton label="Lending Utilization" /> : <StatRow label="Lending Utilization" value={bpsToPercent(lending.utilizationBps)} />}
                    {loading ? <StatRowSkeleton label="PAS Deposits" /> : <StatRow label="PAS Deposits" value={`${fmtToken(pasMarket.totalDeposited, 6, 2)} mUSDC`} />}
                    {loading ? <StatRowSkeleton label="PAS Borrowed" /> : <StatRow label="PAS Borrowed" value={`${fmtToken(pasMarket.totalBorrowed, 6, 2)} mUSDC`} />}
                    {loading ? <StatRowSkeleton label="PAS Utilization" /> : <StatRow label="PAS Utilization" value={bpsToPercent(pasMarket.utilizationBps)} />}
                    <div className="pt-2">
                        <button onClick={refresh} className="text-xs text-cyan-300 hover:underline">Refresh Snapshot</button>
                    </div>
                    {loading ? <p className="text-xs text-slate-500">Refreshing…</p> : null}
                    {error ? <StateNotice tone="error" message={error} /> : null}
                </Panel>

                <Panel title="Wallet & Score" subtitle="Connected account risk posture and performance history.">
                    <StatRow label="Wallet" value={isConnected ? `${address?.slice(0, 6)}…${address?.slice(-4)}` : 'Not connected'} />
                    <StatRow label="Score" value={fmtCount(score.score.score)} />
                    <StatRow label="Tier" value={tierLabel(score.score.tier)} />
                    <StatRow label="Collateral Ratio" value={bpsToPercent(score.score.collateralRatioBps)} />
                    <StatRow label="Interest Rate" value={bpsToPercent(score.score.interestRateBps)} />
                    <StatRow label="Lending Repayments" value={fmtCount(portfolio.lendingRepaymentCount)} />
                    <StatRow label="Lending Defaults" value={fmtCount(portfolio.lendingDefaultCount)} />
                    <StatRow label="PAS Repayments" value={fmtCount(portfolio.pasRepaymentCount)} />
                    <StatRow label="PAS Defaults" value={fmtCount(portfolio.pasDefaultCount)} />
                    {!portfolio.loading && portfolio.lendingDeposit === 0n && portfolio.pasDeposit === 0n
                        ? <StateNotice tone="info" message="No lender positions yet. Open Lend routes to supply liquidity." />
                        : null}
                    {portfolio.error ? <StateNotice tone="warning" message={portfolio.error} /> : null}
                </Panel>
            </Grid>

            <Grid>
                <Panel title="Oracle Status" subtitle="PAS valuation source and crash status.">
                    <StatRow label="PAS Price" value={fmtOraclePrice8(oracle.price8)} />
                    <StatRow label="Round ID" value={fmtCount(oracle.roundId)} />
                    <StatRow label="Updated" value={fmtTimestamp(oracle.updatedAt)} />
                    <StatRow label="Crash Mode" value={oracle.isCrashed ? 'Active' : 'Normal'} tone={oracle.isCrashed ? 'red' : 'green'} />
                    <button onClick={refresh} className="text-xs text-cyan-300 hover:underline">Refresh Oracle</button>
                </Panel>
                <Panel title="Data Freshness" subtitle="State updates are polled every 30 seconds; use refresh buttons for immediate reads.">
                    <StateNotice tone="info" message="Use the top navbar for navigation across Borrow, Lend, Markets, Score, and Admin sections." />
                </Panel>
            </Grid>
        </PageShell>
    );
}
