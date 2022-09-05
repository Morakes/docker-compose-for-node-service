const router = new require('@koa/router')()
const { default: to } = require('await-to-js')
const dishesModel = require('../../../model/Dishes')

router.get('/getList',async ctx=>{
    if(ctx.empty(['restId','limit','page'])) return
    const {limit,page} = ctx.query
    const where = {restId:ctx.query.restId}
    const [err,data] = await to(dishesModel.findAll({
        where,
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))
    if(err){
        ctx.err(err)
        return
    }

    const [err2,total] = await to(dishesModel.count({where}))
    // data['label'] = data['label']?JSON.parse(data['label']):''
    ctx.body = {code:200,msg:'获取成功',data,total:total}
})


router.get('/getDetail',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.query.id}
    const [err,data] = await to(dishesModel.findOne({
        where,
    }))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})


module.exports = router.routes()