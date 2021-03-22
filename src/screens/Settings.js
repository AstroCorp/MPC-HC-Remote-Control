import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableNativeFeedback, TextInput, StyleSheet } from 'react-native';
import { Header, MainContent } from '../components';
import Modal from 'react-native-modal';
import validateForm from '../utils/validation';
import { setIp, setPort, setRefreshTime, setMpcHcInfo, setSyncEnabled } from '../store/actions';

const Settings = (props) => {
    const [ isVisible, setIsVisible ] = useState(false);
    const [ formErrors, setFormErrors ] = useState({});
    const [ formData, setFormData ] = useState({
        ip: {
            value: props.ip,
            rules: [{ required: true }, { isValidIp: true }],
        },
        port: {
            value: props.port,
            rules: [{ required: true }, { min: 1 }, { max: 65535 }],
        },
        refreshTime: {
            value: props.refreshTime,
            rules: [{ required: true }, { min: 1 }, { max: 5000 }],
        },
    });

    useEffect(() => {
        setFormErrors(validateForm(formData));
    }, [formData]);

    const updateFormValue = (inputName, value) => {
        setFormData({
            ...formData,
            [inputName]: {
                ...formData[inputName],
                value,
            },
        });
    };

    const submit = () => {
        if (Object.keys(formErrors).length) {
            return;
        }
        
        props.setMpcHcInfo(null);
        props.setSyncEnabled(false);

        props.setIp(formData.ip.value);
        props.setPort(formData.port.value);
        props.setRefreshTime(formData.refreshTime.value);

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
                            onChangeText={text => updateFormValue('ip', text)}
                            defaultValue={props.ip}
                        />

                        {
                            formErrors.ip && (
                                <View style={styles.errorContent}>
                                    { formErrors.ip.includes('required') && <Text style={styles.textError}>IP is required</Text> }
                                    { formErrors.ip.includes('isValidIp') && <Text style={styles.textError}>IP is not valid</Text> }
                                </View>
                            )
                        }
                    </View>

                    <View style={styles.inputContent}>
                        <Text style={styles.textLabel}>Port</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            onChangeText={text => updateFormValue('port', text)}
                            defaultValue={props.port.toString()}
                        />
                        {
                            formErrors.port && (
                                <View style={styles.errorContent}>
                                    { formErrors.port.includes('required') && <Text style={styles.textError}>Port is required</Text> }
                                    { (formErrors.port.includes('min') || formErrors.port.includes('max')) && <Text style={styles.textError}>Range valid: 1-65535</Text> }
                                </View>
                            )
                        }
                    </View>

                    <View style={styles.inputContent}>
                        <Text style={styles.textLabel}>Refresh time (ms)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            onChangeText={text => updateFormValue('refreshTime', text)}
                            defaultValue={props.refreshTime.toString()}
                        />

                        {
                            formErrors.refreshTime && (
                                <View style={styles.errorContent}>
                                    { formErrors.refreshTime.includes('required') && <Text style={styles.textError}>Refresh time is required</Text> }
                                    { (formErrors.refreshTime.includes('min') || formErrors.refreshTime.includes('max')) && <Text style={styles.textError}>Range valid: 1-5000</Text> }
                                </View>
                            )
                        }
                    </View>

                    <TouchableNativeFeedback disabled={Object.keys(formErrors).length} onPress={submit}>
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
        color: '#FFFFFF',
        marginBottom: 5,
    },

    input: {
        backgroundColor: '#49464F',
    },

    errorContent: {
        marginTop: 5,
    },

    textError: {
        color: '#FF0000',
        marginTop: 5,
    },

    button: {
        backgroundColor: '#3F3A4A',
        marginVertical: 10,
        padding: 10,
    },

    text: {
        textAlign: 'center',
        color: '#FFFFFF',
    },

    modal: {
        backgroundColor: '#000000CC',
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
        backgroundColor: '#3F3A4A',
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