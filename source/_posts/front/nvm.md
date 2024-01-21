---
title: NVM 的安装与使用
date: 2022-01-06
categories: 
  - 前端
---

## 简介

Node 版本管理工具，可以用来安装或切换不同版本的 node.js

## 安装

选择 `.exe` 文件，下载后直接点击安装，安装路径不可有空格或中文。
<https://github.com/coreybutler/nvm-windows/releases>

![](/images/nvm_1.webp)

## 基本命令

```bash
# 查看当前的版本
nvm version

# 查看本地已经安装的所有 node 版本
nvm list

# 查看网络可以安装的 node 版本
nvm list available

# 在已有的 node 版本中切换到对应的版本
nvm use <version>

# 安装指定的node版本（查询出的可下载的版本）
nvm install <version>

# 卸载指定的node版本
nvm uninstall <version>

# 查看更多命令
nvm --help
```

## 设置镜像源

下载 node 默认使用的是国外的镜像源，设置成淘宝镜像，提升下载速度

```bash
# https://npm.taobao.org/mirrors/node/
nvm node_mirror <node_mirror_url>

# https://npm.taobao.org/mirrors/npm/
nvm npm_mirror <npm_mirror_url>
```
