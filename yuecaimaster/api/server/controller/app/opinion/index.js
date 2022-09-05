const { default: to } = require("await-to-js")

const router =new require('@koa/router')()
const opinionModel = require('../../../model/Opinion.js')

router.post('/addOpinion',async ctx=>{
    const [err,rows] = await to(opinionModel.create(ctx.request.body))
    if(err){
        ctx.err(err)
        return
    }
    if(rows){
        ctx.suc('添加成功')
    }
})




module.exports = router.routes()