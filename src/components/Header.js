import React from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet, StatusBar } from 'react-native';
import { BackArrow, Settings } from '../assets/icons';

const Header = (props) => (
    <View style={{ height: 60 }}>
        <StatusBar backgroundColor="#346998" />
        <View style={[styles.header, props.title !== 'Settings' && styles.headerHome]}>
            {props.title === 'Settings' && (
                <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
                    <View>
                        <BackArrow color="#FFF" size="28" />
                    </View>
                </TouchableWithoutFeedback>
            )}

            <Text style={[styles.title, props.title === 'Settings' && styles.titleSettings]}>{props.title}</Text>

            {props.title !== 'Settings' && (
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Settings')}>
                    <View>
                        <Settings color="#FFF" size="28" />
                    </View>
                </TouchableWithoutFeedback>
            )}
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
    },

    headerHome: {
        justifyContent: 'space-between'
    },

    titleSettings: {
        marginLeft: 15,
    },

    title: {
        fontSize: 20,
        marginTop: -2,
        color: "#FFF"
    }
});

export default Header;