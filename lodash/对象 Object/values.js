const _ = require('lodash')
const object = { 'a': 1, 'b': '2', 'c': 3 }
console.log(_.values(object))
console.log(Object.values(object))
console.log(_.values('hello'))
console.log(Object.values('hello'))
console.log(_.values(false))
console.log(_.values(null))
