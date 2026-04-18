import React, { useEffect, useRef, useState } from 'react';
import { Alert, AppState, ToastAndroid, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useSettingsStore from '@/stores/useSettingsStore';
import useMpcStatusStore from '@/stores/useMpcStatusStore';
import useSyncStore from '@/stores/useSyncStore';
import MpcHcPoller, { isMpcHcPollerAvailable } from '@/modules/MpcHcPoller';
import { getVariables } from '@/utils/common';

const SyncButton = () => {
    // isActive controla el icono y refleja si el usuario tiene Sync encendido.
    const [isActive, setIsActive] = useState(false);

    // Guardamos el ultimo estado de la app para detectar transiciones
    // active -> background/inactive y background/inactive -> active.
    const appStateRef = useRef(AppState.currentState);
    const setSyncActive = useSyncStore((state) => state.setSyncActive);

    // Inicia el polling nativo leyendo IP/puerto desde el store de settings.
    // Si falla, se desactiva Sync y se limpia el estado para evitar UI inconsistente.
    const startPollingSafely = async () => {
        const { ip, port } = useSettingsStore.getState();

        try {
            await MpcHcPoller.startPolling(ip, Number(port));
        } catch (error) {
            console.warn('[MPC-HC] No se pudo iniciar polling:', error);

            ToastAndroid.show('Could not start Sync. Check your connection.', ToastAndroid.SHORT);

            setIsActive(false);
            setSyncActive(false);

            useMpcStatusStore.getState().clearStatus();
        }
    };

    // Detiene el polling nativo y opcionalmente limpia estado.
    // keepActive=true se usa al pasar a background: se pausa la red pero
    // mantenemos el boton visualmente activo para reanudar al volver.
    const stopPollingSafely = async (clearStatus: boolean, keepActive = false) => {
        try {
            await MpcHcPoller.stopPolling();
        } catch (error) {
            console.warn('[MPC-HC] No se pudo detener polling:', error);
        } finally {
            if (!keepActive) {
                setIsActive(false);
                setSyncActive(false);
            }

            if (clearStatus) {
                useMpcStatusStore.getState().clearStatus();
            }
        }
    };

    useEffect(() => {
        // Listener principal de datos: cada HTML recibido se parsea
        // y se publica en el store global para que la pantalla se actualice.
        const statusSub = MpcHcPoller.addListener('onStatusUpdate', (event) => {
            const parsedStatus = getVariables(event.html);

            useMpcStatusStore.getState().updateStatus(parsedStatus);
        });

        // Listener de errores del modulo nativo.
        // Si el poller informa error, apagamos Sync y limpiamos datos.
        const errorSub = MpcHcPoller.addListener('onPollingError', (event) => {
            setIsActive(false);
            setSyncActive(false);
            useMpcStatusStore.getState().clearStatus();
            ToastAndroid.show('Could not start Sync. Check your connection.', ToastAndroid.SHORT);
            console.warn('[MPC-HC] error:', event.message);
        });

        return () => {
            // Cleanup al desmontar el componente:
            // 1) detenemos polling (si existe),
            // 2) limpiamos estado,
            // 3) removemos listeners para evitar leaks.
            stopPollingSafely(true, true).catch((error) => {
                console.warn('[MPC-HC] Error en cleanup de polling:', error);
            });

            statusSub.remove();
            errorSub.remove();
            setSyncActive(false);
        };
    }, [setSyncActive]);

    useEffect(() => {
        // Controla lo que pasa al minimizar/restaurar la app:
        // - si Sync estaba activo y la app se minimiza, pausamos polling.
        // - si Sync seguia activo y la app vuelve a active, reanudamos polling.
        const appStateSub = AppState.addEventListener('change', (nextState) => {
            const prevState = appStateRef.current;
            appStateRef.current = nextState;

            const wentBackground = prevState === 'active' && nextState !== 'active';
            const returnedForeground = prevState !== 'active' && nextState === 'active';

            if (wentBackground && isActive) {
                MpcHcPoller.stopPolling().catch((error) => {
                    console.warn('[MPC-HC] Error pausando en background:', error);
                });
            }

            if (returnedForeground && isActive) {
                const { ip, port } = useSettingsStore.getState();
                MpcHcPoller.startPolling(ip, Number(port)).catch((error) => {
                    console.warn('[MPC-HC] Error reanudando en foreground:', error);
                    
                    ToastAndroid.show('Could not resume Sync when returning to the app.', ToastAndroid.SHORT);

                    setIsActive(false);
                    setSyncActive(false);

                    useMpcStatusStore.getState().clearStatus();
                });
            }
        });

        return () => {
            appStateSub.remove();
        };
    }, [isActive]);

    // Boton toggle:
    // - Off -> On: valida modulo, activa UI y arranca polling.
    // - On -> Off: detiene polling y limpia estado.
    const togglePolling = () => {
        if (!isActive) {
            if (!isMpcHcPollerAvailable) {
                Alert.alert(
                    'Modulo nativo no disponible',
                    'Necesitas ejecutar npx expo prebuild y reconstruir la app con expo run:android para que el poller nativo se cargue.'
                );

                return;
            }

            setIsActive(true);
            setSyncActive(true);
            startPollingSafely().catch((error) => {
                console.warn('[MPC-HC] Error iniciando polling:', error);
            });
            return;
        }

        stopPollingSafely(true).catch((error) => {
            console.warn('[MPC-HC] Error deteniendo polling:', error);
        });
    };

    return (
        // El icono refleja el estado actual de sincronizacion.
        <TouchableOpacity onPress={togglePolling}>
            <MaterialIcons name={isActive ? 'sync' : 'sync-disabled'} size={24} color="#FFFFFF" />
        </TouchableOpacity>
    );
};

export default SyncButton;
