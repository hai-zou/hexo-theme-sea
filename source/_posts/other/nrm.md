---
title: NRM 的安装与使用
date: 2022-01-08
tags:
  - Other
---

## 简介

nrm 是一个 Node.js 的 npm registry 管理工具，它允许你在不同的 npm registry 之间切换，方便你在不同的网络环境下使用 npm。
下面是 nrm 的安装和使用方法：

## 安装 nrm

在终端中执行以下命令来全局安装 nrm：

```bash
npm install nrm -g
```

## 使用 nrm

```bash
# 查看可选源，带 * 表示当前源
nrm ls

# 切换源（registry 为源名称）
nrm use <registry>

# 添加源（registry 为源名称，url为源地址）
nrm add <registry> <url>

# 删除源
nrm del <registry>

# 测试源速度
nrm test <registry>
```

不使用 nrm 查看和切换源的方法

```bash
# 查看当前使用的 npm 源
npm get registry

# 设置 npm 源地址
npm config set registry <url>
```
