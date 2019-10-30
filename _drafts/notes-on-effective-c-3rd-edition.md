---
title: "Notes on \"Effective C++, 3rd Edition\""
categories: [Notes]
tags: [cpp]
---

Here are my notes on [*Effective C++*, 3rd Edition](https://www.amazon.com/dp/0321334876) (2005) by [Scott Meyers](https://www.aristeia.com/).

{% include toc %}

## Chapter 1. Accustoming Yourself to C++

### Item 1: View C++ as a federation of languages.

Four sublanguages:

- C
- Object-Oriented C++
- Template C++
- STL

Effective programming requires that you change rules when you switch from one sublanguage to another. For example, *pass-by-value* is generally more efficient than *pass-by-reference* for built-in (C-like) types. But when you switch from C to Object-Oriented C++, the existence of user-defined constructors and destructors means that pass-by-reference is better. This is especially the case in Template C++ because there you don't even know the actual type of object. When you come across in STL, the thing changes again, pass-by-value is better because that iterators and functions are model in pointers.

### Item 2: Prefer `const`s, `enum`s, and `inline`s to `#define`s.

Prefer the compiler to the preprocessor.

