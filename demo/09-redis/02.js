const RedisClient = require('ioredis');
const port = 16379
const host = '127.0.0.1'
const options = {
  host: 'r-2ze55udkssormt59y8pd.redis.rds.aliyuncs.com',
  username: 'r-2ze55udkssormt59y8',
  password: 'Ylkj88227793@#',
  port: 16379,
  db: 2,
}
const redis = new RedisClient(port, options);
console.log(redis)
