function errorRepeat2(nums = []) {
    const result = []
    const temp = []

    // 根据数组长度生成序列,连续
    for (let i = 0; i < nums.length; i++) {
        temp[i] = i + 1
    }

    // [重复出现的索引，重复的数字]
    for (let i = 0; i < nums.length; i++) {
        let value = nums[i]

        if (temp[i] - value === 0) {

        } else {
            // 重复出现的索引
            result[0] = i
            result[1] = i + 1
        }
    }

    // 重复出现的数字
    return result
}

function errorRepeat(nums = []) {
    const result = []
    const temp = []
    console.log(`nums---: ${JSON.stringify(nums)}`)

    // 根据数组长度生成序列,连续
    for (let i = 0; i < nums.length; i++) {
        temp[i] = i + 1
    }

    // [重复出现的索引，重复的数字]
    for (let i = 0; i < nums.length; i++) {
        let value = nums[i]

        if (temp[i] - value === 0) {
            console.log(temp[i], value)
        } else {
            // 重复出现的索引
            result[0] = i
            result[1] = temp[i]
        }
    }

    console.log(`temp: ${JSON.stringify(temp)}`)
    console.log(`nums: ${JSON.stringify(nums)}`)
    // 重复出现的数字
    return result
}

let nums = [1, 2, 2, 4]
nums = [1, 1]
nums = [1, 2, 3, 4, 2, 5, 6, 7, 8, 9, 10]
console.log(errorRepeat(nums));



