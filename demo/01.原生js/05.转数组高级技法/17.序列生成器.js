const createValues = (creator, length = 10) => Array.from({ length }, creator)


// 生成序列
const createRange = (start, stop, step) => {
  return createValues((_, i) => start + (i * step), (stop - start) / step + 1)
}

console.log(createRange(1, 100, 2))
