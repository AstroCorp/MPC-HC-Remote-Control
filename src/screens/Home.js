import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Header, MediaInfoController, InfoPanel, VolumeController, TimeController, StatusModal, MainContent } from '../components';

const Home = (props) => (
    <MainContent>
        <MediaInfoController />

        <Header navigation={props.navigation} />

        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, display: props.syncEnabled && props.mediaPlayerData ? 'flex' : 'none' }}>
                <InfoPanel />

                <TimeController />

                <VolumeController />
            </View>
            
            {
                !props.mediaPlayerData && props.syncEnabled && (
                    <StatusModal message='Synchronizing with MPC-HC...' />
		        )
            }

            {
                !props.syncEnabled && (
                    <StatusModal message='Synchronization disabled' />
		        )
            }
        </View>

        {
            (props.mediaPlayerData && props.mediaPlayerData?.state === -1) && (
                <StatusModal />
            )
        }
    </MainContent>
);

const mapStateToProps = (state) => {
    return {
        ip: state.mainReducer.ip,
        port: state.mainReducer.port,
        mediaPlayerData: state.tempReducer.mediaPlayerData,
        syncEnabled: state.tempReducer.syncEnabled,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        //
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);