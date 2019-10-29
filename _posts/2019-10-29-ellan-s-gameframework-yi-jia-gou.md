---
title: "Ellan's GameFramework：（一）架构"
date: 2019-10-29 15:42:39 +0800
categories: [Development Log]
tags: [unity, game, csharp]
---

[Ellan's GameFramework](https://gameframework.cn/) 是一个基于 [Unity](https://unity.com/) 引擎的游戏框架。我选取它作为为公司开发的一款 3D 扫雷游戏的框架，是因为它的功能还算齐全（目前有 18 个内置模块），设计规范（面向对象），关注度也很高（目前 GitHub 上有 1.5k 的星）。我想把我对它的使用过程做一份记录，以便学习和备忘。

{% include toc %}

## 两个部分

Ellan's GameFramework 有两个部分：一个是[*核心部分*](https://github.com/EllanJiang/GameFramework)，使用 C# 编写，是完全独立于 Unity 引擎的，所有代码都放在命名空间 `GameFramework` 之内；一个是 [*Unity 部分*](https://github.com/EllanJiang/UnityGameFramework)，它构建于核心部分之上，并且与 Unity 引擎相接，所有代码都放在命名空间 `UnityGameFramework` 之内。

## 核心部分

### 模块

框架的核心部分提供了一个模块抽象类 `GameFrameworkModule`，它的 API 很简单：

- 轮询

    ```c#
    internal abstract void Update(float elapseSeconds, float realElapseSeconds);
    ```

    Ellan's GameFramework 与 Unity 的架构是契合的，`MonoBehaviour.Update()` 每帧调用一次以更新组件的状态，同样，`GameFrameworkModule.Update()` 也需要在一定周期内调用一次以更新模块的状态。

- 关闭

    ```c#
    internal abstract void Shutdown();
    ```

    关闭并清理游戏框架模块。

- 轮询优先级

    ```c#
    internal virtual int Priority
    {
        get
        {
            return 0;
        }
    }
    ```

    优先级较高的模块会优先轮询，并且关闭操作会后进行。

每一个具体的模块都有一个 manager 类，它继承自 `GameFrameworkModule` 和一个对应的 interface，如事件模块有 `EventManager`，

```c#
internal sealed class EventManager : GameFrameworkModule, IEventManager
```

### 游戏框架入口

框架的核心部分还提供了一个静态类 `GameFrameworkEntry` 给用户以获取、轮询和关闭框架内的各个模块，例如：

- 获取事件管理器

    ```c#
    IEventManager manager = GameFrameworkEntry.GetModule<IEventManager>();
    ```

    当你通过 `GetModule` 获取某个 manager 时，它会检查是否该 manager 是否已存在，如不存在，则创建一个。

- 轮询所有模块

    ```c#
    GameFrameworkEntry.Update(elapseSeconds, realElapseSeconds);
    ```

- 关闭并清理所有游戏框架模块

    ```c#
    GameFrameworkEntry.ShutDown();
    ```

## Unity 部分

框架的核心部分如何与 Unity 引擎进行对接？答案是对每个模块的 manager 都封装成一个组件，并且用一个静态类 `UnityGameFramework.Runtime.GameEntry` 管理这些组件。

框架的 Unity 部分提供了一个抽象组件类：

```c#
public abstract class GameFrameworkComponent : MonoBehaviour
{
    protected virtual void Awake()
    {
        GameEntry.RegisterComponent(this);
    }
}
```

当它被唤醒之后，立即向 `GameEntry` 注册。

框架的 Unity 部分最重要的一个组件就是 `BaseComponent`，它负责各个模块的轮询和关闭：

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

因此，一个游戏场景中，必须要有一个 `BaseComponent` 对象。其余组件都是可选地存在的。

模块是如何封装成组件的？这里以事件模块为例。`EventComponent` 管理着一个 `EventManager` 对象：

```c#
public sealed class EventComponent : GameFrameworkComponent
{
    private IEventManager m_EventManager = null;
}
```

当 `EventComponent` 唤醒时，即通过 `GameFrameworkEntry` 获取到 `EventManager`：

```c#
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

## 如何使用

为了更好地管理框架的内建组件和我的游戏中自定义的组件，我自己又创建了一个 `GameEntry`，放在 `Thor.Base` 命名空间内：

```c#
public partial class GameEntry : MonoBehaviour
{
    void Start()
    {
        InitBuiltinComponents();
        InitCustomComponents();
    }
}
```

`InitBuiltinComponents` 也没做太多的事情，只是通过 `UnityGameFramework.Runtime.GameEntry` 获取各个组件而已。

```c#
private static void InitBuiltinComponents()
{
    Base = UnityGameFramework.Runtime.GameEntry.GetComponent<BaseComponent>();
    Config = UnityGameFramework.Runtime.GameEntry.GetComponent<ConfigComponent>();
    DataNode = UnityGameFramework.Runtime.GameEntry.GetComponent<DataNodeComponent>();
    DataTable = UnityGameFramework.Runtime.GameEntry.GetComponent<DataTableComponent>();
    Debugger = UnityGameFramework.Runtime.GameEntry.GetComponent<DebuggerComponent>();
    Download = UnityGameFramework.Runtime.GameEntry.GetComponent<DownloadComponent>();
    Entity = UnityGameFramework.Runtime.GameEntry.GetComponent<EntityComponent>();
    Event = UnityGameFramework.Runtime.GameEntry.GetComponent<EventComponent>();
    Fsm = UnityGameFramework.Runtime.GameEntry.GetComponent<FsmComponent>();
    Localization = UnityGameFramework.Runtime.GameEntry.GetComponent<LocalizationComponent>();
    Network = UnityGameFramework.Runtime.GameEntry.GetComponent<NetworkComponent>();
    ObjectPool = UnityGameFramework.Runtime.GameEntry.GetComponent<ObjectPoolComponent>();
    Procedure = UnityGameFramework.Runtime.GameEntry.GetComponent<ProcedureComponent>();
    Resource = UnityGameFramework.Runtime.GameEntry.GetComponent<ResourceComponent>();
    Scene = UnityGameFramework.Runtime.GameEntry.GetComponent<SceneComponent>();
    Setting = UnityGameFramework.Runtime.GameEntry.GetComponent<SettingComponent>();
    Sound = UnityGameFramework.Runtime.GameEntry.GetComponent<SoundComponent>();
    UI = UnityGameFramework.Runtime.GameEntry.GetComponent<UIComponent>();
    WebRequest = UnityGameFramework.Runtime.GameEntry.GetComponent<WebRequestComponent>();
}
```

在场景中，我用一个空的 GameObject 挂载 `Thor.Base.GameEntry`，如下图：

{% include image name="game-entry.png" width="30%" %}

其中 `GameFramework` 节点挂载的是 `BaseComponent`，其余节点则挂载了每个模块对应的组件。
