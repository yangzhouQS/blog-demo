//babel 核心库，用来实现核心转换引擎
const babel = require('@babel/core')
//类型判断，生成AST零部件
const types = require('babel-types')

//源代码
const code = `const sum=(a,b)=>a+b;` //目标代码 const sum = function(a,b){ return a + b }
//transform方法转换code
//babel先将代码转换成ast，然后进行遍历，最后输出code

let result = babel.transform(code,{
})
console.log(result)
