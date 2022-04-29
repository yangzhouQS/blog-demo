/*
* 链表是由一组节点 组成的集合。每个节点都使用一个对象的引用指向它的后继。指向另一个节点的引用叫做链 。
* */
class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.count = 0
    this.head = undefined // new Node('head')
    this.equalsFn = function (a, b) {
      return a === b
    }
  }

  /**
   * 该方法遍历链表，查找给定数据。如果找到数据，该方法就返回保存该数据的节点。
   * @param item
   * @returns {Node}
   */
  find(item) {
    let currentNode = this.head
    while (currentNode && currentNode.element != item) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  push(element) {
    const node = new Node(element)
    let current
    if (this.head == null) {
      this.head = node
    } else {
      current = this.head
      while (current.next != null) {
        current = current.next
      }

      // next赋值新元素
      current.next = node
    }

    // 链表长度递增
    this.count++
  }

  /**
   * 将新节点的next 属性设置为“后面”节点的next 属性对应的值。然后设置“后面”节点的next 属性指向新节点。
   * @param element
   * @param position
   */
  insert(element, position) {
    let newNode = new Node(element)
    let currentNode = this.find(item)
    newNode.next = currentNode.next
    currentNode.next = newNode
  }

  getElementAt(index) {
    if (index > 0 && index < this.count) {
      let node = this.head
      for (let i = 0; i < index && node != null; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }


  /**
   * 从链表移除一个元素
   * @param element
   */
  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  indexOf(element) {
    let current = this.head
    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }

  /**
   * 从链表的特定位置移除一个元素
   * @param index
   */
  removeAt(index) {
    if (index >= 0 && index < count) {
      let current = this.head
      // 移除第一项
      if (index === 0) {
        this.head = current.next
      } else {
        let previous
        for (let i = 0; i < index; i++) {
          previous = current
          current = current.next
        }
        // 将 previous 与 current 的下一项链接起来：跳过 current，从而移除它
        previous.next = current.next
      }
      this.count--
      return current.element
    }
    return undefined
  }

  /**
   * 链表长度为0 返回true
   * @returns {boolean}
   */
  isEmpty() {
    return this.size() === 0
  }

  size() {
    return this.count
  }

  getHead() {
    return this.head
  }

  toString() {
    if (this.head == null) {
      return ' '
    }
    let objString = `${ this.head.element }`
    let current = this.head.next
    for (let i = 0; i < this.size() && current != null; i++) {
      objString = `${ objString },${ current.element }`
      current = current.next
    }
    return objString
  }
}

let linkedList = new LinkedList()

linkedList.push(111)
linkedList.push(222)
linkedList.push(333)
linkedList.push(444)
linkedList.push(555)

console.log(linkedList.indexOf(333))
console.log(linkedList.indexOf(555))
