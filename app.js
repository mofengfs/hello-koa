'use strict'; //启用严格模式, 避免平台不一致的不可测错误

//引入 koa 模块

var Koa = require('koa');

var Router = require('koa-router');

// var views = require('koa-views');

// var bodyParser = require('koa-bodyparser');

const staticServer = require('koa-static');

const render = require('koa-art-template');

const path = require('path');

const session = require('koa-session');

//实例化

var app = new Koa();

var router = new Router();

//配置中间件  -- 第三方中间件

render(app, {
    root: path.join(__dirname, 'views'), //视图位置
    extname: '.html', //后缀名
    debug: process.env.NODE_ENV !=='production'  //是否开启调试模式
})


app.keys = ['some secret hurr']; /** cookie 的签名, 默认就好 */

const CONFIG = {
    key: 'koa: sess', /** (字符串) cookie 密钥 ( 默认为 koa：sess ), 默认就好 */
    maxAge: 5000, /** cookie 的过期时间 , 【需要修改】*/
    autoCommit: true, /** 自动提交头文件(默认为true), 没有效果, 默认就好 */
    overwrite: true, /** 可以覆盖或不覆盖(默认为true) */
    httpOnly: true, /** httpOnly与否(默认为true), true 表示只有服务器端可以获取 cookie */
    signed: true, /** 是否签名(默认为true) */
    rolling: false, /** 强制在每个响应上设置会话标识符 cookie。到期时间重置为原始 maxAge，重置到期倒计时。(默认为 false ) */
    renew: false /** 续订会话，因此我们可以始终保持用户登录。(默认为 false ), 【需要修改】 */
}

app.use(session(CONFIG, app));

//配置路由

router.get('/', async (ctx) => {

    //获取 session 的数据

    let userinfo = ctx.session.userinfo

    await ctx.render('index', {
        userinfo
    })

})

router.get('/login', async (ctx) => {

    //设置 session 的数据

    ctx.session.userinfo = '张三';
    ctx.body = '登录成功';

})



//启动路由
app
    .use(router.routes())  /*启动路由*/
    .use(router.allowedMethods()); /*可以配置, 也可以不配置, 建议配置 */

/*
作用: 这是官方文档的推荐用法, 我们可以看到
router.allowedMethods()用在了路由匹配 router.routes()之后, 
所以在当所有路由中间件最后调用, 此时根据 ctx.status 设置 response 响应头
**/


//监听端口
app.listen(3000);
