const XLSX = require('xlsx')
const fs = require('fs')
// const workbook = XLSX.readFile('./file.xlsx')
const workbook = XLSX.readFile('./demo.xlsx')
const worksheet = workbook.Sheets['Sheet'];
// console.log(JSON.stringify(XLSX.utils.sheet_to_json(worksheet)))
XLSX.utils.sheet_to_json(worksheet).forEach(row => {
  row.org_id= 629467277283840
  row.ori_org_id= '629467277283840'
  fs.appendFileSync('./demoFile.js', JSON.stringify(row) + ',')
})
console.log(workbook.SheetNames) // [ 'Sheet' ]
module.exports =[

]
