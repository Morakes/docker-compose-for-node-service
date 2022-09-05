const Router = require('@koa/router')
const { default: to } = require('await-to-js')
const router = new Router()
const carouselModel = require("../../../model/Carousel")
const viewModel = require('../../../model/View')
const { Op } = require("sequelize")
/**
 * @api {get} /applets/carousel/getShowCarousel 获取展示中轮播图
 * @apiGroup 小程序轮播图
 * @apiParam {Int} type
*/

router.get('/getCarousel',async(ctx)=>{
    if(ctx.empty(['type'])) return
    const type = ctx.query.type
    const where = {type:type,isShow:1}
    const [err,data] = await to(carouselModel.findAll({where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.body = {code:200,msg:'获取成功',data}
    if(type === '1'){
        const date = new Date()
        const startTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:00:00`
        const endTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()+1}:00:00`
        const where = {
            createTime:{
                [Op.gt]:new Date(startTime),
                [Op.lt]:new Date(endTime)
            }
        }
        const [err,rows] = await to(viewModel.findOne({where}))
        var view = rows?++rows.view:1
        if(rows){
            const res = await to(viewModel.update({view},{
                where:{
                    id:rows.id
                }
            }))
            return
        }
        const res = await to(viewModel.create({view}))
    }
})

module.exports = router.routes()