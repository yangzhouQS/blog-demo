const {getRedisClient} = require("./get-redis-client");

const redis = getRedisClient()

redis.set('name', 10086)
redis.set('name', 200)
redis.set('name', null)
redis.set('name', '')
redis.set('name', '213')
redis.set('name', 'hello word')
redis.set('name2', 'hello word')
redis.set('name3', 'hello word')

// 设置过期时间
redis.setex("hello",10,"10秒就过期啦")

;(async () => {
    let result = await getKey('name')

    // result = await delKey('name','name2','name3')

    // [ 'hello word', 'hello word', 'hello word', null ]
    result = await mgetKey('name', 'name2', 'name3','aaa')
    console.log(result)
})()

/**
 * 单个key获取
 * @param key
 * @returns {Promise<*>}
 */
async function getKey(key) {
    const result = await redis.get(key)
    // 不存在的key get返回值为null
    if (result == null) {
        console.log(`get key [${key}] value null...`)
    }
    return result
}

/**
 * 批量获取key
 * @param keyArgs
 * @returns {Promise<*>}
 */
async function mgetKey(...keyArgs) {
    const result = await redis.mget(keyArgs)
    // 不存在的key get返回值为null
    return result
}


/**
 * 批量删除key
 * @param args
 * @returns {Promise<*>}
 */
async function delKey(...args) {
    return await redis.del(args)
}



