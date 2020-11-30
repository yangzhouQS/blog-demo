const Decimal = require('decimal.js')
const {isNumber} = require('lodash')
console.log(new Decimal(1).div(0)) // Infinity
console.log(new Decimal(1).equals('2'))

/**
 * 数值差率比较
 * @param v1
 * @param v2
 * @param resultValue 允许的误差 正负
 * @returns {boolean}
 */
function evaluation(v1, v2, resultValue = 0) {
    if (new Decimal(v1).equals(v2) || new Decimal(Math.abs(new Decimal(v1).div(v2))).lt(resultValue)) {
        return true
    } else {
        return false
    }
}


console.log(evaluation(0.00005, 0.00004, 0.0005))
console.log(0.5 / 0.4)
// console.log(new Decimal(0.3).gt(0.2))
// console.log(new Decimal(0.3).lt(0.5))
console.log('-----')
console.log(new Decimal(0.0007).sub(0.00045))
console.log(new Decimal(0.0007).sub(0.00065).lt(0.0005))

// console.log(new Decimal("未提取到数据"))


console.log(isNumber('1' - 0))
console.log(isNumber('xxxxxxx' - 0))

console.log(new Decimal(Math.abs(new Decimal(21996.1059).sub(21996.1083).div(21996.1083))).lt(0.0005))

console.log('---------------------')
const v1 = 156480354.96
const v2 = 156622859.75
const resultValue = 0.001
// console.log(new Decimal(Math.abs(new Decimal(v1).sub(v2).div(Math.max(v1, v2)))).lt(resultValue));
console.log(new Decimal(v1).sub(v2).abs().div(v2))
console.log(new Decimal(v1).sub(v2).abs().div(Math.max(v1, v2)).lt(resultValue))


// 平台端: 31869791.16 
const a = [{
    "水泥1": "401203.0000",
    "水泥2": "298408.0000",
    "水泥3": "1236772.0000",
    "水泥4": "736062.8000",
    "水泥5": "207869.2000",
    "水泥6": "716508.0000",
    "水泥7": "447548.0000",
    "水泥8": "795787.0000",
    "骨料1": "2386936.0000",
    "骨料2": "12286310.0000",
    "骨料3": "8832120.0000",
    "骨料4": "1783925.0000",
    "外加剂1": "9799.2700",
    "外加剂2": "47167.1900",
    "水": "1683375.7000",
}]


// 客户端: 
const b = {
    "水泥1": 401203,
    "水泥2": 298408,
    "水泥3": 1236772,
    "水泥4": 736062.8,
    "水泥5": 207869.2,
    "水泥6": 716508,
    "水泥7": 447548,
    "水泥8": 795787,
    "骨料1": 2386936,
    "骨料2": 12286310,
    "骨料3": 8832120,
    "骨料4": 1783925,
    "外加剂1": 9799.26999999998,
    "外加剂2": 47167.1899999999,
    "水": 1683375.70000001,
};


