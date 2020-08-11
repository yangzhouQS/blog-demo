const _toNumber = (number, len = 2) => {
  return Number(Number(number).toFixed(len)) || 0
}

console.log(_toNumber(''))
console.log(_toNumber(NaN))
console.log(_toNumber(undefined))
console.log(_toNumber('assdssd'))
console.log(_toNumber('assdssd'))