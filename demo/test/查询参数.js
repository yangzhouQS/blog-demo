let arr = [
  {
    fieldName: 'isRemoved',
    op: 'eq',
    fieldValue: false
  },
  {
    fieldName: 'name',
    op: 'like',
    fieldValue: '%' + 'hello' + '%'
  },
  {
    fieldName: 'datTim',
    op: 'between',
    fieldValue: [
      '2020-01',
      '2020-03'
    ]
  }
]
const selectOperate = (data) => {
  switch (data.op) {
    case 'eq':
      return ` ${ data.fieldName } = ${ data.fieldValue }`
    case 'like':
      return ` like ${ data.fieldName } '${ data.fieldValue }'`
    case 'between':
      return ` ${ data.fieldName } between ${ data.fieldValue[0] } and ${ data.fieldValue[1] }`
    default:
      return ' '
  }
}
let str = ''
// select * from isRemoved = false
// select * from name like 'xxx'
let result = []
arr.forEach(row => {
  result.push(selectOperate(row))
})

console.log(' where '+result.join(' and '));

let a =  [
  '2020-01',
  123,
  '2020-03'
]
console.log(Object.prototype.toString.call(a[0]));
console.log(Object.prototype.toString.call(a[1]));