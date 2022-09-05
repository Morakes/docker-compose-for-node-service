const router = new require('@koa/router')()
const { default: to } = require('await-to-js')
const dishesfModel = require('../../../model/Dishes')
const {Op} = require('sequelize')


/**
 * @api {get} /applets/dishes/getShowList 获取推荐菜谱
 * @apiGroup 小程序--餐厅菜品管理
 * @apiParam {Int} restId
*/
router.get("/getShowList",async ctx=>{
    if(ctx.empty(['restId'])) return
    const where = {isShow:1,restId:ctx.query.restId}
    const [err,data] = await to(dishesfModel.findAll({where}))
    if(err){
        ctx.err(err)
        return
    }
    const liked = []
    const num = []
    ctx.suc('获取成功',{list:data,liked,num})
})

/**
 * @api {get} /applets/dishes/getDishesList 获取菜谱
 * @apiGroup 小程序--餐厅菜品管理
 * @apiParam {Int} restId
*/
router.get("/getDishesList",async ctx=>{
    if(ctx.empty(['restId'])) return
    const {limit,page} = ctx.query
    const where = {restId:ctx.query.restId}
    const [err,data] = await to(dishesfModel.findAll({
        where,
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))
    if(err){
        ctx.err(err)
        return
    }
    const liked = []
    const num = []
    ctx.suc('获取成功',{list:data,liked,num})
})



/**
 * @api {get} /applets/dishes/getNotShow 获取未推荐菜谱
 * @apiGroup 小程序--餐厅菜品管理
 * @apiParam {Int} restId
*/
router.get("/getNotShow",async ctx=>{
    if(ctx.empty(['restId'])) return
    const where = {isShow:0,restId:ctx.query.restId}
    const [err,data] = await to(dishesfModel.findAll({where}))
    if(err){
        ctx.err(err)
        return
    }
    const liked = []
    const num = []
    ctx.suc('获取成功',{list:data,liked,num})
})



/**
 * @api {get} /applets/dishes/addDishes 添加菜谱
 * @apiGroup 小程序--餐厅菜品管理
 * @apiParam {Int} restId
*/
router.post('/addDishes',async ctx=>{
    if(ctx.empty(['restId'])) return
    const query = ctx.request.body
    const [err,rows] = await to(dishesfModel.create(query))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('添加成功')
})


router.get('/dishesDetails',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.query.id}
    const [err,data] = await to(dishesfModel.findOne({where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})





/**
 * @api {get} /applets/dishes/updDishes 更新菜谱
 * @apiGroup 小程序--餐厅菜品管理
 * @apiParam {Int} restId
*/
router.put('/updDishes',async ctx=>{
    if(ctx.empty(['restId'])) return
    const query = ctx.request.body
    const where = {
        id:query.id
    }
    const [err,rows] = await to(dishesfModel.update(query,{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功')
})


router.delete('/delDishes/:id',async ctx=>{
    let query = ctx.request.url.split('/')
    query = query[query.length-1]
    const [err, data] = await to(
        dishesfModel.destroy({
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
 * @api {post} /web/dishes/setDisplay 设置推荐
 * @apiGroup 小程序--餐厅菜品管理
 * @apiParam {Int} id 
*/
router.post('/setDisplay',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.request.body.id}
    const [err,data] = await to(dishesfModel.update({isShow:1},{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功')
})

/**
 * @api {post} /web/dishes/removeDisplay 移除推荐
 * @apiGroup 小程序--餐厅菜品管理
 * @apiParam {Int} id 
*/
router.post('/removeDisplay',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.request.body.id}
    const [err,data] = await to(dishesfModel.update({isShow:0},{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功')
})

module.exports = router.routes()