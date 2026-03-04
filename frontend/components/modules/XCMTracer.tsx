import * as React from 'react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../factory/GlassCard'

interface XCMTracerProps {
    destination: string;
}

export function XCMTracer({ destination }: XCMTracerProps) {
    const [step, setStep] = useState(1);

    useEffect(() => {
        // Simulate XCM progression
        const timer1 = setTimeout(() => setStep(2), 2000); // 2s: swap done, message sent
        const timer2 = setTimeout(() => setStep(3), 14000); // 14s: arrived on parachain
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const steps = [
        { id: 1, title: 'Swap Local', description: 'Swap executed on Polkadot Hub' },
        { id: 2, title: `Sending to ${destination}`, description: 'XCM message dispatched' },
        { id: 3, title: 'Arrived', description: `Funds secured on ${destination}` },
    ];

    return (
        <GlassCard className="p-6 mt-6 border-brand-accent/30 bg-brand-accent/5 flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />

            <h3 className="text-xs uppercase tracking-widest text-brand-accent flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    {step < 3 && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>}
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                </span>
                XCM Flight Tracker
            </h3>

            <div className="flex flex-col gap-4 relative z-10">
                {steps.map((s, idx) => {
                    const isCompleted = step > s.id;
                    const isActive = step === s.id;
                    const isPending = step < s.id;

                    return (
                        <div key={s.id} className={`flex items-start gap-4 transition-opacity duration-500 ${isPending ? 'opacity-30' : 'opacity-100'}`}>
                            <div className="flex flex-col items-center mt-0.5">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors duration-500 ${isCompleted ? 'bg-brand-accent border-brand-accent' : isActive ? 'border-brand-accent animate-pulse' : 'border-white/20'}`}>
                                    {isCompleted && (
                                        <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                {idx < steps.length - 1 && (
                                    <div className={`w-[1px] h-6 mt-1 transition-colors duration-500 ${isCompleted ? 'bg-brand-accent/50' : 'bg-white/10'}`} />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-slate-300'}`}>{s.title}</span>
                                <span className="text-xs text-slate-500 font-light mt-0.5">{s.description}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {step === 3 && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 flex justify-end">
                    <span className="text-xs uppercase tracking-widest text-emerald-400 font-medium">Cross-Chain Transfer Complete</span>
                </motion.div>
            )}
        </GlassCard>
    );
}
