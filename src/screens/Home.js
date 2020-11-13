import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import Slider from '@react-native-community/slider';
import { WebView } from 'react-native-webview';
import Header from '../components/Header';
import { sendCommand } from '../store/actions';
import { getVariables } from '../utils/variables';
import { volumeUp, volumeDown, volumeCustom } from '../utils/commands';
import { VolumeDownIcon, VolumeUpIcon } from '../assets/icons';

const Home = (props) => {
    const webview = useRef(null);
    const [mpcInfo, setMpcInfo] = useState(null);

    // Para enviar el contenido del webview a react native
    const INJECTED_JAVASCRIPT =  `
        window.check = setInterval(() => {
            if(document.querySelector(".page-variables") !== null) {
                window.ReactNativeWebView.postMessage(document.querySelector(".page-variables").innerHTML);
                clearInterval(window.check);
            }
        }, 100);
    `;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                key={props.ip + ':' + props.port}
                ref={webview}
                containerStyle={{ display: 'none' }}
                source={{ 
                    uri: 'http://' + props.ip + ':' + props.port + '/variables.html'
                }}
                androidLayerType={'software'}
                javaScriptEnabled={true}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                onMessage={event => {
                    // Recibimos el contenido del webview
                    setMpcInfo(getVariables(event.nativeEvent.data));
                    webview.current.reload();
                }}
                onLoadEnd={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;

                    // Si ocurre un error al cargar eliminamos los datos
                    if(nativeEvent.description === "net::ERR_CONNECTION_REFUSED" || !nativeEvent.title.length) {
                        setMpcInfo(null);
                    }
                    
                    // Volvemos a intentar cargar
                    setTimeout(() => {
                        webview.current.reload();
                    }, 100);
                }}
            />

            <Header title={props.ip + ':' + props.port} navigation={props.navigation} />

            <View style={styles.content}>
                <View style={styles.infoPanel}>
                {
                    mpcInfo && (
                        <View style={styles.infoPanelContent}>
                            <Text style={styles.textBold}>{ mpcInfo.file }</Text>
                            <Text style={styles.text}>Vol - { mpcInfo.volumeLevel }%</Text>
                        </View>
                    )
                }
                </View>

                <View style={styles.volumePanel}>
                    <TouchableNativeFeedback onPress={() => props.sendCommand(
                        { ip: props.ip, port: props.port}, 
                        { code: volumeDown }
                    )}>
                        <View style={styles.volumeButton}>
                            <VolumeDownIcon color="#000000" size="28" />
                        </View>
                    </TouchableNativeFeedback>

                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        value={mpcInfo?.volumeLevel || 0}
                        thumbTintColor="#346998"
                        minimumTrackTintColor="#346998"
                        maximumTrackTintColor="#000000"
                        onSlidingComplete={(value) => props.sendCommand(
                            { ip: props.ip, port: props.port}, 
                            { code: volumeCustom, param: { name: 'volume', value } }
                        )}
                    />

                    <TouchableNativeFeedback onPress={() => props.sendCommand(
                        { ip: props.ip, port: props.port}, 
                        { code: volumeUp }
                    )}>
                        <View style={styles.volumeButton}>
                            <VolumeUpIcon color="#000000" size="28" />
                        </View>
                    </TouchableNativeFeedback>
                </View>

                {!mpcInfo && (
				<View style={styles.syncView}>
			    		<View style={styles.syncBox}>
                            <Text style={styles.syncText}>Sincronizando con MPC-HC...</Text>
                        </View>
			    	</View>
			    )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },

    infoPanel: {
        height: '30%',
        backgroundColor: 'red',
        justifyContent: 'flex-end'
    },

    infoPanelContent: {
        alignSelf: 'center',
        marginBottom: 15,
    },

    text: {
        color: "#FFFFFF",
        fontSize: 12,
        textAlign: 'center',
    },

    textBold: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    volumePanel: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },

    volumeButton: {
        backgroundColor: 'red',
        height: 48,
        padding: 10,
    },

    slider: {
        marginTop: 10,
        height: 30,
        width: Dimensions.get('window').width - 136,
    },

    syncView: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
    },
    
    syncBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        borderRadius: 5,
    },

	syncText: {
		color: '#FFFFFF',
	},
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