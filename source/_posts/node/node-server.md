---
title: 搭建一个简单的 Node 服务器
date: 2022-11-26
tags:
  - Node
---

## 项目搭建

1. 初始化一个新的 Node.js 项目

```bash
npm init -y
```

2、安装 Express 作为 Web 框架，使用 cors 处理跨域问题

```bash
npm install express cors
```

3、创建入口文件 `app.js`，添加基本的路由和处理程序

```javascript
const express = require("express");
const app = express();

// 路由和处理程序
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

4. 启动服务器

```bash
node app.js
```

如果一切顺利，你将在终端中看到消息 "Server is running on port 3000"，这表示你的服务器已经成功启动。

在浏览器中访问 `http://localhost:3000`，应该能够看到 "Hello, World!" 的消息。

## 配置跨域

```javascript
const cors = require("cors");

/**
 * 启用所有cors请求
 * 详细配置参考：https://github.com/expressjs/cors
 */
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
```
