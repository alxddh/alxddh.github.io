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

## Chapter 2. Git Basics

### 2.3 Viewing the Commit History

`git log` shows a list of the commits, in there each entry has the information of the commit checksum, the author, the date, and the commit message.

By appending a `-[n]` option, it would show the last `n` entries.

By appending a `-p` or `--patch` option, it would show the difference introduced in each commit.

By appending a `--stat` option, it would show the statistical information of each commit, i.e. how many files were changed, how many insertions were made, or how many deletions were made.

By appending a `--pretty` option, it would show the history with different format. For example, 

- `git log --pretty=oneline` shows the history with each entry in one line,
- or you can specify a custom format, `git log --pretty=format:"%h - %an, %ar : %s"`

By appending a `--graph` option, it would show the branch and merge history with a nice little [ASCII graph](https://en.wikipedia.org/wiki/ASCII_art).

More options can be found [here](https://git-scm.com/docs/git-log).
