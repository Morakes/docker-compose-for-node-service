const router = new require('@koa/router')()
const { default: to } = require('await-to-js')
const chiefModel = require('../../../model/Chief')
const {Op} = require('sequelize')

/**
 * @api {get} /web/chef/getShowChef 获取首页推荐厨师
 * @apiGroup 厨师管理
*/
router.get("/getShowChef",async ctx=>{
    const where = {isShow:1}
    const [err,data] = await to(chiefModel.findAll({where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})

/**
 * @api {post} /web/chef/getChef 获取所有厨师
 * @apiGroup 厨师管理
 * @apiParam {Int} limit
 * @apiParam {Int} page
 * @apiParam {Object} entity
*/

router.post("/getChef",async ctx=>{
    if(ctx.empty(['limit','page','entity'])) return
    const {limit,page} = ctx.request.body
    const entity = func.rmNull(ctx.request.body.entity)
    const arr = ['name','restaurant','label']
    const where = {}
    for(let item of arr){
        if(entity[item]){
            where[item] = {[Op.substring]:entity[item]}
        }
    }
    const [err,data] = await to(chiefModel.findAll({
        where,
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))
    if(err){
        ctx.err('获取失败',err) 
        return
    }
    const [err2,total] = await to(chiefModel.count({where}))
    ctx.body = {code:200,msg:'获取成功',data,total:total}
})


/**
 * @api {post} /web/chef/setDisplay 设置首页推荐
 * @apiGroup 厨师管理
 * @apiParam {Int} id 
*/
router.post('/setDisplay',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.request.body.id}
    const [err,data] = await to(chiefModel.update({isShow:1},{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功')
})


/**
 * @api {post} /web/chef/removeDisplay 移除首页推荐
 * @apiGroup 厨师管理
 * @apiParam {Int} id 
*/
router.post('/removeDisplay',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.request.body.id}
    const [err,data] = await to(chiefModel.update({isShow:0},{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功')
})


/**
 * @api {post} /web/chef/delChef 删除厨师
 * @apiGroup 厨师管理
 * @apiParam {Int} id 
*/
router.delete('/delChef/:id',async ctx=>{
    let query = ctx.request.url.split('/')
    query = query[query.length-1]
    const [err, data] = await to(
        chiefModel.destroy({
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
 * @api {get} /web/chef/getStatistics 获取统计数据
 * @apiGroup 厨师管理
*/
router.get('/getStatistics',async ctx=>{
    const [err,data] = await to(chiefModel.findAll())
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
 * @api {post} /web/chef/addChef 添加厨师
 * @apiGroup 厨师管理
 * @apiParam {string} cover
 * @apiParam {string} name
 * @apiParam {string} job
 * @apiParam {string} restaurant
 * @apiParam {string} label
 * @apiParam {string} intro
*/
router.post('/addChef',async ctx=>{
    const query = ctx.request.body
    const [err,data] = await to(chiefModel.create(query))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('添加成功')
})


/**
 * @api {post} /web/chef/updChef 更新厨师
 * @apiGroup 厨师管理
 * @apiParam {int} id
 * @apiParam {string} cover
 * @apiParam {string} name
 * @apiParam {string} job
 * @apiParam {string} restaurant
 * @apiParam {string} label
 * @apiParam {string} intro
*/
router.put('/updChef',async ctx=>{
    if(ctx.empty(['id'])) return
    const query = ctx.request.body
    const where = {id:query.id}
    const [err,data] = await to(chiefModel.update(query,{where}))
    if(err){
        ctx.err(err)
        return 
    }
    ctx.suc('更新成功')
})


/**
 * @api {post} /web/chef/getDetail 厨师详情
 * @apiGroup 厨师管理
 * @apiParam {int} id
*/
router.get('/getDetail',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.query.id}
    const [err,data] = await to(chiefModel.findOne({where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})

module.exports = router.routes()