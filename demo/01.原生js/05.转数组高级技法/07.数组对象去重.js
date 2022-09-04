const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }]
const arr2 = [{ id: 3 }, { id: 4 }, { id: 5 }]

function mergeArray(arr1, arr2) {
  const arr = arr1.slice(0)
  let v;
  for (let i = 0; i < arr2.length; i++) {
    v = arr2[i]
    if (~arr.findIndex(item=>item.id===v.id)) {
      continue
    }
    arr.push(v)
  }
  return arr
}

console.log(mergeArray(arr1, arr2))
