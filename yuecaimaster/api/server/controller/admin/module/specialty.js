const router = new require('@koa/router')()
const { default: to } = require('await-to-js')
const specialtyModel = require('../../../model/Specialty')
const { Op } = require("sequelize")


/**
 * @api {get} /web/specialty/getShow 获取首页推荐特产
 * @apiGroup 特产管理
*/
router.get("/getShow",async ctx=>{
    const where = {isShow:1}
    const [err,data] = await to(specialtyModel.findAll({where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})


/**
 * @api {post} /web/specialty/getSpecialty 获取所有特产
 * @apiGroup 特产管理
 * @apiParam {Int} limit
 * @apiParam {Int} page
 * @apiParam {Object} entity
*/

router.post("/getSpecialty",async ctx=>{
    if(ctx.empty(['limit','page','entity'])) return
    const {limit,page} = ctx.request.body
    const entity = func.rmNull(ctx.request.body.entity)
    const arr = ['name','status','type']
    const where = {}
    for(let item of arr){
        if(entity[item]){
            where[item] = {[Op.substring]:entity[item]}
        }
    }
    const [err,data] = await to(specialtyModel.findAll({
        where,
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))
    if(err){
        ctx.err('获取失败',err) 
        return
    }
    const [err2,total] = await to(specialtyModel.count({where}))
    ctx.body = {code:200,msg:'获取成功',data,total:total}
})


/**
 * @api {post} /web/specialty/setDisplay 设置首页推荐
 * @apiGroup 特产管理
 * @apiParam {Int} id 
*/
router.post('/setDisplay',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.request.body.id}
    const [err,data] = await to(specialtyModel.update({isShow:1},{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功')
})

/**
 * @api {post} /web/specialty/removeDisplay 移除首页推荐
 * @apiGroup 特产管理
 * @apiParam {Int} id 
*/
router.post('/removeDisplay',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.request.body.id}
    const [err,data] = await to(specialtyModel.update({isShow:0},{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功')
})


/**
 * @api {post} /web/specialty/delScenic 删除名胜
 * @apiGroup 特产管理
 * @apiParam {Int} id 
*/
router.delete('/delSpecialty/:id',async ctx=>{
    let query = ctx.request.url.split('/')
    query = query[query.length-1]
    const [err, data] = await to(
        specialtyModel.destroy({
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
 * @api {get} /web/specialty/getStatistics 获取统计数据
 * @apiGroup 名特管理
*/
router.get('/getStatistics',async ctx=>{
    const [err,data] = await to(specialtyModel.findAll())
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
 * @api {post} /web/specialty/addSpecialty 添加特产
 * @apiGroup 特产管理
 * @apiParam {string} cover
 * @apiParam {string} topImg
 * @apiParam {string} name
 * @apiParam {string} townId
 * @apiParam {folat} originalPrice
 * @apiParam {folat} discountPrice
 * @apiParam {int} type
 * @apiParam {string} content
 * @apiParam {string} junkLink
*/
router.post('/addSpecialty',async ctx=>{
    const query = ctx.request.body
    const [err,data] = await to(specialtyModel.create(query))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('添加成功')
})

/**
 * @api {post} /web/specialty/updSpecialty 更新特产
 * @apiGroup 特产管理
 * @apiParam {int} id
 * @apiParam {string} cover
 * @apiParam {string} topImg
 * @apiParam {string} name
 * @apiParam {string} townId
 * @apiParam {folat} originalPrice
 * @apiParam {folat} discountPrice
 * @apiParam {int} type
 * @apiParam {string} content
 * @apiParam {string} junkLink
*/
router.put('/updSpecialty',async ctx=>{
    if(ctx.empty(['id'])) return
    const query = ctx.request.body
    const where = {id:query.id}
    query.imgList = JSON.stringify(query.imgList)
    const [err,data] = await to(specialtyModel.update(query,{where}))
    if(err){
        ctx.err(err)
        return 
    }
    ctx.suc('更新成功')
})



/**
 * @api {post} /web/scenic/getDetail 特产详情
 * @apiGroup 特产管理
 * @apiParam {int} id
*/
router.get('/getDetail',async ctx=>{
    if(ctx.empty(['id'])) return
    const where = {id:ctx.query.id}
    const [err,data] = await to(specialtyModel.findOne({where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})

module.exports = router.routes()