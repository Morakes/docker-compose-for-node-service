const router = new require('@koa/router')()
const { default: to } = require('await-to-js')
const specialtyModel = require('../../../model/Specialty')
const { Op } = require("sequelize")

/**
 * @api {get} /applets/specialty/getShow 获取首页推荐特产
 * @apiGroup 小程序--特产管理
*/
router.get("/getShow",async ctx=>{
    const where = {isShow:1}
    const [err,data] = await to(specialtyModel.findAll({where}))
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
    const num =[]
    ctx.suc('获取成功',{list:data,liked,num})
})


/**
 * @api {post} /applets/scenic/getDetails 特产详情
 * @apiGroup 小程序--特产管理
 * @apiParam {int} id
*/
router.get('/getDetails',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.query.id}
    const [err,data] = await to(specialtyModel.findOne({where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})


router.get("/getSpecialtyList",async ctx=>{
    if(ctx.empty(['limit','page'])) return
    const {limit,page} = ctx.query
    const entity = func.rmNull(ctx.query)
    const arr = ['name']
    const where = {}
    for(let item of arr){
        if(entity[item]){
            where[item] = {[Op.substring]:entity[item]}
        }
    }
    const [err,data] = await to(specialtyModel.findAll({
        where,
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))
    if(err){
        ctx.err('获取失败',err) 
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



module.exports = router.routes()