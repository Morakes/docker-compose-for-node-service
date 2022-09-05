const Router = require('@koa/router')
const { default: to } = require('await-to-js')
const router = new Router()
const merchModel = require("../../../model/Merchant")
const customModel = require('../../../model/Custom')
/**
 * @api {get} /applets/merch/merchDetail 获取用户身份
 * @apiGroup 小程序商户
 * @apiParam {Int} userId
*/

router.get('/merchDetail',async(ctx)=>{
    const _status = {
        REFUSE:'已拒绝',
        ACCESS:'已通过',
        WATING:'待审核'
    }
    if(ctx.empty(['userId'])) return
    const userId = ctx.query.userId
    const where = {userId:userId}
    const [err,data] = await to(merchModel.findOne({
        where,
        order:[
            ['createTime', 'DESC']
        ]
    }))
    if(err){
        ctx.err(err)
        return
    }
    var identity,status 

    if(!data ||data.status===_status.REFUSE ){

        identity = 'user'
        ctx.suc('获取成功',{identity})

    }else{
        identity=data.status === _status.ACCESS?'shopowner':'user',
        status = data.status
        ctx.suc('获取成功',{identity,status})
    }
    
})

router.post('/addMer',async ctx=>{
    if(ctx.empty(['user'])) return
    const query = ctx.request.body
    query.imgList = JSON.stringify(query.imgList)
    query['userId'] = query.user.id
    query['status'] = '待审核'

    const {name,gender,identityCard,provideTel,email} = query.user
    const value = {name,gender,identityCard,provideTel,email}
    const where = {
        id:query.user.id
    }
    const res = await customModel.update(value,{where})

    const [err,rows] = await to(merchModel.create(query))
    if(err){
        ctx.err('添加失败',err)
        return
    }
    ctx.suc('提交成功')
})

module.exports = router.routes()