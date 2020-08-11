# 面试官问你关于node的那些事（基础篇）



![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/172d4ca6487bfe5a)



> 前沿：文章的起源，是树酱的朋友在最近面试中对部分岗位中对`node`掌握程度要求感到很“慌 ”，当然`node`已渐渐从很多公司招聘的“加分项”转变为“强指标”，“慌”的原因无非是因为平时项目无需用到或者说少用node，再加上我们的知识吸收，大多都是碎片化的知识拼接起来，缺少一个完整体系化的梳理，借此机会，重新梳理一下，当然更多的还需要你参与实战，本文是基础篇。

### 1.饭前点心 🥧

> 👨提问：最近Deno很火，会不会替代node的替代品，学node是不是没有前途？

莫慌，Node依旧是社区热捧的服务器端 JavaScript 运行环境，Deno的出现其实本质上是完善现阶段的Node（新轮子）,包括原生支持TS、安全性、支持ES Module浏览器模块、等特征。万变不离其宗，虽然有了Deno，将来可能就不需要 Node.js，但是新事物总是需要不断推演和考验后，所以这一点而言，Node短时间内很难被替换，毕竟背后依附着强大社区的支撑

关于 Deno 更多了解，你可以看

- [Deno 正式发布，彻底弄明白和 node 的区别](https://juejin.im/post/5ebcad19f265da7bb07656c7#heading-10)
- [Deno 运行时入门教程：Node.js 的替代品](http://www.ruanyifeng.com/blog/2020/01/deno-intro.html)

### 2.正餐 🍔

> 通过一些node常见的问题跟你聊聊一些基本知识

#### 2.1 node 如何获取命令行传来的参数

> 答案是：`process.argv`。process是一个全局变量，它提供当前 Node.js 进程的有关信息，而process.argv 属性则返回一个数组，数组中的信息包括启动Node.js进程时的命令行参数

举个场景：我们需要在script定义一个node的命令，然后执行改文件后获取不同的参数



![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/172d4fd57874aaf3)



> 拓展：为什么splice(2)？让我们看看其他参数的数值

- process.argv[0] : 返回启动Node.js进程的可执行文件所在的绝对路径
- process.argv[1] : 为当前执行的JavaScript文件路径
- process.argv.splice(2) : 移除前两者后，剩余的元素为其他命令行参数(也就是我们自定义部分)



![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/172d5055d1b062ed)



> 关于获取命令行传来的参数还可以结合[commander](https://github.com/tj/commander.js)的 `commander.parse(process.argv);`

#### 2.2 node有哪些相关的文件路径？

> 答案是：Node 中的文件路径有 `__dirname`, `__filename`, `process.cwd()`, `./ 或者 ../`下面用一个例子来介绍这几种文件路径的区别

先看看我们当前运行的目录的结构

```
KSDK/
    -src/ 
        -test.js
复制代码
```

在 test.js 里写下如下的code👇

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/172d53aaefb9f7b0)

然后分别在src下运行和KSDK下运行对比下结果如何？



- 在src目录下运行



![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/172d53c928d6f532)



- 在KSDK目录下运行



![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/172d53d591c3bfa3)



对比看到，只有我们后两者产生变化，可以得出如下结论 🚀

- `__dirname`: 总是返回被执行的 js 所在文件夹的绝对路径
- `__filename`: 总是返回被执行的 js 的绝对路径
- `process.cwd()`: 总是返回运行 node 命令时所在的文件夹的绝对路径

#### 2.3 node相关path API 有哪些？

> 答案：path 模块提供了一些实用工具，用于处理文件和目录的路径，常用api有：`path.dirname`、`path.join`、`path.resolve` 其他的看文档 [Path API](http://nodejs.cn/api/path.html)

- `path.dirname()`： 返回 path 的目录名
- `path.join()`：所有给定的 path 片段连接到一起，然后规范化生成的路径
- `path.resolve()`：方法会将路径或路径片段的序列解析为绝对路径，解析为相对于当前目录的绝对路径，相当于cd命令

我们用个简单的demo来区分



![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/172d54d34923f276)



> 我们看到`path.join(__dirname, '../lib/common.js')`和 `path.resolve(__dirname, '../lib/common.js')`返回的结果相同，难道可以相互替换？你在看下面这个例子👇，你或许会清晰些

路径还是上面演示的路径

- join是把各个path片段连接在一起， resolve把`／`当成根目录

```
path.join('/a', '/b') // '/a/b'
path.resolve('/a', '/b') //'/b'
复制代码
```

- join是直接拼接字段，resolve是解析路径并返回

```
path.join("a","b")  // "a/b"
path.resolve("a", "b") // "/Users/tree/Documents/infrastructure/KSDK/src/a/b"
复制代码
```

#### 2.4 node的文件读取怎么做的？

> 答案：通过fs文件系统模块提供的API，也是node中重要的模块之一，fs模块主要用于文件的读写、移动、复制、删除、重命名等操作。

通过一个简单的重命名api`rename`使用，之前在做脚手架中使用到

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/172d573eb51e7ebc)



> ⏰需要注意的是，使用require('fs')载入fs模块，fs模块中所有方法都有同步和异步两种形式,刚刚我们展示的rename是异步方法的调用，因为在繁忙的进程中，应使用异步方法， 同步的版本会阻塞整个进程（停止所有的连接），当然fs.rename对应的同步方法就是`fs.renameSync`

下面我们看一个同步方法的演示，判断文件是否存在



![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/172d57f461ff8901)



> 还有一点要注意的是，无论同步异步尽量对抛出的异常做相应的处理

#### 2.5 node的url模块是用来干嘛的？

> 答案是：用来对url的字符串解析、url组成等功能，主要包括以下几个API。`url.parse()`、`url.format()`

- `url.parse`：可以将一个url的字符串解析并返回一个url的对象
- `url.format`:将传入的url对象编程一个url字符串并返回

以`url.parse`作为例子：



![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/172d5da27c46a7d3)



解析出来结果

```
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'baidu.com:8080',
  port: '8080',
  hostname: 'baidu.com',
  hash: '#node',
  search: '?query=js',
  query: 'query=js',
  pathname: '/test/h',
  path: '/test/h?query=js',
  href: 'http://baidu.com:8080/test/h?query=js#node'
}
复制代码
```

#### 2.6 node的http模块创建服务与Express或Koa框架有何不同?

> 答案是：express是一个服务端框架,框架简单封装了node的http模块,express支持node原生的写法,express不仅封装好服务器，还封装了中间件、路由等特征，方便开发web服务器，换句话说express = http模块 + 中间件 + 路由

先看看`http`模块是如何实现一个简单的服务器



![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/172d595f0e3123f5)



```
运行3000端口` 即可访问到浏览器打印出`hello node.js
```

接下来看看express如何实现



![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/172d5bd5a1df942b)



以上就实现一个简单的服务端逻辑，包含中间件、路由设置

#### 2.7 Express和Koa框架中间件有什么不同？

> 答案：中间件： `app.use`方法就是往中间件队列中塞入新的中间件，express中间件处理方式是线性的，next过后继续寻找下一个中间件，当然如果没有调用next()的话，就不会调用下一个函数了，调用就会被终止

- express 中间件：是通过 next 的机制，即上一个中间件会通过 next 触发下一个中间件
- koa2 中间件：是通过 async await 实现的，中间件执行顺序是“洋葱圈”模型（推荐）



![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/172d5ba955e7ae5f)



我们看下koa2下面这个简单的例子，你可以对比下Express的实现



![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/172d5cb771fd9d6f)

看看输出的日志





![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/172d5be181acd5d9)



#### 2.8 什么是模版引擎？

> 答案是：模板引擎是一个通过结合页面模板、要展示的数据生成HTML页面的工具，本质上是后端渲染（SSR）的需求，加上Node渲染页面本身是纯静态的，当我们需要页面多样化、更灵活，我们就需要使用模板引擎来强化页面，更好的凸显服务端渲染的优势

常见主流模版引擎有：

- art-template [官方文档](http://aui.github.io/art-template/) ：号称效率最高的，模版引擎
- ejs [官方文档](http://ejs.co/)：是一个JavaScript模板库，用来从JSON数据中生成HTML字符串。
- pug [官方文档](https://pugjs.org/api/getting-started.html)：是一款健壮、灵活、功能丰富的模板引擎,专门为 Node.js 平台开发

未完待续...

🌲酱往期文章：

- [聊聊前端开发日常的协作工具](https://juejin.im/post/5ed37b57518825434c3d9677)
- [前端表单数据那些事](https://juejin.im/post/5eaa2cb3f265da7ba0581c84)
- [如何更好管理 Api 接口](https://juejin.im/post/5eba0684e51d454da077bcc1)
- [微前端那些事](https://juejin.im/post/5e83f8ad6fb9a03c5e0ccccc)
- [前端工程化那些事](https://juejin.im/post/5e999cecf265da47cd357a24)
- [前端Nginx那些事](https://juejin.im/post/5e7ad2455188255e2c7256ac)
- [前端运维部署那些事](https://juejin.im/post/5e88904bf265da47f517837c)





# 面试官问你关于node的那些事（进阶篇）

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/172d4ca6487bfe5a-1593531214280)

> ❝
>
> 前沿：续上次面试官问你关于node的那些事基础篇发出，童鞋反馈说“怎么那么基础啊，这也太水了吧” 这里统一做回复，不基础咋叫“基础篇”呢，因为树酱也不是什么大神，渣渣来着，只是通过自己的角度，希望能帮助大家更好地去学习，于是就有了进阶篇的梳理计划，今天树酱继续跟你聊聊关于node后续的那些事，附上 [面试官问你关于node的那些事（普通篇）](https://juejin.im/post/5eeec838e51d4574134ac467)
>
> ❞

#### 1. 今日主食 🍞

#### 1.1 注册路由时 app.get、app.use、app.all 的区别是什么？

> ❝
>
> 上一章基础篇提及到如何使用express搭建一个简单的服务端，基础架子完成搭建好，就需要定义接口路由和中间件，这时候我们就需要在入口文件app.js中定义app.get、app.use及app.all等方法，而这三者之前又有什么区别？我们用例子来说明
>
> ❞

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/17302c8a3dfd2861)

当我们请求`/user`路由时，会依次输出`树酱🌲来了`和`Hello World`，接着浏览器端显示执行完毕，同理访问`/user/tree`则只会输出 `树酱🌲来了`，为啥呢？

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/17302c2a0cdab0f2)

- app.use(path,callback)

> ❝
>
> `app.use`是express用来调用中间件的方法。中间件通常不处理请求和响应，一般只处理输入数据，并将其交给队列中的下一个处理程序，比如下面这个例子`app.use('/user')`，那么只要路径以 `/user` 开始即可匹配，如 `/user/tree` 就可以匹配
>
> ❞

- app.all()

> ❝
>
> app.all 是路由中指代所有的请求方式，用作路由处理，匹配完整路径，在app.use之后 可以理解为包含了app.get、app.post等的定义，比如`app.all('/user/tree')`,能同时覆盖：`get('/user/tree') 、 post('/user/tree')、 put('/user/tree')` ,不过相对于app.use()的前缀匹配，它则是匹配具体的路由
>
> ❞

> ❝
>
> 总结：一句话概括：all完整匹配，use只匹配前缀
>
> ❞

#### 1.2 express response有哪些常用方法?

> ❝
>
> express response对象是对Node.js原生对象ServerResponse的扩展，express response常见的有：`res.end()`、`res.send()`、`res.render()`、`res.redirect()`，而这几个有什么不同呢？更多请看文档 [express Response](http://www.expressjs.com.cn/4x/api.html#res)
>
> ❞

- res.end()

> ❝
>
> 结束response - 如果服务端没有数据回传给客户端则可以直接用res.end返回，以此来结束响应过程
>
> ❞

- res.send(body)

> ❝
>
> 如果服务端有数据可以使用res.send,可以忽略res.end，body参数可以是一个Buffer对象，一个String对象或一个Array
>
> ❞

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/17302e661d23aa61)

- res.render

> ❝
>
> res.render用来渲染模板文件，也可以结合模版引擎来使用，下面看个简单的demo (express+ejs模版引擎)
>
> ❞

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/17302f3eec017e54)

首先是配置说明

```
app.set('views', path.join(__dirname, 'views')); // views：模版文件存放的位置，默认是在项目根目录下
app.set('view engine', 'ejs'); // view engine：使用什么模版引擎
复制代码
```

其次是根据使用的模版引擎语法编写模版，最后通过`res.render(view,locals, callback)`导出，具体使用参数

```
view：模板的路径
locals：渲染模板时传进去的本地变量
callback：如果定义了回调函数，则当渲染工作完成时才被调用，返回渲染好的字符串（正确）或者错误信息 ❌
复制代码
```

关于 res.render结合模版引擎更多用法，推荐阅读： [Express：模板引擎深入研究](https://zhuanlan.zhihu.com/p/67695057)

- res.redirect

> ❝
>
> 重定义到path所指定的URL，同时也可以重定向时定义好HTTP状态码（默认为302）
>
> ❞

```
res.redirect('http://baidu.com');
res.redirect(301, 'http://baidu.com');
复制代码
```

#### 1.3 node如何利用多核CPU以及创建集群?

> ❝
>
> 众所周知，nodejs是基于chrome浏览器的V8引擎构建的，一个nodejs进程只能使用一个CPU(一个CPU运行一个node实例)，举个例子：我们现在有一台8核的服务器，那么如果不利用多核CPU，是很一种浪费资源的行为，这个时候可以通过启动多个进程来利用多核CPU
>
> ❞

Node.js给我们提供了`cluster`模块，用于nodejs多核处理，同时可以通过它来搭建一个用于负载均衡的node服务集群。

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/173031858f1bee58)![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/1730337f2290f421)

通过上述代码我们就创建了一个支持多进程和负载均衡的服务，运行结果如下👇![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/173031912122225f)

> ❝
>
> 啊呆👦同学：那为什么多个进程可以监听同一个端口呢？
>
> ❞

上面运行的Demo中，成功的开启了 1 个 Master 进程及8个 Worker 进程，因为监听的只有3000一个端口，按道理的话，一个端口被多个进程监听是会报端口冲突的，但是这时候却没有报错，奇了怪了？，让我们看下一下端口查看详情👇

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/173031f115a8b0e1)

我去～原来3000端口并不是被所有进程监听，而是仅仅监听 Master 进程（pid为'32101'）, 我们再来看看Master 进程和Worker的关系

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/1730323d4e252301)

Master 通过 cluster.fork() 这个方法创建的，本质上还是使用的 child_process.fork() 这个方法，关于 cluster、child_process、Process等的关系可以看这篇 [Node.js cluster 踩坑小结](https://zhuanlan.zhihu.com/p/27069865)

> ❝
>
> 啊宽👦同学：除了上面的方式实现多进程及负载均衡还有其他方式吗？
>
> ❞

可以使用PM2工具来实现, pm2内部包含了所有上述的处理逻辑，我们可以不用对原来的代码进行修改，只要再启动的时候使用pm2管理即可，运行`pm2 start test.js -i 2`

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/173032d836366082)

- `pm2 start test.js -i 2`

意思是cluster mode 模式启动2个app.js的应用实例，这2个应用程序会自动进行负载均衡，`- i`后面的数字表示要启动的工作线程的数量。如果给定的数字为0，PM2则会根据你CPU核心的数量来生成对应的工作线程

> ❝
>
> 拓展：我们可以通过借助cluster模块来实现多进程分页爬虫，Node多进程架构可以充分利用 cpu 资源，我们在一些耗时的操作上，可以尝试这种方式来解决。
>
> ❞

更多关于pm2 的使用可以看之前树酱写的：[前端运维部署那些事](https://juejin.im/post/5e88904bf265da47f517837c#heading-12)

#### 1.4 node是怎样支持https?

> ❝
>
> https实现，离不开证书，通过openssl生成公钥私钥（不做详细介绍），然后基于 express的 https模块 实现，设置options配置, options有两个选项，一个是证书本体，一个是密码
>
> ❞

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/1730348b42decca8)

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/173034668387178e)

#### 1.5 node和客户端怎么解决跨域的问题？

> ❝
>
> 答案：可以通过在路由设置里面加了header的设置即可
>
> ❞

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/1730393023ba8fc4)

> ❝
>
> 啊乐👧同学：这里使用到app.use('*')是什么意思呀？
>
> ❞

后面添加* 可以实现全匹配, `app.all('*',(req,res,next)=>{})` 效果相当于`app.use((req,res,next)=>{})`, 这也是app.all的一个比较常见的应用，就是用来处理跨域请求

#### 1.6 node应用内存泄漏咋搞？

> ❝
>
> 内存泄漏（Memory Leak）指由于错误造成程序未能释放已经不再使用的内存的情况。如果内存持续占用过高，会影响服务器响应，情况严重直接能让程序奔溃，那么怎么尽量避免这种情况出现，或者出现了怎么排查呢？
>
> ❞

导致内存泄漏有主要以下几点：

- 全局变量没有手动销毁，因为全局变量不会被回收
- 闭包：闭包中的变量被全局对象引用，则闭包中的局部变量不能释放
- 监听事件添加后，没有移除，会导致内存泄漏

这也同时涉及到垃圾回收(GC),nodejs是执行javascript的V8引擎，也就是说nodejs的GC就是说V8引擎的GC，而基于GC的原理，内存泄漏就是应该被回收的内存，换句话说就是本应该被标记为可达到对象却没有被正常回收

> ❝
>
> 啊开👦同学：那么如果一旦出现内存泄漏怎么检测？
>
> ❞

- 通过内存快照，可以使用node-heapdump [官方文档](https://github.com/bnoordhuis/node-heapdump)获得内存快照进行对比，查找内存溢出
- 可视化内存泄漏检查工具 Easy-Monitor [官方文档](https://github.com/hyj1991/easy-monitor#readme)

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/17303b3abe9bbeae)

#### 1.7 两个node程序之间怎样交互?

> ❝
>
> 答案是：通过fork，原理是子程序用process.on来监听父程序的消息，用 process.send给子程序发消息，父程序里用child.on,child.send进行交互，来实现父进程和子进程互相发送消息
>
> ❞

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/17303cba93ce609d)

![img](01-%E9%9D%A2%E8%AF%95%E5%AE%98%E9%97%AE%E4%BD%A0%E5%85%B3%E4%BA%8Enode%E7%9A%84%E9%82%A3%E4%BA%9B%E4%BA%8B.assets/17303d90c2d342ca)

child_process模块

> ❝
>
> 提供了衍生子进程的功能，包括前几节提到的cluster底层实现还是child_process
>
> ❞

该模块主要包括以下几个异步进程函数

- fork：就是上面代码中实现父进程和子进程互相发送消息的方法，通过fork可以在父进程和子进程之间开放一个IPC通道，使得不同的node进程间可以进行消息通信。
- exec: 衍生一个 shell 并在该 shell 中运行命令，当完成时则将stdout 和 stderr 传给回调函数，exec的第一个参数，跟shell命令完全相似，场景用来执行命令较多 关于exec应用场景可以看树酱之前写的：[从0到1开发简单脚手架](https://juejin.im/post/5ea1263d6fb9a03c73799a25#heading-3)
- spawn

未完待续...

🌲酱往期文章：

- [你学BFF和Serverless了吗](https://juejin.im/post/5ee0635de51d4578740f76ae)
- [聊聊前端开发日常的协作工具](https://juejin.im/post/5ed37b57518825434c3d9677)
- [前端表单数据那些事](https://juejin.im/post/5eaa2cb3f265da7ba0581c84)
- [如何更好管理 Api 接口](https://juejin.im/post/5eba0684e51d454da077bcc1)
- [微前端那些事](https://juejin.im/post/5e83f8ad6fb9a03c5e0ccccc)
- [前端工程化那些事](https://juejin.im/post/5e999cecf265da47cd357a24)
- [前端Nginx那些事](https://juejin.im/post/5e7ad2455188255e2c7256ac)
- [前端运维部署那些事](https://juejin.im/post/5e88904bf265da47f517837c)