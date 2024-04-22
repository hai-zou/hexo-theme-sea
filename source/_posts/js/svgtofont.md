---
title: SVG To Font 创建自己的字体图标库
date: 2023-06-22
categories: 
  - 前端
tags:
  - JavaScript
---

## 关于字体图标

字体图标是一种特殊的字体，它可以像文字一样，通过 CSS 来控制它的大小和颜色。

## SVG To Font

SVG 虽然也能在网站中直接使用，但是它如果要修改大小或者颜色的话，就需要更改 SVG 的源码，特别不方便！

网上有许多 SVG 转 Font 的方式，这里介绍一种 js 库 [svgtofont](https://github.com/jaywcjlove/svgtofont)，
用脚本的方式转换，方便快捷！

## 准备工作

准备 SVG 文件，推荐使用 [阿里巴巴矢量图标库](https://www.iconfont.cn/)，可以免费下载各种 SVG 文件。

下载完成之后统一放到 `svg` 文件夹下。

## 开始

1. 安装 `svgtofont`

```bash
npm i svgtofont -D
```

2. 新建一个 node 脚本 `svgtofont.js`

```js
import svgtofont from "svgtofont";
import path from "path";

svgtofont({
    src: path.resolve(process.cwd(), "./svg"), // svg 图标目录路径
    dist: path.resolve(process.cwd(), "./fonts"), // 输出到指定目录中
    fontName: "h-font", // 设置字体名称
    css: true, // 生成字体文件
    useNameAsUnicode: true,
}).then(() => {
    console.log("done!");
});
```

3. 运行命令 `node svgtofont.js`

## 使用

- 运行构建命令之后，生成一个 `fonts` 文件夹，里面包含了 `.css` `.less` `.scss` `.styl` 文件类型的样式，随便引入一种

```js
// 引入字体图标样式
import "./fonts/h-font.css";
```

- 在代码中使用

```html
<i class="h-font">close</i>
```
