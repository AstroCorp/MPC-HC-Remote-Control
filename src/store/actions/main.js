import { SET_IP, SET_PORT } from './actionTypes';

export const setIp = (value) => {
    return {
        type: SET_IP,
        value
    };
};

export const setPort = (value) => {
    return {
        type: SET_PORT,
        value
    };
};
