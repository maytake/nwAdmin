import {
	combineReducers
} from 'redux'
import userinfo from './userinfo'
import centerinfo from './centerinfo'
import collapsed from './collapsed'
export default combineReducers({
	userinfo,
	centerinfo,
	collapsed
})