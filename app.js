'use strict'; //启用严格模式, 避免平台不一致的不可测错误

//引入 koa 模块

var Koa = require('koa');

var Router = require('koa-router');

var views = require('koa-views');

//实例化

var app = new Koa();

var router = new Router();


//配置模板引擎中间件  -- 第三方中间件

app.use(views('views', {
    // extension: 'ejs' /** 模板后缀名为 .ejs*/
    map: { html: 'ejs' }  /** 模板的后缀名为 .html*/
}))

//写一个中间件配置公共的信息
app.use(async (ctx, next) => {
    ctx.state.userinfo = '张三';
    await next();
})

//配置路由

router.get('/', async (ctx) => {

    let arr = ['张三', '李四', '王五', '赵六'];
    await ctx.render('index', {
        arr
    });

})

router.get('/news', async (ctx) => {

    ctx.body = "这是一个新闻页面"

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

app.listen(3000);
