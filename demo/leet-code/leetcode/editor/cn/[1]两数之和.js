//给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
//
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
//
//
//
// 示例:
//
// 给定 nums = [2, 7, 11, 15], target = 9
//
//因为 nums[0] + nums[1] = 2 + 7 = 9
//所以返回 [0, 1]
//
// Related Topics 数组 哈希表
// 👍 9901 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const ret = [0, -1]
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        ret[0] = i
        for (let j = i+1; j < nums.length; j++) {
            const num1 = nums[j];
            if (num + num1 === target) {
                ret[1] = j
                break
            }
        }
        if (ret[1] !== -1) {
            return ret
        }
    }
    return ret
};
// const nums = [2,5,5,11]
// console.log(twoSum(nums, 10));
//leetcode submit region end(Prohibit modification and deletion)
