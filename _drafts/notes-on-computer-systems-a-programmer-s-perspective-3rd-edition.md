---
title: "Notes on \"Computer Systems: A Programmer's Perspective, 3rd Edition\""
categories: [Notes]
tags: [computer systems]
---

Here are my notes on [*Computer Systems: A Programmer's Perspective*](https://csapp.cs.cmu.edu/), 3rd Edition ([Global Edition](https://www.amazon.com/dp/1292101768), 2015) by [Randal E. Bryant](http://www.cs.cmu.edu/~bryant) and [David R. O’Hallaron](http://www.cs.cmu.edu/~droh).

{% include toc %}

## Chapter 1. A Tour of Computer Systems

### 1.1 Information Is Bits + Context

All information is a system is represented as a bunch of bits. The only thing distinguishes different data objects is the context in which we interpret them.

### 1.2 Programs Are Translated by Other Programs into Different Forms

{% include image name="compilation-system.png" %}

### 1.3 It Pays to Understand How Compilation Systems Work

- *Optimizing program performance*

    - Is a `switch` statement always more efficient than a sequence of `if-else` statements? 
    - How much overhead is incurred by a function call? 
    - Is a `while` loop more efficient than a `for` loop? 
    - Are pointer references more efficient than array indexes? 
    - Why does our loop run so much faster if we sum into a local variable instead of an argument that is passed by reference? 
    - How can a function run faster when we simply rearrange the parentheses in an arithmetic expression?

- *Understanding link-time errors*

    - What does it mean when the linker reports that it cannot resolve a reference? 
    - What is the difference between a static variable and a global variable? 
    - What happens if you define two global variables in different C files with the same name? 
    - What is the difference between a static library and a dynamic library?
    - Why does it matter what order we list libraries on the command line? 
    - And scariest of all, why do some linker-related errors not appear until run time?

- *Avoiding security holes*

