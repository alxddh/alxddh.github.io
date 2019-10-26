---
title: "Notes on Design Patterns: Elements of Reusable Object-Oriented Software"
categories: [Notes]
tags: [design patterns, oop]
---

Here are my notes on [*Design Patterns: Elements of Reusable Object-Oriented Software*](https://www.amazon.com/dp/0201633612) (1994) by [Erich Gamma](https://twitter.com/erichgamma), [Richard Helm](https://de.wikipedia.org/wiki/Richard_Helm), [Ralph Johnson](https://en.wikipedia.org/wiki/Ralph_Johnson_(computer_scientist)), and [John Vlissides](https://en.wikipedia.org/wiki/John_Vlissides).

{% include toc %}

## Preface to Book

> This book isn't an introduction to object-oriented technology or design.

> A word of warning and encouragement: Don't worry if you don't understand this book completely on the first reading. We didn't understand it all on the first writing! Remember that this isn't a book to read once and put on a shelf. We hope you'll find yourself referring to it again and again for design insights and for inspiration.

Very humor.

## Introduction

An expert designer would reuse solutions that have worked for him or her in the past. Design patterns are records of experience in designing object-oriented software, so it's an art but not a science.

### What Is a Design Pattern?

A design pattern has four essential parts:

1. The *pattern name*. It increases our design vocabulary and gives us a higher level of abstraction, so we can talk with each other about a design pattern more effectively.
2. The *problem*.
3. The *solution*.
4. The *consequences*.

> The design patterns in this book are *descriptions of communicating objects and classes that are customized to solve a general design problem in a particular context*.

### Design Patterns in Smalltalk MVC

> MVC decouples views and models by establishing a subscribe/notify protocol between them.

How to implement the *subscribe/notify protocol*?

> MVC encapsulates the response mechanism in a Controller object.
> 
> ...
> 
> A view uses an instance of a Controller subclass to implement a particular response strategy; to implement a different strategy, simply replace the instance with a different kind of controller.

## A Case Study: Designing a Document Editor

## Structural Patterns

### Composite

