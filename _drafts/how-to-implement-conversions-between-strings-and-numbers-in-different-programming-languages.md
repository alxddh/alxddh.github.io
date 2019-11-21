---
title: "How to Implement Conversions between Strings and Numbers in Different Programming Languages?"
categories: [How-tos]
tags: [programming]
---

This post shows some examples of conversions between strings and numbers in many different popular programming languages. I think these examples are useful because the task is so frequent in daily coding works.

{% include toc %}

## Java

- String to number

    - String to integer
    
        ```java
        String string;
        int integer = Integer.parseInt(string);
        ```

        ```java
        String string;
        Integer integer = Integer.valueOf(string);
        ```

    - String to double

        ```java
        String string;
        double number = Double.parseDouble(string);
        ```

        ```java
        String string;
        Double number = Double.valueOf(string);
        ```

    Summary: `parseInt` and `parseDouble` return primitive types, while `valueOf`s return wrapper types.

- Number to string

    - Integer to string
        
        ```java
        int integer;
        String string1 = Integer.toString(integer);
        String string2 = new Integer(integer).toString();
        String string3 = String.valueOf(integer);
        ```

    - Double to string

        ```java
        double number;
        String string1 = Double.toString(number);
        String string2 = new Double(number).toString();
        String string3 = String.valueOf(number);
        ```
