const { time } = require('../time.js')
const timeStr = 'sort_time'
time.start(timeStr)

function gen (w) {
  const arr = []
  for (let i = 0; i < w * 10000; i++) {
    arr[i] = i + 1
  }
  shuffle(arr)
  return arr
}

// O(n)的打乱算法
function fisher_yates_shuffle (arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    const j = i + Math.floor((Math.random() * arr.length - i));
    ;[ arr[i], arr[j] ] = [ arr[j], arr[i] ];
  }
  return arr
}

function shuffle_simple (arr) {
  return arr.sort(() => Math.random() - 0.5)
}

function shuffle (arr) {
  const m = {}
  const N = arr.length * arr.length * arr.length;
  for (let i = 0; i < arr.length - 1; i++) {
    m[i] = Math.floor(Math.random(1, N))
  }
  return arr.sort((a, b) => m[a] - m[b])
}

gen(100)

time.end(timeStr)