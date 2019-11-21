---
title: "Notes on Courant's Introduction to Calculus and Analysis, Vol. 1, 1999th Edition"
categories: [Book Notes]
tags: [calculus, analysis]
---

Here are the notes I took on [Richard Courant](https://en.wikipedia.org/wiki/Richard_Courant) and [Fritz John](https://en.wikipedia.org/wiki/Fritz_John)'s [*Introduction to Calculus and Analysis, Vol. 1*, 1999th Edition](https://www.amazon.com/dp/354065058X).

{% include toc %}

## 1. Introduction

### 1.1 The Continuum of Numbers

#### e. Inequalities

##### Triangle Inequality

$$
|a+b| \leq |a| + |b|
$$

Or, by letting $a = \alpha - \lambda$, $b = \lambda - \beta$, we have

$$
|\alpha - \beta| \leq |\alpha - \lambda| + |\lambda - \beta|
$$

This inequality is called *triangle* because it has a geometrical interpretation: The direct distance from $\alpha$ to $\beta$ is less than or equal to the sum of the distances via a third point $\lambda$.

##### The Cauchy-Schwarz Inequality

$$
(\sum_{i=1}^{n} a_i b_i)^2 \leq (\sum_{i=1}^{n} a_i^2)(\sum_{i=1}^{n} b_i^2)
$$

Proof: For any real variable $t$, we have

$$
0 \leq \sum_{i=1}^{n}(a_i + tb_i)^2
$$

By expanding the right hand side, we have

$$
0 \leq A + 2Bt + Ct^2
$$

where $A = \sum_{i=1}^{n} a_i^2$, $B = \sum_{i=1}^{n} a_i b_i$, $C = \sum_{i=1}^{n} b_i^2$.

Because $C > 0$, if the quadratic expression is greater than or equal to zero, the below inequality must hold.

$$
B^2 \leq AC
$$

By expanding it, we get the [Cauchy-Schwarz inequality](https://en.wikipedia.org/wiki/Cauchy%E2%80%93Schwarz_inequality).

In a special case $n = 2$, if we choose $a_1 = \sqrt{x}$, $a_2 = \sqrt{y}$, $b_1 = \sqrt{y}$, $b_2 = \sqrt{x}$, we have

$$
\sqrt{xy} \leq \frac{x + y}{2}
$$

This inequality means that the *geometric mean* of $x$ and $y$ never exceeds their arithmetic mean:

{% include image name="geometric-arithmetic-mean.png" width="80%" %}