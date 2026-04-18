import React, { useCallback, useEffect, useState } from 'react';
import { ToastAndroid, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useSettingsStore from '@/stores/useSettingsStore';

export default function HomeScreen() {
    const { ip, port, updateIp, updatePort } = useSettingsStore();
    const [ipInput, setIpInput] = useState(ip);
    const [portInput, setPortInput] = useState(port);
    const [error, setError] = useState('');

    useEffect(() => {
        setIpInput(ip);
        setPortInput(port);
    }, [ip, port]);

    const isValidIpv4 = useCallback((value: string): boolean => {
        const parts = value.trim().split('.');

        if (parts.length !== 4) {
            return false;
        }

        return parts.every((segment) => {
            if (segment === '' || !/^\d+$/.test(segment)) {
                return false;
            }

            const number = Number(segment);

            return number >= 0 && number <= 255;
        });
    }, []);

    const handleSaveSettings = useCallback(() => {
        const numericPort = Number(portInput);

        if (!isValidIpv4(ipInput)) {
            const message = 'Enter a valid IP, for example 192.168.0.12.';

            setError(message);

            ToastAndroid.show(message, ToastAndroid.SHORT);

            return;
        }

        if (!Number.isInteger(numericPort) || numericPort < 1 || numericPort > 65535) {
            const message = 'Port must be between 1 and 65535.';

            setError(message);

            ToastAndroid.show(message, ToastAndroid.SHORT);

            return;
        }

        updateIp(ipInput.trim());
        updatePort(portInput);
        setError('');
        
        ToastAndroid.show('Settings saved successfully.', ToastAndroid.SHORT);
    }, [ipInput, portInput, isValidIpv4, updateIp, updatePort]);

    const handleIpChange = (value: string) => {
        setIpInput(value);
        if (error) setError('');
    };

    const handlePortChange = (value: string) => {
        setPortInput(value.replace(/[^0-9]/g, ''));
        if (error) setError('');
    };

	return (
		<View className='flex-1 p-5'>
            <Text className='text-3xl font-RobotoBold text-white mb-3'>Conexión MPC-HC</Text>

			<View className='bg-slate-800 rounded-xl p-4'>
                <Text className='text-slate-200 text-lg mb-2 font-RobotoMedium'>IP del equipo con MPC-HC</Text>

				<TextInput
					value={ipInput}
					onChangeText={handleIpChange}
					keyboardType='numbers-and-punctuation'
					autoCapitalize='none'
					autoCorrect={false}
					placeholder='Dirección IP del equipo'
					placeholderTextColor='#94a3b8'
					className='bg-slate-700 text-white rounded-lg px-3 py-2 mb-4'
				/>

                <Text className='text-slate-200 text-lg mb-2 font-RobotoMedium'>Puerto web (MPC-HC)</Text>

				<TextInput
					value={portInput}
					onChangeText={handlePortChange}
					keyboardType='number-pad'
					placeholder='Puerto de la interfaz web'
					placeholderTextColor='#94a3b8'
					className='bg-slate-700 text-white rounded-lg px-3 py-2'
				/>

                {error ? <Text className='text-red-400 mt-2 text-base'>{error}</Text> : null}

                <TouchableOpacity className='bg-blue-600 rounded-lg mt-4 py-3' onPress={handleSaveSettings}>
                    <Text className='text-white text-center font-RobotoBold text-lg'>Guardar configuración</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
