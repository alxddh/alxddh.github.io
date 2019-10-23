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

### 1.3 Mass Storage

#### Magnetic Systems

Some parameters of a disk's performance:

- *Seek time*: the time required to move [*heads*](https://en.wikipedia.org/wiki/Disk_read-and-write_head) from one track to another.
- *Rotation delay* or *latency time*: *half* the time required for the disk to make a complete rotation. It is the average time required for the desired data to rotate around to the head once the head has been positioned over the desired track.
- *Access time*: the sum of seek time and latency time.
- *Transfer rate*: the rate at which data can be transferred to or from the disk.

### 1.9 Data Compression
