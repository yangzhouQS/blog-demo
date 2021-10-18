const dayjs = require('dayjs')

console.log(dayjs('2021-07-22').isValid())
console.log(dayjs(new Date(undefined)).isValid())

let endDate = '2021-10-12 10:30:18'
const startDate = '2021-10-09 10:15:00'

if (Math.abs(dayjs(startDate).diff(endDate, 'hour')) > 24) {
  endDate = dayjs(startDate).add(12, 'hour').format('YYYY-MM-DD HH:mm:ss')
}
console.log(endDate)
console.log(dayjs('2021-10-09').isValid())
