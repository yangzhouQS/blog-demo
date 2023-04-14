var getMaxLength = function (s) {
    return s.split(' ').filter(value => value !== '').at(-1)
    // return s.split(' ').filter(value=>value!=='').at(-1).length
}

const str = "hello wordaaa ".split(' ').filter(value => value !== '').at(-1).length
console.log(getMaxLength(str))
