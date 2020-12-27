/**
 * Math.ceil();  //向上取整。
 Math.floor();  //向下取整。
 Math.round();  //四舍五入。
 Math.random();  //0.0 ~ 1.0 之间的一个伪随机数。【包含0不包含1】 //比如0.8647578968666494

 Math.ceil(Math.random()*10);      // 获取从1到10的随机整数 ，取0的概率极小。
 Math.round(Math.random());   //可均衡获取0到1的随机整数。
 Math.floor(Math.random()*10);  //可均衡获取0到9的随机整数。
 Math.round(Math.random()*10);  //基本均衡获取0到10的随机整数，其中获取最小值0和最大值10的几率少一半。
 //因为结果在0~0.4 为0，0.5到1.4为1  ...  8.5到9.4为9，9.5到9.9为10。所以头尾的分布区间只有其他数字的一半

 */

/**
 * 随机整数数组
 * @param n
 * @returns {[]}
 * @constructor
 */
function ArrayGenerate(n) {
  const ret = []
  while (n > 0) {
    n--
    const num = randomNum(0, n)
    ret.push(num)
  }
  return ret
}

/**
 * 生成从minNum到maxNum的随机数
 * 生成[n,m]的随机整数的函数
 * Math.random() 生成 [0,1) 的数，所以 Math.random()*5 生成 {0,5) 的数。
 * parseInt() 可以简单理解成返回舍去参数的小数部分后的整数，所以 parseInt(Math.random()*5) 生成的是 [0,4] 的随机整数。
 * @param minNum
 * @param maxNum
 * @returns {number}
 */
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      // return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
      break;
    default:
      return 0;
      break;
  }
}

/**
 * 交换数组元素
 * @param array
 * @param index
 * @param itemIndex
 */
function swap(array, index, itemIndex) {
  const tmp = array[index]
  array[index] = array[itemIndex]
  array[itemIndex] = tmp
}

module.exports = {
  ArrayGenerate,
  randomNum,
  swap
}