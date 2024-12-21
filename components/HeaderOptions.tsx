import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const HeaderOptions = () => {
    return (
        <View>
            <Link asChild href="/settings">
                <TouchableOpacity>
                    <Ionicons name="settings-sharp" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </Link>
        </View>
    );
};

export default HeaderOptions;