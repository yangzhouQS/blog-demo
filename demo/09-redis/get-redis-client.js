const RedisClient = require('ioredis');

function getRedisClient(opt={}) {
    const host = '127.0.0.1'
    const options = Object.assign({
        host: host,
        username: '',
        password: '',
        port: 6379,
        db: 4
    },opt)
    return  new RedisClient(options);
}

module.exports={
    getRedisClient
}