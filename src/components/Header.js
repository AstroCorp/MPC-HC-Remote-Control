import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import { BackArrowIcon, SettingsIcon, EnableSyncIcon, DisableSyncIcon } from '../assets/icons';
import { setMpcHcInfo, setSyncEnabled } from '../store/actions';

const Header = (props) => {
    const title = props.title || props.ip + ':' + props.port;

    const toggleSync = () => {
        props.setSyncEnabled(!props.syncEnabled);
        props.setMpcHcInfo(null);
    }

    return (
        <View style={tailwind('h-14')}>
            <View style={tailwind('px-3 flex-1 flex-row items-center')}>
                {props.title === 'Settings' && (
                    <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
                        <View style={tailwind('p-1')}>
                            <BackArrowIcon color="#FFFFFF" size="28" />
                        </View>
                    </TouchableWithoutFeedback>
                )}
    
                <Text style={tailwind('-mt-0.5 text-white text-lg' + (props.title === 'Settings' ? ' ml-3' : ''))}>
                    { title }
                </Text>
    
                {props.title !== 'Settings' && (
                    <View style={tailwind('flex-1 flex-row-reverse justify-start')}>
                        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Settings')}>
                            <View style={tailwind('p-1')}>
                                <SettingsIcon color="#FFFFFF" size="28" />
                            </View>
                        </TouchableWithoutFeedback>
    
                        <TouchableWithoutFeedback onPress={toggleSync}>
                            <View style={tailwind('p-1 mr-1')}>
                                {
                                    props.syncEnabled 
                                    ? 
                                        <EnableSyncIcon color="#FFFFFF" size="28" />
                                    :
                                        <DisableSyncIcon color="#FFFFFF" size="28" />
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )}
            </View>
        </View>
    );
};

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