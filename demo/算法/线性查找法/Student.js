class Student {
  constructor(name) {
    this.name = name
  }

  equals(student) {
    if(student == null) return false
    return student.name.toLowerCase() === this.name.toLowerCase()
  }
}

module.exports = {
  Student
}