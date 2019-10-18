---
title: "Reading \"Compiler Construction: Principles and Practice\""
categories: [Reading]
tags: [compiler]
---

Here are some notes on [*Compiler Construction: Principles and Practice*](http://www.cs.sjsu.edu/~louden/cmptext/), which is a book by [Kenneth C. Louden](http://www.cs.sjsu.edu/~louden/), and was published in 1997. The example code and some solutions to the exercises of this book written by myself are placed in [here](https://github.com/alxddh/compiler-construction).

{% include toc %}

## Chapter 2. Scanning

### 2.1 The Scanning Process

A token has a *token type*, which is normally represented by an `enum`.

```c
typedef enum {
    /* reserved words */
    IF, THEN, ELSE,

    /* special symbols */ 
    PLUS, MINUS,

    NUM,
    ID,
} TokenType;
```

The string of characters represented by the token is called its *string value* or *lexeme*. Any value associated with a token is called an *attribute* of the token, and the lexeme is an example. A token may have many attributes, for example, a token `123`, its lexeme is `"123"`, but it also represents an integer `123`.

Thus we can write a struct to reppresent a token:

```c
typedef struct {
    TokenType tokenval;
    char *stringval;
    int numval;
} TokenRecord;
```
