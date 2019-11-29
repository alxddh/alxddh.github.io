---
title: "Notes on Computer Systems: A Programmer's Perspective, 3rd Edition"
categories: [Book Notes]
tags: [computer systems, programming]
---

Here are the notes I took on [Randal E. Bryant](http://www.cs.cmu.edu/~bryant) and [David R. O'Hallaron](http://www.cs.cmu.edu/~droh)'s [*Computer Systems: A Programmer's Perspective*](https://csapp.cs.cmu.edu/), 3rd Edition ([Global Edition](https://www.amazon.com/dp/1292101768), 2015). Besides, I made a [playground](https://github.com/alxddh/CSAPP3e) for this book.

{% include toc %}

## Preface

> Many systems books are written from a builder’s perspective, describing how to implement the hardware or the systems software, including the operating system, compiler, and network interface. This book is written from a programmer’s perspective, describing how application programmers can use their knowledge of a system to write better programs.

## Part I. Program Structure and Execution

### Chapter 2. Representing and Manipulating Information

#### 2.1 Information Storage

> Rather than accessing individual bits in memory, most computers use blocks of 8 bits, or *bytes*, as the smallest addressable unit of memory. A machine-level program views memory as a very large array of bytes, referred to as *virtual memory*. Every byte of memory is identified by a unique number, known as its *address*, and the set of all possible addresses is known as the *virtual address space*.

##### 2.1.2 Data Sizes

> Every computer has a *word* size, indicating the nominal size of pointer data. Since a virtual address is encoded by such a word, the most important system parameter determined by the word size is the maximum size of the virtual address space. That is, for a machine with a $w$-bit word size, the virtual addresses can range from $0$ to $2^w − 1$, giving the program access to at most $2^w$ bytes.

##### 2.1.4 Representing Strings

