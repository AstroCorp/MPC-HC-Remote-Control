import React from 'react';
import { StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import colors from '../utils/colors';

const MainContent = (props) => (
    <SafeAreaView style={styles.content}>
        { props.children }
    </SafeAreaView>
);

const styles = StyleSheet.create({
    content: {
        flex: 1, 
        backgroundColor: colors.bg,
    },
});

export default MainContent;