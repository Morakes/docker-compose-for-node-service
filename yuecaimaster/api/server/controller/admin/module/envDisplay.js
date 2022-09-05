const router = new require('@koa/router')()
const { default: to } = require('await-to-js')
const envDisplayModel = require('../../../model/EnvDisplay')

router.get('/getDetail',async ctx=>{
    if(ctx.empty(['restId'])) return
    const where = {restId:ctx.query.restId}
    const [err,data] = await to(envDisplayModel.findOne({
        where,
    }))
    if(err){
        ctx.err(err)
        return
    }
    data['imgList'] = data['imgList']?JSON.parse(data['imgList']):''
    ctx.suc('获取成功',data)
})

module.exports = router.routes()