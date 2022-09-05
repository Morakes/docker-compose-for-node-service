const router = new require('@koa/router')()
const {default:to} = require('await-to-js')
const merchantModel = require('../../../model/Merchant')
const { Op } = require("sequelize")

router.post('/merchantList',async ctx=>{
    if(ctx.empty(['limit','page','entity'])) return
    const {limit,page} = ctx.request.body
    const entity = func.rmNull(ctx.request.body.entity)
    const arr = ['restName','type']
    const where = {status:'已通过'}
    for(let item of arr){
        if(entity[item]){
            where[item] = {[Op.substring]:entity[item]}
        }
    }
    console.log(where)
    const [err,data] = await to(merchantModel.findAll({
        where,
        include:'user',
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }
    ))

    const [err2,total] = await to(merchantModel.count({
        where,
        include:'user',
    }))
    ctx.body = {code:200,msg:'获取成功',data,total:total}
    
})


router.get('/getDetails',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.query.id}
    const [err,data] = await to(merchantModel.findOne({
        where,
        include:'user'
    }))
    if(err){
        ctx.err(err)
        return
    }
    data.imgList = data.imgList?JSON.parse(data.imgList):''
    ctx.suc('获取成功',data)
})




module.exports = router.routes()