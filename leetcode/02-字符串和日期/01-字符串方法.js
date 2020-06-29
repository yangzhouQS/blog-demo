//静态 String.fromCharCode() 方法返回由指定的UTF-16代码单元序列创建的字符串。
console.log(String.fromCharCode(65, 67, 68, 90))


// String.fromCodePoint() 静态方法返回使用指定的代码点序列创建的字符串。
console.log(String.fromCodePoint(0x2F804)) //你
console.log(String.fromCodePoint(20320)) //你


// charAt() 方法从一个字符串中返回指定的字符。
console.log('abc'.charAt(1))


// charCodeAt() 方法返回0到65535之间的整数 如果你想要整个代码点的值，使用 codePointAt()。
console.log('你'.charCodeAt(0)) // 20320
console.log(String.fromCodePoint(20320)) // 你


// codePointAt() 方法返回 一个 Unicode 编码点值的非负整数。
console.log('你好'.codePointAt(0)) // 20320
console.log('abc'.codePointAt(0))

// concat() 方法将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。
let a='a'
let b='b'
console.log(a.concat(b,'c'))
console.log(a,b)

// includes() 方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。
// indexOf() 方法返回调用它的 String 对象中第一次出现的指定值的索引，从 fromIndex 处进行搜索。如果未找到该值，则返回 -1。
// lastIndexOf() 方法返回调用String 对象的指定值最后一次出现的索引，在一个字符串中的指定位置 fromIndex处从后向前搜索。如果没找到这个特定值则返回-1 。



// endsWith()方法用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。
// startsWith() 方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false。

// trim() 方法会从一个字符串的两端删除空白字符。
// trimEnd() 方法从一个字符串的末端移除空白字符。trimRight() 是这个方法的别名。
// trimStart() 方法从字符串的开头删除空格。trimLeft() 是此方法的别名。



// repeat() 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。
// padEnd()  方法会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。
// padStart() 方法用另一个字符串填充当前字符串(重复，如果需要的话)，以便产生的字符串达到给定的长度。填充从当前字符串的开始(左侧)应用的。



// replace() 方法返回一个由替换值（replacement）替换一些或所有匹配的模式（pattern）后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。
// search() 方法执行正则表达式和 String 对象之间的一个搜索匹配。
// match() 方法检索返回一个字符串匹配正则表达式的的结果。
// matchAll() 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。
// substring() 方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。
// slice() 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。
// split() 方法使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。
