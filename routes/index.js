/**前台首页路由 */

const router = require('koa-router')()

router.get('/', async (ctx) => {

    // ctx.body = '首页'
    await ctx.render('default/index')

})

//注意 :  前台和后台匹配路由的写法不一样
router.get('case', async (ctx) => {

    // ctx.body = '案例'
    // await ctx.render('default/index')

})

router.get('about', async (ctx) => {

    // ctx.body = '关于我们'
    await ctx.render('default/about')

})

module.exports = router.routes()