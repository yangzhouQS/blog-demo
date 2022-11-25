const _ = require('lodash')

// 删除 回调函数返回true的属性
const object = { 'a': 1, 'b': '2', 'c': 3 };
const result = _.omitBy(object, (value, key) => {
  if ([1, 3].includes(value)) {
    return true
  }
  return false
})
console.log(result)

