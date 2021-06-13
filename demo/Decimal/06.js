const Decimal = require('decimal.js')
console.log(Decimal(Number('csd') || 0))


console.log(Decimal.mod(3333, 1000)) // 333
console.log(3333 % 1000)
console.log(Math.floor(3333 / 1000))

console.log(new Decimal(1.2354).decimalPlaces())
console.log(new Decimal(222).decimalPlaces())
console.log(new Decimal(NaN).decimalPlaces())
console.log(Number.isFinite(NaN))

const m = ['5354499760000501478E940411D3772D']
console.log([...new Set(m)])
