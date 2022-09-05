const router = new require('@koa/router')()
const chiefModel = require('../../../model/Chief')
const colModel = require('../../../model/Collection')
const {Op} = require('sequelize')
/**
 * @api {get} /applets/rest/getChef 获取首页推荐厨师
 * @apiGroup 小程序--餐厅管理
*/
router.get('/getChef',async ctx=>{
    const where = {isShow:1}
    const [err,data] = await to(chiefModel.findAll({where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})


/**
 * @api {get} /applets/rest/chefList 获取所有厨师
 * @apiGroup 小程序--餐厅管理
*/
router.get('/chefList',async ctx=>{
    const query = func.rmNull(ctx.query)
    const arr = ['name']
    const where = {}
    for(let item of arr){
        if(query[item]){
            where[item] = {
                [Op.substring]:query[item]
            }
        }
    }
    const [err,data] = await to(chiefModel.findAll({where}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})

/**
 * @api {post} /web/chef/getDetail 厨师详情
 * @apiGroup 小程序--厨师管理
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
    const [err2,isCollect] = await to(colModel.findOne({
        where:{
            userId:ctx.query.userId,
            chefId:ctx.query.id
        }
    }))
    console.log(isCollect)
    if(isCollect){
        data.dataValues['isCollect'] = 1
        data.dataValues['collectId'] = isCollect.id
    }else{
        data.dataValues['isCollect'] = 0
    }
    ctx.suc('获取成功',data)
})



module.exports = router.routes()