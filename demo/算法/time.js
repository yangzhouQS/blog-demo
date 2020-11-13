const timeStr = 'time'
const time = {
  start: (timeStr) => {
    console.time(timeStr)
  },
  end: (timeStr) => {
    console.timeEnd(timeStr)
  }
}

module.exports = {
  time
}
