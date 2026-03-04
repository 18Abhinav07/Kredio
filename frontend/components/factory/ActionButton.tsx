import * as React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface ActionButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    isLoading?: boolean;
}

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
    ({ className, isLoading, disabled, children, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
                whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
                disabled={disabled || isLoading}
                className={cn(
                    "relative flex h-14 w-full items-center justify-center rounded-none font-medium text-xs uppercase tracking-[0.2em] transition-all focus:outline-none overflow-hidden",
                    "bg-transparent border border-white/10 text-foreground hover:border-brand-accent/50 hover:shadow-[0_0_15px_rgba(232,28,255,0.1)] active:bg-foreground active:text-background disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            className="absolute top-0 left-0 h-[1px] w-1/3 bg-gradient-to-r from-transparent via-brand-accent to-transparent"
                            animate={{ left: ['-33%', '100%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        />
                        <motion.div
                            className="absolute bottom-0 right-0 h-[1px] w-1/3 bg-gradient-to-l from-transparent via-brand-subtle to-transparent"
                            animate={{ right: ['-33%', '100%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        />
                    </div>
                ) : null}
                <span className={cn(isLoading ? 'opacity-50' : 'opacity-100', 'transition-opacity')}>
                    {children as React.ReactNode}
                </span>
            </motion.button>
        )
    }
)
ActionButton.displayName = 'ActionButton'
