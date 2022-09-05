const Router = require('@koa/router')
const { default: to } = require('await-to-js')
const router = new Router()
const carouselModel = require("../../../model/Carousel")

/**
 * @api {get} /web/carousel/getShowCarousel 获取展示中轮播图
 * @apiGroup 轮播图
 * @apiParam {Int} type
*/

router.get('/getShowCarousel',async(ctx)=>{
    if(ctx.empty(['type'])) return
    const type = ctx.query.type
    const where = {type:type,isShow:1}
    const [err,data] = await to(carouselModel.findAll({where}))
    if(err){
        ctx.err(err)
        return
    }
    const max = data.length
    ctx.body = {code:200,msg:'获取成功',data,max}
})

/**
 * @api {get} /web/carousel/getCarousel 获取轮播
 * @apiGroup 轮播图
 * @apiParam {Int} limit
 * @apiParam {Int} page
 * @apiParam {Int} type
*/

router.get('/getCarousel',async(ctx)=>{
    if(ctx.empty(['type','limit','page'])) return
    const {type,limit,page} = ctx.query
    const where = {type:type}
    const [err,data] = await to( carouselModel.findAll({
        where,
        limit:parseInt(limit),
        offset:(parseInt(page)-1)*limit
    }))
    if(err){
        ctx.err('获取失败',err) 
        return
    }
    const [err2,total] = await to(carouselModel.count({where}))
    ctx.body = {code:200,msg:'获取成功',data,total:total}
})

/**
 * @api {post} /web/carousel/addCarousel 添加轮播
 * @apiGroup 轮播图
 * @apiParam {string} imgUrl 
 * @apiParam {string} remark 
 * @apiParam {Int}  type
*/

router.post('/addCarousel',async(ctx)=>{
    if(ctx.empty(['imgUrl','remark','type'])) return
    let {imgUrl, remark, type} = ctx.request.body
    const [err,data] = await to(carouselModel.create({imgUrl, remark, type}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('添加成功')
})

/**
 * @api {put} /web/carousel/updCarousel 更新轮播
 * @apiGroup 轮播图
 * @apiParam {string} imgUrl 
 * @apiParam {string} remark 
 * @apiParam {Int}  id
*/

router.put('/updCarousel',async ctx=>{
    if(ctx.empty(['id','remark','imgUrl'])) return
    const query = ctx.request.body
    const where = {id:query.id}
    const [err,data] = await to(carouselModel.update(query,{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功')
})


/**
 * @api {post} /web/carousel/delCarousel 删除轮播
 * @apiGroup 轮播图
 * @apiParam {Int} id
 */
 router.delete("/delCarousel/:id", async (ctx) => {
    let query = ctx.request.url.split('/')
    query = query[query.length-1]
    const [err, data] = await to(
        carouselModel.destroy({
        where: {
          id: query,
        },
      })
    )
    if (err) {
      ctx.err("删除失败", err)
    } else {
      ctx.suc("删除成功", data)
    }
  })


/**
 * @api {post} /web/carousel/setDisplay 设为展示
 * @apiGroup 轮播图
 * @apiParam {Int} id 
 * @apiParam {Int} type
*/
router.post("/setDisplay",async ctx=>{
    if(ctx.empty(['type','id'])) return
    const {type,id} = ctx.request.body
    const where = {type:type,id:id}
    const [err,data] = await to(carouselModel.update({isShow:1},{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功',data)
})

/**
 * @api {post} /web/carousel/removeDisplay 移除展示
 * @apiGroup 轮播图
 * @apiParam {Int} id 
 * @apiParam {Int} type
*/
router.post("/removeDisplay",async ctx=>{
    if(ctx.empty(['type','id'])) return
    const {type,id} = ctx.request.body
    const where = {type:type,id:id}
    const [err,data] = await to(carouselModel.update({isShow:0},{where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('更新成功',data)
})

module.exports = router.routes()