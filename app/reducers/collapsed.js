import {COllAPSED} from '../constants/collapsed.js'

const initialState = false

export default function collapsed(state = initialState, action) {
	switch (action.type) {
		case COllAPSED:
			return action.data
		default:
			return state
	}
}