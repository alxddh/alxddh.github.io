---
title: "Notes on Python Crash Course, 2nd Edition"
categories: Notes
tags: python
---

[*Python Crash Course*, 2nd Edition](https://nostarch.com/pythoncrashcourse2e) by [Eric Matthes](https://ehmatthes.github.io/), 2019.

{% include toc %}

## Part I. Basics

### Chapter 2. Variables and Simple Data Types

#### Variables

Defining a variable in Python is very simple, you don't need to declare its type or use some keywords such as `var` or `local`, you just assign a value to a variable name.

```python
message = "Hello, world!"
```

#### Strings

##### Changing Case in a String with Methods

```python
>>> name = "ADA Lovelace"
>>> name.title()
'Ada Lovelace'
>>> name.lower()
'ada lovelace'
>>> name.upper()
'ADA LOVELACE'
```

##### Using Variables in Strings

```python
>>> first_name = "ada"
>>> last_name = "lovelace"
>>> full_name = f"{first_name} {last_name}"
>>> print(full_name)
ada lovelace
```

The `f` is for *format*. F-strings were first introduced in Python 3.6.

##### Stripping Whitespace

`lstrip([chars])` returns a copy of the string with leading characters removed. The `chars` argument is a string specifying the set of characters to be removed. If omitted or `None`, the chars argument defaults to removing whitespace. The `chars` argument is not a prefix; rather, all combinations of its values are stripped:

```python
>>> '   spacious   '.lstrip()
'spacious   '
>>> 'www.example.com'.lstrip('cmowz.')
'example.com'
```

Besides, there are `rstrip` and `strip`, they are similar with `lstrip`.

### Chapter 3. Introducing Lists
