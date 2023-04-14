const _ = require('lodash')

const obj = {
    a: 1,
    b: {
        a: 2,
        b: 2
    }
}
const o = {
    b: {
        b: 3,
        c: 3
    }
}
console.log(JSON.stringify(_.merge(obj, o), null, 2))
