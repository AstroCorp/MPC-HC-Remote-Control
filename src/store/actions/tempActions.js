import { SET_MEDIA_PLAYER_DATA, SET_SYNC_ENABLED } from './actionTypes';

export const setMpcHcInfo = (value) => {
    return {
        type: SET_MEDIA_PLAYER_DATA,
        value,
    };
};

export const setSyncEnabled = (value) => {
    return {
        type: SET_SYNC_ENABLED,
        value,
    };
};
