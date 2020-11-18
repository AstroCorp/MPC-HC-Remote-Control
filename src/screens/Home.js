import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import { Header, MediaInfoController, VolumeController, StatusModal } from '../components';

const Home = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MediaInfoController />

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

                {
                    !props.mpc_hc_info && props.sync_enabled && (
                        <StatusModal message='Sincronizando con MPC-HC...' />
			        )
                }

                {
                    !props.sync_enabled && (
                        <StatusModal message='Sincronización desactivada' />
			        )
                }
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
        //
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);