import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Header, MediaInfoController, InfoPanel, VolumeController, TimeController, StatusModal, MainContent } from '../components';

const Home = (props) => (
    <MainContent>
        <MediaInfoController />

        <Header navigation={props.navigation} />

        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, display: props.mpc_hc_info ? 'flex' : 'none' }}>
                <InfoPanel />

                <TimeController />

                <VolumeController />
            </View>
            
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
    </MainContent>
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