import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const InfoPanel = (props) => (
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
);

const styles = StyleSheet.create({
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
        mpc_hc_info: state.tempReducer.mpc_hc_info,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        //
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel);