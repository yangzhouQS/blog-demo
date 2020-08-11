# vue技巧
> ### 学会使用`$attrs` 与 `$listeners`，二次包装组件就靠它了

前几天产品经理给我甩过来一份管理系统的设计原型，我打开看了看，虽然内心是拒绝的，但是为了活着，还是要做的。小编看了看原型，发现系统中的大部分弹框右下角都是确定和取消两个按钮。如果使用element-ui提供的`Dialog`，那么每一个弹框都要手动加按钮，不但代码量增多，而且后面如果按钮UI，需求发生变化，改动量也比较大。



![img](02-Vue%E5%B0%8F%E6%8A%80%E5%B7%A7.assets/1729c9983361f8d6)



如果可以将`Dialog`进行二次封装，将按钮封装到组件内部，就可以不用重复去写了。说干就干。

#### 定义基本弹框代码

```
<template>
  <el-dialog :visible.sync="visibleDialog">
    <!--内容区域的默认插槽-->
    <slot></slot>
    <!--使用弹框的footer插槽添加按钮-->
    <template #footer>
      <!--对外继续暴露footer插槽，有个别弹框按钮需要自定义-->
      <slot name="footer">
        <!--将取消与确定按钮集成到内部-->
        <span>
          <el-button @click="$_handleCancel">取 消</el-button>
          <el-button type="primary" @click="$_handleConfirm">
            确 定
          </el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: {
    // 对外暴露visible属性，用于显示隐藏弹框
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 通过计算属性，对.sync进行转换，外部也可以直接使用visible.sync
    visibleDialog: {
      get() {
        return this.visible;
      },
      set() {
        this.$emit("update:visible");
      }
    }
  },
  methods: {
    // 对外抛出cancel事件
    $_handleCancel() {
      this.$emit("cancel");
    },
    // 对外抛出 confirm事件
    $_handleConfirm() {
      this.$emit("confirm");
    }
  }
};
</script>
复制代码
```

通过上面的代码，我们已经将按钮封装到组件内部了，效果如下图所示：

```
<!--外部使用方式 confirm cancel 是自定义的事件 opened是包装el-dialog的事件，通过$listeners传入到el-dialog里面-->
<custom-dialog :visible.sync="visibleDialog" @opened="$_handleOpened" @confirm="$_handleConfirm" @cancel="$_handleCancel">这是一段内容</custom-dialog>
复制代码
```

效果图

![img](02-Vue%E5%B0%8F%E6%8A%80%E5%B7%A7.assets/1729ca8606fb94de)



但上面的代码存在一个问题，无法将`Dialog`自身的属性和事件暴露到外部（虽然可以通过`props`及`$emit`一个一个添加，但是很麻烦）,这时候就可以使用`$attrs`与`$listeners`

#### 使用`$attrs`与`$listeners`

> `$attrs`: 当组件在调用时传入的属性没有在`props`里面定义时，传入的属性将被绑定到`$attrs`属性内（`class`与`style`除外，他们会挂载到组件最外层元素上）。并可通过`v-bind="$attrs"`传入到内部组件中

> `$listeners`: 当组件被调用时，外部监听的这个组件的所有事件都可以通过`$listeners`获取到。并可通过`v-on="$listeners"`传入到内部组件中。

修改弹框代码

```
<!---使用了v-bind与v-on监听属性与事件-->
<template>
    <el-dialog :visible.sync="visibleDialog" v-bind="$attrs" v-on="$listeners">
    <!--其他代码不变-->
    </el-dialog>
</template>
<script>
  export default {
    //默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings) 
    //将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。
    //通过设置 inheritAttrs 到 false，这些默认行为将会被去掉
    inheritAttrs: false
 }
</script>

<!---外部使用方式-->
<custom-dialog
  :visible.sync="visibleDialog"
  title="测试弹框"
  @opened="$_handleOpened"
>
  这是一段内容
</custom-dialog>
复制代码
```

对于`$attrs`，我们也可以使用`$props`来代替,实现代码如下

```
<template>
  <el-dialog :visible.sync="visibleDialog" v-bind="$props" v-on="$listeners">
    <!--其他代码不变-->
  </el-dialog>
</template>
<script>
import { Dialog } from 'element-ui'
export default {
  props: {
    // 将Dialog的props通过扩展运算符展开到props属性里面
    ...Dialog.props
  }
}
</script>
复制代码
```

但上面的代码存在一定的缺陷，有些组件存在非`props`的属性，比如对于一些封装的表单组件，我们可能需要给组件传入原生属性，但实际原生属性并没有在组件的`props`上面定义，这时候，如果通过上面的方式去包装组件，那么这些原生组件将无法传递到内部组件里面。

感谢@陌上兮月的提醒

> ### 使用`require.context`实现前端工程自动化

`require.context`是一个`webpack`提供的Api,通过执行`require.context`函数获取一个特定的上下文,主要是用于实现自动化导入模块。

什么时候用？ 当一个js里面需要手动引入过多的其他文件夹里面的文件时，就可以使用。

在Vue项目开发过程中，我们可能会遇到这些可能会用到`require.context`的场景

1. 当我们路由页面比较多的时候，可能会将路由文件拆分成多个，然后再通过`import`引入到`index.js`路由主入口文件中
2. 当使用svg symbol时候，需要将所有的svg图片导入到系统中（建议使用svg-sprite-loader）
3. 开发了一系列基础组件，然后把所有组件都导入到`index.js`中，然后再放入一个数组中，通过遍历数组将所有组件进行安装。

对于上述的几个场景，如果我们需要导入的文件比较少的情况下，通过`import`一个一个去导入还可以接受，但对于量比较大的情况，就变成了纯体力活，而且每次修改增加都需要在主入口文件内进行调整。这时候我们就可以通过`require.context`去简化这个过程。

现在以上述第三条为例,来说明`require.context`的用法

#### 常规用法



![img](02-Vue%E5%B0%8F%E6%8A%80%E5%B7%A7.assets/172a8f846a8e5b05)

组件通过常规方式安装





![组件通过常规方式安装](02-Vue%E5%B0%8F%E6%8A%80%E5%B7%A7.assets/172a8dbf913be740)



#### `require.context`基本语法



![img](02-Vue%E5%B0%8F%E6%8A%80%E5%B7%A7.assets/172a900bd9c4737a)



#### 通过`require.context`安装`Vue`组件



![img](02-Vue%E5%B0%8F%E6%8A%80%E5%B7%A7.assets/172a907e5f763528)



> ### 自定义`v-model`,原来这么简单

在用Vue开发前端时，不论使用原生还是封装好的UI库，对于表单组件，一般都会使用到`v-model`。虽然`v-model`是一个语法糖，但是吃到嘴里挺甜的啊。学会自定义`v-model`，还是很有必要的。

#### 基本用法

一个组件上的`v-model`默认是通过在组件上面定义一个名为`value`的props,同时对外暴露一个名为`input`的事件。

源码：

![img](02-Vue%E5%B0%8F%E6%8A%80%E5%B7%A7.assets/172a1c3637bed854)

使用方式：





![img](02-Vue%E5%B0%8F%E6%8A%80%E5%B7%A7.assets/172a1c469f10e131)



#### 自定义属性与事件

通常情况下，使用`value`属性与`input`事件没有问题，但是有时候有些组件会将`value`属性或`input`事件用于不同的目的，比如对于单选框、复选框等类型的表单组件的`value`属性就有其他用处，参考（[developer.mozilla.org/en-US/docs/…](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value)）。或者希望属性名称或事件名称与实际行为更贴切，比如`active`,`checked`等属性名。



![img](02-Vue%E5%B0%8F%E6%8A%80%E5%B7%A7.assets/172a1d912a292ee2)



> ### 使用`.sync`,更优雅的实现数据双向绑定

在`Vue`中，`props`属性是单向数据传输的,父级的prop的更新会向下流动到子组件中，但是反过来不行。可是有些情况，我们需要对prop进行“双向绑定”。上文中，我们提到了使用`v-model`实现双向绑定。但有时候我们希望一个组件可以实现多个数据的“双向绑定”，而`v-model`一个组件只能有一个(Vue3.0可以有多个)，这时候就需要使用到`.sync`。

#### `.sync`与`v-model`的异同

相同点：

- 两者的本质都是语法糖，目的都是实现组件与外部数据的双向绑定
- 两个都是通过属性+事件来实现的

不同点(个人观点，如有不对，麻烦下方评论指出，谢谢)：

- 一个组件只能定义一个`v-model`,但可以定义多个`.sync`
- `v-model`与`.sync`对于的事件名称不同，`v-model`默认事件为`input`,可以通过配置`model`来修改，`.sync`事件名称固定为`update:属性名`

#### 自定义`.sync`

在开发业务时，有时候需要使用一个遮罩层来阻止用户的行为（更多会使用遮罩层+loading动画），下面通过自定义`.sync`来实现一个遮罩层



![img](02-Vue%E5%B0%8F%E6%8A%80%E5%B7%A7.assets/172a70e9a027bdc8)



```
<!--调用方式-->
<template>
  <custom-overlay :visible.sync="visible" />
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  }
}
</script>
复制代码
```

> ### 动态组件，让页面渲染更灵活

前两天产品经理来了新的需求了，告诉我，需要根据用户的权限不同，页面上要显示不同的内容，然后我就哼哧哼哧的将不同权限对应的组件写了出来，然后再通过`v-if`来判断要显示哪个组件，就有了下面的代码



![img](02-Vue%E5%B0%8F%E6%8A%80%E5%B7%A7.assets/172a9129b675bca4)



但是看到上面代码的那一长串`v-if`,`v-else-if`,我感觉我的代码洁癖症要犯了，不行，这样`code review`过不了关，我连自己这一关都过不了，这时候就改动态组件发挥作用了。

```
<template>
  <div class="info">
    <component :is="roleComponent" v-if="roleComponent" />
  </div>
</template>
<script>
import AdminInfo from './admin-info'
import BookkeeperInfo from './bookkeeper-info'
import HrInfo from './hr-info'
import UserInfo from './user-info'
export default {
  components: {
    AdminInfo,
    BookkeeperInfo,
    HrInfo,
    UserInfo
  },
  data() {
    return {
      roleComponents: {
        admin: AdminInfo,
        bookkeeper: BookkeeperInfo,
        hr: HrInfo,
        user: UserInfo
      },
      role: 'user',
      roleComponent: undefined
    }
  },
  created() {
    const { role, roleComponents } = this
    this.roleComponent = roleComponents[role]
  }
}
</script>
复制代码
```

> ### `mixins`，更高效的实现组件内容的复用

`mixins`是`Vue`提供的一种混合机制，用来更高效的实现组件内容的复用。怎么去理解混入呢，我觉得和`Object.assign`，但实际与`Object.assign`又有所不同。

#### 基本示例

在开发echarts图表组件时，需要在窗口尺寸发生变化时，重置图表的大小，此时如果在每个组件里面都去实现一段监听代码，代码重复太多了，此时就可以使用混入来解决这个问题

```
// 混入代码 resize-mixins.js
import { debounce } from 'lodash'
const resizeChartMethod = '$__resizeChartMethod'

export default {
  data() {
    // 在组件内部将图表init的引用映射到chart属性上
    return {
      chart: null
    }
  },
  created() {
    window.addEventListener('resize', this[resizeChartMethod])
  },
  beforeDestroy() {
    window.removeEventListener('reisze', this[resizeChartMethod])
  },
  methods: {
    // 通过lodash的防抖函数来控制resize的频率
    [resizeChartMethod]: debounce(function() {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
  }
}

复制代码
<!--图表组件代码-->
<template>
  <div class="chart"></div>
</template>
<script>
import echartMixins from './echarts-mixins'
export default {
  // mixins属性用于导入混入，是一个数组，数组可以传入多个混入对象
  mixins: [echartMixins],
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el)
  }
}
</script>
复制代码
```

#### 不同位置的混入规则

在`Vue`中，一个混入对象可以包含任意组件选项，但是对于不同的组件选项，会有不同的合并策略。

1. `data` 对于`data`,在混入时会进行递归合并，如果两个属性发生冲突，则以组件自身为主，如上例中的`chart`属性
2. 生命周期钩子函数

对于生命周期钩子函数，混入时会将同名钩子函数加入到一个数组中，然后在调用时依次执行。混入对象里面的钩子函数会优先于组件的钩子函数执行。如果一个组件混入了多个对象，对于混入对象里面的同名钩子函数，将按照数组顺序依次执行，如下代码:

```
const mixin1 = {
  created() {
    console.log('我是第一个输出的')
  }
}

const mixin2 = {
  created() {
    console.log('我是第二个输出的')
  }
}
export default {
  mixins: [mixin1, mixin2],
  created() {
    console.log('我是第三个输出的')
  }
}
复制代码
```

1. 其他选项 对于值为对象的选项，如`methods`,`components`,`filter`,`directives`,`props`等等，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

#### 全局混入

混入也可以进行全局注册。一旦使用全局混入，那么混入的选项将在所有的组件内生效，如下代码所示：

```
Vue.mixin({
  methods: {
    /**
     * 将埋点方法通过全局混入添加到每个组件内部
     * 
     * 建议将埋点方法绑定到Vue的原型链上面，如： Vue.prototype.$track = () => {}
     * */
    track(message) {
      console.log(message)
    }
  }
})

复制代码
```

**请谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项，**









# 这是最新的一波Vue实战技巧，不用则已，一用惊人

> 葡萄美酒夜光杯，欲饮琵琶产品催。 客户现场君莫笑，古来埋坑几人回？

最近一直在开发后台管理系统，日复一日的重复着表单表格表格表单，标准的CV仔，感觉好无聊，如何能在这种无聊的开发过程中去提升自己，小编今天又整理了一波新的`Vue`实战技巧，这些技巧，不用则已，一用惊人。同时你也可以点击下面的链接阅读近期小编的文章。

[实战技巧，Vue原来还可以这样写](https://juejin.im/post/5eef7799f265da02cd3b82fe) 获赞 1700+

[绝对干货~！学会这些Vue小技巧，可以早点下班和女神约会了](https://juejin.im/post/5eddbaee5188254344768fdc) 获赞 970+

[看到赚到！重读vue2.0风格指南，我整理了这些关键规则](https://juejin.im/post/5edafece51882542e3023545) 获赞 120+

## 插槽，我要钻到你的怀里

插槽，相信每一位`Vue`都有使用过，但是如何更好的去理解插槽，如何去自定义插槽，今天小编为你带来更形象的说明。

### 默认插槽

大学毕业刚上班，穷鬼一个，想着每个月租房还要掏房租，所以小编决定买一个一居室，东拼西凑借了一堆债，终于凑够了首付，买了一个小小的毛坯房。我们可以把这个一居室的毛坯房想想成一个组件，这个房子的户型，面积，楼层都是固定的，但是室内如何装修，摆什么家具，这个却是由你来决定的，房间内部就可以理解为插槽，允许用户去自定义内容。

#### 1. 开发商终于将一居室开发完交房了

```
<template>
  <!--这是一个一居室-->
  <div class="one-bedroom">
    <!--添加一个默认插槽，用户可以在外部随意定义这个一居室的内容-->
    <slot></slot>
  </div>
</template>
复制代码
```

#### 2. 小编要开始装修了

```
<template>
  <!--这里一居室-->
  <one-bedroom>
    <!--将家具放到房间里面，组件内部就是上面提供的默认插槽的空间-->
    <span>先放一个小床，反正没有女朋友</span>
    <span>再放一个电脑桌，在家还要加班写bug</span>
  </one-bedroom>
</template>
<script>
import OneBedroom from '../components/one-bedroom'
export default {
  components: {
    OneBedroom
  }
}
</script>

复制代码
```

### 具名插槽

过了几年，小编有了女朋友，准备结婚了，一居室房间肯定不行啊，丈母娘嫌小不同意，没办法，只能又凑钱买大房子，买了一个两居室（穷逼一个），因为是两居室，所以有了主卧和次卧之分，装修是否也不能把主卧和次卧装修的一模一样，所以就需要进行区分。将房子想想成组件，那么组件就有两个插槽，并且需要起名字进行区分。

#### 1. 开发商终于开发完交房了

```
<template>
  <div class="two-bedroom">
    <!--这是主卧-->
    <div class="master-bedroom">
      <!---主卧使用默认插槽-->
      <slot></slot>
    </div>
    <!--这是次卧-->
    <div class="secondary-bedroom">
      <!--次卧使用具名插槽-->
      <slot name="secondard"></slot>
    </div>
  </div>
</template>

复制代码
```

#### 2. 小编要卖血攒钱装修了

```
<template>
  <two-bedroom>
    <!--主卧使用默认插槽-->
    <div>
      <span>放一个大床，要结婚了，嘿嘿嘿</span>
      <span>放一个衣柜，老婆的衣服太多了</span>
      <span>算了，还是放一个电脑桌吧，还要写bug</span>
    </div>
    <!--次卧，通过v-slot:secondard 可以指定使用哪一个具名插槽， v-slot:secondard 也可以简写为 #secondard-->
    <template v-slot:secondard>
      <div>
        <span>父母要住，放一个硬一点的床，软床对腰不好</span>
        <span>放一个衣柜</span>
      </div>
    </template>
  </two-bedroom>
</template>
<script>
import TwoBedroom from '../components/slot/two-bedroom'
export default {
  components: {
    TwoBedroom
  }
}
</script>

复制代码
```

### 作用域插槽

装修的时候，装修师傅问我洗衣机是要放到卫生间还是阳台，一般情况下开发商会预留放洗衣机的位置。而这个位置可以理解为插槽传的参数，这个就是作用域插槽。

#### 1. 看一下卫生间插槽传了什么参数

```
<template>
  <div class="two-bedroom">
    <!--其他内容省略-->
    <div class="toilet">
      <!--通过v-bind 可以向外传递参数, 告诉外面卫生间可以放洗衣机-->
      <slot name="toilet" v-bind="{ washer: true }"></slot>
    </div>
  </div>
</template>

复制代码
```

#### 2. 把洗衣机放到卫生间

```
<template>
  <two-bedroom>
    <!--其他省略-->
    <!--卫生间插槽，通过v-slot="scope"可以获取组件内部通过v-bind传的值-->
    <template v-slot:toilet="scope">
      <!--判断是否可以放洗衣机-->
      <span v-if="scope.washer">这里放洗衣机</span>
    </template>
  </two-bedroom>
</template>
复制代码
```

### 插槽默认值

小编的同事不想等期房，所以就买了二手房，二手房前业主都装修好了，可以直接入住。当然也可以重新装修，下面是同事买的二手房。

#### 1. 这是装修好的二手房

```
<template>
  <div class="second-hand-house">
    <div class="master-bedroom">
      <!--插槽可以指定默认值，如果外部调用组件时没有修改插槽内容，则使用默认插槽-->
      <slot>
        <span>这里有一张水床，玩的够嗨</span>
        <span>还有一个衣柜，有点旧了</span>
      </slot>
    </div>
    <!--这是次卧-->
    <div class="secondary-bedroom">
      <!--次卧使用具名插槽-->
      <slot name="secondard">
        <span>这里有一张婴儿床</span>
      </slot>
    </div>
  </div>
</template>

复制代码
```

#### 2. 同事决定先把主卧装修了，以后结婚用

```
<second-hand-house>
    <!--主卧使用默认插槽，只装修主卧-->
    <div>
      <span>放一个大床，要结婚了，嘿嘿嘿</span>
      <span>放一个衣柜，老婆的衣服太多了</span>
      <span>算了，还是放一个电脑桌吧，还要写bug</span>
    </div>
  </second-hand-house>
复制代码
```

## 了解选项合并策略,自定义生命周期钩子函数

当你使用`Vue`的`mixins`的时候，是否有发现，如果混入的`methods`里面的方法与组件的方法同名，则会被组件方法覆盖，但是生命周期函数如果重名，混入的与组件自身的都会被执行，且执行顺序是先混入和自身，这是怎么做到的呢？

### 1. 了解`Vue`合并策略

在`Vue`中，不同的选项有不同的合并策略，比如 `data`,`props`,`methods`是同名属性覆盖合并，其他直接合并，而生命周期钩子函数则是将同名的函数放到一个数组中，在调用的时候依次调用，具体可参考小编前面的一篇文章[绝对干货~！学会这些Vue小技巧，可以早点下班和女神约会了](https://juejin.im/post/5eddbaee5188254344768fdc#heading-14)

在`Vue`中，提供了一个`api`, `Vue.config.optionMergeStrategies`,可以通过这个api去自定义选项的合并策略。

在代码中打印

```
console.log(Vue.config.optionMergeStrategies)
复制代码
```

![控制台打印内容](02-Vue%E5%B0%8F%E6%8A%80%E5%B7%A7.assets/0.jpg)控制台打印内容

通过上图可以看到`Vue`所有选项的合并策略函数，我们可以通过覆盖上面的方法，来自定义合并策略函数，不过一般用不到。

### 2. 通过合并策略自定义生命周期函数

#### 背景

最近客户给领导反馈，我们的系统用一段时间，浏览器就变得有点卡，不知道为什么。问题出来了，本来想甩锅到后端，但是浏览器问题，没法甩锅啊，那就排查吧。

后来发现页面有许多定时器，`ajax`轮询还有动画，打开一个浏览器页签没法问题，打开多了，浏览器就变得卡了,这时候我就想如果能在用户切换页签时候将这些都停掉，不久解决了。百度里面上下检索，找到了一个事件`visibilitychange`,可以用来判断浏览器页签是否显示。

有方法了，就写呗

```
export default {
  created() {
    window.addEventListener('visibilitychange', this.$_hanldeVisiblityChange)
    // 此处用了hookEvent，可以参考小编前一篇文章
    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener(
        'visibilitychange',
        this.$_hanldeVisiblityChange
      )
    })
  },
  methods: {
    $_hanldeVisiblityChange() {
      if (document.visibilityState === 'hidden') {
        // 停掉那一堆东西
      }
      if (document.visibilityState === 'visible') {
        // 开启那一堆东西
      }
    }
  }
}
复制代码
```

通过上面的代码，可以看到在每一个需要监听处理的文件都要写一堆事件监听，判断页面是否显示的代码，一处两处还可以，文件多了就头疼了，这时候小编突发奇想，定义一个页面显示隐藏的生命周期钩子,把这些判断都封装起来，哪里需要点哪里，so easy（点读机记得广告费）。

#### 自定义生命周期钩子函数

定义生命周期函数 `pageHidden` 与 `pageVisible`

```
import Vue from 'vue'

// 通知所有组件页面状态发生了变化
const notifyVisibilityChange = (lifeCycleName, vm) => {
  // 生命周期函数会存在$options中，通过$options[lifeCycleName]获取生命周期
  const lifeCycles = vm.$options[lifeCycleName]
  // 因为使用了created的合并策略，所以是一个数组
  if (lifeCycles && lifeCycles.length) {
    // 遍历 lifeCycleName对应的生命周期函数列表，依次执行
    lifeCycles.forEach(lifecycle => {
      lifecycle.call(vm)
    })
  }
  // 遍历所有的子组件，然后依次递归执行
  if (vm.$children && vm.$children.length) {
    vm.$children.forEach(child => {
      notifyVisibilityChange(lifeCycleName, child)
    })
  }
}

/**
 * 添加生命周期钩子函数
 * @param {*} rootVm vue 根实例，在页面显示隐藏时候，通过root向下通知
 */
export function init() {
  const optionMergeStrategies = Vue.config.optionMergeStrategies
  /*
    定义了两个生命周期函数 pageVisible, pageHidden
    为什么要赋值为 optionMergeStrategies.created呢
    这个相当于指定 pageVisible, pageHidden 的合并策略与 created的相同（其他生命周期函数都一样）
   */
  optionMergeStrategies.pageVisible = optionMergeStrategies.beforeCreate
  optionMergeStrategies.pageHidden = optionMergeStrategies.created
}

/**
 * 将事件变化绑定到根节点上面
 * @param {*} rootVm
 */
export function bind(rootVm) {
  window.addEventListener('visibilitychange', () => {
    // 判断调用哪个生命周期函数
    let lifeCycleName = undefined
    if (document.visibilityState === 'hidden') {
      lifeCycleName = 'pageHidden'
    } else if (document.visibilityState === 'visible') {
      lifeCycleName = 'pageVisible'
    }
    if (lifeCycleName) {
      // 通过所有组件生命周期发生变化了
      notifyVisibilityChange(lifeCycleName, rootVm)
    }
  })
}

复制代码
```

#### 应用

1. 在`main.js`主入口文件引入

```
import { init, bind } from './utils/custom-life-cycle'

// 初始化生命周期函数, 必须在Vue实例化之前确定合并策略
init()

const vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 将rootVm 绑定到生命周期函数监听里面
bind(vm)

复制代码
```

1. 在需要的地方监听生命周期函数

```
export default {
  pageVisible() {
    console.log('页面显示出来了')
  },
  pageHidden() {
    console.log('页面隐藏了')
  }
}
复制代码
```

## `provide`与`inject`，不止父子传值，祖宗传值也可以

`Vue`相关的面试经常会被面试官问道，`Vue`父子之间传值的方式有哪些，通常我们会回答，`props`传值，`$emit`事件传值，`vuex`传值，还有`eventbus`传值等等，今天再加一种`provide`与`inject`传值，离`offer`又近了一步。（对了，下一节还有一种）

使用过`React`的同学都知道，在`React`中有一个上下文`Context`，组件可以通过`Context`向任意后代传值，而`Vue`的`provide`与`inject`的作用于`Context`的作用基本一样

### 先举一个例子

使用过`elemment-ui`的同学一定对下面的代码感到熟悉

```
<template>
  <el-form :model="formData" size="small">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="formData.name" />
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input-number v-model="formData.age" />
    </el-form-item>
    <el-button>提交</el-button>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        age: 0
      }
    }
  }
}
</script>

复制代码
```

看了上面的代码，貌似没啥特殊的，天天写啊。在`el-form`上面我们指定了一个属性`size="small"`，然后有没有发现表单里面的所有表单元素以及按钮的 `size`都变成了`small`,这个是怎么做到的？接下来我们自己手写一个表单模拟一下

### 自己手写一个表单

我们现在模仿`element-ui`的表单，自己自定义一个，文件目录如下

![img](02-Vue%E5%B0%8F%E6%8A%80%E5%B7%A7.assets/0.jpg)

#### 自定义表单`custom-form.vue`

```
<template>
  <form class="custom-form">
    <slot></slot>
  </form>
</template>
<script>
export default {
  props: {
    // 控制表单元素的大小
    size: {
      type: String,
      default: 'default',
      // size 只能是下面的四个值
      validator(value) {
        return ['default', 'large', 'small', 'mini'].includes(value)
      }
    },
    // 控制表单元素的禁用状态
    disabled: {
      type: Boolean,
      default: false
    }
  },
  // 通过provide将当前表单实例传递到所有后代组件中
  provide() {
    return {
      customForm: this
    }
  }
}
</script>

复制代码
```

在上面代码中，我们通过`provide`将当前组件的实例传递到后代组件中，`provide`是一个函数，函数返回的是一个对象

#### 自定义表单项`custom-form-item.vue`

没有什么特殊的，只是加了一个`label`,`element-ui`更复杂一些

```
<template>
  <div class="custom-form-item">
    <label class="custom-form-item__label">{{ label }}</label>
    <div class="custom-form-item__content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

复制代码
```

#### 自定义输入框 `custom-input.vue`

```
<template>
  <div
    class="custom-input"
    :class="[
      `custom-input--${getSize}`,
      getDisabled && `custom-input--disabled`
    ]"
  >
    <input class="custom-input__input" :value="value" @input="$_handleChange" />
  </div>
</template>
<script>
/* eslint-disable vue/require-default-prop */
export default {
  props: {
    // 这里用了自定义v-model
    value: {
      type: String,
      default: ''
    },
    size: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  // 通过inject 将form组件注入的实例添加进来
  inject: ['customForm'],
  computed: {
    // 通过计算组件获取组件的size, 如果当前组件传入，则使用当前组件的，否则是否form组件的
    getSize() {
      return this.size || this.customForm.size
    },
    // 组件是否禁用
    getDisabled() {
      const { disabled } = this
      if (disabled !== undefined) {
        return disabled
      }
      return this.customForm.disabled
    }
  },
  methods: {
    // 自定义v-model
    $_handleChange(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

复制代码
```

在`form`中，我们通过`provide`返回了一个对象，在`input`中，我们可以通过`inject`获取`form`中返回对象中的项，如上代码`inject:['customForm']`所示，然后就可以在组件内通过`this.customForm`调用`form`实例上面的属性与方法了

**在上面代码中我们使用了自定义`v-model`,关于自定义`v-model`可以阅读小编前面的文章[绝对干货~！学会这些Vue小技巧，可以早点下班和女神约会了](https://juejin.im/post/5eddbaee5188254344768fdc) **

#### 在项目中使用

```
<template>
  <custom-form size="small">
    <custom-form-item label="姓名">
      <custom-input v-model="formData.name" />
    </custom-form-item>
  </custom-form>
</template>
<script>
import CustomForm from '../components/custom-form'
import CustomFormItem from '../components/custom-form-item'
import CustomInput from '../components/custom-input'
export default {
  components: {
    CustomForm,
    CustomFormItem,
    CustomInput
  },
  data() {
    return {
      formData: {
        name: '',
        age: 0
      }
    }
  }
}
</script>

复制代码
```

执行上面代码，运行结果为：

```
<form class="custom-form">
  <div class="custom-form-item">
    <label class="custom-form-item__label">姓名</label>
    <div class="custom-form-item__content">
      <!--size=small已经添加到指定的位置了-->
      <div class="custom-input custom-input--small">
        <input class="custom-input__input">
      </div>
    </div>
  </div>
</form>
复制代码
```

通过上面的代码可以看到，`input`组件已经设置组件样式为`custom-input--small`了

### `inject`格式说明

除了上面代码中所使用的`inject:['customForm']`写法之外，`inject`还可以是一个对象。且可以指定默认值

修改上例，如果`custom-input`外部没有`custom-form`,则不会注入`customForm`,此时为`customForm`指定默认值

```
{
  inject: {
    customForm: {
      // 对于非原始值，和props一样，需要提供一个工厂方法
      default: () => ({
        size: 'default'
      })
    }
  }
}
复制代码
```

如果我们希望`inject`进来的属性的名字不叫`customForm`,而是叫`parentForm`，如下代码

```
inject: {
    // 注入的属性名称
    parentForm: {
      // 通过 from 指定从哪个属性注入
      from: 'customForm',
      default: () => ({
        size: 'default'
      })
    }
  },
  computed: {
    // 通过计算组件获取组件的size, 如果当前组件传入，则使用当前组件的，否则是否form组件的
    getSize() {
      return this.size || this.parentForm.size
    }
  }
复制代码
```

### 使用限制

1. `provide`和`inject`的绑定不是可响应式的。但是，如果你传入的是一个可监听的对象，如上面的`customForm: this`,那么其对象的属性还是可响应的。
2. `Vue`官网建议`provide` 和 `inject` 主要在开发高阶插件/组件库时使用。不推荐用于普通应用程序代码中。因为`provide`和`inject`在代码中是不可追溯的(ctrl + f可以搜)，建议可以使用`Vuex`代替。 但是，也不是说不能用，在局部功能有时候用了作用还是比较大的。

## dispatch 和 broadcast ,这是一种有历史的组件通信方式

`$dispatch`与`$broadcast`是一种有历史的组件通信方式，为什么是有历史的，因为他们是`Vue1.0`提供的一种方式，在`Vue2.0`中废弃了。但是废弃了不代表我们不能自己手动实现，像许多UI库内部都有实现。本文以`element-ui`实现为基础进行介绍。同时看完本节，你会对组件的`$parent`,`$children`,`$options`有所了解。

### 方法介绍

`$dispatch`: `$dispatch`会向上触发一个事件，同时传递要触发的祖先组件的名称与参数，当事件向上传递到对应的组件上时会触发组件上的事件侦听器，同时传播会停止。

`$broadcast`: `$broadcast`会向所有的后代组件传播一个事件，同时传递要触发的后代组件的名称与参数，当事件传递到对应的后代组件时，会触发组件上的事件侦听器，同时传播会停止（因为向下传递是树形的，所以只会停止其中一个叶子分支的传递）。

### `$dispatch`实现与应用

#### 1. 代码实现

```
/**
 * 向上传播事件
 * @param {*} eventName 事件名称
 * @param {*} componentName 接收事件的组件名称
 * @param {...any} params 传递的参数,可以有多个
 */
function dispatch(eventName, componentName, ...params) {
  // 如果没有$parent, 则取$root
  let parent = this.$parent || this.$root
  while (parent) {
    // 组件的name存储在组件的$options.componentName 上面
    const name = parent.$options.name
    // 如果接收事件的组件是当前组件
    if (name === componentName) {
      // 通过当前组件上面的$emit触发事件,同事传递事件名称与参数
      parent.$emit.apply(parent, [eventName, ...params])
      break
    } else {
      // 否则继续向上判断
      parent = parent.$parent
    }
  }
}

// 导出一个对象，然后在需要用到的地方通过混入添加
export default {
  methods: {
    $dispatch: dispatch
  }
}

复制代码
```

#### 2. 代码应用

在子组件中通过`$dispatch`向上触发事件

```
import emitter from '../mixins/emitter'
export default {
  name: 'Chart',
  // 通过混入将$dispatch加入进来
  mixins: [emitter],
   mounted() {
     // 在组件渲染完之后，将组件通过$dispatch将自己注册到Board组件上
    this.$dispatch('register', 'Board', this)
  }
}
复制代码
```

在`Board`组件上通过`$on`监听要注册的事件

```
export default {
  name: 'Board',
  created() {
    this.$on('register',(component) => {
      // 处理注册逻辑
    })
  }
}
复制代码
```

### `$broadcast`实现与应用

#### 1. 代码实现

```
/**
 * 向下传播事件
 * @param {*} eventName 事件名称
 * @param {*} componentName 要触发组件的名称
 * @param  {...any} params 传递的参数
 */
function broadcast(eventName, componentName, ...params) {
  this.$children.forEach(child => {
    const name = child.$options.name
    if (name === componentName) {
      child.$emit.apply(child, [eventName, ...params])
    } else {
      broadcast.apply(child, [eventName, componentName, ...params])
    }
  })
}

// 导出一个对象，然后在需要用到的地方通过混入添加
export default {
  methods: {
    $broadcast: broadcast
  }
}

复制代码
```

#### 2. 代码应用

在父组件中通过`$broadcast`向下触发事件

```
import emitter from '../mixins/emitter'
export default {
  name: 'Board',
  // 通过混入将$dispatch加入进来
  mixins: [emitter],
  methods:{
  	//在需要的时候，刷新组件
  	$_refreshChildren(params) {
  		this.$broadcast('refresh', 'Chart', params)
  	}
  }
}
复制代码
```

在后代组件中通过`$on`监听刷新事件

```
export default {
  name: 'Chart',
  created() {
    this.$on('refresh',(params) => {
      // 刷新事件
    })
  }
}
复制代码
```

### 总结

通过上面的例子，同学们应该都能对`$dispatch`和`$broadcast`有所了解，但是为什么`Vue2.0`要放弃这两个方法呢？官方给出的解释是：”因为基于组件树结构的事件流方式实在是让人难以理解，并且在组件结构扩展的过程中会变得越来越脆弱。这种事件方式确实不太好，我们也不希望在以后让开发者们太痛苦。并且 `$dispatch` 和 `$broadcast` 也没有解决兄弟组件间的通信问题。“

确实如官网所说，这种事件流的方式确实不容易让人理解，而且后期维护成本比较高。但是在小编看来，不管黑猫白猫，能抓老鼠的都是好猫，在许多特定的业务场景中，因为业务的复杂性，很有可能使用到这样的通信方式。但是使用归使用，但是不能滥用，小编一直就在项目中有使用。

## 结语

> ❝
>
> 不要吹灭你的灵感和你的想象力; 不要成为你的模型的奴隶。 ——文森特・梵高