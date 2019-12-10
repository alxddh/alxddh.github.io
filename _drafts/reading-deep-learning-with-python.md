---
title: "Reading Deep Learning with Python"
categories: [Book Notes]
tags: [python, deep learning, keras]
---

Here are the notes I took on [*Deep Learning with Python*](https://www.manning.com/books/deep-learning-with-python) (2017) by [Francois Chollet](https://fchollet.com/).

{% include toc %}

## Preface

> The consequences of this sudden progress extend to almost every industry. But in order to begin deploying deep-learning technology to every problem that it could solve, we need to make it accessible to as many people as possible, including non-experts -- people who aren’t researchers or graduate students. For deep learning to reach its full potential, we need to radically democratize it.

How to become a deep learning researcher?

## About this book

### Software/hardware requirements

> All of this book’s code examples use the Keras deep-learning framework ([https://keras.io](https://keras.io)), which is open source and free to download.

Why Keras? Because the author of this book is the creator of Keras.

Keras supports three kinds of backend engines: [TensorFlow](https://www.tensorflow.org/), [Theano](http://deeplearning.net/software/theano/), or [CNTK](https://github.com/microsoft/CNTK). Before installing Keras, we need to install one of them. TensorFlow is recommended by the official site of Keras.

The instructions of installing TensorFlow can be found [here](https://www.tensorflow.org/install).

```shell
# Requires the latest pip
$ pip3 install --upgrade pip

# Current stable release for CPU-only
$ pip3 install tensorflow
```

Then I met an error report:

```
ERROR: Could not find a version that satisfies the requirement tensorflow (from versions: none)
ERROR: No matching distribution found for tensorflow
```

It was caused by the mismatch of the compile-time version and the runtime version of Python. The release of TensorFlow 2.0.0 on Mac was compiled on Python 3.6, so I had to downgrade my local Python version to 3.6.

Installing Keras itself still uses `pip`:

```shell
$ sudo pip3 install keras
```

## Part 1. Fundamentals of deep learning

### Chapter 1. What is deep learning?

#### 1.1 Artificial intelligence, machine learning, and deep learning

##### 1.1.1 Artificial intelligence

The definition of the field of AI:

> The effort to automate intellectual tasks normally performed by humans.