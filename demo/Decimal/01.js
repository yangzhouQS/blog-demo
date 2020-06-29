const Decimal = require('decimal.js')

console.log(Number((new Decimal(0).toFixed(8))))
  
console.log(new Decimal(0).div(0))

console.log(Decimal.abs(-111))
console.log(new Decimal(-199).abs())
function getType(tag){
  console.log(Object.prototype.toString.call(tag))
}
console.log(Decimal.trunc(3.999))
let ret = Decimal.trunc(3.999)
getType(ret)

console.log(Decimal.add(1,'1').add(2))
console.log(new Decimal(2).add(2))
console.log(new Decimal(2).sub(1))
