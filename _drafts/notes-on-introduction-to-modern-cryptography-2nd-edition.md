---
title: "Notes on \"Introduction to Modern Cryptography, 2nd Edition\""
categories: [Notes]
tags: [cryptography]
---

Here are my notes on Jonathan Katz and Yehuda Lindell's [*Introduction to Modern Cryptography*, 2nd Edition](https://www.amazon.com/Introduction-Cryptography-Chapman-Network-Security/dp/1466570261), which was published in 2014.

{% include toc %}

## Part I. Introduction and Classical Cryptography

### Chapter 1 Introduction

#### 1.1 Cryptography and Modern Cryptography

The definition of *modern cryptography* given by the authors:

> *the study of mathematical techniques for securing digital information, systems, and distributed computations against adversarial attacks.*

Modern cryptography began in 1970s. In that time,

> A rich theory began to emerge, enabling the rigorous study of cryptography as a *science* and a mathematical discipline. This perspective has, in turn, influenced how researchers think about the broader field of computer security.

#### 1.2 The Setting of Private-Key Encryption

{% include image name="private-key-setting.png" width="60%" %}

[Kerckhoffs](https://en.wikipedia.org/wiki/Auguste_Kerckhoffs)' principle:

> *The cipher method must not be required to be secret, and it must be able to fall into the hands of the enemy without inconvenience.*

> Kerckhoffs' principle demands that *security rely solely on secrecy of the key*.

#### 1.4 Principles of Modern Cryptography

##### 1.4.1 Principle 1 – Formal Definitions

