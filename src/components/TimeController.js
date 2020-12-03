import React from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { sendCommand } from '../store/actions';
import { msToTime, msToPercent } from '../utils/extras';
import { PlayArrowIcon, PauseIcon } from '../assets/icons';
import { timeCustom, togglePlayAndPause } from '../utils/commands';
import colors from '../utils/colors';

const TimeController = (props) => {
    const customLabel = (ev) => {
        if (!ev.oneMarkerPressed) {
            return null;
        }

        return (
            <View style={{ position: 'relative', width: '100%' }}>
                <Text style={[ styles.customLabel, { left: ev.oneMarkerLeftPosition - 20 }]}>
                    { msToTime(ev.oneMarkerValue) }
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.timePanel}>
            <View style={styles.times}>
                <Text style={styles.timeText}>{ msToTime(props.mpc_hc_info?.position) }</Text>
                <Text style={styles.timeText}>{ msToTime(props.mpc_hc_info?.duration) }</Text>
            </View>

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
                max={props.mpc_hc_info?.duration}
                step={1}
                sliderLength={Dimensions.get('window').width - 20}
                values={[props.mpc_hc_info?.position || 0]}
                onValuesChangeFinish={(value) => {
                    const percent = msToPercent(props.mpc_hc_info?.duration, value);
                    
                    props.sendCommand(
                        { ip: props.ip, port: props.port },
                        { code: timeCustom, param: { name: 'percent', value: percent } }
                    )
                }}
            />

            <View style={styles.controls}>
                <TouchableNativeFeedback onPress={() => props.sendCommand(
                    { ip: props.ip, port: props.port },
                    { code: togglePlayAndPause }
                )}>
                    <View style={styles.timeButton}>
                        {
                            props.mpc_hc_info?.state === 1 && (
                                <PlayArrowIcon color={colors.icon} size="28" />
                            )
                        }

                        {
                            props.mpc_hc_info?.state === 2 && (
                                <PauseIcon color={colors.icon} size="28" />
                            )
                        }
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

    timeButton: {
        backgroundColor: colors.button,
        height: 48,
        width: 48,
        padding: 10,
    },

    customLabel: {
        position: 'absolute',
        width: 70,
        backgroundColor: colors.slider.label.bg,
        color: colors.slider.label.text,
        textAlign: 'center',
        marginTop: -6,
    },

    controls: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeController);