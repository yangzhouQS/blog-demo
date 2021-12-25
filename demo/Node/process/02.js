// 获取操作系统平台
console.log(process.platform)
// console.log(Reflect.ownKeys(process))
console.log(process.version) // 获取node版本
// console.log(process.versions) // node版本详细信息
console.log(process.arch) // x64
// console.log(process.release) //
console.log(process.argv)
console.log(process.argv.slice(2))
let config = process.argv.slice(2).reduce((memo, current, index, array) => {
  if (current.includes('--')) {
    memo[current.slice(2)] = array[index + 1]
  }
  return memo
}, {})
// console.log(config)
const path = require('path')
console.log(path.resolve())
console.log(process.cwd())
// console.log(process.env)


Promise.resolve().then(() => {
  console.log(111, arguments)
}).catch(e => {
  console.log(e)
})

// nextTick node中的微任务
process.nextTick(() => {
  console.log(22, 'nextTick')
})

// setImmediate 宏任务
require('fs').readFile('./02.txt', function (err, f) {
  console.log()
})


/*
[
  'version',
  'versions',
  'arch',
  'platform',
  'release',
  '_rawDebug',
  'moduleLoadList',
  'binding',
  '_linkedBinding',
  '_events',
  '_eventsCount',
  '_maxListeners',
  'domain',
  '_exiting',
  'config',
  'dlopen',
  'uptime',
  '_getActiveRequests',
  '_getActiveHandles',
  'reallyExit',
  '_kill',
  'hrtime',
  'cpuUsage',
  'resourceUsage',
  'memoryUsage',
  'kill',
  'exit',
  'openStdin',
  'allowedNodeEnvironmentFlags',
  'assert',
  'features',
  '_fatalException',
  'setUncaughtExceptionCaptureCallback',
  'hasUncaughtExceptionCaptureCallback',
  'emitWarning',
  'nextTick',
  '_tickCallback',
  '_debugProcess',
  '_debugEnd',
  '_startProfilerIdleNotifier',
  '_stopProfilerIdleNotifier',
  'stdout',
  'stdin',
  'stderr',
  'abort',
  'umask',
  'chdir',
  'cwd',
  'env',
  'title',
  'argv',
  'execArgv',
  'pid',
  'ppid',
  'execPath',
  'debugPort',
  'argv0',
  '_preload_modules',
  'mainModule',
  Symbol(kCapture),
  Symbol(Symbol.toStringTag)
]
* */
