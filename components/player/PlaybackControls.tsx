import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
	jumpBackwardMedium,
	jumpForwardMedium,
	nextFile,
	previousFile,
	togglePlayAndPause,
} from '@/utils/commands';
import { sendCommand } from '@/components/player/mpcApi';

type PlaybackControlsProps = {
	isPlaying: boolean;
	ip: string;
	port: string;
	isEnabled: boolean;
};

const PlaybackControls = ({ isPlaying, ip, port, isEnabled }: PlaybackControlsProps) => {
	const cmd = (command: number) => {
		if (!isEnabled) {
			return;
		}

		sendCommand(ip, port, command).catch((e) => {
			console.warn('[MPC-HC] command error:', e);
		});
	};

	return (
		<View className="flex-row justify-around items-center" style={{ opacity: isEnabled ? 1 : 0.45 }}>
			<TouchableOpacity onPress={() => cmd(previousFile)} disabled={!isEnabled}>
				<MaterialIcons name="skip-previous" size={36} color="#FFFFFF" />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => cmd(jumpBackwardMedium)} disabled={!isEnabled}>
				<MaterialIcons name="replay" size={36} color="#FFFFFF" />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => cmd(togglePlayAndPause)} disabled={!isEnabled}>
				<MaterialIcons name={isPlaying ? 'pause' : 'play-arrow'} size={48} color="#FFFFFF" />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => cmd(jumpForwardMedium)} disabled={!isEnabled}>
				<MaterialIcons name="replay" size={36} color="#FFFFFF" className="-scale-x-100" />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => cmd(nextFile)} disabled={!isEnabled}>
				<MaterialIcons name="skip-next" size={36} color="#FFFFFF" />
			</TouchableOpacity>
		</View>
	);
};

export default PlaybackControls;
