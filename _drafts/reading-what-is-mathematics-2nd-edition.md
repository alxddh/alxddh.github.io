---
title: "Reading What Is Mathematics?, 2nd Edition"
categories: [Book Notes]
tags: [mathematics]
---

Here are the notes I took on [*What is Mathematics?: An Elementary Approach to Ideas and Methods*, 2nd Edition](https://www.amazon.com/dp/0195105192) (1996) by [Richard Courant](https://en.wikipedia.org/wiki/Richard_Courant) and [Herbert Robbins](https://en.wikipedia.org/wiki/Herbert_Robbins).

{% include toc %}

## Chapter I. The Natural Numbers

### &sect;1. Calculation with Integers

#### 1. Laws of Arithmetic

What are the natural numbers? A philosopher may focus on how the idea of natural numbers stems from human experience, but a mathematician views the natural numbers are given, and he/she only cares about the properties or laws of them.

There are two operations (the *addition* $+$ and the *multiplication* $\cdot$) defined on the natural numbers, and they obey these laws:

1. The *communicative* law of additions: $a + b = b + a$.
2. The *associative* law of additions: $(a + b) + c = a + (b + c)$.
3. The *communicative* law of multiplications: $ab = ba$.
4. The *associative* law of multiplications: $(ab)c = a(bc)$.
5. The *distributive* law: $a(b+c)=ab+ac$.
6. There is a special element of natural number called the *zero*, and we denote it as $0$. It has the property: $a + 0 = a$.
7. There is a special element of natural number called the *one*, and we denote it as $1$. It has the property: $a \cdot 1 = a$.
8. $0 \neq 1$.

Proposition: **$0$ is unique**.

Proof: Suppose there is another zero, and we denote it as $0'$. According to the definition, we have $0 + 0' = 0$ and $0' + 0 = 0'$. By the communicative law of additions, we have $0 = 0'$. $\blacksquare$

Proposition: **$a\cdot0 = 0$**.

Proof: According to the distributive law, we have $a\cdot0 = a\cdot(0+0)=a\cdot0 + a\cdot0$, then by the uniqueness of zero, we have $a\cdot0 = 0$. $\blacksquare$

Now we know why we have to state that $0 \neq 1$. Suppose $0 = 1$, according to the definition of $1$, we have $a \cdot 0 = a$, and by the previous proposition we have prooved, we finally have $a = 0$. That means the system of natural numbers only has one element $0$, and it is very boring!

### &sect;2. The Infinitude of the Number System. Mathematical Induction

Assume that our natural numbers only has two elements $0$ and $1$, and let $1 + 1 = 0$. If we carefully examine every axiom on this system, we could discover that they are all obeyed. So if we want to forbid this trivial case, we need to add another *infinite* axiom to the natural number system:

**For every natural number $n$, $n + 1 \neq 0$, and if $m + 1 = n + 1$, then $m = n$.**

#### 5. An Important Inequality

For all $p > -1$ and positive integer $n$,

$$
(1+p)^n \geq 1+np
$$

Proof: For $n = 1$, we have $(1+p)^n = 1+np$. Suppose the inequality is hold for integer $n$, then

$$
(1+p)^{(n+1)} \geq (1+np)(1+p) = 1+(n+1)p+np^2
$$

Dropping the positive term $np^2$ only strengthens this inequality, so that

$$
(1+p)^{(n+1)} \geq 1+(n+1)p
$$

$\blacksquare$

This inequality is important because it makes a comparison between an exponent and a linear expression. It is useful for analysis when $p$ is small.
