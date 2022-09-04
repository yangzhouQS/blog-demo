function createData() {
  return new Array(100).fill(null).map((_, index) => {
    return {
      name: `name${ index }`
    }
  })
}

console.log(createData())
