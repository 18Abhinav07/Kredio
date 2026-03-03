"use client"

import { WagmiProvider, useAccount, useConnect, useDisconnect } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '../lib/wagmi'
import { ReactNode, useState } from 'react'

const queryClient = new QueryClient()

function Navbar() {
    const { address, isConnected } = useAccount()
    const { connect, connectors } = useConnect()
    const { disconnect } = useDisconnect()

    return (
        <nav className="flex justify-between items-center p-6 bg-slate-900 text-white border-b border-slate-800">
            <div className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Tesseract
            </div>
            <div>
                {isConnected ? (
                    <div className="flex gap-4 items-center">
                        <span className="font-mono text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                            {address?.slice(0, 6)}...{address?.slice(-4)}
                        </span>
                        <button
                            onClick={() => disconnect()}
                            className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                        >
                            Disconnect
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => connect({ connector: connectors[0] })}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg shadow-lg font-medium transition-all"
                    >
                        Connect Wallet
                    </button>
                )}
            </div>
        </nav>
    )
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className="dark">
            <body className="bg-slate-950 min-h-screen text-slate-100 font-sans antialiased">
                <WagmiProvider config={wagmiConfig}>
                    <QueryClientProvider client={queryClient}>
                        <Navbar />
                        <main className="container mx-auto p-4 lg:p-8">
                            {children}
                        </main>
                    </QueryClientProvider>
                </WagmiProvider>
            </body>
        </html>
    )
}
