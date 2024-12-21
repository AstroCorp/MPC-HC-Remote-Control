import "@/global.css";
import 'react-native-reanimated';
import React from 'react';
import { useEffect } from 'react';
import { View } from "react-native";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import HeaderOptions from "@/components/HeaderOptions";

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
		<View className="flex-1 bg-slate-700">
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: '#1e293b',
					},
					contentStyle: {
						backgroundColor: '#334155',
					},
					headerTintColor: '#fff',
				}}
			>
				<Stack.Screen
					name="index"
					options={{
						title: 'MPC-HC Remote',
						headerRight: HeaderOptions,
					}}
				/>
				<Stack.Screen
					name="settings"
					options={{
						title: 'Settings',
					}}
				/>
			</Stack>
			<StatusBar style="auto" />
		</View>
	);
}
