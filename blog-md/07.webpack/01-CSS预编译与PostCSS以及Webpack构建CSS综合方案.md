# [CSS预编译与PostCSS以及Webpack构建CSS综合方案](https://www.cnblogs.com/ihardcoder/p/7216345.html)

[原文链接](http://www.caiziguoguo.com/cj5d8kp7w0000gw0hlalx2ksd/)

CSS全称Cascading Style Sheets（层叠样式表），用来为HTML添加样式，本质上是一种标记类语言。CSS前期发展非常迅速，1994年哈肯·维姆·莱首次提出CSS，1996年12月W3C推出了第一个正式版本。随后不到两年的时间，1998年5月便推出了第二个版本，一直沿用至今。但是CSS3的制订工作却迟迟没有完成。CSS3最初的草案在1999年便被提出，但是直到今日CSS3规范仍然有部分特性没有完成。如果说ES6与ES5相隔的6年时间让开发者们熬尽了心肝，那么从提案到发布相隔近20年光阴的CSS3可以说是千呼万唤始出来，而且犹抱琵琶半遮面。

#### CSS的缺陷

CSS的初衷是为了弥补HTML原生样式的不足，早期对样式要求并不复杂的web网站仅仅需要少量的CSS代码即可。在如今web应用程序追求极致用户体验的潮流下，对CSS的要求也不断增强。复杂CSS开发是一件非常痛苦的事情，最主要的原因是受限于浏览器的实现以及CSS自身的弱编程能力：

1. 浏览器实现不理想甚至实现方案各一。对CSS的兼容处理几乎是每个前端工程师必备的技能，究其根本是浏览器对CSS规范的实现程度和方案不一。其中尤以IE浏览器最甚，包括以IE内核的众多国产浏览器。虽然目前绝大多数web应用已经不在兼容IE8以下浏览器，但IE8和IE9仍然让前端工程师们头疼不已；
2. CSS的弱编程能力。CSS通过“selector-properties”的模式为HTML文档增加样式，简单的语法可以让没有任何编程基础的初学者或者设计人员很快上手。但CSS不支持嵌套，甚至运算、变量、复用等这些几乎是编写复杂代码的必备特性。从CSS3引入了`cal()`以及处于草案阶段的`var()`可以隐约看出W3C有意加强CSS的编程能力；

开发者们不断探索着能够弥补这些缺陷的解决方案，CSS预编译器是第一种顺势而生的革命性方案。

#### CSS预编译

CSS预编译的工作原理是提供便捷的语法和特性供开发者编写源代码，随后经过专门的编译工具将源码转化为CSS语法。最早的CSS预编译器是2007年起源于Ruby on Rails社区的SASS，目前比较流行的其他CSS预编译器如Less、Stylus的诞生都一定程度上受到了SASS的影响和启发。

CSS预编译器几乎成为现如今开发CSS的标配，它从以下几个方面提升了CSS开发的效率：

1. 增强编程能力；
2. 增强可复用性；
3. 增强可维护性；
4. 更便于解决浏览器兼容性。

不同的预编译器特性虽然有所差异，但核心功能均围绕这些目标打造，比如：

- 嵌套；
- 变量；
- mixin/继承；
- 运算；
- 模块化；

嵌套是所有预编译器都支持的语法特性，也是原生CSS最让开发者头疼的问题之一；mixin/继承是为了解决hack和代码复用；变量和运算增强了源码的可编程能力；模块化的支持不仅更利于代码复用，同时也提高了源码的可维护性。

#### PostCSS

CSS预编译的理念与Babel有一定相通之处，最重要的区别是：预编译语法并非规范的CSS，而是各成一派。由预编译语法编写的源代码不能在任何宿主浏览器中运行。从这个角度考虑，CSS预编译更像CoffeeScript、TypeScript等JavaScript子集。可以预见的是，如果未来CSS规范推出了预编译类似的特性和语法，这些预编译器都将成为历史的尘埃。PostCSS则反其道而行之，从理念上更加接近Babel，业内也有人将其称为“CSS的Babel”。

PostCSS鼓励开发者使用规范的CSS原生语法编写源代码，然后配置编译器需要兼容的浏览器版本，最后经过编译将源码转化为目标浏览器可用的CSS代码。PostCSS提供了丰富的插件用于实现不同场景的编译需求，最常用的比如autoprefixer、sprites等，编译流程如下图所示：
![img](https://images2015.cnblogs.com/blog/595796/201707/595796-20170721102008958-385357018.png)

PostCSS并不是另一种CSS预编译器，与SASS、Less等预编译器也并不冲突。PostCSS与Babel的不同之处在于，它所支持的所谓“未来CSS语法”并不是严格的CSS规范，其中大部分语法和特性目前只是CSS4的草案而已。很多人将PostCSS称为“CSS后编译器”，这个称谓可以一定程度上说明目前业界对PostCSS的普遍使用方案，请看下图：
![img](https://images2015.cnblogs.com/blog/595796/201707/595796-20170721102024974-806298028.png)

即使是PostCSS支持的“未来CSS语法”也并不能完全弥补CSS的缺陷，所以目前普遍的方案是将CSS预编译与PostCSS综合在一起：

- 使用CSS预编译弥补CSS源码的弱编程能力，比如变量、运算、继承、模块化等；
- 使用PostCSS处理针对浏览器的需求，比如autoprefix、自动css sprites等。

#### Webpack结合预编译与PostCSS实现CSS构建

通过Webpack配置项中的`use`指定的loader是按照索引反向执行，比如存在下述配置方案：

```javascript
{
  test: /\.less$/,
  use: [
    'style-loader',
    'css-loader',
    'less-loader'
  ]
}
```

`.less`后缀类型的文件依次经过`less-loader`、`css-loader`和`style-loader`编译。在这种工作模式的基础上，结合图3-4所示的编译流程，使用Webpack结合CSS预编译与PostCSS的编译方案便一目了然了：

```javascript
{
  test: /\.less$/,
  use: [{
    loader: 'style-loader',
    options: {} // style-loader options
  },{
    loader: 'css-loader',
    options: {
	  importLoaders: 2 // css-loader options
    } 
  },{
    loader: 'postcss-loader',
    options: {} // postcss-loader options
  },{
    loader: 'less-loader',
    options: {} // less-loader options
  }]
}
```

上述配置中有以下需要注意的细节：

1. css-loader中`importLoaders`选项的作用是用于配置css-loader作用于 `@import` 的资源之前需要经过其他loader的个数。`@import` 用于css源码中引用其他模块的关键字，如果你的项目中确定不会涉及模块化可以忽略此配置项；
2. 如果需要将编译后的css文件独立导出，则需将style-loader[注]替换为extract-text-webpack-plugin，如下：

```javascript
{
  test: /\.less$/,
  use: ExtractTextPlugin.extract({
    filename: './dest/[name].[contenthash].css'
    use: [{
      loader: 'css-loader',
      options: {
   	    importLoaders: 2 // css-loader options
      } 
    },{
      loader: 'postcss-loader',
      options: {} // postcss-loader options
    },{
      loader: 'less-loader',
      options: {} // less-loader options
    }],
    publicPath: '/'
  })
}
```

> 注：很多开发者容易混淆css-loader和style-loader的作用。css-loader的作用是解析css源文件并获取其引用的资源，比如`@import`引用的模块、`url()`引用的图片等，然后根据Webpack配置编译这些资源。style-loader负责将css代码通过``标签插入html文档中，所以如果独立导出css文件就不再需要style-loader。css-loader必须在style-loader之前执行。