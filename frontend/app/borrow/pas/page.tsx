"use client";

import { useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { useProtocolActions } from '../../../hooks/useProtocolActions';
import { formatHealthFactor, bpsToPercent, fmtToken, fmtOraclePrice8, healthState, useGlobalProtocolData, useUserPortfolio } from '../../../hooks/useProtocolData';
import { parsePasInput, parseUsdcInput } from '../../../lib/input';
import config from '../../../lib/addresses';
import { ActionButton, ActionInput, Grid, MarketModeSwitch, PageShell, Panel, StatRow } from '../../../components/modules/ProtocolUI';
import { useActionLog } from '../../../components/providers/ActionLogProvider';
import { useAccess } from '../../../hooks/useAccess';

export default function BorrowPasPage() {
    const { isConnected } = useAccount();
    const { isWrongNetwork } = useAccess();
    const actions = useProtocolActions();
    const portfolio = useUserPortfolio();
    const { oracle } = useGlobalProtocolData();
    const { logAction } = useActionLog();

    const [pasCollateralInput, setPasCollateralInput] = useState('');
    const [borrowInput, setBorrowInput] = useState('');
    const [busy, setBusy] = useState(false);

    const borrowAmount = useMemo(() => parseUsdcInput(borrowInput), [borrowInput]);
    const pasCollateralAmount = useMemo(() => parsePasInput(pasCollateralInput), [pasCollateralInput]);
    const healthTone = healthState(portfolio.pasHealthRatio);

    const run = async (fn: () => Promise<{ ok: boolean }>) => {
        if (!isConnected) {
            logAction({ level: 'warning', action: 'Wallet check', detail: 'Connect wallet before executing borrower actions', market: 'pas' });
            return;
        }
        if (isWrongNetwork) {
            logAction({ level: 'warning', action: 'Network check', detail: 'Switch to Polkadot Hub before borrower actions', market: 'pas' });
            return;
        }
        setBusy(true);
        await fn();
        await portfolio.refresh();
        setBusy(false);
    };

    return (
        <PageShell title="Borrow / PAS" subtitle="Use native PAS collateral to borrow mUSDC in KredioPASMarket.">
            <MarketModeSwitch base="/borrow" active="pas" />
            <Grid>
                <Panel title="PAS Borrow Position">
                    <StatRow label="PAS Collateral" value={fmtToken(portfolio.pasPosition[0], 18, 4)} />
                    <StatRow label="Collateral Value" value={`${fmtToken(portfolio.pasPosition[1], 6, 2)} mUSDC`} />
                    <StatRow label="Debt" value={`${fmtToken(portfolio.pasPosition[2], 6, 2)} mUSDC`} />
                    <StatRow label="Accrued" value={`${fmtToken(portfolio.pasPosition[3], 6, 4)} mUSDC`} />
                    <StatRow label="Total Owed" value={`${fmtToken(portfolio.pasPosition[4], 6, 2)} mUSDC`} />
                    <StatRow label="Interest" value={bpsToPercent(portfolio.pasPosition[5])} />
                    <StatRow label="Health Ratio" value={formatHealthFactor(portfolio.pasHealthRatio)} tone={healthTone === 'red' ? 'red' : healthTone === 'yellow' ? 'yellow' : 'green'} />
                    <StatRow label="Oracle Price" value={fmtOraclePrice8(oracle.price8)} />
                    <StatRow label="Oracle Crash" value={oracle.isCrashed ? 'True' : 'False'} tone={oracle.isCrashed ? 'red' : 'green'} />
                </Panel>

                <Panel title="Borrower Actions" subtitle="Depositing PAS collateral uses native token value.">
                    <ActionInput label="Deposit PAS Collateral" value={pasCollateralInput} onChange={setPasCollateralInput} placeholder="e.g. 5" />
                    <div className="flex flex-wrap gap-2">
                        <ActionButton
                            label="Deposit PAS"
                            loading={busy}
                            disabled={busy || !pasCollateralAmount}
                            onClick={() => {
                                if (!pasCollateralAmount) {
                                    logAction({ level: 'warning', action: 'Deposit PAS', detail: 'Enter a valid PAS collateral amount', market: 'pas' });
                                    return;
                                }
                                run(() => actions.depositPasCollateral(pasCollateralInput.trim()));
                            }}
                        />
                        <ActionButton
                            label="Withdraw PAS Collateral"
                            variant="ghost"
                            loading={busy}
                            disabled={busy}
                            onClick={() => run(() => actions.withdrawPasCollateral())}
                        />
                    </div>

                    <ActionInput label="Borrow Amount (mUSDC)" value={borrowInput} onChange={setBorrowInput} placeholder="e.g. 150" />
                    <div className="flex flex-wrap gap-2">
                        <ActionButton
                            label="Borrow mUSDC"
                            loading={busy}
                            disabled={busy || !borrowAmount}
                            onClick={() => {
                                if (!borrowAmount) {
                                    logAction({ level: 'warning', action: 'Borrow mUSDC', detail: 'Enter a valid borrow amount', market: 'pas' });
                                    return;
                                }
                                run(() => actions.borrowPas(borrowAmount));
                            }}
                        />
                        <ActionButton
                            label="Repay"
                            variant="ghost"
                            loading={busy}
                            disabled={busy}
                            onClick={() => run(() => actions.repayPas())}
                        />
                        <ActionButton
                            label="Approve mUSDC"
                            variant="ghost"
                            loading={busy}
                            disabled={busy || !borrowAmount}
                            onClick={() => {
                                if (!borrowAmount) {
                                    logAction({ level: 'warning', action: 'Approve mUSDC', detail: 'Enter amount to approve', market: 'pas' });
                                    return;
                                }
                                run(() => actions.approveMUSDC(config.pasMarket, borrowAmount));
                            }}
                        />
                    </div>
                </Panel>
            </Grid>
        </PageShell>
    );
}
