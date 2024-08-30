---
title: Mathjax
date: 2024-08-28 10:31:53
---

## how to use mathjax

1、Install `hexo-math`

```bash
npm i hexo-math --save
```

2、Examples

{% mathjax %}
\begin{aligned}
\mathrm{Perplexity}& =\frac1{\sqrt[K]{\prod_{i=1}^KP(W_i|W_{1:i-1})}} \\
& \overset{\text{同时取指数与对数}}{=} \exp\left(\log\left(\frac1{\sqrt[K]{\prod_{i=1}^KP(W_i|W_{1:i-1})}}\right)\right) \\
& \overset{\text{将幂次放到右上角}}{=} \exp\left(\log\left(\left(\prod_{i=1}^KP(W_i|W_{1:i-1})\right)^{-\frac1K}\right)\right) \\
& \overset{\text{提出对数式的幂次}}{=} \exp\Bigg(-\frac1K\sum_{i=1}^K\log(P(W_i|W_{1:i-1}))\Bigg) \\
& \overset{\text{用对数的计算公式}}{=} \exp\left(\frac1K\sum_{i=1}^K\log\frac1{P(W_i|W_{1:i-1})}\right)
\end{aligned}  \tag{11}
{% endmathjax %}

<br/>
<br/>

{% mathjax %}
\begin{aligned}&\mathrm{BP}=\left\{\begin{array}{ll}1&\quad\mathrm{if}\ c>r\\e^{(1-r/c)}&\quad\mathrm{if}\ c\leq r\end{array}\right..\\\\&\mathrm{BLEU=BP\cdot\exp\left(\sum_{n=1}^{N}w_{n}\log p_{n}\right).}\end{aligned} \tag{1}
{% endmathjax %}