function fib1(n) {
	if (n <= 1) return 1;
	return fib1(n - 2) + fib1(n - 1)
}

function fib2(n) {
	if (n <= 1) return 1;
	let first = 0;
	let second = 1;
	for (let i = 0; i <= n - 1; i++) {
		let sum = first + second;
		first = second;
		second = sum
	}
	return second;
}

console.time('t')
console.log(fib1(30))
console.timeEnd('t')

console.time('t2')
console.log(fib2(30))
console.timeEnd('t2')


