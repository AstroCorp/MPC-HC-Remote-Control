import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback, Dimensions } from 'react-native';
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
                    <VolumeDownIcon color="#FFFFFF" size="28" />
                </View>
            </TouchableNativeFeedback>

            <View style={{ marginHorizontal: 20 }}>
                <Slider
                    style={styles.slider}
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
                <View style={styles.volumeButton}>
                    <VolumeUpIcon color="#FFFFFF" size="28" />
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
        maxHeight: 50,
    },

    volumeButton: {
        backgroundColor: '#3F3A4A',
        height: 50,
        width: 50,
        padding: 11,
        borderRadius: 50,
    },

    customLabel: {
        position: 'absolute',
        width: 40,
        backgroundColor: '#1CD1FF',
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: -6,
    },

    slider: {
        width: Dimensions.get('window').width - 125, 
        marginTop: 9,
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

export default connect(mapStateToProps, mapDispatchToProps)(VolumeController);