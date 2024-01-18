---
title: 前端分页
date: 2023-07-19
tags:
  - JavaScript
---

## 前言

虽然在实际开发中，大多数分页都是由后端处理，但还是有小部分场景需要前端来实现分页。
实现并不难，仅作为记录，方便下次拿来直接使用。

## 准备数据源

数据源可以是从后端获取的数据列表，也可以是前端模拟的数据集。将数据源格式处理成数组即可。

```js
// 模拟 50 条数据
const list = Array.from({ length: 50 }, (_, index) => `Item ${index + 1}`);
```

## 计算总页数

计算总页数需要知道 数据源总量 和 每页展示数据的数量，也就是 `length` 和 `pageSize`。

```js
const totalPages = Math.ceil(length / pageSize);
```

## 将数据分割成页

根据 每页展示的数据量 以及 当前的页码，就能动态的将每页的数据分割出来。
使用 js 中的数组方法 `slice` 就能够很容易的实现，它在分割数据源之后会生成一个新的数组，不会改变原数组的数据。

```js
function pagination(page, pageSize) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return list.slice(startIndex, endIndex);
}
```

## 呈现当前页数据

使用 `pagination` 方法，传入 页码 和 每页展示的数量 获取对应页的数据，并将其呈现在前端页面中。  
例如：展示第二页数据，每页十条。

```js
const displayList = pagination(2, 10);
```

## 总结

`list` 是用于切割出每页数据的原数组，不可更改，通过点击页码调用 `pagination` 方法生成一个新的数组 `displayList`。
`displayList` 是用于展示在页面上的当前页数据。
