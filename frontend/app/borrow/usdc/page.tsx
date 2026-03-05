"use client";

import { useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import config from '../../../lib/addresses';
import { parseUsdcInput } from '../../../lib/input';
import { useProtocolActions } from '../../../hooks/useProtocolActions';
import { bpsToPercent, fmtToken, formatHealthFactor, healthState, useUserPortfolio } from '../../../hooks/useProtocolData';
import { ActionButton, ActionInput, Grid, MarketModeSwitch, PageShell, Panel, StatRow } from '../../../components/modules/ProtocolUI';
import { useActionLog } from '../../../components/providers/ActionLogProvider';
import { useAccess } from '../../../hooks/useAccess';

export default function BorrowUsdcPage() {
    const { isConnected } = useAccount();
    const { isWrongNetwork } = useAccess();
    const actions = useProtocolActions();
    const portfolio = useUserPortfolio();
    const { logAction } = useActionLog();
    const [collateralInput, setCollateralInput] = useState('');
    const [borrowInput, setBorrowInput] = useState('');
    const [busy, setBusy] = useState(false);

    const healthTone = healthState(portfolio.lendingHealthRatio);
    const collateralAmount = useMemo(() => parseUsdcInput(collateralInput), [collateralInput]);
    const borrowAmount = useMemo(() => parseUsdcInput(borrowInput), [borrowInput]);

    const run = async (fn: () => Promise<{ ok: boolean }>) => {
        if (!isConnected) {
            logAction({ level: 'warning', action: 'Wallet check', detail: 'Connect wallet before executing borrower actions', market: 'lending' });
            return;
        }
        if (isWrongNetwork) {
            logAction({ level: 'warning', action: 'Network check', detail: 'Switch to Polkadot Hub before borrower actions', market: 'lending' });
            return;
        }
        setBusy(true);
        await fn();
        await portfolio.refresh();
        setBusy(false);
    };

    return (
        <PageShell title="Borrow / USDC" subtitle="Borrow mUSDC with mUSDC collateral on KredioLending.">
            <MarketModeSwitch base="/borrow" active="usdc" />
            <Grid>
                <Panel title="Position Health">
                    <StatRow label="Collateral" value={`${fmtToken(portfolio.lendingPosition[0], 6, 2)} mUSDC`} />
                    <StatRow label="Debt" value={`${fmtToken(portfolio.lendingPosition[1], 6, 2)} mUSDC`} />
                    <StatRow label="Accrued" value={`${fmtToken(portfolio.lendingPosition[2], 6, 4)} mUSDC`} />
                    <StatRow label="Total Owed" value={`${fmtToken(portfolio.lendingPosition[3], 6, 2)} mUSDC`} />
                    <StatRow label="Interest" value={bpsToPercent(portfolio.lendingPosition[4])} />
                    <StatRow label="Health Ratio" value={formatHealthFactor(portfolio.lendingHealthRatio)} tone={healthTone === 'red' ? 'red' : healthTone === 'yellow' ? 'yellow' : 'green'} />
                </Panel>

                <Panel title="Borrower Actions" subtitle="Approve mUSDC before collateral deposit.">
                    <ActionInput label="Collateral (mUSDC)" value={collateralInput} onChange={setCollateralInput} placeholder="e.g. 500" />
                    <div className="flex flex-wrap gap-2">
                        <ActionButton
                            label="Approve Collateral"
                            loading={busy}
                            disabled={busy || !collateralAmount}
                            onClick={() => run(() => actions.approveMUSDC(config.lending, collateralAmount!))}
                        />
                        <ActionButton
                            label="Deposit Collateral"
                            variant="ghost"
                            loading={busy}
                            disabled={busy || !collateralAmount}
                            onClick={() => {
                                if (!collateralAmount) {
                                    logAction({ level: 'warning', action: 'Deposit collateral', detail: 'Enter a valid mUSDC collateral amount', market: 'lending' });
                                    return;
                                }
                                run(() => actions.depositLendingCollateral(collateralAmount));
                            }}
                        />
                    </div>

                    <ActionInput label="Borrow Amount (mUSDC)" value={borrowInput} onChange={setBorrowInput} placeholder="e.g. 100" />
                    <div className="flex flex-wrap gap-2">
                        <ActionButton
                            label="Borrow"
                            loading={busy}
                            disabled={busy || !borrowAmount}
                            onClick={() => {
                                if (!borrowAmount) {
                                    logAction({ level: 'warning', action: 'Borrow', detail: 'Enter a valid borrow amount', market: 'lending' });
                                    return;
                                }
                                run(() => actions.borrowLending(borrowAmount));
                            }}
                        />
                        <ActionButton
                            label="Repay"
                            variant="ghost"
                            loading={busy}
                            disabled={busy}
                            onClick={() => run(() => actions.repayLending())}
                        />
                        <ActionButton
                            label="Withdraw Collateral"
                            variant="ghost"
                            loading={busy}
                            disabled={busy}
                            onClick={() => run(() => actions.withdrawLendingCollateral())}
                        />
                    </div>
                </Panel>
            </Grid>
        </PageShell>
    );
}
