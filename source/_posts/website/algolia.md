---
title: 博客搭建 — Algolia DocSearch 实现站点搜索
date: 2023-07-01
categories:
  - WebSite
tags:
  - Vue
---

## 关于 Algolia DocSearch

[Algolia DocSearch](https://docsearch.algolia.com/) 帮助您在站点和应用程序上实现高效、灵活和有见地的搜索。为您的用户提供快速而丰富的搜索体验。

DocSearch 分为爬虫和前端库

- 爬网由 Algolia 爬虫处理，默认情况下计划每周运行一次，然后您可以自己触发新的爬网并直接从爬虫界面监控它们，该界面还提供了一个实时编辑器，您可以在其中维护您的配置。
- 前端库建立在 Algolia 自动完成之上，并通过其模式提供身临其境的搜索体验。

DocSearch 会定期爬取你网站的内容并分析，并对标题和内容建立索引，用户输入关键字查询，匹配站点内容然后将结果返回给客户端。

DocSearch 提供了一套精美的样式，以及完善的 api，只需要少量的代码就能实现一个强大的搜索功能。

## 快速开始

1. 安装 Docsearch 的 js 库

```bash
yarn add @docsearch/js@3
# or
npm install @docsearch/js@3
```

2. 封装一个 Search 组件

```html
<div id="docsearch"></div>
```

```js
import { onMounted } from "vue";

import docsearch from "@docsearch/js";
import "@docsearch/css";

onMounted(() => {
  docsearch({
    container: "#docsearch",
    appId: "YOUR_APP_ID",
    indexName: "YOUR_INDEX_NAME",
    apiKey: "YOUR_SEARCH_API_KEY",
  });
});
```

3. 在页面上使用 Search 组件，已经能够看到基本的样式

## 申请 DocSearch 服务

1. 前往 [DocSearch Apply](https://docsearch.algolia.com/apply)，填写网站地址，邮箱，仓库地址，提交申请。![](https://image.luckyzh.cn/images/algolia_1.webp)
2. 提交申请之后会收到一封邮件，表示他们已经收到申请并很快会回复！![](https://image.luckyzh.cn/images/algolia_2.webp)
3. 等几分钟之后就会收到处理完成的邮件，里面有我们需要的 `appId`, `apiKey`, `indexName`，将它们填入组件中。![](https://image.luckyzh.cn/images/algolia_3.webp)
4. 前往 [爬虫后台](https://crawler.algolia.com/admin), 如果 Records 有数量，说明已经爬取成功了！
   如果没有也可以点击 Editor，进入查看自己的域名有没有填写正确。![](https://image.luckyzh.cn/images/algolia_4.webp)

## 最终效果

![](https://image.luckyzh.cn/images/algolia_5.webp)
