class Stack {
	constructor() {
		this.dataStore = []
		this.top = 0
	}
	
	push(element) {
		return this.dataStore[this.top++] = element
	}
	
	peek() {
		return this.dataStore[this.top - 1]
	}
	
	pop() {
		return this.dataStore[--this.top]
	}
	
	empty() {
		return this.top === 0
	}
	
	clear() {
		this.dataStore = []
		this.top = 0
	}
	
	length() {
		return this.top
	}
}

let stack = new Stack()


function factorial(n) {
	if (n === 0) {
		return 1
	}
	else {
		return n * factorial(n - 1)
	}
}

function fact(n) {
	var s = new Stack()
	while (n > 1) {
		s.push(n--)
	}
	var product = 1
	while (s.length() > 0) {
		product *= s.pop()
	}
	return product
}

console.log(factorial(5))
console.log(fact(5))