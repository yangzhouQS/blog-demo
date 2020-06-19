const Decimal = require('decimal.js')

console.log(new Decimal(33).add(5)) // 加法
console.log(new Decimal(33).sub(5)) // 减法
console.log(new Decimal(0.1).add(0.2))

console.log(Decimal.add(1, 9, 4))
console.log(Decimal.add(0.1, 0.2))
console.log(Decimal.mul(0.2, 0.3).mul(4).times(5))
console.log(Number.isInteger(Decimal.mul(0.2, 0.3).mul(4).times(5)))

console.log(Decimal.div(7, 6))

