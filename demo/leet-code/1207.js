/*
给你一个整数数组 arr，请你帮忙统计数组中每个数的出现次数。

如果每个数的出现次数都是独一无二的，就返回 true；否则返回 false。



示例 1：

输入：arr = [1,2,2,1,1,3]
输出：true
解释：在该数组中，1 出现了 3 次，2 出现了 2 次，3 只出现了 1 次。没有两个数的出现次数相同。
示例 2：

输入：arr = [1,2]
输出：false
示例 3：

输入：arr = [-3,0,1,-3,1,1,1,-3,10,0]
输出：true

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/unique-number-of-occurrences
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
* */

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences2 = function (arr) {
    const ret = arr.reduce((memo, cur) => {
        memo[cur] = memo[cur] ? ++memo[cur] : 1
        return memo
    }, {})
    const v = Object.values(ret)
    return new Set(v).size === v.length
};
var uniqueOccurrences = function (arr) {
    const ret = arr.reduce((memo, cur) => memo.set(cur, (memo.get(cur) || 0) + 1), new Map())
    return new Set(ret.values()).size === ret.size
};

var uniqueOccurrences4 = function (arr, a) {
    return a = arr.reduce((h, v) => h.set(v, (h.get(v) || 0) + 1), new Map()), new Set(a.values()).size === a.size
};

const arr = [1, 2, 2, 1, 1, 3]
console.log(uniqueOccurrences(arr));
