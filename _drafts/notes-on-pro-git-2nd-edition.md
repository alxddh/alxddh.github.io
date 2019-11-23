---
title: "Notes on Pro Git, 2nd Edition"
categories: [Book Notes]
tags: [git]
---

Here are the notes I took on [Scott Chacon](http://scottchacon.com/) and [Ben Straub](https://ben.straub.cc/)'s [*Pro Git*, 2nd Edition](https://git-scm.com/book/en/v2) (2014).

{% include toc %}

## Chapter 1. Getting Started

### 1.1 About Version Control

> Version control is a system that records changes to a file or set of files over time so that you can recall specific versions later.

### 1.3 What is Git?

#### Snapshots, Not Differences

Many VCSs store information as a list of file-based changes, this is called *delta-based* version control. However, Git thinks its data as a *stream of snapshots*.

> This makes Git more like a mini filesystem with some incredibly powerful tools built on top of it, rather than simply a VCS.