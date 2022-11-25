const _ = require('lodash')

// 删除第一个参数对像属性, 数组指定删除属性
// 删除第二个参数指定的对象属性
console.log(_.omit({ a: 1, b: 2, c: 3 }, ['a', 'b', 'q']))


