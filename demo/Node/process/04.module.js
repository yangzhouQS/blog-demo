const vm = require('vm')
const path = require('path')
const fs = require('fs')
const fn = vm.runInThisContext(`
(function(module,exports,require,__filename,__dirname){
  console.log(this)
  console.log("hello word");
})
`)
fn.call(this, module.exports, require, __filename, __dirname)

// 1>node模块会按照后缀名查找 .js .json
function Module(id) {
  this.id = id
  this.exports = {}// 模块结果
}

Module.wrapper = [
  '(function(module,exports,require,__filename,__dirname){',

  '})'
]
Module.extensions = {
  '.js'(module) {
    let script = fs.readFileSync(module.id, 'utf8')
    const fnStr = Module.wrapper[0] + script + Module.wrapper[1]
    let fn = vm.runInThisContext(fnStr) // 让字符串变成js代码
    fn.call(module.exports, module, module.exports, req, module.id, path.dirname(module.id))
  },
  '.json'(module) {
    let script = fs.readFileSync(module.id, 'utf8')
    module.exports = JSON.parse(script)
  }
}

Module.resolveFileName = function (filename) {
  // 1>相对路径转换为绝对路径
  let absPath = path.resolve(__dirname, filename)
  // 同步判断文件是否存在
  const flag = fs.existsSync(absPath)
  let current = absPath;
  if (!flag) {
    const keys = Object.keys(Module.extensions)
    for (const key of keys) {
      current = absPath + key
      let flag = fs.existsSync(current)
      if (flag) {
        break
      } else {
        current = null;
      }
    }
  }
  if (!current) { // 没有找到文件
    throw new Error('文件不存在')
  }
  return current
}
Module.prototype.load = function () {
  let ext = path.extname(this.id) // 获取扩展名称
  Module.extensions[ext](this)
}
Module._cache = {}

function req(filename) {
  let current = Module.resolveFileName(filename)
  if (Module._cache[current]) {
    return Module._cache[current].exports
  }
  let module = new Module(current)
  Module._cache[current] = module
  module.load()
  return module.exports
}

let a = req('./demo.js')
a = req('./demo.js')
console.log(a)
