---
title: Vue项目中使用 vuex 实现（状态）数据共享
date: 2021-08-07
categories: 
  - 前端
tags:
  - Vue
---

## 什么是 vuex

vuex 是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间数据的共享。

## 安装依赖

> 本文使用的是 vue3.0 + vuex4.0 的写法。

```bash
npm install vuex --save
```

## 使用 vuex

1. 创建 store 文件

```js
import { createStore } from "vuex";

// 模拟请求数据
function getUserInfo() {
    return new Promise((resolve) => {
        resolve({ name: "张三" });
    });
}

const store = createStore({
    // 相当于 vue 中的 data，存放变量
    state() {
        return {
            userInfo: {},
        };
    },
    // 计算属性，对 state 中的变量进行处理
    getters: {
        userName(state) {
            return state.userInfo.name;
        },
    },
    // 更改 store 中的状态的唯一方式
    mutations: {
        setUserInfo(state, value) {
            state.userInfo = value;
        },
    },
    /*
     * action 提交的是 mutation，而不是直接变更状态。
     * action 可以包含任意异步操作
     */
    actions: {
        async getUserInfo({ commit }) {
            const userInfo = await getUserInfo();
            commit("setUserInfo", userInfo);
        },
    },
});

export default store;
```

2. 在 main.js 中引入

```js
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

const app = createApp(App);
app.use(store);

app.mount("#app");
```

3. 使用共享数据

```js
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    created() {
        this.getUserInfo();
    },
    computed: {
        ...mapState(["userInfo"]),
        ...mapGetters(["userName"]),
    },
    methods: {
        ...mapActions(["getUserInfo"]),
    },
};
```
