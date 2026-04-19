import React from 'react';
import { Text } from 'react-native';

type FileDisplayProps = {
	filename: string | null | undefined;
};

const FileDisplay = ({ filename }: FileDisplayProps) => {
	// No renderizar si no hay filename
	if (!filename) {
		return null;
	}

	return (
		<Text className="text-white font-RobotoBold text-lg" numberOfLines={1}>
			{filename}
		</Text>
	);
};

export default FileDisplay;
