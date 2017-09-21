import {
	get
} from '../get';
import {
	post
} from '../post';

//登出
export function loginOut() {
	return post('/home/member/logout')
}
//登录
export function loginIn(params) {
	return post('/ebeim-api/test/login', params)
}
//重置密码
export function changePassword(params) {
	return post('/home/member/changepassword', params)
}