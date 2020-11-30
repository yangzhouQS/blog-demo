const fs = require('fs')
const path = require('path')
let file = path.resolve(__dirname, './file.txt')
let data = {a: 2}
// 异步写入数据到文件
fs.appendFile(file, JSON.stringify(data, null, 4), { encoding: 'utf8' }, err => {})

console.log(Object.prototype.toString.call('111'))