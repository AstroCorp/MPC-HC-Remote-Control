import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useSettingsStore from '@/stores/useSettingsStore';

const BACKGROUND_FETCH_TASK = 'background-fetch';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const { url } = useSettingsStore();

    console.log('Running background fetch task with URL:', url);
    
    const response = await fetch(url);

    if (!response.ok) {
        console.error('Failed to fetch data:', response.statusText);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }

    const data = await response.json();

    console.log(data);
    
    return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 1,
        stopOnTerminate: false,
        startOnBoot: true,
    });
}

async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

const SyncButton = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [status, setStatus] = useState<BackgroundFetch.BackgroundFetchStatus | null>(null);

    useEffect(() => {
        checkStatusAsync();
    }, []);

    const checkStatusAsync = async () => {
        const statusAsync = await BackgroundFetch.getStatusAsync();
        const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);

        setStatus(statusAsync);
        setIsRegistered(isRegistered);
    };

    const toggleFetchTask = async () => {
        if (isRegistered) {
            await unregisterBackgroundFetchAsync();
        } else {
            await registerBackgroundFetchAsync();
        }

        checkStatusAsync();
    };

    return (
        <TouchableOpacity onPress={toggleFetchTask}>
            <MaterialIcons name={isRegistered ? 'sync' : 'sync-disabled'} size={24} color="#FFFFFF" />
        </TouchableOpacity>
    );
};

export default SyncButton;
