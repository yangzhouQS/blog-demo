const Sum = x => ({
  x,
  concat: other => Sum(x + other.x)
})
const result = Sum(3)
console.log(result)


;[].reduce((acc, item) => {
  console.log(acc)
})
