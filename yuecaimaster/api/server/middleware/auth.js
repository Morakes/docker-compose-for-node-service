const jwt = require("jsonwebtoken")

var auth = {
 
  createToken(userId) {
    // 根据userId生成token
    const payload = {
      userId,
      time: new Date().getTime(),
      timeout: 1000 * 60 * 60 * 24,
    }
    const token = jwt.sign(payload, config.tokenSecret)
    return token
  },
  
  verifyToken(allowUrl) {
    return async (ctx, next) => {
      // 检验token是否有效，若无效则返回false
      if (
        ctx.request.header.referer ==
        "http://localhost:3000/doc/index.html"
      ) {
        ctx.request.header.userId = 1
        await next()
        return
      }
      const skipUrl = ["doc", "img", "applets", "dist"]
      if (
        allowUrl.indexOf(ctx.request.url.split('?')[0]) == -1 
        &&!skipUrl.includes(ctx.request.url.split("/")[1])
      ) {
        if (!ctx.request.header.authorization) {
          ctx.body = { code: 110, msg: "token无效" }
          return
        }
        try {
          const token = ctx.request.header.authorization.replace('Bearer ','')
          const payload = jwt.verify(
            token,
            config.tokenSecret
          )
          if (
            payload.time + payload.timeout <
            new Date().getTime()
          ) {
            ctx.body = { code: 111, msg: "token过期" }
            return
          }

          ctx.request.header.userId = payload.userId
          await next()
        } catch (err) {

          ctx.body = {
            code: 110,
            msg: "token无效",
            err: err.toString(),
          }
          return
        }
      } else {
        await next()
      }
    }
  },
}

module.exports = auth
