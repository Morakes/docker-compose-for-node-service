const router = new require('@koa/router')()
const { default: to } = require('await-to-js')
const merchantModel = require('../../../model/Merchant')
const customModel = require('../../../model/Custom')
const {Op} = require('sequelize')

/**
 * @api {post} /web/apply/applyList 获取未审核列表
 * @apiGroup 审核管理
 * @apiParam {Int} limit
 * @apiParam {Int} page
 * @apiParam {Object} entity
*/
router.post('/applyList',async ctx=>{
    if(ctx.empty(['limit','page','entity'])) return
    const {limit,page} = ctx.request.body
    const entity = func.rmNull(ctx.request.body.entity)
    const arr = ['restName','type']
    const where = {}
    for(let item of arr){
        if(entity[item]){
            where[item] = {[Op.substring]:entity[item]}
        }
    }
    where['status'] = '待审核'
    const [err,data] = await to(merchantModel.findAll({
        where,
        include:{
            model:customModel,
            as:'user',
            attributes:['id','provideTel','nickname','name']
        },
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))
    if(err){
        ctx.err(err)
        return
    }
    const [err2,total] = await to(merchantModel.count({where}))
    ctx.body = {code:200,msg:'获取成功',data,total:total}
})


/**
 * @api {post} /web/apply/recordsList 获取已审核列表
 * @apiGroup 审核管理
 * @apiParam {Int} limit
 * @apiParam {Int} page
 * @apiParam {Object} entity
*/
router.post('/recordsList',async ctx=>{
    if(ctx.empty(['limit','page','entity'])) return
    const {limit,page} = ctx.request.body
    const entity = func.rmNull(ctx.request.body.entity)
    const where={}
    where['status'] = {
        [Op.or]:['已通过','已拒绝']
    }
    const arr = ['restName','type','status']
    for(let item of arr){
        if(entity[item]){
            where[item] = {[Op.substring]:entity[item]}
        }
    }
    
    const [err,data] = await to(merchantModel.findAll({
        where,
        include:{
            model:customModel,
            as:'user',
            attributes:['id','provideTel','nickname','name']
        },
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))
    if(err){
        ctx.err(err)
        return
    }
    const [err2,total] = await to(merchantModel.count({where}))
    ctx.body = {code:200,msg:'获取成功',data,total:total}
})



/**
 * @api {get} /web/apply/getStatistics 获取统计数据
 * @apiGroup 审核管理
*/
router.get('/getStatistics',async ctx=>{
    const [err,data] = await to(merchantModel.findAll())
    const result = {count1:0,count2:0,count3:0,count4:0}
    result.count1 = data.length
    for(let item of data){
        if(item.status === '待审核'){
            result.count2++
        }else if(item.status === '已通过'){
            result.count3++
        }else{
            result.count4++
        }
        
    }
    ctx.suc('获取成功',result)
})


/**
 * @api {post} /web/apply/applyDetail 审核详情
 * @apiGroup 审核管理
 * @apiParam {int} id
*/
router.get('/applyDetail',async ctx=>{
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
    data['imgList'] = data['imgList']?JSON.parse(data['imgList']):''
    ctx.suc('获取成功',data)
})


router.put('/updApply',async ctx=>{
    if(ctx.empty['id','status']) return
    const query = ctx.request.body
    const where = {id:query.id}
    const [err,data] = await to(merchantModel.update(query,{where}))
    if(err){
        ctx.err(err)
        return 
    }
    ctx.suc('更新成功')
})


module.exports = router.routes()