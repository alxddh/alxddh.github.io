---
title: "Notes on CS:APP3e"
categories: [Notes]
tags: [computer system]
---

Here are my notes on [Randal E. Bryant](http://www.cs.cmu.edu/~bryant) and [David R. O'Hallaron](http://www.cs.cmu.edu/~droh)'s [*Computer Systems: A Programmer's Perspective*, 3rd Edition](https://csapp.cs.cmu.edu/), which was published in 2015. I have put all the code from this book into a [repository](https://github.com/alxddh/csapp3e).

{% include toc %}

## Part I. Program Structure and Execution

### Chapter 2. Representing and Manipulating Information

#### 2.1 Information Storage

##### 2.1.2 Data Sizes

*Word size* is the size of pointer data, i.e. the address of *virtual memory*. For a machine with a w-bit word size, its virtual address varies from $0$ to $2^w - 1$, so the maximum size of the virtual address space is $2^w$.

##### 2.1.3 Addressing and Byte Ordering

This section shows a function printing the sequence of bytes of an object. It can be used to detect the byte ordering on a machine.

```c
typedef unsigned char* byte_pointer;

void show_bytes(byte_pointer start, size_t len)
{
    int i;
    for (i = 0; i < len; i++) {
        printf(" %02x", start[i]);
    }
    printf("\n");
}
```

#### 2.2 Integer Representations

##### 2.2.2 Unsigned Encodings

$$
B2U_w(\vec{x}) \doteq \sum_{i=0}^{w-1}x_i 2^i
$$

$UMax_w = 2^w - 1$.

##### 2.2.3 Two’s-Complement Encodings

$$
B2T_w(\vec{x}) \doteq -x_{w-1}2^{w-1} + \sum_{i=0}^{w-2}x_i 2^i
$$

$TMin_w = -2^{w-1}$, $TMax_w = 2^{w-1} - 1$.

##### 2.2.4 Conversions between Signed and Unsigned

The conversion formulas between two's-complement and unsigned can be easily derived by this relation: $B2U_w(\vec{x}) - B2T_w(\vec{x}) = x_{w-1}2^{w}$.

$$
T2U_w(x) = 
\begin{cases}
x + 2^w, & x < 0 \\
x,       & x \geq 0
\end{cases}
$$

$$
U2T_w(x) =
\begin{cases}
x,       & x \leq TMax_w \\
x - 2^w, & x > TMax_w
\end{cases}
$$

##### 2.2.6 Expanding the Bit Representation of a Number

*Zero extension*: Adding leading zeros to the representation. Zero extension won't change the unsigned value of the representation.

*Sign extension*: Adding copies of the most significant bit to the representation. Sign extension won't change the two's-complement value of the representation.

Proof: If the most significant bit is 0, the statement is obviously true. If the most significant bit is 1, the two's-complement value before the extension is

$$
B2T_w(\vec{x}) = -2^{w-1} + \sum_{i=0}^{w-2}x_i 2^i
$$

Now suppose that we have inserted a bit of 1 on the leftmost, the two's-complement value becomes to 

$$
\begin{aligned}
B2T_{w+1}(\vec{x}') &= -2^{w} + \sum_{i=0}^{w-1}x_i 2^i \\
                    &= -2^{w} + 2^{w-1} + \sum_{i=0}^{w-2}x_i 2^i \\
                    &= -2^{w-1} + \sum_{i=0}^{w-2}x_i 2^i \\
                    &= B2T_w(\vec{x})
\end{aligned}
$$
