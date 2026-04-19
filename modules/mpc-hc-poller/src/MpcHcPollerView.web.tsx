import * as React from 'react';

import { MpcHcPollerViewProps } from './MpcHcPoller.types';

export default function MpcHcPollerView(props: MpcHcPollerViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
