---
title: 如何管理多个 Git 身份
date: 2024-04-17 09:52:43
tags:
  - Git
---

## 前言
不知道大家有没有这样一个困扰：在同一台设备下开发公司项目和个人项目需要频繁切换 git 身份，一不小心忘记切换，就会导致项目中的git提交信息混乱。

那么如何避免这种情况发生呢，这里提供两种方案：

## 方案一
在项目中单独配置 git 身份，找到路径 `.git/config`，添加以下内容
```bash
[user]
  name = xxx
  email = xxx@xx.com
```
缺点：该配置是保存在本地，重新拉取项目后会丢失

## 方案二
给文件夹下的所有项目创建一个 git 配置文件

例如，我有以下两个目录：
```bash
E:/Code
├── work # 工作项目
│   ├── project1
│   └── project2
└── hai # 个人项目
    ├── project1
    └── project2
```

首先给这两个文件夹创建单独的配置文件
```bash
# E:/Code/work/.gitconfig-work
[user]
  name = xxx
  email = xxx@wrok.com
```
```bash
# E:/Code/hai/.gitconfig-hai
[user]
  name = xxx
  email = xxx@hai.com
```

然后修改 git 全局配置，做一下文件夹和配置文件的映射，git 全局配置路径一般位于 `C:\Users\YourUsername\.gitconfig`
```bash
[includeIf "gitdir:E:/Code/work"]
  path = E:/Code/work/.gitconfig-work

[includeIf "gitdir:E:/Code/hai"]
  path = E:/Code/hai/.gitconfig-hai
```

done!

结果：只要你的项目是在工作目录下，就是使用的工作的 git 身份，项目放在个人目录下，就是使用的个人的 git 身份。

## 结语
假如你已经在项目中使用错误的 git 身份提交代码，不用担心，看完这篇文章 [为什么你的 GitHub Contributions 没有被正确统计](/git/github-contribute/)，相信你会知道如何补救的。