const arrayLikeObj = {
  length: 2,
  0: 1,
  1: 2
}
console.log(Array.from(arrayLikeObj))
const str = 'abc'
console.log(Array.from(str))
