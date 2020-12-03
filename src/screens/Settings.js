import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableNativeFeedback, TextInput, StyleSheet } from 'react-native';
import { Header, MainContent } from '../components';
import { setIp, setPort, setMpcHcInfo, setSyncEnabled } from '../store/actions';

const Settings = (props) => {
    const [ ip, onChangeIp ] = useState(props.ip);
    const [ port, onChangePort ] = useState(props.port);

    const submit = () => {
        if(props.ip !== ip || props.port !== port)
        {
            props.setMpcHcInfo(null);
            props.setSyncEnabled(false);

            props.setIp(ip);
            props.setPort(port);
            
            alert('Updated ip and port'); // Temporal
        }
    };

    return (
        <MainContent>
            <Header title="Settings" navigation={props.navigation} />

            <View style={styles.cont}>
                <View>
                    <Text style={styles.text}>IP</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => onChangeIp(text)}
                        value={ip} />
                </View>

                <View>
                    <Text style={styles.text}>Port</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => onChangePort(text)}
                        value={port} />
                </View>

                <TouchableNativeFeedback onPress={submit}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Update</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </MainContent>
    );
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        paddingHorizontal: 10,
    },

    text: {
        color: colors.text,
        marginBottom: 5,
    },

    input: {
        backgroundColor: colors.input,
        marginBottom: 20,
    },

    button: {
        backgroundColor: colors.button,
        marginTop: 10,
        padding: 10,
    },

    buttonText: {
        textAlign: 'center',
        color: colors.text,
    }
});

const mapStateToProps = (state) => {
    return {
        ip: state.mainReducer.ip,
        port: state.mainReducer.port,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIp: (value) => dispatch(setIp(value)),
        setPort: (value) => dispatch(setPort(value)),
        setMpcHcInfo: (value) => dispatch(setMpcHcInfo(value)),
        setSyncEnabled: (value) => dispatch(setSyncEnabled(value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);