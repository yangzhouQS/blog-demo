/*
    for...in循环：只遍历对象自身的和继承的可枚举的属性。
    Object.keys()：返回对象自身的所有可枚举的属性的键名。
    JSON.stringify()：只串行化对象自身的可枚举的属性。
    Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举
*/

let source = {}
const target = { a: 1, b: 2, d: { a: 1 } }
source = Object.assign(source, target)
target.c = 100
target.a = 99
target.d.a = 100 // 浅拷贝
console.log(source) // { a: 1, b: 2, d: { a: 100 } }


/*
属性的遍历
ES6 一共有 5 种方法可以遍历对象的属性。

（1）for...in
      for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
（2）Object.keys(obj)
    Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
（3）Object.getOwnPropertyNames(obj)
    Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
（4）Object.getOwnPropertySymbols(obj)
    Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
（5）Reflect.ownKeys(obj)
    Reflect.ownKeys返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
* */

let obj = {
  a: 1,
  b: 2,
  e:99,
  c: 3,
  d: { s: 100 },
  [Symbol('abc')]:100
}
// for .. in
for (const objKey in obj) {
  // console.log(objKey)
}
// Object.keys(obj).forEach(row=>console.log(row))
console.log(Object.keys(obj)) // [ 'a', 'b', 'c', 'd' ]
console.log(Object.getOwnPropertyNames(obj)) //[ 'a', 'b', 'c', 'd' ]
console.log(Object.getOwnPropertySymbols(obj)) // [ Symbol(abc) ]
console.log(obj[Object.getOwnPropertySymbols(obj)[0]]) // 100
console.log(Reflect.ownKeys(obj)) // [ 'a', 'b', 'c', 'd', Symbol(abc) ]
