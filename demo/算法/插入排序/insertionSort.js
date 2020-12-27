const {swap, ArrayGenerate} = require("../tools");

class InsertionSort {
  constructor() {
  }

  sort(array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = i; j - 1 >= 0; j--) {
        if(array[j] < array[j - 1]) {
          swap(array, j, j - 1)
        } else {
          break
        }
      }
    }
    return array
  }

  sort2(array) {
    for (let i = 0; i < array.length; i++) {
      let element = array[i];
      let j;
      for (j = i; j - 1 >= 0 && element < array[j - 1]; j--) {
        array[j] = array[j - 1]
      }
      array[i] = element
    }
    return array
  }
}

const array = ArrayGenerate(10);
console.log(array + '')
console.log(new InsertionSort().sort(array) + '')
console.log(new InsertionSort().sort2(array) + '')