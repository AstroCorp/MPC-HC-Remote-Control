import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from '@/stores/mmkvStorage';

interface SettingsStore {
    ip: string;
    port: string;
    updateIp: (newIp: string) => void;
    updatePort: (newPort: string) => void;
}

const DEFAULT_IP = '192.168.0.12';
const DEFAULT_PORT = '13579';

const useSettingsStore = create<SettingsStore>()(persist((set) => ({
    ip: DEFAULT_IP,
    port: DEFAULT_PORT,

    updateIp: (newIp: string) => set({ ip: newIp }),

    updatePort: (newPort: string) => set({ port: newPort }),
}), {
    name: 'user-settings',
    storage: createJSONStorage(() => mmkvStorage),
    partialize: (state) => ({
        ip: state.ip,
        port: state.port,
    }),
}));

export default useSettingsStore;
