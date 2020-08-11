# Array.prototype.reduce 实用指南

hello~亲爱的看官老爷们大家好~最近因为工（lan）作（ai）繁（fa）忙（zuo），出产的文章多以译文为主，之前翻译了[《如何在 JavaScript 中更好地使用数组》](https://juejin.im/post/5b8d0a74f265da431d0e7ec0)一文，发现不少同学对 `Array.prototype.reduce` 不太熟悉，而我正好在这方面有一点积累，在此分享给大家。

`Array.prototype.reduce` 算是 JavaScript 数组中比较难用但又特别强大的方法，本文以实用为主，通过例子展示如何使用这个方法，但并不深挖这个方法的本质（深入的话涉及到很多函数式编程相关的知识）~以下是正文。

## `Array.prototype.reduce` 的简单介绍

> `reduce()` 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其简化为单个值。

上述是 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)对该方法的描述，方法的语法是： `arr.reduce(callback[, initialValue])`。`callback` 接受四个参数，分别是：`accumulator，累加器累加回调的返回值； `currentValue`,数组中正在处理的元素；`currentIndex（可选）`,数组中正在处理的当前元素的索引；`array（可选）`，调用 `reduce()` 的数组。`initialValue` 为可选参数，作为第一次调用 `callback` 函数时的第一个参数的值。方法的返回值是函数累计处理的结果。

一股脑介绍完之后，估计不少同学都是比较懵的。其实这个方法并不难理解的，正如它名字所示，抓住它的核心：**聚合**。一般而言，如果需要把数组转换成其他元素，如字符串、数字、对象甚至是一个新数组的时候，若其他数组方法不太适用时，就可以考虑 `reduce` 方法，不熟悉这个方法的同学，尽管抛开上面的语法， 记住方法的核心是聚合即可。

下文的例子都用到以下数组，假设通过接口获取到如下的数据体：

```
[{
  id: 1,
  type: 'A',
  total: 3
}, {
  id: 2,
  type: 'B',
  total: 5
}, {
  id: 3,
  type: 'E',
  total: 7
},...]
```

数据体是按照 `id` 的升序进行排列，`total` 与 `type` 不定~

## 聚合为数字

根据上述数据体，我们一起来做第一个小需求，统计 `total` 的总和。如果不用 `reduce`，其实也不难：

```
function sum(arr) {
  let sum = 0;
  for (let i = 0, len = arr.length; i < len; i++) {
    const { total } = arr[i];
    sum += total;
  }
  return sum;
}
```

这个函数可以完成上述需求，但我们精确地维护了数组索引，再精确地处理整个运算过程，是典型的命令式编程。上文提及，只要涉及将数组转换为另外的数据体，就可以使用 `reduce`，它可以这样写：

```
arr.reduce((sum, { total }) => {
  return sum + total;
}, 0)
```

这样就完成了~`sum` 是此前累加的结果，它的初始值为 0。每次将此前的累计值加上当前项的 `total` 为此次回调函数的返回值，作为下次执行时 `sum` 的实参使用。看起来比较绕，可以参考下面的表格：

| 轮次 |    `sum`    | `total` | 返回值 |
| :--: | :---------: | :-----: | :----: |
|  1   | 0（初始值） |    3    |   3    |
|  2   |      3      |    5    |   8    |
|  3   |      8      |    7    |   15   |
| ...  |     ...     |   ...   |  ...   |

如此是不是清晰了很多？前一次的返回值就是后一次 `sum` 的值，如此类推，最后累积出总和，将数组聚合成了数字。

## 聚合为字符串

下一个需求是将数组的每项转换为固定格式的字符串（如第一项转换为 `id:1,type:A;`），每项直接以分号作为分隔。一般来说，数组转为字符串，`join` 方法是不错的选择，但并不适用于需要精确控制或数组的项比较复杂的情况。在本例中，`join` 方法是达不到我们想要的效果的。

使用 `for` 循环当然可以解决问题，但 `reduce` 也许是更好的选择，代码如下：

```
arr.reduce((str, { id, type }) => {
  return str + `id:${id},type:${type};`;
}, '')

```

有了聚合为数字的例子，这次你能在脑海中模拟出执行的过程么？以下也是前三项的执行过程：

| 轮次 |           `str`            | `id` | `type` |                 返回值                 |
| :--: | :------------------------: | :--: | :----: | :------------------------------------: |
|  1   |        ''（初始值）        |  1   |  'A'   |             'id:1,type:A;'             |
|  2   |       'id:1,type:A;'       |  2   |  'B'   |       'id:1,type:A;id:2,type:B;'       |
|  3   | 'id:1,type:A;id:2,type:B;' |  3   |  'E'   | 'id:1,type:A;id:2,type:B;id:3,type:E;' |
| ...  |            ...             | ...  |  ...   |                  ...                   |

## 聚合为对象

有了前面的一点基础，可以做复杂一点的聚合了。上面的数据体是比较典型的后端接口返回结果，但对于前端来说，转换成 `key` `value` 的对象形式，更利于进行之后的操作。那我们就以转换为 `key` 是 `id`，`value` 是其他属性的对象作为目标吧！

```
function changeToObj(arr) {
  const res = {};
  arr.forEach(({ id, type, total }) => {
    res[id] = {
      type,
      total
    };
  })
  return res;
}
```

如上所示，这个函数可以很好地完成我们的目标。但略显啰嗦，记住：只要目标是将数组聚合为唯一的元素时，都可以考虑使用 `reduce`。这个例子恰好符合：

```
arr.reduce((res, { id, type, total }) => {
  res[id] = {
    type,
    total
  };
  return res;
}, {})
```

`res` 是最后返回的对象，通过遍历数组，不断往里面添加新的属性与值，最后达到聚合成对象的目的，代码还是相当简洁有力的。

最后，对于不熟悉这个方法的同学，不妨练习一下，将数据体转换为一个字符串数组，数组每一项为原数组 `type` 的值。

## 小结

以上就是本文的全部内容，这里稍微小结一下 `reduce` 的优缺点~原则上说，只要是将数组聚合为唯一的元素时，都可以实现它。同时，它在函数式编程中有一席之地，也是声明式编程的典型例子。这也意味着它不容易掌握，如果熟悉 `reduce` 方法，写出来的代码可读性强，十分优雅。但在不熟悉的同学眼里，这就是不折不扣的天书了。如何更好地使用 `reduce`，避免写出难以维护的代码，值得每一位同学思考。





# JavaScript 中数组方法 reduce 的妙用之处

Javascript数组方法中，相比`map`、`filter`、`forEach`等常用的迭代方法，`reduce`常常被我们所忽略，今天一起来探究一下`reduce`在我们实战开发当中，能有哪些妙用之处，下面从`reduce`语法开始介绍。

## 语法

```
array.reduce(function(accumulator, arrayElement, currentIndex, arr), initialValue)
```

若传入初始值，accumulator首次迭代就是初始值，否则就是数组的第一个元素；后续迭代中将是上一次迭代函数返回的结果。所以，假如数组的长度为n，如果传入初始值，迭代次数为n；否则为n-1。

比如实现数组 arr = [1,2,3,4] 求数组的和

```
let arr = [1,2,3,4];
arr.reduce(function(pre,cur){return pre + cur}); // return 10
```

实际上reduce还有很多重要的用法，这是因为累加器的值可以不必为简单类型（如数字或字符串），它也可以是结构化类型（如数组或对象），这使得我们可以用它做一些其他有用的事情，比如：

- 将数组转换为对象
- 展开更大的数组
- 在一次遍历中进行两次计算
- 将映射和过滤函数组合
- 按顺序运行异步函数

## 将数组转化为对象

在实际业务开发中，你可能遇到过这样的情况，后台接口返回的数组类型，你需要将它转化为一个根据id值作为key，将数组每项作为value的对象进行查找。

例如：

```
const userList = [
  {
    id: 1,
    username: 'john',
    sex: 1,
    email: 'john@163.com'
  },
  {
    id: 2,
    username: 'jerry',
    sex: 1,
    email: 'jerry@163.com'
  },
  {
    id: 3,
    username: 'nancy',
    sex: 0,
    email: ''
  }
];
```

如果你用过lodash这个库，使用`_.keyBy`这个方法就能进行转换，但用`reduce`也能实现这样的需求。

```
function keyByUsernameReducer(acc, person) {
    return {...acc, [person.id]: person};
}
const userObj = userList.reduce(keyByUsernameReducer, {});
console.log(userObj);
// {
//     1: {
//         id: 1,
//         username: 'john',
//         sex: 1,
//         email: 'john@163.com'
//     },
//     2: {
//       id: 2,
//       username: 'jerry',
//       sex: 1,
//       email: 'jerry@163.com'
//     },
//     3: {
//       id: 3,
//       username: 'nancy',
//       sex: 0,
//       email: ''
//     }
// }
```

# 将小数组展开成大数组

试想这样一个场景，我们将一堆纯文本行读入数组中，我们想用逗号分隔每一行，生成一个更大的数组名单。

```
const fileLines = [
    'Inspector Algar,Inspector Bardle,Mr. Barker,Inspector Barton',
    'Inspector Baynes,Inspector Bradstreet,Inspector Sam Brown',
    'Monsieur Dubugue,Birdy Edwards,Inspector Forbes,Inspector Forrester',
    'Inspector Gregory,Inspector Tobias Gregson,Inspector Hill',
    'Inspector Stanley Hopkins,Inspector Athelney Jones'
];

function splitLineReducer(acc, line) {
    return acc.concat(line.split(/,/g));
}
const investigators = fileLines.reduce(splitLineReducer, []);
console.log(investigators);
// [
//   "Inspector Algar",
//   "Inspector Bardle",
//   "Mr. Barker",
//   "Inspector Barton",
//   "Inspector Baynes",
//   "Inspector Bradstreet",
//   "Inspector Sam Brown",
//   "Monsieur Dubugue",
//   "Birdy Edwards",
//   "Inspector Forbes",
//   "Inspector Forrester",
//   "Inspector Gregory",
//   "Inspector Tobias Gregson",
//   "Inspector Hill",
//   "Inspector Stanley Hopkins",
//   "Inspector Athelney Jones"
// ]

```

我们从长度为5的数组开始，最后得到一个长度为16的数组。

另一种常见增加数组的情况是flatMap，有时候我们用map方法需要将二级数组展开，这时可以用reduce实现扁平化

例如：

```
Array.prototype.flatMap = function(f) {
    const reducer = (acc, item) => acc.concat(f(item));
    return this.reduce(reducer, []);
}

const arr = ["今天天气不错", "", "早上好"]

const arr1 = arr.map(s => s.split(""))
// [["今", "天", "天", "气", "不", "错"],[""],["早", "上", "好"]]

const arr2 = arr.flatMap(s => s.split(''));
// ["今", "天", "天", "气", "不", "错", "", "早", "上", "好"]
```

## 在一次遍历中进行两次计算

有时我们需要对数组进行两次计算。例如，我们可能想要计算数字列表的最大值和最小值。我们可以通过两次通过这样做：

```
const readings = [0.3, 1.2, 3.4, 0.2, 3.2, 5.5, 0.4];
const maxReading = readings.reduce((x, y) => Math.max(x, y), Number.MIN_VALUE);
const minReading = readings.reduce((x, y) => Math.min(x, y), Number.MAX_VALUE);
console.log({minReading, maxReading});
// {minReading: 0.2, maxReading: 5.5}
```

这需要遍历我们的数组两次。但是，有时我们可能不想这样做。因为.reduce()让我们返回我们想要的任何类型，我们不必返回数字。我们可以将两个值编码到一个对象中。然后我们可以在每次迭代时进行两次计算，并且只遍历数组一次：

```
const readings = [0.3, 1.2, 3.4, 0.2, 3.2, 5.5, 0.4];
function minMaxReducer(acc, reading) {
    return {
        minReading: Math.min(acc.minReading, reading),
        maxReading: Math.max(acc.maxReading, reading),
    };
}
const initMinMax = {
    minReading: Number.MAX_VALUE,
    maxReading: Number.MIN_VALUE,
};
const minMax = readings.reduce(minMaxReducer, initMinMax);
console.log(minMax);
// {minReading: 0.2, maxReading: 5.5}
```

## 将映射和过滤合并为一个过程

还是先前那个用户列表，我们希望找到没有电子邮件地址的人的用户名，返回它们用户名用逗号拼接的字符串。一种方法是使用三个单独的操作：

- 获取过滤无电子邮件后的用户
- 获取用户名列表
- 拼接用户名

将它们放在一起可能看起来像这样：

```
function notEmptyEmail(x) {
   return !!x.email
}

function notEmptyEmailUsername(a, b) {
    return a ? `${a},${b}` : b
}

const userWithEmail = userList.filter(notEmptyEmail);
const usernameWithEmail = userWithEmail.map((user=> user.username)
const userWithEmailFormatStr = userWithEmail.reduce(notEmptyEmailUsername, '');

console.log(userWithEmailFormatStr);
// 'john,jerry'
```

现在，这段代码是完全可读的，对于小的样本数据不会有性能问题，但是如果我们有一个庞大的数组呢？如果我们修改我们的reducer回调，那么我们可以一次完成所有事情：

```
function notEmptyEmail(x) {
   return !!x.email
}

function notEmptyEmailUsername(usernameAcc, person){
	return (notEmptyEmail(person))
        ? (usernameAcc ? `${usernameAcc},${person.username}` : `${person.username}`) : usernameAcc;
}

const userWithEmailFormatStr = userList.reduce(notEmptyEmailUsername, '');

console.log(userWithEmailFormatStr);
// 'john,jerry'
```

在这个版本中，我们只遍历一次数组，一般建议使用`filter`和`map`的组合，除非发现性能问题，才推荐使用`reduce`去做优化。

## 按顺序运行异步函数

我们可以做的另一件事.reduce()是按顺序运行promises（而不是并行）。如果您对API请求有速率限制，或者您需要将每个prmise的结果传递到下一个promise，`reduce`可以帮助到你。

举一个例子，假设我们想要为`userList`数组中的每个人获取消息。

```
function fetchMessages(username) {
    return fetch(`https://example.com/api/messages/${username}`)
        .then(response => response.json());
}

function getUsername(person) {
    return person.username;
}

async function chainedFetchMessages(p, username) {
    // In this function, p is a promise. We wait for it to finish,
    // then run fetchMessages().
    const obj  = await p;
    const data = await fetchMessages(username);
    return { ...obj, [username]: data};
}

const msgObj = userList
    .map(getUsername)
    .reduce(chainedFetchMessages, Promise.resolve({}))
    .then(console.log);
// {glestrade: [ … ], mholmes: [ … ], iadler: [ … ]}
```

`async`函数返回一个 Promise 对象，可以使用`then`方法添加回调函数。当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

请注意，在此我们传递Promise作为初始值`Promise.resolve()`，我们的第一个API调用将立即运行。

下面是不使用`async`语法糖的版本

```
function fetchMessages(username) {
    return fetch(`https://example.com/api/messages/${username}`)
        .then(response => response.json());
}

function getUsername(person) {
    return person.username;
}

function chainedFetchMessages(p, username) {
    // In this function, p is a promise. We wait for it to finish,
    // then run fetchMessages().
    return p.then((obj)=>{
	    return fetchMessages(username).then(data=>{
		    return {
		        ...obj,
		        [username]: data
		    }
	    })
    })
}

const msgObj = peopleArr
    .map(getUsername)
    .reduce(chainedFetchMessages, Promise.resolve({}))
    .then(console.log);
// {glestrade: [ … ], mholmes: [ … ], iadler: [ … ]}
```



# 自从学会了 Array.reduce() ，再也离不开它

在所有后 ES6 时代的数组方法中，我觉得最难理解的就是`Array.reduce()`。

从表面上看，它似乎是一个简单无趣的方法，并没有太大作用。 但是在不起眼的外表之下，`Array.reduce()`实际上是对开发人员工具包的强大而灵活的补充。

今天，我们就来研究一下通过`Array.reduce()`可以完成的一些有意思的事情。

## 原理

大部分现代的数组方法都返回一个新的数组，而 `Array.reduce()` 更加灵活。它可以返回任意值，它的功能就是将一个数组的内容聚合成单个值。

这个值可以是数字、字符串，甚至可以是对象或新数组。这就是一直难住我的部分，我没想到它这么灵活！

## 用法

`Array.reduce()`接受两个参数：一个是对数组每个元素执行的回调方法，一个是初始值。

这个回调接收4个参数，前两个参数是：`accumulator`是当前聚合值，`current`是数组循环时的当前元素。无论你返回什么值，都将作为累加器提供给循环中的下一个元素。初始值将作为第一次循环的累加器。

```
var myNewArray = [].reduce(function (accumulator, current) {
  return accumulator;
}, starting);
```

让我们来看几个实际例子。

## 1. 数组求和

假设你想把一组数字加在一起。使用`Array.forEach()`大概可以这么做：

```
var total = 0;

[1, 2, 3].forEach(function (num) {
  total += num;
});

```

这是`Array.reduce()`用得最多的例子了。我发现* accumulator *这个单词让人困惑，所以在示例中我改为`sum`，因为这里就是求和的意思。

```
var total = [1, 2, 3].reduce(function (sum, current) {
  return sum + current;
}, 0);

```

这里传入`0`作为初始值。

在回调里，将当前值加入到 `sum`，第一轮循环时它的值是初始值`0`，然后变成`1`（初始值`0`加上当前元素值`1`），然后变成`3`（累加值 `1`加上当前元素值 `2` ），以此类推

## 2. 组合多个数组方法

假设有一个`wizards` 数组：

```
var wizards = [
  {
    name: 'Harry Potter',
    house: 'Gryfindor'
  },
  {
    name: 'Cedric Diggory',
    house: 'Hufflepuff'
  },
  {
    name: 'Tonks',
    house: 'Hufflepuff'
  },
  {
    name: 'Ronald Weasley',
    house: 'Gryfindor'
  },
  {
    name: 'Hermione Granger',
    house: 'Gryfindor'
  }
];
```

你想创建一个仅包含住在 Hufflepuff 的巫师名字的新数组。一个可行的方法是使用`Array.filter()` 方法获取 `house` 属性为`Hufflepuff`的 `wizards` 。然后用`Array.map()` 方法创建一个只包含过滤后对象的`name` 属性的新数组。

```
var hufflepuff = wizards.filter(function (wizard) {
  return wizard.house === 'Hufflepuff';
}).map(function (wizard) {
  return wizard.name;
});
```

使用`Array.reduce()` 方法，我们可以用一步得到同样的结果，提高了性能。传递一个空数组`[]`作为初始值。每次循环时判断`wizard.house` 是否为`Hufflepuff`。如果是，就加入到`newArr` 中（即`accumulator`），否则啥也不做。

无论判断条件是否成立，最后都返回 `newArr` 作为下一次循环的`accumulator` 。

```
var hufflepuff = wizards.reduce(function (newArr, wizard) {
  if (wizard.house === 'Hufflepuff') {
    newArr.push(wizard.name);
  }
  return newArr;
}, []);

```

## 3. 从数组生成 HTML 标签

那么，如果想创建一个由住在 Hufflepuff 的巫师组成的无序列表要怎么做呢？这次不是给`Array.reduce()`传一个空数组作为初始值了，而是一个名为 `html`的空字符串`''`。

如果`wizard.house` 等于 `Hufflepuff`，我们就将`wizard.name` 用列表项`li`包裹起来，再拼接到`html` 字符串里。然后返回`html` 作为下一次循环的`accumulator` 。

```
var hufflepuffList = wizards.reduce(function (html, wizard) {
  if (wizard.house === 'Hufflepuff') {
    html += '<li>' + wizard.name + '</li>';
  }
  return html;
}, '');
```

在`Array.reduce()`前后添加无序列表的开始和结束标记，就可以把它插入到 DOM 中了。

```
var hufflepuffList = '<ul>' + wizards.reduce(function (html, wizard) {
  if (wizard.house === 'Hufflepuff') {
    html += '<li>' + wizard.name + '</li>';
  }
  return html;
}, '') + '</ul>';
```

## 4. 数组元素分组

lodash 有个 `groupBy()`方法，可以将数组元素按照某个标准分组。

假设你有一个数字数组。

如果你想把`numbers` 数组中的元素按照整数部分的值分组，用 lodash 可以这样做：

```
var numbers = [6.1, 4.2, 6.3];

// 返回 {'4': [4.2], '6': [6.1, 6.3]}
_.groupBy(numbers, Math.floor);

```

如果你有一个单词数组，你想根据 `words` 中的单词长度分组，你可以这样做：

```
var words = ['one', 'two', 'three'];

// 返回 {'3': ['one', 'two'], '5': ['three']}
_.groupBy(words, 'length');

```

### 用 `Array.reduce()` 实现 `groupBy()`函数

你可以用`Array.reduce()` 方法实现同样的功能。

我们来创建一个工具函数`groupBy()`，接受数组和分组条件作为参数。在`groupBy()`内部，在数组上执行`Array.reduce()` ，传一个空对象`{}`作为初始值，然后返回结果。

```
var groupBy = function (arr, criteria) {
  return arr.reduce(function (obj, item) {
    // 省略代码
  }, {});
};

```

在 `Array.reduce()` 回调函数内部，我们会判断`criteria`是函数还是 `item`的属性。然后获取当前`item`的值。

如果`obj` 中还不存在这个属性，则创建它，并将一个空数组赋值给它。最后，将`item` 添加到 `key`的数组中，再返回该对象作为下一次循环的`accumulator` 。

```
var groupBy = function (arr, criteria) {
  return arr.reduce(function (obj, item) {

    // 判断criteria是函数还是属性名
    var key = typeof criteria === 'function' ? criteria(item) : item[criteria];

    // 如果属性不存在，则创建一个
    if (!obj.hasOwnProperty(key)) {
      obj[key] = [];
    }

    // 将元素加入数组
    obj[key].push(item);

    // 返回这个对象
    return obj;

  }, {});
};

```

## 5. 合并数据到单个数组

还记得前面的`wizards`数组吗？

```
var wizards = [
  {
    name: 'Harry Potter',
    house: 'Gryfindor'
  },
  {
    name: 'Cedric Diggory',
    house: 'Hufflepuff'
  },
  {
    name: 'Tonks',
    house: 'Hufflepuff'
  },
  {
    name: 'Ronald Weasley',
    house: 'Gryfindor'
  },
  {
    name: 'Hermione Granger',
    house: 'Gryfindor'
  }
];

```

如果还有另一份数据，每个巫师获得的的积分对象：

```
var points = {
  HarryPotter: 500,
  CedricDiggory: 750,
  RonaldWeasley: 100,
  HermioneGranger: 1270
};

```

假设你想把两份数据合并到一个数组，也就是把 `points` 数值添加到每个巫师对象上。你会怎么做？

`Array.reduce()` 方法特别适合！

```
var wizardsWithPoints = wizards.reduce(function (arr, wizard) {

  // 移除巫师名字中的空格，用来获取对应的 points
  var key = wizard.name.replace(' ', '');

  // 如果wizard有points，则加上它，否则设置为0
  if (points[key]) {
    wizard.points = points[key];
  } else {
    wizard.points = 0;
  }

  // 把wizard对象加入到新数组里
  arr.push(wizard);

  // 返回这个数组
  return arr;

}, []);

```

其实这里用`Array.map`也很方便实现。

## 6. 合并数据到单个对象

如果你想合并两个来源的数据到一个对象中，也就是巫师的名字作为属性名，house 和 points 作为属性值，要怎么做呢？同样， `Array.reduce()` 很合适。

```
var wizardsAsAnObject = wizards.reduce(function (obj, wizard) {

  // 移除巫师名字中的空格，用来获取对应的 points
  var key = wizard.name.replace(' ', '');

  // 如果wizard有points，则加上它，否则设置为0
  if (points[key]) {
    wizard.points = points[key];
  } else {
    wizard.points = 0;
  }

  // 删除 name 属性
  delete wizard.name;

  // 把 wizard 数据添加到新对象中
  obj[key] = wizard;

  // 返回该对象
  return obj;

}, {});

```

## 总结： `Array.reduce()` 真香

`Array.reduce()` 方法从我曾经认为不堪大用的东西，变成我最喜欢的 JavaScript 方法。那么，你应该使用它吗？什么时候可以用？

`Array.reduce()` 方法有着良好的浏览器支持。所有的现代浏览器都支持，包括 IE9 及以上。移动端浏览器也在很早之前就支持了。如果你还需要支持更老的浏览器，你可以添加一个 polyfill 来支持到 [IE6](https://vanillajstoolkit.com/polyfills/arrayreduce/)。

`Array.reduce()`最大的槽点可能就是对于从来没接触过的人来说有点费解。组合使用`Array.filter()` 和`Array.map()`执行起来更慢，并且包含多余的步骤，但是更容易阅读，从方法名可以明显看出它要做的事情。

尽管如此，有时候`Array.reduce()` 也可以让复杂的事情看起来更简单。 `groupBy()` 工具函数就是个很好的例子。

最后，它应该成为你的工具箱里的另一个工具，一个使用得当就威力无穷的工具。

> 原文：[24ways.org/2019/five-i…](https://24ways.org/2019/five-interesting-ways-to-use-array-reduce/)
>  由1024译站翻译整理


作者：KaysonLi链接：https://juejin.im/post/5dfd9d27e51d455825129ec3来源：掘金著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。







# Reduce

## 1.语法

 `reduce()` 方法对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。 

> arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])

**reducer** 函数接收4个参数:

1. Accumulator (acc) (累计器)
2. Current Value (cur) (当前值)
3. Current Index (idx) (当前索引)
4. Source Array (src) (源数组)

**参数说明**

**`accumulator`**

- `currentValue`

  数组中正在处理的元素。

- `index` 可选

  数组中正在处理的当前元素的索引。 如果提供了`initialValue`，则起始索引号为0，否则从索引1起始。

- `array`可选

  调用`reduce()`的数组

`initialValue`可选

作为第一次调用 `callback`函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

## 2.reduce求和

```js
// 数组求和
const arr = [1, 3, 6];
const sum = arr.reduce((prev, next) => prev + next);
console.log(sum); // 10

// 对象求和
const result = [{ subject: 'math', score: 88 }, { subject: 'chinese', score: 95 }, { subject: 'english', score: 80 }];
const sum2 = result.reduce((memo, current) => memo + current.score, 0);
```



## 3.统计字符出现次数

```js
const arrString = 'hello word hello word';
const result = arrString.split('').reduce(function (prev, curr) {
  prev[curr] ? prev[curr]++ : prev[curr] = 1;
  return prev;
}, {});
console.log(result);
```



## 4.数组去重

```js
const arr = [1, 2, 3, 4, 4, 3, 2, 1];
const result = arr.reduce((prev, next) => {
  return prev.includes(next) ? [...prev] : [...prev, next];
}, []);
console.log(result); // [ 1, 2, 3, 4 ]
```



## 5.扁平化数组

```js
const arr = [1, 2, [1, [5, 6, 7]], { a: 1 }];

const _flat = (arr) => {
  return arr.reduce((prev, next) => {
    return Array.isArray(next) ? [...prev, ..._flat(next)] : [...prev, next];
  }, []);
};

// 原生的方法
console.log(arr.flat(1));
console.log(arr.flat(2));
[ 1, 2, 1, [ 5, 6, 7 ], { a: 1 } ]
[ 1, 2, 1, 5, 6, 7, { a: 1 } ]
```









