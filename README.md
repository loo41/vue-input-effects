## vue-input

[gif效果](https://github.com/loo41/vue-input/blob/master/docs/input.gif)

---

### Install

```
    npm install vue-input-effects
    
    yarn add vue-input-effects
```

---

### Basic use 

```
    全局
    
    import iput from 'vue-input-effects'
    Vue.use(iput)
    
    局部
    import {Input, Shy, Dird, Duck, Fish, Goose, Panda, Pig} from 'vue-input-effects'
    export default {
        components: {Input, Shy, Dird, Duck, Fish, Goose, Panda, Pig}
    }
    
```
[example](https://github.com/loo41/vue-input/example/index.vue)

---

### 全局属性方法

|   属性  |      类型     |   默认值   |    说明    |
|---------| ------------- | ---------- | ---------- |
| height  | string/number | 35         |            |
| width   | string/number | 260        |            |
| input-style| string     |            | 输入框样式 宽高不管用  |
| disabled| boolean       | false      | 是否可点击 |
| autofocus | boolean     | false      | 是否自动聚焦 |
| full-width | boolean     | false      | 是否沾满父盒子 |
| help-text  | string      |            | 提示问题   |
| focus   | function      |            | 输入框聚焦事件 |
| blur    | function      |            | 输入框失焦事件 |
| change  | function      |            | 输入框改变事件 |

### 全局插槽

```
<slot name="header"></slot>
<slot name="footer"></slot>

使用

<div slot="header"></div>
<div slot="footer"></div>
```
---

### 组件
#### [效果](https://loo41.github.io/vue-input/)
---
所有组件默认插槽无样式需要自定义样式后可见效果

---
##### Input
```
<Input v-model="input0" />
```
---
##### Shy
|   属性  |      类型     |   默认值   |    说明    |  取值   |
|---------| ------------- | ---------- | ---------- | -------- |
| location| String        | left |下划线滚动开始位置|left/right/center|
| underlineColor | String |      | 下划线颜色 | |
| defaultUnderlineColor | String | 默认下划线颜色| |
| underlineShow | Boolean | true | 下划线是否出现| |
| iconShow | Boolean | true | 插槽是否出现 ||
```
<template>
  <Shy v-model="input1">
    <div slot="icon-slot" class="input1"></div>
  </Shy>
</template>

<style>
  .input1 {
    height: 100%;
    width: 100%;
    background: #CE02E8
  }
</style>
```
---
##### Dird
|   属性  |      类型     |   默认值   |    说明    |  取值   |
|---------| ------------- | ---------- | ---------- | -------- |
| underlineColor | String |      | 下划线颜色 | |
```
<Dird v-model="input2" />
```
---

##### Duck
```
<template>
  <Duck v-model="input3">
    <div slot="icon-slot" class="input3"></div>
  </Duck>
</template>

<style>
  .input3 {
    height: 100%;
    width: 100%;
    background: #8D6BFF
  }
</style>
```
---

##### Fish
|   属性  |      类型     |   默认值   |    说明    |  取值   |
|---------| ------------- | ---------- | ---------- | -------- |
| underlineColor | String |      | 下划线颜色 | |
| defaultUnderlineColor | String | 默认下划线颜色| |
| underlineShow | Boolean | true | 下划线是否出现| |
```
<template>
  <Fish v-model="input4">
    <div slot="icon-slot" class="input4">阳光网站</div>
  </Fish>
</template>

<style>
  .input4 {
    height: 100%;
    width: 100%;
    background: #8D6BFF;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 14px;
    padding: 0 10px;
  }
</style>
```
---
##### Goose
```
<template>
  <Goose v-model="input5">
    <div slot="icon-slot-one" class="input5-one"></div>
    <div slot="icon-slot-two" class="input5-two"></div>
  </Goose>
</template>

<style>
  .input5-one {
    height: 100%;
    width: 100%;
    background: black;
  }
  .input5-two {
    height: 100%;
    width: 100%;
    background: #8D6BFF;
  }
</style>
```
---

##### Panda
```
<template>
  <Panda v-model="input6">
    <div slot="icon-slot-two" class="input6">阳光网站</div>
  </Panda>
</template>

<style>
  .input6 {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: white;
    padding-left: 10px;
    background: #8D6BFF;
  }
</style>
```
---

##### Pig
|   属性  |      类型     |   默认值   |    说明    |  取值   |
|---------| ------------- | ---------- | ---------- | -------- |
| underlineColor | String |      | 下划线颜色 | |
| underlineShow | Boolean | true | 下划线是否出现| |
```
<template>
  <Pig v-model="input7"/>
</template>
```
---
### 欢迎 pr issues star
