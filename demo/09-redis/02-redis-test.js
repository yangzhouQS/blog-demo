const { Redis } = require('./01')

const key = 'gslq4dev:10001:11111111'

async function run() {
  let ret = await Redis.set(key, 5, 5)
  console.log(ret)
}

run().then(r => {
  console.log('r ===> ', r)
})
