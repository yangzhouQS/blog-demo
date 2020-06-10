let arr = [ 1, 2, 3, 4, 5, 6, 6, 7, 8 ]
for (const value of arr) {
  if (value === 6) {
    console.log('value = ', value)
    break
  }
  console.log(value)
}

