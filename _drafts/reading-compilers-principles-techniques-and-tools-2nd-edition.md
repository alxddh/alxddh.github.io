---
title: "Reading \"Compilers: Principles, Techniques, and Tools, 2nd Edition\""
categories: [Reading]
tags: [compiler]
---

Here are some notes on [*Compilers: Principles, Techniques, and Tools*, 2nd Edition](https://suif.stanford.edu/dragonbook/), which is a book by [Alfred V. Aho](http://www.cs.columbia.edu/~aho/), [Monica S. Lam](https://suif.stanford.edu/~lam/), [Ravi Sethi](https://www2.cs.arizona.edu/~rsethi/), and [Jeffrey D. Ullman](http://infolab.stanford.edu/~ullman/), and was published in 2006.

{% include toc %}

## Chapter 2. A Simple Syntax-Directed Translator

### 2.2 Syntax Definition

#### 2.2.1 Definition of Grammars

Four components of a context-free grammar:

1. A set of *terminal* symbols, also called *tokens*. They are the "atoms" of a grammar.
2. A set of *nonterminals*. Each nonterminal represents a string of terminals.
3. A set of *productions*, where each production consists of a nonterminal, called the *head* or *left side*, an arrow, and a sequence of terminals and/or nonterminals. The intent of a production is to represent a construct.
4. A designation of one of the nonterminals as the *start* symbol.

For example, the grammar of expressions `1+2-9`, `3-1`, or `7` can be described as a list of *productions*:

```
expr  -> expr + digit | expr - digit | digit
digit -> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
```

### 2.3 Syntax-Directed Translation
