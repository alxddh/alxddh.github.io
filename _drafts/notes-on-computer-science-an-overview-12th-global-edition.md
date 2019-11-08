---
title: "Notes on \"Computer Science: An Overview, 12th Global Edition\""
categories: [Notes]
tags: [computer science]
---

Here are my notes on [*Computer Science: An Overview*, 12th Global Edition](https://www.amazon.com/dp/B00XN4D0BQ) (2014) by Glenn Brookshear and [Dennis Brylow](https://www.cs.mu.edu/~brylow/).

{% include toc %}

## Chapter 0  Introduction

### 0.1 The Role of Algorithms

The study of algorithms forms the core of computer science.

### 0.2 The History of Computing

### 0.3 An Outline of Our Study

### 0.4 The Overarching Themes of Computer Science

[*Seven Big Ideas of Computer Science*](https://apstudents.collegeboard.org/courses/ap-computer-science-principles):

1. Algorithms
2. Abstraction
3. Creativity
4. Data
5. Programming
6. Internet
7. Impact

## Chapter 1  Data Storage

### 1.1 Bits and Their Storage

#### Gates and Flip-Flops

A *gate* is a physical device that performs a Boolean operation on one or more binary inputs and produces a single binary output. Gates are building blocks of computers.

A *flip-flop* is a fundamental unit of computer memory. It can be viewed as a black box with two inputs and an output. In the normal state, both inputs are at zeros, and the output can be 0 or 1. When a *pulse* (a temporary change to a 1 that returns to 0) is sent to the upper input, the output value would shift to 1 and then remains constant. Similarly, when a pulse is sent to the lower input, the output value would shift to 0 and then remains constant. That's the means of remembering.

```
Upper Input    +-----------+
        +------+           |
               |           +-----+ Output
        +------+           |
Lower Input    +-----------+
```

How to implement a flip-flop?

{% include image name="flip-flop1.png" width="30%" %}

In the normal state, `X` and `Y` are zeros, so we can quickly know that `A = 1`. Because `B = A AND Z`, we know that `B` is equal to `Z`. Because `Z = X OR B`, we know that `Z` is equal to `B`. It is consistent. When `X` shifts to `1`, `Z` would shift to `1`, and so that `B` shifts to `1`; Then `X` backs to `0`, while `Z` would remain at `1`. When `Y` shifts to `1`, `A` would shift to `0`, and so that `B` shifts to `0`, and `Z` shifts to `0`; Then `Y` backs to `0`, so that `A` shifts to `1`, but that won't affect the value of `Z`. 

There is another implementation that only uses two kinds of gate:

{% include image name="flip-flop2.png" width="40%" %}

### 1.2 Main Memory

### 1.3 Mass Storage

### 1.4 Representing Information as Bit Patterns

### *1.5 The Binary System

### *1.6 Storing Integers

### *1.7 Storing Fractions

### *1.8 Data and Programming

### *1.9 Data Compression

### *1.10 Communication Errors



## Chapter 2  Data Manipulation

### 2.1 Computer Architecture

### 2.2 Machine Language

### 2.3 Program Execution

### *2.4 Arithmetic/Logic

### *2.5 Communicating with Other Devices

### *2.6 Programming Data Manipulation

### *2.7 Other Architectures



## Chapter 3  Operating Systems

### 3.1 The History of Operating Systems

### 3.2 Operating System Architecture

### 3.3 Coordinating the Machine’s Activities

### *3.4 Handling Competition Among Processes

### 3.5 Security



## Chapter 4  Networking and the Internet

### 4.1 Network Fundamentals

### 4.2 The Internet

### 4.3 The World Wide Web

### *4.4 Internet Protocols

### 4.5 Security

## Chapter 5  Algorithms

### 5.1 The Concept of an Algorithm

### 5.2 Algorithm Representation

### 5.3 Algorithm Discovery

### 5.4 Iterative Structures

### 5.5 Recursive Structures

### 5.6 Efficiency and Correctness



## Chapter 6  Programming Languages

### 6.1 Historical Perspective

### 6.2 Traditional Programming Concepts

### 6.3 Procedural Units

### 6.4 Language Implementation

### 6.5 Object-Oriented Programming

### *6.6 Programming Concurrent Activities

### *6.7 Declarative Programming



## Chapter 7  Software Engineering

### 7.1 The Software Engineering Discipline

### 7.2 The Software Life Cycle

### 7.3 Software Engineering Methodologies

### 7.4 Modularity

### 7.5 Tools of the Trade

### 7.6 Quality Assurance

### 7.7 Documentation

### 7.8 The Human-Machine Interface

### 7.9 Software Ownership and Liability

## Chapter 8  Data Abstractions

### 8.1 Basic Data Structures

### 8.2 Related Concepts

### 8.3 Implementing Data Structures

### 8.4 A Short Case Study

### 8.5 Customized Data Types

### 8.6 Classes and Objects

### *8.7 Pointers in Machine Language

## Chapter 9  Database Systems

### 9.1 Database Fundamentals

### 9.2 The Relational Model

### *9.3 Object-Oriented Databases

### *9.4 Maintaining Database Integrity

### *9.5 Traditional File Structures

### 9.6 Data Mining

### 9.7 Social Impact of Database Technology

## Chapter 10  Computer Graphics

### 10.1 The Scope of Computer Graphics

### 10.2 Overview of 3D Graphics

### 10.3 Modeling

### 10.4 Rendering

### *10.5 Dealing with Global Lighting

### 10.6 Animation



## Chapter 11  Artificial Intelligence

### 11.1 Intelligence and Machines

### 11.2 Perception

### 11.3 Reasoning

### 11.4 Additional Areas of Research

### 11.5 Artificial Neural Networks

### 11.6 Robotics

### 11.7 Considering the Consequences

## Chapter 12  Theory of Computation

### 12.1 Functions and Their Computation

### 12.2 Turing Machines

### 12.3 Universal Programming Languages

### 12.4 A Noncomputable Function

### 12.5 Complexity of Problems

### *12.6 Public-Key Cryptography

## Appendices

### A  ASCII

### B  Circuits to Manipulate Two's Complement Representations

### C  A Simple Machine Language

### D  High-Level Programming Languages

### E  The Equivalence of Iterative and Recursive Structures

### F  Answers to Questions and Exercises