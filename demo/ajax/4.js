function fn () {
  let timerId = null
  let a = 0
  return function () {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      a++
      console.log('时间到了:', a)
      // fn()
    }, 200)
  }
}

let retFun = fn()
for (let i = 0; i < 30; i++) {
  retFun()
}

// retFun()
// retFun()
// retFun()
console.log('----------')
fn()()
fn()()
;(function f () {

})()