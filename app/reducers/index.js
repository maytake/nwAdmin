import {
	combineReducers
} from 'redux'
import userinfo from './userinfo'
import centerinfo from './centerinfo'
import collapsed from './collapsed'
import requestTabFn from './requestTabFn'

export default combineReducers({
	userinfo,
	centerinfo,
	collapsed,
	requestTabFn
})