const fs = require('fs')
const ini = require('ini')
const config = ini.parse(fs.readFileSync('./my.ini', 'utf-8'))
console.log(config)
