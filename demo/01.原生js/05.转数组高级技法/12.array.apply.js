const arrayLikeObj = {
  length: 2,
  0: 1,
  1: 2
}
console.log(Array.apply(null, arrayLikeObj))
