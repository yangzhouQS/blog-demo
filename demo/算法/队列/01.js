/*
* 队列 是一种列表，不同的是队列只能在队尾插入元素，在队首删除元素。
*
* 队列用于存储按顺序排列的数据，先进先出，这点和栈不一样，在栈中，最后入栈的元素反而被优先处理。
* 可以将队列想象成在银行前排队的人群，排在最前面的人第一个办理业务，新来的人只能在后面排队，直到轮到他们为止。
*
*
* 队列的两种主要操作是：
* 		向队列中插入新元素和删除队列中的元素。插入操作也叫做入队 ，删除操作也叫做出队 。
* 		入队操作在队尾插入新元素，出队操作删除队头的元素。图5-1演示了这两个操作。
* */
class Queue {
	constructor() {
		this.dataStore = []
	}
	
	/**
	 * 向队列尾部追加元素
	 * @param element
	 * @returns {number} 返回新队列长度
	 */
	enqueue(element) {
		return this.dataStore.push(element)
	}
	
	/**
	 * 移除队首元素
	 * @returns {*}
	 */
	dequeue() {
		return this.dataStore.shift()
	}
	
	/**
	 * 返回队首元素
	 * @returns {*}
	 */
	front() {
		return this.dataStore[0]
	}
	
	/**
	 * 返回队尾元素
	 * @returns {*}
	 */
	back() {
		return this.dataStore[this.dataStore.length - 1]
	}
	
	toString() {
		return this.dataStore
	}
	
	empty() {
		return this.dataStore.length === 0
	}
}

const queue = new Queue()
queue.enqueue('a')
queue.enqueue('b')
queue.enqueue('c')
console.log(queue.dequeue())
console.log(queue.front())
console.log(queue.back())
console.log(queue)