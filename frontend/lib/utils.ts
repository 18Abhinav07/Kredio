import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes dynamically
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function pow10(exp: number): bigint {
    return BigInt(`1${'0'.repeat(exp)}`);
}

function withThousandsSeparators(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function roundToFractionDigits(value: bigint, decimals: number, fractionDigits: number): bigint {
    if (decimals <= fractionDigits) {
        return value * pow10(fractionDigits - decimals);
    }

    const divisor = pow10(decimals - fractionDigits);
    const quotient = value / divisor;
    const remainder = value % divisor;
    const shouldRoundUp = remainder * 2n >= divisor;
    return shouldRoundUp ? quotient + 1n : quotient;
}

export function formatInteger(value: bigint | number): string {
    const normalized = typeof value === 'number' ? BigInt(value) : value;
    const sign = normalized < 0n ? '-' : '';
    const abs = normalized < 0n ? -normalized : normalized;
    return `${sign}${withThousandsSeparators(abs.toString())}`;
}

export function formatTokenAmount(
    value: bigint,
    decimals: number,
    fractionDigits = 4,
    trimTrailingZeros = false,
): string {
    const negative = value < 0n;
    const abs = negative ? -value : value;
    const scaled = roundToFractionDigits(abs, decimals, fractionDigits);

    if (fractionDigits === 0) {
        return `${negative ? '-' : ''}${withThousandsSeparators(scaled.toString())}`;
    }

    const text = scaled.toString().padStart(fractionDigits + 1, '0');
    const integerPart = text.slice(0, -fractionDigits);
    let fractionalPart = text.slice(-fractionDigits);

    if (trimTrailingZeros) {
        fractionalPart = fractionalPart.replace(/0+$/, '');
    }

    const groupedInt = withThousandsSeparators(integerPart);
    const sign = negative ? '-' : '';
    return fractionalPart.length > 0 ? `${sign}${groupedInt}.${fractionalPart}` : `${sign}${groupedInt}`;
}

/**
 * Formats a BigInt blockchain value into a clean readable string
 * @param value The raw BigInt from Wagmi
 * @param decimals Decimals (usually 18)
 * @param displayDecimals How many decimals to show in the UI
 */
export function formatDisplayBalance(value: bigint | undefined | null, decimals = 18, displayDecimals = 4): string {
    if (value === null || value === undefined) return '0.00';
    return formatTokenAmount(value, decimals, displayDecimals, false);
}

/**
 * Shortens a blockchain address for display (e.g. 0x1234...5678)
 */
export function shortenAddress(address: string | undefined): string {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
