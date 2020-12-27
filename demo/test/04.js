LazyMan =  (param) =>{
    const queue = []
    const task = () => {
        console.log(`你好, 我是${param}`)
        next()
    }
    queue.push(task)
    const next = () => {
        const fn = queue.shift()
        if (fn) {
            console.log(fn)
            fn()
        }
    }
    const api = {
        _w:queue,
        sleep: (time) => {
            const task = () => {
                setTimeout(() => {
                    console.log(`你好我休息了${time}秒`)
                }, time * 1000)
            }
            queue.push(task)
            return api
        },
        eat: (type) => {
            const task = () => {
                console.log(`${type === 'lunch' ? "吃午餐" : "吃晚餐"}`)
            }
            queue.push(task)
            return api
        },
        sleepFirst: (time) => {
            const task = () => {
                setTimeout(() => {
                    console.log(`醒来了 , 我刚休息 了${time}秒`)
                }, time * 1000)
            }
            queue.unshift(task)
            return api
        }
    }
    setTimeout(() => {
        next()
    })
    return api
}
LazyMan("Hank").sleepFirst(5).eat('lunch')


