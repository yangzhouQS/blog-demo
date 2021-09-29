const Bacon = require('./bacon.js-master/dist/bacon.js');

const stream = Bacon.fromArray([1, 2, 3, 4]).flatMap(function (x) {
  if (x > 3) {
    return x * 2
  } else {
    return x;
  }
})

const arr = [1, 2, 3, 4, 1, 5, 10]
Bacon.fromArray([1, 2, 3]).map(function (a, b) {
  console.log(`${ a } - ${ b }`)
  return a
}, 3).log()
