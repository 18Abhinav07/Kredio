"use client";

import { useProtocolStore } from '../lib/store'
import { SwapWidget } from '../components/modules/SwapWidget'
import { VaultDashboard } from '../components/modules/VaultDashboard'
import { ComputeDashboard } from '../components/modules/ComputeDashboard'
import { HomeDashboard } from '../components/modules/HomeDashboard'
import { AnimatePresence, motion } from 'framer-motion'

export default function Home() {
    const { activeTab } = useProtocolStore();

    const getPageContext = () => {
        switch (activeTab) {
            case 'home': return <HomeDashboard key="home" />;
            case 'swap': return <SwapWidget key="swap" />;
            case 'vault': return <VaultDashboard key="vault" />;
            case 'compute': return <ComputeDashboard key="compute" />;
            default: return <HomeDashboard key="home" />;
        }
    }

    return (
        <div className="w-full flex justify-center items-start pt-[5vh] lg:pt-[10vh]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="w-full flex justify-center items-start"
                >
                    {getPageContext()}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
