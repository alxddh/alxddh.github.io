---
title: "I Received a Google Foobar"
categories: [Logs]
tags: [interview, google]
---

On 29th October 2019, I received a Google Foobar Invitation. Here are the solutions I gave for the 5 levels of question.

{% include toc %}

## Level 1

> Who would've guessed? Doomsday devices take a LOT of power. Commander Lambda wants to supplement the LAMBCHOP's quantum antimatter reactor core with solar arrays, and she's tasked you with setting up the solar panels. 
>
> Due to the nature of the space station's outer paneling, all of its solar panels must be squares. Fortunately, you have one very large and flat area of solar material, a pair of industrial-strength scissors, and enough MegaCorp Solar Tape(TM) to piece together any excess panel material into more squares. For example, if you had a total area of 12 square yards of solar material, you would be able to make one 3x3 square panel (with a total area of 9). That would leave 3 square yards, so you can turn those into three 1x1 square solar panels.
>
> Write a function solution(area) that takes as its input a single unit of measure representing the total area of solar panels you have (between 1 and 1000000 inclusive) and returns a list of the areas of the largest squares you could make out of those panels, starting with the largest squares first. So, following the example above, solution(12) would return [9, 1, 1, 1].

My original solution looked like

```python
import math

def biggestSubArea(area):
    a = math.floor((math.sqrt(area)))
    return a * a

def solution(area):
    areas = []
    while area > 0:
        subArea = biggestSubArea(area)
        areas.append(subArea)
        area -= subArea
    return areas
```

I had tested it on my computer, and it was OK, but it didn't pass the verification on the Google Foobar. Finally, I had found that there were some constraints on the solution. One of them was that the code has to run in Python 2, but in Python 2, `math.floor` returns a `float`, so finally, I had modified it to this:

```python
def biggestSubArea(area):
    a = int(math.floor((math.sqrt(area))))
    return a * a
```

## Level 2

> Commander Lambda uses an automated algorithm to assign minions randomly to tasks, in order to keep her minions on their toes. But you've noticed a flaw in the algorithm - it eventually loops back on itself, so that instead of assigning new minions as it iterates, it gets stuck in a cycle of values so that the same minions end up doing the same tasks over and over again. You think proving this to Commander Lambda will help you make a case for your next promotion. 
>
> You have worked out that the algorithm has the following process: 
>
> 1) Start with a random minion ID n, which is a nonnegative integer of length k in base b  
> 2) Define x and y as integers of length k.  x has the digits of n in descending order, and y has the digits of n in ascending order  
> 3) Define z = x - y.  Add leading zeros to z to maintain length k if necessary  
> 4) Assign n = z to get the next minion ID, and go back to step 2  
> 
> For example, given minion ID n = 1211, k = 4, b = 10, then x = 2111, y = 1112 and z = 2111 - 1112 = 0999. Then the next minion ID will be n = 0999 and the algorithm iterates again: x = 9990, y = 0999 and z = 9990 - 0999 = 8991, and so on.
> 
> Depending on the values of n, k (derived from n), and b, at some point the algorithm reaches a cycle, such as by reaching a constant value. For example, starting with n = 210022, k = 6, b = 3, the algorithm will reach the cycle of values [210111, 122221, 102212] and it will stay in this cycle no matter how many times it continues iterating. Starting with n = 1211, the routine will reach the integer 6174, and since 7641 - 1467 is 6174, it will stay as that value no matter how many times it iterates.
>
> Given a minion ID as a string n representing a nonnegative integer of length k in base b, where 2 <= k <= 9 and 2 <= b <= 10, write a function solution(n, b) which returns the length of the ending cycle of the algorithm above starting with n. For instance, in the example above, solution(210022, 3) would return 3, since iterating on 102212 would return to 210111 when done in base 3. If the algorithm reaches a constant, such as 0, then the length is 1.

```python
import string
digs = string.digits + string.ascii_letters

def int2base(x, base):
    if x < 0:
        sign = -1
    elif x == 0:
        return digs[0]
    else:
        sign = 1

    x *= sign
    digits = []

    while x:
        digits.append(digs[int(x % base)])
        x = int(x / base)

    if sign < 0:
        digits.append('-')

    digits.reverse()

    return ''.join(digits)

def solution(n, b):
    ids = []
    while True:
        k = len(n)
        y = int(''.join(sorted(n)), base=b)
        x = int(''.join(sorted(n, reverse=True)), base=b)
        z = x - y
        next = int2base(z, b).zfill(k)
        if len(ids) > 0 and next in ids:
            return len(ids) - ids.index(next)
        ids.append(next)
        n = next
```
