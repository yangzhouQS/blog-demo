const data = [
	{ "vehicle": 7, "carAmnt": 49, "transMete": 57 },
	{ "vehicle": 4, "carAmnt": 208, "transMete": 208 }
]
const ret = data.reduce((memo, cur) => {
	for (const curKey in cur) {
		memo[curKey] = memo[curKey] + cur[curKey]
	}
	return memo
}, { vehicle: 0, carAmnt: 0, transMete: 0 })
console.log(ret)
console.log('--------')
data.forEach((cur) => {
	console.log(cur)
})

data.map((cur) =>{
})
