const router =new require("@koa/router")()
const { default: to } = require("await-to-js")
const { Op } = require("sequelize")
const seasonModel = require('../../../model/Season')

/**
 * @api {get} /applets/season/getShow 获取首页推荐
 * @apiGroup 小程序时令管理
*/

router.get("/getShow",async ctx=>{
    const where = {isShow:1}
    const [err,data] = await to(seasonModel.findAll({where}))
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
    ctx.suc('获取成功',{liked,num,list:data})
})

router.get('/getDetails',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.query.id}
    const [err,data] = await to(seasonModel.findOne({where}))
    if(err){
        ctx.err(err)
        return
    }
    // data.imgList = data.imgList?JSON.parse(data.imgList):''
    ctx.suc('获取成功',data)
})

router.get('/getSeasonList',async ctx=>{
    if(ctx.empty(['limit','page'])) return
    const {limit,page} = ctx.query
    const query = func.rmNull(ctx.query)
    const arr = ['name']
    const where = {}
    for(let item of arr){
        if(query[item]){
            where[item] = {[Op.substring]:query[item]}
        }
    }
    const [err,data] = await to(seasonModel.findAll({
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
    ctx.suc('获取成功',{liked,num,list:data})
})

module.exports = router.routes()