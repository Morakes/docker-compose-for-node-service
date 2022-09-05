const router = new require('@koa/router')()
const { default: to } = require('await-to-js')
const cookModel = require('../../../model/Cook')

/**
 * @api {post} /applets/cook/getCookList 添加厨师
 * @apiGroup 小程序--餐厅厨师
 * @apiParam {int} restId
 * @apiParam {Int} limit
 * @apiParam {Int} page
*/
router.get('/getCookList',async ctx=>{
    if(ctx.empty(['restId','limit','page'])) return
    const {limit,page} = ctx.query
    const where = {restId:ctx.query.restId}
    const [err,data] = await to(cookModel.findAll({
        where,
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))
    if(err){
        ctx.err(err)
        return
    }

    ctx.body = {code:200,msg:'获取成功',data}
})


/**
 * @api {post} /applets/cook/addCook 添加厨师
 * @apiGroup 小程序--餐厅厨师
 * @apiParam {int} restId
*/
router.post('/addCook',async ctx=>{
    if(ctx.empty(['restId'])) return
    const query = ctx.request.body
    const [err,data] = await to(cookModel.create(query))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('添加成功')
})

/**
 * @api {post} /applets/cook/getCookDetails 厨师详情
 * @apiGroup 小程序--餐厅厨师
 * @apiParam {int} id
*/
router.get('/getCookDetails',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.query.id}
    const [err,data] = await to(cookModel.findOne({where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})
/**
 * @api {post} /applets/cook/updCook 更新厨师
 * @apiGroup 小程序--餐厅厨师
 * @apiParam {int} id
*/

router.put('/updCook',async ctx=>{
    if(ctx.empty(['id'])) return
    const query = ctx.request.body
    const where = {id:query.id}
    const [err,data] = await to(cookModel.update(query,{where}))
    if(err){
        ctx.err(err)
        return 
    }
    ctx.suc('更新成功')
})


/**
 * @api {post} /applets/cook/delCook 删除厨师
 * @apiGroup 小程序--餐厅厨师
 * @apiParam {Int} id 
*/
router.delete('/delCook/:id',async ctx=>{
    let query = ctx.request.url.split('/')
    query = query[query.length-1]
    const [err, data] = await to(
        cookModel.destroy({
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