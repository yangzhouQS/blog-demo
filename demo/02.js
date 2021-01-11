function getDistinctList(list, colArr) {
    let notRepeatData = []
    let notRepeatObj = {}
    for (let i = 0; i < list.length; i++) {
        // 判断是否存在
        let colStr = ''
        for (let k = 0; k < colArr.length; k++) {
            colStr += list[i][colArr[k]] + '|'
            console.log(colArr)
        }
        if (!notRepeatObj[colStr]) {
            notRepeatData.push(list[i])
            notRepeatObj[colStr] = true
        }
    }
    return notRepeatData
}

const arr = [
    {a: 1, b: 2, c: 1, d: 1},
    {a: 1, b: 2, c: 1, d: 2},
    {a: 1, b: 2, c: 1, d: 3},
    {a: 1, b: 2, c: 1, d: 4},
]

/*let sql = `update q_produce set
                    q_produce.trans_mete = b.trans_mete,q_produce.car_amnt = b.car_amnt,q_produce.pie_cnt = b.pie_cnt,q_produce.dat_tim = b.dat_tim,
                    version = __fn.sequence()
                    from q_produce join (values`
qProduceResult.existsData.forEach((element, i) => {
  element.transMete = qProduceResult.existsData[i].transMete
  element.carAmnt = qProduceResult.existsData[i].carAmnt
  element.pieCnt = qProduceResult.existsData[i].pieCnt
  element.datTim = qProduceResult.existsData[i].datTim
  sql += `(
             ${element.orgId} org_id,
            '${element.scheduleId}' schedule_id,
            '${element.proLine}' pro_line,
             ${element.transMete} trans_mete,
             ${element.carAmnt} car_amnt,
             ${element.pieCnt} pie_cnt,
             '${element.datTim}' dat_tim),`
          })
sql = sql.substr(0, sql.length - 1)
sql += `) b on
  q_produce.org_id = b.org_id
  and q_produce.schedule_id = b.schedule_id
  and q_produce.pro_line = b.pro_line`*/
let sql = `update q_produce set
                    q_produce.trans_mete = b.trans_mete,q_produce.car_amnt = b.car_amnt,q_produce.pie_cnt = b.pie_cnt,q_produce.dat_tim = b.dat_tim,
                    version = __fn.sequence()
                    from q_produce join (values`
const list = [1, 2, 3, 4, 5, 6]


let ret = list.reduce((memo, cur, index) => {
    return memo + cur
}, 0)

sql = arr.reduce((memo, cur, index, array) => {
    cur.a = `a-${index}`
    cur.b = `a-${index}`
    cur.c = `a-${index}`
    const tmp = `${memo} (${String(cur.a)} a,${String(cur.b)} b,${String(cur.c)} c)`
    if (array.length === index + 1) {
        return tmp
    } else {
        return `${tmp},`
    }
}, sql)
// console.log(sql)

const arr2 = [
    {a: 1, b: 2, c: 1, d: 1},
    {a: 1, b: 2, c: 1, d: 2},
    {a: 1, b: 2, c: 1, d: 3},
    {a: 1, b: 2, c: 1, d: 4},
]
arr2.map((item, index) => {
    item.a = item.a + index
})


function fn(n) {
    setTimeout(function () {
        console.log('123', n)
    })
    setImmediate(() => {
    })
    setInterval(() => {
    })
}


/*for (let i = 0; i < 10; i++) {
    console.log('a=', i)
    fn(i)
    console.log('b=', i)
}*/

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    run(){
        console.log(this.name)
    }
}

const p = new Person("李四", 16)
console.log(p)
const p2 = new Person("", 16)
console.log(p2.name)
