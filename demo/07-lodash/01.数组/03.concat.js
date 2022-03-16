const _ = require('lodash')
/*
_.concat(array, [values])
创建一个新数组，将array与任何数组 或 值连接在一起。
* */
console.log(_.concat([1, 2, 3], [3], [[5, 6, 8]]))
//[ 1, 2, 3, 3, [ 5, 6, 8 ] ]
