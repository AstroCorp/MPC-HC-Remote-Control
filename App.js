import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';

import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import Home from './src/screens/Home';
import Settings from './src/screens/Settings';

import colors from './src/utils/colors';

enableScreens();
const store = configureStore();
const Stack = createNativeStackNavigator();

const App = () => {
	useEffect(() => {
		SplashScreen.hide();
	});

	return (
		<SafeAreaProvider>
			<Provider store={store.store}>
				<PersistGate loading={null} persistor={store.persistor}>
					<StatusBar backgroundColor={colors.statusBar} />

					<NavigationContainer>
						<Stack.Navigator mode="modal" screenOptions={{ headerShown: false, stackAnimation: 'slide_from_right' }}>
							<Stack.Screen name="Home" component={Home} />
							<Stack.Screen name="Settings" component={Settings} />
						</Stack.Navigator>
					</NavigationContainer>
				</PersistGate>
			</Provider>
		</SafeAreaProvider>
	);
};

export default App;
