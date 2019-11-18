---
title: "Reading Stein's \"Fourier Analysis: An Introduction\""
categories: [Reading]
tags: [fourier analysis]
image: https://img1.doubanio.com/view/subject/l/public/s7035217.jpg
---

[*Fourier Analysis: An Introduction*](https://www.amazon.com/dp/069111384X) (2003) by [Elias M. Stein](https://en.wikipedia.org/wiki/Elias_M._Stein) and Rami Shakarchi. Beginning in the spring of 2000, a series of four one-semester courses were taught at Princeton University whose purpose was to present, in an integrated manner, the core areas of analysis. This book is the first textbook. The authors begin the series from [Fourier analysis](https://en.wikipedia.org/wiki/Fourier_analysis) because they thinked that it played a central role in the development of analysis.

{% include toc %}

## 1 The Genesis of Fourier Analysis

### 1 The vibrating string

#### Simple harmonic motion

{% include image name="simple-harmonic-ocsillator.png" %}

The motion of a simple harmonic oscillator is governed by Hooke's law $F = -ky(t)$. By combining it with Newton's second law $F=m\ddot{y}(t)$, we get a second order differential equation

$$
\ddot{y}(t)+c^2y(t) = 0
$$

where $c=\sqrt{k/m}$.

We can easily prove that all functions of the form $y(t) = a \cos{ct} + b \sin{ct}$ solve the equation, but how to prove it's the only form?

