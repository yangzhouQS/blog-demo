const obj = {
  name: 'sam',
  [Symbol('age')]: 16
}
/*
Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
* */
const newObj = new Proxy(obj, {

  // 对象获取属性
  get(target, p, receiver) {
    console.log('get-->', target, p, receiver)
    if (Reflect.has(target, p)) {
      return Reflect.get(target, p)
    } else {
      return null
    }
  },

  // 对象设置属性
  set(target, p, value, receiver) {
    if (Reflect.isExtensible(target)) {
      Reflect.set(target, p, value)
    } else {
      return null
    }
  },

  // 获取原型对象
  getPrototypeOf(target) {
    return Reflect.getPrototypeOf(target)
  },

  // 设置原型对象
  setPrototypeOf(target, v) {
    return Reflect.setPrototypeOf(target, v)
  },

  // 对象是否可以扩展
  isExtensible(target) {
    return Reflect.isExtensible(target)
  },

  // 设置对象不可扩展
  preventExtensions(target) { // obj：要配置为不可扩展的对象
    console.log('preventExtensions')
    target.canEvole = false
    Object.preventExtensions(target)
    return true
  },
  // 返回指定对象所有自身属性（非继承属性）的描述对象
  getOwnPropertyDescriptor(target, p) {
    return Reflect.getOwnPropertyDescriptor(target, p)
  },
  defineProperty(target, p, descriptor) {
  },

  // in操作符拦截
  has(target, p) {
    return Reflect.has(target, p)
  },

  // delete删除数拦截
  deleteProperty(target, p) {
    return Reflect.deleteProperty(target, p)
  },

  // Object.keys()拦截器
  ownKeys(target) {
    return Reflect.ownKeys(target)
  },

  // 函数apply操作拦截器
  apply(target, thisArg, argArray) {
  },

  // new操作拦截器
  construct(target, argArray, newTarget) {
  }
})
console.log(newObj.name2)
console.log(Object.getOwnPropertyNames(newObj))
console.log(Object.getOwnPropertySymbols(newObj))
// delete newObj.name
// console.log(newObj)
console.log('name' in newObj)
console.log('设置对象不可以扩展: ', Object.preventExtensions(newObj))
console.log('检查对象是否可以扩展: ', Object.isExtensible(newObj))

// { value: 'sam', writable: true, enumerable: true, configurable: true }
console.log(Object.getOwnPropertyDescriptor(newObj, 'name'))
console.log(Object.getPrototypeOf(newObj))
