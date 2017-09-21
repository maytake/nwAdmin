var app = require('koa')();
var router = require('koa-router')();

/*router.get('/', function *(next) {//function* 会定义一个生成器函数 (generator function)，它返回一个  Generator  对象。
    this.body = 'hello koa !'
});
*/

var _logo = require('./login/index.js');
var normalData = require('./getSingleResult.js')

router.post('/ebeim-api/test/login', function*(next) { //login
	this.body = _logo
}).post('/home/member/logout', function*(next) { //loginout
	this.body = normalData
})


app.use(router.routes())
	.use(router.allowedMethods());

app.listen(3000);