/*
* 高阶函数
* 1>函数作为参数回调
* 2>返回值作为函数
* */

// 在原有函数基础上进行扩展
function core(a, b) {
    console.log(arguments)
    console.log('core')
}

Function.prototype.before = function (beforeFn) {
    // that 为core函数
    const that = this
    // 监听函数没有自己的this 没有arguments 没有prototype
    return (...args) => {
        beforeFn()
        this(...args)
    }
}

Function.prototype.after = function () {

}
const newFunc = core.before(() => {
    console.log('before')
})
newFunc(1, 2, 3, {a: 1})

// 闭包:1>定义函数的作用域和调用函数的作用域不是同一个
