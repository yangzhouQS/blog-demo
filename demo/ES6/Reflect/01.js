/*
概述
Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。Reflect对象的设计目的有这样几个。

（1） 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。

（2） 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。

（3） 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。

（4）Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。

Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)
* */

console.log(Math.floor.apply(null,[3.1666]))
console.log(Reflect.apply(Math.floor,null,[666.666]))


console.log(new Date())
console.log(Reflect.construct(Date,[]))

let obj = {
  a:1,
  get num(){
    console.log(this)
    return this.a + 100
  },
}

/**
 * target
 *    需要取值的目标对象
 *  propertyKey
 *    需要获取的值的键值
 *  receiver
 *    如果target对象中指定了getter，receiver则为getter调用时的this值。
 */
// Reflect.get(target, propertyKey[, receiver])
console.log(Reflect.get(obj,'a')) // 1
console.log(Reflect.get(obj,'b')) // undefined
console.log(Reflect.get(obj,'num', { a:100 })) // 200

// Reflect.set() 静态方法 Reflect.set() 工作方式就像在一个对象上设置一个属性。
let ret = Reflect.set(obj,'b',666)
console.log(ret) // true
console.log(obj)

// 静态方法 Reflect.has() 作用与 in 操作符 相同。
console.log(Reflect.has(obj,'a')) // true

// Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。
// ret = Reflect.deleteProperty(obj,'a')
// console.log(obj)

//Reflect.getPrototypeOf(obj)
// Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。
console.log(Reflect.getPrototypeOf(obj))


// Reflect.getOwnPropertyDescriptor(target, propertyKey)
console.log(Reflect.getOwnPropertyDescriptor(obj,'a'))

// Reflect.isExtensible (target)
// Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
console.log(Reflect.isExtensible(obj)) // true
Object.freeze(obj)
console.log(Reflect.isExtensible(obj)) // false
console.log(Object.isExtensible(obj))


//Reflect.preventExtensions(target)
// Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
let o = {a:1}
console.log(Reflect.isExtensible(o))
ret = Reflect.preventExtensions(o)
console.log(Reflect.isExtensible(o))


console.log(Object.preventExtensions(1))
// console.log(Reflect.preventExtensions(1)) // Reflect.preventExtensions called on non-object