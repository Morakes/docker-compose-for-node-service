const Router = require("@koa/router") // 引入koa-router
const router = new Router()
// 引入路由
// web
router.use("/oil", require("./controller/example"))
router.use('/oauth',require('./controller/admin/token'))
router.use('/web',require('./controller/admin/login'))
router.use('/web/carousel',require('./controller/admin/carousel/index'))
router.use('/web/scenic',require('./controller/admin/module/scenic'))
router.use('/web/file',require('./controller/admin/upload'))
router.use('/web/town',require('./controller/admin/module/town'))
router.use('/web/specialty',require('./controller/admin/module/specialty'))
router.use('/web/season',require('./controller/admin/module/season'))
router.use('/web/chef',require('./controller/admin/module/chief'))
router.use('/web/chefMenu',require('./controller/admin/module/chiefMenu'))
router.use('/web/rest',require('./controller/admin/module/restaurant'))
router.use('/web/wxu',require('./controller/admin/admin/custom'))
router.use('/web/apply',require('./controller/admin/merchant/apply'))
router.use('/web/merc',require('./controller/admin/merchant/merchant'))
router.use('/web/envi',require('./controller/admin/module/envDisplay'))
router.use('/web/cook',require('./controller/admin/module/cook'))
router.use('/web/variety',require('./controller/admin/module/dishes'))
router.use('/web/sys/user',require('./controller/admin/administrator'))
router.use('/web/sys/role',require('./controller/admin/role'))
router.use('/web/statistics',require('./controller/admin/admin/statistic'))
router.use('/web/opinion',require('./controller/admin/admin/opinion'))


// app
router.use('/applets',require('./controller/app/login'))
router.use('/applets/town',require('./controller/app/town'))
router.use('/applets/carousel',require('./controller/app/carousel/index'))
router.use('/applets/merch',require('./controller/app/merch/index'))
router.use('/applets/chef',require('./controller/app/chef/index'))
router.use('/applets/season',require('./controller/app/season/index'))
router.use('/applets/scenic',require('./controller/app/scenic/index'))
router.use('/applets/rest',require('./controller/app/rest/index'))
router.use('/applets/chefMenu',require('./controller/app/chef/chefMenu'))
router.use('/applets/specialty',require('./controller/app/specialty/index'))
router.use('/applets/file',require('./controller/admin/upload'))
router.use('/applets/envi',require('./controller/app/envi/index'))
router.use('/applets/cook',require('./controller/app/cook/index'))
router.use('/applets/dishes',require('./controller/app/dishes/index'))
router.use('/applets/collection',require('./controller/app/collection/index'))
router.use('/applets/map',require('./controller/app/map/index'))
router.use('/applets/opinion',require('./controller/app/opinion/index'))
module.exports = router.routes()
