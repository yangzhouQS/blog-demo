const bird = {
    size: "small"
}
const mouse = {
    name: "MICK",
    small: true
}


//  3，
let s = "hello word   "

function getLastWordLen(s = '') {
    let lastWord = ''
    if (s) {
        lastWord = `${s}`.split(' ').filter(Boolean).slice(-1)
    }
    if (lastWord && lastWord.length > 0) {
        return lastWord[0].length
    }
    return 0
}

console.log(getLastWordLen(s))


