---
title: "Notes on The Ruby Programming Language"
categories: [Book Notes]
tags: [ruby]
---

Here are the notes I took on [David Flanagan](https://twitter.com/__davidflanagan) and [Yukihiro Matsumoto](https://twitter.com/yukihiro_matz)'s [*The Ruby Programming Language: Everything You Need to Know*](https://www.amazon.com/dp/0596516177) (2008).

{% include toc %}

## Chapter 2. The Structure and Execution of Ruby Programs

### 2.1 Lexical Structure

#### 2.1.6 Whitespace

##### 2.1.6.1 Newlines as statement terminators

You can use semicolons to terminate statements in Ruby, but it also has another implicit way to terminate statements. If the Ruby code on a line is a syntactically complete statement, Ruby uses the newline as the statement terminator. If the statement is not complete, then Ruby continues parsing the statement on the next line. But there is an **exception** introduced in [Ruby 1.9](https://www.ruby-lang.org/en/news/2007/12/25/ruby-1-9-0-released/): If the first nonspace character on a line is a period, then the line is considered a continuation line, and the newline before it is not a statement terminator. This exception is for writing ["fluent API"](https://en.wikipedia.org/wiki/Fluent_interface):

```ruby
animals = Array.new
    .push("dog") # Does not work in Ruby 1.8 
    .push("cow")
    .push("cat")
    .sort
```

##### 2.1.6.2 Spaces and method invocations

Ruby allows the parentheses around method invocations to be omitted in certain circumstances. This makes code elegant, but also opens up a pernicious whitespace dependency. For example,

```ruby
f(3+2)+1     # Invoking f(3+2) first, and then adding 1 to the returned value.
f (3+2)+1    # Calculating (3+2)+1 fist, and then passing the result to f.
```

## Chapter 3. Datatypes and Objects

### 3.1 Numbers

{% include image name="numbers.png" %}

> All integers are instances of `Integer`. If an integer value fits within 31 bits (on most implementations), it is an instance of `Fixnum`. Otherwise, it is a `Bignum`. `Bignum` objects represent integers of arbitrary size, and if the result of an operation on `Fixnum` operands is too big to fit in a `Fixnum`, that result is transparently converted to a `Bignum`. Similarly, if the result of an operation on `Bignum` objects falls within the range of `Fixnum`, then the result is a `Fixnum`.

