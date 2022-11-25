

class User {
  constructor(firstName,lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
  fullName(){
    return `${this.firstName}  ${this.lastName}`
  }
}
const user = new User("Bobby","Ficscher")
console.log(user.fullName())
