// ts支持阿静字面量作为类型使用,我们称之为字面量类型,每一个字面量类型只有一个可能的值,即字面量本身
// 5.5.1　boolean字面量类型
type BooleanAlias = true | false
const a: true = true
const b: false = false
let c2: boolean // 字面量可以赋值给Boolean字面量类型赋值
c2 = a
c2 = b
console.log(a, false, c2)

// 5.5.2　string字面量类型
const h: 'hello' = 'hello'
const h2: `hello` = 'hello'
let c: string = h2
c = h2
console.log(h, c)
// 5.5.3　数字字面量类型

// 5.5.4　枚举成员字面量类型
enum Direction31 {
    Up,
    Down,
    Left,
    Right
}

const up: Direction31.Up = Direction31.Up

console.log(Direction31, up)
