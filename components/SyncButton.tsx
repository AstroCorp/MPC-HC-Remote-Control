import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useSettingsStore from '@/stores/useSettingsStore';

const SyncButton = () => {
    const [isRegistered, setIsRegistered] = useState(false);

    const toggleFetchTask = async () => {
        const { url } = useSettingsStore();

        const response = await fetch(url);

        if (!response.ok) {
            return;
        }

        const data = await response.json();

        console.log(data);
    };

    return (
        <TouchableOpacity onPress={toggleFetchTask}>
            <MaterialIcons name={isRegistered ? 'sync' : 'sync-disabled'} size={24} color="#FFFFFF" />
        </TouchableOpacity>
    );
};

export default SyncButton;
