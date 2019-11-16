---
title: "Annotations on CS:APP3e"
categories: [Annotations]
tags: [computer systems]
---

Here are my annotations on [Randal E. Bryant](http://www.cs.cmu.edu/~bryant) and [David R. O'Hallaron](http://www.cs.cmu.edu/~droh)'s [*Computer Systems: A Programmer's Perspective*, 3rd Edition](https://csapp.cs.cmu.edu/) (Global Edition), which is a book published in 2015.

{% include toc %}

## Part I. Program Structure and Execution

### Chapter 2. Representing and Manipulating Information

#### 2.4 Floating Point

> Up until the 1980s, every computer manufacturer devised its own conventions for how floating-point numbers were represented and the details of the operations performed on them. In addition, they often did not worry too much about the accuracy of the operations, viewing speed and ease of implementation as being more critical than numerical precision.

Like all non-forward-looking behaviors, people always start where they are easy to get started, and believe that they will slowly expand and improve in later iterations.

##### 2.4.2 IEEE Floating-Point Representation

This section explains how the IEEE standard encodes floating-point numbers but doesn't explain clearly **why**. Here let me give a brief and clear explanation.

The IEEE standard represents a binary floating-point number in a form 

$$
V=(-1)^sM\times 2^E
$$

where $s$ represents the sign, and $M$ is called the *significand*, and $E$ is called the *exponent*. 

The bit vector format of a floating-point number looks like this:

$$
s|e_{k-1}\cdots e_{1}e_{0}|f_{n-1}\cdots f_{1}f_{0}
$$

where $e_{k-1}\cdots e_{1}e_{0}$ encodes $E$, and $f_{n-1}\cdots f_{1}f_{0}$ encodes $M$.

A natural encoding method is let $M = 0.f_{n-1}\cdots f_{1}f_{0}$, and for the symmetry, let $E = e - Bias$, where $e = e_{k-1}\cdots e_{1}e_{0} $, and $Bias = 2^{k-1} - 1$. The "symmetry" here means that the maximum distance the binary point floats to the left and right should be the same. We choose $Bias = 2^{k-1} - 1$, so that

1. When $e \in [0, 2^{k-1} - 2]$, $E$ is negative, therefore the binary point floats to left and the maximum distance is $2^{k-1} - 1$.
2. When $e = 2^{k-1} - 1$, $E$ is zero, therefore the binary point doesn't float to any direction.
3. When $e \in [2^{k-1}, 2^{k} - 1]$, $E$ is positive, therefore the binary point floats to right and the maximum distance is $2^{k-1}$.

:sweat_smile: Well, it's almost symmetrical.

**For getting an additional bit of precision for free**, the IEEE standard plays a trick, i.e. adding an *implied leading 1* for the encoding of $M$. Now $M = 1.f_{n-1}\cdots f_{1}f_{0}$. What costs we have to pay for this trick?

1. We can't represent the zero since $M \geq 1$.
2. The second drawback can be seen by substracting two different positive numbers with the same exponent:

    $$
    \begin{aligned}
        \Delta &= V - V' = (M - M')\times 2^{E} \\
               &= 0.\underbrace{00\cdots01}_{\text{m bits}} x_{n-m-1}\cdots x_{0} \times 2^{E} \\
               &= 1.x_{n-m-1}\cdots x_{0} \times 2^{E-m}
    \end{aligned}
    $$

    Since the range of $E$ is $[-2^{k-1}+1, 2^{k-1}]$, we get that for all $E < -2^{k-1}+1+m$, the $\Delta$ can not be represented in the IEEE standard format! This phenomenon is called [*underflow*](https://en.wikipedia.org/wiki/Arithmetic_underflow). If underflow has happened, we have to make an approximation, maybe the smallest positive number, but it is still bigger than the real $\Delta$. After a long sequence of iterations, this error may become considerable.

For solving these two drawbacks, we need different strategies to encode the significand.

Let us look again at the condition of underflow happening, $E < -2^{k-1}+1+m$. Since $m \geq 1$,