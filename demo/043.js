
let all = this.all
let current = this.current
if (this.all == 0) {
	all = 100
	current = 1
	this.num = '0'
} else if (this.all === null || this.current === null) {
	all = 100
	current = 1
	this.num = '0'
} else {
	if (current >= all) {
		all = 100
		current = 100
		this.num = Number((this.current / this.all * 100).toFixed(0))
	} else {
		this.num = Number((current / all * 100).toFixed(0))
	}
}





