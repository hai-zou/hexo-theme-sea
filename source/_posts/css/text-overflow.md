---
title: CSS 文本超出省略
date: 2023-05-12
tags:
  - CSS
---

## 单行省略

```css
width: 200px; /* 容器宽度 */
white-space: nowrap; /* 不换行 */
overflow: hidden; /* 溢出隐藏 */
text-overflow: ellipsis; /* 超出部分省略 */
```

## 多行省略

```css
display: -webkit-box;
-webkit-line-clamp: 2; /* 限制行数 */
-webkit-box-orient: vertical; /* 文本垂直排列 */
overflow: hidden;
text-overflow: ellipsis;
```

{% note info %}
需要注意的是，这种多行省略的效果只在使用 WebKit 内核的浏览器中起作用，如 Chrome 和 Safari。
对于其他浏览器，可能需要使用其他技术或 JavaScript 库来实现类似的效果。
{% endnote %}

## 判断内容是否省略

```js
function checkOverflow(el) {
    const curOverflow = el.style.overflow;

    if (!curOverflow || curOverflow === "visible") {
        el.style.overflow = "hidden";
    }

    const isOverflowing =
        el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverflow;

    return isOverflowing;
}
```
