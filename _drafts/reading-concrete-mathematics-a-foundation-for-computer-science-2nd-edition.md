---
title: "Reading \"Concrete Mathematics: A Foundation for Computer Science, 2nd Edition\""
categories: [Reading]
tags: [computer science, mathematics]
image: https://img3.doubanio.com/view/subject/l/public/s3224520.jpg
---

[*Concrete Mathematics: A Foundation for Computer Science*, 2nd Edition](https://www.amazon.com/dp/0201558025) (1994) by [Ronald L. Graham](http://www.math.ucsd.edu/~fan/ron/), [Donald E. Knuth](https://www-cs-faculty.stanford.edu/~knuth/) and Oren Patashnik. This book is based on a course of the same name that has been taught annually at [Stanford University](https://www.stanford.edu/) since 1970. The title "Concrete Mathematics" was originally intended as an antidote (解毒药) to "Abstract Mathematics" since concrete classical results were rapidly being swept out of the modern mathematical curriculum by a new wave of abstract ideas popularly called the "[New Math](https://en.wikipedia.org/wiki/New_Math)". The content of "Concrete Mathematics" is "It is a blend of CONtinuous and disCRETE mathematics. More concretely, it is the controlled manipulation of mathematical formulas, using a collection of techniques for solving problems."

{% include toc %}

## 1. Recurrent Problems

### 1.1 The Tower of Hanoi

The Tower of Hanoi is a puzzle game invented by the French mathematician [Édouard Lucas](https://en.wikipedia.org/wiki/%C3%89douard_Lucas) in 1883. It can be desribed as that we are given a tower of $n$ disks, initially stacked in decreasing size on one of three pegs; The objective is to transfer the entire tower to one of the other pegs, moving only one disk at a time and never moving a larger one onto a smaller.

In this first sample problem, the authors teach us two general strategies:

1. **Look at small cases**: Considering we have two, or one, or even zero disks.
2. **Name and conquer**: Inventing notations. Let us say that $T_n$ is the minimum number of moves that will transfer $n$ disks from one peg to another under Lucas's rules. Then we have

    $$
    T_0 = 0, T_1 = 1, T_2 = 3, T_3 = 7, \cdots
    $$

    ![](https://upload.wikimedia.org/wikipedia/commons/6/60/Tower_of_Hanoi_4.gif){: .align-center}

    After a few of experiments with small cases, we can get a general law: If we want to move the $n$-th disk from peg A to peg C, we have to move the first $n-1$ disks from peg A to peg B. So we have

    $$
    T_n = 2T_{n-1} + 1
    $$

    The solution is easy to find: 

    $$
    T_n = 2^n - 1
    $$