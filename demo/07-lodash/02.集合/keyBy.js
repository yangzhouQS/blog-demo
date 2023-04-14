const _ = require('lodash')

const list =  [
    { 'dir': 'left', 'code': 97 },
    { 'dir': 'right', 'code': 100 }
];

console.log(_.keyBy(list,(value)=>{
    console.log(value)
    return value.dir
}))
