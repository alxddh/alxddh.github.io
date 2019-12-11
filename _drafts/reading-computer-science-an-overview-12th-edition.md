---
title: "Reading Computer Science: An Overview, 12th Edition"
categories: [Book Notes]
tags: [computer science]
---

Here are the notes I took on [*Computer Science: An Overview*, 12th Edition](https://www.amazon.com/Computer-Science-Overview-Glenn-Brookshear/dp/0133760065) (2014) by Glenn Brookshear and [Dennis Brylow](https://www.cs.mu.edu/~brylow/).

{% include toc %}

## Chapter 1. Data Storage

### 1.1 Bits and Their Storage

#### Gates and Flip-Flops

The definition of a gate:

> A device that produces the output of a Boolean operation when given the operation’s input values is called a *gate*.

The definition of a flip-flop:

> A *flip-flop* is a fundamental unit of computer memory. It is a circuit that produces an output value of 0 or 1, which remains constant until a pulse (a temporary change to a 1 that returns to 0) from another circuit causes it to shift to the other value. In other words, the output can be set to "remember" a zero or a one under control of external stimuli.

The implementation of a flip-flop doesn't have only one way, and this book gives us two examples:

{% include image name="flip-flop1.png" width="40%" %}
{% include image name="flip-flop2.png" width="50%" %}

The second implementation has an advantage which is that it only requires two different kinds of gate, NOT and OR.

There are three purposes of introducing these implementations of flip-flop:

1. "It demonstrates how devices can be constructed from gates, a process known as digital circuit design, which is an important topic in computer."
2. "The concept of a flip-flop provides an example of abstraction and the use of abstract tools."
3. "It is one means of storing a bit within a modern computer."