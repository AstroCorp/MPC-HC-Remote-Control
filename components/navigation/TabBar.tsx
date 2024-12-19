import React from 'react';
import { View, } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabButton from '@/components/navigation/TabButton';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const IGNORED_ROUTES = ['_sitemap', '+not-found'];

    return (
        <View className='flex items-center absolute bottom-2 w-full'>
            <View className='flex flex-row w-1/2 bg-slate-800 rounded-full'>
            {
                state.routes.filter((route) => !IGNORED_ROUTES.includes(route.name)).map((route, index) => (
                    <TabButton
                        key={`tab-button-${route.key}`}
                        index={index}
                        route={route}
                        descriptors={descriptors}
                        navigation={navigation}
                        state={state}
                    />
                ))
            }
            </View>
        </View>
    );
}

export default TabBar;
