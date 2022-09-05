const router = new require('@koa/router')()
const customModel = require('../../../model/Custom')
const merchantModel = require('../../../model/Merchant')
const restViewModel = require('../../../model/RestView')
const restModel = require('../../../model/Restaurant')
const viewModel = require('../../../model/View')
const { default: to } = require('await-to-js')
const {Op} = require('sequelize')



router.get('/getTodayView',async ctx=>{
    const array = func.getHoursToday()
    const where = {}
    var region = []
    for(let i=0;i<array.length-1;i++){
        where['createTime'] = {
            [Op.gt]:new Date(array[i]),
            [Op.lt]:new Date(array[i+1])
        }
        const rwos = await viewModel.findOne({where})
        region[i] = {
            hour:i,
            count:rwos?rwos.view:0
        }
    }
    ctx.suc('获取成功',region)
})


router.get('/getMonthView',async ctx=>{
    const array = func.getFullMonth()
    const region = []
    const where = {}
    for(let i=0;i<array.length-1;i++){
        where['createTime'] = {
            [Op.gt]:new Date(array[i]),
            [Op.lt]:new Date(array[i+1])
        }
        const [err,rows] = await to(viewModel.findAll({where}))
        if(err){
            console.log(err)
        }
        var count = 0
        if(rows){
            rows.forEach(item=>{
                count +=item.view
            })
        }
        region[i] = {
            day:i+1,
            count:count
        }
    }

    ctx.suc('获取成功',region)
})


router.get('/getYearView',async ctx=>{
    const array = func.getFullYear()
    const region = []
    const where = {}
    for(let i=0;i<array.length-1;i++){
        where['createTime'] = {
            [Op.gt]:new Date(array[i]),
            [Op.lt]:new Date(array[i+1])
        }
        const [err,rows] = await to(viewModel.findAll({where}))
        if(err){
            console.log(err)
        }
        var count = 0
        if(rows){
            rows.forEach(item=>{
                count +=item.view
            })
        }
        region[i] = {
            day:i+1,
            count:count
        }
    }
    ctx.suc('获取成功',region)
})


/**
 * @api {get} /web/statistics/theTop 获取顶部数据
 * @apiGroup 数据统计管理
*/
router.get('/theTop',async ctx=>{
    const data = {
        view:{},
        merchant:{},
        user:{}
    }
    const {todayEnd,todayStart} = func.getTodayRegion()
    const {yesterdayStart,yesterdayEnd} = func.getYesterdayRegion()
    const whereToday = {
        createTime:{
            [Op.lt]: new Date(todayEnd),
            [Op.gt]: new Date(todayStart),
    }}
    const whereYest = {
        createTime:{
            [Op.lt]: new Date(yesterdayEnd),
            [Op.gt]: new Date(yesterdayStart),
    }}


    data['view'] = {
        todayView:0,
        yesterdayView:0,
        totalView:0
    }

    const [errView1,viewToday] = await to(viewModel.findAll({where:whereToday}))
    if(viewToday){
        viewToday.forEach(e=>{
            data['view'].todayView +=e.view
        })
    }

    const [errView2,viewYesy] = await to(viewModel.findAll({where:whereYest}))
    if(viewYesy){
        viewYesy.forEach(e=>{
            data['view'].yesterdayView +=e.view
        })
    }

    const [errView3,viewTotal] = await to(viewModel.findAll())
    if(viewTotal){
        viewTotal.forEach(e=>{
            data['view'].totalView +=e.view
        })
    }

    // computed for merc
    const [errMer1,mercToday] = await to(merchantModel.findAndCountAll({
        where:whereToday
    }))
    const [errMer2,mercYest] = await to(merchantModel.findAndCountAll({
        where:whereYest
    }))
    const mercTotal = await merchantModel.count({
        where:{
            status:'已通过'
        }
    })
    data['merchant'] = {
        todayMerchant:mercToday.count,
        yesterdayMerchant:mercYest.count,
        totalMerchant:mercTotal
    }

    // computed for custom
    const [errCus1,userToday] = await to(customModel.findAndCountAll({
        where:whereToday
    }))
    const [errCus2,userYest] = await to(customModel.findAndCountAll({
        where:whereYest
    }))
    const customTotal = await customModel.count()
    data['user'] = {
        todayUser:userToday.count,
        yesterdayUser:userYest.count,
        totalUser:customTotal
    }
    ctx.suc('获取成功',data)
})

/**
 * @api {get} /web/statistics/getTodayMerchant 获取今日商户数
 * @apiGroup 数据统计管理
*/
router.get('/getTodayMerchant',async ctx=>{
    const array = func.getHoursToday()
    const where = {}
    var region = []
    for(let i=0;i<array.length-1;i++){
        where['createTime'] = {
            [Op.gt]:new Date(array[i]),
            [Op.lt]:new Date(array[i+1])
        }
        region[i] = {
            hour:i,
            count:await merchantModel.count({where})
        }
    }
    ctx.suc('获取成功',region)
})

/**
 * @api {get} /web/statistics/getMonthMerchant 获取本月商户数
 * @apiGroup 数据统计管理
*/
router.get('/getMonthMerchant',async ctx=>{
    const array = func.getFullMonth()
    const region = []
    const where = {}
    for(let i=0;i<array.length-1;i++){
        where['createTime'] = {
            [Op.gt]:new Date(array[i]),
            [Op.lt]:new Date(array[i+1])
        }
        region[i] = {
            day:i+1,
            count:await merchantModel.count({where})
        }
    }

    ctx.suc('获取成功',region)
})

/**
 * @api {get} /web/statistics/getYearMerchant 获取本年商户数
 * @apiGroup 数据统计管理
*/
router.get('/getYearMerchant',async ctx=>{
    const array = func.getFullYear()
    const region = []
    const where = {}
    for(let i=0;i<array.length-1;i++){
        where['createTime'] = {
            [Op.gt]:new Date(array[i]),
            [Op.lt]:new Date(array[i+1])
        }
        region[i] = {
            day:i+1,
            count:await merchantModel.count({where})
        }
    }
    ctx.suc('获取成功',region)
})

/**
 * @api {get} /web/statistics/getTodayUser 获取本日新增用户
 * @apiGroup 数据统计管理
*/
router.get('/getTodayUser',async ctx=>{
    const array = func.getHoursToday()
    const where = {}
    var region = []
    for(let i=0;i<array.length-1;i++){
        where['createTime'] = {
            [Op.gt]:new Date(array[i]),
            [Op.lt]:new Date(array[i+1])
        }
        region[i] = {
            hour:i,
            count:await customModel.count({where})
        }
    }
    ctx.suc('获取成功',region)
})

/**
 * @api {get} /web/statistics/getMonthUser 获取本月新增用户
 * @apiGroup 数据统计管理
*/
router.get('/getMonthUser',async ctx=>{
    const array = func.getFullMonth()
    const region = []
    const where = {}
    for(let i=0;i<array.length-1;i++){
        where['createTime'] = {
            [Op.gt]:new Date(array[i]),
            [Op.lt]:new Date(array[i+1])
        }
        region[i] = {
            day:i+1,
            count:await customModel.count({where})
        }
    }

    ctx.suc('获取成功',region)
})


/**
 * @api {get} /web/statistics/getYearUser 获取本年新增用户
 * @apiGroup 数据统计管理
*/
router.get('/getYearUser',async ctx=>{
    const array = func.getFullYear()
    const region = []
    const where = {}
    for(let i=0;i<array.length-1;i++){
        where['createTime'] = {
            [Op.gt]:new Date(array[i]),
            [Op.lt]:new Date(array[i+1])
        }
        region[i] = {
            day:i+1,
            count:await customModel.count({where})
        }
    }
    ctx.suc('获取成功',region)
})


/**
 * @api {get} /web/statistics/getRestRank 获取餐厅排名
 * @apiGroup 数据统计管理
 * @apiParam {Int} limit
 * @apiParam {Int} page
*/
router.get('/getRestRank',async ctx=>{
    if(ctx.empty(['limit','page'])) return
    const {limit,page} = ctx.query
    const [err,data] = await to(restViewModel.findAll({
        include:{
            model:restModel,
            as:'rest',
            // attributes:['cover','restName','specificAddress','status']
        },
        limit:parseInt(limit),
        offset:(parseInt(page)-1)*limit,
        order:[
            ['view','ASC']
        ]
    }
    ))
    for(let item in data){
        data[item].dataValues.restName = data[item].rest.restName
        data[item].dataValues.recommend = data[item].view
        data[item].dataValues.cover = data[item].rest.cover
        data[item].dataValues.status = data[item].rest.status
        data[item].dataValues.specificAddress = data[item].rest.specificAddress

    }
    const total = await restModel.count()
    ctx.body = {msg:'获取成功',code:200,data,total}
})



module.exports = router.routes()