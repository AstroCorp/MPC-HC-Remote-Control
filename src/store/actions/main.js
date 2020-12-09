import { SET_IP, SET_PORT, SET_REFRESH_TIME } from './actionTypes';

export const setIp = (value) => {
    return {
        type: SET_IP,
        value,
    };
};

export const setPort = (value) => {
    return {
        type: SET_PORT,
        value,
    };
};

export const setRefreshTime = (value) => {
    return {
        type: SET_REFRESH_TIME,
        value,
    };
};
