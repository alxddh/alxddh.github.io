---
title: "Notes on \"Computer Science: An Overview, 12th Edition\""
categories: [Book Notes]
tags: [computer science]
---

[*Computer Science: An Overview*, 12th Edition](https://www.pearson.com/us/higher-education/product/Brookshear-Computer-Science-An-Overview-12th-Edition/9780133760064.html) by Glenn Brookshear and [Dennis Brylow](http://www.mscs.mu.edu/~brylow/), published in 2014, is a breadth-first introductory book on computer science.

{% include toc %}

## The Outline of This Book

This book follows a bottom-up approach: from the computer hardware to the more abstract topics such as algorithm complexity and computability.

- *Chapter 1. Data Storage*: How information is encoded and stored within modern computers.
- *Chapter 2. Data Manipulation*: The basic internal operation of a simple computer.
- *Chapter 3. Operating Systems*: The software that controls the overall operation of a computer.
- *Chapter 4. Networking and the Internet*: How computers are connected to each other to form computer networks and how networks are connected to form internets.
- *Chapter 5. Algorithms*.
- *Chapter 6. Programming Languages*.
- *Chapter 7. Software Engineering*: How to develope large software systems.
- *Chapter 8. Data Abstractions*.
- *Chapter 9. Database Systems*.
- *Chapter 10. Computer Graphics*.
- *Chapter 11. Artificial Intelligence*.
- *Chapter 12. Theory of Computation*.

## Data Storage

### Gates and Flip­-Flops

> A device that produces the output of a Boolean operation when given the operation’s input values is called a **gate**.

A *flip-flop* is a particular electronic circuit that forms the basic element of the computer's main memory.

{% include image name="flip-flop.png" width="30%" caption="An implementation of flip-flop" %}

At the normal state, both inputs of this flip-flop are set to zeros. When a *pulse* (a temporary change to a 1 that returns to 0) is sent to the upper input, the output will be shifted to 1 and then stays in constant; when a pulse is sent to the lower input, the output will be shifted to 0 and then stays in constant. So the value of flip-flops can be modified and remembered -- a needed property to build the computer's main memory.

### Encodings

#### Unicode

> The Unicode Standard is a character coding system designed to support the worldwide interchange, processing, and display of the written texts of the diverse languages and technical disciplines of the modern world. In addition, it supports classical and historical texts of many written languages. 
> 
> -- [Unicode Consortium](https://home.unicode.org/)

A Unicode code point is referred to by writing `U+` followed by its hexadecimal number. Unicode defines a code space from `U+0` to `U+10FFFF`, i.e. there are `0x110000` ($16^5 + 16^4 = 1114112$) code points. The code space is divided 16 planes, and each plane has `0x10000` ($16^4 = 65536$) code points. The first plane (from `U+0` to `U+FFFF`) is called the *BMP (Basic Multilingual Plane)*.

