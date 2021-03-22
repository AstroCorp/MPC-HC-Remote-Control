import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const StatusModal = (props) => (
    <View style={[styles.syncView, props.message && styles.syncViewBackground]}>
		{
			props.message && (
				<View style={styles.syncBox}>
            		<Text style={styles.syncText}>{ props.message }</Text>
        		</View>
			)
		}
	</View>
);

const styles = StyleSheet.create({
    syncView: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	
	syncViewBackground: {
		backgroundColor: '#00000080',
	},
    
    syncBox: {
        backgroundColor: '#000000CC',
        padding: 20,
        borderRadius: 5,
    },

	syncText: {
		color: '#FFFFFF',
	},
});

export default StatusModal;