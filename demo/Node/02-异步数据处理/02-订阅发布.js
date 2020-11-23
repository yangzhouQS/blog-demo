/*
* 发布订阅 解决回调问题
* */
const fs = require('fs')

/**
 * 订阅发布模式
 * @type {{storeData: [], emit(): void, on(*=): void}}
 */
const eventObj = {
    storeData: [], // 订阅的事件
    /**
     * 订阅事件
     * @param fn
     */
    on(fn) {
        this.storeData.push(fn);
    },
    /**
     * 发布事件
     */
    emit() {
        this.storeData.forEach(fn => fn())
    }
}

const obj = {}
fs.readFile('./a.txt', 'utf8', (err, data) => {
    if (err) {
        throw new Error(err)
    }
    obj.a = data.toString()
    eventObj.emit()
})
fs.readFile('./a.txt', 'utf8', (err, data) => {
    if (err) {
        throw new Error(err)
    }
    obj.b = data.toString()
    eventObj.emit()
})
eventObj.on(() => {
    console.log('--')
    if (Reflect.ownKeys(obj).length === 2) {
        console.log('数据读取回来了')
    }
})

