import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

type SnapshotPreviewProps = {
    ip: string;
    port: string;
    isEnabled: boolean;
    hasMedia: boolean;
};

const SNAPSHOT_REFRESH_MS = 10000;

const SnapshotPreview = ({ ip, port, isEnabled, hasMedia }: SnapshotPreviewProps) => {
    // Token de refresco para invalidar cache y forzar nueva imagen cada ciclo.
    const [refreshToken, setRefreshToken] = useState(Date.now());

    // Relación de aspecto real de la miniatura para evitar deformación visual.
    const [aspectRatio, setAspectRatio] = useState(16 / 9);

    useEffect(() => {
        if (!isEnabled || !hasMedia) {
            return;
        }

        // Refresco inmediato al activar, y luego cada 10 segundos.
        setRefreshToken(Date.now());

        const intervalId = setInterval(() => {
            setRefreshToken(Date.now());
        }, SNAPSHOT_REFRESH_MS);

        return () => {
            clearInterval(intervalId);
        };
    }, [hasMedia, isEnabled, ip, port]);

    if (!isEnabled || !hasMedia) {
        return null;
    }

    return (
        <View
            style={{
                width: '100%',
                aspectRatio,
                borderRadius: 12,
                overflow: 'hidden',
                backgroundColor: '#0f172a',
            }}
        >
            <Image
                source={{ uri: `http://${ip}:${port}/snapshot.jpg?t=${refreshToken}` }}
                resizeMode="contain"
                resizeMethod="scale"
                fadeDuration={0}
                onLoad={(event) => {
                    const width = event.nativeEvent.source.width;
                    const height = event.nativeEvent.source.height;

                    if (width > 0 && height > 0) {
                        setAspectRatio(width / height);
                    }
                }}
                style={{ width: '100%', height: '100%' }}
            />
        </View>
    );
};

export default SnapshotPreview;
