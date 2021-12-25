// console.log(process.arch)
// console.log(process.argv)
// console.log(process.config)


// console.log(process.cwd())
// console.log(process.env) // ��������
// console.log(process.platform) // win32
// console.log(process.title)
const childProcess = require('child_process')
const exec = childProcess.exec

let cmd = process.platform === 'win32' ? 'tasklist' : 'ps aux'
exec(cmd, function (error, stdout, stderr) {
  if (error) {
    console.log(error)
  }
  stdout.split('\n').forEach(row => {
    const processMessage = row.trim().split(/\s+/)
    console.log(processMessage)
    if (processMessage[0].indexOf('vlc') > -1) {
      console.log(row)
    }
  })
})
