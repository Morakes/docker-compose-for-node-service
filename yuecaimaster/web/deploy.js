const client = require("scp2")
const ora = require("ora")
const chalk = require("chalk")
const spinner = ora(chalk.green("正在发布。。。"))

/*
   host: 服务器ip
   port：scp上传的端口号 （默认：22）
   username：服务器账号
   password：服务器密码
   path：部署到服务器的路径
*/
const server = {
  host: "",
  port: 22,
  username: "",
  password: "",
  path: "",
}
spinner.start()
client.scp(
  "./dist/",
  {
    host: server.host,
    port: server.port,
    username: server.username,
    password: server.password,
    path: server.path,
  },
  (err) => {
    spinner.stop()
    if (!err) {
      console.log(chalk.green("成功"))
    } else {
      console.log(err)
    }
  }
)
