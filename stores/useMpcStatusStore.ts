import { create } from 'zustand';

type MpcStatus = Record<string, unknown> | null;

interface MpcStatusStore {
    status: MpcStatus;
    updateStatus: (nextStatus: MpcStatus) => void;
    clearStatus: () => void;
}

const useMpcStatusStore = create<MpcStatusStore>((set) => ({
    status: null,

    updateStatus: (nextStatus) => set({ status: nextStatus }),

    clearStatus: () => set({ status: null }),
}));

export default useMpcStatusStore;