// var CryptoJS = require('crypto-js')

// let info = '李鹏'
// let key = 'test'
// let encryptInfo = CryptoJS.AES.encrypt(info, key)
// console.log(encryptInfo.toString())

// let decryptInfoBytes = CryptoJS.AES.decrypt(encryptInfo.toString(), key)
// console.log(decryptInfoBytes)

// let decryptInfo = decryptInfoBytes.toString(CryptoJS.enc.Utf8)
// console.log(decryptInfo)
const { common } = require('../src/index.js')

// const s1 = common.getAccountStartAndEndDate(30, '2019-01-31')
// console.log('结账日：30，日期2019-01-31，返回的月份是：', s1)
// const s = common.getAccountStartAndEndDate(30, '2019-02-28')
// console.log('结账日：30，日期2019-02-28，返回的月份是：', s)
// const s2 = common.formatDate()
// console.log('测试', s2)
const condition = {
  orgId: 587557737304576,
  id: null,
  codeWord: '收料-',
  recordedDate: '2020-03-23',
  tableName: 'm_receive_order',
  dateFormat: 'YYYYMM'
}
common.createCodeOrder(condition).then(data => {
  console.log('生产单据编码：', data)
})
