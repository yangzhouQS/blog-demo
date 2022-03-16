const _ = require('lodash')
/*
_.chunk(array, [size=1])
将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
*/
console.log(_.chunk([1, 2, 3, 5, 6, 7], 3))
// [ [ 1, 2, 3 ], [ 5, 6, 7 ] ]

console.log(_.chunk(['a', 'b', 'c', 'd'], 3))
// [ [ 'a', 'b', 'c' ], [ 'd' ] ]
