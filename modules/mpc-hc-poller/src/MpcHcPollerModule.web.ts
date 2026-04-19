import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './MpcHcPoller.types';

type MpcHcPollerModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class MpcHcPollerModule extends NativeModule<MpcHcPollerModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(MpcHcPollerModule, 'MpcHcPollerModule');
