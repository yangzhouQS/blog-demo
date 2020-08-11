# 核心原理分析

> Koa作为下一代Web开发框架，不仅让我们体验到了async/await语法带来同步方式书写异步代码的酸爽，而且本身简洁的特点，更加利于开发者结合业务本身进行扩展。

本文从以下几个方面分析其核心原理：

- 封装创建应用程序函数
- 扩展res和req
- 中间件原理
- 异常处理

## 一、封装创建应用程序函数

利用NodeJS可以很容易地编写一个简单的应用程序：

```js
const http = require('http')

const server = http.createServer((req, res) => {
  // 每一次请求处理的方法
  console.log(req.url)
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello NodeJS')
})

server.listen(8080)
```

> 注意：当浏览器发送请求时，会附带请求/favicon.ico，导致每一次请求触发两次。

而Koa在封装创建应用程序的方法中主要执行了以下流程：

- 组织中间件（监听请求之前）
- 生成context上下文对象
- 执行中间件
- 执行默认响应方法或者异常处理方法

```js
// application.js
listen(...args) {
  const server = http.createServer(this.callback());
  return server.listen(...args);
}

callback() {
  // 组织中间件 koa-compose
  const fn = compose(this.middleware);

  // 未监听异常处理，则采用默认的异常处理方法
  if (!this.listenerCount('error')) this.on('error', this.onerror);

  const handleRequest = (req, res) => {
    // 生成context上下文对象
    const ctx = this.createContext(req, res);
    return this.handleRequest(ctx, fn);
  };

  return handleRequest;
}

handleRequest(ctx, fnMiddleware) {
  const res = ctx.res;
  // 默认状态码为404
  res.statusCode = 404;
  // 中间件执行完毕之后 采用默认的 错误 与 成功 的处理方法
  const onerror = err => ctx.onerror(err);
  const handleResponse = () => respond(ctx);
  onFinished(res, onerror);
  return fnMiddleware(ctx).then(handleResponse).catch(onerror);
}
```

## 二、扩展res和req

首先我们要知道NodeJS中的res和req是http.IncomingMessage和http.ServerResponse的实例，那么就可以在NodeJS中这样扩展req和res:

```js
Object.defineProperties(http.IncomingMessage.prototype, {
  query: {
    get () {
      return querystring.parse(url.parse(this.url).query)
    }
  }
})

Object.defineProperties(http.ServerResponse.prototype, {
  json: {
    value: function (obj) {
      if (typeof obj === 'object') {
        obj = JSON.stringify(obj)
      }
      this.end(obj)
    }
  }
})
```

而Koa中则是自定义request和response对象，然后保持对res和req的引用，最后通过getter和setter方法实现扩展。

```js
// application.js
createContext(req, res) {
  const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req; // 保存原生req对象
    context.res = request.res = response.res = res; // 保存原生res对象
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    // 构建完成的context上下文对象
    return context;
}
```

所以在Koa中要区别这两组对象:

- request、response: Koa扩展的对象
- res、req: NodeJS原生对象

```js
// request.js
get header() {
  return this.req.headers;
},
set header(val) {
  this.req.headers = val;
},
```

此时已经可以采用这样的方式访问header属性：

```js
ctx.request.header
```

但是为了方便开发者调用这些属性和方法，Koa将response和request中的属性和方法代理到context上。

通过Object.defineProperty可以轻松的实现属性的代理：

```js
function access (proto, target, name) {
  Object.defineProperty(proto, name, {
    get () {
      return target[name]
    },
    set (value) {
      target[name] = value
    }
  })
}

access(context, request, 'header')
```

而对于方法的代理，则需要注意this的指向：

```js
function method (proto, target, name) {
  proto[name] = function () {
    return target[name].apply(target, arguments)
  }
}
```

上述就是属性代理和方法代理的核心代码，这基本算是框架常用套路之一。

代理这部分详细的源码，可以查看[node-delegates](https://link.zhihu.com/?target=https%3A//github.com/tj/node-delegates/blob/master/index.js), 不过这个包时间久远，有一些老方法已经废除。

在上述过程的源码中涉及到很多JavaScript的基础知识，例如：原型继承、this的指向。对于基础薄弱的同学，还需要先弄懂这些基础知识。

## 三、中间件原理

首先需要明确是：中间件并不是NodeJS中的概念，它只是connect、express和koa框架衍生的概念。

## 1、connect中间件的设计

在connect中，开发者可以通过use方法注册中间件：

```js
function use(route, fn) {
  var handle = fn;
  var path = route;

  // 不传入route则默认为'/'，这种基本是框架处理多参数的常用套路
  if (typeof route !== 'string') {
    handle = route;
    path = '/';
  }

  ...
  // 存储中间件
  this.stack.push({ route: path, handle: handle });

  // 以便链式调用
  return this;
}
```

use方法内部获取到中间件的路由信息（默认为'/'）和中间件的处理函数之后，构建成layer对象，然后将其存储在一个队列当中，也就是上述代码中的stack。

connect中间件的执行流程主要由handle与call函数决定：

```js
function handle(req, res, out) {
  var index = 0;
  var stack = this.stack;
  ...
  function next(err) {
    ...
    // 依次取出中间件
    var layer = stack[index++]

    // 终止条件
    if (!layer) {
      defer(done, err);
      return;
    }

    var path = parseUrl(req).pathname || '/';
    var route = layer.route;

    // 路由匹配规则
    if (path.toLowerCase().substr(0, route.length) !== route.toLowerCase()) {
      return next(err);
    }
    ...
    call(layer.handle, route, err, req, res, next);
  }

  next();
}
```

handle函数中使用闭包函数next来检测layer是否与当前路由相匹配，匹配则执行该layer上的中间件函数，否则继续检查下一个layer。

这里需要注意next中检查路由的方式可能与想象中的不太一样，默认路由下，中间件会在每一次请求中都执行。

```js
function call(handle, route, err, req, res, next) {
  var arity = handle.length; // 参数的数量
  var error = err;
  var hasError = Boolean(err);

  try {
    if (hasError && arity === 4) {
      // 错误处理中间件
      handle(err, req, res, next);
      return;
    } else if (!hasError && arity < 4) {
      // 请求处理中间件
      handle(req, res, next);
      return;
    }
  } catch (e) {
    // 记录错误
    error = e;
  }

  // 将错误传递下去
  next(error);
}
```

在通过call方法执行中间件时，采用try/catch捕获错误。这里有一个特别需要注意的地方是，call内部会根据是否存在错误以及中间件函数的参数个数决定是否执行错误处理中间件。并且一旦捕获到错误，next方法会将错误传递下去，所以接下来普通的请求处理中间件即使通过了next中的路由匹配，仍然会被call方法给过滤掉。

下面是layer的处理流程图:



![img](02-%E7%8E%A9%E8%BD%ACKoa.assets/v2-e73ee0bee47c7ad5be42fbf2194b1d74_720w.jpg)



上述就是connect中间件设计的核心要点，总结起来有如下几点：

- 通过use方法注册中间件；
- 中间件的顺序执行是通过手动调用next方法的递归调用，在next中会进行路由匹配，从而过滤掉部分中间件；
- 当中间件的执行过程中发生异常，next会携带异常跳过非错误处理中间件的执行，
- 在请求处理的周期中，需要手动调用res.end()来结束响应；

## 2、Koa中间件的设计

Koa中间件与connect中间件的差异在于：

- Koa中间件的执行并不需要匹配路由，所以注册的中间件每一次请求都会执行。（当然还是需要手动调用next）；
- Koa中通过继承event，暴露error事件让开发者自定义异常处理，并不需要错误处理中间件。
- Koa中res.end由中间件执行完成之后自动调用，这样避免在connect忘记调用res.end导致用户得不到任何反馈。
- Koa中采用了async/await语法让开发者利用同步的方式编写异步代码。

当然，Koa中也是采用use方法注册中间件，相比较connect省去路由匹配的处理，就显得很简洁：

```js
use(fn) {
  this.middleware.push(fn);
  return this;
}
```

并且use支持链式调用。

Koa中间件的执行流程主要通过koa-compose完成：

```js
function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        // 利用Promise包装中间件
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1))); 
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

本质上connect与koa实现中间件的思想都是递归，不难看出koa相比较connect实现得更加简洁，主要原因在于：

- connect中提供路由匹配的功能，而Koa中则是相当于connect中默认的'/'路径；
- connect在捕获中间件的异常时，通过next携带error一个个中间件验证，直到错误处理中间件，而Koa中则是用Promise包装中间件，一旦中间件发生异常，那么会直接触发reject状态，直接在Promise的catch中处理就行。

上述就是connect中间件与Koa中间件的实现原理，现在在再看Koa中间件的这张执行流程图，应该没有什么疑问了吧？!

![img](02-%E7%8E%A9%E8%BD%ACKoa.assets/v2-b353e7e458d7542b366c1139b01b1a07_b.webp)

四、异常处理

对于同步代码，通过try/catch可以轻松的捕获异常。

但是对于异步代码，try/catch则无法捕获，这时候需要构造Promise，在最后的catch方法中捕获异常，Koa就是这样处理，并且在catch方法中发送error事件，以便开发者自定义异常处理逻辑。

```js
this.app.emit('error', err, this);
```

async/await语法不仅带来同步方式书写异步代码的酸爽，另外也让异常处理变得更加自然，在Koa中也可以通过这样的中间件处理错误：

```js
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err
  }
})
```

## 五、总结

相信看到这里，再结合之前自己遇到的那些似懂非懂的问题，应该会有新的理解，再次使用Koa时也会更加得心应手，这也是分析Koa实现原理的重要目的之一。







#  koa-router原理解析

## 一、前言

Koa为了保持自身的简洁，并没有捆绑中间件。但是在实际的开发中，我们需要和形形色色的中间件打交道，本文将要分析的是经常用到的路由中间件 -- koa-router。

如果你对Koa的原理还不了解的话，可以先查看[Koa原理解析](https://zhuanlan.zhihu.com/p/53609310)。

## 二、koa-router概述

koa-router的源码只有两个文件：router.js和layer.js，分别对应Router对象和Layer对象。

Layer对象是对单个路由的管理，其中包含的信息有路由路径(path)、路由请求方法(method)和路由执行函数(middleware)，并且提供路由的验证以及params参数解析的方法。

相比较Layer对象，Router对象则是对所有注册路由的统一处理，并且它的API是面向开发者的。

接下来从以下几个方面全面解析koa-router的实现原理：

- Layer对象的实现
- 路由注册
- 路由匹配
- 路由执行流程

## 三、Layer

Layer对象主要是对单个路由的管理，是整个koa-router中最小的处理单元，后续模块的处理都离不开Layer中的方法，这正是首先介绍Layer的重要原因。

```js
function Layer(path, methods, middleware, opts) {
  this.opts = opts || {};
  // 支持路由别名
  this.name = this.opts.name || null;
  this.methods = [];
  this.paramNames = [];
  // 将路由执行函数保存在stack中，支持输入多个处理函数
  this.stack = Array.isArray(middleware) ? middleware : [middleware];

  methods.forEach(function(method) {
    var l = this.methods.push(method.toUpperCase());
    // HEAD请求头部信息与GET一致，这里就一起处理了。
    if (this.methods[l-1] === 'GET') {
      this.methods.unshift('HEAD');
    }
  }, this);

  // 确保类型正确
  this.stack.forEach(function(fn) {
    var type = (typeof fn);
    if (type !== 'function') {
      throw new Error(
        methods.toString() + " `" + (this.opts.name || path) +"`: `middleware` "
        + "must be a function, not `" + type + "`"
      );
    }
  }, this);

  this.path = path;
  // 1、根据路由路径生成路由正则表达式
  // 2、将params参数信息保存在paramNames数组中
  this.regexp = pathToRegExp(path, this.paramNames, this.opts);
};
```

Layer构造函数主要用来初始化路由路径、路由请求方法数组、路由处理函数数组、路由正则表达式以及params参数信息数组，其中主要采用[path-to-regexp](https://link.zhihu.com/?target=https%3A//github.com/pillarjs/path-to-regexp)方法根据路径字符串生成正则表达式，通过该正则表达式，可以实现路由的匹配以及params参数的捕获：

```js
// 验证路由
Layer.prototype.match = function (path) {
  return this.regexp.test(path);
}

// 捕获params参数
Layer.prototype.captures = function (path) {
  // 后续会提到 对于路由级别中间件 无需捕获params
  if (this.opts.ignoreCaptures) return [];
  return path.match(this.regexp).slice(1);
}
```

根据paramNames中的参数信息以及captrues方法，可以获取到当前路由params参数的键值对：

```js
Layer.prototype.params = function (path, captures, existingParams) {
  var params = existingParams || {};
  for (var len = captures.length, i=0; i<len; i++) {
    if (this.paramNames[i]) {
      var c = captures[i];
      params[this.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c;
    }
  }
  return params;
};
```

需要注意上述代码中的safeDecodeURIComponent方法，为了避免服务器收到不可预知的请求，对于任何用户输入的作为URI部分的内容都需要采用encodeURIComponent进行转义，否则当用户输入的内容中含有'&'、'='、'?'等字符时，会出现预料之外的情况。而当我们获取URL上的参数时，则需要通过decodeURIComponent进行解码，而decodeURIComponent只能解码由encodeURIComponent方法或者类似方法编码，如果编码方法不符合要求，decodeURIComponent则会抛出URIError，所以作者在这里对该方法进行了安全化的处理：

```js
function safeDecodeURIComponent(text) {
  try {
    return decodeURIComponent(text);
  } catch (e) {
    // 编码方式不符合要求，返回原字符串
    return text;
  }
}
```

Layer还提供了对于单个param前置处理的方法：

```js
Layer.prototype.param = function (param, fn) {
  var stack = this.stack;
  var params = this.paramNames;
  var middleware = function (ctx, next) {
    return fn.call(this, ctx.params[param], ctx, next);
  };
  middleware.param = param;
  var names = params.map(function (p) {
    return p.name;
  });
  var x = names.indexOf(param);
  if (x > -1) {
    stack.some(function (fn, i) {
      if (!fn.param || names.indexOf(fn.param) > x) {
        // 将单个param前置处理函数插入正确的位置
        stack.splice(i, 0, middleware);
        return true; // 跳出循环
      }
    });
  }

  return this;
};
```

上述代码中通过some方法寻找单个param处理函数的原因在于以下两点：

- 保持param处理函数位于其他路由处理函数的前面；
- 路由中存在多个param参数，需要保持param处理函数的前后顺序。

```js
Layer.prototype.setPrefix = function (prefix) {
  if (this.path) {
    this.path = prefix + this.path; // 拼接新的路由路径
    this.paramNames = [];
    // 根据新的路由路径字符串生成正则表达式
    this.regexp = pathToRegExp(this.path, this.paramNames, this.opts);
  }
  return this;
};
```

Layer中的setPrefix方法用于设置路由路径的前缀，这在嵌套路由的实现中尤其重要。

最后，Layer还提供了根据路由生成url的方法，主要采用[path-to-regexp](https://link.zhihu.com/?target=https%3A//github.com/pillarjs/path-to-regexp)的compile和parse对路由路径中的param进行替换，而在拼接query的环节，正如前面所说需要对键值对进行繁琐的encodeURIComponent操作，作者采用了[urijs](https://link.zhihu.com/?target=https%3A//github.com/medialize/URI.js)提供的简洁api进行处理。

## 四、路由注册

## 1、Router构造函数

首先看了解一下Router构造函数：

```js
function Router(opts) {
  if (!(this instanceof Router)) {
    // 限制必须采用new关键字
    return new Router(opts);
  }

  this.opts = opts || {};
  // 服务器支持的请求方法， 后续allowedMethods方法会用到
  this.methods = this.opts.methods || [
    'HEAD',
    'OPTIONS',
    'GET',
    'PUT',
    'PATCH',
    'POST',
    'DELETE'
  ];

  this.params = {}; // 保存param前置处理函数
  this.stack = []; // 存储layer
};
```

在构造函数中初始化的params和stack属性最为重要，前者用来保存param前置处理函数，后者用来保存实例化的Layer对象。并且这两个属性与接下来要讲的路由注册息息相关。

koa-router中提供两种方式注册路由：

- 具体的HTTP动词注册方式，例如：router.get('/users', ctx => {})
- 支持所有的HTTP动词注册方式，例如：router.all('/users', ctx => {})

## 2、http METHODS

源码中采用[methods](https://link.zhihu.com/?target=https%3A//github.com/jshttp/methods/blob/master/index.js)模块获取HTTP请求方法名，该模块内部实现主要依赖于http模块：

```js
http.METHODS && http.METHODS.map(function lowerCaseMethod (method) {
  return method.toLowerCase()
})
```

## 3、router.verb() and router.all()

这两种注册路由的方式的内部实现基本类似，下面以router.verb()的源码为例：

```js
methods.forEach(function (method) {
  Router.prototype[method] = function (name, path, middleware) {
    var middleware;

    // 1、处理是否传入name参数
    // 2、middleware参数支持middleware1, middleware2...的形式
    if (typeof path === 'string' || path instanceof RegExp) {
      middleware = Array.prototype.slice.call(arguments, 2);
    } else {
      middleware = Array.prototype.slice.call(arguments, 1);
      path = name;
      name = null;
    }

    // 路由注册的核心处理逻辑
    this.register(path, [method], middleware, {
      name: name
    });

    return this;
  };
});
```

该方法第一部分是对传入参数的处理，对于middleware参数的处理会让大家联想到ES6中的rest参数，但是rest参数与arguments其中一个致命的区别：

```text
rest参数只包含那些没有对应形参的实参，而arguments则包含传给函数的所有实参。
```

如果采用rest参数的方式，上述函数则必须要求开发者传入name参数。但是也可以将name和path参数整合成对象，再结合rest参数：

```js
Router.prototype[method] = function (options, ...middleware) {
  let { name, path } = options
  if (typeof options === 'string' || options instanceof RegExp) {
    path = options
    name = null
  }
  // ...
  return this;
};
```

采用ES6的新特性，代码变得简洁多了。

第二部分是register方法，传入的method参数的形式就是router.verb()与router.all()的最大区别，在router.verb()中传入的method是单个方法，后者则是以数组的形式传入HTTP所有的请求方法，所以对于这两种注册方法的实现，本质上是没有区别的。

## 4、register

```js
Router.prototype.register = function (path, methods, middleware, opts) {
  opts = opts || {};

  var router = this;
  var stack = this.stack;

  // 注册路由中间件时，允许path为数组
  if (Array.isArray(path)) {
    path.forEach(function (p) {
      router.register.call(router, p, methods, middleware, opts);
    });
    return this;
  }

  // 实例化Layer
  var route = new Layer(path, methods, middleware, {
    end: opts.end === false ? opts.end : true,
    name: opts.name,
    sensitive: opts.sensitive || this.opts.sensitive || false,
    strict: opts.strict || this.opts.strict || false,
    prefix: opts.prefix || this.opts.prefix || "",
    ignoreCaptures: opts.ignoreCaptures
  });

  // 设置前缀
  if (this.opts.prefix) {
    route.setPrefix(this.opts.prefix);
  }

  // 设置param前置处理函数
  Object.keys(this.params).forEach(function (param) {
    route.param(param, this.params[param]);
  }, this);

  stack.push(route);

  return route;
};
```

register方法主要负责实例化Layer对象、更新路由前缀和前置param处理函数，这些操作在Layer中已经提及过，相信大家应该轻车熟路了。

## 5、use

熟悉Koa的同学都知道use是用来注册中间件的方法，相比较Koa中的全局中间件，koa-router的中间件则是路由级别的。

```js
Router.prototype.use = function () {
  var router = this;
  var middleware = Array.prototype.slice.call(arguments);
  var path;

  // 支持多路径在于中间件可能作用于多条路由路径
  if (Array.isArray(middleware[0]) && typeof middleware[0][0] === 'string') {
    middleware[0].forEach(function (p) {
      router.use.apply(router, [p].concat(middleware.slice(1)));
    });

    return this;
  }
  // 处理路由路径参数
  var hasPath = typeof middleware[0] === 'string';
  if (hasPath) {
    path = middleware.shift();
  }

  middleware.forEach(function (m) {
    // 嵌套路由
    if (m.router) {
      // 嵌套路由扁平化处理
      m.router.stack.forEach(function (nestedLayer) {
        // 更新嵌套之后的路由路径
        if (path) nestedLayer.setPrefix(path);
        // 更新挂载到父路由上的路由路径
        if (router.opts.prefix) nestedLayer.setPrefix(router.opts.prefix);

        router.stack.push(nestedLayer);
      }); 

      // 不要忘记将父路由上的param前置处理操作 更新到新路由上。
      if (router.params) {
        Object.keys(router.params).forEach(function (key) {
          m.router.param(key, router.params[key]);
        });
      }
    } else {
      // 路由级别中间件 创建一个没有method的Layer实例
      router.register(path || '(.*)', [], m, { end: false, ignoreCaptures: !hasPath });
    }
  });

  return this;
};
```

koa-router中间件注册方法主要完成两项功能：

- 将路由嵌套结构扁平化，其中涉及到路由路径的更新和param前置处理函数的插入；
- 路由级别中间件通过注册一个没有method的Layer实例进行管理。

## 五、路由匹配

```js
Router.prototype.match = function (path, method) {
  var layers = this.stack;
  var layer;
  var matched = {
    path: [],
    pathAndMethod: [],
    route: false
  };

  for (var len = layers.length, i = 0; i < len; i++) {
    layer = layers[i];
    if (layer.match(path)) {
      // 路由路径满足要求
      matched.path.push(layer);

      if (layer.methods.length === 0 || ~layer.methods.indexOf(method)) {
        // layer.methods.length === 0 该layer为路由级别中间件
        // ~layer.methods.indexOf(method) 路由请求方法也被匹配
        matched.pathAndMethod.push(layer);
        // 仅当路由路径和路由请求方法都被满足才算是路由被匹配
        if (layer.methods.length) matched.route = true;
      }
    }
  }
  return matched;
};
```

match方法主要通过layer.match方法以及methods属性对layer进行筛选，返回的matched对象包含以下几个部分：

- path: 保存所有路由路径被匹配的layer；
- pathAndMethod: 在路由路径被匹配的前提下，保存路由级别中间件和路由请求方法被匹配的layer；
- route: 仅当存在路由路径和路由请求方法都被匹配的layer，才能算是本次路由被匹配上。

另外，在ES7之前，对于判断数组是否包含一个元素，都需要通过indexOf方法来实现， 而该方法返回元素的下标，这样就不得不通过与-1的比较得到布尔值：

```js
if (layer.methods.indexOf(method) > -1) {
    ...
  }
```

而作者巧妙地利用位运算省去了“讨厌的-1”，当然在ES7中可以愉快地使用includes方法：

```js
if (layer.methods.includes(method)) {
    ...
  }
```

## 六、路由执行流程

理解koa-router中路由的概念以及路由注册的方式，接下来就是如何作为一个中间件在koa中执行。

koa中注册koa-router中间件的方式如下：

```js
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  // ctx.router available
});

app
  .use(router.routes())
  .use(router.allowedMethods());
```

从代码中可以看出koa-router提供了两个中间件方法：routes和allowedMethods。

## 1、allowedMethods()

```js
Router.prototype.allowedMethods = function (options) {
  options = options || {};
  var implemented = this.methods;

  return function allowedMethods(ctx, next) {
    return next().then(function() {
      var allowed = {};

      if (!ctx.status || ctx.status === 404) {
        ctx.matched.forEach(function (route) {
          route.methods.forEach(function (method) {
            allowed[method] = method;
          });
        });

        var allowedArr = Object.keys(allowed);

        if (!~implemented.indexOf(ctx.method)) {
          // 服务器不支持该方法的情况
          if (options.throw) {
            var notImplementedThrowable;
            if (typeof options.notImplemented === 'function') {
              notImplementedThrowable = options.notImplemented();
            } else {
              notImplementedThrowable = new HttpError.NotImplemented();
            }
            throw notImplementedThrowable;
          } else {
            // 响应 501 Not Implemented
            ctx.status = 501;
            ctx.set('Allow', allowedArr.join(', '));
          }
        } else if (allowedArr.length) {
          if (ctx.method === 'OPTIONS') {
            // 获取服务器对该路由路径支持的方法集合
            ctx.status = 200;
            ctx.body = '';
            ctx.set('Allow', allowedArr.join(', '));
          } else if (!allowed[ctx.method]) {
            if (options.throw) {
              var notAllowedThrowable;
              if (typeof options.methodNotAllowed === 'function') {
                notAllowedThrowable = options.methodNotAllowed();
              } else {
                notAllowedThrowable = new HttpError.MethodNotAllowed();
              }
              throw notAllowedThrowable;
            } else {
              // 响应 405 Method Not Allowed
              ctx.status = 405;
              ctx.set('Allow', allowedArr.join(', '));
            }
          }
        }
      }
    });
  };
};
```

allowedMethods()中间件主要用于处理options请求，响应405和501状态。上述代码中的ctx.matched中保存的正是前面matched对象中的path（在routes方法中设置，后面会提到。），在matched对象中的path数组不为空的前提条件下：

- 服务器不支持当前请求方法，返回501状态码；
- 当前请求方法为OPTIONS，返回200状态码；
- path中的layer不支持该方法，返回405状态；
- 对于上述三种情况，服务器都会设置Allow响应头，返回该路由路径上支持的请求方法。

## 2、routes()

```js
Router.prototype.routes = Router.prototype.middleware = function () {
  var router = this;
  // 返回中间件处理函数
  var dispatch = function dispatch(ctx, next) {
    var path = router.opts.routerPath || ctx.routerPath || ctx.path;
    var matched = router.match(path, ctx.method);
    var layerChain, layer, i;

    // 【1】为后续的allowedMethods中间件准备
    if (ctx.matched) {
      ctx.matched.push.apply(ctx.matched, matched.path);
    } else {
      ctx.matched = matched.path;
    }

    ctx.router = router;

    // 未匹配路由 直接跳过
    if (!matched.route) return next();

    var matchedLayers = matched.pathAndMethod
    var mostSpecificLayer = matchedLayers[matchedLayers.length - 1]
    ctx._matchedRoute = mostSpecificLayer.path;
    if (mostSpecificLayer.name) {
      ctx._matchedRouteName = mostSpecificLayer.name;
    }
    layerChain = matchedLayers.reduce(function(memo, layer) {
      // 【3】路由的前置处理中间件 主要负责将params、路由别名以及捕获数组属性挂载在ctx上下文对象中。
      memo.push(function(ctx, next) {
        ctx.captures = layer.captures(path, ctx.captures);
        ctx.params = layer.params(path, ctx.captures, ctx.params);
        ctx.routerName = layer.name;
        return next();
      });
      return memo.concat(layer.stack);
    }, []);
    // 【4】利用koa中间件组织的方式，形成一个‘小洋葱’模型
    return compose(layerChain)(ctx, next);
  };

  // 【2】router属性用来use方法中区别路由级别中间件
  dispatch.router = this;
  return dispatch;
};
```

routes()中间件主要实现了四大功能。

- 将matched对象的path属性挂载在ctx.matched上，提供给后续的allowedMethods中间件使用。（见代码中的【1】）
- 将返回的dispatch函数设置router属性，以便在前面提到的Router.prototype.use方法中区别路由级别中间件和嵌套路由。（见代码中的【2】）
- 插入一个新的路由前置处理中间件，将layer解析出来的params对象、路由别名以及捕获数组挂载在ctx上下文中，这种操作同理Koa在处理请求之前先构建context对象。（见代码中的【3】）
- 而对于路由匹配到众多layer，koa-router通过koa-compose进行处理，这和[koa对于中间件处理的方式](https://link.zhihu.com/?target=https%3A//juejin.im/post/5c1631eff265da615f772b59)一样的，所以koa-router完全就是一个小型洋葱模型。

## 七、总结

koa-router虽然是koa的一个中间件，但是其内部也包含众多的中间件，这些中间件通过Layer对象根据路由路径的不同进行划分，使得它们不再像koa的中间件那样每次请求都执行，而是针对每次请求采用match方法匹配出相应的中间件，再利用koa-compose形成一个中间件执行链。

以上便是koa-router实现原理的全部内容，希望可以帮助你更好的理解koa-router。

# koa-bodyparser原理解析

## 一、前置知识

在理解koa-bodyparser原理之前，首先需要了解部分HTTP相关的知识。

## 1、报文主体

HTTP报文主要分为请求报文和响应报文，koa-bodyparser主要针对请求报文的处理。

请求报文主要由以下三个部分组成：

- 报文头部
- 空行
- 报文主体

而koa-bodyparser中的body指的就是请求报文中的报文主体部分。

## 2、服务器端获取报文主体流程

HTTP底层采用TCP提供可靠的字节流服务，简单而言就是报文主体部分会被转化为二进制数据在网络中传输，所以服务器端首先需要拿到二进制流数据。

谈到网络传输，当然会涉及到传输速度的优化，而其中一种优化方式就是对内容进行压缩编码，常用的压缩编码方式有：

- gzip
- compress
- deflate
- identity（不执行压缩或不会变化的默认编码格式）

服务器端会根据报文头部信息中的Content-Encoding确认采用何种解压编码。

接下来就需要将二进制数据转换为相应的字符，而字符也有不同的字符编码方式，例如对于中文字符处理差异巨大的UTF-8和GBK，UTF-8编码汉字通常需要三个字节，而GBK只需要两个字节。所以还需要在请求报文的头部信息中设置Content-Type使用的字符编码信息（默认情况下采用的是UTF-8），这样服务器端就可以利用相应的字符规则进行解码，得到正确的字符串。

拿到字符串之后，服务器端又要问了：客户端，你这一段字符串是啥意思啊？

根据不同的应用场景，客户端会对字符串采用不同的编码方式，常见的编码方式有：

- URL编码方式: a=1&b=2
- JSON编码方式: {a:1,b:2}

客户端会将采用的字符串编码方式设置在请求报文头部信息的Content-Type属性中，这样服务器端根据相应的字符串编码规则进行解码，就能够明白客户端所传递的信息了。

下面一步步分析koa-bodyparser是如何处理这一系列操作，从而得到报文主体内容。

## 二、获取二进制数据流

NodeJS中获取请求报文主体二进制数据流主要通过监听request对象的data事件完成：

```js
// 示例一
const http = require('http')

http.createServer((req, res) => {
  const body = []

  req.on('data', chunk => {
    body.push(chunk)
  })

  req.on('end', () => {
    const chunks = Buffer.concat(body) // 接收到的二进制数据流

    // 利用res.end进行响应处理
    res.end(chunks.toString())
  })
}).listen(1234)
```

而koa-bodyparser主要是对[co-body](https://link.zhihu.com/?target=https%3A//github.com/cojs/co-body)的封装，而【co-body】中主要是采用[raw-body](https://link.zhihu.com/?target=https%3A//github.com/stream-utils/raw-body)模块获取请求报文主体的二进制数据流，【row-body】主要是对上述示例代码的封装和健壮性处理。

## 三、内容解码

客户端会将内容编码的方式放入请求报文头部信息Content-Encoding属性中，服务器端接收报文主体的二进制数据了时，会根据该头部信息进行解压操作，当然服务器端可以在响应报文头部信息Accept-Encoding属性中添加支持的解压方式。

而【row-body】主要采用[inflation](https://link.zhihu.com/?target=https%3A//github.com/stream-utils/inflation)模块进行解压处理。

## 四、字符解码

一般而言，UTF-8是互联网中主流的字符编码方式，前面也提到了还有GBK编码方式，相比较UTF-8，它编码中文只需要2个字节，那么在字符解码时误用UTF-8解码GBK编码的字符，就会出现中文乱码的问题。

NodeJS主要通过Buffer处理二进制数据流，但是它并不支持GBK字符编码方式，需要通过[iconv-lite](https://link.zhihu.com/?target=https%3A//github.com/ashtuchkin/iconv-lite)模块进行处理。

【示例一】中的代码就存在没有正确处理字符编码的问题，那么报文主体中的字符采用GBK编码方式，必然会出现中文乱码：

```js
const request = require('request')
const iconv = require('iconv-lite')

request.post({
  url: 'http://localhost:1234/',
  body: iconv.encode('中文', 'gbk'),
  headers: {
    'Content-Type': 'text/plain;charset=GBK'
  }
}, (error, response, body) => {
  console.log(body) // 发生中文乱码情况
})
```

NodeJS中的Buffer默认是采用UTF-8字符编码处理，这里借助【iconv-lite】模块处理不同的字符编码方式：

```js
const chunks = Buffer.concat(body)
    res.end(iconv.decode(chunks, charset)) // charset通过Content-Type得到
```

## 五、字符串解码

前面已经提到了字符串的二种编码方式，它们对应的Content-Type分别为：

- URL编码 application/x-www-form-urlencoded
- JSON编码 application/json

对于前端来说，URL编码并不陌生，经常会用于URL拼接操作，唯一需要注意的是不要忘记对键值对进行decodeURIComponent()处理。

当客户端发送请求主体时，需要进行编码操作：

```js
'a=1&b=2&c=3'
```

服务器端再根据URL编码规则解码，得到相应的对象。

```js
// URL编码方式 简单的解码方法实现
function decode (qs, sep = '&', eq = '=') {
  const obj = {}
  qs = qs.split(sep)

  for (let i = 0, max = qs.length; i < max; i++) {
    const item = qs[i]
    const index = item.indexOf(eq)

    let key, value

    if (~index) {
      key = item.substr(0, index)
      value = item.substr(index + 1)
    } else {
      key = item
      value = ''
    }

    key = decodeURIComponent(key)
    value = decodeURIComponent(value)

    if (!obj.hasOwnProperty(key)) {
      obj[key] = value
    }
  }
  return obj
}

console.log(decode('a=1&b=2&c=3')) // { a: '1', b: '2', c: '3' }
```

URL编码方式适合处理简单的键值对数据，并且很多框架的Ajax中的Content-Type默认值都是它，但是对于复杂的嵌套对象就不太好处理了，这时就需要JSON编码方式大显身手了。

客户端发送请求主体时，只需要采用JSON.stringify进行编码。服务器端只需要采用JSON.parse进行解码即可：

```js
const strictJSONReg = /^[\x20\x09\x0a\x0d]*(\[|\{)/;
function parse(str) {
  if (!strict) return str ? JSON.parse(str) : str;
  // 严格模式下，总是返回一个对象
  if (!str) return {};
  // 是否为合法的JSON字符串
  if (!strictJSONReg.test(str)) {
    throw new Error('invalid JSON, only supports object and array');
  }
  return JSON.parse(str);
}
```

除了上述两种字符串编码方式，koa-bodyparser还支持不采用任何字符串编码方式的普通字符串。

三种字符串编码的处理方式由【co-body】模块提供，koa-bodyparser中通过判断当前Content-Type类型，调用不同的处理方式，将获取到的结果挂载在ctx.request.body：

```js
return async function bodyParser(ctx, next) {
    if (ctx.request.body !== undefined) return await next();
    if (ctx.disableBodyParser) return await next();
    try {
      // 最重要的一步 将解析的内容挂载到koa的上下文中
      const res = await parseBody(ctx);
      ctx.request.body = 'parsed' in res ? res.parsed : {};
      if (ctx.request.rawBody === undefined) ctx.request.rawBody = res.raw; // 保存原始字符串
    } catch (err) {
      if (onerror) {
        onerror(err, ctx);
      } else {
        throw err;
      }
    }
    await next();
  };

  async function parseBody(ctx) {
    if (enableJson && ((detectJSON && detectJSON(ctx)) || ctx.request.is(jsonTypes))) {
      return await parse.json(ctx, jsonOpts); // application/json等json type
    }
    if (enableForm && ctx.request.is(formTypes)) {
      return await parse.form(ctx, formOpts); // application/x-www-form-urlencoded
    }
    if (enableText && ctx.request.is(textTypes)) {
      return await parse.text(ctx, textOpts) || ''; // text/plain
    }
    return {};
  }
};
```

其实还有一种比较常见的Content-type，当采用表单上传时，报文主体中会包含多个实体主体：

```js
------WebKitFormBoundaryqsAGMB6Us6F7s3SF
Content-Disposition: form-data; name="image"; filename="image.png"
Content-Type: image/png


------WebKitFormBoundaryqsAGMB6Us6F7s3SF
Content-Disposition: form-data; name="text"

------WebKitFormBoundaryqsAGMB6Us6F7s3SF--
```

这种方式处理相对比较复杂，koa-bodyparser中并没有提供该Content-Type的解析。（下一篇中应该会介绍^_^）

## 五、总结

以上便是koa-bodyparser的核心实现原理，其中涉及到很多关于HTTP的基础知识，对于HTTP不太熟悉的同学，可以推荐看一波入门级宝典【图解HTTP】。

最后留图一张：



![img](02-%E7%8E%A9%E8%BD%ACKoa.assets/v2-19a6a38cf91d894e428f19b53f614c1a_720w.jpg)





# bodyparser实现原理解析

## 为什么我们需要body-parser

![img](02-%E7%8E%A9%E8%BD%ACKoa.assets/v2-86627b6c40000f0cc3a5dbe07a4e3571_720w.jpg)该图的意思是Koa集成了cookies,fresh,cache等库，但是并没有引入body-parser

**也许你第一次和bodyparser相遇是在使用Koa框架的时候**。当我们尝试从一个浏览器发来的POST请求中取得请求报文实体的时候，这个时候，我们想，这个从Koa自带的ctx.body里面取出来就可以了嘛！

唉！等等，但**根据Koa文档，ctx.body等同于ctx.res.body，所以从ctx.body取出来的是空的响应报文，而不是请求报文的实体哦**

**于是这时候又打算从Node文档里找找request对象有没有可以提供查询请求报文的属性，果自然是Node文档自然会告诉你结果——**

![img](02-%E7%8E%A9%E8%BD%ACKoa.assets/v2-d6bdb9fcff5a6d88bfc8fe494f3e46b6_720w.jpg)

## 所以，这个时候我们需要的是——

![img](02-%E7%8E%A9%E8%BD%ACKoa.assets/v2-d08ac23d68f3f09f7a38d0f778837d56_b.webp)

bodyparser是一类处理request的body的中间件函数，例如Koa-bodyparser就是和Koa框架搭配使用的中间件，帮助没有内置处理该功能的Koa框架提供解析request.body的方法，通过app.use加载Koa-bodyparser后，在Koa中就可以通过ctx.request.body访问到请求报文的报文实体啦!

## body-parser代码逻辑

## 无论是Node的哪一款body-parser，其原理都是类似的今天我们就编写一个getRequestBody的函数，解析出request.body，以尽管中窥豹之理。



要编写body-parser的代码，首先要了解两个方面的逻辑：请求相关事件和数据处理流程

## 请求相关事件

- data事件：当request接收到数据的时候触发，在数据传输结束前可能会触发多次，在事件回调里可以接收到Buffer类型的数据参数，我们可以将Buffer数据对象收集到数组里
- end事件：请求数据接收结束时候触发，不提供参数，我们可以在这里将之前收集的Buffer数组集中处理，最后输出将request.body输出。

## 数据处理流程

1. 在request的data事件触发时候,收集Buffer对象，将其放到一个命名为chunks的数组中
2. 在request的end事件触发时，通过Buffer.concat(chunks)将Buffer数组整合成单一的大的Buffer对象
3. 解析请求首部的Content-Encoding，根据类型，如gzip,deflate等调用相应的解压缩函数如Zlib.gunzip,将2中得到的Buffer解压，**返回的是解压后的Buffer对象**
4. 解析请求的charset字符编码，根据其类型，如gbk或者utf-8,调用iconv库提供的decode(buffer, charset)方法，根据字符编码将3中的**Buffer转换成字符串**
5. 最后,根据Content-Type,如application/json或'application/x-www-form-urlencoded'对4中得到的字符串做相应的解析处理，得到最后的对象，作为request.body返回

下面展示下相关的代码

## 整体代码结构

```js
// 根据Content-Encoding判断是否解压，如需则调用相应解压函数
async function transformEncode(buffer, encode) {
   // ...
}
// charset转码
function transformCharset(buffer, charset) {
  // ...
}

// 根据content-type做最后的数据格式化
function formatData(str, contentType) {
  // ...
}

// 返回Promise
function getRequestBody(req, res) {
    return new Promise(async (resolve, reject) => {
        const chunks = [];
        req.on('data', buf => {
            chunks.push(buf);
        })
        req.on('end', async () => {
            let buffer = Buffer.concat(chunks);
            // 获取content-encoding
            const encode = req.headers['content-encoding'];
            // 获取content-type
            const { type, parameters } = contentType.parse(req);
            // 获取charset
            const charset = parameters.charset;
            // 解压缩
            buffer = await transformEncode(buffer, encode);
            // 转换字符编码
            const str = transformCharset(buffer, charset);
            // 根据类型输出不同格式的数据，如字符串或JSON对象
            const result = formatData(str, type);
            resolve(result);
        })
    }).catch(err => { throw err; })
}
```

## **Step0.Promise的编程风格**

```js
function getRequestBody(req, res) {
    return new Promise(async (resolve, reject) => {
      // ...
    }
}
```

## Step1.data事件的处理

```js
const chunks = [];
req.on('data', buf => {
  chunks.push(buf);
})
```

## **Step2.end事件的处理**

```js
const contentType = require('content-type');
const iconv = require('iconv-lite');

req.on('end', async () => {
 let buffer = Buffer.concat(chunks);
 // 获取content-encoding
 const encode = req.headers['content-encoding'];
 // 获取content-type
 const { type, parameters } = contentType.parse(req);
 // 获取charset
 const charset = parameters.charset;
 // 解压缩
 buffer = await transformEncode(buffer, encode);
 // 转换字符编码
 const str = transformCharset(buffer, charset);
 // 根据类型输出不同格式的数据，如字符串或JSON对象
 const result = formatData(str, type);
  resolve(result);
}
```

## Step3.根据Content-Encoding进行解压处理

Content-Encoding可分为四种值：gzip，compress，deflate，br，**identity**

**其中**

- identity表示数据保持原样，没有经过压缩
- **compress已经被大多数浏览器废弃，Node没有提供解压的方法**

**所以我们需要处理解压的一共有三种数据类型**

- gzip：采用zlib.gunzip方法解压
- deflate: 采用zlib.inflate方法解压
- br:采用zlib.brotliDecompress方法解压

（**注意！**zlib.brotliDecompress方法在Node11.7以上版本才会支持，而且不要看到名字里有compress就误以为它是用来解压compress压缩的数据的，实际上它是用来处理br的）

代码如下，我们对zlib.gunzip等回调类方法通过promisify转成Promise编码风格

```js
const promisify = util.promisify;
// node 11.7版本以上才支持此方法
const brotliDecompress = zlib.brotliDecompress && promisify(zlib.brotliDecompress);

const gunzip = promisify(zlib.gunzip);
const inflate = promisify(zlib.inflate);

const querystring = require('querystring');

// 根据Content-Encoding判断是否解压，如需则调用相应解压函数
async function transformEncode(buffer, encode) {
    let resultBuf = null;
    debugger;
    switch (encode) {
        case 'br':
            if (!brotliDecompress) {
                throw new Error('Node版本过低！ 11.6版本以上才支持brotliDecompress方法')
            }
            resultBuf = await brotliDecompress(buffer);
            break;
        case 'gzip':
            resultBuf = await gunzip(buffer);
            break;
        case 'deflate':
            resultBuf = await inflate(buffer);
            break;
        default:
            resultBuf = buffer;
            break;
    }
    return resultBuf;
}
```

## Step4.根据charset进行转码处理

我们采用iconv-lite对charset进行转码，代码如下

```js
const iconv = require('iconv-lite');
// charset转码
function transformCharset(buffer, charset) {
    charset = charset || 'UTF-8';
    // iconv将Buffer转化为对应charset编码的String
    const result = iconv.decode(buffer, charset);
    return result;
}
```

来！传送门

[iconv-litewww.npmjs.com![图标](https://pic3.zhimg.com/v2-338e4905a2684ca96e08c7780fc68412_180x120.jpg)](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/iconv-lite)

## Step5.根据contentType将4中得到的字符串数据进行格式化

具体的处理方式分三种情况：

- 对text/plain 保持原样，不做处理，仍然是字符串
- 对application/x-www-form-urlencoded，得到的是类似于key1=val1&key2=val2的数据，通过querystring模块的parse方法转成{ key:val }结构的对象
- 对于application/json，通过JSON.parse(str）一波带走

代码如下

```js
const querystring = require('querystring');
// 根据content-type做最后的数据格式化
function formatData(str, contentType) {
    let result = '';
    switch (contentType) {
        case 'text/plain':
            result = str;
            break;
        case 'application/json':
            result = JSON.parse(str);
            break;
        case 'application/x-www-form-urlencoded':
            result = querystring.parse(str);
            break;
        default:
            break;
    }
    return result;
}
```



## 测试代码

**服务端**

下面的代码你肯定知道要放在哪里了

```js
// 省略其他代码
if (pathname === '/post') {
  // 调用getRequestBody,通过await修饰等待结果返回
  const body = await getRequestBody(req, res);
  console.log(body);
  return;
 }
```

**前端采用fetch进行测试**

在下面的代码中，我们连续三次发出不同的POST请求，携带不同类型的body数据，看看服务端会输出什么

```js
var iconv = require('iconv-lite');
var querystring = require('querystring');
var gbkBody = {
    data: "我是彭湖湾",
    contentType: 'application/json',
    charset: 'gbk'
};
// 转化为JSON数据
var gbkJson = JSON.stringify(gbkBody);
// 转为gbk编码
var gbkData = iconv.encode(gbkJson, "gbk");

var isoData = iconv.encode("我是彭湖湾，这句话采用UTF-8格式编码，content-type为text/plain", "UTF-8")

// 测试内容类型为application/json和charset=gbk的情况
fetch('/post', {
    method: 'POST',
    headers: {
        "Content-Type": 'application/json; charset=gbk'
    },
    body: gbkData
});

// 测试内容类型为application/x-www-form-urlencoded和charset=UTF-8的情况
fetch('/post', {
    method: 'POST',
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: querystring.stringify({
        data: "我是彭湖湾",
        contentType: 'application/x-www-form-urlencoded',
        charset: 'UTF-8'
    })
});

// 测试内容类型为text/plain的情况
fetch('/post', {
    method: 'POST',
    headers: {
        "Content-Type": 'text/plain; charset=UTF-8'
    },
    body: isoData
});
```

**服务端输出结果**

```text
{ 
  data: '我是彭湖湾',
  contentType: 'application/json',
  charset: 'gbk' 
 }
 {
  data: '我是彭湖湾',
  contentType: 'application/x-www-form-urlencoded',
  charset: 'UTF-8' 
  }
  我是彭湖湾，这句话采用UTF-8格式编码，content-type为text/plain
```

## 问题和后记

## **Q1.为什么要对charset**

其实本质上来说，charset前端一般都是固定为utf-8的， 甚至在JQuery的AJAX请求中，前端请求charset甚至是不可更改，只能是charset，但是在使用fetch等API的时候，的确是可以更改charset的，**这个工作尝试满足一些比较偏僻的更改charset需求。**

## **Q2：为什么要对**content-encoding做处理呢？

一般情况下我们认为，考虑到前端发的AJAX之类的请求的数据量，是不需要做Gzip压缩的。但是向服务器发起请求的不一定只有前端，**还可能是Node的客户端。这些Node客户端可能会向Node服务端传送压缩过后的数据流。** 例如下面的代码所示

```js
const zlib = require('zlib');
const request = require('request');
const data = zlib.gzipSync(Buffer.from("我是一个被Gzip压缩后的数据"));
request({
    method: 'POST',
    url: 'http://127.0.0.1:3000/post',
    headers: {//设置请求头
        "Content-Type": "text/plain",
        "Content-Encoding": "gzip"
    },
    body: data
})
```