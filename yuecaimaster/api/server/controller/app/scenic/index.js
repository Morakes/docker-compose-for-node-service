const Router = require("@koa/router")
const { default: to } = require("await-to-js")
const { Op } = require("sequelize")
const router = new Router()
const scenicModel = require('../../../model/Scenic')

/**
 * @api {get} /web/scenic/getShowList 获取首页推荐景点
 * @apiGroup 小程序-名胜管理
*/

router.get("/getShowList",async ctx=>{
    const where = {isShow:1}
    const [err,data] = await to(scenicModel.findAll({where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})


/**
 * @api {post} /applets/scenic/getDetails 名胜详情
 * @apiGroup 名小程序--胜管理
 * @apiParam {int} id
*/
router.get('/getDetails',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.query.id}
    const [err,data] = await to(scenicModel.findOne({where}))
    if(err){
        ctx.err(err)
        return
    }
    data.imgList = data.imgList?JSON.parse(data.imgList):''
    ctx.suc('获取成功',data)
})


router.get('/getScenic',async ctx=>{
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
    const [err,data] = await to(scenicModel.findAll({
        where,
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))
    if(err){
        ctx.err('获取失败',err) 
        return
    }
    ctx.body = {code:200,msg:'获取成功',data}
})



module.exports = router.routes()