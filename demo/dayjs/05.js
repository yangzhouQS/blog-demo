const dayjs = require('dayjs')


console.log(new Date(dayjs().format("YYYY-MM-DD")).getTime())
console.log(new Date(dayjs().format("YYYY-MM-DD")).getTime() - 24 * 3600)
console.log()
console.log(dayjs(new Date(dayjs().format("YYYY-MM-DD")).getTime() - 24 * 3600).format("YYYY-MM-DD HH:mm:ss"))
console.log(dayjs().format("YYYY-MM-DD"))

console.log(dayjs().subtract(1,'day').format("YYYY-MM-DD"))






