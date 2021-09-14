import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import tailwind from 'tailwind-rn';

const MainContent = (props) => (
    <SafeAreaView style={tailwind('flex-1 bg-gray-900')}>
        { props.children }
    </SafeAreaView>
);

export default MainContent;