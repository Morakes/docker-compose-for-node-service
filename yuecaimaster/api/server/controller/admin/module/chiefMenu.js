const router = new require('@koa/router')()
const { default: to } = require('await-to-js')
const chiefMenuModel = require('../../../model/ChiefMenu')
const {Op} = require('sequelize')

/**
 * @api {get} /web/chefMenu 获取菜谱
 * @apiGroup 厨师菜谱
 * @apiParam {int} limit
 * @apiParam {int} page
 * @apiParam {int} chefId
*/
router.get('/getMenuList',async ctx=>{
    if(ctx.empty(['limit','page','chefId'])) return
    const {limit,page,chefId} = ctx.query
    const where = {chefId:chefId}
    const [err,data] = await to(chiefMenuModel.findAll({
        where,
        limit:parseInt(limit),
        offset:(parseInt(page-1) * limit)
    }))
    if(err){
        ctx.err('获取失败',err) 
        return
    }
    const [err2,total] = await to(chiefMenuModel.count({where}))
    ctx.body = {code:200,msg:'获取成功',data,total:total}
})


/**
 * @api {post} /web/chefMenu/getMenuDetails 菜谱详情
 * @apiGroup 厨师菜谱
 * @apiParam {int} id
*/
router.get('/getMenuDetails',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.query.id}
    const [err,data] = await to(chiefMenuModel.findOne({where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})


/**
 * @api {post} /web/chefMenu/addMenu 添加菜谱
 * @apiGroup 厨师菜谱
*/
router.post('/addMenu',async ctx=>{
    const query = ctx.request.body
    const [err,data] = await to(chiefMenuModel.create(query))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('添加成功')
})


router.put('/updMenu',async ctx=>{
    if(ctx.empty(['id'])) return
    const query = ctx.request.body
    const where = {id:query.id}
    const [err,data] = await to(chiefMenuModel.update(query,{where}))
    if(err){
        ctx.err(err)
        return 
    }
    ctx.suc('更新成功')
})


/**
 * @api {post} /web/chefMenu/delMenu 删除菜谱
 * @apiGroup 厨师菜谱
 * @apiParam {Int} id 
*/
router.delete('/delMenu/:id',async ctx=>{
    let query = ctx.request.url.split('/')
    query = query[query.length-1]
    const [err, data] = await to(
        chiefMenuModel.destroy({
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

module.exports = router.routes()