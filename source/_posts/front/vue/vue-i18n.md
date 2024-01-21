---
title: Vue项目如何配置国际化
date: 2021-08-15
categories: 
  - 前端
tags:
  - Vue
---

## 安装 vue-i18n

> 本文使用的是 vue@3 + vue-i18n@9 的写法

```javascript
npm install vue-i18n@9 --save
```

## 新建 i18n 文件

1. 文件目录结构如下：<div>![目录结构图](/images/vue_1_1.webp)</div>

2. 在 index.js 下创建 i18n 实例

```javascript
import { createI18n } from "vue-i18n/index";
import zh from "./lang/zh";
import en from "./lang/en";

const i18n = createI18n({
    // 设置地区
    locale: localStorage.getItem("language") || "zh",
    // 设置语言环境信息
    messages: {
        zh,
        en,
    },
});

export default i18n;
```

3. 然后分别创建 zh.js 和 en.js 的语言包

```javascript
// zh.js
export default {
    message: {
        resume: "生活不止眼前的苟且",
    },
};
```

```javascript
// en.js
export default {
    message: {
        resume: "There is more to life than subsistence",
    },
};
```

## 在 main.js 中引入

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./i18n";

const app = createApp(App);
app.use(i18n);

app.mount("#app");
```

## 在模板中使用

1. 在模板中使用

```javascript
<div class="content">
    {{ $t('message.resume') }}
</div>
```

2. 写一个切换语言的方法

```javascript
toggle() {
    const curLang = localStorage.getItem('language');
    const setLang = curLang == 'zh' ? 'en' : 'zh';
    localStorage.setItem('language', setLang);
    location.reload();
}
```

## 使用效果

![效果图1](/images/vue_1_2.webp)

![效果图2](/images/vue_1_3.webp)
