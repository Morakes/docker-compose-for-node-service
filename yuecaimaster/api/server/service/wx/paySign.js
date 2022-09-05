// 微信再签名方法，使用MD5加密
const crypto = require('crypto')

const paySign = (payRes) => {
    const sign = {
        appId: payRes.appid,
        nonceStr: payRes.nonce_str,
        package: 'prepay_id=' + payRes.prepay_id,
        signType: 'MD5',
        timeStamp: new Date().getTime(),
        key: config.wx.mchSecret
    }
    var temp = ''
    for (let i in sign) {
        temp = (temp + i + '=' + sign[i]) + (i == 'key' ? '' : '&')
        if (i == 'key') {
            break
        }

    }

    temp = crypto.createHash("md5").update(temp).digest("hex").toUpperCase()
    return temp
}
module.exports = paySign