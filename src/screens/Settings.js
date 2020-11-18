import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Text, Button, TextInput } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Header } from '../components';
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
        setMpcHcInfo: (value) => dispatch(setMpcHcInfo(value)),
        setSyncEnabled: (value) => dispatch(setSyncEnabled(value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);