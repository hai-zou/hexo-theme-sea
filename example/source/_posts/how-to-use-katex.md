---
title: 如何使用 Katex 渲染数学公式
date: 2024-08-28 10:31:53
categories:
  - Doc
recommend: true
tableOfContents: true
---

## 1、安装 `hexo-math`

```bash
npm i hexo-math --save
```

## 2、配置 `_config.yml`

详细配置参考 <https://github.com/hexojs/hexo-math>

```yml
math:
  katex:
    css: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css'
  mathjax:
    css: false
```

## 3、使用示例

**行内公式：**

```md
这是一个行内公式：{% katex %}E=mc^2{% endkatex %}。
```

效果：
这是一个行内公式：{% katex %}E=mc^2{% endkatex %}。

**块级公式：**

```md
这是一个块级公式：

{% katex '{"displayMode": true}' %}
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
{% endkatex %}
```

效果：
这是一个块级公式：
{% katex '{"displayMode": true}' %}
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
{% endkatex %}