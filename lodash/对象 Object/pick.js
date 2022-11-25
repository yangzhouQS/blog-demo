const _ = require('lodash')
const object = { 'a': 1, 'b': '2', 'c': 3 }

// 创建一个从 object 中选中的属性的对象。
const result = _.pick(object, ['a', 'c']);
console.log(result) // 返回属性只有 a c { a: 1, c: 3 }
