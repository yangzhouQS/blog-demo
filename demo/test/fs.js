const fs = require('demo/test/fs')
fs.readFile('./test.txt',(err,data)=>{
  if (err) throw new Error(err)
  console.log(data.toString())
})

console.log("099090909")
