---
title: 主题配置文档
date: 2025-06-09 18:20:35
categories:
  - Doc
excerpt: Hexo Theme Sea 主题详细配置文档
recommend: true
---

{% note info %}
在开始使用本主题之前，建议先仔细阅读 [Hexo 官方文档](https://hexo.io/zh-cn/docs/)，以确保你对 Hexo 的基本使用和配置方式有一定了解。
建议 Node 版本：v16+
建议 Hexo 版本：v6+
{% endnote %}

## 菜单配置

```yml _config.sea.yml
menu:
  - name: Posts # 名称
    url: /posts/ # 跳转链接
  - name: Categories
    url: /categories/
  - name: Tags
    url: /tags/
  - name: Archives
    url: /archives/
```

## 首页配置

> 首页展示分为个人信息和文章展示两个模块  
> 文章模块可配置展示 “推荐文章” 或者 “最近文章”，推荐文章需要在文章的 `Front-matter` 中配置 `recommend: true`

```yml _config.sea.yml
home:
  hero:
    name: # 名称
    intro: # 个人简介
    avatar: # 头像
  posts: recent | recommend # recent: 最新文章 | recommend: 推荐文章
```

## 社交媒体

```yml _config.sea.yml
socialLink:
  - name: Github # 名称
    link: https://github.com/hai-zou/hexo-theme-sea # 跳转链接
```

## 内置页面

### Posts 页面

> 主题自定义的一个展示所有文章的页面，支持分页。

```yml _config.sea.yml
articles:
  path: 'articles' # 路由
  per_page: 10 # 分页数
  order_by: -date # 文章排序
```

### 分类页面

> 访问 `/categories/` 查看所有分类

{% note warning %}
单个分类下的文章展示页由 Hexo 默认提供，在 `_config.yml` 中配置
{% endnote %}

```yml _config.yml
category_dir: categories
category_generator:
  per_page: 10
  order_by: -date
```

### 标签页面

> 访问 `/tags/` 查看所有标签

{% note warning %}
单个标签下的文章展示页由 Hexo 默认提供，在 `_config.yml` 中配置
{% endnote %}

```yml _config.yml
tag_dir: tags
tag_generator:
  per_page: 10
  order_by: -date
```

### 归档页面

{% note warning %}
归档页面由 Hexo 默认提供，在 `_config.yml` 文件中配置
{% endnote %}

```yml _config.yml
archive_dir: archives
archive_generator:
  enabled: true # 是否启用
  per_page: 20
  order_by: -date
```

## 搜索配置

```yml _config.sea.yml
search:
  enable: # 是否启用
  type: # algolia | pagefind

# Docsearch https://docsearch.algolia.com/apply/
algolia:
  appId: 
  apiKey: 
  indexName: 
```

## 评论配置

```yml _config.sea.yml
comment:
  enable: # 是否启用
  type: # waline | giscus

# Waline https://waline.js.org/
waline:
  serverURL:
  options: # 配置项参考：https://waline.js.org/reference/client/props.html

# Giscus https://giscus.app/zh-CN
giscus:
  repo:
  repoid:
  category:
  categoryid:
  mapping:
  term:
  reactionsenabled:
  emitmetadata:
  inputposition:
  loading:
```

## 自定义代码块

### 友链模块

1、配置数据：
```yml _config.sea.yml
friends:
  - name: # 名称
    avatar: # 头像
    link: # 站点地址
    desc: # 描述
```
2、使用：
```md friends.md
{% friends %}
```

### 作品模块

1、配置数据：
```yml _config.sea.yml
works:
  - name: # 名称
    desc: # 描述
    tags: # 标签
      - tag1
      - tag2
      - tag3
    link: # 链接
    cover: # 预览图
```
2、使用：
```md works.md
{% works %}
```

### 提示模块

```md xxx.md
{% note info %}
This is an info box.
{% endnote %}

{% note warning %}
This is an warning box.
{% endnote %}

{% note danger %}
This is an danger box.
{% endnote %}
```

展示效果：
{% note info %}
This is an info box.
{% endnote %}

{% note warning %}
This is an warning box.
{% endnote %}

{% note danger %}
This is an danger box.
{% endnote %}

## 代码高亮

> Hexo 默认提供两种：`highlight` 和 `prismjs`
> 本主题使用 `prismjs`, 需要在 `_config.yml` 中修改默认配置

**v7.0.0 以下版本**
```yml _config.yml
highlight:
  enable: false
prismjs:
  enable: true
  preprocess: true
  line_number: true
  line_threshold: 0
  tab_replace: ''
```

**v7.0.0 以上版本**
```yml _config.yml
syntax_highlighter: prismjs
prismjs:
  preprocess: true
  line_number: true
  line_threshold: 0
  tab_replace: ''
```

## 文章 Front-matter 配置

```yml xxx.md
title: # 文章标题
date: # 文章发布日期 2024-03-27 09:22:23
categories: # 文章分类
  - cate1
  - cate2
tags: # 文章标签
  - tag1
  - tag2
excerpt: # 摘要 或者 <!-- more --> 之前的文字将会被视为摘要
comments: # 是否展示评论，默认 true
sticky: # 置顶，按数值大小排序
permalink: # 覆盖文章的永久链接
published: # 文章是否发布
```

## 其它配置

```yml _config.sea.yml
# 站点图标
favicon: /favicon.ico # Favicon 图标

# Footer
footer:
  builtUpTime: 2020-05-20 13:14:00 # 建站时间

# 主题色
primaryColor: '#10b981'

# 目录
tableOfContents:
  enable: true # 默认启用
```