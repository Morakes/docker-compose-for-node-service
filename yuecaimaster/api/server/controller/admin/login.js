const Router = require('@koa/router')
const router = new Router()
const adminModel = require("../../model/Admin")
const auth = require("../../middleware/auth")
const { default: to } = require('await-to-js')

/**
 * @api {get} /web/currentUser 获取登录信息
 * @apiGroup 登录
*/
router.get("/currentUser",async(ctx)=>{
    const where = {id:ctx.header.userId}
    const [err,result] = await to(adminModel.findOne({where}))
    if(err){
        ctx.err('网络异常')
        return
    }
    const res = {
        username:result.account,
        avatar:result.avatar,
        id:result.id,
        role:[
            {alias:result.level}
        ]
    }
    ctx.suc('获取成功',res)
})

module.exports = router.routes()