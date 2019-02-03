const router = require('koa-router')()
const user = require('./admin/user.js')
const focus = require('./admin/focus.js')
const news = require('./admin/newscate.js')

router.get('/', async (ctx) => {

    ctx.body = '后台管理首页'

})

//配置admin的层级路由
router.use('/user', user)
router.use('/focus', focus)
router.use('/news', news)

module.exports = router.routes() /**在模块里暴露路由并且启动路由 */