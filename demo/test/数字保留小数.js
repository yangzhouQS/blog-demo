function toNumber (num = 0, n = 2) {
  if (String(num).indexOf('\.') != -1) {
    return Number(num.toFixed(n))
  } else {
    return Number(num)
  }
}
let num = 4444444.9999999999
// console.log(toNumber(4444444.9999999999,4))
// console.log(Number(3.6666666))
console.log('---------')
console.log(num.toString())
