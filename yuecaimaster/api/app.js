const Koa = require("koa")
const app = new Koa()
const path = require("path")

// 引入全局配置
const importGlobal = require("./utils")
importGlobal()

const cron = require("./server/service/cron")
cron.start()

// 配置跨域
const cors = require("koa2-cors")
app.use(cors())

// token验证
const auth = require("./server/middleware/auth")
app.use(auth.verifyToken(["/oauth/token"]))

// 配置请求返回
const response = require("./server/middleware/response")
app.use(response())

// 文件上传,post请求
const koaBody = require("koa-body")
app.use(
  koaBody({
    enableTypes: ["json", "form", "text"],
    multipart: true,
    formidable: {
      maxFileSize: 2000 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    },
  })
)

// 解析xml文件格式
const xmlParser = require("koa-xml-body")
app.use(xmlParser())

// 设置静态文件夹
const koaStatic = require("koa-static")
app.use(koaStatic(path.join(__dirname + "/public")))

// 连接websocket
// const { connect } = require("./server/service/ws")
// connect()

// koa路由
const router = require("./server/router")
app.use(router)

// 配置日志
const { accessLogger } = require("./log")
app.use(accessLogger())

app.listen(config.port)
