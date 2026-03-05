"use client";

import { useState } from 'react';
import { usePublicClient } from 'wagmi';
import config from '../../lib/addresses';
import { ABIS } from '../../lib/constants';
import { validAddress } from '../../lib/input';
import { useProtocolActions } from '../../hooks/useProtocolActions';
import { bpsToPercent } from '../../hooks/useProtocolData';
import { useActionLog } from '../../components/providers/ActionLogProvider';
import { ActionButton, ActionInput, Grid, PageShell, Panel, StatRow } from '../../components/modules/ProtocolUI';
import { useAccess } from '../../hooks/useAccess';

export default function LiquidatePage() {
    const { isAdmin, isConnected, isWrongNetwork } = useAccess();
    const publicClient = usePublicClient();
    const actions = useProtocolActions();
    const { logAction } = useActionLog();

    const [borrowerInput, setBorrowerInput] = useState('');
    const [busy, setBusy] = useState(false);
    const [lendingHealth, setLendingHealth] = useState<bigint>(0n);
    const [pasHealth, setPasHealth] = useState<bigint>(0n);
    const [exists, setExists] = useState({ lending: false, pas: false });

    const borrower = validAddress(borrowerInput);

    if (!isAdmin) {
        return (
            <PageShell title="Liquidation Monitor" subtitle="Admin authorization required.">
                <Panel title="Access Restricted" subtitle="This page is visible only to the authorized admin wallet.">
                    <StatRow label="Connected" value={isConnected ? 'Yes' : 'No'} />
                    <StatRow label="Authorized Admin" value="No" tone="red" />
                </Panel>
            </PageShell>
        );
    }

    const inspect = async () => {
        if (!publicClient || !borrower) {
            logAction({ level: 'warning', action: 'Liquidation check', detail: 'Enter a valid borrower address', market: 'system' });
            return;
        }
        if (isWrongNetwork) {
            logAction({ level: 'warning', action: 'Liquidation check', detail: 'Switch to Polkadot Hub before reading health', market: 'system' });
            return;
        }
        setBusy(true);
        try {
            const [lh, ph, lp, pp] = await Promise.all([
                publicClient.readContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'healthRatio', args: [borrower] }) as Promise<bigint>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'healthRatio', args: [borrower] }) as Promise<bigint>,
                publicClient.readContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'getPositionFull', args: [borrower] }) as Promise<readonly [bigint, bigint, bigint, bigint, number, number, boolean]>,
                publicClient.readContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'getPositionFull', args: [borrower] }) as Promise<readonly [bigint, bigint, bigint, bigint, bigint, number, number, boolean]>,
            ]);
            setLendingHealth(lh);
            setPasHealth(ph);
            setExists({ lending: lp[6], pas: pp[7] });
            logAction({ action: 'Liquidation check', detail: 'Borrower position health refreshed', market: 'system' });
        } catch (error) {
            logAction({ level: 'error', action: 'Liquidation check', detail: error instanceof Error ? error.message : 'Read failed', market: 'system' });
        } finally {
            setBusy(false);
        }
    };

    const run = async (fn: () => Promise<{ ok: boolean }>) => {
        if (!isConnected) {
            logAction({ level: 'warning', action: 'Liquidation action', detail: 'Connect wallet first', market: 'system' });
            return;
        }
        if (isWrongNetwork) {
            logAction({ level: 'warning', action: 'Liquidation action', detail: 'Switch to Polkadot Hub before liquidating', market: 'system' });
            return;
        }
        setBusy(true);
        await fn();
        await inspect();
        setBusy(false);
    };

    return (
        <PageShell title="Liquidation Monitor" subtitle="Check borrower health and execute market liquidation when below threshold.">
            <Grid>
                <Panel title="Inspect Borrower">
                    <ActionInput label="Borrower Address" value={borrowerInput} onChange={setBorrowerInput} placeholder="0x…" />
                    <ActionButton label="Load Health" loading={busy} disabled={busy || !borrower} onClick={inspect} />
                    <StatRow label="Lending Position Active" value={exists.lending ? 'Yes' : 'No'} />
                    <StatRow label="Lending Health" value={bpsToPercent(lendingHealth)} tone={Number(lendingHealth) < 11000 ? 'red' : Number(lendingHealth) < 15000 ? 'yellow' : 'green'} />
                    <StatRow label="PAS Position Active" value={exists.pas ? 'Yes' : 'No'} />
                    <StatRow label="PAS Health" value={bpsToPercent(pasHealth)} tone={Number(pasHealth) < 11000 ? 'red' : Number(pasHealth) < 15000 ? 'yellow' : 'green'} />
                </Panel>

                <Panel title="Liquidator Actions" subtitle="Admin-only liquidation controls for at-risk positions.">
                    <div className="flex flex-wrap gap-2">
                        <ActionButton
                            label="Liquidate Lending"
                            loading={busy}
                            disabled={busy || !borrower || !exists.lending}
                            variant="danger"
                            onClick={() => run(() => actions.liquidateLending(borrower!))}
                        />
                        <ActionButton
                            label="Liquidate PAS"
                            loading={busy}
                            disabled={busy || !borrower || !exists.pas}
                            variant="danger"
                            onClick={() => run(() => actions.liquidatePas(borrower!))}
                        />
                    </div>
                </Panel>
            </Grid>
        </PageShell>
    );
}
