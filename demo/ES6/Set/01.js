const set = new Set([ 1, 2, 3 ])
set.add('hello').add('a').add('b').add('s')
let ret = set.delete('b')
console.log(set.has('a'))
// set.clear() // 清空数据结构
console.log(set.size)
console.log(ret)
console.log(set.keys()) // [Set Iterator] { 1, 2, 3, 'hello', 'a', 's' }
console.log(set.values()) // [Set Iterator] { 1, 2, 3, 'hello', 'a', 's' }

for (const v of set.values()) {
  console.log(Object.prototype.toString.call(v))
}










