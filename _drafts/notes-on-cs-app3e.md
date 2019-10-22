---
title: "Notes on CS:APP3e"
categories: [Notes]
tags: [computer system]
---

Here are my notes on [Randal E. Bryant](http://www.cs.cmu.edu/~bryant) and [David R. O'Hallaron](http://www.cs.cmu.edu/~droh)'s [*Computer Systems: A Programmer's Perspective*, 3rd Edition](https://csapp.cs.cmu.edu/), which was published in 2015.

{% include toc %}

## Part I. Program Structure and Execution

### Chapter 2. Representing and Manipulating Information

#### 2.1 Information Storage

##### 2.1.2 Data Sizes

*Word size* is the size of pointer data, i.e. the address of *virtual memory*. For a machine with a w-bit word size, its virtual address varies from $0$ to $2^w - 1$, so the maximum size of the virtual address space is $2^w$.
