import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import { Header, MediaInfoController, InfoPanel, VolumeController, StatusModal } from '../components';

const Home = (props) => (
    <SafeAreaView style={{ flex: 1 }}>
        <MediaInfoController />

        <Header navigation={props.navigation} />

        <View style={{ flex: 1 }}>
            <InfoPanel />

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