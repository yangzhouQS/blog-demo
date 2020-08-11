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
		this.head = new Node('head')
	}
	
	/**
	 * 该方法遍历链表，查找给定数据。如果找到数据，该方法就返回保存该数据的节点。
	 * @param item
	 * @returns {Node}
	 */
	find(item) {
		let currentNode = this.head
		while (currentNode&&currentNode.element != item) {
			currentNode = currentNode.next
		}
		return currentNode
	}
	
	/**
	 * 将新节点的next 属性设置为“后面”节点的next 属性对应的值。然后设置“后面”节点的next 属性指向新节点。
	 * @param newElement
	 * @param item
	 */
	insert(newElement, item) {
		let newNode = new Node(newElement)
		let currentNode = this.find(item)
		newNode.next = currentNode.next
		currentNode.next = newNode
	}
	
	remove() {
	}
	
	display() {
		let currentNode = this.head
		while (!(currentNode.next == null)) {
			console.log(currentNode.element)
			currentNode = currentNode.next
		}
	}
}

let linkedList = new LinkedList()
