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

render(app, { /**配置 art-template 模板引擎 */
    root: path.join(__dirname, 'views'), //视图位置
    extname: '.html', //后缀名
    debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
})

app.use(bodyParser()) /**配置 POST 提交中间件 */


/**配置路由 */

router.get('/', async (ctx) => {

    var result = await DB.find('user', {})

    await ctx.render('index', {

        userList: {

            result

        }

    })

})


router.get('/add', async (ctx) => {

    await ctx.render('add')

})

router.post('/doAdd', async (ctx) => {

    let data = await DB.insert('user', ctx.request.body)

    try {

        if (data.result.ok) {

            ctx.redirect('/')

        }

    } catch (err) {

        console.log(err)

    }

})

router.get('/edit', async (ctx) => {

    //通过get传过来的id来获取用户信息

    let id = ctx.query.id

    let data = await DB.find('user', { "_id": DB.getObjectID(id) })

    await ctx.render('edit', {

        userList: data[0]

    })

})

router.post('/doEdit', async (ctx) => {

    console.log(ctx.request.body)

    let id = ctx.request.body.id
    let username = ctx.request.body.username
    let age = ctx.request.body.age
    let sex = ctx.request.body.sex

    let data = await DB.update('user', { "_id": DB.getObjectID(id) }, {

        username, age, sex

    })

    try {

        if (data.result.ok) {

            ctx.redirect('/')

        }

    } catch (err) {

        console.log(err)

    }

})

router.get('/delete', async (ctx) => {

    let id = ctx.query.id

    let data = await DB.remove('user', { "_id": DB.getObjectID(id) })

    try {

        if (data.result.ok) {

            ctx.redirect('/')

        }

    } catch (err) {

        console.log(err)

    }

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




