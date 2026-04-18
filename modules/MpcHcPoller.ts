import ExpoMpcHcPoller from './mpc-hc-poller';
import type { PollingErrorEvent, StatusUpdateEvent } from './mpc-hc-poller/src/MpcHcPoller.types';

type PollerSubscription = {
	remove: () => void;
};

type PollerModule = {
	startPolling: (ip: string, port: number) => Promise<void>;
	stopPolling: () => Promise<void>;
	addListener: {
		(eventName: 'onStatusUpdate', listener: (event: StatusUpdateEvent) => void): PollerSubscription;
		(eventName: 'onPollingError', listener: (event: PollingErrorEvent) => void): PollerSubscription;
	};
};

const hasValidApi =
	ExpoMpcHcPoller != null &&
	typeof (ExpoMpcHcPoller as Partial<PollerModule>).startPolling === 'function' &&
	typeof (ExpoMpcHcPoller as Partial<PollerModule>).stopPolling === 'function' &&
	typeof (ExpoMpcHcPoller as Partial<PollerModule>).addListener === 'function';

const isMpcHcPollerAvailable = hasValidApi;

const unavailablePoller: PollerModule = {
	async startPolling() {
		throw new Error('MpcHcPoller no disponible en esta plataforma/build.');
	},
	async stopPolling() {
		// no-op intencional para evitar fallos en cleanup.
	},
	addListener() {
		return {
			remove: () => {
				// no-op intencional cuando el modulo no existe.
			},
		};
	},
};

const MpcHcPoller: PollerModule = hasValidApi
	? (ExpoMpcHcPoller as PollerModule)
	: unavailablePoller;

export default MpcHcPoller;
export { isMpcHcPollerAvailable };
export type { StatusUpdateEvent, PollingErrorEvent };
