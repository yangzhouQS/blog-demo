const fs = require('fs');
const readline = require('readline');
const Sequelize = {
  STRING(v) {
    return `STRING(${ v })`
  },
  INTEGER: 'INTEGER',
  BOOLEAN: 'BOOLEAN',
  DECIMAL(a, b) {
    return `DECIMAL(${ a }, ${ b })`
  },
  DATE: 'DATE',
  BIGINT: 'BIGINT'
}

function readFileToArr(fReadName, callback) {
  let fRead = fs.createReadStream(fReadName);
  let objReadline = readline.createInterface({
    input: fRead
  });
  let arr = new Array();
  objReadline.on('line', function (line) {
    arr.push(line);
  });
  objReadline.on('close', function () {
    callback(arr);
  });
}

readFileToArr('./source.js', function (content) {
  let newLineArr = content.filter(row => row.includes('type'))
  console.log(newLineArr)
})
