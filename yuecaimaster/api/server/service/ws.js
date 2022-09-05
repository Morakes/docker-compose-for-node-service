const WebSocket = require("ws")
const wss = new WebSocket.Server({ port: config.wsPort })
const ws = {
  connect: () => {
    wss.on("connection", (client, req) => {
      client.send('连接成功')
      client.on("message", (data) => {
        if (data === "ping") {
          client.send("pong")
        }
        else {
          client.id = data
        }
      })
      client.on("close", (data) => {
        try {
          client.send('连接断开')
        } catch (e) {
          console.log(e)
        }
      })
    })
  },
  send: (clientId, message) => {
    var clients = Array.from(wss.clients)
    for (let client of clients) {
      if (client.id == clientId) {
        client.send(message)
        break
      }
    }
  }
}

module.exports = ws
