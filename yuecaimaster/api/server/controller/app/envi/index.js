const router = new require('@koa/router')()
const { default: to } = require('await-to-js')
const envDisplayModel = require('../../../model/EnvDisplay')

router.get('/getEnvironment',async ctx=>{
    if(ctx.empty(['restId'])) return
    const where = {restId:ctx.query.restId}
    const [err,data] = await to(envDisplayModel.findOne({
        where,
    }))
    if(err){
        ctx.err(err)
        return
    }
    if(data){
        data['imgList'] = data['imgList']?JSON.parse(data['imgList']):''
    }
    ctx.suc('获取成功',data)

})

router.post('/addEnvironment',async ctx=>{
    if(ctx.empty(['restId','intro','imgList'])) return
    const query = ctx.request.body
    query['imgList'] = JSON.stringify(query['imgList'])
    const [err,rwos] = await to(envDisplayModel.create(query))
    if(rwos){
        ctx.suc('添加成功')
    }
})

router.put('/updEnvironment',async ctx=>{
    if(ctx.empty(['id','restId','intro','imgList'])) return
    const query = ctx.request.body
    const where = {
        id:query.id
    }
    query['imgList'] = JSON.stringify(query['imgList'])
    const [err,rwos] = await to(envDisplayModel.update(query,{where}))
    if(rwos){
        ctx.suc('修改成功')
    }
})

module.exports = router.routes()