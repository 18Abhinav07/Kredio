'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAccount, useChainId, usePublicClient, useSwitchChain, useWalletClient } from 'wagmi';
import { parseEther, toHex, getAddress } from 'viem';
import { ABIS } from '../lib/constants';
import { BRIDGE, CONTRACTS } from '../config/contracts';
import { SEPOLIA_CHAIN_ID } from '../lib/wagmi';

// ─── Types ────────────────────────────────────────────────────────────────

export type BridgeStatus =
    | 'idle'
    | 'switching-chain'
    | 'depositing'
    | 'awaiting-receipt'
    | 'verifying'
    | 'minting'
    | 'minted'
    | 'error';

export interface Quote {
    ethAmountEth: string;
    ethPriceUSD: number;
    mUSDCOut: string;
    mUSDCOutHuman: string;
    feeBps: number;
    feePct: string;
    freshAt: string;
    chainName: string;
}

export interface DepositRecord {
    status: 'pending' | 'minted' | 'redeemed';
    sourceChainId?: number;
    sourceUser?: string;
    hubRecipient?: string;
    ethAmount?: string;
    mUSDCMinted?: string;
    mUSDCHuman?: string;
    timestamp?: number;
    redeemed?: boolean;
}

// ─── Retry helper ────────────────────────────────────────────────────────
async function withRetry<T>(fn: () => Promise<T>, attempts: number, delayMs: number): Promise<T> {
    let lastErr: unknown;
    for (let i = 0; i < attempts; i++) {
        try { return await fn(); }
        catch (err) {
            lastErr = err;
            if (i < attempts - 1) await new Promise<void>(r => setTimeout(r, delayMs));
        }
    }
    throw lastErr as Error;
}

// ─── Supported source chains ──────────────────────────────────────────────
export const ETH_BRIDGE_CHAINS: { chainId: number; name: string; inboxAddress: `0x${string}` }[] = [
    {
        chainId: BRIDGE.SEPOLIA_CHAIN_ID,
        name: 'Ethereum Sepolia',
        inboxAddress: BRIDGE.INBOX_SEPOLIA,
    },
    // More chains will be added here as inboxes are deployed
];

// ─── Hook ─────────────────────────────────────────────────────────────────

export function useEthBridge() {
    const { address } = useAccount();
    const chainId = useChainId();
    const publicClient = usePublicClient();
    // Pinned clients - independent of the currently active wallet chain
    const sepoliaPublicClient = usePublicClient({ chainId: BRIDGE.SEPOLIA_CHAIN_ID });
    const hubPublicClient = usePublicClient({ chainId: CONTRACTS.CHAIN_ID });
    const { data: walletClient } = useWalletClient();
    // Ref so redeemDeposit always reads the latest walletClient even inside
    // a stale closure after switchChainAsync (avoids the narrowed-type issue
    // that useWalletClient({ chainId }) introduces).
    const walletClientRef = useRef(walletClient);
    useEffect(() => { walletClientRef.current = walletClient; }, [walletClient]);
    const { switchChainAsync } = useSwitchChain();

    const [status, setStatus] = useState<BridgeStatus>('idle');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [quote, setQuote] = useState<Quote | null>(null);
    const [quoteLoading, setQuoteLoading] = useState(false);
    const [lastTxHash, setLastTxHash] = useState<`0x${string}` | null>(null);
    const [mintedResult, setMintedResult] = useState<{ hubTx: string; mUSDCHuman: string } | null>(null);
    const [history, setHistory] = useState<({ sourceTxHash: `0x${string}` } & DepositRecord)[]>([]);

    // Isolated reclaim state - never touches deposit `status`
    const [reclaimingTx, setReclaimingTx] = useState<`0x${string}` | null>(null);
    const [reclaimErrorTx, setReclaimErrorTx] = useState<`0x${string}` | null>(null);
    const [reclaimError, setReclaimError] = useState<string | null>(null);
    const [reclaimStep, setReclaimStep] = useState<string>('');

    const quoteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ── Quote polling ───────────────────────────────────────────────────
    const fetchQuote = useCallback(async (sourceChainId: number, ethAmount: string) => {
        const amt = parseFloat(ethAmount);
        if (!Number.isFinite(amt) || amt <= 0) { setQuote(null); return; }
        setQuoteLoading(true);
        try {
            const res = await fetch(
                `${BRIDGE.BACKEND_URL}/bridge/quote?chainId=${sourceChainId}&ethAmount=${amt}`
            );
            if (!res.ok) throw new Error(`Quote failed: ${res.status}`);
            const data: Quote = await res.json();
            setQuote(data);
        } catch (err) {
            console.warn('[useEthBridge] quote error:', err);
            setQuote(null);
        } finally {
            setQuoteLoading(false);
        }
    }, []);

    // Auto-refresh quote every 30 s
    const scheduleQuoteRefresh = useCallback((chainId: number, amount: string) => {
        if (quoteTimerRef.current) clearTimeout(quoteTimerRef.current);
        quoteTimerRef.current = setTimeout(() => fetchQuote(chainId, amount), 30_000);
    }, [fetchQuote]);

    // ── Main deposit flow ────────────────────────────────────────────────
    // 1. Switch MetaMask to source chain
    // 2. Call inbox.deposit(paddedHubAddress, { value })
    // 3. Await tx receipt
    // 4. POST /bridge/deposit → backend verifies + mints
    const depositETH = useCallback(async (
        sourceChainId: number,
        ethAmountEth: string,
        hubRecipient: string,
    ) => {
        if (!address || !walletClient || !publicClient) {
            setErrorMsg('Connect MetaMask first');
            return;
        }

        const chain = ETH_BRIDGE_CHAINS.find(c => c.chainId === sourceChainId);
        if (!chain?.inboxAddress) {
            setErrorMsg('Inbox contract not deployed for this chain yet');
            return;
        }

        setStatus('idle');
        setErrorMsg(null);
        setMintedResult(null);

        try {
            // ── Step 1: switch chain ──────────────────────────────────
            if (chainId !== sourceChainId) {
                setStatus('switching-chain');
                await switchChainAsync({ chainId: sourceChainId });
            }

            // ── Step 2: call inbox.deposit() ──────────────────────────
            setStatus('depositing');

            // Pad the Hub EVM address to bytes32 (left-pad with zeros)
            const checksummed = getAddress(hubRecipient);
            const hubRecipientBytes32 = ('0x' + checksummed.slice(2).toLowerCase().padStart(64, '0')) as `0x${string}`;
            const value = parseEther(ethAmountEth);

            const txHash = await walletClient.writeContract({
                address: chain.inboxAddress,
                abi: ABIS.ETH_BRIDGE_INBOX,
                functionName: 'deposit',
                args: [hubRecipientBytes32],
                value,
            });

            setLastTxHash(txHash);

            // ── Step 3: poll RPC every 3 s until TX is mined ─────────
            setStatus('awaiting-receipt');
            if (!sepoliaPublicClient) throw new Error('Sepolia RPC client unavailable');
            let mined = false;
            while (!mined) {
                try {
                    const receipt = await sepoliaPublicClient.getTransactionReceipt({ hash: txHash });
                    if (receipt) mined = true;
                } catch { /* not mined yet */ }
                if (!mined) await new Promise<void>(r => setTimeout(r, 3_000));
            }

            // ── Step 4+5: verify on backend (Hub mint), with retry ──
            setStatus('verifying');
            interface MintResult { hubTx: string; mUSDCHuman: string; }
            const mintResult = await withRetry<MintResult>(async () => {
                const res = await fetch(`${BRIDGE.BACKEND_URL}/bridge/deposit`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chainId: sourceChainId,
                        txHash,
                        hubRecipient: checksummed,
                    }),
                });
                const d = await res.json();
                if (!res.ok) throw new Error(d.error ?? 'Backend error');
                return d as MintResult;
            }, 3, 5_000);
            setStatus('minting');
            setMintedResult({ hubTx: mintResult.hubTx, mUSDCHuman: mintResult.mUSDCHuman });
            setStatus('minted');

            // Auto-refresh history so Reclaim tab is immediately up to date
            await fetchHistory(address);

            // ── Step 6: switch back to Hub ────────────────────────────
            if (chainId !== CONTRACTS.CHAIN_ID) {
                await switchChainAsync({ chainId: CONTRACTS.CHAIN_ID }).catch(() => { });
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Unknown error';
            setErrorMsg(msg);
            setStatus('error');
        }
    }, [address, chainId, walletClient, publicClient, sepoliaPublicClient, switchChainAsync]);

    // ── Redeem flow ──────────────────────────────────────────────────────
    // Uses isolated state so it never interferes with the deposit flow.
    const redeemDeposit = useCallback(async (
        sourceTxHash: `0x${string}`,
        redeemAmount: bigint, // 6-dec mUSDC
    ) => {
        if (!address || !walletClientRef.current || !hubPublicClient) {
            setReclaimError('Connect MetaMask first');
            return;
        }
        if (!BRIDGE.MINTER) {
            setReclaimError('Minter contract not deployed yet');
            return;
        }

        setReclaimingTx(sourceTxHash);
        setReclaimError(null);
        setReclaimErrorTx(null);
        setReclaimStep('switching-chain');

        try {
            // Ensure on Hub - switch if needed; walletClientRef.current will
            // be updated by the useEffect above once the re-render fires.
            if (chainId !== CONTRACTS.CHAIN_ID) {
                await switchChainAsync({ chainId: CONTRACTS.CHAIN_ID });
                // Brief yield so wagmi can flush the new walletClient into the ref
                await new Promise<void>(r => setTimeout(r, 100));
            }
            const wc = walletClientRef.current!;

            // Approve mUSDC
            setReclaimStep('approving');
            const approveTx = await wc.writeContract({
                address: CONTRACTS.MOCKUSDC as `0x${string}`,
                abi: ABIS.ERC20,
                functionName: 'approve',
                args: [BRIDGE.MINTER, redeemAmount],
            });
            await hubPublicClient.waitForTransactionReceipt({ hash: approveTx });

            // initiateRedeem on Hub
            setReclaimStep('redeeming');
            const redeemTx = await wc.writeContract({
                address: BRIDGE.MINTER,
                abi: ABIS.KREDIO_BRIDGE_MINTER,
                functionName: 'initiateRedeem',
                args: [sourceTxHash, redeemAmount],
            });
            await hubPublicClient.waitForTransactionReceipt({ hash: redeemTx });

            // Notify backend to release ETH from inbox (Source-chain tx), with retry
            setReclaimStep('releasing');
            interface RedeemResult { ethSentHuman: string; relayTxHash: string; }
            const redeemData = await withRetry<RedeemResult>(async () => {
                const res = await fetch(`${BRIDGE.BACKEND_URL}/bridge/redeem`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sourceTxHash }),
                });
                const d = await res.json();
                if (!res.ok) throw new Error(d.error ?? 'Backend redeem error');
                return d as RedeemResult;
            }, 3, 5_000);

            console.log(`[bridge] ETH released: ${redeemData.ethSentHuman} ETH | relayTx=${redeemData.relayTxHash}`);

            // Refresh history so the record flips to "redeemed"
            await fetchHistory(address);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Unknown error';
            setReclaimError(msg);
            setReclaimErrorTx(sourceTxHash);
        } finally {
            setReclaimingTx(null);
            setReclaimStep('');
        }
    }, [address, chainId, hubPublicClient, switchChainAsync]);

    // ── Deposit history (Hub read) ───────────────────────────────────────
    const fetchHistory = useCallback(async (user: string) => {
        if (!BRIDGE.MINTER) return;
        try {
            // We read from Hub - create a direct viem publicClient to avoid chain mismatch
            const { createPublicClient, http } = await import('viem');
            const hubClient = createPublicClient({
                transport: http(CONTRACTS.RPC),
            });
            const hashes = await hubClient.readContract({
                address: BRIDGE.MINTER,
                abi: ABIS.KREDIO_BRIDGE_MINTER,
                functionName: 'getUserDeposits',
                args: [user as `0x${string}`],
            }) as `0x${string}`[];

            const records = await Promise.all(
                hashes.map(async (h) => {
                    const statusRes = await fetch(`${BRIDGE.BACKEND_URL}/bridge/status?txHash=${h}`);
                    const record: DepositRecord = statusRes.ok ? await statusRes.json() : { status: 'pending' };
                    return { sourceTxHash: h, ...record };
                })
            );

            setHistory(records.reverse()); // newest first
        } catch (err) {
            console.warn('[useEthBridge] fetchHistory error:', err);
        }
    }, []);

    // Load history when address available on Hub
    useEffect(() => {
        if (address) fetchHistory(address);
    }, [address, fetchHistory]);

    const reset = useCallback(() => {
        setStatus('idle');
        setErrorMsg(null);
        setMintedResult(null);
        setLastTxHash(null);
    }, []);

    const clearReclaimError = useCallback(() => {
        setReclaimError(null);
        setReclaimErrorTx(null);
    }, []);

    return {
        // State
        status,
        errorMsg,
        quote,
        quoteLoading,
        lastTxHash,
        mintedResult,
        history,
        // Reclaim-specific state
        reclaimingTx,
        reclaimErrorTx,
        reclaimError,
        reclaimStep,
        // Actions
        fetchQuote,
        scheduleQuoteRefresh,
        depositETH,
        redeemDeposit,
        fetchHistory,
        reset,
        clearReclaimError,
    };
}
