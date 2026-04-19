import type { StyleProp, ViewStyle } from 'react-native';

export type OnLoadEventPayload = {
  url: string;
};

export type StatusUpdateEvent = {
  html: string;
};

export type PollingErrorEvent = {
  message: string;
};

export type MpcHcPollerModuleEvents = {
  onStatusUpdate: (event: StatusUpdateEvent) => void;
  onPollingError: (event: PollingErrorEvent) => void;
};

export type ChangeEventPayload = {
  value: string;
};

export type MpcHcPollerViewProps = {
  url: string;
  onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};
