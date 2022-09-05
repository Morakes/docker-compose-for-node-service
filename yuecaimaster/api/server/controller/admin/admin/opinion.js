const { default: to } = require("await-to-js")
const {Op} = require('sequelize')
const router =new require('@koa/router')()
const opinionModel = require('../../../model/Opinion.js')

router.post('/getOpinionList',async ctx=>{
    if(ctx.empty(['limit','page','entity'])) return
    const {limit,page,date1,date2} = ctx.request.body
    const entity = func.rmNull({...ctx.request.body.entity,date1,date2})
    const arr = ['status','date1','date2']
    const where = {}
    console.log(entity)
    for(let item of arr){
        if(entity[item]){
            if (item == "date1" || item == "date2") {
                where["createTime"] = {
                  [Op.lt]: new Date(entity.date2),
                  [Op.gt]: new Date(entity.date1),
                } //日期查询
              } else {
                where[item] = { [Op.substring]: entity[item] }
              }
        }
    }
    console.log(where)
    const [err,data] = await to(opinionModel.findAll({
        where,
        include:'user',
        limit:parseInt(limit),
        offset:(parseInt((page-1)) * limit)
    }))
    if(err){
        ctx.err('获取失败',err) 
        return
    }
    const [err2,total] = await to(opinionModel.count({where}))
    ctx.body = {code:200,msg:'获取成功',data,total:total}
})


router.put('/updateStatus',async ctx=>{
    if(ctx.empty(['id','status'])) return
    const [err,rows] = await to(opinionModel.update({status:ctx.request.body.status},{where:{id:ctx.request.body.id}}))
    if(err){
        ctx.err(err)
        return
    }
    ctx.suc('获取成功',rows)
})

router.get('/getStatistics',async ctx=>{
    const [err,data] = await to(opinionModel.findAll())
    const result = {count1:0,count2:0,}
    for(let item of data){
        if(item.status == '待处理'){
            result.count1++
        }else{
            result.count2++
        }
        
    }
    ctx.suc('获取成功',result)
})


module.exports = router.routes()