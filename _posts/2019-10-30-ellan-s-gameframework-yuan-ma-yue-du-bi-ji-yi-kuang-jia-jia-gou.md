---
title: "Ellan's GameFramework 源码阅读笔记：（一）框架架构"
date: 2019-10-30 21:02:01 +0800
last_modified_at: 2019-10-31 11:10:27 +0800
categories: [Notes]
tags: [unity, game, csharp]
---

[Ellan's GameFramework](https://gameframework.cn/) 分为两个部分：一是[*核心部分*](https://github.com/EllanJiang/GameFramework)，它是完全独立于 Unity 引擎的，所有代码置于 `GameFramework` 命名空间下；一是 [*Unity 部分*](https://github.com/EllanJiang/UnityGameFramework)，它是核心部分与 Unity 引擎之间的桥接，所有代码置于 `UnityGameFramework` 命名空间下。

{% include toc %}

## 核心部分

### 模块

框架的核心部分目前有 18 个模块，每个模块都有一个 manager 类，它们都需要实现一个抽象类 `GameFrameworkModule`。

```c#
internal abstract class GameFrameworkModule
{
    /// <summary>
    /// 获取游戏框架模块优先级。
    /// </summary>
    /// <remarks>优先级较高的模块会优先轮询，并且关闭操作会后进行。</remarks>
    internal virtual int Priority
    {
        get
        {
            return 0;
        }
    }

    /// <summary>
    /// 游戏框架模块轮询。
    /// </summary>
    /// <param name="elapseSeconds">逻辑流逝时间，以秒为单位。</param>
    /// <param name="realElapseSeconds">真实流逝时间，以秒为单位。</param>
    internal abstract void Update(float elapseSeconds, float realElapseSeconds);

    /// <summary>
    /// 关闭并清理游戏框架模块。
    /// </summary>
    internal abstract void Shutdown();
}
```

`GameFrameworkModule.Update` 的作用与 [`MonoBehaviour.Update`](https://docs.unity3d.com/ScriptReference/MonoBehaviour.Update.html) 的类似，需要在一定周期内被调用一次以刷新 `GameFrameworkModule` 的状态。很多模块的功能是依赖于这个轮询机制的。

### 入口

框架的核心部分提供了一个静态类 `GameFrameworkEntry`，你可以通过它去获取各个模块的 manager：

```c#
/// <summary>
/// 获取游戏框架模块。
/// </summary>
/// <typeparam name="T">要获取的游戏框架模块类型。</typeparam>
/// <returns>要获取的游戏框架模块。</returns>
/// <remarks>如果要获取的游戏框架模块不存在，则自动创建该游戏框架模块。</remarks>
public static T GetModule<T>() where T : class
{
    // ...
}
```

例如获取事件管理者 `EventManager`：

```c#
var manager = GameFrameworkEntry.GetModule<IEventManager>();
```

当你想要获取的模块的 manager 不存在时，`GameFrameworkEntry` 会首先创建一个再将之返回。

`GameFrameworkEntry` 还提供了一个 `Update` 方法让你可以很方便地轮询框架的所有模块：

```c#
/// <summary>
/// 所有游戏框架模块轮询。
/// </summary>
/// <param name="elapseSeconds">逻辑流逝时间，以秒为单位。</param>
/// <param name="realElapseSeconds">真实流逝时间，以秒为单位。</param>
public static void Update(float elapseSeconds, float realElapseSeconds)
{
    foreach (GameFrameworkModule module in s_GameFrameworkModules)
    {
        module.Update(elapseSeconds, realElapseSeconds);
    }
}
```

其中 `s_GameFrameworkModules` 是一个所有已存在的模块 manager 实例的链表。你必须在游戏的某处——如 `MonoBehaviour.Update` 方法之中——调用 `GameFrameworkEntry.Update` 以使框架的所有模块工作。

## Unity 部分

框架的核心部分如何与 Unity 引擎向接合呢？答案是把框架中每个模块的 manager 类封装成一个组件。如 `EventManager` 即被封装成了 `EventComponent`：

```c#
public sealed class EventComponent : GameFrameworkComponent
{
    private IEventManager m_EventManager = null;

    // ...
}
```

其中 `GameFrameworkComponent` 继承自 `MonoBehaviour`：

```c#
/// <summary>
/// 游戏框架组件抽象类。
/// </summary>
public abstract class GameFrameworkComponent : MonoBehaviour
{
    /// <summary>
    /// 游戏框架组件初始化。
    /// </summary>
    protected virtual void Awake()
    {
        GameEntry.RegisterComponent(this);
    }
}
```

可见，当该组件被唤醒之后，即立马向 `GameEntry` 注册。`GameEntry` 是一个静态类。类似于 `GameFrameworkEntry` 管理着所有模块 manager，`GameEntry` 则管理着所有模块组件。你可以通过 `GameFrameworkEntry.GetModule` 获取某个模块的 manager，也可以通过 `GameEntry.GetComponent` 获取某个模块组件。

再回头看一下 `EventComponent` 是在何时获取到 `EventManager` 的：

```c#
/// <summary>
/// 游戏框架组件初始化。
/// </summary>
protected override void Awake()
{
    base.Awake();

    m_EventManager = GameFrameworkEntry.GetModule<IEventManager>();
    if (m_EventManager == null)
    {
        Log.Fatal("Event manager is invalid.");
        return;
    }
}
```

`EventComponent` 不负责对 `EventManager` 的轮询。实际上，框架的 Unity 部分提供了一个 `BaseComponent`，它负责对所有模块的轮询：

```c#
private void Update()
{
    GameFrameworkEntry.Update(Time.deltaTime, Time.unscaledDeltaTime);
}
```

所以，游戏场景中必须存在一个挂载着 `BaseComponent` 的 GameObject，而其余的组件都是可选地存在的。

{% include image name="game-framework.png" width="30%" caption="一个模块组件 Prefab" %}

其中 GameFramework 节点挂载着 `BaseComponent`，而其他节点也都挂载着不同的模块组件。

## 系列目录

- [Ellan’s GameFramework 源码阅读笔记](/2019/10/30/ellan-s-gameframework-yuan-ma-yue-du-bi-ji.html)
- [Ellan's GameFramework 源码阅读笔记：（一）框架架构](/2019/10/30/ellan-s-gameframework-yuan-ma-yue-du-bi-ji-yi-kuang-jia-jia-gou.html)
- [Ellan's GameFramework 源码阅读笔记：（二）事件](/2019/10/31/ellan-s-gameframework-yuan-ma-yue-du-bi-ji-er-shi-jian.html) 