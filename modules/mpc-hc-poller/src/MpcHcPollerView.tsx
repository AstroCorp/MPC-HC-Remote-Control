import { requireNativeView } from 'expo';
import * as React from 'react';

import { MpcHcPollerViewProps } from './MpcHcPoller.types';

const NativeView: React.ComponentType<MpcHcPollerViewProps> =
  requireNativeView('MpcHcPoller');

export default function MpcHcPollerView(props: MpcHcPollerViewProps) {
  return <NativeView {...props} />;
}
