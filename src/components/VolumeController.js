import React from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Slider from '@react-native-community/slider';
import { sendCommand } from '../store/actions';
import { volumeUp, volumeDown, volumeCustom } from '../utils/commands';
import { VolumeDownIcon, VolumeUpIcon } from '../assets/icons';

const VolumeController = (props) => {
    return (
        <View style={styles.volumePanel}>
            <TouchableNativeFeedback onPress={() => props.sendCommand(
                { ip: props.ip, port: props.port },
                { code: volumeDown }
            )}>
                <View style={styles.volumeButton}>
                    <VolumeDownIcon color="#000000" size="28" />
                </View>
            </TouchableNativeFeedback>

            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={props.mpc_hc_info?.volumeLevel || 0}
                thumbTintColor="#346998"
                minimumTrackTintColor="#346998"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(value) => props.sendCommand(
                    { ip: props.ip, port: props.port },
                    { code: volumeCustom, param: { name: 'volume', value } }
                )}
            />

            <TouchableNativeFeedback onPress={() => props.sendCommand(
                { ip: props.ip, port: props.port },
                { code: volumeUp }
            )}>
                <View style={styles.volumeButton}>
                    <VolumeUpIcon color="#000000" size="28" />
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    volumePanel: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },

    volumeButton: {
        backgroundColor: 'red',
        height: 48,
        padding: 10,
    },

    slider: {
        marginTop: 10,
        height: 30,
        width: Dimensions.get('window').width - 136,
    },
});

const mapStateToProps = (state) => {
    return {
        ip: state.mainReducer.ip,
        port: state.mainReducer.port,
        mpc_hc_info: state.tempReducer.mpc_hc_info,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendCommand: (ip, port, wm_command) => dispatch(sendCommand(ip, port, wm_command)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VolumeController);