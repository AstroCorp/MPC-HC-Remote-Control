import { msToTime } from '@/utils/common';

export const sendCommand = (ip: string, port: string, command: number) => {
  return fetch(`http://${ip}:${port}/command.html?wm_command=${command}`);
};

export const seekTo = (ip: string, port: string, positionMs: number) => {
  return fetch(`http://${ip}:${port}/command.html`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `wm_command=-1&position=${encodeURIComponent(msToTime(positionMs))}`,
  });
};

export const setVolume = (ip: string, port: string, volume: number) => {
  return fetch(`http://${ip}:${port}/command.html`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `wm_command=-2&volume=${Math.round(volume)}`,
  });
};
