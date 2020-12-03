import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const StatusModal = (props) => (
    <View style={styles.syncView}>
		<View style={styles.syncBox}>
            <Text style={styles.syncText}>{ props.message }</Text>
        </View>
	</View>
);

const styles = StyleSheet.create({
    syncView: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		flex: 1,
		backgroundColor: colors.sync.view,
		justifyContent: 'center',
		alignItems: 'center',
    },
    
    syncBox: {
        backgroundColor: colors.sync.box,
        padding: 20,
        borderRadius: 5,
    },

	syncText: {
		color: colors.text,
	},
});

export default StatusModal;