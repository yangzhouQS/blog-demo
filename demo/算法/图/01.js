// 随机删除后的数组
var arr = [1, 3, 4, 9, 2, 7, 10]
// 位图数组，多了索引0，所以设置11个
var bitmap = Array(11)
// 输出数组
var outputArr = []
// 设置位图状态
for (var i = 0; i < arr.length; i++) {
	bitmap[arr[i]] = 1
}
// 提取已移除的数字
for (var i = 1; i < bitmap.length; i++) {
	if (!bitmap[i]) {
		outputArr.push(i)
	}
}
// 输出[5, 6, 8]
console.log(outputArr)


