# Hexo Theme Sea
一款简约的 Hexo 主题

## 在线预览
- Example: <https://hai-zou.github.io/hexo-theme-sea/>
- My Blog: <https://blog.izou.top/>

## 特性

- 响应式，适配移动端
- 国际化，支持中英文
- 主题切换，支持暗黑主题模式
- 评论（Waline）
- 搜索（Algolia）

## 应用

1. 安装 npm 包

    ```bash
    npm i hexo-theme-sea
    ```

2. 应用主题

    ```yml
    theme: sea
    ```

## 主题配置

在根目录下创建一个 `_config.sea.yml` 主题配置文件

### 菜单栏

```yml
menu:
  - name: # 名称
    url: # 链接
```

### 评论

```yml
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

### 搜索

```yml
search:
  enable: # 是否启用
  type: # algolia

# Docsearch https://docsearch.algolia.com/apply/
algolia:
  appId: 
  apiKey: 
  indexName: 
```

### 友链

```yml
friends:
  - name: # 名称
    avatar: # 头像
    link: # 站点地址
    desc: # 描述
```

### 社交链接

```yml
socialLink:
  - name: # 名称
    link: # 跳转链接
```

### Footer

```yml
footer:
  builtUpTime: # 建站时间 2020-05-20 13:14:00
```

### 主题色

```yml
primaryColor: '#10b981'
```

## 页面配置

### 代码高亮

移除原先的 `highlight`，改为使用 `prismjs`

v7.0.0以下：

```yml
# _config.yml
highlight:
  enable: false
prismjs:
  enable: true
  preprocess: true
  line_number: true
  line_threshold: 0
  tab_replace: ''
```

v7.0.0及以上：

```yml
# _config.yml
syntax_highlighter: prismjs
prismjs:
  preprocess: true
  line_number: true
  line_threshold: 0
  tab_replace: ''
```

### 文章基本信息

在每个 `md` 文件头部添加以下配置

```yml
title: # 文章标题
date: # 文章发布日期 2024-03-27 09:22:23
categories: # 文章分类
tags: # 文章标签
comment: # 是否展示评论，默认 true
```

### 内置页面

- 归档页面：/archives/
- 分类页面：/categories/
- 标签页面：/tags/

### 友链模块

在页面中使用 `{% friends %}`，友链列表在 `_config.sea.yml` 中配置

### 自定义容器

```md
{% note info %}
This is an info box.
{% endnote %}

{% note warning %}
This is an info box.
{% endnote %}

{% note danger %}
This is an info box.
{% endnote %}
```
