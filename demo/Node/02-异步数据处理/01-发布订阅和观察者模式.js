const fs = require('fs')

// 异步串行(解决异步问, 核心就是回调函数)
const after = (timers, cb) => {
    return function () {
        --timers === 0 && cb()
    }
}
const obj = {}
// 函数调用达到指定次数就执行回调函数
const fn = after(2, () => {
    console.log(obj)
})
fs.readFile('./a.txt', 'utf8', (err, data) => {
    if (err) {
        throw new Error(err)
    }
    obj.a = data.toString()
    fn();
})
fs.readFile('./a.txt', 'utf8', (err, data) => {
    if (err) {
        throw new Error(err)
    }
    obj.b = data.toString()
    fn();
})


// 发布订阅 解决回调问题


// 观察者模式