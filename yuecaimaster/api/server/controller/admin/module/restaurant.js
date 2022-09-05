const router = new require('@koa/router')()
const { default: to } = require('await-to-js')
const restaurantModel = require('../../../model/Restaurant')
const townModel = require('../../../model/Town')
const merchantModel = require('../../../model/Merchant')
const {Op} = require('sequelize')

/**
 * @api {get} /web/rest/showList 获取首页推荐餐厅
 * @apiGroup 餐厅管理
*/
router.get('/showList',async ctx=>{
    const where = {isShow:1}
    const [err,data] = await to(restaurantModel.findAll({where}))
    if(err){
        ctx.err(err)
        return
    }
    
    ctx.suc('获取成功',data)
})

/**
 * @api {post} /web/rest/getRestList 获取所有餐厅
 * @apiGroup 餐厅管理
 * @apiParam {Int} limit
 * @apiParam {Int} page
 * @apiParam {Object} entity
*/

router.post("/getRestList",async ctx=>{
    if(ctx.empty(['limit','page','entity'])) return
    const {limit,page} = ctx.request.body
    const entity = func.rmNull(ctx.request.body.entity)
    const arr = ['restName','tel','specificAddress','status']
    const where = {}
    for(let item of arr){
        if(entity[item]){
            where[item] = {[Op.substring]:entity[item]}
        }
    }
    const [err,data] = await to(restaurantModel.findAll({
        where,
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))
    if(err){
        ctx.err('获取失败',err) 
        return
    }
    const [err2,total] = await to(restaurantModel.count({where}))
    ctx.body = {code:200,msg:'获取成功',data,total:total}
})


/**
 * @api {post} /web/rest/setDisplay 设置首页推荐
 * @apiGroup 餐厅管理
 * @apiParam {Int} id 
*/
router.post('/setDisplay',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.request.body.id}
    const [err,data] = await to(restaurantModel.update({isShow:1},{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功')
})


/**
 * @api {post} /web/rest/removeDisplay 移除首页推荐
 * @apiGroup 餐厅管理
 * @apiParam {Int} id 
*/
router.post('/removeDisplay',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.request.body.id}
    const [err,data] = await to(restaurantModel.update({isShow:0},{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功')
})


/**
 * @api {post} /web/specialty/delScenic 删除厨师
 * @apiGroup 厨师管理
 * @apiParam {Int} id 
*/
router.delete('/delRest/:id',async ctx=>{
    let query = ctx.request.url.split('/')
    query = query[query.length-1]
    const [err, data] = await to(
        restaurantModel.destroy({
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
 * @api {get} /web/rest/getStatistics 获取统计数据
 * @apiGroup 餐厅管理
*/
router.get('/getStatistics',async ctx=>{
    const [err,data] = await to(restaurantModel.findAll())
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
 * @api {post} /web/rest/updRest 更新餐厅
 * @apiGroup 餐厅管理
 * @apiParam {int} id
 * @apiParam {string} status
*/
router.put('/updRest',async ctx=>{
    if(ctx.empty(['id'])) return
    const query = ctx.request.body
    const where = {id:query.id}
    const [err,data] = await to(restaurantModel.update(query,{where}))
    if(err){
        ctx.err(err)
        return 
    }
    ctx.suc('更新成功')
})


/**
 * @api {get} /web/rest/restInfo 获取餐厅基本信息
 * @apiGroup 餐厅管理
 * @apiParam {int} id
*/
router.get('/restInfo',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.query.id}
    const [err,data] = await to(restaurantModel.findOne({
        where,
        include:'user'
    }))
    
    const [err2,town] = await to(townModel.findOne({
        where:{
            id:data.townId
        }
    }))
    data.dataValues['townName'] = town.name

    const [err3,merchant] = await to(merchantModel.findOne({
        where:{
            userId:data.userId
        }
    }))
    merchant['imgList'] = JSON.parse(merchant['imgList'])
    ctx.body = {code:200,msg:'获取成功',data:{rest:data,merch:merchant}}
})


module.exports = router.routes()