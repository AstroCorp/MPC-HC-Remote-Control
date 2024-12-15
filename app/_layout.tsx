import "@/global.css";
import 'react-native-reanimated';
import React from 'react';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<>
			<Tabs 
				screenOptions={{ 
					tabBarActiveTintColor: 'blue',
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: 'Home',
						tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
					}}
				/>
				<Tabs.Screen
					name="settings"
					options={{
						title: 'Settings',
						tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
					}}
				/>
			</Tabs>
			<StatusBar style="auto" />
		</>
	);
}
