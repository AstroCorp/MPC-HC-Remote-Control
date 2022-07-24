import React from 'react';
import { View, TouchableNativeFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Slider from '@react-native-community/slider';
import tailwind from '../utils/tailwind';
import { sendCommand } from '../store/actions';
import { volumeUp, volumeDown, volumeCustom } from '../utils/commands';
import { VolumeDownIcon, VolumeUpIcon } from '../assets/icons';

const VolumeController = (props) => {
    return (
        <View style={tailwind('flex flex-row justify-around px-2')}>
            <TouchableNativeFeedback onPress={() => props.sendCommand(
                { ip: props.ip, port: props.port },
                { code: volumeDown }
            )}>
                <View style={tailwind('bg-gray-700 h-12 w-12 p-2.5 mx-1 rounded-full')}>
                    <VolumeDownIcon color="#FFFFFF" size="28" />
                </View>
            </TouchableNativeFeedback>

            <View style={tailwind('mx-3')}>
                <Slider
                    style={{
                        ...tailwind('mt-3.5'),
                        width: Dimensions.get('window').width - 125,
                    }}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor="#1CD1FF"
                    maximumTrackTintColor="#49464F"
                    thumbTintColor="#1CD1FF"
                    step={1}
                    value={props.mediaPlayerData?.volumeLevel || 0}
                    onSlidingComplete={(value) => props.sendCommand(
                        { ip: props.ip, port: props.port },
                        { code: volumeCustom, param: { name: 'volume', value } }
                    )}
                />
            </View>

            <TouchableNativeFeedback onPress={() => props.sendCommand(
                { ip: props.ip, port: props.port },
                { code: volumeUp }
            )}>
                <View style={tailwind('bg-gray-700 h-12 w-12 p-2.5 mx-1 rounded-full')}>
                    <VolumeUpIcon color="#FFFFFF" size="28" />
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        ip: state.mainReducer.ip,
        port: state.mainReducer.port,
        mediaPlayerData: state.tempReducer.mediaPlayerData,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendCommand: (ip, port, wm_command) => dispatch(sendCommand(ip, port, wm_command)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VolumeController);