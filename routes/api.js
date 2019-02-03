const router = require('koa-router')()

router.get('/', async (ctx) => {

    ctx.body = {"title": "这是一个api"}

})

router.get('/newslist', async (ctx) => {

    ctx.body = {"title": "这是一个新闻api"}

})

router.get('/focus', async (ctx) => {

    ctx.body = {"title": "这是一个轮播图的api"}

})

module.exports = router.routes() /**在模块里暴露路由并且启动路由 */