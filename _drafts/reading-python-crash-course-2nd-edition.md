---
title: "Reading Python Crash Course, 2nd Edition"
categories: [Book Notes]
tags: [python]
---

Here are the notes I took on [*Python Crash Course: A Hands-On, Project-Based Introduction to Programming*, 2nd Edition](https://nostarch.com/pythoncrashcourse2e) (2019) by [Eric Matthes](https://ehmatthes.github.io/).

{% include toc %}

## Part I. Basics

### Chapter 2. Variables and Simple Data Types

#### Variables

##### Variables Are Labels

The author thinks that viewing a variable as a label assigned to a value is better than viewing it as a box storing a value.

#### Strings

##### Changing Case in a String with Methods

```python
name = "ada lovelace"
print(name.title()) # Ada Lovelace
print(name.upper()) # ADA LOVELACE
print(name.lower()) # ada lovelace
```

- How does `title` recognize a word?

    The best way to study it is looking the code. 
    
    The `title` method is implemented by [`_Py_bytes_title`](https://github.com/python/cpython/blob/fa919fdf2583bdfead1df00e842f24f30b2a34bf/Objects/bytes_methods.c#L333) in cpython 3.8.

    ```c
    void
    _Py_bytes_title(char *result, const char *s, Py_ssize_t len)
    {
        Py_ssize_t i;
        int previous_is_cased = 0;

        for (i = 0; i < len; i++) {
            int c = Py_CHARMASK(*s++);
            if (Py_ISLOWER(c)) {
                if (!previous_is_cased)
                    c = Py_TOUPPER(c);
                previous_is_cased = 1;
            } else if (Py_ISUPPER(c)) {
                if (previous_is_cased)
                    c = Py_TOLOWER(c);
                previous_is_cased = 1;
            } else
                previous_is_cased = 0;
            *result++ = c;
        }
    }
    ```
