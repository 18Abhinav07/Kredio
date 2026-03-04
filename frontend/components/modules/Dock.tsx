import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useProtocolStore } from '../../lib/store'

const TABS = [
    { id: 'home', label: 'Home', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" /></svg> },
    { id: 'swap', label: 'Swap', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg> },
    { id: 'vault', label: 'Vault', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
    { id: 'compute', label: 'Compute', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
] as const;

export function Dock() {
    const { activeTab, setActiveTab } = useProtocolStore();

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 rounded-none bg-surface border-t border-white/5 px-4 py-2 shadow-2xl backdrop-blur-3xl border-b-transparent">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <motion.button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                                "relative flex items-center justify-center w-12 h-12 transition-colors group",
                                isActive ? "text-foreground" : "text-muted hover:text-foreground"
                            )}
                        >
                            <span className="relative z-10">{tab.icon}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="dock-dot"
                                    className="absolute bottom-2 w-1 h-1 rounded-full bg-brand-subtle"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </motion.button>
                    )
                })}
            </div>
        </div>
    )
}
