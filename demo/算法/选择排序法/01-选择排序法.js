const {ArrayGenerate} = require('../tools')

class SelectionSort {
  constructor() {
  }

  sort(array) {
    let index = -1
    let len = array == null ? -1 : array.length
    while (index++ < len - 1) {
      for (let i = 0; i < len; i++) {
        if(array[i] > array[index]) {
          let tmp = array[index];
          array[index] = array[i]
          array[i] = tmp
        }
      }
    }
    return array
  }
}

const data = ArrayGenerate(10)
console.log('排序前:' + data)
const selectSort = new SelectionSort().sort(data)
console.log(`排序后: ${selectSort}`)