import { SET_MPC_HC_INFO, SET_SYNC_ENABLED } from './actionTypes';

export const setMpcHcInfo = (value) => {
    return {
        type: SET_MPC_HC_INFO,
        value,
    };
};

export const setSyncEnabled = (value) => {
    return {
        type: SET_SYNC_ENABLED,
        value,
    };
};
