import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { setVolume } from '@/components/player/mpcApi';

type VolumeControlProps = {
  volumeLevel: number;
  ip: string;
  port: string;
  isEnabled: boolean;
};

const THUMB_RADIUS = 10;
const AUDIO_LABEL_WIDTH = 44;
const AUDIO_SLIDER_OFFSET = 34;
// Tiempo maximo para mantener el volumen local tras soltar el drag.
// Si no llega confirmacion remota, liberamos por timeout.
const VOLUME_PENDING_TIMEOUT_MS = 500;

const VolumeControl = ({ volumeLevel, ip, port, isEnabled }: VolumeControlProps) => {
  // true mientras se arrastra la barra de volumen.
  const [isSeekingAudio, setIsSeekingAudio] = useState(false);

  // Valor local en vivo durante el drag.
  const [audioPreviewVolume, setAudioPreviewVolume] = useState(0);

  // Valor objetivo enviado al soltar, retenido para evitar rebotes visuales.
  const [pendingVolume, setPendingVolume] = useState<number | null>(null);

  // Volumen remoto justo antes de soltar, usado para detectar cambio real.
  const [volumeBeforeRelease, setVolumeBeforeRelease] = useState<number | null>(null);

  // Ancho util del slider para posicionar la etiqueta sobre el thumb.
  const [audioSliderWidth, setAudioSliderWidth] = useState(0);

  // Prioridad visual:
  // 1) drag activo -> preview local
  // 2) post-release -> pending local
  // 3) normal -> volumen remoto
  const effectiveAudioVolume = isSeekingAudio
    ? audioPreviewVolume
    : (pendingVolume ?? volumeLevel);

  useEffect(() => {
    // Solo intentamos confirmar contra remoto cuando ya se solto el slider.
    if (
      pendingVolume === null ||
      volumeBeforeRelease === null ||
      isSeekingAudio
    ) {
      return;
    }

    if (
      // Caso A: el remoto cambio respecto al volumen previo.
      Math.abs(volumeLevel - volumeBeforeRelease) >= 1 ||
      // Caso B: el remoto ya coincide (o casi) con el target enviado.
      Math.abs(volumeLevel - pendingVolume) <= 1
    ) {
      // Confirmado: dejamos de fijar el valor local.
      setPendingVolume(null);
      setVolumeBeforeRelease(null);
    }
  }, [isSeekingAudio, pendingVolume, volumeBeforeRelease, volumeLevel]);

  useEffect(() => {
    // Fallback por timeout para no quedarse en pending indefinidamente.
    if (pendingVolume === null) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setPendingVolume(null);
      setVolumeBeforeRelease(null);
    }, VOLUME_PENDING_TIMEOUT_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pendingVolume]);

  const audioThumbRatio = audioSliderWidth > 0 ? effectiveAudioVolume / 100 : 0;
  // Posicion X de la etiqueta de preview, centrada sobre thumb y acotada a bordes.
  const audioLabelLeft = Math.max(
    AUDIO_SLIDER_OFFSET,
    Math.min(
      AUDIO_SLIDER_OFFSET + audioSliderWidth - AUDIO_LABEL_WIDTH,
      AUDIO_SLIDER_OFFSET +
        audioThumbRatio * (audioSliderWidth - THUMB_RADIUS * 2) +
        THUMB_RADIUS -
        AUDIO_LABEL_WIDTH / 2
    )
  );

  const toggleQuickMute = () => {
    if (!isEnabled) {
      return;
    }

    // Toggle rapido: si hay volumen -> mute, si esta mute -> 20%.
    const target = volumeLevel > 0 ? 0 : 20;

    setVolume(ip, port, target).catch((e) => {
      console.warn('[MPC-HC] volume toggle error:', e);
    });
  };

  return (
    <View>
      <View style={{ height: 24, position: 'relative' }}>
        {isSeekingAudio && (
          <Text
            className="text-sky-400 font-RobotoMedium text-base text-center"
            style={{ position: 'absolute', width: AUDIO_LABEL_WIDTH, left: audioLabelLeft }}
          >
            {Math.round(audioPreviewVolume)}%
          </Text>
        )}
      </View>

      <View className="flex-row items-center gap-3" style={{ opacity: isEnabled ? 1 : 0.45 }}>
        <TouchableOpacity onPress={toggleQuickMute} disabled={!isEnabled}>
          <MaterialIcons
            name={volumeLevel === 0 ? 'volume-off' : 'volume-up'}
            size={22}
            color="#94a3b8"
          />
        </TouchableOpacity>
        <View
          style={{ flex: 1 }}
          onLayout={(e) => setAudioSliderWidth(e.nativeEvent.layout.width)}
        >
          <Slider
            style={{ width: '100%', height: 40 }}
            disabled={!isEnabled}
            minimumValue={0}
            maximumValue={100}
            value={effectiveAudioVolume}
            step={1}
            minimumTrackTintColor="#38bdf8"
            maximumTrackTintColor="#475569"
            thumbTintColor="#38bdf8"
            onSlidingStart={(v) => {
              if (!isEnabled) {
                return;
              }

              // Nuevo drag: limpiamos pending previo y usamos preview local.
              setIsSeekingAudio(true);
              setPendingVolume(null);
              setVolumeBeforeRelease(null);
              setAudioPreviewVolume(v);
            }}
            onValueChange={(v) => setAudioPreviewVolume(v)}
            onSlidingComplete={(v) => {
              if (!isEnabled) {
                return;
              }

              // Al soltar: retenemos valor local y enviamos update remoto.
              setIsSeekingAudio(false);
              setPendingVolume(v);
              setVolumeBeforeRelease(volumeLevel);
              setAudioPreviewVolume(v);
              setVolume(ip, port, v).catch((e) => {
                console.warn('[MPC-HC] volume error:', e);
              });
            }}
          />
        </View>
        <Text className="text-slate-400 font-RobotoRegular text-sm w-10 text-right">
          {Math.round(effectiveAudioVolume)}
        </Text>
      </View>
    </View>
  );
};

export default VolumeControl;
