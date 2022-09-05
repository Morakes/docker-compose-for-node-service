const router = new require('@koa/router')()
const { default: to } = require('await-to-js')
const cookModel = require('../../../model/Cook')

router.get('/getCookList',async ctx=>{
    if(ctx.empty(['restId','limit','page'])) return
    const {limit,page} = ctx.query
    const where = {restId:ctx.query.restId}
    const [err,data] = await to(cookModel.findAll({
        where,
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))
    if(err){
        ctx.err(err)
        return
    }

    const [err2,total] = await to(cookModel.count({where}))
    ctx.body = {code:200,msg:'获取成功',data,total:total}
})

module.exports = router.routes()