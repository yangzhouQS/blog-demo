var str = 'https://yearrow.yuque.com/docs/share/0a99d939-c75c-4765-b174-48f24cbbfedf?# 《按钮无法点击提交》';
str = str.match(/《(.*)》/)[1];
// console.log(str)

const map = new Map();
map.set(1, { items: [] })
console.log(Object.prototype.toString.call([]) === '[object Array]')
if (map.get(2)) {
  map.get(2).items.push(2)
}
console.log(map.get(undefined))
console.log(map.get(1))

const s = new Set([''])
s.add(1)
s.add(2)
console.log([...s.values()])
