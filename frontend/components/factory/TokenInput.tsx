import * as React from 'react'
import { cn } from '../../lib/utils'

export interface TokenInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string;
    tokenSymbol?: string;
    tokenIcon?: React.ReactNode;
    onMax?: () => void;
    onTokenSelect?: () => void;
    onChange?: (val: string) => void;
    balance?: string;
}

export const TokenInput = React.forwardRef<HTMLInputElement, TokenInputProps>(
    ({ className, label, tokenSymbol, tokenIcon, onMax, onTokenSelect, onChange, balance, ...props }, ref) => {

        // Allow only numeric input and decimals
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            if (val === '' || /^[0-9]*[.,]?[0-9]*$/.test(val)) {
                if (onChange) onChange(val.replace(',', '.'));
            }
        };

        return (
            <div className="flex flex-col gap-3 w-full p-6 border border-white/10 bg-white/[0.02] backdrop-blur-md transition-all focus-within:border-white/20 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex justify-between items-center text-xs uppercase tracking-widest text-slate-500">
                    <span>{label}</span>
                    {balance !== undefined && (
                        <div className="flex gap-2 items-center">
                            <span>Balance: {balance}</span>
                            {onMax && (
                                <button
                                    onClick={onMax}
                                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                                    type="button"
                                >
                                    MAX
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center gap-4 mt-1">
                    <input
                        ref={ref}
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        placeholder="0.0"
                        onChange={handleInputChange}
                        className={cn(
                            "flex w-full bg-transparent text-5xl font-extralight tracking-tighter outline-none placeholder:text-muted/30 disabled:cursor-not-allowed disabled:opacity-50",
                            className
                        )}
                        {...props}
                    />

                    <button
                        type="button"
                        onClick={onTokenSelect}
                        className="flex items-center gap-2 rounded-none bg-transparent hover:bg-white/5 border border-white/10 px-4 py-2 text-foreground font-medium text-sm tracking-wide transition-all flex-shrink-0"
                    >
                        {tokenIcon && <div className="w-5 h-5 flex items-center justify-center overflow-hidden">{tokenIcon}</div>}
                        <span>{tokenSymbol || 'Select'}</span>
                        <svg className="w-4 h-4 text-muted mx-[-2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
        )
    }
)
TokenInput.displayName = 'TokenInput'
