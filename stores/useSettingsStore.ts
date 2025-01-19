import { create } from 'zustand';

interface SettingsStore {
    url: string;
    updateUrl: (newUrl: string) => void;
}

const useSettingsStore = create<SettingsStore>((set, get) => ({
    url: 'http://192.168.0.14:13579',

    updateUrl: (newUrl: string) => set(() => ({ url: newUrl })),
}));

export default useSettingsStore;
