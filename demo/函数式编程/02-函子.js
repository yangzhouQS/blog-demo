const Container = function (x){
	this.__value = x
}
Container.of = function (x){
	return new Container(x)
}
Container.prototype.map = function (f){
	return Container.of(f(this.__value))
}
const concat = x => () => x
let ret = Container.of(3)
ret = Container.of('hotdogs')
ret = Container.of(Container.of({ name: 'hello' }))
ret = Container.of('hello word').map(function (s){
	return s.toUpperCase()
})
ret = Container.of('bombs').map(concat(' away'))
console.log(ret.__value)