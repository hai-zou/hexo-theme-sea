---
title: 博客搭建 — 站点优化之图片懒加载
date: 2023-07-07
categories: 
  - WebSite
tags:
  - JavaScript
---

## 关于图片懒加载

图片懒加载是一种优化网页性能的技术，它延迟加载页面中的图片，只在用户需要时才进行加载，从而减少初始页面加载时的资源请求和传输量。

[lazysizes](https://github.com/aFarkas/lazysizes) 让该技术成为非常简单的实现策略。

## 在项目中使用 lazysizes

1. 安装

```bash
npm install lazysizes --save
```

2. 引入

```js
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
```

## 处理需要延迟加载的 Image 标签

- 将 `lazyload` 类添加到需要延迟加载的图片中
- 将 `src` 属性改为 `data-src`

{% note info %}
为什么将 `src` 属性更改为 `data-src`？如果不更改属性，所有图片将立即加载，而不是延迟加载。
使用 `data-src` 不是浏览器识别的属性，浏览器遇到具有该属性的图片标签时不会加载图片。
这样做的好处是让 `lazysizes` 脚本决定何时加载图像，而不是由浏览器决定。
{% endnote %}

```js
<img data-src="images.png" class="lazyload" />
```

## 怎样才算添加成功？

- 滚动页面，打开控制台审查元素，找到添加了 `lazyload` 属性的图片，它们的类应该从 lazyload 改变为 lazyloaded。
- 查看 Network 面板，点击 Img，当向下滚动时可以看到图片逐个加载。
