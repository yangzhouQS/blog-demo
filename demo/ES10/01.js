const keyValue=[
  ['a',1],
  ['b',2],
  ['c',3],
]
console.log(Object.fromEntries(keyValue))
// { a: 1, b: 2, c: 3 }
const objKeyValue = { a: 1, b: 2, c: 3 }
console.log(Object.entries(objKeyValue))
// [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
const map = new Map()
map.set(1,{a:1})
map.set(4,{a:4})
map.set(2,{a:2})
map.set(3,{a:3})
console.log(Object.fromEntries(map))

const mapKeyValue = { '1': { a: 1 }, '2': { a: 2 }, '3': { a: 3 }, '4': { a: 4 } }
console.log(Object.entries(mapKeyValue))


