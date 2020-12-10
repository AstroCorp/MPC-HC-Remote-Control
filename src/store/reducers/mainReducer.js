import { SET_IP, SET_PORT, SET_REFRESH_TIME } from '../actions/actionTypes';

const initialState = {
	ip: '192.168.0.10',
	port: 13579,
	refreshTime: 25,
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_IP:
			return {
				...state,
				ip: action.value,
			};

		case SET_PORT:
			return {
				...state,
				port: action.value,
			};
		
		case SET_REFRESH_TIME:
			return {
				...state,
				refreshTime: action.value,
			};
	}

	return state;
};

export default mainReducer;
