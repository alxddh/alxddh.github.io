---
title: "Notes on Computer Science: An Overview, 12th Edition"
categories: [Notes]
tags: [computer science]
---

Here are my notes on [*Computer Science: An Overview*, 12th Edition (Global Edition, 2015)](https://www.amazon.com/dp/B00XN4D0BQ) by J. Glenn Brookshear and [Dennis Brylow](http://www.mscs.mu.edu/~brylow/).

{% include toc %}

## Chapter 1. Data Storage

### 1.1 Bits and Their Storage

#### Gates and Flip­-Flops

A *flip-flop* is a fundamental unit of computer memory. It is a circuit that produces 0 or 1, which remains constant until a *pulse* (a temporary change to 1 that return 0) from another circuit causes it to shift to the other value. In other words, a flip-flop can remember bits and the value can be modified.

{% include image name="flip-flop.png" width="50%" caption="An implementation of flip-flop" %}

In the normal state, both inputs are at zeros. If the upper input receives a pulse, the output would shift to 1 and then remains constant. If the lower input receives a pulse, the output would shift to 0 and then remains constant.

{% include image name="flip-flop2.png" width="50%" caption="Another implementation of flip-flop" %}

This implementation has one benefit that it only uses two kinds of gate.
