---
title: "Reading \"CLR via C#, 4th Edition\""
categories: [Reading]
tags: [csharp, dotnet]
---

Here are some notes on [*CLR via C#*, 4th Edition](https://www.oreilly.com/library/view/clr-via-c/9780735668737/), which is a book by [Jeffrey Richter](https://twitter.com/jeffrichter), and was published in 2012.

{% include toc %}

## Part I. CLR Basics

### Chapter 1. The CLR's Execution Model

#### Compiling Source Code into Managed Modules

Parts of a managed module:

- *PE32 or PE32+ header*: PE32 can run on a 32-bit or 64-bit computer, while PE32+ can only run on a 64-bit computer.
- *CLR header*
- *Metadata*
- *IL code*

#### Combining Managed Modules into Assemblies

An assembly is the smallest unit of reuse, security, and versioning.

#### Loading the Common Language Runtime

