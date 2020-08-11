let arr = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]
// console.log(arr.slice(1,5))
console.log(arr)
console.log(arr.pop())
console.log(arr)
console.log(Array.from([]))
let a = 100

function toNumber (num = 0, n) {
  if (toString(num).indexOf('\.')) {
    return Number(num.toFixed(2))
  } else {
    return Number(num)
  }
}

console.log(toNumber(333.3666332233233))
console.log(toNumber(333))
// console.log(a.toFixed(2))
// console.log(111.21 + 111.12)
console.log('asaassa.3333'.indexOf('\.'))
console.log('3223323232'.indexOf('\.'))