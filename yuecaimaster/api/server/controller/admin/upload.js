const Router = require('@koa/router')
const router = new Router()
const uploadFile = require('../../service/upload')

/**
 * @api {post} /web/file/uploadFile      web文件上传
 * @apiGroup 文件上传
 * @apiParam {Mutiply} file 
*/

router.post('/uploadFile',async ctx=>{
    const data =await uploadFile(ctx)
    ctx.suc('上传成功',data.url)
})

module.exports = router.routes()