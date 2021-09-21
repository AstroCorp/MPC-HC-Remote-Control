import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableNativeFeedback, TouchableOpacity, TextInput } from 'react-native';
import { Header, MainContent } from '../components';
import Modal from 'react-native-modal';
import tailwind from 'tailwind-rn';
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
                <View style={tailwind('bg-black bg-opacity-50 rounded-t justify-center items-center self-center w-3/4')}>
                    <Text style={tailwind('text-center text-white my-3')}>Changes saved!</Text>

                    <TouchableNativeFeedback onPress={() => setIsVisible(false)}>
                        <View style={tailwind('bg-gray-600 p-3 w-full rounded-b')}>
                            <Text style={tailwind('text-center text-white')}>Ok</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </Modal>

            <KeyboardAvoidingView style={tailwind('flex-1 px-3')}>
                <ScrollView bounces={false} style={tailwind('flex-1')}>
                    <View style={tailwind('mb-5')}>
                        <Text style={tailwind('text-white mb-2')}>IP</Text>
                        <TextInput
                            style={tailwind('bg-gray-500')}
                            keyboardType='numeric'
                            onChangeText={text => updateFormValue('ip', text)}
                            defaultValue={props.ip}
                        />

                        {
                            formErrors.ip && (
                                <View style={tailwind('mt-1')}>
                                    { formErrors.ip.includes('required') && <Text style={tailwind('text-red-500 mt-1')}>IP is required</Text> }
                                    { formErrors.ip.includes('isValidIp') && <Text style={tailwind('text-red-500 mt-1')}>IP is not valid</Text> }
                                </View>
                            )
                        }
                    </View>

                    <View style={tailwind('mb-5')}>
                        <Text style={tailwind('text-white mb-2')}>Port</Text>
                        <TextInput
                            style={tailwind('bg-gray-500')}
                            keyboardType='numeric'
                            onChangeText={text => updateFormValue('port', text)}
                            defaultValue={props.port.toString()}
                        />
                        {
                            formErrors.port && (
                                <View style={tailwind('mt-1')}>
                                    { formErrors.port.includes('required') && <Text style={tailwind('text-red-500 mt-1')}>Port is required</Text> }
                                    { (formErrors.port.includes('min') || formErrors.port.includes('max')) && <Text style={tailwind('text-red-500 mt-1')}>Range valid: 1-65535</Text> }
                                </View>
                            )
                        }
                    </View>

                    <View style={tailwind('mb-5')}>
                        <Text style={tailwind('text-white mb-2')}>Refresh time (ms)</Text>
                        <TextInput
                            style={tailwind('bg-gray-500')}
                            keyboardType='numeric'
                            onChangeText={text => updateFormValue('refreshTime', text)}
                            defaultValue={props.refreshTime.toString()}
                        />

                        {
                            formErrors.refreshTime && (
                                <View style={tailwind('mt-1')}>
                                    { formErrors.refreshTime.includes('required') && <Text style={tailwind('text-red-500 mt-1')}>Refresh time is required</Text> }
                                    { (formErrors.refreshTime.includes('min') || formErrors.refreshTime.includes('max')) && <Text style={tailwind('text-red-500 mt-1')}>Range valid: 1-5000</Text> }
                                </View>
                            )
                        }
                    </View>

                    <TouchableNativeFeedback disabled={Object.keys(formErrors).length} onPress={submit}>
                        <View style={tailwind('bg-gray-700 my-2 p-2.5')}>
                            <Text style={tailwind('text-center text-white')}>Update</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableOpacity onPress={() => props.navigation.push('Tutorial')}>
                        <View style={tailwind('my-2 p-1')}>
                            <Text style={tailwind('text-center text-white text-sm underline')}>How to enable remote control in MPC-HC</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </MainContent>
    );
}

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
