/*
const YAML = require('yamljs');
const fs = require('fs');
const file = './bootstrap.yml'
// file为文件所在路径
const data = YAML.parse(fs.readFileSync(file).toString());
console.log(data)

console.log(data.swagger)*/


const transRecords = (field = '') => {
  let prop = field.replace(/_(\w)/g, ($0, $1) => {
    return $1.toUpperCase()
  })
  return prop
}
let a = `
count_red_weight
`
console.log(transRecords(a))
