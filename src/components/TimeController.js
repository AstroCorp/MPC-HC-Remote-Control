import React from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { sendCommand } from '../store/actions';
import { msToTime, msToPercent } from '../utils/extras';
import { PlayArrowIcon, PauseIcon } from '../assets/icons';
import { timeCustom, togglePlayAndPause } from '../utils/commands';

const TimeController = (props) => {
    const customLabel = (ev) => {
        if (!ev.oneMarkerPressed) {
            return null;
        }

        return (
            <View style={{ position: 'relative', width: '100%' }}>
                <Text style={[ styles.customLabel, { left: ev.oneMarkerLeftPosition - 20 }]}>
                    {msToTime(ev.oneMarkerValue)}
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.timePanel}>
            <View style={styles.times}>
                <Text>{msToTime(props.mpc_hc_info?.position)}</Text>
                <Text>{msToTime(props.mpc_hc_info?.duration)}</Text>
            </View>

            <MultiSlider
                selectedStyle={{
                    backgroundColor: '#346998',
                }}
                unselectedStyle={{
                    backgroundColor: '#AAAAAA',
                }}
                containerStyle={{
                    height: 50,
                }}
                markerStyle={{
                    backgroundColor: '#346998',
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
                                <PlayArrowIcon color="#000000" size="28" />
                            )
                        }

                        {
                            props.mpc_hc_info?.state === 2 && (
                                <PauseIcon color="#000000" size="28" />
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

    timeButton: {
        backgroundColor: 'red',
        height: 48,
        width: 48,
        padding: 10,
    },

    customLabel: {
        position: 'absolute',
        width: 70,
        backgroundColor: 'red',
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