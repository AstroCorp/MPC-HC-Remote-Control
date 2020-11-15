import React from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet, StatusBar } from 'react-native';
import { BackArrowIcon, SettingsIcon, EnableSyncIcon, DisableSyncIcon } from '../assets/icons';

const Header = (props) => (
    <View style={{ height: 60 }}>
        <StatusBar backgroundColor="#346998" />

        <View style={styles.header}>
            {props.title === 'Settings' && (
                <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
                    <View style={styles.icon}>
                        <BackArrowIcon color="#FFF" size="28" />
                    </View>
                </TouchableWithoutFeedback>
            )}

            <Text style={[styles.title, props.title === 'Settings' && styles.titleSettings]}>{props.title}</Text>

            {props.title !== 'Settings' && (
                <View style={styles.options}>
                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Settings')}>
                        <View style={styles.icon}>
                            <SettingsIcon color="#FFF" size="28" />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => props.setSync(!props.sync)}>
                        <View style={[styles.icon, styles.syncIcon]}>
                            {
                                !props.sync 
                                ? 
                                    <DisableSyncIcon color="#FFF" size="28" />
                                :
                                    <EnableSyncIcon color="#FFF" size="28" />
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </View>
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

    titleSettings: {
        marginLeft: 15,
    },

    title: {
        fontSize: 20,
        marginTop: -2,
        color: "#FFF"
    },

    options: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
    },

    icon: {
        padding: 5,
    },

    syncIcon: {
        marginRight: 5,
    }
});

export default Header;