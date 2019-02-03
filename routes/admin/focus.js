/**轮播图管理 */

const router = require('koa-router')();

router.get('/', async (ctx) => {

    //ctx.body = '轮播图管理首页'
    await ctx.render('admin/focus/index')

})

router.get('/add', async (ctx) => {

    //ctx.body = '增加轮播图'
    await ctx.render('admin/focus/add')

})

router.get('/edit', async (ctx) => {

    //ctx.body = '编辑轮播图'
    await ctx.render('admin/focus/edit')

})

module.exports = router.routes()