import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../utils/colors';

const InfoPanel = (props) => (
    <LinearGradient colors={colors.gradient} style={styles.infoPanel}>
    {
        props.mpc_hc_info && (
            <View style={styles.infoPanelContent}>
                <Text style={styles.textBold}>{ props.mpc_hc_info.file }</Text>
                <Text style={styles.text}>Vol - { props.mpc_hc_info.volumeLevel }%</Text>
            </View>
        )
    }
    </LinearGradient>
);

const styles = StyleSheet.create({
    infoPanel: {
        height: '30%',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },

    infoPanelContent: {
        alignSelf: 'center',
        marginBottom: 15,
    },

    text: {
        color: colors.text,
        fontSize: 12,
        textAlign: 'center',
    },

    textBold: {
        color: colors.text,
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