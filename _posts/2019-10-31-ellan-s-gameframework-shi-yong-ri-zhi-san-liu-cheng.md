---
title: "Ellan's GameFramework 使用日志：（三）流程"
date: 2019-10-31 19:53:53 +0800
categories: [Log]
tags: [unity, game, csharp]
---

游戏的整个生命周期可以划分成多个流程，游戏可能会在多个流程之间切换。显然，流程是适合用[有限状态机](/2019/10/31/ellan-s-gameframework-shi-yong-ri-zhi-er-you-xian-zhuang-tai-ji.html)实现的。

`ProcedureManager` 持有一个有限状态机：

```c#
internal sealed class ProcedureManager : GameFrameworkModule, IProcedureManager
{
    private IFsmManager m_FsmManager;
    private IFsm<IProcedureManager> m_ProcedureFsm;
}
```

你通过调用 `ProcedureManager.Initialize()` 创建这个有限状态机：

```c#
public void Initialize(IFsmManager fsmManager, params ProcedureBase[] procedures)
{
    if (fsmManager == null)
    {
        throw new GameFrameworkException("FSM manager is invalid.");
    }

    m_FsmManager = fsmManager;
    m_ProcedureFsm = m_FsmManager.CreateFsm(this, procedures);
}
```

然后再调用 `ProcedureManager.StartProcedure()` 开始一个起始流程：

```c#
public void StartProcedure<T>() where T : ProcedureBase
{
    if (m_ProcedureFsm == null)
    {
        throw new GameFrameworkException("You must initialize procedure first.");
    }

    m_ProcedureFsm.Start<T>();
}
```

## 本系列其他篇章

- [Ellan's GameFramework 使用日志：（一）框架架构](/2019/10/31/ellan-s-gameframework-shi-yong-ri-zhi-yi-kuang-jia-jia-gou.html)
- [Ellan's GameFramework 使用日志：（二）有限状态机](/2019/10/31/ellan-s-gameframework-shi-yong-ri-zhi-er-you-xian-zhuang-tai-ji.html)
