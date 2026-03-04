"use client"

import { WagmiProvider, useAccount, useChainId, useSwitchChain, useBalance, usePublicClient, useWalletClient } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, ConnectButton, darkTheme } from '@rainbow-me/rainbowkit'
import { wagmiConfig, paseoTestnet } from '../lib/wagmi'
import { ReactNode, useState, useRef, useEffect } from 'react'
import { ThemeProvider } from '../components/providers/ThemeProvider'
import { Toaster } from 'sonner'
import { NebulaBackground } from '../components/modules/NebulaBackground'
import { Dock } from '../components/modules/Dock'
import { WalletPanel } from '../components/modules/WalletPanel'
import '../styles/theme.css'
import '@rainbow-me/rainbowkit/styles.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { formatDisplayBalance } from '../lib/utils'
import config, { isDeployed } from '../lib/addresses'
import { ABIS } from '../lib/constants'
import { TUSDC, WPAS, TVTUSDC } from '../lib/tokens'

const jakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-jakarta'
})

const queryClient = new QueryClient()

/* ── Faucets Dropdown ─────────────────────────────────────────────── */
function FaucetsDropdown() {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const { address, isConnected } = useAccount()
    const publicClient = usePublicClient()
    const { data: walletClient } = useWalletClient()
    const [minting, setMinting] = useState(false)
    const [mintMsg, setMintMsg] = useState('')
    const [addedTokens, setAddedTokens] = useState<Set<string>>(new Set())

    // Tokens that can be added to wallet
    const watchableTokens = [
        { def: TUSDC, address: config.tUSDC, color: 'bg-yellow-500/20 text-yellow-300', borderColor: 'border-yellow-500/30' },
        { def: WPAS, address: config.wpas, color: 'bg-orange-500/20 text-orange-300', borderColor: 'border-orange-500/30' },
        { def: TVTUSDC, address: config.vault, color: 'bg-green-500/20 text-green-300', borderColor: 'border-green-500/30' },
    ] as const

    const handleAddToken = async (symbol: string, address: `0x${string}`, decimals: number) => {
        if (!walletClient || !isConnected || !isDeployed(address)) return
        try {
            await walletClient.watchAsset({ type: 'ERC20', options: { address, symbol, decimals } })
            setAddedTokens(prev => new Set(prev).add(symbol))
        } catch {
            // User rejected or wallet doesn't support watchAsset
        }
    }

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleMintTUSDC = async () => {
        if (!walletClient || !publicClient || !address || !isDeployed(config.tUSDC)) return
        setMinting(true)
        setMintMsg('')
        try {
            const tx = await walletClient.writeContract({
                address: config.tUSDC,
                abi: ABIS.MOCK_ASSET,
                functionName: 'mint',
                args: [address, TUSDC.faucet!.amount],
            })
            await publicClient.waitForTransactionReceipt({ hash: tx })
            setMintMsg('Minted 1,000 tUSDC!')
            setTimeout(() => setMintMsg(''), 3000)
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message.slice(0, 60) : 'Unknown error'
            setMintMsg(`Error: ${msg}`)
        } finally {
            setMinting(false)
        }
    }

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white border border-white/10 px-3 py-2 bg-white/5 backdrop-blur-sm transition-colors"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Faucets
                <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl z-[60] overflow-hidden">
                    {/* PAS Faucet */}
                    <a
                        href="https://faucet.polkadot.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5"
                    >
                        <span className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-300 text-xs font-bold">PAS</span>
                        <div>
                            <p className="text-sm font-medium text-white">PAS Faucet</p>
                            <p className="text-xs text-slate-400">Official Polkadot testnet faucet</p>
                        </div>
                        <svg className="w-4 h-4 text-slate-500 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>

                    {/* tUSDC Faucet — always visible, disabled when not connected */}
                    <button
                        onClick={handleMintTUSDC}
                        disabled={minting || !isConnected || !isDeployed(config.tUSDC)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left disabled:opacity-50"
                    >
                        <span className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-300 text-[10px] font-bold">tUSDC</span>
                        <div>
                            <p className="text-sm font-medium text-white">
                                {!isConnected ? 'Connect wallet to mint' : minting ? 'Minting...' : 'Mint 1,000 tUSDC'}
                            </p>
                            <p className="text-xs text-slate-400">Test stablecoin (6 decimals)</p>
                        </div>
                    </button>

                    {mintMsg && (
                        <div className={`px-4 py-2 text-xs ${mintMsg.startsWith('Error') ? 'text-red-400 bg-red-500/10' : 'text-green-400 bg-green-500/10'}`}>
                            {mintMsg}
                        </div>
                    )}

                    {/* ── Add Tokens to Wallet ── */}
                    <div className="px-4 py-2 border-t border-white/5">
                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Add to Wallet</p>
                        <div className="flex flex-wrap gap-1.5">
                            {watchableTokens.map(({ def, address: addr, color, borderColor }) => {
                                const deployed = isDeployed(addr)
                                const added = addedTokens.has(def.symbol)
                                return (
                                    <button
                                        key={def.symbol}
                                        onClick={() => handleAddToken(def.symbol, addr, def.decimals)}
                                        disabled={!isConnected || !deployed || added}
                                        title={
                                            !isConnected ? 'Connect wallet first'
                                                : !deployed ? 'Contract not deployed'
                                                    : added ? `${def.symbol} already added`
                                                        : `Add ${def.symbol} to wallet`
                                        }
                                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all
                                            ${added
                                                ? 'border-green-500/30 bg-green-500/10 text-green-300'
                                                : `${borderColor} ${color} hover:bg-white/10`}
                                            disabled:opacity-40 disabled:cursor-not-allowed`}
                                    >
                                        {added ? (
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                        )}
                                        {def.symbol}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function Navbar() {
    const { address, isConnected } = useAccount()
    const chainId = useChainId()
    const { switchChain } = useSwitchChain()
    const [walletPanelOpen, setWalletPanelOpen] = useState(false)

    const { data: balanceData } = useBalance({
        address,
        query: { enabled: !!address }
    })

    const isWrongNetwork = isConnected && chainId !== paseoTestnet.id;
    const hasZeroBalance = isConnected && !isWrongNetwork && balanceData && balanceData.value === 0n;

    return (
        <>
            <nav className="flex justify-between items-center p-4 lg:p-6 sticky top-0 z-50">
                <div className="flex items-center gap-4 cursor-pointer">
                    <div className="w-8 h-8 rounded-none border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                        </svg>
                    </div>
                    <div className="text-xl font-light tracking-[0.2em] text-white hidden sm:block uppercase">
                        Tesseract
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {isWrongNetwork && (
                        <button
                            onClick={() => switchChain({ chainId: paseoTestnet.id })}
                            className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 text-sm font-medium transition-colors border border-red-500/20"
                        >
                            Switch to Polkadot Hub
                        </button>
                    )}
                    <div className="hidden sm:block">
                        <FaucetsDropdown />
                    </div>
                    {isConnected && balanceData && !isWrongNetwork && (
                        <button
                            onClick={() => setWalletPanelOpen(true)}
                            className="text-xs font-mono text-slate-400 border border-white/10 px-3 py-2 hidden sm:block hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            {formatDisplayBalance(balanceData.value, 18, 4)} PAS
                        </button>
                    )}
                    <ConnectButton.Custom>
                        {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
                            const connected = mounted && account && chain;
                            return (
                                <div>
                                    {!connected ? (
                                        <button
                                            onClick={openConnectModal}
                                            className="bg-white text-black hover:bg-white/90 px-6 py-2.5 text-sm font-medium tracking-wider uppercase transition-all border border-white/20"
                                        >
                                            Connect Wallet
                                        </button>
                                    ) : (
                                        <button
                                            onClick={openAccountModal}
                                            className="bg-white/5 text-white hover:bg-white/10 px-4 py-2.5 text-sm font-mono tracking-wider transition-colors border border-white/10"
                                        >
                                            {account.displayName}
                                        </button>
                                    )}
                                </div>
                            );
                        }}
                    </ConnectButton.Custom>
                </div>
            </nav>
            {walletPanelOpen && <WalletPanel onClose={() => setWalletPanelOpen(false)} />}
        </>
    )
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={`dark ${jakarta.variable}`} suppressHydrationWarning>
            <body className="bg-slate-950 min-h-screen text-slate-100 font-sans antialiased overflow-x-hidden">
                <WagmiProvider config={wagmiConfig}>
                    <QueryClientProvider client={queryClient}>
                        <RainbowKitProvider
                            theme={darkTheme({
                                accentColor: '#ffffff',
                                accentColorForeground: '#000000',
                                borderRadius: 'none',
                                fontStack: 'system',
                            })}
                        >
                            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                                <NebulaBackground />
                                <Navbar />
                                <main className="container mx-auto p-4 lg:p-8 pb-32 relative z-10 flex flex-col items-center">
                                    {children}
                                </main>
                                <Dock />
                            </ThemeProvider>
                            <Toaster position="bottom-right" richColors />
                        </RainbowKitProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            </body>
        </html>
    )
}
