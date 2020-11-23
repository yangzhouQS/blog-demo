setTimeout(() => {
    console.log('setTimeout')
}, 0)
Promise.resolve().then(() => {
    console.log('resolve')
})
// 同步任务执行完毕立即执行process.nextTick
process.nextTick(() => {
    console.log('process.nextTick')
})