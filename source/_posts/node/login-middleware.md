---
title: Node.js 写一个登录中间件
date: 2022-12-01
categories:
  - 后端
tags:
  - Node
---

## 导语

登录中间件的作用是确保只有经过身份验证的用户能够访问受限资源。
本文将介绍如何使用 Node.js 编写一个简单而有效的登录中间件，帮助你保护你的应用程序。

## 创建项目

初始化一个新的 Node.js 项目

```bash
npm init -y
```

## 安装依赖

我们将使用 `express` 作为我们的 Web 框架，`jsonwebtoken` 用于生成和验证 JSON Web Tokens（JWT）

```bash
npm install express jsonwebtoken
```

## 创建登录中间件

在项目文件夹中创建一个新的文件，命名为 `authMiddleware.js`。在该文件中，我们将编写我们的登录中间件代码。

```js
// authMiddleware.js

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // 从请求头中获取JWT
  const token = req.headers.authorization;

  if (!token) {
    // 如果没有提供JWT，则返回未授权的错误
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // 验证JWT并提取用户信息，使用与生成JWT时相同的密钥替换'secretKey'
    const decoded = jwt.verify(token, "secretKey");

    // 将用户信息存储在请求中，以供后续中间件或路由处理程序使用
    req.user = decoded;

    // 调用下一个中间件或路由处理程序
    next();
  } catch (err) {
    // 如果JWT验证失败，则返回未授权的错误
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
```

## 使用

在需要进行登录验证的路由或中间件中，使用以下代码将 authMiddleware 导入并应用：

```js
const authMiddleware = require("./authMiddleware.js");

// 在需要进行登录验证的路由或中间件中使用 authMiddleware
app.get("/protected", authMiddleware, (req, res) => {
  // 这里是受保护的资源，只有登录用户才能访问
  res.json({ message: "Protected resource" });
});
```

## 总结

在上述示例中，中间件首先从请求头中获取 JWT（通常放在 `Authorization` 标头中）。然后，它使用提供的密钥（与生成 JWT 时相同）验证 JWT 的有效性。如果验证成功，它将从 JWT 中提取用户信息，并将其存储在请求对象的 `user` 属性中，以便后续中间件或路由处理程序使用。如果 JWT 验证失败或未提供 JWT，则返回未授权的错误响应。

请注意，上述示例使用了简化的密钥（`secretKey`）。在实际应用中，请使用更长且安全的密钥，并将其存储在环境变量或配置文件中，而不是直接硬编码在代码中。

使用该中间件，你可以轻松验证用户是否已登录，并保护需要登录才能访问的资源。
