import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const InfoPanel = (props) => (
    <LinearGradient colors={['#1D1925', '#000000']} style={styles.infoPanel}>
    {
        props.mediaPlayerData && (
            <View style={styles.infoPanelContent}>
                <Text style={styles.textBold}>{ props.mediaPlayerData?.file }</Text>
                <Text style={styles.text}>Vol - { props.mediaPlayerData?.volumeLevel }%</Text>
            </View>
        )
    }
    </LinearGradient>
);

const styles = StyleSheet.create({
    infoPanel: {
        height: '30%',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },

    infoPanelContent: {
        alignSelf: 'center',
        marginBottom: 15,
    },

    text: {
        color: '#FFFFFF',
        fontSize: 12,
        textAlign: 'center',
    },

    textBold: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

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