/**
 * 判断是否为类数组
 * @param arr
 * @returns {boolean}
 */
function isArrayLikeObject(arr) {
  if (arr == null || typeof arr !== 'object') {
    return false
  }
  const lengthMaxValue = Math.pow(2, 53) - 1
  if (!Object.prototype.hasOwnProperty.call(arr, 'length')) {
    return false
  }
  if (typeof arr.length !== 'number') {
    return false
  }
  if (!isFinite(arr.length)) {
    return false
  }
  if (Array === arr.constructor) {
    return false
  }
  if (arr.length > 0 && arr.length < lengthMaxValue) {
    return true
  } else {
    return false
  }
}
