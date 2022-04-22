/*
const child = require('child_process')
const path = require('path')
console.log()
const updatePath = path.join(process.cwd(), '/update/ylupdate.exe')
child.exec(`${ updatePath }`, (err, stdout, stderr) => {
  console.log(err, stdout, stderr)
})

*/

const utils = require('utils')
console.log(utils.getFullName())
