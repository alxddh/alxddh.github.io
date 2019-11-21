---
title: "Notes on Michael Artin's Algebra, 2nd Edition"
categories: [Book Notes]
tags: [algebra]
---

Here are the notes I took on [Michael Artin](https://en.wikipedia.org/wiki/Michael_Artin)'s [*Algebra*, 2nd Edition](https://www.amazon.com/dp/0132413779) (2010).

{% include toc %}

## Chapter 1. Matrices

> Matrices play a central role in this book.

### 1.1 The Basic Operations

The formula of the *inverse* of a $2\times2$ matrix:

$$
\begin{bmatrix}
a & b\\ 
c & d
\end{bmatrix}^{-1}
= \frac{1}{ad-bc}
\begin{bmatrix}
d & -b\\ 
-c & a
\end{bmatrix}
$$

$ad-bc$ is called the *determinant* of the matrix. So a $2\times2$ matrix is invertible if and only if its determinant is not zero.
