const Router = require('@koa/router')
const router = new Router()
const adminModel = require('../../model/Admin')
const auth = require('../../middleware/auth')

const _initData = {
    avatar: "https://p5.itc.cn/images01/20210118/3fd2761390bf4f4593f1fa1ba9b73c3b.jpeg",
    account: "admin",
    password: "123456789",
    tel: 12345678912,
    level: "超级管理员",
    createTime: "2022-01-28 22:20:31",
    updateTime: "2022-03-15 01:06:32",
    username: "超级管理员",
    roleId: 1
}

/**
 * @api {get} /oauth/token 获取token
 * @apiGroup 登录
 * @apiParam {string}   username 
 * @apiParam {string}   password
*/

router.get('/token',async(ctx)=>{
    if(ctx.empty(['username','password'])){
        return 
    }
    const [initErr,initData] = await to(adminModel.findOrCreate({
        where:{account:_initData.account},
        defaults: _initData
    }))
    let username = ctx.query.username
    let password = ctx.query.password
    const where = {account:username}
    const [err, result] = await to(adminModel.findAll({where}))
    if(!result.length){
        ctx.err('用户不存在')
        return
    }else{
        password == result[0].password?ctx.suc('登陆成功',{token:auth.createToken(result[0].id)}):ctx.err('密码不正确','登录失败')
    }
})


module.exports = router.routes()