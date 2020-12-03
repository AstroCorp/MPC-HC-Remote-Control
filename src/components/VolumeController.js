import React from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { sendCommand } from '../store/actions';
import { volumeUp, volumeDown, volumeCustom } from '../utils/commands';
import { VolumeDownIcon, VolumeUpIcon } from '../assets/icons';
import colors from '../utils/colors';

const VolumeController = (props) => {
    const customLabel = (ev) => {
        if (!ev.oneMarkerPressed) {
            return null;
        }

        return (
            <View style={{ position: 'relative', width: '100%' }}>
                <Text style={[ styles.customLabel, { left: ev.oneMarkerLeftPosition - 20 }]}>
                    { ev.oneMarkerValue }
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.volumePanel}>
            <TouchableNativeFeedback onPress={() => props.sendCommand(
                { ip: props.ip, port: props.port },
                { code: volumeDown }
            )}>
                <View style={styles.volumeButton}>
                    <VolumeDownIcon color={colors.icon} size="28" />
                </View>
            </TouchableNativeFeedback>

            <View style={{ marginHorizontal: 20 }}>
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
                    max={101}
                    step={1}
                    sliderLength={Dimensions.get('window').width - 156}
                    values={[props.mpc_hc_info?.volumeLevel || 0]}
                    onValuesChangeFinish={(value) => props.sendCommand(
                        { ip: props.ip, port: props.port },
                        { code: volumeCustom, param: { name: 'volume', value } }
                    )}
                />
            </View>

            <TouchableNativeFeedback onPress={() => props.sendCommand(
                { ip: props.ip, port: props.port },
                { code: volumeUp }
            )}>
                <View style={styles.volumeButton}>
                    <VolumeUpIcon color={colors.icon} size="28" />
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
        paddingHorizontal: 10,
    },

    volumeButton: {
        backgroundColor: colors.button,
        height: 48,
        width: 48,
        padding: 10,
    },

    customLabel: {
        position: 'absolute',
        width: 40,
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
        mpc_hc_info: state.tempReducer.mpc_hc_info,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendCommand: (ip, port, wm_command) => dispatch(sendCommand(ip, port, wm_command)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VolumeController);