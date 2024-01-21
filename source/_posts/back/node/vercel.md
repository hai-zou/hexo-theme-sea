---
title: Vercel Serverless 部署 Node API
date: 2023-06-18
categories: 
  - 后端
tags:
  - Node
---

## 什么是 Vercel？

`Vercel` 是一个面向现代 Web 应用程序的全球托管平台。

- 从开发到生产，Vercel 的内置 CI/CD 可以轻松自动化您的工作流程，从而简化协作。
- 专为 Web 设计的无服务器存储
- Vercel 与 Github 仓库关联，当仓库代码有变动的时候，就会自动触发 Vercel 的部署。
- 支持自定义域名
- 支持很多前端框架，例如 `next.js`，`vitepress` 等。
- 支持 Serverless Function，可以很方便的写一些后端 API 接口。

## 什么是 Serverless？

`Serverless` 又叫无服务器，是一种计算模型，这种模型使开发人员能够构建和运行应用程序而无需管理底层的服务器基础设施。
在传统的服务器模型中，开发人员需要自行购买、配置和管理服务器来运行应用程序。
而在 Serverless 模型中，开发人员只需关注应用程序的代码逻辑，而不需要担心服务器的管理。

Vercel 提供了 [Serverless Function](https://vercel.com/docs/concepts/functions/serverless-functions)，而且支持各种前端框架的 Serverless 部署解决方案。

## Vercel 如何部署 Node Api

1. 初始化一个 Node 项目，使用 Express 框架

```bash
npm init -y

npm install express
```

2. 在 `/api` 目录下创建一个文件 `index.js`

```js
import express from "express";

const app = express();

app.get("/api", (req, res) => {
    res.end(`Hello! Serverless`);
});

app.get("/api/item/:slug", (req, res) => {
    const { slug } = req.params;
    res.end(`Item: ${slug}`);
});

export default app;
```

3. 在根目录中创建一个文件 `vercel.json`，添加一个 rewrite，将所有流量都导向 `index.js` 文件。

```json
{
    "rewrites": [{ "source": "/api/(.*)", "destination": "/api" }]
}
```

## 部署到 Vercel 平台

1. 使用自己的 Github 账号 登陆 [Vercel](https://vercel.com/)
2. 在 Overview 中点击 Add New Project 创建一个项目。![](/images/vercel_4.webp)
3. 选择你需要托管的 node 项目，点击 import 。![](/images/vercel_5.webp)
4. 配置你的项目，都使用默认，然后点击 Deploy 部署就可以了。![](/images/vercel_6.webp)

## 或通过 Vercel CLI 部署

1. 安装 vercel cli

```bash
npm i -g vercel
```

2. 登录 vercel 账户

```bash
vercel login
```

3. 部署，运行以下命令。Vercel CLI 将指导您完成部署流程

```bash
vercel
```

> 尽量在本地调试完成之后再发布代码，避免一顿操作之后发布报错。
> 以下是调试需要用到的命令：

```bash
# 运行
vercel dev

# 打包
vercel build
```

## 自定义域名

> 需要事先花个十几块钱购买一个域名

1. 找到刚刚创建的 Vercel 项目中的 Settings，设置 Domains
2. 把自己的域名填上去，例如 `blog.luckyzh.cn`，点击 Add，然后会提示报错，因为还没有解析域名。![](/images/vercel_1.webp)
3. 可以看到这里提供了两种方式，这里演示第一种 CNAME（Recommended），添加一条记录，也就是解析一个子域名。
4. 在购买域名的平台，找到域名控制台，点击域名解析，添加记录。![](/images/vercel_2.webp)
5. 按照之前生成的信息对应填入就可以了。![](/images/vercel_3.webp)
6. 返回站点就可以看到已经配置成功了！
