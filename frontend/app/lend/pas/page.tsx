"use client";

import { useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import config from '../../../lib/addresses';
import { useProtocolActions } from '../../../hooks/useProtocolActions';
import { fmtToken, useGlobalProtocolData, useUserPortfolio } from '../../../hooks/useProtocolData';
import { parseUsdcInput } from '../../../lib/input';
import { useActionLog } from '../../../components/providers/ActionLogProvider';
import { ActionButton, ActionInput, Grid, MarketModeSwitch, PageShell, Panel, StatRow } from '../../../components/modules/ProtocolUI';
import { useAccess } from '../../../hooks/useAccess';

export default function LendPasPage() {
    const { isConnected } = useAccount();
    const { isWrongNetwork } = useAccess();
    const actions = useProtocolActions();
    const { pasMarket } = useGlobalProtocolData();
    const portfolio = useUserPortfolio();
    const { logAction } = useActionLog();

    const [amountInput, setAmountInput] = useState('');
    const [busy, setBusy] = useState(false);

    const amount = useMemo(() => parseUsdcInput(amountInput), [amountInput]);

    const run = async (fn: () => Promise<{ ok: boolean }>) => {
        if (!isConnected) {
            logAction({ level: 'warning', action: 'Wallet check', detail: 'Connect wallet before lender actions', market: 'pas' });
            return;
        }
        if (isWrongNetwork) {
            logAction({ level: 'warning', action: 'Network check', detail: 'Switch to Polkadot Hub before lender actions', market: 'pas' });
            return;
        }
        setBusy(true);
        await fn();
        await portfolio.refresh();
        setBusy(false);
    };

    return (
        <PageShell title="Lend / PAS Market" subtitle="Lender actions for the PAS collateralized lending pool.">
            <MarketModeSwitch base="/lend" active="pas" />
            <Grid>
                <Panel title="My Lender Position">
                    <StatRow label="Deposit Balance" value={`${fmtToken(portfolio.pasDeposit, 6, 2)} mUSDC`} />
                    <StatRow label="Pending Yield" value={`${fmtToken(portfolio.pasPendingYield, 6, 4)} mUSDC`} />
                    <StatRow label="Pool Total Deposits" value={`${fmtToken(pasMarket.totalDeposited, 6, 2)} mUSDC`} />
                    <StatRow label="Pool Total Borrowed" value={`${fmtToken(pasMarket.totalBorrowed, 6, 2)} mUSDC`} />
                </Panel>

                <Panel title="Lender Actions" subtitle="Approve mUSDC for PAS market contract before deposit.">
                    <ActionInput label="Amount (mUSDC)" value={amountInput} onChange={setAmountInput} placeholder="e.g. 750" />
                    <div className="flex flex-wrap gap-2">
                        <ActionButton
                            label="Approve"
                            loading={busy}
                            disabled={busy || !amount}
                            onClick={() => {
                                if (!amount) {
                                    logAction({ level: 'warning', action: 'Approve', detail: 'Enter a valid mUSDC amount', market: 'pas' });
                                    return;
                                }
                                run(() => actions.approveMUSDC(config.pasMarket, amount));
                            }}
                        />
                        <ActionButton
                            label="Deposit"
                            variant="ghost"
                            loading={busy}
                            disabled={busy || !amount}
                            onClick={() => {
                                if (!amount) {
                                    logAction({ level: 'warning', action: 'Deposit', detail: 'Enter a valid deposit amount', market: 'pas' });
                                    return;
                                }
                                run(() => actions.depositPasLend(amount));
                            }}
                        />
                        <ActionButton
                            label="Withdraw"
                            variant="ghost"
                            loading={busy}
                            disabled={busy || !amount}
                            onClick={() => {
                                if (!amount) {
                                    logAction({ level: 'warning', action: 'Withdraw', detail: 'Enter a valid withdraw amount', market: 'pas' });
                                    return;
                                }
                                run(() => actions.withdrawPasLend(amount));
                            }}
                        />
                        <ActionButton
                            label="Harvest Yield"
                            variant="ghost"
                            loading={busy}
                            disabled={busy}
                            onClick={() => run(() => actions.harvestPasLend())}
                        />
                    </div>
                </Panel>
            </Grid>
        </PageShell>
    );
}
