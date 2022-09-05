const Router = require("@koa/router")
const { default: to } = require("await-to-js")
const router = new Router()
const roleModel = require('../../model/Role')

const _initData = [
    {
        id: 1,
        alias: "超级管理员"
    },
    {
        id: 2,
        alias: "普通管理员"
    }
]
/**
 * @api {post} /web/sys/role/getRole 获取角色
 * @apiGroup 角色列表
 */

  router.get('/getRole',async ctx=>{
      const [_, initData] = await to(roleModel.findAll())
      if(!initData.length){
        _initData.forEach(async item => {
            await to(roleModel.create(item))
        })
      }
      const [err,data] = await to(roleModel.findAll())
      ctx.suc('获取成功',data)
  })

  module.exports = router.routes()