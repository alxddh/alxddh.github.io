---
title: "Ellan's GameFramework 使用日志：（二）有限状态机"
date: 2019-10-31 19:37:40 +0800
categories: [Log]
tags: [unity, game, csharp]
---

顾名思义，有限状态机就是一台可以在有限多个状态之间切换的机器。[Ellan's GameFramework](https://gameframework.cn/) 提供了一个有限状态机模块。

{% include toc %}

如[第一篇](/2019/10/31/ellan-s-gameframework-shi-yong-ri-zhi-yi-kuang-jia-jia-gou.html)所述，有限状态机模块也有一个 Manager 类：

```c#
internal sealed class FsmManager : GameFrameworkModule, IFsmManager
{
    private readonly Dictionary<string, FsmBase> m_Fsms;
}
```

其中 `FsmBase` 是有限状态机的基类。实际使用的有限状态机是一个模版类 `Fsm<T>`，其中 `T` 是有限状态机持有者的类型。另外还有状态模版 `FsmState<T>`。它们三者的关系是：`FsmManager` 管理着多个 `Fsm`，而一个 `Fsm` 拥有多个 `FsmState`。

## 创建有限状态机

假设有一个 `Actor` 类，我们需要为它创建一个有限状态机，它有两个状态 `IdleState` 和 `MoveState`。我们首先得让这两个状态类继承自 `FsmState<Actor>`，然后通过 `FsmManager` 创建一个有限状态机：

```c#
Actor owner;
var fsmManager = GameFrameworkEntry.GetModule<IFsmManager>();
var fsm = fsmManager.CreateFsm<Actor>("ActorFsm", owner, new IdleState(), new MoveState());
```

`CreateFsm<Actor>()` 最终会调用 `Fsm<T>.Create()` 来创建有限状态机，我们可以看看它是怎么实现的：

```c#
public static Fsm<T> Create(string name, T owner, params FsmState<T>[] states)
{
    if (owner == null)
    {
        throw new GameFrameworkException("FSM owner is invalid.");
    }

    if (states == null || states.Length < 1)
    {
        throw new GameFrameworkException("FSM states is invalid.");
    }

    Fsm<T> fsm = ReferencePool.Acquire<Fsm<T>>();
    fsm.Name = name;
    fsm.m_Owner = owner;
    foreach (FsmState<T> state in states)
    {
        if (state == null)
        {
            throw new GameFrameworkException("FSM states is invalid.");
        }

        Type stateType = state.GetType();
        if (fsm.m_States.ContainsKey(stateType))
        {
            throw new GameFrameworkException(Utility.Text.Format("FSM '{0}' state '{1}' is already exist.", Utility.Text.GetFullName<T>(name), stateType));
        }

        fsm.m_States.Add(stateType, state);
        state.OnInit(fsm);
    }

    fsm.m_IsDestroyed = false;
    return fsm;
}
```

我们可以看到，它首先从*引用池*中取出了一个有限状态机，然后将每个状态添加到这个有限状态机中，而且每个状态的 `OnInit` 回调都会触发一次。

创建好的有限状态机还尚未进入某个特定的状态，你需要调用 `Start()` 方法去设置一个起始状态：

```c#
fsm.Start(typeof(IdleState));
```

该方法只是把你传入的状态设置给 `Fsm.m_CurrentState` 属性，并且调用状态的 `OnEnter` 回调一次。

## 切换状态

**有限状态机的状态无法从外部切换**。`FsmState` 拥有私有的 `ChangeState()` 方法，每个状态自己决定什么时候切换到另一个状态中（通常这个判断在 `OnUpdate` 回调中做出）。`FsmState.ChangeState` 最终会调用 `Fsm.ChangeState` 类切换状态：

```c#
internal void ChangeState(Type stateType)
{
    if (m_CurrentState == null)
    {
        throw new GameFrameworkException("Current state is invalid.");
    }

    FsmState<T> state = GetState(stateType);
    if (state == null)
    {
        throw new GameFrameworkException(Utility.Text.Format("FSM '{0}' can not change state to '{1}' which is not exist.", Utility.Text.GetFullName<T>(Name), stateType.FullName));
    }

    m_CurrentState.OnLeave(this, false);
    m_CurrentStateTime = 0f;
    m_CurrentState = state;
    m_CurrentState.OnEnter(this);
}
```

先是当前状态 `OnLeave`，然后下一个状态 `OnEnter`。

## 本系列其他篇章

- [Ellan's GameFramework 使用日志：（一）框架架构](/2019/10/31/ellan-s-gameframework-shi-yong-ri-zhi-yi-kuang-jia-jia-gou.html)