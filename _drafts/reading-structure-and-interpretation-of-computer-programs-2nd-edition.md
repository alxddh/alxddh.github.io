---
title: "Reading \"Structure and Interpretation of Computer Programs, 2nd Edition\""
categories: [Book Notes]
tags: [programming, lisp, scheme]
---

[*Structure and Interpretation of Computer Programs*, 2nd Edition](https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book.html) by [Harold Abelson](http://groups.csail.mit.edu/mac/users/hal/hal.html) and [Gerald Jay Sussman](http://groups.csail.mit.edu/mac/users/gjs/gjs.html) with Julie Sussman was published in 1996.

{% include toc %}

## Chapter 1. Building Abstractions with Procedures

### The Elements of Programming

#### Expressions

An *expression* is something you type to feed the *interpreter*. The interpreter *evaluates* an expression and displays the result. One kind of *primitive expression* is a number. Numbers may be combined with an expression representing a *primitive procedure* (such as `+` or `*`). For example,

```scheme
> (+ 137 349)
486
> (* 5 99)
495
```

Expressions such as these are called *combinations*. The interpreter will apply the computational process represented by a primitive procedure when you feed it a combination. `+` and `*` are also called *operators*.

Combinations can be nested:

```scheme
> (+ (* 3 5) (- 10 6))
19
```

#### Naming and the Environment

Defining a variable is Scheme's simplest means of abstraction, for it allows us to use simple names to refer to complex objects, for example, 

```scheme
(define circumference (* 2 pi radius))
```

The interpreter must maintain some sort of memory that keeps track of name-object pairs. They are called *environments*.
