import React from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { BackArrowIcon, SettingsIcon, EnableSyncIcon, DisableSyncIcon } from '../assets/icons';
import { setMpcHcInfo, setSyncEnabled } from '../store/actions';
import colors from '../utils/colors';

const Header = (props) => {
    const title = props.title || props.ip + ':' + props.port;
    const toggleSync = () => {
        props.setSyncEnabled(!props.syncEnabled);
        props.setMpcHcInfo(null);
    }

    return (
        <View style={{ height: 60 }}>
            <View style={styles.header}>
                {props.title === 'Settings' && (
                    <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
                        <View style={styles.icon}>
                            <BackArrowIcon color={colors.icon} size="28" />
                        </View>
                    </TouchableWithoutFeedback>
                )}
    
                <Text style={[styles.title, props.title === 'Settings' && styles.titleSettings]}>
                    { title }
                </Text>
    
                {props.title !== 'Settings' && (
                    <View style={styles.options}>
                        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Settings')}>
                            <View style={styles.icon}>
                                <SettingsIcon color={colors.icon} size="28" />
                            </View>
                        </TouchableWithoutFeedback>
    
                        <TouchableWithoutFeedback onPress={toggleSync}>
                            <View style={[styles.icon, styles.syncIcon]}>
                                {
                                    props.syncEnabled 
                                    ? 
                                        <EnableSyncIcon color={colors.icon} size="28" />
                                    :
                                        <DisableSyncIcon color={colors.icon} size="28" />
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
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
        color: colors.text
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

const mapStateToProps = (state) => {
    return {
        ip: state.mainReducer.ip,
        port: state.mainReducer.port,
        syncEnabled: state.tempReducer.syncEnabled,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMpcHcInfo: (value) => dispatch(setMpcHcInfo(value)),
        setSyncEnabled: (value) => dispatch(setSyncEnabled(value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);