import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import { setMpcHcInfo } from '../store/actions';
import { getVariables } from '../utils/variables';

const MediaInfoController = (props) => {
    const webview = useRef(null);
    const refresh = 50;

    // Para enviar el contenido del webview a react native
    const INJECTED_JAVASCRIPT = `
        window.check = setInterval(() => {
            if(document.querySelector(".page-variables") !== null) {
                window.ReactNativeWebView.postMessage(document.querySelector(".page-variables").innerHTML);
                clearInterval(window.check);
            }
        }, ${refresh});
    `;

    return (
        props.sync_enabled && (
            <WebView
                key={props.ip + ':' + props.port}
                ref={webview}
                containerStyle={{ display: 'none' }}
                source={{
                    uri: 'http://' + props.ip + ':' + props.port + '/variables.html'
                }}
                androidLayerType={'software'}
                setSupportMultipleWindows={false}
                javaScriptEnabled={true}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                onMessage={event => {
                    // Recibimos el contenido del webview
                    props.setMpcHcInfo(getVariables(event.nativeEvent.data));
                
                    // Recargamos para obtener nuevos datos
                    if (webview.current !== null && props.sync_enabled) {
                        webview.current.reload();
                    }
                }}
                onLoadEnd={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                
                    // Si ocurre un error al cargar eliminamos los datos
                    if (nativeEvent.description === "net::ERR_CONNECTION_REFUSED" || !nativeEvent.title.length) {
                        props.setMpcHcInfo(null);
                    }
                
                    // Volvemos a intentar cargar los datos
                    setTimeout(() => {
                        if (webview.current !== null && props.sync_enabled) {
                            webview.current.reload();
                        }
                    }, refresh);
                }}
            />
        )
    );
}

const mapStateToProps = (state) => {
    return {
        ip: state.mainReducer.ip,
        port: state.mainReducer.port,
        sync_enabled: state.tempReducer.sync_enabled,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMpcHcInfo: (value) => dispatch(setMpcHcInfo(value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaInfoController);