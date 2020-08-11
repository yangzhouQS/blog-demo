# 万字总结Vue(包含全家桶),希望这一篇可以帮到您

# 基础使用

以下代码均经过自己测试，可以复制直接看效果。**注意引入Vue文件**

全部代码等所有都更新完成之后会上传GitHub或者码云.我会抓紧时间更新的

## 渲染优先级

1. `render`>`template`>`data`的插值表达式
2. {{}} 放的是表达式的时候会 **输出结果**，内部转为函数

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>基本概念</title>
    <script src="vue.js"></script>
</head>
<body>
<h1>显示优先级</h1>
<ul>
    <li>第一个是render 有render方法就输出render的渲染结果</li>
    <li>第二个是template 有template方法就输出template的内容</li>
    <li>最后一个是data，如果两者不存在 则输出data里面的插值表达式</li>
    {{ }} 当这里面放的是一个表达式的时候，会输出表达式的结果 原因 会转化成一个函数 render
</ul>
<p>指令修饰符,有好多 自己官网看</p>

<div id="app">

    {{ msg }}
</div>
<script>
  let vm = new Vue({
    el: '#app',
    data() {
      return {
        msg: '我是data',
      }
    },
    template: '<div>我是template</div>',
    render(h) {
      return h('div', ['我是render'])
    },
    method: {
      fn(e) { // 不添加括号自动添加事件源, 添加括号 手动传入事件源
        console.log('内部已经使用bind 绑定了this ,再次绑定也没什么用')
        console.log(this)
      },
    },
  })
</script>
</body>
</html>

复制代码
```

## v-model

`v-model` 实际上是一个 **语法糖**

```
<input type="text" :value = 'msg' @input="handleInput">
<!-- 实际上是上述的语法糖-->
<input type="text" v-model="msg">
复制代码
```

### v-model 的应用

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>v-model</title>
    <script src="vue.js"></script>
</head>
<body>
<div id="app">

    {{ msg }}
    <p>@input</p>
    <input type="text" :value = 'msg' @input="handleInput">
    <p>这个是@chage</p>
    <input type="text" :value = 'msg' @change="handleInput">
    <p>v-model  是上面@input的语法糖</p>
    <input type="text" v-model="msg">
    <p>@input 和@change 区别  一个是 聚焦的时候 一个是 失去焦点的时候</p>
    <p>下拉列表</p>
    {{ selected }}<br>
    <select v-model="selected">
        <option value="" disabled>请选择</option>
        <option value="1">a</option>
        <option value="2">b</option>
        <option value="3">c</option>
    </select>

    <p>下拉列表多选 这样绑定的值必须是一个列表</p>
    {{ selectedMore }}<br>
    <select v-model="selectedMore" multiple>
        <option value="" disabled>请选择</option>
        <option value="1">a</option>
        <option value="2">b</option>
        <option value="3">c</option>
    </select>

    <p>复选框</p>
    {{ checked }}<br>
    游泳 <input v-model="checked" type="checkbox" value="游泳">
    洗澡 <input v-model="checked" type="checkbox" value="洗澡">
    睡觉 <input v-model="checked" type="checkbox" value="睡觉">

    <p>单选框</p>
    {{ radioed }}<br>
    男 <input type="radio" value="男" v-model="radioed">
    女 <input type="radio" value="女" v-model="radioed">
    <p>v-model 修饰符</p>
    <p>{{ attr }}</p>
    <input type="number" v-model.number="attr">
    <p>{{ attrText }}作用类似@chage</p>
    <input type="text" v-model.lazy="attrText">
    <p>{{ attrText }} 去除空格</p>
    <input type="text" v-model.trim="attrText">
</div>
<script>
  let vm = new Vue({
    el: '#app',
    data() {
      return {
        msg: '我是data',
        selected:'',
        selectedMore:[],
        checked:[],
        radioed:'',
        attr:0,
        attrText:''
      }
    },
    methods: {
     handleInput(e){
       this.msg = e.target.value
     }
    },
  })
</script>
</body>
</html>
复制代码
```

## watch

观测值的变化 执行对应函数

三种写法：

1. 添加`deep`属性，表明要深度遍历
2. 添加`immediate`属性，表明 立即执行
3. 添加 `name`属性，执行`methods`的这个方法

```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div id="app">
    {{ msg }}
    {{ name }}
</div>
<script src="vue.js"></script>
<script>
  let vm = new Vue({
    el: '#app',
    data() {
      return {
        msg: { a: '123' },
        name:'456'
      }
    },
    methods: {
      fn() {
        console.log('这是methods')
      },
    },
    // 第一种
    // watch:{
    //   msg:{
    //     handler(oldValue,newValue){
    //       console.log(oldValue,newValue) // 如果是对象的不到老值
    //     },
    //     deep: true  // 如果是对象继续深度遍历
    //   }
    // }
    watch: {
      msg: [
        // {
        //   handler(oldValue, newValue) {
        //     console.log(oldValue, newValue) // 如果是对象的不到老值
        //   },
        //   immediate: true,  // 立即执行
        // },
        // 'fn', // 不知道为什么不行
      ],
      name:'fn'
    },

  })
  setTimeout(() => {
    vm.msg.a = '456'
    vm.name = '789'
  }, 1000)
</script>
</body>
</html>
复制代码
```

## computed

经常使用`get`，但是还有一个`set`

```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div id="app">
    全选: <input type="checkbox" v-model="checkAll">
    <hr>
    <input type="checkbox" v-for="check in checks" v-model="check.check">
</div>
<script src="vue.js"></script>
<script>
  let vm = new Vue({
    el: '#app',
    data() {
      return {
        checks: [{ check: true }, { check: true }, { check: true }],
      }
    },
    computed: {
      checkAll: {
        get() {
          // 有一个不满足 返回false  并且不往下进行
          return this.checks.every((item) => item.check)
        },
        set(newValue) {
          this.checks.forEach(item => item.check = newValue)
        },
      },
    },
  })
</script>
</body>
</html>
复制代码
```

## watch 和computed区别

1. computed不会立马取值,用到的时候才会取值. 并且有缓存,依赖数据不改变不更新结果
2. watch **立即执行**,会先算出来一个老值.数据变化就执行函数

## filter

过滤器，将属性进行格式化后在进行展示

分为 **全局**和 **局部**两种

会接受两个参数，一个是要格式化的数据，一个是格式化的规则

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
    <script src="vue.js"></script>
</head>
<body>
<div id="app">
    <p>局部</p>
    {{ timer | format1('YYYY:MM:DD') }}
    <p>全局</p>
    {{ timer | format('YYYY:MM:DD') }}
</div>
<script>
  Vue.filter('format', function (timer, format) {
    return dayjs(timer).format(format)
  })
  let vm = new Vue({
    el:'#app',
    data() {
      return {
        timer: 123456789,
      }
    },
    filters:{
      format1(timer, format){
        return dayjs(timer).format(format)
      }
    }
  })
</script>
</body>
</html>
复制代码
```

## 指令

同样分为 **局部** 和 **全局**

使用的时候 在想要使用的标签上添加 `v-xxx` xxx为指令名字就可以

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>指令</title>
    <script src="vue.js"></script>
</head>
<body>
<div id="app">
    <p>自动获取焦点</p>
    <input type="text" v-focus>
    <p>点击显示 日历效果</p>
    <div v-click-outside="hide">
        <input type="text" @focus="show">
        <div v-if="isShow">
            日历显示 时间
        </div>
    </div>
    <h1>指令有生命周期.有钩子</h1>
    <ul>
        <li>bind 绑定上的时候会执行一次</li>
        <li>inserted 插入的时候</li>
        <li>update 当引用数据发生变化的时候</li>
        <li>componentUpdate 模板更新</li>
        <li>unbind 解除绑定</li>
        <li>默认写成一个函数 bind+update</li>
    </ul>
    <h1>指令传入三个参数的含义</h1>
    <ul>
        <li>el 当前元素 </li>
        <li>bindings 有关指令的各个属性</li>
        <li>vNode 虚拟节点</li>
        <li>vNode.context Vue实例</li>
    </ul>
</div>

<script>
  // 全局注册指令
  Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
      // 聚焦元素
      el.focus()
    },
  })
  let vm = new Vue({
    el: '#app',
    // 局部指令
    directives: {
      clickOutside: {
        bind(el, bindings, vNode) {
          el.handler = function (e) {
            // console.log(e.target)
            console.log(vNode.context)
            if (!el.contains(e.target)) {
              vNode.context[bindings.expression]()
            }
          }
          document.addEventListener('click', el.handler)
        },
        unbind(el) {
          document.removeEventListener('click', el.handler)
        },
      },
    },
    data() {
      return {
        isShow: false,
      }
    },
    methods: {
      show() {
        this.isShow = true
      },
      hide() {
        this.isShow = false
      },
    },
  })
</script>
</body>
</html>
复制代码
```

## 实例属性

介绍一些常用的 **实例属性**

1. `$mount()` 挂载,参数写要挂载的节点。如果不写，则挂载的`$el`属性上，可以手动挂载（比如写Message弹框）
2. `$options` 获取用户写的配置
3. `$watch` 跟watch 用法一样

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>实例属性</title>
    <script src="vue.js"></script>
</head>
<body>
<div id="app">
    {{ msg }}
</div>
<script>
  let vm = new Vue({
    // el:'#app',
    data() {
      return {
        msg: '我是data',
      }
    },
    template: '<div>我是template</div>',
    render(h) {
      return h('div', ['我是render'])
    },
  })
  vm.$mount() // 挂载 提供值了就挂载到对应的 节点上
  // 不提供就挂载到$el 属性上 代表要手动挂载
  console.log(vm.$el) // 获取真实节点
  document.body.appendChild(vm.$el)

  console.log(vm.$options) // 用户参数
  console.log(vm.$watch('msg', function (oldValue, newValue) {
    console.log(oldValue, newValue)
  })) //  就是 watch  另一种写法  批量更新 只更新一次 内部有队列
</script>
</body>
</html>
复制代码
```

# 进阶

## 动画

动画分为两种，一种是`CSS`动画，一种是`js`动画。各位按照需求选择

因为个人推荐使用`CSS`作动画，所以`JS`版本就不再写出来了。有兴趣的朋友可以点击[这里](https://juejin.im/post/[https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-钩子](https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-钩子))

**css版本**

就是把 **要做动画的DOM元素用`transition`包裹一下**

然后记住一下6个名字，分别对应动画不同的周期

1. `.v-enter` 进入动画时候
2. `.v-enter-active` 进入动画过程中
3. `.v-enter-to` 进入动画进行到最后
4. `.v-leave` 这个没有实际意义,为了美感
5. `.v-leave-active` 离开动画过程中
6. `.v-leave-to` 离开动画结束

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>动画</title>
    <script src="../vue.js"></script>
</head>
<body>
<div id="app">
    <p>transiton 可以有name 属性 给改名字,这样一些 v-leave 则变成的  name-leave</p>
    <transition>
        <div v-show="isShow" class="box" style=" width: 100px;height: 100px;">
        </div>
    </transition>
    <button @click="handleShow">点我</button>
    <p>transition Vue动画标签 transition-group 动画组</p>
</div>
<script>
  let vm = new Vue({
    el: '#app',
    data() {
      return {
        isShow: false,
      }
    },
    methods: {
      handleShow() {
        this.isShow = !this.isShow
      },
    },
  })
</script>
<style>
    .box {
        background-color: red
    }

    /*进入动画时候的颜色*/
    .v-enter {
        background-color: blue;
    }

    /*动画过程中*/
    .v-enter-active {
        transition: all 2s linear;
    }

    /*动画进行到最后*/
    .v-enter-to {
        background-color: yellow;
    }

    /*    进行完之后会变成红色*/

    /*这个没有实际意义,为了美感*/
    .v-leave {
        background-color: purple;
    }
    .v-leave-active{
        transition: all 2s linear;
    }
    .v-leave-to{
        background-color: blue;
    }
</style>
</body>
</html>
复制代码
```

## 动画组

与上一个不一样的是，这个数多组动画。

**区别** 使用了 `transition-group`

**动画名称**

- `enter-class`
- `enter-active-class`
- `enter-to-class` (2.1.8+)
- `leave-class`
- `leave-active-class`
- `leave-to-class` (2.1.8+)

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>动画</title>
    <script src="../vue.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
</head>
<body>
<div id="app">
    <p>vue中动画组</p>
    <input type="text" v-model="content">
    <transition-group
            enter-active-class="animated bounceInLeft"
            leave-active-class="animated bounceOutRight"
    >
        <li v-for="arr in computedArr" :key="arr">{{ arr }}</li>
    </transition-group>
</div>
<script>
  let vm = new Vue({
    el: '#app',
    data() {
      return {
        content:'',
        arrs:['abc','basd','zxcw','awqec','kjea']
      }
    },
    methods: {
      handleShow() {
        this.isShow = !this.isShow
      },
    },
    computed:{
      computedArr(){
        return this.arrs.filter(item => item.includes(this.content))
      }
    }
  })
</script>
<style>
li{
    width: 200px;
    background-color: blue;
    line-height: 35px;
}
</style>
</body>
</html>
复制代码
```

## 组件

## 组件通讯(重点)

我总结了 一下，大概以下几种

1. `props`+`emit`
2. `provide`+`inject` 单项 数据流
3. `$parent`+`$children` 直接触发父/子类的事件
4. `$broadcast` + `$dispatch` 自己在原型上写的
5. `$attrs`+`$listeners` 通过所有属性和方法的集合获取
6. `$bus` 类似`Vuex`
7. `Vuex` `Vue`插件

### props+emit

```
// parents
<template>
    <div>
        <h1>Parent</h1>
        <h2>第一种</h2>
        <Son :money="money" :changMoney="changMoney"></Son>
        <p>第二中方法 click2是自己定义的名字,不是原生事件</p>
        <Son :money="money" @click2="changMoney"></Son>
    </div>
</template>
<script>
  import Son from './Son'
  export default {
    name: 'Parent',
    data() {
      return {
        money: 200,
      }
    },
    components: {
      Son
    },
    methods: {
      changMoney(value) {
        this.money = value
      },
      changMoney2(val) {
        this.money += val
      },
    },
  }
</script>

// son
<template>
    <div>
        <h1>Son</h1>
        <p>子组件接收到之后,利用props 属性接受,然后可以直接使用</p>
        <p>子组件可以使用父组件传递的属性和函数</p>
        我是爸爸给我的钱{{ money }}
        <h2>第一种</h2>
		<button @click="changMoney(500)">改变父亲钱数</button>
        <h2>第二种方法</h2>
        <button @click="change">改变父亲钱数2</button>
    </div>
</template>
<script>
  export default {
    props:{
      money: {
        type:Number,
        default:100
      },
      changMoney:{
        type:Function,
        default: ()=>{}
      }
    },
    methods:{
      change(){
        this.$emit('click2',300)
      }
    }
  }
</script>
复制代码
```

第一种是 传递一个属性还有一个函数，子代接收到之后，可以在使用

第二种是 利用`$emit`, 直接触发 **在父级定义的函数**

**特别注意**，这个`click2`**不是原生的**，你把它叫做 a , b 之类等都可以

### `provide`+`inject`

**官方建议**：

> `provide` 和 `inject` 主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。

这个就比较简单。类似于`react`的`redux`

```
// parent
<template>
    <div>
        <h1>Parent</h1>
        <h1> 关于son2  跨代通讯</h1>
        <Son2 @eat="eat"></Son2>
    </div>
</template>
<script>
  import Son2 from './Son2'

  export default {
    provide(){
      return {parent:this}
    },
    name: 'Parent',
    data() {
      return {
        money: 200,
      }
    },
    components: {
      Son2,
    },
    methods: {
      eat(){
        console.log('patent中的eat方法')
      }
    },
  }
</script>

// son2
<template>
    <div>
        Son2
        <GrandSon></GrandSon>
    </div>
</template>
<script>
  import GrandSon from './GrandSon'

  export default {
    name:'Son2',
    components: {
      GrandSon,
    },
  }
</script>

// grandSon
<template>
<div>
    GrandSon
    <p>跨代通讯的值</p>
    {{ parent.money }}
    <button @click="$parent.$emit('eat')">触发父组件的eat方法</button>
</div>
</template>
<script>
export default {
  inject:['parent']
}
</script>
复制代码
```

写一个`Son2`的作用，就是让大家明白，隔代也是可以的。一个提供，一个接收之后就可以使用

### `$parent`+`$children`

这个我就直接用上面的代码了。这个比较简单。就是通过`$parent`/`$children` 找到它的父/子级。然后 使用或者触发他们的属性或者方法

### `$broadcast` + `$dispatch`

再次引用官方的话

> `$dispatch` 和 `$broadcast` 已经被弃用。请使用更多简明清晰的组件间通信和更好的状态管理方案，如：[Vuex](https://github.com/vuejs/vuex)。

当然，我们还是介绍一些这两个方法，各位看需要使用（小声bb一下，我觉得`Vuex`真香）

```
// 在main.js上
import Vue from 'vue'
import App from './App';

/**
 *  找父节点触发事件
 * @param eventName
 * @param ComName
 * @param Value
 */
Vue.prototype.$dispatch = function (eventName, ComName = '', Value = '') {
  let parent = this.$parent;
  while (parent) {
    if (ComName && parent.$options.name === ComName) {
      parent.$emit(eventName, Value)
      return
    } else {
      parent.$emit(eventName, Value)
      parent = parent.$parent
    }
  }
}
/**
 * 找子节点触发事件
 * @param eventName
 * @param ComName
 * @param value
 */
Vue.prototype.$broadcast = function (eventName, ComName = '', value = '') {
  let children = this.$children // 获取得是数组
  function broadcast(children) {
    for (let i = 0; i < children.length; i++) {
      let child = children[i]
      if (ComName === child.$options.name) {
        child.$emit(eventName, value)
        return
      } else {
        if (child.$children) {
          broadcast(child)
        }
      }
    }
  }
  broadcast(children)
}
复制代码
```

这两个方法利用了`$parent`和`$children`。不断获取父/子节点，触发相对应的事件。

我这个`$dispatch`的`else`写的是，如果不是这个组件的事件，我也触发了。其实应该把这句删除。只 继续往上找就可以

**使用**

```
// 直接这样使用就好
<button @click="$parent.$emit('eat')">触发父组件的eat方法</button> 
复制代码
```

### `$attrs`+`$listeners`

[官方定义](https://cn.vuejs.org/v2/api/#vm-attrs)

```
// APP.vue
<template>
    <div>
        <Test :a="1" :b="2" :c="3" :d="4" @click="click"></Test>
    </div>
</template>
<script>
  import Test from './test'
  export default {
    data() {
      return {
        msg: 'hello',
      }
    },
    components: {
      Test,
    },
    methods:{
      click(){
        console.log('我是APP中的click')
      }
    }
  }
</script>

// test.vue
<template>
<div>
    我是test
    <h1>使用$attrs可以获得，但是会绑定在DOM元素上</h1>
    <ul>
        <li>设置 <strong>inheritAttrs:false </strong>就不会绑定了</li>
        <li>当props接收后，arrts将不会显示已经被接收的</li>
        {{ $attrs }}
        <li>这样子代传递</li>
        <button @click="$listeners.click">触发APP中的click</button>
        <test2 v-bind="$attrs" v-on="$listeners"></test2>
    </ul>
</div>
</template>
<script>
    import test2 from './test2';
    export default {
      props:['a'],
      name:'Test',
      inheritAttrs:false,
      components:{
        test2
      }
    }
</script>

//test2.vue
<template>
    <div>
        <h1>我是test2</h1>
        {{ $attrs }}
        <button @click="$listeners.click">触发APP中的click</button>
    </div>
</template>
<script>
  export default {
    name: 'test2',
  }
</script>
复制代码
```

**注意**

1. 父级这样传递属性的过程中，会把这个属性绑定在DOM元素上，(被`props`接收的不会被绑定),可以在子类中使用`inheritAttrs:false,`来设置取消绑定
2. 使用得时候，直接使用`$attrs.x`/`$listeners.x`使用
3. 往下一代传递的时候，直接使用`v-bind="$attrs" v-on="$listeners"`，就可以把没有被`props`接收过的都传给下一代使用

### `$bus`

就是挂载了一个`Vue`实例

```
// APP.vue
<template>
    <div>
        <h1>子组件如何监听父组件的mounted</h1>
        <p>组件挂载， 先挂载父组件 -》渲染子组件，子mounted -》 父mounted</p>
        <p>可以实现任意组件之间的通讯，但只适合小规模的</p>
        <bus></bus>
    </div>
</template>
<script>
  import bus from './$bus使用';
  export default {
    data() {
      return {
        msg: 'hello',
      }
    },
    mounted(){
      this.$bus.$emit('监听事件','hello')
    },
    components: {
      bus
    },
  }
</script>
// $bus使用
<template>
<div>
    bus
    {{ $bus.a }}
</div>
</template>
<script>
  export default {
    name: 'bus',
    mounted() {
      // 发布订阅模式  可以多次订阅
      this.$bus.$on('监听事件', function (value) {
        console.log(value)
      })
    },
    beforeDestroy(){
      // 解绑组件
      this.$bus.$off('监听组件')
    }
  }
</script>
复制代码
```

### Vuex

请往后面看

## 插槽

```
<template>
    <div>
        <h1>插槽</h1>
        <test1>
            我是标签里面的内容
        </test1>
        <h1>具名插槽</h1>
        <p>新版写法只可以用 template</p>
        <p>这里插值表达式的数据用的是父类的</p>
        <test1>
<!--            老版本写法-->
<!--            <div slot="header">asd</div>-->
<!--            <div slot="footer">qwe</div>-->
            <template v-slot:header>header {{ msg }}<br></template>
            <template v-slot:footer>footer</template>
        </test1>

        <h1>作用域插槽</h1>
        <p>这样用的是子类的数据</p>
        <test1>
<!--            老版本写法-->
<!--            <div slot="header" slot-scope="{a,b}">{{ a }}{{ b }}</div>-->
            <template v-slot:header="{a,b}" >{{ a }},{{ b }}</template>
        </test1>
    </div>
</template>
<script>
import test1 from './test1';
  export default {
    data() {
      return {
        msg: 'hello',
      }
    },
    components:{
      test1
    }
  }
</script>

// test1
<template>
    <div>
        <h1>我是test1</h1>
        <slot></slot>
        <slot name="header" a="1" b="2"></slot>
        <slot name="footer"></slot>
    </div>
</template>
<script>
  export default {
    name: 'test1',
  }
</script>
复制代码
```

这个比较简单，就不再多多叙述。强调一点，新老版本区别

1. **新版本**只可以用`template`进心包裹
2. **老版本**可以用`div`等

## 总结

看完上面的内容可以尝试模仿写一下 `element-ui`的表单组件。他们使用了`async-validator`作为校验。

[github地址](https://github.com/yiminghe/async-validator)

# Vue

同样有一个简单版本[Vue数据响应式和编译原理分析 和 模拟实战](https://juejin.im/post/5e971d58f265da47d8300b61).这个版本没有用到`虚拟Dom`等。

`虚拟dom`。个人也总结了一篇[帮你深入了解虚拟DOM和DOM-diff](https://juejin.im/post/5edb5615e51d4578a3247ada),希望能帮到各位

仅仅是一个简单的实现。但是实现了 **部分指令**

完整部分（即这次总结的，带上`虚拟dom`等等），这个内容由于太多（标题细分太多。不好去寻找）。我另写了一篇文章，还在整理中，1号大概可以放出来。

**贴一个图证明一下。实在是考虑的太多，所以写出来比较慢**



![UTOOLS1593399637478.png](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="686"></svg>)



# vueX

 推荐一下自己的另一篇文章[Vuex的简单实现](https://juejin.im/post/5e898ae5e51d4546f940b41e)，感觉这一篇写的相对简单一点

## Vuex 用法

这个就不多做解释了。不太熟练的朋友可以先去看[官方文档](https://vuex.vuejs.org/zh/)

给出一下我的数据定义

```
// store/index.js
import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './../vuex2'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    age: 10
  },
  strict: true,
  getters: {
    myAge(state) {
      return state.age + 30
    }
  },
  mutations: {
    // 同步更改state  在严格模式下不可以使用异步
    change(state, payload) {
      state.age += payload
    }
  },
  actions: {
    // 异步更改state
    asyncChange({ commit }, payload) {
      setTimeout(()=>{
        commit('change', payload)
      }, 1000)
    }
  }
})
export default store
复制代码
```

## 基本Vuex的实现

### install方法

`Vuex`作为一个 **插件**，首先执行的是`install`方法，我们希望的是，**任何组件都可以访问到这里面的数据。组件的渲染是由父到子的**，所以我们既可以先进行判断。如果它是根节点，就把这个属性挂载到根节点上，如果不是，就找他父级的这个属性，然后挂载到这个Vue实例上

```
// 官方Api 会把Vue作为参数传入
const install = (_vue)=>{
    Vue = _vue
  Vue.mixin({ // 先父后子
    beforeCreate() {
      if (this.$options.store) { // 跟节点
        this.$store = this.$options.store
      } else { // 往子节点传递
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}
复制代码
```

### 访问state的实现

我们平时使用的过程是是这样的

```
const store = new Vuex.Store({
    state:{
        
    }
})
复制代码
```

所以我们发现，我们实际上是`new`了一个VueX 的 Store 类。接下来我们开始写这个类。

```
let Vue
class Store{
    constructor(options) {
        this.state = options.state
        this.mutations = {}
        this.actions = {}
        this.getters = {}
        this.actions = {}
    }
}
// 下面是install 方法
复制代码
```

再其他组件中使用

```
// VuexUse.vue
<template>
  <div>
    VueX中的属性{{$store.state.age}}
    <button @click="change2">=100</button>
  </div>
</template>
<script>
  export default {
    name: 'VuexUse',
    mounted() {
      console.log(this.$store)
    },
    methods: {
      change2() {
        this.$store.state.age = 100
        console.log(this.$store)
      }
    }
  }
</script>
复制代码
```

大家会看到 输出10.当点击按钮的时候。再次打印，会发现数据已经发生变化，但是视图并没有刷新。**我们应该让数据更新之后，视图也跟着刷新。这时候我们就应该想到用`Vue`的特性**。我们改造一下刚才的代码

```
let Vue
class Store{
    constructor(options) {
        this.state = new Vue({ data: { state: options.state } }).state
        this.mutations = options.mutations || {}
        this.actions = options.actions || {}
        this.getters = {}
    }
}
// 下面是install 方法
复制代码
```

这样我们就实现了数据改变，就刷新视图

### commit 和dispatch

在`VueX`，中，更改状态一般需要这两个方法，一个是同步，一个是异步，我们来实现一下这两个方法

```
// 使用的时候
change() {
    this.$store.commit('xxx', 10)
},
复制代码
```

所以，这两个方法是写在`Store类里面的`

```
let Vue
class Store{
    constructor(options) {
        this.state = new Vue({ data: { state: options.state } }).state
        this.mutations = options.mutations || {}
        this.actions = options.actions || {}
        this.getters = {}
    }
    commit = (mutationName, payload)=>{
     this.mutations[mutationName](this.state, payload)
  	}	
    dispatch = (actionName, payload)=>{
    	this.actions[actionName](this, payload)
  	}
}
复制代码
```

`commit`，我觉得大家都可以看懂，就是找到用户定义的`mutations`,把参数传入，就可以执行了。

`dispatch`，为什么要传入`this`？ **原因**，在定义的时候，使用的是`ES6`的解构赋值，所以这里要把`this`传入

**注意，这两种方法还可以使用 `柯里化`来实现，这样传值的时候只用传入 `payload`，更方便一点**

### getter实现

首先我们要明白，`getter`是作什么用的。我 **个人理解**，需要对访问数据进行一定处理。也就是我们访问这个属性的时候，得到这个函数的返回结果。

```
let Vue
class Store{
    constructor(options) {
        this.state = new Vue({ data: { state: options.state } }).state
        this.mutations = options.mutations || {}
        this.actions = options.actions || {}
       
        // 这下面是修改的部分
        options.getters && this.handleGetters(options.getters)
    }
    
   handleGetters(getters) {
    this.getters = {}
    Object.keys(getters).forEach(key=>{
      Object.defineProperty(this.getters, key, {
        get: ()=>{
          return getters[key](this.state)
        }
      })
    })
  }
}
复制代码
```

解释一下`handleGetters`这一段代码

1. 获取每个函数函数名称
2. 根据每个函数的名称 设置对应的返回值

这段代码相对比较简单，这样就实现了`getters`

## 模块(module)功能的实现

### store/index

```
import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './../vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    age: 10
  },
  strict: true,
  getters: {
    myAge(state) {
      return state.age + 30
    }
  },
  mutations: {
    change(state, payload) {
      state.age += payload
    }
  },
  actions: {
    // 异步更改state
    asyncChange({ commit }, payload) {
      setTimeout(()=>{
        commit('change', payload)
      }, 1000)
    }
  },
  modules: {
    a: {
      namespaced: true,
      state: {
        num: 'a1'
      },
      mutations: {
        // 同步更改state  在严格模式下不可以使用异步
        change(state, payload) {
          console.log(state, payload) // 是自己这个模块内的state
          console.log('a')
        }
      }
    },
    b: {
      state: {
        num: 'b1'
      },
      mutations: {
        // 同步更改state  在严格模式下不可以使用异步
        change(state, payload) {
          console.log('b')
        }
      },
      modules: {
        c: {
          namespaced: true,
          state: {
            num: 'c1'
          },
          mutations: {
            // 同步更改state  在严格模式下不可以使用异步
            change(state, payload) {
              console.log('c')
            }
          }
        }
      }
    }
  }
})
export default store

复制代码
```

接下来这一部分可能会难理解一点。我尽力把我学习到给大家清楚的讲出来。**这部分会对之前的代码进行大量修改**

**先改造一下我们的`Store`,变会最开始的样子**

```
class ModuleCollection {
    
}

let Vue
class Store{
    constructor(options) {
        this.state = options.state
        this.mutations = {}
        this.actions = {}
        this.getters = {}
        this.modules = new ModuleCollection(options)
        console.log('收集完成的模块')
        console.log(this.modules)
    }
}
// 下面是install 方法
复制代码
```

现在，我们需要模块化，所以我们要写一个方法来 **格式化数据**，变成我们想要的样子

**思路**，我们要把这边模块进行遍历 注册，如果模块下面还有子类，则继续遍历。 **核心方法**, `reduce`

### ModuleCollection

```
/**
 * 循环对象的值
 * @param obj
 * @param cb
 */
function forEach(obj, cb) {
  Object.keys(obj).forEach(key=>{
    cb(key, obj[key])
  })
}


class ModuleCollection {
  constructor(options) {
    this.register([], options)
  }
  register(path, rootModule) {
      
    // 格式化模块
    const rawModule = { 
      _raw: rootModule, //原来的modules
      _children: {},  // 孩子
      state: rootModule.state // 原来的数据
    }
    
    // 双向记录 把格式化之后的数据记录下来
    rootModule.rawModule = rawModule 
      
    // 判断是不是根的存在
    if (!this.root) {
      // 第一次肯定不存在
      this.root = rawModule
    } else {
      // 核心  返回的是各个module 对应的格式化后的模块
      const parentModel = path.slice(0, -1).reduce((root, current)=>{
        console.log(current)
        return root._children[current]
      }, this.root)
    /----------------------------------------------------/
      parentModel._children[path[path.length - 1]] = rawModule
    }

    // 递归，遍历子代。核心逻辑
    if (rootModule.modules) {
      forEach(rootModule.modules, (moduleName, module)=>{
        this.register(path.concat(moduleName), module)
      })
    }
  }
}
复制代码
```

主要解释一下 `/-------------/`上下的代码。上面的`parentModel`，指的是模块

1. 第一次 `parentModel`是`this.root`，`rawModule`是`a`模块的定义
2. 第二次 `parentModel`是`this.root`，`rawModule`是`b`模块的定义
3. 第三次 `parentModel`是`b`模块，`rawModule`是`c`模块的定义

打印一下 `this.modules`



![UTOOLS1592985514369.png](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="556"></svg>)



现在我们就把所有的模块进行了 **格式化**。接下来。我们就要对 我们格式化后的数据进行安装。使他们可以访问得到

**总结一下**，这个函数的作用就是把 我们传入的`modules`进行一个格式化，并且将模块进行分类。

### installModule

这个函数的作用 **循环遍历子节点，安装 state action mutation getters**

```
/**
 * 安装 state action mutation getters  并
 * @param store Vuex 中的store
 * @param rootState 根state
 * @param path      路径
 * @param rawModule   原模块
 */
function installModule(store, rootState, path, rawModule) {

  // 安装state
  if (path.length > 0) { // 证明是子节点 
    const parentState = path.slice(0, -1).reduce((root, current)=>{
      return rootState[current] 
    }, rootState)
    
    // 官方API。
    // 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新
    Vue.set(parentState, path[path.length - 1], rawModule.state)
  }

  // rawModule 里面有 
  // _raw 原来的模块 
  // _children 孩子 
  // state 原来的state
    
    
  // 安装getters 
  // 注意状态的使用，要使用本模块的状态
  const getters = rawModule._raw.getters || {}
  if (getters) {
    forEach(getters, (getterName, getterFun)=>{
      Object.defineProperty(store.getters, getterName, {
        get: ()=>getterFun(rawModule.state) 
      })
    })
  }

  // mutations跟actions 差不多。都是把 所有的模块的函数存在 root根模块中  使用的时候直接遍历
  const mutations = rawModule._raw.mutations || {}
  if (mutations) {
    forEach(mutations, (mutationName, mutationFun)=>{
      // 写一个发布订阅模式
      const arr = store.mutations[mutationName] || (store.mutations[mutationName] = [])
      arr.push((payload)=>{
        mutationFun(rawModule.state, payload)
      })
    })
  }

  const actions = rawModule._raw.actions || {}
  if (actions) {
    forEach(actions, (actionName, actionsFun)=>{
      const arr = store.actions[actionName] || (store.actions[actionName] = [])
      arr.push((payload)=>{
        actionsFun(store, payload)
      })
    })
  }

  // 遍历子节点
  forEach(rawModule._children, (moduleName, rawModule)=>{
    // console.log(rawModule) // 一个个子节点
    installModule(store, rootState, path.concat(moduleName), rawModule)
  })
}
复制代码
store` 和 `rootState`始终是。`Vuex`中的`store` 和根上面的`state
```

1. 第一次 `patch`是`[]`，`rawModule`是`根`模块的定义

2. 第二次 `patch`是`['a']`，`rawModule`是`a`模块的定义

3. 第三次

    

   ```
   patch
   ```

   是

   ```
   ['b']
   ```

   ，

   ```
   rawModule
   ```

   是

   ```
   b
   ```

   模块的定义

   1. 走进来发现 `b`下面还有`modules`,所以`patch`是`['b'，‘c’]`，`rawModule`是`c`模块的定义

## 命名空间的实现

命名空间这个就简单了。只需要在每个方法前面加上`x/`就可以了

```
function installModule(store, rootState, path, rawModule) {
  
  // 命名空间的实现  获取命名
  let root = store.modules.root // 拿到的是格式化之后的结果
  const nameSpace = path.reduce((str, current)=>{
    root = root._children[current]
    str = str + (root._raw.namespaced ? current + '/' : '')
    return str
  }, '')

  // 安装state  这里没有发生变化
  if (path.length > 0) {
    // 证明是子节点
    const parentState = path.slice(0, -1).reduce((root, current)=>{
      return rootState[current]
    }, rootState)
    Vue.set(parentState, path[path.length - 1], rawModule.state)
  }

 
  // rawModule 里面有 
  // _raw 原来的模块 
  // _children 孩子 
  // state 原来的state
    
  // 安装getters  把方法前面加上 命名
  const getters = rawModule._raw.getters || {}
  if (getters) {
    forEach(getters, (getterName, getterFun)=>{
      Object.defineProperty(store.getters, nameSpace + getterName, {
        get: ()=>getterFun(rawModule.state) // 使用模块中的状态
      })
    })
  }

  const mutations = rawModule._raw.mutations || {}
  if (mutations) {
    forEach(mutations, (mutationName, mutationFun)=>{
      // 写一个发布订阅模式
      const arr = store.mutations[nameSpace + mutationName] || (store.mutations[nameSpace + mutationName] = [])
      arr.push((payload)=>{
        mutationFun(rawModule.state, payload)
      })
    })
  }

  const actions = rawModule._raw.actions || {}
  if (actions) {
    forEach(actions, (actionName, actionsFun)=>{
      const arr = store.actions[nameSpace + actionName] || (store.actions[nameSpace + actionName] = [])
      arr.push((payload)=>{
        actionsFun(store, payload)
      })
    })
  }

  // 遍历子节点
  forEach(rawModule._children, (moduleName, rawModule)=>{
    // console.log(rawModule) // 一个个子节点
    installModule(store, rootState, path.concat(moduleName), rawModule)
  })
}
复制代码
```

从`''(空)`字符串开始。根节点不需要命名空间

### registerModule API的实现

```
class Store {
  constructor(options) {
    this.state = new Vue({ data: { state: options.state } }).state
    this.mutations = {}
    this.actions = {}
    this.getters = {}
    // 模块收集  并格式化
    this.modules = new ModuleCollection(options)
    console.log('收集完成的模块')
    console.log(this.modules)
    // 模块的安装并访问  store rootState path 根模块  安装全部模块
    installModule(this, this.state, [], this.modules.root)
  }
  // 模块开发完之后的写法
  commit = (mutationName, payload)=>{
    this.mutations[mutationName].forEach(fn=>fn(payload))
  }
  dispatch = (actionName, payload)=>{
    this.actions[actionName].forEach(fn=>fn(payload))
  }
  /**
   * 自定义注册 module
   * @param moduleName
   * @param module
   */
  registerModule(moduleName, module) {
    if (!Array.isArray(moduleName)) {
      moduleName = [moduleName]
    }
    this.modules.register(moduleName, module)
    console.log(this.modules.root)
    // 安装当前模块
    installModule(this, this.state, moduleName, module.rawModule)
  }
}
复制代码
```

思路很简单，就是把 注册的`module`，进行格式化之后。再进行安装就可以

**注意**，要安装位置要确定好哦

## 辅助函数

# VueRouter

跟`Vuex`一样，也写过一篇比较简单的实现 [VueRouter的简单实现](https://juejin.im/post/5e87f4086fb9a03c967f022a),感觉这一篇写的相对简单一点

**这部分我个人觉得自己掌握的不是特别好。所以 讲述的不太清楚。仅提供一个思路。**

## 最开始`install`方法

在我们的平常使用过程中,除了`router-link`和`router-view`。最常用的可能就是`this.$router.push(xx)`。所以我们还是跟`VueX`的做法差不多。在每一个实例上挂在一个属性

```
const install = (Vue)=>{
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        // console.log(this) // 指的是一个new Vue
        this._routerRoot = this // 把vue实例挂载到这个属性上
        this._router = this.$options.router // 用户传入得 router
        // 路由的初始化
        this._router.init(this)
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })
}
export default install
复制代码
```

以上代码只做了两件事。

1. 挂载属性
2. 调用路由的初始化方法。对路由进行初始化

## 主`index`文件

首先我们应该分析。我们这个主文件应该有什么。在我们日常使用的过程中，一般是`import VueRouter from 'vue-router'`

所以

1. 我们应该友一个`VueRoter`类。
2. 上面得有初始化方法`install`.。
3. 在`VueRoter`类的`constructor`中，我们应该对用户传入的数据进行处理。还有就是分析它`路由模式`
4. 写`init`方法，要可以监听到路由变换，然后跳转到对应的 路由。渲染对应的组件

分析完之后。我们就开始着手写

我先把大体框架给大家展示一下

```
import install from './install'
import createMatcher from './createMatcher'
import HashHistory from './history/hash'

class VueRouter {
  constructor(options) {
    // matcher 匹配器 处理树形结构 将他扁平化
    // 返回两个方法 addStore match 匹配对应结果
    this.matcher = createMatcher(options.routes || [])

    // 内部需要用 hash history 进行路由的初始化工作
    // base 表示基类，实现所有路由的公告方法都放在基本类上 保证不同路由API 有相同的使用方法
    this.history = new HashHistory(this)
  }

  push(location) {
    
  }

  init(app) {
    // app 是顶层Vue 实例
    // 获取到路径 并进行跳转 并渲染对应组件
    // 匹配一次完成后，监听路有变化，完成之后的更新操作
    
  }
}

VueRouter.install = install
export default VueRouter

复制代码
```

### createMatcher方法

**里面出现的方法在下面都会有所解释**

```
import createRouteMap from './createRouteMap'
import { createRoute } from './history/base'

export default function createMatcher(routes) {
  // 开始扁平化数据
  const { pathList, pathMap } = createRouteMap(routes)

  // 重载s
  function addRoute(routes) {
    createRouteMap(routes, pathList, pathMap)
  }

  function match(location) {
    console.log('create里面的match' + location)
    // 从pathMap获取的location
    const record = pathMap[location]
    // console.log(record)
    return createRoute(record, {
      path: location
    })
  }
  return {
    addRoute, match
  }
}
复制代码
```

我们先通过`createRouteMap`方法，把传入的`routes(即用户传入的配置)`进行一个格式化处理，得到一个`pathList(地址的列表)`和`pathMap(地址映射，里面有地址，组件等等属性)`

[官方API](https://router.vuejs.org/zh/api/#router-addroutes)中，有一个交`addRotes`,也就是再添加进一组路由。

我们还是利用`createRouteMap`方法。这个方法具体是什么样的看下面

`match`方法的作用是匹配器，匹配传入的`location(地址)`。返回相对应的 记录

### createRouteMap方法

```
export default function createRouteMap(routes, oldPathList, oldPathMap) {
  const pathList = oldPathList || []
  const pathMap = oldPathMap || Object.create(null)
  // Object.create(null) 和 {} 区别  前者没有原型链
  // 数组扁平化
  routes.forEach(route=>{
      addRouteRecord(route, pathList, pathMap)
    }
  )
  return {
    pathList, pathMap
  }
}

function addRouteRecord(route, pathList, pathMap, parent) {
  const path = parent ? parent.path + '/' + route.path : route.path
  const record = {
    path,
    component: route.component,
    parent
    // todo
  }
  if (!pathList[route]) {
    pathList.push(path)
    pathMap[path] = record
  }
  if (route.children) {
    route.children.forEach(route=>{
      addRouteRecord(route, pathList, pathMap, record)
    })
  }
}

复制代码
```

**Object.create(null) 和 {} 区别 前者没有原型链**

**{}** 会存在一堆的属性



![UTOOLS1593155710472.png](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="700" height="500"></svg>)





![UTOOLS1593155769799.png](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="457" height="141"></svg>)

**Object.create(null)**不存在这些



`addRouteRecord` 是这个的核心方法。它的工作是

1. 先差找父级元素。如果有。则加上父级 例如 `about/a`。没有就是本身
2. 然后生成一条记录`record`
3. 判断你传入的`route(即每一项路由)`是否在`pathList`里面。在了就跳过。不在就添加进去。 **这个方法就实现了`addRoutes`**的作用
4. 递归遍历。如果有孩子继续添加

### createRoute方法

**这个方法及其关键！！！！**

原因：比如我们渲染`about/a`这个路径的组件。我们是不是必须得渲染`about`，这样才可以渲染`a`。

所以这个方法的主要作用就是。把路径的父级也都存下来

```
export function createRoute(record, location) {
  const res = [] // 如果匹配到路径 就放进来
  if (record) {
    while (record) {
      res.unshift(record)
      record = record.parent
    }
  } // 把父级路径也存放下来
  console.log(res, location)
  return {
    ...location,
    matched: res
  }
}
复制代码
```

## history方法

这个即解释`this.history = new HashHistory(this)`

为什么要单独列出来？因为有不同的 **路由模式**，但是有公共的处理方法。当然还需要有不同的方法来处理不同的路由。

我们这里只考虑`hash`

### base.js

```
export function createRoute(record, location) {
  const res = [] // 如果匹配到路径 就放进来
  if (record) {
    while (record) {
      res.unshift(record)
      record = record.parent
    }
  } // 把父级路径也存放下来
  console.log(res, location)
  return {
    ...location,
    matched: res
  }
}

class History {
  constructor(router) {
    this.router = router
    this.current = createRoute(null, {
      path: '/'// 默认路径
    })
  }

  transitionTo(location, cb) { // 最好屏蔽一下，以防止多次调用
    console.log(location, cb)
    // 得到路径 开始匹配对应的模板
    const r = this.router.match(location)
    this.current = r // 对当前路径进行更新
    // eslint-disable-next-line eqeqeq
    if (location === this.current.path && r.matched.length === this.current.matched) {
      return
    }
    this.cb && this.cb(r)
    cb && cb()
  }

  setupListeners() {
    window.addEventListener('hashchange', ()=>{
      this.transitionTo(window.location.hash.slice(1))
    })
  }

  listen(cb) {
    this.cb = cb
  }
}

export default History
复制代码
```

可以看出 这个`base.js`做了几件事

1. 初始化了一个默认路由
2. 提供了跳转方法
3. 监听了路由变化
4. `listen`这个等会再说

`transitionTo`中间的`if`判断。是为了防止多次调用的。

```
hash.js
import History from './base'

function ensureSlash() {
  if (window.location.hash) {
    return
  }
  window.location.hash = '/'
}
class HashHistory extends History {
  constructor(router) {
    super(router) // super === parent.call(this)   向父级传递router
    this.router = router
    ensureSlash() // 确保有hash值
  }

  getCurrentLocation() {
    return window.location.hash.slice(1) // 除了# 号后面的路径
  }
}

export default HashHistory
复制代码
```

这个就比较简单了。就不再解释了

## 重新回到index.js

```
import install from './install'
import createMatcher from './createMatcher'
import HashHistory from './history/hash'

class VueRouter {
  constructor(options) {
    // matcher 匹配器 处理树形结构 将他扁平化
    // 返回两个方法 addStore match 匹配对应结果
    this.matcher = createMatcher(options.routes || [])

    // 内部需要用 hash history 进行路由的初始化工作
    // base 表示基类，实现所有路由的公告方法都放在基本类上 保证不同路由API 有相同的使用方法
    this.history = new HashHistory(this)
  }

  match(location) { // 作了一层封装 返回匹配结果
    return this.matcher.match(location)
  }

  push(location) {
    this.history.transitionTo(location, ()=>{
      window.location.hash = location// 这样的话 要渲染两遍 一边transitionTo 一边是hash的监听
    }) // hash没有改变 要改变hash
  }

  init(app) {
    // app 是顶层Vue 实例
    // console.log(app)
    // 获取到路径 并进行跳转 并渲染对应组件
    // 匹配一次完成后，监听路有变化，完成之后的更新操作
    const history = this.history
    const setupHashListener = ()=>{ // 监听之后回调
      history.setupListeners() // 监听路由变化   父类
    }
    history.transitionTo( // 跳转方法         父类
      history.getCurrentLocation(), // 获取当前路径   分路由 所以是子类
      setupHashListener
    )
    // 订阅好 然后路由 属性变化 更新此方法
    history.listen((route)=>{
      app._route = route
    })
  }
}

VueRouter.install = install
export default VueRouter
复制代码
```

改造完之后的`index.js`做的事，

1. 监听路由。
2. 跳转路由。
3. 设置改变`_route`的函数（这时候 `_route`还不是动态的）

## 回到install

```
import RouterView from './components/router-view'
import RouterLink from './components/router-link'

const install = (Vue)=>{
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        // console.log(this) // 指的是一个new Vue
        this._routerRoot = this
        this._router = this.$options.router // 用户传入得 router
        // 路由的初始化
        this._router.init(this)
        // 将current 定义成 响应式的。数据改变则刷新视图
        console.log(this._router)
        // 给当前实例创建了 _route 属性， 取自this._router.history.current
        Vue.util.defineReactive(this, '_route', this._router.history.current)
        // 定义之后 更新_route
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      console.log(this._routerRoot._route)
      return this._routerRoot._route
    }
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router
    }
  })
  Vue.component('RouterView', RouterView)
  Vue.component('RouterLink', RouterLink)
}
export default install
复制代码
```

回到`install`方法，初始化之后。把`_route`设置成动态（有`get`和`set`）。

之后数据发生改变，视图就会刷新。

## 组件

### RouterView

```
export default {
  functional: true, // 函数式组件 没有状态 没有this
  render(h, { parent, data }) { // 里面有很多options 这是通过解构赋值出来的
    // console.log(options)
    const route = parent.$route // 被放到了vue 原型上
    console.log(route)
    let depth = 0
    // $vnode表示占位符Vnode
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
      parent = parent.$parent
    }
    data.routerView = true
    const record = route.matched[depth]
    console.log(record)
    if (!record) {
      return h()
    }
    return h(record.component, data)
  }
}
复制代码
```

这段代码中最难理解的就是 `depth`。

`route`是属性。 这段代码在`history/base.js` 。`createRoute` 返回的结果中有一个`match`。里面存放了所有的 **父级路径**

`routerView`的解释。自定义属性。看他是否是根节点。 第一次进来的时候 ，渲染`App`组件（里面放有`RouterView`）。如果存在，证明要渲染的是下一个节点了

`router`是方法

### RouterLink

```
export default {
  props: {
    to: {
      type: String,
      require: true
    },
    tag: {
      type: String,
      default: 'a'
    }
  },
  methods: {
    handle() {
      this.$router.push(this.to)
    }
  },
  render(h) {
    const tag = this.tag
    return <tag onclick = { this.handle } > { this.$slots.default } < /tag>
  }
}
复制代码
```

我这里用的是`jsx`语法。觉得看不懂的可以直接用`RouterLink.vue`正常写来代替

## 钩子函数(路由守卫)

这个就比较像`express`和`koa`里面的了。

简单写个思路就是这样。这一点我还没加上。思路比较简单，我还没有去具体实现

```
// 储存
let deps = []

// 放置
beforeXxx(cb){
    this.deps.push(cb)
}

// 使用
// 在视图更新或者跳转前
this.deps.forEach(dep=>{
    dep()
})
复制代码
```

## 路由权限

正在努力

# Vue3

## proxy

阮一峰老师这一本书关于这部分已经写的很好了。我就不再多做叙述了。详情点击这里[地址](https://es6.ruanyifeng.com/#docs/proxy)

```
let obj = {
  name: {
    achen: {
      name: '阿琛',
      age: 22,
    },
  },
  sex:'男',
  arr: ['吃', '喝', '玩'],
}

let handler = {
  // target就是原对象，key是键
  get(target, key) {
    // 懒代理 如果取到了这个对象才会触发，没有取到就不会代理
    if (typeof target[key]=== 'object'){
      // 递归调用
      return new Proxy(target[key],handler)
    }
    console.log('收集')
    // return target[key] 老方法
    return Reflect.get(target,key)
  },
  set(target, key, value) {
    console.log('触发更新')
    let oldValue = target[key]
    console.log(oldValue,value,key)
    if (!oldValue){
      console.log('设置属性')
    }else if (oldValue!==value){
      console.log('修改属性')
    }
    // target[key] = value
    // 有返回值
    return Reflect.set(target,key,value)
  },
}

// 兼容性差，但是可以代理13中方法
// defineProperty 他只能对特定属性进行拦截

// 拦截的是整个对象
let proxy = new Proxy(obj,handler)
// proxy.sex = 'nv'
// console.log(proxy.sex)

// 数组
// proxy.arr.push(132)  // 先走一次obj  再收集 push length 在改值
// proxy.arr[0] = 100  // 直接触发
proxy.xxx = 100

复制代码
```

### 关于Reflect

[developer.mozilla.org/zh-CN/docs/…](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)