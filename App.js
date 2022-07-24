import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
//import RNBootSplash from "react-native-bootsplash";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Settings, Tutorial } from './src/screens';
import configureStore from './src/store/configureStore';

const store = configureStore();
const Stack = createNativeStackNavigator();

const App = () => {
	//useEffect(() => RNBootSplash.hide({ fade: true }));

	return (
		<SafeAreaProvider>
			<Provider store={store.store}>
				<PersistGate loading={null} persistor={store.persistor}>
					<StatusBar backgroundColor="#111827" />

					<NavigationContainer>
						<Stack.Navigator
							screenOptions={{
								headerShown: false,
								animation: 'slide_from_right',
								presentation: 'modal',
							}}
						>
							<Stack.Screen name="Home" component={Home} />
							<Stack.Screen name="Settings" component={Settings} />
							<Stack.Screen
								name="Tutorial"
								component={Tutorial}
								options={{
									animation: 'slide_from_bottom'
								}}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</PersistGate>
			</Provider>
		</SafeAreaProvider>
	);
};

export default App;
