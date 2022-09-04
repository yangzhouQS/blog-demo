const createValues = (creator, length = 10) => Array.from({ length }, creator)


// 生成随机数
const createRandomValues = (len) => createValues(Math.random, len)

console.log(createRandomValues(10))
console.log(createRandomValues())
