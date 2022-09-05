const router = new require('@koa/router')()
const customModel = require('../../../model/Custom')
const { default: to } = require('await-to-js')
const {Op} = require('sequelize')

router.post('/getUserList',async ctx=>{
    if(ctx.empty(['limit','page','entity'])) return
    const {limit,page} = ctx.request.body
    const entity = func.rmNull(ctx.request.body.entity)
    console.log(entity)
    const arr = ['nickname','loginTel','status']
    const where = {}
    for(let item of arr){
        if(entity[item]){
            where[item] = {[Op.substring]:entity[item]}
        }
    }
    const [err,data] = await to(customModel.findAll({
        where,
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))
    if(err){
        ctx.err('获取失败',err) 
        return
    }
    const [err2,total] = await to(customModel.count({where}))
    ctx.body = {code:200,msg:'获取成功',data,total:total}
})

module.exports = router.routes()