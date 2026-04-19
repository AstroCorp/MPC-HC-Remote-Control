import "@/global.css";
import 'react-native-reanimated';
import React from 'react';
import { useEffect } from 'react';
import { View, Text } from "react-native";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import HeaderOptions from "@/components/HeaderOptions";

// Para evitar mostrar el contenido de la app antes de que se carguen las fuentes
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		RobotoBlack: require('../assets/fonts/Roboto-Black.ttf'),
		RobotoBlackItalic: require('../assets/fonts/Roboto-BlackItalic.ttf'),
		RobotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
		RobotoBoldItalic: require('../assets/fonts/Roboto-BoldItalic.ttf'),
		RobotoItalic: require('../assets/fonts/Roboto-Italic.ttf'),
		RobotoLight: require('../assets/fonts/Roboto-Light.ttf'),
		RobotoLightItalic: require('../assets/fonts/Roboto-LightItalic.ttf'),
		RobotoMedium: require('../assets/fonts/Roboto-Medium.ttf'),
		RobotoMediumItalic: require('../assets/fonts/Roboto-MediumItalic.ttf'),
		RobotoRegular: require('../assets/fonts/Roboto-Regular.ttf'),
		RobotoThin: require('../assets/fonts/Roboto-Thin.ttf'),
		RobotoThinItalic: require('../assets/fonts/Roboto-ThinItalic.ttf'),
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
					headerTitle: (title) => (
						<Text 
							style={{ color: title.tintColor || '#FFFFFF' }}
							className="text-2xl font-RobotoBold"
						>
							{title.children}
						</Text>
					)
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
			<StatusBar style="light" />
		</View>
	);
}
