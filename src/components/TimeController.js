import React from 'react';
import { Text, View, TouchableNativeFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Slider from '@react-native-community/slider';
import tailwind from 'tailwind-rn';
import { sendCommand } from '../store/actions';
import { msToTime, msToPercent } from '../utils/extras';
import { PlayArrowIcon, PauseIcon, FastForwardIcon, FastRewindIcon, SkipNextIcon, SkipPreviousIcon } from '../assets/icons';
import { timeCustom, togglePlayAndPause, decreaseRate, increaseRate, previous, next } from '../utils/commands';

const TimeController = (props) => {
    return (
        <View style={tailwind('px-2 mb-14')}>
            <View style={tailwind('flex flex-row justify-between')}>
                <Text style={tailwind('text-white')}>{ msToTime(props.mediaPlayerData?.position) }</Text>
                <Text style={tailwind('text-white')}>{ msToTime(props.mediaPlayerData?.duration) }</Text>
            </View>

            <View style={tailwind('flex flex-row justify-center')}>
                <Slider
                    style={{
                        ...tailwind('my-5'),
                        width: Dimensions.get('window').width,
                    }}
                    minimumValue={0}
                    maximumValue={props.mediaPlayerData?.duration || 1}
                    minimumTrackTintColor="#1CD1FF"
                    maximumTrackTintColor="#49464F"
                    thumbTintColor="#1CD1FF"
                    step={1}
                    value={props.mediaPlayerData?.position || 0}
                    onSlidingComplete={(value) => {
                        const percent = msToPercent(props.mediaPlayerData?.duration, value);

                        props.sendCommand(
                            { ip: props.ip, port: props.port },
                            { code: timeCustom, param: { name: 'percent', value: percent } }
                        )
                    }}
                />
            </View>

            <View style={tailwind('flex flex-row justify-center')}>
                <TouchableNativeFeedback onPress={() => props.sendCommand(
                    { ip: props.ip, port: props.port },
                    { code: previous }
                )}>
                    <View style={tailwind('bg-gray-700 h-12 w-12 p-2.5 mx-1 rounded-full')}>
                        <SkipPreviousIcon color="#FFFFFF" size="28" />
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => props.sendCommand(
                    { ip: props.ip, port: props.port },
                    { code: decreaseRate }
                )}>
                    <View style={tailwind('bg-gray-700 h-12 w-12 p-2.5 mx-1 rounded-full')}>
                        <FastRewindIcon color="#FFFFFF" size="28" />
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => props.sendCommand(
                    { ip: props.ip, port: props.port },
                    { code: togglePlayAndPause }
                )}>
                    <View style={tailwind('bg-gray-700 h-12 w-12 p-2.5 mx-1 rounded-full')}>
                        {
                            (props.mediaPlayerData?.state === 1 || props.mediaPlayerData?.state === -1) && (
                                <PlayArrowIcon color="#FFFFFF" size="28" />
                            )
                        }

                        {
                            props.mediaPlayerData?.state === 2 && (
                                <PauseIcon color="#FFFFFF" size="28" />
                            )
                        }
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => props.sendCommand(
                    { ip: props.ip, port: props.port },
                    { code: increaseRate }
                )}>
                    <View style={tailwind('bg-gray-700 h-12 w-12 p-2.5 mx-1 rounded-full')}>
                        <FastForwardIcon color="#FFFFFF" size="28" />
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => props.sendCommand(
                    { ip: props.ip, port: props.port },
                    { code: next }
                )}>
                    <View style={tailwind('bg-gray-700 h-12 w-12 p-2.5 mx-1 rounded-full')}>
                        <SkipNextIcon color="#FFFFFF" size="28" />
                    </View>
                </TouchableNativeFeedback>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeController);