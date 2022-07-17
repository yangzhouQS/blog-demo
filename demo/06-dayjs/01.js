const dayjs = require('dayjs')
/*
* 返回当前时间的开头时间的 Dayjs() 对象，如月份的第一天。
dayjs().startOf('year')
dayjs().startOf('month')
返回当前时间的末尾时间的 Dayjs() 对象，如月份的最后一天。
dayjs().endOf('month')
dayjs().endOf('year')
* */
/*
console.log(dayjs(null).startOf('month').format('YYYY-MM-DD'))
console.log(dayjs().endOf('month').format('YYYY-MM-DD'))
console.log(dayjs('2020-08-05 08:45:00').add(10, 'hour').format('YYYY-MM-DD HH:ss:mm'))
*/

// 时间差
/*
* 时间差
dayjs('2018-06-08').diff(dayjs('2017-06-01'),'years')
dayjs('2018-06-08').diff(dayjs('2017-06-01'),'day')
dayjs('2018-06-08').diff(dayjs('2017-06-01'),'hour')
* */
// console.log(dayjs().diff(dayjs('2020-08-09'),'hour'))

/*

增加时间并返回一个新的 Dayjs() 对象
dayjs().add(7, 'day')
dayjs().add(7, 'year')

减少时间并返回一个新的 Dayjs() 对象
dayjs().subtract(7, 'year')
dayjs().subtract(7, 'month')

返回当前时间的开头时间的 Dayjs() 对象，如月份的第一天。
dayjs().startOf('year')
dayjs().startOf('month')

返回当前时间的末尾时间的 Dayjs() 对象，如月份的最后一天。
dayjs().endOf('month')
dayjs().endOf('year')
* */

/*const lastUploadDateTime = Math.abs(dayjs(new Date()).diff(dayjs('2020-08-10 12:05:06'), 'hour'))
console.log(lastUploadDateTime)
if (lastUploadDateTime>72){
  console.log(Math.abs(dayjs(new Date()).diff(dayjs('2020-08-10 12:05:06'), 'day')))
  console.log('dayjs')
}
console.log(dayjs().diff(dayjs('2020-08-09'),'hour'))*/

/*const item = {
  uploadDate: null
}

const lastUploadDateTime2 = Math.abs(dayjs(new Date()).diff(dayjs(item.uploadDate || new Date()), 'hour'))
console.log(lastUploadDateTime2)

dayjs('2018-06-08').diff(dayjs('2017-06-01'),'years')*/

const time = '2020-10-09 09:0:00'
console.log(dayjs(time).add(24, 'hour').format('YYYY-MM-DD HH:ss:mm'));
// console.log(dayjs().add(7, 'year'));
console.log(dayjs('2018-06-01').isBefore(dayjs('2018-06-02')))
console.log(dayjs(null).isBefore(dayjs('2018-06-02')))
console.log('-------')
console.log(dayjs('').format('YYYY-MM-DD HH:ss:mm'));
