const {Student} = require('./Student')

class LinearSearch {
  constructor(data, target) {
  }

  equals() {
    console.log(this)
  }

  search(data, target) {
    for (let i = 0; i < data.length; i++) {
      if(data[i].equals(target)) return i;
    }
    return -1;
  }
}

const data = [1, 5, 3, 2, 5, 18]
const linerSearch = new LinearSearch();
// const resIndex = linerSearch.search(data, 18);
// console.log(resIndex)
const studentsList = [new Student("李四"), new Student("lisa"), new Student("alice")]
const resStudentIndex = linerSearch.search(studentsList, new Student('lisa'))
console.log(resStudentIndex)
console.log(studentsList)