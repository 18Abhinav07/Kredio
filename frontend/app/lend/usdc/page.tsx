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

export default function LendUsdcPage() {
    const { isConnected } = useAccount();
    const { isWrongNetwork } = useAccess();
    const actions = useProtocolActions();
    const { lending } = useGlobalProtocolData();
    const portfolio = useUserPortfolio();
    const { logAction } = useActionLog();

    const [amountInput, setAmountInput] = useState('');
    const [busy, setBusy] = useState(false);

    const amount = useMemo(() => parseUsdcInput(amountInput), [amountInput]);

    const run = async (fn: () => Promise<{ ok: boolean }>) => {
        if (!isConnected) {
            logAction({ level: 'warning', action: 'Wallet check', detail: 'Connect wallet before lender actions', market: 'lending' });
            return;
        }
        if (isWrongNetwork) {
            logAction({ level: 'warning', action: 'Network check', detail: 'Switch to Polkadot Hub before lender actions', market: 'lending' });
            return;
        }
        setBusy(true);
        await fn();
        await portfolio.refresh();
        setBusy(false);
    };

    return (
        <PageShell title="Lend / USDC" subtitle="Lender actions for KredioLending pool.">
            <MarketModeSwitch base="/lend" active="usdc" />
            <Grid>
                <Panel title="My Lender Position">
                    <StatRow label="Deposit Balance" value={`${fmtToken(portfolio.lendingDeposit, 6, 2)} mUSDC`} />
                    <StatRow label="Pending Yield" value={`${fmtToken(portfolio.lendingPendingYield, 6, 4)} mUSDC`} />
                    <StatRow label="Pool Total Deposits" value={`${fmtToken(lending.totalDeposited, 6, 2)} mUSDC`} />
                    <StatRow label="Pool Total Borrowed" value={`${fmtToken(lending.totalBorrowed, 6, 2)} mUSDC`} />
                </Panel>

                <Panel title="Lender Actions" subtitle="Approve once, then deposit/withdraw/harvest.">
                    <ActionInput label="Amount (mUSDC)" value={amountInput} onChange={setAmountInput} placeholder="e.g. 1000" />
                    <div className="flex flex-wrap gap-2">
                        <ActionButton
                            label="Approve"
                            loading={busy}
                            disabled={busy || !amount}
                            onClick={() => {
                                if (!amount) {
                                    logAction({ level: 'warning', action: 'Approve', detail: 'Enter a valid mUSDC amount', market: 'lending' });
                                    return;
                                }
                                run(() => actions.approveMUSDC(config.lending, amount));
                            }}
                        />
                        <ActionButton
                            label="Deposit"
                            variant="ghost"
                            loading={busy}
                            disabled={busy || !amount}
                            onClick={() => {
                                if (!amount) {
                                    logAction({ level: 'warning', action: 'Deposit', detail: 'Enter a valid deposit amount', market: 'lending' });
                                    return;
                                }
                                run(() => actions.depositLending(amount));
                            }}
                        />
                        <ActionButton
                            label="Withdraw"
                            variant="ghost"
                            loading={busy}
                            disabled={busy || !amount}
                            onClick={() => {
                                if (!amount) {
                                    logAction({ level: 'warning', action: 'Withdraw', detail: 'Enter a valid withdraw amount', market: 'lending' });
                                    return;
                                }
                                run(() => actions.withdrawLending(amount));
                            }}
                        />
                        <ActionButton
                            label="Harvest Yield"
                            variant="ghost"
                            loading={busy}
                            disabled={busy}
                            onClick={() => run(() => actions.harvestLending())}
                        />
                    </div>
                </Panel>
            </Grid>
        </PageShell>
    );
}
