let arr = [ 1, 3, 4, 3, 4 ]
// console.log(arr.splice(1, 1))

for (let i = 0; i < arr.length; i++) {
  const arrElement = arr[i]
  if (arrElement === 3) {
    arr.splice(i, 1)
    break
  }
}
arr=[
  {id:-1,b:1},
  {id:565565665,b:2},
]
let ret = arr.filter(row=>{
  if (row.id!=-1){
    return {ccc:8989988998}
  }
})
console.log(ret)