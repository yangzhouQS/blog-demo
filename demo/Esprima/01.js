/*
const esprima = require('esprima')

const code = `const a = 100;function fn(){
      let a=100;
      console.log(a)
}`
let ret = esprima.parseScript(code,{tokens:true})
console.log(JSON.stringify(ret,null,4))
*/

console.log(parseFloat(3))
console.log(parseFloat(0.02))
console.log(parseFloat(-0.02))
console.log(parseFloat('3.14'))
console.log(parseFloat())
