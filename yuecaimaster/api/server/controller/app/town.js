const router = new require("@koa/router")()
const { default: to } = require('await-to-js')
const townModel = require('../../model/Town')

/**
 * @api {get} /applets/town/townList 获取城镇
 * @apiGroup 城镇列表
*/
router.get('/townList',async ctx=>{
    const [err,data] = await to(townModel.findAll())
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})

module.exports = router.routes()