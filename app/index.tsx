import React from 'react';
import { Text, View } from 'react-native';
import * as TaskManager from 'expo-task-manager';

export default function HomeScreen() {

	return (
		<View className='flex flex-col items-center justify-center p-5'>
			<Text className='text-blue-500'>Welcome</Text>
		</View>
	);
}
