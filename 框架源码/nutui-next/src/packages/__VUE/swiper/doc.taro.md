# Swiper 轮播

### 介绍

常用于一组图片或卡片轮播，当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。

<!-- ### 安装

```javascript
import { createApp } from 'vue';
import { Swiper } from '@nutui/nutui-taro';

const app = createApp();
app.use(Swiper);
```

## 代码演示

### 基础用法

`autoplay` 是否自动切换
`interval` 自动切换时间间隔
`current` 当前所在滑块的 index
`indicator-dots` 是否显示面板指示点
`indicator-color` 指示点颜色

```html
<nut-swiper current="1" indicator-dots="true" indicator-color="#426543" autoplay="true" interval="3000">
   <nut-swiper-item>
    <img src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg" alt="" />
  </nut-swiper-item>
  <nut-swiper-item>
    <img src="https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg'" alt="" />
  </nut-swiper-item>
  <nut-swiper-item>
    <img src="https://storage.360buyimg.com/jdc-article/welcomenutui.jpg" alt="" />
  </nut-swiper-item>
  <nut-swiper-item>
    <img src="https://storage.360buyimg.com/jdc-article/fristfabu.jpg" alt="" />
  </nut-swiper-item>
</nut-swiper>
```

### 自定义大小

`previous-margin` 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
`next-margin` 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值

```html
<nut-swiper previous-margin="10px" next-margin="10px">
   <nut-swiper-item>
    <img src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg" alt="" />
  </nut-swiper-item>
  <nut-swiper-item>
    <img src="https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg'" alt="" />
  </nut-swiper-item>
  <nut-swiper-item>
    <img src="https://storage.360buyimg.com/jdc-article/welcomenutui.jpg" alt="" />
  </nut-swiper-item>
  <nut-swiper-item>
    <img src="https://storage.360buyimg.com/jdc-article/fristfabu.jpg" alt="" />
  </nut-swiper-item>
</nut-swiper>
```

### 垂直方向

`vertical` 滑动方向是否为纵向


```html
<nut-swiper vertical="true">
    <nut-swiper-item>
    <img src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg" alt="" />
  </nut-swiper-item>
  <nut-swiper-item>
    <img src="https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg'" alt="" />
  </nut-swiper-item>
  <nut-swiper-item>
    <img src="https://storage.360buyimg.com/jdc-article/welcomenutui.jpg" alt="" />
  </nut-swiper-item>
  <nut-swiper-item>
    <img src="https://storage.360buyimg.com/jdc-article/fristfabu.jpg" alt="" />
  </nut-swiper-item>
</nut-swiper>
``` -->


#### 直接使用 Taro 现有 Swiper 组件开发 [参考文档](https://docs.taro.zone/docs/components/viewContainer/swiper)