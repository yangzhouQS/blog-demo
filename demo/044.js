let a = 3.3333333363333333
console.log(('' + a).substr('.'))
a = '' + a
console.log()
if (a.substring(a.indexOf('.')).length > 8) {
	a = Number(a).toFixed(8)
}
console.log(a)