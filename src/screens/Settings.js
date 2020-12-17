import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableNativeFeedback, TextInput, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { Header, MainContent } from '../components';
import Modal from 'react-native-modal';
import { setIp, setPort, setRefreshTime, setMpcHcInfo, setSyncEnabled } from '../store/actions';

const Settings = (props) => {
    const [ isVisible, setIsVisible ] = useState(false);
    const { register, handleSubmit, setValue, errors } = useForm({
        defaultValues: {
            ip: props.ip,
            port: props.port.toString(),
            refreshTime: props.refreshTime.toString(),
        },
        criteriaMode: 'all',
        shouldUnregister: false,
    });

    const submit = (data) => {
        const ip = data.ip;
        const port = parseInt(data.port);
        const refreshTime = parseInt(data.refreshTime);

        props.setMpcHcInfo(null);
        props.setSyncEnabled(false);

        props.setIp(ip);
        props.setPort(port);
        props.setRefreshTime(refreshTime);

        setIsVisible(true);
    };

    return (
        <MainContent>
            <Header title="Settings" navigation={props.navigation} />

            <Modal isVisible={isVisible}>
                <View style={styles.modal}>
                    <Text style={[styles.text, styles.modalText]}>Changes saved!</Text>

                    <TouchableNativeFeedback onPress={() => setIsVisible(false)}>
                        <View style={styles.modalButton}>
                            <Text style={styles.text}>Ok</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </Modal>

            <KeyboardAvoidingView style={styles.cont}>
                <ScrollView bounces={false} style={{flex:1}}>
                    <View style={styles.inputContent}>
                        <Text style={styles.textLabel}>IP</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            onChangeText={text => setValue('ip', text)}
                            ref={register({ name: 'ip' }, { required: true })}
                            defaultValue={props.ip}
                        />

                        {
                            errors.ip && (
                                <View style={styles.errorContent}>
                                    { errors.ip.type === 'required' && <Text style={styles.textError}>IP is required</Text> }
                                </View>
                            )
                        }
                    </View>

                    <View style={styles.inputContent}>
                        <Text style={styles.textLabel}>Port</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            onChangeText={text => setValue('port', text)}
                            ref={register({ name: 'port' }, { required: true, min: 1, max: 65535 })}
                            defaultValue={props.port.toString()}
                        />

                        {
                            errors.port && (
                                <View style={styles.errorContent}>
                                    { errors.port.type === 'required' && <Text style={styles.textError}>Port is required</Text> }
                                    { (errors.port.type === 'min' || errors.refreshTime.type === 'max') && <Text style={styles.textError}>Range valid: 1-65535</Text> }
                                </View>
                            )
                        }
                    </View>

                    <View style={styles.inputContent}>
                        <Text style={styles.textLabel}>Refresh time (ms)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            onChangeText={text => setValue('refreshTime', text)}
                            ref={register({ name: 'refreshTime' }, { required: true, min: 1, max: 10000 })}
                            defaultValue={props.refreshTime.toString()}
                        />

                        {
                            errors.refreshTime && (
                                <View style={styles.errorContent}>
                                    { errors.refreshTime.type === 'required' && <Text style={styles.textError}>Refresh time is required</Text> }
                                    { (errors.refreshTime.type === 'min' || errors.refreshTime.type === 'max') && <Text style={styles.textError}>Range valid: 1-10000</Text> }
                                </View>
                            )
                        }
                    </View>

                    <TouchableNativeFeedback onPress={handleSubmit(submit)}>
                        <View style={styles.button}>
                            <Text style={styles.text}>Update</Text>
                        </View>
                    </TouchableNativeFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </MainContent>
    );
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        paddingHorizontal: 10,
    },

    inputContent: {
        marginBottom: 20,
    },

    textLabel: {
        color: colors.text,
        marginBottom: 5,
    },

    input: {
        backgroundColor: colors.input,
    },

    errorContent: {
        marginTop: 5,
    },

    textError: {
        color: colors.error,
        marginTop: 5,
    },

    button: {
        backgroundColor: colors.button,
        marginVertical: 10,
        padding: 10,
    },

    text: {
        textAlign: 'center',
        color: colors.text,
    },

    modal: {
        backgroundColor: colors.sync.box,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        width: '75%',
        minWidth: 250,
    },

    modalText: {
        marginVertical: 25,
    },

    modalButton: {
        backgroundColor: colors.button,
        padding: 15,
        width: '100%',
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
    }
});

const mapStateToProps = (state) => {
    return {
        ip: state.mainReducer.ip,
        port: state.mainReducer.port,
        refreshTime: state.mainReducer.refreshTime,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIp: (value) => dispatch(setIp(value)),
        setPort: (value) => dispatch(setPort(value)),
        setRefreshTime: (value) => dispatch(setRefreshTime(value)),
        setMpcHcInfo: (value) => dispatch(setMpcHcInfo(value)),
        setSyncEnabled: (value) => dispatch(setSyncEnabled(value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);