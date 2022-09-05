// 全局配置文件
const config = {
  baseUrl: "http://127.0.0.1:3100", //api访问根路径
  apidocUrl: "http://127.0.0.1:3100/doc/index.html", //文档访问路径
  port: 3100, //api访问端口
  tokenSecret: "yuecai",
  wsPort: 3101, //websocket运行端口
  //数据库相关配置
  db: {
    database: "yuecaidb", //数据库名称
    username: "root", //mysql用户名
    password: "123456", //mysql密码
    port: "3306", //mysql端口号
    host: "172.30.0.3", //服务器ip
  },
  //   微信相关配置
  wx: {
    appId: "wx32e7d00110e9b467",
    appSecret: "4f3caba05ffd52df85d8fd40310cb8d0",
    mchId: "1607591585",
    mchSecret: "jiayunetwork20210324jiayunetwork",
  },
}

module.exports = config
