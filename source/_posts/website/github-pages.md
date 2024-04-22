---
title: 博客搭建 — GitHub Pages 部署
date: 2023-06-17
categories:
  - WebSite
tags:
  - GitHub
---

## 关于 GitHub Pages

GitHub Pages 是一项静态站点托管服务，它直接从 GitHub 上的仓库获取 HTML、CSS 和 JavaScript 文件，通过构建过程运行文件，然后发布网站。

本文最终效果是搭建出一个域名为 `https://<user>.github.io` 的网站

## 创建 GitHub Pages 站点仓库

1. 输入仓库名称，必须命名为 `<user>.github.io`，`<user>`是你的用户名
2. 选择仓库可见性：Public（公开）
3. 选择 “使用 README 初始化此存储库”
4. 创建仓库
5. 将需要部署的静态页面代码提交到这个仓库

## 配置 GitHub Pages

1. 在仓库下找到设置 `Settings`，在边栏部分找到 `Pages`
2. 选择仓库分支；选择 `index.html` 文件所在路径，一般是 root
3. 点击保存，过几分钟刷新下页面 ![](https://image.luckyzh.cn/images/github-pages_1.webp)
4. 点击 Visit site 访问

## Vue 项目的打包部署流程

其实原理是一样的，在 Vue 项目下运行 `npm run build` 将打包后的 `dist` 文件发布到 GitHub Pages 站点仓库。
但是过程比较繁琐，可以使用脚本来实现自动化部署

> 自动发布脚本中，仓库 `origin` 选择 SSH 的地址，例如 `git@github.com:user/repo.git`。
>
> 不过在这之前需要先在 GitHub 上添加 [ssh 公钥](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh)

1. 新建一个 `deploy.sh` 文件

```bash
#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
npm run build

# 进入待发布的目录
cd dist

git init
git add -A
git commit -m 'ci: deploy'

# 部署到 https://<user>.github.io
git push -f git@github.com:hai-zou/hai-zou.github.io.git master

cd -
```

2. 在 package.json 中添加一条命令行

```json
{
  ...
  "scripts": {
    "deploy": "bash scripts/deploy.sh"
  },
  ...
}
```

3. 最后运行 `npm run deploy` 就能够把代码提交到 Github Pages 仓库

### 注意

> 如果你的项目使用的是 history 模式路由，在生产环境下，访问非根路径的页面就会得到一个 404 错误。
> 这是因为浏览器在访问 `https://example.com/user` 获取不到 html 资源。
> 但是使用 hash 模式就没有这个问题，`https://example.com/#/user` 哈希字符（#）后面那部分 url 不会被发送到服务器，所以可以直接请求到根路径上的`index.html`文件。
>
> 可以查看官方给出的 [解决办法](https://router.vuejs.org/zh/guide/essentials/history-mode.html#html5-%E6%A8%A1%E5%BC%8F)

**GitHub Pages 上如何解决这个问题呢？**

GitHub Pages 站点在访问错误路径的时候会跳转到 404 页面，利用这个机制，我们可以在根目录下创建一个跟 `index.html` 一样的 `404.html` 文件，
这样在访问错误路径的时候也能请求到根路由的资源，然后通过框架内部的路由机制进行跳转

修改一下发布脚本，在进入发布目录之后添加一行命令，将 `index.html` 的内容 copy 到 `404.html`

```bash
# 进入待发布的目录
cd dist

# 这里是处理vue使用history模式路由，导致页面出现404问题
cp index.html 404.html
```
