import { SEND_COMMAND } from './actionTypes';

export function sendCommand(server, wm_command) {
    const urlBase = 'http://' + server.ip + ':' + server.port + '/command.html?wm_command=' + wm_command.code;
    const extraParam = wm_command.param ? '&' + wm_command.param.name + '=' + wm_command.param.value  : '';

    return {
        type: SEND_COMMAND,
        payload: {
            request: {
                url: urlBase + extraParam,
            },
        },
    };
}