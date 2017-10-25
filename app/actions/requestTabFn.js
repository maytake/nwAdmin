import * as Action from '../constants/requestTabFn.js'
import { post } from '../fetch/post.js'

export function editTableFn(fn) {
    return {
        type:Action.EDITTABLE,
        data:fn
    }
}

export function delTableFn2() {
    return (dispatch)=>{
    	return post('/home/index/getmenu').then(data => {
    		dispatch({
		        type:Action.DELTABLE,
		        data
    		})
    	})
    }
}
