const Router = require('@koa/router')
const { default: to } = require('await-to-js')
const router = new Router()
const colModel = require("../../../model/Collection")
const restModel = require('../../../model/Restaurant')
const chefModel = require('../../../model/Chief')
const {Op} = require('sequelize')

router.post('/addCollection',async ctx=>{
    if(ctx.empty(['userId'])) return
    const value = {...ctx.request.body}
    const [err,data] = await to(colModel.create(value))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('收藏成功')
})


router.delete('/delCollection/:id',async ctx=>{
    let query = ctx.request.url.split('/')
    query = query[query.length-1]
    const [err, data] = await to(
        colModel.destroy({
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


router.post('/rest',async ctx=>{
    if(ctx.empty(['limit','page','userId'])) return
    const {limit,page,userId} = ctx.request.body
    const {latitude,longitude} = ctx.request.body.entity
    const where = {userId}
    const [err,rows] = await to(colModel.findAll({
        where
    }))
    const arr = []
    if(rows){
        rows.forEach(e=>{
            if(e.restId){
                arr.push(e.restId)
            }
        })
    }
    
    const [err2,data] = await to(restModel.findAll({
        where:{
            id:{
                [Op.or]:arr.length==0?[-1]:arr
            }
        },
        include:'town',
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))
    if(data){
        for(let item in data){
            data[item].dataValues.townName = data[item].town.name
            data[item].dataValues.distance = func.GetDistance1(longitude,latitude,data[item].longitude,data[item].latitude)
            data[item].dataValues.recommend = await colModel.count({
                where:{
                    restId:data[item].id
                }
            })
        }
    }
    ctx.suc('获取成功',data)
})


router.get('/chef',async ctx=>{
    if(ctx.empty(['limit','page','userId'])) return
    const {limit,page,userId} = ctx.query
    const where = {userId}
    const [err,rows] = await to(colModel.findAll({
        where
    }))
    const arr = []
    if(rows){
        rows.forEach(e=>{
            if(e.chefId){
                arr.push(e.chefId)
            }
        })
    }
    
    const [err2,data] = await to(chefModel.findAll({
        where:{
            id:{
                [Op.or]:arr.length==0?[-1]:arr
            }
        },
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))

    ctx.suc('获取成功',data)
})




module.exports = router.routes()