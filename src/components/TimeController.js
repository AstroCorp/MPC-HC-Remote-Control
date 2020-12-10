import React from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { sendCommand } from '../store/actions';
import { msToTime, msToPercent } from '../utils/extras';
import { PlayArrowIcon, PauseIcon, FastForwardIcon, FastRewindIcon, SkipNextIcon, SkipPreviousIcon } from '../assets/icons';
import { timeCustom, togglePlayAndPause, decreaseRate, increaseRate, previous, next } from '../utils/commands';
import colors from '../utils/colors';

const TimeController = (props) => {
    const customLabel = (ev) => {
        if (!ev.oneMarkerPressed) {
            return null;
        }

        // Para evitar que el label salga de la pantalla
        const position = ev.oneMarkerLeftPosition - 35;
        const realPosition = position - 10;
        const maxPosition = Dimensions.get('window').width - 90;

        let left = realPosition < 0 ? 0 : position;
        left = left > maxPosition ? maxPosition : left;

        return (
            <View style={{ position: 'relative', width: '100%' }}>
                <Text style={[ styles.customLabel, { left }]}>
                    { msToTime(ev.oneMarkerValue) }
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.timePanel}>
            <View style={styles.times}>
                <Text style={styles.timeText}>{ msToTime(props.mediaPlayerData?.position) }</Text>
                <Text style={styles.timeText}>{ msToTime(props.mediaPlayerData?.duration) }</Text>
            </View>

            <View style={styles.centerCont}>
                <MultiSlider
                    selectedStyle={{
                        backgroundColor: colors.slider.button,
                    }}
                    unselectedStyle={{
                        backgroundColor: colors.slider.bg,
                    }}
                    containerStyle={{
                        height: 50,
                    }}
                    markerStyle={{
                        backgroundColor: colors.slider.button,
                        marginTop: 2,
                    }}
                    enableLabel
                    customLabel={customLabel}
                    min={0}
                    max={props.mediaPlayerData?.duration || 1}
                    step={1}
                    sliderLength={Dimensions.get('window').width - 21}
                    values={[props.mediaPlayerData?.position || 0]}
                    onValuesChangeFinish={(value) => {
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
                        <SkipPreviousIcon color={colors.icon} size="28" />
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => props.sendCommand(
                    { ip: props.ip, port: props.port },
                    { code: decreaseRate }
                )}>
                    <View style={styles.timeButton}>
                        <FastRewindIcon color={colors.icon} size="28" />
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => props.sendCommand(
                    { ip: props.ip, port: props.port },
                    { code: togglePlayAndPause }
                )}>
                    <View style={styles.timeButton}>
                        {
                            (props.mediaPlayerData?.state === 1 || props.mediaPlayerData?.state === -1) && (
                                <PlayArrowIcon color={colors.icon} size="28" />
                            )
                        }

                        {
                            props.mediaPlayerData?.state === 2 && (
                                <PauseIcon color={colors.icon} size="28" />
                            )
                        }
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => props.sendCommand(
                    { ip: props.ip, port: props.port },
                    { code: increaseRate }
                )}>
                    <View style={styles.timeButton}>
                        <FastForwardIcon color={colors.icon} size="28" />
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => props.sendCommand(
                    { ip: props.ip, port: props.port },
                    { code: next }
                )}>
                    <View style={styles.timeButton}>
                        <SkipNextIcon color={colors.icon} size="28" />
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
    },

    times : {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    timeText: {
        color: colors.text,
    },

    centerCont: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    timeButton: {
        backgroundColor: colors.button,
        height: 50,
        width: 50,
        padding: 11,
        marginHorizontal: 10,
        borderRadius: 50,
    },

    customLabel: {
        position: 'absolute',
        width: 70,
        backgroundColor: colors.slider.label.bg,
        color: colors.slider.label.text,
        textAlign: 'center',
        marginTop: -6,
    },
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