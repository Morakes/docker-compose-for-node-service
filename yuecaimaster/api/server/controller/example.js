const Router = require("@koa/router")
const router = new Router()
const exampleModel = require("../model/Example")
const admin = require('../model/Admin')
const role = require('../model/Role')
const { default: to } = require("await-to-js")

/**
*    @api {get} /oil/example 获取订单
*    @apiGroup 后台订单
*    @apiParam {Number} page 
    @apiParam {String} status
*/

router.get("/example", async (ctx) => {
  const [err,rows] = await to(role.findAndCountAll())
  ctx.suc(rows)
})

module.exports = router.routes()
