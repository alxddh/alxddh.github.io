---
title: "Ellan's GameFramework 使用日志：（一）框架架构"
date: 2019-10-31 17:18:29 +0800
last_modified_at: 2019-10-31 20:37:12 +0800
categories: [Log]
tags: [unity, game, csharp]
---

最近需要为公司开发一款 3D 扫雷游戏，我打算采用 [Ellan's GameFramework](https://gameframework.cn/) 作为我的开发框架。

> Game Framework 是一个基于 Unity 引擎的游戏框架，主要对游戏开发过程中常用模块进行了封装，很大程度地规范开发过程、加快开发速度并保证产品质量。

本篇先来关注一下框架的整体架构。

{% include toc %}

框架分为两个部分：一个是[*核心部分*](https://github.com/EllanJiang/GameFramework)，完全独立于 Unity 引擎，全部代码置于 `GameFramework` 命名空间下；一个是 [*Unity 部分*](https://github.com/EllanJiang/UnityGameFramework)，它是对核心部分的一层封装，以实现核心部分与 Unity 引擎的桥接，全部代码置于 `UnityGameFramework` 命名空间下。

## 核心部分

### 模块

框架的核心部分的架构与 Unity 引擎的脚本机制非常类似。Unity 的 `MonoBehaviour` 依赖引擎每一帧调用它的 `Update` 方法以更新它的状态；Ellan's GameFramework 内的大多数类也有一个 `Update` 回调，需要用户在一定周期内调用一次。

```c#
void Update(float elapseSeconds, float realElapseSeconds)
```

核心部分分为多个模块，每一个模块必须有一个 Manager 类实现模块抽象类 `GameFrameworkModule`。

```c#
internal abstract class GameFrameworkModule
{
    internal virtual int Priority
    internal abstract void Update(float elapseSeconds, float realElapseSeconds);
    internal abstract void Shutdown();
}
```

`Update` 就是前面所述用于更新模块状态的轮询回调；`Shutdown` 用于关闭和清理模块；`Priority` 是模块的优先级，优先级越高，模块的轮询越优先。

### 入口

用户无需去轮询一个单独的模块，框架的核心部分提供了一个静态类作为框架的入口，可以让用户通过调用一个方法即轮询所有模块：

```c#
public static class GameFrameworkEntry
{
    private static readonly GameFrameworkLinkedList<GameFrameworkModule> 
    s_GameFrameworkModules = new GameFrameworkLinkedList<GameFrameworkModule>();

    public static void Update(float elapseSeconds, float realElapseSeconds)
    {
        foreach (GameFrameworkModule module in s_GameFrameworkModules)
        {
            module.Update(elapseSeconds, realElapseSeconds);
        }
    }
}
```

`GameFrameworkEntry` 还提供了一个方法让用户去获取特定的模块：

```c#
public static T GetModule<T>() where T : class
```

`GetModule<T>` 会先检查模块类型 `T` 是否符合要求（如必须为 interface，必须存在 `GameFramework` 命名空间内等），然后再调用一个私有的 `GetModule` 方法：

```c#
private static GameFrameworkModule GetModule(Type moduleType)
{
    foreach (GameFrameworkModule module in s_GameFrameworkModules)
    {
        if (module.GetType() == moduleType)
        {
            return module;
        }
    }

    return CreateModule(moduleType);
}
```

它会检查是否该模块的实例已经存在，如不存在则新建一个实例。

```c#
private static GameFrameworkModule CreateModule(Type moduleType)
{
    GameFrameworkModule module = (GameFrameworkModule)Activator.CreateInstance(moduleType);
    if (module == null)
    {
        throw new GameFrameworkException(Utility.Text.Format("Can not create module '{0}'.", moduleType.FullName));
    }

    LinkedListNode<GameFrameworkModule> current = s_GameFrameworkModules.First;
    while (current != null)
    {
        if (module.Priority > current.Value.Priority)
        {
            break;
        }

        current = current.Next;
    }

    if (current != null)
    {
        s_GameFrameworkModules.AddBefore(current, module);
    }
    else
    {
        s_GameFrameworkModules.AddLast(module);
    }

    return module;
}
```

可以看出，在创建模块实例之时，`GameFrameworkEntry` 即根据该模块的优先级而插入到模块链表 `s_GameFrameworkModules` 之中，优先级越高越靠前。

## Unity 部分

框架的核心部分如何与 Unity 引擎桥接？答案是把每一个模块封装成一个组件。为此，框架的 Unity 部分提供了一个抽象的组件类：

```c#
public abstract class GameFrameworkComponent : MonoBehaviour
{
    protected virtual void Awake()
    {
        GameEntry.RegisterComponent(this);
    }
}
```

当该组件被唤醒后，即马上向 `GameEntry` 注册。`GameEntry` 也是一个静态类。类似于 `GameFrameworkEntry` 管理着每个模块，`GameEntry` 即管理着每个模块的封装组件：

```c#
public static class GameEntry
{
    private static readonly GameFrameworkLinkedList<GameFrameworkComponent> 
    s_GameFrameworkComponents = new GameFrameworkLinkedList<GameFrameworkComponent>();
}
```

每个模块的封装组件都持有一个该模块的 Manager 类实例，如配置组件 `ConfigComponent`：

```c#
public sealed class ConfigComponent : GameFrameworkComponent
{
    private IConfigManager m_ConfigManager = null;

    protected override void Awake()
    {
        base.Awake();

        m_ConfigManager = GameFrameworkEntry.GetModule<IConfigManager>();
        
        // ...
    }
}
```

然而有一个 `BaseComponent` 比较特殊，它不持有某个模块的 Manager 类实例，它只负责驱动框架的轮询：

```c#
public sealed class BaseComponent : GameFrameworkComponent
{
    private void Update()
    {
        GameFrameworkEntry.Update(Time.deltaTime, Time.unscaledDeltaTime);
    }

    private void OnDestroy()
    {
        GameFrameworkEntry.Shutdown();
    }
}
```

因此，为了使用这个框架，你必须在游戏中创建一个节点，它挂载着 `BaseComponent`，而其余模块的组件都是可选地存在的。当你想使用一个模块时，如 `ConfigComponent`，只需创建一个节点，并把 `ConfigComponent` 挂到它身上，再把节点扔到场景中。

## 本系列其他篇章

- [Ellan's GameFramework 使用日志：（二）有限状态机](/2019/10/31/ellan-s-gameframework-shi-yong-ri-zhi-er-you-xian-zhuang-tai-ji.html)
- [Ellan's GameFramework 使用日志：（三）流程](/2019/10/31/ellan-s-gameframework-shi-yong-ri-zhi-san-liu-cheng.html) 
- [Ellan's GameFramework 使用日志：（四）事件](/2019/10/31/ellan-s-gameframework-shi-yong-ri-zhi-si-shi-jian.html) 