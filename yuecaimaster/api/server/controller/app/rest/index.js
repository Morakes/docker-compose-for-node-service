const router = new require('@koa/router')()
const { default: to } = require('await-to-js')
const restaurantModel = require('../../../model/Restaurant')
const restViewModel = require('../../../model/RestView')
const colModel = require('../../../model/Collection')
const {Op} = require('sequelize')
const func = require('../../../../utils/func')

/**
 * @api {get} /applets/rest/showRest 获取首页推荐餐厅
 * @apiGroup 小程序--餐厅管理
*/

router.get('/showRest',async ctx=>{
    const where = {isShow:1}
    const {latitude,longitude} = ctx.query
    const [err,data] = await to(restaurantModel.findAll({
        where,
        include:'town'
    }))
    if(err){
        ctx.err(err)
        return
    }
    for(let item in data){
        data[item].dataValues.townName = data[item].town.name
        data[item].dataValues.distance = func.GetDistance1(longitude,latitude,data[item].longitude,data[item].latitude)
        data[item].dataValues.recommend = await colModel.count({
            where:{
                restId:data[item].id
            }
        })
    }

    ctx.suc('获取成功',data)
})


/**
 * @api {get} /applets/rest/restList 获取餐厅列表
 * @apiGroup 小程序--餐厅管理
*/
router.post('/restList',async ctx=>{
    if(ctx.empty(['limit','page','entity'])) return
    const {limit,page} = ctx.request.body
    const {latitude,longitude} = ctx.request.body.entity
    const entity = func.rmNull(ctx.request.body.entity)
    const arr = ['restName','type','townId']
    const where = {}
    for(let item of arr){
        if(entity[item]){
            where[item] = {[Op.substring]:entity[item]}
        }
    }
    const [err,data] = await to(restaurantModel.findAll({
        where,
        include:'town',
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))

    for(let item in data){
        data[item].dataValues.townName = data[item].town.name
        data[item].dataValues.distance = func.GetDistance1(longitude,latitude,data[item].longitude,data[item].latitude)
        data[item].dataValues.recommend = await colModel.count({
            where:{
                restId:data[item].id
            }
        })
    }

    if(err){
        ctx.err('获取失败',err) 
        return
    }
    ctx.body = {code:200,msg:'获取成功',data,}
})


router.get('/getRestaurant',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.query.id}
    const [err,data] = await to(restaurantModel.findOne({
        where,
    }))
    if(err){
        ctx.err(err)
        return
    }
    // 判断是否收藏
    const [err2,isCollect] = await to(colModel.findOne({
        where:{
            userId:ctx.query.userId,
            restId:ctx.query.id
        }
    }))
    if(isCollect){
        data.dataValues['isCollect'] = 1
        data.dataValues['collectId'] = isCollect.id
    }else{
        data.dataValues['isCollect'] = 0
    }

    ctx.suc('获取成功',data)

    // 餐厅访问量
    const res = await restViewModel.findOne({where:{restId:ctx.query.id}})
    if(res){
        await restViewModel.update({view:++res.view,restId:ctx.query.id},{where:{id:res.id}})
    }else{
        await restViewModel.create({view:1,restId:ctx.query.id})
    }
})

router.get('/getRest',async ctx=>{
    if(ctx.empty(['userId'])) return
    const where = {
        userId:ctx.query.userId
    }
    const [err,rows] = await to(restaurantModel.findOne(
        {
            where,
            include:'town'
        }
        
    ))
    if(rows){
        rows.dataValues['townName'] = rows.town.name
        ctx.suc('获取成功',rows)
        return
    }
    ctx.suc('获取成功')
})

router.post('/addRestaurant',async ctx=>{
    const query = ctx.request.body
    query['status'] = '展示中'
    query['isShow'] = 0
    const [err,rows] = await to(restaurantModel.create(query))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('添加成功')
})

router.put('/updRestaurant',async ctx=>{
    const query = ctx.request.body
    const where = {
        id:query.id
    }
    const [err,rows] = await to(restaurantModel.update(query,{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功')
})

module.exports = router.routes()