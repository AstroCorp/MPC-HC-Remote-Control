import React from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Slider from '@react-native-community/slider';
import { sendCommand } from '../store/actions';
import { msToTime, msToPercent } from '../utils/extras';
import { PlayArrowIcon, PauseIcon, FastForwardIcon, FastRewindIcon, SkipNextIcon, SkipPreviousIcon } from '../assets/icons';
import { timeCustom, togglePlayAndPause, decreaseRate, increaseRate, previous, next } from '../utils/commands';

const TimeController = (props) => {
    return (
        <View style={styles.timePanel}>
            <View style={styles.times}>
                <Text style={styles.timeText}>{ msToTime(props.mediaPlayerData?.position) }</Text>
                <Text style={styles.timeText}>{ msToTime(props.mediaPlayerData?.duration) }</Text>
            </View>

            <View style={styles.centerCont}>
                <Slider
                    style={styles.slider}
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

            <View style={styles.centerCont}>
                <TouchableNativeFeedback onPress={() => props.sendCommand(
                    { ip: props.ip, port: props.port },
                    { code: previous }
                )}>
                    <View style={styles.timeButton}>
                        <SkipPreviousIcon color="#FFFFFF" size="28" />
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => props.sendCommand(
                    { ip: props.ip, port: props.port },
                    { code: decreaseRate }
                )}>
                    <View style={styles.timeButton}>
                        <FastRewindIcon color="#FFFFFF" size="28" />
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => props.sendCommand(
                    { ip: props.ip, port: props.port },
                    { code: togglePlayAndPause }
                )}>
                    <View style={styles.timeButton}>
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
                    <View style={styles.timeButton}>
                        <FastForwardIcon color="#FFFFFF" size="28" />
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => props.sendCommand(
                    { ip: props.ip, port: props.port },
                    { code: next }
                )}>
                    <View style={styles.timeButton}>
                        <SkipNextIcon color="#FFFFFF" size="28" />
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    timePanel: {
        flex: 1,
        paddingHorizontal: 10,
        maxHeight: 119,
        marginBottom: 50,
    },

    times : {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    timeText: {
        color: '#FFFFFF',
    },

    centerCont: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    timeButton: {
        backgroundColor: '#3F3A4A',
        height: 50,
        width: 50,
        padding: 11,
        marginHorizontal: 10,
        borderRadius: 50,
    },

    slider: {
        width: Dimensions.get('window').width, 
        marginVertical: 5,
    }
});

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