import { SET_MPC_HC_INFO, SET_SYNC_ENABLED } from '../actions/actionTypes';

const initialState = {
    mpc_hc_info: null,
    sync_enabled: false,
};

const tempReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_MPC_HC_INFO:
			return {
				...state,
				mpc_hc_info: action.value,
			};

		case SET_SYNC_ENABLED:
			return {
				...state,
				sync_enabled: action.value,
			};
	}

	return state;
};

export default tempReducer;
