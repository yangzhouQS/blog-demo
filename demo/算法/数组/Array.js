class Array {
  constructor() {
    this.data = []
    this.size = 0
  }

  /**
   * 获取数组元素个数
   * @returns {number}
   */
  getSize() {
    return this.size
  }

  /**
   * 获取数组容量
   * @returns {number}
   */
  getCapacity() {
    return this.data.length
  }

  /**
   * 数组是否为空
   * @returns {boolean}
   */
  isEmpty() {
    return this.size === 0
  }

  clear() {
    this.data = []
    this.size = 0
  }

  /**
   * 数组元素的末尾添加元素
   * @param element
   */
  addLast(element) {
    return this.add(this.size - 1, element)
  }

  /**
   * 数组头部添加元素
   * @param element
   */
  addFirst(element) {
    return this.add(0, element)
  }

  /**
   * 在指定位置插入元素
   * @param index
   * @param element
   */
  add(index, element) {
    this.data.splice(index, 0, element)
    this.size++
    return this.data
  }

  toString() {
    return JSON.stringify(this.data)
  }

  /**
   * 返回指定索引位置元素
   * @param index
   * @returns {*}
   */
  index(index) {
    if(index >= this.size) {
      throw new Error(`索引${index}超过数组长度`)
    }
    return this.data[index]
  }

  /**
   * 元素element是否在数组中
   * @param element
   * @returns {boolean}
   */
  contains(element) {
    for (const datum of this.data) {
      if(datum === element) return true
      return false
    }
  }

  /**
   * 返回指定元素第一次出现的索引
   * @param element
   * @returns {number}
   */
  find(element) {
    for (let i = 0; i < this.data.length; i++) {
      const datum = this.data[i];
      if(datum === element) return i
    }
    return -1
  }

  /**
   * 数组指定索引删除元素
   * @param index
   */
  remove(index) {
    if(index < 0 || index > this.size) {
      throw new Error(`索引${index}不存在对应元素`)
    }
    const ret = this.data.splice(index, 1)
    this.size--
    return ret
  }

  removeFirst() {
    return this.remove(0)
  }

  removeLast() {
    return this.remove(this.size - 1)
  }

  /**
   * 删除一个指定元素
   * @param element
   * @returns {boolean}
   */
  removeElement(element) {
    const index = this.find(element)
    if(index > -1) {
      this.remove(index)
    } else {
      return false
    }
  }

  removeAllElement(element) {

  }
}

module.exports = {
  MyArray: Array
}
// const arr = new Array()

// arr.addLast(1)
// arr.addLast(3)
// arr.addLast(5)
// arr.add(1, 0)
// arr.addFirst(2)
// arr.removeFirst()
// arr.removeLast()
// console.log(arr.toString())