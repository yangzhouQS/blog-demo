const transRecords = (field = '') => {
  let prop = field.replace(/_(\w)/g, ($0, $1) => {
    return $1.toUpperCase()
  })
  return prop
}


let str=`
count_receive_supplement_weight
`
console.log(transRecords(str))