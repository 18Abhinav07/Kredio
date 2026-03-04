import { create } from 'zustand';

interface ProtocolState {
    activeTab: 'home' | 'swap' | 'vault' | 'compute';
    setActiveTab: (tab: 'home' | 'swap' | 'vault' | 'compute') => void;
    txPending: boolean;
    setTxPending: (status: boolean) => void;
    txHash: string | null;
    setTxHash: (hash: string | null) => void;
}

export const useProtocolStore = create<ProtocolState>((set) => ({
    activeTab: 'home',
    setActiveTab: (tab) => set({ activeTab: tab }),
    txPending: false,
    setTxPending: (status) => set({ txPending: status }),
    txHash: null,
    setTxHash: (hash) => set({ txHash: hash }),
}));
