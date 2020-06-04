const sequence = require('@mctech/infra-sdk').getSequenceClient()
const maxCount = 100
async function idGen (count) {
  let ret
  if (count) {
    ret = []
    while (count > 0) {
      let max = count < maxCount ? count : maxCount
      let ids = await sequence.nexts(max)
      ret = ret.concat(ids.toArray())
      count -= maxCount
    }
  } else ret = await sequence.next()
  return ret
}

module.exports = idGen
