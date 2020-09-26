import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Text, Button, ImageBackground, View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import SafeAreaView from 'react-native-safe-area-view';
import { WebView } from 'react-native-webview';
import axios from "axios";
import { sendCommand } from '../store/actions';
import { volumeUp, volumeDown } from '../utils/commands';
import { getVariables } from '../utils/variables';

const Home = (props) => {
    const webview = useRef(null);
    const [mpcInfo, setMpcInfo] = useState(null);
    const INJECTED_JAVASCRIPT =  `
        window.check = setInterval(() => {
            if(document.querySelector(".page-variables") !== null) {
                window.ReactNativeWebView.postMessage(document.querySelector(".page-variables").innerHTML);
                clearInterval(window.check);
            }
        }, 250);
    `;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView 
                ref={webview}
                containerStyle={{ display: 'none' }}
                source={{ 
                    uri: 'http://' + props.ip + ':' + props.port + '/variables.html'
                }}
                javaScriptEnabled={true}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                onMessage={event => {
                    setMpcInfo(getVariables(event.nativeEvent.data));
                    webview.current.reload();
                }}
                onError={() => {
                    webview.current.reload();
                }}
            />

            <Header title={props.ip + ' : ' + props.port} navigation={props.navigation} />
            {/*
            <ImageBackground source={image} style={styles.image}>
                <View>
                    <Text style={styles.text}>file.mp4</Text>
                </View>
            </ImageBackground>
            */}

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