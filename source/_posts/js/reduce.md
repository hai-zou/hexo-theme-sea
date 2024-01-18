---
title: 万能的 reduce
date: 2023-07-21
tags:
  - JavaScript
---

## reduce 介绍

`reduce` 是 JavaScript 数组的一个高阶函数，它用于将数组的每个元素按照指定的方式进行归约（合并）操作。

`reduce` 接受两个参数：

- `callback` 回调函数，它执行数组的归约逻辑。
- `initialValue` 初始累加器的值，可选，如果未提供初始值，则将使用数组的第一个元素作为初始值，然后从第二个元素开始进行归约。

`callback` 回调函数接受四个参数：

- 累加器（accumulator）：用于累积回调函数的返回值。它在每次调用回调函数时更新。
- 当前值（current value）：正在处理的当前元素。
- 当前索引（current index）：正在处理的当前元素的索引。
- 原始数组（array）：调用 reduce() 方法的数组。

## 简单示例

使用 `reduce` 函数计算数组元素总和

```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
);

console.log(sum); // 输出：15
```

## 更多用法

`reduce` 函数具有很强的灵活性，可以用来实现数组中的许多常见方法。

`Array.includes`，numbers 中是否存在数值 3

```js
const numbers = [1, 2, 3, 4, 5];
const isExist = numbers.reduce(
    (includes, cur) => (includes ? includes : cur === 3),
    false
);

console.log(isExist); // 输出：true
```

`Array.slice`，将 numbers 中索引 0~4 之间的值截取并组成新的数组

```js
const numbers = [1, 2, 3, 4, 5];
const newNums = numbers.reduce(
    (arr, cur, index) => (index > 0 && index < 4 ? [...arr, cur] : arr),
    []
);

console.log(newNums); // 输出：[2, 3, 4]
```

`Array.map`，将 numbers 数组中的值都乘以 100

```js
const numbers = [1, 2, 3, 4, 5];
const newNums = numbers.reduce((arr, cur) => [...arr, cur * 100], []);

console.log(newNums); // 输出：[100, 200, 300, 400, 500]
```

`Array.filter`，过滤掉 numbers 中小于 3 的数

```js
const numbers = [1, 2, 3, 4, 5];
const newNums = numbers.reduce(
    (arr, cur) => (cur >= 3 ? [...arr, cur] : arr),
    []
);

console.log(newNums); // 输出：[3, 4, 5]
```

`Array.find`，找到值为 3 的 item 项

```js
const numbers = [1, 2, 3, 4, 5];
const findItem = numbers.reduce((acc, cur) => {
    if (acc === undefined && cur === 3) {
        return cur;
    }
    return acc;
}, undefined);

console.log(findItem); // 输出：3
```

`Max and Min`，获取 numbers 中的最大值和最小值

```js
const numbers = [1, 2, 3, 4, 5];
const maxAndMin = numbers.reduce(
    ({ max, min }, cur) => ({
        max: Math.max(max, cur),
        min: Math.min(min, cur),
    }),
    { max: -Infinity, min: Infinity }
);

console.log(maxAndMin); // 输出：{max: 5, min: 1}
```
