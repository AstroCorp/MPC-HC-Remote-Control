import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SyncButton from '@/components/SyncButton';

const HeaderOptions = () => {
    return (
        <View className='flex flex-row'>
            <SyncButton />

            <Link asChild href="/settings" className="ml-3">
                <TouchableOpacity>
                    <MaterialIcons name="settings" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </Link>
        </View>
    );
};

export default HeaderOptions;