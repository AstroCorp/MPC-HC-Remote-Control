import React from 'react';
import { connect } from 'react-redux';
import { Text, Button } from 'react-native';
import Header from '../components/Header';
import SafeAreaView from 'react-native-safe-area-view';
import { sendCommand } from '../store/actions';
import { volumeUp, volumeDown } from '../utils/commands';

const Home = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={props.ip + ' : ' + props.port} navigation={props.navigation} />
            <Text>Home</Text>

            <Button title="Subir volumen" onPress={() => props.sendCommand(props.ip, props.port, volumeUp)} />
            <Button title="Bajar volumen" onPress={() => props.sendCommand(props.ip, props.port, volumeDown)} />
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
        sendCommand: (ip, port, wm_command) => dispatch(sendCommand(ip, port, wm_command)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);