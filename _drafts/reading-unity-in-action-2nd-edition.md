---
title: "Reading \"Unity in Action, 2nd Edition\""
categories: [Book Notes]
tags: [unity, game engine, game development]
---

[*Unity in Action*, 2nd Edition](https://www.manning.com/books/unity-in-action-second-edition) by [Joseph Hocking](http://www.newarteest.com/) was published in 2018. It is a book to teach you to write and deploy games with the [Unity](https://unity.com/) game development platform.

{% include toc %}

## Chapter 2. Building a demo that puts you in 3D space

This chapter teaches you to build a basic FPS scene. The player can control the character to move around, using the mouse and keyboard.

### The player

We use a Capsule game object to represent the player here, and we need to replace the [`CapsuleCollider`](https://docs.unity3d.com/ScriptReference/CapsuleCollider.html) component with the [`CharacterController`](https://docs.unity3d.com/ScriptReference/CharacterController.html) component. Why?

Both of them are inherited from [`UnityEngine.Collider`](https://docs.unity3d.com/ScriptReference/Collider.html), but `CharacterController` can let you easily control the movement of the object under the constrains of collisions. `CharacterController` does not obey the physical simulation, so it's more effective and easier to do some unrealistic behaviors.

### Script component for looking around: `MouseLook`

`MouseLook` responses the mouse input to rotate the player. The framework of `MouseLook` looks like

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MouseLook : MonoBehaviour
{
    public enum RotationAxes 
    {
        MouseXAndY,
        MouseX,
        MouseY,
    }

    public RotationAxes axes = RotationAxes.MouseXAndY;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (axes == RotationAxes.MouseX) {
            
        } else if (axes == RotationAxes.MouseY) {
        
        } else {

        }
    }
}
```

The rotation along the horizontal direction is very simple because the rotated angle has not limits, you just need to invoke [`Transform.Rotate()`](https://docs.unity3d.com/ScriptReference/Transform.Rotate.html):

```c#
void Update()
{
    if (axes == RotationAxes.MouseX) {
        transform.Rotate(0, sensitivityHor * Input.GetAxis("Mouse X"), 0);
    } else if (axes == RotationAxes.MouseY) {
    
    } else {

    }
}
```

The rotation order is Z-X-Y.
