---
title: husky + eslint 实现代码提交检测
date: 2022-10-19
tags:
  - Git
---

## 一、配置 ESlint

1.1 安装 eslint

```bash
npm install eslint -D
```

1.2 初始化 eslint，生成配置文件

```bash
npx eslint --init
```

1.3 在编辑器安装`ESlint`插件

1.4 通过执行命令检测文件代码规范

```bash
# ./ 为需要检测的文件路径
npx eslint ./
```

## 二、配置 husky

2.1 安装 husky

```bash
npm install husky -D
```

2.2 在 package.json 中加入 prepare 脚本，每次在 npm i 安装完依赖后都会执行这个命令

```bash
npm set-script prepare "husky install"
npm run prepare
```

2.3 添加 pre-commit 钩子

```bash
npx husky add .husky/pre-commit "npx eslint ./"
```

运行完之后会在 .husky 文件下新增 pre-commit 文件

若 pre-commit 文件生成失败，可手动添加

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx eslint ./
```

## 三、配置 commit 提交规范

> - 完成以上两项配置就已经可以对提交代码进行检测
> - 以下内容是对 commit 提交信息的检测，需要对 commit 提交规范 有了解
> - 例如："feat: 新增功能"，"fix: 修复 bug"

3.1 安装 commitlint

```bash
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

3.2 新增 commitlint.config.js 文件

```bash
# 注意：生成的文件格式编码如果不是UTF-8的，需要手动改下
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

3.3 新增 commit-msg 钩子

```bash
npx husky add .husky/commit-msg  "npx --no -- commitlint --edit ${1}"
```

运行完之后会在 .husky 文件下新增 commit-msg 文件

若 commit-msg 文件生成失败，可手动添加

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
```
