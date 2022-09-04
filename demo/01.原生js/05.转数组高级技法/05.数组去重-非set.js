const arr1 = [1, 2, 3]
const arr2 = [3, 4, 5]

function mergeArray(arr1, arr2) {
  const arr = arr1.slice(0)
  let v;
  for (let i = 0; i < arr2.length; i++) {
    v = arr2[i]
    if (~arr.indexOf(v)) {
      continue
    }
    arr.push(v)
  }
  return arr
}

console.log(mergeArray(arr1, arr2))
