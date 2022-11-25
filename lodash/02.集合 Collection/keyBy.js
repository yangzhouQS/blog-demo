const _ = require('lodash')
var array = [
  { 'dir': 'left', 'code': 97 },
  { 'dir': 'right', 'code': 100 }
];
let result = null

result = _.keyBy(array, function (o) {
  return String.fromCharCode(o.code);
});
result = _.keyBy(array, 'code')

result = _({a:1}).assign({b:2})
console.log(result.__wrapped__)
