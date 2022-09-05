const router =new require("@koa/router")()
const { default: to } = require("await-to-js")
const { Op } = require("sequelize")
const seasonModel = require('../../../model/Season')

/**
 * @api {get} /web/season/getShowseason 获取首页推荐
 * @apiGroup 时令管理
*/

router.get("/getShow",async ctx=>{
    const where = {isShow:1}
    const [err,data] = await to(seasonModel.findAll({where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})


/**
 * @api {post} /web/season/getseason 获取所有时令
 * @apiGroup 时令管理
 * @apiParam {Int} limit
 * @apiParam {Int} page
 * @apiParam {Object} entity
*/

router.post("/getSeason",async ctx=>{
    if(ctx.empty(['limit','page','entity'])) return
    const {limit,page} = ctx.request.body
    const entity = func.rmNull(ctx.request.body.entity)
    const arr = ['townId','type','name','status',]
    const where = {}
    for(let item of arr){
        if(entity[item]){
            where[item] = {[Op.substring]:entity[item]}
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
    const [err2,total] = await to(seasonModel.count({where}))
    ctx.body = {code:200,msg:'获取成功',data,total:total}
})

/**
 * @api {post} /web/season/setDisplay 设置首页推荐
 * @apiGroup 时令管理
 * @apiParam {Int} id 
*/
router.post('/setDisplay',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.request.body.id}
    const [err,data] = await to(seasonModel.update({isShow:1},{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功')
})

/**
 * @api {post} /web/season/removeDisplay 移除首页推荐
 * @apiGroup 时令管理
 * @apiParam {Int} id 
*/
router.post('/removeDisplay',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.request.body.id}
    const [err,data] = await to(seasonModel.update({isShow:0},{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功')
})

/**
 * @api {post} /web/season/delseason 删除时令
 * @apiGroup 时令管理
 * @apiParam {Int} id 
*/
router.delete('/delseason/:id',async ctx=>{
    let query = ctx.request.url.split('/')
    query = query[query.length-1]
    const [err, data] = await to(
        seasonModel.destroy({
        where: {
          id: query,
        },
      })
    )
    if(err){
        ctx.err(err)
        return 
    }
    ctx.suc('删除成功')
})


/**
 * @api {get} /web/season/getStatistics 获取统计数据
 * @apiGroup 时令管理
*/
router.get('/getStatistics',async ctx=>{
    const [err,data] = await to(seasonModel.findAll())
    const result = {count1:0,count2:0,count3:0}
    result.count1 = data.length
    for(let item of data){
        if(item.status == '展示中'){
            result.count2++
        }else{
            result.count3++
        }
        
    }
    ctx.suc('获取成功',result)
})

/**
 * @api {post} /web/season/addition 添加时令
 * @apiGroup 时令管理
 * @apiParam {string} cover
 * @apiParam {string} name
 * @apiParam {string} townId
 * @apiParam {folat} ingredients
 * @apiParam {int} type
 * @apiParam {string} content
 * @apiParam {string} junkLink
*/
router.post('/addition',async ctx=>{
    const query = ctx.request.body
    const [err,data] = await to(seasonModel.create(query))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('添加成功')
})

/**
 * @api {post} /web/season/seasonDetail 时令详情
 * @apiGroup 时令管理
 * @apiParam {int} id
*/
router.get('/seasonDetail',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.query.id}
    const [err,data] = await to(seasonModel.findOne({where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})



/**
 * @api {post} /web/season/updseason 修改时令
 * @apiGroup 时令管理
 * @apiParam {string} id
 * @apiParam {string} cover
 * @apiParam {string} name
 * @apiParam {string} townId
 * @apiParam {folat} ingredients
 * @apiParam {int} type
 * @apiParam {string} content
 * @apiParam {string} junkLink
*/

router.put('/updseason',async ctx=>{
    if(ctx.empty(['id'])) return
    const query = ctx.request.body
    const where = {id:query.id}
    query.imgList = JSON.stringify(query.imgList)
    const [err,data] = await to(seasonModel.update(query,{where}))
    if(err){
        ctx.err(err)
        return 
    }
    ctx.suc('更新成功')
})

module.exports = router.routes()