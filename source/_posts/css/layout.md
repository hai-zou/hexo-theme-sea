---
title: CSS布局：左侧固定，右侧自适应
date: 2021-08-25
categories:
  - 前端
tags:
  - CSS
---

## 前言

在 Web 开发中，经常需要实现各种布局样式以满足设计需求。其中一种常见的布局需求是将页面分为左右两个区域，左侧区域固定宽度，右侧区域根据可用空间自适应宽度。
本篇博客将介绍如何使用 CSS 实现这种布局效果。

## HTML 结构

首先，我们需要创建相应的 HTML 结构，以便在 CSS 中进行布局。以下是一个示例的 HTML 结构：

```html
<div class="container">
  <div class="sidebar">
    <!-- 左侧内容 -->
  </div>
  <div class="main-content">
    <!-- 右侧内容 -->
  </div>
</div>
```

在上面的示例中，我们使用一个包含两个子元素的容器 `.container`。左侧区域使用类名 `.sidebar`，右侧区域使用类名 `.main-content`。

## CSS 布局

### Flex 布局

```css
.container {
  display: flex;
}

.sidebar {
  width: 200px; /* 左侧固定宽度 */
  background-color: #f1f1f1; /* 左侧背景色 */
}

.main-content {
  flex: 1; /* 右侧自适应宽度 */
  background-color: #e1e1e1; /* 右侧背景色 */
}
```

### Grid 布局

```css
.container {
  display: grid;
  grid-template-columns: auto 1fr;
}

.sidebar {
  width: 300px;
  background-color: #f1f1f1;
}

.main-content {
  background-color: #e1e1e1;
}
```

### Table 布局

```css
.container {
  display: table;
  table-layout: fixed; /* 固定设置了宽度的列 */
}

.sidebar {
  width: 300px;
  display: table-cell;
  background-color: #f1f1f1;
}

.main-content {
  display: table-cell;
  background-color: #e1e1e1;
}
```

### 浮动布局

```css
.container {
  width: 1000px;
  height: 500px;
}

.sidebar {
  width: 300px;
  height: 100%;
  float: left;
  background-color: #f1f1f1;
}

.main-content {
  width: calc(100% - 300px);
  height: 100%;
  float: left;
  background-color: #e1e1e1;
}
```
