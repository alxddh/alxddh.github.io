---
title: "Notes on The Principles of Object-Oriented JavaScript"
categories: [Notes]
tags: [javascript, oop]
---

Here are my notes on [*The Principles of Object-Oriented JavaScript*](https://nostarch.com/oojs) (2014) by [Nicholas C. Zakas](https://humanwhocodes.com/).

{% include toc %}

## Chapter 1. Primitive and Reference Types

### What are Types?

I think for answering this question, we need to know the memory model. In our programming model, the memory is a sequence of bytes. Each byte has a unique address. An object is just a block of continuous bytes.

We say an object is *primitive type*, we mean that the object is directly associated with the data.

```
                  :
                  :
              +--------+
var a = 100   |        |
              +--------+
              |XXXXXXXX|
              +--------+
              |XXXXXXXX|
            a +--------+ 
              |XXXXXXXX|
              +--------+ 
              |XXXXXXXX|
              +--------+
              |        |
              +--------+
                  :    
                  :    
```

We say an object is *reference type*, we mean that it is associated with the address of data, but we can indirectly access the data through the address. 

```
                  :
                  :
              +--------+
var a = {}    |        |
              +--------+
              |XXXXXXXX|
              +--------+
              |XXXXXXXX|
            a +--------+ --、
              |XXXXXXXX|    \
              +--------+    |
              |XXXXXXXX|    |
              +--------+    |
              |        |    |
              +--------+    |
                  :         |
                  :         |
              +--------+    |
              |        |    |
              +--------+    ,
              |XXXXXXXX| <-'
              +--------+
              |XXXXXXXX|
              +--------+
              |XXXXXXXX|
              +--------+
              |XXXXXXXX|
              +--------+
              |        |
              +--------+
                  :
                  :
```

### Primitive Types

The string in JavaScript is a primitive type, so we need to pay attention to the assignment of strings, that would make new copies. If these strings are very large, the space of memory may quickly be not enough.

### identifying reference Types
