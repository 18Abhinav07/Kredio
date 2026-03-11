export type ActionLogLevel = 'info' | 'success' | 'warning' | 'error';

export type ActionLogEntry = {
    id: string;
    at: number;
    level: ActionLogLevel;
    action: string;
    detail: string;
    txHash?: string;
    /** Which chain the txHash belongs to - determines the correct explorer URL */
    chain?: 'hub' | 'people';
    market?: 'lending' | 'pas' | 'system';
};

const STORAGE_KEY = 'kredio.actionLog.v1';
const MAX_ENTRIES = 200;

export function readActionLog(): ActionLogEntry[] {
    if (typeof window === 'undefined') return [];
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw) as ActionLogEntry[];
        if (!Array.isArray(parsed)) return [];
        return parsed;
    } catch {
        return [];
    }
}

export function writeActionLog(entries: ActionLogEntry[]) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
}

export function appendActionLog(entry: Omit<ActionLogEntry, 'id' | 'at'>): ActionLogEntry[] {
    const next: ActionLogEntry = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        at: Date.now(),
        ...entry,
    };
    const current = readActionLog();
    const updated = [next, ...current].slice(0, MAX_ENTRIES);
    writeActionLog(updated);
    return updated;
}

export function clearActionLog() {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(STORAGE_KEY);
}
