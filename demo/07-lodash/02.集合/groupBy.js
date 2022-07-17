const _ = require('lodash')

const list = [
  { id: 1, quantity: 11 },
  { id: 1, quantity: 12 },
  { id: 1, quantity: 13 },
  { id: 2, quantity: 21 },
  { id: 2, quantity: 22 },
  { id: 2, quantity: 23 },
  { id: 3, quantity: 31 },
  { id: 3, quantity: 32 },
  { id: 4, quantity: 41 },
  { id: 4, quantity: 42 },
  { id: 5, quantity: 51 },
  { id: 5, quantity: 52 }
]
console.log(_.groupBy(list, (row) => {
  return row.id
}))
console.log('-------------------')
console.log(_.keyBy(list, (value) => {
  return value.id
}))
