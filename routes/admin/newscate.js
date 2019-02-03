/**新闻分类管理 */

const router = require('koa-router')()

router.get('/', async (ctx) => {

    ctx.body = '新闻分类管理首页'

})

router.get('/add', async (ctx) => {

    ctx.body = '增加新闻'

})

router.get('/edit', async (ctx) => {

    ctx.body = '编辑新闻'

})

module.exports = router.routes()