---
title: 用 Node.js 实现一个上传图片接口
date: 2023-07-15
tags:
  - Node
---

## 初始化项目

在当前目录下创建一个名为 `upload-image-api` 的新文件夹，并初始化一个包含默认设置的 `package.json` 文件。

```bash
mkdir upload-image-api && cd upload-image-api
npm init -y
```

## 安装依赖

`express` 是一个流行的 Node.js Web 框架；`multer` 是一个用于处理文件上传的中间件。

```bash
npm install express multer
```

## 创建上传图片接口

在根目录下创建一个 `index.js` 入口文件，并实现简单的上传图片逻辑。

```js
const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// 设置存储路径和文件名称
const storage = multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
        );
    },
});

// 创建文件上传中间件
const upload = multer({ storage: storage });

/**
 * 处理文件上传请求
 * upload.single('image') 函数中 `image` 为接收文件的参数名
 */
app.post("/upload", upload.single("image"), (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    res.json({ filePath: filePath });
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

## 测试上传图片接口

- 启动服务，在终端中执行以下命令：

```bash
node index.js
```

- 使用 `Postman` 或其他工具来测试图片上传接口。
- 向 `http://localhost:3000/upload` 发送 `POST` 请求，并以 `multipart/form-data` 格式附加一个名为 `image` 的字段来上传图片。
- 如果请求成功，你将收到一个包含上传后的文件路径的 JSON 响应。
