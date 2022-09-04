function createData() {
  const data = []
  for (let i = 0; i < 100; i++) {
    data.push({
      name: `name${ i + 1 }`
    })
  }
  return data
}

console.log(createData())
