const dayjs = require('dayjs')
const currentDate = () => new Date()
const now = '2020-09'


function getDayjs (date) {
  return dayjs(date)
}


function getYear (date = new Date()) {
  return getDayjs(date).year()
}

function getMonth (date = new Date()) {
  return getDayjs(date).month()
}

function getQuarter (date = new Date()) {
  const month = getMonth(date)
  switch (month) {
    case 0:
    case 1:
    case 2:
      return 1
    case 3:
    case 4:
    case 5:
      return 2
    case 6:
    case 7:
    case 8:
      return 3
    case 9:
    case 10:
    case 11:
      return 4
  }
  return getDayjs(date).year()
}

function quarterToDate (date = new Date()) {
  const year = getYear(date)
  const q = getQuarter(date)
  switch (q) {
    case 1:
    case "第一季度":
      return [ `${ year }-01`, `${ year }-03` ]
    case 2:
    case "第二季度":
      return [ `${ year }-04`, `${ year }-06` ]
    case 3:
    case "第三季度":
      return [ `${ year }-07`, `${ year }-09` ]
    case 4:
    case "第四季度":
      return [ `${ year }-10`, `${ year }-12` ]
  }
}

// console.log(quarterToDate());

function getAccountDate (date = new Date()) {
  const year = (new Date(date)).getFullYear()
  const month = (new Date(date)).getMonth()
  let quarter = -1
  switch (month) {
    case 0:
    case 1:
    case 2:
      quarter = 1
      break
    case 3:
    case 4:
    case 5:
      quarter = 2
      break
    case 6:
    case 7:
    case 8:
      quarter = 3
      break
    case 9:
    case 10:
    case 11:
      quarter = 4
      break
  }
  switch (quarter) {
    case 1:
      return { beginDate: `${ year }-01`, endDate: `${ year }-03` }
    case 2:
      return { beginDate: `${ year }-04`, endDate: `${ year }-06` }
    case 3:
      return { beginDate: `${ year }-07`, endDate: `${ year }-09` }
    case 4:
      return { beginDate: `${ year }-10`, endDate: `${ year }-12` }
  }
}

console.log(getQuarter())
console.log(quarterToDate())
console.log( dayjs().get('month'))
