import { create } from 'zustand';
import { getVariables } from '@/utils/common';

export type MpcStatus = ReturnType<typeof getVariables>;

interface MpcStatusStore {
    status: MpcStatus | null;
    updateStatus: (nextStatus: MpcStatus | null) => void;
    clearStatus: () => void;
}

const useMpcStatusStore = create<MpcStatusStore>((set) => ({
    status: null,

    updateStatus: (nextStatus) => set({ status: nextStatus }),

    clearStatus: () => set({ status: null }),
}));

export default useMpcStatusStore;