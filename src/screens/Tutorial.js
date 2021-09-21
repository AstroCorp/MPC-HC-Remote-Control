import React from 'react';
import { Image, View, TouchableNativeFeedback } from 'react-native';
import tailwind from 'tailwind-rn';
import Onboarding from 'react-native-onboarding-swiper';
import { MainContent } from '../components';
import { CloseIcon } from '../assets/icons';

const Tutorial = (props) => {
    return (
        <MainContent>
            <View style={tailwind('flex items-center absolute w-full mt-3 z-10')}>
                <TouchableNativeFeedback onPress={() => props.navigation.goBack()}>
                    <View style={tailwind('flex flex-row items-center justify-center bg-gray-700 h-12 w-12 rounded-full')}>
                        <CloseIcon color="#FFFFFF" size="18" />
                    </View>
                </TouchableNativeFeedback>
            </View>

            <Onboarding
                pages={[
                    {
                        image: <Image style={tailwind('w-4/5 -mt-24 -mb-16')} resizeMode="contain" source={require('../assets/images/tutorial_1.jpg')} />,
                        subtitle: 'Click in "View"',
                        subTitleStyles: tailwind('text-sm'),
                    },
                    {
                        image: <Image style={tailwind('w-4/5 -mt-24 -mb-16')} resizeMode="contain" source={require('../assets/images/tutorial_2.jpg')} />,
                        subtitle: 'Click in "Options..."',
                        subTitleStyles: tailwind('text-sm'),
                    },
                    {
                        image: <Image style={tailwind('w-4/5 -mt-24 -mb-16')} resizeMode="contain" source={require('../assets/images/tutorial_3.jpg')} />,
                        subtitle: 'Click in "Web Interface"',
                        subTitleStyles: tailwind('text-sm'),
                    },
                    {
                        image: <Image style={tailwind('w-4/5 -mt-24 -mb-16')} resizeMode="contain" source={require('../assets/images/tutorial_4.jpg')} />,
                        subtitle: 'Check "Listen on port:"',
                        subTitleStyles: tailwind('text-sm'),
                    },
                    {
                        title: 'All ready!',
                        subtitle: 'Now you just have to indicate on the APP the IP of your PC and the port that uses MPC-HC.',
                        titleStyles: tailwind('-mt-20'),
                        subTitleStyles: tailwind('-mt-8 text-sm'),
                    },
                ]}
                showDone={false}
                showSkip={false}
                showNext={false}
                bottomBarColor="#000000"
            />
        </MainContent>
    );
}

export default Tutorial;
