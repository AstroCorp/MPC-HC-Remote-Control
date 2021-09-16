import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import tailwind from 'tailwind-rn';

const InfoPanel = (props) => (
    <LinearGradient colors={['#1D1925', '#111827']} style={tailwind('h-1/4 justify-end mb-4')}>
    {
        props.mediaPlayerData && (
            <View style={tailwind('self-center mb-3')}>
                <Text style={tailwind('text-white text-base font-bold text-center')}>{ props.mediaPlayerData?.file }</Text>
                <Text style={tailwind('text-white text-sm text-center')}>Vol - { props.mediaPlayerData?.volumeLevel }%</Text>
            </View>
        )
    }
    </LinearGradient>
);

const mapStateToProps = (state) => {
    return {
        mediaPlayerData: state.tempReducer.mediaPlayerData,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        //
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel);