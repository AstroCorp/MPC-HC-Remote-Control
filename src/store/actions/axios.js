import { SEND_COMMAND } from './actionTypes';

export function sendCommand(ip, port, wm_command) {
    return {
        type: SEND_COMMAND,
        payload: {
            request: {
                url: 'http://' + ip + ':' + port + '/command.html?wm_command=' + wm_command
            }
        }
    };
}