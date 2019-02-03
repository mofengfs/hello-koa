'use strict'

const Koa = require('koa'),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    path = require('path');

//引入路由子模块
const admin = require('./routes/admin.js')
const api = require('./routes/api.js')
const index = require('./routes/index.js')

const app = new Koa()

//配置 koa-art-template 模板引擎
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});


// 配置层级路由
router.use('/', index)
router.use('/admin', admin)
router.use('/api', api)


//启动路由
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(8008)
