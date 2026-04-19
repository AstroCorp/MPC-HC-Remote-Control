import React from 'react';
import { Text, View } from 'react-native';
import useSettingsStore from '@/stores/useSettingsStore';
import useMpcStatusStore from '@/stores/useMpcStatusStore';
import useSyncStore from '@/stores/useSyncStore';
import SnapshotPreview from '@/components/player/SnapshotPreview';
import VideoTimeline from '@/components/player/VideoTimeline';
import PlaybackControls from '@/components/player/PlaybackControls';
import VolumeControl from '@/components/player/VolumeControl';

export default function HomeScreen() {
    const status = useMpcStatusStore((state) => state.status);
    const isSyncActive = useSyncStore((state) => state.isSyncActive);
    const ip = useSettingsStore((state) => state.ip);
    const port = useSettingsStore((state) => state.port);

    const position = (status?.position as number) ?? 0;
    const duration = (status?.duration as number) ?? 0;
    const volumeLevel = (status?.volumeLevel as number) ?? 0;
    const isPlaying = status?.state === 2; // 2 = reproduciendo en MPC-HC

    return (
        <View className="flex-1 p-5 gap-6 justify-center">
            <SnapshotPreview ip={ip} port={port} isEnabled={isSyncActive} hasMedia={Boolean(status?.file)} />

            <Text className="text-white font-RobotoBold text-lg" numberOfLines={1}>
                {(status?.file as string) ?? '—'}
            </Text>

            <VideoTimeline position={position} duration={duration} ip={ip} port={port} isEnabled={isSyncActive} />

            <PlaybackControls isPlaying={isPlaying} ip={ip} port={port} isEnabled={isSyncActive} />

            <VolumeControl volumeLevel={volumeLevel} ip={ip} port={port} isEnabled={isSyncActive} />
        </View>
    );
}
