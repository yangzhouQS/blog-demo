/*
* promise解决的问题
* 1>一部并发问题(promise.all)
* 2>回调地狱问题(上一个的输出等于下一个的输入)
* 3>错误处理非常方便
* 缺陷:
*   1>依旧是基于回调函数处理的(await co generator)
* */

/*
* Proomise 是一个类传入executor就会执行
* executor 是一个函数包含2个参数 Proomise(executor(resolve, reject))
* Promise默认会有三个状态, 状态不可逆, 成功后就不可以失败
* */
const p = new Promise((resolve, reject) => {

})
p.then()










