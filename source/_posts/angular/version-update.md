---
title: 前端如何检测项目中新版本的发布？
date: 2024-04-23 15:51:23
categories:
  - 前端
tags:
  - Angular
---

## 前言

你是否也曾遇到过这种情况，每次发完版之后都还会有用户反馈问题没有被修复，一顿排查之后发现他用的还是旧的版本。

> 用户：在 XX 页面 XX 字段还是不展示
> 我：刷新下页面
> 用户：刷新了啊
> 我：强刷一下，`Ctrl + F5`

这一切都要归咎于 [浏览器缓存](https://www.google.com/search?q=%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98)，那么如何解决这一痛点呢？这篇文章将介绍如何检测版本变更并通知用户刷新页面。

## 实现思路

1. 在项目构建（build）的时候，生成一个 `version.json` 版本信息文件，路径：`dist/version.json`
2. 在切换路由的时候去请求服务器的 `version.json` 文件与本地缓存的版本信息做一个对比

## 准备工作

本文使用的是 `Angular` 技术栈，但是本质上还是使用的 `webpack` 去构建，所以万变不离其宗！

- angular | v17
- @angular-builders/custom-webpack | v17

## Angular 自定义 Webpack 配置

1. 安装 `@angular-builders/custom-webpack`

```bash
npm install @angular-builders/custom-webpack -D
```

2. 使用自定义配置运行开发服务器：~~@angular-devkit/build-angular~~ -> @angular-builders/custom-webpack

```json
"architect": {
  ...
  "build": {
    "builder": "@angular-builders/custom-webpack:browser",
    "options": {
      "customWebpackConfig": {
        "path": "./extra-webpack.config.ts"
      },
      ...
    }
  },
  "serve": {
    "builder": "@angular-builders/custom-webpack:dev-server",
    "options": {
      "browserTarget": "my-project:build"
    }
  }
  ...
}
```

3. 配置 `extra-webpack.config.ts`

```ts
import * as webpack from "webpack";

export default (config: webpack.Configuration) => {
  config.plugins = [
    ...config.plugins,
    // 这里配置插件
  ];
  return config;
};
```

## 自定义版本信息插件

1. 创建插件 `version-plugin.js`，参考文档 [creating-a-plugin](https://webpack.js.org/contribute/writing-a-plugin/#creating-a-plugin)

```js
const fs = require("fs");
const path = require("path");

class VersionPlugin {
  constructor({ version }) {
    this.version = version;
  }
  apply(compiler) {
    compiler.hooks.done.tap("VersionPlugin", (stats) => {
      const versionInfo = {
        version: this.version,
        buildTime: new Date().toISOString(),
      };
      const outputPath = stats.compilation.options.output.path;
      const versionFilePath = path.resolve(outputPath, "version.json");
      fs.writeFileSync(versionFilePath, JSON.stringify(versionInfo, null, 2));
      console.log("Version file generated successfully!");
    });
  }
}
module.exports = VersionPlugin;
```

2. 在 `extra-webpack.config.ts` 中使用 `VersionPlugin` 插件

```ts
import * as webpack from "webpack";
import * as VersionPlugin from "./version-plugin.js";

export default (config: webpack.Configuration) => {
  const version = new Date().getTime();
  config.plugins = [
    ...config.plugins,
    // 将版本号写入全局变量
    new webpack.DefinePlugin({
      "process.env.VERSION": JSON.stringify(version),
    }),
    // 创建 version.json 放入 dist 目录
    new VersionPlugin({ version: version }),
  ];
  return config;
};
```

> 运行 `npm run build` 检测 `version.json` 文件是否写入成功！

## 检测变更并通知

我这里选择的是在用户切换路由的时候去检测，当然也可以选择其它的时机，例如开一个定时器，等。

1. 在 `app.component.ts` 中去监听路由变化

```ts
import { Router, NavigationStart } from "@angular/router";

export class AppComponent {
  constructor(private router: Router) {
    this.onRouterChange();
  }

  onRouterChange(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.checkVersion();
      }
    });
  }
}
```

2. 实现检测版本的方法，请求远程服务器的 `version.json` 版本信息与项目中的全局变量 `process.env.VERSION` 做对比

```ts
checkVersion(): void {
  if (!environment.production) {
    return;
  }
  fetch('./version.json')
    .then(response => response.json())
    .then(versionInfo => {
      if (versionInfo.version !== process.env.VERSION) {
        // TODO: 弹窗提示 或 直接刷新
        this.refresh();
      }
    })
    .catch(error => {
      console.error(error);
    });
}

refresh(): void {
  window.location.reload(true);
}
```

done!

## 结语
看到这里，希望能够给你提供一点思路，方法有很多种，也欢迎一起交流讨论！
