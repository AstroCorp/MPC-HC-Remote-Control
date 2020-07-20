import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Text, Button, TextInput } from 'react-native';
import Header from '../components/Header';
import SafeAreaView from 'react-native-safe-area-view';
import { setIp, setPort } from '../store/actions';

const Settings = (props) => {
    const [ip, onChangeIp] = useState(props.ip);
    const [port, onChangePort] = useState(props.port);

    const submit = () => {
        props.setIp(ip);
        props.setPort(port);

        alert('Updated ip and port'); // Temporal
    };

    return (
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <Header title="Settings" navigation={props.navigation} />

            <TextInput
                onChangeText={text => onChangeIp(text)}
                value={ip} />

            <TextInput
                onChangeText={text => onChangePort(text)}
                value={port} />

            <Button title="Update ip and port" onPress={submit} />
        </SafeAreaView>
    );
}

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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);