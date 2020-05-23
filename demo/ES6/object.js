let obj = {
  a:1,
  b:2
}
let cellColumns = ['a','b','c']

cellColumns.forEach(row=>{
  console.log(Reflect.has(obj,row));
})
console.log(obj);
const moment = require('moment')
console.log(moment('2020-12').add(1, 'months').format("yyyy-MM"))









