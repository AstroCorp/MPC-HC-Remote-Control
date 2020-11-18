import React, { useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import { WebView } from 'react-native-webview';
import { Header, VolumeController } from '../components';
import { setMpcHcInfo } from '../store/actions';
import { getVariables } from '../utils/variables';

const Home = (props) => {
    const webview = useRef(null);

    // Para enviar el contenido del webview a react native
    const INJECTED_JAVASCRIPT =  `
        window.check = setInterval(() => {
            if(document.querySelector(".page-variables") !== null) {
                window.ReactNativeWebView.postMessage(document.querySelector(".page-variables").innerHTML);
                clearInterval(window.check);
            }
        }, 50);
    `;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                props.sync_enabled && (
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
                            props.setMpcHcInfo(getVariables(event.nativeEvent.data));
                            
                            // Recargamos para obtener nuevos datos
                            if(webview.current !== null && props.sync_enabled) {
                                webview.current.reload();
                            }
                        }}
                        onLoadEnd={(syntheticEvent) => {
                            const { nativeEvent } = syntheticEvent;
                            
                            // Si ocurre un error al cargar eliminamos los datos
                            if(nativeEvent.description === "net::ERR_CONNECTION_REFUSED" || !nativeEvent.title.length) {
                                props.setMpcHcInfo(null);
                            }

                            // Volvemos a intentar cargar los datos
                            setTimeout(() => {
                                if(webview.current !== null && props.sync_enabled) {
                                    webview.current.reload();
                                }
                            }, 50);
                        }}
                    />
                )
            }

            <Header navigation={props.navigation} />

            <View style={styles.content}>
                <View style={styles.infoPanel}>
                {
                    props.mpc_hc_info && (
                        <View style={styles.infoPanelContent}>
                            <Text style={styles.textBold}>{ props.mpc_hc_info.file }</Text>
                            <Text style={styles.text}>Vol - { props.mpc_hc_info.volumeLevel }%</Text>
                        </View>
                    )
                }
                </View>

                <VolumeController />

                {!props.mpc_hc_info && props.sync_enabled && (
				<View style={styles.syncView}>
			    		<View style={styles.syncBox}>
                            <Text style={styles.syncText}>Sincronizando con MPC-HC...</Text>
                        </View>
			    	</View>
			    )}

                {!props.sync_enabled && (
				<View style={styles.syncView}>
			    		<View style={styles.syncBox}>
                            <Text style={styles.syncText}>Sincronización desactivada</Text>
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
        mpc_hc_info: state.tempReducer.mpc_hc_info,
        sync_enabled: state.tempReducer.sync_enabled,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMpcHcInfo: (value) => dispatch(setMpcHcInfo(value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);