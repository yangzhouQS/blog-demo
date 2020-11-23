/*
* 判断数据类型
* 1>typeof 基本数据类型和判断 , 复杂数据类型无法判断
* 2>constructor: 判断构造函数
* 3>instanceof
* 4>toString.call
* */

/**
 * 获取数据类型
 * @param typeing 数据类型
 * @returns {function(*=): boolean}
 */
function isType(typeing) {
    return function (val) {
        return Object.prototype.toString.call(val) === `[object ${typeing}]`
    }
}

const utils = {};
;['Number', 'String', 'Array', 'Date', 'Set', 'Map', 'RegExp'].forEach(method => {
    utils[`is${method}`] = isType(method)
})
console.log(Object.prototype.toString.call(1))
console.log(Object.prototype.toString.call(''))
console.log(Object.prototype.toString.call([]))
console.log(Object.prototype.toString.call(new Date()))
console.log(Object.prototype.toString.call(new Set()))
console.log(Object.prototype.toString.call(new Map()))
console.log(Object.prototype.toString.call(new RegExp()))
console.log(isType('', 'String'))
console.log(utils.isNumber(222));

function curring(fn, ...arg) {
    const len = fn.length
    return function (...args) {
        const newArgs = [...arg, ...args]
        if (newArgs.length === len) {
            return fn(...newArgs)
        } else if (newArgs.length < len) {
            return curring(fn, ...newArgs)
        }
    }
}

const newFunc = curring(sum)
console.log(newFunc(1, 2, 3, 4))
console.log(newFunc(1, 2)(3)(4))
console.log(curring(sum, 1, 2, 3, 4));

function sum(a, b, c, d) {
    return a + b + c + d
}

function isType2(typeing, val) {
    return Object.prototype.toString.call(val) === `[object ${typeing}]`
}

// 柯里化函数的应用
const newIsType = curring(isType2)
const isString = newIsType('String')
console.log(isString('aa'));