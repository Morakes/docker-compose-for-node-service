const Router = require("@koa/router")
const { default: to } = require("await-to-js")
const router = new Router()
const adminModel = require("../../model/Admin")
const roleModel = require('../../model/Role')
const { Op } = require("sequelize")

/**
 * @api {post} /web/sys/user/userList 获取管理员
 * @apiGroup 管理员
 * @apiParam {Int} limit
 * @apiParam {Int} page
 * @apiParam {Object} entity 
 */
 router.post("/userList", async (ctx) => {
    if(ctx.empty(['limit','page','entity'])) return
    const {limit,page} = ctx.request.body
    const entity = func.rmNull(ctx.request.body.entity)
    const arr = ['username','account','tel','roleId',]
    const where = {}
    for(let item of arr){
        if(entity[item]){
            where[item] = {[Op.substring]:entity[item]}
        }
    }
    const [err,data] = await to(adminModel.findAll({
        where,
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))
    if(err){
        ctx.err('获取失败',err) 
        return
    }
    for(let item in data){
        data[item].dataValues.roles = [{
            alias:data[item].level,
            id:data[item].id
        }]
    }
    const [err2,total] = await to(adminModel.count({where}))
    ctx.body = {code:200,msg:'获取成功',data,total:total}
  })


  router.post('/register',async ctx=>{
    const query = ctx.request.body
    const [err,data] = await to(roleModel.findOne(
       { where:{
            id:parseInt(query.idArr)
        }}
    ))
    query.roleId = query.idArr
    query.level = data.alias
    const [err2,data2] = await to(adminModel.create(query))
    if(err2){
        ctx.err(err2)
        return 
    }
    ctx.suc('添加成功')
  })


  router.put('/updUser',async ctx=>{
    if(ctx.empty(['id','username','account','tel','idArr','avatar'])) return
    const query = ctx.request.body
    const [err,data] = await to(roleModel.findOne(
       { where:{
            id:parseInt(query.idArr)
        }}
    ))
    query.roleId = query.idArr
    query.level = data.alias
    const where = {id:query.id}
    const [err2,data2] = await to(adminModel.update(query,{where}))
    if(err2){
        ctx.err(err2)
        return 
    }
    ctx.suc('更新成功')
})

router.put('/updPass',async ctx=>{
    if(ctx.empty(['id','oldPassword','password'])) return
    const query = ctx.request.body
    const [err,data] = await to(adminModel.findOne({
        where:{
            id:query.id,
            password:query.oldPassword
        }
    }))
    if(!data){
        ctx.err('原密码不正确')
        return
    }
    const where = {
        id:query.id,
    }
    const [err2,data2] = await to(adminModel.update(query,{where}))
    if(err2){
        ctx.err(err2)
        return 
    }
    ctx.suc('更新成功')
})

  module.exports = router.routes()