const tenpay = require("tenpay")
const path = require("path")
const wxpayConfig = {
  appid: config.wx.appId,
  //   商户id
  mchid: config.wx.mchId,
  //   商户secret
  partnerKey: config.wx.mchSecret,
  //   证书文件路径
  pfx: require("fs").readFileSync(
    path.resolve("./server/service/wx/apiclient_cert.p12")
  ),
  //   支付回调url
  notify_url: config.baseUrl + "/支付成功回调路径",
  refund_url: config.baseUrl + "/退款成功回调路径",
  sign_type: "MD5",
  // spbill_create_ip: 'IP地址'
}

// 调试模式(传入第二个参数为true, 可在控制台输出数据)
const wxpay = new tenpay(wxpayConfig)
module.exports = wxpay
