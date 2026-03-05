'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function PageShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6"
        >
            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                <h1 className="text-2xl sm:text-3xl font-semibold text-white">{title}</h1>
                <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
            </div>
            {children}
        </motion.div>
    );
}

export function Grid({ children }: { children: ReactNode }) {
    return <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">{children}</div>;
}

export function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
    return (
        <motion.section
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 hover:border-white/20 hover:bg-black/35 transition-colors"
        >
            <div className="mb-4">
                <h2 className="text-base font-semibold text-white">{title}</h2>
                {subtitle ? <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p> : null}
            </div>
            <div className="space-y-3">{children}</div>
        </motion.section>
    );
}

export function StatRow({ label, value, tone = 'default' }: { label: string; value: string; tone?: 'default' | 'green' | 'yellow' | 'red' }) {
    return (
        <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
            <span className="text-slate-400">{label}</span>
            <motion.span
                key={`${label}-${value}`}
                initial={{ opacity: 0.35, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={cn(
                    'font-medium',
                    tone === 'default' && 'text-white',
                    tone === 'green' && 'text-emerald-300',
                    tone === 'yellow' && 'text-amber-300',
                    tone === 'red' && 'text-rose-300',
                )}
            >
                {value}
            </motion.span>
        </div>
    );
}

export function StatRowSkeleton({ label }: { label: string }) {
    return (
        <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
            <span className="text-slate-500">{label}</span>
            <span className="h-4 w-20 rounded bg-white/10 animate-pulse" />
        </div>
    );
}

export function StateNotice({
    tone,
    message,
}: {
    tone: 'info' | 'warning' | 'error';
    message: string;
}) {
    return (
        <div
            className={cn(
                'rounded-xl border px-3 py-2 text-xs',
                tone === 'info' && 'border-cyan-400/30 bg-cyan-500/10 text-cyan-200',
                tone === 'warning' && 'border-amber-400/30 bg-amber-500/10 text-amber-200',
                tone === 'error' && 'border-rose-400/30 bg-rose-500/10 text-rose-200',
            )}
        >
            {message}
        </div>
    );
}

export function ActionInput({
    label,
    value,
    onChange,
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}) {
    return (
        <label className="block space-y-1">
            <span className="text-xs uppercase tracking-wide text-slate-400">{label}</span>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-white/10 bg-black/40 text-sm text-white px-3 py-2 outline-none focus:border-white/30"
            />
        </label>
    );
}

export function ActionButton({
    label,
    onClick,
    disabled,
    loading,
    variant = 'primary',
}: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: 'primary' | 'ghost' | 'danger';
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={cn(
                'px-3 py-2 rounded-xl text-sm font-medium border transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2',
                variant === 'primary' && 'bg-white text-black border-white hover:bg-white/90',
                variant === 'ghost' && 'bg-white/5 text-white border-white/15 hover:bg-white/10',
                variant === 'danger' && 'bg-rose-500/20 text-rose-200 border-rose-400/30 hover:bg-rose-500/25',
            )}
        >
            {loading ? <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" /> : null}
            {label}
        </button>
    );
}

export function RouteShortcut({ href, label, description }: { href: string; label: string; description: string }) {
    return (
        <Link href={href} className="group block rounded-xl border border-white/10 bg-black/20 p-3 hover:border-white/20 hover:bg-black/35 transition-colors">
            <p className="text-sm font-medium text-white">{label}</p>
            <p className="text-xs text-slate-400 mt-1 group-hover:text-slate-300 transition-colors">{description}</p>
        </Link>
    );
}

export function MarketModeSwitch({
    base,
    active,
}: {
    base: '/borrow' | '/lend';
    active: 'usdc' | 'pas';
}) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/30 p-1 inline-flex gap-1">
            <Link
                href={`${base}/usdc`}
                className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                    active === 'usdc' ? 'bg-white text-black' : 'text-slate-300 hover:bg-white/10 hover:text-white',
                )}
            >
                USDC Collateral
            </Link>
            <Link
                href={`${base}/pas`}
                className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                    active === 'pas' ? 'bg-white text-black' : 'text-slate-300 hover:bg-white/10 hover:text-white',
                )}
            >
                PAS Collateral
            </Link>
        </div>
    );
}
