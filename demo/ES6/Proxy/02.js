function Foo() {
  console.log('Foo')
}

const newFoo = new Proxy(Foo, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, argArray)
  },
  /**
   * 于调用新目标。它还提供了添加的选项来指定其他原型。
   * @param target 此参数是将要调用的目标函数
   * @param argArray 此参数是一个array-like对象，用于指定应调用目标的参数。
   * @param newTarget 它是一个可选参数。应该使用其原型的构造函数。
   * @returns {any}
   */
  construct(target, argArray, newTarget) {
    console.log('console.log()')
    if (newTarget) {
      Reflect.setPrototypeOf(target, newTarget)
    }
    return Reflect.construct(target, argArray)
  }
})

const f = new Foo()
console.log(Object.getPrototypeOf(f))
Foo.apply(null, 1, 2)
