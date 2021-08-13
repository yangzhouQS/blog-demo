const dayjs = require('dayjs')

console.log(dayjs('2021-07-22').isValid())
console.log(dayjs(new Date(undefined)).isValid())
