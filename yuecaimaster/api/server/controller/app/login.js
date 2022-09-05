const Router = require("@koa/router")
const router = new Router()
const getOpenid = require('../../service/wx/getKey')
const customModel = require('../../model/Custom')
const { default: to } = require("await-to-js")
/**
 * @api {/applets/auth} / 小程序登录
 * @apiGroup 小程序登录
*/
router.post("/login", async (ctx) => {
  if(ctx.empty(['code'])) return
  const {code,userInfo} = ctx.request.body
  const res =await getOpenid(code)
  // 检查用户是否存在
  const [exist_err,exist_custom] = await to(customModel.findOne({
    where:{
      openid:res.openid
    }
  }))
  if(exist_custom){
    ctx.suc('登陆成功',exist_custom)
    return
  }
  // 用户不存在
  const data = {
    ...userInfo,
    nickname:userInfo.nickName,
    openid:res.openid
  }

  const [err,rows] = await to(customModel.create(data))
  data['id'] = rows.id
  ctx.suc('登陆成功',data)
})


router.get('/getUserInfo',async ctx=>{
  if(ctx.empty(['userId'])) return
  const where = {
    id:ctx.query.userId
  }
  const [err,rows] = await to(customModel.findOne({ where }))
  ctx.suc('获取成功',rows)
})


router.put('/updateUserInfo',async ctx=>{
  if(ctx.empty(['id'])) return
  const value = ctx.request.body
  
  const [err,rows] = await to(customModel.update(value,{
    where:{
      id:value.id
    }
  }))
  if(err){
    ctx.err(err)
    return
  }
  ctx.suc('获取成功',rows)

})

module.exports = router.routes()
