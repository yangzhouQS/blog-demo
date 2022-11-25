const _ = require('lodash')


const users = {
  'fred': { 'user': 'fred', 'age': 40 },
  'pebbles': { 'user': 'pebbles', 'age': 1 }
};

let result = null
result = _.mapValues(users, 'age') // { fred: 40, pebbles: 1 }

result = _.mapValues(users, function(o) { return o.age; });

console.log(result)
// _.mapValues(users, function(o) { return o.age; });
// // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
//
// // The `_.property` iteratee shorthand.
// _.mapValues(users, 'age');
// // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)

