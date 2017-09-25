import * as actionTypes from '../constants/centerinfo.js'

const initialState = {
	menu_data: []
}

export default function centerinfo(state = initialState, action) {
	switch (action.type) {
		case actionTypes.MEMU_DATA:
			return Object.assign({}, state, {
				menu_data: action.data
			})
		case actionTypes.MENU_CHANGE:
			state.menu_data.secondMenu = state.menu_data.storeMenu[action.data.flag]
			return Object.assign({}, state);
		default:
			return state
	}
}