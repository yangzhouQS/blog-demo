const obj = { a: 1, b: 2 }
const str = []
Object.keys(obj).forEach(row => {
  str.push(`${ row }=${ obj[row] }`)
})
console.log(str.join('&'))