import { create } from 'zustand';

type SyncStore = {
  isSyncActive: boolean;
  setSyncActive: (value: boolean) => void;
};

const useSyncStore = create<SyncStore>((set) => ({
  isSyncActive: false,
  setSyncActive: (value) => set({ isSyncActive: value }),
}));

export default useSyncStore;
