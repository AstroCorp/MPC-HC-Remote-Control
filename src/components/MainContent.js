import React from 'react';
import { StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const MainContent = (props) => (
    <SafeAreaView style={styles.content}>
        { props.children }
    </SafeAreaView>
);

const styles = StyleSheet.create({
    content: {
        flex: 1, 
        backgroundColor: '#1D1925',
    },
});

export default MainContent;