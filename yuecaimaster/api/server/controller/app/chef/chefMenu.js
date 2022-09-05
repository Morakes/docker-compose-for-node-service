const router = new require('@koa/router')()
const { default: to } = require('await-to-js')
const chiefMenuModel = require('../../../model/ChiefMenu')

router.get('/getList',async ctx=>{
    if(ctx.empty(['chefId'])) return
    const {limit,page} = ctx.query
    const where = {chefId:ctx.query.chefId}
    const [err,data] = await to(chiefMenuModel.findAll({
        where,
        // limit:parseInt(limit),
        // offset:(parseInt((page-1)) * limit)
    }))
    if(err){
        ctx.err(err)
        return
    }
    for(let item in data){
        if(data[item].type === 0){
            data[item].dataValues.content = undefined
        }else{
            data[item].dataValues.jumpLink = undefined
        }
    }
    const liked = []
    const num = []
    ctx.body = {code:200,msg:'获取成功',data:{list:data,liked,num}}
})



router.get('/getDetails',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.query.id}
    const [err,data] = await to(chiefMenuModel.findOne({where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})

module.exports = router.routes()