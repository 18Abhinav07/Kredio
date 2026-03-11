"use client";

import { useCallback, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import config from '../../lib/addresses';
import { validAddress } from '../../lib/input';
import { useProtocolActions } from '../../hooks/useProtocolActions';
import { useActionLog } from '../../components/providers/ActionLogProvider';
import { ActionButton, ActionInput, Grid, PageShell, Panel, StatRow } from '../../components/modules/ProtocolUI';
import { useAccess } from '../../hooks/useAccess';
import { ABIS } from '../../lib/constants';

// ─── Per-action busy tracking ─────────────────────────────────────────────────
function useActionBusy() {
    const [busy, setBusy] = useState<Set<string>>(new Set());
    const isBusy = (key: string) => busy.has(key);
    const withBusy = useCallback(
        async (key: string, fn: () => Promise<{ ok: boolean }>) => {
            setBusy(prev => new Set(prev).add(key));
            try { await fn(); } finally {
                setBusy(prev => { const s = new Set(prev); s.delete(key); return s; });
            }
        },
        [],
    );
    return { isBusy, withBusy };
}

function parseAddresses(raw: string): `0x${string}`[] {
    return raw.split(',').map(s => s.trim()).filter(s => /^0x[0-9a-fA-F]{40}$/.test(s)) as `0x${string}`[];
}

function fmt6(v: bigint | undefined) {
    if (v === undefined) return '-';
    return (Number(v) / 1e6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 });
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mt-2 mb-0">{children}</h2>;
}

function InfoBox({ children }: { children: React.ReactNode }) {
    return <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-xs text-slate-400 leading-relaxed">{children}</div>;
}

const TICK_PRESETS = [
    { label: '1× (normal)', value: '0' },
    { label: '60× (1 sec = 1 min)', value: '60' },
    { label: '3600× (1 sec = 1 hr)', value: '3600' },
    { label: '86400× (1 sec = 1 day)', value: '86400' },
    { label: '525600× (1 sec = 1 yr)', value: '525600' },
];

export default function AdminPage() {
    const { address, isConnected } = useAccount();
    const { isAdmin, isWrongNetwork } = useAccess();
    const actions = useProtocolActions();
    const { logAction } = useActionLog();
    const { isBusy, withBusy } = useActionBusy();

    const [targetUser, setTargetUser] = useState('');
    const [receiver, setReceiver] = useState('');
    const [bulkUsers, setBulkUsers] = useState('');
    const [multiplier, setMultiplier] = useState('60');
    const [tickValue, setTickValue] = useState('60');
    const [oraclePrice8, setOraclePrice8] = useState('100000000');
    const [votes, setVotes] = useState('100');
    const [conviction, setConviction] = useState('2');
    const [ltvBps, setLtvBps] = useState('6500');
    const [liqBonusBps, setLiqBonusBps] = useState('800');
    const [staleness, setStaleness] = useState('3600');
    const [feeBps, setFeeBps] = useState('1000');

    // ── Yield strategy state ──────────────────────────────────────────────
    const [yieldRateBps, setYieldRateBps] = useState('600');
    const [investAmount, setInvestAmount] = useState('');
    const [pullAmount, setPullAmount] = useState('');
    const [newInvestRatio, setNewInvestRatio] = useState('5000');
    const [newMinBuffer, setNewMinBuffer] = useState('2000');
    const [newYieldPool, setNewYieldPool] = useState('');

    const safeTarget = validAddress(targetUser) as `0x${string}` | null;
    const safeReceiver = validAddress(receiver) as `0x${string}` | null;
    const safeNewYieldPool = validAddress(newYieldPool) as `0x${string}` | null;
    const bulkAddrs = parseAddresses(bulkUsers);
    const numeric = (s: string) => (/^\d+$/.test(s.trim()) ? BigInt(s.trim()) : null);

    const { data: lendingTick } = useReadContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'globalTick', query: { refetchInterval: 5000 } });
    const { data: pasTick } = useReadContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'globalTick', query: { refetchInterval: 5000 } });
    const { data: lendingTotalDeposited } = useReadContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'totalDeposited', query: { refetchInterval: 5000 } });
    const { data: lendingTotalBorrowed } = useReadContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'totalBorrowed', query: { refetchInterval: 5000 } });
    const { data: pasTotalDeposited } = useReadContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'totalDeposited', query: { refetchInterval: 5000 } });
    const { data: pasTotalBorrowed } = useReadContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'totalBorrowed', query: { refetchInterval: 5000 } });
    const { data: lendingFees } = useReadContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'protocolFees', query: { refetchInterval: 5000 } });
    const { data: pasFees } = useReadContract({ address: config.pasMarket, abi: ABIS.KREDIO_PAS_MARKET, functionName: 'protocolFees', query: { refetchInterval: 5000 } });

    // ── Yield strategy reads ────────────────────────────────────────────────
    const { data: stratStatus, refetch: refetchStrategy } = useReadContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'strategyStatus', query: { refetchInterval: 10000 } });
    const { data: pendingYield } = useReadContract({ address: config.lending, abi: ABIS.KREDIO_LENDING, functionName: 'pendingStrategyYield', query: { refetchInterval: 10000 } });
    const { data: poolYieldRate } = useReadContract({ address: config.yieldPool, abi: ABIS.MOCK_YIELD_POOL, functionName: 'yieldRateBps', query: { refetchInterval: 10000 } });
    const { data: poolPrincipal } = useReadContract({ address: config.yieldPool, abi: ABIS.MOCK_YIELD_POOL, functionName: 'totalPrincipal', query: { refetchInterval: 10000 } });

    // strategyStatus() returns [pool, invested, totalEarned, pendingYield, investRatioBps, minBufferBps]
    const ss = stratStatus as readonly [string, bigint, bigint, bigint, bigint, bigint] | undefined;

    const run = useCallback(
        async (key: string, fn: () => Promise<{ ok: boolean }>) => {
            if (!isConnected) { logAction({ level: 'warning', action: key, detail: 'Connect wallet first', market: 'system' }); return; }
            if (isWrongNetwork) { logAction({ level: 'warning', action: key, detail: 'Switch to Polkadot Hub', market: 'system' }); return; }
            withBusy(key, fn);
        },
        [isConnected, isWrongNetwork, logAction, withBusy],
    );

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

    return (
        <PageShell title="Admin" subtitle="Owner-only controls - interest acceleration, bulk resets, oracle, risk parameters and governance.">

            {/* Access panel */}
            <Panel title="Access Control">
                <StatRow label="Connected Wallet" value={address ? `${address.slice(0, 8)}…${address.slice(-6)}` : 'Not connected'} />
                <StatRow label="Expected Owner" value={`${config.owner.slice(0, 8)}…${config.owner.slice(-6)}`} />
                <StatRow label="Authorized" value="Yes" tone="green" />
            </Panel>

            {/* Pool state summary */}
            <SectionTitle>Pool State</SectionTitle>
            <Grid>
                <Panel title="KredioLending (USDC Market)">
                    <StatRow label="Global Tick" value={lendingTick !== undefined ? `${lendingTick === 0n ? '1' : String(lendingTick)}×` : '-'} tone={lendingTick && lendingTick > 0n ? 'green' : undefined} />
                    <StatRow label="Total Deposited" value={`${fmt6(lendingTotalDeposited as bigint | undefined)} mUSDC`} />
                    <StatRow label="Total Borrowed" value={`${fmt6(lendingTotalBorrowed as bigint | undefined)} mUSDC`} />
                    <StatRow label="Protocol Fees" value={`${fmt6(lendingFees as bigint | undefined)} mUSDC`} />
                </Panel>
                <Panel title="KredioPASMarket (PAS Market)">
                    <StatRow label="Global Tick" value={pasTick !== undefined ? `${pasTick === 0n ? '1' : String(pasTick)}×` : '-'} tone={pasTick && pasTick > 0n ? 'green' : undefined} />
                    <StatRow label="Total Deposited" value={`${fmt6(pasTotalDeposited as bigint | undefined)} mUSDC`} />
                    <StatRow label="Total Borrowed" value={`${fmt6(pasTotalBorrowed as bigint | undefined)} mUSDC`} />
                    <StatRow label="Protocol Fees" value={`${fmt6(pasFees as bigint | undefined)} mUSDC`} />
                </Panel>
            </Grid>

            {/* Interest tick speed */}
            <SectionTitle>Interest Tick Speed</SectionTitle>
            <Panel
                title="Global Interest Multiplier"
                subtitle="Accelerates interest accrual for ALL borrowers. 60× = 1 real second equals 1 minute of interest. Setting to 0 restores 1× normal behaviour."
            >
                <InfoBox>
                    <strong className="text-white">How it works:</strong> interest formula is{' '}
                    <code className="text-amber-300">debt × rate × elapsed × multiplier / (10000 × 365 days)</code>.
                    Setting this to <em>60</em> makes every second count as 60 seconds - ideal for live demos.
                    The effective multiplier is <code className="text-amber-300">max(globalTick, perUserMultiplier)</code>.
                </InfoBox>
                <div className="mt-3 flex flex-wrap gap-2">
                    {TICK_PRESETS.map(p => (
                        <button key={p.value} onClick={() => setTickValue(p.value)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${tickValue === p.value ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}>
                            {p.label}
                        </button>
                    ))}
                </div>
                <ActionInput label="Custom Value" value={tickValue} onChange={setTickValue} placeholder="e.g. 60" />
                <div className="flex flex-wrap gap-2 mt-1">
                    <ActionButton label="Set Lending Tick" loading={isBusy('setLendingTick')} disabled={isBusy('setLendingTick')}
                        onClick={() => { const v = numeric(tickValue); if (v === null) return; run('setLendingTick', () => actions.adminSetLendingTick(v)); }} />
                    <ActionButton label="Set PAS Tick" loading={isBusy('setPasTick')} disabled={isBusy('setPasTick')}
                        onClick={() => { const v = numeric(tickValue); if (v === null) return; run('setPasTick', () => actions.adminSetPasTick(v)); }} />
                    <ActionButton label="Set Both Markets" loading={isBusy('setLendingTick') || isBusy('setPasTick')} disabled={isBusy('setLendingTick') || isBusy('setPasTick')}
                        onClick={() => { const v = numeric(tickValue); if (v === null) return; run('setLendingTick', () => actions.adminSetLendingTick(v)); run('setPasTick', () => actions.adminSetPasTick(v)); }} />
                    <ActionButton label="Reset to 1× (Off)" variant="ghost" loading={isBusy('resetTick')} disabled={isBusy('resetTick')}
                        onClick={() => { setTickValue('0'); run('resetTick', async () => { await actions.adminSetLendingTick(0n); return actions.adminSetPasTick(0n); }); }} />
                </div>
            </Panel>

            {/* Per-user demo rate */}
            <Panel title="Per-User Demo Rate Multiplier"
                subtitle="Override the interest rate for a specific borrower only. 0 clears the override. Max 1,000,000. Effective rate = max(globalTick, this value).">
                <ActionInput label="Borrower Address" value={targetUser} onChange={setTargetUser} placeholder="0x..." />
                <ActionInput label="Rate Multiplier" value={multiplier} onChange={setMultiplier} placeholder="e.g. 60" />
                <div className="flex flex-wrap gap-2">
                    <ActionButton label="Set Lending Multiplier" variant="ghost" loading={isBusy('setLendingMul')} disabled={isBusy('setLendingMul') || !safeTarget}
                        onClick={() => { const v = numeric(multiplier); if (!safeTarget || v === null) return; run('setLendingMul', () => actions.setLendingMultiplier(safeTarget, v)); }} />
                    <ActionButton label="Set PAS Multiplier" variant="ghost" loading={isBusy('setPasMul')} disabled={isBusy('setPasMul') || !safeTarget}
                        onClick={() => { const v = numeric(multiplier); if (!safeTarget || v === null) return; run('setPasMul', () => actions.setPasMultiplier(safeTarget, v)); }} />
                </div>
            </Panel>

            {/* Tick pool / force-accrue */}
            <SectionTitle>Yield Tick - Force-Distribute Interest to Lenders</SectionTitle>
            <Panel title="Tick Pool"
                subtitle="Capitalises accrued interest for the listed borrowers into their debt and immediately distributes it as yield to lenders. Resets each borrower's interest clock. Shows lending yield growth in real-time.">
                <InfoBox>
                    Enter comma-separated borrower addresses. Their current accrued interest is calculated,
                    added to their principal and distributed to the lender pool as yield - all in one tx.
                    Lenders&apos; <strong className="text-white">pendingYield</strong> increases immediately.
                </InfoBox>
                <ActionInput label="Borrower Addresses (comma-separated)" value={bulkUsers} onChange={setBulkUsers} placeholder="0xAbc..., 0xDef..." />
                <div className="text-xs text-slate-500 mt-1">{bulkAddrs.length} address{bulkAddrs.length !== 1 ? 'es' : ''} parsed</div>
                <div className="flex flex-wrap gap-2 mt-2">
                    <ActionButton label="Tick Lending Pool" loading={isBusy('tickLending')} disabled={isBusy('tickLending') || bulkAddrs.length === 0}
                        onClick={() => run('tickLending', () => actions.adminTickPoolLending(bulkAddrs))} />
                    <ActionButton label="Tick PAS Pool" loading={isBusy('tickPas')} disabled={isBusy('tickPas') || bulkAddrs.length === 0}
                        onClick={() => run('tickPas', () => actions.adminTickPoolPas(bulkAddrs))} />
                </div>
            </Panel>

            {/* Bulk position management */}
            <SectionTitle>Bulk Position Management</SectionTitle>
            <Panel title="Force-Close All Positions"
                subtitle="Wipes positions for all listed addresses and returns their collateral. Outstanding debt is absorbed. Call this before a hard reset.">
                <ActionInput label="User Addresses (comma-separated)" value={bulkUsers} onChange={setBulkUsers} placeholder="0xAbc..., 0xDef..." />
                <div className="text-xs text-slate-500 mt-1">{bulkAddrs.length} address{bulkAddrs.length !== 1 ? 'es' : ''} parsed</div>
                <div className="flex flex-wrap gap-2 mt-2">
                    <ActionButton label="Force-Close All (Lending)" variant="danger" loading={isBusy('forceAllLending')} disabled={isBusy('forceAllLending') || bulkAddrs.length === 0}
                        onClick={() => run('forceAllLending', () => actions.adminForceCloseAllLending(bulkAddrs))} />
                    <ActionButton label="Force-Close All (PAS)" variant="danger" loading={isBusy('forceAllPas')} disabled={isBusy('forceAllPas') || bulkAddrs.length === 0}
                        onClick={() => run('forceAllPas', () => actions.adminForceCloseAllPas(bulkAddrs))} />
                </div>
            </Panel>

            <Panel title="Bulk Return Lender Deposits"
                subtitle="Force-returns principal deposits (no yield) to a list of lenders. Bypasses liquidity check. Call after force-closing all borrow positions.">
                <ActionInput label="Depositor Addresses (comma-separated)" value={bulkUsers} onChange={setBulkUsers} placeholder="0xAbc..., 0xDef..." />
                <div className="text-xs text-slate-500 mt-1">{bulkAddrs.length} address{bulkAddrs.length !== 1 ? 'es' : ''} parsed</div>
                <div className="flex flex-wrap gap-2 mt-2">
                    <ActionButton label="Bulk Withdraw Lending" variant="danger" loading={isBusy('bulkWdLending')} disabled={isBusy('bulkWdLending') || bulkAddrs.length === 0}
                        onClick={() => run('bulkWdLending', () => actions.adminBulkWithdrawLending(bulkAddrs))} />
                    <ActionButton label="Bulk Withdraw PAS" variant="danger" loading={isBusy('bulkWdPas')} disabled={isBusy('bulkWdPas') || bulkAddrs.length === 0}
                        onClick={() => run('bulkWdPas', () => actions.adminBulkWithdrawPas(bulkAddrs))} />
                </div>
            </Panel>

            {/* Single user */}
            <Panel title="Force-Close Single Position"
                subtitle="Wipes one user's position and returns their collateral. For targeted resets.">
                <ActionInput label="User Address" value={targetUser} onChange={setTargetUser} placeholder="0x..." />
                <div className="flex flex-wrap gap-2 mt-2">
                    <ActionButton label="Force-Close Lending" variant="danger" loading={isBusy('forceOneLending')} disabled={isBusy('forceOneLending') || !safeTarget}
                        onClick={() => run('forceOneLending', () => actions.adminForceCloseLending(safeTarget!))} />
                    <ActionButton label="Force-Close PAS" variant="danger" loading={isBusy('forceOnePas')} disabled={isBusy('forceOnePas') || !safeTarget}
                        onClick={() => run('forceOnePas', () => actions.adminForceClosePas(safeTarget!))} />
                    <ActionButton label="Admin Liquidate (Lending)" variant="danger" loading={isBusy('adminLiqLending')} disabled={isBusy('adminLiqLending') || !safeTarget}
                        onClick={() => run('adminLiqLending', () => actions.adminLiquidateLending(safeTarget!))} />
                    <ActionButton label="Admin Liquidate (PAS)" variant="danger" loading={isBusy('adminLiqPas')} disabled={isBusy('adminLiqPas') || !safeTarget}
                        onClick={() => run('adminLiqPas', () => actions.adminLiquidatePas(safeTarget!))} />
                </div>
            </Panel>

            {/* Score reset */}
            <SectionTitle>Credit Score History</SectionTitle>
            <Panel title="Reset User Credit Scores"
                subtitle="Clears repayment count, liquidation count, first-seen block, lifetime deposits, and per-user rate multiplier. Wallets return to new-user baseline tier.">
                <InfoBox>After reset, each wallet computes its score as a brand-new user - perfect for re-running demos from a fair starting point.</InfoBox>
                <ActionInput label="User Addresses (comma-separated)" value={bulkUsers} onChange={setBulkUsers} placeholder="0xAbc..., 0xDef..." />
                <div className="text-xs text-slate-500 mt-1">{bulkAddrs.length} address{bulkAddrs.length !== 1 ? 'es' : ''} parsed</div>
                <div className="flex flex-wrap gap-2 mt-2">
                    <ActionButton label="Reset Lending Scores" variant="ghost" loading={isBusy('resetScoreLending')} disabled={isBusy('resetScoreLending') || bulkAddrs.length === 0}
                        onClick={() => run('resetScoreLending', () => actions.adminResetUserScoreLending(bulkAddrs))} />
                    <ActionButton label="Reset PAS Scores" variant="ghost" loading={isBusy('resetScorePas')} disabled={isBusy('resetScorePas') || bulkAddrs.length === 0}
                        onClick={() => run('resetScorePas', () => actions.adminResetUserScorePas(bulkAddrs))} />
                </div>
            </Panel>

            {/* Nuclear reset */}
            <SectionTitle>Nuclear Reset</SectionTitle>
            <Panel title="Hard Reset - Sweep All USDC & Zero Pool Accounting"
                subtitle="Zeros totalBorrowed, totalDeposited, accYieldPerShare, protocolFees and globalTick, then transfers all USDC inside the contract to the receiver address. Recommended sequence below.">
                <InfoBox>
                    <strong className="text-red-400">Recommended clean-start sequence:</strong>
                    <ol className="mt-1.5 space-y-0.5 list-decimal list-inside">
                        <li>Set global tick to 0 (disable acceleration).</li>
                        <li>Force-Close All Positions for all active borrowers.</li>
                        <li>Bulk Withdraw for all depositors.</li>
                        <li>Reset User Scores for all participants.</li>
                        <li>Hard Reset - sweeps remaining USDC dust and zeros accounting.</li>
                        <li>Re-seed pool: deposit mUSDC as admin via the Lend page.</li>
                    </ol>
                </InfoBox>
                <ActionInput label="Receiver Address (gets swept USDC)" value={receiver} onChange={setReceiver} placeholder="0x..." />
                <div className="flex flex-wrap gap-2 mt-2">
                    <ActionButton label="HARD RESET Lending Pool" variant="danger" loading={isBusy('hardResetLending')} disabled={isBusy('hardResetLending') || !safeReceiver}
                        onClick={() => run('hardResetLending', () => actions.adminHardResetLending(safeReceiver!))} />
                    <ActionButton label="HARD RESET PAS Pool" variant="danger" loading={isBusy('hardResetPas')} disabled={isBusy('hardResetPas') || !safeReceiver}
                        onClick={() => run('hardResetPas', () => actions.adminHardResetPas(safeReceiver!))} />
                </div>
            </Panel>

            {/* Fee sweeps */}
            <SectionTitle>Fee Management</SectionTitle>
            <Panel title="Sweep Protocol Fees">
                <ActionInput label="Receiver Address" value={receiver} onChange={setReceiver} placeholder="0x..." />
                <div className="flex flex-wrap gap-2 mt-2">
                    <ActionButton label="Sweep Lending Fees" loading={isBusy('sweepLending')} disabled={isBusy('sweepLending') || !safeReceiver}
                        onClick={() => run('sweepLending', () => actions.sweepLendingFees(safeReceiver!))} />
                    <ActionButton label="Sweep PAS Fees" loading={isBusy('sweepPas')} disabled={isBusy('sweepPas') || !safeReceiver}
                        onClick={() => run('sweepPas', () => actions.sweepPasFees(safeReceiver!))} />
                </div>
            </Panel>

            {/* Oracle */}
            <SectionTitle>Oracle Controls</SectionTitle>
            <Panel title="MockPASOracle - Price Manipulation"
                subtitle="Set or crash the PAS/USD oracle. Crash drops price so open positions become liquidatable - useful for demonstrating liquidation flows. Recover restores the normal price.">
                <ActionInput label="Price (8 decimal places - e.g. 100000000 = $1.00)" value={oraclePrice8} onChange={setOraclePrice8} placeholder="100000000" />
                <div className="flex flex-wrap gap-2 mt-2">
                    <ActionButton label="Set Price" loading={isBusy('oracleSet')} disabled={isBusy('oracleSet')}
                        onClick={() => { const v = numeric(oraclePrice8); if (!v) return; run('oracleSet', () => actions.oracleSetPrice(v)); }} />
                    <ActionButton label="Crash Price" variant="danger" loading={isBusy('oracleCrash')} disabled={isBusy('oracleCrash')}
                        onClick={() => { const v = numeric(oraclePrice8); if (!v) return; run('oracleCrash', () => actions.oracleCrash(v)); }} />
                    <ActionButton label="Recover Oracle" variant="ghost" loading={isBusy('oracleRecover')} disabled={isBusy('oracleRecover')}
                        onClick={() => run('oracleRecover', () => actions.oracleRecover())} />
                </div>
            </Panel>

            {/* Risk params */}
            <SectionTitle>PAS Market Risk Parameters</SectionTitle>
            <Panel title="Risk Parameters" subtitle="Tune LTV, liquidation bonus, oracle staleness and protocol fee for the PAS collateral market.">
                <Grid>
                    <ActionInput label="LTV BPS (max 8000)" value={ltvBps} onChange={setLtvBps} placeholder="6500" />
                    <ActionInput label="Liquidation Bonus BPS (max 2000)" value={liqBonusBps} onChange={setLiqBonusBps} placeholder="800" />
                    <ActionInput label="Oracle Staleness Limit (seconds)" value={staleness} onChange={setStaleness} placeholder="3600" />
                    <ActionInput label="Protocol Fee BPS (max 2000)" value={feeBps} onChange={setFeeBps} placeholder="1000" />
                </Grid>
                <div className="flex flex-wrap gap-2 mt-2">
                    <ActionButton label="Update Risk Params" loading={isBusy('riskParams')} disabled={isBusy('riskParams')}
                        onClick={() => { const ltv = numeric(ltvBps), bonus = numeric(liqBonusBps), stale = numeric(staleness), fee = numeric(feeBps); if (!ltv || !bonus || !stale || !fee) return; run('riskParams', () => actions.setPasRiskParams(ltv, bonus, stale, fee)); }} />
                    <ActionButton label="Pause PAS Market" variant="danger" loading={isBusy('pausePas')} disabled={isBusy('pausePas')}
                        onClick={() => run('pausePas', () => actions.pausePas())} />
                    <ActionButton label="Unpause PAS Market" variant="ghost" loading={isBusy('unpausePas')} disabled={isBusy('unpausePas')}
                        onClick={() => run('unpausePas', () => actions.unpausePas())} />
                </div>
            </Panel>

            {/* ── Intelligent Yield Strategy ─────────────────────────────── */}
            <SectionTitle>Intelligent Yield Strategy</SectionTitle>

            {/* Strategy status */}
            <Grid>
                <Panel title="Strategy Status (KredioLending)">
                    <StatRow label="Yield Pool" value={ss ? `${String(ss[0]).slice(0, 8)}…${String(ss[0]).slice(-6)}` : '-'} tone={ss && ss[0] !== '0x0000000000000000000000000000000000000000' ? 'green' : 'red'} />
                    <StatRow label="Invested" value={`${fmt6(ss?.[1])} mUSDC`} tone={ss && ss[1] > 0n ? 'green' : undefined} />
                    <StatRow label="Total Earned by Strategy" value={`${fmt6(ss?.[2])} mUSDC`} />
                    <StatRow label="Pending Yield (claimable)" value={`${fmt6(pendingYield as bigint | undefined)} mUSDC`} tone={pendingYield && (pendingYield as bigint) > 0n ? 'green' : undefined} />
                    <StatRow label="Invest Ratio" value={ss ? `${Number(ss[4]) / 100}%` : '-'} />
                    <StatRow label="Min Buffer" value={ss ? `${Number(ss[5]) / 100}%` : '-'} />
                </Panel>
                <Panel title="MockYieldPool Status">
                    <StatRow label="Pool Address" value={config.yieldPool ? `${config.yieldPool.slice(0, 8)}…${config.yieldPool.slice(-6)}` : '-'} tone="green" />
                    <StatRow label="Total Principal" value={`${fmt6(poolPrincipal as bigint | undefined)} mUSDC`} />
                    <StatRow label="APY Rate" value={poolYieldRate !== undefined ? `${Number(poolYieldRate as bigint) / 100}% APY` : '-'} tone={poolYieldRate && (poolYieldRate as bigint) > 1000n ? 'green' : undefined} />
                    <StatRow label="Mode" value={(poolYieldRate as bigint | undefined) && (poolYieldRate as bigint) > 10000n ? 'DEMO (fast)' : 'Normal'} tone={(poolYieldRate as bigint | undefined) && (poolYieldRate as bigint) > 10000n ? 'green' : undefined} />
                </Panel>
            </Grid>

            {/* Crank yield rate */}
            <Panel
                title="Crank Yield Rate - MockYieldPool"
                subtitle="Sets the annual yield rate on the mock pool. Use high values (e.g. 60000 = 600% APY) for demos where yield should be visible within minutes. Use 600 for realistic 6% APY.">
                <InfoBox>
                    <strong className="text-white">APY → Rate BPS:</strong>{' '}
                    <code className="text-amber-300">rate = APY% × 100</code>.
                    At 60 000 BPS (600% APY), a 500k principal earns ~1,370 mUSDC of yield per hour. At 600 BPS (6% APY), the same 500k earns ~274 mUSDC per day.
                </InfoBox>
                <div className="mt-3 flex flex-wrap gap-2">
                    {[
                        { label: '6% APY (realistic)', value: '600' },
                        { label: '60% APY (fast)', value: '6000' },
                        { label: '600% APY (demo)', value: '60000' },
                        { label: '1000% APY (turbo)', value: '100000' },
                    ].map(p => (
                        <button key={p.value} onClick={() => setYieldRateBps(p.value)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${yieldRateBps === p.value ? 'bg-purple-500/20 border-purple-500/40 text-purple-300' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}>
                            {p.label}
                        </button>
                    ))}
                </div>
                <ActionInput label="Custom Rate BPS (100 = 1% APY)" value={yieldRateBps} onChange={setYieldRateBps} placeholder="e.g. 600" />
                <ActionButton label="Set Yield Rate" loading={isBusy('yieldSetRate')} disabled={isBusy('yieldSetRate')}
                    onClick={() => { const v = numeric(yieldRateBps); if (!v) return; run('yieldSetRate', () => { return actions.yieldSetRate(v).then(r => { refetchStrategy(); return r; }); }); }} />
            </Panel>

            {/* Manual invest / pull back */}
            <Panel title="Manual Invest / Pull Back"
                subtitle="Manually move capital between the lending pool and the yield pool. The backend monitor handles this automatically, but you can trigger it manually for demos.">
                <Grid>
                    <div>
                        <ActionInput label="Invest Amount (mUSDC, 6 dec)" value={investAmount} onChange={setInvestAmount} placeholder="e.g. 250000000000" />
                        <ActionButton label="Invest into Yield Pool" loading={isBusy('yieldInvest')} disabled={isBusy('yieldInvest') || !investAmount}
                            onClick={() => { const v = numeric(investAmount); if (!v) return; run('yieldInvest', () => actions.yieldInvest(v).then(r => { refetchStrategy(); return r; })); }} />
                    </div>
                    <div>
                        <ActionInput label="Pull Back Amount (mUSDC, 6 dec)" value={pullAmount} onChange={setPullAmount} placeholder="e.g. 100000000000" />
                        <ActionButton label="Pull Back from Pool" variant="ghost" loading={isBusy('yieldPullBack')} disabled={isBusy('yieldPullBack') || !pullAmount}
                            onClick={() => { const v = numeric(pullAmount); if (!v) return; run('yieldPullBack', () => actions.yieldPullBack(v).then(r => { refetchStrategy(); return r; })); }} />
                    </div>
                </Grid>
                <div className="mt-2">
                    <ActionButton label="Claim Yield & Inject into Lender Pool" loading={isBusy('yieldClaim')} disabled={isBusy('yieldClaim') || !pendingYield || (pendingYield as bigint) === 0n}
                        onClick={() => run('yieldClaim', () => actions.yieldClaimAndInject().then(r => { refetchStrategy(); return r; }))} />
                    <p className="text-xs text-slate-500 mt-1">
                        Pending: <span className="text-amber-300">{fmt6(pendingYield as bigint | undefined)} mUSDC</span> - distributes to all lenders via accYieldPerShare immediately.
                    </p>
                </div>
            </Panel>

            {/* Strategy parameters */}
            <Panel title="Strategy Parameters"
                subtitle="Tune the automated rebalancing formula. Changes take effect on the next backend monitor tick (every 30s).">
                <InfoBox>
                    <strong className="text-white">Invest Ratio:</strong> fraction of idle mUSDC to put to work (50% = 5000 BPS).{' '}
                    <strong className="text-white">Min Buffer:</strong> minimum fraction of <em>total deposits</em> that must stay liquid (20% = 2000 BPS).
                    The monitor targets: <code className="text-amber-300">invested = idle × investRatio</code>, subject to the min buffer floor.
                </InfoBox>
                <Grid>
                    <ActionInput label="Invest Ratio BPS (max 9000)" value={newInvestRatio} onChange={setNewInvestRatio} placeholder="5000" />
                    <ActionInput label="Min Buffer BPS (max 5000)" value={newMinBuffer} onChange={setNewMinBuffer} placeholder="2000" />
                </Grid>
                <ActionButton label="Update Strategy Params" loading={isBusy('yieldParams')} disabled={isBusy('yieldParams')}
                    onClick={() => { const r = numeric(newInvestRatio), b = numeric(newMinBuffer); if (!r || !b) return; run('yieldParams', () => actions.yieldSetStrategyParams(r, b).then(res => { refetchStrategy(); return res; })); }} />
            </Panel>

            {/* Set yield pool address */}
            <Panel title="Replace Yield Pool Contract"
                subtitle="Point KredioLending at a different yield pool contract. Use when deploying a new MockYieldPool.">
                <ActionInput label="New Yield Pool Address" value={newYieldPool} onChange={setNewYieldPool} placeholder="0x..." />
                <ActionButton label="Set Yield Pool" variant="danger" loading={isBusy('yieldSetPool')} disabled={isBusy('yieldSetPool') || !safeNewYieldPool}
                    onClick={() => run('yieldSetPool', () => actions.yieldSetPool(safeNewYieldPool!).then(r => { refetchStrategy(); return r; }))} />
            </Panel>

            {/* Governance */}
            <SectionTitle>Governance Cache</SectionTitle>
            <Panel title="Governance Data Override"
                subtitle="Manually set on-chain voting data for a user. Votes and conviction level feed into the KreditAgent credit score calculation.">
                <ActionInput label="User Address" value={targetUser} onChange={setTargetUser} placeholder="0x..." />
                <ActionInput label="Vote Count" value={votes} onChange={setVotes} placeholder="100" />
                <ActionInput label="Max Conviction (0–6)" value={conviction} onChange={setConviction} placeholder="2" />
                <ActionButton label="Set Governance Data" loading={isBusy('govData')} disabled={isBusy('govData') || !safeTarget}
                    onClick={() => { const vc = numeric(votes), conv = Number(conviction); if (!vc || !Number.isInteger(conv) || conv < 0 || conv > 6 || !safeTarget) return; run('govData', () => actions.setGovernanceData(safeTarget, vc, conv)); }} />
            </Panel>

        </PageShell>
    );
}
