// let WXBizDataCrypt = require('./WXBizDataCrypt')
let WXBizDataCrypt = require('./WXBizDataCrypt3')

let appId = 'wxf091110394a41f2d'
let sessionKey = 'TU491QxdcsvmMJHpM8Nn9A=='
let encryptedData = `BeG81jq1Rb38TZUXpa1ehyiLEb+am8LAEpaXnU9Q5RJshp63m3sOcFtyWdSJY5XAl7KFowxMA5cBMWdA5zUfCP2eIgmRFjKNUs13q4V/gXoAoW3NlJTzWaMZqz33p1Ik/ONIbjJLsGqCuvqtbLVvtkMrkNQWERxqnIbO7++hRthyHuKvmhA0QUmsXfwisl8u4e/cEVH1u9P4VnE2OtpdfA==`
let iv = 'N/QVtfrTwv5IE33jaJSbIA=='

let pc = new WXBizDataCrypt(appId, sessionKey)

let data = pc.decryptData(encryptedData, iv)

console.log(data)
/*
{
  phoneNumber: '15591896078',
  purePhoneNumber: '15591896078',
  countryCode: '86',
  watermark: { timestamp: 1590911632, appid: 'wxf091110394a41f2d' }
}
* */

