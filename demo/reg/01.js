const reg = /^[a-zA-Z]$/
console.log(reg.test(1))
console.log(reg.test('sdsdds'))
console.log(reg.test('s1221'))

console.log('csacsd122121'.replace(/[a-zA-Z]/g, ''))
console.log('cs    a....csd.....122121'.replace(/[^a-zA-Z]/g, ''))
