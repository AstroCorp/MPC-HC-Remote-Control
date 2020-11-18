import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const StatusModal = (props) => (
    <View style={styles.syncView}>
		<View style={styles.syncBox}>
            <Text style={styles.syncText}>{props.message}</Text>
        </View>
	</View>
);

const styles = StyleSheet.create({
    syncView: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
    },
    
    syncBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        borderRadius: 5,
    },

	syncText: {
		color: '#FFFFFF',
	},
});

export default StatusModal;