---
title: "Ellan's GameFramework：（二）有限状态机"
date: 2019-10-30 12:08:25 +0800
categories: [Development Log]
tags: [unity, game, csharp]
---

[Ellan's GameFramework](https://gameframework.cn/) 是一个基于 [Unity](https://unity.com/) 引擎的游戏框架。我选取它作为为公司开发的一款 3D 扫雷游戏的框架，是因为它的功能还算齐全（目前有 18 个内置模块），设计规范（面向对象），关注度也很高（目前 GitHub 上有 1.5k 的星）。我想把我对它的使用过程做一份记录，以便学习和备忘。这一篇关注一下有限状态机模块。

有限状态机模块有三个主要的类：

1. 有限状态机状态 `FsmState<T>`，其中 `T` 为有限状态机持有者的类型。
2. 有限状态机 `Fsm<T>`，其中 `T` 为有限状态机持有者的类型。
3. 有限状态机管理者 `FsmManager`，实现了 `GameFrameworkModule`。

这三者的关系是有限状态机管理者管理着多个有限状态机，而一个有限状态机拥有多个有限状态机状态。

## 创建有限状态机

`FsmManager` 有方法 `CreateFsm` 可用于创建一个有限状态机，当然，如果你使用了[框架的 Unity 部分](/2019/10/29/ellan-s-gameframework-yi-jia-gou.html#unity-部分)，实际上你是通过 `FsmComponent` 间接调用此方法的。

假设你要为 `Actor` 类创建一个有限状态机，它含有站立和行走两个状态，则你需要先写两个状态类 `IdleState` 和 `MoveState`，它们都继承自 `FsmState<Actor>`。现在可以创建一个状态机了：

```c#
Actor owner;
var fsm = GameEntry.GetComponent<FsmComponent>()
                   .CreateFsm<Actor>("ActorFsm", owner, new IdleState(), new MoveState());
```

## 切换有限状态机状态

有限状态机 `Fsm<T>` 和有限状态机状态 `FsmState<T>` 都未提供一个公共接口以让用户从外部去切换状态，切换有限状态机的状态只能在内部之间进行切换，例如 `MoveState` 自己判断在适当时机切换到 `IdleState`，可以调用

```c#
ChangeState<IdleState>(fsm);
```

或

```c#
ChangeState(fsm, typeof(IdleState));
```

## 本系列其他篇章

- [Ellan’s GameFramework：（一）架构](/2019/10/29/ellan-s-gameframework-yi-jia-gou.html)