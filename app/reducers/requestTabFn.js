import * as Action from '../constants/requestTabFn.js'

const initialState = {}

export default function requestTabFn(state = initialState, action) {
	switch (action.type) {
		case Action.EDITTABLE:
			return Object.assign({}, state, action.data)
		case Action.DELTABLE:
			return Object.assign({}, state, action.data)
		default:
			return state
	}
}