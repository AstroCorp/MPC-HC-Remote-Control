import { SET_MEDIA_PLAYER_DATA, SET_SYNC_ENABLED } from '../actions/actionTypes';

const initialState = {
    mediaPlayerData: null,
    syncEnabled: false,
};

const tempReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_MEDIA_PLAYER_DATA:
			return {
				...state,
				mediaPlayerData: action.value,
			};

		case SET_SYNC_ENABLED:
			return {
				...state,
				syncEnabled: action.value,
			};
	}

	return state;
};

export default tempReducer;
