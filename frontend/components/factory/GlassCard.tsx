import * as React from 'react'
import { cn } from '../../lib/utils'

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'subtle';
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, children, variant = 'default', ...props }, ref) => {

        const variants = {
            default: 'bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl',
            elevated: 'bg-white/[0.04] backdrop-blur-2xl border border-white/20 shadow-2xl',
            subtle: 'bg-transparent border border-white/5'
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-none transition-all duration-300",
                    variants[variant],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        )
    }
)
GlassCard.displayName = 'GlassCard'
