import React from 'react';
import { Text, View } from 'react-native';
import tailwind from '../utils/tailwind';

const StatusModal = (props) => (
	<View style={tailwind('absolute mt-14 w-full h-full flex-1 justify-center items-center')}>
		{
			props.message && (
				<View style={tailwind('bg-black rounded p-5 -mt-28')}>
					<Text style={tailwind('text-white')}>{props.message}</Text>
				</View>
			)
		}
	</View>
);

export default StatusModal;