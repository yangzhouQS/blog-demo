console.log('hello');

// 原始数据类型
const bool: boolean = false;
const num: number = 123;
// @ts-ignore
const str: string = 'hello word';
console.log(bool, num, str);

// 数组
const arr1: number[] = [ 1, 2, 3 ];
const arr2: Array<number> = [ 4, 5, 6 ];
const arr3: Array<number | string> = [ 1, 2, 'hello' ];
// console.log(arr1, arr2, arr3);

// 元组类型
const tuple: [ number, string, boolean ] = [ 123, 'hello', false ];
// console.log(tuple);

// 函数
function add<T>(a: T, b: T): T {
  return a;
}
