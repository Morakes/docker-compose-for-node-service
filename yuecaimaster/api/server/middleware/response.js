// 返回值中间件
const response = () => {
  return async (ctx, next) => {
    ctx.empty = (arr) => {
      var isnull = []
      var req
      switch(ctx.request.method){
        case "GET":req = ctx.query;break;
        case "POST":req = ctx.request.body;break;
        case "PUT":req = ctx.request.body;break;
        case "DELETE":req = ctx.query;break
      }
     

      for (let item of arr) {
        if (!req[item]) {
          isnull.push(item)
        }
      }
      if (isnull.length) {
        ctx.body = {
          code: -1,
          msg: "缺少参数" + isnull.join("、"),
        }
        return true
      }
      return false
    }
    ctx.suc = (msg, data) => {
      ctx.body = { code: 200, msg, data }
    }
    ctx.err = (msg, err) => {
      ctx.body = {
        code: -1,
        msg,
        err: err ? err.toString() : "",
      }
    }
    await next()
  }
}

module.exports = response
