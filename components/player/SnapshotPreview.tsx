import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

type SnapshotPreviewProps = {
	ip: string;
	port: string;
	isEnabled: boolean;
	hasMedia: boolean;
};

const SNAPSHOT_REFRESH_MS = 2500;

const SnapshotPreview = ({ ip, port, isEnabled, hasMedia }: SnapshotPreviewProps) => {
	// Valor que se añade a la URL como query param para evitar reutilizar una imagen cacheada.
	// Token de refresco para invalidar cache y forzar nueva imagen cada ciclo.
	const [refreshToken, setRefreshToken] = useState(Date.now());

	// Relación de aspecto real de la miniatura para evitar deformación visual.
	const [aspectRatio, setAspectRatio] = useState(16 / 9);

	// Imagen ya descargada y serializada localmente para evitar fallos intermitentes de carga remota.
	const [snapshotDataUri, setSnapshotDataUri] = useState<string | null>(null);

	useEffect(() => {
		if (!isEnabled || !hasMedia) {
			// Si no hay media o la vista previa esta desactivada, limpiamos estado y salimos.
			setSnapshotDataUri(null);
			return;
		}

		// Refresco inmediato al activar, y luego cada 5 segundos.
		setRefreshToken(Date.now());

		const intervalId = setInterval(() => {
			setRefreshToken(Date.now());
		}, SNAPSHOT_REFRESH_MS);

		return () => {
			clearInterval(intervalId);
		};
	}, [hasMedia, isEnabled, ip, port]);

	useEffect(() => {
		if (!isEnabled || !hasMedia) {
			return;
		}

		// Evita setState cuando el efecto ya se limpio (cambio de props o unmount).
		let cancelled = false;

		const loadSnapshot = async () => {
			// El parametro t cambia en cada ciclo para forzar descarga fresca del snapshot.
			const uri = `http://${ip}:${port}/snapshot.jpg?t=${refreshToken}`;

			try {
				const response = await fetch(uri, {
					method: 'GET',
					headers: {
						'Cache-Control': 'no-cache',
					},
				});

				if (!response.ok) {
					console.warn('[MPC-HC] Snapshot load failed:', uri, `HTTP ${response.status}`);
					return;
				}

				const buffer = await response.arrayBuffer();
				const bytes = new Uint8Array(buffer);
				// Convertimos bytes binarios a base64 para pasar la imagen como data URI al componente Image.
				let binary = '';
				bytes.forEach((b) => {
					binary += String.fromCharCode(b);
				});
				const dataUri = `data:image/jpeg;base64,${btoa(binary)}`;

				if (!cancelled) {
					setSnapshotDataUri(dataUri);
				}
			} catch (error) {
				console.warn('[MPC-HC] Snapshot download failed:', uri, error);
			}
		};

		loadSnapshot().catch((error) => {
			console.warn('[MPC-HC] Snapshot loader failed:', error);
		});

		return () => {
			// Marcamos cancelado para ignorar respuestas tardias de la peticion en curso.
			cancelled = true;
		};
	}, [hasMedia, ip, isEnabled, port, refreshToken]);

	if (!isEnabled || !hasMedia) {
		return null;
	}

	return (
		<View className="gap-2">
			<View
				style={{
					width: '100%',
					// Se actualiza dinamicamente en onLoad para respetar la proporcion real del frame.
					aspectRatio,
					borderRadius: 12,
					overflow: 'hidden',
					backgroundColor: '#0f172a',
				}}
			>
				<Image
					source={snapshotDataUri ? { uri: snapshotDataUri } : undefined}
					resizeMode="contain"
					resizeMethod="scale"
					onLoad={(event) => {
						const width = event.nativeEvent.source.width;
						const height = event.nativeEvent.source.height;

						if (width > 0 && height > 0) {
							// Ajustamos contenedor al aspecto real de la captura para evitar estiramientos.
							setAspectRatio(width / height);
						}
					}}
					onError={(event) => {
						console.warn('[MPC-HC] Snapshot render failed:', event.nativeEvent.error);
					}}
					style={{ width: '100%', height: '100%' }}
				/>
			</View>
		</View>
	);
};

export default SnapshotPreview;
