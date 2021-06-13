import { Container } from '../../src/component-src/element-ui';

function f(h){
	return h + 1
}

const x = 1
console.log(f(x + 1))

// 点击计数不同方式实现方式
/**
 * 1.常规方法
 */
var count = 0
$('#add').on('click', function (){
	count++
	$('#count').html(count)
})

/**
 * 2.函数式解决
 */
let action = $$('add').map(
	addEventListener('click')
).flatten()
	.map(
		countFrom(0)
	).map(
		html('count')
	);
const $$ = id => Container.of(document.getElementById(id))
const addEventListener = event => dom => {
	return new Task((rj, rs) => {
		dom.addEventListener(event, function (e){
			rs(e)
		})
	})
}

const countFrom = initValue => () => {
	return ++initValue
}

const html = id => {
	$$(id).map(dom => {
		dom.innerHTML = html
	})
}


/**
 * 13186211037
 * CycleJS
 */
function main(sources){
	const add$ = sources.DOM
		.select('.add')
		.events('click')
		.map(ev => 1);
	const count$ = add$.fold((total, change) => total + change, 0);
	return {
		DOM: count$.map(cont =>
			div('.counter', [
				'Count: ' + count,
				button('.add', 'Add')
			]))
	}
}


const Container = function (x){
	this.__value = x
}
Container.of = function (x){
	return new Container(x)
}
Container.of(3)