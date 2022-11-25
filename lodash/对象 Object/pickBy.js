const _ = require('lodash')
const object = { 'a': 1, 'b': '2', 'c': 3 }

// 回调函数处理指定对象的值
// _.pickBy(object, [predicate=_.identity])
// 创建一个对象，这个对象组成为从 object 中经 predicate 判断为真值的属性。 predicate调用2个参数：(value, key)。


// 删除回调函数返回false的属性
const result = _.pickBy(object, function (value, key) {
  console.log(value, key)
  return value % 2 === 0
});
console.log(result) // 返回属性只有 a c { a: 1, c: 3 }
/*

console.log(_.isNumber(1))
console.log(_.isNumber(0))
console.log(_.isNumber(-1))
console.log(_.isNumber(3e2))
console.log(_.isNumber('1'))
console.log(_.isNumber(undefined))
console.log(_.isNumber(null))
console.log(_.isNumber(''))
console.log(_.isNumber('0'))
console.log(_.isNumber('111'))
*/
