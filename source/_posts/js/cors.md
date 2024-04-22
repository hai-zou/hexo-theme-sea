---
title: 解决跨域的几种方式
date: 2023-05-12
categories: 
  - 前端
tags:
  - JavaScript
---

## JSONP

利用`script`标签可以跨域加载资源的特性，通过动态创建一个`script`标签，然后将响应数据作为回调函数的参数返回，从而实现跨域请求资源。该方式只支持 GET 请求方式，且不支持发送 POST 等其它请求。

客户端代码：

```js
const script = document.createElement("script");
script.src = "http://example.com/data.js?callback=handleResponse";
document.body.appendChild(script);

function handleResponse(data) {
    console.log(data);
}
```

服务端应返回如下格式的响应数据：

```js
handleResponse({ status: "ok", data: { foo: "bar" } });
```

客户端创建一个`script`标签并添加到 DOM 中，指定 src 属性为带有 callback 参数的请求 URL，服务端会将响应数据以回调函数的参数形式返回，从而实现获取数据的目的。当响应数据返回后，客户端自行定义的回调函数会被触发。

## CORS（跨域资源共享）

该方式需要在服务端进行配置，通过设置响应头 Access-Control-Allow-Origin 允许跨域访问的来源，可以实现跨域请求资源。此方法更为安全，且支持所有请求方法。

客户端代码：

```js
fetch("http://example.com/data.json", {
    method: "GET",
    mode: "cors",
})
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
```

服务端代码：

```js
// 允许指定来源的跨域访问，例如允许从http://localhost:8080域名下访问
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
```

客户端使用`fetch`函数发送跨域请求，通过设置`mode`为`cors`来表明跨域方式。服务端使用 Node.js 的 Express 框架，通过设置响应头的`Access-Control-Allow-Origin`允许从指定来源跨域访问。当服务端成功处理请求并响应数据后，客户端通过`response.json()`将响应体解析为 JSON 格式的数据。

## 代理

在同源域名下，通过服务端代理请求目标网站的资源，再将响应结果返回给客户端，从而实现跨域访问目标资源。该方式相对复杂，但是可以实现所有请求方法。

前端通过代理方式实现跨域，可以通过配置一个 Node.js 的 Express 代理服务器，然后在前端发送请求时，将请求发送至代理服务器，代理服务器再将请求转发至目标服务器，获取响应后再返回给前端。具体步骤如下：

1. 创建一个 Node.js 的 Express 代理服务器。

```js
const express = require("express");
const http = require("http");
const app = express();

const PORT = 3000;
const TARGET_SERVER = "http://example.com";

// 转发请求到目标服务器
app.use("/", (req, res) => {
    const targetUrl = TARGET_SERVER + req.url;
    const proxy = http.request(targetUrl, (response) => {
        response.pipe(res);
    });

    req.pipe(proxy);
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
```

在上面的例子中，我们创建了一个代理服务器，运行在`3000`端口上，该服务器可以接收任意请求并将请求转发到目标服务器`http://example.com`上，然后将响应返回客户端。

2. 在前端通过代理服务器发送请求

```js
fetch("/api/data")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
```

在前端使用 fetch 函数来发送需要跨域的请求，由于代理服务器监听的是 3000 端口，所以这里的请求 URL 应该是代理服务器的路径/api/data。

上述方法仅在开发环境下使用，而不适合在生产环境中使用，因为将会涉及更多的安全问题，例如如何保证用户的数据处于安全的状态。
