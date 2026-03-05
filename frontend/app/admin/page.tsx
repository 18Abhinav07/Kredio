"use client";

import { useState } from 'react';
import { useAccount } from 'wagmi';
import config from '../../lib/addresses';
import { validAddress } from '../../lib/input';
import { useProtocolActions } from '../../hooks/useProtocolActions';
import { useActionLog } from '../../components/providers/ActionLogProvider';
import { ActionButton, ActionInput, Grid, PageShell, Panel, StatRow } from '../../components/modules/ProtocolUI';
import { useAccess } from '../../hooks/useAccess';

export default function AdminPage() {
    const { address, isConnected } = useAccount();
    const { isAdmin, isWrongNetwork } = useAccess();
    const actions = useProtocolActions();
    const { logAction } = useActionLog();

    const [busy, setBusy] = useState(false);
    const [targetUser, setTargetUser] = useState('');
    const [receiver, setReceiver] = useState('');
    const [multiplier, setMultiplier] = useState('12000');
    const [oraclePrice8, setOraclePrice8] = useState('100000000');
    const [votes, setVotes] = useState('100');
    const [conviction, setConviction] = useState('2');
    const [ltvBps, setLtvBps] = useState('7000');
    const [liqBonusBps, setLiqBonusBps] = useState('500');
    const [staleness, setStaleness] = useState('3600');
    const [feeBps, setFeeBps] = useState('250');

    const safeTarget = validAddress(targetUser);
    const safeReceiver = validAddress(receiver);
    const numeric = (value: string) => (/^\d+$/.test(value.trim()) ? BigInt(value.trim()) : null);

    if (!isAdmin) {
        return (
            <PageShell title="Admin" subtitle="Owner-only controls for risk and protocol operations.">
                <Panel title="Access Restricted" subtitle="This page is visible only to the authorized admin wallet.">
                    <StatRow label="Connected" value={isConnected ? 'Yes' : 'No'} />
                    <StatRow label="Authorized Admin" value="No" tone="red" />
                </Panel>
            </PageShell>
        );
    }

    const run = async (fn: () => Promise<{ ok: boolean }>) => {
        if (!isConnected) {
            logAction({ level: 'warning', action: 'Admin gate', detail: 'Connect wallet before admin actions', market: 'system' });
            return;
        }
        if (isWrongNetwork) {
            logAction({ level: 'warning', action: 'Admin gate', detail: 'Switch to Polkadot Hub before admin actions', market: 'system' });
            return;
        }
        setBusy(true);
        await fn();
        setBusy(false);
    };

    return (
        <PageShell title="Admin" subtitle="Owner-only controls for risk, emergency response and protocol operations.">
            <Panel title="Access Control">
                <StatRow label="Connected Wallet" value={address ? `${address.slice(0, 6)}…${address.slice(-4)}` : 'Not connected'} />
                <StatRow label="Expected Owner" value={`${config.owner.slice(0, 6)}…${config.owner.slice(-4)}`} />
                <StatRow label="Authorized" value="Yes" tone="green" />
            </Panel>

            <Grid>
                <Panel title="Sweeps & Multipliers">
                    <ActionInput label="Receiver Address" value={receiver} onChange={setReceiver} placeholder="0x..." />
                    <ActionInput label="Target User" value={targetUser} onChange={setTargetUser} placeholder="0x..." />
                    <ActionInput label="Demo Multiplier" value={multiplier} onChange={setMultiplier} placeholder="e.g. 12000" />
                    <div className="flex flex-wrap gap-2">
                        <ActionButton label="Sweep Lending Fees" loading={busy} disabled={busy || !safeReceiver} onClick={() => run(() => actions.sweepLendingFees(safeReceiver!))} />
                        <ActionButton label="Sweep PAS Fees" loading={busy} disabled={busy || !safeReceiver} onClick={() => run(() => actions.sweepPasFees(safeReceiver!))} />
                        <ActionButton
                            label="Set Lending Multiplier"
                            variant="ghost"
                            loading={busy}
                            disabled={busy || !safeTarget}
                            onClick={() => {
                                const value = numeric(multiplier);
                                if (value === null) {
                                    logAction({ level: 'warning', action: 'Set Lending Multiplier', detail: 'Multiplier must be an integer value', market: 'system' });
                                    return;
                                }
                                run(() => actions.setLendingMultiplier(safeTarget!, value));
                            }}
                        />
                        <ActionButton
                            label="Set PAS Multiplier"
                            variant="ghost"
                            loading={busy}
                            disabled={busy || !safeTarget}
                            onClick={() => {
                                const value = numeric(multiplier);
                                if (value === null) {
                                    logAction({ level: 'warning', action: 'Set PAS Multiplier', detail: 'Multiplier must be an integer value', market: 'system' });
                                    return;
                                }
                                run(() => actions.setPasMultiplier(safeTarget!, value));
                            }}
                        />
                    </div>
                </Panel>

                <Panel title="Oracle Controls">
                    <ActionInput label="Price (8 decimals)" value={oraclePrice8} onChange={setOraclePrice8} placeholder="100000000" />
                    <div className="flex flex-wrap gap-2">
                        <ActionButton
                            label="Set Oracle Price"
                            loading={busy}
                            onClick={() => {
                                const value = numeric(oraclePrice8);
                                if (value === null) {
                                    logAction({ level: 'warning', action: 'Set Oracle Price', detail: 'Price must be an integer (8 decimals)', market: 'system' });
                                    return;
                                }
                                run(() => actions.oracleSetPrice(value));
                            }}
                            disabled={busy}
                        />
                        <ActionButton
                            label="Crash Oracle"
                            variant="danger"
                            loading={busy}
                            onClick={() => {
                                const value = numeric(oraclePrice8);
                                if (value === null) {
                                    logAction({ level: 'warning', action: 'Crash Oracle', detail: 'Crash price must be an integer (8 decimals)', market: 'system' });
                                    return;
                                }
                                run(() => actions.oracleCrash(value));
                            }}
                            disabled={busy}
                        />
                        <ActionButton label="Recover Oracle" variant="ghost" loading={busy} onClick={() => run(() => actions.oracleRecover())} disabled={busy} />
                    </div>
                </Panel>

                <Panel title="PAS Risk Parameters">
                    <ActionInput label="LTV BPS" value={ltvBps} onChange={setLtvBps} placeholder="7000" />
                    <ActionInput label="Liquidation Bonus BPS" value={liqBonusBps} onChange={setLiqBonusBps} placeholder="500" />
                    <ActionInput label="Staleness Limit (s)" value={staleness} onChange={setStaleness} placeholder="3600" />
                    <ActionInput label="Protocol Fee BPS" value={feeBps} onChange={setFeeBps} placeholder="250" />
                    <div className="flex flex-wrap gap-2">
                        <ActionButton
                            label="Set Risk Params"
                            loading={busy}
                            onClick={() => {
                                const ltv = numeric(ltvBps);
                                const bonus = numeric(liqBonusBps);
                                const stale = numeric(staleness);
                                const fee = numeric(feeBps);
                                if (ltv === null || bonus === null || stale === null || fee === null) {
                                    logAction({ level: 'warning', action: 'Set Risk Params', detail: 'All risk params must be integer values', market: 'system' });
                                    return;
                                }
                                run(() => actions.setPasRiskParams(ltv, bonus, stale, fee));
                            }}
                            disabled={busy}
                        />
                        <ActionButton label="Pause PAS" variant="danger" loading={busy} onClick={() => run(() => actions.pausePas())} disabled={busy} />
                        <ActionButton label="Unpause PAS" variant="ghost" loading={busy} onClick={() => run(() => actions.unpausePas())} disabled={busy} />
                    </div>
                </Panel>

                <Panel title="Governance Cache">
                    <ActionInput label="User" value={targetUser} onChange={setTargetUser} placeholder="0x..." />
                    <ActionInput label="Votes" value={votes} onChange={setVotes} placeholder="100" />
                    <ActionInput label="Conviction" value={conviction} onChange={setConviction} placeholder="2" />
                    <ActionButton
                        label="Set Governance Data"
                        loading={busy}
                        disabled={busy || !safeTarget}
                        onClick={() => {
                            const voteCount = numeric(votes);
                            const convictionInt = Number(conviction);
                            if (voteCount === null || !Number.isInteger(convictionInt) || convictionInt < 0) {
                                logAction({ level: 'warning', action: 'Set Governance Data', detail: 'Votes and conviction must be valid integer values', market: 'system' });
                                return;
                            }
                            run(() => actions.setGovernanceData(safeTarget!, voteCount, convictionInt));
                        }}
                    />
                </Panel>
            </Grid>
        </PageShell>
    );
}
