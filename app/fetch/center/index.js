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




//获取表单列表
export function getTableList(params) {
	return post('/home/role/getTableList', params)
}
//添加表单列表
export function addTableList(params) {
	return post('/home/role/addTableList', params)
}
//删除表单列表
export function delTableList(params) {
	return post('/home/role/delTableList', params)
}
//编辑表单列表
export function editTableList(params) {
	return post('/home/role/editTableList', params)
}


