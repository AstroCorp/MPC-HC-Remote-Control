import { NativeModule, requireNativeModule } from 'expo';

import { MpcHcPollerModuleEvents } from './MpcHcPoller.types';

declare class MpcHcPollerModule extends NativeModule<MpcHcPollerModuleEvents> {
  startPolling(ip: string, port: number): Promise<void>;
  stopPolling(): Promise<void>;
}

export default requireNativeModule<MpcHcPollerModule>('MpcHcPoller');
