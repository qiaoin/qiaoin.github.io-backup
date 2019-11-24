---
title: 线性代数的本质
---

这里直接参考 $LaTeX$ 生成的 PDF 吧。

`vuepress` 对 $LaTeX$ 的支持非常差，在 `config.js` 中配置的 `markdown` 配置都是在编译时便解析完成的，因此配置 `markdown-it-katex` 后可能会导致编译时间特别长（是非常长），而且电脑风扇一直在嗡嗡嗡的转，一度以为电脑出了什么问题。遂作罢，简单的行内公式使用官方插件 [`vuepress-plugin-mathjax`](https://vuepress.github.io/en/plugins/mathjax/) 进行渲染，线性代数学习中的矩阵等复杂公式还是使用 $LaTeX$ 来完成。

假设 $y >= 0$ , 而 $[\log x]$ 表示 $\log x$ 的整数部分, 设:

$$\Phi (y) = \frac {1} {2 \pi i} \int_{2 - i \infty}^{2 + i \infty} \frac {y^{\omega} \mathrm{d} \omega} {\omega \left(1 + \frac {\omega} {(\log x)^{1.1}}\right)^{[ \log x ] + 1}}, x > 1$$

显见， 当 $0 <= y <= 1$ 时， 有 $\Phi(y) = 0$. 对于所有 $y >= 0$, 则 $\Phi(y)$ 是一个非减函数.

当 $\log x>= 10^4$ 及 $y>= e^{2{(\log x)}^{-0.1}}$ 时， 则有:

$$1 - x^{- 0.1} <= \Phi (y) <= 1$$
