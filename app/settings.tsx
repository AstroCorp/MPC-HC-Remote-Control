import React, { useCallback, useEffect, useState } from 'react';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { Image, ImageSourcePropType, ScrollView, ToastAndroid, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import useSettingsStore from '@/stores/useSettingsStore';

const tutorialSlides: { source: ImageSourcePropType; name: string; aspectRatio: number }[] = [
    { source: require('@/assets/images/tutorial_1.jpg'), name: 'tutorial_1.jpg' },
    { source: require('@/assets/images/tutorial_2.jpg'), name: 'tutorial_2.jpg' },
    { source: require('@/assets/images/tutorial_3.jpg'), name: 'tutorial_3.jpg' },
    { source: require('@/assets/images/tutorial_4.jpg'), name: 'tutorial_4.jpg' },
    { source: require('@/assets/images/tutorial_5.jpg'), name: 'tutorial_5.jpg' },
].map((slide) => {
    const asset = Image.resolveAssetSource(slide.source);
    const aspectRatio = asset.width && asset.height ? asset.width / asset.height : 16 / 9;

    return { ...slide, aspectRatio };
});

export default function HomeScreen() {
    const { ip, port, updateIp, updatePort } = useSettingsStore();
    const { width } = useWindowDimensions();
    const [ipInput, setIpInput] = useState(ip);
    const [portInput, setPortInput] = useState(port);
    const [error, setError] = useState('');
    const [activeSlide, setActiveSlide] = useState(0);
    const progress = useSharedValue(0);

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

    const carouselWidth = Math.max(280, Math.min(width - 40, 440));
    const activeAspectRatio = tutorialSlides[activeSlide]?.aspectRatio ?? 16 / 9;
    const carouselHeight = carouselWidth / activeAspectRatio;

    return (
        <ScrollView className='flex-1' contentContainerClassName='p-5 pb-10'>
            <Text className='text-3xl font-RobotoBold text-white mb-3'>MPC-HC Connection</Text>

			<View className='bg-slate-800 rounded-xl p-4'>
                <Text className='text-slate-200 text-lg mb-2 font-RobotoMedium'>IP Address of the MPC-HC Device</Text>

				<TextInput
					value={ipInput}
					onChangeText={handleIpChange}
					keyboardType='numbers-and-punctuation'
					autoCapitalize='none'
					autoCorrect={false}
                    placeholder='Device IP address'
					placeholderTextColor='#94a3b8'
					className='bg-slate-700 text-white rounded-lg px-3 py-2 mb-4'
				/>

                <Text className='text-slate-200 text-lg mb-2 font-RobotoMedium'>Web Port (MPC-HC)</Text>

				<TextInput
					value={portInput}
					onChangeText={handlePortChange}
					keyboardType='number-pad'
                    placeholder='Web interface port'
					placeholderTextColor='#94a3b8'
					className='bg-slate-700 text-white rounded-lg px-3 py-2'
				/>

                {error ? <Text className='text-red-400 mt-2 text-base'>{error}</Text> : null}

                <TouchableOpacity className='bg-blue-600 rounded-lg mt-4 py-3' onPress={handleSaveSettings}>
                    <Text className='text-white text-center font-RobotoBold text-lg'>Save Settings</Text>
				</TouchableOpacity>
			</View>

            <View className='mt-5'>
                <Text className='text-2xl font-RobotoBold text-white mb-3'>Quick Tutorial</Text>

                <View className='items-center'>
                    <View className='relative' style={{ width: carouselWidth, height: carouselHeight }}>
                        <Carousel
                            loop
                            width={carouselWidth}
                            height={carouselHeight}
                            data={tutorialSlides}
                            scrollAnimationDuration={250}
                            onSnapToItem={setActiveSlide}
                            onProgressChange={progress}
                            renderItem={({ item }) => (
                                <Image source={item.source} resizeMode='contain' className='w-full h-full' />
                            )}
                        />
                    </View>
                </View>

                <Pagination.Custom
                    progress={progress}
                    data={tutorialSlides}
                    size={10}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#475569',
                    }}
                    activeDotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#e2e8f0',
                    }}
                    containerStyle={{
                        gap: 8,
                        marginTop: 12,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                />
            </View>
		</ScrollView>
	);
}
