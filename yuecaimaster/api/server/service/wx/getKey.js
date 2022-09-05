const http = require('../http')
async function getOpenid(code) {
    let url =
        'https://api.weixin.qq.com/sns/jscode2session?appid=' +
        config.wx.appId +
        '&secret=' +
        config.wx.appSecret +
        '&js_code=' +
        code +
        '&grant_type=authorization_code'
    const res = await http.get(url)
    return JSON.parse(res)
}
module.exports = getOpenid
