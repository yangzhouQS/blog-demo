const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
])
console.log(map)

const map2 = new Map({
  [Symbol.iterator]: function* () {
    yield ['a', 1]
    yield ['b', 2]
    yield ['c', 3]
  }
})
console.log(map2)