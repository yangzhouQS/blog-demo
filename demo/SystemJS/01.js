/*
const _ = require('lodash')
// const sleep = async time => new Promise(r => setTimeout(r, time))
let startTime = new Date().getTime()
const sleep = async function (time) {
  return new Promise(r => {
    setTimeout(r, time)
  })
}
~(async function main() {
  while (true) {
    console.log('lodash map exists:', typeof _.map)
    let endTime = new Date().getTime()
    console.log(endTime - startTime)
    startTime = endTime
    await sleep(1000)
  }
})()
*/
const map = new Map();
map.set(1, 1);
map.set('a', 2);
map.set(3, 3);
map.set(4, 4);
console.log(map.values())
console.log(map.keys())
for (const mapElement of map.keys()) {
  console.log(mapElement)
}
