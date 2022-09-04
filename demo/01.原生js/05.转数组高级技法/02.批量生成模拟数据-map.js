function createData() {
  return new Array(100).map((_, index) => {
    return {
      name: `name${ index }`
    }
  })
}

console.log(createData()) // [ <100 empty items> ]
