---
title: "Notes on \"Computer Science: An Overview, 12th Edition\""
categories: [Notes]
tags: [computer science]
---

Here are my notes on [*Computer Science: An Overview*, 12th Edition](https://www.amazon.com/dp/B00XN4D0BQ) (Global Edition, 2015) by Glenn Brookshear and [Dennis Brylow](http://www.mscs.mu.edu/~brylow/).

{% include toc %}

## Chapter 1. Data Storage

### 1.1 Bits and Their Storage

#### Gates and Flip­-Flops

> A flip-flop is a fundamental unit of computer memory. It is a circuit that produces an output value of 0 or 1, which remains constant until a pulse (a temporary change to a 1 that returns to 0) from another circuit causes it to shift to the other value. In other words, the output can be set to "remember" a zero or a one under control of external stimuli.

{% include image name="flip-flop.png" width="50%" caption="An implementation of flip-flop" %}

At the normal state, both inputs are set to zeros, and we can easily see that the output value can be 0 or 1. When the upper input receives a pulse, the output shifts to 1 and then remains constant. When the lower input receives a pulse, the output shifts to 0 and then remains constant.

{% include image name="flip-flop2.png" width="50%" caption="Another implementation of flip-flop" %}

From the outside perspective, this implementation is the same as the first one, but it has one benefit that it only needs two different kinds of gate.

### 1.9 Data Compression

