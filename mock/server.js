var app = require('koa')();
var router = require('koa-router')();

/*router.get('/', function *(next) {//function* 会定义一个生成器函数 (generator function)，它返回一个  Generator  对象。
    this.body = 'hello koa !'
});
*/



var normalData = require('./getSingleResult.js')

var _logo = require('./login/index.js');
var _menu = require('./menu/getmenu.js');

var getrolelist = require('./home/getrolelist.js')
var getTableList = require('./home/getTableList.js')




router.post('/ebeim-api/test/login', function*(next) { //login
	this.body = _logo
}).post('/home/member/logout', function*(next) { //loginout
	this.body = normalData
}).post('/home/index/getmenu', function*(next) {//defaultMenu
    this.body = _menu
}).post('/home/role/getrolelist', function*(next) {
    this.body = getrolelist
}).post('/home/role/addrole', function*(next) {
    this.body = normalData
}).post('/home/role/editrole', function*(next) {
    this.body = normalData
}).post('/home/role/delrole', function*(next) {
    this.body = normalData
}).post('/home/role/getTableList', function*(next) {//获取表格
    this.body = getTableList
}).post('/home/role/addTableList', function*(next) {//添加表格
    this.body = normalData
}).post('/home/role/delTableList', function*(next) {//删除表格
    this.body = normalData
}).post('/home/role/editTableList', function*(next) {//编辑表格
    this.body = normalData
})




app.use(router.routes())
	.use(router.allowedMethods());

app.listen(3000);