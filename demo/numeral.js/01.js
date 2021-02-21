var numeral = require('numeral');
// load a locale
/*numeral.register('locale', 'fr', {
	delimiters: {
		thousands: ',',
		decimal: ','
	},
	abbreviations: {
		thousand: 'k',
		million: 'm',
		billion: 'b',
		trillion: 't'
	},
	ordinal: function (number) {
		return number === 1 ? 'er' : 'ème';
	},
	currency: {
		symbol: '€'
	}
});

// switch between locales
numeral.locale('fr');*/
// numeral.options.currentLocale = 'fr'
// console.log(numeral(10000000).format('0,0'))
// console.log(numeral(10000000))
// console.log(numeral(10000000).input())

/*
var myNumeral = numeral(1000);
var value = myNumeral.value();
var myNumeral2 = numeral('1,000');

var value2 = myNumeral2.value();

console.log(numeral(10000000).format('0,0')) // 10,000,000
console.log(numeral(10000000).value()) // 10000000
console.log(numeral(10000000).format('$0,0')) // $10,000,000

// 运算
console.log(numeral(1000).add(0.3).value())
console.log(numeral(0.1).add(0.2).value())*/


// null 格式化处理
numeral.nullFormat('N/A');
numeral.nullFormat('');
numeral.nullFormat('***');
// console.log(numeral(NaN).format('0,0'))

// 0值处理
numeral.zeroFormat(null);//0
numeral.zeroFormat('N/A');//N/A
numeral.zeroFormat('');// ''
numeral.zeroFormat('***');// ***

// console.log(numeral(0).format('0,0'))


//isNumeral
// console.log(numeral.isNumeral(1)) // false
// console.log(numeral.isNumeral(numeral())) // true


/*
abbreviations: {
		thousand: 'k', 千
		million: 'm', 百万
		billion: 'b', 十亿
		trillion: 't' 万亿
	},
* */
//Format
console.log(numeral(2000000000).format('0.0a')) // 2.0b
console.log(numeral(2000000000).format('0a')) // 2b
console.log(numeral(-5444333222111).format('0,0 ak')) // -5,444,333,222 k
console.log(numeral(1460).format('0,0 ak'))
console.log(numeral(256789).format('0,0 ak'))
console.log(numeral(2567555589).format('0,0 am'))
