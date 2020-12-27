const {MyArray} = require('../数组/Array')

class Stack {
  constructor() {
    this.data = new MyArray()
  }

  // 销毁栈
  destroyStack() {
    this.data.clear()
  }

  /**
   * 进栈
   * @param element
   */
  push(element) {
    return this.data.addLast(element)
  }

  // 出栈
  pop() {
    if(!this.isEmpty()) {
      return this.data.removeLast()
    } else {
      return undefined
    }
  }

  // 获取栈顶元素
  peek() {
    return this.data.index(this.getSize())
  }

  getSize() {
    return this.data.getSize()
  }

  isEmpty() {
    return this.data.getSize() === 0
  }
}

const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
// console.log(stack)
// console.log(stack.peek())
// console.log(stack.pop())
// console.log(stack.pop())


const A = []
A.splice(0, 0, 1)
A.splice(1, 0, 2)
A.splice(2, 0, 3)
console.log(A)