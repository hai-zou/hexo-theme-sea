---
title: JavaScript 中的防抖与节流
date: 2021-07-14
tags:
  - JavaScript
---

## 防抖

这个函数接受两个参数：要执行的函数 `func` 和延迟时间 `delay`，并返回一个新函数。 新函数在被连续调用的一段时间内只会执行一次，直到调用停止超过 `delay` 毫秒。

在新函数内部，使用 `clearTimeout` 清除上一个（如果有的话） `setTimeout` 计时器，并创建一个新的 `setTimeout` 计时器，以在延迟时间 `delay` 后执行 `func`。由于新函数没法访问 `timer` 变量，因此使用了闭包来捕获和存储计时器 ID。

这个防抖函数通常用于延迟用户输入事件的响应，以避免不必要的重复 API 请求或计算。

```js
function debounce(fn, delay) {
    let timer;
    return function (e) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(e);
        }, delay);
    };
}
```

## 节流

这个函数接受两个参数：要执行的函数 `func` 和延迟时间 `delay`，并返回一个新函数。 新函数在被连续调用的一段时间内最多只会执行一次，直到延迟时间 `delay` 过去。

在新函数内部，使用一个变量 `timer` 标记当前是否已经设置了定时器。如果 `timer` 为 `null`，则说明可以执行 `func`。在执行完 `func` 后，将 `timer` 重设为 `null`。否则，如果 `timer` 不为 `null`，则说明上一个定时器还未触发，不需要再设置新的定时器。这就实现了节流作用。

这个节流函数通常用于减少响应频率较高的事件的触发次数，例如浏览器的 `resize` 和 `scroll` 事件。

```js
function control(fn, delay) {
    let timer;
    return function (e) {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            fn(e);
            timer = null;
        }, delay);
    };
}
```
