import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Text, Button, ImageBackground, View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import SafeAreaView from 'react-native-safe-area-view';
import axios from "axios";
import { sendCommand } from '../store/actions';
import { volumeUp, volumeDown } from '../utils/commands';
import { getVariables } from '../utils/variables';

const Home = (props) => {
    const [mpcInfo, setMpcInfo] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get('http://' + props.ip + ':' + props.port + "/variables.html").then((res) => {
                setMpcInfo(getVariables(res.data));
            }).catch((err) => {
                setMpcInfo(null);
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={props.ip + ' : ' + props.port} navigation={props.navigation} />
            {/*
            <ImageBackground source={image} style={styles.image}>
                <View>
                    <Text style={styles.text}>file.mp4</Text>
                </View>
            </ImageBackground>*/}

            <Text>{JSON.stringify(mpcInfo)}</Text>

            <Button title="Subir volumen" onPress={() => props.sendCommand(props.ip, props.port, volumeUp)} />
            <Button title="Bajar volumen" onPress={() => props.sendCommand(props.ip, props.port, volumeDown)} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },

    text: {
        color: "#FFFFFF",
        fontSize: 16,
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
        sendCommand: (ip, port, wm_command) => dispatch(sendCommand(ip, port, wm_command)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);