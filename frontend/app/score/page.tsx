"use client";

import { Grid, PageShell, Panel, StatRow } from '../../components/modules/ProtocolUI';
import { bpsToPercent, fmtCount, tierLabel, useUserPortfolio, useUserScore } from '../../hooks/useProtocolData';

export default function ScorePage() {
    const { score, loading, error, refresh } = useUserScore();
    const portfolio = useUserPortfolio();

    return (
        <PageShell title="Credit Score" subtitle="Tiered borrower risk profile from on-chain score and repayment behavior.">
            <Grid>
                <Panel title="Current Score">
                    <StatRow label="Score" value={fmtCount(score.score)} />
                    <StatRow label="Tier" value={tierLabel(score.tier)} />
                    <StatRow label="Collateral Ratio" value={bpsToPercent(score.collateralRatioBps)} />
                    <StatRow label="Interest Rate" value={bpsToPercent(score.interestRateBps)} />
                    <StatRow label="Scored At Block" value={fmtCount(score.blockNumber)} />
                    <button onClick={refresh} className="text-xs text-cyan-300 hover:underline">Refresh Score</button>
                    {loading ? <p className="text-xs text-slate-500">Refreshing…</p> : null}
                    {error ? <p className="text-xs text-rose-300">{error}</p> : null}
                </Panel>

                <Panel title="Repayment History" subtitle="Inputs into score shaping.">
                    <StatRow label="Lending Repayments" value={fmtCount(portfolio.lendingRepaymentCount)} />
                    <StatRow label="Lending Defaults" value={fmtCount(portfolio.lendingDefaultCount)} />
                    <StatRow label="PAS Repayments" value={fmtCount(portfolio.pasRepaymentCount)} />
                    <StatRow label="PAS Defaults" value={fmtCount(portfolio.pasDefaultCount)} />
                    <StatRow label="Governance Votes" value={fmtCount(portfolio.governance[0])} />
                    <StatRow label="Conviction" value={fmtCount(portfolio.governance[1])} />
                </Panel>
            </Grid>
        </PageShell>
    );
}
