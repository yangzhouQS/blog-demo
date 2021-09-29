/*
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
*/
//'23'
let getInputStr = strNumber => {
  let map = ['', 1, 'abc', 'def', 'ghi', 'hkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  let oneArr = map[strNumber[0]].split('');
  let twoArr = map[strNumber[1]].split('');
  return oneArr.map(x => {
    return twoArr.map(y => {
      return x + y;
    }).join(' ')
  }).join(' ');
};
var letterCombinations = function (digits) {
  //建立映射的规则
  let map = ['', 1, 'abc', 'def', 'ghi', 'hkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  digits = digits.split('');
  let code = [];
  digits.forEach(x => {
    map[x] ? code.push(x) : null;
  });

};
console.log(letterCombinations('23'))