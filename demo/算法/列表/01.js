/*function List() {
	this.listSize = 0
	this.pos = 0
	this.dataStore = [] //初始化一个空数组来保存列表元素
	this.clear = clear
	this.find = find
	this.toString = toString
	this.insert = insert
	this.append = append
	this.remove = remove
	this.front = front
	this.end = end
	this.prev = prev
	this.next = next
	this.length = length
	this.currPos = currPos
	this.moveTo = moveTo
	this.getElement = getElement
	this.contains = contains
}*/
class List {
	constructor() {
		this.listSize = 0
		this.pos = 0
		this.dataStore = [] //初始化一个空数组来保存列表元素
	}
	
	/**
	 * 判断给定值是否在列表
	 * @param element
	 * @returns {boolean}
	 */
	contains(element) {
		return this.dataStore.includes(element)
	}
	
	
	append(...args) {
		this.listSize += args.length
		this.dataStore.push(...args)
		return this.dataStore
	}
	
	/**
	 * 移除指定元素
	 * @param element
	 * @returns {boolean}
	 */
	remove(element) {
		const foundAt = this.findIndex(element)
		if (foundAt > -1) {
			this.dataStore.splice(foundAt, 1)
			--this.listSize
			return true
		}
		return false
	}
	
	/**
	 * 指定元素后边插入元素
	 * @param element 插入元素
	 * @param after 插入目标元素
	 * @returns {boolean}
	 */
	insert(element, after) {
		const insertPos = this.findIndex(after)
		if (insertPos > -1) {
			this.dataStore.splice(insertPos + 1, 0, element)
			++this.listSize
			return true
		}
		return false
	}
	
	/**
	 * 返回当前位置的元素
	 * @returns {*}
	 */
	getElement() {
		return this.dataStore[this.pos]
	}
	
	/**
	 * 将当前位置移动到指定位置
	 * @param position
	 */
	moveTo(position) {
		this.pos = position
	}
	
	currPos() {
		return this.pos
	}
	
	length() {
		return this.listSize
	}
	
	next() {
		if (this.pos < this.listSize - 1) {
			++this.pos
		}
	}
	
	prev() {
		if (this.pos > 0) {
			--this.pos
		}
	}
	
	/**
	 * 将当前位置移动到最后位置
	 */
	end() {
		this.pos = this.listSize - 1
	}
	
	/**
	 * 当前位置设移动到第一个元素
	 */
	front() {
		this.pos = 0
	}
	
	
	clear() {
		this.dataStore = []
		this.dataStore.length = 0
		this.listSize = 0
		this.pos = 0
	}
	
	find(element) {
		return this.dataStore.find((row) => row === element)
	}
	
	findIndex(element) {
		return this.dataStore.findIndex((row) => row === element)
	}
	
	toString() {
		return this.dataStore
	}
}

let list = new List()
list.append(1, 2, 3, 4)
list.insert('a', 2)

for (list.front(); list.currPos() < list.length(); list.next()) {
	console.log(list.getElement())
	console.log('pos = ', list.currPos(), list.pos, list.length())
}


/*for (list.end(); list.currPos() >= 0; list.prev()) {
	console.log(list.getElement())
}*/

