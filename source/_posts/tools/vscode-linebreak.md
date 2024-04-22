---
title: VSCode 换行符问题
date: 2023-07-04
tags:
  - VSCode
---

## 换行符格式

在 [Visual Studio Code (VSCode)](https://code.visualstudio.com/) 中，换行符问题通常涉及两种常见的换行符格式：CRLF（Carriage Return Line Feed）和 LF（Line Feed）。

默认情况下，VSCode 在不同操作系统上使用适当的换行符格式。例如，在 Windows 上，默认使用 CRLF 格式，而在 macOS 和 Linux 上，默认使用 LF 格式。

## core.autocrlf

`core.autocrlf` 是 Git 的配置选项之一，是否自动转换换行符。该配置有以下三种取值：

- `true`：在提交文件时，Git 会自动将换行符转换为操作系统默认的换行符格式（CRLF 或 LF）。在拉取文件时，Git 会自动将换行符转换为当前操作系统的换行符格式。
- `false`：Git 不会进行换行符的自动转换。提交的文件将保留其原始换行符格式。拉取文件时，Git 也不会进行换行符的转换。
- `input`：在提交文件时，Git 会自动将换行符转换为 LF 格式。在拉取文件时，Git 不会进行换行符的转换。

## 遇到的问题

团队开发中因为要统一格式，所以都会配置 ESlint 格式校验，当两个不同操作系统的人一起开发，难免会遇到换行符格式的问题。

## 怎么解决？

1. 将 Git 配置 `core.autocrlf` 修改为 false

```bash
git config --global core.autocrlf false
```

2. 修改 VSCode 换行符配置
> 文件 - 首选项 - 设置 - 搜索 eol - 修改 eol 为 `\n`(LF) 或者改为 `\r\n`(CRLF)

**友情提示**

> 如果项目已经拉下来了，并且 ESLint 有一堆的报错。
> 直接把项目删除，然后执行以上操作，再拉取项目就没问题了
