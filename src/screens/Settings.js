import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import Header from '../components/Header';
import SafeAreaView from 'react-native-safe-area-view';

const Settings = (props) => {
    return (
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <Header title="Settings" navigation={props.navigation} />
            <Text>Settings</Text>
        </SafeAreaView>
    );
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);