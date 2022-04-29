const RedisClient = require('ioredis');
const port = 6379
const host = '127.0.0.1'
const options = {
  db: 1
}
const redis = new RedisClient(port, host, options);


async function run() {
  const count = 10
  const key = `tenantId:orgId:10001`
  for (let i = 0; i < count; i++) {
    // 命令将一个或多个值插入到列表头部
    await redis.lpush(key, [111, 222, 333, 444, 555, 666, 777])
  }

  // 获取列表指定范围内的元素
  let ret = await redis.lrange(key, 0, -1)

  // 获取列表长度
  // ret = await redis.llen(key)

  // 移除指定key
  // ret = await redis.lrem(key, -1, 'hello1')
  console.log(ret)
}

run().then(r => {
  console.log('r ==> ', r)
})
