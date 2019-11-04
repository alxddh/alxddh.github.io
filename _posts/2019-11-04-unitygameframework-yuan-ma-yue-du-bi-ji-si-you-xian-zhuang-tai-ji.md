---
title: "UnityGameFramework 源码阅读笔记：（四）有限状态机"
date: 2019-11-04 19:17:41 +0800
last_modified_at: 2019-11-04 19:43:25 +0800
categories: [Notes]
tags: [unity, game, csharp]
---

因最近要为公司开发一款 3D 扫雷游戏，我采用了 [Ellan](https://github.com/EllanJiang) 开发的 [UnityGameFramework](https://gameframework.cn/) 作为我的开发框架。为了更好地使用它，我决定来一次源码阅读，并做些笔记。这一篇关注框架的有限状态机模块。

顾名思义，有限状态机就是一台可以在有限多个状态之间切换的机器。这个编程模型可以适用多种用途。

{% include toc %}

## 有限状态机和状态

一个有限状态机 `Fsm<T>` 拥有如下的主要成员：

```c#
internal sealed class Fsm<T> : FsmBase, IReference, IFsm<T> where T : class
{
    // 有限状态机持有者
    private T m_Owner;
    // 状态字典
    private readonly Dictionary<Type, FsmState<T>> m_States;
    // 数据字典
    private readonly Dictionary<string, Variable> m_Datas;
    // 当前状态
    private FsmState<T> m_CurrentState;
}
```

其中 `T` 为有限状态机持有者类型；`FsmState<T>` 为状态基类，用户若想自定义状态，则必须继承于它。意料之中的，有限状态机也应用了[引用池](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-er-yin-yong-chi.html)技术。


`Fsm` 提供了一个静态方法 `Create` 用于创建一个有限状态机实例：

```c#
public static Fsm<T> Create(string name, T owner, params FsmState<T>[] states);
```

新建的有限状态机并不处于某个状态，你需要调用 `Start` 设置起始状态：

```c#
public void Start<TState>() where TState : FsmState<T>;
public void Start(Type stateType);
```

`FsmState` 拥有多个回调函数：

```c#
protected internal virtual void OnInit(IFsm<T> fsm);
protected internal virtual void OnEnter(IFsm<T> fsm);
protected internal virtual void OnUpdate(IFsm<T> fsm, float elapseSeconds, float realElapseSeconds);
protected internal virtual void OnLeave(IFsm<T> fsm, bool isShutdown);
protected internal virtual void OnDestroy(IFsm<T> fsm);
```

它们的调用时机分别是：

- `OnInit`：创建该状态时调用。
- `OnEnter`：开始或者切换到该状态时调用。
- `OnUpdate`：轮询状态机时，状态机的当前状态会被轮询。
- `OnLeave`：当前状态被切换之后会被调用；清理状态机时，当前状态机的 `OnLeave` 会被调用。
- `OnDestroy`：清理状态机时，所有状态都会调用 `OnDestroy`。

**注意有限状态机并不能从外部切换状态，而只能由状态自行判断是否需要切换到另一个状态，这个判断通常在 `OnUpdate` 中执行**。

## 有限状态机管理者

`FsmManager` 很简单，只是管理着一个有限状态机字典：

```c#
internal sealed class FsmManager : GameFrameworkModule, IFsmManager
{
    private readonly Dictionary<string, FsmBase> m_Fsms;
}
```

## 本系列全部文章

- [UnityGameFramework 源码阅读笔记：（一）架构](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-yi-jia-gou.html)
- [UnityGameFramework 源码阅读笔记：（二）引用池](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-er-yin-yong-chi.html)
- [UnityGameFramework 源码阅读笔记：（三）事件](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-san-shi-jian.html)
- [UnityGameFramework 源码阅读笔记：（四）有限状态机](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-si-you-xian-zhuang-tai-ji.html)
- [UnityGameFramework 源码阅读笔记：（五）流程](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-wu-liu-cheng.html)
