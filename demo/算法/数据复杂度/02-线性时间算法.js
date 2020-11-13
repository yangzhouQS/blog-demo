function find (arr = [], value) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element === value) {
      return element
    }
  }
  return null
}