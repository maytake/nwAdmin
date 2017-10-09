import {post} from '../post.js'

//添加岗位
export function addRole(params) {
	return post('/home/role/addrole', params)
}
//编辑岗位
export function editRole(params) {
	return post('/home/role/editrole', params)
}
//获取岗位列表
export function getRoleList(params) {
	return post('/home/role/getrolelist', params)
}
//删除岗位
export function delRole(params) {
	return post('/home/role/delrole', params)
}