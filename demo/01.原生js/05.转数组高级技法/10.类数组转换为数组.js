const arrayLikeObj = {
  length: 2,
  0: 1,
  1: 2
}
const arr1 = Array.prototype.slice.call(arrayLikeObj)
const arr2 = Array.prototype.concat.apply([], arrayLikeObj)
console.log(arr1, arr2)
