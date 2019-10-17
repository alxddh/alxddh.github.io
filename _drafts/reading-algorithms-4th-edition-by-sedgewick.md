---
title: "Reading \"Algorithms, 4th Edition by Sedgewick\""
categories: [Reading]
tags: [algorithm, java]
---

Here are some notes on [*Algorithms*, 4th Edition](https://algs4.cs.princeton.edu/home/), which is a book by [Robert Sedgewick](https://www.cs.princeton.edu/~rs/) and [Kevin Wayne](https://www.cs.princeton.edu/~wayne/contact/), and was published in 2011. The example code and some solutions to the exercises of this book written by myself are placed in [here](https://github.com/alxddh/algorithms4e-by-sedgewick).

{% include toc %}

## Chapter 1. Fundamentals

### 1.4 Analysis of Algorithms

#### Scientific method

- *Observe* some feature of the natural world, generally with precise measurements.
- *Hypothesize* a model that is consistent with the observations.
- *Predict* events using the hypothesis.
- *Verify* the predictions by making further observations.
- *Validate* by repeating until the hypothesis and observations agree.

#### Observations

```java
Stopwatch timer = new Stopwatch();
// run an algorithm...
double time = timer.elapsedTime();
```

```java
public class Stopwatch
{
    private final long start;
    
    public Stopwatch()
    {  
        start = System.currentTimeMillis();  
    }

    public double elapsedTime()
    {
        long now = System.currentTimeMillis();
        return (now - start) / 1000.0;
    }
}
```