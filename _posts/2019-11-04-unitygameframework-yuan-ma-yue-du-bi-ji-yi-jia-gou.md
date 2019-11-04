---
title: "UnityGameFramework 源码阅读笔记：（一）架构"
date: 2019-11-04 11:56:34 +0800
categories: [Notes]
tags: [unity, game, csharp]
---

因最近要为公司开发一款 3D 扫雷游戏，我采用了 [Ellan](https://github.com/EllanJiang) 开发的 [UnityGameFramework](https://gameframework.cn/) 作为我的开发框架。为了更好地使用它，我决定来一次源码阅读，并做些笔记。这篇是第一篇，关注框架的整体架构。

{% include toc %}

## 三个部分

框架包括三个部分：

- GameFramework（GF）：完全独立于 Unity 引擎，目前提供了 18 个功能模块。
- UnityGameFramework.Runtime（UGF）：对 GameFramework 进行的一层封装，实现了与 Unity 引擎的桥接。
- UnityGameFramework.Editor：Unity 编辑器插件。

## 模块

GF 为每个模块提供了一个抽象类：

```c#
internal abstract class GameFrameworkModule
{
    internal virtual int Priority
    {
        get
        {
            return 0;
        }
    }

    internal abstract void Update(float elapseSeconds, float realElapseSeconds);

    internal abstract void Shutdown();
}
```

每一个模块都有一个 Manager 类，它必须实现 `GameFrameworkModule` 这个抽象类。与 Unity 的 [`MonoBehaviour`](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) 类似，GF 的每个模块的状态更新也是依赖于引擎每一帧的轮询的，即每一帧需调用一次 `Update` 回调。`Priority` 为模块的轮询优先级。

## 入口

GF 提供了一个静态类 `GameFrameworkEntry` 作为框架的入口，用户通过此入口获取每个功能模块：

```c#
public static T GetModule<T>() where T : class
```

其中 `T` 是每个模块 Manager 的 `interface`。

实际上，`GameFrameworkEntry` 管理着一个模块链表，当用户想要获取的模块不存在时，它会创建一个模块，然后按优先级大小插入到这个链表之中。

`GameFrameworkEntry` 还提供了一个 `Update` 方法，用户通过调用这个方法既可以轮询所有已创建的模块；当然，它是按模块优先级大小轮询的。

## UGF

UGF 是怎样实现 GF 与 Unity 的桥接的？答案是把每个模块的 Manager 类封装成一个组件，而且相似地，提供一个静态类 `GameEntry` 管理所有的组件。每个组件都继承自 `GameFrameworkComponent`：

```c#
public abstract class GameFrameworkComponent : MonoBehaviour
{
    protected virtual void Awake()
    {
        GameEntry.RegisterComponent(this);
    }
}
```

可见当每个组件被唤醒时，即向 `GameEntry` 注册，这样，用户即可在之后通过 `GameEntry` 获取每个模块组件。

这些组件当中有一个 `BaseComponent` 是最重要的，为了框架正常工作，它必须存在于场景之中，而其他组件都是可选地存在的。`BaseComponent` 负责框架的轮询和关闭：

```c#
private void Update()
{
    GameFrameworkEntry.Update(Time.deltaTime, Time.unscaledDeltaTime);
}

private void OnDestroy()
{
    GameFrameworkEntry.Shutdown();
}
```