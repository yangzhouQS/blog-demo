// 1.any
let x: any = 1
x = false
x = true
x = 'hello'
x = null
x = undefined
console.log(x)


// 2.unknown: unknown类型只能赋值给any类型
let y: unknown
console.log(y)

export {}
