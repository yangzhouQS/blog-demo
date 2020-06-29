let arr = [1,2,4,5,6,7]
for (let i = 0; i < arr.length; i++) {
  if (arr[i]>0){
    if (i>4){
      break
    }
    console.log('-----',i)
  }
}