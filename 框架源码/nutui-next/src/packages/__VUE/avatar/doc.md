# Avatar 头像

### 介绍

用来代表用户或事物，支持图片、图标或字符展示。

### 安装

```javascript
import { createApp } from 'vue';
// vue
import { Avatar, Icon } from '@nutui/nutui';
// taro
import { Avatar, Icon } from '@nutui/nutui-taro';

const app = createApp();
app.use(Avatar);
app.use(Icon);
```

### 基本用法

内置 smal / normal / large 三种尺寸规格

:::demo

```html
<template>
  <nut-avatar
    size="large"
    icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
  ></nut-avatar>
  <nut-avatar
    size="normal"
    icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
  ></nut-avatar>
  <nut-avatar
    size="small"
    icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
  ></nut-avatar>
</template>
```

:::

### 修改形状类型

:::demo

```html
<template>
  <nut-avatar icon="my" shape="square"></nut-avatar>
  <nut-avatar icon="my" shape="round"></nut-avatar>
</template>
```

:::

### 修改背景色

:::demo

```html
<template>
  <nut-avatar icon="my" bg-color="#FA2C19" />
</template>
```

:::

### 修改背景 icon

:::demo

```html
<template>
  <nut-avatar
    icon="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
  />
</template>
```

:::

### 设置头像的文本内容

:::demo

```html
<template>
  <nut-avatar>N</nut-avatar>
</template>
```

:::

### Prop

| 字段     | 说明                                                             | 类型   | 默认值 |
| -------- | ---------------------------------------------------------------- | ------ | ------ |
| bg-color | 设置头像背景色                                                   | String | #eee   |
| size     | 设置头像的大小，提供三种：large/normal/small，支持直接输入数字   | String | normal |
| shape    | 设置头像的形状，默认是圆形，可以设置为 square 方形               | String | round  |
| icon     | 设置头像的 icon 图标, 类似 Icon 组件的 name 属性，支持名称和链接 | String | ''     |

### Events

| 字段             | 说明         | 类型     | 回调参数 |
| ---------------- | ------------ | -------- | -------- |
| active-avatarror | 点击触发事件 | Function | event    |
