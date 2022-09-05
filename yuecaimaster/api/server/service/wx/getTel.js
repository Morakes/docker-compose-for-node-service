const WXBizDataCrypt = require('./WXBizDataCrypt')

function getUser({ iv, encryptedData, sessionKey }) {
    var pc = new WXBizDataCrypt(config.wx.appId, sessionKey)
    var data = pc.decryptData(encryptedData, iv)
    return data
}

module.exports = getUser