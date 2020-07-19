import React from 'react';
import { Text } from 'react-native';
import Header from '../components/Header';
import SafeAreaView from 'react-native-safe-area-view';

const Home = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Home" navigation={props.navigation} />
            <Text>Home</Text>
        </SafeAreaView>
    );
}

export default Home;