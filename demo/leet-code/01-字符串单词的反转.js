/*
反转字符串中的单词
  1>字符串按空格分割为数组,//str=str.split(' ')=>[ 'Let`s', 'take', 'LeetCode', 'contest' ]
  2>数组中的每一项进行转换为数组// [ [ 'L', 'e', 't', '`', 's' ],
  [ 't', 'a', 'k', 'e' ],
  3>反转数组,数组转换为字符串 //[ [ 's', '`', 't', 'e', 'L' ],
  [ 'e', 'k', 'a', 't' ],
  4>转换后的每一项再次转换为字符串//[ 's`teL', 'ekat', 'edoCteeL', 'tsetnoc' ]
  5>输出数组为字符串//str=str.split(' ').map(x=>x.split('').reverse().join('')).join(' ')//s`teL ekat edoCteeL tsetnoc
*/
let str = "Let's take LeetCode contest";
//第一种做法
/*str = str.split(' ').map(x => {
  return x.split('').reverse().join('');
}).join(' ');*/
/*
str = str.split(' ').map(x => {
  return x.split("").reverse().join('')
});
*/

var reverseWords = function (s) {
  return s.split('').reverse().join('').split(' ').reverse().join(' ')
}
// str=str.split('').reverse().join('').split(' ').reverse().join(' ')
// str=str.split(/\s/).map(x=>x.split('').reverse().join('')).join(' ');

//使用match,匹配字母
str = str.match(/[\w']+/g).map(x=>x.split('').reverse().join('')).join(' ')
console.log(str);
//s`teL ekat edoCteeL tsetnoc


