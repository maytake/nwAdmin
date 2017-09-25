import {
	combineReducers
} from 'redux'
import userinfo from './userinfo'
import centerinfo from './centerinfo'

export default combineReducers({
	userinfo,
	centerinfo
})