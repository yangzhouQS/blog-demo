//给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
//
// 说明：
//
// 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
//
// 示例 1:
//
// 输入: [2,2,1]
//输出: 1
//
//
// 示例 2:
//
// 输入: [4,1,2,1,2]
//输出: 4
// Related Topics 位运算 哈希表
// 👍 1644 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    const map = new Map()
    let v = 1
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        map.set(num, (map.get(num) || 0) + 1)
        if (map.get(num) === 1) {
            v = num
        }
    }
    return
};
const nums = [4, 1, 2, 1, 2, 4, 5]
console.log(singleNumber(nums));
//leetcode submit region end(Prohibit modification and deletion)

function getFormatDate(date) {
    var nowDate = new Date(date);
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    return year + "-" + month + "-" + date;
}

var labour_id = _g().parameterEl.getWidgetByName('labour_id').getValue();
var time = _g().parameterEl.getWidgetByName('time').getValue();
if (time && time.length>0){
    var dataArr = time.split(' - ')
    var beginDate = getFormatDate(dataArr[0])
    var endDate = getFormatDate(dataArr[1])
    _g().parameterEl.getWidgetByName('beginDate').setValue(beginDate);
    _g().parameterEl.getWidgetByName('endDate').setValue(endDate);
    setTimeout(function () {
        if (labour_id>0){
            _g().parameterCommit();
        }
    },200)
}
