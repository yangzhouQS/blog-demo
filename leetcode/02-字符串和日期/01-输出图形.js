
let index = 0
for (let i = 65; i <= 90; i++) {
  let byteStr = String.fromCharCode(i)
  // console.log(2 * index + 1)
  let spaceNum = 2 * index + 1
  let outStr = byteStr.padStart(spaceNum, byteStr)
  console.log(outStr.padStart((51-spaceNum)/ 2, ' '))
  for (let j = 0; j < index; j++) {

  }
  // console.log(i, '=>', byteStr)
  index++
}

// 计蒜客