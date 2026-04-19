import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { msToTime } from '@/utils/common';
import { seekTo } from '@/components/player/mpcApi';

type VideoTimelineProps = {
	position: number;
	duration: number;
	ip: string;
	port: string;
	isEnabled: boolean;
};

const THUMB_RADIUS = 10;
const VIDEO_LABEL_WIDTH = 72;
// Tiempo maximo para mantener el valor local tras soltar el slider.
// Si el backend no refleja el cambio antes, soltamos el bloqueo por fallback.
const VIDEO_PENDING_TIMEOUT_MS = 500;

const formatSeekPreview = (ms: number) => {
	const base = msToTime(ms);
	const tenths = Math.floor((ms % 1000) / 100);

	return `${base}.${tenths}`;
};

const VideoTimeline = ({ position, duration, ip, port, isEnabled }: VideoTimelineProps) => {
	// true mientras el dedo esta arrastrando la barra.
	const [isSeekingVideo, setIsSeekingVideo] = useState(false);

	// Valor local en vivo durante el drag (lo que ve el usuario en tiempo real).
	const [videoPreviewPosition, setVideoPreviewPosition] = useState(0);

	// Valor enviado al soltar. Se mantiene temporalmente para evitar rebote visual.
	const [pendingSeekPosition, setPendingSeekPosition] = useState<number | null>(null);

	// Posicion remota justo antes de soltar, para detectar confirmacion real del backend.
	const [positionBeforeSeekRelease, setPositionBeforeSeekRelease] = useState<number | null>(null);

	// Ancho del slider para posicionar la etiqueta flotante sobre el thumb.
	const [videoSliderWidth, setVideoSliderWidth] = useState(0);

	// Prioridad de visualizacion:
	// 1) durante drag -> preview local
	// 2) tras soltar -> pending local
	// 3) normal -> valor remoto de polling
	const effectiveVideoPosition = isSeekingVideo
		? videoPreviewPosition
		: (pendingSeekPosition ?? position);

	// Calcula la posicion X de la etiqueta de preview para que siga al thumb,
	// con clamp para no salirse de los bordes del contenedor.
	const videoThumbRatio = duration > 0 ? effectiveVideoPosition / duration : 0;
	const videoLabelLeft = Math.max(
		0,
		Math.min(
			videoSliderWidth - VIDEO_LABEL_WIDTH,
			videoThumbRatio * (videoSliderWidth - THUMB_RADIUS * 2) + THUMB_RADIUS - VIDEO_LABEL_WIDTH / 2
		)
	);

	useEffect(() => {
		// Mientras se arrastra no intentamos confirmar nada contra remoto.
		// Solo al soltar evaluamos si el backend ya aplico el seek.
		if (
			pendingSeekPosition === null ||
			positionBeforeSeekRelease === null ||
			isSeekingVideo
		) {
			return;
		}

		if (
			// Caso A: el tiempo remoto cambio respecto al valor previo => backend reacciono.
			Math.abs(position - positionBeforeSeekRelease) >= 250 ||
			// Caso B: el remoto ya esta suficientemente cerca del target solicitado.
			Math.abs(position - pendingSeekPosition) <= 250
		) {
			// Al confirmar, volvemos a depender totalmente del valor remoto.
			setPendingSeekPosition(null);
			setPositionBeforeSeekRelease(null);
		}
	}, [isSeekingVideo, pendingSeekPosition, position, positionBeforeSeekRelease]);

	useEffect(() => {
		// Fallback temporal: evita quedarse bloqueado en pending
		// si por latencia no llega confirmacion remota a tiempo.
		if (pendingSeekPosition === null) {
			return;
		}

		const timeoutId = setTimeout(() => {
			setPendingSeekPosition(null);
			setPositionBeforeSeekRelease(null);
		}, VIDEO_PENDING_TIMEOUT_MS);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [pendingSeekPosition]);

	return (
		<View>
			<View
				style={{ height: 24, position: 'relative' }}
				onLayout={(e) => setVideoSliderWidth(e.nativeEvent.layout.width)}
			>
				{isSeekingVideo && (
					<Text
						className="text-sky-400 font-RobotoMedium text-base text-center"
						style={{ position: 'absolute', width: VIDEO_LABEL_WIDTH, left: videoLabelLeft }}
					>
						{formatSeekPreview(videoPreviewPosition)}
					</Text>
				)}
			</View>

			<Slider
				style={{ width: '100%', height: 40 }}
				disabled={!isEnabled}
				minimumValue={0}
				maximumValue={duration > 0 ? duration : 1}
				value={isSeekingVideo ? videoPreviewPosition : (pendingSeekPosition ?? position)}
				step={1000}
				minimumTrackTintColor="#38bdf8"
				maximumTrackTintColor="#475569"
				thumbTintColor="#38bdf8"
				onSlidingStart={(v) => {
					if (!isEnabled) {
						return;
					}

					// Nuevo drag: limpiamos estado pendiente anterior y arrancamos preview local.
					setIsSeekingVideo(true);
					setPendingSeekPosition(null);
					setPositionBeforeSeekRelease(null);
					setVideoPreviewPosition(v);
				}}
				onValueChange={(v) => setVideoPreviewPosition(v)}
				onSlidingComplete={(v) => {
					if (!isEnabled) {
						return;
					}

					// Al soltar: fijamos valor pending y disparamos seek remoto.
					setIsSeekingVideo(false);
					setPendingSeekPosition(v);
					setPositionBeforeSeekRelease(position);
					setVideoPreviewPosition(v);
					seekTo(ip, port, v).catch((e) => {
						console.warn('[MPC-HC] seek error:', e);
					});
				}}
			/>

			<View className="flex-row justify-between px-1">
				<Text className="text-slate-400 font-RobotoRegular text-sm">
					{msToTime(effectiveVideoPosition)}
				</Text>
				<Text className="text-slate-400 font-RobotoRegular text-sm">{msToTime(duration)}</Text>
			</View>
		</View>
	);
};

export default VideoTimeline;
