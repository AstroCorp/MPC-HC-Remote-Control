import React from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet, StatusBar } from 'react-native';
import SettingsIcon from '../assets/icons/SettingsIcon';

const Header = (props) => (
    <View style={{ height: 60 }}>
        <StatusBar backgroundColor="#346998" />
        <View style={styles.header}>
            <Text style={styles.title}>{props.title}</Text>
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Settings')}>
                <View>
                    <SettingsIcon color="#FFF" size="28" />
                </View>
            </TouchableWithoutFeedback>
        </View>
    </View>
);

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3E7DB4',
        height: 60,
        paddingHorizontal: 15,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    title: {
        fontSize: 20,
        marginTop: -2,
        color: "#FFF"
    }
});

export default Header;