// 1.boolean类型
const yes: boolean = true
const no: boolean = false
console.log(yes, no)

// 2.string字符串类型
const foo: string = 'foo'
const bar: string = 'bar'
console.log(foo, bar)

// 2.number类型

const bin: number = 0b1010 // 二进制

const oct: number = 0o744 // 八进制

const integer: number = 100 // 十进制

const hex: number = 0xffffff // 十六进制
console.log(bin, oct, integer, hex)

// 4.bigint
const big: bigint = 0b1010n

console.log(big)

// 5.symbol与unique symbol
const key: symbol = Symbol()
const sh: symbol = Symbol.hasInstance
console.log(key, sh) // Symbol() Symbol(Symbol.hasInstance)

const s0: symbol = Symbol()
const s1: symbol = Symbol.for('foo')

// 对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。
const s2: symbol = Symbol.hasInstance

class Person {
    static [Symbol.hasInstance](obj) {
        return true
    }
}

const p = new Person()
const p2 = {}
console.log(p instanceof Person)
console.log(p2 instanceof Person) // true

const x: unique symbol = Symbol()
const y: symbol = Symbol()

interface IPersion {
    [x]: string // 正确的
    // A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
    // 接口中的计算属性名称必须为引用类型为字面变量类型
    // [y]: string // 错误
}

// 6。Nullable
// 7.void: void类型标识某个值不存在,该类型作函数的返回值类型.
function log(): void {
    return undefined
}

function log2() {
    return null
}
