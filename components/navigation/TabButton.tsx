import React from 'react';
import clsx from 'clsx';
import { NavigationRoute, ParamListBase } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableNativeFeedback } from 'react-native';

interface TabButtonProps extends Pick<BottomTabBarProps, 'descriptors' | 'state' | 'navigation'> {
    index: number;
    route: NavigationRoute<ParamListBase, string>;
}

const TabButton = ({ index, route, descriptors, state, navigation }: TabButtonProps) => {
    const { options } = descriptors[route.key];
    const label =
        options.tabBarLabel !== undefined
            ? options.tabBarLabel.toString()
            : options.title !== undefined
                ? options.title
                : route.name;
    const { 
        tabBarActiveTintColor = '#000000',
        tabBarInactiveTintColor = '#000000',
        tabBarIcon,
    } = options;
    const isFocused = state.index === index;

    const onPress = () => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
        }
    };

    const onLongPress = () => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    };

    return (
        <TouchableNativeFeedback
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <View className='w-1/2 flex items-center justify-center py-2'>
                {
                    tabBarIcon && (
                        <View className='w-7 h-7 mb-2'>
                            {tabBarIcon({ focused: isFocused, color: isFocused ? tabBarActiveTintColor : tabBarInactiveTintColor, size: 28 })}
                        </View>
                    )
                }

                <Text 
                    className='text-center' 
                    style={{ color: isFocused ? tabBarActiveTintColor : tabBarInactiveTintColor }}
                >
                    {label}
                </Text>
            </View>
        </TouchableNativeFeedback>
    );
}

export default TabButton;
