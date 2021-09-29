/*
type Transform<T> = (input: T) => T;

/!**
 * 以 input 作为输入，按序使用 transform。transform 是一个简单的纯函数，transform 的参数类型与返回值类型相同
 * applyTransforms(input, f1, f2, f3) 等价于 f3(f2(f1(input)))
 * @param input
 * @param transforms
 *!/
function applyTransforms<T>(input: T, ...transforms: Transform<T>[]) {
    return transforms.reduce((v, fn) => fn(v), input)
}

*/

function applyTransforms(input, ...transforms) {
    return transforms.reduce((v, fn) => fn(v), input)
}

const fn1 = (a) => a + 1
const fn2 = (a) => a + 2

console.log(applyTransforms(0, fn2, fn2))
