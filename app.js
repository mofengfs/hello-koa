// 'use strict'; //启用严格模式, 避免平台不一致的不可测错误

// //引入 koa 模块

const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const staticServer = require('koa-static');
const render = require('koa-art-template');
const path = require('path');
const session = require('koa-session');
const DB = require('./module/db.js')

/**实例化 */

var app = new Koa();

var router = new Router();

/**配置中间件  -- 第三方中间件 */

render(app, {
    root: path.join(__dirname, 'views'), //视图位置
    extname: '.html', //后缀名
    debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
})


/**配置路由 */

router.get('/', async (ctx) => {

    console.time('start1')
    var result = await DB.find('user', {})
    console.timeEnd('start1')

    ctx.body = result


})

router.get('/news', async (ctx) => {

    console.time('start2')
    var result = await DB.find('user', {})
    console.timeEnd('start2')

    ctx.body = result

})



/**启动路由 */
app
    .use(router.routes())  /*启动路由*/
    .use(router.allowedMethods()); /*可以配置, 也可以不配置, 建议配置 */

/*
作用: 这是官方文档的推荐用法, 我们可以看到
router.allowedMethods()用在了路由匹配 router.routes()之后, 
所以在当所有路由中间件最后调用, 此时根据 ctx.status 设置 response 响应头
**/


/**监听端口 */
app.listen(3000);




