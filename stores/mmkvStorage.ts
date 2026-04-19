import { createMMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

const storage = createMMKV({
    id: 'mpc-hc-remote-control',
});

export const mmkvStorage: StateStorage = {
    getItem: (name) => {
        const value = storage.getString(name);

        return value ?? null;
    },
    setItem: (name, value) => {
        return storage.set(name, value);
    },
    removeItem: (name) => {
        return storage.remove(name);
    },
};