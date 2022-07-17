const dayjs = require('dayjs')


function getAccountDate(date = 25, month = new Date()) {
  const endDate = `${ dayjs(month).format('YYYY-MM') }-${ date }`
  return [
    dayjs(endDate).subtract(1, 'month').add(1, 'day').format('YYYY-MM-DD') + ' 00:00:00',
    endDate + ' 23:59:59'
  ]
}

console.log(getAccountDate('25', '2022-03'))
