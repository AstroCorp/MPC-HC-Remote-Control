import { SEND_COMMAND, SEND_COMMAND_SUCCESS, SEND_COMMAND_FAIL } from "../actions/actionTypes";

const initialState = {
	loading: false,
	error: null,
}

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEND_COMMAND:
			return {
				...state,
				loading: true,
				error: null,
			};

		case SEND_COMMAND_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
			};

		case SEND_COMMAND_FAIL:
			return {
				...state,
				loading: false,
				error: 'Error al enviar comando',
			};
	}

	return state;
}

export default mainReducer;
