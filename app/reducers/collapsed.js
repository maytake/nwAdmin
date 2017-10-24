import {COllAPSED} from '../constants/collapsed.js'

export default function collapsed(state = false, action) {
	switch (action.type) {
		case COllAPSED:
			return action.data
		default:
			return state
	}
}