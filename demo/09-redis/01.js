const RedisClient = require('ioredis');
const port = 6379
const host = '127.0.0.1'
const options = {
  db: 1
}
const redis = new RedisClient(port, host, options);

class Redis {
  static async get(key) {
    return await redis.get(key)
  }

  static async set(key, value, expire) {
    if (expire) {
      return await redis.setex(key, expire, value)
    } else {
      return await redis.set(key, value)
    }
  }

  static async setKetExpires(key, time = 0) {
    return await redis.expire(key, time)
  }

  static async has(key) {
    return await redis.exists(key)
  }

  static async del(key) {
    return await redis.del(key)
  }

  static async getKeyType(key) {
    return await redis.type(key)
  }
}

async function setKeyString() {
  const key = 'hello:word:content'
  let ret = await Redis.set(key, 999)
  // await redis.expire('hello', 10)
  // ret = await redis.get('hello')

  // 获取指定的key
  ret = await Redis.get(key)

  // 判断key是否存在
  ret = await Redis.has(key)

  // 删除key
  // ret = await Redis.del(key)

  ret = await Redis.getKeyType(key)
  console.log(ret)
}

async function setHash() {

}

setKeyString().then(r => {

})
