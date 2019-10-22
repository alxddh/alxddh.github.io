---
title: "Notes on \"Pro Git, 2nd Edition\""
categories: [Notes]
tags: [git]
---

Here are my notes on [Scott Chacon](https://twitter.com/chacon) and [Ben Straub](https://github.com/ben)'s [*Pro Git*, 2nd Edition](https://git-scm.com/book/en/v2), which was published in 2014.

{% include toc %}

## Chapter 2. Git Basics

## Chapter 10. Git Internals

### 10.1 Plumbing and Porcelain

"Plumbing" commands means the low-level ones, while "porcelain" means the top-level ones.

`git init` creates a fresh `.git` directory, in where there are four important entries:

- The `HEAD` file, which points to the branch you currently have checked out.

    For example,

    ```
    ref: refs/heads/dev
    ```

- The `index` file, which is where Git stores your staging area information.
- The `objects` directory, which stores all the content for your database.
- The `refs` directory, which stores pointers into commit objects in that data (branches, tags, remotes and more).

### 10.2 Git Objects

> Git is a content-addressable filesystem. Great. What does that mean? It means that at the core of Git is a simple key-value data store. What this means is that you can insert any kind of content into a Git repository, for which Git will hand you back a unique key you can use later to retrieve that content.

For demonstrating this, the authors showed the usages of two plumbing commands `git hash-object` and `git cat-file`.

`git hash-object` would take the content you handed to it and return a unique key, which is the [SHA-1](https://en.wikipedia.org/wiki/SHA-1) hash of the content. If you provide also a `-w` option, it would store the content into your Git database (in `.git/objects`). If you provide also a `--stdin` option, it would take the content from the standard input, otherwise, it would expect a file name containing the content.

`git cat-file` would return back the content, if you provide a SHA-1 key after the `-p` option.

Git refers the contents you stage as objects. The type of them is *[blob](https://en.wikipedia.org/wiki/Binary_large_object)*.

#### Tree Objects

A *tree* object corresponds to a UNIX directory. It contains one or more entries, each of which is the SHA-1 hash of a blob or subtree with its associated mode, type, and filename.

Git creates a tree by taking the state of `index` (the staging area), so if you want to create a tree, you need to update the staging area first. For example,

``` bash
$ git update-index --add --cacheinfo 100644 \
  83baae61804e65cc73a7201a7252750c76066a30 test.txt
```

Then, you can create a tree directly:

```bash
$ git write-tree
d8329fc1cc938780ffdd9f94e0d364e0ea74f579
```

Check it out:

```bash
$ git cat-file -p d8329fc1cc938780ffdd9f94e0d364e0ea74f579
100644 blob 83baae61804e65cc73a7201a7252750c76066a30      test.txt
```