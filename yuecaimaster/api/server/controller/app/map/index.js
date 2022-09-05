const router =new require('@koa/router')()
const restModel = require('../../../model/Restaurant')
const {Op} = require('sequelize')

router.get('/getFoodMap',async ctx=>{
    const {latitude,longitude} = ctx.query
    const rangeForm = func.getMaxMinLongitudeLatitude(parseFloat(longitude),parseFloat(latitude),50)
    const where = {
        latitude:{
            [Op.gt]:rangeForm.minlat,
            [Op.lt]:rangeForm.maxlat
        },
        longitude:{
            [Op.gt]:rangeForm.minlng,
            [Op.lt]:rangeForm.maxlng
        }
    }
    console.log(where)
    const rows = await restModel.findAll({where})
    console.log(rangeForm)
    ctx.suc('获取成功',rows)
})

module.exports = router.routes()