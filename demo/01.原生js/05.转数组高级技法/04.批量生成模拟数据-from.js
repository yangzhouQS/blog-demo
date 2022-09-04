function createData() {
  return Array.from({ length: 100 }, (_, index) => {
    return { name: `name${ index }` }
  })
}

console.log(createData())
