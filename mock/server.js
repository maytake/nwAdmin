var app = require('koa')();
var router = require('koa-router')();

/*router.get('/', function *(next) {//function* 会定义一个生成器函数 (generator function)，它返回一个  Generator  对象。
    this.body = 'hello koa !'
});
*/



var normalData = require('./getSingleResult.js')

var _logo = require('./login/index.js');
var _menu = require('./menu/getmenu.js');

var _home3 = require('./home/getrolelist.js')




router.post('/ebeim-api/test/login', function*(next) { //login
	this.body = _logo
}).post('/home/member/logout', function*(next) { //loginout
	this.body = normalData
}).post('/home/index/getmenu', function*(next) {//defaultMenu
    this.body = _menu
}).post('/home/role/getrolelist', function*(next) {
    this.body = _home3
}).post('/home/role/addrole', function*(next) {
    this.body = normalData
}).post('/home/role/editrole', function*(next) {
    this.body = normalData
}).post('/home/role/delrole', function*(next) {
    this.body = normalData
})




app.use(router.routes())
	.use(router.allowedMethods());

app.listen(3000);