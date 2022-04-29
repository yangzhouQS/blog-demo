const uuid = require('uuid');

function idGen(count = 1) {
  let ret
  if (count > 1) {
    const idArr = [];
    for (let index = 0; index < count; index++) {
      idArr.push(uuid.v4());
    }
  } else {
    ret = uuid.v4();
  }
  return ret
}

module.exports = idGen
