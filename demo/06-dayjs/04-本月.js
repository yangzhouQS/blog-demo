const dayjs = require('dayjs');

/**
 * 日期格式化
 * @param date
 * @param format
 * @returns {*}
 */
function formatDate(date = new Date(), format = "YYYY-MM-DD HH:mm:ss") {
	return dayjs(date).format(format)
}

/**
 * 本日到当前时间
 * 本日: [2021-01-18 00:00:00 , 2021-01-18 23:59:59]
 * @returns {[string, *]}
 */
const getCurrentDate = () => [`${formatDate(new Date(), "YYYY-MM-DD")} 00:00:00`, formatDate()]

/**
 * 昨日
 * [ '2021-01-17 00:00:00', '2021-01-17 23:59:59' ]
 * @returns {[string, *]}
 */
const getBeforeDate = () => [`${formatDate(dayjs().subtract(1,'day'),'YYYY-MM-DD')} 00:00:00`, `${formatDate(dayjs().subtract(1,'day'),'YYYY-MM-DD')} 23:59:59`]
/**
 * 本月初到当前时间
 * 本月: [ '2021-01-01 00:00:00', '2021-01-18 22:40:01' ]
 * @returns {[string, *]}
 */
const getCurrentMonth = () => [`${formatDate(new Date(), "YYYY-MM")}-01 00:00:00`, formatDate()]
/**
 * 上月
 * [ '2020-12-01 00:00:00', '2020-12-31 23:59:59' ]
 * @returns {[string, *]}
 */
const getBeforeMonth = () => [`${formatDate(dayjs().subtract(1,'month'),'YYYY-MM')}-01 00:00:00`, `${formatDate(dayjs().subtract(1,'month'),'YYYY-MM')}-${dayjs(dayjs().subtract(1,'month')).daysInMonth()} 23:59:59`]

/**
 * 本年: 年初到当前时间
 * [ '2021-01-01 00:00:00', '2021-01-18 22:42:31' ]
 * @returns {[string, *]}
 */
const getCurrentYear = () => [`${dayjs().get('year')}-01-01 00:00:00`, formatDate()]

const getAllDate = () => ['1900-01-01 00:00:00', formatDate()]
console.log(getAllDate())
console.log('------------')
// console.log(dayjs().get('year'));
// console.log(dayjs().get('month') + 1);
// console.log(dayjs().get('month'));
// console.log(dayjs().daysInMonth());// 获取本月的天数

console.log(dayjs('2021-02').daysInMonth());// 获取本月的天数


console.log(dayjs('2021-02').format("YYYY-MM-DD HH:mm:ss"));// 获取本月的天数




