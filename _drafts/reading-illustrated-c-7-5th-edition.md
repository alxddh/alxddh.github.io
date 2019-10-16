---
title: "Reading \"Illustrated C# 7, 5th Edition\""
categories: [Reading]
tags: [csharp, dotnet]
---

Here are some notes on [*Illustrated C# 7: The C# Language Presented Clearly, Concisely, and Visually*, 5th Edition](https://www.apress.com/gp/book/9781484232873), which is a book by Daniel Solis and Cal Schrotenboer, and was published in 2018.

{% include toc %}

## Chapter 4. Types, Storage, and Variables

### Predefined Types

{% include image name="predefined-types.png" %}

The `char` type represents a Unicode point. Its size is 16 bits.

### Value Types and Reference Types

#### Categorizing the C# Types

|                    | Value Types | Reference Types |
|:------------------ |:----------- |:--------------- |
| Predefined types   | `sbyte` `short` `int` `long` `bool` `byte` `ushort` `uint` `ulong` `float` `double` `char` `decimal` | `object` `string` `dynamic` |
| User-defined types | `struct` `enum` | `class` `interface` `delegate` `array` |
