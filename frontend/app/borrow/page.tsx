'use client';

import { useState } from 'react';
import { PageShell } from '../../components/modules/ProtocolUI';
import { BorrowUsdcFeature } from '../../components/modules/borrow/BorrowUsdcFeature';
import { BorrowPasFeature } from '../../components/modules/borrow/BorrowPasFeature';
import { cn } from '../../lib/utils';

export type BorrowMarket = 'usdc' | 'pas';

export default function BorrowRootPage() {
    const [market, setMarket] = useState<BorrowMarket>('usdc');

    return (
        <PageShell 
            title="Borrow" 
            subtitle={market === 'usdc' 
                ? "Deposit mUSDC collateral, then borrow based on your credit score." 
                : "Deposit PAS as collateral and borrow mUSDC from KredioPASMarket."
            }
        >
            <div className="max-w-lg mx-auto mb-4">
                <div className="rounded-xl border border-white/10 bg-black/30 p-1 inline-flex gap-1 w-full sm:w-auto">
                    <button
                        onClick={() => setMarket('usdc')}
                        className={cn(
                            'flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-semibold transition-colors',
                            market === 'usdc' ? 'bg-white text-black' : 'text-slate-300 hover:bg-white/10 hover:text-white',
                        )}
                    >
                        USDC Collateral
                    </button>
                    <button
                        onClick={() => setMarket('pas')}
                        className={cn(
                            'flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-semibold transition-colors',
                            market === 'pas' ? 'bg-white text-black' : 'text-slate-300 hover:bg-white/10 hover:text-white',
                        )}
                    >
                        PAS Collateral
                    </button>
                </div>
            </div>
            
            {market === 'usdc' ? <BorrowUsdcFeature /> : <BorrowPasFeature />}
        </PageShell>
    );
}
