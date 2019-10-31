---
title: "Ellan's GameFramework 源码阅读笔记：（三）有限状态机"
date: 2019-10-31 15:11:22 +0800
categories: [Notes]
tags: [unity, game, csharp]
---

顾名思义，有限状态机就是一台可以在有限多个状态之间切换的机器。有限状态机模块也是 [Ellan's GameFramework](https://gameframework.cn/) 的一个基础模块，流程模块就是基于有限状态机模块实现的。

{% include toc %}

## 核心部分

有限状态机模块有三个主要的类，它们的关系是：有限状态机管理者 `FsmManager` 管理着多个有限状态机，而一个有限状态机 `Fsm<T>` 拥有多个状态 `FsmState<T>`。其中 `T` 是有限状态机持有者的类型。

用户无法从外部切换 `Fsm` 的状态，只能由 `FsmState` 自己决定什么时候切换到另一个状态。可以看一下 `FsmState.ChangeState` 方法：

```c#
protected void ChangeState(IFsm<T> fsm, Type stateType)
{
    Fsm<T> fsmImplement = (Fsm<T>)fsm;
    if (fsmImplement == null)
    {
        throw new GameFrameworkException("FSM is invalid.");
    }

    if (stateType == null)
    {
        throw new GameFrameworkException("State type is invalid.");
    }

    if (!typeof(FsmState<T>).IsAssignableFrom(stateType))
    {
        throw new GameFrameworkException(Utility.Text.Format("State type '{0}' is invalid.", stateType.FullName));
    }

    fsmImplement.ChangeState(stateType);
}
```

它最终会调用 `Fsm.ChangeState` 方法：

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

## 如何使用

假设有一个 `Actor` 类，你要为它创建一个有限状态机，它有两个状态，`IdleState` 和 `MoveState`。首先，你需要将 `IdleState` 和 `MoveState` 继承于 `FsmState<Actor>`，实现它们之间切换的逻辑。然后创建可以通过 `FsmManager` 创建一个有限状态机：

```c#
Actor owner;
var fsmManager = GameFrameworkEntry.GetModule<IFsmManager>();
var fsm = fsmManager.CreateFsm<Actor>("ActorFsm", owner, new IdleState(), new MoveState());
```

## 系列目录

- [Ellan’s GameFramework 源码阅读笔记](/2019/10/30/ellan-s-gameframework-yuan-ma-yue-du-bi-ji.html)
- [Ellan's GameFramework 源码阅读笔记：（一）框架架构](/2019/10/30/ellan-s-gameframework-yuan-ma-yue-du-bi-ji-yi-kuang-jia-jia-gou.html)
- [Ellan's GameFramework 源码阅读笔记：（二）事件](/2019/10/31/ellan-s-gameframework-yuan-ma-yue-du-bi-ji-er-shi-jian.html)
- [Ellan's GameFramework 源码阅读笔记：（三）有限状态机](/2019/10/31/ellan-s-gameframework-yuan-ma-yue-du-bi-ji-san-you-xian-zhuang-tai-ji.html)