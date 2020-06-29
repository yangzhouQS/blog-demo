class Node {
  constructor(el) {
    this.el = el
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = new Node('head')
  }

  /**
   * 指定元素后面插入节点元素
   * @param el 插入的节点
   * @param item 参考节点
   */
  insert(el, item) {
    const newElement = new Node(el)
    let currentNode = this.find(item)
    newElement.next = currentNode.next
    currentNode.next = newElement
  }

  remove() {
  }

  /**
   * 搜索节点
   * @param item
   * @returns {null}
   */
  find(item) {
    let currentNode = this.head
    if(currentNode && currentNode.el !== item){
      currentNode = currentNode.next
    }
    return currentNode
  }
}
