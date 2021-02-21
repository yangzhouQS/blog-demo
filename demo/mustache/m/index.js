const { Scanner } = require('./Scanner')

function render(template, data) {
	new Scanner(template)
}

const str = `<ul>
我是{{name}},年龄{{age}},性别{{sex}}
</ul>
  `
const data = {
	name: "tom",
	age: 26,
	sex: "男"
}
console.log(render(str, data))
