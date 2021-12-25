// 字符串ff
// 1.split 2.replace 3.search 4.match 5.test
const str = 'ab23cd123d66d77fe88g'
console.log(str)
// 1.split
console.log(str.split('d')) // [ 'ab23c', '123', '66', '77fe88g' ]
console.log(str.split(/\d/).filter(row => Boolean(row))) // [ 'ab', 'cd', 'd', 'd', 'fe', 'g' ]
// 2.replace
console.log(str.replace(/\d/g, '*')) // ab**cd***d**d**fe**g

// 3.search // 匹配第一个符合结果的索引值位置
console.log(str.search(/\d+/g))

// 4.match
console.log(str.match(/\d+/g)) // [ '23', '123', '66', '77', '88' ]


// 5.test
