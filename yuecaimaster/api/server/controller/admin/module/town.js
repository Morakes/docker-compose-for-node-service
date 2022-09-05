const router = new require("@koa/router")()
const { default: to } = require('await-to-js')
const townModel = require('../../../model/Town')

const _initData = [
    {
        id: 1,
        name: "太平镇"
    },
    {
        id: 2,
        name: "鳌头镇"
    },
    {
        id: 3,
        name: "温泉镇"
    },
    {
        id: 4,
        name: "良口镇"
    },
    {
        id: 5,
        name: "吕田镇"
    },
    {
        id: 6,
        name: "街口"
    },
    {
        id: 7,
        name: "江埔"
    },
    {
        id: 8,
        name: "城郊街"
    },
    {
        id: 9,
        name: "碧水湾/碧水新村"
    },
    {
        id: 10,
        name: "米埗小镇"
    },
]

/**
 * @api {get} /web/town/townList 获取城镇
 * @apiGroup 城镇列表
*/
router.get('/townList',async ctx=>{
    const [_, initData] = await to(townModel.findAll())
      if(!initData.length){
        _initData.forEach(async item => {
            await to(townModel.create(item))
        })
      }
    const [err,data] = await to(townModel.findAll())
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',data)
})

module.exports = router.routes()