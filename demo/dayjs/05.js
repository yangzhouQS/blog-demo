const dayjs = require('dayjs')


console.log(new Date(dayjs().format('YYYY-MM-DD')).getTime())
console.log(new Date(dayjs().format('YYYY-MM-DD')).getTime() - 24 * 3600)
console.log()
console.log(dayjs(new Date(dayjs().format('YYYY-MM-DD')).getTime() - 24 * 3600).format('YYYY-MM-DD HH:mm:ss'))
console.log(dayjs().format('YYYY-MM-DD'))

console.log(dayjs().subtract(1, 'day').format('YYYY-MM-DD'))

// 本月开始 到当前时间
console.log(dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'))
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))

console.log(dayjs('2021-04').date())
console.log(dayjs().get('month'))
console.log(dayjs().get('date'))

console.log('---本年---')
console.log(dayjs().startOf('year').format('YYYY-MM-DD HH:mm:ss'))
console.log(dayjs().endOf('year').format('YYYY-MM-DD HH:mm:ss'))
console.log('---本月---')
console.log(dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'))
console.log(dayjs().endOf('month').format('YYYY-MM-DD HH:mm:ss'))

console.log('----本周---')
console.log(dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD HH:mm:ss'))
console.log(dayjs().endOf('week').add(1, 'day').format('YYYY-MM-DD HH:mm:ss'))

const formatDate = (date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
	return dayjs(date).format(format)
}

const last = [
	formatDate(dayjs().subtract(1, 'week').startOf('week').add(1, 'day')),
	formatDate(dayjs().subtract(1, 'week').endOf('week').add(1, 'day'))
]
const week2 = [
	formatDate(dayjs().startOf('week').add(1, 'day')),
	formatDate(dayjs().endOf('week').add(1, 'day'))
]
console.log(last, week2)
console.log(dayjs().get('month'))
console.log(dayjs().endOf('month').format('YYYY-MM-DD HH:mm:ss'))
console.log(dayjs().daysInMonth());// 获取本月的天数
console.log(dayjs('2021-02').daysInMonth());// 获取本月的天数
console.log(dayjs('2021-04-01 00:00:00').daysInMonth());// 获取本月的天数
// 随机数区间
// console.log(Math.floor(Math.random() * (max - min + 1) + min))

console.log(dayjs().get('month'))
console.log(dayjs().get('date'))
console.log(dayjs().get('hour'))
console.log(dayjs().get('day'))
console.log(dayjs('2021-05-10').get('day'));
console.log(dayjs('2021-05-11').get('day'));
console.log(dayjs('2021-05-12').get('day'));
console.log(dayjs('2021-05-13').get('day'));
console.log(dayjs('2021-05-14').get('day'));
console.log(dayjs('2021-05-15').get('day'));
console.log(dayjs('2021-05-16').get('day'));

console.log('--------')
const day = 0
for (let i = 1; i <= 1; i++) {
	console.log(i)
}

console.log(dayjs().add(7, 'day').format('YYYY-MM-DD'))

console.log(dayjs('2021-01-12 10:27:32').isValid())

console.log(Number.isFinite(1221))
console.log() // 2021
console.log(`${ dayjs().format('YYYY') + '-01-01 00:00:00' }`, dayjs().format('YYYY-MM-DD') + ' 23:59:59') // 2021
console.log(dayjs('07-27').format('YYYY-MM-DD'))
