const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
const toString = Object.prototype.toString

/**
 * toString 数据类型检测
 * @param value
 * @returns {string|string}
 */
function getTag(value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]'
    }
    return toString.call(value)
}

/**
 * 数据类型检测
 * @param name
 * @returns {function(*=): boolean}
 */
function tagTester(name) {
    return function (obj) {
        return toString.call(obj) === '[object ' + name + ']';
    };
}


/**
 * 检查 value 是否为有效的类数组长度
 * @param value
 * @returns {boolean}
 */
function isLength(value) {
    return typeof value === "number" && value > -1 && value % 1 === 0 && value < MAX_SAFE_INTEGER;
}

/**
 * 检查 value 是否是类数组。 如果一个值被认为是类数组，那么它不是一个函数，
 * 并且value.length是个整数，大于等于 0，小于或等于 Number.MAX_SAFE_INTEGER。
 * @param value
 */
function isArrayLike(value) {
    return value != null && typeof value !== "function" && isLength(value)
}

/**
 * 检查 value 是否是一个类 arguments 对象
 * @param value
 * @returns {boolean}
 */
function isArguments(value) {
    return isObjectLike(value) && getTag(value) === '[object Arguments]'
}

/**
 * 检查 value 是否是 类对象。 如果一个值是类对象，那么它不应该是 null，而且 typeof 后的结果是 "object"
 * @param value
 * @returns {boolean}
 */
function isObjectLike(value) {
    return value != null && typeof value === "object"
}

/**
 * 检查 value 是否为 Object 的 language type。
 * (例如： arrays, functions, objects, regexes,new Number(0), 以及 new String(''))
 * @param value
 * @returns {boolean}
 */
function isObject(value) {
    return value != null && (typeof value === "object" || typeof value === 'function')
}


function isArray(value) {
    return Array.isArray(value) || getTag(value) === 'Array'
}

