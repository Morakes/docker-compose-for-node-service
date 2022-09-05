const Router = require("@koa/router")
const { default: to } = require("await-to-js")
const { Op } = require("sequelize")
const router = new Router()
const scenicModel = require('../../../model/Scenic')


/**
 * @api {get} /web/scenic/getShowScenic 获取首页推荐景点
 * @apiGroup 名胜管理
*/

router.get("/getShowScenic",async ctx=>{
    const where = {isShow:1}
    const [err,data] = await to(scenicModel.findAll({where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})


/**
 * @api {post} /web/scenic/getScenic 获取所有景点
 * @apiGroup 名胜管理
 * @apiParam {Int} limit
 * @apiParam {Int} page
 * @apiParam {Object} entity
*/

router.post("/getScenic",async ctx=>{
    if(ctx.empty(['limit','page','entity'])) return
    const {limit,page} = ctx.request.body
    const entity = func.rmNull(ctx.request.body.entity)
    const arr = ['townId','tel','name','status',]
    const where = {}
    for(let item of arr){
        if(entity[item]){
            where[item] = {[Op.substring]:entity[item]}
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
    const [err2,total] = await to(scenicModel.count({where}))
    ctx.body = {code:200,msg:'获取成功',data,total:total}
})

/**
 * @api {post} /web/scenic/setDisplay 设置首页推荐
 * @apiGroup 名胜管理
 * @apiParam {Int} id 
*/
router.post('/setDisplay',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.request.body.id}
    const [err,data] = await to(scenicModel.update({isShow:1},{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功')
})

/**
 * @api {post} /web/scenic/removeDisplay 移除首页推荐
 * @apiGroup 名胜管理
 * @apiParam {Int} id 
*/
router.post('/removeDisplay',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.request.body.id}
    const [err,data] = await to(scenicModel.update({isShow:0},{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功')
})

/**
 * @api {post} /web/scenic/delScenic 删除名胜
 * @apiGroup 名胜管理
 * @apiParam {Int} id 
*/
router.delete('/delScenic/:id',async ctx=>{
    let query = ctx.request.url.split('/')
    query = query[query.length-1]
    const [err, data] = await to(
        scenicModel.destroy({
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
 * @api {get} /web/scenic/getStatistics 获取统计数据
 * @apiGroup 名胜管理
*/
router.get('/getStatistics',async ctx=>{
    const [err,data] = await to(scenicModel.findAll())
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
 * @api {post} /web/scenic/addScenic 添加名胜
 * @apiGroup 名胜管理
 * @apiParam {string} cover
 * @apiParam {string} imgList
 * @apiParam {string} intro
 * @apiParam {string} latitude
 * @apiParam {string} longitude
 * @apiParam {string} name
 * @apiParam {string} openDate
 * @apiParam {string} specificAddress
 * @apiParam {string} tel
 * @apiParam {string} ticketInfo
 * @apiParam {string} townId
*/
router.post('/addScenic',async ctx=>{
    const query = ctx.request.body
    query.imgList = JSON.stringify(query.imgList)
    console.log(query)
    const [err,data] = await to(scenicModel.create(query))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('添加成功')
})

/**
 * @api {post} /web/scenic/scenicDetail 名胜详情
 * @apiGroup 名胜管理
 * @apiParam {int} id
*/
router.get('/scenicDetail',async ctx=>{
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



/**
 * @api {post} /web/scenic/updScenic 修改名胜
 * @apiGroup 名胜管理
 * @apiParam {string} id
 * @apiParam {string} cover
 * @apiParam {string} imgList
 * @apiParam {string} intro
 * @apiParam {string} latitude
 * @apiParam {string} longitude
 * @apiParam {string} name
 * @apiParam {string} openDate
 * @apiParam {string} specificAddress
 * @apiParam {string} tel
 * @apiParam {string} ticketInfo
 * @apiParam {string} townId
*/

router.put('/updScenic',async ctx=>{
    if(ctx.empty(['id'])) return
    const query = ctx.request.body
    const where = {id:query.id}
    query.imgList = JSON.stringify(query.imgList)
    const [err,data] = await to(scenicModel.update(query,{where}))
    if(err){
        ctx.err(err)
        return 
    }
    ctx.suc('更新成功')
})

module.exports = router.routes()