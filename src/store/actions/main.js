import { SEND_COMMAND } from './actionTypes';

export function sendCommand(url) {
    return {
        type: SEND_COMMAND,
        payload: {
            request: {
                url
            }
        }
    };
}