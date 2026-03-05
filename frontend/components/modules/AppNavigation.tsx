'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import { useAccess } from '../../hooks/useAccess';

const LINKS = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/xcm-test', label: 'XCM Test' },
    { href: '/markets/usdc', label: 'Markets' },
    { href: '/borrow/usdc', label: 'Borrow' },
    { href: '/lend/usdc', label: 'Lend' },
    { href: '/score', label: 'Score' },
    { href: '/liquidate', label: 'Liquidate' },
    { href: '/admin', label: 'Admin' },
];

export function AppNavigation() {
    const pathname = usePathname();
    const { isAdmin } = useAccess();
    const visibleLinks = LINKS.filter((link) => isAdmin || (link.href !== '/liquidate' && link.href !== '/admin'));

    return (
        <div className="hidden lg:flex items-center gap-1 rounded-xl border border-white/10 bg-black/20 px-2 py-1">
            {visibleLinks.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                            active ? 'bg-white text-black' : 'text-slate-300 hover:text-white hover:bg-white/10',
                        )}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </div>
    );
}
